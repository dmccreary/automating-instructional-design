// Split Attention Effect Demonstration MicroSim
// Side-by-side comparison showing split vs integrated design with eye-tracking visualization
// Based on Cognitive Load Theory (Sweller) and Split Attention Effect research

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Panel dimensions
let panelWidth, panelHeight, leftPanelX, rightPanelX, panelY;

// Animation state
let eyeTrackingEnabled = true;
let animationTime = 0;
let animationSpeed = 0.02;

// Eye tracking paths (normalized 0-1 coordinates within each panel)
const splitAttentionPath = [
  {x: 0.3, y: 0.3},   // Look at label A on diagram
  {x: 0.85, y: 0.15}, // Jump to legend
  {x: 0.85, y: 0.20}, // Read definition
  {x: 0.4, y: 0.25},  // Back to label B
  {x: 0.85, y: 0.25}, // Jump to legend
  {x: 0.85, y: 0.30}, // Read definition
  {x: 0.5, y: 0.4},   // Look at label C
  {x: 0.85, y: 0.35}, // Jump to legend
  {x: 0.85, y: 0.40}, // Read definition
  {x: 0.6, y: 0.55},  // Look at label D
  {x: 0.85, y: 0.45}, // Jump to legend
  {x: 0.85, y: 0.50}, // Read definition
  {x: 0.5, y: 0.85},  // Look at text below
  {x: 0.3, y: 0.35},  // Back to diagram
  {x: 0.5, y: 0.88},  // Back to text
  {x: 0.4, y: 0.4},   // Back to diagram
];

const integratedPath = [
  {x: 0.2, y: 0.25},  // Start at top element with label
  {x: 0.35, y: 0.35}, // Move to next element
  {x: 0.5, y: 0.45},  // Continue down
  {x: 0.65, y: 0.55}, // Next element
  {x: 0.5, y: 0.7},   // Final element
  {x: 0.5, y: 0.5},   // Review center
];

// Current eye position
let leftEyePos = {x: 0, y: 0};
let rightEyePos = {x: 0, y: 0};
let leftPathIndex = 0;
let rightPathIndex = 0;
let pathProgress = 0;

// Hover state
let hoveredElement = null;
let hoveredPanel = null;

// Cognitive cost data
const cognitiveAnalysis = {
  split: {
    eyeMovementDistance: "847 pixels",
    timeToComprehension: "45 seconds",
    workingMemoryLoad: "High (6-7 chunks)",
    learningOutcome: "62% retention"
  },
  integrated: {
    eyeMovementDistance: "312 pixels",
    timeToComprehension: "22 seconds",
    workingMemoryLoad: "Low (3-4 chunks)",
    learningOutcome: "89% retention"
  }
};

// Water cycle elements for the diagrams
const waterCycleElements = [
  {id: 'A', name: 'Evaporation', x: 0.2, y: 0.6, desc: 'Water heated by sun rises as vapor'},
  {id: 'B', name: 'Condensation', x: 0.35, y: 0.25, desc: 'Water vapor cools to form clouds'},
  {id: 'C', name: 'Precipitation', x: 0.6, y: 0.35, desc: 'Water falls as rain or snow'},
  {id: 'D', name: 'Collection', x: 0.75, y: 0.65, desc: 'Water gathers in oceans, lakes'}
];

// Try it yourself state
let tryItMode = false;
let revealStep = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  calculateDimensions();
  createControls();

  describe('Interactive comparison of split attention versus integrated instructional design, showing how eye-tracking patterns differ and impact cognitive load.', LABEL);
}

function calculateDimensions() {
  panelWidth = (canvasWidth - margin * 3) / 2;
  panelHeight = drawHeight - 90;
  leftPanelX = margin;
  rightPanelX = margin * 2 + panelWidth;
  panelY = 55;
}

