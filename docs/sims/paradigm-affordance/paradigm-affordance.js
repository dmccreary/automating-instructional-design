// Paradigm Affordance Matrix MicroSim
// Shows how different visualization paradigms afford different learning interactions
// Rows: Visualization types, Columns: Bloom's levels
// Click row to highlight, hover cell for description

// Canvas dimensions
let canvasWidth = 600;
let canvasHeight = 450;
let margin = 20;

// Table dimensions
let tableLeft;
let tableTop;
let tableWidth;
let tableHeight;
let rowHeight;
let colWidth;
let headerHeight = 50;
let rowLabelWidth = 110;

// Visualization paradigms (rows)
const visualizations = [
  {
    name: "Timeline",
    description: "Sequential visualization showing events over time",
    affordances: [3, 3, 2, 2, 1, 1] // Strength for each Bloom level (1-3)
  },
  {
    name: "Map",
    description: "Spatial visualization showing geographic relationships",
    affordances: [3, 3, 3, 2, 1, 2]
  },
  {
    name: "Network",
    description: "Graph visualization showing connections and relationships",
    affordances: [2, 3, 2, 3, 2, 2]
  },
  {
    name: "Chart",
    description: "Statistical visualization for comparing quantities",
    affordances: [3, 3, 3, 3, 2, 1]
  },
  {
    name: "Flowchart",
    description: "Process visualization showing steps and decisions",
    affordances: [2, 3, 3, 2, 2, 3]
  }
];

// Bloom's taxonomy levels (columns)
const bloomLevels = [
  { name: "Remember", short: "L1", color: "#E74C3C", description: "Recall facts and basic concepts" },
  { name: "Understand", short: "L2", color: "#E67E22", description: "Explain ideas or concepts" },
  { name: "Apply", short: "L3", color: "#F1C40F", description: "Use information in new situations" },
  { name: "Analyze", short: "L4", color: "#2ECC71", description: "Draw connections among ideas" },
  { name: "Evaluate", short: "L5", color: "#3498DB", description: "Justify decisions or judgments" },
  { name: "Create", short: "L6", color: "#9B59B6", description: "Produce new or original work" }
];

// Affordance descriptions for each combination
const affordanceDescriptions = {
  "Timeline-Remember": "Timelines help recall sequences of events and dates",
  "Timeline-Understand": "Shows cause-effect relationships over time",
  "Timeline-Apply": "Can apply historical patterns to current events",
  "Timeline-Analyze": "Compare parallel timelines and identify patterns",
  "Timeline-Evaluate": "Assess historical significance and turning points",
  "Timeline-Create": "Design new timelines for complex narratives",

  "Map-Remember": "Maps help memorize locations and spatial relationships",
  "Map-Understand": "Visualize geographic concepts and distributions",
  "Map-Apply": "Navigate and plan routes using spatial knowledge",
  "Map-Analyze": "Identify spatial patterns and regional differences",
  "Map-Evaluate": "Assess environmental or demographic impacts",
  "Map-Create": "Design custom maps for specific purposes",

  "Network-Remember": "Networks show basic entity relationships",
  "Network-Understand": "Explain connections and influence paths",
  "Network-Apply": "Trace information flow through systems",
  "Network-Analyze": "Identify clusters, hubs, and critical nodes",
  "Network-Evaluate": "Assess network resilience and bottlenecks",
  "Network-Create": "Design new organizational structures",

  "Chart-Remember": "Charts display data for quick recall",
  "Chart-Understand": "Explain trends and comparisons visually",
  "Chart-Apply": "Use chart data to solve problems",
  "Chart-Analyze": "Compare datasets and identify outliers",
  "Chart-Evaluate": "Judge data quality and significance",
  "Chart-Create": "Limited - charts present rather than create",

  "Flowchart-Remember": "Flowcharts show process steps to remember",
  "Flowchart-Understand": "Clarify decision logic and branching",
  "Flowchart-Apply": "Follow procedures in real situations",
  "Flowchart-Analyze": "Identify inefficiencies and alternatives",
  "Flowchart-Evaluate": "Assess process effectiveness",
  "Flowchart-Create": "Design new workflows and algorithms"
};

// Interaction state
let selectedRow = -1;
let hoveredCell = { row: -1, col: -1 };
let hoveredHeader = -1;

// Info panel
let infoPanelY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  calculateDimensions();

  describe('Interactive matrix showing how visualization paradigms (Timeline, Map, Network, Chart, Flowchart) support different Bloom\'s Taxonomy levels. Click rows to select, hover cells for details.', LABEL);
}

function calculateDimensions() {
  tableLeft = margin;
  tableTop = margin + 30;
  tableWidth = canvasWidth - margin * 2;
  tableHeight = canvasHeight - margin - 130 - tableTop; // Leave room for info panel

  rowHeight = (tableHeight - headerHeight) / visualizations.length;
  colWidth = (tableWidth - rowLabelWidth) / bloomLevels.length;

  infoPanelY = tableTop + tableHeight + 15;
}

