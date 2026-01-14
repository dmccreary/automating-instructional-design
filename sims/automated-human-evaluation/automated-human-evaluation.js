// Automated vs Human Evaluation MicroSim
// 2x2 matrix showing evaluation criteria suitable for automation vs human judgment

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Grid settings
let gridX, gridY, gridWidth, gridHeight;
let cellWidth, cellHeight;

// Axis labels
const xAxisLabel = "Evaluation Type";
const yAxisLabel = "Criteria Type";
const xLabels = ["Automated", "Human"];
const yLabels = ["Subjective", "Objective"];

// Quadrant data
const quadrants = [
  {
    name: "Fully Automated",
    color: "#4CAF50",
    lightColor: "#C8E6C9",
    row: 1, col: 0,
    icon: "robot",
    criteria: [
      { name: "File existence checks", desc: "Verify that required files and assets are present in the project structure" },
      { name: "Code syntax validation", desc: "Parse code to check for syntax errors before execution" },
      { name: "Responsive breakpoint testing", desc: "Automatically test layouts at different viewport sizes" },
      { name: "Accessibility checkers", desc: "Automated tools for contrast ratios, alt text, ARIA labels" },
      { name: "Link validation", desc: "Crawl and verify all internal and external links work" }
    ]
  },
  {
    name: "Human-Assisted Automation",
    color: "#2196F3",
    lightColor: "#BBDEFB",
    row: 1, col: 1,
    icon: "hybrid-h",
    criteria: [
      { name: "Quality score calculation", desc: "Automated metrics combined with human-defined thresholds" },
      { name: "Pattern matching", desc: "Match against standards with human verification of edge cases" },
      { name: "Automated testing + review", desc: "Run automated tests then have humans review results" }
    ]
  },
  {
    name: "Automation-Assisted Human",
    color: "#FFC107",
    lightColor: "#FFF9C4",
    row: 0, col: 0,
    icon: "hybrid-a",
    criteria: [
      { name: "Code review + linting", desc: "Linting suggestions help humans focus on logic and design" },
      { name: "A11y audit + verification", desc: "Automated scan identifies issues for manual verification" },
      { name: "Performance profiling", desc: "Tools gather data, humans interpret significance" }
    ]
  },
  {
    name: "Fully Human",
    color: "#FF5722",
    lightColor: "#FFCCBC",
    row: 0, col: 1,
    icon: "human",
    criteria: [
      { name: "Pedagogical effectiveness", desc: "Assessing whether content actually teaches the intended concepts" },
      { name: "User experience intuition", desc: "Evaluating flow, feel, and emotional response to design" },
      { name: "Learning objective alignment", desc: "Judging if activities truly support stated learning goals" },
      { name: "Engagement quality", desc: "Measuring genuine interest and motivation levels" },
      { name: "Cultural appropriateness", desc: "Ensuring content respects diverse backgrounds and contexts" }
    ]
  }
];

// Hover state
let hoveredQuadrant = -1;
let hoveredCriteria = -1;
let hoveredCriteriaIndex = -1;

// Selected quadrant for detail view
let selectedQuadrant = -1;

// Workflow toggle
let showWorkflow = false;
let workflowButton = null;

// Tooltip
let tooltipText = "";
let tooltipX = 0;
let tooltipY = 0;
let showTooltip = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  describe('A 2x2 matrix showing evaluation criteria suitable for automation versus human judgment. Quadrants are Fully Automated, Human-Assisted Automation, Automation-Assisted Human, and Fully Human.', LABEL);
}

function draw() {
  updateCanvasSize();
  calculateGridDimensions();

  // Background
  background('#f5f5f5');

  // Draw title
  fill('#333');
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Automated vs Human Evaluation Matrix", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw subtitle
  textSize(11);
  fill('#666');
  text("Hover over criteria for details. Click quadrants for examples.", canvasWidth / 2, 30);

  // Update hover state
  updateHoverState();

  // Draw the 2x2 grid
  drawGrid();

  // Draw axis labels
  drawAxisLabels();

  // Draw quadrant content
  drawQuadrantContent();

  // Draw workflow arrows if enabled
  if (showWorkflow) {
    drawWorkflowArrows();
  }

  // Draw control area
  drawControls();

  // Draw tooltip
  if (showTooltip && tooltipText.length > 0) {
    drawTooltip();
  }
}

