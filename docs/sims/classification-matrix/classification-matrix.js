// Classification Matrix MicroSim
// 2x2 matrix where learners classify items using two criteria

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Grid settings
let gridSize;
let gridX, gridY;
let cellWidth, cellHeight;

// Axis labels
const xAxisLabel = "Impact";
const yAxisLabel = "Complexity";
const xLabels = ["Low", "High"];
const yLabels = ["High", "Low"];

// Quadrant labels and colors
const quadrants = [
  { name: "Quick Wins", color: "#4CAF50", lightColor: "#C8E6C9", row: 1, col: 1 },  // Low Complexity, High Impact
  { name: "Strategic Projects", color: "#2196F3", lightColor: "#BBDEFB", row: 0, col: 1 },  // High Complexity, High Impact
  { name: "Fill-ins", color: "#FFC107", lightColor: "#FFF9C4", row: 1, col: 0 },  // Low Complexity, Low Impact
  { name: "Time Sinks", color: "#F44336", lightColor: "#FFCDD2", row: 0, col: 0 }   // High Complexity, Low Impact
];

// Items to classify
let items = [
  { name: "Update FAQ page", id: 1 },
  { name: "Build new CRM", id: 2 },
  { name: "Fix typos", id: 3 },
  { name: "Redesign homepage", id: 4 },
  { name: "Add contact form", id: 5 },
  { name: "Migrate database", id: 6 },
  { name: "Update colors", id: 7 },
  { name: "AI chatbot", id: 8 }
];

// Item visual properties
let itemWidth = 130;
let itemHeight = 32;

// Dragging state
let draggingItem = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Item positions and placements
let itemPositions = [];
let placedItems = []; // { itemIndex, quadrantIndex, x, y }

// Reset button
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  // Initialize item positions in sidebar
  initializeItemPositions();

  describe('A 2x2 classification matrix where users drag items to classify them by complexity and impact. Quadrants are labeled Quick Wins, Strategic Projects, Fill-ins, and Time Sinks.', LABEL);
}

function draw() {
  updateCanvasSize();
  calculateGridDimensions();

  // Background
  background('#f5f5f5');

  // Draw title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Classification Matrix", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw subtitle
  textSize(12);
  fill('#666');
  text("Drag items to classify by Complexity and Impact", canvasWidth / 2, 35);

  // Draw the 2x2 grid
  drawGrid();

  // Draw axis labels
  drawAxisLabels();

  // Draw quadrant labels and counts
  drawQuadrantInfo();

  // Draw sidebar with unplaced items
  drawSidebar();

  // Draw placed items
  drawPlacedItems();

  // Draw item being dragged (on top)
  if (draggingItem !== null) {
    drawItem(draggingItem, itemPositions[draggingItem].x, itemPositions[draggingItem].y, true);
  }

  // Draw reset button
  drawResetButton();

  // Instructions
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Drag items from the right panel into the appropriate quadrant", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function calculateGridDimensions() {
  // Grid takes up left portion of canvas
  gridSize = min(canvasWidth * 0.55, drawHeight - 120);
  gridX = margin + 50;
  gridY = 60;
  cellWidth = gridSize / 2;
  cellHeight = (drawHeight - 140) / 2;
}

function initializeItemPositions() {
  itemPositions = [];
  placedItems = [];

  for (let i = 0; i < items.length; i++) {
    itemPositions.push({
      x: 0, // Will be set in drawSidebar
      y: 0,
      placed: false,
      quadrant: -1
    });
  }
}

function drawGrid() {
  // Draw grid background
  stroke('#999');
  strokeWeight(2);

  // Draw quadrant backgrounds
  for (let q of quadrants) {
    let x = gridX + q.col * cellWidth;
    let y = gridY + q.row * cellHeight;
    fill(q.lightColor);
    rect(x, y, cellWidth, cellHeight);
  }

  // Draw grid lines
  stroke('#666');
  strokeWeight(2);
  noFill();
  rect(gridX, gridY, cellWidth * 2, cellHeight * 2);
  line(gridX + cellWidth, gridY, gridX + cellWidth, gridY + cellHeight * 2);
  line(gridX, gridY + cellHeight, gridX + cellWidth * 2, gridY + cellHeight);
}

