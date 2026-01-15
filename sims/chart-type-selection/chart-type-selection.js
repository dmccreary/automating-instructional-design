// Chart Type Selection Guide MicroSim
// Helps learners identify the appropriate chart type based on data characteristics and goals

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let mouseOverCanvas = false;
let hoveredCard = -1;
let selectedCard = -1;

// Grid dimensions
let gridCols = 3;
let gridRows = 2;
let cardWidth, cardHeight, cardSpacing;

// Chart type cards data
const chartCards = [
  {
    name: "Line Chart",
    color: "#4CAF50",
    lightColor: "#C8E6C9",
    iconType: "line",
    useWhen: "Showing trends over time",
    example: "Stock prices over 12 months",
    library: "Chart.js or Plotly",
    expanded: "Line charts connect data points to reveal patterns and trends. Ideal for continuous data measured at regular intervals. Best when you want to show how values change over a time period."
  },
  {
    name: "Bar Chart",
    color: "#2196F3",
    lightColor: "#BBDEFB",
    iconType: "bar",
    useWhen: "Comparing categories",
    example: "Sales by region",
    library: "Chart.js",
    expanded: "Bar charts compare discrete categories using rectangular bars. The length of each bar represents a value. Great for comparing quantities across different groups or categories."
  },
  {
    name: "Pie/Doughnut",
    color: "#FF9800",
    lightColor: "#FFE0B2",
    iconType: "pie",
    useWhen: "Parts of a whole (max 6)",
    example: "Market share distribution",
    library: "Chart.js",
    expanded: "Pie charts show proportions of a whole as slices. Best limited to 6 or fewer categories for readability. Doughnut charts are similar but with a hollow center for additional info."
  },
  {
    name: "Scatter Plot",
    color: "#9C27B0",
    lightColor: "#E1BEE7",
    iconType: "scatter",
    useWhen: "Showing correlations",
    example: "Height vs. weight",
    library: "Chart.js or Plotly",
    expanded: "Scatter plots reveal relationships between two variables by plotting points. Excellent for identifying correlations, clusters, and outliers in your data."
  },
  {
    name: "Function Plot",
    color: "#00BCD4",
    lightColor: "#B2EBF2",
    iconType: "function",
    useWhen: "Mathematical functions",
    example: "y = sin(x)",
    library: "Plotly",
    expanded: "Function plots visualize mathematical equations as continuous curves. Perfect for teaching mathematical concepts, showing equations graphically, and exploring function behavior."
  },
  {
    name: "Radar Chart",
    color: "#FF5722",
    lightColor: "#FFCCBC",
    iconType: "radar",
    useWhen: "Multi-variable comparison",
    example: "Skill assessment profiles",
    library: "Chart.js",
    expanded: "Radar charts compare multiple variables on axes radiating from a center point. Ideal for showing strengths and weaknesses across several dimensions, like skill profiles or product comparisons."
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Chart Type Selection Guide. A 2x3 grid of chart type cards. Hover to see expanded description. Click to select and highlight a card.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate card dimensions
  let gridWidth = canvasWidth - margin * 2;
  cardSpacing = 12;
  cardWidth = (gridWidth - cardSpacing * 2) / 3;
  cardHeight = (drawHeight - 60 - cardSpacing) / 2;

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
  text("Chart Type Selection Guide", canvasWidth / 2, 10);

  // Draw the 2x3 grid of cards
  let startY = 45;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let index = row * gridCols + col;
      let x = margin + col * (cardWidth + cardSpacing);
      let y = startY + row * (cardHeight + cardSpacing);
      drawCard(index, x, y);
    }
  }

  // Draw hover tooltip if not selected
  if (hoveredCard >= 0 && selectedCard < 0) {
    drawTooltip(hoveredCard);
  }

  // Instructions in control area
  fill('#666');
  textSize(14);
  textAlign(CENTER, CENTER);
  noStroke();
  let instruction = selectedCard >= 0
    ? "Click anywhere to deselect. Hover over cards for more details."
    : "Hover over cards to see details. Click a card to highlight it.";
  text(instruction, canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawCard(index, x, y) {
  let card = chartCards[index];
  let isHovered = hoveredCard === index;
  let isSelected = selectedCard === index;

  // Card background with distinct colors
  if (isSelected) {
    fill(card.color);
    stroke(card.color);
    strokeWeight(4);
  } else if (isHovered) {
    fill(card.lightColor);
    stroke(card.color);
    strokeWeight(3);
  } else {
    fill('white');
    stroke('#ddd');
    strokeWeight(1);
  }
  rect(x, y, cardWidth, cardHeight, 8);

  // Color accent bar at top
  fill(card.color);
  noStroke();
  rect(x, y, cardWidth, 6, 8, 8, 0, 0);

  // Draw icon
  let iconX = x + 35;
  let iconY = y + 50;
  drawChartIcon(card.iconType, iconX, iconY, isSelected ? 'white' : card.color);

  // Card name
  fill(isSelected ? 'white' : '#333');
  textSize(15);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  noStroke();
  text(card.name, x + 70, y + 18);
  textStyle(NORMAL);

  // Use when
  fill(isSelected ? 'rgba(255,255,255,0.9)' : '#555');
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text("Use when:", x + 70, y + 38);

  fill(isSelected ? 'white' : '#333');
  textSize(12);
  text(card.useWhen, x + 70, y + 52, cardWidth - 80, 35);

  // Example
  fill(isSelected ? 'rgba(255,255,255,0.8)' : '#777');
  textSize(10);
  textAlign(LEFT, BOTTOM);
  noStroke();
  text("Example: " + card.example, x + 10, y + cardHeight - 25);

  // Library recommendation
  fill(isSelected ? 'rgba(255,255,255,0.7)' : '#999');
  textSize(9);
  noStroke();
  text("Library: " + card.library, x + 10, y + cardHeight - 10);
}

function drawChartIcon(type, x, y, iconColor) {
  stroke(iconColor);
  strokeWeight(2);
  fill(iconColor);

  switch(type) {
    case "line":
      // Line chart icon
      noFill();
      stroke(iconColor);
      strokeWeight(3);
      beginShape();
      vertex(x - 20, y + 12);
      vertex(x - 8, y - 5);
      vertex(x + 5, y + 5);
      vertex(x + 18, y - 12);
      endShape();
      // Points
      fill(iconColor);
      noStroke();
      ellipse(x - 20, y + 12, 6, 6);
      ellipse(x - 8, y - 5, 6, 6);
      ellipse(x + 5, y + 5, 6, 6);
      ellipse(x + 18, y - 12, 6, 6);
      break;

    case "bar":
      // Bar chart icon
      noStroke();
      rect(x - 18, y + 5, 10, 18);
      rect(x - 5, y - 8, 10, 31);
      rect(x + 8, y, 10, 23);
      break;

    case "pie":
      // Pie chart icon
      noStroke();
      let c1 = color(iconColor);
      fill(c1);
      arc(x, y, 40, 40, 0, PI * 0.7);
      // Lighter slice
      fill(red(c1), green(c1), blue(c1), 180);
      arc(x, y, 40, 40, PI * 0.7, PI * 1.4);
      // Even lighter slice
      fill(red(c1), green(c1), blue(c1), 120);
      arc(x, y, 40, 40, PI * 1.4, TWO_PI);
      break;

    case "scatter":
      // Scatter plot icon
      noStroke();
      fill(iconColor);
      ellipse(x - 15, y + 10, 7, 7);
      ellipse(x - 8, y - 6, 7, 7);
      ellipse(x + 3, y + 4, 7, 7);
      ellipse(x + 12, y - 10, 7, 7);
      ellipse(x + 16, y + 2, 7, 7);
      ellipse(x - 3, y + 12, 7, 7);
      break;

    case "function":
      // Sine wave icon
      noFill();
      stroke(iconColor);
      strokeWeight(3);
      beginShape();
      for (let i = -20; i <= 20; i += 2) {
        let py = sin(map(i, -20, 20, 0, TWO_PI)) * 12;
        vertex(x + i, y - py);
      }
      endShape();
      break;

    case "radar":
      // Radar/spider web icon
      noFill();
      stroke(iconColor);
      strokeWeight(1);
      // Draw web lines
      let numAxes = 6;
      let outerRadius = 18;
      for (let i = 0; i < numAxes; i++) {
        let angle = TWO_PI * i / numAxes - HALF_PI;
        line(x, y, x + cos(angle) * outerRadius, y + sin(angle) * outerRadius);
      }
      // Draw outer polygon
      beginShape();
      for (let i = 0; i < numAxes; i++) {
        let angle = TWO_PI * i / numAxes - HALF_PI;
        vertex(x + cos(angle) * outerRadius, y + sin(angle) * outerRadius);
      }
      endShape(CLOSE);
      // Draw inner data shape
      fill(iconColor);
      stroke(iconColor);
      strokeWeight(2);
      beginShape();
      let dataRadii = [0.7, 0.5, 0.8, 0.4, 0.6, 0.9];
      for (let i = 0; i < numAxes; i++) {
        let angle = TWO_PI * i / numAxes - HALF_PI;
        let r = outerRadius * dataRadii[i];
        vertex(x + cos(angle) * r, y + sin(angle) * r);
      }
      endShape(CLOSE);
      break;
  }
}

function drawTooltip(index) {
  let card = chartCards[index];
  let tooltipWidth = 300;
  let tooltipHeight = 100;

  // Position tooltip near mouse but keep on screen
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY + 15;

  if (tooltipX + tooltipWidth > canvasWidth - 10) {
    tooltipX = mouseX - tooltipWidth - 15;
  }
  if (tooltipY + tooltipHeight > drawHeight - 10) {
    tooltipY = mouseY - tooltipHeight - 15;
  }

  // Keep tooltip on screen
  tooltipX = constrain(tooltipX, 10, canvasWidth - tooltipWidth - 10);
  tooltipY = constrain(tooltipY, 10, drawHeight - tooltipHeight - 10);

  // Shadow
  fill(0, 0, 0, 40);
  noStroke();
  rect(tooltipX + 4, tooltipY + 4, tooltipWidth, tooltipHeight, 8);

  // Background
  fill(255, 255, 255, 250);
  stroke(card.color);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Header
  fill(card.color);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, 28, 8, 8, 0, 0);

  fill('white');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  noStroke();
  text(card.name, tooltipX + 12, tooltipY + 14);
  textStyle(NORMAL);

  // Expanded description
  fill('#333');
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text(card.expanded, tooltipX + 12, tooltipY + 38, tooltipWidth - 24, 60);
}

function getCardAtMouse() {
  let startY = 45;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let index = row * gridCols + col;
      let x = margin + col * (cardWidth + cardSpacing);
      let y = startY + row * (cardHeight + cardSpacing);

      if (mouseX >= x && mouseX <= x + cardWidth &&
          mouseY >= y && mouseY <= y + cardHeight) {
        return index;
      }
    }
  }
  return -1;
}

function mousePressed() {
  let clickedCard = getCardAtMouse();

  if (clickedCard >= 0) {
    // Toggle selection
    if (selectedCard === clickedCard) {
      selectedCard = -1;
    } else {
      selectedCard = clickedCard;
    }
  } else {
    // Clicking outside cards deselects
    selectedCard = -1;
  }
}

function mouseMoved() {
  hoveredCard = getCardAtMouse();
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
