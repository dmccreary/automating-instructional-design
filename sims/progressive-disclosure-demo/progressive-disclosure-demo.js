// Progressive Disclosure Demonstration MicroSim
// Interactive supply and demand simulation with 5 progressive stages
// Demonstrates how progressive disclosure supports learning

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;

// Current stage (1-5)
let currentStage = 1;
const totalStages = 5;

// Stage titles
const stageTitles = [
  "Stage 1: The Basics",
  "Stage 2: Interactive Exploration",
  "Stage 3: Real-World Factors",
  "Stage 4: Advanced Analysis",
  "Stage 5: Expert Mode"
];

const stageDescriptions = [
  "Learn the fundamentals of supply and demand curves",
  "Explore how prices and quantities interact",
  "Understand what causes market shifts",
  "Analyze consumer and producer surplus",
  "Master multi-market dynamics"
];

// Graph dimensions
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Curve parameters
let supplyIntercept = 20;
let supplySlope = 0.8;
let demandIntercept = 200;
let demandSlope = -0.8;

// Shift amounts
let supplyShift = 0;
let demandShift = 0;

// Dragging state (Stage 2+)
let draggingSupply = false;
let draggingDemand = false;
let dragStartY = 0;
let dragStartShift = 0;

// Shift scenario (Stage 3+)
let shiftScenarios = [
  { name: "Select scenario...", supplyShift: 0, demandShift: 0 },
  { name: "New Technology (Supply+)", supplyShift: 30, demandShift: 0 },
  { name: "Population Growth (Demand+)", supplyShift: 0, demandShift: 40 },
  { name: "Input Costs Rise (Supply-)", supplyShift: -25, demandShift: 0 },
  { name: "Substitute Available (Demand-)", supplyShift: 0, demandShift: -35 },
  { name: "Economic Boom", supplyShift: 20, demandShift: 30 }
];
let selectedScenario = 0;

// Animation state
let animationProgress = 1;
let targetSupplyShift = 0;
let targetDemandShift = 0;
let startSupplyShift = 0;
let startDemandShift = 0;

// Stage 4: Elasticity and surplus
let showSurplus = false;
let elasticityMode = 'normal'; // 'normal', 'elastic', 'inelastic'

// Stage 5: Multi-market
let showSecondMarket = false;
let market2SupplyShift = 0;
let market2DemandShift = 0;

// UI Elements
let prevButton, nextButton;
let stageSelect;
let scenarioSelect;
let showAllToggle;
let elasticitySelect;
let surplusCheckbox;
let secondMarketCheckbox;

// Colors
const supplyColor = '#3498db';
const demandColor = '#e74c3c';
const equilibriumColor = '#27ae60';
const surplusConsumerColor = 'rgba(52, 152, 219, 0.3)';
const surplusProducerColor = 'rgba(231, 76, 60, 0.3)';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  calculateGraphDimensions();
  createControls();

  describe('Progressive disclosure demonstration using supply and demand curves. Navigate through 5 stages to experience how progressive disclosure supports learning.', LABEL);
}

function calculateGraphDimensions() {
  graphLeft = margin + 50;
  graphRight = canvasWidth - margin - 150;
  graphTop = margin + 50;
  graphBottom = drawHeight - margin - 20;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
}

