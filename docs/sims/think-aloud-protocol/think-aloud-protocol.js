// Think-Aloud Protocol Flowchart
// Interactive flowchart showing the phases and decision points of the think-aloud protocol
// for gathering qualitative feedback on MicroSim usability

let canvasWidth = 800;
let canvasHeight = 550;
let drawHeight = 500;
let controlHeight = 50;

// Phase colors
const PREP_COLOR = '#2196f3';      // Blue - Preparation steps
const ACTIVE_COLOR = '#4caf50';    // Green - Active testing
const DECISION_COLOR = '#ffc107';  // Yellow - Decision points
const ANALYSIS_COLOR = '#9c27b0';  // Purple - Analysis steps

// Node data
let nodes = [];
let hoveredNode = -1;
let selectedNode = -1;

// Step definitions
const stepData = [
  {
    id: 1,
    type: "start",
    label: "Prepare Testing\nSession",
    phase: "prep",
    row: 0,
    col: 0,
    desc: "Set up recording equipment (screen capture, audio/video), prepare consent forms, and organize testing materials. Ensure the testing environment is quiet and free from distractions."
  },
  {
    id: 2,
    type: "process",
    label: "Brief\nParticipant",
    phase: "prep",
    row: 0,
    col: 1,
    desc: "Explain the think-aloud method to the participant. Reassure them that the MicroSim is being tested, not their abilities. Encourage them to verbalize all thoughts, questions, and frustrations."
  },
  {
    id: 3,
    type: "process",
    label: "Begin\nRecording",
    phase: "active",
    row: 0,
    col: 2,
    desc: "Start all recording devices (screen capture, audio/video). Note the start time and confirm all equipment is functioning. Have the participant begin using the MicroSim."
  },
  {
    id: 4,
    type: "process",
    label: "Participant\nUses MicroSim",
    phase: "active",
    row: 1,
    col: 2,
    desc: "Observe silently while the participant interacts with the MicroSim. Take notes on behaviors, hesitations, facial expressions, and verbalizations. Avoid interrupting unless absolutely necessary."
  },
  {
    id: 5,
    type: "decision",
    label: "Participant\nStuck?",
    phase: "decision",
    row: 1,
    col: 1,
    desc: "Assess whether the participant is making no progress. Signs include: prolonged silence, repeated failed attempts at the same action, or explicit statements of confusion."
  },
  {
    id: 6,
    type: "process",
    label: "Provide\nMinimal Hint",
    phase: "active",
    row: 2,
    col: 0,
    desc: "Give the smallest possible nudge to help the participant proceed. Use neutral prompts like 'What are you thinking?' or 'What would you try next?' Avoid revealing the solution."
  },
  {
    id: 7,
    type: "process",
    label: "Continue\nObserving",
    phase: "active",
    row: 2,
    col: 2,
    desc: "Let the participant work through challenges on their own. Natural struggles reveal usability issues. Note how they recover from confusion and what strategies they use."
  },
  {
    id: 8,
    type: "decision",
    label: "Task\nComplete?",
    phase: "decision",
    row: 3,
    col: 1,
    desc: "Determine if the participant has finished the intended task or has given up. Consider both successful completion and abandonment as valid end points to analyze."
  },
  {
    id: 9,
    type: "process",
    label: "Conduct\nDebrief",
    phase: "analysis",
    row: 3,
    col: 2,
    desc: "Ask follow-up questions about their experience. Explore moments of confusion, what they found intuitive, and suggestions for improvement. Stop recording."
  },
  {
    id: 10,
    type: "process",
    label: "Analyze\nRecording",
    phase: "analysis",
    row: 4,
    col: 1,
    desc: "Review the footage systematically. Code behaviors into categories (confusion, discovery, error recovery). Timestamp key moments and quote significant verbalizations."
  },
  {
    id: 11,
    type: "end",
    label: "Document\nInsights",
    phase: "analysis",
    row: 4,
    col: 2,
    desc: "Write up findings in a structured report. Include usability issues found, severity ratings, participant quotes, and specific recommendations for MicroSim improvements."
  }
];

// Connections between nodes
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6, label: "Yes" },
  { from: 5, to: 7, label: "No" },
  { from: 6, to: 4 },
  { from: 7, to: 8 },
  { from: 8, to: 4, label: "No" },
  { from: 8, to: 9, label: "Yes" },
  { from: 9, to: 10 },
  { from: 10, to: 11 }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  } else {
    canvasWidth = min(windowWidth - 20, 900);
  }
  canvasWidth = max(canvasWidth, 600);
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

  const marginX = 100;
  const marginY = 60;
  const colWidth = (canvasWidth - marginX * 2) / 3;
  const rowHeight = (drawHeight - marginY * 2) / 5;

  for (let step of stepData) {
    const x = marginX + step.col * colWidth + colWidth / 2;
    const y = marginY + step.row * rowHeight + rowHeight / 2;

    nodes.push({
      ...step,
      x: x,
      y: y,
      width: 90,
      height: 55
    });
  }
}