function calculateGridDimensions() {
  gridWidth = canvasWidth - margin * 2 - 60;
  gridHeight = drawHeight - 90;
  gridX = margin + 50;
  gridY = 48;
  cellWidth = gridWidth / 2;
  cellHeight = gridHeight / 2;
}

function updateHoverState() {
  hoveredQuadrant = -1;
  hoveredCriteria = -1;
  hoveredCriteriaIndex = -1;
  showTooltip = false;

  // Check if mouse is in grid area
  if (mouseX >= gridX && mouseX <= gridX + gridWidth &&
      mouseY >= gridY && mouseY <= gridY + gridHeight) {

    let col = mouseX < gridX + cellWidth ? 0 : 1;
    let row = mouseY < gridY + cellHeight ? 0 : 1;

    for (let i = 0; i < quadrants.length; i++) {
      if (quadrants[i].row === row && quadrants[i].col === col) {
        hoveredQuadrant = i;

        // Check if hovering over a specific criteria
        let q = quadrants[i];
        let qX = gridX + q.col * cellWidth;
        let qY = gridY + q.row * cellHeight;
        let startY = qY + 38;
        let lineHeight = 16;

        for (let j = 0; j < q.criteria.length; j++) {
          let criteriaY = startY + j * lineHeight;
          if (mouseY >= criteriaY - 2 && mouseY <= criteriaY + lineHeight - 2 &&
              mouseX >= qX + 10 && mouseX <= qX + cellWidth - 10) {
            hoveredCriteria = i;
            hoveredCriteriaIndex = j;
            tooltipText = q.criteria[j].desc;
            tooltipX = mouseX;
            tooltipY = mouseY;
            showTooltip = true;
            break;
          }
        }
        break;
      }
    }
  }
}

function drawGrid() {
  // Draw quadrant backgrounds
  for (let i = 0; i < quadrants.length; i++) {
    let q = quadrants[i];
    let x = gridX + q.col * cellWidth;
    let y = gridY + q.row * cellHeight;

    // Background with hover effect
    if (hoveredQuadrant === i || selectedQuadrant === i) {
      fill(q.color + '40');
    } else {
      fill(q.lightColor);
    }

    stroke('#999');
    strokeWeight(1);
    rect(x, y, cellWidth, cellHeight);
  }

  // Draw grid lines
  stroke('#666');
  strokeWeight(2);
  noFill();
  rect(gridX, gridY, gridWidth, gridHeight);
  line(gridX + cellWidth, gridY, gridX + cellWidth, gridY + gridHeight);
  line(gridX, gridY + cellHeight, gridX + gridWidth, gridY + cellHeight);
}

