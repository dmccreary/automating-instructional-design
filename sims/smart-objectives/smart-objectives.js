// SMART Learning Objectives Framework MicroSim
// Interactive visualization of the five SMART components

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Animation state
let mouseOverCanvas = false;
let pulsePhase = 0;
let selectedPanel = -1;
let hoveredPanel = -1;

// Panel dimensions
let panelWidth, panelHeight, panelSpacing;

// SMART framework components
const smartPanels = [
  {
    letter: "S",
    name: "Specific",
    color: "#2196F3",
    lightColor: "#BBDEFB",
    question: "What exactly will learners do?",
    description: "Learning objectives must clearly state the expected behavior or skill. Avoid vague terms like 'understand' or 'know'.",
    good: "Identify three causes of WWI",
    poor: "Know about WWI",
    moreExamples: [
      "Good: List the steps of photosynthesis",
      "Poor: Learn photosynthesis",
      "Good: Calculate compound interest",
      "Poor: Understand finance"
    ]
  },
  {
    letter: "M",
    name: "Measurable",
    color: "#4CAF50",
    lightColor: "#C8E6C9",
    question: "How will we know they achieved it?",
    description: "Include criteria or standards that allow assessment of whether the objective was met.",
    good: "Score 80% on quiz",
    poor: "Do well on the test",
    moreExamples: [
      "Good: Write 3 paragraphs with fewer than 2 errors",
      "Poor: Write a good essay",
      "Good: Solve 8 of 10 problems correctly",
      "Poor: Be able to do math"
    ]
  },
  {
    letter: "A",
    name: "Achievable",
    color: "#FFC107",
    lightColor: "#FFF9C4",
    question: "Is this realistic for these learners?",
    description: "Objectives should challenge learners while remaining within their capabilities given time and resources.",
    good: "Write a 500-word essay",
    poor: "Write a doctoral dissertation",
    moreExamples: [
      "Good: Run a mile in under 10 minutes",
      "Poor: Run a marathon tomorrow",
      "Good: Create a basic website",
      "Poor: Build enterprise software"
    ]
  },
  {
    letter: "R",
    name: "Relevant",
    color: "#FF9800",
    lightColor: "#FFE0B2",
    question: "Does this connect to larger goals?",
    description: "Objectives should align with course goals, career needs, or real-world applications.",
    good: "Calculate dosages (nursing)",
    poor: "Memorize random facts",
    moreExamples: [
      "Good: Debug Python code (for programmers)",
      "Poor: Learn COBOL (for web devs)",
      "Good: Analyze financial statements (business)",
      "Poor: Solve abstract puzzles"
    ]
  },
  {
    letter: "T",
    name: "Time-bound",
    color: "#9C27B0",
    lightColor: "#E1BEE7",
    question: "By when should this be achieved?",
    description: "Specify a timeframe or deadline for achieving the objective to create accountability.",
    good: "By end of module",
    poor: "Eventually",
    moreExamples: [
      "Good: Complete within 2 weeks",
      "Poor: Someday",
      "Good: By the final exam",
      "Poor: When ready"
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Interactive SMART Learning Objectives Framework showing five components: Specific, Measurable, Achievable, Relevant, and Time-bound. Hover to see descriptions, click for more examples.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate panel dimensions
  let totalPanelArea = canvasWidth - margin * 2;
  panelSpacing = 10;
  panelWidth = (totalPanelArea - panelSpacing * 4) / 5;
  panelHeight = 280;

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animation
  if (mouseOverCanvas) {
    pulsePhase += 0.03;
  }

  // Title
  fill('#333');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text("SMART Learning Objectives Framework", canvasWidth / 2, 12);

  // Draw panels
  let panelY = 50;
  for (let i = 0; i < 5; i++) {
    drawPanel(i, margin + i * (panelWidth + panelSpacing), panelY);
  }

  // Draw connecting arrows
  drawConnectingArrows(panelY);

  // Draw example bar at bottom
  drawExampleBar();

  // Draw expanded info if panel selected
  if (selectedPanel >= 0) {
    drawExpandedInfo(selectedPanel);
  }

  // Instructions
  fill('#666');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Hover for details. Click a panel to see more examples.", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawPanel(index, x, y) {
  let panel = smartPanels[index];
  let isHovered = hoveredPanel === index;
  let isSelected = selectedPanel === index;

  // Panel background
  if (isSelected) {
    fill(panel.color);
  } else if (isHovered) {
    let pulse = sin(pulsePhase * 2) * 0.3 + 0.7;
    fill(lerpColor(color(panel.lightColor), color(panel.color), pulse * 0.4));
  } else {
    fill(panel.lightColor);
  }

  stroke(panel.color);
  strokeWeight(isHovered || isSelected ? 3 : 2);
  rect(x, y, panelWidth, panelHeight, 10);

  // Letter circle
  let circleY = y + 35;
  fill(panel.color);
  noStroke();
  ellipse(x + panelWidth / 2, circleY, 50, 50);

  fill('white');
  textSize(28);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(panel.letter, x + panelWidth / 2, circleY);
  textStyle(NORMAL);

  // Name
  fill(isSelected ? 'white' : '#333');
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(panel.name, x + panelWidth / 2, y + 65);
  textStyle(NORMAL);

  // Question
  fill(isSelected ? 'white' : '#555');
  textSize(11);
  text(panel.question, x + 5, y + 90, panelWidth - 10, 40);

  // Good/Poor examples
  let exampleY = y + 140;

  // Good example
  fill(isSelected ? '#C8E6C9' : '#2E7D32');
  textSize(10);
  textAlign(LEFT, TOP);
  text("Good:", x + 8, exampleY);
  fill(isSelected ? 'white' : '#333');
  text(panel.good, x + 8, exampleY + 14, panelWidth - 16, 40);

  // Poor example
  fill(isSelected ? '#FFCDD2' : '#C62828');
  text("Poor:", x + 8, exampleY + 60);
  fill(isSelected ? 'white' : '#333');
  text(panel.poor, x + 8, exampleY + 74, panelWidth - 16, 40);

  // Draw icon
  drawIcon(index, x + panelWidth - 25, y + 35, isHovered || isSelected);
}

function drawIcon(index, x, y, highlight) {
  stroke(highlight ? '#333' : '#666');
  strokeWeight(1.5);
  noFill();

  switch(index) {
    case 0: // Target
      ellipse(x, y, 16, 16);
      ellipse(x, y, 10, 10);
      ellipse(x, y, 4, 4);
      break;
    case 1: // Ruler
      rect(x - 8, y - 3, 16, 6);
      for (let i = -6; i <= 6; i += 3) {
        line(x + i, y - 3, x + i, y - 1);
      }
      break;
    case 2: // Mountain with flag
      line(x - 8, y + 5, x, y - 6);
      line(x, y - 6, x + 8, y + 5);
      line(x, y - 6, x, y - 10);
      line(x, y - 10, x + 5, y - 8);
      line(x + 5, y - 8, x, y - 6);
      break;
    case 3: // Puzzle piece
      rect(x - 6, y - 6, 12, 12, 2);
      arc(x + 6, y, 6, 6, -HALF_PI, HALF_PI);
      break;
    case 4: // Clock
      ellipse(x, y, 16, 16);
      line(x, y, x, y - 5);
      line(x, y, x + 4, y + 2);
      break;
  }
}

function drawConnectingArrows(panelY) {
  let arrowY = panelY + panelHeight / 2;
  stroke('#888');
  strokeWeight(2);
  fill('#888');

  for (let i = 0; i < 4; i++) {
    let x1 = margin + (i + 1) * (panelWidth + panelSpacing) - panelSpacing + 2;
    let x2 = margin + (i + 1) * (panelWidth + panelSpacing) - 2;

    line(x1, arrowY, x2, arrowY);

    // Arrowhead
    noStroke();
    triangle(x2, arrowY, x2 - 6, arrowY - 4, x2 - 6, arrowY + 4);
    stroke('#888');
  }
}

function drawExampleBar() {
  let barY = 340;
  let barHeight = 55;

  fill(255, 255, 255, 220);
  stroke('#666');
  strokeWeight(1);
  rect(margin, barY, canvasWidth - margin * 2, barHeight, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Complete SMART Objective Example:", margin + 15, barY + 8);
  textStyle(NORMAL);

  fill('#1565C0');
  textSize(13);
  text('"By the end of Week 3, students will correctly identify and label all 50 U.S. states on a blank map with 90% accuracy."',
       margin + 15, barY + 28, canvasWidth - margin * 2 - 30, 40);
}

function drawExpandedInfo(index) {
  let panel = smartPanels[index];
  let infoWidth = 280;
  let infoHeight = 140;
  let infoX = canvasWidth - infoWidth - 20;
  let infoY = 50;

  fill(255, 255, 255, 245);
  stroke(panel.color);
  strokeWeight(2);
  rect(infoX, infoY, infoWidth, infoHeight, 10);

  fill(panel.color);
  noStroke();
  rect(infoX, infoY, infoWidth, 28, 10, 10, 0, 0);

  fill('white');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text("More " + panel.name + " Examples", infoX + 15, infoY + 14);
  textStyle(NORMAL);

  fill('#444');
  textSize(11);
  textAlign(LEFT, TOP);
  let textY = infoY + 40;
  for (let i = 0; i < panel.moreExamples.length; i++) {
    text("• " + panel.moreExamples[i], infoX + 10, textY, infoWidth - 20, 25);
    textY += 24;
  }
}

function mousePressed() {
  hoveredPanel = getPanelAtMouse();
  if (hoveredPanel >= 0) {
    selectedPanel = (selectedPanel === hoveredPanel) ? -1 : hoveredPanel;
  } else {
    selectedPanel = -1;
  }
}

function mouseMoved() {
  hoveredPanel = getPanelAtMouse();
}

function getPanelAtMouse() {
  let panelY = 50;
  if (mouseY < panelY || mouseY > panelY + panelHeight) return -1;

  for (let i = 0; i < 5; i++) {
    let panelX = margin + i * (panelWidth + panelSpacing);
    if (mouseX >= panelX && mouseX <= panelX + panelWidth) {
      return i;
    }
  }
  return -1;
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