function createControls() {
  let controlContainer = createDiv('');
  controlContainer.parent(document.querySelector('main'));
  controlContainer.style('display', 'flex');
  controlContainer.style('align-items', 'center');
  controlContainer.style('gap', '15px');
  controlContainer.style('margin', '10px 0');
  controlContainer.style('padding', '0 20px');
  controlContainer.style('font-family', 'Arial, sans-serif');
  controlContainer.style('flex-wrap', 'wrap');

  // Eye tracking toggle
  let eyeTrackingBtn = createButton('Hide Eye Tracking');
  eyeTrackingBtn.parent(controlContainer);
  eyeTrackingBtn.style('padding', '8px 16px');
  eyeTrackingBtn.style('border', '1px solid #3498db');
  eyeTrackingBtn.style('border-radius', '4px');
  eyeTrackingBtn.style('background', '#3498db');
  eyeTrackingBtn.style('color', 'white');
  eyeTrackingBtn.style('cursor', 'pointer');
  eyeTrackingBtn.style('font-size', '13px');
  eyeTrackingBtn.mousePressed(() => {
    eyeTrackingEnabled = !eyeTrackingEnabled;
    eyeTrackingBtn.html(eyeTrackingEnabled ? 'Hide Eye Tracking' : 'Show Eye Tracking');
  });

  // Try it yourself button
  let tryItBtn = createButton('Try It Yourself');
  tryItBtn.parent(controlContainer);
  tryItBtn.style('padding', '8px 16px');
  tryItBtn.style('border', '1px solid #27ae60');
  tryItBtn.style('border-radius', '4px');
  tryItBtn.style('background', '#27ae60');
  tryItBtn.style('color', 'white');
  tryItBtn.style('cursor', 'pointer');
  tryItBtn.style('font-size', '13px');
  tryItBtn.mousePressed(() => {
    tryItMode = !tryItMode;
    revealStep = 0;
    tryItBtn.html(tryItMode ? 'Exit Try It Mode' : 'Try It Yourself');
  });

  // Next step button (for try it mode)
  let nextBtn = createButton('Reveal Next');
  nextBtn.parent(controlContainer);
  nextBtn.id('next-btn');
  nextBtn.style('padding', '8px 16px');
  nextBtn.style('border', '1px solid #9b59b6');
  nextBtn.style('border-radius', '4px');
  nextBtn.style('background', '#9b59b6');
  nextBtn.style('color', 'white');
  nextBtn.style('cursor', 'pointer');
  nextBtn.style('font-size', '13px');
  nextBtn.mousePressed(() => {
    if (tryItMode && revealStep < 4) {
      revealStep++;
    }
  });

  // Reset button
  let resetBtn = createButton('Reset Animation');
  resetBtn.parent(controlContainer);
  resetBtn.style('padding', '8px 16px');
  resetBtn.style('border', '1px solid #95a5a6');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('background', '#95a5a6');
  resetBtn.style('color', 'white');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('font-size', '13px');
  resetBtn.mousePressed(() => {
    animationTime = 0;
    leftPathIndex = 0;
    rightPathIndex = 0;
    pathProgress = 0;
  });
}

function draw() {
  updateCanvasSize();
  background(248, 249, 250);

  // Draw title
  drawTitle();

  // Draw both panels
  drawSplitAttentionPanel();
  drawIntegratedPanel();

  // Draw metrics comparison at bottom
  drawMetricsComparison();

  // Update eye tracking animation
  if (eyeTrackingEnabled && !tryItMode) {
    updateEyeTracking();
  }

  // Detect hover
  detectHover();

  // Draw hover tooltip
  if (hoveredElement && !tryItMode) {
    drawTooltip();
  }
}

function drawTitle() {
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Split Attention Effect Comparison", canvasWidth / 2, 10);
  textStyle(NORMAL);

  textSize(12);
  fill(100);
  text("Hover over elements to see cognitive cost analysis", canvasWidth / 2, 35);
}

