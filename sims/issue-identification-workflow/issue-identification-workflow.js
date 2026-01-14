// Issue Identification Workflow MicroSim
// Interactive decision tree with testing checkpoints for finding and categorizing issues in generated MicroSim code

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 700;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// State
let mouseOverCanvas = false;
let hoveredNode = -1;
let selectedNode = -1;
let checkpointStatus = {};  // Track completion status for each checkpoint

// Color coding based on severity levels
const colors = {
  blocker: '#DC2626',      // Red for Blocker checkpoints
  critical: '#EA580C',     // Orange for Critical checkpoints
  major: '#EAB308',        // Yellow for Major checkpoints
  minor: '#22C55E',        // Green for Minor/Enhancement checkpoints
  start: '#6366F1',        // Indigo for start/end
  complete: '#10B981',     // Green for completed
  inProgress: '#F59E0B',   // Amber for in progress
  pending: '#94A3B8',      // Gray for pending
  background: '#F8FAFC',
  text: '#1E293B',
  textLight: '#64748B',
  nodeText: '#FFFFFF',
  connector: '#94A3B8',
  connectorHighlight: '#475569'
};

// Checkpoint data with decision tree structure
const checkpoints = [
  {
    id: 'start',
    type: 'start',
    label: 'Generated\nCode Received',
    color: colors.start,
    x: 0.5,
    y: 0.04,
    description: 'Begin the systematic issue identification process for newly generated MicroSim code.'
  },
  {
    id: 'syntax',
    type: 'checkpoint',
    checkpointNum: 1,
    label: 'Syntax\nCheck',
    color: colors.blocker,
    x: 0.5,
    y: 0.12,
    severity: 'Blocker',
    action: 'Open in code editor, check for red underlines',
    decision: 'Syntax errors found?',
    yesAction: 'Log as Blocker, request fix immediately',
    noAction: 'Continue to next checkpoint',
    checklist: ['No red underlines in editor', 'No syntax highlighting errors', 'All brackets/braces matched']
  },
  {
    id: 'load',
    type: 'checkpoint',
    checkpointNum: 2,
    label: 'Load\nTest',
    color: colors.blocker,
    x: 0.5,
    y: 0.22,
    severity: 'Blocker/Critical',
    action: 'Open in browser',
    decision: 'Does it load without console errors?',
    yesAction: 'Continue to visual inspection',
    noAction: 'Examine console, log as Blocker/Critical',
    checklist: ['Page loads without errors', 'No console errors', 'Canvas/visualization appears']
  },
  {
    id: 'visual',
    type: 'checkpoint',
    checkpointNum: 3,
    label: 'Visual\nInspection',
    color: colors.major,
    x: 0.5,
    y: 0.32,
    severity: 'Major/Minor',
    action: 'Compare to specification mockup',
    decision: 'Visual issues found?',
    yesAction: 'Log as Major/Minor depending on severity',
    noAction: 'Continue regardless',
    checklist: ['Layout matches spec', 'Colors correct', 'Controls present', 'Labels readable']
  },
  {
    id: 'functional',
    type: 'checkpoint',
    checkpointNum: 4,
    label: 'Functional\nTesting',
    color: colors.critical,
    x: 0.5,
    y: 0.42,
    severity: 'Critical/Major',
    action: 'Test each control/interaction',
    decision: 'Functional issues found?',
    yesAction: 'Log issues as Critical/Major',
    noAction: 'Continue to edge cases',
    checklist: ['Default values correct', 'Range works properly', 'Updates visualization', 'Edge cases handled']
  },
  {
    id: 'edge',
    type: 'checkpoint',
    checkpointNum: 5,
    label: 'Edge Case\nTesting',
    color: colors.major,
    x: 0.5,
    y: 0.52,
    severity: 'Major',
    action: 'Try unusual inputs',
    decision: 'Edge case issues found?',
    yesAction: 'Log issues found',
    noAction: 'Continue to spec review',
    checklist: ['Minimum values work', 'Maximum values work', 'Rapid changes handled', 'Browser resize works']
  },
  {
    id: 'spec',
    type: 'checkpoint',
    checkpointNum: 6,
    label: 'Specification\nReview',
    color: colors.major,
    x: 0.5,
    y: 0.62,
    severity: 'Major/Minor',
    action: 'Compare to spec line by line',
    decision: 'Spec deviations found?',
    yesAction: 'Log deviations as appropriate severity',
    noAction: 'Continue to quality review',
    checklist: ['All specified features present', 'Behavior matches spec', 'Output format correct', 'Performance acceptable']
  },
  {
    id: 'quality',
    type: 'checkpoint',
    checkpointNum: 7,
    label: 'Quality\nReview',
    color: colors.minor,
    x: 0.5,
    y: 0.72,
    severity: 'Minor/Enhancement',
    action: 'Code review',
    decision: 'Quality issues found?',
    yesAction: 'Log as Minor/Enhancement',
    noAction: 'Complete workflow',
    checklist: ['Comments present', 'Code organized', 'Accessibility features', 'Best practices followed']
  },
  {
    id: 'end',
    type: 'end',
    label: 'Issue List\nComplete',
    color: colors.start,
    x: 0.5,
    y: 0.82,
    description: 'All checkpoints completed. Proceed to priority sorting and refinement prompt generation.'
  },
  {
    id: 'priority',
    type: 'summary',
    label: 'Priority\nSorting',
    color: colors.complete,
    x: 0.5,
    y: 0.92,
    description: 'Sort issues by severity: Blocker > Critical > Major > Minor > Enhancement. Generate refinement prompt.'
  }
];

