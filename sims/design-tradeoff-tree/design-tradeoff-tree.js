// Design Tradeoff Tree MicroSim
// Interactive flowchart for making design tradeoff decisions in educational simulations
// Bloom Taxonomy: Evaluate (L5)

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Node definitions with hover text
const nodes = [
  // Start node
  {
    id: 0,
    type: "start",
    text: "Considering a\ndesign feature",
    x: 0.5,
    y: 0.06,
    color: "#6B7280",
    hoverText: "Begin by identifying the feature you want to evaluate for inclusion"
  },
  // Decision 1
  {
    id: 1,
    type: "decision",
    text: "Essential for\nlearning objective?",
    x: 0.5,
    y: 0.18,
    color: "#8B5CF6",
    yesNode: 5,
    noNode: 2,
    hoverText: "Ask: Would learners fail to achieve the objective without this?"
  },
  // Decision 2
  {
    id: 2,
    type: "decision",
    text: "Reduces\ncognitive load?",
    x: 0.5,
    y: 0.32,
    color: "#8B5CF6",
    yesNode: 6,
    noNode: 3,
    hoverText: "Ask: Does this reduce extraneous load or support schema formation?"
  },
  // Decision 3
  {
    id: 3,
    type: "decision",
    text: "Increases learner\nengagement?",
    x: 0.5,
    y: 0.46,
    color: "#8B5CF6",
    yesNode: 4,
    noNode: 9,
    hoverText: "Ask: Does this motivate learners or support sustained attention?"
  },
  // Decision 4
  {
    id: 4,
    type: "decision",
    text: "Engagement benefit\noutweighs load cost?",
    x: 0.25,
    y: 0.58,
    color: "#8B5CF6",
    yesNode: 7,
    noNode: 10,
    hoverText: "Ask: Would removing this hurt learning more than the load it adds?"
  },
  // End state: Include (essential) - Green
  {
    id: 5,
    type: "endpoint",
    text: "Include\n(essential)",
    x: 0.15,
    y: 0.18,
    color: "#22C55E",
    endType: "include-essential",
    hoverText: "This feature is critical for achieving the learning objective",
    nextDecision: 11
  },
  // End state: Include (load reducer) - Green
  {
    id: 6,
    type: "endpoint",
    text: "Include\n(load reducer)",
    x: 0.15,
    y: 0.32,
    color: "#22C55E",
    endType: "include-load",
    hoverText: "This feature helps learners by reducing cognitive burden",
    nextDecision: 11
  },
  // End state: Include (engagement enhancer) - Yellow
  {
    id: 7,
    type: "endpoint",
    text: "Include\n(engagement)",
    x: 0.12,
    y: 0.72,
    color: "#EAB308",
    endType: "include-engagement",
    hoverText: "Include but monitor - the engagement benefit justifies the tradeoff",
    nextDecision: 11
  },
  // Sub-decision: Progressive disclosure
  {
    id: 11,
    type: "decision",
    text: "Can be optional\nor progressive?",
    x: 0.15,
    y: 0.86,
    color: "#06B6D4",
    yesNode: 12,
    noNode: 13,
    hoverText: "Consider if the feature can be revealed gradually or made optional"
  },
  // End state: Don't include (unnecessary)
  {
    id: 9,
    type: "endpoint",
    text: "Don't include\n(unnecessary)",
    x: 0.75,
    y: 0.46,
    color: "#EF4444",
    endType: "exclude-unnecessary",
    hoverText: "This feature adds nothing meaningful to the learning experience"
  },
  // End state: Don't include (seductive detail)
  {
    id: 10,
    type: "endpoint",
    text: "Don't include\n(seductive detail)",
    x: 0.25,
    y: 0.72,
    color: "#EF4444",
    endType: "exclude-seductive",
    hoverText: "The engagement doesn't justify the cognitive load cost"
  },
  // End state: Implement with progressive disclosure
  {
    id: 12,
    type: "endpoint",
    text: "Progressive\ndisclosure",
    x: 0.35,
    y: 0.94,
    color: "#86EFAC",
    endType: "progressive",
    hoverText: "Implement feature with gradual reveal or as optional enhancement"
  },
  // End state: Include in base design
  {
    id: 13,
    type: "endpoint",
    text: "Include in\nbase design",
    x: 0.08,
    y: 0.94,
    color: "#22C55E",
    endType: "base-design",
    hoverText: "Include this feature in the core design from the start"
  }
];