function createControls() {
  let controlContainer = createDiv('');
  controlContainer.parent(document.querySelector('main'));
  controlContainer.style('display', 'flex');
  controlContainer.style('flex-wrap', 'wrap');
  controlContainer.style('align-items', 'center');
  controlContainer.style('gap', '10px');
  controlContainer.style('margin', '10px 0');
  controlContainer.style('padding', '10px 20px');
  controlContainer.style('font-family', 'Arial, sans-serif');
  controlContainer.style('background', '#f5f5f5');
  controlContainer.style('border-radius', '8px');
  controlContainer.id('control-container');

  // Previous button
  prevButton = createButton('Previous Stage');
  prevButton.parent(controlContainer);
  prevButton.style('padding', '8px 16px');
  prevButton.style('border', 'none');
  prevButton.style('border-radius', '4px');
  prevButton.style('background', '#95a5a6');
  prevButton.style('color', 'white');
  prevButton.style('cursor', 'pointer');
  prevButton.style('font-size', '14px');
  prevButton.mousePressed(() => changeStage(-1));

  // Progress dots
  let dotsContainer = createDiv('');
  dotsContainer.parent(controlContainer);
  dotsContainer.style('display', 'flex');
  dotsContainer.style('gap', '8px');
  dotsContainer.style('align-items', 'center');
  dotsContainer.id('progress-dots');

  for (let i = 1; i <= totalStages; i++) {
    let dot = createDiv('');
    dot.parent(dotsContainer);
    dot.style('width', '12px');
    dot.style('height', '12px');
    dot.style('border-radius', '50%');
    dot.style('background', i === 1 ? '#3498db' : '#bdc3c7');
    dot.style('transition', 'background 0.3s');
    dot.id('dot-' + i);
  }

  // Next button
  nextButton = createButton('Next Stage');
  nextButton.parent(controlContainer);
  nextButton.style('padding', '8px 16px');
  nextButton.style('border', 'none');
  nextButton.style('border-radius', '4px');
  nextButton.style('background', '#3498db');
  nextButton.style('color', 'white');
  nextButton.style('cursor', 'pointer');
  nextButton.style('font-size', '14px');
  nextButton.mousePressed(() => changeStage(1));

  // Stage dropdown
  let stageLabel = createSpan('Jump to:');
  stageLabel.parent(controlContainer);
  stageLabel.style('margin-left', '20px');
  stageLabel.style('font-size', '14px');

  stageSelect = createSelect();
  stageSelect.parent(controlContainer);
  for (let i = 1; i <= totalStages; i++) {
    stageSelect.option('Stage ' + i, i);
  }
  stageSelect.changed(() => {
    currentStage = parseInt(stageSelect.value());
    updateStageUI();
  });

  // Show all toggle
  showAllToggle = createCheckbox(' Show all features', false);
  showAllToggle.parent(controlContainer);
  showAllToggle.style('margin-left', '20px');
  showAllToggle.style('font-size', '14px');
  showAllToggle.changed(updateStageUI);

  // Create stage-specific controls container
  let stageControlsContainer = createDiv('');
  stageControlsContainer.parent(document.querySelector('main'));
  stageControlsContainer.id('stage-controls');
  stageControlsContainer.style('display', 'flex');
  stageControlsContainer.style('flex-wrap', 'wrap');
  stageControlsContainer.style('align-items', 'center');
  stageControlsContainer.style('gap', '10px');
  stageControlsContainer.style('margin', '5px 0');
  stageControlsContainer.style('padding', '10px 20px');
  stageControlsContainer.style('font-family', 'Arial, sans-serif');
  stageControlsContainer.style('min-height', '40px');

  // Stage 3: Scenario dropdown
  let scenarioLabel = createSpan('Shift Scenario:');
  scenarioLabel.parent(stageControlsContainer);
  scenarioLabel.id('scenario-label');
  scenarioLabel.style('font-size', '14px');
  scenarioLabel.style('display', 'none');

  scenarioSelect = createSelect();
  scenarioSelect.parent(stageControlsContainer);
  scenarioSelect.id('scenario-select');
  for (let scenario of shiftScenarios) {
    scenarioSelect.option(scenario.name);
  }
  scenarioSelect.style('display', 'none');
  scenarioSelect.changed(applyScenario);

  // Stage 4: Elasticity dropdown
  let elasticityLabel = createSpan('Elasticity:');
  elasticityLabel.parent(stageControlsContainer);
  elasticityLabel.id('elasticity-label');
  elasticityLabel.style('margin-left', '20px');
  elasticityLabel.style('font-size', '14px');
  elasticityLabel.style('display', 'none');

  elasticitySelect = createSelect();
  elasticitySelect.parent(stageControlsContainer);
  elasticitySelect.id('elasticity-select');
  elasticitySelect.option('Normal', 'normal');
  elasticitySelect.option('Elastic', 'elastic');
  elasticitySelect.option('Inelastic', 'inelastic');
  elasticitySelect.style('display', 'none');
  elasticitySelect.changed(() => {
    elasticityMode = elasticitySelect.value();
  });

  // Stage 4: Show surplus checkbox
  surplusCheckbox = createCheckbox(' Show Surplus', false);
  surplusCheckbox.parent(stageControlsContainer);
  surplusCheckbox.id('surplus-checkbox');
  surplusCheckbox.style('margin-left', '20px');
  surplusCheckbox.style('font-size', '14px');
  surplusCheckbox.style('display', 'none');
  surplusCheckbox.changed(() => {
    showSurplus = surplusCheckbox.checked();
  });

  // Stage 5: Second market checkbox
  secondMarketCheckbox = createCheckbox(' Show Related Market', false);
  secondMarketCheckbox.parent(stageControlsContainer);
  secondMarketCheckbox.id('second-market-checkbox');
  secondMarketCheckbox.style('margin-left', '20px');
  secondMarketCheckbox.style('font-size', '14px');
  secondMarketCheckbox.style('display', 'none');
  secondMarketCheckbox.changed(() => {
    showSecondMarket = secondMarketCheckbox.checked();
    calculateGraphDimensions();
  });

  updateStageUI();
}

