// Corporate Learning Module Workflow
// Interactive flowchart showing time-efficient corporate training MicroSim design
// Bloom Taxonomy: Apply - Students will be able to design time-efficient corporate training MicroSims

let canvasWidth = 900;
let canvasHeight = 600;
let drawHeight = 530;
let controlHeight = 70;

// Color coding per specification
const ASSESSMENT_COLOR = '#2196f3';   // Blue - Assessment activities
const LEARNING_COLOR = '#4caf50';     // Green - Learning activities
const PRACTICE_COLOR = '#ffc107';     // Yellow - Practice activities
const RESOURCE_COLOR = '#ff9800';     // Orange - Resource delivery

// Swimlane colors
const LEARNER_COLOR = '#e3f2fd';      // Light blue
const SYSTEM_COLOR = '#f3e5f5';       // Light purple
const PROGRESS_COLOR = '#e8f5e9';     // Light green

// Node data
let nodes = [];
let hoveredNode = -1;
let selectedNode = -1;

// Swimlane definitions
const swimlanes = [
  { name: "Learner Actions", color: LEARNER_COLOR, borderColor: '#1976d2' },
  { name: "System Responses", color: SYSTEM_COLOR, borderColor: '#7b1fa2' },
  { name: "Progress Tracking", color: PROGRESS_COLOR, borderColor: '#388e3c' }
];

// Step definitions with swimlane assignments and timing
const stepData = [
  {
    id: 1,
    type: "start",
    label: "Module\nLaunch",
    lane: 1,
    col: 0,
    time: "0 sec",
    category: "system",
    categoryColor: LEARNING_COLOR,
    desc: "Module loads immediately - no waiting. Learner sees welcome screen with module objectives and estimated completion time (12-15 min).",
    skipAvailable: false,
    mobileReady: true
  },
  {
    id: 2,
    type: "process",
    label: "Pre-Assessment\nCheck",
    lane: 0,
    col: 1,
    time: "30 sec",
    category: "assessment",
    categoryColor: ASSESSMENT_COLOR,
    desc: "3-question diagnostic check to determine if learner already knows the material. Quick adaptive assessment saves time for experienced learners.",
    skipAvailable: true,
    mobileReady: true
  },
  {
    id: 3,
    type: "decision",
    label: "Knows\nMaterial?",
    lane: 2,
    col: 2,
    time: "",
    category: "system",
    categoryColor: ASSESSMENT_COLOR,
    desc: "System evaluates pre-assessment results. If learner demonstrates competency (80%+), they can skip directly to practice activities.",
    skipAvailable: false,
    mobileReady: true
  },
  {
    id: 4,
    type: "process",
    label: "Concept\nIntroduction",
    lane: 1,
    col: 3,
    time: "2 min",
    category: "learning",
    categoryColor: LEARNING_COLOR,
    desc: "Brief explanation with workplace context. Connects new concepts to job tasks and real scenarios the learner will encounter.",
    skipAvailable: true,
    mobileReady: true
  },
  {
    id: 5,
    type: "process",
    label: "Interactive\nDemonstration",
    lane: 0,
    col: 4,
    time: "3 min",
    category: "learning",
    categoryColor: LEARNING_COLOR,
    desc: "MicroSim showing concept in action. Learner observes animated visualization with annotations explaining key principles.",
    skipAvailable: false,
    mobileReady: true
  },
  {
    id: 6,
    type: "process",
    label: "Guided\nPractice",
    lane: 0,
    col: 5,
    time: "3 min",
    category: "practice",
    categoryColor: PRACTICE_COLOR,
    desc: "Learner tries with hints available. Scaffolded practice with immediate feedback and contextual help on demand.",
    skipAvailable: false,
    mobileReady: true
  },
  {
    id: 7,
    type: "process",
    label: "Independent\nPractice",
    lane: 0,
    col: 6,
    time: "3 min",
    category: "practice",
    categoryColor: PRACTICE_COLOR,
    desc: "Realistic scenario without scaffolding. Learner applies skills to workplace-relevant challenge with delayed feedback.",
    skipAvailable: false,
    mobileReady: true
  },
  {
    id: 8,
    type: "process",
    label: "Job Aid\nDelivery",
    lane: 1,
    col: 7,
    time: "30 sec",
    category: "resource",
    categoryColor: RESOURCE_COLOR,
    desc: "Downloadable reference for actual work use. PDF or digital quick-reference guide learner can access during real job tasks.",
    skipAvailable: false,
    mobileReady: true
  },
  {
    id: 9,
    type: "end",
    label: "Module\nComplete",
    lane: 2,
    col: 8,
    time: "~12 min",
    category: "system",
    categoryColor: LEARNING_COLOR,
    desc: "Total time: approximately 12 minutes for full path, 8-10 minutes with pre-assessment skip. Completion recorded to LMS.",
    skipAvailable: false,
    mobileReady: true
  }
];