function drawSplitAttentionPanel() {
  // Panel background
  fill(255);
  stroke(220);
  strokeWeight(2);
  rect(leftPanelX, panelY, panelWidth, panelHeight, 8);

  // Panel header with red indicator
  fill('#e74c3c');
  noStroke();
  rect(leftPanelX, panelY, panelWidth, 30, 8, 8, 0, 0);

  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Split Attention Design", leftPanelX + panelWidth/2, panelY + 15);
  textStyle(NORMAL);

  // Problematic label
  fill('#c0392b');
  textSize(10);
  text("(Problematic)", leftPanelX + panelWidth/2, panelY + 28);

  let contentY = panelY + 40;
  let contentHeight = panelHeight - 50;

  // Draw water cycle diagram with letter labels
  drawWaterCycleDiagram(leftPanelX + 10, contentY, panelWidth * 0.55, contentHeight * 0.5, true);

  // Draw legend box (separated from diagram)
  drawLegendBox(leftPanelX + panelWidth * 0.62, contentY + 10, panelWidth * 0.35, contentHeight * 0.45);

  // Draw separate text explanation
  drawSeparateTextBox(leftPanelX + 10, contentY + contentHeight * 0.55, panelWidth - 20, contentHeight * 0.4);

  // Draw eye tracking if enabled
  if (eyeTrackingEnabled && !tryItMode) {
    drawEyeTrackingPath(leftPanelX, contentY - 5, panelWidth, contentHeight, splitAttentionPath, leftEyePos, '#e74c3c');
  }

  // Draw mental load indicator
  drawMentalLoadIndicator(leftPanelX + 10, panelY + panelHeight - 25, "HIGH", '#e74c3c');
}

function drawIntegratedPanel() {
  // Panel background
  fill(255);
  stroke(220);
  strokeWeight(2);
  rect(rightPanelX, panelY, panelWidth, panelHeight, 8);

  // Panel header with green indicator
  fill('#27ae60');
  noStroke();
  rect(rightPanelX, panelY, panelWidth, 30, 8, 8, 0, 0);

  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Integrated Design", rightPanelX + panelWidth/2, panelY + 15);
  textStyle(NORMAL);

  // Effective label
  fill('#1e8449');
  textSize(10);
  text("(Effective)", rightPanelX + panelWidth/2, panelY + 28);

  let contentY = panelY + 40;
  let contentHeight = panelHeight - 50;

  // Draw integrated water cycle diagram with callout labels
  drawIntegratedDiagram(rightPanelX + 20, contentY + 10, panelWidth - 40, contentHeight - 30);

  // Draw eye tracking if enabled
  if (eyeTrackingEnabled && !tryItMode) {
    drawEyeTrackingPath(rightPanelX, contentY - 5, panelWidth, contentHeight, integratedPath, rightEyePos, '#27ae60');
  }

  // Draw mental load indicator
  drawMentalLoadIndicator(rightPanelX + 10, panelY + panelHeight - 25, "LOW", '#27ae60');
}

function drawWaterCycleDiagram(x, y, w, h, useLetters) {
  push();

  // Draw simple water cycle shapes
  // Ocean
  fill('#3498db');
  noStroke();
  rect(x, y + h * 0.7, w, h * 0.3, 0, 0, 5, 5);

  // Sun
  fill('#f1c40f');
  ellipse(x + w * 0.15, y + h * 0.15, 30, 30);

  // Cloud
  fill('#ecf0f1');
  stroke('#bdc3c7');
  strokeWeight(1);
  ellipse(x + w * 0.5, y + h * 0.2, 50, 25);
  ellipse(x + w * 0.45, y + h * 0.22, 35, 20);
  ellipse(x + w * 0.58, y + h * 0.22, 40, 22);

  // Mountain
  fill('#7f8c8d');
  noStroke();
  triangle(x + w * 0.75, y + h * 0.7, x + w * 0.55, y + h * 0.35, x + w * 0.95, y + h * 0.35);

  // Arrows
  stroke('#2c3e50');
  strokeWeight(2);
  // Evaporation arrow (up)
  drawArrow(x + w * 0.25, y + h * 0.65, x + w * 0.35, y + h * 0.35);
  // Rain arrow (down)
  drawArrow(x + w * 0.55, y + h * 0.35, x + w * 0.6, y + h * 0.55);
  // Collection arrow (horizontal)
  drawArrow(x + w * 0.85, y + h * 0.65, x + w * 0.35, y + h * 0.75);

  // Letter labels (problematic design)
  if (useLetters) {
    fill('#e74c3c');
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    // A - Evaporation
    ellipse(x + w * 0.22, y + h * 0.55, 20, 20);
    fill(255);
    text("A", x + w * 0.22, y + h * 0.55);

    // B - Condensation
    fill('#e74c3c');
    ellipse(x + w * 0.5, y + h * 0.08, 20, 20);
    fill(255);
    text("B", x + w * 0.5, y + h * 0.08);

    // C - Precipitation
    fill('#e74c3c');
    ellipse(x + w * 0.68, y + h * 0.45, 20, 20);
    fill(255);
    text("C", x + w * 0.68, y + h * 0.45);

    // D - Collection
    fill('#e74c3c');
    ellipse(x + w * 0.6, y + h * 0.82, 20, 20);
    fill(255);
    text("D", x + w * 0.6, y + h * 0.82);

    textStyle(NORMAL);
  }

  pop();
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);

  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 8;

  push();
  translate(x2, y2);
  rotate(angle);
  line(0, 0, -arrowSize, -arrowSize/2);
  line(0, 0, -arrowSize, arrowSize/2);
  pop();
}

