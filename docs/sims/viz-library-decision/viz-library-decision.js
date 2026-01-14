// Visualization Library Decision Tree MicroSim
// Interactive flowchart to help select the right JavaScript visualization library

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Node definitions
const nodes = [
  // Start node
  {
    id: 0,
    type: "start",
    text: "What type of\ncontent?",
    x: 0.5,
    y: 0.08,
    color: "#6B7280",
    next: [1]
  },
  // Decision nodes
  {
    id: 1,
    type: "decision",
    text: "Animated or\nphysics-based?",
    x: 0.5,
    y: 0.22,
    color: "#A78BFA",
    yesNode: 7,
    noNode: 2
  },
  {
    id: 2,
    type: "decision",
    text: "Data or\nstatistics?",
    x: 0.5,
    y: 0.38,
    color: "#A78BFA",
    yesNode: 3,
    noNode: 4
  },
  {
    id: 3,
    type: "decision",
    text: "Need math\nfunctions?",
    x: 0.22,
    y: 0.54,
    color: "#A78BFA",
    yesNode: 9,
    noNode: 8
  },
  {
    id: 4,
    type: "decision",
    text: "Relationships\nor networks?",
    x: 0.5,
    y: 0.54,
    color: "#A78BFA",
    yesNode: 10,
    noNode: 5
  },
  {
    id: 5,
    type: "decision",
    text: "Time-based or\nchronological?",
    x: 0.78,
    y: 0.54,
    color: "#A78BFA",
    yesNode: 11,
    noNode: 6
  },
  {
    id: 6,
    type: "decision",
    text: "Geographic or\nlocation-based?",
    x: 0.78,
    y: 0.75,
    color: "#A78BFA",
    yesNode: 12,
    noNode: 13
  },
  // Library endpoint nodes
  {
    id: 7,
    type: "library",
    text: "p5.js",
    x: 0.12,
    y: 0.22,
    color: "#EC4899",
    description: "Creative coding, animations, physics simulations, interactive graphics"
  },
  {
    id: 8,
    type: "library",
    text: "Chart.js",
    x: 0.08,
    y: 0.75,
    color: "#F97316",
    description: "Simple charts: bar, line, pie, doughnut, radar"
  },
  {
    id: 9,
    type: "library",
    text: "Plotly",
    x: 0.22,
    y: 0.75,
    color: "#3B82F6",
    description: "Scientific plots, 3D charts, mathematical functions, interactive analysis"
  },
  {
    id: 10,
    type: "library",
    text: "vis-network",
    x: 0.38,
    y: 0.75,
    color: "#14B8A6",
    description: "Network graphs, node-edge relationships, concept maps, hierarchies"
  },
  {
    id: 11,
    type: "library",
    text: "vis-timeline",
    x: 0.54,
    y: 0.75,
    color: "#22C55E",
    description: "Timelines, Gantt charts, event sequences, chronological data"
  },
  {
    id: 12,
    type: "library",
    text: "Leaflet",
    x: 0.92,
    y: 0.92,
    color: "#166534",
    description: "Interactive maps, geographic data, location markers, spatial analysis"
  },
  {
    id: 13,
    type: "library",
    text: "Mermaid",
    x: 0.68,
    y: 0.92,
    color: "#8B5CF6",
    description: "Flowcharts, sequence diagrams, state diagrams, process workflows"
  }
];

// Edge definitions
const edges = [
  { from: 0, to: 1, label: "" },
  { from: 1, to: 7, label: "Yes", type: "yes" },
  { from: 1, to: 2, label: "No", type: "no" },
  { from: 2, to: 3, label: "Yes", type: "yes" },
  { from: 2, to: 4, label: "No", type: "no" },
  { from: 3, to: 9, label: "Yes", type: "yes" },
  { from: 3, to: 8, label: "No", type: "no" },
  { from: 4, to: 10, label: "Yes", type: "yes" },
  { from: 4, to: 5, label: "No", type: "no" },
  { from: 5, to: 11, label: "Yes", type: "yes" },
  { from: 5, to: 6, label: "No", type: "no" },
  { from: 6, to: 12, label: "Yes", type: "yes" },
  { from: 6, to: 13, label: "No", type: "no" }
];

