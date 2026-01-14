// Visual Description Completeness Checklist MicroSim
// Interactive checklist for verifying visual descriptions are complete

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let mouseOverCanvas = false;
let categories = [];
let hoveredCheckbox = -1;
let hoveredCategory = -1;
let hoveredItem = null;
let tooltipTimer = 0;
let showTooltip = false;
let scrollOffset = 0;
let maxScroll = 0;

// Colors
const colors = {
  background: '#FFFFFF',
  categoryHeader: ['#3498db', '#27ae60', '#9b59b6', '#e67e22', '#e74c3c'],
  categoryLight: ['#ebf5fb', '#e9f7ef', '#f4ecf7', '#fdf2e9', '#fdedec'],
  checked: '#27ae60',
  unchecked: '#E0E0E0',
  checkmark: '#FFFFFF',
  text: '#2c3e50',
  subtext: '#7f8c8d',
  progressBar: '#27ae60',
  progressBg: '#ecf0f1',
  resetButton: '#e74c3c',
  resetButtonHover: '#c0392b',
  exportButton: '#3498db',
  exportButtonHover: '#2980b9',
  tooltipBg: '#2c3e50',
  tooltipText: '#FFFFFF'
};

// Example specifications for tooltips
const exampleSpecs = {
  // Canvas/Container
  "Width specified": "Example: 'Canvas width: 600px' or 'Width: 100% of container'",
  "Height specified": "Example: 'Canvas height: 400px' or 'Height: responsive based on aspect ratio 16:9'",
  "Background color": "Example: 'Background: #F5F5F5' or 'Background: light gray (#EEEEEE)'",
  "Border or frame": "Example: 'Border: 1px solid #CCCCCC' or 'No visible border, content bleeds to edge'",

  // Visual Elements
  "Each element named": "Example: 'Main circle (centerCircle)', 'Title text (headerLabel)', 'Progress bar (progressIndicator)'",
  "Shape or form": "Example: 'Rounded rectangle with 8px corner radius' or 'Equilateral triangle pointing upward'",
  "Size specified": "Example: 'Width: 120px, Height: 80px' or 'Diameter: 25% of canvas width'",
  "Position described": "Example: 'Centered horizontally, 50px from top' or 'Left edge aligned with margin'",
  "Color specified": "Example: 'Fill: #4CAF50, Stroke: #388E3C, Stroke width: 2px'",

  // Text Elements
  "Font size specified": "Example: 'Title: 24px bold, Body: 14px regular, Labels: 12px'",
  "Text content": "Example: 'Title shows \"Learning Progress\"', 'Button displays \"Start\" initially'",
  "Text position": "Example: 'Centered below the main diagram' or 'Right-aligned in the header area'",
  "Text color": "Example: 'Title: #2c3e50, Body text: #666666, Accent labels: #3498db'",

  // Dynamic Elements
  "Initial state": "Example: 'Slider starts at 50%', 'Animation paused on load', 'First item selected'",
  "Motion pattern": "Example: 'Ball bounces with gravity effect' or 'Elements fade in sequentially over 0.5s each'",
  "Speed or timing": "Example: 'Animation runs at 30fps', 'Transition duration: 300ms ease-in-out'",

  // Layout Relationships
  "Spacing between": "Example: 'Buttons spaced 16px apart', 'Margin between sections: 24px'",
  "Alignment rules": "Example: 'All labels left-aligned', 'Icons centered within their containers'",
  "Responsive behavior": "Example: 'Canvas scales proportionally, minimum width 400px'"
};

