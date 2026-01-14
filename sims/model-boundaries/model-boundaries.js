// Model Boundaries MicroSim
// Explore where different physics models succeed and fail

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout proportions
let testAreaWidth;
let panelWidth;

// Colors
const bgColor = '#1a1a2e';
const groundColor = '#2d5a27';
const skyColor = '#87ceeb';
const modelColors = {
  naive: { main: '#3498db', light: '#85c1e9', name: 'Naive (straight down)' },
  noAir: { main: '#27ae60', light: '#82e0aa', name: 'No air resistance' },
  linearAir: { main: '#e67e22', light: '#f5b041', name: 'Linear air resistance' },
  fullAero: { main: '#9b59b6', light: '#c39bd3', name: 'Full aerodynamic' }
};

// Physics constants
const g = 9.81; // gravity m/s^2
const dt = 0.016; // time step (seconds)
const scale = 3; // pixels per meter

// Projectile types with properties
const projectiles = {
  baseball: { name: 'Baseball', mass: 0.145, radius: 0.037, dragCoeff: 0.3 },
  feather: { name: 'Feather', mass: 0.005, radius: 0.05, dragCoeff: 1.2 },
  bullet: { name: 'Bullet', mass: 0.01, radius: 0.005, dragCoeff: 0.2 },
  basketball: { name: 'Basketball', mass: 0.62, radius: 0.12, dragCoeff: 0.47 }
};

// State variables
let launchAngle = 45;
let initialVelocity = 20;
let airDensity = 1.225; // kg/m^3, normal atmosphere
let selectedProjectile = 'baseball';
let activeModels = {
  naive: false,
  noAir: true,
  linearAir: false,
  fullAero: false
};
let showAllModels = false;

// Simulation state
let trajectories = {};
let isLaunched = false;
let simulationTime = 0;

// UI elements
let angleSlider, velocitySlider, airDensitySlider;
let projectileSelect;
let launchBtn, resetBtn, toggleAllBtn;
let modelCheckboxes = {};

// Launcher position (in canvas pixels)
let launcherX = 80;
let launcherY;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth - 20;
  }
  canvasWidth = max(700, min(canvasWidth, 1200));
  testAreaWidth = canvasWidth * 0.65;
  panelWidth = canvasWidth * 0.35;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  launcherY = drawHeight - 50;
  textFont('Arial');

  createControls();
  resetSimulation();
}

function createControls() {
  let controlY = drawHeight + 15;
  let sliderWidth = 100;

  // Angle slider
  angleSlider = createSlider(0, 90, 45, 1);
  angleSlider.position(80, controlY);
  angleSlider.style('width', sliderWidth + 'px');

  // Velocity slider
  velocitySlider = createSlider(1, 100, 20, 1);
  velocitySlider.position(250, controlY);
  velocitySlider.style('width', sliderWidth + 'px');

  // Air density slider
  airDensitySlider = createSlider(0, 2.5, 1.225, 0.01);
  airDensitySlider.position(420, controlY);
  airDensitySlider.style('width', sliderWidth + 'px');

  // Projectile dropdown
  projectileSelect = createSelect();
  projectileSelect.position(580, controlY - 3);
  for (let key in projectiles) {
    projectileSelect.option(projectiles[key].name, key);
  }
  projectileSelect.selected('baseball');
  projectileSelect.changed(() => {
    selectedProjectile = projectileSelect.value();
    if (isLaunched) resetSimulation();
  });

  // Buttons row
  let btnY = controlY + 25;

  launchBtn = createButton('Launch');
  launchBtn.position(10, btnY);
  launchBtn.mousePressed(launch);
  launchBtn.style('background-color', '#27ae60');
  launchBtn.style('color', 'white');
  launchBtn.style('border', 'none');
  launchBtn.style('padding', '5px 15px');
  launchBtn.style('cursor', 'pointer');

  resetBtn = createButton('Reset');
  resetBtn.position(80, btnY);
  resetBtn.mousePressed(resetSimulation);
  resetBtn.style('background-color', '#e74c3c');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('padding', '5px 15px');
  resetBtn.style('cursor', 'pointer');

  toggleAllBtn = createButton('Show All Models');
  toggleAllBtn.position(145, btnY);
  toggleAllBtn.mousePressed(toggleAllModels);
  toggleAllBtn.style('background-color', '#3498db');
  toggleAllBtn.style('color', 'white');
  toggleAllBtn.style('border', 'none');
  toggleAllBtn.style('padding', '5px 15px');
  toggleAllBtn.style('cursor', 'pointer');
}