function drawAxisLabels() {
  fill('#333');
  textSize(12);
  textStyle(BOLD);

  // X-axis label (Evaluation Type)
  textAlign(CENTER, TOP);
  text(xAxisLabel, gridX + cellWidth, gridY + gridHeight + 22);

  // X-axis value labels
  textSize(11);
  textStyle(NORMAL);
  fill('#666');
  text(xLabels[0], gridX + cellWidth / 2, gridY + gridHeight + 6);
  text(xLabels[1], gridX + cellWidth * 1.5, gridY + gridHeight + 6);

  // Arrows for x-axis
  stroke('#666');
  strokeWeight(1);
  let arrowY = gridY + gridHeight + 26;
  line(gridX + cellWidth - 80, arrowY, gridX + cellWidth + 80, arrowY);
  // Left arrow
  line(gridX + cellWidth - 80, arrowY, gridX + cellWidth - 72, arrowY - 4);
  line(gridX + cellWidth - 80, arrowY, gridX + cellWidth - 72, arrowY + 4);
  // Right arrow
  line(gridX + cellWidth + 80, arrowY, gridX + cellWidth + 72, arrowY - 4);
  line(gridX + cellWidth + 80, arrowY, gridX + cellWidth + 72, arrowY + 4);

  // Y-axis label (Criteria Type)
  push();
  translate(gridX - 32, gridY + cellHeight);
  rotate(-HALF_PI);
  fill('#333');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(yAxisLabel, 0, 0);
  pop();

  // Y-axis value labels
  textSize(11);
  textStyle(NORMAL);
  fill('#666');
  textAlign(RIGHT, CENTER);
  text(yLabels[0], gridX - 6, gridY + cellHeight / 2);
  text(yLabels[1], gridX - 6, gridY + cellHeight * 1.5);

  // Arrows for y-axis
  stroke('#666');
  strokeWeight(1);
  let arrowX = gridX - 38;
  line(arrowX, gridY + cellHeight - 60, arrowX, gridY + cellHeight + 60);
  // Top arrow
  line(arrowX, gridY + cellHeight - 60, arrowX - 4, gridY + cellHeight - 52);
  line(arrowX, gridY + cellHeight - 60, arrowX + 4, gridY + cellHeight - 52);
  // Bottom arrow
  line(arrowX, gridY + cellHeight + 60, arrowX - 4, gridY + cellHeight + 52);
  line(arrowX, gridY + cellHeight + 60, arrowX + 4, gridY + cellHeight + 52);
}

function drawQuadrantContent() {
  for (let i = 0; i < quadrants.length; i++) {
    let q = quadrants[i];
    let x = gridX + q.col * cellWidth;
    let y = gridY + q.row * cellHeight;

    // Draw icon
    drawIcon(q.icon, x + 12, y + 12, q.color);

    // Quadrant name
    fill(q.color);
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(q.name, x + 32, y + 10);

    // Draw criteria list
    textStyle(NORMAL);
    textSize(10);
    let startY = y + 38;
    let lineHeight = 16;

    for (let j = 0; j < q.criteria.length; j++) {
      let criteriaY = startY + j * lineHeight;

      // Highlight hovered criteria
      if (hoveredCriteria === i && hoveredCriteriaIndex === j) {
        fill(q.color + '30');
        noStroke();
        rect(x + 8, criteriaY - 2, cellWidth - 16, lineHeight, 3);
        fill(q.color);
        textStyle(BOLD);
      } else {
        fill('#444');
        textStyle(NORMAL);
      }

      // Bullet point
      text("\u2022 " + q.criteria[j].name, x + 12, criteriaY);
    }
  }
}

function drawIcon(type, x, y, color) {
  push();
  translate(x, y);

  if (type === "robot") {
    // Robot/gear icon for fully automated
    fill(color);
    noStroke();
    ellipse(8, 8, 14, 14);
    fill('#fff');
    rect(4, 5, 3, 3, 1);
    rect(9, 5, 3, 3, 1);
    rect(5, 10, 6, 2, 1);
  } else if (type === "human") {
    // Human figure icon
    fill(color);
    noStroke();
    ellipse(8, 5, 8, 8);
    rect(4, 10, 8, 6, 2);
  } else if (type === "hybrid-h") {
    // Hybrid icon - human primary
    fill(color);
    noStroke();
    ellipse(10, 8, 12, 12);
    fill('#fff');
    textSize(9);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("H+", 10, 8);
  } else if (type === "hybrid-a") {
    // Hybrid icon - automation primary
    fill(color);
    noStroke();
    ellipse(10, 8, 12, 12);
    fill('#fff');
    textSize(9);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("A+", 10, 8);
  }

  pop();
}

