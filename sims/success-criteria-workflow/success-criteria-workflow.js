// Success Criteria Workflow MicroSim
// Interactive flowchart showing the process for validating a MicroSim against success criteria
// Bloom Taxonomy Level: Evaluate

let canvasWidth = 700;
let canvasHeight = 600;
let drawHeight = 540;
let controlHeight = 60;

// Node data
let nodes = [];
let hoveredNode = -1;
let selectedNode = -1;

// Colors
const BLUE = '#3B82F6';       // Testing steps
const YELLOW = '#F59E0B';     // Decision points
const GREEN = '#10B981';      // Success outcomes
const ORANGE = '#F97316';     // Iteration paths

// Step definitions
const stepData = [
  {
    id: 1,
    type: "start",
    label: "MicroSim\nGenerated",
    col: 1,
    row: 0,
    color: GREEN,
    hoverText: "AI has produced a working MicroSim from your specification"
  },
  {
    id: 2,
    type: "process",
    label: "Load Success\nCriteria Checklist",
    col: 1,
    row: 1,
    color: BLUE,
    hoverText: "Open the specification document to the success criteria section"
  },
  {
    id: 3,
    type: "process",
    label: "Test Functional\nCriterion #1",
    col: 1,
    row: 2,
    color: BLUE,
    hoverText: "Manually verify the first functional requirement"
  },
  {
    id: 4,
    type: "decision",
    label: "Criterion\nMet?",
    col: 1,
    row: 3,
    color: YELLOW,
    hoverText: "Does the MicroSim behavior match the specification exactly?"
  },
  {
    id: 5,
    type: "process",
    label: "Document\nPass",
    col: 0,
    row: 4,
    color: GREEN,
    hoverText: "Check off the criterion and note any observations"
  },
  {
    id: 6,
    type: "process",
    label: "Document\nFailure Details",
    col: 2,
    row: 4,
    color: ORANGE,
    hoverText: "Record exactly how behavior differs from specification"
  },
  {
    id: 7,
    type: "decision",
    label: "More\nCriteria?",
    col: 1,
    row: 5,
    color: YELLOW,
    hoverText: "Are there additional criteria to test?"
  },
  {
    id: 8,
    type: "decision",
    label: "All Criteria\nPassed?",
    col: 0,
    row: 6,
    color: YELLOW,
    hoverText: "Review overall results"
  },
  {
    id: 9,
    type: "end",
    label: "MicroSim\nApproved",
    col: 0,
    row: 7,
    color: GREEN,
    hoverText: "MicroSim ready for deployment or next phase"
  },
  {
    id: 10,
    type: "process",
    label: "Create Refinement\nRequest",
    col: 2,
    row: 6,
    color: ORANGE,
    hoverText: "Document specific issues for AI to address in next iteration"
  }
];

// Connections between nodes
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5, label: "Yes" },
  { from: 4, to: 6, label: "No" },
  { from: 5, to: 7 },
  { from: 6, to: 7 },
  { from: 7, to: 3, label: "Yes" },
  { from: 7, to: 8, label: "No" },
  { from: 8, to: 9, label: "Yes" },
  { from: 8, to: 10, label: "No" },
  { from: 10, to: 1, label: "Iterate" }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  } else {
    canvasWidth = min(windowWidth - 20, 700);
  }
  canvasWidth = max(canvasWidth, 500);
  canvasWidth = min(canvasWidth, 800);
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

  const colWidth = canvasWidth / 3;
  const rowHeight = 60;
  const startY = 70;

  for (let step of stepData) {
    const x = colWidth / 2 + step.col * colWidth;
    const y = startY + step.row * rowHeight;

    nodes.push({
      ...step,
      x: x,
      y: y,
      width: 100,
      height: 45
    });
  }
}

