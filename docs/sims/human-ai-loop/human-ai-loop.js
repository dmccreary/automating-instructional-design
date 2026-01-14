// Human-AI Collaboration Loop MicroSim
// Shows the iterative process of creating quality MicroSims

let canvasWidth = 400;
let canvasHeight = 500;
let drawWidth, drawHeight;
let margin = 40;

// Step data with positions calculated in setup
let steps = [];
let hoveredStep = -1;

// Colors
let humanColor, aiColor, centerColor, bgColor, textColor;

function updateCanvasSize() {
  const container = select('#canvas-container');
  if (container) {
    canvasWidth = container.width;
  } else {
    canvasWidth = min(windowWidth - 40, 500);
  }
  canvasHeight = 500;
  drawWidth = canvasWidth;
  drawHeight = canvasHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');

  // Define colors
  humanColor = color(59, 130, 246);      // Blue for human steps
  aiColor = color(147, 51, 234);          // Purple for AI steps
  centerColor = color(34, 197, 94);       // Green for center
  bgColor = color(248, 250, 252);         // Light background
  textColor = color(30, 41, 59);          // Dark text

  // Define the 6 steps
  let stepData = [
    { name: "SPECIFY", actor: "Human", desc: "Define learning objective and requirements" },
    { name: "GENERATE", actor: "AI", desc: "AI produces first draft based on specs" },
    { name: "EVALUATE", actor: "Human", desc: "Check output against quality criteria" },
    { name: "REFINE", actor: "Human", desc: "Improve specification based on results" },
    { name: "REGENERATE", actor: "AI", desc: "AI creates improved version" },
    { name: "TEST", actor: "Human", desc: "Validate with actual learners" }
  ];

  // Calculate positions in a circle
  let centerX = drawWidth / 2;
  let centerY = drawHeight / 2 - 20;
  let radius = min(drawWidth, drawHeight) / 2 - 80;

  for (let i = 0; i < 6; i++) {
    let angle = -PI / 2 + (TWO_PI / 6) * i; // Start from top
    steps.push({
      ...stepData[i],
      x: centerX + cos(angle) * radius,
      y: centerY + sin(angle) * radius,
      angle: angle,
      isHuman: stepData[i].actor === "Human"
    });
  }

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(bgColor);

  let centerX = drawWidth / 2;
  let centerY = drawHeight / 2 - 20;
  let radius = min(drawWidth, drawHeight) / 2 - 80;

  // Update step positions on resize
  for (let i = 0; i < 6; i++) {
    let angle = -PI / 2 + (TWO_PI / 6) * i;
    steps[i].x = centerX + cos(angle) * radius;
    steps[i].y = centerY + sin(angle) * radius;
  }

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Human-AI Collaboration Loop", centerX, 25);

  // Draw connecting arrows (circular flow)
  drawArrows(centerX, centerY, radius);

  // Draw center circle
  drawCenter(centerX, centerY);

  // Draw step nodes
  for (let i = 0; i < steps.length; i++) {
    drawStep(steps[i], i === hoveredStep);
  }

  // Draw legend
  drawLegend();

  // Draw hover description
  if (hoveredStep >= 0) {
    drawDescription(steps[hoveredStep]);
  }
}

function drawArrows(cx, cy, r) {
  let arrowRadius = r * 0.75;

  stroke(180);
  strokeWeight(2);
  noFill();

  // Draw curved arrows between steps
  for (let i = 0; i < 6; i++) {
    let startAngle = -PI / 2 + (TWO_PI / 6) * i + 0.3;
    let endAngle = -PI / 2 + (TWO_PI / 6) * (i + 1) - 0.3;

    // Draw arc
    arc(cx, cy, arrowRadius * 2, arrowRadius * 2, startAngle, endAngle);

    // Draw arrowhead
    let arrowX = cx + cos(endAngle) * arrowRadius;
    let arrowY = cy + sin(endAngle) * arrowRadius;
    let arrowAngle = endAngle + PI / 2;

    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle);
    fill(180);
    noStroke();
    triangle(0, -6, -5, 6, 5, 6);
    pop();
  }
}

function drawCenter(cx, cy) {
  // Outer glow
  noStroke();
  for (let i = 5; i > 0; i--) {
    fill(34, 197, 94, 20);
    ellipse(cx, cy, 90 + i * 8, 90 + i * 8);
  }

  // Main circle
  fill(centerColor);
  ellipse(cx, cy, 90, 90);

  // Text
  fill(255);
  textSize(11);
  textStyle(BOLD);
  text("Quality", cx, cy - 8);
  text("MicroSim", cx, cy + 8);
}

function drawStep(step, isHovered) {
  let nodeSize = isHovered ? 65 : 55;
  let col = step.isHuman ? humanColor : aiColor;

  // Shadow/glow effect
  noStroke();
  if (isHovered) {
    for (let i = 4; i > 0; i--) {
      fill(red(col), green(col), blue(col), 30);
      ellipse(step.x, step.y, nodeSize + i * 10, nodeSize + i * 10);
    }
  }

  // Main node
  fill(col);
  stroke(255);
  strokeWeight(3);
  ellipse(step.x, step.y, nodeSize, nodeSize);

  // Step name
  fill(255);
  noStroke();
  textSize(isHovered ? 11 : 10);
  textStyle(BOLD);
  text(step.name, step.x, step.y - 6);

  // Actor label
  textSize(9);
  textStyle(NORMAL);
  text("(" + step.actor + ")", step.x, step.y + 8);
}

function drawLegend() {
  let legendY = canvasHeight - 30;
  let legendX = canvasWidth / 2;

  textSize(11);
  textStyle(NORMAL);

  // Human legend
  fill(humanColor);
  noStroke();
  ellipse(legendX - 80, legendY, 16, 16);
  fill(textColor);
  textAlign(LEFT, CENTER);
  text("Human", legendX - 68, legendY);

  // AI legend
  fill(aiColor);
  ellipse(legendX + 30, legendY, 16, 16);
  fill(textColor);
  text("AI", legendX + 42, legendY);

  textAlign(CENTER, CENTER);
}

function drawDescription(step) {
  let boxWidth = min(280, canvasWidth - 40);
  let boxHeight = 50;
  let boxX = canvasWidth / 2;
  let boxY = canvasHeight - 80;

  // Background box
  fill(255, 250);
  stroke(step.isHuman ? humanColor : aiColor);
  strokeWeight(2);
  rectMode(CENTER);
  rect(boxX, boxY, boxWidth, boxHeight, 8);

  // Description text
  fill(textColor);
  noStroke();
  textSize(12);
  textStyle(NORMAL);
  text(step.desc, boxX, boxY);
  rectMode(CORNER);
}

function mouseMoved() {
  hoveredStep = -1;

  for (let i = 0; i < steps.length; i++) {
    let d = dist(mouseX, mouseY, steps[i].x, steps[i].y);
    if (d < 35) {
      hoveredStep = i;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
