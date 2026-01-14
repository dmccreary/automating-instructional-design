// Cognitive Load Simulator MicroSim
// Interactive tool to experiment with instructional design choices and
// visualize their impact on intrinsic, extraneous, and germane cognitive load
// Based on Cognitive Load Theory (Sweller, 1988)

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Layout proportions
let previewHeight;
let controlPanelY;

// Control elements
let scenarioSelect;
let visualComplexitySlider;
let textDensitySlider;
let elementSeparationSlider;
let decorativeToggle;
let workedExampleToggle;
let priorKnowledgeSlider;

// Control values
let visualComplexity = 5;
let textDensity = 5;
let elementSeparation = 5;
let hasDecorativeElements = false;
let hasWorkedExample = false;
let priorKnowledge = 3; // 1 (novice) to 10 (expert)

// Scenarios
const scenarios = [
  {
    name: "Supply/Demand Curve",
    baseIntrinsic: 6,
    elements: ["price-axis", "quantity-axis", "supply-curve", "demand-curve", "equilibrium-point", "labels"],
    color: "#3498DB"
  },
  {
    name: "Cell Division",
    baseIntrinsic: 7,
    elements: ["cell-membrane", "nucleus", "chromosomes", "spindle-fibers", "stages", "labels"],
    color: "#27AE60"
  },
  {
    name: "Electrical Circuit",
    baseIntrinsic: 5,
    elements: ["battery", "resistor", "wires", "current-flow", "voltage-labels", "ohms-law"],
    color: "#E74C3C"
  }
];

let currentScenario = 0;

// Load calculations
let intrinsicLoad = 0;
let extraneousLoad = 0;
let germaneLoad = 0;
let totalLoad = 0;
const CAPACITY = 10;

// Animation
let warningPulse = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  calculateLayout();
  createControls();
  calculateLoads();

  describe('Interactive cognitive load simulator showing how instructional design choices affect intrinsic, extraneous, and germane cognitive load. Users can adjust visual complexity, text density, element separation, and learner prior knowledge to see their impact on total cognitive load.', LABEL);
}

function calculateLayout() {
  previewHeight = drawHeight * 0.55;
  controlPanelY = previewHeight + 20;
}

function createControls() {
  // Create main control container
  let controlContainer = createDiv('');
  controlContainer.parent(document.querySelector('main'));
  controlContainer.style('display', 'flex');
  controlContainer.style('flex-wrap', 'wrap');
  controlContainer.style('gap', '15px');
  controlContainer.style('padding', '10px 20px');
  controlContainer.style('font-family', 'Arial, sans-serif');
  controlContainer.style('background', '#f5f5f5');
  controlContainer.style('border-radius', '8px');
  controlContainer.style('margin-top', '10px');

  // Scenario dropdown
  let scenarioDiv = createDiv('');
  scenarioDiv.parent(controlContainer);
  scenarioDiv.style('display', 'flex');
  scenarioDiv.style('flex-direction', 'column');
  scenarioDiv.style('gap', '3px');

  let scenarioLabel = createSpan('Select Scenario:');
  scenarioLabel.parent(scenarioDiv);
  scenarioLabel.style('font-size', '12px');
  scenarioLabel.style('color', '#555');

  scenarioSelect = createSelect();
  scenarioSelect.parent(scenarioDiv);
  for (let i = 0; i < scenarios.length; i++) {
    scenarioSelect.option(scenarios[i].name, i);
  }
  scenarioSelect.changed(onScenarioChange);
  scenarioSelect.style('padding', '5px');
  scenarioSelect.style('border-radius', '4px');
  scenarioSelect.style('border', '1px solid #ccc');

  // Visual Complexity slider
  createSliderControl(controlContainer, 'Visual Complexity:', 1, 10, 5, (val) => {
    visualComplexity = val;
    calculateLoads();
  }, 'visual-complexity-value');

  // Text Density slider
  createSliderControl(controlContainer, 'Text Density:', 1, 10, 5, (val) => {
    textDensity = val;
    calculateLoads();
  }, 'text-density-value');

  // Element Separation slider
  createSliderControl(controlContainer, 'Element Separation:', 1, 10, 5, (val) => {
    elementSeparation = val;
    calculateLoads();
  }, 'element-separation-value');

  // Prior Knowledge slider
  createSliderControl(controlContainer, 'Prior Knowledge:', 1, 10, 3, (val) => {
    priorKnowledge = val;
    calculateLoads();
  }, 'prior-knowledge-value', 'Novice', 'Expert');

  // Toggles container
  let toggleContainer = createDiv('');
  toggleContainer.parent(controlContainer);
  toggleContainer.style('display', 'flex');
  toggleContainer.style('flex-direction', 'column');
  toggleContainer.style('gap', '8px');

  // Decorative elements toggle
  decorativeToggle = createCheckbox('Include decorative elements', false);
  decorativeToggle.parent(toggleContainer);
  decorativeToggle.style('font-size', '12px');
  decorativeToggle.changed(() => {
    hasDecorativeElements = decorativeToggle.checked();
    calculateLoads();
  });

  // Worked example toggle
  workedExampleToggle = createCheckbox('Provide worked example', false);
  workedExampleToggle.parent(toggleContainer);
  workedExampleToggle.style('font-size', '12px');
  workedExampleToggle.changed(() => {
    hasWorkedExample = workedExampleToggle.checked();
    calculateLoads();
  });
}

