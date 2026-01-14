// Design-Test-Refine Cycle MicroSim
// Interactive circular flow diagram showing the iterative improvement process for MicroSims

let canvasWidth = 400;
let canvasHeight = 500;
let drawHeight = 450;
let controlHeight = 50;

// Phase data with positions calculated in setup
let phases = [];
let hoveredPhase = -1;
let selectedPhase = -1;

// Animation
let rotationAngle = 0;
let animating = true;
let animationSpeed = 0.003;

// Colors - as specified
let phaseColors = {};
let centerColor, bgColor, textColor, deployColor;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.clientWidth;
  } else {
    canvasWidth = min(windowWidth - 40, 600);
  }
  canvasWidth = min(canvasWidth, 700);
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Define colors as specified
  phaseColors = {
    design: color(59, 130, 246),     // Blue #3B82F6
    test: color(16, 185, 129),       // Green #10B981
    analyze: color(245, 158, 11),    // Yellow #F59E0B
    prioritize: color(249, 115, 22), // Orange #F97316
    refine: color(139, 92, 246)      // Purple #8B5CF6
  };

  centerColor = color(245, 158, 11);  // Gold for center goal
  deployColor = color(34, 197, 94);   // Green for deploy
  bgColor = color(248, 250, 252);     // Light background
  textColor = color(30, 41, 59);      // Dark text

  // Define the 5 phases with detailed descriptions
  let phaseData = [
    {
      name: "DESIGN",
      color: phaseColors.design,
      shortDesc: "Create & Instrument",
      fullDesc: "Create initial implementation, apply design principles, and instrument for xAPI tracking."
    },
    {
      name: "TEST",
      color: phaseColors.test,
      shortDesc: "Collect Data",
      fullDesc: "Run user testing sessions, collect analytics data, and gather qualitative feedback."
    },
    {
      name: "ANALYZE",
      color: phaseColors.analyze,
      shortDesc: "Interpret Results",
      fullDesc: "Interpret test results, identify patterns and issues, compare against criteria."
    },
    {
      name: "PRIORITIZE",
      color: phaseColors.prioritize,
      shortDesc: "Order Improvements",
      fullDesc: "Categorize issues (critical vs. nice-to-have), estimate effort, create ordered list."
    },
    {
      name: "REFINE",
      color: phaseColors.refine,
      shortDesc: "Implement Changes",
      fullDesc: "Implement high-priority changes, update documentation, log changes for tracking."
    }
  ];

  // Calculate positions in a circle (5 phases)
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2 - 10;
  let radius = min(canvasWidth, drawHeight) / 2 - 90;

  for (let i = 0; i < 5; i++) {
    let angle = -PI / 2 + (TWO_PI / 5) * i; // Start from top
    phases.push({
      ...phaseData[i],
      x: centerX + cos(angle) * radius,
      y: centerY + sin(angle) * radius,
      baseAngle: angle,
      index: i
    });
  }

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(bgColor);

  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2 - 10;
  let radius = min(canvasWidth, drawHeight) / 2 - 90;

  // Update phase positions on resize
  for (let i = 0; i < 5; i++) {
    let angle = -PI / 2 + (TWO_PI / 5) * i;
    phases[i].x = centerX + cos(angle) * radius;
    phases[i].y = centerY + sin(angle) * radius;
  }

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Design-Test-Refine Cycle", centerX, 22);

  // Draw connecting arrows with animation
  drawArrows(centerX, centerY, radius);

  // Draw deploy exit arrow
  drawDeployArrow(centerX, centerY, radius);

  // Draw center goal
  drawCenter(centerX, centerY);

  // Draw phase nodes
  for (let i = 0; i < phases.length; i++) {
    let isHovered = i === hoveredPhase;
    let isSelected = i === selectedPhase;
    drawPhase(phases[i], isHovered, isSelected);
  }

  // Draw description panel
  drawDescriptionPanel();

  // Draw control area
  drawControls();

  // Update animation
  if (animating) {
    rotationAngle += animationSpeed;
    if (rotationAngle > TWO_PI) rotationAngle -= TWO_PI;
  }
}

