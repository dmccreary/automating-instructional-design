// Page View Tracking vs Simulation Tracking Comparison MicroSim
// Analyzes differences between traditional analytics and xAPI tracking

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = 500;

// State
let hoveredMetric = null;
let hoveredColumn = null;
let activeColumn = null;
let showDetailedView = false;

// Colors
let orangeColor, blueColor, redColor, greenColor, bgColor, textColor;

// Metric data
let pageViewMetrics = [
  { name: "Page URL visited", example: "/course/lesson-5/simulation.html", shortExample: "lesson-5/sim.html" },
  { name: "Time on page", example: "Average: 4 minutes 32 seconds", shortExample: "Avg: 4m 32s" },
  { name: "Referrer source", example: "From: course-navigation/lesson-4", shortExample: "From: lesson-4" },
  { name: "Device/browser", example: "Chrome 120, Windows 11, Desktop", shortExample: "Chrome, Win11" },
  { name: "Geographic location", example: "City: Boston, MA, USA", shortExample: "Boston, MA" },
  { name: "Bounce rate", example: "32% left without interaction", shortExample: "32% bounced" }
];

let xapiMetrics = [
  { name: "Control interactions", example: "Clicked 'Run Simulation' button 3 times", shortExample: "3 button clicks" },
  { name: "Slider value changes", example: "Adjusted friction from 0.2 to 0.8 over 45s", shortExample: "0.2 -> 0.8 friction" },
  { name: "Button timestamps", example: "Reset: 0:12, 1:45, 2:30, 3:15", shortExample: "4 resets tracked" },
  { name: "Prediction accuracy", example: "Predicted 45N, Actual 42N (93% accurate)", shortExample: "93% accurate" },
  { name: "Activity time", example: "Spent 2m on hypothesis, 1.5m testing", shortExample: "2m hypothesis" },
  { name: "Interaction sequence", example: "Read -> Predict -> Test -> Adjust -> Verify", shortExample: "5-step sequence" }
];

// Sample data for detailed view
let samplePageViewData = [
  "GET /sim/physics.html 200 OK",
  "Session: 4m 32s",
  "Referrer: /lesson-4",
  "User-Agent: Chrome/120",
  "Location: Boston, MA",
  "Exit: /lesson-6"
];

let sampleXAPIData = [
  '{actor: "student@edu", verb: "launched"}',
  '{verb: "adjusted", object: "friction", value: 0.5}',
  '{verb: "predicted", object: "force", value: 45}',
  '{verb: "ran", object: "simulation"}',
  '{verb: "observed", result: 42}',
  '{verb: "reflected", duration: "45s"}'
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.clientWidth;
  } else {
    canvasWidth = min(windowWidth - 40, 800);
  }
  canvasWidth = min(canvasWidth, 900);
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Define colors
  orangeColor = color(245, 158, 11);      // Orange/yellow for page view
  blueColor = color(79, 70, 229);         // Blue/purple for xAPI
  redColor = color(220, 38, 38);          // Red for limitation
  greenColor = color(22, 163, 74);        // Green for advantage
  bgColor = color(248, 250, 252);         // Light background
  textColor = color(30, 41, 59);          // Dark text

  textFont('Arial');
  textAlign(CENTER, CENTER);
}

function draw() {
  background(bgColor);

  // Calculate column dimensions
  let colWidth = (canvasWidth - 60) / 2;
  let leftColX = 20;
  let rightColX = canvasWidth / 2 + 10;
  let colY = 60;
  let colHeight = drawHeight - 100;

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Page-View Tracking vs Simulation Tracking", canvasWidth / 2, 25);

  // Draw center comparison arrow and text
  drawCenterComparison();

  // Draw left column (Page View Tracking)
  drawColumn(leftColX, colY, colWidth, colHeight, "left",
    "What Traditional Analytics See", orangeColor, pageViewMetrics,
    "Cannot see interactions within the page", redColor);

  // Draw right column (xAPI Tracking)
  drawColumn(rightColX, colY, colWidth, colHeight, "right",
    "What xAPI Sees", blueColor, xapiMetrics,
    "Fine-grained learning behavior data", greenColor);

  // Draw toggle button
  drawToggleButton();

  // Draw detailed view if active
  if (showDetailedView && activeColumn) {
    drawDetailedView();
  }

  // Draw hover tooltip
  if (hoveredMetric !== null && !showDetailedView) {
    drawTooltip();
  }
}

