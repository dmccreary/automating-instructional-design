// Bloom's Taxonomy Action Verb Wheel MicroSim
// An interactive tool for selecting appropriate action verbs when writing learning objectives

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 660;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

// Wheel parameters
let centerX, centerY;
let outerRadius, innerRadius, verbRadius;

// Bloom's Taxonomy data
const bloomLevels = [
  {
    name: "Remember",
    color: "#4A90D9",
    description: "Recall facts and basic concepts",
    verbs: ["list", "define", "recall", "identify", "name", "recognize", "locate", "describe"],
    example: "Students will be able to [VERB] key vocabulary terms from the unit."
  },
  {
    name: "Understand",
    color: "#5CB85C",
    description: "Explain ideas or concepts",
    verbs: ["explain", "summarize", "interpret", "classify", "compare", "contrast", "exemplify", "infer"],
    example: "Students will be able to [VERB] the main concepts in their own words."
  },
  {
    name: "Apply",
    color: "#F0AD4E",
    description: "Use information in new situations",
    verbs: ["use", "execute", "implement", "solve", "demonstrate", "calculate", "apply", "practice"],
    example: "Students will be able to [VERB] learned techniques to solve new problems."
  },
  {
    name: "Analyze",
    color: "#E67E22",
    description: "Draw connections among ideas",
    verbs: ["differentiate", "organize", "attribute", "compare", "contrast", "examine", "deconstruct", "distinguish"],
    example: "Students will be able to [VERB] the relationship between variables."
  },
  {
    name: "Evaluate",
    color: "#E91E8C",
    description: "Justify a decision or course of action",
    verbs: ["judge", "critique", "assess", "justify", "prioritize", "recommend", "validate", "defend"],
    example: "Students will be able to [VERB] the effectiveness of different approaches."
  },
  {
    name: "Create",
    color: "#9B59B6",
    description: "Produce new or original work",
    verbs: ["design", "construct", "develop", "formulate", "compose", "produce", "invent", "generate"],
    example: "Students will be able to [VERB] an original solution to the problem."
  }
];

// Interaction state
let selectedVerb = null;
let selectedLevel = null;
let hoveredLevel = null;
let hoveredVerb = null;
let verbPositions = [];

// Animation
let pulsePhase = 0;
let mouseOverCanvas = false;

// UI elements
let generateButton;
let randomButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Track mouse for animation
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  // Calculate wheel dimensions
  updateWheelDimensions();

  // Calculate verb positions
  calculateVerbPositions();

  // Create buttons
  generateButton = createButton('Generate Template');
  generateButton.position(10, drawHeight + 15);
  generateButton.mousePressed(generateTemplate);

  randomButton = createButton('Random Verb');
  randomButton.position(140, drawHeight + 15);
  randomButton.mousePressed(selectRandomVerb);

  textFont('Arial');

  describe('Interactive Bloom\'s Taxonomy wheel with clickable action verbs for writing learning objectives', LABEL);
}

function updateWheelDimensions() {
  centerX = canvasWidth / 2;
  // halfway down the drawing area plus some for the title
  centerY = drawHeight / 2 + 20;
  outerRadius = min(canvasWidth, drawHeight) * 0.45;
  innerRadius = outerRadius * 0.35;
  verbRadius = (outerRadius + innerRadius) / 2;
}