// Edge definitions
const edges = [
  { from: 0, to: 1, label: "" },
  { from: 1, to: 5, label: "Yes", type: "yes" },
  { from: 1, to: 2, label: "No", type: "no" },
  { from: 2, to: 6, label: "Yes", type: "yes" },
  { from: 2, to: 3, label: "No", type: "no" },
  { from: 3, to: 4, label: "Yes", type: "yes" },
  { from: 3, to: 9, label: "No", type: "no" },
  { from: 4, to: 7, label: "Yes", type: "yes" },
  { from: 4, to: 10, label: "No", type: "no" },
  { from: 5, to: 11, label: "", type: "continue" },
  { from: 6, to: 11, label: "", type: "continue" },
  { from: 7, to: 11, label: "", type: "continue" },
  { from: 11, to: 12, label: "Yes", type: "yes" },
  { from: 11, to: 13, label: "No", type: "no" }
];

// Example annotations
const examples = [
  {
    name: "Decorative animation",
    path: [0, 1, 2, 3, 9],
    description: "Fancy animations that don't aid learning"
  },
  {
    name: "Speed control slider",
    path: [0, 1, 5, 11, 13],
    description: "Essential control for understanding time-based concepts"
  },
  {
    name: "Gamification badges",
    path: [0, 1, 2, 3, 4, 7, 11, 12],
    description: "Engaging but can be revealed progressively"
  }
];

// State tracking
let currentPath = [0];
let selectedEndpoint = null;
let hoveredNode = null;
let showInfoPanel = false;
let infoPanelNode = null;
let selectedExample = -1;

// Node sizes
let decisionSize = 55;
let endpointWidth = 85;
let endpointHeight = 40;
let startWidth = 90;
let startHeight = 40;

// Reset button and example dropdown
let resetButton;
let exampleSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  textAlign(CENTER, CENTER);

  // Create example dropdown
  let selectContainer = createDiv('');
  selectContainer.parent(document.querySelector('main'));
  selectContainer.style('display', 'inline-block');
  selectContainer.style('margin-right', '10px');

  let selectLabel = createSpan('Example: ');
  selectLabel.parent(selectContainer);
  selectLabel.style('font-size', '14px');

  exampleSelect = createSelect();
  exampleSelect.parent(selectContainer);
  exampleSelect.option('Select an example...', -1);
  for (let i = 0; i < examples.length; i++) {
    exampleSelect.option(examples[i].name, i);
  }
  exampleSelect.changed(selectExample);
  exampleSelect.style('font-size', '14px');
  exampleSelect.style('padding', '5px');

  // Create reset button
  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetTree);
  resetButton.style('font-size', '14px');
  resetButton.style('padding', '8px 20px');
  resetButton.style('cursor', 'pointer');
  resetButton.style('background-color', '#6B7280');
  resetButton.style('color', 'white');
  resetButton.style('border', 'none');
  resetButton.style('border-radius', '5px');
  resetButton.style('margin-left', '10px');

  describe('Interactive design tradeoff decision tree for evaluating features in educational simulations.', LABEL);
}

function selectExample() {
  let idx = parseInt(exampleSelect.value());
  if (idx >= 0 && idx < examples.length) {
    selectedExample = idx;
    currentPath = [...examples[idx].path];
    let lastNodeId = currentPath[currentPath.length - 1];
    let lastNode = nodes.find(n => n.id === lastNodeId);
    if (lastNode && lastNode.type === 'endpoint') {
      selectedEndpoint = lastNodeId;
    }
  }
}

function draw() {
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Design Tradeoff Decision Tree", canvasWidth / 2, 18);
  textStyle(NORMAL);

  // Draw edges first (underneath nodes)
  drawEdges();

  // Draw nodes
  drawNodes();

  // Draw info panel if node is hovered or selected
  drawInfoPanel();

  // Draw example description if selected
  if (selectedExample >= 0) {
    drawExampleInfo();
  }
}