// State tracking
let currentPath = [0];
let selectedLibrary = null;
let hoveredNode = null;

// Node sizes
let decisionSize = 50;
let libraryWidth = 70;
let libraryHeight = 30;
let startWidth = 80;
let startHeight = 35;

// Reset button
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  textAlign(CENTER, CENTER);

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

  positionButton();

  describe('Interactive decision tree for selecting JavaScript visualization libraries based on content type and requirements.', LABEL);
}

function positionButton() {
  resetButton.position(
    (canvasWidth - 80) / 2,
    drawHeight + 10
  );
}

function draw() {
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Visualization Library Decision Tree", canvasWidth / 2, 20);
  textStyle(NORMAL);

  // Draw edges first (underneath nodes)
  drawEdges();

  // Draw nodes
  drawNodes();

  // Draw info panel if library is selected or hovered
  drawInfoPanel();
}

function drawEdges() {
  for (let edge of edges) {
    let fromNode = nodes.find(n => n.id === edge.from);
    let toNode = nodes.find(n => n.id === edge.to);

    let x1 = fromNode.x * canvasWidth;
    let y1 = fromNode.y * drawHeight + 30;
    let x2 = toNode.x * canvasWidth;
    let y2 = toNode.y * drawHeight + 30;

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

    // Draw line with slight curve for better visibility
    noFill();
    if (abs(x2 - x1) > 50 && abs(y2 - y1) > 20) {
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
    let endOffset = toNode.type === 'library' ? libraryHeight / 2 : decisionSize / 2;
    let endX = x2 - cos(angle) * endOffset;
    let endY = y2 - sin(angle) * endOffset;

    push();
    translate(endX, endY);
    rotate(angle);
    fill(isInPath ? color(80, 180, 80) : color(180));
    noStroke();
    triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
    pop();

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

function drawNodes() {
  for (let node of nodes) {
    let x = node.x * canvasWidth;
    let y = node.y * drawHeight + 30;

    // Check if in path
    let isInPath = currentPath.includes(node.id);
    let isHovered = hoveredNode === node.id;
    let isCurrent = currentPath[currentPath.length - 1] === node.id;

    // Check if clickable
    let isClickable = false;
    if (node.type === 'decision' && isCurrent) {
      isClickable = true;
    } else if (node.type === 'start' && currentPath.length === 1 && currentPath[0] === 0) {
      isClickable = true;
    }

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
        text(lines[i], x, y + (i - (lines.length - 1) / 2) * 11);
      }

    } else if (node.type === 'decision') {
      // Diamond for decisions
      push();
      translate(x, y);
      rotate(PI / 4);

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

      // Draw Yes/No click targets if current
      if (isCurrent) {
        // Yes button (left)
        let yesX = x - 45;
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

        // No button (right or bottom based on node)
        let noX, noY;
        if (node.id === 1) {
          noX = x;
          noY = y + 45;
        } else {
          noX = x + 45;
          noY = y;
        }
        fill(isHoveredNo(x, y, node.id) ? color(220, 150, 150) : color(240, 180, 180));
        stroke(200, 100, 100);
        strokeWeight(2);
        rect(noX, noY, 32, 18, 4);
        fill(50);
        noStroke();
        textSize(10);
        text("No", noX, noY);
      }

    } else if (node.type === 'library') {
      // Rounded rectangle for libraries
      let isSelected = selectedLibrary === node.id;

      if (isSelected || isHovered) {
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
      rect(x, y, libraryWidth, libraryHeight, 6);

      fill(255);
      noStroke();
      textSize(11);
      textStyle(BOLD);
      text(node.text, x, y);
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

  if (selectedLibrary !== null) {
    infoNode = nodes.find(n => n.id === selectedLibrary);
  } else if (hoveredNode !== null) {
    let node = nodes.find(n => n.id === hoveredNode);
    if (node.type === 'library') {
      infoNode = node;
    }
  }

  if (infoNode) {
    // Draw info box at bottom
    let boxX = canvasWidth / 2;
    let boxY = drawHeight - 25;
    let boxWidth = canvasWidth - 40;
    let boxHeight = 45;

    fill(255, 250, 240);
    stroke(color(infoNode.color));
    strokeWeight(2);
    rectMode(CENTER);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    fill(color(infoNode.color));
    noStroke();
    textSize(14);
    textStyle(BOLD);
    text(infoNode.text, boxX, boxY - 10);

    fill(60);
    textStyle(NORMAL);
    textSize(11);
    text(infoNode.description, boxX, boxY + 10);
  }
}

function isMouseOverNode(node) {
  let x = node.x * canvasWidth;
  let y = node.y * drawHeight + 30;

  if (node.type === 'start') {
    return mouseX > x - startWidth / 2 && mouseX < x + startWidth / 2 &&
           mouseY > y - startHeight / 2 && mouseY < y + startHeight / 2;
  } else if (node.type === 'decision') {
    // Diamond hit test (simplified as circle)
    let d = dist(mouseX, mouseY, x, y);
    return d < decisionSize / 2;
  } else if (node.type === 'library') {
    return mouseX > x - libraryWidth / 2 && mouseX < x + libraryWidth / 2 &&
           mouseY > y - libraryHeight / 2 && mouseY < y + libraryHeight / 2;
  }
  return false;
}

function isHoveredYes(nodeX, nodeY) {
  let yesX = nodeX - 45;
  let yesY = nodeY;
  return mouseX > yesX - 16 && mouseX < yesX + 16 &&
         mouseY > yesY - 9 && mouseY < yesY + 9;
}

function isHoveredNo(nodeX, nodeY, nodeId) {
  let noX, noY;
  if (nodeId === 1) {
    noX = nodeX;
    noY = nodeY + 45;
  } else {
    noX = nodeX + 45;
    noY = nodeY;
  }
  return mouseX > noX - 16 && mouseX < noX + 16 &&
         mouseY > noY - 9 && mouseY < noY + 9;
}

function mousePressed() {
  let currentNode = nodes.find(n => n.id === currentPath[currentPath.length - 1]);

  if (currentNode && currentNode.type === 'decision') {
    let x = currentNode.x * canvasWidth;
    let y = currentNode.y * drawHeight + 30;

    // Check Yes click
    if (isHoveredYes(x, y)) {
      currentPath.push(currentNode.yesNode);
      let nextNode = nodes.find(n => n.id === currentNode.yesNode);
      if (nextNode.type === 'library') {
        selectedLibrary = nextNode.id;
      }
      return;
    }

    // Check No click
    if (isHoveredNo(x, y, currentNode.id)) {
      currentPath.push(currentNode.noNode);
      let nextNode = nodes.find(n => n.id === currentNode.noNode);
      if (nextNode.type === 'library') {
        selectedLibrary = nextNode.id;
      }
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

  // Click on library node to select it
  for (let node of nodes) {
    if (node.type === 'library' && isMouseOverNode(node)) {
      selectedLibrary = node.id;
      // Build path to this library
      rebuildPathToNode(node.id);
      break;
    }
  }
}

function rebuildPathToNode(targetId) {
  // Simple BFS to find path
  let visited = new Set();
  let queue = [[0]];

  while (queue.length > 0) {
    let path = queue.shift();
    let nodeId = path[path.length - 1];

    if (nodeId === targetId) {
      currentPath = path;
      return;
    }

    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    let node = nodes.find(n => n.id === nodeId);
    if (node.type === 'start' && node.next) {
      for (let nextId of node.next) {
        queue.push([...path, nextId]);
      }
    } else if (node.type === 'decision') {
      queue.push([...path, node.yesNode]);
      queue.push([...path, node.noNode]);
    }
  }
}

function resetTree() {
  currentPath = [0];
  selectedLibrary = null;
  hoveredNode = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionButton();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    canvasHeight = drawHeight + controlHeight;
  }
}