function calculateVerbPositions() {
  verbPositions = [];
  const anglePerLevel = TWO_PI / 6;

  for (let i = 0; i < bloomLevels.length; i++) {
    const level = bloomLevels[i];
    const startAngle = i * anglePerLevel - HALF_PI;
    const levelPositions = [];

    const verbCount = level.verbs.length;

    // Use more of the wedge angle (95% instead of 85%)
    const verbAngleSpan = anglePerLevel * 0.92;
    const wedgePadding = (anglePerLevel - verbAngleSpan) / 2;

    // Arrange verbs in two rows: inner and outer
    const innerRowRadius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const outerRowRadius = innerRadius + (outerRadius - innerRadius) * 0.7;

    // Split verbs between two rows (5 outer, 3 inner for 8 verbs)
    const outerRowCount = 5;

    for (let j = 0; j < verbCount; j++) {
      const isOuterRow = j < outerRowCount;
      const rowIndex = isOuterRow ? j : j - outerRowCount;
      const rowCount = isOuterRow ? outerRowCount : (verbCount - outerRowCount);

      // Calculate angle position within the row
      // Both rows use extended span to spread verbs wider
      const rowAngleSpan = verbAngleSpan * 1.15;
      const rowPadding = (verbAngleSpan - rowAngleSpan) / 2;
      const angleStep = rowAngleSpan / (rowCount + 1);
      const angle = startAngle + wedgePadding + rowPadding + angleStep * (rowIndex + 1);

      // Select radius based on row
      const r = isOuterRow ? outerRowRadius : innerRowRadius;

      levelPositions.push({
        verb: level.verbs[j],
        x: centerX + cos(angle) * r,
        y: centerY + sin(angle) * r,
        angle: angle,
        levelIndex: i
      });
    }
    verbPositions.push(levelPositions);
  }
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

  // Update dimensions if canvas resized
  updateWheelDimensions();
  calculateVerbPositions();

  // Animation
  if (mouseOverCanvas) {
    pulsePhase += 0.02;
  }

  // Draw the wheel
  drawWheel();

  // Draw center content
  drawCenter();

  // Draw title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("Bloom's Taxonomy Action Verb Wheel", canvasWidth / 2, 10);

  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(16);
}

function drawWheel() {
  const anglePerLevel = TWO_PI / 6;

  // Check which level is hovered
  hoveredLevel = null;
  hoveredVerb = null;

  const distFromCenter = dist(mouseX, mouseY, centerX, centerY);
  if (distFromCenter > innerRadius && distFromCenter < outerRadius) {
    let mouseAngle = atan2(mouseY - centerY, mouseX - centerX);
    if (mouseAngle < -HALF_PI) mouseAngle += TWO_PI;
    mouseAngle += HALF_PI;
    if (mouseAngle < 0) mouseAngle += TWO_PI;
    hoveredLevel = floor(mouseAngle / anglePerLevel) % 6;
  }

  // Draw wedges
  for (let i = 0; i < bloomLevels.length; i++) {
    const level = bloomLevels[i];
    const startAngle = i * anglePerLevel - HALF_PI;
    const endAngle = startAngle + anglePerLevel;

    // Wedge color with hover effect
    let c = color(level.color);
    if (hoveredLevel === i) {
      c = lerpColor(c, color(255), 0.2);
    }
    if (selectedLevel === i) {
      c = lerpColor(c, color(255), 0.1);
      strokeWeight(3);
      stroke('#333');
    } else {
      strokeWeight(1);
      stroke(255, 255, 255, 150);
    }

    fill(c);
    arc(centerX, centerY, outerRadius * 2, outerRadius * 2, startAngle, endAngle, PIE);
  }

  // Draw inner circle (center area)
  fill(255);
  stroke('silver');
  strokeWeight(2);
  ellipse(centerX, centerY, innerRadius * 2);

  // Draw level labels on outer edge
  for (let i = 0; i < bloomLevels.length; i++) {
    const level = bloomLevels[i];
    const midAngle = i * anglePerLevel - HALF_PI + anglePerLevel / 2;
    const labelRadius = outerRadius + 20;
    const x = centerX + cos(midAngle) * labelRadius;
    const y = centerY + sin(midAngle) * labelRadius;

    push();
    translate(x, y);
    let rotAngle = midAngle + HALF_PI;
    // Determine if label should be flipped for readability
    let shouldFlip = midAngle > HALF_PI && midAngle < PI + HALF_PI;
    // Special handling for Apply and Create labels
    if (level.name === "Apply") shouldFlip = true;
    if (level.name === "Create") shouldFlip = false;
    if (shouldFlip) {
      rotAngle += PI;
    }
    rotate(rotAngle);

    fill('#333');
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(level.name, 0, 0);
    pop();
  }

  // Draw verbs
  drawVerbs();
}

