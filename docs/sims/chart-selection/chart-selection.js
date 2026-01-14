// Chart Selection Helper MicroSim
// Helps learners choose the appropriate chart type for their data

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let mouseOverCanvas = false;
let hoveredChart = -1;
let selectedDataType = 0;
let selectedQuestionType = 0;

// Dropdown state
let dataDropdownOpen = false;
let questionDropdownOpen = false;

// Grid dimensions
let gridCols = 3;
let gridRows = 2;
let chartWidth, chartHeight, chartSpacing;

// Data types
const dataTypes = [
  { name: "Select Data Type...", value: null },
  { name: "Categorical", value: "categorical" },
  { name: "Continuous/Numeric", value: "continuous" },
  { name: "Time Series", value: "time" },
  { name: "Parts of a Whole", value: "parts" },
  { name: "Two Variables", value: "bivariate" }
];

// Question types
const questionTypes = [
  { name: "Select Question Type...", value: null },
  { name: "Compare Values", value: "compare" },
  { name: "Show Trend Over Time", value: "trend" },
  { name: "Show Distribution", value: "distribution" },
  { name: "Show Relationship", value: "relationship" },
  { name: "Show Composition", value: "composition" }
];

// Chart types with recommendations
const chartTypes = [
  {
    name: "Bar Chart",
    color: "#2196F3",
    lightColor: "#BBDEFB",
    description: "Best for comparing values across categories. Easy to read and interpret.",
    useWhen: "Use when comparing discrete categories or groups.",
    dataTypes: ["categorical", "continuous"],
    questionTypes: ["compare", "distribution"],
    icon: "bar"
  },
  {
    name: "Line Chart",
    color: "#4CAF50",
    lightColor: "#C8E6C9",
    description: "Shows trends and changes over time. Connects data points to reveal patterns.",
    useWhen: "Use when showing continuous data over time.",
    dataTypes: ["time", "continuous"],
    questionTypes: ["trend", "relationship"],
    icon: "line"
  },
  {
    name: "Pie Chart",
    color: "#FF9800",
    lightColor: "#FFE0B2",
    description: "Displays parts of a whole as slices. Best with few categories.",
    useWhen: "Use when showing proportions that sum to 100%.",
    dataTypes: ["parts", "categorical"],
    questionTypes: ["composition"],
    icon: "pie"
  },
  {
    name: "Scatter Plot",
    color: "#9C27B0",
    lightColor: "#E1BEE7",
    description: "Reveals relationships between two variables. Shows correlation patterns.",
    useWhen: "Use when exploring correlation between variables.",
    dataTypes: ["bivariate", "continuous"],
    questionTypes: ["relationship"],
    icon: "scatter"
  },
  {
    name: "Area Chart",
    color: "#00BCD4",
    lightColor: "#B2EBF2",
    description: "Like line charts but filled below. Good for cumulative totals over time.",
    useWhen: "Use when showing cumulative trends or stacked data.",
    dataTypes: ["time", "parts"],
    questionTypes: ["trend", "composition"],
    icon: "area"
  },
  {
    name: "Histogram",
    color: "#FF5722",
    lightColor: "#FFCCBC",
    description: "Shows frequency distribution of continuous data. Groups data into bins.",
    useWhen: "Use when showing how data is distributed across ranges.",
    dataTypes: ["continuous"],
    questionTypes: ["distribution"],
    icon: "histogram"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Interactive chart selection helper. Choose data type and question type to see recommended chart types highlighted. Hover over charts for descriptions.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate chart grid dimensions
  let gridWidth = canvasWidth - margin * 2;
  chartSpacing = 15;
  chartWidth = (gridWidth - chartSpacing * 2) / 3;
  chartHeight = 140;

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
  textSize(22);
  textAlign(CENTER, TOP);
  text("Chart Selection Helper", canvasWidth / 2, 12);

  // Subtitle
  fill('#666');
  textSize(13);
  text("Choose your data and question type to find the right chart", canvasWidth / 2, 38);

  // Draw dropdowns
  drawDropdowns();

  // Draw chart grid
  let startY = 130;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let index = row * gridCols + col;
      let x = margin + col * (chartWidth + chartSpacing);
      let y = startY + row * (chartHeight + chartSpacing);
      drawChartCard(index, x, y);
    }
  }

  // Draw hover tooltip
  if (hoveredChart >= 0 && !dataDropdownOpen && !questionDropdownOpen) {
    drawTooltip(hoveredChart);
  }

  // Draw dropdown menus on top
  if (dataDropdownOpen) {
    drawDropdownMenu(margin, 70, dataTypes, selectedDataType, true);
  }
  if (questionDropdownOpen) {
    drawDropdownMenu(canvasWidth / 2 + 10, 70, questionTypes, selectedQuestionType, false);
  }

  // Instructions
  fill('#666');
  textSize(14);
  textAlign(CENTER, CENTER);
  let instruction = "Select data and question types above. Hover over charts for details.";
  if (getRecommendedCharts().length > 0) {
    instruction = "Recommended charts are highlighted in green. Hover for more details.";
  }
  text(instruction, canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawDropdowns() {
  let dropdownWidth = canvasWidth / 2 - margin - 10;
  let dropdownHeight = 32;
  let dropdownY = 65;

  // Data Type dropdown
  drawDropdownButton(margin, dropdownY, dropdownWidth, dropdownHeight,
    dataTypes[selectedDataType].name, dataDropdownOpen, "#2196F3");

  // Question Type dropdown
  drawDropdownButton(canvasWidth / 2 + 10, dropdownY, dropdownWidth, dropdownHeight,
    questionTypes[selectedQuestionType].name, questionDropdownOpen, "#4CAF50");

  // Labels
  fill('#555');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text("Data Type:", margin, dropdownY - 3);
  text("Question Type:", canvasWidth / 2 + 10, dropdownY - 3);
}

function drawDropdownButton(x, y, w, h, label, isOpen, accentColor) {
  // Button background
  if (isOpen) {
    fill(accentColor);
  } else {
    fill('white');
  }
  stroke(accentColor);
  strokeWeight(2);
  rect(x, y, w, h, 5);

  // Text
  fill(isOpen ? 'white' : '#333');
  textSize(13);
  textAlign(LEFT, CENTER);
  text(label, x + 12, y + h / 2);

  // Arrow
  fill(isOpen ? 'white' : accentColor);
  noStroke();
  let arrowX = x + w - 20;
  let arrowY = y + h / 2;
  if (isOpen) {
    triangle(arrowX - 5, arrowY + 3, arrowX + 5, arrowY + 3, arrowX, arrowY - 4);
  } else {
    triangle(arrowX - 5, arrowY - 3, arrowX + 5, arrowY - 3, arrowX, arrowY + 4);
  }
}

function drawDropdownMenu(x, y, items, selected, isDataDropdown) {
  let menuWidth = canvasWidth / 2 - margin - 10;
  let itemHeight = 30;
  let menuHeight = (items.length - 1) * itemHeight;
  let menuY = y + 35;

  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(x + 3, menuY + 3, menuWidth, menuHeight, 5);

  // Menu background
  fill('white');
  stroke('#ddd');
  strokeWeight(1);
  rect(x, menuY, menuWidth, menuHeight, 5);

  // Menu items (skip first "Select..." option)
  for (let i = 1; i < items.length; i++) {
    let itemY = menuY + (i - 1) * itemHeight;
    let isHovered = mouseX >= x && mouseX <= x + menuWidth &&
                    mouseY >= itemY && mouseY <= itemY + itemHeight;
    let isSelected = i === selected;

    if (isHovered) {
      fill(isDataDropdown ? '#E3F2FD' : '#E8F5E9');
    } else if (isSelected) {
      fill(isDataDropdown ? '#BBDEFB' : '#C8E6C9');
    } else {
      fill('white');
    }
    noStroke();
    rect(x + 2, itemY, menuWidth - 4, itemHeight, i === 1 ? 5 : 0, i === 1 ? 5 : 0,
         i === items.length - 1 ? 5 : 0, i === items.length - 1 ? 5 : 0);

    fill('#333');
    textSize(13);
    textAlign(LEFT, CENTER);
    text(items[i].name, x + 12, itemY + itemHeight / 2);

    // Checkmark for selected
    if (isSelected) {
      fill(isDataDropdown ? '#2196F3' : '#4CAF50');
      textSize(16);
      text("\u2713", x + menuWidth - 25, itemY + itemHeight / 2);
    }
  }
}

function drawChartCard(index, x, y) {
  let chart = chartTypes[index];
  let isHovered = hoveredChart === index;
  let isRecommended = isChartRecommended(index);

  // Card background
  if (isRecommended) {
    fill('#E8F5E9');
    stroke('#4CAF50');
    strokeWeight(3);
  } else if (isHovered) {
    fill(chart.lightColor);
    stroke(chart.color);
    strokeWeight(2);
  } else {
    fill('white');
    stroke('#ddd');
    strokeWeight(1);
  }
  rect(x, y, chartWidth, chartHeight, 8);

  // Recommended badge
  if (isRecommended) {
    fill('#4CAF50');
    noStroke();
    rect(x + chartWidth - 85, y, 85, 22, 0, 8, 0, 8);
    fill('white');
    textSize(10);
    textAlign(CENTER, CENTER);
    text("RECOMMENDED", x + chartWidth - 42, y + 11);
  }

  // Chart icon
  drawChartIcon(chart.icon, x + 40, y + 50, isRecommended ? '#4CAF50' : chart.color);

  // Chart name
  fill(isRecommended ? '#2E7D32' : '#333');
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(chart.name, x + 80, y + 25);
  textStyle(NORMAL);

  // Brief description
  fill('#666');
  textSize(11);
  textAlign(LEFT, TOP);
  let shortDesc = chart.useWhen;
  text(shortDesc, x + 80, y + 48, chartWidth - 95, 50);

  // Color accent bar
  fill(isRecommended ? '#4CAF50' : chart.color);
  noStroke();
  rect(x, y + chartHeight - 6, chartWidth, 6, 0, 0, 8, 8);
}

function drawChartIcon(type, x, y, color) {
  stroke(color);
  strokeWeight(2);
  fill(color);

  switch(type) {
    case "bar":
      noStroke();
      rect(x - 20, y + 5, 10, 20);
      rect(x - 5, y - 10, 10, 35);
      rect(x + 10, y - 2, 10, 27);
      break;

    case "line":
      noFill();
      stroke(color);
      strokeWeight(3);
      beginShape();
      vertex(x - 22, y + 15);
      vertex(x - 8, y - 5);
      vertex(x + 5, y + 5);
      vertex(x + 20, y - 15);
      endShape();
      // Points
      fill(color);
      noStroke();
      ellipse(x - 22, y + 15, 6, 6);
      ellipse(x - 8, y - 5, 6, 6);
      ellipse(x + 5, y + 5, 6, 6);
      ellipse(x + 20, y - 15, 6, 6);
      break;

    case "pie":
      noStroke();
      fill(color);
      arc(x, y, 45, 45, 0, PI * 0.6);
      fill(lerpColor(color(color), color('white'), 0.3));
      arc(x, y, 45, 45, PI * 0.6, PI * 1.3);
      fill(lerpColor(color(color), color('white'), 0.5));
      arc(x, y, 45, 45, PI * 1.3, TWO_PI);
      break;

    case "scatter":
      noStroke();
      fill(color);
      ellipse(x - 15, y + 10, 8, 8);
      ellipse(x - 8, y - 5, 8, 8);
      ellipse(x + 2, y + 5, 8, 8);
      ellipse(x + 10, y - 10, 8, 8);
      ellipse(x + 18, y - 3, 8, 8);
      ellipse(x - 5, y + 12, 8, 8);
      break;

    case "area":
      noStroke();
      fill(color);
      beginShape();
      vertex(x - 22, y + 20);
      vertex(x - 22, y + 10);
      vertex(x - 8, y - 5);
      vertex(x + 5, y + 5);
      vertex(x + 20, y - 15);
      vertex(x + 20, y + 20);
      endShape(CLOSE);
      break;

    case "histogram":
      noStroke();
      fill(color);
      rect(x - 22, y + 10, 10, 15);
      rect(x - 11, y - 5, 10, 30);
      rect(x, y - 12, 10, 37);
      rect(x + 11, y + 2, 10, 23);
      break;
  }
}

function drawTooltip(index) {
  let chart = chartTypes[index];
  let tooltipWidth = 280;
  let tooltipHeight = 90;

  // Position tooltip near mouse but keep on screen
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY + 15;

  if (tooltipX + tooltipWidth > canvasWidth - 10) {
    tooltipX = mouseX - tooltipWidth - 15;
  }
  if (tooltipY + tooltipHeight > drawHeight - 10) {
    tooltipY = mouseY - tooltipHeight - 15;
  }

  // Shadow
  fill(0, 0, 0, 40);
  noStroke();
  rect(tooltipX + 3, tooltipY + 3, tooltipWidth, tooltipHeight, 8);

  // Background
  fill(255, 255, 255, 250);
  stroke(chart.color);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Header
  fill(chart.color);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, 26, 8, 8, 0, 0);

  fill('white');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(chart.name, tooltipX + 12, tooltipY + 13);
  textStyle(NORMAL);

  // Description
  fill('#333');
  textSize(12);
  textAlign(LEFT, TOP);
  text(chart.description, tooltipX + 12, tooltipY + 35, tooltipWidth - 24, 50);
}

