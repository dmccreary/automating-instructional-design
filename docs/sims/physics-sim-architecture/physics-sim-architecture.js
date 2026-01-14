// Physics Simulation Architecture MicroSim
// Shows the computational structure of a physics simulation engine

let canvasWidth = 400;
let canvasHeight = 450;
let drawWidth, drawHeight;
let margin = 20;

// Animation variables
let loopHighlight = 0;
let animationSpeed = 0.015;

// Colors
let inputColor, loopColor, outputColor, bgColor, textColor, highlightColor;

// Layer and component definitions
let inputComponents = [];
let loopSteps = [];
let outputComponents = [];

function updateCanvasSize() {
  const container = select('#canvas-container');
  if (container) {
    canvasWidth = min(container.width, 500);
  } else {
    canvasWidth = min(windowWidth - 40, 500);
  }
  canvasHeight = 450;
  drawWidth = canvasWidth;
  drawHeight = canvasHeight;
}

function setup() {
  updateCanvasSize();
  createCanvas(canvasWidth, canvasHeight);

  // Define colors
  inputColor = color(59, 130, 246);       // Blue for input
  loopColor = color(147, 51, 234);        // Purple for simulation loop
  outputColor = color(34, 197, 94);       // Green for output
  bgColor = color(248, 250, 252);         // Light background
  textColor = color(30, 41, 59);          // Dark text
  highlightColor = color(251, 191, 36);   // Yellow/amber for highlight

  calculatePositions();

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function calculatePositions() {
  let layerWidth = drawWidth - 2 * margin;
  let centerX = drawWidth / 2;

  // Input layer components (top)
  let inputY = 80;
  inputComponents = [
    { name: "User Controls", x: centerX - layerWidth/4, y: inputY, desc: "Sliders, buttons, initial values" },
    { name: "Initial Conditions", x: centerX + layerWidth/4, y: inputY, desc: "Starting positions, velocities" }
  ];

  // Simulation loop steps (middle - circular arrangement)
  let loopCenterY = 230;
  let loopRadius = 70;
  loopSteps = [
    { name: "Update\nForces", angle: -PI/2, desc: "Calculate gravitational, spring, friction forces" },
    { name: "Update\nVelocities", angle: 0, desc: "Apply F=ma to change velocities" },
    { name: "Update\nPositions", angle: PI/2, desc: "Move objects based on velocities" },
    { name: "Check\nCollisions", angle: PI, desc: "Detect and resolve object collisions" }
  ];

  // Calculate loop step positions
  for (let step of loopSteps) {
    step.x = centerX + cos(step.angle) * loopRadius;
    step.y = loopCenterY + sin(step.angle) * loopRadius;
  }

  // Output layer components (bottom)
  let outputY = 380;
  outputComponents = [
    { name: "Visual Display", x: centerX - layerWidth/4, y: outputY, desc: "Render objects, trails, vectors" },
    { name: "Data Logging", x: centerX + layerWidth/4, y: outputY, desc: "Record positions, energies, time" }
  ];
}

function draw() {
  background(bgColor);

  // Update animation
  loopHighlight = (loopHighlight + animationSpeed) % 1;

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Physics Simulation Architecture", drawWidth / 2, 25);

  // Draw layer labels and backgrounds
  drawLayerBackgrounds();

  // Draw connections
  drawConnections();

  // Draw input layer
  drawInputLayer();

  // Draw simulation loop
  drawSimulationLoop();

  // Draw output layer
  drawOutputLayer();

  // Draw legend
  drawLegend();
}

function drawLayerBackgrounds() {
  let layerWidth = drawWidth - 2 * margin;

  // Input layer background
  fill(59, 130, 246, 15);
  noStroke();
  rectMode(CENTER);
  rect(drawWidth / 2, 80, layerWidth, 70, 10);

  // Simulation loop background
  fill(147, 51, 234, 15);
  rect(drawWidth / 2, 230, layerWidth, 160, 10);

  // Output layer background
  fill(34, 197, 94, 15);
  rect(drawWidth / 2, 380, layerWidth, 70, 10);
  rectMode(CORNER);

  // Layer labels
  textSize(10);
  textStyle(BOLD);
  fill(inputColor);
  text("INPUT LAYER", margin + 50, 50);
  fill(loopColor);
  text("SIMULATION LOOP", margin + 60, 155);
  fill(outputColor);
  text("OUTPUT LAYER", margin + 55, 350);
}

function drawConnections() {
  let centerX = drawWidth / 2;

  // Input to loop connection
  stroke(150);
  strokeWeight(2);
  drawArrow(centerX, 115, centerX, 155);

  // Loop to output connection
  drawArrow(centerX, 305, centerX, 345);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);

  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  fill(150);
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function drawInputLayer() {
  for (let comp of inputComponents) {
    // Component box
    fill(inputColor);
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    rect(comp.x, comp.y, 100, 40, 8);

    // Text
    fill(255);
    noStroke();
    textSize(11);
    textStyle(BOLD);
    text(comp.name, comp.x, comp.y);
    rectMode(CORNER);
  }
}

function drawSimulationLoop() {
  let centerX = drawWidth / 2;
  let loopCenterY = 230;
  let loopRadius = 70;

  // Draw circular arrow path
  stroke(180);
  strokeWeight(2);
  noFill();

  // Draw arcs between steps with arrows
  for (let i = 0; i < 4; i++) {
    let startAngle = loopSteps[i].angle + 0.4;
    let endAngle = loopSteps[(i + 1) % 4].angle - 0.4;

    if (i === 3) {
      // Wrap around from Check Collisions back to Update Forces
      arc(centerX, loopCenterY, loopRadius * 1.6, loopRadius * 1.6, startAngle, PI);
      arc(centerX, loopCenterY, loopRadius * 1.6, loopRadius * 1.6, -PI, endAngle);
    } else {
      arc(centerX, loopCenterY, loopRadius * 1.6, loopRadius * 1.6, startAngle, endAngle);
    }

    // Draw arrowhead at end
    let arrowAngle = endAngle;
    let arrowX = centerX + cos(arrowAngle) * loopRadius * 0.8;
    let arrowY = loopCenterY + sin(arrowAngle) * loopRadius * 0.8;

    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle + PI/2);
    fill(180);
    noStroke();
    triangle(0, -5, -4, 5, 4, 5);
    pop();
  }

  // Determine which step is highlighted
  let highlightIndex = floor(loopHighlight * 4);

  // Draw step nodes
  for (let i = 0; i < loopSteps.length; i++) {
    let step = loopSteps[i];
    let isHighlighted = (i === highlightIndex);
    let nodeSize = isHighlighted ? 58 : 50;

    // Glow effect for highlighted step
    if (isHighlighted) {
      noStroke();
      for (let j = 4; j > 0; j--) {
        fill(251, 191, 36, 40);
        ellipse(step.x, step.y, nodeSize + j * 8, nodeSize + j * 8);
      }
    }

    // Node circle
    if (isHighlighted) {
      fill(highlightColor);
      stroke(255);
    } else {
      fill(loopColor);
      stroke(255);
    }
    strokeWeight(2);
    ellipse(step.x, step.y, nodeSize, nodeSize);

    // Step name
    fill(isHighlighted ? textColor : 255);
    noStroke();
    textSize(9);
    textStyle(BOLD);
    text(step.name, step.x, step.y);
  }

  // Draw center label
  fill(loopColor);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  text("dt", centerX, loopCenterY);
  textSize(8);
  textStyle(NORMAL);
  text("time step", centerX, loopCenterY + 12);
}

function drawOutputLayer() {
  for (let comp of outputComponents) {
    // Component box
    fill(outputColor);
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    rect(comp.x, comp.y, 100, 40, 8);

    // Text
    fill(255);
    noStroke();
    textSize(11);
    textStyle(BOLD);
    text(comp.name, comp.x, comp.y);
    rectMode(CORNER);
  }
}

function drawLegend() {
  let legendY = drawHeight - 25;
  let legendX = drawWidth / 2;

  textSize(10);
  textStyle(NORMAL);

  // Input legend
  fill(inputColor);
  noStroke();
  rectMode(CENTER);
  rect(legendX - 110, legendY, 14, 14, 3);
  fill(textColor);
  textAlign(LEFT, CENTER);
  text("Input", legendX - 98, legendY);

  // Loop legend
  fill(loopColor);
  rect(legendX - 30, legendY, 14, 14, 3);
  fill(textColor);
  text("Loop", legendX - 18, legendY);

  // Output legend
  fill(outputColor);
  rect(legendX + 50, legendY, 14, 14, 3);
  fill(textColor);
  text("Output", legendX + 62, legendY);

  rectMode(CORNER);
  textAlign(CENTER, CENTER);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculatePositions();
}