function drawLegendBox(x, y, w, h) {
  // Legend background
  fill(255);
  stroke('#bdc3c7');
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Legend title
  fill(50);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Legend:", x + 8, y + 8);
  textStyle(NORMAL);

  // Legend items
  textSize(9);
  let itemY = y + 25;
  let spacing = h / 5.5;

  for (let elem of waterCycleElements) {
    fill('#e74c3c');
    textStyle(BOLD);
    text(elem.id + ":", x + 8, itemY);
    textStyle(NORMAL);
    fill(60);
    text(elem.name, x + 25, itemY);
    itemY += spacing;
  }
}

function drawSeparateTextBox(x, y, w, h) {
  // Text box background
  fill('#fdf6e3');
  stroke('#f39c12');
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Text content
  fill(60);
  noStroke();
  textSize(9);
  textAlign(LEFT, TOP);

  let textContent = "The water cycle is a continuous process where water moves between the Earth's surface and atmosphere. It involves evaporation from bodies of water, condensation forming clouds, precipitation falling as rain or snow, and collection in oceans and lakes. This process is essential for life on Earth.";

  // Simple text wrapping
  let words = textContent.split(' ');
  let line = '';
  let lineY = y + 8;
  let maxWidth = w - 16;

  for (let word of words) {
    let testLine = line + word + ' ';
    if (textWidth(testLine) > maxWidth) {
      text(line, x + 8, lineY);
      line = word + ' ';
      lineY += 12;
    } else {
      line = testLine;
    }
  }
  text(line, x + 8, lineY);
}

function drawIntegratedDiagram(x, y, w, h) {
  push();

  let showSteps = tryItMode ? revealStep : 4;

  // Ocean
  if (showSteps >= 1) {
    fill('#3498db');
    noStroke();
    rect(x, y + h * 0.65, w, h * 0.35, 0, 0, 5, 5);

    // Integrated label for ocean/collection
    drawCalloutLabel(x + w * 0.7, y + h * 0.75, "Collection", "Water gathers in\noceans & lakes", '#27ae60');
  }

  // Sun with evaporation label
  if (showSteps >= 1) {
    fill('#f1c40f');
    noStroke();
    ellipse(x + w * 0.12, y + h * 0.12, 35, 35);

    // Evaporation callout
    drawCalloutLabel(x + w * 0.08, y + h * 0.45, "Evaporation", "Sun heats water,\nrising as vapor", '#27ae60');
  }

  // Evaporation arrow
  if (showSteps >= 2) {
    stroke('#27ae60');
    strokeWeight(2);
    drawArrow(x + w * 0.2, y + h * 0.6, x + w * 0.3, y + h * 0.35);
  }

  // Cloud with condensation label
  if (showSteps >= 2) {
    fill('#ecf0f1');
    stroke('#bdc3c7');
    strokeWeight(1);
    ellipse(x + w * 0.45, y + h * 0.18, 55, 28);
    ellipse(x + w * 0.38, y + h * 0.2, 40, 22);
    ellipse(x + w * 0.55, y + h * 0.2, 45, 25);

    // Condensation callout
    drawCalloutLabel(x + w * 0.45, y + h * 0.05, "Condensation", "Vapor cools,\nforming clouds", '#27ae60');
  }

  // Mountain
  if (showSteps >= 3) {
    fill('#7f8c8d');
    noStroke();
    triangle(x + w * 0.8, y + h * 0.65, x + w * 0.6, y + h * 0.3, x + w, y + h * 0.3);

    // Precipitation callout and arrow
    stroke('#27ae60');
    strokeWeight(2);
    drawArrow(x + w * 0.52, y + h * 0.32, x + w * 0.58, y + h * 0.5);

    drawCalloutLabel(x + w * 0.72, y + h * 0.35, "Precipitation", "Rain or snow\nfalls to Earth", '#27ae60');
  }

  // Collection arrow
  if (showSteps >= 4) {
    stroke('#27ae60');
    strokeWeight(2);
    drawArrow(x + w * 0.9, y + h * 0.6, x + w * 0.3, y + h * 0.72);
  }

  // Try it mode instruction
  if (tryItMode && showSteps < 4) {
    fill(100);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("Click 'Reveal Next' to see more", x + w/2, y + h - 10);
  }

  pop();
}