// Node dimensions
const nodeWidth = 100;
const nodeHeight = 50;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  // Initialize checkpoint status
  for (let checkpoint of checkpoints) {
    if (checkpoint.type === 'checkpoint') {
      checkpointStatus[checkpoint.id] = 'pending';  // pending, inProgress, complete
    }
  }

  describe('Issue Identification Workflow decision tree with 7 testing checkpoints: Syntax Check, Load Test, Visual Inspection, Functional Testing, Edge Case Testing, Specification Review, and Quality Review. Click checkpoints to track progress through the workflow.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  background(colors.background);

  // Draw area
  fill(colors.background);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill(255);
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(colors.connector);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title
  fill(colors.text);
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Issue Identification Workflow', canvasWidth / 2, 6);
  textStyle(NORMAL);

  // Draw legend
  drawLegend();

  // Draw connectors first (behind nodes)
  drawConnectors();

  // Draw nodes
  for (let i = 0; i < checkpoints.length; i++) {
    drawNode(checkpoints[i], i === hoveredNode, i === selectedNode);
  }

  // Draw control area
  drawControlArea();

  // Draw description panel when node is selected
  if (selectedNode >= 0) {
    drawDescriptionPanel(checkpoints[selectedNode]);
  }
}

function drawLegend() {
  const legendX = 15;
  const legendY = 28;
  const boxSize = 12;
  const spacing = 90;

  textSize(9);
  textAlign(LEFT, CENTER);

  // Severity legend
  const severities = [
    { color: colors.blocker, label: 'Blocker' },
    { color: colors.critical, label: 'Critical' },
    { color: colors.major, label: 'Major' },
    { color: colors.minor, label: 'Minor' }
  ];

  for (let i = 0; i < severities.length; i++) {
    fill(severities[i].color);
    noStroke();
    rect(legendX + i * spacing, legendY, boxSize, boxSize, 2);
    fill(colors.text);
    text(severities[i].label, legendX + i * spacing + boxSize + 4, legendY + boxSize / 2);
  }
}

