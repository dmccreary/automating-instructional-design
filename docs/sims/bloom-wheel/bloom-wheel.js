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
  randomButton = createButton('Random Verb');
  randomButton.position(10, drawHeight + 8);
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

    // Use more of the wedge angle
    const verbAngleSpan = anglePerLevel * 0.92;
    const wedgePadding = (anglePerLevel - verbAngleSpan) / 2;

    // Arrange verbs in three rows: inner, middle, outer
    const innerRowRadius = innerRadius + (outerRadius - innerRadius) * 0.2;
    const middleRowRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const outerRowRadius = innerRadius + (outerRadius - innerRadius) * 0.8;

    // Find the longest verb and sort verbs by length
    const verbsWithLength = level.verbs.map((v, idx) => ({ verb: v, origIndex: idx, len: v.length }));
    verbsWithLength.sort((a, b) => b.len - a.len);

    // Distribution: 1 inner (longest), 3 middle, 4 outer
    const innerVerbs = verbsWithLength.slice(0, 1);   // 1 longest
    const middleVerbs = verbsWithLength.slice(1, 4);  // 3 next
    const outerVerbs = verbsWithLength.slice(4, 8);   // 4 remaining

    // Place inner row verb (1 verb, centered)
    // Adjust angle for Evaluate and Understand to move them lower (higher y) to avoid overlap
    const angleAdjust = (level.name === "Evaluate" || level.name === "Understand") ? 0.15 : 0;
    for (let j = 0; j < innerVerbs.length; j++) {
      const angle = startAngle + anglePerLevel / 2 + angleAdjust; // centered in wedge with adjustment
      levelPositions.push({
        verb: innerVerbs[j].verb,
        x: centerX + cos(angle) * innerRowRadius,
        y: centerY + sin(angle) * innerRowRadius,
        angle: angle,
        levelIndex: i,
        isInnerRow: true  // flag for wider circle
      });
    }

    // Place middle row verbs (3 verbs)
    const middleAngleSpan = verbAngleSpan * 1.15;
    const middlePadding = (verbAngleSpan - middleAngleSpan) / 2;
    const middleStep = middleAngleSpan / (middleVerbs.length + 1);
    for (let j = 0; j < middleVerbs.length; j++) {
      const angle = startAngle + wedgePadding + middlePadding + middleStep * (j + 1);
      levelPositions.push({
        verb: middleVerbs[j].verb,
        x: centerX + cos(angle) * middleRowRadius,
        y: centerY + sin(angle) * middleRowRadius,
        angle: angle,
        levelIndex: i,
        isInnerRow: false
      });
    }

    // Place outer row verbs (4 verbs)
    const outerAngleSpan = verbAngleSpan * 1.30;
    const outerPadding = (verbAngleSpan - outerAngleSpan) / 2;
    const outerStep = outerAngleSpan / (outerVerbs.length + 1);
    for (let j = 0; j < outerVerbs.length; j++) {
      const angle = startAngle + wedgePadding + outerPadding + outerStep * (j + 1);
      levelPositions.push({
        verb: outerVerbs[j].verb,
        x: centerX + cos(angle) * outerRowRadius,
        y: centerY + sin(angle) * outerRowRadius,
        angle: angle,
        levelIndex: i,
        isInnerRow: false
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

  // Draw example in control area when a verb is selected
  if (selectedVerb && selectedLevel !== null) {
    const level = bloomLevels[selectedLevel];
    const example = level.example.replace('[VERB]', selectedVerb);
    fill('#333');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Example: " + example, 120, drawHeight + 20);
  }

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
      const isSelected = selectedVerb === vp.verb && selectedLevel === i;

      // Calculate circle width based on text width
      textStyle(isSelected ? BOLD : NORMAL);
      const verbTextWidth = textWidth(vp.verb);
      const padding = 12; // horizontal padding around text
      const ellipseWidth = verbTextWidth + padding * 2;
      const ellipseHeight = 22; // fixed height

      // Check hover using ellipse dimensions
      const isHovered = abs(mouseX - vp.x) < ellipseWidth / 2 && abs(mouseY - vp.y) < ellipseHeight / 2;

      if (isHovered) {
        hoveredVerb = { verb: vp.verb, levelIndex: i };
      }

      // Store dimensions for click detection
      vp.ellipseWidth = ellipseWidth;
      vp.ellipseHeight = ellipseHeight;

      // Verb background
      push();
      translate(vp.x, vp.y);

      // Pulsing effect for selected verb
      let widthAdjust = 0;
      let heightAdjust = 0;
      if (isSelected) {
        const pulse = sin(pulsePhase * 3) * 3;
        widthAdjust = pulse;
        heightAdjust = pulse * 0.7;
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

      ellipse(0, 0, ellipseWidth + widthAdjust, ellipseHeight + heightAdjust);

      // Verb text
      fill(isSelected ? level.color : '#333');
      noStroke();
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
  // Check if clicked on a verb using dynamic ellipse dimensions
  for (let i = 0; i < verbPositions.length; i++) {
    const levelPositions = verbPositions[i];
    for (let j = 0; j < levelPositions.length; j++) {
      const vp = levelPositions[j];
      const halfWidth = (vp.ellipseWidth || 44) / 2;
      const halfHeight = (vp.ellipseHeight || 22) / 2;
      if (abs(mouseX - vp.x) < halfWidth && abs(mouseY - vp.y) < halfHeight) {
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
