// Specification Quality Checklist MicroSim
// Interactive checklist for evaluating MicroSim specification completeness

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let mouseOverCanvas = false;
let categories = [];
let expandedCategory = -1;
let hoveredCheckbox = -1;
let hoveredCategory = -1;

// Colors
const colors = {
  background: '#F5F7FA',
  categoryHeader: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
  categoryLight: ['#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5'],
  checked: '#4CAF50',
  unchecked: '#E0E0E0',
  checkmark: '#FFFFFF',
  text: '#333333',
  subtext: '#666666',
  progressBar: '#4CAF50',
  progressBg: '#E0E0E0',
  resetButton: '#F44336',
  resetButtonHover: '#D32F2F'
};

// Initialize checklist data
function initCategories() {
  categories = [
    {
      name: "Educational Foundation",
      icon: "book",
      expanded: true,
      items: [
        { text: "Learning objective clearly stated", checked: false },
        { text: "Bloom's taxonomy level identified", checked: false },
        { text: "Target audience specified", checked: false },
        { text: "Prerequisites noted", checked: false }
      ]
    },
    {
      name: "Visual Design",
      icon: "palette",
      expanded: false,
      items: [
        { text: "All visual elements described", checked: false },
        { text: "Colors specified (or defaults accepted)", checked: false },
        { text: "Layout structure defined", checked: false },
        { text: "Responsive behavior noted", checked: false }
      ]
    },
    {
      name: "Interactivity",
      icon: "cursor",
      expanded: false,
      items: [
        { text: "All controls listed", checked: false },
        { text: "Control ranges and defaults specified", checked: false },
        { text: "User actions and responses described", checked: false },
        { text: "Edge case behavior defined", checked: false }
      ]
    },
    {
      name: "Technical Details",
      icon: "code",
      expanded: false,
      items: [
        { text: "Library type identified", checked: false },
        { text: "Data structure described", checked: false },
        { text: "File naming convention followed", checked: false },
        { text: "Integration method specified", checked: false }
      ]
    }
  ];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');
  initCategories();

  describe('Specification Quality Checklist with four categories: Educational Foundation, Visual Design, Interactivity, and Technical Details. Click checkboxes to track completion.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill(colors.background);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Specification Quality Checklist", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw progress bar
  drawProgressBar();

  // Draw categories
  let yOffset = 70;
  let categoryWidth = canvasWidth - margin * 2;

  for (let i = 0; i < categories.length; i++) {
    yOffset = drawCategory(i, margin, yOffset, categoryWidth);
  }

  // Draw control area with reset button
  drawControlArea();
}

function drawProgressBar() {
  let barX = margin;
  let barY = 42;
  let barWidth = canvasWidth - margin * 2;
  let barHeight = 20;

  // Calculate progress
  let totalItems = 0;
  let checkedItems = 0;
  for (let cat of categories) {
    for (let item of cat.items) {
      totalItems++;
      if (item.checked) checkedItems++;
    }
  }
  let progress = totalItems > 0 ? checkedItems / totalItems : 0;

  // Background
  fill(colors.progressBg);
  noStroke();
  rect(barX, barY, barWidth, barHeight, 10);

  // Progress fill
  if (progress > 0) {
    fill(colors.progressBar);
    rect(barX, barY, barWidth * progress, barHeight, 10, progress >= 1 ? 10 : 0, progress >= 1 ? 10 : 0, 10);
  }

  // Percentage text
  fill(progress > 0.5 ? 'white' : colors.text);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(Math.round(progress * 100) + "% Complete", barX + barWidth / 2, barY + barHeight / 2);
  textStyle(NORMAL);
}

function drawCategory(index, x, y, width) {
  let cat = categories[index];
  let headerHeight = 40;
  let itemHeight = 28;
  let isHovered = hoveredCategory === index;

  // Calculate total height
  let totalHeight = headerHeight;
  if (cat.expanded) {
    totalHeight += cat.items.length * itemHeight + 10;
  }

  // Category background
  fill(colors.categoryLight[index]);
  stroke(colors.categoryHeader[index]);
  strokeWeight(2);
  rect(x, y, width, totalHeight, 8);

  // Header background
  fill(colors.categoryHeader[index]);
  noStroke();
  rect(x, y, width, headerHeight, 8, 8, cat.expanded ? 0 : 8, cat.expanded ? 0 : 8);

  // Expand/collapse arrow
  fill('white');
  textSize(16);
  textAlign(LEFT, CENTER);
  let arrowX = x + 15;
  let arrowY = y + headerHeight / 2;
  if (cat.expanded) {
    text("\u25BC", arrowX, arrowY);
  } else {
    text("\u25B6", arrowX, arrowY);
  }

  // Draw category icon
  drawCategoryIcon(cat.icon, x + 40, y + headerHeight / 2, 'white');

  // Category name
  fill('white');
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(cat.name, x + 65, y + headerHeight / 2);
  textStyle(NORMAL);

  // Completion count
  let checkedCount = cat.items.filter(item => item.checked).length;
  textSize(14);
  textAlign(RIGHT, CENTER);
  text(checkedCount + "/" + cat.items.length, x + width - 15, y + headerHeight / 2);

  // Draw items if expanded
  if (cat.expanded) {
    let itemY = y + headerHeight + 5;
    for (let j = 0; j < cat.items.length; j++) {
      drawChecklistItem(index, j, x + 20, itemY, width - 40, itemHeight - 4);
      itemY += itemHeight;
    }
  }

  return y + totalHeight + 10;
}

function drawCategoryIcon(icon, x, y, col) {
  stroke(col);
  strokeWeight(1.5);
  noFill();

  switch(icon) {
    case "book":
      // Book icon
      rect(x - 8, y - 6, 16, 12, 2);
      line(x, y - 6, x, y + 6);
      break;
    case "palette":
      // Palette icon
      ellipse(x, y, 14, 12);
      fill(col);
      noStroke();
      ellipse(x - 3, y - 2, 3, 3);
      ellipse(x + 2, y - 2, 3, 3);
      ellipse(x - 1, y + 2, 3, 3);
      break;
    case "cursor":
      // Cursor/pointer icon
      noFill();
      stroke(col);
      beginShape();
      vertex(x - 5, y - 6);
      vertex(x - 5, y + 6);
      vertex(x, y + 2);
      vertex(x + 5, y + 6);
      vertex(x + 2, y + 2);
      vertex(x + 5, y - 1);
      vertex(x - 5, y - 6);
      endShape();
      break;
    case "code":
      // Code brackets icon
      noFill();
      stroke(col);
      beginShape();
      vertex(x - 4, y - 6);
      vertex(x - 8, y);
      vertex(x - 4, y + 6);
      endShape();
      beginShape();
      vertex(x + 4, y - 6);
      vertex(x + 8, y);
      vertex(x + 4, y + 6);
      endShape();
      break;
  }
}

function drawChecklistItem(catIndex, itemIndex, x, y, width, height) {
  let item = categories[catIndex].items[itemIndex];
  let checkboxSize = 20;
  let isHovered = hoveredCheckbox === catIndex * 100 + itemIndex;

  // Checkbox background
  fill(item.checked ? colors.checked : colors.unchecked);
  stroke(item.checked ? colors.checked : '#BDBDBD');
  strokeWeight(isHovered ? 2 : 1);
  rect(x, y + (height - checkboxSize) / 2, checkboxSize, checkboxSize, 4);

  // Checkmark
  if (item.checked) {
    stroke(colors.checkmark);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(x + 4, y + height / 2);
    vertex(x + 8, y + height / 2 + 4);
    vertex(x + 16, y + height / 2 - 4);
    endShape();
  }

  // Item text
  fill(item.checked ? colors.checked : colors.text);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  if (item.checked) {
    // Strikethrough effect for checked items
    fill(colors.subtext);
  }
  text(item.text, x + checkboxSize + 12, y + height / 2);
}

function drawControlArea() {
  // Reset button
  let buttonWidth = 100;
  let buttonHeight = 32;
  let buttonX = canvasWidth / 2 - buttonWidth / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  let isHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                  mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(isHovered ? colors.resetButtonHover : colors.resetButton);
  noStroke();
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 6);

  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Reset All", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  textStyle(NORMAL);

  // Instructions
  fill(colors.subtext);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Click headers to expand/collapse", margin + 10, drawHeight + controlHeight / 2);

  textAlign(RIGHT, CENTER);
  text("Click checkboxes to mark complete", canvasWidth - margin - 10, drawHeight + controlHeight / 2);
}