function drawConnectors() {
  const mainX = canvasWidth / 2;

  for (let i = 0; i < checkpoints.length - 1; i++) {
    const current = checkpoints[i];
    const next = checkpoints[i + 1];

    const y1 = current.y * drawHeight + nodeHeight / 2 + 3;
    const y2 = next.y * drawHeight - nodeHeight / 2 - 3;

    const isHighlighted = (hoveredNode === i || hoveredNode === i + 1 ||
                          selectedNode === i || selectedNode === i + 1);

    stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
    strokeWeight(isHighlighted ? 2.5 : 2);

    if (current.type === 'checkpoint') {
      // Draw decision branches
      const branchWidth = min(120, canvasWidth * 0.15);
      const yesX = mainX + branchWidth;
      const noX = mainX - branchWidth;
      const branchY = current.y * drawHeight;

      // Yes branch (right) - continues/issues found
      noFill();
      stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
      strokeWeight(isHighlighted ? 2 : 1.5);

      // Draw curved "Yes" branch
      beginShape();
      vertex(mainX + nodeWidth / 2, branchY);
      vertex(yesX - 20, branchY);
      vertex(yesX, branchY + 15);
      endShape();

      // Yes label
      fill(colors.blocker);
      noStroke();
      textSize(8);
      textAlign(CENTER, CENTER);
      text('Issues', yesX - 10, branchY - 8);

      // Draw curved "No" branch
      stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
      strokeWeight(isHighlighted ? 2 : 1.5);
      noFill();
      beginShape();
      vertex(mainX - nodeWidth / 2, branchY);
      vertex(noX + 20, branchY);
      vertex(noX, branchY + 15);
      endShape();

      // No label
      fill(colors.complete);
      noStroke();
      textSize(8);
      text('Pass', noX + 10, branchY - 8);

      // Main connector
      stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
      strokeWeight(isHighlighted ? 2.5 : 2);
      line(mainX, y1, mainX, y2);
    } else {
      // Simple vertical connector
      line(mainX, y1, mainX, y2);
    }

    // Arrowhead at next node
    drawArrowhead(mainX, y2, HALF_PI, isHighlighted);
  }
}

function drawArrowhead(x, y, angle, isHighlighted) {
  push();
  translate(x, y);
  rotate(angle);
  fill(isHighlighted ? colors.connectorHighlight : colors.connector);
  noStroke();
  triangle(0, 0, -5, -8, 5, -8);
  pop();
}

