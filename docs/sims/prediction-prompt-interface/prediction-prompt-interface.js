// Prediction Prompt Interface MicroSim
// An annotated mockup showing the 5-panel workflow for designing prediction prompts
// Demonstrates best practices for prediction-before-observation in educational MicroSims

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Current panel (1-5)
let currentPanel = 1;
const totalPanels = 5;

// Panel titles and descriptions
const panelTitles = [
  "Panel 1: Setup",
  "Panel 2: Prediction Input",
  "Panel 3: Reasoning Capture",
  "Panel 4: Observation",
  "Panel 5: Reflection"
];

const panelSubtitles = [
  "Present the scenario clearly before asking for predictions",
  "Capture learner predictions with multiple input options",
  "Optionally capture reasoning to deepen engagement",
  "Show simulation with prediction visible alongside result",
  "Guide learner reflection and connect to concepts"
];

// Colors from specification
const colors = {
  blue: '#3498db',       // Prompts/questions
  yellow: '#f1c40f',     // Learner input areas
  green: '#27ae60',      // Observation/results
  orange: '#e67e22',     // Reflection
  darkText: '#2c3e50',
  lightText: '#7f8c8d',
  background: '#ecf0f1',
  white: '#ffffff',
  lightBlue: '#ebf5fb',
  lightYellow: '#fef9e7',
  lightGreen: '#eafaf1',
  lightOrange: '#fdf2e9'
};

// UI Elements
let prevButton, nextButton;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth - 20, 900);
  } else {
    canvasWidth = min(windowWidth - 40, 900);
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  textFont('Arial');
  createControls();

  describe('Prediction Prompt Interface MicroSim showing a 5-panel workflow for designing effective prediction prompts in educational simulations.', LABEL);
}

function createControls() {
  let controlContainer = createDiv('');
  const container = document.querySelector('main');
  if (container) {
    controlContainer.parent(container);
  }
  controlContainer.style('display', 'flex');
  controlContainer.style('flex-wrap', 'wrap');
  controlContainer.style('align-items', 'center');
  controlContainer.style('justify-content', 'center');
  controlContainer.style('gap', '15px');
  controlContainer.style('margin', '10px 0');
  controlContainer.style('padding', '12px 20px');
  controlContainer.style('font-family', 'Arial, sans-serif');
  controlContainer.style('background', '#f5f5f5');
  controlContainer.style('border-radius', '8px');
  controlContainer.id('control-container');

  // Previous button
  prevButton = createButton('< Previous');
  prevButton.parent(controlContainer);
  prevButton.style('padding', '10px 20px');
  prevButton.style('border', 'none');
  prevButton.style('border-radius', '6px');
  prevButton.style('background', '#95a5a6');
  prevButton.style('color', 'white');
  prevButton.style('cursor', 'pointer');
  prevButton.style('font-size', '14px');
  prevButton.style('font-weight', 'bold');
  prevButton.mousePressed(() => changePanel(-1));

  // Progress dots
  let dotsContainer = createDiv('');
  dotsContainer.parent(controlContainer);
  dotsContainer.style('display', 'flex');
  dotsContainer.style('gap', '10px');
  dotsContainer.style('align-items', 'center');
  dotsContainer.id('progress-dots');

  for (let i = 1; i <= totalPanels; i++) {
    let dot = createDiv('');
    dot.parent(dotsContainer);
    dot.style('width', '14px');
    dot.style('height', '14px');
    dot.style('border-radius', '50%');
    dot.style('background', i === 1 ? colors.blue : '#bdc3c7');
    dot.style('transition', 'all 0.3s');
    dot.style('cursor', 'pointer');
    dot.id('dot-' + i);
    // Click handler for dots
    dot.mousePressed(() => {
      currentPanel = i;
      updateUI();
    });
  }

  // Next button
  nextButton = createButton('Next >');
  nextButton.parent(controlContainer);
  nextButton.style('padding', '10px 20px');
  nextButton.style('border', 'none');
  nextButton.style('border-radius', '6px');
  nextButton.style('background', colors.blue);
  nextButton.style('color', 'white');
  nextButton.style('cursor', 'pointer');
  nextButton.style('font-size', '14px');
  nextButton.style('font-weight', 'bold');
  nextButton.mousePressed(() => changePanel(1));

  updateUI();
}

