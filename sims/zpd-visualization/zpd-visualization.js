// Zone of Proximal Development (ZPD) Visualization MicroSim
// Three concentric circles representing learning zones with scaffolding slider
// Based on Vygotsky's theory of social constructivism

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Circle dimensions
let centerX, centerY;
let maxRadius;
let innerRadius, middleRadius, outerRadius;

// Scaffolding level (0-100) - controls middle zone size
let scaffoldingSlider;
let scaffoldingLevel = 50;

// Zone data
const zones = [
  {
    name: "Can Do Independently",
    color: "#27AE60",
    description: "Skills the learner has already mastered",
    examples: ["Reading familiar words", "Basic arithmetic", "Tying shoelaces"],
    details: "This zone represents what students can accomplish without any assistance. These are well-practiced skills that have been internalized."
  },
  {
    name: "Zone of Proximal Development",
    color: "#F39C12",
    description: "Skills the learner can do with guidance",
    examples: ["Solving complex problems", "Writing essays", "Critical analysis"],
    details: "This is where learning happens! With appropriate scaffolding from a teacher, peer, or MicroSim, learners can accomplish tasks just beyond their current ability."
  },
  {
    name: "Cannot Do Yet",
    color: "#E74C3C",
    description: "Skills beyond current capability",
    examples: ["Advanced calculus (for beginners)", "Professional writing", "Expert analysis"],
    details: "These tasks are too far beyond the learner's current level. Even with help, the cognitive gap is too large for meaningful learning."
  }
];

// MicroSim features mapping
const microsimFeatures = [
  { name: "Immediate Feedback", zone: 0, angle: -45 },
  { name: "Hints & Prompts", zone: 1, angle: 0 },
  { name: "Step-by-Step Guidance", zone: 1, angle: 30 },
  { name: "Adaptive Difficulty", zone: 1, angle: 60 },
  { name: "Visual Scaffolding", zone: 1, angle: 90 },
  { name: "Practice Mode", zone: 0, angle: 180 }
];

// Hover state
let hoveredZone = -1;
let showFeatures = false;

// Mouse tracking
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');
  calculateDimensions();
  createControls();

  describe('Interactive visualization of Vygotsky\'s Zone of Proximal Development showing three concentric zones. Slider adjusts scaffolding level which expands the learning zone.', LABEL);
}

function calculateDimensions() {
  centerX = canvasWidth * 0.4;
  centerY = drawHeight / 2 + 20;
  maxRadius = min(canvasWidth * 0.35, drawHeight * 0.4);
  updateRadii();
}

function updateRadii() {
  // Scaffolding expands the middle zone (ZPD)
  let expansion = map(scaffoldingLevel, 0, 100, 0.15, 0.35);
  innerRadius = maxRadius * 0.3;
  middleRadius = maxRadius * (0.3 + expansion);
  outerRadius = maxRadius;
}

function createControls() {
  // Create slider container
  let sliderContainer = createDiv('');
  sliderContainer.parent(document.querySelector('main'));
  sliderContainer.style('display', 'flex');
  sliderContainer.style('align-items', 'center');
  sliderContainer.style('gap', '10px');
  sliderContainer.style('margin', '10px 0');
  sliderContainer.style('padding', '0 20px');
  sliderContainer.style('font-family', 'Arial, sans-serif');

  // Slider label
  let label = createSpan('Scaffolding Level:');
  label.parent(sliderContainer);
  label.style('font-size', '14px');
  label.style('color', '#333');

  // Scaffolding slider
  scaffoldingSlider = createSlider(0, 100, 50);
  scaffoldingSlider.parent(sliderContainer);
  scaffoldingSlider.style('width', '200px');
  scaffoldingSlider.input(onSliderChange);

  // Value display
  let valueSpan = createSpan('50%');
  valueSpan.parent(sliderContainer);
  valueSpan.id('scaffolding-value');
  valueSpan.style('font-size', '14px');
  valueSpan.style('color', '#333');
  valueSpan.style('min-width', '40px');

  // Features toggle button
  let featuresBtn = createButton('Show MicroSim Features');
  featuresBtn.parent(sliderContainer);
  featuresBtn.style('margin-left', '20px');
  featuresBtn.style('padding', '6px 12px');
  featuresBtn.style('border', '1px solid #3498db');
  featuresBtn.style('border-radius', '4px');
  featuresBtn.style('background', '#3498db');
  featuresBtn.style('color', 'white');
  featuresBtn.style('cursor', 'pointer');
  featuresBtn.style('font-size', '12px');
  featuresBtn.mousePressed(() => {
    showFeatures = !showFeatures;
    featuresBtn.html(showFeatures ? 'Hide MicroSim Features' : 'Show MicroSim Features');
  });
}

