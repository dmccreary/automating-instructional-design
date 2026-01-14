// Engagement-Learning Tradeoff MicroSim
// Interactive scatter plot showing the relationship between engagement features
// and learning effectiveness, with zones and trend curve

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;

// Chart dimensions
let chartX, chartY, chartW, chartH;

// User's custom point
let userEngagement = 5;
let userLearning = 7;
let showUserPoint = false;

// Slider
let engagementSlider;
let sliderLabel;

// Data points with labels
const dataPoints = [
  { x: 1, y: 3, label: "Static Diagram", description: "Simple image with no interaction. Low engagement but limited learning potential.", zone: "boring" },
  { x: 2, y: 4, label: "Labeled Image", description: "Static visual with text annotations. Slightly more informative but passive.", zone: "boring" },
  { x: 3, y: 6, label: "Step-by-Step Guide", description: "Structured walkthrough. Clear but may not engage deeply.", zone: "approaching" },
  { x: 5, y: 8, label: "Interactive Simulation", description: "Hands-on exploration with immediate feedback. Optimal balance of engagement and learning.", zone: "optimal" },
  { x: 4.5, y: 7.5, label: "Adaptive Quiz", description: "Personalized assessment with hints. Engaging and promotes retention.", zone: "optimal" },
  { x: 5.5, y: 8.5, label: "Guided Discovery", description: "Scaffolded exploration with clear learning objectives. Peak effectiveness.", zone: "optimal" },
  { x: 7, y: 6.5, label: "Complex Game", description: "Rich mechanics may distract from core concepts. Engagement high but learning diluted.", zone: "distraction" },
  { x: 9, y: 5, label: "Game-Heavy Design", description: "Gamification overshadows content. Students remember game, forget lesson.", zone: "distraction" },
  { x: 8, y: 4.5, label: "Social Competition", description: "Leaderboards and badges shift focus from learning to winning.", zone: "distraction" },
  { x: 6, y: 7, label: "Exploratory Sandbox", description: "Open-ended play with learning goals. Good balance with slight engagement emphasis.", zone: "approaching" }
];

// Zone definitions
const zones = [
  {
    name: "Boring Zone",
    x1: 0, x2: 3, y1: 0, y2: 10,
    color: [255, 200, 200, 80],
    borderColor: [200, 100, 100],
    recommendation: "Low engagement leads to disinterest. Consider adding interactivity, immediate feedback, or visual interest to capture attention without overwhelming the learner."
  },
  {
    name: "Optimal Balance",
    x1: 4, x2: 6, y1: 7, y2: 10,
    color: [200, 255, 200, 100],
    borderColor: [50, 150, 50],
    recommendation: "The sweet spot! Engagement features here support learning rather than distract. Focus on meaningful interactivity tied directly to learning objectives."
  },
  {
    name: "Distraction Risk",
    x1: 7, x2: 10, y1: 0, y2: 10,
    color: [255, 230, 200, 80],
    borderColor: [200, 150, 100],
    recommendation: "Too many engagement features can overshadow learning goals. Reduce gamification elements and ensure every feature serves a clear educational purpose."
  }
];

// State
let hoveredPoint = null;
let selectedZone = null;
let tooltipVisible = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  calculateChartDimensions();
  createControls();

  describe('Interactive scatter plot showing the tradeoff between engagement features and learning effectiveness. Hover over points to see examples, click zones for design recommendations, and use the slider to place your own design point.', LABEL);
}

function calculateChartDimensions() {
  chartX = margin + 20;
  chartY = 50;
  chartW = canvasWidth - margin - chartX - 20;
  chartH = drawHeight - chartY - margin - 20;
}