function createSliderControl(parent, labelText, minVal, maxVal, defaultVal, callback, valueId, minLabel, maxLabel) {
  let sliderDiv = createDiv('');
  sliderDiv.parent(parent);
  sliderDiv.style('display', 'flex');
  sliderDiv.style('flex-direction', 'column');
  sliderDiv.style('gap', '3px');

  let label = createSpan(labelText);
  label.parent(sliderDiv);
  label.style('font-size', '12px');
  label.style('color', '#555');

  let sliderRow = createDiv('');
  sliderRow.parent(sliderDiv);
  sliderRow.style('display', 'flex');
  sliderRow.style('align-items', 'center');
  sliderRow.style('gap', '5px');

  if (minLabel) {
    let minSpan = createSpan(minLabel);
    minSpan.parent(sliderRow);
    minSpan.style('font-size', '10px');
    minSpan.style('color', '#888');
  }

  let slider = createSlider(minVal, maxVal, defaultVal);
  slider.parent(sliderRow);
  slider.style('width', '100px');
  slider.input(() => {
    document.getElementById(valueId).innerText = slider.value();
    callback(slider.value());
  });

  if (maxLabel) {
    let maxSpan = createSpan(maxLabel);
    maxSpan.parent(sliderRow);
    maxSpan.style('font-size', '10px');
    maxSpan.style('color', '#888');
  }

  let valueSpan = createSpan(String(defaultVal));
  valueSpan.parent(sliderRow);
  valueSpan.id(valueId);
  valueSpan.style('font-size', '12px');
  valueSpan.style('color', '#333');
  valueSpan.style('min-width', '20px');
  valueSpan.style('text-align', 'center');
  valueSpan.style('font-weight', 'bold');

  return slider;
}

function onScenarioChange() {
  currentScenario = parseInt(scenarioSelect.value());
  calculateLoads();
}

function calculateLoads() {
  let scenario = scenarios[currentScenario];

  // Intrinsic Load: Based on content complexity and prior knowledge
  // Higher prior knowledge = schemas already formed = lower intrinsic load
  let knowledgeReduction = map(priorKnowledge, 1, 10, 0, 0.6);
  intrinsicLoad = scenario.baseIntrinsic * (1 - knowledgeReduction);

  // Extraneous Load: Visual complexity + text density + element separation (split attention)
  let visualExtra = map(visualComplexity, 1, 10, 0.5, 3);
  let textExtra = map(textDensity, 1, 10, 0.5, 2.5);
  let separationExtra = map(elementSeparation, 1, 10, 0.5, 3); // Split attention effect
  let decorativeExtra = hasDecorativeElements ? 1.5 : 0;

  extraneousLoad = visualExtra + textExtra + separationExtra + decorativeExtra;

  // Germane Load: Cognitive resources devoted to learning
  // Higher with worked examples (when intrinsic is manageable)
  // Lower when extraneous is too high
  let baseGermane = 2;
  let workedExampleBonus = hasWorkedExample ? 1.5 : 0;
  let extraneousPenalty = map(extraneousLoad, 0, 10, 0, 2);

  germaneLoad = max(0.5, baseGermane + workedExampleBonus - extraneousPenalty * 0.5);

  // Expert learners can handle more germane processing
  let expertBonus = map(priorKnowledge, 1, 10, 0, 1);
  germaneLoad = germaneLoad + expertBonus;

  // Total load
  totalLoad = intrinsicLoad + extraneousLoad + germaneLoad;
}