// Connections between nodes (from, to, label)
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4, label: "No" },
  { from: 3, to: 6, label: "Yes - Skip to Practice" },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8 },
  { from: 8, to: 9 }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  } else {
    canvasWidth = min(windowWidth - 20, 950);
  }
  canvasWidth = max(canvasWidth, 800);
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  calculateNodePositions();

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function calculateNodePositions() {
  nodes = [];

  const laneHeight = (drawHeight - 80) / 3;
  const startX = 70;
  const colWidth = (canvasWidth - 100) / 9;

  for (let step of stepData) {
    const x = startX + step.col * colWidth;
    const y = 65 + step.lane * laneHeight + laneHeight / 2;

    nodes.push({
      ...step,
      x: x,
      y: y,
      width: 75,
      height: 50
    });
  }
}

function draw() {
  background(248, 250, 252);

  // Draw swimlanes
  drawSwimlanes();

  // Draw title
  fill(30, 41, 59);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  text("Corporate Learning Module Workflow", canvasWidth / 2, 22);

  // Draw subtitle with total time
  textSize(11);
  textStyle(NORMAL);
  fill(100);
  text("Total module time: 12-15 minutes | Mobile-friendly design", canvasWidth / 2, 42);

  // Draw connections
  drawConnections();

  // Draw nodes
  for (let i = 0; i < nodes.length; i++) {
    drawNode(nodes[i], i === hoveredNode, i === selectedNode);
  }

  // Draw description panel if node is selected or hovered
  if (selectedNode >= 0) {
    drawDescriptionPanel(nodes[selectedNode]);
  } else if (hoveredNode >= 0) {
    drawDescriptionPanel(nodes[hoveredNode]);
  } else {
    drawInstructionPanel();
  }

  // Draw legend
  drawLegend();
}

function drawSwimlanes() {
  const laneHeight = (drawHeight - 80) / 3;

  for (let i = 0; i < swimlanes.length; i++) {
    const y = 55 + i * laneHeight;

    // Lane background
    noStroke();
    fill(swimlanes[i].color);
    rect(0, y, canvasWidth, laneHeight);

    // Lane border
    stroke(swimlanes[i].borderColor);
    strokeWeight(1);
    line(0, y, canvasWidth, y);

    // Lane label (rotated)
    push();
    translate(15, y + laneHeight / 2);
    rotate(-HALF_PI);
    fill(swimlanes[i].borderColor);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text(swimlanes[i].name, 0, 0);
    pop();
  }

  // Bottom border
  stroke(swimlanes[2].borderColor);
  line(0, 55 + 3 * laneHeight, canvasWidth, 55 + 3 * laneHeight);
}