function changePanel(delta) {
  let newPanel = currentPanel + delta;
  if (newPanel >= 1 && newPanel <= totalPanels) {
    currentPanel = newPanel;
    updateUI();
  }
}

function updateUI() {
  // Update progress dots
  for (let i = 1; i <= totalPanels; i++) {
    let dot = document.getElementById('dot-' + i);
    if (dot) {
      let panelColor = getPanelColor(i);
      dot.style.background = i <= currentPanel ? panelColor : '#bdc3c7';
      dot.style.transform = i === currentPanel ? 'scale(1.3)' : 'scale(1)';
    }
  }

  // Update button states
  prevButton.style('background', currentPanel > 1 ? colors.blue : '#95a5a6');
  prevButton.style('cursor', currentPanel > 1 ? 'pointer' : 'not-allowed');
  nextButton.style('background', currentPanel < totalPanels ? colors.blue : '#95a5a6');
  nextButton.style('cursor', currentPanel < totalPanels ? 'pointer' : 'not-allowed');
}

function getPanelColor(panel) {
  switch(panel) {
    case 1: return colors.blue;
    case 2: return colors.yellow;
    case 3: return colors.blue;
    case 4: return colors.green;
    case 5: return colors.orange;
    default: return colors.blue;
  }
}

function getPanelBgColor(panel) {
  switch(panel) {
    case 1: return colors.lightBlue;
    case 2: return colors.lightYellow;
    case 3: return colors.lightBlue;
    case 4: return colors.lightGreen;
    case 5: return colors.lightOrange;
    default: return colors.lightBlue;
  }
}

function draw() {
  background(colors.background);

  // Draw panel header
  drawPanelHeader();

  // Draw main content area
  let contentY = 80;
  let contentHeight = drawHeight - contentY - 10;

  fill(colors.white);
  stroke(200);
  strokeWeight(1);
  rect(margin, contentY, canvasWidth - margin * 2, contentHeight, 10);

  // Draw panel-specific content
  switch(currentPanel) {
    case 1: drawPanel1(margin + 10, contentY + 10, canvasWidth - margin * 2 - 20, contentHeight - 20); break;
    case 2: drawPanel2(margin + 10, contentY + 10, canvasWidth - margin * 2 - 20, contentHeight - 20); break;
    case 3: drawPanel3(margin + 10, contentY + 10, canvasWidth - margin * 2 - 20, contentHeight - 20); break;
    case 4: drawPanel4(margin + 10, contentY + 10, canvasWidth - margin * 2 - 20, contentHeight - 20); break;
    case 5: drawPanel5(margin + 10, contentY + 10, canvasWidth - margin * 2 - 20, contentHeight - 20); break;
  }
}

function drawPanelHeader() {
  // Title background with panel color
  let panelColor = color(getPanelColor(currentPanel));
  fill(panelColor);
  noStroke();
  rect(0, 0, canvasWidth, 70, 0, 0, 0, 0);

  // Title
  fill(colors.white);
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(panelTitles[currentPanel - 1], canvasWidth / 2, 12);

  // Subtitle
  textSize(14);
  textStyle(NORMAL);
  text(panelSubtitles[currentPanel - 1], canvasWidth / 2, 42);
}