function drawAxisLabels() {
  fill('#333');
  noStroke();
  textSize(14);
  textStyle(BOLD);

  // X-axis label (Impact)
  textAlign(CENTER, TOP);
  text(xAxisLabel, gridX + cellWidth, gridY + cellHeight * 2 + 25);

  // X-axis value labels
  textSize(12);
  textStyle(NORMAL);
  fill('#666');
  text(xLabels[0], gridX + cellWidth / 2, gridY + cellHeight * 2 + 8);
  text(xLabels[1], gridX + cellWidth * 1.5, gridY + cellHeight * 2 + 8);

  // Y-axis label (Complexity)
  push();
  translate(gridX - 35, gridY + cellHeight);
  rotate(-HALF_PI);
  fill('#333');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(yAxisLabel, 0, 0);
  pop();

  // Y-axis value labels
  textSize(12);
  textStyle(NORMAL);
  fill('#666');
  textAlign(RIGHT, CENTER);
  text(yLabels[0], gridX - 8, gridY + cellHeight / 2);
  text(yLabels[1], gridX - 8, gridY + cellHeight * 1.5);
}

function drawQuadrantInfo() {
  noStroke();
  textSize(13);
  textStyle(BOLD);

  for (let q of quadrants) {
    let x = gridX + q.col * cellWidth + cellWidth / 2;
    let y = gridY + q.row * cellHeight + 15;

    // Quadrant name
    fill(q.color);
    textAlign(CENTER, TOP);
    text(q.name, x, y);

    // Item count
    let count = getQuadrantCount(quadrants.indexOf(q));
    textStyle(NORMAL);
    textSize(11);
    fill('#666');
    text("(" + count + " items)", x, y + 18);
    textStyle(BOLD);
    textSize(13);
  }
}

function getQuadrantCount(quadrantIndex) {
  let count = 0;
  for (let p of placedItems) {
    if (p.quadrantIndex === quadrantIndex) count++;
  }
  return count;
}

function drawSidebar() {
  // Sidebar area
  let sidebarX = gridX + cellWidth * 2 + 30;
  let sidebarWidth = canvasWidth - sidebarX - margin;
  let sidebarY = gridY;

  // Sidebar header
  fill('#333');
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Items to Classify", sidebarX + sidebarWidth / 2, sidebarY - 5);
  textStyle(NORMAL);

  // Draw unplaced items
  let itemY = sidebarY + 25;
  let itemX = sidebarX + (sidebarWidth - itemWidth) / 2;

  for (let i = 0; i < items.length; i++) {
    if (!itemPositions[i].placed && draggingItem !== i) {
      itemPositions[i].x = itemX;
      itemPositions[i].y = itemY;
      drawItem(i, itemX, itemY, false);
      itemY += itemHeight + 8;
    }
  }
}

function drawPlacedItems() {
  for (let p of placedItems) {
    if (draggingItem !== p.itemIndex) {
      drawItem(p.itemIndex, p.x, p.y, false);
    }
  }
}

function drawItem(index, x, y, isDragging) {
  let item = items[index];

  // Item background
  if (isDragging) {
    fill(255, 255, 255, 230);
    stroke('#2196F3');
    strokeWeight(3);
  } else {
    fill(255);
    stroke('#999');
    strokeWeight(1);
  }

  rect(x, y, itemWidth, itemHeight, 6);

  // Item text
  fill('#333');
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(item.name, x + itemWidth / 2, y + itemHeight / 2);
}