function changeStage(delta) {
  let newStage = currentStage + delta;
  if (newStage >= 1 && newStage <= totalStages) {
    currentStage = newStage;
    stageSelect.value(currentStage);
    updateStageUI();
  }
}

function updateStageUI() {
  let showAll = showAllToggle.checked();
  let effectiveStage = showAll ? 5 : currentStage;

  // Update progress dots
  for (let i = 1; i <= totalStages; i++) {
    let dot = document.getElementById('dot-' + i);
    if (dot) {
      dot.style.background = i <= currentStage ? '#3498db' : '#bdc3c7';
      dot.style.transform = i === currentStage ? 'scale(1.3)' : 'scale(1)';
    }
  }

  // Update button states
  prevButton.style('background', currentStage > 1 ? '#3498db' : '#95a5a6');
  prevButton.style('cursor', currentStage > 1 ? 'pointer' : 'not-allowed');
  nextButton.style('background', currentStage < totalStages ? '#3498db' : '#95a5a6');
  nextButton.style('cursor', currentStage < totalStages ? 'pointer' : 'not-allowed');

  // Update stage-specific controls visibility
  let scenarioLabelEl = document.getElementById('scenario-label');
  let scenarioSelectEl = document.getElementById('scenario-select');
  let elasticityLabelEl = document.getElementById('elasticity-label');
  let elasticitySelectEl = document.getElementById('elasticity-select');
  let surplusCheckboxEl = document.getElementById('surplus-checkbox');
  let secondMarketCheckboxEl = document.getElementById('second-market-checkbox');

  if (scenarioLabelEl) scenarioLabelEl.style.display = effectiveStage >= 3 ? 'inline' : 'none';
  if (scenarioSelectEl) scenarioSelectEl.style.display = effectiveStage >= 3 ? 'inline' : 'none';
  if (elasticityLabelEl) elasticityLabelEl.style.display = effectiveStage >= 4 ? 'inline' : 'none';
  if (elasticitySelectEl) elasticitySelectEl.style.display = effectiveStage >= 4 ? 'inline' : 'none';
  if (surplusCheckboxEl) surplusCheckboxEl.style.display = effectiveStage >= 4 ? 'inline' : 'none';
  if (secondMarketCheckboxEl) secondMarketCheckboxEl.style.display = effectiveStage >= 5 ? 'inline' : 'none';

  // Reset features if going to earlier stage
  if (!showAll && currentStage < 3) {
    supplyShift = 0;
    demandShift = 0;
    selectedScenario = 0;
    scenarioSelect.selected('Select scenario...');
  }
  if (!showAll && currentStage < 4) {
    showSurplus = false;
    if (surplusCheckbox) surplusCheckbox.checked(false);
    elasticityMode = 'normal';
    if (elasticitySelect) elasticitySelect.selected('Normal');
  }
  if (!showAll && currentStage < 5) {
    showSecondMarket = false;
    if (secondMarketCheckbox) secondMarketCheckbox.checked(false);
  }
}