function drawPanel1(x, y, w, h) {
  // Panel 1: Setup - Shows scenario description, initial conditions, prediction prompt

  // Mockup area
  let mockupX = x + 20;
  let mockupY = y + 10;
  let mockupW = w * 0.55;
  let mockupH = h - 40;

  // Scenario box
  fill(colors.lightBlue);
  stroke(colors.blue);
  strokeWeight(2);
  rect(mockupX, mockupY, mockupW, mockupH * 0.35, 8);

  fill(colors.blue);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Scenario Description", mockupX + 15, mockupY + 12);

  textStyle(NORMAL);
  textSize(12);
  fill(colors.darkText);
  let scenarioText = "A ball sits at the top of a ramp. Another ball is loaded in a projectile launcher at the bottom. When released, the ramp ball will roll down while the launcher fires horizontally.";
  text(scenarioText, mockupX + 15, mockupY + 35, mockupW - 30, 80);

  // Visual representation
  let visualY = mockupY + mockupH * 0.4;
  fill(colors.white);
  stroke(180);
  strokeWeight(1);
  rect(mockupX, visualY, mockupW, mockupH * 0.35, 8);

  // Draw simple physics scene
  drawPhysicsScene(mockupX + mockupW/2, visualY + mockupH * 0.175);

  // Prediction prompt (prominent)
  let promptY = mockupY + mockupH * 0.78;
  fill(colors.blue);
  stroke(color(colors.blue));
  strokeWeight(3);
  rect(mockupX, promptY, mockupW, mockupH * 0.2, 8);

  fill(colors.white);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Predict what will happen next!", mockupX + mockupW/2, promptY + mockupH * 0.1);

  // Annotations
  let annotX = x + w * 0.62;
  drawAnnotations(annotX, y + 20, w * 0.35, [
    { text: "Clear scenario description", color: colors.blue },
    { text: "Visual of initial conditions", color: colors.darkText },
    { text: "Prominent prediction prompt", color: colors.blue },
    { text: "No 'skip' option available", color: colors.orange }
  ]);
}

function drawPanel2(x, y, w, h) {
  // Panel 2: Prediction Input - Multiple choice, drawing tool, confidence

  let mockupX = x + 20;
  let mockupY = y + 10;
  let mockupW = w * 0.55;
  let mockupH = h - 40;

  // Multiple choice section
  fill(colors.lightYellow);
  stroke(colors.yellow);
  strokeWeight(2);
  rect(mockupX, mockupY, mockupW, mockupH * 0.45, 8);

  fill(colors.darkText);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("What will happen when the balls are released?", mockupX + 15, mockupY + 12);

  textStyle(NORMAL);
  textSize(12);
  let options = [
    "A) The ramp ball will hit the ground first",
    "B) The launched ball will hit the ground first",
    "C) Both balls will hit the ground at the same time",
    "D) It depends on the ramp angle"
  ];

  let optY = mockupY + 38;
  for (let i = 0; i < options.length; i++) {
    // Radio button
    fill(colors.white);
    stroke(colors.darkText);
    strokeWeight(1);
    ellipse(mockupX + 25, optY + 8, 16, 16);
    if (i === 2) {
      fill(colors.blue);
      noStroke();
      ellipse(mockupX + 25, optY + 8, 8, 8);
    }

    fill(colors.darkText);
    noStroke();
    text(options[i], mockupX + 40, optY);
    optY += 24;
  }

  // Confidence slider
  let confY = mockupY + mockupH * 0.5;
  fill(colors.lightYellow);
  stroke(colors.yellow);
  strokeWeight(2);
  rect(mockupX, confY, mockupW, mockupH * 0.22, 8);

  fill(colors.darkText);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  text("How confident are you? (1-5)", mockupX + 15, confY + 12);

  // Confidence circles
  let circleY = confY + 50;
  textSize(12);
  textAlign(CENTER, CENTER);
  for (let i = 1; i <= 5; i++) {
    let circleX = mockupX + 40 + (i - 1) * 55;
    fill(i === 4 ? colors.blue : colors.white);
    stroke(colors.blue);
    strokeWeight(2);
    ellipse(circleX, circleY, 35, 35);
    fill(i === 4 ? colors.white : colors.darkText);
    noStroke();
    text(i, circleX, circleY);
  }

  // Lock in button
  let btnY = mockupY + mockupH * 0.76;
  fill(colors.green);
  noStroke();
  rect(mockupX + mockupW * 0.2, btnY, mockupW * 0.6, 40, 8);

  fill(colors.white);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Lock In My Prediction", mockupX + mockupW * 0.5, btnY + 20);

  // Annotations
  let annotX = x + w * 0.62;
  drawAnnotations(annotX, y + 20, w * 0.35, [
    { text: "Multiple choice options", color: colors.yellow },
    { text: "Include common misconceptions", color: colors.orange },
    { text: "Confidence indicator (1-5)", color: colors.blue },
    { text: "'Lock in' prevents changing", color: colors.green }
  ]);
}