function drawResetButton() {
  let btnX = canvasWidth - margin - 80;
  let btnY = drawHeight + 10;
  let btnW = 70;
  let btnH = 30;

  // Check hover
  let isHover = mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH;

  // Button background
  fill(isHover ? '#e0e0e0' : '#f0f0f0');
  stroke('#999');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 5);

  // Button text
  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Reset", btnX + btnW / 2, btnY + btnH / 2);

  // Store button bounds for click detection
  resetButton = { x: btnX, y: btnY, w: btnW, h: btnH };
}

function mousePressed() {
  // Check reset button
  if (resetButton &&
      mouseX >= resetButton.x && mouseX <= resetButton.x + resetButton.w &&
      mouseY >= resetButton.y && mouseY <= resetButton.y + resetButton.h) {
    resetItems();
    return;
  }

  // Check if clicking on a placed item
  for (let i = placedItems.length - 1; i >= 0; i--) {
    let p = placedItems[i];
    if (mouseX >= p.x && mouseX <= p.x + itemWidth &&
        mouseY >= p.y && mouseY <= p.y + itemHeight) {
      draggingItem = p.itemIndex;
      dragOffsetX = mouseX - p.x;
      dragOffsetY = mouseY - p.y;
      itemPositions[p.itemIndex].x = p.x;
      itemPositions[p.itemIndex].y = p.y;
      // Remove from placed items
      placedItems.splice(i, 1);
      itemPositions[draggingItem].placed = false;
      return;
    }
  }

  // Check if clicking on an unplaced item
  for (let i = 0; i < items.length; i++) {
    if (!itemPositions[i].placed) {
      let pos = itemPositions[i];
      if (mouseX >= pos.x && mouseX <= pos.x + itemWidth &&
          mouseY >= pos.y && mouseY <= pos.y + itemHeight) {
        draggingItem = i;
        dragOffsetX = mouseX - pos.x;
        dragOffsetY = mouseY - pos.y;
        return;
      }
    }
  }
}

function mouseDragged() {
  if (draggingItem !== null) {
    itemPositions[draggingItem].x = mouseX - dragOffsetX;
    itemPositions[draggingItem].y = mouseY - dragOffsetY;
  }
}

function mouseReleased() {
  if (draggingItem !== null) {
    // Check if dropped on a quadrant
    let quadrantIndex = getQuadrantAtPosition(mouseX, mouseY);

    if (quadrantIndex >= 0) {
      // Place item in quadrant
      let q = quadrants[quadrantIndex];
      let qX = gridX + q.col * cellWidth;
      let qY = gridY + q.row * cellHeight;

      // Position within quadrant (stack items)
      let count = getQuadrantCount(quadrantIndex);
      let offsetX = 10 + (count % 2) * (itemWidth / 2 + 5);
      let offsetY = 40 + Math.floor(count / 2) * (itemHeight + 5);

      // Make sure item fits in quadrant
      if (offsetY + itemHeight > cellHeight - 10) {
        offsetY = 40 + (count % 3) * (itemHeight + 5);
        offsetX = 10 + Math.floor(count / 3) * (itemWidth / 3);
      }

      placedItems.push({
        itemIndex: draggingItem,
        quadrantIndex: quadrantIndex,
        x: qX + offsetX,
        y: qY + offsetY
      });

      itemPositions[draggingItem].placed = true;
      itemPositions[draggingItem].quadrant = quadrantIndex;
    }

    draggingItem = null;
  }
}

function getQuadrantAtPosition(x, y) {
  if (x < gridX || x > gridX + cellWidth * 2 ||
      y < gridY || y > gridY + cellHeight * 2) {
    return -1;
  }

  let col = x < gridX + cellWidth ? 0 : 1;
  let row = y < gridY + cellHeight ? 0 : 1;

  for (let i = 0; i < quadrants.length; i++) {
    if (quadrants[i].row === row && quadrants[i].col === col) {
      return i;
    }
  }
  return -1;
}

function resetItems() {
  placedItems = [];
  for (let i = 0; i < itemPositions.length; i++) {
    itemPositions[i].placed = false;
    itemPositions[i].quadrant = -1;
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