function draw() {
  background(248, 250, 252);

  // Draw title
  fill(30, 41, 59);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  text("Success Criteria Validation Workflow", canvasWidth / 2, 25);

  // Draw subtitle
  textSize(11);
  textStyle(NORMAL);
  fill(100);
  text("Click nodes to see details", canvasWidth / 2, 45);

  // Draw connections first (behind nodes)
  drawConnections();

  // Draw nodes
  for (let i = 0; i < nodes.length; i++) {
    drawNode(nodes[i], i === hoveredNode, i === selectedNode);
  }

  // Draw description panel
  drawDescriptionPanel();

  // Draw legend
  drawLegend();
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

    stroke(isHighlighted ? color(80) : color(160));
    strokeWeight(isHighlighted ? 2.5 : 1.5);
    noFill();

    // Calculate connection points based on node positions
    let startX, startY, endX, endY;

    // Special case: Loop from "More Criteria?" back to "Test Criterion"
    if (conn.from === 7 && conn.to === 3) {
      // Right side loop
      startX = fromNode.x + fromNode.width / 2;
      startY = fromNode.y;
      endX = toNode.x + toNode.width / 2;
      endY = toNode.y;

      const loopX = canvasWidth - 30;
      beginShape();
      vertex(startX, startY);
      vertex(loopX, startY);
      vertex(loopX, endY);
      vertex(endX, endY);
      endShape();

      drawArrowhead(endX, endY, PI, isHighlighted);

      // Label
      if (conn.label) {
        push();
        fill(isHighlighted ? color(80) : color(120));
        noStroke();
        textSize(10);
        textStyle(ITALIC);
        text(conn.label, loopX - 15, (startY + endY) / 2);
        pop();
      }
      continue;
    }

    // Special case: Loop from "Create Refinement Request" back to "MicroSim Generated"
    if (conn.from === 10 && conn.to === 1) {
      startX = toNode.x + toNode.width / 2;
      startY = toNode.y;
      endX = fromNode.x + fromNode.width / 2;
      endY = fromNode.y;

      const loopX = canvasWidth - 20;
      beginShape();
      vertex(endX, endY);
      vertex(loopX, endY);
      vertex(loopX, startY);
      vertex(startX, startY);
      endShape();

      drawArrowhead(startX, startY, PI, isHighlighted);

      // Label
      if (conn.label) {
        push();
        fill(isHighlighted ? color(80) : color(120));
        noStroke();
        textSize(10);
        textStyle(ITALIC);
        text(conn.label, loopX - 20, (startY + endY) / 2);
        pop();
      }
      continue;
    }

    // Determine start and end points based on relative positions
    if (fromNode.row < toNode.row) {
      // Going down
      startX = fromNode.x;
      startY = fromNode.y + fromNode.height / 2;
      endY = toNode.y - toNode.height / 2;

      if (fromNode.col === toNode.col) {
        // Straight down
        endX = toNode.x;
        line(startX, startY, endX, endY);
        drawArrowhead(endX, endY, HALF_PI, isHighlighted);
      } else {
        // Down then horizontal
        endX = toNode.x;
        const midY = (startY + endY) / 2;
        beginShape();
        vertex(startX, startY);
        vertex(startX, midY);
        vertex(endX, midY);
        vertex(endX, endY);
        endShape();
        drawArrowhead(endX, endY, HALF_PI, isHighlighted);

        // Label at bend
        if (conn.label) {
          push();
          fill(isHighlighted ? color(80) : color(120));
          noStroke();
          textSize(10);
          textStyle(ITALIC);
          const labelOffsetX = fromNode.col < toNode.col ? 15 : -15;
          text(conn.label, startX + labelOffsetX, midY - 8);
          pop();
        }
      }
    } else if (fromNode.row > toNode.row) {
      // Going up
      startX = fromNode.x;
      startY = fromNode.y - fromNode.height / 2;
      endX = toNode.x;
      endY = toNode.y + toNode.height / 2;

      if (fromNode.col === toNode.col) {
        line(startX, startY, endX, endY);
        drawArrowhead(endX, endY, -HALF_PI, isHighlighted);
      }
    } else {
      // Same row - horizontal
      if (fromNode.col < toNode.col) {
        startX = fromNode.x + fromNode.width / 2;
        endX = toNode.x - toNode.width / 2;
      } else {
        startX = fromNode.x - fromNode.width / 2;
        endX = toNode.x + toNode.width / 2;
      }
      startY = fromNode.y;
      endY = toNode.y;
      line(startX, startY, endX, endY);

      const angle = fromNode.col < toNode.col ? 0 : PI;
      drawArrowhead(endX, endY, angle, isHighlighted);
    }

    // Draw label for straight vertical connections
    if (conn.label && fromNode.col === toNode.col && fromNode.row < toNode.row) {
      push();
      fill(isHighlighted ? color(80) : color(120));
      noStroke();
      textSize(10);
      textStyle(ITALIC);
      text(conn.label, (startX + endX) / 2 + 18, (startY + endY) / 2);
      pop();
    }
  }
}

