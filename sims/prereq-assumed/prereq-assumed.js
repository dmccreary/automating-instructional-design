// Prerequisite vs Assumed Knowledge MicroSim
// Visualizes three stacked layers showing knowledge foundations for learning

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;

// Animation state
let mouseOverCanvas = false;
let pulsePhase = 0;
let hoveredLayer = -1;

// Layer dimensions
let layerHeight;
let layerWidth;
let startY;

// Knowledge layers (bottom to top)
const layers = [
  {
    name: "Assumed Knowledge",
    shortName: "Assumed",
    color: "#9E9E9E",
    hoverColor: "#757575",
    patternType: "solid",
    description: "Foundational knowledge learners are expected to already have. No explicit instruction or review is provided.",
    examples: [
      "Basic arithmetic operations",
      "Reading comprehension at grade level",
      "Familiarity with a computer keyboard"
    ],
    characteristics: [
      "Not taught or reviewed in the course",
      "Expected from prior education",
      "May cause gaps if missing"
    ]
  },
  {
    name: "Prerequisite Knowledge",
    shortName: "Prerequisite",
    color: "#64B5F6",
    hoverColor: "#42A5F5",
    patternType: "dotted",
    description: "Required foundational concepts that may need review. Often assessed at course start.",
    examples: [
      "Algebra for a calculus course",
      "HTML basics for a JavaScript course",
      "Research methods for thesis writing"
    ],
    characteristics: [
      "Explicitly stated in syllabus",
      "May include diagnostic assessment",
      "Review materials often provided"
    ]
  },
  {
    name: "New Content",
    shortName: "New Content",
    color: "#66BB6A",
    hoverColor: "#4CAF50",
    patternType: "solid",
    description: "The primary learning objectives for the current course or lesson. What learners will actively acquire.",
    examples: [
      "New programming concepts",
      "Advanced problem-solving techniques",
      "Domain-specific applications"
    ],
    characteristics: [
      "Core focus of instruction",
      "Explicitly taught and assessed",
      "Builds on lower layers"
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Track mouse for animation control
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Three stacked layers showing Assumed Knowledge (gray, bottom), Prerequisite Knowledge (blue dotted, middle), and New Content (green, top). Hover over layers to see details.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update animation
  if (mouseOverCanvas) {
    pulsePhase += 0.03;
  }

  // Calculate layer dimensions
  layerWidth = min(canvasWidth - 120, 450);
  layerHeight = 80;
  startY = drawHeight - margin - 20;

  // Title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("Knowledge Foundation Layers", canvasWidth / 2, 15);

  // Subtitle
  fill('#666');
  textSize(13);
  text("How learning builds on prior knowledge", canvasWidth / 2, 40);

  // Draw layers (bottom to top)
  hoveredLayer = -1;
  for (let i = 0; i < 3; i++) {
    drawLayer(i);
  }

  // Draw connecting arrows
  drawConnectingElements();

  // Draw info panel if hovering
  if (hoveredLayer >= 0) {
    drawInfoPanel(hoveredLayer);
  }

  // Draw instructions in control area
  fill('#666');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Hover over a layer to see description and examples",
       canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawLayer(layerIndex) {
  let layer = layers[layerIndex];
  let layerX = (canvasWidth - layerWidth) / 2;
  let layerY = startY - (layerIndex + 1) * (layerHeight + 15);

  // Check if mouse is over this layer
  let isHovered = isMouseOverLayer(layerIndex, layerX, layerY);
  if (isHovered) {
    hoveredLayer = layerIndex;
  }

  // Determine fill color with pulse effect on hover
  let fillColor;
  if (isHovered) {
    let pulse = sin(pulsePhase * 2) * 0.3 + 0.7;
    fillColor = lerpColor(color(layer.color), color(layer.hoverColor), pulse);
  } else {
    fillColor = color(layer.color);
  }

  // Draw shadow for depth effect
  noStroke();
  fill(0, 0, 0, 30);
  rect(layerX + 4, layerY + 4, layerWidth, layerHeight, 8);

  // Draw main layer rectangle
  fill(fillColor);
  stroke(isHovered ? '#333' : '#666');
  strokeWeight(isHovered ? 3 : 2);
  rect(layerX, layerY, layerWidth, layerHeight, 8);

  // Draw pattern for prerequisite layer (dotted)
  if (layer.patternType === "dotted") {
    drawDottedPattern(layerX, layerY, layerWidth, layerHeight);
  }

  // Draw layer name
  fill('#fff');
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Add text shadow for readability
  fill(0, 0, 0, 100);
  text(layer.name, layerX + layerWidth / 2 + 1, layerY + layerHeight / 2 + 1);
  fill('#fff');
  text(layer.name, layerX + layerWidth / 2, layerY + layerHeight / 2);
  textStyle(NORMAL);

  // Draw layer indicator on left
  drawLayerIndicator(layerIndex, layerX - 25, layerY + layerHeight / 2);
}

function drawDottedPattern(x, y, w, h) {
  // Draw a subtle dotted pattern to differentiate prerequisite layer
  fill(255, 255, 255, 40);
  noStroke();
  let dotSize = 4;
  let spacing = 15;
  for (let dx = spacing; dx < w - spacing; dx += spacing) {
    for (let dy = spacing; dy < h - spacing; dy += spacing) {
      ellipse(x + dx, y + dy, dotSize, dotSize);
    }
  }
}

function drawLayerIndicator(index, x, y) {
  // Draw small indicator showing layer position
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);

  let labels = ["L1", "L2", "L3"];
  text(labels[index], x, y);
}

function drawConnectingElements() {
  let layerX = (canvasWidth - layerWidth) / 2;
  let arrowX = layerX + layerWidth + 25;

  // Draw upward arrow showing progression
  let arrowStartY = startY - 20;
  let arrowEndY = startY - 3 * (layerHeight + 15) - 10;

  stroke('#666');
  strokeWeight(2);
  line(arrowX, arrowStartY, arrowX, arrowEndY);

  // Arrowhead
  fill('#666');
  noStroke();
  triangle(arrowX, arrowEndY - 8, arrowX - 6, arrowEndY + 5, arrowX + 6, arrowEndY + 5);

  // Arrow label
  push();
  translate(arrowX + 15, (arrowStartY + arrowEndY) / 2);
  rotate(HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(11);
  fill('#666');
  text("Learning Progression", 0, 0);
  pop();

  // Left side label
  let leftX = layerX - 45;

  push();
  translate(leftX, (arrowStartY + arrowEndY) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(11);
  fill('#666');
  text("Foundation to Mastery", 0, 0);
  pop();
}

function isMouseOverLayer(layerIndex, layerX, layerY) {
  return mouseX >= layerX && mouseX <= layerX + layerWidth &&
         mouseY >= layerY && mouseY <= layerY + layerHeight;
}

function drawInfoPanel(layerIndex) {
  let layer = layers[layerIndex];
  let panelWidth = min(320, canvasWidth - 40);
  let panelHeight = 200;
  let panelX = canvasWidth - panelWidth - 15;
  let panelY = 60;

  // Panel background with shadow
  noStroke();
  fill(0, 0, 0, 20);
  rect(panelX + 3, panelY + 3, panelWidth, panelHeight, 10);

  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Header with layer color
  fill(layer.color);
  noStroke();
  rect(panelX, panelY, panelWidth, 35, 10, 10, 0, 0);

  // Layer name
  fill('#fff');
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(layer.name, panelX + 15, panelY + 17);
  textStyle(NORMAL);

  // Description
  fill('#444');
  textSize(12);
  textAlign(LEFT, TOP);
  text(layer.description, panelX + 15, panelY + 45, panelWidth - 30, 50);

  // Examples header
  fill('#333');
  textSize(12);
  textStyle(BOLD);
  text("Examples:", panelX + 15, panelY + 90);
  textStyle(NORMAL);

  // Examples list
  fill('#555');
  textSize(11);
  let exampleY = panelY + 107;
  for (let i = 0; i < layer.examples.length; i++) {
    text("  " + layer.examples[i], panelX + 15, exampleY, panelWidth - 30, 20);
    exampleY += 18;
  }

  // Characteristics header
  fill('#333');
  textSize(12);
  textStyle(BOLD);
  text("Characteristics:", panelX + 15, exampleY + 5);
  textStyle(NORMAL);

  // Characteristics list
  fill('#555');
  textSize(11);
  let charY = exampleY + 22;
  for (let i = 0; i < min(2, layer.characteristics.length); i++) {
    text("  " + layer.characteristics[i], panelX + 15, charY, panelWidth - 30, 20);
    charY += 16;
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
