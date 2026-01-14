// AI Generation Workflow MicroSim
// Interactive flowchart showing the end-to-end process from learning objective to working MicroSim

let canvasWidth = 800;
let canvasHeight = 620;
let drawHeight = 550;
let controlHeight = 70;

// Color scheme for task types
const HUMAN_COLOR = '#2196f3';      // Blue - Human tasks
const AI_COLOR = '#4caf50';          // Green - AI tasks
const QUALITY_COLOR = '#ffc107';     // Yellow - Quality gates

// Node data
let nodes = [];
let hoveredNode = -1;
let selectedNode = -1;

// Step definitions
const stepData = [
  {
    id: 1,
    type: "start",
    label: "Learning\nObjective\nDefined",
    taskType: "human",
    col: 1,
    row: 0,
    desc: "Begin with a clear learning objective that states what the student should understand or be able to do. This is the foundation that drives all subsequent design decisions.",
    time: "5-10 min",
    tips: "Use action verbs from Bloom's Taxonomy. Be specific about observable outcomes."
  },
  {
    id: 2,
    type: "process",
    label: "Analyze\nPrerequisites",
    taskType: "human",
    col: 2,
    row: 0,
    desc: "Identify what concepts students must already understand before engaging with this MicroSim. This ensures appropriate scaffolding and prevents cognitive overload.",
    time: "10-15 min",
    tips: "Check the learning graph for prerequisite concepts. Consider prior knowledge assumptions."
  },
  {
    id: 3,
    type: "process",
    label: "Select\nVisualization\nType",
    taskType: "human",
    col: 3,
    row: 0,
    desc: "Choose the visualization paradigm that best represents the concept: simulation, diagram, interactive chart, network graph, timeline, or spatial display.",
    time: "5-10 min",
    tips: "Match the visualization to the concept structure. Processes need timelines; relationships need networks."
  },
  {
    id: 4,
    type: "process",
    label: "Choose\nJavaScript\nLibrary",
    taskType: "human",
    col: 4,
    row: 0,
    desc: "Select the most appropriate JavaScript library: p5.js for animations, vis-network for graphs, Chart.js for data, Mermaid for diagrams, Leaflet for maps.",
    time: "5 min",
    tips: "p5.js is versatile for most interactive simulations. Use specialized libraries for specific needs."
  },
  {
    id: 5,
    type: "process",
    label: "Write\nSpecification",
    taskType: "human",
    col: 5,
    row: 0,
    desc: "Create a detailed specification including visual layout, interactions, parameters, colors, labels, and educational scaffolding. This guides AI code generation.",
    time: "15-30 min",
    tips: "Be explicit about dimensions, colors, and behavior. Include edge cases and error handling."
  },
  {
    id: 6,
    type: "process",
    label: "AI Generates\nCode",
    taskType: "ai",
    col: 5,
    row: 1,
    desc: "The AI (Claude) interprets the specification and generates complete code including HTML, JavaScript, CSS, and documentation files.",
    time: "1-3 min",
    tips: "Clear specifications produce better code. Provide examples when describing complex interactions."
  },
  {
    id: 7,
    type: "decision",
    label: "Code\nWorks?",
    taskType: "quality",
    col: 4,
    row: 1,
    desc: "Test the generated code in the browser. Check if it runs without errors, displays correctly, and responds to interactions as expected.",
    time: "5-10 min",
    tips: "Test in multiple browsers. Check console for errors. Verify responsive behavior."
  },
  {
    id: 8,
    type: "process",
    label: "Iterate\nwith AI",
    taskType: "ai",
    col: 3,
    row: 1,
    desc: "Provide specific feedback about what isn't working. The AI refines the code based on error messages, visual issues, or behavioral problems.",
    time: "2-5 min",
    tips: "Be specific about issues. Include error messages. Describe expected vs actual behavior."
  },
  {
    id: 9,
    type: "process",
    label: "Test &\nValidate",
    taskType: "human",
    col: 3,
    row: 2,
    desc: "Thoroughly test all interactions, edge cases, and responsive behavior. Verify that the MicroSim achieves the learning objective.",
    time: "10-15 min",
    tips: "Test with learners if possible. Check accessibility. Verify educational effectiveness."
  },
  {
    id: 10,
    type: "decision",
    label: "Meets\nStandards?",
    taskType: "quality",
    col: 4,
    row: 2,
    desc: "Evaluate against quality standards: Does it achieve the learning objective? Is it accessible? Does it follow design guidelines?",
    time: "5-10 min",
    tips: "Use the quality checklist. Consider cognitive load. Ensure labels are clear."
  },
  {
    id: 11,
    type: "process",
    label: "Refine\nSpecification",
    taskType: "human",
    col: 5,
    row: 2,
    desc: "Update the specification to address quality issues. This may involve redesigning interactions, adjusting difficulty, or improving clarity.",
    time: "10-20 min",
    tips: "Focus on the learning objective. Simplify where possible. Add scaffolding if needed."
  },
  {
    id: 12,
    type: "process",
    label: "Add\nMetadata",
    taskType: "human",
    col: 2,
    row: 2,
    desc: "Add metadata including learning objectives, Bloom's level, concept tags, prerequisites, and accessibility information.",
    time: "5-10 min",
    tips: "Accurate metadata improves discoverability and helps with curriculum alignment."
  },
  {
    id: 13,
    type: "process",
    label: "Deploy",
    taskType: "ai",
    col: 1,
    row: 2,
    desc: "Commit files to the repository and deploy using mkdocs gh-deploy. The MicroSim becomes available on the published site.",
    time: "2-5 min",
    tips: "Verify deployment succeeded. Check the live URL. Test in production environment."
  },
  {
    id: 14,
    type: "end",
    label: "MicroSim\nLive",
    taskType: "quality",
    col: 0,
    row: 2,
    desc: "The MicroSim is now live and available to learners. Monitor usage and gather feedback for future improvements.",
    time: "Ongoing",
    tips: "Track usage analytics. Collect learner feedback. Plan iterations based on data."
  }
];

