// Probability Tree Explorer MicroSim
// Interactive probability tree for drawing balls without replacement
// Shows compound probability calculation through visual branch widths

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Probability tree parameters
let redBalls = 5;
let blueBalls = 3;

// UI controls
let redSlider, blueSlider;
let resetButton;
let showCalcCheckbox;
let showCalculations = false;

// Node positions (calculated dynamically)
let nodes = {};
let branches = [];

// Hover state
let hoveredOutcome = null;

// Colors
const RED_COLOR = '#E74C3C';
const BLUE_COLOR = '#3498DB';
const NODE_COLOR = '#F5F5F5';
const HIGHLIGHT_COLOR = '#FFE082';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  // Create controls
  createControls();
  calculateTree();

  describe('Interactive probability tree showing compound probabilities for drawing balls without replacement. Adjust sliders to change the number of red and blue balls.', LABEL);
}

function createControls() {
  // Red balls slider
  let controlY = drawHeight + 15;
  let sliderWidth = 100;

  // Position controls within canvas area
  let startX = 20;

  // Create sliders
  redSlider = createSlider(1, 10, redBalls, 1);
  redSlider.position(startX + 80, controlY);
  redSlider.size(sliderWidth);
  redSlider.input(onSliderChange);

  blueSlider = createSlider(1, 10, blueBalls, 1);
  blueSlider.position(startX + 280, controlY);
  blueSlider.size(sliderWidth);
  blueSlider.input(onSliderChange);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(startX + 420, controlY - 3);
  resetButton.mousePressed(resetDefaults);

  // Show calculations checkbox
  showCalcCheckbox = createCheckbox(' Show Calculations', false);
  showCalcCheckbox.position(startX + 500, controlY - 3);
  showCalcCheckbox.changed(() => {
    showCalculations = showCalcCheckbox.checked();
  });
}

function onSliderChange() {
  redBalls = redSlider.value();
  blueBalls = blueSlider.value();
  calculateTree();
}

function resetDefaults() {
  redBalls = 5;
  blueBalls = 3;
  redSlider.value(redBalls);
  blueSlider.value(blueBalls);
  showCalculations = false;
  showCalcCheckbox.checked(false);
  calculateTree();
}

function calculateTree() {
  let total = redBalls + blueBalls;

  // Calculate all probabilities
  let pRed1 = redBalls / total;
  let pBlue1 = blueBalls / total;

  // Second draw probabilities (conditional on first draw)
  let pRed2GivenRed1 = (redBalls - 1) / (total - 1);
  let pBlue2GivenRed1 = blueBalls / (total - 1);
  let pRed2GivenBlue1 = redBalls / (total - 1);
  let pBlue2GivenBlue1 = (blueBalls - 1) / (total - 1);

  // Compound probabilities
  let pRR = pRed1 * pRed2GivenRed1;
  let pRB = pRed1 * pBlue2GivenRed1;
  let pBR = pBlue1 * pRed2GivenBlue1;
  let pBB = pBlue1 * pBlue2GivenBlue1;

  // Store node data
  nodes = {
    start: { x: 80, y: drawHeight / 2, label: 'Start' },
    red1: { x: 280, y: drawHeight * 0.25, label: 'Red', prob: pRed1, color: RED_COLOR },
    blue1: { x: 280, y: drawHeight * 0.75, label: 'Blue', prob: pBlue1, color: BLUE_COLOR },
    rr: { x: 500, y: drawHeight * 0.12, label: 'RR', prob: pRR,
          condProb: pRed2GivenRed1, firstProb: pRed1, color: RED_COLOR,
          path: ['red1', 'rr'], pathColors: [RED_COLOR, RED_COLOR] },
    rb: { x: 500, y: drawHeight * 0.38, label: 'RB', prob: pRB,
          condProb: pBlue2GivenRed1, firstProb: pRed1, color: BLUE_COLOR,
          path: ['red1', 'rb'], pathColors: [RED_COLOR, BLUE_COLOR] },
    br: { x: 500, y: drawHeight * 0.62, label: 'BR', prob: pBR,
          condProb: pRed2GivenBlue1, firstProb: pBlue1, color: RED_COLOR,
          path: ['blue1', 'br'], pathColors: [BLUE_COLOR, RED_COLOR] },
    bb: { x: 500, y: drawHeight * 0.88, label: 'BB', prob: pBB,
          condProb: pBlue2GivenBlue1, firstProb: pBlue1, color: BLUE_COLOR,
          path: ['blue1', 'bb'], pathColors: [BLUE_COLOR, BLUE_COLOR] }
  };

  // Define branches with their probabilities and max width
  let maxWidth = 40;
  branches = [
    { from: 'start', to: 'red1', prob: pRed1, width: pRed1 * maxWidth, color: RED_COLOR },
    { from: 'start', to: 'blue1', prob: pBlue1, width: pBlue1 * maxWidth, color: BLUE_COLOR },
    { from: 'red1', to: 'rr', prob: pRed2GivenRed1, width: pRR * maxWidth, color: RED_COLOR },
    { from: 'red1', to: 'rb', prob: pBlue2GivenRed1, width: pRB * maxWidth, color: BLUE_COLOR },
    { from: 'blue1', to: 'br', prob: pRed2GivenBlue1, width: pBR * maxWidth, color: RED_COLOR },
    { from: 'blue1', to: 'bb', prob: pBlue2GivenBlue1, width: pBB * maxWidth, color: BLUE_COLOR }
  ];
}

