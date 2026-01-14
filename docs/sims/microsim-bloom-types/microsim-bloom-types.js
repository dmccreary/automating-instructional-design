// MicroSim Types by Bloom's Taxonomy Level
// Interactive infographic showing MicroSim types mapped to cognitive levels

// Canvas dimensions
let canvasWidth = 750;
let drawHeight = 480;
let canvasHeight = 500;

// Bloom's Taxonomy data with colors (bottom to top: Remember to Create)
const bloomLevels = [
  {
    level: "Create",
    color: "#9C27B0", // Purple
    types: ["Model Builder", "Design Canvas"]
  },
  {
    level: "Evaluate",
    color: "#E91E63", // Pink
    types: ["Quality Classifier", "Rubric Applier"]
  },
  {
    level: "Analyze",
    color: "#F44336", // Red
    types: ["Data Explorer", "Pattern Detector"]
  },
  {
    level: "Apply",
    color: "#FF9800", // Orange
    types: ["Interactive Calculator", "Step-by-Step Solver"]
  },
  {
    level: "Understand",
    color: "#FFEB3B", // Yellow
    types: ["Animated Explainer", "Comparison Viewer"]
  },
  {
    level: "Remember",
    color: "#4CAF50", // Green
    types: ["Flashcard Drill", "Term Matcher", "Concept Sorter"]
  }
];

// Hover state
let hoveredLevel = -1;
let hoveredType = -1;

// Layout constants
let marginLeft = 120;
let marginRight = 30;
let marginTop = 50;
let marginBottom = 30;
let rowHeight;
let contentWidth;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');

  // Calculate layout
  rowHeight = (drawHeight - marginTop - marginBottom) / bloomLevels.length;
  contentWidth = canvasWidth - marginLeft - marginRight;

  textFont('Arial');
  noStroke();
}

function updateCanvasSize() {
  const container = document.getElementById('canvas-container');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  contentWidth = canvasWidth - marginLeft - marginRight;
}

function draw() {
  background(245);

  // Title
  fill(50);
  textSize(20);
  textAlign(CENTER, TOP);
  text("MicroSim Types by Bloom's Taxonomy Level", canvasWidth / 2, 12);

  // Draw each level row
  for (let i = 0; i < bloomLevels.length; i++) {
    drawLevelRow(i);
  }

  // Draw legend/instructions at bottom
  fill(100);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text("Hover over MicroSim types for details", canvasWidth / 2, canvasHeight - 5);
}

function drawLevelRow(index) {
  const level = bloomLevels[index];
  const y = marginTop + index * rowHeight;
  const isHovered = (hoveredLevel === index);

  // Level label background (left side)
  const labelWidth = marginLeft - 10;
  const labelHeight = rowHeight - 8;
  const labelY = y + 4;

  // Draw level label with rounded rectangle
  fill(level.color);
  if (isHovered) {
    stroke(50);
    strokeWeight(2);
  } else {
    noStroke();
  }
  rect(5, labelY, labelWidth, labelHeight, 8);
  noStroke();

  // Level text
  fill(getContrastColor(level.color));
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(level.level, 5 + labelWidth / 2, labelY + labelHeight / 2);
  textStyle(NORMAL);

  // Draw MicroSim type cards
  const cardMargin = 10;
  const numTypes = level.types.length;
  const cardWidth = (contentWidth - (numTypes + 1) * cardMargin) / numTypes;
  const cardHeight = rowHeight - 16;
  const cardY = y + 8;

  for (let j = 0; j < numTypes; j++) {
    const cardX = marginLeft + cardMargin + j * (cardWidth + cardMargin);
    const isTypeHovered = (hoveredLevel === index && hoveredType === j);

    // Card shadow
    fill(200);
    noStroke();
    rect(cardX + 3, cardY + 3, cardWidth, cardHeight, 6);

    // Card background
    if (isTypeHovered) {
      fill(lightenColor(level.color, 0.7));
      stroke(level.color);
      strokeWeight(3);
    } else {
      fill(255);
      stroke(220);
      strokeWeight(1);
    }
    rect(cardX, cardY, cardWidth, cardHeight, 6);
    noStroke();

    // Card text
    fill(50);
    textSize(isTypeHovered ? 13 : 12);
    textAlign(CENTER, CENTER);

    // Word wrap for longer names
    const typeName = level.types[j];
    const words = typeName.split(' ');
    if (words.length > 1 && textWidth(typeName) > cardWidth - 10) {
      textSize(11);
      text(words[0], cardX + cardWidth / 2, cardY + cardHeight / 2 - 8);
      text(words.slice(1).join(' '), cardX + cardWidth / 2, cardY + cardHeight / 2 + 8);
    } else {
      text(typeName, cardX + cardWidth / 2, cardY + cardHeight / 2);
    }

    // Hover tooltip
    if (isTypeHovered) {
      drawTooltip(cardX + cardWidth / 2, cardY, level.level, typeName);
    }
  }
}

