// Traditional Simulation vs MicroSim Architecture MicroSim
// Side-by-side comparison of monolithic vs modular approaches

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let mouseOverCanvas = false;
let pulsePhase = 0;
let hoveredSide = 0; // 0 = none, 1 = left, 2 = right

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');
  describe('Side-by-side comparison of traditional monolithic simulation architecture versus modular MicroSim architecture, showing advantages of the MicroSim approach.', LABEL);
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

  if (mouseOverCanvas) {
    pulsePhase += 0.03;
  }

  // Title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("Traditional Simulation vs MicroSim Architecture", canvasWidth / 2, 15);

  let midX = canvasWidth / 2;

  // Check hover
  hoveredSide = mouseX < midX ? 1 : 2;
  if (mouseY < 50 || mouseY > drawHeight - 30) hoveredSide = 0;

  // Divider line
  stroke('#ccc');
  strokeWeight(2);
  line(midX, 50, midX, drawHeight - 20);

  // Left side: Traditional
  drawTraditionalSide(margin, 50, midX - margin * 2, drawHeight - 80);

  // Right side: MicroSim
  drawMicroSimSide(midX + margin, 50, midX - margin * 2, drawHeight - 80);

  // Labels at top
  textSize(16);
  textAlign(CENTER, TOP);
  fill('#C62828');
  text("Traditional Simulation", midX / 2, 45);
  fill('#2E7D32');
  text("MicroSim Architecture", midX + midX / 2, 45);

  // Instructions
  fill('#666');
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Hover over each side to see details. Click for more information.", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawTraditionalSide(x, y, w, h) {
  let isHovered = hoveredSide === 1;
  let boxX = x + 20;
  let boxY = y + 40;
  let boxW = w - 40;
  let boxH = h - 100;

  // Main monolithic box
  fill(isHovered ? '#FFCDD2' : '#FFEBEE');
  stroke('#C62828');
  strokeWeight(isHovered ? 3 : 2);
  rect(boxX, boxY, boxW, boxH, 10);

  // Title
  fill('#C62828');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Comprehensive Simulation", boxX + boxW/2, boxY + 10);
  textStyle(NORMAL);

  // Tangled concepts
  let concepts = ['Concept A', 'Concept B', 'Concept C', 'Concept D', 'Concept E'];
  let conceptPositions = [];

  for (let i = 0; i < concepts.length; i++) {
    let cx = boxX + 40 + (i % 2) * (boxW - 80);
    let cy = boxY + 60 + floor(i / 2) * 50;
    conceptPositions.push({x: cx, y: cy});

    fill('#B71C1C');
    noStroke();
    ellipse(cx, cy, 60, 30);

    fill('white');
    textSize(10);
    textAlign(CENTER, CENTER);
    text(concepts[i], cx, cy);
  }

  // Tangled lines between concepts
  stroke('#B71C1C');
  strokeWeight(1);
  for (let i = 0; i < conceptPositions.length; i++) {
    for (let j = i + 1; j < conceptPositions.length; j++) {
      if (random(1) > 0.3) {
        line(conceptPositions[i].x, conceptPositions[i].y,
             conceptPositions[j].x, conceptPositions[j].y);
      }
    }
  }

  // Negative labels
  fill('#C62828');
  textSize(11);
  textAlign(CENTER, TOP);
  let labelY = boxY + boxH + 10;
  text("Months to build", x + w/4, labelY);
  text("Hard to update", x + w/2, labelY);
  text("Fixed scope", x + 3*w/4, labelY);
}

function drawMicroSimSide(x, y, w, h) {
  let isHovered = hoveredSide === 2;

  // Multiple small boxes
  let boxSize = 70;
  let gap = 15;
  let startX = x + (w - (boxSize * 3 + gap * 2)) / 2;
  let startY = y + 60;

  let microsims = [
    {label: 'MicroSim A', color: '#2196F3'},
    {label: 'MicroSim B', color: '#4CAF50'},
    {label: 'MicroSim C', color: '#FF9800'},
    {label: 'MicroSim D', color: '#9C27B0'},
    {label: 'MicroSim E', color: '#00BCD4'}
  ];

  let positions = [
    {x: startX, y: startY},
    {x: startX + boxSize + gap, y: startY},
    {x: startX + 2*(boxSize + gap), y: startY},
    {x: startX + boxSize/2 + gap/2, y: startY + boxSize + gap},
    {x: startX + boxSize*1.5 + gap*1.5, y: startY + boxSize + gap}
  ];

  // Draw boxes with pulse effect
  for (let i = 0; i < microsims.length; i++) {
    let pos = positions[i];
    let pulse = isHovered ? sin(pulsePhase + i * 0.5) * 3 : 0;

    fill(microsims[i].color + '33');
    stroke(microsims[i].color);
    strokeWeight(isHovered ? 3 : 2);
    rect(pos.x - pulse/2, pos.y - pulse/2, boxSize + pulse, boxSize + pulse, 8);

    fill(microsims[i].color);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text(microsims[i].label, pos.x + boxSize/2, pos.y + boxSize/2);
  }

  // Learning pathway manager
  let managerY = startY + 2*(boxSize + gap);
  fill('#E8F5E9');
  stroke('#2E7D32');
  strokeWeight(2);
  rect(x + 30, managerY, w - 60, 40, 8);

  fill('#2E7D32');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Learning Pathway Manager", x + w/2, managerY + 20);

  // Connection arrows
  stroke('#2E7D32');
  strokeWeight(1);
  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];
    line(pos.x + boxSize/2, pos.y + boxSize, pos.x + boxSize/2, managerY);
  }

  // Positive labels
  fill('#2E7D32');
  textSize(11);
  textAlign(CENTER, TOP);
  let labelY = managerY + 50;
  text("Quick to create", x + w/4, labelY);
  text("Easy to update", x + w/2, labelY);
  text("Flexible", x + 3*w/4, labelY);
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