function draw() {
  updateCanvasSize();
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text('Probability Tree Explorer', canvasWidth / 2, 10);

  // Draw subtitle
  textSize(14);
  fill(100);
  text('Drawing Two Balls Without Replacement', canvasWidth / 2, 35);

  // Check for hover on outcome nodes
  hoveredOutcome = null;
  for (let key of ['rr', 'rb', 'br', 'bb']) {
    let node = nodes[key];
    let d = dist(mouseX, mouseY, node.x, node.y);
    if (d < 30) {
      hoveredOutcome = key;
      break;
    }
  }

  // Draw branches
  drawBranches();

  // Draw nodes
  drawNodes();

  // Draw calculation panel
  drawCalculationPanel();

  // Draw control labels
  drawControlLabels();
}

function drawBranches() {
  // First pass: draw all branches normally
  for (let branch of branches) {
    let fromNode = nodes[branch.from];
    let toNode = nodes[branch.to];
    let isHighlighted = false;

    // Check if this branch is part of highlighted path
    if (hoveredOutcome) {
      let outcome = nodes[hoveredOutcome];
      if (outcome.path) {
        // Check first level branches
        if (branch.to === outcome.path[0]) {
          isHighlighted = true;
        }
        // Check second level branches
        if (branch.to === hoveredOutcome) {
          isHighlighted = true;
        }
      }
    }

    // Draw branch
    stroke(branch.color);
    strokeWeight(isHighlighted ? branch.width + 4 : branch.width);
    if (isHighlighted) {
      stroke(HIGHLIGHT_COLOR);
      line(fromNode.x, fromNode.y, toNode.x, toNode.y);
      stroke(branch.color);
      strokeWeight(branch.width);
    }
    line(fromNode.x, fromNode.y, toNode.x, toNode.y);

    // Draw probability label on branch
    let midX = (fromNode.x + toNode.x) / 2;
    let midY = (fromNode.y + toNode.y) / 2;

    // Offset label perpendicular to branch
    let angle = atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
    let offsetDist = 15;
    let labelX = midX + cos(angle - HALF_PI) * offsetDist;
    let labelY = midY + sin(angle - HALF_PI) * offsetDist;

    noStroke();
    fill(50);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(formatFraction(branch.prob), labelX, labelY);
  }
}

function drawNodes() {
  // Draw start node
  let startNode = nodes.start;
  fill(NODE_COLOR);
  stroke(100);
  strokeWeight(2);
  ellipse(startNode.x, startNode.y, 50, 50);
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(startNode.label, startNode.x, startNode.y);

  // Draw first level nodes
  for (let key of ['red1', 'blue1']) {
    let node = nodes[key];
    let isHighlighted = hoveredOutcome && nodes[hoveredOutcome].path &&
                        nodes[hoveredOutcome].path[0] === key;

    fill(isHighlighted ? HIGHLIGHT_COLOR : NODE_COLOR);
    stroke(node.color);
    strokeWeight(3);
    ellipse(node.x, node.y, 50, 50);

    // Draw colored dot inside
    fill(node.color);
    noStroke();
    ellipse(node.x, node.y - 8, 15, 15);

    // Label
    fill(50);
    textSize(12);
    text(node.label, node.x, node.y + 12);
  }

  // Draw outcome nodes
  for (let key of ['rr', 'rb', 'br', 'bb']) {
    let node = nodes[key];
    let isHovered = hoveredOutcome === key;

    fill(isHovered ? HIGHLIGHT_COLOR : NODE_COLOR);
    stroke(isHovered ? '#FF9800' : '#888');
    strokeWeight(isHovered ? 4 : 2);
    ellipse(node.x, node.y, 55, 55);

    // Draw two colored dots for the outcome
    fill(node.pathColors[0]);
    noStroke();
    ellipse(node.x - 10, node.y - 8, 12, 12);
    fill(node.pathColors[1]);
    ellipse(node.x + 10, node.y - 8, 12, 12);

    // Label
    fill(50);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(node.label, node.x, node.y + 8);

    // Probability below node
    textSize(11);
    fill(80);
    text('P = ' + node.prob.toFixed(3), node.x, node.y + 38);
  }
}