function createControls() {
  // Create control container
  let controlContainer = createDiv('');
  controlContainer.parent(document.querySelector('main'));
  controlContainer.style('display', 'flex');
  controlContainer.style('flex-wrap', 'wrap');
  controlContainer.style('gap', '20px');
  controlContainer.style('padding', '12px 20px');
  controlContainer.style('font-family', 'Arial, sans-serif');
  controlContainer.style('background', '#f5f5f5');
  controlContainer.style('border-radius', '8px');
  controlContainer.style('margin-top', '10px');
  controlContainer.style('align-items', 'center');

  // Slider container
  let sliderDiv = createDiv('');
  sliderDiv.parent(controlContainer);
  sliderDiv.style('display', 'flex');
  sliderDiv.style('align-items', 'center');
  sliderDiv.style('gap', '10px');

  let label = createSpan('Your Design Engagement Level:');
  label.parent(sliderDiv);
  label.style('font-size', '14px');
  label.style('color', '#333');

  engagementSlider = createSlider(0, 10, 5, 0.5);
  engagementSlider.parent(sliderDiv);
  engagementSlider.style('width', '200px');
  engagementSlider.input(onSliderChange);

  sliderLabel = createSpan('5.0');
  sliderLabel.parent(sliderDiv);
  sliderLabel.style('font-size', '14px');
  sliderLabel.style('font-weight', 'bold');
  sliderLabel.style('color', '#2196F3');
  sliderLabel.style('min-width', '30px');

  // Show point checkbox
  let checkDiv = createDiv('');
  checkDiv.parent(controlContainer);
  checkDiv.style('display', 'flex');
  checkDiv.style('align-items', 'center');
  checkDiv.style('gap', '8px');

  let checkbox = createCheckbox('Show my design point', false);
  checkbox.parent(checkDiv);
  checkbox.style('font-size', '14px');
  checkbox.changed(() => {
    showUserPoint = checkbox.checked();
    if (showUserPoint) {
      updateUserPoint();
    }
  });

  // Instructions
  let instrDiv = createDiv('');
  instrDiv.parent(controlContainer);
  instrDiv.style('flex', '1');
  instrDiv.style('text-align', 'right');

  let instructions = createSpan('Hover points for details | Click zones for recommendations');
  instructions.parent(instrDiv);
  instructions.style('font-size', '12px');
  instructions.style('color', '#666');
}

function onSliderChange() {
  userEngagement = engagementSlider.value();
  sliderLabel.html(userEngagement.toFixed(1));
  updateUserPoint();
}

function updateUserPoint() {
  // Calculate learning based on trend curve
  userLearning = getTrendValue(userEngagement);
}

// Trend curve function - shows diminishing returns
function getTrendValue(x) {
  // Quadratic function with peak around x=5
  // y = -0.2(x-5)^2 + 8.5
  let y = -0.2 * pow(x - 5, 2) + 8.5;
  return constrain(y, 0, 10);
}

function draw() {
  updateCanvasSize();

  // Background
  background(250);

  // Title
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Engagement vs. Learning Effectiveness", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Subtitle
  fill(100);
  textSize(12);
  text("Finding the optimal balance in educational design", canvasWidth / 2, 36);

  calculateChartDimensions();

  // Draw chart area
  drawChartBackground();
  drawZones();
  drawTrendCurve();
  drawAxes();
  drawDataPoints();

  if (showUserPoint) {
    drawUserPoint();
  }

  // Draw tooltip or zone info
  if (hoveredPoint !== null) {
    drawTooltip(hoveredPoint);
  } else if (selectedZone !== null) {
    drawZoneInfo(selectedZone);
  }
}

function drawChartBackground() {
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(chartX, chartY, chartW, chartH);
}

function drawZones() {
  noStroke();

  for (let zone of zones) {
    // Convert zone coordinates to pixel positions
    let x1 = map(zone.x1, 0, 10, chartX, chartX + chartW);
    let x2 = map(zone.x2, 0, 10, chartX, chartX + chartW);
    let y1 = map(zone.y1, 0, 10, chartY + chartH, chartY);
    let y2 = map(zone.y2, 0, 10, chartY + chartH, chartY);

    // Clip to chart bounds
    x1 = constrain(x1, chartX, chartX + chartW);
    x2 = constrain(x2, chartX, chartX + chartW);
    y1 = constrain(y1, chartY, chartY + chartH);
    y2 = constrain(y2, chartY, chartY + chartH);

    // Draw zone fill
    fill(zone.color);
    rect(x1, y2, x2 - x1, y1 - y2);

    // Draw zone border (dashed effect with segments)
    stroke(zone.borderColor);
    strokeWeight(2);
    noFill();
    drawingContext.setLineDash([5, 5]);
    rect(x1, y2, x2 - x1, y1 - y2);
    drawingContext.setLineDash([]);

    // Zone label
    fill(zone.borderColor);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    textStyle(BOLD);

    let labelX = (x1 + x2) / 2;
    let labelY = y2 + 5;
    text(zone.name, labelX, labelY);
    textStyle(NORMAL);
  }
}

