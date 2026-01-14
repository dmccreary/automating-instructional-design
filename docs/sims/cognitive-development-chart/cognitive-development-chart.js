// Cognitive Development Progression Chart
// Shows how different cognitive capabilities develop across age ranges

let canvasWidth = 600;
const drawHeight = 400;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = { top: 40, right: 30, bottom: 60, left: 60 };
let chartWidth, chartHeight;

// Colors for different cognitive capabilities
let colors = {
  concrete: null,
  abstract: null,
  metacognition: null,
  workingMemory: null
};

// Cognitive capability data points (age, capability level 0-100)
let capabilities = {
  concrete: {
    name: "Concrete Thinking",
    color: "concrete",
    data: [
      {age: 0, level: 5},
      {age: 2, level: 15},
      {age: 4, level: 35},
      {age: 6, level: 55},
      {age: 8, level: 70},
      {age: 10, level: 82},
      {age: 12, level: 90},
      {age: 14, level: 92},
      {age: 18, level: 93},
      {age: 25, level: 93}
    ],
    description: "Ability to think about tangible, physical objects and events"
  },
  abstract: {
    name: "Abstract Reasoning",
    color: "abstract",
    data: [
      {age: 0, level: 0},
      {age: 6, level: 2},
      {age: 8, level: 5},
      {age: 10, level: 12},
      {age: 11, level: 20},
      {age: 13, level: 35},
      {age: 15, level: 50},
      {age: 18, level: 70},
      {age: 22, level: 85},
      {age: 25, level: 90}
    ],
    description: "Capacity for hypothetical, symbolic, and theoretical thinking"
  },
  metacognition: {
    name: "Metacognition",
    color: "metacognition",
    data: [
      {age: 0, level: 0},
      {age: 4, level: 2},
      {age: 6, level: 5},
      {age: 8, level: 15},
      {age: 10, level: 25},
      {age: 12, level: 38},
      {age: 14, level: 48},
      {age: 16, level: 58},
      {age: 18, level: 68},
      {age: 22, level: 80},
      {age: 25, level: 88}
    ],
    description: "Awareness and understanding of one's own thought processes"
  },
  workingMemory: {
    name: "Working Memory",
    color: "workingMemory",
    data: [
      {age: 0, level: 10},
      {age: 3, level: 20},
      {age: 6, level: 35},
      {age: 9, level: 50},
      {age: 12, level: 62},
      {age: 15, level: 73},
      {age: 18, level: 82},
      {age: 21, level: 90},
      {age: 25, level: 95}
    ],
    description: "Capacity to hold and manipulate information temporarily"
  }
};

// Developmental milestones
let milestones = [
  {age: 2, label: "Language emergence"},
  {age: 7, label: "Concrete operations"},
  {age: 11, label: "Formal operations begin"},
  {age: 18, label: "Prefrontal cortex matures"},
  {age: 25, label: "Full brain maturation"}
];

let hoveredCapability = null;
let showZPD = true;

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth - 20, 900);
  } else {
    canvasWidth = min(windowWidth - 20, 900);
  }
  canvasWidth = max(canvasWidth, 400);
  chartWidth = canvasWidth - margin.left - margin.right;
  chartHeight = drawHeight - margin.top - margin.bottom;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  let container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Initialize colors
  colors.concrete = color(135, 206, 250, 180);      // Light blue
  colors.abstract = color(147, 112, 219, 180);      // Purple
  colors.metacognition = color(255, 165, 0, 180);   // Orange
  colors.workingMemory = color(144, 238, 144, 180); // Light green

  textFont('Arial');
}

function draw() {
  background(255);

  // Draw chart area
  push();
  translate(margin.left, margin.top);

  // Draw grid
  drawGrid();

  // Draw ZPD bands if enabled
  if (showZPD) {
    drawZPDBands();
  }

  // Draw capability areas (bottom to top for layering)
  let capOrder = ['workingMemory', 'metacognition', 'abstract', 'concrete'];
  for (let capKey of capOrder) {
    drawCapabilityArea(capabilities[capKey], capKey === hoveredCapability);
  }

  // Draw milestone markers
  drawMilestones();

  // Draw axes
  drawAxes();

  pop();

  // Draw title
  fill(50);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Cognitive Development Progression", canvasWidth / 2, 10);

  // Draw legend
  drawLegend();

  // Draw control area
  drawControls();

  // Draw tooltip if hovering
  if (hoveredCapability) {
    drawTooltip();
  }
}