function draw() {
  updateCanvasSize();
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Visualization Paradigm Affordances", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Reset hover states
  hoveredCell = { row: -1, col: -1 };
  hoveredHeader = -1;

  // Draw table
  drawTable();

  // Draw info panel
  drawInfoPanel();

  // Draw legend
  drawLegend();
}

function drawTable() {
  // Draw header row background
  fill(240);
  stroke(180);
  strokeWeight(1);
  rect(tableLeft, tableTop, tableWidth, headerHeight);

  // Draw "Paradigm" label in header
  fill(80);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text("Paradigm", tableLeft + rowLabelWidth / 2, tableTop + headerHeight / 2);

  // Draw Bloom level column headers
  for (let c = 0; c < bloomLevels.length; c++) {
    let x = tableLeft + rowLabelWidth + c * colWidth;
    let y = tableTop;

    // Check hover on header
    if (mouseX >= x && mouseX < x + colWidth && mouseY >= y && mouseY < y + headerHeight) {
      hoveredHeader = c;
    }

    // Header cell background with color
    let levelColor = color(bloomLevels[c].color);
    if (hoveredHeader === c) {
      fill(red(levelColor), green(levelColor), blue(levelColor), 200);
    } else {
      fill(red(levelColor), green(levelColor), blue(levelColor), 150);
    }
    stroke(180);
    strokeWeight(1);
    rect(x, y, colWidth, headerHeight);

    // Header text
    fill(255);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(bloomLevels[c].name, x + colWidth / 2, y + headerHeight / 2 - 8);
    textStyle(NORMAL);
    textSize(10);
    fill(255, 255, 255, 200);
    text(bloomLevels[c].short, x + colWidth / 2, y + headerHeight / 2 + 10);
  }

  // Draw data rows
  for (let r = 0; r < visualizations.length; r++) {
    let y = tableTop + headerHeight + r * rowHeight;
    let isSelected = (selectedRow === r);

    // Row label background
    if (isSelected) {
      fill(220, 230, 245);
    } else {
      fill(r % 2 === 0 ? 255 : 248);
    }
    stroke(180);
    strokeWeight(1);
    rect(tableLeft, y, rowLabelWidth, rowHeight);

    // Row label text
    fill(50);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(isSelected ? BOLD : NORMAL);
    text(visualizations[r].name, tableLeft + rowLabelWidth / 2, y + rowHeight / 2);
    textStyle(NORMAL);

    // Data cells
    for (let c = 0; c < bloomLevels.length; c++) {
      let x = tableLeft + rowLabelWidth + c * colWidth;

      // Check hover
      if (mouseX >= x && mouseX < x + colWidth && mouseY >= y && mouseY < y + rowHeight) {
        hoveredCell = { row: r, col: c };
      }

      let isHovered = (hoveredCell.row === r && hoveredCell.col === c);

      // Cell background
      if (isHovered) {
        fill(230, 240, 250);
      } else if (isSelected) {
        fill(235, 242, 250);
      } else {
        fill(r % 2 === 0 ? 255 : 250);
      }
      stroke(200);
      strokeWeight(1);
      rect(x, y, colWidth, rowHeight);

      // Affordance indicator
      let affordanceLevel = visualizations[r].affordances[c];
      let levelColor = color(bloomLevels[c].color);
      drawAffordanceIndicator(x + colWidth / 2, y + rowHeight / 2, affordanceLevel, levelColor, isHovered);
    }
  }
}

function drawAffordanceIndicator(cx, cy, level, levelColor, isHovered) {
  // Draw dots or checkmarks based on affordance level
  let size = isHovered ? 10 : 8;

  noStroke();

  if (level === 3) {
    // Strong affordance - filled circle with check
    fill(levelColor);
    ellipse(cx, cy, size * 2.2, size * 2.2);
    fill(255);
    textSize(size * 1.2);
    textAlign(CENTER, CENTER);
    text("\u2713", cx, cy);
  } else if (level === 2) {
    // Moderate affordance - half-filled circle
    fill(red(levelColor), green(levelColor), blue(levelColor), 150);
    ellipse(cx, cy, size * 1.8, size * 1.8);
    fill(255);
    textSize(size);
    textAlign(CENTER, CENTER);
    text("~", cx, cy - 1);
  } else {
    // Weak affordance - outline only
    stroke(red(levelColor), green(levelColor), blue(levelColor), 150);
    strokeWeight(2);
    noFill();
    ellipse(cx, cy, size * 1.5, size * 1.5);
  }
}