function onSliderChange() {
  scaffoldingLevel = scaffoldingSlider.value();
  document.getElementById('scaffolding-value').innerText = scaffoldingLevel + '%';
  updateRadii();
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
  text("Zone of Proximal Development", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Detect hover
  detectHover();

  // Draw the concentric circles
  drawZones();

  // Draw arrow annotation pointing to ZPD
  drawArrowAnnotation();

  // Draw info panel on right
  drawInfoPanel();

  // Draw MicroSim features if enabled
  if (showFeatures) {
    drawMicrosimFeatures();
  }

  // Draw Vygotsky quote at bottom
  drawQuote();
}

function detectHover() {
  let d = dist(mouseX, mouseY, centerX, centerY);
  hoveredZone = -1;

  if (d < innerRadius) {
    hoveredZone = 0; // Inner zone
  } else if (d < middleRadius) {
    hoveredZone = 1; // ZPD
  } else if (d < outerRadius) {
    hoveredZone = 2; // Outer zone
  }
}

function drawZones() {
  // Draw outer zone (Cannot Do Yet) - hatched pattern
  drawHatchedCircle(centerX, centerY, outerRadius * 2, zones[2].color, hoveredZone === 2);

  // Draw middle zone (ZPD) - gradient effect
  drawGradientRing(centerX, centerY, middleRadius, innerRadius, zones[1].color, hoveredZone === 1);

  // Draw inner zone (Can Do Independently) - solid
  if (hoveredZone === 0) {
    fill(color(zones[0].color));
    stroke(50);
    strokeWeight(3);
  } else {
    fill(color(zones[0].color));
    stroke(100);
    strokeWeight(1);
  }
  ellipse(centerX, centerY, innerRadius * 2, innerRadius * 2);

  // Draw zone labels
  drawZoneLabels();
}

function drawHatchedCircle(x, y, diameter, baseColor, isHovered) {
  push();
  let c = color(baseColor);

  // Draw base circle
  if (isHovered) {
    fill(red(c) + 20, green(c) + 20, blue(c) + 20);
    stroke(50);
    strokeWeight(3);
  } else {
    fill(c);
    stroke(100);
    strokeWeight(1);
  }
  ellipse(x, y, diameter, diameter);

  // Draw hatching pattern
  stroke(red(c) - 40, green(c) - 40, blue(c) - 40, 100);
  strokeWeight(1);

  let radius = diameter / 2;
  for (let i = -radius; i < radius; i += 12) {
    let h = sqrt(radius * radius - i * i);
    line(x + i, y - h, x + i, y + h);
  }
  for (let i = -radius; i < radius; i += 12) {
    let w = sqrt(radius * radius - i * i);
    line(x - w, y + i, x + w, y + i);
  }

  pop();
}

function drawGradientRing(x, y, outerR, innerR, baseColor, isHovered) {
  push();
  let c = color(baseColor);

  // Draw ring with gradient effect using multiple ellipses
  noStroke();
  let steps = 20;
  for (let i = 0; i < steps; i++) {
    let t = i / steps;
    let r = lerp(outerR, innerR, t);
    let alpha = lerp(180, 255, t);

    if (isHovered) {
      fill(red(c) + 20, green(c) + 20, blue(c) + 20, alpha);
    } else {
      fill(red(c), green(c), blue(c), alpha);
    }
    ellipse(x, y, r * 2, r * 2);
  }

  // Draw border
  noFill();
  if (isHovered) {
    stroke(50);
    strokeWeight(3);
  } else {
    stroke(100);
    strokeWeight(1);
  }
  ellipse(x, y, outerR * 2, outerR * 2);

  pop();
}

function drawZoneLabels() {
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(255);
  noStroke();

  // Inner zone label
  textStyle(BOLD);
  text("Can Do", centerX, centerY - 10);
  text("Independently", centerX, centerY + 10);

  // ZPD label (curved would be ideal, but simplified here)
  let zpdLabelRadius = (innerRadius + middleRadius) / 2;
  fill(50);
  textSize(11);
  text("Zone of Proximal", centerX, centerY - zpdLabelRadius);
  text("Development", centerX, centerY - zpdLabelRadius + 14);

  // Outer zone label
  let outerLabelRadius = (middleRadius + outerRadius) / 2;
  fill(255);
  textSize(11);
  text("Cannot Do Yet", centerX, centerY - outerLabelRadius);

  textStyle(NORMAL);
}

function drawArrowAnnotation() {
  // Arrow pointing to ZPD zone
  let arrowStartX = centerX + outerRadius + 20;
  let arrowStartY = centerY - 20;
  let arrowEndX = centerX + (innerRadius + middleRadius) / 2;
  let arrowEndY = centerY;

  // Arrow line
  stroke('#2980B9');
  strokeWeight(2);
  line(arrowStartX, arrowStartY, arrowEndX + 10, arrowEndY);

  // Arrowhead
  fill('#2980B9');
  noStroke();
  push();
  translate(arrowEndX + 10, arrowEndY);
  rotate(PI);
  triangle(0, 0, 10, -5, 10, 5);
  pop();

  // Annotation text
  textAlign(LEFT, CENTER);
  textSize(12);
  fill('#2980B9');
  textStyle(ITALIC);
  text("This is where", arrowStartX + 5, arrowStartY - 20);
  text("learning happens!", arrowStartX + 5, arrowStartY - 6);
  textStyle(NORMAL);
}

function drawInfoPanel() {
  let panelLeft = canvasWidth * 0.68;
  let panelTop = 50;
  let panelWidth = canvasWidth * 0.30;
  let panelHeight = drawHeight - 100;

  if (hoveredZone >= 0) {
    let zone = zones[hoveredZone];
    let zoneColor = color(zone.color);

    // Panel background
    fill(255);
    stroke(zoneColor);
    strokeWeight(3);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 10);

    let contentX = panelLeft + 12;
    let contentY = panelTop + 15;
    let lineHeight = 18;

    // Zone name
    fill(zoneColor);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let nameLines = wrapText(zone.name, panelWidth - 24);
    for (let line of nameLines) {
      text(line, contentX, contentY);
      contentY += lineHeight;
    }
    contentY += 8;

    // Description
    textStyle(NORMAL);
    fill(60);
    textSize(11);
    let descLines = wrapText(zone.description, panelWidth - 24);
    for (let line of descLines) {
      text(line, contentX, contentY);
      contentY += lineHeight - 4;
    }
    contentY += 12;

    // Details
    fill(80);
    textSize(10);
    let detailLines = wrapText(zone.details, panelWidth - 24);
    for (let line of detailLines) {
      text(line, contentX, contentY);
      contentY += lineHeight - 4;
    }
    contentY += 12;

    // Examples header
    fill(zoneColor);
    textSize(12);
    textStyle(BOLD);
    text("Examples:", contentX, contentY);
    contentY += lineHeight;

    // Example items
    textStyle(NORMAL);
    fill(80);
    textSize(10);
    for (let example of zone.examples) {
      text("- " + example, contentX, contentY);
      contentY += lineHeight - 4;
    }

  } else {
    // Default instructions
    fill(255);
    stroke(180);
    strokeWeight(2);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 10);

    fill(100);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Hover over a zone\nto see details", panelLeft + panelWidth/2, panelTop + panelHeight/2 - 30);

    textSize(11);
    fill(130);
    text("Adjust the slider\nto change scaffolding\nlevel", panelLeft + panelWidth/2, panelTop + panelHeight/2 + 30);
  }
}