function drawWorkflowArrows() {
  // Draw arrows showing typical workflow from automated to human
  stroke('#666');
  strokeWeight(2);

  let arrow1StartX = gridX + cellWidth / 2;
  let arrow1StartY = gridY + cellHeight * 1.5;
  let arrow1EndX = gridX + cellWidth * 1.5;
  let arrow1EndY = gridY + cellHeight * 1.5;

  // Arrow 1: Fully Automated -> Human-Assisted
  drawArrow(arrow1StartX + 60, arrow1StartY, arrow1EndX - 60, arrow1EndY, '#4CAF50');

  // Arrow 2: Human-Assisted -> Fully Human (diagonal)
  let arrow2StartX = gridX + cellWidth * 1.5;
  let arrow2StartY = gridY + cellHeight * 1.2;
  let arrow2EndX = gridX + cellWidth * 1.5;
  let arrow2EndY = gridY + cellHeight * 0.8;
  drawArrow(arrow2StartX, arrow2StartY, arrow2EndX, arrow2EndY, '#2196F3');

  // Arrow 3: Automation-Assisted -> Fully Human
  let arrow3StartX = gridX + cellWidth / 2 + 60;
  let arrow3StartY = gridY + cellHeight / 2;
  let arrow3EndX = gridX + cellWidth * 1.5 - 60;
  let arrow3EndY = gridY + cellHeight / 2;
  drawArrow(arrow3StartX, arrow3StartY, arrow3EndX, arrow3EndY, '#FFC107');

  // Workflow label
  fill('#666');
  noStroke();
  textSize(10);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text("Workflow Direction", gridX + cellWidth, gridY - 2);
}

function drawArrow(x1, y1, x2, y2, color) {
  stroke(color);
  strokeWeight(3);
  line(x1, y1, x2, y2);

  // Arrow head
  let angle = atan2(y2 - y1, x2 - x1);
  let headLen = 10;

  line(x2, y2, x2 - headLen * cos(angle - PI / 6), y2 - headLen * sin(angle - PI / 6));
  line(x2, y2, x2 - headLen * cos(angle + PI / 6), y2 - headLen * sin(angle + PI / 6));
}

function drawControls() {
  // Control area background
  fill('#e8e8e8');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Workflow toggle button
  let btnX = canvasWidth / 2 - 80;
  let btnY = drawHeight + 10;
  let btnW = 160;
  let btnH = 30;

  let isHover = mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH;

  fill(showWorkflow ? '#4CAF50' : (isHover ? '#ddd' : '#fff'));
  stroke('#999');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 5);

  fill(showWorkflow ? '#fff' : '#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(showWorkflow ? "Hide Workflow" : "Show Workflow", btnX + btnW / 2, btnY + btnH / 2);

  workflowButton = { x: btnX, y: btnY, w: btnW, h: btnH };

  // Instructions
  fill('#666');
  textSize(10);
  textAlign(LEFT, CENTER);
  text("Click to toggle workflow arrows", margin, drawHeight + controlHeight / 2);
}

function drawTooltip() {
  // Calculate tooltip dimensions
  textSize(11);
  let padding = 10;
  let maxWidth = 250;

  // Word wrap the text
  let words = tooltipText.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > maxWidth - padding * 2) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let tooltipWidth = maxWidth;
  let tooltipHeight = lines.length * 16 + padding * 2;

  // Position tooltip to avoid going off screen
  let tx = tooltipX + 15;
  let ty = tooltipY + 15;

  if (tx + tooltipWidth > canvasWidth - margin) {
    tx = tooltipX - tooltipWidth - 15;
  }
  if (ty + tooltipHeight > drawHeight) {
    ty = tooltipY - tooltipHeight - 15;
  }

  // Draw tooltip background
  fill(255, 255, 255, 245);
  stroke('#333');
  strokeWeight(1);
  rect(tx, ty, tooltipWidth, tooltipHeight, 5);

  // Draw tooltip text
  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], tx + padding, ty + padding + i * 16);
  }
}

function mousePressed() {
  // Check workflow button
  if (workflowButton &&
      mouseX >= workflowButton.x && mouseX <= workflowButton.x + workflowButton.w &&
      mouseY >= workflowButton.y && mouseY <= workflowButton.y + workflowButton.h) {
    showWorkflow = !showWorkflow;
    return;
  }

  // Check quadrant click
  if (hoveredQuadrant >= 0) {
    selectedQuadrant = selectedQuadrant === hoveredQuadrant ? -1 : hoveredQuadrant;
  }
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