function toggleAllModels() {
  showAllModels = !showAllModels;
  if (showAllModels) {
    activeModels = { naive: true, noAir: true, linearAir: true, fullAero: true };
    toggleAllBtn.html('Single Model');
  } else {
    activeModels = { naive: false, noAir: true, linearAir: false, fullAero: false };
    toggleAllBtn.html('Show All Models');
  }
  if (isLaunched) resetSimulation();
}

function launch() {
  if (!isLaunched) {
    isLaunched = true;
    launchBtn.attribute('disabled', '');
    calculateTrajectories();
  }
}

function resetSimulation() {
  isLaunched = false;
  simulationTime = 0;
  trajectories = {
    naive: [],
    noAir: [],
    linearAir: [],
    fullAero: []
  };
  launchBtn.removeAttribute('disabled');
}

function calculateTrajectories() {
  launchAngle = angleSlider.value();
  initialVelocity = velocitySlider.value();
  airDensity = airDensitySlider.value();

  let proj = projectiles[selectedProjectile];
  let angleRad = radians(launchAngle);
  let vx0 = initialVelocity * cos(angleRad);
  let vy0 = initialVelocity * sin(angleRad);

  // Calculate trajectories for all models
  trajectories.naive = calculateNaiveTrajectory(vx0, vy0);
  trajectories.noAir = calculateNoAirTrajectory(vx0, vy0);
  trajectories.linearAir = calculateLinearAirTrajectory(vx0, vy0, proj);
  trajectories.fullAero = calculateFullAeroTrajectory(vx0, vy0, proj);
}

function calculateNaiveTrajectory(vx0, vy0) {
  // Objects fall straight down (naive model)
  let points = [];
  let x = 0;
  let y = 0;
  let vy = 0;

  // Go up first if angle > 0
  let peakTime = vy0 / g;
  let peakHeight = vy0 * peakTime - 0.5 * g * peakTime * peakTime;

  // Rise phase (if launched upward)
  if (vy0 > 0) {
    for (let t = 0; t <= peakTime; t += dt) {
      y = vy0 * t - 0.5 * g * t * t;
      points.push({ x: 0, y: y, t: t });
    }
  }

  // Fall straight down
  let fallTime = Math.sqrt(2 * (peakHeight > 0 ? peakHeight : 0) / g);
  for (let t = 0; t <= fallTime + dt; t += dt) {
    let currentY = peakHeight - 0.5 * g * t * t;
    if (currentY < 0) currentY = 0;
    points.push({ x: 0, y: currentY, t: peakTime + t });
    if (currentY <= 0) break;
  }

  return points;
}

function calculateNoAirTrajectory(vx0, vy0) {
  // Parabolic trajectory without air resistance
  let points = [];
  let x = 0;
  let y = 0;
  let t = 0;

  while (y >= 0 || t === 0) {
    x = vx0 * t;
    y = vy0 * t - 0.5 * g * t * t;
    if (y < 0) y = 0;
    points.push({ x: x, y: y, t: t });
    if (y <= 0 && t > 0) break;
    t += dt;
    if (t > 30) break; // safety limit
  }

  return points;
}

function calculateLinearAirTrajectory(vx0, vy0, proj) {
  // Linear air resistance: F_drag = -b*v
  let points = [];
  let x = 0;
  let y = 0;
  let vx = vx0;
  let vy = vy0;

  // Drag coefficient for linear model
  let b = 0.1 * airDensity * proj.radius * 10; // simplified linear drag

  let t = 0;
  while (y >= 0 || t === 0) {
    points.push({ x: x, y: y, t: t });

    // Update velocities with linear drag
    let ax = -b * vx / proj.mass;
    let ay = -g - (b * vy / proj.mass);

    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;

    if (y < 0) y = 0;
    t += dt;
    if (t > 30 || x > 500) break;
  }

  return points;
}