function draw() {
  background(248, 250, 252);

  // Draw title
  fill(30, 41, 59);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Think-Aloud Protocol for MicroSim Usability Testing", canvasWidth / 2, 25);

  // Draw connections first (behind nodes)
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
    drawInstructions();
  }

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

    stroke(isHighlighted ? color(80, 80, 80) : color(150));
    strokeWeight(isHighlighted ? 2.5 : 2);
    noFill();

    // Calculate edge positions
    let startX, startY, endX, endY;

    // Determine connection direction
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;

    // Get exit and entry points based on direction
    if (abs(dx) > abs(dy)) {
      // Horizontal connection
      if (dx > 0) {
        startX = fromNode.x + fromNode.width / 2;
        endX = toNode.x - toNode.width / 2;
      } else {
        startX = fromNode.x - fromNode.width / 2;
        endX = toNode.x + toNode.width / 2;
      }
      startY = fromNode.y;
      endY = toNode.y;
    } else {
      // Vertical connection
      if (dy > 0) {
        startY = fromNode.y + fromNode.height / 2;
        endY = toNode.y - toNode.height / 2;
      } else {
        startY = fromNode.y - fromNode.height / 2;
        endY = toNode.y + toNode.height / 2;
      }
      startX = fromNode.x;
      endX = toNode.x;
    }

    // Adjust for decision node shape
    if (fromNode.type === "decision") {
      // Exit from diamond points
      if (conn.label === "Yes" && conn.from === 5) {
        startX = fromNode.x - fromNode.width / 2 - 5;
        startY = fromNode.y;
      } else if (conn.label === "No" && conn.from === 5) {
        startX = fromNode.x + fromNode.width / 2 + 5;
        startY = fromNode.y;
      } else if (conn.label === "No" && conn.from === 8) {
        startX = fromNode.x - fromNode.width / 2 - 5;
        startY = fromNode.y;
      } else if (conn.label === "Yes" && conn.from === 8) {
        startX = fromNode.x + fromNode.width / 2 + 5;
        startY = fromNode.y;
      }
    }

    if (toNode.type === "decision") {
      // Entry to diamond
      if (abs(dx) > abs(dy)) {
        if (dx > 0) {
          endX = toNode.x - toNode.width / 2 - 5;
        } else {
          endX = toNode.x + toNode.width / 2 + 5;
        }
        endY = toNode.y;
      } else {
        endX = toNode.x;
        if (dy > 0) {
          endY = toNode.y - toNode.height / 2 - 5;
        } else {
          endY = toNode.y + toNode.height / 2 + 5;
        }
      }
    }

    // Special routing for specific connections
    if (conn.from === 6 && conn.to === 4) {
      // Loop back from hint to observe
      const midX = fromNode.x - 60;
      beginShape();
      vertex(fromNode.x, fromNode.y - fromNode.height / 2);
      vertex(fromNode.x, fromNode.y - fromNode.height / 2 - 20);
      vertex(midX, fromNode.y - fromNode.height / 2 - 20);
      vertex(midX, toNode.y);
      vertex(toNode.x - toNode.width / 2, toNode.y);
      endShape();
      drawArrowhead(toNode.x - toNode.width / 2, toNode.y, 0, isHighlighted);
    } else if (conn.from === 8 && conn.to === 4) {
      // Loop back from task complete to observe
      const midY = (fromNode.y + toNode.y) / 2;
      beginShape();
      vertex(fromNode.x - fromNode.width / 2 - 5, fromNode.y);
      vertex(fromNode.x - fromNode.width / 2 - 40, fromNode.y);
      vertex(fromNode.x - fromNode.width / 2 - 40, toNode.y);
      vertex(toNode.x - toNode.width / 2, toNode.y);
      endShape();
      drawArrowhead(toNode.x - toNode.width / 2, toNode.y, 0, isHighlighted);

      // Label
      if (conn.label) {
        noStroke();
        fill(isHighlighted ? color(80) : color(120));
        textSize(10);
        textStyle(ITALIC);
        text(conn.label, fromNode.x - fromNode.width / 2 - 50, fromNode.y - 10);
      }
    } else if (startX !== endX && startY !== endY) {
      // Orthogonal routing for non-straight connections
      const midX = (startX + endX) / 2;
      beginShape();
      vertex(startX, startY);
      vertex(midX, startY);
      vertex(midX, endY);
      vertex(endX, endY);
      endShape();

      // Arrowhead at end
      if (endX > midX) {
        drawArrowhead(endX, endY, 0, isHighlighted);
      } else if (endX < midX) {
        drawArrowhead(endX, endY, PI, isHighlighted);
      } else if (endY > midX) {
        drawArrowhead(endX, endY, HALF_PI, isHighlighted);
      } else {
        drawArrowhead(endX, endY, -HALF_PI, isHighlighted);
      }

      // Label for decision branches
      if (conn.label && conn.from !== 8) {
        noStroke();
        fill(isHighlighted ? color(80) : color(120));
        textSize(10);
        textStyle(ITALIC);
        text(conn.label, (startX + midX) / 2, startY - 10);
      }
    } else {
      // Straight line
      line(startX, startY, endX, endY);

      // Arrowhead
      if (endX > startX) {
        drawArrowhead(endX, endY, 0, isHighlighted);
      } else if (endX < startX) {
        drawArrowhead(endX, endY, PI, isHighlighted);
      } else if (endY > startY) {
        drawArrowhead(endX, endY, HALF_PI, isHighlighted);
      } else {
        drawArrowhead(endX, endY, -HALF_PI, isHighlighted);
      }
    }
  }
}