// Initialize checklist data
function initCategories() {
  categories = [
    {
      name: "Canvas/Container",
      icon: "canvas",
      expanded: true,
      items: [
        { text: "Width specified", checked: false },
        { text: "Height specified", checked: false },
        { text: "Background color", checked: false },
        { text: "Border or frame", checked: false }
      ]
    },
    {
      name: "Visual Elements",
      icon: "shapes",
      expanded: false,
      items: [
        { text: "Each element named", checked: false },
        { text: "Shape or form", checked: false },
        { text: "Size specified", checked: false },
        { text: "Position described", checked: false },
        { text: "Color specified", checked: false }
      ]
    },
    {
      name: "Text Elements",
      icon: "text",
      expanded: false,
      items: [
        { text: "Font size specified", checked: false },
        { text: "Text content", checked: false },
        { text: "Text position", checked: false },
        { text: "Text color", checked: false }
      ]
    },
    {
      name: "Dynamic Elements",
      icon: "motion",
      expanded: false,
      items: [
        { text: "Initial state", checked: false },
        { text: "Motion pattern", checked: false },
        { text: "Speed or timing", checked: false }
      ]
    },
    {
      name: "Layout Relationships",
      icon: "layout",
      expanded: false,
      items: [
        { text: "Spacing between", checked: false },
        { text: "Alignment rules", checked: false },
        { text: "Responsive behavior", checked: false }
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

  describe('Visual Description Completeness Checklist with five categories: Canvas/Container, Visual Elements, Text Elements, Dynamic Elements, and Layout Relationships. Click checkboxes to track completion and hover for example specifications.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill(colors.background);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('#f8f9fa');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('#e9ecef');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title
  fill(colors.text);
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  noStroke();
  text("Visual Description Completeness Checklist", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw progress bar
  drawProgressBar();

  // Draw categories
  let yOffset = 75;
  let categoryWidth = canvasWidth - margin * 2;

  for (let i = 0; i < categories.length; i++) {
    yOffset = drawCategory(i, margin, yOffset, categoryWidth);
  }

  // Draw control area with buttons
  drawControlArea();

  // Draw tooltip if hovering
  if (showTooltip && hoveredItem) {
    drawTooltip();
  }

  // Update tooltip timer
  if (hoveredItem) {
    tooltipTimer++;
    if (tooltipTimer > 30) { // Show after 0.5 seconds (30 frames at 60fps)
      showTooltip = true;
    }
  }
}

function drawProgressBar() {
  let barX = margin;
  let barY = 42;
  let barWidth = canvasWidth - margin * 2;
  let barHeight = 24;

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
  rect(barX, barY, barWidth, barHeight, 12);

  // Progress fill
  if (progress > 0) {
    fill(colors.progressBar);
    rect(barX, barY, barWidth * progress, barHeight, 12, progress >= 1 ? 12 : 0, progress >= 1 ? 12 : 0, 12);
  }

  // Percentage text
  fill(progress > 0.5 ? 'white' : colors.text);
  textSize(13);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(Math.round(progress * 100) + "% Complete (" + checkedItems + "/" + totalItems + " items)", barX + barWidth / 2, barY + barHeight / 2);
  textStyle(NORMAL);
}

function drawCategory(index, x, y, width) {
  let cat = categories[index];
  let headerHeight = 42;
  let itemHeight = 32;
  let isHovered = hoveredCategory === index;

  // Calculate total height
  let totalHeight = headerHeight;
  if (cat.expanded) {
    totalHeight += cat.items.length * itemHeight + 12;
  }

  // Category background
  fill(colors.categoryLight[index]);
  stroke(colors.categoryHeader[index]);
  strokeWeight(2);
  rect(x, y, width, totalHeight, 10);

  // Header background
  fill(colors.categoryHeader[index]);
  noStroke();
  rect(x, y, width, headerHeight, 10, 10, cat.expanded ? 0 : 10, cat.expanded ? 0 : 10);

  // Expand/collapse arrow
  fill('white');
  textSize(14);
  textAlign(LEFT, CENTER);
  let arrowX = x + 16;
  let arrowY = y + headerHeight / 2;
  if (cat.expanded) {
    text("\u25BC", arrowX, arrowY);
  } else {
    text("\u25B6", arrowX, arrowY);
  }

  // Draw category icon
  drawCategoryIcon(cat.icon, x + 45, y + headerHeight / 2, 'white');

  // Category name
  fill('white');
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(cat.name, x + 72, y + headerHeight / 2);
  textStyle(NORMAL);

  // Completion count
  let checkedCount = cat.items.filter(item => item.checked).length;
  textSize(14);
  textAlign(RIGHT, CENTER);
  text(checkedCount + "/" + cat.items.length, x + width - 16, y + headerHeight / 2);

  // Draw items if expanded
  if (cat.expanded) {
    let itemY = y + headerHeight + 6;
    for (let j = 0; j < cat.items.length; j++) {
      drawChecklistItem(index, j, x + 24, itemY, width - 48, itemHeight - 6);
      itemY += itemHeight;
    }
  }

  return y + totalHeight + 8;
}

function drawCategoryIcon(icon, x, y, col) {
  stroke(col);
  strokeWeight(1.5);
  noFill();

  switch(icon) {
    case "canvas":
      // Canvas/frame icon
      rect(x - 8, y - 6, 16, 12, 2);
      line(x - 4, y - 6, x - 4, y + 6);
      line(x - 8, y - 2, x + 8, y - 2);
      break;
    case "shapes":
      // Shapes icon (circle + square)
      ellipse(x - 3, y, 8, 8);
      rect(x + 1, y - 4, 8, 8);
      break;
    case "text":
      // Text icon
      line(x - 6, y - 5, x + 6, y - 5);
      line(x, y - 5, x, y + 5);
      line(x - 3, y + 5, x + 3, y + 5);
      break;
    case "motion":
      // Motion/animation icon
      noFill();
      arc(x - 2, y, 10, 10, -PI/2, PI/2);
      fill(col);
      noStroke();
      triangle(x + 4, y - 4, x + 4, y + 4, x + 8, y);
      break;
    case "layout":
      // Layout grid icon
      stroke(col);
      noFill();
      rect(x - 7, y - 5, 6, 4);
      rect(x + 1, y - 5, 6, 4);
      rect(x - 7, y + 1, 6, 4);
      rect(x + 1, y + 1, 6, 4);
      break;
  }
}

function drawChecklistItem(catIndex, itemIndex, x, y, width, height) {
  let item = categories[catIndex].items[itemIndex];
  let checkboxSize = 22;
  let isHovered = hoveredCheckbox === catIndex * 100 + itemIndex;

  // Checkbox background
  fill(item.checked ? colors.checked : colors.unchecked);
  stroke(item.checked ? colors.checked : '#BDBDBD');
  strokeWeight(isHovered ? 2.5 : 1.5);
  rect(x, y + (height - checkboxSize) / 2, checkboxSize, checkboxSize, 5);

  // Checkmark
  if (item.checked) {
    stroke(colors.checkmark);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(x + 5, y + height / 2);
    vertex(x + 9, y + height / 2 + 5);
    vertex(x + 17, y + height / 2 - 5);
    endShape();
  }

  // Item text
  fill(item.checked ? colors.checked : colors.text);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  if (item.checked) {
    fill(colors.subtext);
  }
  text(item.text, x + checkboxSize + 14, y + height / 2);

  // Hover indicator (small info icon)
  if (isHovered) {
    fill(colors.subtext);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text("(hover for example)", x + width, y + height / 2);
  }
}

function drawTooltip() {
  if (!hoveredItem || !exampleSpecs[hoveredItem.text]) return;

  let tipText = exampleSpecs[hoveredItem.text];
  let tipPadding = 12;
  let tipMaxWidth = 300;

  textSize(12);
  let tipWidth = min(textWidth(tipText) + tipPadding * 2, tipMaxWidth);

  // Word wrap calculation
  let words = tipText.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > tipMaxWidth - tipPadding * 2) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  tipWidth = tipMaxWidth;
  let tipHeight = lines.length * 18 + tipPadding * 2;

  // Position tooltip near mouse but keep on screen
  let tipX = mouseX + 15;
  let tipY = mouseY + 15;

  if (tipX + tipWidth > canvasWidth - margin) {
    tipX = mouseX - tipWidth - 15;
  }
  if (tipY + tipHeight > drawHeight - margin) {
    tipY = mouseY - tipHeight - 15;
  }

  // Draw tooltip background
  fill(colors.tooltipBg);
  noStroke();
  rect(tipX, tipY, tipWidth, tipHeight, 6);

  // Draw tooltip arrow
  fill(colors.tooltipBg);
  noStroke();

  // Draw tooltip text
  fill(colors.tooltipText);
  textSize(12);
  textAlign(LEFT, TOP);
  let textY = tipY + tipPadding;
  for (let line of lines) {
    text(line, tipX + tipPadding, textY);
    textY += 18;
  }
}

function drawControlArea() {
  let buttonWidth = 110;
  let buttonHeight = 34;
  let buttonSpacing = 20;
  let totalWidth = buttonWidth * 2 + buttonSpacing;
  let startX = canvasWidth / 2 - totalWidth / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  // Reset button
  let resetX = startX;
  let isResetHovered = mouseX >= resetX && mouseX <= resetX + buttonWidth &&
                       mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(isResetHovered ? colors.resetButtonHover : colors.resetButton);
  noStroke();
  rect(resetX, buttonY, buttonWidth, buttonHeight, 6);

  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Reset All", resetX + buttonWidth / 2, buttonY + buttonHeight / 2);

  // Export button
  let exportX = startX + buttonWidth + buttonSpacing;
  let isExportHovered = mouseX >= exportX && mouseX <= exportX + buttonWidth &&
                        mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(isExportHovered ? colors.exportButtonHover : colors.exportButton);
  noStroke();
  rect(exportX, buttonY, buttonWidth, buttonHeight, 6);

  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Export Text", exportX + buttonWidth / 2, buttonY + buttonHeight / 2);
  textStyle(NORMAL);

  // Instructions
  fill(colors.subtext);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("Click headers to expand", margin + 5, drawHeight + controlHeight / 2);

  textAlign(RIGHT, CENTER);
  text("Hover items for examples", canvasWidth - margin - 5, drawHeight + controlHeight / 2);
}

function mousePressed() {
  let buttonWidth = 110;
  let buttonHeight = 34;
  let buttonSpacing = 20;
  let totalWidth = buttonWidth * 2 + buttonSpacing;
  let startX = canvasWidth / 2 - totalWidth / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  // Check reset button
  let resetX = startX;
  if (mouseX >= resetX && mouseX <= resetX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    resetAll();
    return;
  }

  // Check export button
  let exportX = startX + buttonWidth + buttonSpacing;
  if (mouseX >= exportX && mouseX <= exportX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    exportChecklist();
    return;
  }

  // Check category headers and checkboxes
  let yOffset = 75;
  let categoryWidth = canvasWidth - margin * 2;

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let headerHeight = 42;
    let itemHeight = 32;

    // Check header click (expand/collapse)
    if (mouseX >= margin && mouseX <= margin + categoryWidth &&
        mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
      cat.expanded = !cat.expanded;
      return;
    }

    // Check checkbox clicks
    if (cat.expanded) {
      let itemY = yOffset + headerHeight + 6;
      for (let j = 0; j < cat.items.length; j++) {
        let checkboxX = margin + 24;
        let checkboxY = itemY + (itemHeight - 6 - 22) / 2;
        let checkboxSize = 22;

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
      totalHeight += cat.items.length * itemHeight + 12;
    }
    yOffset += totalHeight + 8;
  }
}

function mouseMoved() {
  let prevHoveredItem = hoveredItem;
  hoveredCheckbox = -1;
  hoveredCategory = -1;
  hoveredItem = null;

  let yOffset = 75;
  let categoryWidth = canvasWidth - margin * 2;

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let headerHeight = 42;
    let itemHeight = 32;

    // Check header hover
    if (mouseX >= margin && mouseX <= margin + categoryWidth &&
        mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
      hoveredCategory = i;
      cursor(HAND);
      if (hoveredItem !== prevHoveredItem) {
        tooltipTimer = 0;
        showTooltip = false;
      }
      return;
    }

    // Check checkbox and item hovers
    if (cat.expanded) {
      let itemY = yOffset + headerHeight + 6;
      for (let j = 0; j < cat.items.length; j++) {
        let itemX = margin + 24;
        let itemWidth = categoryWidth - 48;
        let itemTop = itemY;
        let itemBottom = itemY + itemHeight - 6;

        if (mouseX >= itemX && mouseX <= itemX + itemWidth &&
            mouseY >= itemTop && mouseY <= itemBottom) {
          hoveredCheckbox = i * 100 + j;
          hoveredItem = cat.items[j];
          cursor(HAND);
          if (hoveredItem !== prevHoveredItem) {
            tooltipTimer = 0;
            showTooltip = false;
          }
          return;
        }
        itemY += itemHeight;
      }
    }

    // Update yOffset for next category
    let totalHeight = headerHeight;
    if (cat.expanded) {
      totalHeight += cat.items.length * itemHeight + 12;
    }
    yOffset += totalHeight + 8;
  }

  // Check button hovers
  let buttonWidth = 110;
  let buttonHeight = 34;
  let buttonSpacing = 20;
  let totalWidth = buttonWidth * 2 + buttonSpacing;
  let startX = canvasWidth / 2 - totalWidth / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  if ((mouseX >= startX && mouseX <= startX + buttonWidth &&
       mouseY >= buttonY && mouseY <= buttonY + buttonHeight) ||
      (mouseX >= startX + buttonWidth + buttonSpacing &&
       mouseX <= startX + totalWidth &&
       mouseY >= buttonY && mouseY <= buttonY + buttonHeight)) {
    cursor(HAND);
    if (hoveredItem !== prevHoveredItem) {
      tooltipTimer = 0;
      showTooltip = false;
    }
    return;
  }

  cursor(ARROW);
  if (hoveredItem !== prevHoveredItem) {
    tooltipTimer = 0;
    showTooltip = false;
  }
}

function resetAll() {
  for (let cat of categories) {
    for (let item of cat.items) {
      item.checked = false;
    }
  }
}

function exportChecklist() {
  let output = "VISUAL DESCRIPTION CHECKLIST\n";
  output += "============================\n\n";

  let totalItems = 0;
  let checkedItems = 0;

  for (let cat of categories) {
    output += cat.name.toUpperCase() + "\n";
    output += "-".repeat(cat.name.length) + "\n";

    for (let item of cat.items) {
      let status = item.checked ? "[X]" : "[ ]";
      output += status + " " + item.text + "\n";
      totalItems++;
      if (item.checked) checkedItems++;
    }
    output += "\n";
  }

  let progress = Math.round((checkedItems / totalItems) * 100);
  output += "============================\n";
  output += "PROGRESS: " + progress + "% (" + checkedItems + "/" + totalItems + " items)\n";

  // Copy to clipboard
  navigator.clipboard.writeText(output).then(() => {
    alert("Checklist copied to clipboard!");
  }).catch(err => {
    console.error('Failed to copy: ', err);
    // Fallback: show in console
    console.log(output);
    alert("Check console for exported checklist (clipboard access denied)");
  });
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