function calculateFullAeroTrajectory(vx0, vy0, proj) {
  // Full aerodynamic model: F_drag = 0.5 * rho * Cd * A * v^2
  let points = [];
  let x = 0;
  let y = 0;
  let vx = vx0;
  let vy = vy0;

  // Cross-sectional area
  let A = PI * proj.radius * proj.radius;

  let t = 0;
  while (y >= 0 || t === 0) {
    points.push({ x: x, y: y, t: t });

    // Speed and drag force
    let speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > 0) {
      let dragMag = 0.5 * airDensity * proj.dragCoeff * A * speed * speed;
      let ax = -(dragMag * vx / speed) / proj.mass;
      let ay = -g - (dragMag * vy / speed) / proj.mass;

      vx += ax * dt;
      vy += ay * dt;
    } else {
      vy -= g * dt;
    }

    x += vx * dt;
    y += vy * dt;

    if (y < 0) y = 0;
    t += dt;
    if (t > 30 || x > 500) break;
  }

  return points;
}

function draw() {
  // Update values from sliders
  launchAngle = angleSlider.value();
  initialVelocity = velocitySlider.value();
  airDensity = airDensitySlider.value();

  background(bgColor);

  // Draw test area (left side)
  drawTestArea();

  // Draw panel (right side)
  drawPanel();

  // Draw control labels
  drawControlLabels();
}

function drawTestArea() {
  // Sky background
  fill(135, 206, 235, 100);
  noStroke();
  rect(0, 0, testAreaWidth, drawHeight - 50);

  // Ground
  fill(groundColor);
  rect(0, drawHeight - 50, testAreaWidth, 50);

  // Grid lines
  stroke(100, 100, 100, 50);
  strokeWeight(1);
  for (let i = 0; i < testAreaWidth; i += 50) {
    line(i, 0, i, drawHeight - 50);
  }
  for (let i = 0; i < drawHeight - 50; i += 50) {
    line(0, i, testAreaWidth, i);
  }

  // Distance markers
  fill(200);
  textSize(10);
  textAlign(CENTER, TOP);
  for (let d = 0; d <= 100; d += 20) {
    let x = launcherX + d * scale;
    if (x < testAreaWidth - 20) {
      text(d + 'm', x, drawHeight - 45);
    }
  }

  // Draw launcher
  drawLauncher();

  // Draw trajectories
  if (isLaunched) {
    drawTrajectories();
    drawLandingMarkers();
  }

  // Draw prediction zones if multiple models active
  if (isLaunched && countActiveModels() > 1) {
    drawPredictionZones();
  }

  // Title
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Projectile Testing Area', 10, 10);

  // Current settings display
  textSize(11);
  fill(220);
  let settingsY = 30;
  text('Projectile: ' + projectiles[selectedProjectile].name, 10, settingsY);
  text('Angle: ' + launchAngle + '\u00B0 | Velocity: ' + initialVelocity + ' m/s', 10, settingsY + 15);
  text('Air Density: ' + airDensity.toFixed(2) + ' kg/m\u00B3', 10, settingsY + 30);
}

function drawLauncher() {
  let launcherLen = 40;
  let angleRad = radians(launchAngle);

  // Base
  fill(80);
  stroke(60);
  strokeWeight(2);
  ellipse(launcherX, launcherY, 30, 15);

  // Barrel
  stroke(100);
  strokeWeight(8);
  let endX = launcherX + launcherLen * cos(-angleRad);
  let endY = launcherY + launcherLen * sin(-angleRad);
  line(launcherX, launcherY, endX, endY);

  // Projectile at launch position (if not launched)
  if (!isLaunched) {
    fill(modelColors.noAir.main);
    noStroke();
    ellipse(endX, endY, 10, 10);
  }
}

function drawTrajectories() {
  let models = ['naive', 'noAir', 'linearAir', 'fullAero'];

  for (let model of models) {
    if (!activeModels[model] || trajectories[model].length < 2) continue;

    let col = modelColors[model];
    stroke(col.main);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let pt of trajectories[model]) {
      let screenX = launcherX + pt.x * scale;
      let screenY = launcherY - pt.y * scale;
      if (screenX < testAreaWidth) {
        vertex(screenX, screenY);
      }
    }
    endShape();
  }
}

function drawLandingMarkers() {
  let models = ['naive', 'noAir', 'linearAir', 'fullAero'];

  for (let model of models) {
    if (!activeModels[model] || trajectories[model].length < 2) continue;

    let lastPt = trajectories[model][trajectories[model].length - 1];
    let screenX = launcherX + lastPt.x * scale;
    let screenY = launcherY;

    if (screenX < testAreaWidth) {
      let col = modelColors[model];

      // Landing marker
      fill(col.light);
      stroke(col.main);
      strokeWeight(2);
      triangle(screenX, screenY - 15, screenX - 8, screenY - 25, screenX + 8, screenY - 25);

      // Distance label
      fill(col.light);
      noStroke();
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text(lastPt.x.toFixed(1) + 'm', screenX, screenY - 28);
    }
  }
}

