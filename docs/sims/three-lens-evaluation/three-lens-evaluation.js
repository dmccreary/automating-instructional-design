// Three-Lens Evaluation Model MicroSim
// Visualizes how Technical, Pedagogical, and UX evaluation dimensions
// interact to form a complete quality assessment framework for MicroSims

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Circle parameters
let circleRadius;
let centerX, centerY;
let techCenter, pedCenter, uxCenter;
let circleOverlap = 0.65;

// Colors as specified
const techColor = { r: 59, g: 130, b: 246 };   // Blue #3B82F6
const pedColor = { r: 16, g: 185, b: 129 };    // Green #10B981
const uxColor = { r: 139, g: 92, b: 246 };     // Purple #8B5CF6
const goldColor = { r: 245, g: 158, b: 11 };   // Gold #F59E0B

// Hover and selection states
let hoveredLens = null;
let hoveredIntersection = null;
let selectedLens = null;
let pulsePhase = 0;

// Lens criteria data
const lensCriteria = {
  technical: {
    title: 'Technical',
    color: techColor,
    criteria: [
      'Functionality - Works correctly without bugs',
      'Responsiveness - Adapts to all screen sizes',
      'Bug-Free - No console errors or crashes',
      'Standardization - Follows coding conventions'
    ],
    checklist: [
      'No JavaScript console errors',
      'Canvas resizes on window change',
      'Smooth 60fps performance',
      'Code passes linting',
      'Works on mobile devices'
    ]
  },
  pedagogical: {
    title: 'Pedagogical',
    color: pedColor,
    criteria: [
      'Objective Alignment - Matches learning goals',
      'Cognitive Level Match - Appropriate Bloom\'s level',
      'Effectiveness - Achieves learning outcomes',
      'Scaffolding - Proper difficulty progression'
    ],
    checklist: [
      'Directly addresses learning objective',
      'Bloom\'s taxonomy level appropriate',
      'Addresses common misconceptions',
      'Includes scaffolded difficulty',
      'Provides meaningful feedback'
    ]
  },
  ux: {
    title: 'UX',
    color: uxColor,
    criteria: [
      'Intuitiveness - Easy to use immediately',
      'Engagement Balance - Focused, not distracting',
      'Accessibility - Usable by all learners',
      'Visual Clarity - Clear hierarchy and layout'
    ],
    checklist: [
      'Controls are self-explanatory',
      'Visual feedback is immediate',
      'Color contrast meets WCAG AA',
      'Works with keyboard navigation',
      'Clear visual hierarchy'
    ]
  }
};