function mousePressed() {
  // Check reset button
  let buttonWidth = 100;
  let buttonHeight = 32;
  let buttonX = canvasWidth / 2 - buttonWidth / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    resetAll();
    return;
  }

  // Check category headers and checkboxes
  let yOffset = 70;
  let categoryWidth = canvasWidth - margin * 2;

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let headerHeight = 40;
    let itemHeight = 28;

    // Check header click (expand/collapse)
    if (mouseX >= margin && mouseX <= margin + categoryWidth &&
        mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
      cat.expanded = !cat.expanded;
      return;
    }

    // Check checkbox clicks
    if (cat.expanded) {
      let itemY = yOffset + headerHeight + 5;
      for (let j = 0; j < cat.items.length; j++) {
        let checkboxX = margin + 20;
        let checkboxY = itemY + (itemHeight - 4 - 20) / 2;
        let checkboxSize = 20;

        if (mouseX >= checkboxX && mouseX <= checkboxX + checkboxSize &&
            mouseY >= checkboxY && mouseY <= checkboxY + checkboxSize) {
          cat.items[j].checked = !cat.items[j].checked;
          return;
        }
        itemY += itemHeight;
      }
    }

    // Update yOffset for next category
    let totalHeight = headerHeight;
    if (cat.expanded) {
      totalHeight += cat.items.length * itemHeight + 10;
    }
    yOffset += totalHeight + 10;
  }
}

