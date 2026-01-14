// Bloom's Taxonomy MicroSim Types Pyramid
// Interactive pyramid infographic showing MicroSim types for each cognitive level

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation state
let mouseOverCanvas = false;
let pulsePhase = 0;
let selectedLevel = -1;
let hoveredLevel = -1;

// Pyramid dimensions
let pyramidTopX, pyramidTopY;
let pyramidBaseWidth;
let levelHeight;

// Bloom's Taxonomy levels with MicroSim types (bottom to top)
const levels = [
  {
    name: "Remember",
    levelNum: "L1",
    color: "#EF4444",
    hoverColor: "#FCA5A5",
    types: ["Flashcard games", "Matching exercises", "Term sorters"],
    description: "Retrieving relevant knowledge from long-term memory",
    designConsiderations: [
      "Focus on rapid recall and repetition",
      "Use immediate feedback for correct/incorrect",
      "Keep interactions simple and quick",
      "Include progress tracking for motivation"
    ],
    caseStudy: {
      title: "Vocabulary Flashcard Drill",
      description: "Students flip digital cards to match terms with definitions. Spaced repetition algorithm ensures efficient memorization."
    }
  },
  {
    name: "Understand",
    levelNum: "L2",
    color: "#F97316",
    hoverColor: "#FDBA74",
    types: ["Animated explanations", "Cause-effect demos", "Concept maps"],
    description: "Constructing meaning from instructional messages",
    designConsiderations: [
      "Show step-by-step processes clearly",
      "Allow learners to control animation pace",
      "Highlight cause-effect relationships",
      "Use multiple representations of concepts"
    ],
    caseStudy: {
      title: "Animated Water Cycle",
      description: "Interactive animation showing evaporation, condensation, and precipitation with pause/play controls and annotations."
    }
  },
  {
    name: "Apply",
    levelNum: "L3",
    color: "#F59E0B",
    hoverColor: "#FCD34D",
    types: ["Parameter sliders", "Scenario testers", "Problem solvers"],
    description: "Carrying out or using procedures in given situations",
    designConsiderations: [
      "Provide realistic problem contexts",
      "Allow parameter manipulation with feedback",
      "Show immediate results of changes",
      "Include scaffolded practice progression"
    ],
    caseStudy: {
      title: "Ohm's Law Calculator",
      description: "Sliders control voltage and resistance while circuit animation shows current flow and bulb brightness in real-time."
    }
  },
  {
    name: "Analyze",
    levelNum: "L4",
    color: "#10B981",
    hoverColor: "#6EE7B7",
    types: ["Network graphs", "Data explorers", "Pattern identification tools"],
    description: "Breaking material into parts and detecting relationships",
    designConsiderations: [
      "Enable filtering and sorting of data",
      "Highlight relationships and connections",
      "Support comparison of multiple elements",
      "Allow hypothesis testing through exploration"
    ],
    caseStudy: {
      title: "Learning Dependency Network",
      description: "Interactive graph where students explore prerequisite relationships between concepts, identifying learning pathways."
    }
  },
  {
    name: "Evaluate",
    levelNum: "L5",
    color: "#3B82F6",
    hoverColor: "#93C5FD",
    types: ["Comparison simulators", "Trade-off analyzers", "Judgment exercises"],
    description: "Making judgments based on criteria and standards",
    designConsiderations: [
      "Present clear evaluation criteria",
      "Enable side-by-side comparisons",
      "Support multi-criteria decision making",
      "Provide reasoning scaffolds for judgments"
    ],
    caseStudy: {
      title: "Algorithm Efficiency Comparator",
      description: "Students compare sorting algorithms across metrics like time, space, and stability to recommend best choice for scenarios."
    }
  },
  {
    name: "Create",
    levelNum: "L6",
    color: "#8B5CF6",
    hoverColor: "#C4B5FD",
    types: ["Model editors", "Free-form design tools", "Hypothesis builders"],
    description: "Putting elements together to form novel, coherent wholes",
    designConsiderations: [
      "Provide open-ended creation spaces",
      "Include building blocks and components",
      "Allow testing of created artifacts",
      "Support iteration and refinement"
    ],
    caseStudy: {
      title: "Circuit Designer",
      description: "Students design custom circuits by placing components, then test their creations with simulated power flow."
    }
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Track mouse for animation control
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Interactive pyramid infographic showing MicroSim types for each level of Bloom\'s Taxonomy, from Remember at the base to Create at the top. Hover over levels to see design considerations, click to see case studies.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update animation
  if (mouseOverCanvas) {
    pulsePhase += 0.03;
  }

  // Calculate pyramid dimensions
  pyramidTopX = canvasWidth / 2;
  pyramidTopY = 60;
  pyramidBaseWidth = min(canvasWidth - 140, 480);
  levelHeight = (drawHeight - pyramidTopY - 80) / 6;

  // Title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("MicroSim Types by Bloom's Taxonomy Level", canvasWidth / 2, 15);

  // Draw side arrows
  drawSideArrows();

  // Draw pyramid levels (bottom to top)
  for (let i = 0; i < 6; i++) {
    drawPyramidLevel(i);
  }

  // Draw info panel if a level is selected or hovered
  let displayLevel = selectedLevel >= 0 ? selectedLevel : hoveredLevel;
  if (displayLevel >= 0) {
    drawInfoPanel(displayLevel);
  }

  // Draw instructions in control area
  fill('#666');
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Hover to see design considerations. Click to view case studies.",
       canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawPyramidLevel(levelIndex) {
  let level = levels[levelIndex];
  let y = drawHeight - 60 - (levelIndex + 1) * levelHeight;
  let nextY = y + levelHeight;

  // Calculate trapezoid points
  let ratio = (6 - levelIndex) / 6;
  let nextRatio = (6 - levelIndex - 1) / 6;
  let topWidth = pyramidBaseWidth * nextRatio;
  let bottomWidth = pyramidBaseWidth * ratio;

  let topLeft = pyramidTopX - topWidth / 2;
  let topRight = pyramidTopX + topWidth / 2;
  let bottomLeft = pyramidTopX - bottomWidth / 2;
  let bottomRight = pyramidTopX + bottomWidth / 2;

  // Check if mouse is over this level
  let isHovered = isMouseOverLevel(levelIndex);
  let isSelected = selectedLevel === levelIndex;

  // Determine fill color
  let fillColor;
  if (isSelected) {
    fillColor = color(level.hoverColor);
  } else if (isHovered) {
    // Pulse effect on hover
    let pulse = sin(pulsePhase * 2) * 0.5 + 0.5;
    fillColor = lerpColor(color(level.color), color(level.hoverColor), pulse * 0.5 + 0.3);
  } else {
    fillColor = color(level.color);
  }

  // Draw trapezoid
  fill(fillColor);
  stroke('#444');
  strokeWeight(isHovered || isSelected ? 2 : 1);

  beginShape();
  vertex(topLeft, y);
  vertex(topRight, y);
  vertex(bottomRight, nextY);
  vertex(bottomLeft, nextY);
  endShape(CLOSE);

  // Draw level name and number
  fill('#fff');
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let centerY = y + levelHeight / 2;

  // Calculate available width at center
  let centerRatio = (6 - levelIndex - 0.5) / 6;
  let centerWidth = pyramidBaseWidth * centerRatio;

  // Draw level name
  text(level.name + " (" + level.levelNum + ")", pyramidTopX, centerY - 10);

  // Draw MicroSim types in smaller text
  textStyle(NORMAL);
  textSize(10);
  let typesText = level.types.join(" | ");

  // Only show types if there's enough width
  if (centerWidth > 200) {
    fill(255, 255, 255, 220);
    text(typesText, pyramidTopX, centerY + 10);
  }

  // Update hovered level
  if (isHovered) {
    hoveredLevel = levelIndex;
  }
}

function isMouseOverLevel(levelIndex) {
  let y = drawHeight - 60 - (levelIndex + 1) * levelHeight;
  let nextY = y + levelHeight;

  if (mouseY < y || mouseY > nextY) return false;

  // Calculate width at mouse Y position
  let t = (mouseY - y) / levelHeight;
  let ratio = (6 - levelIndex) / 6;
  let nextRatio = (6 - levelIndex - 1) / 6;
  let widthAtMouse = lerp(pyramidBaseWidth * nextRatio, pyramidBaseWidth * ratio, t);

  let leftEdge = pyramidTopX - widthAtMouse / 2;
  let rightEdge = pyramidTopX + widthAtMouse / 2;

  return mouseX >= leftEdge && mouseX <= rightEdge;
}

function drawSideArrows() {
  let arrowX = pyramidTopX - pyramidBaseWidth / 2 - 35;
  let arrowTopY = pyramidTopY + 20;
  let arrowBottomY = drawHeight - 80;

  // Left arrow (LOTS)
  stroke('#666');
  strokeWeight(2);
  line(arrowX, arrowBottomY, arrowX, arrowTopY);

  // Arrowhead
  fill('#666');
  noStroke();
  triangle(arrowX, arrowTopY - 5, arrowX - 5, arrowTopY + 8, arrowX + 5, arrowTopY + 8);

  // Label
  push();
  translate(arrowX - 12, (arrowTopY + arrowBottomY) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(NORMAL);
  fill('#666');
  text("Lower-Order Thinking (LOTS)", 0, 0);
  pop();

  // Right arrow (HOTS)
  arrowX = pyramidTopX + pyramidBaseWidth / 2 + 35;
  stroke('#666');
  strokeWeight(2);
  line(arrowX, arrowBottomY, arrowX, arrowTopY);

  // Arrowhead
  fill('#666');
  noStroke();
  triangle(arrowX, arrowTopY - 5, arrowX - 5, arrowTopY + 8, arrowX + 5, arrowTopY + 8);

  // Label
  push();
  translate(arrowX + 12, (arrowTopY + arrowBottomY) / 2);
  rotate(HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(NORMAL);
  fill('#666');
  text("Higher-Order Thinking (HOTS)", 0, 0);
  pop();
}

function drawInfoPanel(levelIndex) {
  let level = levels[levelIndex];
  let panelWidth = min(280, canvasWidth * 0.4);
  let panelHeight = selectedLevel >= 0 ? 240 : 160;
  let panelX = canvasWidth - panelWidth - 15;
  let panelY = 45;

  // Panel background
  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Level header
  fill(level.color);
  noStroke();
  rect(panelX, panelY, panelWidth, 28, 8, 8, 0, 0);

  // Level name
  fill('#fff');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(level.name + " (" + level.levelNum + ")", panelX + 12, panelY + 14);
  textStyle(NORMAL);

  // Description
  fill('#444');
  textSize(11);
  textAlign(LEFT, TOP);
  text(level.description, panelX + 12, panelY + 38, panelWidth - 24, 30);

  // MicroSim types
  fill('#666');
  textSize(10);
  textStyle(BOLD);
  text("MicroSim Types:", panelX + 12, panelY + 62);
  textStyle(NORMAL);
  fill('#555');
  text(level.types.join(", "), panelX + 12, panelY + 75, panelWidth - 24, 30);

  // Design considerations
  fill('#666');
  textSize(10);
  textStyle(BOLD);
  text("Design Considerations:", panelX + 12, panelY + 100);
  textStyle(NORMAL);
  fill('#555');
  let consY = panelY + 113;
  for (let i = 0; i < min(level.designConsiderations.length, 3); i++) {
    text("- " + level.designConsiderations[i], panelX + 12, consY, panelWidth - 24, 20);
    consY += 14;
  }

  // Case study (only when selected)
  if (selectedLevel >= 0) {
    fill('#333');
    textSize(11);
    textStyle(BOLD);
    text("Case Study:", panelX + 12, panelY + 165);
    textStyle(NORMAL);
    fill('#2563EB');
    textSize(10);
    text(level.caseStudy.title, panelX + 12, panelY + 180, panelWidth - 24, 20);
    fill('#555');
    textSize(10);
    text(level.caseStudy.description, panelX + 12, panelY + 195, panelWidth - 24, 50);
  }
}

function mousePressed() {
  // Check if clicked on a level
  for (let i = 0; i < 6; i++) {
    if (isMouseOverLevel(i)) {
      selectedLevel = (selectedLevel === i) ? -1 : i;
      return;
    }
  }
  // Clicked elsewhere, deselect
  selectedLevel = -1;
}

function mouseMoved() {
  hoveredLevel = -1;
  for (let i = 0; i < 6; i++) {
    if (isMouseOverLevel(i)) {
      hoveredLevel = i;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
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