function drawEdges() {
  for (let edge of edges) {
    let fromNode = nodes.find(n => n.id === edge.from);
    let toNode = nodes.find(n => n.id === edge.to);

    let x1 = fromNode.x * canvasWidth;
    let y1 = fromNode.y * drawHeight + 35;
    let x2 = toNode.x * canvasWidth;
    let y2 = toNode.y * drawHeight + 35;

    // Check if this edge is in current path
    let isInPath = false;
    for (let i = 0; i < currentPath.length - 1; i++) {
      if (currentPath[i] === edge.from && currentPath[i + 1] === edge.to) {
        isInPath = true;
        break;
      }
    }

    // Draw edge
    if (isInPath) {
      stroke(80, 180, 80);
      strokeWeight(3);
    } else {
      stroke(180);
      strokeWeight(1.5);
    }

    // Draw line with curves for better visibility
    noFill();
    if (edge.type === 'continue') {
      // Vertical connector lines
      let midX = (x1 + x2) / 2;
      beginShape();
      vertex(x1, y1 + getNodeHeight(fromNode) / 2);
      vertex(x1, y1 + getNodeHeight(fromNode) / 2 + 10);
      vertex(midX, y1 + getNodeHeight(fromNode) / 2 + 10);
      vertex(midX, y2 - getNodeHeight(toNode) / 2 - 10);
      vertex(x2, y2 - getNodeHeight(toNode) / 2 - 10);
      vertex(x2, y2 - getNodeHeight(toNode) / 2);
      endShape();
    } else if (abs(x2 - x1) > 80 && abs(y2 - y1) > 30) {
      // Use bezier for longer connections
      let midY = (y1 + y2) / 2;
      beginShape();
      vertex(x1, y1);
      quadraticVertex(x1, midY, x2, y2);
      endShape();
    } else {
      line(x1, y1, x2, y2);
    }

    // Draw arrow head
    let angle = atan2(y2 - y1, x2 - x1);
    let arrowSize = 8;

    // Adjust end point based on target node type
    let endOffset = getNodeHeight(toNode) / 2;
    let endX = x2 - cos(angle) * endOffset;
    let endY = y2 - sin(angle) * endOffset;

    if (edge.type !== 'continue') {
      push();
      translate(endX, endY);
      rotate(angle);
      fill(isInPath ? color(80, 180, 80) : color(180));
      noStroke();
      triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
      pop();
    }

    // Draw edge label
    if (edge.label) {
      let labelX = (x1 + x2) / 2;
      let labelY = (y1 + y2) / 2;

      // Offset label to side of line
      let perpAngle = angle + PI / 2;
      let offset = edge.type === 'yes' ? -12 : 12;
      labelX += cos(perpAngle) * offset;
      labelY += sin(perpAngle) * offset;

      fill(isInPath ? color(60, 140, 60) : color(120));
      noStroke();
      textSize(11);
      text(edge.label, labelX, labelY);
    }
  }
}

function getNodeHeight(node) {
  if (node.type === 'start') return startHeight;
  if (node.type === 'decision') return decisionSize;
  return endpointHeight;
}

