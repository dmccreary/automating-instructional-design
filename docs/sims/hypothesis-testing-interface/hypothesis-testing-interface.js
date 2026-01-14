// Hypothesis Testing Interface MicroSim
// Interactive pendulum simulation for hypothesis formation and testing
// Students make predictions about pendulum behavior, then test them

// Canvas dimensions
let canvasWidth = 900;
let canvasHeight = 600;
let drawHeight = 500;
let controlHeight = 50;

// Layout areas
let simAreaWidth = 500;
let panelWidth = 200;
let panelHeight = 300;

// Pendulum physics
let pendulumLength = 50; // cm (10-100)
let pendulumAngle = 15;  // degrees (5-45)
let pendulumMass = 100;  // grams (10-500)
let gravity = 9.81;

// Pendulum state
let angle;
let angularVelocity = 0;
let angularAcceleration = 0;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let measuredPeriod = 0;
let swingCount = 0;
let lastAngleSign = 1;

// Hypothesis system
let hypothesisVariable = 0; // 0: length, 1: angle, 2: mass
let hypothesisDirection = 0; // 0: increase, 1: decrease, 2: no change
let hypothesisRecorded = false;
let testComplete = false;
let predictedEffect = "";
let actualEffect = "";

// Experiment history
let experimentHistory = [];
let showHistory = false;
let maxHistory = 5;

// Previous test values for comparison
let prevPeriod = 0;
let prevLength = 50;
let prevAngle = 15;
let prevMass = 100;

// UI Elements
let lengthSlider, angleSlider, massSlider;
let variableSelect, directionSelect;
let testButton, newHypothesisButton, historyButton;

// Colors
let bgColor, simBgColor, panelBgColor;
let primaryColor, secondaryColor, successColor, warningColor;
let textColor, lightTextColor;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.clientWidth - 20, 900);
  } else {
    canvasWidth = Math.min(windowWidth - 40, 900);
  }
  // Adjust layout for smaller screens
  if (canvasWidth < 700) {
    simAreaWidth = canvasWidth;
    panelWidth = canvasWidth / 2 - 10;
  } else {
    simAreaWidth = 500;
    panelWidth = (canvasWidth - simAreaWidth) / 2;
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Define colors
  bgColor = color(248, 250, 252);
  simBgColor = color(241, 245, 249);
  panelBgColor = color(255);
  primaryColor = color(59, 130, 246);
  secondaryColor = color(147, 51, 234);
  successColor = color(34, 197, 94);
  warningColor = color(245, 158, 11);
  textColor = color(30, 41, 59);
  lightTextColor = color(100, 116, 139);

  // Initialize angle
  angle = radians(pendulumAngle);

  // Create sliders
  let controlY = drawHeight + 15;
  let sliderStartX = 80;
  let sliderSpacing = 200;

  lengthSlider = createSlider(10, 100, pendulumLength, 1);
  lengthSlider.position(sliderStartX, controlY);
  lengthSlider.style('width', '120px');
  lengthSlider.input(onLengthChange);

  angleSlider = createSlider(5, 45, pendulumAngle, 1);
  angleSlider.position(sliderStartX + sliderSpacing, controlY);
  angleSlider.style('width', '120px');
  angleSlider.input(onAngleChange);

  massSlider = createSlider(10, 500, pendulumMass, 10);
  massSlider.position(sliderStartX + sliderSpacing * 2, controlY);
  massSlider.style('width', '120px');
  massSlider.input(onMassChange);

  // Create buttons
  testButton = createButton('Test Hypothesis');
  testButton.position(sliderStartX + sliderSpacing * 3 + 20, controlY - 5);
  testButton.mousePressed(testHypothesis);
  testButton.style('background-color', '#3b82f6');
  testButton.style('color', 'white');
  testButton.style('border', 'none');
  testButton.style('padding', '8px 16px');
  testButton.style('border-radius', '6px');
  testButton.style('cursor', 'pointer');

  textFont('Arial');
  textAlign(LEFT, TOP);
}