function drawCalloutLabel(x, y, title, description, color) {
  push();

  // Callout box
  let boxWidth = 85;
  let boxHeight = 38;

  fill(255, 245);
  stroke(color);
  strokeWeight(2);
  rect(x - boxWidth/2, y, boxWidth, boxHeight, 5);

  // Title
  fill(color);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(title, x, y + 4);
  textStyle(NORMAL);

  // Description
  fill(70);
  textSize(8);
  let lines = description.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, y + 16 + i * 10);
  }

  pop();
}

function drawEyeTrackingPath(panelX, panelY, panelW, panelH, path, currentPos, color) {
  push();

  // Draw full path with low opacity
  stroke(color);
  strokeWeight(1);
  noFill();

  beginShape();
  for (let point of path) {
    let px = panelX + point.x * panelW;
    let py = panelY + point.y * panelH;
    vertex(px, py);
  }
  endShape();

  // Draw fixation points
  fill(color + '40');
  noStroke();
  for (let point of path) {
    let px = panelX + point.x * panelW;
    let py = panelY + point.y * panelH;
    ellipse(px, py, 12, 12);
  }

  // Draw current eye position (animated gaze point)
  let eyeX = panelX + currentPos.x * panelW;
  let eyeY = panelY + currentPos.y * panelH;

  // Gaze point with pulse effect
  let pulse = sin(frameCount * 0.1) * 3 + 10;
  fill(color + '60');
  noStroke();
  ellipse(eyeX, eyeY, pulse + 10, pulse + 10);

  fill(color);
  ellipse(eyeX, eyeY, 14, 14);

  fill(255);
  ellipse(eyeX, eyeY, 6, 6);

  pop();
}

function updateEyeTracking() {
  pathProgress += animationSpeed;

  if (pathProgress >= 1) {
    pathProgress = 0;
    leftPathIndex = (leftPathIndex + 1) % splitAttentionPath.length;
    rightPathIndex = (rightPathIndex + 1) % integratedPath.length;
  }

  // Interpolate left eye position
  let leftFrom = splitAttentionPath[leftPathIndex];
  let leftTo = splitAttentionPath[(leftPathIndex + 1) % splitAttentionPath.length];
  leftEyePos.x = lerp(leftFrom.x, leftTo.x, pathProgress);
  leftEyePos.y = lerp(leftFrom.y, leftTo.y, pathProgress);

  // Interpolate right eye position (slower for integrated design)
  let rightFrom = integratedPath[rightPathIndex];
  let rightTo = integratedPath[(rightPathIndex + 1) % integratedPath.length];
  rightEyePos.x = lerp(rightFrom.x, rightTo.x, pathProgress);
  rightEyePos.y = lerp(rightFrom.y, rightTo.y, pathProgress);
}