function drawNodes() {
  for (let node of nodes) {
    let x = node.x * canvasWidth;
    let y = node.y * drawHeight + 35;

    // Check if in path
    let isInPath = currentPath.includes(node.id);
    let isHovered = hoveredNode === node.id;
    let isCurrent = currentPath[currentPath.length - 1] === node.id;

    // Draw node based on type
    let nodeColor = color(node.color);

    if (node.type === 'start') {
      // Rounded rectangle for start
      if (isCurrent) {
        fill(red(nodeColor) + 30, green(nodeColor) + 30, blue(nodeColor) + 30);
        stroke(50);
        strokeWeight(3);
      } else if (isInPath) {
        fill(nodeColor);
        stroke(80, 180, 80);
        strokeWeight(2);
      } else {
        fill(nodeColor);
        stroke(100);
        strokeWeight(1);
      }
      rectMode(CENTER);
      rect(x, y, startWidth, startHeight, 8);

      fill(255);
      noStroke();
      textSize(10);
      let lines = node.text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y + (i - (lines.length - 1) / 2) * 12);
      }

    } else if (node.type === 'decision') {
      // Diamond for decisions
      push();
      translate(x, y);
      rotate(PI / 4);

      if (isCurrent && node.id !== 0) {
        fill(red(nodeColor) + 30, green(nodeColor) + 30, blue(nodeColor) + 30);
        stroke(50);
        strokeWeight(3);
      } else if (isInPath) {
        fill(nodeColor);
        stroke(80, 180, 80);
        strokeWeight(2);
      } else {
        fill(nodeColor);
        stroke(100);
        strokeWeight(1);
      }

      let size = decisionSize * 0.7;
      rectMode(CENTER);
      rect(0, 0, size, size);
      pop();

      fill(255);
      noStroke();
      textSize(9);
      let lines = node.text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y + (i - (lines.length - 1) / 2) * 10);
      }

      // Draw Yes/No click targets if current decision
      if (isCurrent && node.yesNode !== undefined) {
        // Yes button (left)
        let yesX = x - 50;
        let yesY = y;
        fill(isHoveredYes(x, y) ? color(100, 200, 100) : color(150, 220, 150));
        stroke(80, 180, 80);
        strokeWeight(2);
        rectMode(CENTER);
        rect(yesX, yesY, 32, 18, 4);
        fill(50);
        noStroke();
        textSize(10);
        text("Yes", yesX, yesY);

        // No button (right or below)
        let noX = x + 50;
        let noY = y;
        fill(isHoveredNo(x, y) ? color(220, 150, 150) : color(240, 180, 180));
        stroke(200, 100, 100);
        strokeWeight(2);
        rect(noX, noY, 32, 18, 4);
        fill(50);
        noStroke();
        textSize(10);
        text("No", noX, noY);
      }

    } else if (node.type === 'endpoint') {
      // Rounded rectangle for endpoints with color coding
      let isSelected = selectedEndpoint === node.id;

      if (isSelected || (isHovered && isInPath)) {
        fill(red(nodeColor) + 30, green(nodeColor) + 30, blue(nodeColor) + 30);
        stroke(50);
        strokeWeight(3);
      } else if (isInPath) {
        fill(nodeColor);
        stroke(80, 180, 80);
        strokeWeight(2);
      } else {
        fill(nodeColor);
        stroke(100);
        strokeWeight(1);
      }

      rectMode(CENTER);
      rect(x, y, endpointWidth, endpointHeight, 6);

      // Text color based on background
      if (node.color === '#22C55E' || node.color === '#86EFAC') {
        fill(30);
      } else if (node.color === '#EAB308') {
        fill(30);
      } else {
        fill(255);
      }
      noStroke();
      textSize(10);
      textStyle(BOLD);
      let lines = node.text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y + (i - (lines.length - 1) / 2) * 11);
      }
      textStyle(NORMAL);
    }
  }

  // Update hovered node
  hoveredNode = null;
  for (let node of nodes) {
    if (isMouseOverNode(node)) {
      hoveredNode = node.id;
      break;
    }
  }
}

function drawInfoPanel() {
  let infoNode = null;

  if (hoveredNode !== null) {
    infoNode = nodes.find(n => n.id === hoveredNode);
  } else if (selectedEndpoint !== null) {
    infoNode = nodes.find(n => n.id === selectedEndpoint);
  }

  if (infoNode && infoNode.hoverText) {
    // Draw info box at bottom
    let boxX = canvasWidth / 2;
    let boxY = drawHeight + 20;
    let boxWidth = canvasWidth - 40;
    let boxHeight = 35;

    fill(255, 250, 240);
    stroke(color(infoNode.color));
    strokeWeight(2);
    rectMode(CENTER);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    fill(60);
    noStroke();
    textSize(12);
    text(infoNode.hoverText, boxX, boxY);
  }
}