function onLengthChange() {
  pendulumLength = lengthSlider.value();
  resetPendulum();
}

function onAngleChange() {
  pendulumAngle = angleSlider.value();
  resetPendulum();
}

function onMassChange() {
  pendulumMass = massSlider.value();
  resetPendulum();
}

function resetPendulum() {
  angle = radians(pendulumAngle);
  angularVelocity = 0;
  angularAcceleration = 0;
  isRunning = false;
  elapsedTime = 0;
  swingCount = 0;
  measuredPeriod = 0;
  lastAngleSign = angle >= 0 ? 1 : -1;
  testComplete = false;
}

function testHypothesis() {
  if (!hypothesisRecorded) {
    // Record hypothesis based on current slider positions
    recordHypothesis();
  }

  // Start the pendulum
  isRunning = true;
  startTime = millis();
  swingCount = 0;
  lastAngleSign = angle >= 0 ? 1 : -1;
}

function recordHypothesis() {
  // Determine what changed from previous test
  let lengthChanged = pendulumLength !== prevLength;
  let angleChanged = pendulumAngle !== prevAngle;
  let massChanged = pendulumMass !== prevMass;

  if (lengthChanged) {
    hypothesisVariable = 0;
    hypothesisDirection = pendulumLength > prevLength ? 0 : 1;
    predictedEffect = getPrediction(0, hypothesisDirection);
  } else if (angleChanged) {
    hypothesisVariable = 1;
    hypothesisDirection = pendulumAngle > prevAngle ? 0 : 1;
    predictedEffect = getPrediction(1, hypothesisDirection);
  } else if (massChanged) {
    hypothesisVariable = 2;
    hypothesisDirection = pendulumMass > prevMass ? 0 : 1;
    predictedEffect = getPrediction(2, hypothesisDirection);
  } else {
    // No change - first test
    predictedEffect = "Baseline measurement";
  }

  hypothesisRecorded = true;
}

function getPrediction(variable, direction) {
  let varNames = ["length", "angle", "mass"];
  let dirNames = ["increasing", "decreasing"];
  return "If I " + (direction === 0 ? "increase" : "decrease") + " the " + varNames[variable] +
         ", the period will...";
}

function draw() {
  background(bgColor);

  // Update physics if running
  if (isRunning) {
    updatePendulum();
  }

  // Draw simulation area
  drawSimulationArea();

  // Draw hypothesis panel
  drawHypothesisPanel();

  // Draw results panel
  drawResultsPanel();

  // Draw control labels
  drawControlLabels();

  // Draw history if toggled
  if (showHistory) {
    drawHistory();
  }
}

function updatePendulum() {
  // Simple pendulum physics: a = -(g/L) * sin(theta)
  let lengthM = pendulumLength / 100; // Convert cm to m
  angularAcceleration = -(gravity / lengthM) * sin(angle);

  // Numerical integration (Euler method with damping)
  let dt = 0.016; // ~60fps
  angularVelocity += angularAcceleration * dt;
  angularVelocity *= 0.999; // Slight damping
  angle += angularVelocity * dt;

  // Track time
  elapsedTime = (millis() - startTime) / 1000;

  // Count swings (zero crossings from positive to negative)
  let currentSign = angle >= 0 ? 1 : -1;
  if (currentSign !== lastAngleSign && currentSign === 1) {
    swingCount++;
    if (swingCount >= 3) {
      measuredPeriod = elapsedTime / swingCount;
      completeTest();
    }
  }
  lastAngleSign = currentSign;

  // Auto-stop after 10 seconds
  if (elapsedTime > 10) {
    completeTest();
  }
}