function drawConnections() {
  for (let conn of connections) {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);

    if (!fromNode || !toNode) continue;

    // Determine if this connection is highlighted
    const isHighlighted = (hoveredNode >= 0 &&
      (nodes[hoveredNode].id === conn.from || nodes[hoveredNode].id === conn.to)) ||
      (selectedNode >= 0 &&
      (nodes[selectedNode].id === conn.from || nodes[selectedNode].id === conn.to));

    // Special styling for skip path
    const isSkipPath = conn.from === 3 && conn.to === 6;

    if (isSkipPath) {
      stroke(isHighlighted ? color(46, 125, 50) : color(76, 175, 80));
      strokeWeight(isHighlighted ? 3 : 2);
      drawingContext.setLineDash([5, 5]);
    } else {
      stroke(isHighlighted ? color(100, 100, 100) : color(180));
      strokeWeight(isHighlighted ? 2 : 1.5);
      drawingContext.setLineDash([]);
    }
    noFill();

    // Calculate connection points
    let startX = fromNode.x + fromNode.width / 2;
    let startY = fromNode.y;
    let endX = toNode.x - toNode.width / 2;
    let endY = toNode.y;

    // Skip path (decision to guided practice)
    if (conn.from === 3 && conn.to === 6) {
      // Curved path going up and across
      const midY = fromNode.y - 60;
      beginShape();
      vertex(fromNode.x + fromNode.width / 2, fromNode.y);
      bezierVertex(
        fromNode.x + 80, fromNode.y,
        toNode.x - 40, midY,
        toNode.x, toNode.y + toNode.height / 2
      );
      endShape();
      drawingContext.setLineDash([]);
      drawArrowhead(toNode.x, toNode.y + toNode.height / 2, HALF_PI, isHighlighted, isSkipPath);

      // Label
      if (conn.label) {
        noStroke();
        fill(isHighlighted ? color(46, 125, 50) : color(76, 175, 80));
        textSize(9);
        textStyle(ITALIC);
        text(conn.label, (fromNode.x + toNode.x) / 2 + 20, midY + 15);
      }
    }
    // Decision to concept introduction (No path)
    else if (conn.from === 3 && conn.to === 4) {
      const midX = (fromNode.x + toNode.x) / 2;
      beginShape();
      vertex(fromNode.x + fromNode.width / 2, fromNode.y);
      vertex(midX, fromNode.y);
      vertex(midX, toNode.y);
      vertex(toNode.x - toNode.width / 2, toNode.y);
      endShape();
      drawArrowhead(toNode.x - toNode.width / 2, toNode.y, 0, isHighlighted, false);

      // Label
      if (conn.label) {
        noStroke();
        fill(isHighlighted ? color(100) : color(150));
        textSize(9);
        textStyle(ITALIC);
        text(conn.label, midX - 15, (fromNode.y + toNode.y) / 2);
      }
    }
    // Cross-lane connections
    else if (fromNode.lane !== toNode.lane) {
      const midX = (startX + endX) / 2;
      beginShape();
      vertex(startX, startY);
      vertex(midX, startY);
      vertex(midX, endY);
      vertex(endX, endY);
      endShape();
      drawArrowhead(endX, endY, 0, isHighlighted, false);
    }
    // Same lane - straight line
    else {
      line(startX, startY, endX, endY);
      drawArrowhead(endX, endY, 0, isHighlighted, false);
    }
  }

  // Reset line dash
  drawingContext.setLineDash([]);
}

function drawArrowhead(x, y, angle, isHighlighted, isSkip) {
  push();
  translate(x, y);
  rotate(angle);
  if (isSkip) {
    fill(isHighlighted ? color(46, 125, 50) : color(76, 175, 80));
  } else {
    fill(isHighlighted ? color(100) : color(180));
  }
  noStroke();
  triangle(0, 0, -8, -4, -8, 4);
  pop();
}

function drawNode(node, isHovered, isSelected) {
  const col = node.categoryColor;
  const nodeWidth = isHovered || isSelected ? node.width + 5 : node.width;
  const nodeHeight = isHovered || isSelected ? node.height + 5 : node.height;

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(hexToRgb(col, 40));
      if (node.type === "decision") {
        drawDiamond(node.x, node.y, nodeWidth + i * 8, nodeHeight + i * 8);
      } else if (node.type === "start") {
        ellipse(node.x, node.y, nodeWidth + i * 8, nodeHeight + i * 8);
      } else if (node.type === "end") {
        ellipse(node.x, node.y, nodeWidth + i * 8, nodeHeight + i * 8);
      } else {
        rectMode(CENTER);
        rect(node.x, node.y, nodeWidth + i * 8, nodeHeight + i * 8, 8);
      }
    }
  }

  // Node shape based on type
  fill(col);
  stroke(255);
  strokeWeight(2);

  if (node.type === "start") {
    ellipse(node.x, node.y, nodeWidth, nodeHeight);
  } else if (node.type === "end") {
    // Double circle for end
    ellipse(node.x, node.y, nodeWidth, nodeHeight);
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(node.x, node.y, nodeWidth - 8, nodeHeight - 8);
  } else if (node.type === "decision") {
    drawDiamond(node.x, node.y, nodeWidth + 10, nodeHeight + 10);
  } else {
    rectMode(CENTER);
    rect(node.x, node.y, nodeWidth, nodeHeight, 6);
  }

  // Skip available indicator
  if (node.skipAvailable) {
    fill(76, 175, 80);
    noStroke();
    ellipse(node.x + nodeWidth / 2 - 5, node.y - nodeHeight / 2 + 5, 12, 12);
    fill(255);
    textSize(8);
    textStyle(BOLD);
    text("S", node.x + nodeWidth / 2 - 5, node.y - nodeHeight / 2 + 5);
  }

  // Node label
  fill(255);
  noStroke();
  textSize(9);
  textStyle(BOLD);

  // Split label into lines
  const lines = node.label.split('\n');
  const lineHeight = 11;
  const startY = node.y - (lines.length - 1) * lineHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], node.x, startY + i * lineHeight);
  }

  // Time annotation below node
  if (node.time) {
    fill(80);
    textSize(9);
    textStyle(ITALIC);
    noStroke();
    text(node.time, node.x, node.y + nodeHeight / 2 + 12);
  }

  rectMode(CORNER);
}