function drawPanel3(x, y, w, h) {
  // Panel 3: Reasoning Capture

  let mockupX = x + 20;
  let mockupY = y + 10;
  let mockupW = w * 0.55;
  let mockupH = h - 40;

  // Header
  fill(colors.lightBlue);
  stroke(colors.blue);
  strokeWeight(2);
  rect(mockupX, mockupY, mockupW, 45, 8, 8, 0, 0);

  fill(colors.blue);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Why do you think this will happen?", mockupX + mockupW/2, mockupY + 14);

  // Text input area
  fill(colors.white);
  stroke(180);
  strokeWeight(1);
  rect(mockupX, mockupY + 45, mockupW, mockupH * 0.35, 0, 0, 8, 8);

  fill(colors.lightText);
  textSize(12);
  textStyle(ITALIC);
  textAlign(LEFT, TOP);
  text("Type your reasoning here...", mockupX + 15, mockupY + 60);

  // Quick-select reasons
  let quickY = mockupY + mockupH * 0.48;
  fill(colors.lightBlue);
  stroke(colors.blue);
  strokeWeight(2);
  rect(mockupX, quickY, mockupW, mockupH * 0.42, 8);

  fill(colors.darkText);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Or select common reasoning:", mockupX + 15, quickY + 12);

  // Quick select buttons
  let reasons = [
    "Heavier objects fall faster",
    "Gravity acts equally on all masses",
    "Horizontal motion doesn't affect fall time",
    "The angle determines speed"
  ];

  textStyle(NORMAL);
  textSize(11);
  let reasonY = quickY + 38;
  for (let i = 0; i < reasons.length; i++) {
    fill(i === 1 ? color(colors.blue) : color(colors.white));
    stroke(colors.blue);
    strokeWeight(1);
    rect(mockupX + 15, reasonY, mockupW - 30, 26, 4);

    fill(i === 1 ? colors.white : colors.darkText);
    noStroke();
    textAlign(LEFT, CENTER);
    text(reasons[i], mockupX + 25, reasonY + 13);
    reasonY += 32;
  }

  // Optional label
  fill(colors.orange);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(RIGHT, BOTTOM);
  text("(Optional but valuable)", mockupX + mockupW - 10, mockupY + mockupH);

  // Annotations
  let annotX = x + w * 0.62;
  drawAnnotations(annotX, y + 20, w * 0.35, [
    { text: "Free-text reasoning field", color: colors.blue },
    { text: "Quick-select common reasons", color: colors.blue },
    { text: "Captures thinking process", color: colors.darkText },
    { text: "Enables personalized feedback", color: colors.green }
  ]);
}

