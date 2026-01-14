// MicroSim Readiness Assessment Decision Tree
// Interactive flowchart to evaluate if a learning objective is suitable for MicroSim development

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation state
let mouseOverCanvas = false;
let pulsePhase = 0;
let hoveredNode = null;
let selectedNode = null;

// Node dimensions
let nodeWidth = 140;
let nodeHeight = 60;
let decisionSize = 80;

// Color scheme
const colors = {
  start: '#1976D2',
  decision: '#FF9800',
  yes: '#4CAF50',
  no: '#F44336',
  ready: '#2E7D32',
  notReady: '#C62828',
  hover: '#FFF9C4',
  connector: '#666'
};

// Decision tree nodes
const nodes = {
  start: {
    id: 'start',
    type: 'start',
    label: 'Learning\nObjective',
    x: 0.5,
    y: 0.08,
    description: 'Start with a clearly defined learning objective that specifies what students should be able to do.'
  },
  interactivity: {
    id: 'interactivity',
    type: 'decision',
    label: 'Interactivity',
    question: 'Does it benefit from manipulation?',
    x: 0.5,
    y: 0.25,
    description: 'Consider if learners would benefit from directly manipulating variables, parameters, or objects to understand the concept.',
    examples: {
      yes: 'Adjusting spring constants to see oscillation changes',
      no: 'Memorizing historical dates'
    }
  },
  visualization: {
    id: 'visualization',
    type: 'decision',
    label: 'Visualization',
    question: 'Can concepts be visualized?',
    x: 0.25,
    y: 0.45,
    description: 'Determine if the concept can be represented visually through animations, graphs, diagrams, or spatial relationships.',
    examples: {
      yes: 'Showing how light refracts through a prism',
      no: 'Understanding grammar rules'
    }
  },
  feedback: {
    id: 'feedback',
    type: 'decision',
    label: 'Feedback',
    question: 'Would immediate feedback help?',
    x: 0.5,
    y: 0.45,
    description: 'Assess whether instant feedback on actions would accelerate learning and help students correct misconceptions.',
    examples: {
      yes: 'Seeing results of code changes instantly',
      no: 'Learning to write creative essays'
    }
  },
  scope: {
    id: 'scope',
    type: 'decision',
    label: 'Scope',
    question: 'Is it focused on a single concept?',
    x: 0.75,
    y: 0.45,
    description: 'Check if the objective targets one specific concept that can be explored in depth without overwhelming complexity.',
    examples: {
      yes: 'Understanding how gravity affects projectile motion',
      no: 'Learning entire calculus curriculum'
    }
  },
  ready: {
    id: 'ready',
    type: 'result',
    result: 'ready',
    label: 'Ready for\nMicroSim',
    x: 0.35,
    y: 0.78,
    description: 'This learning objective is well-suited for MicroSim development. It will benefit from interactivity, visualization, and immediate feedback.'
  },
  notReady: {
    id: 'notReady',
    type: 'result',
    result: 'notReady',
    label: 'Consider Other\nFormats',
    x: 0.75,
    y: 0.78,
    description: 'This learning objective may be better served by other formats such as reading materials, discussions, or traditional exercises.'
  }
};