// Intersection descriptions
const intersectionData = {
  'tech-ped': {
    title: 'Technical + Pedagogical',
    description: 'Performance doesn\'t hinder learning',
    detail: 'The simulation runs smoothly enough that technical issues never distract from educational content.'
  },
  'ped-ux': {
    title: 'Pedagogical + UX',
    description: 'Engaging and educational',
    detail: 'The interface keeps learners engaged while guiding them toward learning objectives.'
  },
  'tech-ux': {
    title: 'Technical + UX',
    description: 'Works smoothly everywhere',
    detail: 'Responsive design and solid engineering create a seamless experience on all devices.'
  },
  'center': {
    title: 'High-Quality MicroSim',
    description: 'Excellence in all three dimensions',
    detail: 'A MicroSim that is technically sound, pedagogically effective, and user-friendly achieves maximum impact.'
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  describe('Three overlapping circles representing Technical (blue), Pedagogical (green), and UX (purple) evaluation lenses for MicroSims. The center intersection represents a high-quality MicroSim. Hover to see criteria, click for detailed checklists.', LABEL);
}

function draw() {
  updateCanvasSize();
  calculateCircleCenters();
  pulsePhase += 0.03;

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#333');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Three-Lens Evaluation Model', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Detect hover states
  detectHover();

  // Draw Venn diagram
  drawVennDiagram();

  // Draw circle labels with criteria
  drawCircleLabels();

  // Draw intersection labels
  drawIntersectionLabels();

  // Draw pulsing center
  drawPulsingCenter();

  // Draw info panel
  drawInfoPanel();

  // Draw instructions
  drawInstructions();
}

function calculateCircleCenters() {
  circleRadius = min(canvasWidth * 0.18, drawHeight * 0.28);
  centerX = canvasWidth * 0.38;
  centerY = drawHeight * 0.52;

  let offset = circleRadius * circleOverlap;

  // Technical (top)
  techCenter = { x: centerX, y: centerY - offset * 0.8 };

  // Pedagogical (bottom left)
  pedCenter = { x: centerX - offset * 0.9, y: centerY + offset * 0.5 };

  // UX (bottom right)
  uxCenter = { x: centerX + offset * 0.9, y: centerY + offset * 0.5 };
}

function detectHover() {
  hoveredLens = null;
  hoveredIntersection = null;

  if (mouseY > drawHeight) return;

  let dTech = dist(mouseX, mouseY, techCenter.x, techCenter.y);
  let dPed = dist(mouseX, mouseY, pedCenter.x, pedCenter.y);
  let dUx = dist(mouseX, mouseY, uxCenter.x, uxCenter.y);

  let inTech = dTech < circleRadius;
  let inPed = dPed < circleRadius;
  let inUx = dUx < circleRadius;

  // Check intersections first (more specific)
  if (inTech && inPed && inUx) {
    hoveredIntersection = 'center';
  } else if (inTech && inPed) {
    hoveredIntersection = 'tech-ped';
  } else if (inTech && inUx) {
    hoveredIntersection = 'tech-ux';
  } else if (inPed && inUx) {
    hoveredIntersection = 'ped-ux';
  } else if (inTech) {
    hoveredLens = 'technical';
  } else if (inPed) {
    hoveredLens = 'pedagogical';
  } else if (inUx) {
    hoveredLens = 'ux';
  }
}

function drawVennDiagram() {
  noStroke();

  // Draw circles with blend mode for overlap effect
  drawingContext.globalCompositeOperation = 'multiply';

  // Technical circle (Blue)
  let techAlpha = (hoveredLens === 'technical' || selectedLens === 'technical') ? 180 : 120;
  fill(techColor.r, techColor.g, techColor.b, techAlpha);
  ellipse(techCenter.x, techCenter.y, circleRadius * 2);

  // Pedagogical circle (Green)
  let pedAlpha = (hoveredLens === 'pedagogical' || selectedLens === 'pedagogical') ? 180 : 120;
  fill(pedColor.r, pedColor.g, pedColor.b, pedAlpha);
  ellipse(pedCenter.x, pedCenter.y, circleRadius * 2);

  // UX circle (Purple)
  let uxAlpha = (hoveredLens === 'ux' || selectedLens === 'ux') ? 180 : 120;
  fill(uxColor.r, uxColor.g, uxColor.b, uxAlpha);
  ellipse(uxCenter.x, uxCenter.y, circleRadius * 2);

  drawingContext.globalCompositeOperation = 'source-over';

  // Draw outlines
  noFill();
  strokeWeight(3);

  stroke(techColor.r, techColor.g, techColor.b);
  if (hoveredLens === 'technical' || selectedLens === 'technical') strokeWeight(4);
  ellipse(techCenter.x, techCenter.y, circleRadius * 2);
  strokeWeight(3);

  stroke(pedColor.r, pedColor.g, pedColor.b);
  if (hoveredLens === 'pedagogical' || selectedLens === 'pedagogical') strokeWeight(4);
  ellipse(pedCenter.x, pedCenter.y, circleRadius * 2);
  strokeWeight(3);

  stroke(uxColor.r, uxColor.g, uxColor.b);
  if (hoveredLens === 'ux' || selectedLens === 'ux') strokeWeight(4);
  ellipse(uxCenter.x, uxCenter.y, circleRadius * 2);
}

function drawCircleLabels() {
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  noStroke();

  // Technical label (top of its circle)
  textSize(14);
  fill(255);
  text('Technical', techCenter.x, techCenter.y - circleRadius * 0.55);

  // Pedagogical label (bottom left of its circle)
  text('Pedagogical', pedCenter.x - circleRadius * 0.2, pedCenter.y + circleRadius * 0.55);

  // UX label (bottom right of its circle)
  text('UX', uxCenter.x + circleRadius * 0.2, uxCenter.y + circleRadius * 0.55);

  textStyle(NORMAL);
}

function drawIntersectionLabels() {
  textSize(9);
  textAlign(CENTER, CENTER);
  fill(50);
  noStroke();

  // Tech-Ped intersection (left side between tech and ped)
  let techPedX = (techCenter.x + pedCenter.x) / 2 - circleRadius * 0.15;
  let techPedY = (techCenter.y + pedCenter.y) / 2;
  if (hoveredIntersection === 'tech-ped') {
    fill(30);
    textStyle(BOLD);
  }
  text('Perf.', techPedX, techPedY - 6);
  text('for', techPedX, techPedY + 3);
  text('Learning', techPedX, techPedY + 12);
  textStyle(NORMAL);
  fill(50);

  // Tech-UX intersection (right side between tech and ux)
  let techUxX = (techCenter.x + uxCenter.x) / 2 + circleRadius * 0.15;
  let techUxY = (techCenter.y + uxCenter.y) / 2;
  if (hoveredIntersection === 'tech-ux') {
    fill(30);
    textStyle(BOLD);
  }
  text('Works', techUxX, techUxY - 6);
  text('Smooth', techUxX, techUxY + 6);
  textStyle(NORMAL);
  fill(50);

  // Ped-UX intersection (bottom between ped and ux)
  let pedUxX = (pedCenter.x + uxCenter.x) / 2;
  let pedUxY = (pedCenter.y + uxCenter.y) / 2 + circleRadius * 0.2;
  if (hoveredIntersection === 'ped-ux') {
    fill(30);
    textStyle(BOLD);
  }
  text('Engaging &', pedUxX, pedUxY - 6);
  text('Educational', pedUxX, pedUxY + 6);
  textStyle(NORMAL);
}

function drawPulsingCenter() {
  let cx = (techCenter.x + pedCenter.x + uxCenter.x) / 3;
  let cy = (techCenter.y + pedCenter.y + uxCenter.y) / 3;

  // Pulsing gold highlight
  let pulseSize = circleRadius * 0.4;
  let pulse = sin(pulsePhase) * 0.15 + 1;

  if (hoveredIntersection === 'center') {
    pulse = 1.2;
  }

  // Draw pulsing glow
  noStroke();
  for (let i = 3; i >= 0; i--) {
    let alpha = map(i, 0, 3, 150, 30);
    fill(goldColor.r, goldColor.g, goldColor.b, alpha);
    ellipse(cx, cy, pulseSize * pulse * (1 + i * 0.2));
  }

  // Center circle
  fill(goldColor.r, goldColor.g, goldColor.b);
  stroke(255);
  strokeWeight(2);
  ellipse(cx, cy, pulseSize * pulse * 0.6);

  // Label
  fill(50);
  noStroke();
  textSize(8);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('High', cx, cy - 5);
  text('Quality', cx, cy + 5);
  textStyle(NORMAL);
}

function drawInfoPanel() {
  let panelX = canvasWidth * 0.62;
  let panelY = 45;
  let panelWidth = canvasWidth * 0.35;
  let panelHeight = drawHeight - 65;

  // Panel background
  fill(255, 255, 255, 245);
  stroke('#ddd');
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  let contentX = panelX + 12;
  let contentY = panelY + 12;
  let maxTextWidth = panelWidth - 24;

  noStroke();

  if (selectedLens && lensCriteria[selectedLens]) {
    // Show detailed checklist for selected lens
    let lens = lensCriteria[selectedLens];

    // Header with color
    fill(lens.color.r, lens.color.g, lens.color.b);
    textSize(16);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(lens.title + ' Checklist', contentX, contentY);
    textStyle(NORMAL);
    contentY += 28;

    // Checklist items
    fill('#333');
    textSize(11);
    for (let item of lens.checklist) {
      let checkmark = '\u2610 '; // Empty checkbox
      text(checkmark + item, contentX, contentY);
      contentY += 20;
    }

    // Dismiss hint
    fill('#888');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Click elsewhere to dismiss', panelX + panelWidth / 2, panelY + panelHeight - 8);

  } else if (hoveredLens && lensCriteria[hoveredLens]) {
    // Show criteria for hovered lens
    let lens = lensCriteria[hoveredLens];

    fill(lens.color.r, lens.color.g, lens.color.b);
    textSize(16);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(lens.title + ' Lens', contentX, contentY);
    textStyle(NORMAL);
    contentY += 26;

    fill('#333');
    textSize(11);
    for (let criterion of lens.criteria) {
      let lines = wrapText(criterion, maxTextWidth - 15);
      for (let j = 0; j < lines.length; j++) {
        text((j === 0 ? '\u2022 ' : '   ') + lines[j], contentX, contentY);
        contentY += 16;
      }
      contentY += 4;
    }

    // Click hint
    fill('#666');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Click to see detailed checklist', panelX + panelWidth / 2, panelY + panelHeight - 8);

  } else if (hoveredIntersection && intersectionData[hoveredIntersection]) {
    // Show intersection info
    let data = intersectionData[hoveredIntersection];

    if (hoveredIntersection === 'center') {
      fill(goldColor.r, goldColor.g, goldColor.b);
    } else {
      fill('#333');
    }
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(data.title, contentX, contentY);
    textStyle(NORMAL);
    contentY += 24;

    fill('#555');
    textSize(12);
    textStyle(ITALIC);
    text('"' + data.description + '"', contentX, contentY);
    textStyle(NORMAL);
    contentY += 28;

    fill('#333');
    textSize(11);
    let detailLines = wrapText(data.detail, maxTextWidth);
    for (let line of detailLines) {
      text(line, contentX, contentY);
      contentY += 18;
    }

    // Arrow explanation for center
    if (hoveredIntersection === 'center') {
      contentY += 15;
      fill('#666');
      textSize(10);
      text('Deficiencies in any one area', contentX, contentY);
      contentY += 14;
      text('reduce overall quality.', contentX, contentY);
    }

  } else {
    // Default instructions
    fill('#333');
    textSize(15);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Evaluation Framework', contentX, contentY);
    textStyle(NORMAL);
    contentY += 26;

    fill('#555');
    textSize(11);

    let instructions = [
      'This Venn diagram shows three critical',
      'dimensions for evaluating MicroSims:',
      '',
      '\u2022 Technical - Does it work correctly?',
      '\u2022 Pedagogical - Does it teach well?',
      '\u2022 UX - Is it easy to use?',
      '',
      'The center (gold) represents a high-',
      'quality MicroSim that excels in all three.',
      '',
      'Hover over circles to see criteria.',
      'Click circles for detailed checklists.',
      'Hover intersections to see overlaps.'
    ];

    for (let line of instructions) {
      text(line, contentX, contentY);
      contentY += 17;
    }
  }
}

function wrapText(str, maxWidth) {
  let words = str.split(' ');
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

function drawInstructions() {
  fill('#666');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Hover: view criteria | Click: detailed checklist | Center pulses to show goal', canvasWidth / 2, drawHeight + controlHeight / 2);
}

function mousePressed() {
  if (mouseY > drawHeight) return;

  if (hoveredLens) {
    if (selectedLens === hoveredLens) {
      selectedLens = null; // Toggle off
    } else {
      selectedLens = hoveredLens;
    }
  } else {
    selectedLens = null;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasHeight = drawHeight + controlHeight;
  }
}