// Connections between nodes (from, to, label, type)
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8, label: "No" },
  { from: 7, to: 9, label: "Yes" },
  { from: 8, to: 6 },
  { from: 9, to: 10 },
  { from: 10, to: 11, label: "No" },
  { from: 10, to: 12, label: "Yes" },
  { from: 11, to: 5 },
  { from: 12, to: 13 },
  { from: 13, to: 14 }
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

  const colWidth = (canvasWidth - 60) / 6;
  const rowHeight = (drawHeight - 100) / 3;
  const startX = 50;
  const startY = 80;

  for (let step of stepData) {
    const x = startX + step.col * colWidth + colWidth / 2;
    const y = startY + step.row * rowHeight + rowHeight / 2;

    nodes.push({
      ...step,
      x: x,
      y: y,
      width: 85,
      height: 60
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
  text("AI-Assisted MicroSim Generation Workflow", canvasWidth / 2, 25);

  // Draw subtitle
  textSize(12);
  textStyle(NORMAL);
  fill(100, 116, 139);
  text("From Learning Objective to Working MicroSim", canvasWidth / 2, 48);

  // Draw connections first (behind nodes)
  drawConnections();

  // Draw nodes
  for (let i = 0; i < nodes.length; i++) {
    drawNode(nodes[i], i === hoveredNode, i === selectedNode);
  }

  // Draw legend
  drawLegend();

  // Draw description panel if node is selected or hovered
  if (selectedNode >= 0) {
    drawDescriptionPanel(nodes[selectedNode]);
  } else if (hoveredNode >= 0) {
    drawDescriptionPanel(nodes[hoveredNode]);
  } else {
    drawInstructionsPanel();
  }
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

    stroke(isHighlighted ? color(70, 70, 70) : color(160, 160, 160));
    strokeWeight(isHighlighted ? 2.5 : 1.5);
    noFill();

    // Calculate connection points based on relative positions
    let startX, startY, endX, endY;

    // Determine direction
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;

    // For feedback loops (going back up)
    if (conn.from === 8 && conn.to === 6) {
      // Iterate with AI back to AI Generates Code
      startX = fromNode.x;
      startY = fromNode.y - fromNode.height / 2;
      endX = toNode.x;
      endY = toNode.y + toNode.height / 2;

      const midY = (startY + endY) / 2 - 20;
      beginShape();
      vertex(startX, startY);
      bezierVertex(startX, midY, endX, midY, endX, endY);
      endShape();
      drawArrowhead(endX, endY, HALF_PI, isHighlighted);
    }
    else if (conn.from === 11 && conn.to === 5) {
      // Refine Specification back to Write Specification
      startX = fromNode.x;
      startY = fromNode.y - fromNode.height / 2;
      endX = toNode.x;
      endY = toNode.y + toNode.height / 2;

      const midY = startY - 40;
      beginShape();
      vertex(startX, startY);
      bezierVertex(startX, midY, endX, midY, endX, endY);
      endShape();
      drawArrowhead(endX, endY, HALF_PI, isHighlighted);
    }
    // Decision node outputs
    else if (fromNode.type === "decision") {
      if (conn.label === "Yes") {
        // Yes path - typically continues flow
        if (Math.abs(dy) > Math.abs(dx)) {
          // Vertical movement
          startX = fromNode.x;
          startY = fromNode.y + fromNode.height / 2 + 5;
          endX = toNode.x;
          endY = toNode.y - toNode.height / 2;

          if (Math.abs(dx) > 10) {
            const midY = (startY + endY) / 2;
            line(startX, startY, startX, midY);
            line(startX, midY, endX, midY);
            line(endX, midY, endX, endY);
          } else {
            line(startX, startY, endX, endY);
          }
          drawArrowhead(endX, endY, HALF_PI, isHighlighted);
        } else {
          // Horizontal movement
          startX = fromNode.x - fromNode.width / 2 - 5;
          startY = fromNode.y;
          endX = toNode.x + toNode.width / 2;
          endY = toNode.y;

          line(startX, startY, endX, endY);
          drawArrowhead(endX, endY, PI, isHighlighted);
        }
      } else {
        // No path
        startX = fromNode.x - fromNode.width / 2 - 5;
        startY = fromNode.y;
        endX = toNode.x + toNode.width / 2;
        endY = toNode.y;

        if (Math.abs(dy) > 10) {
          const midX = startX - 20;
          line(startX, startY, midX, startY);
          line(midX, startY, midX, endY);
          line(midX, endY, endX, endY);
        } else {
          line(startX, startY, endX, endY);
        }
        drawArrowhead(endX, endY, PI, isHighlighted);
      }

      // Draw label for decision paths
      if (conn.label) {
        noStroke();
        fill(isHighlighted ? color(70) : color(120));
        textSize(10);
        textStyle(BOLD);
        if (conn.label === "Yes") {
          if (Math.abs(dy) > Math.abs(dx)) {
            text(conn.label, startX + 12, startY + 15);
          } else {
            text(conn.label, startX - 15, startY - 10);
          }
        } else {
          text(conn.label, startX - 15, startY + 10);
        }
      }
    }
    // Regular horizontal flow (left to right in same row)
    else if (Math.abs(dy) < 20 && dx > 0) {
      startX = fromNode.x + fromNode.width / 2;
      startY = fromNode.y;
      endX = toNode.x - toNode.width / 2;
      endY = toNode.y;

      line(startX, startY, endX, endY);
      drawArrowhead(endX, endY, 0, isHighlighted);
    }
    // Downward flow
    else if (dy > 0) {
      startX = fromNode.x;
      startY = fromNode.y + fromNode.height / 2;
      endX = toNode.x;
      endY = toNode.y - toNode.height / 2;

      if (Math.abs(dx) > 20) {
        const midY = (startY + endY) / 2;
        line(startX, startY, startX, midY);
        line(startX, midY, endX, midY);
        line(endX, midY, endX, endY);
      } else {
        line(startX, startY, endX, endY);
      }
      drawArrowhead(endX, endY, HALF_PI, isHighlighted);
    }
    // Leftward flow (same row or going back)
    else if (dx < 0) {
      startX = fromNode.x - fromNode.width / 2;
      startY = fromNode.y;
      endX = toNode.x + toNode.width / 2;
      endY = toNode.y;

      if (Math.abs(dy) > 20) {
        const midX = (startX + endX) / 2;
        line(startX, startY, midX, startY);
        line(midX, startY, midX, endY);
        line(midX, endY, endX, endY);
      } else {
        line(startX, startY, endX, endY);
      }
      drawArrowhead(endX, endY, PI, isHighlighted);
    }
    // Upward flow
    else {
      startX = fromNode.x;
      startY = fromNode.y - fromNode.height / 2;
      endX = toNode.x;
      endY = toNode.y + toNode.height / 2;

      line(startX, startY, endX, endY);
      drawArrowhead(endX, endY, -HALF_PI, isHighlighted);
    }
  }
}

function drawArrowhead(x, y, angle, isHighlighted) {
  push();
  translate(x, y);
  rotate(angle);
  fill(isHighlighted ? color(70) : color(160));
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function getTaskColor(taskType) {
  switch (taskType) {
    case 'human': return HUMAN_COLOR;
    case 'ai': return AI_COLOR;
    case 'quality': return QUALITY_COLOR;
    default: return '#888888';
  }
}

function drawNode(node, isHovered, isSelected) {
  const col = getTaskColor(node.taskType);
  const nodeWidth = isHovered || isSelected ? node.width + 6 : node.width;
  const nodeHeight = isHovered || isSelected ? node.height + 6 : node.height;

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(hexToRgb(col, 40));
      if (node.type === "decision") {
        drawDiamond(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10);
      } else if (node.type === "start" || node.type === "end") {
        ellipse(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10);
      } else {
        rectMode(CENTER);
        rect(node.x, node.y, nodeWidth + i * 10, nodeHeight + i * 10, 10);
      }
    }
  }

  // Node shadow
  noStroke();
  fill(0, 20);
  if (node.type === "decision") {
    drawDiamond(node.x + 2, node.y + 2, nodeWidth, nodeHeight);
  } else if (node.type === "start" || node.type === "end") {
    ellipse(node.x + 2, node.y + 2, nodeWidth, nodeHeight);
  } else {
    rectMode(CENTER);
    rect(node.x + 2, node.y + 2, nodeWidth, nodeHeight, 8);
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
    strokeWeight(3);
    ellipse(node.x, node.y, nodeWidth - 10, nodeHeight - 10);
  } else if (node.type === "decision") {
    drawDiamond(node.x, node.y, nodeWidth, nodeHeight);
  } else {
    rectMode(CENTER);
    rect(node.x, node.y, nodeWidth, nodeHeight, 8);
  }

  // Node label
  fill(node.taskType === 'quality' ? 30 : 255);
  noStroke();
  textSize(10);
  textStyle(BOLD);

  // Split label into lines
  const lines = node.label.split('\n');
  const lineHeight = 12;
  const labelStartY = node.y - (lines.length - 1) * lineHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], node.x, labelStartY + i * lineHeight);
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
  const panelHeight = 60;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2;

  // Background
  fill(255, 252);
  stroke(getTaskColor(node.taskType));
  strokeWeight(2);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Step number and description
  fill(30, 41, 59);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);

  const textX = panelX - panelWidth / 2 + 15;
  const textY = panelY - panelHeight / 2 + 8;

  // Title with time estimate
  text(`Step ${node.id}: ${node.label.replace(/\n/g, ' ')}`, textX, textY);

  // Time badge
  const timeText = `Est: ${node.time}`;
  textSize(9);
  fill(100, 116, 139);
  textStyle(NORMAL);
  text(timeText, textX + panelWidth - 100, textY);

  // Description
  textSize(10);
  textStyle(NORMAL);
  fill(51, 65, 85);
  text(node.desc, textX, textY + 16, panelWidth - 30, 25);

  // Tip
  textSize(9);
  fill(getTaskColor(node.taskType));
  textStyle(ITALIC);
  text(`Tip: ${node.tips}`, textX, textY + 38, panelWidth - 30, 15);

  textAlign(CENTER, CENTER);
  rectMode(CORNER);
}

