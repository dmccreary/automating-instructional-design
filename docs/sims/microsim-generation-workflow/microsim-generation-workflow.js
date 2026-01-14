// MicroSim Generation Workflow
// Interactive swimlane flowchart showing the complete workflow from learning objective to deployed MicroSim

let canvasWidth = 800;
let canvasHeight = 500;
let drawHeight = 450;
let controlHeight = 50;

// Swimlane colors
const DESIGNER_COLOR = '#2196f3';   // Blue
const CLAUDE_COLOR = '#9c27b0';      // Purple
const FILES_COLOR = '#4caf50';       // Green

// Node data
let nodes = [];
let hoveredNode = -1;
let selectedNode = -1;

// Swimlane definitions
const swimlanes = [
  { name: "Instructional Designer", color: DESIGNER_COLOR, y: 0 },
  { name: "Claude Code", color: CLAUDE_COLOR, y: 1 },
  { name: "MicroSim Files", color: FILES_COLOR, y: 2 }
];

// Step definitions with swimlane assignments
const stepData = [
  {
    id: 1,
    type: "start",
    label: "Define Learning\nObjective",
    lane: 0,
    col: 0,
    desc: "The instructional designer identifies what the learner should be able to do after completing the MicroSim. This becomes the foundation for all design decisions."
  },
  {
    id: 2,
    type: "process",
    label: "Analyze\nConcept Type",
    lane: 0,
    col: 1,
    desc: "Determine the nature of the concept: Is it a process, relationship, comparison, spatial concept, or data visualization? This guides library selection."
  },
  {
    id: 3,
    type: "process",
    label: "Select\nLibrary Type",
    lane: 0,
    col: 2,
    desc: "Choose the appropriate JavaScript library (p5.js, vis-network, Chart.js, Mermaid, etc.) based on the concept type and visualization needs."
  },
  {
    id: 4,
    type: "process",
    label: "Write\nSpecification",
    lane: 0,
    col: 3,
    desc: "Create a detailed specification including visual elements, interactions, data requirements, and educational scaffolding."
  },
  {
    id: 5,
    type: "process",
    label: "Invoke MicroSim\nGenerator Skill",
    lane: 1,
    col: 4,
    desc: "Claude Code's microsim-generator skill analyzes the specification and routes to the appropriate template based on the library type."
  },
  {
    id: 6,
    type: "process",
    label: "Generate\nFiles",
    lane: 2,
    col: 5,
    desc: "The skill creates the complete MicroSim package: HTML, JavaScript, CSS, index.md documentation, and metadata.json."
  },
  {
    id: 7,
    type: "decision",
    label: "Test in\nBrowser",
    lane: 0,
    col: 6,
    desc: "The designer tests the MicroSim locally using mkdocs serve, checking functionality, responsiveness, and educational effectiveness."
  },
  {
    id: 8,
    type: "process",
    label: "Iterate with\nFeedback",
    lane: 1,
    col: 7,
    desc: "If issues are found, the designer provides specific feedback to Claude Code, which refines the code and regenerates files."
  },
  {
    id: 9,
    type: "process",
    label: "Deploy to\nTextbook",
    lane: 2,
    col: 7,
    desc: "Once approved, the MicroSim is committed to the repository and deployed via mkdocs gh-deploy to the live textbook site."
  },
  {
    id: 10,
    type: "end",
    label: "MicroSim\nLive!",
    lane: 1,
    col: 8,
    desc: "The MicroSim is now available to learners on the published intelligent textbook website."
  }
];