function drawArrowhead(x, y, angle, isHighlighted) {
  push();
  translate(x, y);
  rotate(angle);
  fill(isHighlighted ? color(80) : color(160));
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function drawNode(node, isHovered, isSelected) {
  const col = hexToColor(node.color);
  const nodeWidth = isHovered || isSelected ? node.width + 6 : node.width;
  const nodeHeight = isHovered || isSelected ? node.height + 4 : node.height;

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(red(col), green(col), blue(col), 40);
      if (node.type === "decision") {
        drawDiamond(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10);
      } else if (node.type === "start" || node.type === "end") {
        rectMode(CENTER);
        rect(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10, 20);
      } else {
        rectMode(CENTER);
        rect(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10, 6);
      }
    }
  }

  // Node shape based on type
  fill(col);
  stroke(255);
  strokeWeight(2);

  if (node.type === "start" || node.type === "end") {
    // Rounded rectangle (stadium shape) for start/end
    rectMode(CENTER);
    rect(node.x, node.y, nodeWidth, nodeHeight, 20);
    if (node.type === "end") {
      // Double border for end
      noFill();
      stroke(255);
      strokeWeight(2);
      rect(node.x, node.y, nodeWidth - 8, nodeHeight - 6, 16);
    }
  } else if (node.type === "decision") {
    drawDiamond(node.x, node.y, nodeWidth + 15, nodeHeight + 15);
  } else {
    rectMode(CENTER);
    rect(node.x, node.y, nodeWidth, nodeHeight, 6);
  }

  // Node label
  fill(255);
  noStroke();
  textSize(10);
  textStyle(BOLD);

  // Split label into lines
  const lines = node.label.split('\n');
  const lineHeight = 12;
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

function drawDescriptionPanel() {
  const panelWidth = min(canvasWidth - 40, 450);
  const panelHeight = 50;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + 25;

  if (selectedNode >= 0 || hoveredNode >= 0) {
    const node = nodes[selectedNode >= 0 ? selectedNode : hoveredNode];
    const col = hexToColor(node.color);

    // Background
    fill(255, 250);
    stroke(col);
    strokeWeight(2);
    rectMode(CENTER);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Node name as header
    fill(col);
    noStroke();
    textSize(11);
    textStyle(BOLD);
    const cleanLabel = node.label.replace('\n', ' ');
    text(cleanLabel, panelX, panelY - 12);

    // Hover text description
    fill(30, 41, 59);
    textSize(10);
    textStyle(NORMAL);
    text(node.hoverText, panelX, panelY + 8, panelWidth - 20);

    rectMode(CORNER);
  } else {
    // Default instruction
    fill(100);
    noStroke();
    textSize(11);
    textStyle(ITALIC);
    text("Hover or click on nodes to see validation details", panelX, panelY);
  }
}

function drawLegend() {
  const legendX = 20;
  const legendY = drawHeight - 20;
  const spacing = 95;

  textSize(9);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  noStroke();

  // Testing steps (Blue)
  fill(hexToColor(BLUE));
  rectMode(CENTER);
  rect(legendX + 8, legendY, 14, 10, 2);
  fill(60);
  text("Testing", legendX + 20, legendY);

  // Decision (Yellow)
  fill(hexToColor(YELLOW));
  push();
  translate(legendX + spacing + 8, legendY);
  beginShape();
  vertex(0, -6);
  vertex(8, 0);
  vertex(0, 6);
  vertex(-8, 0);
  endShape(CLOSE);
  pop();
  fill(60);
  text("Decision", legendX + spacing + 20, legendY);

  // Success (Green)
  fill(hexToColor(GREEN));
  rect(legendX + spacing * 2 + 8, legendY, 14, 10, 6);
  fill(60);
  text("Success", legendX + spacing * 2 + 20, legendY);

  // Iteration (Orange)
  fill(hexToColor(ORANGE));
  rect(legendX + spacing * 3 + 8, legendY, 14, 10, 2);
  fill(60);
  text("Iteration", legendX + spacing * 3 + 20, legendY);

  rectMode(CORNER);
  textAlign(CENTER, CENTER);
}

function hexToColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return color(r, g, b);
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
    return (dx / (node.width / 2 + 10) + dy / (node.height / 2 + 10)) <= 1;
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
