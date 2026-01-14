// Model Comparison Tool MicroSim
// Compare multiple physics models against various test cases
// Learn how scientific models are evaluated and selected

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout regions
let scenarioY = 0;
let scenarioHeight = 60;
let simulationY = 60;
let simulationHeight = 280;
let tableY = 340;
let tableHeight = 160;

// Model colors
const colors = {
  impetus: '#3B82F6',     // Blue
  commonSense: '#F59E0B', // Orange
  newtonian: '#10B981',   // Green
  actual: '#6B7280'       // Gray
};

const colorNames = {
  impetus: 'Impetus',
  commonSense: 'Common Sense',
  newtonian: 'Newtonian',
  actual: 'Actual'
};

// Models
const models = [
  {
    id: 'impetus',
    name: 'Impetus Model',
    era: 'Medieval',
    description: 'Objects move because they contain impetus, which gradually depletes'
  },
  {
    id: 'commonSense',
    name: 'Common Sense Model',
    era: 'Naive Physics',
    description: 'Objects need force to keep moving; heavy things fall faster'
  },
  {
    id: 'newtonian',
    name: 'Newtonian Model',
    era: 'Scientific',
    description: 'Objects in motion stay in motion; gravity accelerates all objects equally'
  }
];

// Test cases
const testCases = [
  {
    id: 'dropped',
    name: 'Ball Dropped from Tower',
    description: 'A ball is released from rest at the top of a tall tower',
    setup: { type: 'drop', height: 200 },
    predictions: {
      impetus: { correct: true, text: 'Falls straight down, speeds up as impetus drains', behavior: 'straight-accelerate' },
      commonSense: { correct: false, text: 'Heavy falls faster than light', behavior: 'weight-dependent' },
      newtonian: { correct: true, text: 'All objects accelerate equally at g', behavior: 'equal-acceleration' }
    }
  },
  {
    id: 'horizontal',
    name: 'Ball Thrown Horizontally',
    description: 'A ball is thrown horizontally from the edge of a cliff',
    setup: { type: 'horizontal', height: 150, velocity: 3 },
    predictions: {
      impetus: { correct: false, text: 'Moves forward until impetus runs out, then drops', behavior: 'impetus-path' },
      commonSense: { correct: false, text: 'Falls forward in direction of throw', behavior: 'diagonal-fall' },
      newtonian: { correct: true, text: 'Follows parabolic arc - constant horizontal, accelerating vertical', behavior: 'parabola' }
    }
  },
  {
    id: 'frictionless',
    name: 'Ball on Frictionless Ice',
    description: 'A ball is pushed and released on perfectly frictionless ice',
    setup: { type: 'slide', velocity: 4 },
    predictions: {
      impetus: { correct: false, text: 'Gradually slows as impetus depletes', behavior: 'slow-stop' },
      commonSense: { correct: false, text: 'Stops when push force runs out', behavior: 'quick-stop' },
      newtonian: { correct: true, text: 'Maintains constant velocity forever', behavior: 'constant-velocity' }
    }
  },
  {
    id: 'moon',
    name: 'Projectile on Moon (no air)',
    description: 'A ball is launched at 45 degrees on the Moon with no atmosphere',
    setup: { type: 'projectile', angle: 45, velocity: 4, gravity: 0.3 },
    predictions: {
      impetus: { correct: false, text: 'Rises until impetus depletes, then falls straight down', behavior: 'rise-fall-straight' },
      commonSense: { correct: false, text: 'Should fall faster because no air to hold it up', behavior: 'fast-fall' },
      newtonian: { correct: true, text: 'Symmetric parabola, lower gravity means longer flight', behavior: 'low-gravity-parabola' }
    }
  },
  {
    id: 'car',
    name: 'Car After Engine Off',
    description: 'A car coasting after the engine is turned off (minimal friction)',
    setup: { type: 'coast', velocity: 5 },
    predictions: {
      impetus: { correct: false, text: 'Slows gradually as motion-force depletes', behavior: 'gradual-stop' },
      commonSense: { correct: false, text: 'Should stop since nothing is pushing it', behavior: 'immediate-stop' },
      newtonian: { correct: true, text: 'Would continue forever without friction; slows due to real friction', behavior: 'slow-friction' }
    }
  }
];