function applyScenario() {
  selectedScenario = scenarioSelect.elt.selectedIndex;
  let scenario = shiftScenarios[selectedScenario];

  // Start animation
  startSupplyShift = supplyShift;
  startDemandShift = demandShift;
  targetSupplyShift = scenario.supplyShift;
  targetDemandShift = scenario.demandShift;
  animationProgress = 0;
}

function draw() {
  updateCanvasSize();
  background(250);

  let showAll = showAllToggle.checked();
  let effectiveStage = showAll ? 5 : currentStage;

  // Animate curve shifts
  if (animationProgress < 1) {
    animationProgress += 0.05;
    if (animationProgress > 1) animationProgress = 1;
    supplyShift = lerp(startSupplyShift, targetSupplyShift, easeOutCubic(animationProgress));
    demandShift = lerp(startDemandShift, targetDemandShift, easeOutCubic(animationProgress));
  }

  // Draw title and stage info
  drawTitle();

  // Draw axes
  drawAxes();

  // Draw surplus areas (Stage 4+)
  if (effectiveStage >= 4 && showSurplus) {
    drawSurplus();
  }

  // Draw curves
  drawCurves(effectiveStage);

  // Draw equilibrium point
  drawEquilibrium(effectiveStage);

  // Draw curve shifters (Stage 2+)
  if (effectiveStage >= 2) {
    drawCurveShifters();
  }

  // Draw price/quantity readouts (Stage 2+)
  if (effectiveStage >= 2) {
    drawReadouts();
  }

  // Draw elasticity indicators (Stage 4+)
  if (effectiveStage >= 4 && elasticityMode !== 'normal') {
    drawElasticityIndicator();
  }

  // Draw second market (Stage 5)
  if (effectiveStage >= 5 && showSecondMarket) {
    drawSecondMarket();
  }

  // Draw info panel
  drawInfoPanel(effectiveStage);

  // Handle dragging
  handleDragging(effectiveStage);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function drawTitle() {
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(stageTitles[currentStage - 1], canvasWidth / 2, 10);

  textStyle(NORMAL);
  textSize(14);
  fill(100);
  text(stageDescriptions[currentStage - 1], canvasWidth / 2, 35);
}

function drawAxes() {
  stroke(50);
  strokeWeight(2);

  // Y-axis (Price)
  line(graphLeft, graphTop, graphLeft, graphBottom);
  // X-axis (Quantity)
  line(graphLeft, graphBottom, graphRight, graphBottom);

  // Axis labels
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);

  // Y-axis label
  push();
  translate(graphLeft - 40, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  text("Price ($)", 0, 0);
  pop();

  // X-axis label
  text("Quantity", (graphLeft + graphRight) / 2, graphBottom + 25);

  // Draw grid lines and tick marks
  stroke(220);
  strokeWeight(1);
  textSize(10);
  fill(100);

  for (let i = 0; i <= 5; i++) {
    let x = graphLeft + (graphWidth * i / 5);
    let y = graphBottom - (graphHeight * i / 5);

    // Vertical grid
    line(x, graphTop, x, graphBottom);
    // Horizontal grid
    line(graphLeft, y, graphRight, y);

    // X-axis ticks
    noStroke();
    textAlign(CENTER, TOP);
    text(i * 40, x, graphBottom + 5);

    // Y-axis ticks
    textAlign(RIGHT, CENTER);
    text("$" + (i * 40), graphLeft - 8, y);
    stroke(220);
  }
}

function getSupplyY(x) {
  let slope = supplySlope;
  if (elasticityMode === 'elastic') slope = 0.4;
  if (elasticityMode === 'inelastic') slope = 1.5;
  return supplyIntercept + supplyShift + slope * x;
}

function getDemandY(x) {
  let slope = demandSlope;
  if (elasticityMode === 'elastic') slope = -0.4;
  if (elasticityMode === 'inelastic') slope = -1.5;
  return demandIntercept + demandShift + slope * x;
}

function priceToY(price) {
  return graphBottom - (price / 200) * graphHeight;
}

function quantityToX(quantity) {
  return graphLeft + (quantity / 200) * graphWidth;
}

function xToQuantity(x) {
  return ((x - graphLeft) / graphWidth) * 200;
}

function yToPrice(y) {
  return ((graphBottom - y) / graphHeight) * 200;
}

function getEquilibrium() {
  let supplySlp = supplySlope;
  let demandSlp = demandSlope;
  if (elasticityMode === 'elastic') {
    supplySlp = 0.4;
    demandSlp = -0.4;
  }
  if (elasticityMode === 'inelastic') {
    supplySlp = 1.5;
    demandSlp = -1.5;
  }

  let qe = ((demandIntercept + demandShift) - (supplyIntercept + supplyShift)) / (supplySlp - demandSlp);
  let pe = getSupplyY(qe);
  return { quantity: qe, price: pe };
}

function drawCurves(effectiveStage) {
  strokeWeight(3);
  noFill();

  // Supply curve (blue)
  stroke(supplyColor);
  beginShape();
  for (let x = 0; x <= 200; x += 5) {
    let price = getSupplyY(x);
    if (price >= 0 && price <= 200) {
      vertex(quantityToX(x), priceToY(price));
    }
  }
  endShape();

  // Demand curve (red)
  stroke(demandColor);
  beginShape();
  for (let x = 0; x <= 200; x += 5) {
    let price = getDemandY(x);
    if (price >= 0 && price <= 200) {
      vertex(quantityToX(x), priceToY(price));
    }
  }
  endShape();

  // Draw curve labels
  noStroke();
  textSize(14);
  textStyle(BOLD);

  // Supply label
  fill(supplyColor);
  let supplyLabelX = 160;
  let supplyLabelY = getSupplyY(supplyLabelX);
  if (supplyLabelY > 0 && supplyLabelY < 200) {
    text("Supply", quantityToX(supplyLabelX) + 10, priceToY(supplyLabelY) - 10);
  }

  // Demand label
  fill(demandColor);
  let demandLabelX = 30;
  let demandLabelY = getDemandY(demandLabelX);
  if (demandLabelY > 0 && demandLabelY < 200) {
    text("Demand", quantityToX(demandLabelX) + 10, priceToY(demandLabelY) - 10);
  }

  textStyle(NORMAL);
}

function drawEquilibrium(effectiveStage) {
  let eq = getEquilibrium();
  let eqX = quantityToX(eq.quantity);
  let eqY = priceToY(eq.price);

  // Draw dashed lines to axes
  stroke(equilibriumColor);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(eqX, eqY, eqX, graphBottom);
  line(eqX, eqY, graphLeft, eqY);
  drawingContext.setLineDash([]);

  // Draw equilibrium point
  fill(equilibriumColor);
  stroke(255);
  strokeWeight(2);
  ellipse(eqX, eqY, 16, 16);

  // Label
  noStroke();
  fill(50);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text("Equilibrium", eqX + 10, eqY - 5);
}

function drawCurveShifters() {
  let showAll = showAllToggle.checked();
  let effectiveStage = showAll ? 5 : currentStage;
  if (effectiveStage < 2) return;

  // Supply shifter (on the supply curve)
  let supplyHandleX = 100;
  let supplyHandlePrice = getSupplyY(supplyHandleX);
  let supplyHandlePosX = quantityToX(supplyHandleX);
  let supplyHandlePosY = priceToY(supplyHandlePrice);

  // Draw shifter handle
  fill(draggingSupply ? '#2980b9' : supplyColor);
  stroke(255);
  strokeWeight(2);
  ellipse(supplyHandlePosX, supplyHandlePosY, 20, 20);

  // Draw arrows
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text("\u2195", supplyHandlePosX, supplyHandlePosY);

  // Demand shifter
  let demandHandleX = 100;
  let demandHandlePrice = getDemandY(demandHandleX);
  let demandHandlePosX = quantityToX(demandHandleX);
  let demandHandlePosY = priceToY(demandHandlePrice);

  fill(draggingDemand ? '#c0392b' : demandColor);
  stroke(255);
  strokeWeight(2);
  ellipse(demandHandlePosX, demandHandlePosY, 20, 20);

  fill(255);
  noStroke();
  text("\u2195", demandHandlePosX, demandHandlePosY);

  // Instructions
  if (!draggingSupply && !draggingDemand) {
    fill(100);
    textSize(11);
    textAlign(CENTER, TOP);
    text("Drag the circles to shift curves", (graphLeft + graphRight) / 2, graphBottom + 35);
  }
}

function handleDragging(effectiveStage) {
  if (effectiveStage < 2) return;

  let supplyHandleX = 100;
  let supplyHandlePrice = getSupplyY(supplyHandleX);
  let supplyHandlePosX = quantityToX(supplyHandleX);
  let supplyHandlePosY = priceToY(supplyHandlePrice);

  let demandHandleX = 100;
  let demandHandlePrice = getDemandY(demandHandleX);
  let demandHandlePosX = quantityToX(demandHandleX);
  let demandHandlePosY = priceToY(demandHandlePrice);

  if (mouseIsPressed) {
    if (!draggingSupply && !draggingDemand) {
      // Check if starting to drag
      if (dist(mouseX, mouseY, supplyHandlePosX, supplyHandlePosY) < 15) {
        draggingSupply = true;
        dragStartY = mouseY;
        dragStartShift = supplyShift;
      } else if (dist(mouseX, mouseY, demandHandlePosX, demandHandlePosY) < 15) {
        draggingDemand = true;
        dragStartY = mouseY;
        dragStartShift = demandShift;
      }
    }

    // Continue dragging
    if (draggingSupply) {
      let deltaY = dragStartY - mouseY;
      supplyShift = constrain(dragStartShift + deltaY * 0.5, -50, 50);
    } else if (draggingDemand) {
      let deltaY = dragStartY - mouseY;
      demandShift = constrain(dragStartShift + deltaY * 0.5, -50, 50);
    }
  } else {
    draggingSupply = false;
    draggingDemand = false;
  }
}

function drawReadouts() {
  let eq = getEquilibrium();

  let panelX = graphRight + 20;
  let panelY = graphTop + 150;
  let panelWidth = 120;
  let panelHeight = 90;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 5);

  noStroke();
  fill(50);
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Current Values", panelX + 10, panelY + 10);

  textStyle(NORMAL);
  textSize(11);
  fill(80);
  text("Price: $" + eq.price.toFixed(0), panelX + 10, panelY + 35);
  text("Quantity: " + eq.quantity.toFixed(0), panelX + 10, panelY + 55);

  // Show surplus/shortage
  if (supplyShift !== 0 || demandShift !== 0) {
    fill(equilibriumColor);
    text("Market adjusting...", panelX + 10, panelY + 75);
  }
}

