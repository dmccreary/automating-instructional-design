// Accessibility Audit Workflow MicroSim
// Interactive flowchart for conducting systematic accessibility audits on MicroSims

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// State
let mouseOverCanvas = false;
let hoveredNode = -1;
let selectedNode = -1;
let auditResults = {};  // Track pass/fail status for each test

// Colors from specification
const colors = {
  pass: '#10B981',
  fail: '#EF4444',
  inProgress: '#F59E0B',
  summary: '#3B82F6',
  start: '#6366F1',      // Indigo for start/end
  background: '#F8FAFC',
  text: '#1E293B',
  textLight: '#64748B',
  nodeText: '#FFFFFF',
  connector: '#94A3B8',
  connectorHighlight: '#475569'
};

// Audit steps data
const steps = [
  {
    id: 'start',
    type: 'start',
    label: 'Begin\nAccessibility\nAudit',
    color: colors.start,
    x: 0.5,
    y: 0.06,
    description: 'Start the systematic accessibility audit process for your MicroSim. Each test evaluates a different dimension of accessibility.'
  },
  {
    id: 'keyboard',
    type: 'test',
    label: 'Keyboard\nNavigation',
    color: colors.inProgress,
    x: 0.5,
    y: 0.18,
    testNum: 1,
    questions: [
      'Can you Tab to all controls?',
      'Can you activate buttons with Enter/Space?',
      'Is focus visible at all times?'
    ],
    description: 'Test that all interactive elements can be reached and operated using only the keyboard.'
  },
  {
    id: 'screenreader',
    type: 'test',
    label: 'Screen Reader\nCompatibility',
    color: colors.inProgress,
    x: 0.5,
    y: 0.30,
    testNum: 2,
    questions: [
      'Does describe() provide current state?',
      'Are all controls labeled?',
      'Are live regions announcing changes?'
    ],
    description: 'Verify that screen readers can convey the simulation state and all interactive elements to users.'
  },
  {
    id: 'color',
    type: 'test',
    label: 'Color and\nContrast',
    color: colors.inProgress,
    x: 0.5,
    y: 0.42,
    testNum: 3,
    questions: [
      'Does it pass WCAG contrast ratios?',
      'Is color not the only differentiator?',
      'Is it usable in grayscale?'
    ],
    description: 'Ensure sufficient color contrast and that information is not conveyed by color alone.'
  },
  {
    id: 'motion',
    type: 'test',
    label: 'Motion and\nAnimation',
    color: colors.inProgress,
    x: 0.5,
    y: 0.54,
    testNum: 4,
    questions: [
      'Does it respect prefers-reduced-motion?',
      'Can animations be paused?',
      'Is there a static alternative?'
    ],
    description: 'Check that motion and animations can be controlled by users who may have vestibular disorders.'
  },
  {
    id: 'touch',
    type: 'test',
    label: 'Touch and\nMotor',
    color: colors.inProgress,
    x: 0.5,
    y: 0.66,
    testNum: 5,
    questions: [
      'Are touch targets >= 44x44px?',
      'Is precision not required?',
      'Are there keyboard alternatives to drag?'
    ],
    description: 'Verify that touch targets are large enough and fine motor control is not required.'
  },
  {
    id: 'report',
    type: 'summary',
    label: 'Generate\nAudit Report',
    color: colors.summary,
    x: 0.5,
    y: 0.80,
    description: 'Review all test results. The report lists passed tests, failed tests with severity, and prioritizes fixes.'
  },
  {
    id: 'end',
    type: 'end',
    label: 'Audit\nComplete',
    color: colors.start,
    x: 0.5,
    y: 0.93,
    description: 'The accessibility audit is complete. Address any failed tests to improve MicroSim accessibility.'
  }
];

// Node dimensions
const nodeWidth = 120;
const nodeHeight = 55;
const branchWidth = 160;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  // Initialize audit results
  for (let step of steps) {
    if (step.type === 'test') {
      auditResults[step.id] = null;  // null = not tested, true = pass, false = fail
    }
  }

  describe('Accessibility Audit Workflow flowchart with 8 steps: Start audit, 5 accessibility tests (Keyboard, Screen Reader, Color, Motion, Touch), Generate Report, and Complete. Click test nodes to mark pass or fail.', LABEL);
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
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Accessibility Audit Workflow', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw connectors first (behind nodes)
  drawConnectors();

  // Draw nodes
  for (let i = 0; i < steps.length; i++) {
    drawNode(steps[i], i === hoveredNode, i === selectedNode);
  }

  // Draw control area
  drawControlArea();
}

