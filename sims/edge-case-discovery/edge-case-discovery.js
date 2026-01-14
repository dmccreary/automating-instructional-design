// Edge Case Discovery Simulator MicroSim
// Students identify potential edge cases by experimenting with parameter boundaries

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Layout proportions
let simAreaWidth;
let controlPanelX;
let controlPanelWidth;

// Ball physics
let ball = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  radius: 20
};

// Container bounds
let container = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

// Parameter defaults
const defaults = {
  gravity: 9.8,
  radius: 20,
  bounciness: 0.8,
  speed: 100
};

// Current parameters
let gravity = defaults.gravity;
let ballRadius = defaults.radius;
let bounciness = defaults.bounciness;
let initialSpeed = defaults.speed;

// Sliders
let gravitySlider, radiusSlider, bouncinessSlider, speedSlider;

// Edge case log
let edgeCaseLog = [];
let maxLogEntries = 50;
let logScrollOffset = 0;

// Energy tracking
let initialEnergy = 0;
let currentEnergy = 0;
let energyIncreaseCount = 0;

// Performance tracking
let lastFrameTime = 0;
let frameCount = 0;

// Animation state
let isRunning = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  // Initialize ball
  resetBall();

  describe('Edge Case Discovery Simulator with a bouncing ball physics simulation. Adjust parameters to discover edge cases like negative gravity, oversized ball, energy gain, and tunneling.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate layout
  simAreaWidth = floor(canvasWidth * 0.7);
  controlPanelX = simAreaWidth;
  controlPanelWidth = canvasWidth - simAreaWidth;

  // Update container bounds
  container.x = margin + 10;
  container.y = 50;
  container.width = simAreaWidth - margin * 2 - 20;
  container.height = drawHeight - 80;

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw simulation area
  drawSimulationArea();

  // Draw control panel
  drawControlPanel();

  // Update physics
  if (isRunning) {
    updatePhysics();
    detectEdgeCases();
  }

  // Draw instructions
  fill('#666');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Adjust sliders to discover edge cases. Log button saves current state.',
       canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawSimulationArea() {
  // Title
  fill('#333');
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text('Bouncing Ball Simulation', simAreaWidth / 2, 10);

  // Container
  fill(255);
  stroke('#333');
  strokeWeight(2);
  rect(container.x, container.y, container.width, container.height);

  // Ball
  let ballColor = color('#4CAF50');

  // Warning color if edge case conditions
  if (ball.radius * 2 > container.width || ball.radius * 2 > container.height) {
    ballColor = color('#F44336');
  } else if (bounciness > 1) {
    ballColor = color('#FF9800');
  } else if (gravity < 0) {
    ballColor = color('#2196F3');
  }

  fill(ballColor);
  stroke('#333');
  strokeWeight(1);
  ellipse(ball.x, ball.y, ball.radius * 2, ball.radius * 2);

  // Velocity vector
  let velScale = 0.2;
  let vx = ball.vx * velScale;
  let vy = ball.vy * velScale;
  let velMag = sqrt(vx * vx + vy * vy);

  if (velMag > 5) {
    stroke('#E91E63');
    strokeWeight(2);
    line(ball.x, ball.y, ball.x + vx, ball.y + vy);

    // Arrowhead
    let angle = atan2(vy, vx);
    let arrowSize = 8;
    fill('#E91E63');
    noStroke();
    push();
    translate(ball.x + vx, ball.y + vy);
    rotate(angle);
    triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
    pop();
  }

  // Parameter display
  fill('#333');
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  let infoY = container.y + container.height + 8;
  text('Gravity: ' + gravity.toFixed(1), container.x, infoY);
  text('Radius: ' + ballRadius.toFixed(0), container.x + 100, infoY);
  text('Bounce: ' + bounciness.toFixed(2), container.x + 180, infoY);
  text('Speed: ' + sqrt(ball.vx*ball.vx + ball.vy*ball.vy).toFixed(0), container.x + 270, infoY);
}

function drawControlPanel() {
  // Panel background
  fill('#f5f5f5');
  stroke('#ddd');
  strokeWeight(1);
  rect(controlPanelX, 0, controlPanelWidth, drawHeight);

  // Panel title
  fill('#333');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Parameters', controlPanelX + controlPanelWidth / 2, 10);
  textStyle(NORMAL);

  let sliderX = controlPanelX + 10;
  let sliderWidth = controlPanelWidth - 20;
  let labelX = controlPanelX + 10;

  // Gravity slider
  textSize(11);
  textAlign(LEFT, TOP);
  fill('#333');
  text('Gravity: ' + gravity.toFixed(1), labelX, 35);
  fill(gravity < 0 ? '#F44336' : '#666');
  text('(-10 to 10)', labelX + 80, 35);

  drawSlider(sliderX, 50, sliderWidth, -10, 10, gravity, 'gravity');

  // Radius slider
  fill('#333');
  text('Ball Radius: ' + ballRadius.toFixed(0), labelX, 80);
  fill(ballRadius * 2 > min(container.width, container.height) ? '#F44336' : '#666');
  text('(1 to 200)', labelX + 90, 80);

  drawSlider(sliderX, 95, sliderWidth, 1, 200, ballRadius, 'radius');

  // Bounciness slider
  fill('#333');
  text('Bounciness: ' + bounciness.toFixed(2), labelX, 125);
  fill(bounciness > 1 ? '#FF9800' : '#666');
  text('(0 to 2)', labelX + 100, 125);

  drawSlider(sliderX, 140, sliderWidth, 0, 2, bounciness, 'bounciness');

  // Speed slider
  fill('#333');
  text('Initial Speed: ' + initialSpeed.toFixed(0), labelX, 170);
  fill(initialSpeed > 500 ? '#FF9800' : '#666');
  text('(0 to 1000)', labelX + 100, 170);

  drawSlider(sliderX, 185, sliderWidth, 0, 1000, initialSpeed, 'speed');

  // Buttons
  let btnWidth = (sliderWidth - 10) / 2;
  let btnY = 215;

  // Log State button
  drawButton(sliderX, btnY, btnWidth, 25, 'Log State', '#4CAF50');

  // Reset button
  drawButton(sliderX + btnWidth + 10, btnY, btnWidth, 25, 'Reset', '#2196F3');

  // Restart ball button
  drawButton(sliderX, btnY + 35, sliderWidth, 25, 'Restart Ball', '#FF9800');

  // Edge case log
  fill('#333');
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Edge Case Log:', labelX, 285);
  textStyle(NORMAL);

  // Log area
  fill(255);
  stroke('#ccc');
  strokeWeight(1);
  let logHeight = drawHeight - 305;
  rect(sliderX, 300, sliderWidth, logHeight);

  // Draw log entries
  fill('#333');
  textSize(10);
  let logY = 305;
  let visibleEntries = floor(logHeight / 14);
  let startIdx = max(0, edgeCaseLog.length - visibleEntries - logScrollOffset);
  let endIdx = min(edgeCaseLog.length, startIdx + visibleEntries);

  for (let i = startIdx; i < endIdx; i++) {
    let entry = edgeCaseLog[i];
    if (entry.startsWith('EDGE CASE:')) {
      fill('#F44336');
    } else if (entry.startsWith('[LOG]')) {
      fill('#4CAF50');
    } else {
      fill('#666');
    }
    text(entry, sliderX + 5, logY, sliderWidth - 10, 14);
    logY += 14;
  }
}

function drawSlider(x, y, w, minVal, maxVal, currentVal, id) {
  let sliderHeight = 16;

  // Track
  fill('#ddd');
  noStroke();
  rect(x, y, w, sliderHeight, 3);

  // Fill
  let fillRatio = (currentVal - minVal) / (maxVal - minVal);
  let fillColor = color('#4CAF50');

  if (id === 'gravity' && currentVal < 0) fillColor = color('#F44336');
  if (id === 'bounciness' && currentVal > 1) fillColor = color('#FF9800');
  if (id === 'radius' && currentVal * 2 > min(container.width, container.height)) fillColor = color('#F44336');
  if (id === 'speed' && currentVal > 500) fillColor = color('#FF9800');

  fill(fillColor);
  rect(x, y, w * fillRatio, sliderHeight, 3);

  // Handle
  let handleX = x + w * fillRatio;
  fill(255);
  stroke('#333');
  strokeWeight(1);
  ellipse(handleX, y + sliderHeight / 2, 14, 14);
}

function drawButton(x, y, w, h, label, bgColor) {
  let isHovered = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

  fill(isHovered ? lerpColor(color(bgColor), color(255), 0.3) : bgColor);
  stroke(isHovered ? '#333' : '#666');
  strokeWeight(1);
  rect(x, y, w, h, 5);

  fill('white');
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function updatePhysics() {
  // Apply gravity (scaled for pixel units)
  let gravityScale = 0.5;
  ball.vy += gravity * gravityScale;

  // Update position
  ball.x += ball.vx * 0.016; // ~60fps timestep
  ball.y += ball.vy * 0.016;

  // Wall collisions
  let leftWall = container.x + ball.radius;
  let rightWall = container.x + container.width - ball.radius;
  let topWall = container.y + ball.radius;
  let bottomWall = container.y + container.height - ball.radius;

  // Left wall
  if (ball.x < leftWall) {
    ball.x = leftWall;
    ball.vx = -ball.vx * bounciness;
  }

  // Right wall
  if (ball.x > rightWall) {
    ball.x = rightWall;
    ball.vx = -ball.vx * bounciness;
  }

  // Top wall
  if (ball.y < topWall) {
    ball.y = topWall;
    ball.vy = -ball.vy * bounciness;
  }

  // Bottom wall
  if (ball.y > bottomWall) {
    ball.y = bottomWall;
    ball.vy = -ball.vy * bounciness;
  }

  // Update ball radius from slider
  ball.radius = ballRadius;

  // Calculate current energy for comparison
  let speed = sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
  currentEnergy = 0.5 * speed * speed + gravity * (container.y + container.height - ball.y);
}

function detectEdgeCases() {
  let timestamp = getTimestamp();

  // Check for ball escape (tunneling)
  if (ball.x < container.x || ball.x > container.x + container.width ||
      ball.y < container.y || ball.y > container.y + container.height) {
    addLogEntry('EDGE CASE: Ball escaped container (tunneling)');
    resetBall();
  }

  // Check for oversized ball
  if (ball.radius * 2 > container.width || ball.radius * 2 > container.height) {
    // Only log once per condition
    if (!edgeCaseLog.some(e => e.includes('oversized') && e.includes(timestamp.split(':')[0]))) {
      addLogEntry('EDGE CASE: Ball larger than container');
    }
  }

  // Check for energy increase (bounciness > 1)
  if (bounciness > 1) {
    let speed = sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    if (speed > initialSpeed * 1.5 && energyIncreaseCount < 3) {
      addLogEntry('EDGE CASE: Energy not conserved (speed: ' + speed.toFixed(0) + ')');
      energyIncreaseCount++;
    }
  }

  // Check for performance degradation
  let currentTime = millis();
  if (lastFrameTime > 0) {
    let frameDelta = currentTime - lastFrameTime;
    if (frameDelta > 32) {
      addLogEntry('EDGE CASE: Performance degradation (' + frameDelta.toFixed(0) + 'ms)');
    }
  }
  lastFrameTime = currentTime;

  // Check for wall overlap (collision detection failure)
  if (ball.x - ball.radius < container.x ||
      ball.x + ball.radius > container.x + container.width ||
      ball.y - ball.radius < container.y ||
      ball.y + ball.radius > container.y + container.height) {
    // Only check if ball should fit
    if (ball.radius * 2 < container.width && ball.radius * 2 < container.height) {
      addLogEntry('EDGE CASE: Collision detection failed (ball overlaps wall)');
    }
  }
}

function addLogEntry(message) {
  let timestamp = getTimestamp();
  let entry = timestamp + ' ' + message;

  // Avoid duplicate entries within 1 second
  if (edgeCaseLog.length > 0) {
    let lastEntry = edgeCaseLog[edgeCaseLog.length - 1];
    if (lastEntry.includes(message) && lastEntry.startsWith(timestamp.substring(0, 5))) {
      return;
    }
  }

  edgeCaseLog.push(entry);

  // Limit log size
  if (edgeCaseLog.length > maxLogEntries) {
    edgeCaseLog.shift();
  }
}

function getTimestamp() {
  let d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' +
         d.getMinutes().toString().padStart(2, '0') + ':' +
         d.getSeconds().toString().padStart(2, '0');
}

function logCurrentState() {
  let timestamp = getTimestamp();
  addLogEntry('[LOG] State captured');
  addLogEntry('  Gravity: ' + gravity.toFixed(1) + ', Radius: ' + ballRadius.toFixed(0));
  addLogEntry('  Bounciness: ' + bounciness.toFixed(2) + ', Speed: ' + initialSpeed.toFixed(0));
  addLogEntry('  Ball pos: (' + ball.x.toFixed(0) + ', ' + ball.y.toFixed(0) + ')');
  addLogEntry('  Ball vel: (' + ball.vx.toFixed(1) + ', ' + ball.vy.toFixed(1) + ')');
}

function resetToDefaults() {
  gravity = defaults.gravity;
  ballRadius = defaults.radius;
  bounciness = defaults.bounciness;
  initialSpeed = defaults.speed;
  resetBall();
  addLogEntry('[LOG] Reset to defaults');
}

function resetBall() {
  // Center ball in container
  ball.x = container.x + container.width / 2;
  ball.y = container.y + container.height / 2;
  ball.radius = ballRadius;

  // Random initial direction
  let angle = random(TWO_PI);
  ball.vx = cos(angle) * initialSpeed;
  ball.vy = sin(angle) * initialSpeed;

  // Reset energy tracking
  energyIncreaseCount = 0;
  initialEnergy = 0.5 * initialSpeed * initialSpeed;
}

function mousePressed() {
  let sliderX = controlPanelX + 10;
  let sliderWidth = controlPanelWidth - 20;

  // Check slider clicks
  if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
    let ratio = (mouseX - sliderX) / sliderWidth;

    // Gravity slider (y: 50-66)
    if (mouseY >= 50 && mouseY <= 66) {
      gravity = lerp(-10, 10, ratio);
    }
    // Radius slider (y: 95-111)
    else if (mouseY >= 95 && mouseY <= 111) {
      ballRadius = lerp(1, 200, ratio);
      ball.radius = ballRadius;
    }
    // Bounciness slider (y: 140-156)
    else if (mouseY >= 140 && mouseY <= 156) {
      bounciness = lerp(0, 2, ratio);
    }
    // Speed slider (y: 185-201)
    else if (mouseY >= 185 && mouseY <= 201) {
      initialSpeed = lerp(0, 1000, ratio);
    }
  }

  // Check button clicks
  let btnWidth = (sliderWidth - 10) / 2;
  let btnY = 215;

  // Log State button
  if (mouseX >= sliderX && mouseX <= sliderX + btnWidth &&
      mouseY >= btnY && mouseY <= btnY + 25) {
    logCurrentState();
  }

  // Reset button
  if (mouseX >= sliderX + btnWidth + 10 && mouseX <= sliderX + sliderWidth &&
      mouseY >= btnY && mouseY <= btnY + 25) {
    resetToDefaults();
  }

  // Restart Ball button
  if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth &&
      mouseY >= btnY + 35 && mouseY <= btnY + 60) {
    resetBall();
    addLogEntry('[LOG] Ball restarted');
  }
}

