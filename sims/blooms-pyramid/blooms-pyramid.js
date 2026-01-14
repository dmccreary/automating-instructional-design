// Bloom's Taxonomy Pyramid MicroSim
// Visualizes the six cognitive levels as an interactive pyramid

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation state
let mouseOverCanvas = false;
let pulsePhase = 0;
let selectedLevel = -1;
let hoveredLevel = -1;

// Pyramid dimensions
let pyramidTopX, pyramidTopY;
let pyramidBaseWidth;
let levelHeight;

// Bloom's Taxonomy levels (bottom to top)
const levels = [
  {
    name: "Remember",
    color: "#E3F2FD",
    hoverColor: "#BBDEFB",
    keywords: ["recall", "list", "define", "identify", "name"],
    description: "Retrieving relevant knowledge from long-term memory",
    examples: [
      "List the six levels of Bloom's Taxonomy",
      "Define the term 'learning objective'",
      "Identify the parts of a cell from a diagram"
    ],
    icon: "brain"
  },
  {
    name: "Understand",
    color: "#E8F5E9",
    hoverColor: "#C8E6C9",
    keywords: ["explain", "summarize", "interpret", "classify"],
    description: "Constructing meaning from instructional messages",
    examples: [
      "Explain the difference between summative and formative assessment",
      "Summarize the main arguments in a research article",
      "Classify learning objectives by their cognitive level"
    ],
    icon: "lightbulb"
  },
  {
    name: "Apply",
    color: "#FFF9C4",
    hoverColor: "#FFF59D",
    keywords: ["use", "execute", "implement", "solve"],
    description: "Carrying out or using a procedure in a given situation",
    examples: [
      "Calculate the mean and standard deviation for a data set",
      "Use the Pythagorean theorem to find the hypotenuse",
      "Implement a binary search algorithm in Python"
    ],
    icon: "gear"
  },
  {
    name: "Analyze",
    color: "#FFE0B2",
    hoverColor: "#FFCC80",
    keywords: ["differentiate", "organize", "attribute", "compare"],
    description: "Breaking material into parts and detecting relationships",
    examples: [
      "Analyze a case study to identify root causes",
      "Compare three sorting algorithms by time complexity",
      "Differentiate between valid and invalid arguments"
    ],
    icon: "magnifier"
  },
  {
    name: "Evaluate",
    color: "#FCE4EC",
    hoverColor: "#F8BBD9",
    keywords: ["check", "critique", "judge", "justify"],
    description: "Making judgments based on criteria and standards",
    examples: [
      "Evaluate the strengths and weaknesses of a database design",
      "Critique a research study's methodology",
      "Justify which investment option best meets client needs"
    ],
    icon: "scale"
  },
  {
    name: "Create",
    color: "#E1BEE7",
    hoverColor: "#CE93D8",
    keywords: ["design", "construct", "produce", "invent"],
    description: "Putting elements together to form a novel, coherent whole",
    examples: [
      "Design a database schema for a new application",
      "Develop a marketing strategy for a product launch",
      "Create an AI-powered MicroSim to teach a concept"
    ],
    icon: "star"
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

  describe('Interactive Bloom\'s Taxonomy Pyramid showing six cognitive levels from Remember at the base to Create at the top. Hover over levels to see descriptions, click to see example learning objectives.', LABEL);
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

  // Calculate pyramid dimensions
  pyramidTopX = canvasWidth / 2;
  pyramidTopY = 60;
  pyramidBaseWidth = min(canvasWidth - 100, 500);
  levelHeight = (drawHeight - pyramidTopY - 80) / 6;

  // Title
  fill('#333');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text("Bloom's Taxonomy Pyramid", canvasWidth / 2, 15);

  // Draw side arrows
  drawSideArrows();

  // Draw pyramid levels (bottom to top)
  for (let i = 0; i < 6; i++) {
    drawPyramidLevel(i);
  }

  // Draw info panel if a level is selected or hovered
  let displayLevel = selectedLevel >= 0 ? selectedLevel : hoveredLevel;
  if (displayLevel >= 0) {
    drawInfoPanel(displayLevel);
  }

  // Draw instructions in control area
  fill('#666');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Hover over a level to see description. Click to see example learning objectives.",
       canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawPyramidLevel(levelIndex) {
  let level = levels[levelIndex];
  let y = drawHeight - 60 - (levelIndex + 1) * levelHeight;
  let nextY = y + levelHeight;

  // Calculate trapezoid points
  let ratio = (6 - levelIndex) / 6;
  let nextRatio = (6 - levelIndex - 1) / 6;
  let topWidth = pyramidBaseWidth * nextRatio;
  let bottomWidth = pyramidBaseWidth * ratio;

  let topLeft = pyramidTopX - topWidth / 2;
  let topRight = pyramidTopX + topWidth / 2;
  let bottomLeft = pyramidTopX - bottomWidth / 2;
  let bottomRight = pyramidTopX + bottomWidth / 2;

  // Check if mouse is over this level
  let isHovered = isMouseOverLevel(levelIndex);
  let isSelected = selectedLevel === levelIndex;

  // Determine fill color
  let fillColor;
  if (isSelected) {
    fillColor = level.hoverColor;
  } else if (isHovered) {
    // Pulse effect on hover
    let pulse = sin(pulsePhase * 2) * 0.5 + 0.5;
    fillColor = lerpColor(color(level.color), color(level.hoverColor), pulse * 0.5 + 0.3);
  } else {
    fillColor = color(level.color);
  }

  // Draw trapezoid
  fill(fillColor);
  stroke('#666');
  strokeWeight(isHovered || isSelected ? 2 : 1);

  beginShape();
  vertex(topLeft, y);
  vertex(topRight, y);
  vertex(bottomRight, nextY);
  vertex(bottomLeft, nextY);
  endShape(CLOSE);

  // Draw level name
  fill('#333');
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  let centerY = y + levelHeight / 2;
  text(level.name, pyramidTopX, centerY);

  // Draw icon
  drawIcon(level.icon, pyramidTopX - textWidth(level.name) / 2 - 25, centerY, isHovered || isSelected);

  // Update hovered level
  if (isHovered) {
    hoveredLevel = levelIndex;
  }
}

function isMouseOverLevel(levelIndex) {
  let y = drawHeight - 60 - (levelIndex + 1) * levelHeight;
  let nextY = y + levelHeight;

  if (mouseY < y || mouseY > nextY) return false;

  // Calculate width at mouse Y position
  let t = (mouseY - y) / levelHeight;
  let ratio = (6 - levelIndex) / 6;
  let nextRatio = (6 - levelIndex - 1) / 6;
  let widthAtMouse = lerp(pyramidBaseWidth * nextRatio, pyramidBaseWidth * ratio, t);

  let leftEdge = pyramidTopX - widthAtMouse / 2;
  let rightEdge = pyramidTopX + widthAtMouse / 2;

  return mouseX >= leftEdge && mouseX <= rightEdge;
}

function drawSideArrows() {
  let arrowX = pyramidTopX - pyramidBaseWidth / 2 - 40;
  let arrowTopY = pyramidTopY + 20;
  let arrowBottomY = drawHeight - 80;

  // Left arrow (LOTS)
  stroke('#666');
  strokeWeight(2);
  line(arrowX, arrowBottomY, arrowX, arrowTopY);

  // Arrowhead
  fill('#666');
  noStroke();
  triangle(arrowX, arrowTopY - 5, arrowX - 6, arrowTopY + 10, arrowX + 6, arrowTopY + 10);

  // Label
  push();
  translate(arrowX - 15, (arrowTopY + arrowBottomY) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(11);
  fill('#666');
  text("Lower-Order Thinking Skills (LOTS)", 0, 0);
  pop();

  // Right arrow (HOTS)
  arrowX = pyramidTopX + pyramidBaseWidth / 2 + 40;
  stroke('#666');
  strokeWeight(2);
  line(arrowX, arrowBottomY, arrowX, arrowTopY);

  // Arrowhead
  fill('#666');
  noStroke();
  triangle(arrowX, arrowTopY - 5, arrowX - 6, arrowTopY + 10, arrowX + 6, arrowTopY + 10);

  // Label
  push();
  translate(arrowX + 15, (arrowTopY + arrowBottomY) / 2);
  rotate(HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(11);
  fill('#666');
  text("Higher-Order Thinking Skills (HOTS)", 0, 0);
  pop();

  // Foundation label
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("Knowledge Foundation", pyramidTopX, drawHeight - 50);
}

function drawIcon(iconType, x, y, highlight) {
  let size = 16;
  stroke(highlight ? '#333' : '#666');
  strokeWeight(1.5);
  noFill();

  switch(iconType) {
    case 'brain':
      // Simple brain icon
      ellipse(x, y, size, size * 0.8);
      line(x, y - size * 0.4, x, y - size * 0.6);
      break;
    case 'lightbulb':
      // Lightbulb
      arc(x, y - 2, size * 0.8, size * 0.8, PI, TWO_PI);
      line(x - size * 0.2, y + 2, x - size * 0.2, y + 5);
      line(x + size * 0.2, y + 2, x + size * 0.2, y + 5);
      line(x - size * 0.2, y + 5, x + size * 0.2, y + 5);
      break;
    case 'gear':
      // Gear/cog
      ellipse(x, y, size * 0.5, size * 0.5);
      for (let a = 0; a < TWO_PI; a += PI / 3) {
        let x1 = x + cos(a) * size * 0.3;
        let y1 = y + sin(a) * size * 0.3;
        let x2 = x + cos(a) * size * 0.5;
        let y2 = y + sin(a) * size * 0.5;
        line(x1, y1, x2, y2);
      }
      break;
    case 'magnifier':
      // Magnifying glass
      ellipse(x - 2, y - 2, size * 0.6, size * 0.6);
      line(x + 2, y + 2, x + 6, y + 6);
      break;
    case 'scale':
      // Balance scale
      line(x, y - 5, x, y + 3);
      line(x - 8, y - 3, x + 8, y - 3);
      line(x - 8, y - 3, x - 6, y + 2);
      line(x + 8, y - 3, x + 6, y + 2);
      break;
    case 'star':
      // Star with sparkles
      for (let i = 0; i < 5; i++) {
        let a1 = -HALF_PI + i * TWO_PI / 5;
        let a2 = a1 + TWO_PI / 10;
        let x1 = x + cos(a1) * size * 0.4;
        let y1 = y + sin(a1) * size * 0.4;
        let x2 = x + cos(a2) * size * 0.2;
        let y2 = y + sin(a2) * size * 0.2;
        line(x, y, x1, y1);
      }
      break;
  }
}

function drawInfoPanel(levelIndex) {
  let level = levels[levelIndex];
  let panelWidth = min(300, canvasWidth - 40);
  let panelHeight = selectedLevel >= 0 ? 180 : 100;
  let panelX = canvasWidth - panelWidth - 20;
  let panelY = 50;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Level name
  fill(level.hoverColor);
  noStroke();
  rect(panelX, panelY, panelWidth, 30, 10, 10, 0, 0);

  fill('#333');
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(level.name, panelX + 15, panelY + 15);
  textStyle(NORMAL);

  // Description
  fill('#555');
  textSize(12);
  textAlign(LEFT, TOP);
  text(level.description, panelX + 15, panelY + 40, panelWidth - 30, 40);

  // Keywords
  fill('#666');
  textSize(11);
  text("Keywords: " + level.keywords.join(", "), panelX + 15, panelY + 70, panelWidth - 30, 30);

  // Examples (only when selected)
  if (selectedLevel >= 0) {
    fill('#444');
    textSize(12);
    textStyle(BOLD);
    text("Example Objectives:", panelX + 15, panelY + 100);
    textStyle(NORMAL);
    textSize(11);
    fill('#555');
    let exampleY = panelY + 118;
    for (let i = 0; i < min(level.examples.length, 3); i++) {
      text("• " + level.examples[i], panelX + 15, exampleY, panelWidth - 30, 40);
      exampleY += 22;
    }
  }
}

function mousePressed() {
  // Check if clicked on a level
  for (let i = 0; i < 6; i++) {
    if (isMouseOverLevel(i)) {
      selectedLevel = (selectedLevel === i) ? -1 : i;
      return;
    }
  }
  // Clicked elsewhere, deselect
  selectedLevel = -1;
}

function mouseMoved() {
  hoveredLevel = -1;
  for (let i = 0; i < 6; i++) {
    if (isMouseOverLevel(i)) {
      hoveredLevel = i;
      break;
    }
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
