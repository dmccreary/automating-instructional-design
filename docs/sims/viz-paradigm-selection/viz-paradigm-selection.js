// Visualization Paradigm Selection - Interactive Decision Tree
// Helps learners identify which visualization type best fits their content

// Canvas dimensions
let canvasWidth = 600;
let canvasHeight = 500;
let margin = 20;

// Decision tree nodes
const nodes = [
  {
    id: 0,
    question: "What type of content do you have?",
    type: "question",
    x: 0.5,
    y: 0.12,
    children: [1, 2, 3, 4, 5]
  },
  {
    id: 1,
    question: "Does it show change over time?",
    answer: "Timeline",
    type: "answer",
    x: 0.1,
    y: 0.38,
    description: "Use a Timeline for:\n- Historical events\n- Project schedules\n- Process sequences\n- Evolution of concepts",
    examples: ["Project milestones", "Historical periods", "Product versions"],
    icon: "timeline",
    color: "#3498DB"
  },
  {
    id: 2,
    question: "Does it show geographic locations?",
    answer: "Map",
    type: "answer",
    x: 0.3,
    y: 0.38,
    description: "Use a Map for:\n- Geographic data\n- Regional comparisons\n- Location-based info\n- Spatial relationships",
    examples: ["Store locations", "Population density", "Weather patterns"],
    icon: "map",
    color: "#2ECC71"
  },
  {
    id: 3,
    question: "Does it show relationships between concepts?",
    answer: "Network Graph",
    type: "answer",
    x: 0.5,
    y: 0.38,
    description: "Use a Network Graph for:\n- Concept connections\n- Dependencies\n- Social networks\n- Knowledge maps",
    examples: ["Learning graphs", "Org charts", "System architecture"],
    icon: "network",
    color: "#9B59B6"
  },
  {
    id: 4,
    question: "Does it show quantities to compare?",
    answer: "Chart",
    type: "answer",
    x: 0.7,
    y: 0.38,
    description: "Use a Chart for:\n- Numeric comparisons\n- Trends over time\n- Proportions\n- Statistical data",
    examples: ["Sales figures", "Survey results", "Performance metrics"],
    icon: "chart",
    color: "#E67E22"
  },
  {
    id: 5,
    question: "Does it show processes or workflows?",
    answer: "Flowchart",
    type: "answer",
    x: 0.9,
    y: 0.38,
    description: "Use a Flowchart for:\n- Decision processes\n- Step-by-step guides\n- Algorithms\n- System flows",
    examples: ["Decision trees", "User flows", "Algorithm logic"],
    icon: "flowchart",
    color: "#E74C3C"
  }
];

// State tracking
let hoveredNode = -1;
let selectedNode = -1;
let pathNodes = [];

// Animation
let pulsePhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  describe('Interactive decision tree for selecting visualization paradigms. Click on questions to see recommended visualization types.', LABEL);
}