function drawArrows(cx, cy, r) {
  let arrowRadius = r * 0.72;

  // Draw animated flow indicator
  if (animating) {
    let flowAngle = -PI / 2 + rotationAngle;
    let flowX = cx + cos(flowAngle) * arrowRadius;
    let flowY = cy + sin(flowAngle) * arrowRadius;

    // Glowing flow indicator
    noStroke();
    for (let i = 4; i > 0; i--) {
      fill(59, 130, 246, 40 - i * 8);
      ellipse(flowX, flowY, 25 + i * 5, 25 + i * 5);
    }
    fill(59, 130, 246);
    ellipse(flowX, flowY, 18, 18);
  }

  stroke(150);
  strokeWeight(2);
  noFill();

  // Draw curved arrows between phases (5 phases)
  for (let i = 0; i < 5; i++) {
    let startAngle = -PI / 2 + (TWO_PI / 5) * i + 0.35;
    let endAngle = -PI / 2 + (TWO_PI / 5) * (i + 1) - 0.35;

    // Draw arc
    arc(cx, cy, arrowRadius * 2, arrowRadius * 2, startAngle, endAngle);

    // Draw arrowhead
    let arrowX = cx + cos(endAngle) * arrowRadius;
    let arrowY = cy + sin(endAngle) * arrowRadius;
    let arrowAngle = endAngle + PI / 2;

    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle);
    fill(150);
    noStroke();
    triangle(0, -5, -4, 5, 4, 5);
    pop();
  }
}

function drawDeployArrow(cx, cy, r) {
  // Position deploy arrow coming out from between REFINE and DESIGN
  let exitAngle = -PI / 2 - PI / 5; // Between REFINE (left) and DESIGN (top)
  let startRadius = r * 0.72;
  let endRadius = r + 40;

  let startX = cx + cos(exitAngle) * startRadius;
  let startY = cy + sin(exitAngle) * startRadius;
  let endX = cx + cos(exitAngle) * endRadius;
  let endY = cy + sin(exitAngle) * endRadius;

  // Draw arrow line
  stroke(deployColor);
  strokeWeight(3);
  line(startX, startY, endX, endY);

  // Draw arrowhead
  push();
  translate(endX, endY);
  rotate(exitAngle - PI / 2);
  fill(deployColor);
  noStroke();
  triangle(0, -6, -5, 6, 5, 6);
  pop();

  // Draw "Deploy" label
  fill(deployColor);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  let labelX = cx + cos(exitAngle) * (endRadius + 18);
  let labelY = cy + sin(exitAngle) * (endRadius + 18);
  text("Deploy", labelX, labelY);

  // Smaller subtitle
  textSize(9);
  textStyle(NORMAL);
  text("(criteria met)", labelX, labelY + 13);
}

function drawCenter(cx, cy) {
  // Outer glow - gold
  noStroke();
  for (let i = 5; i > 0; i--) {
    fill(245, 158, 11, 25);
    ellipse(cx, cy, 85 + i * 8, 85 + i * 8);
  }

  // Main circle - gold
  fill(centerColor);
  ellipse(cx, cy, 85, 85);

  // Inner darker circle for contrast
  fill(217, 119, 6);
  ellipse(cx, cy, 70, 70);

  // Text
  fill(255);
  textSize(10);
  textStyle(BOLD);
  text("High-Quality", cx, cy - 10);
  text("MicroSim", cx, cy + 6);
  textSize(8);
  textStyle(NORMAL);
  text("(Goal)", cx, cy + 20);
}