function drawNode(checkpoint, isHovered, isSelected) {
  const x = checkpoint.x * canvasWidth;
  const y = checkpoint.y * drawHeight;

  let nodeColor = checkpoint.color;

  // For checkpoint nodes, color based on status
  if (checkpoint.type === 'checkpoint') {
    const status = checkpointStatus[checkpoint.id];
    if (status === 'complete') {
      nodeColor = colors.complete;
    } else if (status === 'inProgress') {
      nodeColor = colors.inProgress;
    }
  }

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(red(color(nodeColor)), green(color(nodeColor)), blue(color(nodeColor)), 40);
      if (checkpoint.type === 'start' || checkpoint.type === 'end') {
        ellipse(x, y, nodeWidth + i * 8, nodeHeight + i * 6);
      } else if (checkpoint.type === 'summary') {
        rectMode(CENTER);
        rect(x, y, nodeWidth + i * 8, nodeHeight + i * 6, 8);
        rectMode(CORNER);
      } else {
        // Diamond shape for decision/checkpoint
        push();
        translate(x, y);
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, (nodeWidth * 0.7) + i * 6, (nodeHeight * 0.7) + i * 6, 4);
        rectMode(CORNER);
        pop();
      }
    }
  }

  // Node shape
  fill(nodeColor);
  stroke(255);
  strokeWeight(2);

  if (checkpoint.type === 'start' || checkpoint.type === 'end') {
    // Oval for start/end
    ellipse(x, y, nodeWidth, nodeHeight);
    if (checkpoint.type === 'end') {
      // Double border for end
      noFill();
      ellipse(x, y, nodeWidth - 8, nodeHeight - 8);
    }
  } else if (checkpoint.type === 'summary') {
    // Rounded rect for summary
    rectMode(CENTER);
    rect(x, y, nodeWidth, nodeHeight, 10);
    rectMode(CORNER);
  } else {
    // Diamond shape for checkpoints (decision nodes)
    push();
    translate(x, y);
    rotate(PI / 4);
    rectMode(CENTER);
    rect(0, 0, nodeWidth * 0.7, nodeHeight * 0.7, 4);
    rectMode(CORNER);
    pop();
  }

  // Checkpoint number badge
  if (checkpoint.checkpointNum) {
    const badgeX = x - nodeWidth / 2 + 5;
    const badgeY = y - nodeHeight / 2 + 5;
    fill(255);
    noStroke();
    ellipse(badgeX, badgeY, 18, 18);
    fill(nodeColor);
    textSize(10);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(checkpoint.checkpointNum, badgeX, badgeY);
    textStyle(NORMAL);
  }

  // Node label
  fill(colors.nodeText);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  const lines = checkpoint.label.split('\n');
  const lineHeight = 12;
  const startY = y - (lines.length - 1) * lineHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, startY + i * lineHeight);
  }
  textStyle(NORMAL);

  // Status indicator for checkpoint nodes
  if (checkpoint.type === 'checkpoint' && checkpointStatus[checkpoint.id] !== 'pending') {
    const iconX = x + nodeWidth / 2 - 8;
    const iconY = y - nodeHeight / 2 + 8;

    fill(255);
    noStroke();
    ellipse(iconX, iconY, 14, 14);

    if (checkpointStatus[checkpoint.id] === 'complete') {
      // Checkmark
      stroke(colors.complete);
      strokeWeight(2);
      noFill();
      line(iconX - 3, iconY, iconX - 1, iconY + 3);
      line(iconX - 1, iconY + 3, iconX + 3, iconY - 2);
    } else {
      // In progress (dot)
      fill(colors.inProgress);
      noStroke();
      ellipse(iconX, iconY, 6, 6);
    }
  }

  // Severity badge for checkpoint nodes
  if (checkpoint.severity && checkpointStatus[checkpoint.id] === 'pending') {
    textSize(7);
    fill(255, 200);
    noStroke();
    textAlign(CENTER, TOP);
    text(checkpoint.severity, x, y + nodeHeight / 2 + 2);
  }
}

function drawControlArea() {
  const centerY = drawHeight + controlHeight / 2;

  // Reset button
  const buttonWidth = 80;
  const buttonHeight = 28;
  const buttonX = canvasWidth / 2 - buttonWidth / 2;
  const buttonY = centerY - buttonHeight / 2;

  const isHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                    mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(isHovered ? '#DC2626' : colors.blocker);
  noStroke();
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 6);

  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Reset All', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  textStyle(NORMAL);

  // Instructions
  fill(colors.textLight);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Click checkpoints to cycle: Pending > In Progress > Complete', 15, centerY);

  // Progress indicator
  let complete = 0, inProgress = 0, total = 0;
  for (let id in checkpointStatus) {
    total++;
    if (checkpointStatus[id] === 'complete') complete++;
    else if (checkpointStatus[id] === 'inProgress') inProgress++;
  }

  textAlign(RIGHT, CENTER);
  const statusText = `Progress: ${complete}/${total} complete, ${inProgress} in progress`;
  text(statusText, canvasWidth - 15, centerY);
}