function drawColumn(x, y, w, h, side, title, accentColor, metrics, calloutText, calloutColor) {
  let isHovered = hoveredColumn === side;
  let isActive = activeColumn === side;

  // Column background
  fill(255);
  stroke(accentColor);
  strokeWeight(isHovered || isActive ? 3 : 2);
  rect(x, y, w, h, 12);

  // Column header
  fill(accentColor);
  noStroke();
  rect(x, y, w, 50, 12, 12, 0, 0);

  // Draw icon
  push();
  translate(x + 30, y + 25);
  if (side === "left") {
    drawEyeIcon();
  } else {
    drawMagnifyingGlassIcon();
  }
  pop();

  // Title text
  fill(255);
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(title, x + 55, y + 25);

  // Metrics list
  textAlign(LEFT, TOP);
  let metricY = y + 65;
  let metricHeight = 38;

  for (let i = 0; i < metrics.length; i++) {
    let metric = metrics[i];
    let isMetricHovered = hoveredMetric && hoveredMetric.side === side && hoveredMetric.index === i;

    // Metric background on hover
    if (isMetricHovered) {
      fill(red(accentColor), green(accentColor), blue(accentColor), 30);
      noStroke();
      rect(x + 8, metricY - 4, w - 16, metricHeight, 6);
    }

    // Bullet point
    fill(accentColor);
    noStroke();
    ellipse(x + 18, metricY + 8, 6, 6);

    // Metric text
    fill(textColor);
    textSize(11);
    textStyle(NORMAL);
    text(metric.name, x + 28, metricY);

    metricY += metricHeight;
  }

  // Callout box at bottom
  let calloutY = y + h - 55;
  fill(red(calloutColor), green(calloutColor), blue(calloutColor), 25);
  stroke(calloutColor);
  strokeWeight(2);
  rect(x + 10, calloutY, w - 20, 45, 8);

  // Callout icon
  push();
  translate(x + 28, calloutY + 22);
  fill(calloutColor);
  noStroke();
  if (side === "left") {
    // Warning icon
    triangle(0, -8, -7, 6, 7, 6);
    fill(255);
    rect(-1.5, -4, 3, 7, 1);
    ellipse(0, 5, 3, 3);
  } else {
    // Check icon
    ellipse(0, 0, 16, 16);
    stroke(255);
    strokeWeight(2);
    line(-4, 0, -1, 4);
    line(-1, 4, 5, -4);
  }
  pop();

  // Callout text
  fill(calloutColor);
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(calloutText, x + 45, calloutY + 22);

  textAlign(CENTER, CENTER);
}

function drawEyeIcon() {
  // Eye outline
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(-12, 0);
  bezierVertex(-6, -8, 6, -8, 12, 0);
  bezierVertex(6, 8, -6, 8, -12, 0);
  endShape();

  // Pupil
  fill(255);
  noStroke();
  ellipse(0, 0, 10, 10);

  // Iris
  fill(orangeColor);
  ellipse(0, 0, 5, 5);
}

function drawMagnifyingGlassIcon() {
  // Lens
  stroke(255);
  strokeWeight(2);
  noFill();
  ellipse(-2, -2, 16, 16);

  // Handle
  strokeWeight(3);
  line(5, 5, 12, 12);

  // Sparkle lines inside lens
  strokeWeight(1.5);
  line(-6, -2, 2, -2);
  line(-4, 1, 0, 1);
  line(-5, 4, -1, 4);
}

function drawCenterComparison() {
  let centerX = canvasWidth / 2;
  let arrowY = drawHeight - 20;

  // Arrow line
  stroke(100);
  strokeWeight(2);
  let arrowStart = canvasWidth / 2 - 80;
  let arrowEnd = canvasWidth / 2 + 80;
  line(arrowStart, arrowY, arrowEnd, arrowY);

  // Arrow head
  fill(100);
  noStroke();
  triangle(arrowEnd, arrowY, arrowEnd - 10, arrowY - 5, arrowEnd - 10, arrowY + 5);

  // Label
  fill(textColor);
  textSize(11);
  textStyle(BOLD);
  text("More Detail", centerX, arrowY - 15);

  // Subtitle
  textSize(9);
  textStyle(ITALIC);
  fill(color(100, 116, 139));
  text("The difference between knowing someone was in the room", centerX, arrowY + 15);
  text("vs. knowing exactly what they did", centerX, arrowY + 27);
}