function drawInfoPanel() {
  let panelHeight = 70;

  // Panel background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(tableLeft, infoPanelY, tableWidth, panelHeight, 5);

  let contentX = tableLeft + 15;
  let contentY = infoPanelY + 12;

  if (hoveredCell.row >= 0 && hoveredCell.col >= 0) {
    // Show cell information
    let viz = visualizations[hoveredCell.row];
    let bloom = bloomLevels[hoveredCell.col];
    let key = viz.name + "-" + bloom.name;
    let description = affordanceDescriptions[key] || "Interaction description not available";
    let affordanceLevel = viz.affordances[hoveredCell.col];
    let strengthText = affordanceLevel === 3 ? "Strong" : (affordanceLevel === 2 ? "Moderate" : "Weak");

    // Title line
    fill(color(bloom.color));
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(viz.name + " + " + bloom.name, contentX, contentY);

    // Strength indicator
    fill(80);
    textStyle(NORMAL);
    textSize(12);
    text(" (" + strengthText + " affordance)", contentX + textWidth(viz.name + " + " + bloom.name) + 5, contentY + 2);

    // Description
    fill(60);
    textSize(13);
    text(description, contentX, contentY + 22);

    // Bloom level description
    fill(120);
    textSize(11);
    text("Bloom's " + bloom.name + ": " + bloom.description, contentX, contentY + 44);

  } else if (hoveredHeader >= 0) {
    // Show header information
    let bloom = bloomLevels[hoveredHeader];

    fill(color(bloom.color));
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(bloom.name + " (Level " + (hoveredHeader + 1) + ")", contentX, contentY);

    textStyle(NORMAL);
    fill(60);
    textSize(13);
    text(bloom.description, contentX, contentY + 22);

    // Count strong affordances
    let strongCount = 0;
    for (let v of visualizations) {
      if (v.affordances[hoveredHeader] === 3) strongCount++;
    }
    fill(100);
    textSize(11);
    text(strongCount + " of " + visualizations.length + " paradigms have strong affordance for this level", contentX, contentY + 44);

  } else if (selectedRow >= 0) {
    // Show selected row information
    let viz = visualizations[selectedRow];

    fill(50);
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(viz.name, contentX, contentY);

    textStyle(NORMAL);
    fill(60);
    textSize(13);
    text(viz.description, contentX, contentY + 22);

    // Summarize affordances
    let strong = viz.affordances.filter(a => a === 3).length;
    let moderate = viz.affordances.filter(a => a === 2).length;
    fill(100);
    textSize(11);
    text("Strong affordance: " + strong + " levels | Moderate: " + moderate + " levels | Weak: " + (6 - strong - moderate) + " levels", contentX, contentY + 44);

  } else {
    // Default instructions
    fill(100);
    textSize(13);
    textAlign(CENTER, CENTER);
    text("Hover over cells to see how each visualization paradigm supports different Bloom's levels", tableLeft + tableWidth / 2, infoPanelY + panelHeight / 2 - 8);
    textSize(11);
    fill(130);
    text("Click a row to select and highlight a paradigm", tableLeft + tableWidth / 2, infoPanelY + panelHeight / 2 + 12);
  }

  textStyle(NORMAL);
}

function drawLegend() {
  let legendY = infoPanelY + 85;
  let legendX = tableLeft + 15;

  fill(80);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text("Legend:", legendX, legendY);

  // Strong
  legendX += 55;
  fill(100, 150, 200);
  ellipse(legendX, legendY, 16, 16);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("\u2713", legendX, legendY);
  fill(80);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("Strong", legendX + 15, legendY);

  // Moderate
  legendX += 70;
  fill(100, 150, 200, 150);
  noStroke();
  ellipse(legendX, legendY, 14, 14);
  fill(255);
  textSize(9);
  textAlign(CENTER, CENTER);
  text("~", legendX, legendY - 1);
  fill(80);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("Moderate", legendX + 12, legendY);

  // Weak
  legendX += 80;
  stroke(100, 150, 200, 150);
  strokeWeight(2);
  noFill();
  ellipse(legendX, legendY, 12, 12);
  fill(80);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text("Weak", legendX + 12, legendY);
}

function mousePressed() {
  // Check if clicking on a row label to select
  for (let r = 0; r < visualizations.length; r++) {
    let y = tableTop + headerHeight + r * rowHeight;
    if (mouseX >= tableLeft && mouseX < tableLeft + rowLabelWidth &&
        mouseY >= y && mouseY < y + rowHeight) {
      if (selectedRow === r) {
        selectedRow = -1; // Deselect if already selected
      } else {
        selectedRow = r;
      }
      return;
    }
  }

  // Check if clicking on a data cell to select its row
  for (let r = 0; r < visualizations.length; r++) {
    let y = tableTop + headerHeight + r * rowHeight;
    if (mouseX >= tableLeft + rowLabelWidth && mouseX < tableLeft + tableWidth &&
        mouseY >= y && mouseY < y + rowHeight) {
      if (selectedRow === r) {
        selectedRow = -1;
      } else {
        selectedRow = r;
      }
      return;
    }
  }
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
