// Working Memory Architecture Diagram
// Visualizes Baddeley's model of working memory with interactive components

let canvasWidth = 600;
const drawHeight = 450;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Component definitions
let components = {
  centralExecutive: {
    name: "Central Executive",
    subtitle: "Traffic Controller",
    x: 0.5, y: 0.08,
    width: 200, height: 60,
    color: null,
    description: "The supervisory system that controls attention, coordinates the slave systems, and manages cognitive resources. It decides what information to focus on and how to allocate processing capacity.",
    examples: [
      "Switching attention between tasks",
      "Inhibiting distracting information",
      "Coordinating verbal and visual information",
      "Planning and decision-making"
    ],
    capacity: null
  },
  phonologicalLoop: {
    name: "Phonological Loop",
    subtitle: "Words & Sounds",
    x: 0.25, y: 0.32,
    width: 160, height: 80,
    color: null,
    description: "Processes verbal and auditory information. Consists of a phonological store (inner ear) that holds speech-based information and an articulatory rehearsal process (inner voice) that maintains information through subvocal repetition.",
    examples: [
      "Remembering a phone number",
      "Following spoken instructions",
      "Learning new vocabulary",
      "Mental arithmetic with spoken numbers"
    ],
    capacity: "4-7 chunks"
  },
  visuospatialSketchpad: {
    name: "Visuospatial Sketchpad",
    subtitle: "Images & Space",
    x: 0.75, y: 0.32,
    width: 160, height: 80,
    color: null,
    description: "Processes visual and spatial information. Maintains mental images and tracks locations in space. Used for navigation, manipulating visual objects mentally, and understanding spatial relationships.",
    examples: [
      "Mentally rotating a 3D object",
      "Remembering a route through a building",
      "Visualizing how furniture fits in a room",
      "Reading a map or diagram"
    ],
    capacity: "4-7 chunks"
  },
  episodicBuffer: {
    name: "Episodic Buffer",
    subtitle: "Integration Zone",
    x: 0.5, y: 0.52,
    width: 180, height: 70,
    color: null,
    description: "A temporary storage system that integrates information from the phonological loop, visuospatial sketchpad, and long-term memory into unified episodes. Creates coherent representations by binding different types of information together.",
    examples: [
      "Understanding a story with visuals and text",
      "Linking new learning to prior knowledge",
      "Creating mental models from multiple sources",
      "Remembering a specific event with sights and sounds"
    ],
    capacity: "4 chunks"
  },
  longTermMemory: {
    name: "Long-Term Memory",
    subtitle: "Permanent Storage",
    x: 0.5, y: 0.78,
    width: 280, height: 70,
    color: null,
    description: "The vast repository of accumulated knowledge and experiences. Provides the context and prior knowledge that helps working memory process new information. Includes semantic (facts), episodic (experiences), and procedural (skills) memory.",
    examples: [
      "Your knowledge of vocabulary and grammar",
      "Memories of past experiences",
      "Learned skills like riding a bike",
      "Understanding of concepts and relationships"
    ],
    capacity: "Unlimited"
  }
};

// Arrows between components
let arrows = [
  { from: "centralExecutive", to: "phonologicalLoop", label: "", bidirectional: true },
  { from: "centralExecutive", to: "visuospatialSketchpad", label: "", bidirectional: true },
  { from: "centralExecutive", to: "episodicBuffer", label: "", bidirectional: true },
  { from: "phonologicalLoop", to: "episodicBuffer", label: "Rehearsal", bidirectional: false },
  { from: "visuospatialSketchpad", to: "episodicBuffer", label: "Rehearsal", bidirectional: false },
  { from: "episodicBuffer", to: "longTermMemory", label: "Encoding", bidirectional: false },
  { from: "longTermMemory", to: "episodicBuffer", label: "Retrieval", bidirectional: false }
];

let hoveredComponent = null;
let selectedComponent = null;
let showExamples = false;

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth - 20, 800);
  } else {
    canvasWidth = min(windowWidth - 20, 800);
  }
  canvasWidth = max(canvasWidth, 500);
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  let container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Initialize colors
  components.centralExecutive.color = color(128, 90, 170);      // Purple
  components.phonologicalLoop.color = color(70, 130, 200);      // Blue
  components.visuospatialSketchpad.color = color(60, 160, 90);  // Green
  components.episodicBuffer.color = color(150, 100, 180);       // Light purple
  components.longTermMemory.color = color(200, 165, 60);        // Gold

  textFont('Arial');
}