function drawPhase(phase, isHovered, isSelected) {
  let nodeSize = (isHovered || isSelected) ? 62 : 52;
  let col = phase.color;

  // Shadow/glow effect
  noStroke();
  if (isHovered || isSelected) {
    for (let i = 4; i > 0; i--) {
      fill(red(col), green(col), blue(col), 35);
      ellipse(phase.x, phase.y, nodeSize + i * 10, nodeSize + i * 10);
    }
  }

  // Main node
  fill(col);
  stroke(255);
  strokeWeight(3);
  ellipse(phase.x, phase.y, nodeSize, nodeSize);

  // Phase name
  fill(255);
  noStroke();
  textSize((isHovered || isSelected) ? 11 : 10);
  textStyle(BOLD);
  text(phase.name, phase.x, phase.y - 5);

  // Short description
  textSize(8);
  textStyle(NORMAL);
  text(phase.shortDesc, phase.x, phase.y + 9);
}

function drawDescriptionPanel() {
  let panelY = drawHeight - 55;
  let panelWidth = min(350, canvasWidth - 30);
  let panelHeight = 48;

  if (selectedPhase >= 0 || hoveredPhase >= 0) {
    let phase = phases[selectedPhase >= 0 ? selectedPhase : hoveredPhase];

    // Background box
    fill(255, 250);
    stroke(phase.color);
    strokeWeight(2);
    rectMode(CENTER);
    rect(canvasWidth / 2, panelY, panelWidth, panelHeight, 8);

    // Phase name
    fill(phase.color);
    noStroke();
    textSize(12);
    textStyle(BOLD);
    text(phase.name, canvasWidth / 2, panelY - 12);

    // Full description
    fill(textColor);
    textSize(10);
    textStyle(NORMAL);
    text(phase.fullDesc, canvasWidth / 2, panelY + 8, panelWidth - 20);
    rectMode(CORNER);
  } else {
    // Default instruction
    fill(textColor);
    noStroke();
    textSize(11);
    textStyle(ITALIC);
    text("Click or hover on a phase to see details", canvasWidth / 2, panelY);
  }
}

function drawControls() {
  let controlY = drawHeight + controlHeight / 2;

  // Animation toggle button
  let btnWidth = 100;
  let btnHeight = 30;
  let btnX = canvasWidth / 2 - btnWidth / 2;
  let btnY = controlY - btnHeight / 2;

  // Button background
  fill(animating ? color(239, 68, 68) : color(34, 197, 94));
  noStroke();
  rect(btnX, btnY, btnWidth, btnHeight, 6);

  // Button text
  fill(255);
  textSize(12);
  textStyle(BOLD);
  text(animating ? "Pause" : "Animate", canvasWidth / 2, controlY);
}

function mouseMoved() {
  hoveredPhase = -1;

  for (let i = 0; i < phases.length; i++) {
    let d = dist(mouseX, mouseY, phases[i].x, phases[i].y);
    if (d < 35) {
      hoveredPhase = i;
      cursor(HAND);
      return;
    }
  }

  // Check if over control button
  let controlY = drawHeight + controlHeight / 2;
  let btnWidth = 100;
  let btnHeight = 30;
  if (mouseX > canvasWidth / 2 - btnWidth / 2 &&
      mouseX < canvasWidth / 2 + btnWidth / 2 &&
      mouseY > controlY - btnHeight / 2 &&
      mouseY < controlY + btnHeight / 2) {
    cursor(HAND);
    return;
  }

  cursor(ARROW);
}

function mousePressed() {
  // Check for phase clicks
  for (let i = 0; i < phases.length; i++) {
    let d = dist(mouseX, mouseY, phases[i].x, phases[i].y);
    if (d < 35) {
      selectedPhase = (selectedPhase === i) ? -1 : i;
      return;
    }
  }

  // Check for control button click
  let controlY = drawHeight + controlHeight / 2;
  let btnWidth = 100;
  let btnHeight = 30;
  if (mouseX > canvasWidth / 2 - btnWidth / 2 &&
      mouseX < canvasWidth / 2 + btnWidth / 2 &&
      mouseY > controlY - btnHeight / 2 &&
      mouseY < controlY + btnHeight / 2) {
    animating = !animating;
    return;
  }

  // Click elsewhere deselects
  selectedPhase = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