function drawConnectors() {
  const mainX = canvasWidth / 2;

  for (let i = 0; i < steps.length - 1; i++) {
    const current = steps[i];
    const next = steps[i + 1];

    const y1 = current.y * drawHeight + nodeHeight / 2 + 5;
    const y2 = next.y * drawHeight - nodeHeight / 2 - 5;

    const isHighlighted = (hoveredNode === i || hoveredNode === i + 1 ||
                          selectedNode === i || selectedNode === i + 1);

    stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
    strokeWeight(isHighlighted ? 2.5 : 2);

    if (current.type === 'test') {
      // Draw pass/fail branches
      const branchX = mainX + branchWidth / 2;
      const failX = mainX - branchWidth / 2;

      // Main connector continues down the middle
      line(mainX, y1, mainX, y2);

      // Draw pass branch (right)
      const passY = current.y * drawHeight + nodeHeight / 2 + 15;
      noFill();
      beginShape();
      vertex(mainX + nodeWidth / 2, current.y * drawHeight);
      vertex(branchX, current.y * drawHeight);
      vertex(branchX, passY);
      vertex(branchX - 15, passY + 10);
      endShape();

      // Pass label
      fill(colors.pass);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text('Pass', branchX + 5, current.y * drawHeight - 10);

      // Draw fail branch (left)
      stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
      noFill();
      beginShape();
      vertex(mainX - nodeWidth / 2, current.y * drawHeight);
      vertex(failX, current.y * drawHeight);
      vertex(failX, passY);
      vertex(failX + 15, passY + 10);
      endShape();

      // Fail label
      fill(colors.fail);
      noStroke();
      textSize(10);
      text('Fail', failX - 5, current.y * drawHeight - 10);

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
  triangle(0, 0, -6, -10, 6, -10);
  pop();
}

function drawNode(step, isHovered, isSelected) {
  const x = step.x * canvasWidth;
  const y = step.y * drawHeight;

  let nodeColor = step.color;

  // For test nodes, color based on result
  if (step.type === 'test' && auditResults[step.id] !== null) {
    nodeColor = auditResults[step.id] ? colors.pass : colors.fail;
  }

  // Glow effect for hovered/selected
  if (isHovered || isSelected) {
    noStroke();
    for (let i = 3; i > 0; i--) {
      fill(red(color(nodeColor)), green(color(nodeColor)), blue(color(nodeColor)), 40);
      if (step.type === 'start' || step.type === 'end') {
        ellipse(x, y, nodeWidth + i * 8, nodeHeight + i * 6);
      } else if (step.type === 'summary') {
        rectMode(CENTER);
        rect(x, y, nodeWidth + i * 8, nodeHeight + i * 6, 8);
        rectMode(CORNER);
      } else {
        rectMode(CENTER);
        rect(x, y, nodeWidth + i * 8, nodeHeight + i * 6, 4);
        rectMode(CORNER);
      }
    }
  }

  // Node shape
  fill(nodeColor);
  stroke(255);
  strokeWeight(2);

  if (step.type === 'start' || step.type === 'end') {
    // Oval for start/end
    ellipse(x, y, nodeWidth, nodeHeight);
    if (step.type === 'end') {
      // Double border for end
      noFill();
      ellipse(x, y, nodeWidth - 8, nodeHeight - 8);
    }
  } else if (step.type === 'summary') {
    // Rounded rect for summary
    rectMode(CENTER);
    rect(x, y, nodeWidth, nodeHeight, 10);
    rectMode(CORNER);
  } else {
    // Regular rect for tests
    rectMode(CENTER);
    rect(x, y, nodeWidth, nodeHeight, 4);
    rectMode(CORNER);
  }

  // Test number badge
  if (step.testNum) {
    fill(255);
    noStroke();
    ellipse(x - nodeWidth / 2 + 12, y - nodeHeight / 2 + 12, 20, 20);
    fill(nodeColor);
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(step.testNum, x - nodeWidth / 2 + 12, y - nodeHeight / 2 + 12);
    textStyle(NORMAL);
  }

  // Node label
  fill(colors.nodeText);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  const lines = step.label.split('\n');
  const lineHeight = 13;
  const startY = y - (lines.length - 1) * lineHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, startY + i * lineHeight);
  }
  textStyle(NORMAL);

  // Status indicator for test nodes
  if (step.type === 'test' && auditResults[step.id] !== null) {
    const iconX = x + nodeWidth / 2 - 12;
    const iconY = y - nodeHeight / 2 + 12;

    fill(255);
    noStroke();
    ellipse(iconX, iconY, 16, 16);

    if (auditResults[step.id]) {
      // Checkmark
      stroke(colors.pass);
      strokeWeight(2);
      noFill();
      line(iconX - 4, iconY, iconX - 1, iconY + 3);
      line(iconX - 1, iconY + 3, iconX + 4, iconY - 3);
    } else {
      // X mark
      stroke(colors.fail);
      strokeWeight(2);
      line(iconX - 3, iconY - 3, iconX + 3, iconY + 3);
      line(iconX + 3, iconY - 3, iconX - 3, iconY + 3);
    }
  }
}