function drawToggleButton() {
  let btnX = canvasWidth / 2 - 70;
  let btnY = drawHeight + 10;
  let btnW = 140;
  let btnH = 30;

  // Button background
  let isHover = mouseX > btnX && mouseX < btnX + btnW &&
                mouseY > btnY && mouseY < btnY + btnH;

  fill(isHover ? color(79, 70, 229) : color(100, 116, 139));
  noStroke();
  rect(btnX, btnY, btnW, btnH, 6);

  // Button text
  fill(255);
  textSize(11);
  textStyle(BOLD);
  text(showDetailedView ? "Hide Sample Data" : "Show Sample Data", canvasWidth / 2, btnY + 15);
}

function drawDetailedView() {
  // Overlay background
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, canvasWidth, canvasHeight);

  // Modal
  let modalW = min(canvasWidth - 60, 500);
  let modalH = 320;
  let modalX = (canvasWidth - modalW) / 2;
  let modalY = (drawHeight - modalH) / 2;

  fill(255);
  stroke(activeColumn === "left" ? orangeColor : blueColor);
  strokeWeight(3);
  rect(modalX, modalY, modalW, modalH, 12);

  // Modal title
  let titleColor = activeColumn === "left" ? orangeColor : blueColor;
  fill(titleColor);
  textSize(14);
  textStyle(BOLD);
  let titleText = activeColumn === "left" ? "Sample Page View Data" : "Sample xAPI Statements";
  text(titleText, canvasWidth / 2, modalY + 25);

  // Close button
  fill(color(100, 116, 139));
  noStroke();
  ellipse(modalX + modalW - 20, modalY + 20, 24, 24);
  stroke(255);
  strokeWeight(2);
  line(modalX + modalW - 25, modalY + 15, modalX + modalW - 15, modalY + 25);
  line(modalX + modalW - 15, modalY + 15, modalX + modalW - 25, modalY + 25);

  // Data lines
  let dataLines = activeColumn === "left" ? samplePageViewData : sampleXAPIData;
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(NORMAL);

  let dataY = modalY + 55;
  for (let i = 0; i < dataLines.length; i++) {
    // Line number
    fill(color(150, 150, 150));
    text((i + 1) + ".", modalX + 20, dataY);

    // Code/data
    fill(textColor);
    if (activeColumn === "right") {
      // Syntax highlighting for xAPI
      let line = dataLines[i];
      fill(color(100, 100, 100));
      textStyle(NORMAL);

      // Simple monospace style
      push();
      textFont('Courier New');
      textSize(10);
      text(line, modalX + 45, dataY);
      pop();
    } else {
      text(dataLines[i], modalX + 45, dataY);
    }

    dataY += 35;
  }

  // Explanation
  textAlign(CENTER, CENTER);
  fill(color(100, 116, 139));
  textSize(10);
  textStyle(ITALIC);
  if (activeColumn === "left") {
    text("Traditional analytics only capture surface-level page metrics", canvasWidth / 2, modalY + modalH - 30);
  } else {
    text("xAPI captures every meaningful learning interaction with context", canvasWidth / 2, modalY + modalH - 30);
  }
}