function drawTrendCurve() {
  stroke(80);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let x = 0; x <= 10; x += 0.2) {
    let y = getTrendValue(x);
    let px = map(x, 0, 10, chartX, chartX + chartW);
    let py = map(y, 0, 10, chartY + chartH, chartY);
    vertex(px, py);
  }
  endShape();

  // Curve label
  fill(80);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  textStyle(ITALIC);
  let labelX = map(7.5, 0, 10, chartX, chartX + chartW);
  let labelY = map(getTrendValue(7.5), 0, 10, chartY + chartH, chartY);
  text("Trend (diminishing returns)", labelX + 5, labelY - 15);
  textStyle(NORMAL);
}

function drawAxes() {
  stroke(50);
  strokeWeight(2);

  // X-axis
  line(chartX, chartY + chartH, chartX + chartW, chartY + chartH);
  // Y-axis
  line(chartX, chartY, chartX, chartY + chartH);

  // X-axis label
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Engagement Features", chartX + chartW / 2, chartY + chartH + 35);
  textStyle(NORMAL);

  // Y-axis label
  push();
  translate(20, chartY + chartH / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Learning Effectiveness", 0, 0);
  textStyle(NORMAL);
  pop();

  // X-axis ticks and labels
  textSize(11);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 10; i += 2) {
    let x = map(i, 0, 10, chartX, chartX + chartW);
    stroke(50);
    strokeWeight(1);
    line(x, chartY + chartH, x, chartY + chartH + 5);
    noStroke();
    fill(80);
    text(i, x, chartY + chartH + 8);
  }

  // Y-axis ticks and labels
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 10; i += 2) {
    let y = map(i, 0, 10, chartY + chartH, chartY);
    stroke(50);
    strokeWeight(1);
    line(chartX - 5, y, chartX, y);
    noStroke();
    fill(80);
    text(i, chartX - 10, y);
  }

  // Grid lines
  stroke(230);
  strokeWeight(1);
  for (let i = 2; i <= 10; i += 2) {
    let x = map(i, 0, 10, chartX, chartX + chartW);
    let y = map(i, 0, 10, chartY + chartH, chartY);
    line(x, chartY, x, chartY + chartH);
    line(chartX, y, chartX + chartW, y);
  }
}

function drawDataPoints() {
  hoveredPoint = null;

  for (let i = 0; i < dataPoints.length; i++) {
    let point = dataPoints[i];
    let px = map(point.x, 0, 10, chartX, chartX + chartW);
    let py = map(point.y, 0, 10, chartY + chartH, chartY);

    // Check if mouse is hovering
    let d = dist(mouseX, mouseY, px, py);
    let isHovered = d < 15;

    if (isHovered) {
      hoveredPoint = i;
    }

    // Draw point
    if (isHovered) {
      fill(41, 128, 185);
      stroke(255);
      strokeWeight(3);
      ellipse(px, py, 20, 20);
    } else {
      fill(52, 152, 219);
      stroke(255);
      strokeWeight(2);
      ellipse(px, py, 14, 14);
    }
  }
}

function drawUserPoint() {
  let px = map(userEngagement, 0, 10, chartX, chartX + chartW);
  let py = map(userLearning, 0, 10, chartY + chartH, chartY);

  // Pulsing effect
  let pulse = sin(frameCount * 0.1) * 2 + 2;

  // Outer glow
  noStroke();
  fill(233, 30, 99, 50);
  ellipse(px, py, 30 + pulse, 30 + pulse);

  // Point
  fill(233, 30, 99);
  stroke(255);
  strokeWeight(3);
  ellipse(px, py, 18, 18);

  // Label
  fill(50);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text("Your Design", px + 15, py);
  textStyle(NORMAL);
  textSize(10);
  text("(" + userEngagement.toFixed(1) + ", " + userLearning.toFixed(1) + ")", px + 15, py + 14);

  // Zone feedback
  let zoneFeedback = getZoneFeedback(userEngagement, userLearning);
  if (zoneFeedback) {
    fill(zoneFeedback.color);
    textSize(10);
    textAlign(LEFT, TOP);
    text(zoneFeedback.message, px + 15, py + 28);
  }
}