// Simulation state
let currentTestCase = null;
let animationTime = 0;
let animationSpeed = 1;
let isPlaying = false;
let testResults = {}; // Track which tests have been run
let expandedExplanation = null;

// Animation objects for each model
let objects = {
  impetus: null,
  commonSense: null,
  newtonian: null,
  actual: null
};

// UI elements
let speedSlider;
let playBtn, resetBtn;
let testButtons = [];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth - 20;
  }
  canvasWidth = max(700, min(canvasWidth, 1100));
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  textFont('Arial');
  createControls();
}

function createControls() {
  let btnX = 10;
  let btnY = drawHeight + 12;

  // Play/Pause button
  playBtn = createButton('Play');
  playBtn.position(btnX, btnY);
  playBtn.mousePressed(togglePlay);
  styleButton(playBtn, '#10B981');
  btnX += 70;

  // Reset button
  resetBtn = createButton('Reset');
  resetBtn.position(btnX, btnY);
  resetBtn.mousePressed(resetAnimation);
  styleButton(resetBtn, '#EF4444');
  btnX += 70;

  // Speed slider
  btnX += 20;
  speedSlider = createSlider(0.2, 2, 1, 0.1);
  speedSlider.position(btnX + 60, btnY + 2);
  speedSlider.style('width', '100px');

  // Test case buttons
  btnX = canvasWidth - 400;
  for (let i = 0; i < testCases.length; i++) {
    let btn = createButton((i + 1).toString());
    btn.position(btnX + i * 40, btnY);
    btn.mousePressed(() => selectTestCase(i));
    btn.style('width', '35px');
    btn.style('height', '26px');
    btn.style('background-color', '#374151');
    btn.style('color', 'white');
    btn.style('border', 'none');
    btn.style('border-radius', '4px');
    btn.style('cursor', 'pointer');
    btn.style('font-weight', 'bold');
    testButtons.push(btn);
  }
}

function styleButton(btn, btnColor) {
  btn.style('background-color', btnColor);
  btn.style('color', 'white');
  btn.style('border', 'none');
  btn.style('padding', '6px 14px');
  btn.style('border-radius', '4px');
  btn.style('cursor', 'pointer');
  btn.style('font-weight', 'bold');
}

function togglePlay() {
  if (!currentTestCase) {
    selectTestCase(0);
  }
  isPlaying = !isPlaying;
  playBtn.html(isPlaying ? 'Pause' : 'Play');
}

function resetAnimation() {
  animationTime = 0;
  isPlaying = false;
  playBtn.html('Play');
  initializeObjects();
}

function selectTestCase(index) {
  currentTestCase = testCases[index];
  animationTime = 0;
  isPlaying = false;
  playBtn.html('Play');
  expandedExplanation = null;
  initializeObjects();

  // Update button styles
  for (let i = 0; i < testButtons.length; i++) {
    if (i === index) {
      testButtons[i].style('background-color', '#3B82F6');
    } else {
      testButtons[i].style('background-color', '#374151');
    }
  }
}

function initializeObjects() {
  if (!currentTestCase) return;

  let testSetup = currentTestCase.setup;
  let panelWidth = (canvasWidth - 80) / 4;

  // Initialize starting positions for each panel
  let modelKeys = ['impetus', 'commonSense', 'newtonian', 'actual'];

  for (let i = 0; i < modelKeys.length; i++) {
    let key = modelKeys[i];
    let panelX = 20 + i * panelWidth + panelWidth / 2;

    objects[key] = {
      x: panelX,
      y: simulationY + 40,
      vx: 0,
      vy: 0,
      startX: panelX,
      startY: simulationY + 40
    };

    // Set initial position based on test case type
    switch(testSetup.type) {
      case 'drop':
        objects[key].y = simulationY + 50;
        break;
      case 'horizontal':
        objects[key].y = simulationY + 50;
        objects[key].vx = testSetup.velocity;
        break;
      case 'slide':
        objects[key].y = simulationY + simulationHeight - 50;
        objects[key].vx = testSetup.velocity;
        break;
      case 'projectile':
        objects[key].y = simulationY + simulationHeight - 50;
        objects[key].vx = testSetup.velocity * cos(radians(testSetup.angle));
        objects[key].vy = -testSetup.velocity * sin(radians(testSetup.angle));
        break;
      case 'coast':
        objects[key].y = simulationY + simulationHeight - 50;
        objects[key].vx = testSetup.velocity;
        break;
    }

    objects[key].startX = objects[key].x;
    objects[key].startY = objects[key].y;
    objects[key].startVx = objects[key].vx;
    objects[key].startVy = objects[key].vy;
  }
}