function mouseDragged() {
  let sliderX = controlPanelX + 10;
  let sliderWidth = controlPanelWidth - 20;

  if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
    let ratio = constrain((mouseX - sliderX) / sliderWidth, 0, 1);

    // Gravity slider
    if (mouseY >= 45 && mouseY <= 70) {
      gravity = lerp(-10, 10, ratio);
    }
    // Radius slider
    else if (mouseY >= 90 && mouseY <= 115) {
      ballRadius = lerp(1, 200, ratio);
      ball.radius = ballRadius;
    }
    // Bounciness slider
    else if (mouseY >= 135 && mouseY <= 160) {
      bounciness = lerp(0, 2, ratio);
    }
    // Speed slider
    else if (mouseY >= 180 && mouseY <= 205) {
      initialSpeed = lerp(0, 1000, ratio);
    }
  }
}

function mouseWheel(event) {
  // Scroll log area
  let sliderX = controlPanelX + 10;
  let sliderWidth = controlPanelWidth - 20;
  let logHeight = drawHeight - 305;

  if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth &&
      mouseY >= 300 && mouseY <= 300 + logHeight) {
    logScrollOffset = constrain(logScrollOffset + (event.delta > 0 ? -1 : 1),
                                 0, max(0, edgeCaseLog.length - 10));
    return false;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