function mouseMoved() {
  hoveredCheckbox = -1;
  hoveredCategory = -1;

  let yOffset = 70;
  let categoryWidth = canvasWidth - margin * 2;

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let headerHeight = 40;
    let itemHeight = 28;

    // Check header hover
    if (mouseX >= margin && mouseX <= margin + categoryWidth &&
        mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
      hoveredCategory = i;
      cursor(HAND);
      return;
    }

    // Check checkbox hovers
    if (cat.expanded) {
      let itemY = yOffset + headerHeight + 5;
      for (let j = 0; j < cat.items.length; j++) {
        let checkboxX = margin + 20;
        let checkboxY = itemY + (itemHeight - 4 - 20) / 2;
        let checkboxSize = 20;

        if (mouseX >= checkboxX && mouseX <= checkboxX + checkboxSize &&
            mouseY >= checkboxY && mouseY <= checkboxY + checkboxSize) {
          hoveredCheckbox = i * 100 + j;
          cursor(HAND);
          return;
        }
        itemY += itemHeight;
      }
    }

    // Update yOffset for next category
    let totalHeight = headerHeight;
    if (cat.expanded) {
      totalHeight += cat.items.length * itemHeight + 10;
    }
    yOffset += totalHeight + 10;
  }

  // Check reset button hover
  let buttonWidth = 100;
  let buttonHeight = 32;
  let buttonX = canvasWidth / 2 - buttonWidth / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    cursor(HAND);
    return;
  }

  cursor(ARROW);
}

function resetAll() {
  for (let cat of categories) {
    for (let item of cat.items) {
      item.checked = false;
    }
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