function drawSurplus() {
  let eq = getEquilibrium();
  let eqX = quantityToX(eq.quantity);
  let eqY = priceToY(eq.price);

  // Consumer surplus (area above price, below demand curve)
  fill(surplusConsumerColor);
  noStroke();
  beginShape();
  vertex(graphLeft, priceToY(getDemandY(0)));
  for (let x = 0; x <= eq.quantity; x += 5) {
    vertex(quantityToX(x), priceToY(getDemandY(x)));
  }
  vertex(eqX, eqY);
  vertex(graphLeft, eqY);
  endShape(CLOSE);

  // Producer surplus (area below price, above supply curve)
  fill(surplusProducerColor);
  beginShape();
  vertex(graphLeft, priceToY(getSupplyY(0)));
  for (let x = 0; x <= eq.quantity; x += 5) {
    vertex(quantityToX(x), priceToY(getSupplyY(x)));
  }
  vertex(eqX, eqY);
  vertex(graphLeft, eqY);
  endShape(CLOSE);

  // Labels
  fill(supplyColor);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("Consumer", graphLeft + 40, priceToY((getDemandY(0) + eq.price) / 2));
  text("Surplus", graphLeft + 40, priceToY((getDemandY(0) + eq.price) / 2) + 12);

  fill(demandColor);
  text("Producer", graphLeft + 40, priceToY((getSupplyY(0) + eq.price) / 2));
  text("Surplus", graphLeft + 40, priceToY((getSupplyY(0) + eq.price) / 2) + 12);
}