function draw() {
  updateCanvasSize();
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Cognitive Load Simulator", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw preview area
  drawPreviewArea();

  // Draw load visualization
  drawLoadVisualization();

  // Update warning pulse
  if (totalLoad > CAPACITY) {
    warningPulse = (warningPulse + 0.05) % TWO_PI;
  }
}

function drawPreviewArea() {
  let previewX = margin;
  let previewY = 45;
  let previewW = canvasWidth - 2 * margin;
  let previewH = previewHeight - 30;

  // Preview container
  fill(255);
  stroke(200);
  strokeWeight(2);
  rect(previewX, previewY, previewW, previewH, 8);

  // Draw scenario-specific preview
  let scenario = scenarios[currentScenario];

  // Draw based on current scenario
  push();
  translate(previewX, previewY);

  // Clip to preview area
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, previewW, previewH);
  drawingContext.clip();

  if (currentScenario === 0) {
    drawSupplyDemandPreview(previewW, previewH);
  } else if (currentScenario === 1) {
    drawCellDivisionPreview(previewW, previewH);
  } else {
    drawCircuitPreview(previewW, previewH);
  }

  drawingContext.restore();
  pop();

  // Learning impaired overlay
  if (totalLoad > CAPACITY) {
    let pulseAlpha = map(sin(warningPulse), -1, 1, 100, 180);
    fill(231, 76, 60, pulseAlpha);
    noStroke();
    rect(previewX, previewY, previewW, previewH, 8);

    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("LEARNING IMPAIRED", previewX + previewW / 2, previewY + previewH / 2 - 15);
    textSize(14);
    textStyle(NORMAL);
    text("Cognitive load exceeds working memory capacity", previewX + previewW / 2, previewY + previewH / 2 + 15);
  }
}

function drawSupplyDemandPreview(w, h) {
  let margin = 50;
  let graphW = w - 2 * margin;
  let graphH = h - 2 * margin;
  let graphX = margin;
  let graphY = margin;

  // Decorative elements if enabled
  if (hasDecorativeElements) {
    // Random dollar signs
    fill(150, 150, 150, 50);
    textSize(30);
    noStroke();
    for (let i = 0; i < 8; i++) {
      text("$", random(w), random(h));
    }
    // Decorative border
    stroke(100, 180, 100, 100);
    strokeWeight(3);
    noFill();
    rect(10, 10, w - 20, h - 20, 10);
  }

  // Calculate element positions based on separation
  let sep = map(elementSeparation, 1, 10, 0, 80);

  // Axes
  stroke(50);
  strokeWeight(2);
  line(graphX - sep / 2, graphY, graphX - sep / 2, graphY + graphH);
  line(graphX, graphY + graphH + sep / 2, graphX + graphW, graphY + graphH + sep / 2);

  // Axis labels with separation
  fill(50);
  noStroke();
  textSize(12 + textDensity * 0.5);
  textAlign(CENTER);

  push();
  translate(graphX - sep / 2 - 25, graphY + graphH / 2);
  rotate(-HALF_PI);
  text("Price ($)", 0, 0);
  pop();

  text("Quantity", graphX + graphW / 2, graphY + graphH + sep / 2 + 25);

  // Curves with visual complexity
  strokeWeight(2 + visualComplexity * 0.3);

  // Supply curve (upward sloping)
  stroke(41, 128, 185);
  noFill();
  beginShape();
  for (let x = 0; x <= graphW; x += 5) {
    let y = graphH - (x / graphW) * graphH * 0.8 - graphH * 0.1;
    if (visualComplexity > 5) {
      y += sin(x * 0.1) * (visualComplexity - 5) * 2;
    }
    vertex(graphX + x, graphY + y);
  }
  endShape();

  // Demand curve (downward sloping)
  stroke(231, 76, 60);
  beginShape();
  for (let x = 0; x <= graphW; x += 5) {
    let y = (x / graphW) * graphH * 0.8 + graphH * 0.1;
    if (visualComplexity > 5) {
      y += cos(x * 0.1) * (visualComplexity - 5) * 2;
    }
    vertex(graphX + x, graphY + y);
  }
  endShape();

  // Equilibrium point
  let eqX = graphX + graphW * 0.45;
  let eqY = graphY + graphH * 0.45;
  fill(46, 204, 113);
  noStroke();
  ellipse(eqX, eqY, 12, 12);

  // Labels with text density
  fill(50);
  textSize(10 + textDensity * 0.3);
  textAlign(LEFT);

  fill(41, 128, 185);
  text("Supply", graphX + graphW - 40 - sep, graphY + 30);

  fill(231, 76, 60);
  text("Demand", graphX + graphW - 50 - sep, graphY + graphH - 30);

  if (textDensity > 5) {
    fill(80);
    textSize(9);
    let extraText = "Market equilibrium occurs where supply equals demand";
    if (textDensity > 7) {
      extraText += ". Price adjusts to clear the market. Surplus causes price decrease.";
    }
    text(extraText, graphX, graphY - 20, graphW, 40);
  }

  // Worked example annotation
  if (hasWorkedExample) {
    fill(255, 255, 200);
    stroke(200, 180, 100);
    strokeWeight(1);
    rect(graphX + graphW - 180, graphY + 50, 170, 80, 5);

    fill(50);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);
    text("Worked Example:", graphX + graphW - 175, graphY + 55);
    textSize(9);
    text("1. Find intersection point", graphX + graphW - 175, graphY + 70);
    text("2. Read equilibrium price", graphX + graphW - 175, graphY + 85);
    text("3. Read equilibrium quantity", graphX + graphW - 175, graphY + 100);
  }
}