function drawControlArea() {
  const centerY = drawHeight + controlHeight / 2;

  // Reset button
  const buttonWidth = 90;
  const buttonHeight = 30;
  const buttonX = canvasWidth / 2 - buttonWidth / 2;
  const buttonY = centerY - buttonHeight / 2;

  const isHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                    mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(isHovered ? '#DC2626' : colors.fail);
  noStroke();
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 6);

  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Reset All', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  textStyle(NORMAL);

  // Instructions
  fill(colors.textLight);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click test nodes: Left = Pass, Right = Fail', 20, centerY);

  // Progress indicator
  let passed = 0, failed = 0, total = 0;
  for (let id in auditResults) {
    total++;
    if (auditResults[id] === true) passed++;
    else if (auditResults[id] === false) failed++;
  }

  textAlign(RIGHT, CENTER);
  const statusText = `Tests: ${passed} passed, ${failed} failed, ${total - passed - failed} pending`;
  text(statusText, canvasWidth - 20, centerY);

  // Description panel when node is selected
  if (selectedNode >= 0) {
    drawDescriptionPanel(steps[selectedNode]);
  }
}

function drawDescriptionPanel(step) {
  const panelWidth = min(canvasWidth - 40, 450);
  const panelHeight = 80;
  const panelX = (canvasWidth - panelWidth) / 2;
  const panelY = drawHeight - panelHeight - 15;

  // Semi-transparent background
  fill(255, 250);
  stroke(step.color);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Title
  fill(step.color);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(step.label.replace(/\n/g, ' '), panelX + 12, panelY + 10);
  textStyle(NORMAL);

  // Description or questions
  fill(colors.text);
  textSize(11);
  textAlign(LEFT, TOP);

  if (step.questions) {
    const questionY = panelY + 28;
    for (let i = 0; i < step.questions.length; i++) {
      text('- ' + step.questions[i], panelX + 12, questionY + i * 14);
    }
  } else {
    text(step.description, panelX + 12, panelY + 28, panelWidth - 24, panelHeight - 40);
  }
}

function getNodeAt(mx, my) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const x = step.x * canvasWidth;
    const y = step.y * drawHeight;

    if (step.type === 'start' || step.type === 'end') {
      // Ellipse hit test
      const dx = (mx - x) / (nodeWidth / 2);
      const dy = (my - y) / (nodeHeight / 2);
      if (dx * dx + dy * dy <= 1) return i;
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
  const buttonWidth = 90;
  const buttonHeight = 30;
  const buttonX = canvasWidth / 2 - buttonWidth / 2;
  const buttonY = drawHeight + controlHeight / 2 - buttonHeight / 2;

  if ((hoveredNode >= 0 && steps[hoveredNode].type === 'test') ||
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
  const buttonWidth = 90;
  const buttonHeight = 30;
  const buttonX = canvasWidth / 2 - buttonWidth / 2;
  const buttonY = drawHeight + controlHeight / 2 - buttonHeight / 2;

  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    resetAudit();
    return;
  }

  // Check node click
  const clickedNode = getNodeAt(mouseX, mouseY);

  if (clickedNode >= 0) {
    const step = steps[clickedNode];

    if (step.type === 'test') {
      // Determine pass/fail based on click position
      const x = step.x * canvasWidth;
      if (mouseX >= x) {
        // Right side = pass
        auditResults[step.id] = true;
      } else {
        // Left side = fail
        auditResults[step.id] = false;
      }
    }

    selectedNode = (selectedNode === clickedNode) ? -1 : clickedNode;
  } else {
    selectedNode = -1;
  }
}

function resetAudit() {
  for (let step of steps) {
    if (step.type === 'test') {
      auditResults[step.id] = null;
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