function drawExampleInfo() {
  if (selectedExample >= 0) {
    let example = examples[selectedExample];

    // Draw example description box
    let boxX = canvasWidth - 100;
    let boxY = 50;

    fill(255, 255, 240);
    stroke(100);
    strokeWeight(1);
    rectMode(CENTER);
    rect(boxX, boxY, 180, 40, 5);

    fill(60);
    noStroke();
    textSize(10);
    textStyle(ITALIC);
    text(example.description, boxX, boxY, 170, 35);
    textStyle(NORMAL);
  }
}

function isMouseOverNode(node) {
  let x = node.x * canvasWidth;
  let y = node.y * drawHeight + 35;

  if (node.type === 'start') {
    return mouseX > x - startWidth / 2 && mouseX < x + startWidth / 2 &&
           mouseY > y - startHeight / 2 && mouseY < y + startHeight / 2;
  } else if (node.type === 'decision') {
    // Diamond hit test (simplified as circle)
    let d = dist(mouseX, mouseY, x, y);
    return d < decisionSize / 2;
  } else if (node.type === 'endpoint') {
    return mouseX > x - endpointWidth / 2 && mouseX < x + endpointWidth / 2 &&
           mouseY > y - endpointHeight / 2 && mouseY < y + endpointHeight / 2;
  }
  return false;
}

function isHoveredYes(nodeX, nodeY) {
  let yesX = nodeX - 50;
  let yesY = nodeY;
  return mouseX > yesX - 16 && mouseX < yesX + 16 &&
         mouseY > yesY - 9 && mouseY < yesY + 9;
}

function isHoveredNo(nodeX, nodeY) {
  let noX = nodeX + 50;
  let noY = nodeY;
  return mouseX > noX - 16 && mouseX < noX + 16 &&
         mouseY > noY - 9 && mouseY < noY + 9;
}

function mousePressed() {
  let currentNode = nodes.find(n => n.id === currentPath[currentPath.length - 1]);

  // Handle decision node clicks
  if (currentNode && currentNode.type === 'decision' && currentNode.yesNode !== undefined) {
    let x = currentNode.x * canvasWidth;
    let y = currentNode.y * drawHeight + 35;

    // Check Yes click
    if (isHoveredYes(x, y)) {
      currentPath.push(currentNode.yesNode);
      let nextNode = nodes.find(n => n.id === currentNode.yesNode);
      if (nextNode.type === 'endpoint') {
        selectedEndpoint = nextNode.id;
        // Check if this endpoint leads to progressive disclosure decision
        if (nextNode.nextDecision !== undefined) {
          currentPath.push(nextNode.nextDecision);
          selectedEndpoint = null;
        }
      }
      selectedExample = -1;
      exampleSelect.selected(-1);
      return;
    }

    // Check No click
    if (isHoveredNo(x, y)) {
      currentPath.push(currentNode.noNode);
      let nextNode = nodes.find(n => n.id === currentNode.noNode);
      if (nextNode.type === 'endpoint') {
        selectedEndpoint = nextNode.id;
        if (nextNode.nextDecision !== undefined) {
          currentPath.push(nextNode.nextDecision);
          selectedEndpoint = null;
        }
      }
      selectedExample = -1;
      exampleSelect.selected(-1);
      return;
    }
  }

  // Handle endpoint with next decision
  if (currentNode && currentNode.type === 'endpoint' && currentNode.nextDecision !== undefined) {
    if (isMouseOverNode(currentNode)) {
      currentPath.push(currentNode.nextDecision);
      selectedEndpoint = null;
      return;
    }
  }

  // Start node click advances to first decision
  if (currentPath.length === 1 && currentPath[0] === 0) {
    let startNode = nodes[0];
    if (isMouseOverNode(startNode)) {
      currentPath.push(1);
    }
  }

  // Click on any endpoint to see its hover text
  for (let node of nodes) {
    if (node.type === 'endpoint' && isMouseOverNode(node)) {
      if (currentPath.includes(node.id)) {
        selectedEndpoint = node.id;
      }
      break;
    }
  }
}

function resetTree() {
  currentPath = [0];
  selectedEndpoint = null;
  hoveredNode = null;
  selectedExample = -1;
  exampleSelect.selected(-1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasHeight = drawHeight + controlHeight;
  }
}