function drawDiamond(x, y, w, h) {
  beginShape();
  vertex(x, y - h / 2);
  vertex(x + w / 2, y);
  vertex(x, y + h / 2);
  vertex(x - w / 2, y);
  endShape(CLOSE);
}

function drawDescriptionPanel(node) {
  const panelWidth = min(canvasWidth - 40, 600);
  const panelHeight = 55;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2 + 5;

  // Background
  fill(255, 250);
  stroke(node.categoryColor);
  strokeWeight(2);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Category badge
  const badgeX = panelX - panelWidth / 2 + 50;
  fill(node.categoryColor);
  noStroke();
  rectMode(CENTER);
  rect(badgeX, panelY - 15, 80, 16, 4);
  fill(255);
  textSize(9);
  textStyle(BOLD);
  text(node.category.toUpperCase(), badgeX, panelY - 15);

  // Mobile indicator
  if (node.mobileReady) {
    const mobileX = panelX + panelWidth / 2 - 40;
    fill(100);
    textSize(9);
    textStyle(NORMAL);
    text("Mobile Ready", mobileX, panelY - 15);
  }

  // Description text
  fill(30, 41, 59);
  noStroke();
  textSize(11);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);

  // Wrap text
  const maxWidth = panelWidth - 30;
  text(node.desc, panelX, panelY + 5, maxWidth, panelHeight - 25);

  rectMode(CORNER);
}

function drawInstructionPanel() {
  const panelWidth = min(canvasWidth - 40, 400);
  const panelHeight = 35;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2 + 5;

  // Background
  fill(240, 245, 250);
  stroke(180);
  strokeWeight(1);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Instruction text
  fill(100);
  noStroke();
  textSize(11);
  textStyle(ITALIC);
  text("Hover or click nodes to see timing details and descriptions", panelX, panelY);

  rectMode(CORNER);
}

function drawLegend() {
  const legendY = drawHeight + 8;
  let legendX = 30;

  textSize(9);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);

  // Color legend
  const categories = [
    { color: ASSESSMENT_COLOR, label: "Assessment" },
    { color: LEARNING_COLOR, label: "Learning" },
    { color: PRACTICE_COLOR, label: "Practice" },
    { color: RESOURCE_COLOR, label: "Resource" }
  ];

  for (let cat of categories) {
    fill(cat.color);
    noStroke();
    rectMode(CENTER);
    rect(legendX, legendY, 12, 12, 3);
    rectMode(CORNER);
    fill(60);
    text(cat.label, legendX + 10, legendY);
    legendX += textWidth(cat.label) + 25;
  }

  // Skip indicator legend
  legendX += 15;
  fill(76, 175, 80);
  noStroke();
  ellipse(legendX, legendY, 12, 12);
  fill(255);
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("S", legendX, legendY);
  textAlign(LEFT, CENTER);
  fill(60);
  textSize(9);
  textStyle(NORMAL);
  text("= Skip Available", legendX + 10, legendY);

  textAlign(CENTER, CENTER);
}

function hexToRgb(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return color(r, g, b, alpha);
}

function mouseMoved() {
  hoveredNode = -1;

  for (let i = 0; i < nodes.length; i++) {
    if (isOverNode(nodes[i], mouseX, mouseY)) {
      hoveredNode = i;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
}

function mousePressed() {
  for (let i = 0; i < nodes.length; i++) {
    if (isOverNode(nodes[i], mouseX, mouseY)) {
      selectedNode = (selectedNode === i) ? -1 : i;
      return;
    }
  }
  selectedNode = -1;
}

function isOverNode(node, mx, my) {
  if (node.type === "decision") {
    // Diamond hit test
    const dx = abs(mx - node.x);
    const dy = abs(my - node.y);
    return (dx / (node.width / 2 + 5) + dy / (node.height / 2 + 5)) <= 1;
  } else if (node.type === "start" || node.type === "end") {
    // Ellipse hit test
    return dist(mx, my, node.x, node.y) < node.width / 2 + 5;
  } else {
    // Rectangle hit test
    return mx > node.x - node.width / 2 - 5 &&
           mx < node.x + node.width / 2 + 5 &&
           my > node.y - node.height / 2 - 5 &&
           my < node.y + node.height / 2 + 5;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateNodePositions();
}