function draw() {
  background(248, 250, 252);

  // Draw title
  fill(50);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Working Memory Architecture", canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100);
  text("Baddeley's Model of Working Memory", canvasWidth / 2, 32);

  // Draw arrows first (behind components)
  drawArrows();

  // Draw all components
  for (let key in components) {
    drawComponent(key);
  }

  // Draw working memory boundary
  drawWorkingMemoryBoundary();

  // Draw tooltip or info panel
  if (selectedComponent && showExamples) {
    drawInfoPanel();
  } else if (hoveredComponent) {
    drawTooltip();
  }

  // Draw controls
  drawControls();
}

function drawComponent(key) {
  let comp = components[key];
  let x = comp.x * canvasWidth;
  let y = comp.y * drawHeight + 40;
  let w = comp.width;
  let h = comp.height;

  let isHovered = hoveredComponent === key;
  let isSelected = selectedComponent === key;

  // Shadow
  noStroke();
  fill(0, 0, 0, 20);
  rect(x - w/2 + 3, y - h/2 + 3, w, h, 8);

  // Component box
  if (isSelected) {
    strokeWeight(3);
    stroke(255, 200, 0);
  } else if (isHovered) {
    strokeWeight(2);
    stroke(red(comp.color) * 0.7, green(comp.color) * 0.7, blue(comp.color) * 0.7);
  } else {
    strokeWeight(1);
    stroke(red(comp.color) * 0.8, green(comp.color) * 0.8, blue(comp.color) * 0.8);
  }

  if (isHovered || isSelected) {
    fill(red(comp.color), green(comp.color), blue(comp.color), 255);
  } else {
    fill(red(comp.color), green(comp.color), blue(comp.color), 220);
  }
  rect(x - w/2, y - h/2, w, h, 8);

  // Component name
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text(comp.name, x, y - 10);

  // Subtitle
  textStyle(NORMAL);
  textSize(10);
  fill(255, 255, 255, 200);
  text(comp.subtitle, x, y + 5);

  // Capacity indicator (if applicable)
  if (comp.capacity) {
    textSize(9);
    fill(255, 255, 255, 180);
    text("Capacity: " + comp.capacity, x, y + h/2 - 12);
  }
}

function drawArrows() {
  for (let arrow of arrows) {
    let fromComp = components[arrow.from];
    let toComp = components[arrow.to];

    let fromX = fromComp.x * canvasWidth;
    let fromY = fromComp.y * drawHeight + 40;
    let toX = toComp.x * canvasWidth;
    let toY = toComp.y * drawHeight + 40;

    // Calculate start and end points on component edges
    let start = getEdgePoint(fromX, fromY, fromComp.width, fromComp.height, toX, toY);
    let end = getEdgePoint(toX, toY, toComp.width, toComp.height, fromX, fromY);

    // Draw arrow line
    stroke(120);
    strokeWeight(2);

    if (arrow.bidirectional) {
      // Draw double-headed arrow
      line(start.x, start.y, end.x, end.y);
      drawArrowHead(end.x, end.y, start.x, start.y);
      drawArrowHead(start.x, start.y, end.x, end.y);
    } else {
      line(start.x, start.y, end.x, end.y);
      drawArrowHead(end.x, end.y, start.x, start.y);
    }

    // Draw label if present
    if (arrow.label) {
      let midX = (start.x + end.x) / 2;
      let midY = (start.y + end.y) / 2;

      // Offset label to the side
      let angle = atan2(end.y - start.y, end.x - start.x);
      let offsetX = cos(angle + PI/2) * 12;
      let offsetY = sin(angle + PI/2) * 12;

      fill(80);
      noStroke();
      textSize(9);
      textAlign(CENTER, CENTER);
      textStyle(ITALIC);
      text(arrow.label, midX + offsetX, midY + offsetY);
      textStyle(NORMAL);
    }
  }
}

function getEdgePoint(cx, cy, w, h, targetX, targetY) {
  let angle = atan2(targetY - cy, targetX - cx);

  // Calculate intersection with rectangle edge
  let hw = w / 2;
  let hh = h / 2;

  let tanAngle = tan(angle);

  let x, y;

  if (abs(cos(angle)) * hh > abs(sin(angle)) * hw) {
    // Intersects left or right edge
    x = cx + (cos(angle) > 0 ? hw : -hw);
    y = cy + (cos(angle) > 0 ? hw : -hw) * tanAngle;
  } else {
    // Intersects top or bottom edge
    y = cy + (sin(angle) > 0 ? hh : -hh);
    x = cx + (sin(angle) > 0 ? hh : -hh) / tanAngle;
  }

  return { x: x, y: y };
}