function drawCellDivisionPreview(w, h) {
  let centerX = w / 2;
  let centerY = h / 2;
  let cellRadius = min(w, h) * 0.25;

  // Decorative elements
  if (hasDecorativeElements) {
    fill(200, 230, 200, 50);
    noStroke();
    for (let i = 0; i < 12; i++) {
      ellipse(random(w), random(h), random(20, 50), random(20, 50));
    }
    // DNA helix decorations
    stroke(150, 200, 150, 80);
    strokeWeight(2);
    for (let y = 20; y < h - 20; y += 30) {
      let x1 = 20 + sin(y * 0.1) * 10;
      ellipse(x1, y, 8, 8);
      ellipse(w - x1, y, 8, 8);
    }
  }

  let sep = map(elementSeparation, 1, 10, 0, 100);

  // Cell membrane
  stroke(39, 174, 96);
  strokeWeight(3 + visualComplexity * 0.3);
  noFill();
  ellipse(centerX - sep / 4, centerY, cellRadius * 2, cellRadius * 2);

  // Nucleus
  fill(155, 89, 182, 150);
  stroke(142, 68, 173);
  strokeWeight(2);
  ellipse(centerX - sep / 4, centerY, cellRadius * 0.8, cellRadius * 0.8);

  // Chromosomes with visual complexity
  stroke(52, 73, 94);
  strokeWeight(2);
  let numChromosomes = 4 + floor(visualComplexity * 0.5);
  for (let i = 0; i < numChromosomes; i++) {
    let angle = (TWO_PI / numChromosomes) * i;
    let cx = centerX - sep / 4 + cos(angle) * cellRadius * 0.25;
    let cy = centerY + sin(angle) * cellRadius * 0.25;

    // X-shaped chromosome
    push();
    translate(cx, cy);
    rotate(angle);
    line(-8, -8, 8, 8);
    line(-8, 8, 8, -8);
    pop();
  }

  // Spindle fibers
  if (visualComplexity > 4) {
    stroke(200, 150, 50, 100);
    strokeWeight(1);
    for (let i = 0; i < visualComplexity; i++) {
      let angle = (TWO_PI / visualComplexity) * i;
      line(centerX - sep / 4, centerY,
           centerX - sep / 4 + cos(angle) * cellRadius * 1.3,
           centerY + sin(angle) * cellRadius * 1.3);
    }
  }

  // Labels with separation
  fill(50);
  noStroke();
  textSize(11 + textDensity * 0.3);
  textAlign(LEFT);

  // Labels positioned with separation
  text("Cell Membrane", centerX + cellRadius + 10 + sep / 2, centerY - cellRadius / 2);
  text("Nucleus", centerX + cellRadius * 0.5 + sep / 2, centerY);
  text("Chromosomes", centerX + cellRadius * 0.3 + sep / 2, centerY + 40);

  if (textDensity > 5) {
    textSize(9);
    fill(80);
    text("Mitosis: Cell division producing two identical daughter cells", 20, h - 40);
    if (textDensity > 7) {
      text("Stages: Prophase, Metaphase, Anaphase, Telophase, Cytokinesis", 20, h - 25);
    }
  }

  // Worked example
  if (hasWorkedExample) {
    fill(255, 255, 200);
    stroke(200, 180, 100);
    strokeWeight(1);
    rect(10, 10, 160, 90, 5);

    fill(50);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);
    text("Worked Example:", 15, 15);
    textSize(9);
    text("1. Identify cell membrane", 15, 30);
    text("2. Locate nucleus", 15, 45);
    text("3. Count chromosomes", 15, 60);
    text("4. Note spindle formation", 15, 75);
  }
}