function draw() {
  background('#1a1a2e');

  animationSpeed = speedSlider.value();

  // Draw scenario selection area
  drawScenarioArea();

  // Draw simulation panels
  drawSimulationPanels();

  // Draw comparison table
  drawComparisonTable();

  // Draw control labels
  drawControlLabels();

  // Update animation
  if (isPlaying && currentTestCase) {
    updateAnimation();
  }
}

function drawScenarioArea() {
  // Background
  fill(30, 30, 50);
  stroke(60, 60, 80);
  strokeWeight(1);
  rect(10, scenarioY + 5, canvasWidth - 20, scenarioHeight - 5, 8);

  // Title
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  noStroke();
  text('Test Case Selection:', 20, scenarioY + 15);

  // Current test case info
  if (currentTestCase) {
    fill(200);
    textSize(16);
    text(currentTestCase.name, 180, scenarioY + 13);

    textSize(11);
    fill(160);
    text(currentTestCase.description, 20, scenarioY + 38);
  } else {
    fill(150);
    textSize(12);
    text('Select a test case using the numbered buttons below', 180, scenarioY + 18);
  }
}

function drawSimulationPanels() {
  let panelWidth = (canvasWidth - 80) / 4;
  let modelKeys = ['impetus', 'commonSense', 'newtonian', 'actual'];
  let modelLabels = ['Impetus Model', 'Common Sense', 'Newtonian', 'Actual Result'];
  let eras = ['Medieval', 'Naive Physics', 'Scientific', 'Reality'];

  for (let i = 0; i < 4; i++) {
    let x = 20 + i * panelWidth;
    let key = modelKeys[i];
    let col = color(colors[key]);

    // Panel background
    fill(25, 25, 40);
    stroke(col);
    strokeWeight(2);
    rect(x, simulationY, panelWidth - 10, simulationHeight, 8);

    // Panel header
    fill(col);
    noStroke();
    rect(x, simulationY, panelWidth - 10, 28, 8, 8, 0, 0);

    // Model name
    fill(255);
    textSize(11);
    textAlign(CENTER, TOP);
    text(modelLabels[i], x + panelWidth / 2 - 5, simulationY + 5);

    // Era label
    fill(200);
    textSize(9);
    text('(' + eras[i] + ')', x + panelWidth / 2 - 5, simulationY + 17);

    // Draw ground/reference based on test case
    if (currentTestCase) {
      drawTestSetup(x, key, panelWidth - 10);
    }

    // Draw object
    if (objects[key]) {
      fill(col);
      noStroke();
      ellipse(objects[key].x, objects[key].y, 20, 20);

      // Trail effect
      if (isPlaying || animationTime > 0) {
        stroke(col);
        strokeWeight(1);
        noFill();
        // Draw velocity indicator
        if (abs(objects[key].vx) > 0.1 || abs(objects[key].vy) > 0.1) {
          let arrowLen = 15;
          let arrowAngle = atan2(objects[key].vy, objects[key].vx);
          line(objects[key].x, objects[key].y,
               objects[key].x + arrowLen * cos(arrowAngle),
               objects[key].y + arrowLen * sin(arrowAngle));
        }
      }
    }

    // Prediction text
    if (currentTestCase) {
      let pred = currentTestCase.predictions[key];
      if (pred) {
        fill(180);
        textSize(9);
        textAlign(CENTER, TOP);

        // Word wrap the prediction text
        let words = pred.text.split(' ');
        let lines = [];
        let currentLine = '';
        let maxWidth = panelWidth - 30;

        for (let word of words) {
          let testLine = currentLine + (currentLine ? ' ' : '') + word;
          if (textWidth(testLine) > maxWidth) {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);

        let textY = simulationY + simulationHeight - 50;
        for (let ln of lines) {
          text(ln, x + panelWidth / 2 - 5, textY);
          textY += 12;
        }

        // Correctness indicator
        if (animationTime > 100) {
          let iconY = simulationY + simulationHeight - 10;
          if (key === 'actual') {
            // No indicator for actual
          } else if (pred.correct) {
            fill(16, 185, 129);
            textSize(16);
            text('\u2713', x + panelWidth / 2 - 5, iconY - 15);
          } else {
            fill(239, 68, 68);
            textSize(16);
            text('\u2717', x + panelWidth / 2 - 5, iconY - 15);
          }
        }
      }
    }
  }
}

function drawTestSetup(panelX, modelKey, panelW) {
  if (!currentTestCase) return;

  let testSetup = currentTestCase.setup;
  let groundY = simulationY + simulationHeight - 30;

  switch(testSetup.type) {
    case 'drop':
      // Tower
      fill(80, 60, 40);
      noStroke();
      rect(panelX + 10, simulationY + 35, 20, groundY - simulationY - 35);
      // Platform
      fill(100, 80, 60);
      rect(panelX + 5, simulationY + 35, 40, 10);
      // Ground
      fill(60, 80, 60);
      rect(panelX, groundY, panelW, 5);
      break;

    case 'horizontal':
      // Cliff
      fill(80, 70, 60);
      noStroke();
      rect(panelX, simulationY + 35, 35, groundY - simulationY - 35);
      fill(100, 90, 80);
      rect(panelX, simulationY + 35, 45, 10);
      // Ground
      fill(60, 80, 60);
      rect(panelX + 40, groundY, panelW - 40, 5);
      break;

    case 'slide':
      // Ice surface
      fill(150, 200, 230);
      noStroke();
      rect(panelX, groundY, panelW, 8);
      // Ice texture lines
      stroke(180, 220, 250);
      strokeWeight(1);
      for (let j = 0; j < panelW; j += 15) {
        line(panelX + j, groundY + 2, panelX + j + 8, groundY + 6);
      }
      break;

    case 'projectile':
      // Moon surface
      fill(80, 80, 80);
      noStroke();
      rect(panelX, groundY, panelW, 8);
      // Craters
      fill(60, 60, 60);
      ellipse(panelX + 30, groundY + 4, 15, 6);
      ellipse(panelX + panelW - 40, groundY + 4, 20, 8);
      // Stars
      fill(255);
      for (let j = 0; j < 5; j++) {
        let sx = panelX + 10 + j * (panelW / 5);
        let sy = simulationY + 40 + (j % 3) * 20;
        ellipse(sx, sy, 2, 2);
      }
      break;

    case 'coast':
      // Road
      fill(50, 50, 50);
      noStroke();
      rect(panelX, groundY - 5, panelW, 15);
      // Road lines
      stroke(200, 200, 100);
      strokeWeight(2);
      for (let j = 0; j < panelW; j += 30) {
        line(panelX + j, groundY + 2, panelX + j + 15, groundY + 2);
      }
      break;
  }
}

function updateAnimation() {
  animationTime += animationSpeed;

  if (!currentTestCase || !objects.actual) return;

  let testSetup = currentTestCase.setup;
  let dt = 0.5 * animationSpeed;
  let g = testSetup.gravity || 0.5;
  let panelWidth = (canvasWidth - 80) / 4;
  let groundY = simulationY + simulationHeight - 35;

  // Update each model's physics
  updateImpetusModel(dt, g, groundY, panelWidth);
  updateCommonSenseModel(dt, g, groundY, panelWidth);
  updateNewtonianModel(dt, g, groundY, panelWidth);
  updateActualModel(dt, g, groundY, panelWidth);

  // Record result when animation completes
  if (animationTime > 150) {
    if (!testResults[currentTestCase.id]) {
      testResults[currentTestCase.id] = {
        impetus: currentTestCase.predictions.impetus.correct,
        commonSense: currentTestCase.predictions.commonSense.correct,
        newtonian: currentTestCase.predictions.newtonian.correct
      };
    }
    isPlaying = false;
    playBtn.html('Play');
  }
}

function updateImpetusModel(dt, g, groundY, panelWidth) {
  let obj = objects.impetus;
  if (!obj || obj.y >= groundY) return;

  let pred = currentTestCase.predictions.impetus;

  switch(pred.behavior) {
    case 'straight-accelerate':
      // Falls straight down, accelerating
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'impetus-path':
      // Move forward, then impetus depletes and falls
      if (animationTime < 60) {
        obj.x += obj.startVx * dt * 0.8;
        obj.vx = obj.startVx * (1 - animationTime / 80);
      } else {
        obj.vx = 0;
        obj.vy += g * dt;
        obj.y += obj.vy * dt;
      }
      break;

    case 'slow-stop':
      // Gradually loses velocity
      obj.vx *= 0.98;
      obj.x += obj.vx * dt;
      break;

    case 'rise-fall-straight':
      // Rise then fall straight down
      if (animationTime < 40) {
        obj.x += obj.startVx * dt * 0.5;
        obj.y -= 2 * dt;
      } else {
        obj.vx = 0;
        obj.vy += g * dt;
        obj.y += obj.vy * dt;
      }
      break;

    case 'gradual-stop':
      // Car gradually loses impetus
      obj.vx *= 0.97;
      obj.x += obj.vx * dt;
      break;
  }

  obj.y = min(obj.y, groundY);
  constrainToPanel(obj, 0, panelWidth);
}

function updateCommonSenseModel(dt, g, groundY, panelWidth) {
  let obj = objects.commonSense;
  if (!obj || obj.y >= groundY) return;

  let pred = currentTestCase.predictions.commonSense;

  switch(pred.behavior) {
    case 'weight-dependent':
      // Falls but at different speed (as if heavier = faster)
      obj.vy += g * 1.3 * dt;
      obj.y += obj.vy * dt;
      break;

    case 'diagonal-fall':
      // Falls in direction of throw
      obj.x += obj.startVx * dt * 0.5;
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'quick-stop':
      // Stops quickly after push removed
      if (animationTime < 30) {
        obj.x += obj.startVx * dt;
      }
      // Then stops
      break;

    case 'fast-fall':
      // Falls faster than it should
      obj.x += obj.vx * dt;
      obj.vy += g * 1.5 * dt;
      obj.y += obj.vy * dt;
      obj.vx *= 0.98;
      break;

    case 'immediate-stop':
      // Stops almost immediately
      if (animationTime < 15) {
        obj.x += obj.startVx * dt * 0.3;
      }
      break;
  }

  obj.y = min(obj.y, groundY);
  constrainToPanel(obj, 1, panelWidth);
}

function updateNewtonianModel(dt, g, groundY, panelWidth) {
  let obj = objects.newtonian;
  if (!obj) return;

  let pred = currentTestCase.predictions.newtonian;

  switch(pred.behavior) {
    case 'equal-acceleration':
      // Standard gravity
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'parabola':
      // Projectile motion
      obj.x += obj.vx * dt;
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'constant-velocity':
      // No friction = constant velocity forever
      obj.x += obj.startVx * dt;
      break;

    case 'low-gravity-parabola':
      // Projectile on Moon
      obj.x += obj.vx * dt;
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'slow-friction':
      // Slows due to friction
      obj.vx *= 0.995;
      obj.x += obj.vx * dt;
      break;
  }

  obj.y = min(obj.y, groundY);
  constrainToPanel(obj, 2, panelWidth);
}

function updateActualModel(dt, g, groundY, panelWidth) {
  // Actual always matches Newtonian for these cases
  let obj = objects.actual;
  if (!obj) return;

  // Mirror Newtonian physics (reality matches Newton for these scenarios)
  let pred = currentTestCase.predictions.newtonian;

  switch(pred.behavior) {
    case 'equal-acceleration':
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'parabola':
      obj.x += obj.vx * dt;
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'constant-velocity':
      obj.x += obj.startVx * dt;
      break;

    case 'low-gravity-parabola':
      obj.x += obj.vx * dt;
      obj.vy += g * dt;
      obj.y += obj.vy * dt;
      break;

    case 'slow-friction':
      obj.vx *= 0.995;
      obj.x += obj.vx * dt;
      break;
  }

  obj.y = min(obj.y, groundY);
  constrainToPanel(obj, 3, panelWidth);
}

function constrainToPanel(obj, panelIndex, panelWidth) {
  let panelX = 20 + panelIndex * panelWidth;
  obj.x = constrain(obj.x, panelX + 15, panelX + panelWidth - 25);
}

function drawComparisonTable() {
  let tableX = 15;
  let tableW = canvasWidth - 30;

  // Background
  fill(25, 25, 45);
  stroke(60, 60, 80);
  strokeWeight(1);
  rect(tableX, tableY, tableW, tableHeight, 8);

  // Title
  fill(255);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text('Comparison Summary', tableX + 15, tableY + 8);

  // Score display
  let scores = { impetus: 0, commonSense: 0, newtonian: 0, total: 0 };
  for (let testId in testResults) {
    let result = testResults[testId];
    if (result.impetus) scores.impetus++;
    if (result.commonSense) scores.commonSense++;
    if (result.newtonian) scores.newtonian++;
    scores.total++;
  }

  // Score text
  textSize(11);
  textAlign(RIGHT, TOP);
  if (scores.total > 0) {
    fill(colors.impetus);
    text('Impetus: ' + scores.impetus + '/' + scores.total, tableX + tableW - 200, tableY + 8);
    fill(colors.commonSense);
    text('Common: ' + scores.commonSense + '/' + scores.total, tableX + tableW - 100, tableY + 8);
    fill(colors.newtonian);
    text('Newton: ' + scores.newtonian + '/' + scores.total, tableX + tableW - 10, tableY + 8);
  }

  // Table headers
  let headerY = tableY + 30;
  let rowHeight = 22;
  let colX = [tableX + 15, tableX + 200, tableX + 310, tableX + 420];

  fill(180);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Test Case', colX[0], headerY);

  fill(colors.impetus);
  text('Impetus', colX[1], headerY);
  fill(colors.commonSense);
  text('Common Sense', colX[2], headerY);
  fill(colors.newtonian);
  text('Newtonian', colX[3], headerY);

  // Separator line
  stroke(60, 60, 80);
  line(tableX + 10, headerY + 15, tableX + tableW - 10, headerY + 15);

  // Table rows
  let rowY = headerY + 22;

  for (let tc of testCases) {
    // Test case name
    fill(testResults[tc.id] ? 220 : 100);
    textSize(10);
    textAlign(LEFT, TOP);
    noStroke();

    let displayName = tc.name;
    if (displayName.length > 25) {
      displayName = displayName.substring(0, 22) + '...';
    }
    text(displayName, colX[0], rowY);

    // Results
    if (testResults[tc.id]) {
      // Impetus result
      drawResultIcon(colX[1] + 30, rowY + 5, tc.predictions.impetus.correct);
      // Common Sense result
      drawResultIcon(colX[2] + 45, rowY + 5, tc.predictions.commonSense.correct);
      // Newtonian result
      drawResultIcon(colX[3] + 30, rowY + 5, tc.predictions.newtonian.correct);
    } else {
      fill(80);
      text('--', colX[1] + 25, rowY);
      text('--', colX[2] + 40, rowY);
      text('--', colX[3] + 25, rowY);
    }

    rowY += rowHeight;
  }

  // "Why did model fail?" section
  if (currentTestCase && animationTime > 100) {
    drawExplanationSection(tableX + tableW - 250, tableY + 30);
  }
}

function drawResultIcon(x, y, correct) {
  noStroke();
  if (correct) {
    fill(16, 185, 129);
    ellipse(x, y, 14, 14);
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('\u2713', x, y - 1);
  } else {
    fill(239, 68, 68);
    ellipse(x, y, 14, 14);
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('\u2717', x, y - 1);
  }
}

function drawExplanationSection(x, y) {
  // Draw expandable "Why did model fail?" buttons
  textSize(9);
  textAlign(LEFT, TOP);

  let btnY = y;
  let modelKeys = ['impetus', 'commonSense'];

  for (let key of modelKeys) {
    let pred = currentTestCase.predictions[key];
    if (!pred.correct) {
      fill(colors[key]);
      text('? Why ' + (key === 'impetus' ? 'Impetus' : 'Common Sense') + ' failed', x, btnY);

      if (expandedExplanation === key) {
        fill(150);
        textSize(8);
        let explainText = getFailureExplanation(key);
        text(explainText, x, btnY + 12, 230, 50);
      }

      btnY += expandedExplanation === key ? 50 : 15;
    }
  }
}

function getFailureExplanation(modelKey) {
  if (!currentTestCase) return '';

  switch(currentTestCase.id) {
    case 'dropped':
      if (modelKey === 'commonSense') {
        return 'Galileo showed all objects fall at the same rate regardless of mass (in a vacuum). Air resistance, not weight, causes feathers to fall slowly.';
      }
      break;
    case 'horizontal':
      if (modelKey === 'impetus') {
        return 'The impetus theory incorrectly predicted objects move forward then drop. Newton showed horizontal and vertical motions are independent.';
      }
      if (modelKey === 'commonSense') {
        return 'Objects do not fall "in the direction of throw." Gravity always acts downward while horizontal motion continues.';
      }
      break;
    case 'frictionless':
      if (modelKey === 'impetus') {
        return 'Impetus wrongly assumed motion requires a continual internal force. Without friction, no force is needed to maintain motion.';
      }
      if (modelKey === 'commonSense') {
        return 'Objects do not need a push to keep moving. Newtons First Law: objects in motion stay in motion unless acted upon by a force.';
      }
      break;
    case 'moon':
      if (modelKey === 'impetus') {
        return 'The symmetric parabola, not the rise-then-drop path, matches observations. The impetus idea cannot explain why objects do not fall straight.';
      }
      if (modelKey === 'commonSense') {
        return 'Air does not hold objects up. The Moon has 1/6 Earth gravity, so projectiles fly higher and farther, not faster.';
      }
      break;
    case 'car':
      if (modelKey === 'impetus') {
        return 'A car does not have "impetus" that depletes. It slows because of real friction forces, not internal force depletion.';
      }
      if (modelKey === 'commonSense') {
        return 'Objects do not stop simply because nothing is pushing. Without friction, a car would coast forever.';
      }
      break;
  }
  return '';
}

function drawControlLabels() {
  fill(200);
  textSize(11);
  textAlign(LEFT, CENTER);
  noStroke();

  let labelY = drawHeight + 25;

  // Speed label
  text('Speed:', canvasWidth - 320, labelY);
  text(speedSlider.value().toFixed(1) + 'x', canvasWidth - 160, labelY);

  // Test buttons label
  text('Tests:', canvasWidth - 450, labelY);
}

function mousePressed() {
  // Check for clicking on explanation toggles
  if (currentTestCase && animationTime > 100) {
    let tableX = 15;
    let tableW = canvasWidth - 30;
    let x = tableX + tableW - 250;
    let y = tableY + 30;

    let modelKeys = ['impetus', 'commonSense'];
    let btnY = y;

    for (let key of modelKeys) {
      let pred = currentTestCase.predictions[key];
      if (!pred.correct) {
        if (mouseX > x && mouseX < x + 150 &&
            mouseY > btnY && mouseY < btnY + 15) {
          expandedExplanation = expandedExplanation === key ? null : key;
          return;
        }
        btnY += expandedExplanation === key ? 50 : 15;
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition controls
  let btnY = drawHeight + 12;
  playBtn.position(10, btnY);
  resetBtn.position(80, btnY);
  speedSlider.position(230, btnY + 2);

  // Reposition test buttons
  for (let i = 0; i < testButtons.length; i++) {
    testButtons[i].position(canvasWidth - 400 + i * 40, btnY);
  }

  // Reinitialize objects if test case selected
  if (currentTestCase) {
    initializeObjects();
  }
}
