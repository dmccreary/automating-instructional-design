// Accessibility Audit Workflow MicroSim
// Interactive flowchart for conducting systematic accessibility audits on MicroSims
/// <reference types="p5/global" />
// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 850;  // Increased to accommodate buttons
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 20;

// State
let mouseOverCanvas = false;
let hoveredNode = -1;
let selectedNode = -1;
let hoveredButton = null;  // Track which button is hovered {nodeId, type: 'pass'|'fail'}
let auditResults = {};  // Track pass/fail status for each test

// Colors from specification
const colors = {
  pass: '#10B981',
  passDark: '#059669',
  fail: '#EF4444',
  failDark: '#DC2626',
  inProgress: '#F59E0B',
  summary: '#3B82F6',
  start: '#6366F1',      // Indigo for start/end
  background: '#F8FAFC',
  text: '#1E293B',
  textLight: '#64748B',
  nodeText: '#FFFFFF',
  connector: '#94A3B8',
  connectorHighlight: '#475569',
  buttonBorder: '#E2E8F0'
};

// Audit steps data - Y positions adjusted to accommodate Pass/Fail buttons below test nodes
const steps = [
  {
    id: 'start',
    type: 'start',
    label: 'Begin\nAccessibility\nAudit',
    color: colors.start,
    x: 0.5,
    y: 0.05,
    description: 'Start the systematic accessibility audit process for your MicroSim. Each test evaluates a different dimension of accessibility.'
  },
  {
    id: 'keyboard',
    type: 'test',
    label: 'Keyboard\nNavigation',
    color: colors.inProgress,
    x: 0.5,
    y: 0.15,
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
    y: 0.27,
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
    y: 0.39,
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
    y: 0.51,
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
    y: 0.63,
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
    y: 0.75,
    description: 'Review all test results. The report lists passed tests, failed tests with severity, and prioritizes fixes.'
  },
  {
    id: 'end',
    type: 'end',
    label: 'Audit\nComplete',
    color: colors.start,
    x: 0.5,
    y: 0.87,
    description: 'The accessibility audit is complete. Address any failed tests to improve MicroSim accessibility.'
  }
];

// Node dimensions
const nodeWidth = 120;
const nodeHeight = 62;  // Extended down 30 to contain buttons
const branchWidth = 160;

// Button dimensions for Pass/Fail controls
const buttonWidth = 50;
const buttonHeight = 18;  // Reduced by 4 (2 top + 2 bottom margins)
const buttonGap = 10;  // Gap between Pass and Fail buttons
const buttonYOffset = 6;  // Moved up 20 to sit inside node

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

  // Draw area
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Accessibility Audit Workflow', canvasWidth/2, 8);
  textStyle(NORMAL);

  push();
  translate(0, 30);
  // Draw connectors first (behind nodes)
  drawConnectors();

  // Draw nodes
  for (let i = 0; i < steps.length; i++) {
    drawNode(steps[i], i === hoveredNode, i === selectedNode);
  }
  pop();
  // Draw control area
  drawControlArea();
}