function drawInstructionsPanel() {
  const panelWidth = min(canvasWidth - 40, 500);
  const panelHeight = 50;
  const panelX = canvasWidth / 2;
  const panelY = drawHeight + controlHeight / 2;

  // Background
  fill(248, 250, 252, 250);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Instructions
  fill(100, 116, 139);
  noStroke();
  textSize(12);
  textStyle(NORMAL);
  text("Click or hover over any step to see details, tips, and time estimates", panelX, panelY);

  rectMode(CORNER);
}

function drawLegend() {
  const legendY = 65;
  const legendX = canvasWidth - 280;
  const spacing = 90;

  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);

  // Human tasks
  fill(HUMAN_COLOR);
  noStroke();
  rectMode(CENTER);
  rect(legendX, legendY, 16, 12, 3);
  fill(60);
  text("Human Tasks", legendX + 14, legendY);

  // AI tasks
  fill(AI_COLOR);
  rect(legendX + spacing, legendY, 16, 12, 3);
  fill(60);
  text("AI Tasks", legendX + spacing + 14, legendY);

  // Quality gates
  fill(QUALITY_COLOR);
  push();
  translate(legendX + spacing * 2, legendY);
  beginShape();
  vertex(0, -7);
  vertex(9, 0);
  vertex(0, 7);
  vertex(-9, 0);
  endShape(CLOSE);
  pop();
  fill(60);
  text("Quality Gates", legendX + spacing * 2 + 14, legendY);

  rectMode(CORNER);
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
  const hitPadding = 8;

  if (node.type === "decision") {
    // Diamond hit test
    const dx = abs(mx - node.x);
    const dy = abs(my - node.y);
    return (dx / (node.width / 2 + hitPadding) + dy / (node.height / 2 + hitPadding)) <= 1;
  } else if (node.type === "start" || node.type === "end") {
    // Ellipse hit test
    return dist(mx, my, node.x, node.y) < node.width / 2 + hitPadding;
  } else {
    // Rectangle hit test
    return mx > node.x - node.width / 2 - hitPadding &&
           mx < node.x + node.width / 2 + hitPadding &&
           my > node.y - node.height / 2 - hitPadding &&
           my < node.y + node.height / 2 + hitPadding;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateNodePositions();
}
