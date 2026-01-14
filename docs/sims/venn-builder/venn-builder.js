// Venn Builder MicroSim
// Interactive Venn diagram where learners place items in appropriate regions

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Venn diagram settings
let circleRadius = 120;
let circleA, circleB;
let overlap = 80; // How much circles overlap

// Draggable items
let items = [];
let draggedItem = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Item definitions with correct regions
// Regions: 'A' (left only), 'B' (right only), 'AB' (intersection), 'neither'
const itemDefinitions = [
  { text: "Has wheels", correctRegion: "A", description: "Cars have wheels but boats don't" },
  { text: "Floats on water", correctRegion: "B", description: "Boats float, most cars don't" },
  { text: "Transports people", correctRegion: "AB", description: "Both cars and boats transport people" },
  { text: "Uses fuel", correctRegion: "AB", description: "Both can use fuel for propulsion" },
  { text: "Has a steering wheel", correctRegion: "AB", description: "Both typically have steering controls" },
  { text: "Travels on roads", correctRegion: "A", description: "Cars travel on roads, boats don't" },
  { text: "Has an anchor", correctRegion: "B", description: "Boats have anchors, cars don't" },
  { text: "Can fly", correctRegion: "neither", description: "Neither standard cars nor boats can fly" },
  { text: "Needs a license", correctRegion: "AB", description: "Both require licenses to operate" },
  { text: "Has sails", correctRegion: "B", description: "Some boats have sails, cars don't" }
];

// Scoring
let score = 0;
let totalPlaced = 0;
let showFeedback = false;
let feedbackMessage = "";
let feedbackColor;
let feedbackTimer = 0;

// Animation
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  initializeItems();
  calculateCircleCenters();

  describe('Interactive Venn diagram where learners drag items to the correct regions. Set A represents Cars, Set B represents Boats. Items belong to A only, B only, both (intersection), or neither.', LABEL);
}

function draw() {
  updateCanvasSize();
  calculateCircleCenters();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("Venn Diagram Builder: Cars vs Boats", canvasWidth / 2, 10);

  // Draw Venn diagram
  drawVennDiagram();

  // Draw "Neither" zone
  drawNeitherZone();

  // Draw items panel
  drawItemsPanel();

  // Draw draggable items
  for (let item of items) {
    if (item !== draggedItem) {
      drawItem(item);
    }
  }

  // Draw dragged item last (on top)
  if (draggedItem) {
    drawItem(draggedItem);
  }

  // Draw feedback
  if (showFeedback) {
    drawFeedback();
    feedbackTimer--;
    if (feedbackTimer <= 0) {
      showFeedback = false;
    }
  }

  // Draw score and instructions
  drawControls();
}

function calculateCircleCenters() {
  let centerX = canvasWidth / 2;
  let centerY = 220;
  circleA = { x: centerX - overlap / 2, y: centerY };
  circleB = { x: centerX + overlap / 2, y: centerY };
}

function initializeItems() {
  items = [];
  let startX = canvasWidth - 170;
  let startY = 80;

  for (let i = 0; i < itemDefinitions.length; i++) {
    items.push({
      text: itemDefinitions[i].text,
      correctRegion: itemDefinitions[i].correctRegion,
      description: itemDefinitions[i].description,
      x: startX,
      y: startY + i * 35,
      originalX: startX,
      originalY: startY + i * 35,
      width: 150,
      height: 30,
      placed: false,
      correct: null
    });
  }

  score = 0;
  totalPlaced = 0;
}

function drawVennDiagram() {
  // Draw circles with transparency
  noStroke();

  // Circle A (Cars) - Blue
  fill(66, 133, 244, 100);
  ellipse(circleA.x, circleA.y, circleRadius * 2, circleRadius * 2);

  // Circle B (Boats) - Green
  fill(52, 168, 83, 100);
  ellipse(circleB.x, circleB.y, circleRadius * 2, circleRadius * 2);

  // Circle outlines
  noFill();
  stroke(66, 133, 244);
  strokeWeight(3);
  ellipse(circleA.x, circleA.y, circleRadius * 2, circleRadius * 2);

  stroke(52, 168, 83);
  ellipse(circleB.x, circleB.y, circleRadius * 2, circleRadius * 2);

  // Labels
  fill('#1a73e8');
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Cars", circleA.x - 60, circleA.y - circleRadius - 20);

  fill('#137333');
  text("Boats", circleB.x + 60, circleB.y - circleRadius - 20);

  // Region labels (subtle)
  textStyle(NORMAL);
  textSize(11);
  fill('#666');
  text("A only", circleA.x - 55, circleA.y + circleRadius + 15);
  text("Both", (circleA.x + circleB.x) / 2, circleA.y + circleRadius + 15);
  text("B only", circleB.x + 55, circleB.y + circleRadius + 15);
}

