// Spatial Visualization Types MicroSim
// 2x3 grid showing different types of spatial visualizations with icons and hover descriptions

// Canvas dimensions
let canvasWidth = 600;
let canvasHeight = 450;
let margin = 20;

// Grid dimensions
let gridCols = 3;
let gridRows = 2;
let cellWidth;
let cellHeight;
let gridLeft;
let gridTop;

// Visualization types data
const vizTypes = [
  {
    name: "Geographic Map",
    icon: "globe",
    color: "#3498DB",
    useWhen: "Use when showing location-based data, regional comparisons, or spatial distribution across real-world geography.",
    examples: ["Weather patterns", "Population density", "Store locations", "Election results by region"]
  },
  {
    name: "Schematic Diagram",
    icon: "circuit",
    color: "#E67E22",
    useWhen: "Use when showing system components and their logical connections, without concern for physical scale or position.",
    examples: ["Circuit diagrams", "Software architecture", "Process flows", "Organizational charts"]
  },
  {
    name: "Floor Plan",
    icon: "floorplan",
    color: "#2ECC71",
    useWhen: "Use when showing the layout of physical spaces, room arrangements, or navigation within buildings.",
    examples: ["Building layouts", "Office arrangements", "Emergency exit routes", "Retail store design"]
  },
  {
    name: "Anatomical View",
    icon: "anatomy",
    color: "#E74C3C",
    useWhen: "Use when showing internal structure of biological or complex systems with precise spatial relationships.",
    examples: ["Human body systems", "Plant structure", "Machine internals", "Device components"]
  },
  {
    name: "Network Topology",
    icon: "network",
    color: "#9B59B6",
    useWhen: "Use when showing connections between nodes, relationships, or data flow paths in abstract space.",
    examples: ["Computer networks", "Social connections", "Concept maps", "Supply chains"]
  },
  {
    name: "3D Model",
    icon: "cube",
    color: "#1ABC9C",
    useWhen: "Use when showing three-dimensional objects that need to be viewed from multiple angles or rotated.",
    examples: ["Product designs", "Architectural models", "Molecular structures", "Terrain visualization"]
  }
];

// Hover state
let hoveredIndex = -1;
let tooltipAlpha = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  calculateDimensions();

  describe('A 2x3 grid showing six types of spatial visualizations: Geographic Map, Schematic Diagram, Floor Plan, Anatomical View, Network Topology, and 3D Model. Hover over each to learn when to use it.', LABEL);
}

function calculateDimensions() {
  // Calculate grid dimensions with margins
  let availableWidth = canvasWidth - margin * 2;
  let availableHeight = canvasHeight - margin * 2 - 50; // Room for title

  cellWidth = availableWidth / gridCols - 10;
  cellHeight = availableHeight / gridRows - 10;

  gridLeft = margin;
  gridTop = margin + 50;
}

function draw() {
  updateCanvasSize();
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Spatial Visualization Types", canvasWidth / 2, 15);
  textStyle(NORMAL);

  // Subtitle
  fill(100);
  textSize(13);
  text("Hover over each type to learn when to use it", canvasWidth / 2, 42);

  // Find hovered cell
  hoveredIndex = -1;

  // Draw grid cells
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let index = row * gridCols + col;
      let cellX = gridLeft + col * (cellWidth + 10);
      let cellY = gridTop + row * (cellHeight + 10);

      // Check hover
      let isHovered = mouseX >= cellX && mouseX <= cellX + cellWidth &&
                      mouseY >= cellY && mouseY <= cellY + cellHeight;

      if (isHovered) {
        hoveredIndex = index;
      }

      drawCell(vizTypes[index], cellX, cellY, isHovered);
    }
  }

  // Draw tooltip if hovering
  if (hoveredIndex >= 0) {
    tooltipAlpha = min(tooltipAlpha + 15, 255);
    drawTooltip(vizTypes[hoveredIndex]);
  } else {
    tooltipAlpha = max(tooltipAlpha - 20, 0);
  }
}

function drawCell(vizType, x, y, isHovered) {
  // Cell background
  let bgColor = color(vizType.color);

  if (isHovered) {
    // Brighter on hover
    fill(red(bgColor) + 25, green(bgColor) + 25, blue(bgColor) + 25);
    stroke(50);
    strokeWeight(3);
  } else {
    fill(bgColor);
    stroke(150);
    strokeWeight(1);
  }

  rect(x, y, cellWidth, cellHeight, 10);

  // Draw icon
  let iconX = x + cellWidth / 2;
  let iconY = y + cellHeight * 0.4;
  let iconSize = min(cellWidth, cellHeight) * 0.35;

  fill(255);
  noStroke();
  drawIcon(vizType.icon, iconX, iconY, iconSize);

  // Draw name
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(vizType.name, x + cellWidth / 2, y + cellHeight * 0.78);
  textStyle(NORMAL);
}