// Connections between nodes
const connections = [
  { from: 'start', to: 'interactivity', label: '' },
  { from: 'interactivity', to: 'visualization', label: 'Yes', type: 'yes' },
  { from: 'interactivity', to: 'notReady', label: 'No', type: 'no' },
  { from: 'visualization', to: 'ready', label: 'Yes', type: 'yes' },
  { from: 'visualization', to: 'feedback', label: 'No', type: 'no' },
  { from: 'feedback', to: 'ready', label: 'Yes', type: 'yes' },
  { from: 'feedback', to: 'scope', label: 'No', type: 'no' },
  { from: 'scope', to: 'ready', label: 'Yes', type: 'yes' },
  { from: 'scope', to: 'notReady', label: 'No', type: 'no' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Interactive decision tree flowchart to assess if a learning objective is suitable for MicroSim development. Four evaluation branches: Interactivity, Visualization, Feedback, and Scope.', LABEL);
}

function draw() {
  updateCanvasSize();

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
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("MicroSim Readiness Assessment", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw connections first (behind nodes)
  drawConnections();

  // Draw nodes
  for (let key in nodes) {
    drawNode(nodes[key]);
  }

  // Draw info panel if node is selected
  if (selectedNode) {
    drawInfoPanel(selectedNode);
  }

  // Instructions
  fill('#666');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Hover over nodes for details. Click to see examples.", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawConnections() {
  for (let conn of connections) {
    let fromNode = nodes[conn.from];
    let toNode = nodes[conn.to];

    let x1 = fromNode.x * canvasWidth;
    let y1 = fromNode.y * drawHeight + getNodeHeight(fromNode) / 2;
    let x2 = toNode.x * canvasWidth;
    let y2 = toNode.y * drawHeight - getNodeHeight(toNode) / 2;

    // Adjust start point for decision nodes
    if (fromNode.type === 'decision') {
      if (conn.type === 'yes') {
        x1 -= decisionSize / 2 * 0.7;
        y1 = fromNode.y * drawHeight;
      } else if (conn.type === 'no') {
        x1 += decisionSize / 2 * 0.7;
        y1 = fromNode.y * drawHeight;
      }
    }

    // Line color based on type
    if (conn.type === 'yes') {
      stroke(colors.yes);
    } else if (conn.type === 'no') {
      stroke(colors.no);
    } else {
      stroke(colors.connector);
    }
    strokeWeight(2);
    noFill();

    // Draw curved line
    let midY = (y1 + y2) / 2;
    beginShape();
    vertex(x1, y1);
    bezierVertex(x1, midY, x2, midY, x2, y2);
    endShape();

    // Draw arrowhead
    drawArrowhead(x2, y2, conn.type);

    // Draw label
    if (conn.label) {
      let labelX = (x1 + x2) / 2;
      let labelY = midY - 10;

      fill(conn.type === 'yes' ? colors.yes : colors.no);
      noStroke();
      textSize(12);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(conn.label, labelX, labelY);
      textStyle(NORMAL);
    }
  }
}

function drawArrowhead(x, y, type) {
  fill(type === 'yes' ? colors.yes : (type === 'no' ? colors.no : colors.connector));
  noStroke();
  triangle(x, y, x - 6, y - 10, x + 6, y - 10);
}

function getNodeHeight(node) {
  if (node.type === 'decision') return decisionSize;
  return nodeHeight;
}

function drawNode(node) {
  let x = node.x * canvasWidth;
  let y = node.y * drawHeight;
  let isHovered = hoveredNode === node.id;
  let isSelected = selectedNode === node.id;

  push();
  translate(x, y);

  if (node.type === 'start') {
    // Rounded rectangle for start
    if (isHovered || isSelected) {
      fill(colors.hover);
      stroke(colors.start);
    } else {
      fill(colors.start);
      noStroke();
    }
    strokeWeight(3);
    rectMode(CENTER);
    rect(0, 0, nodeWidth, nodeHeight, 10);

    fill(isHovered || isSelected ? colors.start : 'white');
    textSize(14);
    textAlign(CENTER, CENTER);
    text(node.label, 0, 0);

  } else if (node.type === 'decision') {
    // Diamond for decision
    if (isHovered || isSelected) {
      fill(colors.hover);
      stroke(colors.decision);
    } else {
      fill(colors.decision);
      noStroke();
    }
    strokeWeight(3);

    let s = decisionSize / 2;
    beginShape();
    vertex(0, -s);
    vertex(s, 0);
    vertex(0, s);
    vertex(-s, 0);
    endShape(CLOSE);

    fill(isHovered || isSelected ? colors.decision : 'white');
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(node.label, 0, 0);
    textStyle(NORMAL);

  } else if (node.type === 'result') {
    // Rounded rectangle for results
    let resultColor = node.result === 'ready' ? colors.ready : colors.notReady;

    if (isHovered || isSelected) {
      fill(colors.hover);
      stroke(resultColor);
    } else {
      fill(resultColor);
      noStroke();
    }
    strokeWeight(3);
    rectMode(CENTER);
    rect(0, 0, nodeWidth + 20, nodeHeight + 10, 20);

    fill(isHovered || isSelected ? resultColor : 'white');
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(node.label, 0, 0);
    textStyle(NORMAL);
  }

  pop();
}

function drawInfoPanel(nodeId) {
  let node = nodes[nodeId];
  let panelWidth = 260;
  let panelHeight = node.examples ? 160 : 100;
  let panelX = margin;
  let panelY = drawHeight - panelHeight - 20;

  // Semi-transparent background
  fill(255, 255, 255, 240);
  stroke('#333');
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Title bar
  let titleColor = colors.start;
  if (node.type === 'decision') titleColor = colors.decision;
  else if (node.result === 'ready') titleColor = colors.ready;
  else if (node.result === 'notReady') titleColor = colors.notReady;

  fill(titleColor);
  noStroke();
  rect(panelX, panelY, panelWidth, 28, 10, 10, 0, 0);

  fill('white');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(node.label.replace('\n', ' '), panelX + 15, panelY + 14);
  textStyle(NORMAL);

  // Description
  fill('#333');
  textSize(11);
  textAlign(LEFT, TOP);
  text(node.description, panelX + 10, panelY + 38, panelWidth - 20, 50);

  // Examples if available
  if (node.examples) {
    let exY = panelY + 95;

    fill(colors.yes);
    textSize(10);
    text("Yes:", panelX + 10, exY);
    fill('#333');
    text(node.examples.yes, panelX + 35, exY, panelWidth - 45, 30);

    fill(colors.no);
    text("No:", panelX + 10, exY + 30);
    fill('#333');
    text(node.examples.no, panelX + 35, exY + 30, panelWidth - 45, 30);
  }
}

function mousePressed() {
  let clickedNode = getNodeAtMouse();
  if (clickedNode) {
    selectedNode = (selectedNode === clickedNode) ? null : clickedNode;
  } else {
    selectedNode = null;
  }
}

function mouseMoved() {
  hoveredNode = getNodeAtMouse();
}

function getNodeAtMouse() {
  for (let key in nodes) {
    let node = nodes[key];
    let x = node.x * canvasWidth;
    let y = node.y * drawHeight;
    let w, h;

    if (node.type === 'decision') {
      // Diamond hit detection
      let s = decisionSize / 2;
      let dx = abs(mouseX - x);
      let dy = abs(mouseY - y);
      if (dx / s + dy / s <= 1) {
        return key;
      }
    } else {
      // Rectangle hit detection
      w = node.type === 'result' ? nodeWidth + 20 : nodeWidth;
      h = node.type === 'result' ? nodeHeight + 10 : nodeHeight;

      if (mouseX >= x - w/2 && mouseX <= x + w/2 &&
          mouseY >= y - h/2 && mouseY <= y + h/2) {
        return key;
      }
    }
  }
  return null;
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