function drawArrowHead(x, y, fromX, fromY) {
  let angle = atan2(y - fromY, x - fromX);
  let arrowSize = 8;

  push();
  translate(x, y);
  rotate(angle);
  fill(120);
  noStroke();
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
  pop();
}

function drawWorkingMemoryBoundary() {
  // Dashed boundary around working memory components
  stroke(100, 100, 100, 80);
  strokeWeight(2);
  drawingContext.setLineDash([8, 4]);
  noFill();

  let padding = 25;
  let topY = components.centralExecutive.y * drawHeight + 40 - components.centralExecutive.height/2 - padding;
  let bottomY = components.episodicBuffer.y * drawHeight + 40 + components.episodicBuffer.height/2 + padding;
  let leftX = components.phonologicalLoop.x * canvasWidth - components.phonologicalLoop.width/2 - padding;
  let rightX = components.visuospatialSketchpad.x * canvasWidth + components.visuospatialSketchpad.width/2 + padding;

  rect(leftX, topY, rightX - leftX, bottomY - topY, 15);

  drawingContext.setLineDash([]);

  // Label for working memory
  fill(100);
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  text("Working Memory", leftX + 10, topY + 5);
}

function drawTooltip() {
  let comp = components[hoveredComponent];
  let tooltipWidth = 280;
  let tooltipHeight = 80;
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY - tooltipHeight - 10;

  // Keep tooltip on screen
  if (tooltipX + tooltipWidth > canvasWidth - 10) {
    tooltipX = mouseX - tooltipWidth - 15;
  }
  if (tooltipY < 10) {
    tooltipY = mouseY + 15;
  }

  // Background
  fill(40, 40, 40, 235);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 6);

  // Title
  fill(red(comp.color), green(comp.color), blue(comp.color));
  textSize(13);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(comp.name, tooltipX + 12, tooltipY + 10);

  // Description
  fill(220);
  textSize(10);
  textStyle(NORMAL);
  text(comp.description, tooltipX + 12, tooltipY + 28, tooltipWidth - 24, 60);

  // Click hint
  fill(150);
  textSize(9);
  textStyle(ITALIC);
  text("Click for examples", tooltipX + 12, tooltipY + tooltipHeight - 16);
  textStyle(NORMAL);
}

function drawInfoPanel() {
  let comp = components[selectedComponent];
  let panelWidth = 300;
  let panelHeight = 160;
  let panelX = canvasWidth / 2 - panelWidth / 2;
  let panelY = drawHeight / 2 - panelHeight / 2 + 40;

  // Semi-transparent overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight + 50);

  // Panel background
  fill(255);
  stroke(red(comp.color), green(comp.color), blue(comp.color));
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Title
  fill(red(comp.color), green(comp.color), blue(comp.color));
  noStroke();
  textSize(15);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(comp.name + " - Examples", panelX + 15, panelY + 12);

  // Examples list
  fill(60);
  textSize(11);
  textStyle(NORMAL);
  let yOffset = panelY + 40;
  for (let i = 0; i < comp.examples.length; i++) {
    text("• " + comp.examples[i], panelX + 20, yOffset + i * 22);
  }

  // Close instruction
  fill(120);
  textSize(10);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text("Click anywhere to close", panelX + panelWidth/2, panelY + panelHeight - 8);
  textStyle(NORMAL);
}

function drawControls() {
  let controlY = drawHeight + 12;

  // Instructions
  fill(80);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text("Hover over components for descriptions | Click for examples", canvasWidth / 2, controlY + 18);
}

function mouseMoved() {
  if (showExamples) return;

  hoveredComponent = null;

  for (let key in components) {
    let comp = components[key];
    let x = comp.x * canvasWidth;
    let y = comp.y * drawHeight + 40;

    if (mouseX > x - comp.width/2 && mouseX < x + comp.width/2 &&
        mouseY > y - comp.height/2 && mouseY < y + comp.height/2) {
      hoveredComponent = key;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
}

function mousePressed() {
  if (showExamples) {
    // Close info panel
    showExamples = false;
    selectedComponent = null;
    return;
  }

  // Check if clicking on a component
  for (let key in components) {
    let comp = components[key];
    let x = comp.x * canvasWidth;
    let y = comp.y * drawHeight + 40;

    if (mouseX > x - comp.width/2 && mouseX < x + comp.width/2 &&
        mouseY > y - comp.height/2 && mouseY < y + comp.height/2) {
      selectedComponent = key;
      showExamples = true;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