function drawGrid() {
  stroke(230);
  strokeWeight(1);

  // Horizontal grid lines
  for (let i = 0; i <= 10; i++) {
    let y = map(i * 10, 0, 100, chartHeight, 0);
    line(0, y, chartWidth, y);
  }

  // Vertical grid lines (every 5 years)
  for (let age = 0; age <= 25; age += 5) {
    let x = map(age, 0, 25, 0, chartWidth);
    line(x, 0, x, chartHeight);
  }
}

function drawAxes() {
  stroke(80);
  strokeWeight(2);

  // Y-axis
  line(0, 0, 0, chartHeight);

  // X-axis
  line(0, chartHeight, chartWidth, chartHeight);

  // Y-axis labels
  fill(60);
  noStroke();
  textSize(10);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 100; i += 20) {
    let y = map(i, 0, 100, chartHeight, 0);
    text(i + "%", -8, y);
  }

  // Y-axis title
  push();
  translate(-45, chartHeight / 2);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Capability Level", 0, 0);
  pop();

  // X-axis labels
  textAlign(CENTER, TOP);
  for (let age = 0; age <= 25; age += 5) {
    let x = map(age, 0, 25, 0, chartWidth);
    text(age, x, chartHeight + 8);
  }

  // X-axis title
  textSize(12);
  text("Age (years)", chartWidth / 2, chartHeight + 25);
}

function drawCapabilityArea(cap, isHovered) {
  let col = colors[cap.color];

  // Draw area
  if (isHovered) {
    fill(red(col), green(col), blue(col), 220);
    strokeWeight(3);
  } else {
    fill(col);
    strokeWeight(1.5);
  }
  stroke(red(col) * 0.7, green(col) * 0.7, blue(col) * 0.7);

  beginShape();
  // Start from bottom left
  vertex(map(cap.data[0].age, 0, 25, 0, chartWidth), chartHeight);

  // Draw curve through data points
  for (let i = 0; i < cap.data.length; i++) {
    let x = map(cap.data[i].age, 0, 25, 0, chartWidth);
    let y = map(cap.data[i].level, 0, 100, chartHeight, 0);

    if (i === 0) {
      vertex(x, y);
    } else {
      // Use curveVertex for smooth curves
      curveVertex(x, y);
    }
  }

  // Add extra point for smooth curve ending
  let lastPoint = cap.data[cap.data.length - 1];
  let lastX = map(lastPoint.age, 0, 25, 0, chartWidth);
  let lastY = map(lastPoint.level, 0, 100, chartHeight, 0);
  curveVertex(lastX, lastY);

  // Close back to bottom
  vertex(lastX, chartHeight);
  endShape(CLOSE);

  // Draw line on top of area for clarity
  noFill();
  stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
  strokeWeight(isHovered ? 3 : 2);
  beginShape();
  for (let point of cap.data) {
    let x = map(point.age, 0, 25, 0, chartWidth);
    let y = map(point.level, 0, 100, chartHeight, 0);
    curveVertex(x, y);
  }
  // Duplicate first and last for curve
  curveVertex(lastX, lastY);
  endShape();
}

function drawZPDBands() {
  // Draw Zone of Proximal Development as a band around curves
  let zpdWidth = 12; // pixels

  for (let capKey in capabilities) {
    let cap = capabilities[capKey];
    let col = colors[cap.color];

    // Draw lighter band above the curve
    noFill();
    stroke(red(col), green(col), blue(col), 60);
    strokeWeight(zpdWidth * 2);

    beginShape();
    for (let point of cap.data) {
      let x = map(point.age, 0, 25, 0, chartWidth);
      let y = map(point.level, 0, 100, chartHeight, 0);
      curveVertex(x, y);
    }
    let lastPoint = cap.data[cap.data.length - 1];
    curveVertex(map(lastPoint.age, 0, 25, 0, chartWidth),
                map(lastPoint.level, 0, 100, chartHeight, 0));
    endShape();
  }
}

function drawMilestones() {
  for (let milestone of milestones) {
    let x = map(milestone.age, 0, 25, 0, chartWidth);

    // Vertical dashed line
    stroke(100, 100, 100, 150);
    strokeWeight(1);
    drawingContext.setLineDash([5, 3]);
    line(x, 0, x, chartHeight);
    drawingContext.setLineDash([]);

    // Milestone marker
    fill(80);
    noStroke();
    triangle(x - 5, -5, x + 5, -5, x, 5);

    // Label (rotated)
    push();
    translate(x, -10);
    rotate(-PI / 4);
    textAlign(LEFT, CENTER);
    textSize(9);
    fill(60);
    text(milestone.label, 5, 0);
    pop();
  }
}