function drawCalculationPanel() {
  let panelX = 560;
  let panelY = 60;
  let panelWidth = canvasWidth - panelX - 20;
  let panelHeight = drawHeight - 80;

  // Panel background
  fill(255);
  stroke(180);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Panel title
  fill(50);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Bag Contents:', panelX + 15, panelY + 15);

  textStyle(NORMAL);
  textSize(13);

  // Show ball counts
  let total = redBalls + blueBalls;
  fill(RED_COLOR);
  text(redBalls + ' Red', panelX + 15, panelY + 40);
  fill(BLUE_COLOR);
  text(blueBalls + ' Blue', panelX + 80, panelY + 40);
  fill(50);
  text('Total: ' + total, panelX + 15, panelY + 60);

  // Divider
  stroke(200);
  strokeWeight(1);
  line(panelX + 10, panelY + 85, panelX + panelWidth - 10, panelY + 85);

  noStroke();

  if (hoveredOutcome) {
    // Show calculation for hovered outcome
    let node = nodes[hoveredOutcome];

    fill(50);
    textStyle(BOLD);
    textSize(14);
    text('Path: ' + node.label, panelX + 15, panelY + 100);

    textStyle(NORMAL);
    textSize(12);

    let y = panelY + 125;
    let lineHeight = 22;

    // First draw
    fill(80);
    text('First Draw:', panelX + 15, y);
    y += lineHeight;

    let firstColor = node.pathColors[0];
    let firstBall = firstColor === RED_COLOR ? 'Red' : 'Blue';
    let firstNum = firstColor === RED_COLOR ? redBalls : blueBalls;
    fill(firstColor);
    text('P(' + firstBall + ') = ' + firstNum + '/' + total, panelX + 25, y);
    y += lineHeight + 5;

    // Second draw
    fill(80);
    text('Second Draw:', panelX + 15, y);
    y += lineHeight;

    let secondColor = node.pathColors[1];
    let secondBall = secondColor === RED_COLOR ? 'Red' : 'Blue';
    let remainingTotal = total - 1;
    let secondNum;
    if (firstColor === secondColor) {
      secondNum = (secondColor === RED_COLOR ? redBalls : blueBalls) - 1;
    } else {
      secondNum = secondColor === RED_COLOR ? redBalls : blueBalls;
    }
    fill(secondColor);
    text('P(' + secondBall + '|' + firstBall + ') = ' + secondNum + '/' + remainingTotal, panelX + 25, y);
    y += lineHeight + 10;

    // Compound probability
    stroke(200);
    strokeWeight(1);
    line(panelX + 10, y, panelX + panelWidth - 10, y);
    y += 15;
    noStroke();

    fill(50);
    textStyle(BOLD);
    text('Compound:', panelX + 15, y);
    y += lineHeight;

    textStyle(NORMAL);
    fill(80);
    text('P(' + node.label + ') = ', panelX + 15, y);
    y += lineHeight;

    // Show multiplication
    let numerator = firstNum * secondNum;
    let denominator = total * remainingTotal;
    text(firstNum + '/' + total + ' x ' + secondNum + '/' + remainingTotal, panelX + 25, y);
    y += lineHeight;

    text('= ' + numerator + '/' + denominator, panelX + 25, y);
    y += lineHeight;

    // Decimal
    textStyle(BOLD);
    fill('#2E7D32');
    text('= ' + node.prob.toFixed(4), panelX + 25, y);
    textStyle(NORMAL);

  } else if (showCalculations) {
    // Show all outcomes summary
    fill(50);
    textStyle(BOLD);
    textSize(13);
    text('All Outcomes:', panelX + 15, panelY + 100);

    textStyle(NORMAL);
    textSize(11);

    let y = panelY + 125;
    let lineHeight = 20;

    for (let key of ['rr', 'rb', 'br', 'bb']) {
      let node = nodes[key];
      fill(50);
      text('P(' + node.label + ') = ' + node.prob.toFixed(4), panelX + 15, y);
      y += lineHeight;
    }

    y += 10;
    stroke(200);
    line(panelX + 10, y, panelX + panelWidth - 10, y);
    y += 15;
    noStroke();

    // Sum of probabilities
    let sum = nodes.rr.prob + nodes.rb.prob + nodes.br.prob + nodes.bb.prob;
    fill('#2E7D32');
    textStyle(BOLD);
    text('Sum = ' + sum.toFixed(4), panelX + 15, y);
    textStyle(NORMAL);

  } else {
    // Instructions
    fill(100);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Hover over an\noutcome node\nto see the\ncalculation', panelX + panelWidth/2, panelY + panelHeight/2);
    textAlign(LEFT, TOP);
  }
}

function drawControlLabels() {
  fill(50);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);

  let controlY = drawHeight + 25;
  text('Red Balls:', 20, controlY);
  text('Blue Balls:', 220, controlY);
}

function formatFraction(decimal) {
  // Convert decimal to simplified fraction string for display
  let total = redBalls + blueBalls;
  let numerator = Math.round(decimal * total);

  // Try to find simpler fraction
  let gcd = findGCD(numerator, total);
  let simpleNum = numerator / gcd;
  let simpleDen = total / gcd;

  if (simpleDen === 1) {
    return simpleNum.toString();
  }
  return simpleNum + '/' + simpleDen;
}

function findGCD(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition controls
  let controlY = drawHeight + 15;
  let startX = 20;

  redSlider.position(startX + 80, controlY);
  blueSlider.position(startX + 280, controlY);
  resetButton.position(startX + 420, controlY - 3);
  showCalcCheckbox.position(startX + 500, controlY - 3);

  calculateTree();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth, 800);
    canvasHeight = drawHeight + controlHeight;
  }
}
