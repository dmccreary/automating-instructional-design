// Misconception Correction Cycle MicroSim
// Circular workflow showing the four stages of misconception correction

let canvasWidth = 400;
let canvasHeight = 450;
let drawHeight = 450;
let controlHeight = 50;

// Stage data
let stages = [];
let hoveredStage = -1;
let centerHovered = false;

// Colors for each stage
let activateColor, conflictColor, resolveColor, consolidateColor;
let bgColor, textColor, arrowColor;

function updateCanvasSize() {
  const container = select('#canvas-container');
  if (container) {
    canvasWidth = container.width;
  } else {
    canvasWidth = min(windowWidth - 40, 500);
  }
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);

  // Attach to main if exists, otherwise canvas-container
  const mainElement = document.querySelector('main');
  if (mainElement && !document.querySelector('#canvas-container')) {
    canvas.parent(mainElement);
  } else {
    canvas.parent('canvas-container');
  }

  // Define colors for each stage
  activateColor = color(251, 191, 36);      // Yellow - illumination
  conflictColor = color(239, 68, 68);       // Red - tension
  resolveColor = color(34, 197, 94);        // Green - solution
  consolidateColor = color(59, 130, 246);   // Blue - stability
  bgColor = color(248, 250, 252);           // Light background
  textColor = color(30, 41, 59);            // Dark text
  arrowColor = color(156, 163, 175);        // Gray arrows

  // Define the 4 stages with their details
  let stageData = [
    {
      name: "ACTIVATE",
      description: "Surface the existing belief",
      actions: "Ask prediction questions, have learner commit to an answer",
      hoverText: "Don't skip this! Learners must explicitly hold the misconception before it can be challenged.",
      icon: "lightbulb",
      color: activateColor,
      nextLabel: "Commitment made"
    },
    {
      name: "CONFLICT",
      description: "Create cognitive dissonance",
      actions: "Show evidence that contradicts prediction, demonstrate boundary failure",
      hoverText: "The misconception must visibly FAIL. Learners must feel the contradiction.",
      icon: "lightning",
      color: conflictColor,
      nextLabel: "Dissonance created"
    },
    {
      name: "RESOLVE",
      description: "Provide better alternative",
      actions: "Introduce correct model, show how it explains everything including the conflict",
      hoverText: "The new model must explain MORE than the old one, not just be 'correct.'",
      icon: "puzzle",
      color: resolveColor,
      nextLabel: "Alternative accepted"
    },
    {
      name: "CONSOLIDATE",
      description: "Practice and reinforce",
      actions: "Apply new model to multiple examples, revisit potential misconception triggers",
      hoverText: "Misconceptions regrow! Regular reinforcement prevents relapse.",
      icon: "checkmark",
      color: consolidateColor,
      nextLabel: "Test with new contexts"
    }
  ];

  // Calculate positions in a circle (4 stages)
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let radius = min(canvasWidth, drawHeight) / 2 - 85;

  for (let i = 0; i < 4; i++) {
    let angle = -PI / 2 + (TWO_PI / 4) * i; // Start from top
    stages.push({
      ...stageData[i],
      x: centerX + cos(angle) * radius,
      y: centerY + sin(angle) * radius,
      angle: angle
    });
  }

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(bgColor);

  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let radius = min(canvasWidth, drawHeight) / 2 - 85;

  // Update stage positions on resize
  for (let i = 0; i < 4; i++) {
    let angle = -PI / 2 + (TWO_PI / 4) * i;
    stages[i].x = centerX + cos(angle) * radius;
    stages[i].y = centerY + sin(angle) * radius;
  }

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Misconception Correction Cycle", centerX, 22);

  // Draw connecting arrows with labels
  drawArrowsWithLabels(centerX, centerY, radius);

  // Draw center element
  drawCenter(centerX, centerY);

  // Draw stage nodes
  for (let i = 0; i < stages.length; i++) {
    drawStage(stages[i], i === hoveredStage);
  }

  // Draw hover information
  if (hoveredStage >= 0) {
    drawHoverInfo(stages[hoveredStage]);
  } else if (centerHovered) {
    drawCenterHoverInfo(centerX, centerY);
  }
}