function getRecommendedCharts() {
  let recommended = [];
  let dataValue = dataTypes[selectedDataType].value;
  let questionValue = questionTypes[selectedQuestionType].value;

  if (!dataValue && !questionValue) return recommended;

  for (let i = 0; i < chartTypes.length; i++) {
    let chart = chartTypes[i];
    let dataMatch = !dataValue || chart.dataTypes.includes(dataValue);
    let questionMatch = !questionValue || chart.questionTypes.includes(questionValue);

    if (dataMatch && questionMatch) {
      // If both selectors have values, require both to match
      if (dataValue && questionValue) {
        if (chart.dataTypes.includes(dataValue) && chart.questionTypes.includes(questionValue)) {
          recommended.push(i);
        }
      } else {
        recommended.push(i);
      }
    }
  }
  return recommended;
}

function isChartRecommended(index) {
  return getRecommendedCharts().includes(index);
}

function getChartAtMouse() {
  let startY = 130;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let index = row * gridCols + col;
      let x = margin + col * (chartWidth + chartSpacing);
      let y = startY + row * (chartHeight + chartSpacing);

      if (mouseX >= x && mouseX <= x + chartWidth &&
          mouseY >= y && mouseY <= y + chartHeight) {
        return index;
      }
    }
  }
  return -1;
}