function drawPanel4(x, y, w, h) {
  // Panel 4: Observation - Simulation runs with prediction visible

  let mockupX = x + 20;
  let mockupY = y + 10;
  let mockupW = w * 0.55;
  let mockupH = h - 40;

  // Split view - prediction on left, observation on right
  let halfW = (mockupW - 15) / 2;

  // Prediction reminder (left)
  fill(colors.lightBlue);
  stroke(colors.blue);
  strokeWeight(2);
  rect(mockupX, mockupY, halfW, mockupH * 0.55, 8);

  fill(colors.blue);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Your Prediction", mockupX + halfW/2, mockupY + 10);

  textStyle(NORMAL);
  textSize(11);
  fill(colors.darkText);
  textAlign(LEFT, TOP);
  text("Both balls will hit\nthe ground at the\nsame time", mockupX + 15, mockupY + 35, halfW - 30, 60);

  fill(colors.lightText);
  textSize(10);
  text("Confidence: 4/5", mockupX + 15, mockupY + 85);

  // Actual result (right)
  fill(colors.lightGreen);
  stroke(colors.green);
  strokeWeight(2);
  rect(mockupX + halfW + 15, mockupY, halfW, mockupH * 0.55, 8);

  fill(colors.green);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("What Actually Happened", mockupX + halfW + 15 + halfW/2, mockupY + 10);

  // Animation placeholder
  fill(colors.white);
  stroke(180);
  strokeWeight(1);
  rect(mockupX + halfW + 25, mockupY + 35, halfW - 20, 70, 4);

  // Draw falling balls animation hint
  drawFallingBalls(mockupX + halfW + 25 + (halfW - 20)/2, mockupY + 70);

  // Result text
  fill(colors.green);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("CORRECT!", mockupX + halfW + 15 + halfW/2, mockupY + 115);

  // Comparison visualization
  let compY = mockupY + mockupH * 0.6;
  fill(colors.white);
  stroke(180);
  strokeWeight(1);
  rect(mockupX, compY, mockupW, mockupH * 0.38, 8);

  fill(colors.darkText);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Visual Comparison", mockupX + mockupW/2, compY + 10);

  // Timeline comparison
  drawTimelineComparison(mockupX + 30, compY + 40, mockupW - 60, 60);

  // Annotations
  let annotX = x + w * 0.62;
  drawAnnotations(annotX, y + 20, w * 0.35, [
    { text: "Prediction visible during sim", color: colors.blue },
    { text: "Clear visual comparison", color: colors.green },
    { text: "Immediate feedback shown", color: colors.green },
    { text: "Celebrate engagement!", color: colors.orange }
  ]);
}

function drawPanel5(x, y, w, h) {
  // Panel 5: Reflection

  let mockupX = x + 20;
  let mockupY = y + 10;
  let mockupW = w * 0.55;
  let mockupH = h - 40;

  // Acknowledgment section
  fill(colors.lightGreen);
  stroke(colors.green);
  strokeWeight(2);
  rect(mockupX, mockupY, mockupW, mockupH * 0.22, 8);

  fill(colors.green);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Was your prediction correct?", mockupX + mockupW/2, mockupY + 20);

  // Yes/No buttons
  let btnW = 80;
  let btnY = mockupY + 45;
  fill(colors.green);
  rect(mockupX + mockupW/2 - btnW - 20, btnY, btnW, 30, 6);
  fill(colors.white);
  textSize(12);
  text("Yes", mockupX + mockupW/2 - btnW/2 - 20, btnY + 15);

  fill(colors.white);
  stroke(colors.green);
  strokeWeight(2);
  rect(mockupX + mockupW/2 + 20, btnY, btnW, 30, 6);
  fill(colors.green);
  noStroke();
  text("No", mockupX + mockupW/2 + btnW/2 + 20, btnY + 15);

  // Explanation section (if wrong)
  let explainY = mockupY + mockupH * 0.27;
  fill(colors.lightOrange);
  stroke(colors.orange);
  strokeWeight(2);
  rect(mockupX, explainY, mockupW, mockupH * 0.35, 8);

  fill(colors.orange);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("If your prediction was wrong:", mockupX + 15, explainY + 12);

  textStyle(NORMAL);
  textSize(11);
  fill(colors.darkText);
  let explainText = "\"What might explain the difference?\"\n\nThe key insight: Gravity accelerates all objects equally regardless of mass or horizontal velocity. This is called the independence of perpendicular motions.";
  text(explainText, mockupX + 15, explainY + 35, mockupW - 30, 100);

  // Concept connection
  let conceptY = mockupY + mockupH * 0.65;
  fill(colors.lightBlue);
  stroke(colors.blue);
  strokeWeight(2);
  rect(mockupX, conceptY, mockupW, mockupH * 0.2, 8);

  fill(colors.blue);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Connected Concept: Projectile Motion", mockupX + 15, conceptY + 12);

  textStyle(NORMAL);
  textSize(11);
  fill(colors.darkText);
  text("Horizontal and vertical motions are independent.", mockupX + 15, conceptY + 32);

  // Retry button
  let retryY = mockupY + mockupH * 0.88;
  fill(colors.blue);
  noStroke();
  rect(mockupX + mockupW * 0.25, retryY, mockupW * 0.5, 35, 6);

  fill(colors.white);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Try Again with New Understanding", mockupX + mockupW/2, retryY + 17);

  // Annotations
  let annotX = x + w * 0.62;
  drawAnnotations(annotX, y + 20, w * 0.35, [
    { text: "Explicit acknowledgment", color: colors.green },
    { text: "Explanation if incorrect", color: colors.orange },
    { text: "Connect to correct concept", color: colors.blue },
    { text: "Option to retry with insight", color: colors.blue }
  ]);
}