function completeTest() {
  isRunning = false;
  testComplete = true;

  // Determine actual effect
  if (prevPeriod > 0) {
    let periodChange = measuredPeriod - prevPeriod;
    if (Math.abs(periodChange) < 0.05) {
      actualEffect = "Period stayed approximately the same";
    } else if (periodChange > 0) {
      actualEffect = "Period INCREASED by " + nf(Math.abs(periodChange), 1, 2) + "s";
    } else {
      actualEffect = "Period DECREASED by " + nf(Math.abs(periodChange), 1, 2) + "s";
    }
  } else {
    actualEffect = "Baseline period: " + nf(measuredPeriod, 1, 2) + "s";
  }

  // Add to history
  experimentHistory.unshift({
    length: pendulumLength,
    angle: pendulumAngle,
    mass: pendulumMass,
    period: measuredPeriod,
    prediction: predictedEffect,
    result: actualEffect
  });

  if (experimentHistory.length > maxHistory) {
    experimentHistory.pop();
  }

  // Update previous values
  prevPeriod = measuredPeriod;
  prevLength = pendulumLength;
  prevAngle = pendulumAngle;
  prevMass = pendulumMass;

  // Reset hypothesis for next test
  hypothesisRecorded = false;
}

function drawSimulationArea() {
  // Background
  fill(simBgColor);
  stroke(200);
  strokeWeight(1);
  rect(0, 0, simAreaWidth, drawHeight, 8);

  // Title
  fill(textColor);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Pendulum Simulation", simAreaWidth / 2, 10);

  // Draw pendulum
  let pivotX = simAreaWidth / 2;
  let pivotY = 80;
  let scale = 2; // pixels per cm
  let bobX = pivotX + sin(angle) * pendulumLength * scale;
  let bobY = pivotY + cos(angle) * pendulumLength * scale;

  // Pivot point
  fill(100);
  noStroke();
  ellipse(pivotX, pivotY, 12, 12);

  // String
  stroke(80);
  strokeWeight(2);
  line(pivotX, pivotY, bobX, bobY);

  // Bob (size based on mass)
  let bobRadius = map(pendulumMass, 10, 500, 15, 40);
  fill(primaryColor);
  stroke(255);
  strokeWeight(2);
  ellipse(bobX, bobY, bobRadius * 2, bobRadius * 2);

  // Mass label on bob
  fill(255);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(pendulumMass + "g", bobX, bobY);

  // Length indicator
  stroke(lightTextColor);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(pivotX, pivotY, pivotX, pivotY + pendulumLength * scale);
  drawingContext.setLineDash([]);

  fill(lightTextColor);
  textSize(11);
  textAlign(LEFT, CENTER);
  text(pendulumLength + " cm", pivotX + 10, pivotY + pendulumLength * scale / 2);

  // Angle arc
  if (abs(angle) > 0.01) {
    noFill();
    stroke(warningColor);
    strokeWeight(2);
    let arcRadius = 40;
    arc(pivotX, pivotY, arcRadius * 2, arcRadius * 2, 0, abs(angle),
        angle > 0 ? OPEN : OPEN);
  }

  // Status display
  let statusY = drawHeight - 120;
  fill(panelBgColor);
  stroke(200);
  strokeWeight(1);
  rect(20, statusY, simAreaWidth - 40, 100, 8);

  fill(textColor);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);

  let col1X = 35;
  let col2X = simAreaWidth / 2 + 10;

  text("Status: " + (isRunning ? "Running..." : (testComplete ? "Complete" : "Ready")), col1X, statusY + 15);
  text("Elapsed: " + nf(elapsedTime, 1, 1) + "s", col1X, statusY + 35);
  text("Swings: " + swingCount, col1X, statusY + 55);

  text("Current Angle: " + nf(degrees(angle), 1, 1) + "\u00B0", col2X, statusY + 15);
  text("Period: " + (measuredPeriod > 0 ? nf(measuredPeriod, 1, 3) + "s" : "---"), col2X, statusY + 35);

  // Theoretical period
  let theoreticalPeriod = 2 * PI * sqrt(pendulumLength / 100 / gravity);
  text("Theory: " + nf(theoreticalPeriod, 1, 3) + "s", col2X, statusY + 55);

  textAlign(LEFT, TOP);
}