function drawConnectors() {
  const mainX = canvasWidth / 2;

  for (let i = 0; i < steps.length - 1; i++) {
    const current = steps[i];
    const next = steps[i + 1];

    // Start connector from bottom of current node
    const y1 = current.y * drawHeight + nodeHeight / 2 + 5;
    // End connector at top of next node
    const y2 = next.y * drawHeight - nodeHeight / 2 - 5;

    const isHighlighted = (hoveredNode === i || hoveredNode === i + 1 ||
                          selectedNode === i || selectedNode === i + 1);

    stroke(isHighlighted ? colors.connectorHighlight : colors.connector);
    strokeWeight(isHighlighted ? 2.5 : 2);

    // Simple vertical connector for all nodes
    line(mainX, y1, mainX, y2);

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
  // Triangle pointing right, which becomes down after HALF_PI rotation
  triangle(0, 0, -10, -6, -10, 6);
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

  // Test number badge in upper left for test nodes
  if (step.testNum) {
    fill(255);
    noStroke();
    // the circle enclosing the number in the upper left
    circle(x - nodeWidth / 2 + 12, y - nodeHeight / 2 + 12, 17);
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
  // For test nodes, shift text up to make room for buttons; for ellipses, center vertically
  const textOffset = (step.type === 'test') ? -10 : 0;
  const startY = y - (lines.length - 1) * lineHeight / 2 + textOffset;

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

  // Draw Pass/Fail buttons for test nodes
  if (step.type === 'test') {
    drawPassFailButtons(step, x, y);
  }
}

function drawPassFailButtons(step, x, y) {
  const buttonY = y + buttonYOffset;
  const totalWidth = buttonWidth * 2 + buttonGap;
  const passX = x - totalWidth / 2;
  const failX = x + buttonGap / 2;

  const result = auditResults[step.id];
  const isPassHovered = hoveredButton && hoveredButton.nodeId === step.id && hoveredButton.type === 'pass';
  const isFailHovered = hoveredButton && hoveredButton.nodeId === step.id && hoveredButton.type === 'fail';

  // Pass button
  if (result === true) {
    // Selected state - filled
    fill(colors.pass);
    stroke(colors.passDark);
  } else if (isPassHovered) {
    // Hover state
    fill(colors.pass + '30');  // 30 = ~19% opacity
    stroke(colors.pass);
  } else {
    // Default state - outline only
    fill(255);
    stroke(colors.pass);
  }
  strokeWeight(2);
  rect(passX, buttonY, buttonWidth, buttonHeight, 4);

  // Pass button text
  fill(result === true ? 255 : colors.pass);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Pass', passX + buttonWidth / 2, buttonY + buttonHeight / 2);

  // Fail button
  if (result === false) {
    // Selected state - filled
    fill(colors.fail);
    stroke(colors.failDark);
  } else if (isFailHovered) {
    // Hover state
    fill(colors.fail + '30');
    stroke(colors.fail);
  } else {
    // Default state - outline only
    fill(255);
    stroke(colors.fail);
  }
  strokeWeight(2);
  rect(failX, buttonY, buttonWidth, buttonHeight, 4);

  // Fail button text
  fill(result === false ? 255 : colors.fail);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Fail', failX + buttonWidth / 2, buttonY + buttonHeight / 2);

  textStyle(NORMAL);
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
  text('Click Pass or Fail buttons to record test results', 20, centerY);

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

  // Description panel when node is hovered or selected
  const activeNode = hoveredNode >= 0 ? hoveredNode : selectedNode;
  if (activeNode >= 0) {
    drawDescriptionPanel(steps[activeNode]);
  }
}

function drawDescriptionPanel(step) {
  const panelWidth = 180;
  const panelHeight = step.questions ? 120 : 100;
  const panelX = canvasWidth - panelWidth - 15;
  // Position panel vertically based on the node's position
  const nodeY = step.y * drawHeight + 30;
  const panelY = constrain(nodeY - panelHeight / 2, 50, drawHeight - panelHeight - 10);

  // Semi-transparent background
  fill(255, 250);
  stroke(step.color);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Title
  fill(step.color);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(step.label.replace(/\n/g, ' '), panelX + 10, panelY + 10);
  textStyle(NORMAL);

  // Description or questions
  fill(colors.text);
  textSize(10);
  textAlign(LEFT, TOP);

  if (step.questions) {
    const questionY = panelY + 32;
    for (let i = 0; i < step.questions.length; i++) {
      text('• ' + step.questions[i], panelX + 10, questionY + i * 26, panelWidth - 20, 26);
    }
  } else {
    text(step.description, panelX + 10, panelY + 32, panelWidth - 20, panelHeight - 44);
  }
}

function getNodeAt(mx, my) {
  // Account for the translate(0, 30) offset in draw()
  const adjustedMy = my - 30;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const x = step.x * canvasWidth;
    const y = step.y * drawHeight;

    if (step.type === 'start' || step.type === 'end') {
      // Ellipse hit test
      const dx = (mx - x) / (nodeWidth / 2);
      const dy = (adjustedMy - y) / (nodeHeight / 2);
      if (dx * dx + dy * dy <= 1) return i;
    } else {
      // Rectangle hit test
      if (mx >= x - nodeWidth / 2 && mx <= x + nodeWidth / 2 &&
          adjustedMy >= y - nodeHeight / 2 && adjustedMy <= y + nodeHeight / 2) {
        return i;
      }
    }
  }
  return -1;
}

function getButtonAt(mx, my) {
  // Account for the translate(0, 30) offset in draw()
  const adjustedMy = my - 30;

  for (let step of steps) {
    if (step.type !== 'test') continue;

    const x = step.x * canvasWidth;
    const y = step.y * drawHeight;
    const btnY = y + buttonYOffset;
    const totalWidth = buttonWidth * 2 + buttonGap;
    const passX = x - totalWidth / 2;
    const failX = x + buttonGap / 2;

    // Check Pass button
    if (mx >= passX && mx <= passX + buttonWidth &&
        adjustedMy >= btnY && adjustedMy <= btnY + buttonHeight) {
      return { nodeId: step.id, type: 'pass' };
    }

    // Check Fail button
    if (mx >= failX && mx <= failX + buttonWidth &&
        adjustedMy >= btnY && adjustedMy <= btnY + buttonHeight) {
      return { nodeId: step.id, type: 'fail' };
    }
  }
  return null;
}

function mouseMoved() {
  hoveredNode = getNodeAt(mouseX, mouseY);
  hoveredButton = getButtonAt(mouseX, mouseY);

  // Check reset button
  const resetBtnWidth = 90;
  const resetBtnHeight = 30;
  const resetBtnX = canvasWidth / 2 - resetBtnWidth / 2;
  const resetBtnY = drawHeight + controlHeight / 2 - resetBtnHeight / 2;

  const overResetBtn = mouseX >= resetBtnX && mouseX <= resetBtnX + resetBtnWidth &&
                       mouseY >= resetBtnY && mouseY <= resetBtnY + resetBtnHeight;

  if (hoveredButton || overResetBtn || hoveredNode >= 0) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  // Check reset button
  const resetBtnWidth = 90;
  const resetBtnHeight = 30;
  const resetBtnX = canvasWidth / 2 - resetBtnWidth / 2;
  const resetBtnY = drawHeight + controlHeight / 2 - resetBtnHeight / 2;

  if (mouseX >= resetBtnX && mouseX <= resetBtnX + resetBtnWidth &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + resetBtnHeight) {
    resetAudit();
    return;
  }

  // Check Pass/Fail button clicks
  const clickedButton = getButtonAt(mouseX, mouseY);
  if (clickedButton) {
    auditResults[clickedButton.nodeId] = (clickedButton.type === 'pass');
    // Also select the corresponding node to show its details
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].id === clickedButton.nodeId) {
        selectedNode = i;
        break;
      }
    }
    return;
  }

  // Check node click (for selecting/deselecting to view details)
  const clickedNode = getNodeAt(mouseX, mouseY);

  if (clickedNode >= 0) {
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