function drawArrowsWithLabels(cx, cy, r) {
  let arrowRadius = r * 0.7;

  // Draw curved arrows between stages
  for (let i = 0; i < 4; i++) {
    let startAngle = -PI / 2 + (TWO_PI / 4) * i + 0.4;
    let endAngle = -PI / 2 + (TWO_PI / 4) * (i + 1) - 0.4;

    // Draw arc
    stroke(arrowColor);
    strokeWeight(3);
    noFill();
    arc(cx, cy, arrowRadius * 2, arrowRadius * 2, startAngle, endAngle);

    // Draw arrowhead
    let arrowX = cx + cos(endAngle) * arrowRadius;
    let arrowY = cy + sin(endAngle) * arrowRadius;
    let arrowAngle = endAngle + PI / 2;

    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle);
    fill(arrowColor);
    noStroke();
    triangle(0, -8, -6, 8, 6, 8);
    pop();

    // Draw label on the arc
    let labelAngle = (startAngle + endAngle) / 2;
    let labelRadius = arrowRadius + 22;
    let labelX = cx + cos(labelAngle) * labelRadius;
    let labelY = cy + sin(labelAngle) * labelRadius;

    push();
    fill(100);
    noStroke();
    textSize(9);
    textStyle(ITALIC);

    // Rotate text to follow curve direction
    let textAngle = labelAngle + PI / 2;
    if (labelAngle > PI / 2 && labelAngle < PI * 1.5) {
      textAngle += PI;
    }

    translate(labelX, labelY);
    rotate(textAngle);
    text(stages[i].nextLabel, 0, 0);
    pop();
  }
}

function drawCenter(cx, cy) {
  // Check if center is hovered
  let d = dist(mouseX, mouseY, cx, cy);
  centerHovered = d < 40;

  // Outer glow
  noStroke();
  for (let i = 5; i > 0; i--) {
    fill(100, 116, 139, 15);
    ellipse(cx, cy, 80 + i * 6, 80 + i * 6);
  }

  // Main circle
  fill(100, 116, 139);
  stroke(255);
  strokeWeight(2);
  ellipse(cx, cy, 80, 80);

  // Text
  fill(255);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  text("Mental", cx, cy - 10);
  text("Model", cx, cy + 6);

  // Cycle indicator
  textSize(8);
  textStyle(NORMAL);
  fill(220);
  text("(cyclical)", cx, cy + 22);
}

function drawStage(stage, isHovered) {
  let nodeSize = isHovered ? 75 : 65;

  // Shadow/glow effect
  noStroke();
  if (isHovered) {
    for (let i = 4; i > 0; i--) {
      fill(red(stage.color), green(stage.color), blue(stage.color), 40);
      ellipse(stage.x, stage.y, nodeSize + i * 12, nodeSize + i * 12);
    }
  }

  // Main node
  fill(stage.color);
  stroke(255);
  strokeWeight(3);
  ellipse(stage.x, stage.y, nodeSize, nodeSize);

  // Draw icon
  drawIcon(stage.icon, stage.x, stage.y - 8, isHovered);

  // Stage name
  fill(255);
  noStroke();
  textSize(isHovered ? 10 : 9);
  textStyle(BOLD);
  text(stage.name, stage.x, stage.y + 15);
}