function drawTooltip() {
  let metric;
  if (hoveredMetric.side === "left") {
    metric = pageViewMetrics[hoveredMetric.index];
  } else {
    metric = xapiMetrics[hoveredMetric.index];
  }

  let tooltipW = min(280, canvasWidth - 40);
  let tooltipH = 55;
  let tooltipX = constrain(mouseX - tooltipW / 2, 10, canvasWidth - tooltipW - 10);
  let tooltipY = mouseY - tooltipH - 15;

  if (tooltipY < 60) tooltipY = mouseY + 25;

  // Tooltip background
  fill(30, 41, 59, 240);
  noStroke();
  rect(tooltipX, tooltipY, tooltipW, tooltipH, 8);

  // Tooltip arrow
  let arrowX = constrain(mouseX, tooltipX + 20, tooltipX + tooltipW - 20);
  if (tooltipY < mouseY) {
    // Arrow pointing up (tooltip is below)
    triangle(arrowX - 8, tooltipY, arrowX + 8, tooltipY, arrowX, tooltipY - 8);
  } else {
    // Arrow pointing down
    triangle(arrowX - 8, tooltipY + tooltipH, arrowX + 8, tooltipY + tooltipH, arrowX, tooltipY + tooltipH + 8);
  }

  // Tooltip text
  fill(255);
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Example:", tooltipX + 12, tooltipY + 10);

  textStyle(NORMAL);
  textSize(10);
  fill(color(200, 200, 200));

  // Word wrap for example
  let exampleText = metric.example;
  text(exampleText, tooltipX + 12, tooltipY + 28, tooltipW - 24, tooltipH - 35);

  textAlign(CENTER, CENTER);
}

function mouseMoved() {
  hoveredMetric = null;
  hoveredColumn = null;

  if (showDetailedView) return;

  let colWidth = (canvasWidth - 60) / 2;
  let leftColX = 20;
  let rightColX = canvasWidth / 2 + 10;
  let colY = 60;
  let colHeight = drawHeight - 100;

  // Check left column
  if (mouseX > leftColX && mouseX < leftColX + colWidth &&
      mouseY > colY && mouseY < colY + colHeight) {
    hoveredColumn = "left";

    // Check individual metrics
    let metricY = colY + 65;
    let metricHeight = 38;
    for (let i = 0; i < pageViewMetrics.length; i++) {
      if (mouseY > metricY - 4 && mouseY < metricY + metricHeight - 4) {
        hoveredMetric = { side: "left", index: i };
        break;
      }
      metricY += metricHeight;
    }
  }

  // Check right column
  if (mouseX > rightColX && mouseX < rightColX + colWidth &&
      mouseY > colY && mouseY < colY + colHeight) {
    hoveredColumn = "right";

    // Check individual metrics
    let metricY = colY + 65;
    let metricHeight = 38;
    for (let i = 0; i < xapiMetrics.length; i++) {
      if (mouseY > metricY - 4 && mouseY < metricY + metricHeight - 4) {
        hoveredMetric = { side: "right", index: i };
        break;
      }
      metricY += metricHeight;
    }
  }

  // Update cursor
  if (hoveredMetric || hoveredColumn) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  // Check toggle button
  let btnX = canvasWidth / 2 - 70;
  let btnY = drawHeight + 10;
  let btnW = 140;
  let btnH = 30;

  if (mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    showDetailedView = !showDetailedView;
    if (showDetailedView && !activeColumn) {
      activeColumn = "left";
    }
    return;
  }

  // In detailed view, check for close or column switch
  if (showDetailedView) {
    let modalW = min(canvasWidth - 60, 500);
    let modalH = 320;
    let modalX = (canvasWidth - modalW) / 2;
    let modalY = (drawHeight - modalH) / 2;

    // Close button
    if (dist(mouseX, mouseY, modalX + modalW - 20, modalY + 20) < 12) {
      showDetailedView = false;
      return;
    }

    // Click outside modal to close
    if (mouseX < modalX || mouseX > modalX + modalW ||
        mouseY < modalY || mouseY > modalY + modalH) {
      showDetailedView = false;
      return;
    }
    return;
  }

  // Check column clicks
  let colWidth = (canvasWidth - 60) / 2;
  let leftColX = 20;
  let rightColX = canvasWidth / 2 + 10;
  let colY = 60;
  let colHeight = drawHeight - 100;

  if (mouseX > leftColX && mouseX < leftColX + colWidth &&
      mouseY > colY && mouseY < colY + colHeight) {
    activeColumn = "left";
    showDetailedView = true;
  }

  if (mouseX > rightColX && mouseX < rightColX + colWidth &&
      mouseY > colY && mouseY < colY + colHeight) {
    activeColumn = "right";
    showDetailedView = true;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