function drawAnnotations(x, y, w, items) {
  fill(colors.white);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, items.length * 45 + 30, 8);

  fill(colors.darkText);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Design Notes:", x + 12, y + 12);

  textStyle(NORMAL);
  textSize(11);
  let itemY = y + 40;

  for (let item of items) {
    // Bullet point
    fill(item.color);
    noStroke();
    ellipse(x + 18, itemY + 6, 8, 8);

    // Text
    fill(colors.darkText);
    text(item.text, x + 30, itemY, w - 45, 40);
    itemY += 42;
  }
}

function drawPhysicsScene(cx, cy) {
  // Draw a simple ramp with ball and projectile launcher
  push();
  translate(cx - 80, cy);

  // Ramp
  stroke(100);
  strokeWeight(3);
  fill(220);
  beginShape();
  vertex(0, 40);
  vertex(60, -30);
  vertex(65, -25);
  vertex(5, 45);
  endShape(CLOSE);

  // Ball on ramp
  fill(colors.blue);
  noStroke();
  ellipse(25, -5, 20, 20);

  // Launcher
  fill(150);
  stroke(100);
  strokeWeight(2);
  rect(70, 25, 50, 20, 3);

  // Ball in launcher
  fill(colors.orange);
  noStroke();
  ellipse(85, 35, 16, 16);

  // Ground
  stroke(100);
  strokeWeight(2);
  line(-10, 50, 140, 50);

  pop();
}

function drawFallingBalls(cx, cy) {
  // Draw two balls falling at same rate
  push();
  translate(cx, cy);

  // Trajectories
  stroke(colors.blue);
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(-30, -25, -30, 25);
  line(30, -25, 50, 25);
  drawingContext.setLineDash([]);

  // Balls at same height
  fill(colors.blue);
  noStroke();
  ellipse(-30, 15, 14, 14);

  fill(colors.orange);
  ellipse(40, 15, 14, 14);

  // Ground line
  stroke(100);
  strokeWeight(2);
  line(-50, 25, 70, 25);

  pop();
}

function drawTimelineComparison(x, y, w, h) {
  // Timeline showing both balls landing simultaneously
  push();
  translate(x, y);

  // Timeline axis
  stroke(colors.darkText);
  strokeWeight(2);
  line(0, h/2, w, h/2);

  // Start marker
  fill(colors.darkText);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text("Release", 20, h/2 + 8);

  // End marker
  text("Impact", w - 20, h/2 + 8);

  // Ball 1 trajectory
  stroke(colors.blue);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(20, h/2 - 15);
  vertex(w - 20, h/2 - 15);
  endShape();

  // Ball 2 trajectory (curved for horizontal motion)
  stroke(colors.orange);
  beginShape();
  vertex(20, h/2 - 15);
  bezierVertex(w/2, h/2 - 5, w/2, h/2 - 20, w - 20, h/2 - 15);
  endShape();

  // Labels
  noStroke();
  fill(colors.blue);
  textAlign(LEFT, CENTER);
  text("Ramp ball", 25, h/2 - 25);

  fill(colors.orange);
  text("Launched ball", w/2, h/2 - 30);

  // Same time indicator
  fill(colors.green);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text("Same time!", w - 20, h/2 - 5);

  pop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