function drawDescriptionPanel(checkpoint) {
  const panelWidth = min(canvasWidth - 30, 420);
  const panelHeight = checkpoint.checklist ? 110 : 75;
  const panelX = (canvasWidth - panelWidth) / 2;
  const panelY = drawHeight - panelHeight - 50;

  // Semi-transparent background
  fill(255, 245);
  stroke(checkpoint.color);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Title
  fill(checkpoint.color);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(checkpoint.label.replace(/\n/g, ' '), panelX + 10, panelY + 8);

  if (checkpoint.severity) {
    textAlign(RIGHT, TOP);
    textSize(10);
    text('Severity: ' + checkpoint.severity, panelX + panelWidth - 10, panelY + 8);
  }
  textStyle(NORMAL);

  // Content
  fill(colors.text);
  textSize(10);
  textAlign(LEFT, TOP);

  if (checkpoint.action) {
    text('Action: ' + checkpoint.action, panelX + 10, panelY + 26);
  }

  if (checkpoint.decision) {
    text('Decision: ' + checkpoint.decision, panelX + 10, panelY + 40);
  }

  if (checkpoint.checklist) {
    const checkY = panelY + 56;
    text('Checklist:', panelX + 10, checkY);
    for (let i = 0; i < checkpoint.checklist.length; i++) {
      const itemX = i < 2 ? panelX + 10 : panelX + panelWidth / 2;
      const itemY = checkY + 14 + (i % 2) * 14;
      text('- ' + checkpoint.checklist[i], itemX, itemY);
    }
  } else if (checkpoint.description) {
    text(checkpoint.description, panelX + 10, panelY + 26, panelWidth - 20, panelHeight - 35);
  }
}

function getNodeAt(mx, my) {
  for (let i = 0; i < checkpoints.length; i++) {
    const checkpoint = checkpoints[i];
    const x = checkpoint.x * canvasWidth;
    const y = checkpoint.y * drawHeight;

    if (checkpoint.type === 'start' || checkpoint.type === 'end') {
      // Ellipse hit test
      const dx = (mx - x) / (nodeWidth / 2);
      const dy = (my - y) / (nodeHeight / 2);
      if (dx * dx + dy * dy <= 1) return i;
    } else if (checkpoint.type === 'checkpoint') {
      // Diamond hit test (approximate with circle)
      const dx = mx - x;
      const dy = my - y;
      const dist = sqrt(dx * dx + dy * dy);
      if (dist <= nodeWidth * 0.4) return i;
    } else {
      // Rectangle hit test
      if (mx >= x - nodeWidth / 2 && mx <= x + nodeWidth / 2 &&
          my >= y - nodeHeight / 2 && my <= y + nodeHeight / 2) {
        return i;
      }
    }
  }
  return -1;
}

function mouseMoved() {
  hoveredNode = getNodeAt(mouseX, mouseY);

  // Check reset button
  const buttonWidth = 80;
  const buttonHeight = 28;
  const buttonX = canvasWidth / 2 - buttonWidth / 2;
  const buttonY = drawHeight + controlHeight / 2 - buttonHeight / 2;

  if ((hoveredNode >= 0 && checkpoints[hoveredNode].type === 'checkpoint') ||
      (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
       mouseY >= buttonY && mouseY <= buttonY + buttonHeight)) {
    cursor(HAND);
  } else if (hoveredNode >= 0) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  // Check reset button
  const buttonWidth = 80;
  const buttonHeight = 28;
  const buttonX = canvasWidth / 2 - buttonWidth / 2;
  const buttonY = drawHeight + controlHeight / 2 - buttonHeight / 2;

  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    resetWorkflow();
    return;
  }

  // Check node click
  const clickedNode = getNodeAt(mouseX, mouseY);

  if (clickedNode >= 0) {
    const checkpoint = checkpoints[clickedNode];

    if (checkpoint.type === 'checkpoint') {
      // Cycle through states: pending -> inProgress -> complete -> pending
      const currentStatus = checkpointStatus[checkpoint.id];
      if (currentStatus === 'pending') {
        checkpointStatus[checkpoint.id] = 'inProgress';
      } else if (currentStatus === 'inProgress') {
        checkpointStatus[checkpoint.id] = 'complete';
      } else {
        checkpointStatus[checkpoint.id] = 'pending';
      }
    }

    selectedNode = (selectedNode === clickedNode) ? -1 : clickedNode;
  } else {
    selectedNode = -1;
  }
}

function resetWorkflow() {
  for (let checkpoint of checkpoints) {
    if (checkpoint.type === 'checkpoint') {
      checkpointStatus[checkpoint.id] = 'pending';
    }
  }
  selectedNode = -1;
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
  canvasWidth = max(canvasWidth, 400);
  canvasHeight = drawHeight + controlHeight;
}