function drawElasticityIndicator() {
  let panelX = graphRight + 20;
  let panelY = graphTop + 250;

  fill(50);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);

  if (elasticityMode === 'elastic') {
    text("Elastic curves:", panelX, panelY);
    text("More responsive", panelX, panelY + 15);
    text("to price changes", panelX, panelY + 28);
  } else if (elasticityMode === 'inelastic') {
    text("Inelastic curves:", panelX, panelY);
    text("Less responsive", panelX, panelY + 15);
    text("to price changes", panelX, panelY + 28);
  }
}

function drawSecondMarket() {
  // Draw a smaller second market in the corner
  let m2Left = graphRight - 140;
  let m2Right = graphRight - 10;
  let m2Top = graphTop + 10;
  let m2Bottom = graphTop + 120;
  let m2Width = m2Right - m2Left;
  let m2Height = m2Bottom - m2Top;

  // Background
  fill(248);
  stroke(180);
  strokeWeight(1);
  rect(m2Left - 5, m2Top - 5, m2Width + 10, m2Height + 30, 5);

  // Title
  fill(50);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text("Related Market", (m2Left + m2Right) / 2, m2Top - 2);

  // Axes
  stroke(100);
  strokeWeight(1);
  line(m2Left, m2Top + 15, m2Left, m2Bottom);
  line(m2Left, m2Bottom, m2Right, m2Bottom);

  // Cross-effect: when main market supply shifts, related market demand shifts
  let crossDemandShift = supplyShift * 0.5;

  // Simple supply curve
  stroke(supplyColor);
  strokeWeight(2);
  line(m2Left + 10, m2Bottom - 10, m2Right - 10, m2Top + 25);

  // Simple demand curve with cross-effect
  stroke(demandColor);
  let demandStart = m2Top + 25 - crossDemandShift * 0.5;
  let demandEnd = m2Bottom - 10 - crossDemandShift * 0.5;
  line(m2Left + 10, constrain(demandStart, m2Top + 15, m2Bottom - 5),
       m2Right - 10, constrain(demandEnd, m2Top + 15, m2Bottom - 5));

  // Note about cross-effects
  fill(80);
  textSize(9);
  textAlign(CENTER, TOP);
  text("(Cross-price effects)", (m2Left + m2Right) / 2, m2Bottom + 8);
}

function drawInfoPanel(effectiveStage) {
  let panelX = graphRight + 20;
  let panelY = graphTop;
  let panelWidth = 130;
  let panelHeight = 140;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 5);

  noStroke();
  fill(50);
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Features Unlocked", panelX + 8, panelY + 10);

  textStyle(NORMAL);
  textSize(10);

  let features = [
    { stage: 1, text: "Basic curves" },
    { stage: 1, text: "Equilibrium point" },
    { stage: 2, text: "Curve shifters" },
    { stage: 2, text: "Value readouts" },
    { stage: 3, text: "Shift scenarios" },
    { stage: 3, text: "Animations" },
    { stage: 4, text: "Surplus areas" },
    { stage: 4, text: "Elasticity modes" },
    { stage: 5, text: "Multi-market view" }
  ];

  let y = panelY + 30;
  for (let feature of features) {
    let isUnlocked = feature.stage <= effectiveStage;
    fill(isUnlocked ? '#27ae60' : '#bdc3c7');
    text(isUnlocked ? '\u2713' : '\u25CB', panelX + 10, y);
    fill(isUnlocked ? 60 : 180);
    text(feature.text, panelX + 25, y);
    y += 13;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateGraphDimensions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    calculateGraphDimensions();
  }
}