function drawArrowhead(x, y, angle, isHighlighted) {
  push();
  translate(x, y);
  rotate(angle);
  fill(isHighlighted ? color(80) : color(150));
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function drawNode(node, isHovered, isSelected) {
  const col = getPhaseColor(node.phase);
  const nodeWidth = isHovered || isSelected ? node.width + 5 : node.width;
  const nodeHeight = isHovered || isSelected ? node.height + 5 : node.height;

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(hexToRgb(col, 40));
      if (node.type === "decision") {
        drawDiamond(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10);
      } else if (node.type === "start") {
        ellipse(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10);
      } else if (node.type === "end") {
        ellipse(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10);
      } else {
        rectMode(CENTER);
        rect(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10, 10);
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
    // Double ellipse for end
    ellipse(node.x, node.y, nodeWidth, nodeHeight);
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(node.x, node.y, nodeWidth - 10, nodeHeight - 10);
  } else if (node.type === "decision") {
    drawDiamond(node.x, node.y, nodeWidth + 15, nodeHeight + 15);
  } else {
    rectMode(CENTER);
    rect(node.x, node.y, nodeWidth, nodeHeight, 8);
  }

  // Node label
  fill(node.type === "decision" ? color(30, 41, 59) : color(255));
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

function drawDescriptionPanel(node) {
  const panelWidth = min(canvasWidth - 40, 600);
  const panelHeight = 45;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2;

  // Background
  fill(255, 250);
  stroke(getPhaseColor(node.phase));
  strokeWeight(2);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Step number and description text
  fill(30, 41, 59);
  noStroke();
  textSize(11);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);

  const maxWidth = panelWidth - 20;
  text(node.desc, panelX, panelY, maxWidth, panelHeight - 10);

  rectMode(CORNER);
}

function drawInstructions() {
  const panelWidth = min(canvasWidth - 40, 500);
  const panelHeight = 35;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2;

  // Background
  fill(240, 245);
  stroke(180);
  strokeWeight(1);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Instruction text
  fill(100);
  noStroke();
  textSize(12);
  textStyle(ITALIC);
  text("Hover or click on any step to see detailed instructions", panelX, panelY);

  rectMode(CORNER);
}

function drawLegend() {
  const legendY = 50;
  const legendX = canvasWidth - 180;

  textSize(10);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);

  // Phase legend header
  fill(60);
  textStyle(BOLD);
  text("Phase Colors:", legendX, legendY - 15);
  textStyle(NORMAL);

  const phases = [
    { name: "Preparation", color: PREP_COLOR },
    { name: "Active Testing", color: ACTIVE_COLOR },
    { name: "Decision Point", color: DECISION_COLOR },
    { name: "Analysis", color: ANALYSIS_COLOR }
  ];

  for (let i = 0; i < phases.length; i++) {
    const y = legendY + i * 18;

    // Color box
    fill(phases[i].color);
    stroke(255);
    strokeWeight(1);
    rectMode(CORNER);
    rect(legendX, y - 6, 14, 14, 3);

    // Label
    fill(60);
    noStroke();
    text(phases[i].name, legendX + 20, y + 1);
  }

  textAlign(CENTER, CENTER);
}

function getPhaseColor(phase) {
  const colors = {
    "prep": PREP_COLOR,
    "active": ACTIVE_COLOR,
    "decision": DECISION_COLOR,
    "analysis": ANALYSIS_COLOR
  };
  return colors[phase] || PREP_COLOR;
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
    return (dx / (node.width / 2 + 10) + dy / (node.height / 2 + 10)) <= 1;
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