function drawIcon(iconType, x, y, isHovered) {
  let iconSize = isHovered ? 22 : 18;

  push();
  fill(255);
  noStroke();

  switch(iconType) {
    case "lightbulb":
      // Lightbulb with question mark
      ellipse(x, y - 2, iconSize * 0.7, iconSize * 0.8);
      rect(x - iconSize * 0.15, y + iconSize * 0.25, iconSize * 0.3, iconSize * 0.2);
      fill(red(activateColor), green(activateColor), blue(activateColor));
      textSize(iconSize * 0.5);
      textStyle(BOLD);
      text("?", x, y - 2);
      break;

    case "lightning":
      // Lightning bolt / collision
      stroke(255);
      strokeWeight(2);
      beginShape();
      vertex(x - iconSize * 0.15, y - iconSize * 0.4);
      vertex(x + iconSize * 0.15, y);
      vertex(x - iconSize * 0.05, y);
      vertex(x + iconSize * 0.15, y + iconSize * 0.4);
      vertex(x - iconSize * 0.15, y);
      vertex(x + iconSize * 0.05, y);
      endShape(CLOSE);
      break;

    case "puzzle":
      // Puzzle pieces connecting
      noStroke();
      ellipse(x - iconSize * 0.2, y, iconSize * 0.4, iconSize * 0.4);
      ellipse(x + iconSize * 0.2, y, iconSize * 0.4, iconSize * 0.4);
      // Connection indicator
      stroke(255);
      strokeWeight(2);
      line(x - iconSize * 0.05, y, x + iconSize * 0.05, y);
      break;

    case "checkmark":
      // Checkmark with repeat arrow
      stroke(255);
      strokeWeight(3);
      noFill();
      // Checkmark
      beginShape();
      vertex(x - iconSize * 0.25, y);
      vertex(x - iconSize * 0.05, y + iconSize * 0.2);
      vertex(x + iconSize * 0.25, y - iconSize * 0.2);
      endShape();
      // Small circular arrow
      arc(x + iconSize * 0.15, y + iconSize * 0.15, iconSize * 0.25, iconSize * 0.25, 0, PI);
      break;
  }
  pop();
}

function drawHoverInfo(stage) {
  let boxWidth = min(canvasWidth - 30, 350);
  let boxX = canvasWidth / 2;
  let boxY = canvasHeight - 45;

  // Background box
  fill(255, 250);
  stroke(stage.color);
  strokeWeight(2);
  rectMode(CENTER);
  rect(boxX, boxY, boxWidth, 70, 8);

  // Stage description and hover text
  fill(textColor);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  text(stage.description, boxX, boxY - 20);

  textStyle(NORMAL);
  textSize(9);
  fill(80);

  // Word wrap the hover text
  let words = stage.hoverText.split(' ');
  let line1 = '';
  let line2 = '';
  let maxLineWidth = boxWidth - 30;

  for (let word of words) {
    let testLine = line1 + word + ' ';
    if (textWidth(testLine) < maxLineWidth && line2 === '') {
      line1 = testLine;
    } else {
      line2 += word + ' ';
    }
  }

  text(line1.trim(), boxX, boxY + 2);
  if (line2) {
    text(line2.trim(), boxX, boxY + 16);
  }

  rectMode(CORNER);
}

function drawCenterHoverInfo(cx, cy) {
  let boxWidth = min(canvasWidth - 30, 280);
  let boxX = canvasWidth / 2;
  let boxY = canvasHeight - 45;

  // Background box
  fill(255, 250);
  stroke(100, 116, 139);
  strokeWeight(2);
  rectMode(CENTER);
  rect(boxX, boxY, boxWidth, 50, 8);

  fill(textColor);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  text("Mental Model Transformation", boxX, boxY - 10);

  textStyle(NORMAL);
  textSize(9);
  fill(80);
  text("May require multiple cycles for deep-rooted misconceptions", boxX, boxY + 8);

  rectMode(CORNER);
}

function mouseMoved() {
  hoveredStage = -1;

  for (let i = 0; i < stages.length; i++) {
    let d = dist(mouseX, mouseY, stages[i].x, stages[i].y);
    if (d < 40) {
      hoveredStage = i;
      cursor(HAND);
      return;
    }
  }

  // Check center hover
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let d = dist(mouseX, mouseY, centerX, centerY);
  if (d < 40) {
    cursor(HAND);
    return;
  }

  cursor(ARROW);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