function drawPredictionZones() {
  // Find where models agree vs disagree
  let models = ['naive', 'noAir', 'linearAir', 'fullAero'];
  let activeModelKeys = models.filter(m => activeModels[m] && trajectories[m].length > 0);

  if (activeModelKeys.length < 2) return;

  // Get landing positions
  let landings = {};
  for (let model of activeModelKeys) {
    let lastPt = trajectories[model][trajectories[model].length - 1];
    landings[model] = lastPt.x;
  }

  // Calculate spread
  let values = Object.values(landings);
  let minLanding = Math.min(...values);
  let maxLanding = Math.max(...values);
  let spread = maxLanding - minLanding;

  // Draw agreement zone indicator at bottom
  let zoneY = drawHeight - 45;
  let zoneHeight = 8;

  if (spread < 5) {
    // Models agree (green zone)
    fill(39, 174, 96, 150);
  } else if (spread < 20) {
    // Models somewhat disagree (yellow zone)
    fill(241, 196, 15, 150);
  } else {
    // Models strongly disagree (red zone)
    fill(231, 76, 60, 150);
  }

  noStroke();
  let zoneStartX = launcherX + minLanding * scale;
  let zoneWidth = spread * scale;
  rect(zoneStartX, zoneY, zoneWidth, zoneHeight, 2);
}

function drawPanel() {
  // Panel background
  fill(30, 30, 50);
  stroke(60, 60, 80);
  strokeWeight(1);
  rect(testAreaWidth, 0, panelWidth, drawHeight);

  let panelX = testAreaWidth + 15;
  let panelY = 15;

  // Title
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Model Selection', panelX, panelY);

  panelY += 25;

  // Model checkboxes with traffic lights
  let models = [
    { key: 'naive', name: 'Naive (straight down)' },
    { key: 'noAir', name: 'No air resistance' },
    { key: 'linearAir', name: 'Linear air resistance' },
    { key: 'fullAero', name: 'Full aerodynamic' }
  ];

  for (let model of models) {
    drawModelRow(panelX, panelY, model);
    panelY += 70;
  }

  // Legend
  panelY = drawHeight - 100;
  fill(200);
  textSize(11);
  text('Model Validity:', panelX, panelY);
  panelY += 18;

  // Green indicator
  fill(39, 174, 96);
  ellipse(panelX + 8, panelY + 6, 12, 12);
  fill(200);
  text('Accurate', panelX + 20, panelY);

  // Yellow indicator
  panelY += 18;
  fill(241, 196, 15);
  ellipse(panelX + 8, panelY + 6, 12, 12);
  fill(200);
  text('Approximate', panelX + 20, panelY);

  // Red indicator
  panelY += 18;
  fill(231, 76, 60);
  ellipse(panelX + 8, panelY + 6, 12, 12);
  fill(200);
  text('Inaccurate', panelX + 20, panelY);
}

function drawModelRow(x, y, model) {
  let col = modelColors[model.key];

  // Model color indicator
  fill(col.main);
  noStroke();
  rect(x, y, 4, 50, 2);

  // Checkbox area (clickable)
  let boxSize = 16;
  stroke(col.main);
  strokeWeight(2);
  fill(activeModels[model.key] ? col.main : 40);
  rect(x + 12, y + 2, boxSize, boxSize, 3);

  if (activeModels[model.key]) {
    stroke(255);
    strokeWeight(2);
    line(x + 15, y + 10, x + 19, y + 14);
    line(x + 19, y + 14, x + 25, y + 6);
  }

  // Model name
  fill(col.light);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text(model.name, x + 35, y + 3);

  // Traffic light indicator
  let validity = getModelValidity(model.key);
  let lightColor;
  if (validity === 'accurate') {
    lightColor = color(39, 174, 96);
  } else if (validity === 'approximate') {
    lightColor = color(241, 196, 15);
  } else {
    lightColor = color(231, 76, 60);
  }

  fill(lightColor);
  ellipse(x + panelWidth - 50, y + 10, 14, 14);

  // Explanation text
  fill(180);
  textSize(9);
  let explanation = getModelExplanation(model.key);

  // Word wrap
  let words = explanation.split(' ');
  let line1 = '';
  let line2 = '';
  let maxWidth = panelWidth - 50;

  for (let word of words) {
    if (textWidth(line1 + word) < maxWidth) {
      line1 += word + ' ';
    } else {
      line2 += word + ' ';
    }
  }

  text(line1.trim(), x + 12, y + 22);
  text(line2.trim(), x + 12, y + 34);
}