function drawIcon(iconType, x, y, size) {
  push();
  translate(x, y);
  fill(255);
  stroke(255);
  strokeWeight(2);

  switch(iconType) {
    case "globe":
      // Globe icon - circle with latitude/longitude lines
      noFill();
      ellipse(0, 0, size, size);
      // Equator
      line(-size/2, 0, size/2, 0);
      // Vertical line
      line(0, -size/2, 0, size/2);
      // Curved latitude lines
      noFill();
      arc(0, 0, size * 0.6, size * 0.4, 0, PI);
      arc(0, 0, size * 0.6, size * 0.4, PI, TWO_PI);
      break;

    case "circuit":
      // Schematic/circuit icon
      noFill();
      // Main lines
      line(-size/2, 0, -size/4, 0);
      line(size/4, 0, size/2, 0);
      // Box component
      rect(-size/4, -size/6, size/2, size/3);
      // Connection dots
      fill(255);
      noStroke();
      ellipse(-size/2, 0, size/8, size/8);
      ellipse(size/2, 0, size/8, size/8);
      // Vertical connectors
      stroke(255);
      line(0, -size/3, 0, -size/6);
      line(0, size/6, 0, size/3);
      break;

    case "floorplan":
      // Floor plan icon - room layout
      noFill();
      // Outer walls
      rect(-size/2, -size/2, size, size);
      // Interior walls
      line(-size/6, -size/2, -size/6, size/6);
      line(-size/6, size/6, size/2, size/6);
      // Door opening
      noStroke();
      fill(vizTypes[2].color);
      rect(-size/2 + 2, -size/8, size/5, size/4);
      fill(255);
      stroke(255);
      // Room indicator
      noFill();
      ellipse(size/6, -size/6, size/4, size/4);
      break;

    case "anatomy":
      // Anatomical view - simplified body outline
      noFill();
      // Head
      ellipse(0, -size/3, size/3, size/3);
      // Body
      line(0, -size/6, 0, size/4);
      // Arms
      line(-size/3, 0, size/3, 0);
      // Legs
      line(0, size/4, -size/4, size/2);
      line(0, size/4, size/4, size/2);
      // Internal organ indicator
      fill(255);
      noStroke();
      ellipse(0, size/12, size/6, size/5);
      break;

    case "network":
      // Network topology - nodes and connections
      fill(255);
      noStroke();
      // Central node
      ellipse(0, 0, size/4, size/4);
      // Surrounding nodes
      ellipse(-size/3, -size/4, size/5, size/5);
      ellipse(size/3, -size/4, size/5, size/5);
      ellipse(-size/3, size/4, size/5, size/5);
      ellipse(size/3, size/4, size/5, size/5);
      // Connections
      stroke(255);
      strokeWeight(1.5);
      line(0, 0, -size/3, -size/4);
      line(0, 0, size/3, -size/4);
      line(0, 0, -size/3, size/4);
      line(0, 0, size/3, size/4);
      break;

    case "cube":
      // 3D cube icon
      noFill();
      let s = size * 0.4;
      let offset = size * 0.15;
      // Front face
      rect(-s/2, -s/2 + offset, s, s);
      // Top face
      beginShape();
      vertex(-s/2, -s/2 + offset);
      vertex(-s/2 + offset, -s/2);
      vertex(s/2 + offset, -s/2);
      vertex(s/2, -s/2 + offset);
      endShape(CLOSE);
      // Right face
      beginShape();
      vertex(s/2, -s/2 + offset);
      vertex(s/2 + offset, -s/2);
      vertex(s/2 + offset, s/2);
      vertex(s/2, s/2 + offset);
      endShape(CLOSE);
      break;
  }

  pop();
}

function drawTooltip(vizType) {
  // Calculate tooltip position - centered below grid or at cursor
  let tooltipWidth = min(canvasWidth - 40, 350);
  let tooltipX = canvasWidth / 2 - tooltipWidth / 2;
  let tooltipY = canvasHeight - 130;

  // Draw tooltip background
  fill(40, 40, 50, tooltipAlpha * 0.95);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, 115, 8);

  // Colored accent bar
  fill(red(color(vizType.color)), green(color(vizType.color)), blue(color(vizType.color)), tooltipAlpha);
  rect(tooltipX, tooltipY, 6, 115, 8, 0, 0, 8);

  // Tooltip content
  let contentX = tooltipX + 20;
  let contentY = tooltipY + 15;

  // Title
  fill(255, 255, 255, tooltipAlpha);
  textSize(15);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(vizType.name, contentX, contentY);
  textStyle(NORMAL);

  // Use when description
  fill(220, 220, 230, tooltipAlpha);
  textSize(12);
  let descLines = wrapText(vizType.useWhen, tooltipWidth - 35);
  let lineY = contentY + 25;
  for (let line of descLines) {
    text(line, contentX, lineY);
    lineY += 16;
  }

  // Examples
  fill(180, 180, 200, tooltipAlpha);
  textSize(11);
  textStyle(ITALIC);
  let exampleText = "Examples: " + vizType.examples.join(", ");
  let exampleLines = wrapText(exampleText, tooltipWidth - 35);
  for (let line of exampleLines) {
    text(line, contentX, lineY);
    lineY += 14;
  }
  textStyle(NORMAL);
}

function wrapText(txt, maxWidth) {
  let words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
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