function drawVerbs() {
  textSize(11);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < verbPositions.length; i++) {
    const levelPositions = verbPositions[i];
    const level = bloomLevels[i];

    for (let j = 0; j < levelPositions.length; j++) {
      const vp = levelPositions[j];
      const isHovered = dist(mouseX, mouseY, vp.x, vp.y) < 25;
      const isSelected = selectedVerb === vp.verb && selectedLevel === i;

      if (isHovered) {
        hoveredVerb = { verb: vp.verb, levelIndex: i };
      }

      // Verb background
      push();
      translate(vp.x, vp.y);

      // Pulsing effect for selected verb
      let radius = 22;
      if (isSelected) {
        radius += sin(pulsePhase * 3) * 3;
        fill(255, 255, 255, 240);
        stroke(level.color);
        strokeWeight(3);
      } else if (isHovered) {
        fill(255, 255, 255, 220);
        stroke(level.color);
        strokeWeight(2);
      } else {
        fill(255, 255, 255, 180);
        stroke(255, 255, 255, 100);
        strokeWeight(1);
      }

      ellipse(0, 0, radius * 2, radius * 1.4);

      // Verb text
      fill(isSelected ? level.color : '#333');
      noStroke();
      textStyle(isSelected ? BOLD : NORMAL);
      text(vp.verb, 0, 0);
      textStyle(NORMAL);

      pop();
    }
  }
}

function drawCenter() {
  textAlign(CENTER, CENTER);

  if (selectedVerb) {
    const level = bloomLevels[selectedLevel];

    // Level name
    fill(level.color);
    noStroke();
    textSize(16);
    textStyle(BOLD);
    text(level.name, centerX, centerY - 35);
    textStyle(NORMAL);

    // Selected verb
    fill('#333');
    textSize(22);
    textStyle(BOLD);
    text(selectedVerb, centerX, centerY - 10);
    textStyle(NORMAL);

    // Level description
    fill('#666');
    textSize(11);
    textWrap(WORD);
    text(level.description, centerX - innerRadius + 20, centerY + 15, (innerRadius - 20) * 2);

  } else if (hoveredLevel !== null) {
    const level = bloomLevels[hoveredLevel];

    // Level name
    fill(level.color);
    noStroke();
    textSize(18);
    textStyle(BOLD);
    text(level.name, centerX, centerY - 20);
    textStyle(NORMAL);

    // Level description
    fill('#666');
    textSize(12);
    textWrap(WORD);
    text(level.description, centerX - innerRadius + 20, centerY + 10, (innerRadius - 20) * 2);

  } else {
    // Default instruction
    fill('#666');
    noStroke();
    textSize(14);
    text("Click a verb", centerX, centerY - 10);
    text("to learn more", centerX, centerY + 10);
  }
}

function mousePressed() {
  // Check if clicked on a verb
  for (let i = 0; i < verbPositions.length; i++) {
    const levelPositions = verbPositions[i];
    for (let j = 0; j < levelPositions.length; j++) {
      const vp = levelPositions[j];
      if (dist(mouseX, mouseY, vp.x, vp.y) < 25) {
        selectedVerb = vp.verb;
        selectedLevel = i;
        return;
      }
    }
  }

  // Check if clicked in center to deselect
  if (dist(mouseX, mouseY, centerX, centerY) < innerRadius) {
    selectedVerb = null;
    selectedLevel = null;
  }
}

function generateTemplate() {
  if (selectedVerb) {
    const level = bloomLevels[selectedLevel];
    const template = `Learning Objective Template (${level.name} Level):\n\n"Students will be able to ${selectedVerb} [CONTENT/SKILL] by [METHOD/CONDITION]."\n\nExample: ${level.example.replace('[VERB]', selectedVerb)}`;

    // Copy to clipboard
    navigator.clipboard.writeText(template).then(() => {
      alert('Template copied to clipboard!\n\n' + template);
    }).catch(() => {
      alert(template);
    });
  } else {
    alert('Please select a verb first by clicking on one in the wheel.');
  }
}

function selectRandomVerb() {
  const levelIndex = floor(random(6));
  const level = bloomLevels[levelIndex];
  const verbIndex = floor(random(level.verbs.length));

  selectedLevel = levelIndex;
  selectedVerb = level.verbs[verbIndex];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    canvasHeight = drawHeight + controlHeight;
  }
}