function getZoneFeedback(x, y) {
  if (x <= 3) {
    return { message: "Consider adding more engagement", color: [180, 80, 80] };
  } else if (x >= 7) {
    return { message: "Watch for distraction risk", color: [180, 120, 80] };
  } else if (x >= 4 && x <= 6 && y >= 7) {
    return { message: "Great balance!", color: [50, 150, 50] };
  }
  return null;
}

function drawTooltip(index) {
  let point = dataPoints[index];
  let px = map(point.x, 0, 10, chartX, chartX + chartW);
  let py = map(point.y, 0, 10, chartY + chartH, chartY);

  let tooltipW = 250;
  let tooltipH = 85;

  // Position tooltip
  let tooltipX = px + 20;
  let tooltipY = py - tooltipH / 2;

  // Keep on screen
  if (tooltipX + tooltipW > canvasWidth - 10) {
    tooltipX = px - tooltipW - 20;
  }
  if (tooltipY < chartY) {
    tooltipY = chartY + 5;
  }
  if (tooltipY + tooltipH > chartY + chartH) {
    tooltipY = chartY + chartH - tooltipH - 5;
  }

  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(tooltipX + 3, tooltipY + 3, tooltipW, tooltipH, 8);

  // Background
  fill(255, 255, 255, 250);
  stroke(52, 152, 219);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipW, tooltipH, 8);

  // Header
  fill(52, 152, 219);
  noStroke();
  rect(tooltipX, tooltipY, tooltipW, 26, 8, 8, 0, 0);

  fill(255);
  textSize(13);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(point.label, tooltipX + 10, tooltipY + 13);
  textStyle(NORMAL);

  // Coordinates
  fill(100);
  textSize(10);
  textAlign(RIGHT, CENTER);
  text("(" + point.x + ", " + point.y + ")", tooltipX + tooltipW - 10, tooltipY + 13);

  // Description
  fill(60);
  textSize(11);
  textAlign(LEFT, TOP);
  text(point.description, tooltipX + 10, tooltipY + 35, tooltipW - 20, 45);
}

function drawZoneInfo(zone) {
  let infoW = min(400, canvasWidth - 40);
  let infoH = 70;
  let infoX = (canvasWidth - infoW) / 2;
  let infoY = chartY + chartH - infoH - 10;

  // Shadow
  fill(0, 0, 0, 25);
  noStroke();
  rect(infoX + 2, infoY + 2, infoW, infoH, 8);

  // Background
  fill(255, 255, 250);
  stroke(zone.borderColor);
  strokeWeight(2);
  rect(infoX, infoY, infoW, infoH, 8);

  // Title
  fill(zone.borderColor);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(zone.name + " - Design Recommendation:", infoX + 12, infoY + 10);
  textStyle(NORMAL);

  // Recommendation
  fill(60);
  textSize(11);
  text(zone.recommendation, infoX + 12, infoY + 30, infoW - 24, 35);

  // Close hint
  fill(120);
  textSize(9);
  textAlign(RIGHT, BOTTOM);
  text("Click elsewhere to close", infoX + infoW - 10, infoY + infoH - 5);
}

function mousePressed() {
  // Check if clicking on a zone
  if (mouseX >= chartX && mouseX <= chartX + chartW &&
      mouseY >= chartY && mouseY <= chartY + chartH) {

    // Convert mouse position to data coordinates
    let dataX = map(mouseX, chartX, chartX + chartW, 0, 10);
    let dataY = map(mouseY, chartY + chartH, chartY, 0, 10);

    // Check which zone was clicked
    selectedZone = null;
    for (let zone of zones) {
      if (dataX >= zone.x1 && dataX <= zone.x2 &&
          dataY >= zone.y1 && dataY <= zone.y2) {
        selectedZone = zone;
        break;
      }
    }
  } else {
    selectedZone = null;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateChartDimensions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasHeight = drawHeight + controlHeight;
    calculateChartDimensions();
  }
}