function drawNeitherZone() {
  let zoneX = 30;
  let zoneY = 370;
  let zoneWidth = 150;
  let zoneHeight = 60;

  fill(200, 200, 200, 80);
  stroke('#888');
  strokeWeight(2);
  rect(zoneX, zoneY, zoneWidth, zoneHeight, 8);

  fill('#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Neither", zoneX + zoneWidth / 2, zoneY + zoneHeight / 2);
}

function drawItemsPanel() {
  let panelX = canvasWidth - 190;
  let panelY = 50;
  let panelWidth = 175;
  let panelHeight = 380;

  fill(255, 255, 255, 200);
  stroke('#ccc');
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  fill('#333');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Drag items to the", panelX + panelWidth / 2, panelY + 8);
  text("correct region", panelX + panelWidth / 2, panelY + 24);
  textStyle(NORMAL);
}

function drawItem(item) {
  let isHovered = isMouseOverItem(item) && !draggedItem;
  let isDragging = item === draggedItem;

  // Update item positions for items in the panel
  if (!item.placed && item !== draggedItem) {
    item.x = canvasWidth - 170;
  }

  // Background color based on state
  if (item.placed) {
    if (item.correct === true) {
      fill('#c8e6c9'); // Light green
      stroke('#4caf50');
    } else if (item.correct === false) {
      fill('#ffcdd2'); // Light red
      stroke('#f44336');
    } else {
      fill('#fff9c4'); // Light yellow (not yet checked)
      stroke('#ffc107');
    }
  } else if (isDragging) {
    fill('#e3f2fd');
    stroke('#2196f3');
  } else if (isHovered) {
    fill('#f5f5f5');
    stroke('#666');
  } else {
    fill('#ffffff');
    stroke('#ccc');
  }

  strokeWeight(isDragging ? 2 : 1);
  rect(item.x, item.y, item.width, item.height, 5);

  // Text
  fill('#333');
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text(item.text, item.x + item.width / 2, item.y + item.height / 2);
}

function drawFeedback() {
  fill(feedbackColor);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(feedbackMessage, canvasWidth / 2 - 100, drawHeight - 30);
  textStyle(NORMAL);
}

function drawControls() {
  // Score display
  fill('#333');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text(`Score: ${score} / ${totalPlaced}`, 20, drawHeight + controlHeight / 2);

  // Reset button
  let btnX = canvasWidth - 100;
  let btnY = drawHeight + 10;
  let btnWidth = 80;
  let btnHeight = 30;

  let isOverBtn = mouseX >= btnX && mouseX <= btnX + btnWidth &&
                  mouseY >= btnY && mouseY <= btnY + btnHeight;

  fill(isOverBtn ? '#1976d2' : '#2196f3');
  noStroke();
  rect(btnX, btnY, btnWidth, btnHeight, 5);

  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Reset", btnX + btnWidth / 2, btnY + btnHeight / 2);

  // Instructions
  fill('#666');
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Drag items to the correct Venn diagram region", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function isMouseOverItem(item) {
  return mouseX >= item.x && mouseX <= item.x + item.width &&
         mouseY >= item.y && mouseY <= item.y + item.height;
}

function mousePressed() {
  // Check reset button
  let btnX = canvasWidth - 100;
  let btnY = drawHeight + 10;
  let btnWidth = 80;
  let btnHeight = 30;

  if (mouseX >= btnX && mouseX <= btnX + btnWidth &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    resetItems();
    return;
  }

  // Check if clicking on an item
  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    if (isMouseOverItem(item)) {
      draggedItem = item;
      dragOffsetX = mouseX - item.x;
      dragOffsetY = mouseY - item.y;

      // If item was placed, remove it from scoring
      if (item.placed) {
        if (item.correct) {
          score--;
        }
        totalPlaced--;
        item.placed = false;
        item.correct = null;
      }

      // Move item to end of array to draw on top
      items.splice(i, 1);
      items.push(item);
      break;
    }
  }
}

function mouseDragged() {
  if (draggedItem) {
    draggedItem.x = mouseX - dragOffsetX;
    draggedItem.y = mouseY - dragOffsetY;
  }
}

function mouseReleased() {
  if (draggedItem) {
    let region = getRegionAtPoint(draggedItem.x + draggedItem.width / 2,
                                   draggedItem.y + draggedItem.height / 2);

    if (region !== 'panel' && region !== 'outside') {
      // Item was dropped in a valid region
      draggedItem.placed = true;
      totalPlaced++;

      // Check if correct
      if (region === draggedItem.correctRegion) {
        draggedItem.correct = true;
        score++;
        showFeedback = true;
        feedbackMessage = "Correct!";
        feedbackColor = '#4caf50';
        feedbackTimer = 60;
      } else {
        draggedItem.correct = false;
        showFeedback = true;
        feedbackMessage = "Try again - " + draggedItem.description;
        feedbackColor = '#f44336';
        feedbackTimer = 120;
      }
    } else {
      // Return to original position
      draggedItem.x = draggedItem.originalX;
      draggedItem.y = draggedItem.originalY;
    }

    draggedItem = null;
  }
}

function getRegionAtPoint(x, y) {
  // Check if in items panel
  if (x > canvasWidth - 190) {
    return 'panel';
  }

  // Check "Neither" zone
  let neitherX = 30;
  let neitherY = 370;
  let neitherWidth = 150;
  let neitherHeight = 60;

  if (x >= neitherX && x <= neitherX + neitherWidth &&
      y >= neitherY && y <= neitherY + neitherHeight) {
    return 'neither';
  }

  // Check Venn diagram regions
  let inA = dist(x, y, circleA.x, circleA.y) <= circleRadius;
  let inB = dist(x, y, circleB.x, circleB.y) <= circleRadius;

  if (inA && inB) {
    return 'AB';
  } else if (inA) {
    return 'A';
  } else if (inB) {
    return 'B';
  }

  return 'outside';
}

function resetItems() {
  for (let i = 0; i < items.length; i++) {
    items[i].x = items[i].originalX;
    items[i].y = items[i].originalY;
    items[i].placed = false;
    items[i].correct = null;
  }
  score = 0;
  totalPlaced = 0;
  showFeedback = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Update original positions for items
  let startX = canvasWidth - 170;
  for (let i = 0; i < items.length; i++) {
    items[i].originalX = startX;
    if (!items[i].placed) {
      items[i].x = startX;
    }
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