function drawTooltip(x, y, levelName, typeName) {
  const descriptions = {
    "Flashcard Drill": "Quick recall practice with flip cards for memorizing facts and definitions",
    "Term Matcher": "Match terms to definitions to reinforce vocabulary",
    "Concept Sorter": "Categorize items into groups to organize knowledge",
    "Animated Explainer": "Watch step-by-step animations that illustrate concepts",
    "Comparison Viewer": "Compare and contrast multiple items side by side",
    "Interactive Calculator": "Input values and see real-time calculations",
    "Step-by-Step Solver": "Follow guided procedures to solve problems",
    "Data Explorer": "Investigate datasets to discover patterns",
    "Pattern Detector": "Identify trends and relationships in information",
    "Quality Classifier": "Judge items against criteria and standards",
    "Rubric Applier": "Evaluate work using structured scoring guides",
    "Model Builder": "Construct custom models from components",
    "Design Canvas": "Create original designs with interactive tools"
  };

  const desc = descriptions[typeName] || "Interactive learning simulation";

  // Tooltip dimensions
  textSize(11);
  const padding = 10;
  const tooltipWidth = min(250, textWidth(desc) + padding * 2);
  const tooltipHeight = 50;

  // Position tooltip above the card
  let tooltipX = x - tooltipWidth / 2;
  let tooltipY = y - tooltipHeight - 10;

  // Keep tooltip within canvas bounds
  tooltipX = constrain(tooltipX, 5, canvasWidth - tooltipWidth - 5);
  if (tooltipY < 40) {
    tooltipY = y + rowHeight + 5;
  }

  // Draw tooltip background
  fill(50, 50, 50, 240);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 6);

  // Draw arrow
  const arrowX = constrain(x, tooltipX + 15, tooltipX + tooltipWidth - 15);
  if (tooltipY < y) {
    triangle(arrowX - 6, tooltipY + tooltipHeight,
             arrowX + 6, tooltipY + tooltipHeight,
             arrowX, tooltipY + tooltipHeight + 8);
  } else {
    triangle(arrowX - 6, tooltipY,
             arrowX + 6, tooltipY,
             arrowX, tooltipY - 8);
  }

  // Tooltip text
  fill(255);
  textAlign(LEFT, TOP);
  textSize(11);
  text(wrapText(desc, tooltipWidth - padding * 2), tooltipX + padding, tooltipY + padding);
}

function wrapText(txt, maxWidth) {
  const words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    if (textWidth(testLine) <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines.join('\n');
}

function mouseMoved() {
  hoveredLevel = -1;
  hoveredType = -1;

  // Check each level row
  for (let i = 0; i < bloomLevels.length; i++) {
    const level = bloomLevels[i];
    const y = marginTop + i * rowHeight;
    const cardY = y + 8;
    const cardHeight = rowHeight - 16;

    // Check if mouse is in level label area
    if (mouseX >= 5 && mouseX <= marginLeft - 5 &&
        mouseY >= y + 4 && mouseY <= y + rowHeight - 4) {
      hoveredLevel = i;
      break;
    }

    // Check each type card
    const cardMargin = 10;
    const numTypes = level.types.length;
    const cardWidth = (contentWidth - (numTypes + 1) * cardMargin) / numTypes;

    for (let j = 0; j < numTypes; j++) {
      const cardX = marginLeft + cardMargin + j * (cardWidth + cardMargin);

      if (mouseX >= cardX && mouseX <= cardX + cardWidth &&
          mouseY >= cardY && mouseY <= cardY + cardHeight) {
        hoveredLevel = i;
        hoveredType = j;
        break;
      }
    }

    if (hoveredLevel !== -1) break;
  }

  // Change cursor style
  if (hoveredLevel !== -1) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function getContrastColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#333333' : '#FFFFFF';
}

function lightenColor(hexColor, factor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const newR = Math.round(r + (255 - r) * factor);
  const newG = Math.round(g + (255 - g) * factor);
  const newB = Math.round(b + (255 - b) * factor);

  return color(newR, newG, newB);
}