function isInsideDataDropdown() {
  let dropdownWidth = canvasWidth / 2 - margin - 10;
  let dropdownY = 65;
  let dropdownHeight = 32;

  // Check button
  if (mouseX >= margin && mouseX <= margin + dropdownWidth &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownHeight) {
    return true;
  }

  // Check menu if open
  if (dataDropdownOpen) {
    let menuY = dropdownY + 35;
    let menuHeight = (dataTypes.length - 1) * 30;
    if (mouseX >= margin && mouseX <= margin + dropdownWidth &&
        mouseY >= menuY && mouseY <= menuY + menuHeight) {
      return true;
    }
  }
  return false;
}

function isInsideQuestionDropdown() {
  let dropdownWidth = canvasWidth / 2 - margin - 10;
  let dropdownX = canvasWidth / 2 + 10;
  let dropdownY = 65;
  let dropdownHeight = 32;

  // Check button
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownWidth &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownHeight) {
    return true;
  }

  // Check menu if open
  if (questionDropdownOpen) {
    let menuY = dropdownY + 35;
    let menuHeight = (questionTypes.length - 1) * 30;
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownWidth &&
        mouseY >= menuY && mouseY <= menuY + menuHeight) {
      return true;
    }
  }
  return false;
}

function mousePressed() {
  let dropdownWidth = canvasWidth / 2 - margin - 10;
  let dropdownY = 65;
  let dropdownHeight = 32;

  // Check data dropdown button click
  if (mouseX >= margin && mouseX <= margin + dropdownWidth &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownHeight) {
    dataDropdownOpen = !dataDropdownOpen;
    questionDropdownOpen = false;
    return;
  }

  // Check question dropdown button click
  let questionDropdownX = canvasWidth / 2 + 10;
  if (mouseX >= questionDropdownX && mouseX <= questionDropdownX + dropdownWidth &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownHeight) {
    questionDropdownOpen = !questionDropdownOpen;
    dataDropdownOpen = false;
    return;
  }

  // Check data dropdown menu item click
  if (dataDropdownOpen) {
    let menuY = dropdownY + 35;
    let itemHeight = 30;
    for (let i = 1; i < dataTypes.length; i++) {
      let itemY = menuY + (i - 1) * itemHeight;
      if (mouseX >= margin && mouseX <= margin + dropdownWidth &&
          mouseY >= itemY && mouseY <= itemY + itemHeight) {
        selectedDataType = i;
        dataDropdownOpen = false;
        return;
      }
    }
  }

  // Check question dropdown menu item click
  if (questionDropdownOpen) {
    let menuY = dropdownY + 35;
    let itemHeight = 30;
    for (let i = 1; i < questionTypes.length; i++) {
      let itemY = menuY + (i - 1) * itemHeight;
      if (mouseX >= questionDropdownX && mouseX <= questionDropdownX + dropdownWidth &&
          mouseY >= itemY && mouseY <= itemY + itemHeight) {
        selectedQuestionType = i;
        questionDropdownOpen = false;
        return;
      }
    }
  }

  // Close dropdowns if clicking elsewhere
  dataDropdownOpen = false;
  questionDropdownOpen = false;
}

function mouseMoved() {
  if (!dataDropdownOpen && !questionDropdownOpen) {
    hoveredChart = getChartAtMouse();
  } else {
    hoveredChart = -1;
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