function drawMicrosimFeatures() {
  textSize(9);
  textAlign(CENTER, CENTER);

  for (let feature of microsimFeatures) {
    let radius;
    let zoneColor;

    if (feature.zone === 0) {
      radius = innerRadius * 0.6;
      zoneColor = color(zones[0].color);
    } else {
      radius = (innerRadius + middleRadius) / 2;
      zoneColor = color(zones[1].color);
    }

    let angleRad = radians(feature.angle);
    let fx = centerX + cos(angleRad) * radius;
    let fy = centerY + sin(angleRad) * radius;

    // Feature bubble
    fill(255, 240);
    stroke(zoneColor);
    strokeWeight(1);
    let boxWidth = textWidth(feature.name) + 12;
    rectMode(CENTER);
    rect(fx, fy, boxWidth, 18, 4);
    rectMode(CORNER);

    // Feature text
    fill(50);
    noStroke();
    text(feature.name, fx, fy);
  }
}

function drawQuote() {
  let quoteY = drawHeight - 25;

  fill(80);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(ITALIC);
  text('"What a child can do with assistance today, she will be able to do by herself tomorrow."', canvasWidth / 2, quoteY);

  textStyle(NORMAL);
  textSize(10);
  fill(120);
  text("- Lev Vygotsky", canvasWidth / 2, quoteY + 16);
}

function wrapText(txt, maxWidth) {
  let words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateDimensions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    calculateDimensions();
  }
}