function drawHypothesisPanel() {
  let panelX = simAreaWidth + 5;
  let panelY = 10;

  // Panel background
  fill(panelBgColor);
  stroke(primaryColor);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth - 10, panelHeight, 8);

  // Title
  fill(primaryColor);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Hypothesis Panel", panelX + panelWidth / 2 - 5, panelY + 10);

  // Hypothesis prompts
  fill(textColor);
  textSize(11);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  let textX = panelX + 10;
  let textY = panelY + 40;
  let lineHeight = 18;

  text("I predict that...", textX, textY);
  textY += lineHeight * 1.5;

  // Show current settings
  fill(lightTextColor);
  textSize(10);
  text("Current Settings:", textX, textY);
  textY += lineHeight;
  text("  Length: " + pendulumLength + " cm", textX, textY);
  textY += lineHeight;
  text("  Angle: " + pendulumAngle + "\u00B0", textX, textY);
  textY += lineHeight;
  text("  Mass: " + pendulumMass + " g", textX, textY);
  textY += lineHeight * 1.5;

  // Show hypothesis if recorded
  if (hypothesisRecorded || testComplete) {
    fill(secondaryColor);
    textSize(10);
    textStyle(ITALIC);

    // Word wrap the prediction
    let words = predictedEffect.split(' ');
    let line = '';
    let maxWidth = panelWidth - 30;

    for (let word of words) {
      let testLine = line + word + ' ';
      if (textWidth(testLine) > maxWidth && line.length > 0) {
        text(line, textX, textY);
        textY += lineHeight;
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    if (line.length > 0) {
      text(line, textX, textY);
    }
  } else {
    fill(lightTextColor);
    textSize(10);
    text("Adjust sliders and click", textX, textY);
    textY += lineHeight;
    text("'Test Hypothesis' to begin", textX, textY);
  }

  // Instructions
  textY = panelY + panelHeight - 60;
  fill(lightTextColor);
  textSize(9);
  textStyle(NORMAL);
  text("Workflow:", textX, textY);
  textY += lineHeight;
  text("1. Observe initial state", textX, textY);
  textY += lineHeight;
  text("2. Adjust ONE variable", textX, textY);
  textY += lineHeight;
  text("3. Click 'Test Hypothesis'", textX, textY);
}

function drawResultsPanel() {
  let panelX = simAreaWidth + 5;
  let panelY = panelHeight + 20;

  // Panel background
  fill(panelBgColor);
  stroke(testComplete ? successColor : color(200));
  strokeWeight(2);
  rect(panelX, panelY, panelWidth - 10, panelHeight - 30, 8);

  // Title
  fill(testComplete ? successColor : lightTextColor);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Results Panel", panelX + panelWidth / 2 - 5, panelY + 10);

  let textX = panelX + 10;
  let textY = panelY + 40;
  let lineHeight = 16;

  if (testComplete) {
    // Show results
    fill(textColor);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("Observation:", textX, textY);
    textY += lineHeight * 1.2;

    textStyle(NORMAL);
    textSize(10);

    // Word wrap actual effect
    let words = actualEffect.split(' ');
    let line = '';
    let maxWidth = panelWidth - 30;

    for (let word of words) {
      let testLine = line + word + ' ';
      if (textWidth(testLine) > maxWidth && line.length > 0) {
        text(line, textX, textY);
        textY += lineHeight;
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    if (line.length > 0) {
      text(line, textX, textY);
    }

    textY += lineHeight * 2;

    // Previous vs Current comparison
    fill(textColor);
    textSize(10);
    textStyle(BOLD);
    text("Comparison:", textX, textY);
    textY += lineHeight;

    textStyle(NORMAL);
    if (experimentHistory.length > 1) {
      let prev = experimentHistory[1];
      text("Previous: " + nf(prev.period, 1, 3) + "s", textX, textY);
      textY += lineHeight;
      text("Current: " + nf(measuredPeriod, 1, 3) + "s", textX, textY);
    } else {
      text("First measurement recorded", textX, textY);
    }

    // History toggle
    textY = panelY + panelHeight - 50;
    fill(primaryColor);
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("Click here to view history", panelX + panelWidth / 2 - 5, textY);

  } else {
    // Waiting for test
    fill(lightTextColor);
    textSize(11);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text("Waiting for test...", textX, textY);
    textY += lineHeight * 2;

    if (prevPeriod > 0) {
      text("Last measured period:", textX, textY);
      textY += lineHeight;
      fill(textColor);
      textSize(14);
      textStyle(BOLD);
      text(nf(prevPeriod, 1, 3) + " seconds", textX, textY);
    } else {
      text("Run your first test to", textX, textY);
      textY += lineHeight;
      text("establish a baseline.", textX, textY);
    }
  }
}

function drawControlLabels() {
  fill(textColor);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);

  let labelY = drawHeight + 22;
  text("Length", 20, labelY);
  text("Angle", 220, labelY);
  text("Mass", 420, labelY);

  textSize(9);
  textStyle(NORMAL);
  fill(lightTextColor);
  text("(10-100 cm)", 20, labelY + 18);
  text("(5-45\u00B0)", 220, labelY + 18);
  text("(10-500 g)", 420, labelY + 18);
}

function drawHistory() {
  // Overlay
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, canvasWidth, canvasHeight);

  // History panel
  let historyWidth = 400;
  let historyHeight = 350;
  let historyX = (canvasWidth - historyWidth) / 2;
  let historyY = (drawHeight - historyHeight) / 2;

  fill(panelBgColor);
  stroke(primaryColor);
  strokeWeight(2);
  rect(historyX, historyY, historyWidth, historyHeight, 12);

  // Title
  fill(primaryColor);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Experiment History", historyX + historyWidth / 2, historyY + 15);

  // Close button
  fill(lightTextColor);
  textSize(12);
  text("(Click anywhere to close)", historyX + historyWidth / 2, historyY + 35);

  // Table header
  let tableY = historyY + 65;
  let col1 = historyX + 20;
  let col2 = historyX + 80;
  let col3 = historyX + 140;
  let col4 = historyX + 200;
  let col5 = historyX + 270;

  fill(textColor);
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("#", col1, tableY);
  text("Length", col2, tableY);
  text("Angle", col3, tableY);
  text("Mass", col4, tableY);
  text("Period", col5, tableY);

  // Table rows
  textStyle(NORMAL);
  textSize(10);
  let rowHeight = 25;

  for (let i = 0; i < experimentHistory.length; i++) {
    let exp = experimentHistory[i];
    let rowY = tableY + (i + 1) * rowHeight + 10;

    fill(i === 0 ? successColor : textColor);
    text((i + 1).toString(), col1, rowY);
    text(exp.length + " cm", col2, rowY);
    text(exp.angle + "\u00B0", col3, rowY);
    text(exp.mass + " g", col4, rowY);
    text(nf(exp.period, 1, 3) + "s", col5, rowY);
  }

  if (experimentHistory.length === 0) {
    fill(lightTextColor);
    textAlign(CENTER, TOP);
    text("No experiments recorded yet", historyX + historyWidth / 2, tableY + 40);
  }
}

function mousePressed() {
  // Check for history toggle
  let panelX = simAreaWidth + 5;
  let panelY = panelHeight + 20;

  if (showHistory) {
    // Close history
    showHistory = false;
    return;
  }

  // Check if clicking history link in results panel
  if (testComplete &&
      mouseX > panelX && mouseX < panelX + panelWidth - 10 &&
      mouseY > panelY + panelHeight - 60 && mouseY < panelY + panelHeight - 30) {
    showHistory = true;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition sliders
  let controlY = drawHeight + 15;
  let sliderStartX = 80;
  let sliderSpacing = 200;

  lengthSlider.position(sliderStartX, controlY);
  angleSlider.position(sliderStartX + sliderSpacing, controlY);
  massSlider.position(sliderStartX + sliderSpacing * 2, controlY);
  testButton.position(sliderStartX + sliderSpacing * 3 + 20, controlY - 5);
}