function drawLegend() {
  let legendX = margin.left + 10;
  let legendY = drawHeight - 35;
  let itemWidth = 130;

  textSize(10);
  textAlign(LEFT, CENTER);

  let items = [
    {key: 'concrete', name: 'Concrete Thinking'},
    {key: 'abstract', name: 'Abstract Reasoning'},
    {key: 'metacognition', name: 'Metacognition'},
    {key: 'workingMemory', name: 'Working Memory'}
  ];

  for (let i = 0; i < items.length; i++) {
    let x = legendX + (i * itemWidth);
    let col = colors[items[i].key];

    // Color box
    fill(col);
    stroke(red(col) * 0.7, green(col) * 0.7, blue(col) * 0.7);
    strokeWeight(1);
    rect(x, legendY, 15, 12, 2);

    // Label
    fill(60);
    noStroke();
    text(items[i].name, x + 20, legendY + 6);
  }
}

function drawControls() {
  let controlY = drawHeight + 10;

  // ZPD toggle button
  let btnX = 20;
  let btnWidth = 180;
  let btnHeight = 30;

  // Button background
  if (showZPD) {
    fill(100, 180, 100);
  } else {
    fill(180, 180, 180);
  }
  stroke(80);
  strokeWeight(1);
  rect(btnX, controlY, btnWidth, btnHeight, 5);

  // Button text
  fill(255);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Zone of Proximal Development: " + (showZPD ? "ON" : "OFF"),
       btnX + btnWidth/2, controlY + btnHeight/2);

  // Instructions
  fill(100);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("Hover over colored areas to see details", btnX + btnWidth + 20, controlY + btnHeight/2);
}

function drawTooltip() {
  let cap = capabilities[hoveredCapability];
  let tooltipWidth = 250;
  let tooltipHeight = 60;
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY - tooltipHeight - 10;

  // Keep tooltip on screen
  if (tooltipX + tooltipWidth > canvasWidth) {
    tooltipX = mouseX - tooltipWidth - 15;
  }
  if (tooltipY < 0) {
    tooltipY = mouseY + 15;
  }

  // Background
  fill(40, 40, 40, 230);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);

  // Title
  let col = colors[cap.color];
  fill(red(col), green(col), blue(col));
  textSize(13);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(cap.name, tooltipX + 10, tooltipY + 8);

  // Description
  fill(220);
  textSize(11);
  textStyle(NORMAL);
  text(cap.description, tooltipX + 10, tooltipY + 28, tooltipWidth - 20, 40);
}

function mouseMoved() {
  // Check if mouse is over chart area
  let chartX = mouseX - margin.left;
  let chartY = mouseY - margin.top;

  hoveredCapability = null;

  if (chartX >= 0 && chartX <= chartWidth && chartY >= 0 && chartY <= chartHeight) {
    // Convert mouse position to data coordinates
    let mouseAge = map(chartX, 0, chartWidth, 0, 25);
    let mouseLevel = map(chartY, chartHeight, 0, 0, 100);

    // Check each capability from top to bottom
    let capOrder = ['concrete', 'abstract', 'metacognition', 'workingMemory'];

    for (let capKey of capOrder) {
      let cap = capabilities[capKey];
      let levelAtAge = interpolateLevel(cap.data, mouseAge);

      // Check if mouse is within the area (between 0 and the curve)
      if (mouseLevel <= levelAtAge && mouseLevel >= 0) {
        hoveredCapability = capKey;
        break;
      }
    }
  }
}

function interpolateLevel(data, age) {
  // Find the two data points that bracket this age
  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].age && age <= data[i + 1].age) {
      let t = (age - data[i].age) / (data[i + 1].age - data[i].age);
      return lerp(data[i].level, data[i + 1].level, t);
    }
  }

  // Edge cases
  if (age <= data[0].age) return data[0].level;
  return data[data.length - 1].level;
}

function mousePressed() {
  // Check ZPD toggle button
  let controlY = drawHeight + 10;
  let btnX = 20;
  let btnWidth = 180;
  let btnHeight = 30;

  if (mouseX >= btnX && mouseX <= btnX + btnWidth &&
      mouseY >= controlY && mouseY <= controlY + btnHeight) {
    showZPD = !showZPD;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