function drawCircuitPreview(w, h) {
  let centerY = h / 2;
  let circuitW = w * 0.7;
  let circuitH = h * 0.5;
  let startX = (w - circuitW) / 2;

  // Decorative elements
  if (hasDecorativeElements) {
    // Lightning bolts
    stroke(255, 200, 50, 50);
    strokeWeight(3);
    for (let i = 0; i < 5; i++) {
      let x = random(w);
      let y = random(h);
      line(x, y, x + 10, y + 20);
      line(x + 10, y + 20, x, y + 25);
      line(x, y + 25, x + 10, y + 45);
    }
    // Background grid
    stroke(200, 200, 200, 50);
    strokeWeight(1);
    for (let x = 0; x < w; x += 30) {
      line(x, 0, x, h);
    }
    for (let y = 0; y < h; y += 30) {
      line(0, y, w, y);
    }
  }

  let sep = map(elementSeparation, 1, 10, 0, 60);

  // Wire color based on complexity
  stroke(50);
  strokeWeight(2 + visualComplexity * 0.2);
  noFill();

  // Circuit path
  let topY = centerY - circuitH / 2 - sep / 4;
  let botY = centerY + circuitH / 2 + sep / 4;

  // Top wire
  line(startX, topY, startX + circuitW, topY);
  // Right wire
  line(startX + circuitW, topY, startX + circuitW, botY);
  // Bottom wire
  line(startX + circuitW, botY, startX, botY);
  // Left wire (partial for battery)
  line(startX, botY, startX, centerY + 20);
  line(startX, centerY - 20, startX, topY);

  // Battery
  strokeWeight(3);
  let batteryX = startX - sep / 4;
  line(batteryX - 15, centerY - 15, batteryX + 15, centerY - 15);
  line(batteryX - 8, centerY + 15, batteryX + 8, centerY + 15);

  // Plus/minus
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("+", batteryX - 25, centerY - 15);
  text("-", batteryX - 25, centerY + 15);

  // Resistor (zigzag)
  let resistorX = startX + circuitW / 2 + sep / 4;
  stroke(50);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(resistorX - 40, topY);
  for (let i = 0; i < 6; i++) {
    let rx = resistorX - 30 + i * 12;
    let ry = topY + (i % 2 === 0 ? -10 : 10);
    vertex(rx, ry);
  }
  vertex(resistorX + 40, topY);
  endShape();

  // Current flow arrows
  if (visualComplexity > 3) {
    fill(231, 76, 60);
    noStroke();
    let arrowSize = 8;
    // Top arrow
    push();
    translate(startX + circuitW * 0.3, topY);
    rotate(0);
    triangle(0, -arrowSize/2, 0, arrowSize/2, arrowSize, 0);
    pop();
    // Right arrow
    push();
    translate(startX + circuitW, centerY);
    rotate(HALF_PI);
    triangle(0, -arrowSize/2, 0, arrowSize/2, arrowSize, 0);
    pop();
  }

  // Labels
  fill(50);
  noStroke();
  textSize(10 + textDensity * 0.3);
  textAlign(CENTER);

  text("Battery", batteryX - 30 - sep / 2, centerY + 40);
  text("V = 9V", batteryX - 30 - sep / 2, centerY + 55);

  text("Resistor", resistorX, topY - 25 - sep / 4);
  text("R = 100\u03A9", resistorX, topY - 40 - sep / 4);

  if (textDensity > 5) {
    textSize(9);
    fill(80);
    textAlign(LEFT);
    text("Ohm's Law: V = I \u00D7 R", 20, h - 40);
    if (textDensity > 7) {
      text("Current: I = V/R = 9V/100\u03A9 = 0.09A = 90mA", 20, h - 25);
    }
  }

  // Worked example
  if (hasWorkedExample) {
    fill(255, 255, 200);
    stroke(200, 180, 100);
    strokeWeight(1);
    rect(w - 180, 10, 170, 90, 5);

    fill(50);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);
    text("Worked Example:", w - 175, 15);
    textSize(9);
    text("Given: V = 9V, R = 100\u03A9", w - 175, 30);
    text("Find: Current (I)", w - 175, 45);
    text("Solution: I = V/R", w - 175, 60);
    text("I = 9/100 = 0.09A", w - 175, 75);
  }
}