// Connections between nodes (from, to, label)
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8, label: "Issues" },
  { from: 7, to: 9, label: "Success" },
  { from: 8, to: 6 },
  { from: 9, to: 10 }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  } else {
    canvasWidth = min(windowWidth - 20, 900);
  }
  canvasWidth = max(canvasWidth, 700);
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

  const laneHeight = (drawHeight - 60) / 3;
  const startX = 80;
  const colWidth = (canvasWidth - 100) / 9;

  for (let step of stepData) {
    const x = startX + step.col * colWidth;
    const y = 50 + step.lane * laneHeight + laneHeight / 2;

    nodes.push({
      ...step,
      x: x,
      y: y,
      width: 80,
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
  text("MicroSim Generation Workflow", canvasWidth / 2, 20);

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
  }

  // Draw legend
  drawLegend();
}

function drawSwimlanes() {
  const laneHeight = (drawHeight - 60) / 3;
  const labelWidth = 20;

  for (let i = 0; i < swimlanes.length; i++) {
    const y = 40 + i * laneHeight;

    // Lane background with subtle color
    noStroke();
    fill(hexToRgb(swimlanes[i].color, 15));
    rect(0, y, canvasWidth, laneHeight);

    // Lane border
    stroke(hexToRgb(swimlanes[i].color, 100));
    strokeWeight(1);
    line(0, y, canvasWidth, y);

    // Lane label (rotated)
    push();
    translate(15, y + laneHeight / 2);
    rotate(-HALF_PI);
    fill(hexToRgb(swimlanes[i].color, 255));
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text(swimlanes[i].name, 0, 0);
    pop();
  }

  // Bottom border
  stroke(hexToRgb(swimlanes[2].color, 100));
  line(0, 40 + 3 * laneHeight, canvasWidth, 40 + 3 * laneHeight);
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

    stroke(isHighlighted ? color(100, 100, 100) : color(180));
    strokeWeight(isHighlighted ? 2 : 1.5);
    noFill();

    // Calculate connection points
    let startX = fromNode.x + fromNode.width / 2;
    let startY = fromNode.y;
    let endX = toNode.x - toNode.width / 2;
    let endY = toNode.y;

    // Special case for feedback loop (8 -> 6)
    if (conn.from === 8 && conn.to === 6) {
      // Draw a curved path going up
      const midY = Math.min(fromNode.y, toNode.y) - 30;
      beginShape();
      vertex(fromNode.x, fromNode.y - fromNode.height / 2);
      bezierVertex(
        fromNode.x, midY,
        toNode.x, midY,
        toNode.x, toNode.y + toNode.height / 2
      );
      endShape();
      drawArrowhead(toNode.x, toNode.y + toNode.height / 2, -HALF_PI, isHighlighted);
    }
    // Decision branches
    else if (conn.from === 7 && conn.to === 8) {
      // Issues path - goes down first then right
      const midX = (fromNode.x + toNode.x) / 2;
      beginShape();
      vertex(fromNode.x + fromNode.width / 2, fromNode.y);
      vertex(midX, fromNode.y);
      vertex(midX, toNode.y);
      vertex(toNode.x - toNode.width / 2, toNode.y);
      endShape();
      drawArrowhead(toNode.x - toNode.width / 2, toNode.y, 0, isHighlighted);

      // Label
      if (conn.label) {
        noStroke();
        fill(isHighlighted ? color(100) : color(150));
        textSize(9);
        textStyle(ITALIC);
        text(conn.label, midX, (fromNode.y + toNode.y) / 2 - 5);
      }
    }
    else if (conn.from === 7 && conn.to === 9) {
      // Success path - goes down
      const midX = (fromNode.x + toNode.x) / 2;
      beginShape();
      vertex(fromNode.x + fromNode.width / 2, fromNode.y);
      vertex(midX, fromNode.y);
      vertex(midX, toNode.y);
      vertex(toNode.x - toNode.width / 2, toNode.y);
      endShape();
      drawArrowhead(toNode.x - toNode.width / 2, toNode.y, 0, isHighlighted);

      // Label
      if (conn.label) {
        noStroke();
        fill(isHighlighted ? color(100) : color(150));
        textSize(9);
        textStyle(ITALIC);
        text(conn.label, midX, (fromNode.y + toNode.y) / 2 + 10);
      }
    }
    else if (fromNode.lane !== toNode.lane) {
      // Cross-lane connection
      const midX = (startX + endX) / 2;
      beginShape();
      vertex(startX, startY);
      vertex(midX, startY);
      vertex(midX, endY);
      vertex(endX, endY);
      endShape();
      drawArrowhead(endX, endY, 0, isHighlighted);
    }
    else {
      // Same lane - straight line
      line(startX, startY, endX, endY);
      drawArrowhead(endX, endY, 0, isHighlighted);
    }
  }
}

function drawArrowhead(x, y, angle, isHighlighted) {
  push();
  translate(x, y);
  rotate(angle);
  fill(isHighlighted ? color(100) : color(180));
  noStroke();
  triangle(0, 0, -8, -4, -8, 4);
  pop();
}

function drawNode(node, isHovered, isSelected) {
  const col = getLaneColor(node.lane);
  const nodeWidth = isHovered || isSelected ? node.width + 5 : node.width;
  const nodeHeight = isHovered || isSelected ? node.height + 5 : node.height;

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(hexToRgb(col, 30));
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
  const panelWidth = min(canvasWidth - 40, 500);
  const panelHeight = 45;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2;

  // Background
  fill(255, 250);
  stroke(getLaneColor(node.lane));
  strokeWeight(2);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Description text
  fill(30, 41, 59);
  noStroke();
  textSize(11);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);

  // Wrap text if needed
  const maxWidth = panelWidth - 20;
  text(node.desc, panelX, panelY, maxWidth, panelHeight - 10);

  rectMode(CORNER);
}

function drawLegend() {
  const legendY = drawHeight + 8;
  const legendX = 30;

  textSize(9);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);

  // Node type legend
  noStroke();

  // Start/End
  fill(100);
  ellipse(legendX, legendY, 12, 12);
  fill(60);
  text("Start/End", legendX + 12, legendY);

  // Process
  fill(100);
  rectMode(CENTER);
  rect(legendX + 70, legendY, 14, 10, 2);
  rectMode(CORNER);
  fill(60);
  text("Process", legendX + 82, legendY);

  // Decision
  fill(100);
  push();
  translate(legendX + 135, legendY);
  beginShape();
  vertex(0, -6);
  vertex(8, 0);
  vertex(0, 6);
  vertex(-8, 0);
  endShape(CLOSE);
  pop();
  fill(60);
  text("Decision", legendX + 148, legendY);

  textAlign(CENTER, CENTER);
}

function getLaneColor(lane) {
  const colors = [DESIGNER_COLOR, CLAUDE_COLOR, FILES_COLOR];
  return colors[lane];
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