function getModelValidity(modelKey) {
  let proj = projectiles[selectedProjectile];
  let v = initialVelocity;
  let rho = airDensity;

  // Calculate Reynolds number-like factor
  let dragFactor = rho * proj.dragCoeff * proj.radius * v * v / proj.mass;

  switch (modelKey) {
    case 'naive':
      // Only valid for very low horizontal velocity or dropping
      if (launchAngle > 85 && v < 5) return 'accurate';
      if (launchAngle > 70 && v < 10) return 'approximate';
      return 'inaccurate';

    case 'noAir':
      // Valid in vacuum or for heavy, fast projectiles in thin air
      if (rho < 0.1) return 'accurate';
      if (selectedProjectile === 'bullet' && rho < 0.5) return 'accurate';
      if (dragFactor < 0.5) return 'approximate';
      if (selectedProjectile === 'feather') return 'inaccurate';
      return 'approximate';

    case 'linearAir':
      // Valid for low speeds
      if (v < 10 && rho > 0.5) return 'accurate';
      if (v < 20) return 'approximate';
      return 'inaccurate';

    case 'fullAero':
      // Generally accurate for most conditions
      if (rho > 0) return 'accurate';
      return 'approximate';
  }

  return 'approximate';
}

function getModelExplanation(modelKey) {
  let proj = projectiles[selectedProjectile];
  let v = initialVelocity;
  let rho = airDensity;

  switch (modelKey) {
    case 'naive':
      if (launchAngle > 85 && v < 5) {
        return 'Nearly vertical drop - model works here';
      }
      return 'Ignores horizontal motion - fails for angled launches';

    case 'noAir':
      if (rho < 0.1) {
        return 'Near-vacuum conditions - air drag negligible';
      }
      if (selectedProjectile === 'feather') {
        return 'Feather heavily affected by air - model fails';
      }
      if (selectedProjectile === 'bullet' && v > 50) {
        return 'High speed projectile - drag becomes significant';
      }
      return 'Ignores air resistance - accuracy depends on conditions';

    case 'linearAir':
      if (v > 30) {
        return 'Linear drag inaccurate at high speeds';
      }
      if (v < 10) {
        return 'Linear approximation works for low speeds';
      }
      return 'Simplified drag model - moderate accuracy';

    case 'fullAero':
      if (rho < 0.01) {
        return 'Near-vacuum - drag model not needed';
      }
      return 'Accounts for quadratic drag - most accurate';
  }

  return '';
}

function countActiveModels() {
  let count = 0;
  for (let key in activeModels) {
    if (activeModels[key]) count++;
  }
  return count;
}

function drawControlLabels() {
  fill(200);
  textSize(11);
  textAlign(LEFT, CENTER);

  let labelY = drawHeight + 22;
  text('Angle: ' + angleSlider.value() + '\u00B0', 10, labelY);
  text('Velocity: ' + velocitySlider.value() + ' m/s', 190, labelY);
  text('Air: ' + airDensitySlider.value().toFixed(2) + ' kg/m\u00B3', 365, labelY);
}

function mousePressed() {
  // Check if clicking on model checkboxes
  let panelX = testAreaWidth + 15;
  let panelY = 40;

  let models = ['naive', 'noAir', 'linearAir', 'fullAero'];

  for (let model of models) {
    let boxX = panelX + 12;
    let boxY = panelY + 2;
    let boxSize = 16;

    if (mouseX >= boxX && mouseX <= boxX + boxSize &&
        mouseY >= boxY && mouseY <= boxY + boxSize) {
      activeModels[model] = !activeModels[model];
      if (isLaunched) {
        // Recalculate if needed
      }
      return;
    }

    panelY += 70;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  launcherY = drawHeight - 50;

  // Reposition controls
  let controlY = drawHeight + 15;
  angleSlider.position(80, controlY);
  velocitySlider.position(250, controlY);
  airDensitySlider.position(420, controlY);
  projectileSelect.position(580, controlY - 3);

  let btnY = controlY + 25;
  launchBtn.position(10, btnY);
  resetBtn.position(80, btnY);
  toggleAllBtn.position(145, btnY);
}