function drawLoadVisualization() {
  let vizY = previewHeight + 30;
  let vizH = drawHeight - vizY - 20;
  let barStartX = canvasWidth * 0.25;
  let barWidth = canvasWidth * 0.5;
  let barHeight = 25;
  let barGap = 35;

  // Section title
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Cognitive Load Distribution", canvasWidth / 2, vizY);
  textStyle(NORMAL);

  // Draw load bars
  let loads = [
    { name: "Intrinsic Load", value: intrinsicLoad, color: color(52, 152, 219), desc: "Content complexity" },
    { name: "Extraneous Load", value: extraneousLoad, color: color(231, 76, 60), desc: "Poor design" },
    { name: "Germane Load", value: germaneLoad, color: color(46, 204, 113), desc: "Learning effort" }
  ];

  let y = vizY + 30;

  for (let load of loads) {
    // Label
    fill(80);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text(load.name, barStartX - 10, y + barHeight / 2);

    // Background bar
    fill(230);
    noStroke();
    rect(barStartX, y, barWidth, barHeight, 4);

    // Capacity line
    stroke(150);
    strokeWeight(1);
    let capacityX = barStartX + (CAPACITY / 12) * barWidth;
    line(capacityX, y - 2, capacityX, y + barHeight + 2);

    // Load bar
    fill(load.color);
    noStroke();
    let loadWidth = min((load.value / 12) * barWidth, barWidth);
    rect(barStartX, y, loadWidth, barHeight, 4);

    // Value
    fill(50);
    textSize(10);
    textAlign(LEFT, CENTER);
    text(nf(load.value, 1, 1), barStartX + barWidth + 10, y + barHeight / 2);

    // Description
    fill(120);
    textSize(9);
    text("(" + load.desc + ")", barStartX + barWidth + 35, y + barHeight / 2);

    y += barGap;
  }

  // Total load bar
  y += 5;

  // Divider line
  stroke(180);
  strokeWeight(1);
  line(barStartX - 100, y - 10, barStartX + barWidth + 100, y - 10);

  // Total label
  fill(50);
  textSize(12);
  textAlign(RIGHT, CENTER);
  textStyle(BOLD);
  text("TOTAL", barStartX - 10, y + barHeight / 2);
  textStyle(NORMAL);

  // Total background
  fill(240);
  noStroke();
  rect(barStartX, y, barWidth, barHeight, 4);

  // Capacity line and label
  stroke(100);
  strokeWeight(2);
  let capacityLineX = barStartX + (CAPACITY / 12) * barWidth;
  line(capacityLineX, y - 5, capacityLineX, y + barHeight + 5);

  fill(100);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("Capacity", capacityLineX, y - 7);

  // Total bar (segmented by type)
  noStroke();
  let x = barStartX;

  // Intrinsic segment
  fill(52, 152, 219);
  let intrinsicWidth = min((intrinsicLoad / 12) * barWidth, barWidth);
  rect(x, y, intrinsicWidth, barHeight, 4, 0, 0, 4);
  x += intrinsicWidth;

  // Extraneous segment
  if (x < barStartX + barWidth) {
    fill(231, 76, 60);
    let extraneousWidth = min((extraneousLoad / 12) * barWidth, barWidth - (x - barStartX));
    rect(x, y, extraneousWidth, barHeight);
    x += extraneousWidth;
  }

  // Germane segment
  if (x < barStartX + barWidth) {
    fill(46, 204, 113);
    let germaneWidth = min((germaneLoad / 12) * barWidth, barWidth - (x - barStartX));
    rect(x, y, germaneWidth, barHeight, 0, 4, 4, 0);
  }

  // Total value
  fill(50);
  textSize(11);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  let totalText = nf(totalLoad, 1, 1) + " / " + CAPACITY;
  if (totalLoad > CAPACITY) {
    fill(231, 76, 60);
    totalText += " OVERLOAD!";
  }
  text(totalText, barStartX + barWidth + 10, y + barHeight / 2);
  textStyle(NORMAL);

  // Legend
  let legendY = y + barHeight + 15;
  let legendX = barStartX;
  textSize(9);

  for (let load of loads) {
    fill(load.color);
    noStroke();
    rect(legendX, legendY, 12, 12, 2);
    fill(80);
    textAlign(LEFT, CENTER);
    text(load.name, legendX + 16, legendY + 6);
    legendX += 130;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 1000);
    canvasHeight = drawHeight + controlHeight;
    calculateLayout();
  }
}