function draw() {
  updateCanvasSize();
  background(250);

  // Update pulse animation
  pulsePhase += 0.05;

  // Draw title
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Which Visualization Should I Use?", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Calculate actual positions based on canvas size
  let positions = nodes.map(n => ({
    x: margin + (canvasWidth - 2 * margin) * n.x,
    y: canvasHeight * n.y
  }));

  // Draw connections from root to answers
  stroke(200);
  strokeWeight(2);
  let rootPos = positions[0];
  for (let i = 1; i <= 5; i++) {
    let childPos = positions[i];
    let isHighlighted = pathNodes.includes(0) && pathNodes.includes(i);

    if (isHighlighted) {
      stroke(color(nodes[i].color));
      strokeWeight(3);
    } else if (hoveredNode === i) {
      stroke(150);
      strokeWeight(2);
    } else {
      stroke(200);
      strokeWeight(2);
    }

    // Draw curved connection
    noFill();
    beginShape();
    vertex(rootPos.x, rootPos.y + 30);
    let midY = (rootPos.y + 30 + childPos.y - 40) / 2;
    bezierVertex(
      rootPos.x, midY,
      childPos.x, midY,
      childPos.x, childPos.y - 40
    );
    endShape();
  }

  // Check for hover
  hoveredNode = -1;
  for (let i = 0; i < nodes.length; i++) {
    let pos = positions[i];
    let nodeWidth = i === 0 ? 280 : 90;
    let nodeHeight = i === 0 ? 50 : 70;

    if (mouseX > pos.x - nodeWidth/2 && mouseX < pos.x + nodeWidth/2 &&
        mouseY > pos.y - nodeHeight/2 && mouseY < pos.y + nodeHeight/2) {
      hoveredNode = i;
    }
  }

  // Draw root question node
  drawRootNode(positions[0]);

  // Draw answer nodes
  for (let i = 1; i <= 5; i++) {
    drawAnswerNode(nodes[i], positions[i], i);
  }

  // Draw info panel if node selected
  if (selectedNode > 0) {
    drawInfoPanel(nodes[selectedNode]);
  } else {
    drawInstructions();
  }

  // Cursor style
  if (hoveredNode >= 0) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawRootNode(pos) {
  let node = nodes[0];
  let nodeWidth = 280;
  let nodeHeight = 50;
  let isHovered = hoveredNode === 0;

  // Shadow
  noStroke();
  fill(0, 0, 0, 20);
  rect(pos.x - nodeWidth/2 + 3, pos.y - nodeHeight/2 + 3, nodeWidth, nodeHeight, 10);

  // Background
  if (isHovered) {
    fill(70, 130, 180);
  } else {
    fill(100, 149, 237);
  }
  stroke(70, 130, 180);
  strokeWeight(2);
  rect(pos.x - nodeWidth/2, pos.y - nodeHeight/2, nodeWidth, nodeHeight, 10);

  // Question text
  fill(255);
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text(node.question, pos.x, pos.y);
}

function drawAnswerNode(node, pos, index) {
  let nodeWidth = 90;
  let nodeHeight = 70;
  let isHovered = hoveredNode === index;
  let isSelected = selectedNode === index;
  let nodeColor = color(node.color);

  // Pulse effect for hovered/selected
  let pulse = 0;
  if (isHovered || isSelected) {
    pulse = sin(pulsePhase) * 3;
  }

  // Shadow
  noStroke();
  fill(0, 0, 0, 20);
  rect(pos.x - nodeWidth/2 + 3 - pulse/2, pos.y - nodeHeight/2 + 3 - pulse/2,
       nodeWidth + pulse, nodeHeight + pulse, 8);

  // Background
  if (isSelected) {
    fill(red(nodeColor), green(nodeColor), blue(nodeColor));
    stroke(red(nodeColor) - 30, green(nodeColor) - 30, blue(nodeColor) - 30);
    strokeWeight(3);
  } else if (isHovered) {
    fill(red(nodeColor) + 30, green(nodeColor) + 30, blue(nodeColor) + 30);
    stroke(nodeColor);
    strokeWeight(2);
  } else {
    fill(255);
    stroke(nodeColor);
    strokeWeight(2);
  }

  rect(pos.x - nodeWidth/2 - pulse/2, pos.y - nodeHeight/2 - pulse/2,
       nodeWidth + pulse, nodeHeight + pulse, 8);

  // Icon
  let iconY = pos.y - 12;
  drawIcon(node.icon, pos.x, iconY, isSelected ? 255 : red(nodeColor),
           isSelected ? 255 : green(nodeColor), isSelected ? 255 : blue(nodeColor));

  // Answer text
  if (isSelected) {
    fill(255);
  } else {
    fill(50);
  }
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(node.answer, pos.x, pos.y + 12);
  textStyle(NORMAL);
}

function drawIcon(icon, x, y, r, g, b) {
  stroke(r, g, b);
  strokeWeight(2);
  noFill();

  let size = 20;

  switch(icon) {
    case "timeline":
      // Horizontal line with dots
      line(x - size/2, y, x + size/2, y);
      fill(r, g, b);
      noStroke();
      ellipse(x - size/2, y, 6, 6);
      ellipse(x, y, 6, 6);
      ellipse(x + size/2, y, 6, 6);
      break;

    case "map":
      // Location pin
      noFill();
      stroke(r, g, b);
      beginShape();
      vertex(x, y + size/2);
      bezierVertex(x - size/2, y, x - size/2, y - size/2, x, y - size/3);
      bezierVertex(x + size/2, y - size/2, x + size/2, y, x, y + size/2);
      endShape();
      fill(r, g, b);
      noStroke();
      ellipse(x, y - size/6, 5, 5);
      break;

    case "network":
      // Nodes and edges
      fill(r, g, b);
      noStroke();
      ellipse(x, y - size/3, 6, 6);
      ellipse(x - size/2, y + size/4, 6, 6);
      ellipse(x + size/2, y + size/4, 6, 6);
      stroke(r, g, b);
      strokeWeight(1.5);
      line(x, y - size/3, x - size/2, y + size/4);
      line(x, y - size/3, x + size/2, y + size/4);
      line(x - size/2, y + size/4, x + size/2, y + size/4);
      break;

    case "chart":
      // Bar chart
      noStroke();
      fill(r, g, b);
      rect(x - size/2, y + size/4, size/4, -size/3);
      rect(x - size/6, y + size/4, size/4, -size/2);
      rect(x + size/6, y + size/4, size/4, -size * 0.7);
      break;

    case "flowchart":
      // Diamond shape
      noFill();
      stroke(r, g, b);
      beginShape();
      vertex(x, y - size/3);
      vertex(x + size/3, y);
      vertex(x, y + size/3);
      vertex(x - size/3, y);
      endShape(CLOSE);
      // Arrow
      line(x + size/3, y, x + size/2, y);
      line(x + size/2 - 4, y - 4, x + size/2, y);
      line(x + size/2 - 4, y + 4, x + size/2, y);
      break;
  }

  strokeWeight(2);
}

function drawInfoPanel(node) {
  let panelX = margin;
  let panelY = canvasHeight * 0.52;
  let panelWidth = canvasWidth - margin * 2;
  let panelHeight = canvasHeight * 0.45;

  let nodeColor = color(node.color);

  // Panel shadow
  noStroke();
  fill(0, 0, 0, 15);
  rect(panelX + 4, panelY + 4, panelWidth, panelHeight, 12);

  // Panel background
  fill(255);
  stroke(nodeColor);
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 12);

  // Header bar
  noStroke();
  fill(nodeColor);
  rect(panelX, panelY, panelWidth, 40, 12, 12, 0, 0);

  // Title
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(node.answer, panelX + 20, panelY + 20);
  textStyle(NORMAL);

  // Content area
  let contentX = panelX + 20;
  let contentY = panelY + 55;
  let contentWidth = panelWidth - 40;

  // Question that led here
  fill(nodeColor);
  textSize(13);
  textStyle(ITALIC);
  text('"' + node.question + '"', contentX, contentY);
  textStyle(NORMAL);
  contentY += 28;

  // Description
  fill(60);
  textSize(13);
  let descLines = node.description.split('\n');
  for (let line of descLines) {
    text(line, contentX, contentY);
    contentY += 18;
  }
  contentY += 10;

  // Examples header
  fill(nodeColor);
  textSize(14);
  textStyle(BOLD);
  text("Examples:", contentX, contentY);
  textStyle(NORMAL);
  contentY += 22;

  // Examples as pills
  let pillX = contentX;
  textSize(12);
  for (let example of node.examples) {
    let pillWidth = textWidth(example) + 16;

    // Check if pill fits on current line
    if (pillX + pillWidth > panelX + panelWidth - 20) {
      pillX = contentX;
      contentY += 28;
    }

    // Pill background
    fill(red(nodeColor), green(nodeColor), blue(nodeColor), 30);
    noStroke();
    rect(pillX, contentY - 8, pillWidth, 24, 12);

    // Pill text
    fill(red(nodeColor) - 30, green(nodeColor) - 30, blue(nodeColor) - 30);
    textAlign(LEFT, CENTER);
    text(example, pillX + 8, contentY + 4);

    pillX += pillWidth + 8;
  }
}

function drawInstructions() {
  let panelX = margin;
  let panelY = canvasHeight * 0.52;
  let panelWidth = canvasWidth - margin * 2;
  let panelHeight = canvasHeight * 0.45;

  // Panel shadow
  noStroke();
  fill(0, 0, 0, 10);
  rect(panelX + 3, panelY + 3, panelWidth, panelHeight, 12);

  // Panel background
  fill(255);
  stroke(180);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 12);

  // Instructions
  fill(100);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Click on a visualization type above", canvasWidth/2, panelY + panelHeight/2 - 30);
  text("to learn when to use it", canvasWidth/2, panelY + panelHeight/2);

  // Hint
  fill(150);
  textSize(13);
  text("Hover over options to preview", canvasWidth/2, panelY + panelHeight/2 + 40);
}

function mousePressed() {
  if (hoveredNode > 0) {
    if (selectedNode === hoveredNode) {
      // Deselect if clicking same node
      selectedNode = -1;
      pathNodes = [];
    } else {
      selectedNode = hoveredNode;
      pathNodes = [0, selectedNode];
    }
  } else if (hoveredNode === 0) {
    // Clicking root node clears selection
    selectedNode = -1;
    pathNodes = [];
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