function drawMentalLoadIndicator(x, y, level, color) {
  push();

  fill(color);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text("Mental Load: " + level, x, y);
  textStyle(NORMAL);

  // Load bar
  let barWidth = 80;
  let barHeight = 8;
  let barX = x + 90;

  fill(230);
  rect(barX, y - 4, barWidth, barHeight, 3);

  fill(color);
  let fillWidth = level === "HIGH" ? barWidth * 0.9 : barWidth * 0.3;
  rect(barX, y - 4, fillWidth, barHeight, 3);

  pop();
}

function drawMetricsComparison() {
  let metricsY = drawHeight - 30;
  let colWidth = canvasWidth / 5;

  // Background bar
  fill(240);
  noStroke();
  rect(0, metricsY - 5, canvasWidth, 35);

  // Metrics labels and values
  textSize(9);
  textAlign(CENTER, TOP);

  let metrics = [
    {label: "Eye Movement", split: cognitiveAnalysis.split.eyeMovementDistance, integrated: cognitiveAnalysis.integrated.eyeMovementDistance},
    {label: "Time to Learn", split: cognitiveAnalysis.split.timeToComprehension, integrated: cognitiveAnalysis.integrated.timeToComprehension},
    {label: "Working Memory", split: cognitiveAnalysis.split.workingMemoryLoad, integrated: cognitiveAnalysis.integrated.workingMemoryLoad},
    {label: "Retention", split: cognitiveAnalysis.split.learningOutcome, integrated: cognitiveAnalysis.integrated.learningOutcome}
  ];

  for (let i = 0; i < metrics.length; i++) {
    let x = colWidth * (i + 0.7);

    fill(80);
    textStyle(BOLD);
    text(metrics[i].label, x, metricsY);
    textStyle(NORMAL);

    fill('#e74c3c');
    text(metrics[i].split, x - 35, metricsY + 12);

    fill('#27ae60');
    text(metrics[i].integrated, x + 35, metricsY + 12);
  }
}

function detectHover() {
  hoveredElement = null;
  hoveredPanel = null;

  // Check left panel
  if (mouseX >= leftPanelX && mouseX <= leftPanelX + panelWidth &&
      mouseY >= panelY && mouseY <= panelY + panelHeight) {
    hoveredPanel = 'split';

    // Check for specific element hover (simplified)
    for (let elem of waterCycleElements) {
      let elemX = leftPanelX + 10 + (panelWidth * 0.55) * elem.x;
      let elemY = panelY + 40 + (panelHeight - 50) * 0.5 * elem.y;
      if (dist(mouseX, mouseY, elemX, elemY) < 25) {
        hoveredElement = elem;
        break;
      }
    }
  }

  // Check right panel
  if (mouseX >= rightPanelX && mouseX <= rightPanelX + panelWidth &&
      mouseY >= panelY && mouseY <= panelY + panelHeight) {
    hoveredPanel = 'integrated';
  }
}

function drawTooltip() {
  if (!hoveredElement) return;

  let tooltipWidth = 180;
  let tooltipHeight = 85;
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY - tooltipHeight/2;

  // Keep tooltip on screen
  if (tooltipX + tooltipWidth > canvasWidth) {
    tooltipX = mouseX - tooltipWidth - 15;
  }
  if (tooltipY < 0) tooltipY = 5;
  if (tooltipY + tooltipHeight > canvasHeight) tooltipY = canvasHeight - tooltipHeight - 5;

  // Tooltip background
  fill(255, 250);
  stroke(100);
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);

  // Content
  fill(50);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(hoveredElement.id + ": " + hoveredElement.name, tooltipX + 10, tooltipY + 10);
  textStyle(NORMAL);

  textSize(10);
  fill(80);
  text(hoveredElement.desc, tooltipX + 10, tooltipY + 28);

  // Cognitive cost
  fill('#e74c3c');
  textSize(9);
  textStyle(BOLD);
  text("Cognitive Cost (Split):", tooltipX + 10, tooltipY + 50);
  textStyle(NORMAL);
  fill(80);
  text("Requires 2 eye movements", tooltipX + 10, tooltipY + 62);
  text("+ working memory to hold letter", tooltipX + 10, tooltipY + 72);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateDimensions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    calculateDimensions();
  }
}
