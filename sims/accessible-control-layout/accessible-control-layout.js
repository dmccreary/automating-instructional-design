// Accessible Control Layout MicroSim
// Interactive diagram showing recommended MicroSim structure for accessibility
// Demonstrates proper placement of canvas, status, and control areas

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Section data
const sections = [
  {
    id: 'canvas',
    label: 'Canvas Area',
    sublabel: '(visual simulation)',
    description: 'Full-width responsive canvas area containing visual simulation elements. Has describe() output for screen readers and focus indicator when canvas has focus.',
    requirements: [
      'Use describe() to provide content description for screen readers',
      'Add role="img" and appropriate aria-label',
      'Include focus indicator when canvas receives focus',
      'Ensure visual elements have sufficient color contrast'
    ],
    heightRatio: 0.45,
    color: '#E5E7EB',
    borderColor: '#9CA3AF'
  },
  {
    id: 'status',
    label: 'Status Area',
    sublabel: '(announces changes)',
    description: 'Current simulation values displayed in text form. Uses aria-live region for dynamic updates so screen readers announce changes.',
    requirements: [
      'Use aria-live="polite" for status updates',
      'Provide text alternatives for all visual feedback',
      'Update status text when simulation values change',
      'Keep announcements concise and meaningful'
    ],
    heightRatio: 0.12,
    color: '#DBEAFE',
    borderColor: '#3B82F6'
  },
  {
    id: 'controls',
    label: 'Control Panel',
    sublabel: '(keyboard accessible)',
    description: 'Contains sliders with labels and buttons (Start, Pause, Reset). Each control has visible label and focus indicator. Tab order flows left-to-right, top-to-bottom.',
    requirements: [
      'All controls reachable via Tab key',
      'Visible focus indicators on all interactive elements',
      'Labels associated with form controls using for/id or aria-labelledby',
      'Controls placed BELOW canvas, not overlapping',
      'Logical tab order: left-to-right, top-to-bottom'
    ],
    heightRatio: 0.22,
    color: '#D1FAE5',
    borderColor: '#10B981'
  }
];

// Interaction state
let selectedSection = null;
let hoveredSection = null;
let showTabFlow = true;
let animationPhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  createControls();

  describe('Interactive diagram showing accessible MicroSim layout with three sections: Canvas Area at top for visual simulation with screen reader support, Status Area in middle for announcing changes via aria-live, and Control Panel at bottom with keyboard-accessible sliders and buttons. Click sections for detailed accessibility requirements.', LABEL);
}

function createControls() {
  // Create control container
  let controlContainer = createDiv('');
  controlContainer.parent(document.querySelector('main'));
  controlContainer.style('display', 'flex');
  controlContainer.style('flex-wrap', 'wrap');
  controlContainer.style('gap', '15px');
  controlContainer.style('padding', '10px 20px');
  controlContainer.style('font-family', 'Arial, sans-serif');
  controlContainer.style('background', '#f5f5f5');
  controlContainer.style('border-radius', '8px');
  controlContainer.style('margin-top', '10px');
  controlContainer.style('align-items', 'center');

  // Tab flow toggle
  let toggleDiv = createDiv('');
  toggleDiv.parent(controlContainer);
  toggleDiv.style('display', 'flex');
  toggleDiv.style('align-items', 'center');
  toggleDiv.style('gap', '8px');

  let tabFlowCheckbox = createCheckbox('Show Tab Navigation Flow', true);
  tabFlowCheckbox.parent(toggleDiv);
  tabFlowCheckbox.style('font-size', '14px');
  tabFlowCheckbox.changed(() => {
    showTabFlow = tabFlowCheckbox.checked();
  });
  tabFlowCheckbox.attribute('aria-label', 'Toggle tab navigation flow visualization');

  // Reset button
  let resetBtn = createButton('Reset View');
  resetBtn.parent(controlContainer);
  resetBtn.style('padding', '8px 16px');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('border', '1px solid #ccc');
  resetBtn.style('background', '#fff');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('font-size', '14px');
  resetBtn.mousePressed(() => {
    selectedSection = null;
  });
  resetBtn.attribute('aria-label', 'Reset view to show all sections');

  // Instructions
  let instructions = createSpan('Click on a section to see detailed accessibility requirements');
  instructions.parent(controlContainer);
  instructions.style('font-size', '12px');
  instructions.style('color', '#666');
  instructions.style('font-style', 'italic');
}

function draw() {
  updateCanvasSize();
  background(250);

  // Update animation
  animationPhase = (animationPhase + 0.02) % TWO_PI;

  // Draw title
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Accessible MicroSim Layout Structure', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw subtitle
  textSize(12);
  fill(100);
  text('Recommended structure for mouse, keyboard, and screen reader users', canvasWidth / 2, 35);

  // Calculate layout
  let layoutX = margin;
  let layoutY = 55;
  let layoutW = canvasWidth - 2 * margin;
  let layoutH = drawHeight - layoutY - 10;

  // Draw main layout container
  fill(255);
  stroke(150);
  strokeWeight(2);
  rect(layoutX, layoutY, layoutW, layoutH, 8);

  // Draw sections
  let currentY = layoutY + 10;
  let sectionPadding = 8;
  let availableHeight = layoutH - 20;

  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    let sectionHeight = availableHeight * section.heightRatio;
    let sectionX = layoutX + 10;
    let sectionW = layoutW - 20;

    // Store section bounds for interaction
    section.bounds = {
      x: sectionX,
      y: currentY,
      w: sectionW,
      h: sectionHeight - sectionPadding
    };

    // Check if hovered
    let isHovered = mouseX > section.bounds.x &&
                    mouseX < section.bounds.x + section.bounds.w &&
                    mouseY > section.bounds.y &&
                    mouseY < section.bounds.y + section.bounds.h;

    if (isHovered) {
      hoveredSection = section.id;
      cursor(HAND);
    }

    // Draw section
    drawSection(section, selectedSection === section.id, isHovered);

    currentY += sectionHeight;
  }

  // Reset cursor if not hovering
  if (!hoveredSection) {
    cursor(ARROW);
  }
  hoveredSection = null;

  // Draw tab flow arrows
  if (showTabFlow) {
    drawTabFlowArrows(layoutX, layoutY, layoutW, layoutH);
  }

  // Draw annotations
  drawAnnotations(layoutX, layoutY, layoutW, layoutH);

  // Draw detail panel if section selected
  if (selectedSection) {
    drawDetailPanel(sections.find(s => s.id === selectedSection));
  }
}

function drawSection(section, isSelected, isHovered) {
  let b = section.bounds;

  // Section background
  if (isSelected) {
    fill(section.color);
    stroke('#3B82F6');
    strokeWeight(3);
  } else if (isHovered) {
    fill(section.color);
    stroke(section.borderColor);
    strokeWeight(2);
  } else {
    fill(section.color);
    stroke(section.borderColor);
    strokeWeight(1);
  }
  rect(b.x, b.y, b.w, b.h, 6);

  // Focus indicator visualization (for canvas area)
  if (section.id === 'canvas' && isSelected) {
    noFill();
    stroke('#3B82F6');
    strokeWeight(3);
    drawingContext.setLineDash([5, 5]);
    rect(b.x + 4, b.y + 4, b.w - 8, b.h - 8, 4);
    drawingContext.setLineDash([]);
  }

  // Section label
  fill(50);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(section.label, b.x + b.w / 2, b.y + b.h / 2 - 10);
  textStyle(NORMAL);

  textSize(12);
  fill(80);
  text(section.sublabel, b.x + b.w / 2, b.y + b.h / 2 + 10);

  // Draw mock controls for control panel
  if (section.id === 'controls') {
    drawMockControls(b);
  }

  // Draw mock status for status area
  if (section.id === 'status') {
    drawMockStatus(b);
  }

  // Draw mock canvas content
  if (section.id === 'canvas') {
    drawMockCanvas(b);
  }
}

function drawMockCanvas(b) {
  // Draw a simple visual element to represent canvas content
  let centerX = b.x + b.w / 2;
  let centerY = b.y + b.h / 2;

  // Simple animated visual element
  push();
  noFill();
  stroke(100, 150);
  strokeWeight(1);

  // Circle animation
  let radius = 30 + sin(animationPhase) * 5;
  ellipse(centerX - 100, centerY, radius * 2, radius * 2);

  // Wave line
  beginShape();
  for (let x = centerX - 50; x < centerX + 150; x += 5) {
    let y = centerY + sin((x - centerX) * 0.05 + animationPhase) * 15;
    vertex(x, y);
  }
  endShape();

  // describe() indicator
  fill(100);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text('describe() output for screen readers', b.x + 10, b.y + b.h - 10);
  pop();
}

function drawMockStatus(b) {
  // Draw mock status display
  push();
  fill(50);
  textSize(11);
  textAlign(LEFT, CENTER);

  let statusX = b.x + 20;
  let statusY = b.y + b.h / 2;

  text('Value: 42  |  Speed: 3.5  |  Running: Yes', statusX, statusY);

  // aria-live indicator
  fill(59, 130, 246);
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('aria-live="polite"', b.x + b.w - 20, statusY);
  pop();
}

function drawMockControls(b) {
  // Draw mock sliders and buttons
  let controlY = b.y + b.h / 2 - 20;
  let buttonY = b.y + b.h / 2 + 15;

  // Mock sliders
  let sliderX = b.x + 30;
  let sliderSpacing = 120;

  for (let i = 0; i < 3; i++) {
    let x = sliderX + i * sliderSpacing;

    // Label
    fill(60);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text(['Speed', 'Size', 'Count'][i], x + 40, controlY - 2);

    // Slider track
    fill(200);
    noStroke();
    rect(x, controlY, 80, 6, 3);

    // Slider thumb
    fill(59, 130, 246);
    let thumbPos = x + 20 + i * 20;
    ellipse(thumbPos, controlY + 3, 12, 12);

    // Focus indicator on first slider
    if (i === 0) {
      noFill();
      stroke('#3B82F6');
      strokeWeight(2);
      ellipse(thumbPos, controlY + 3, 18, 18);
    }
  }

  // Mock buttons
  let buttonX = b.x + b.w / 2 - 120;
  let buttons = ['Start', 'Pause', 'Reset'];

  for (let i = 0; i < 3; i++) {
    let x = buttonX + i * 85;

    // Button
    fill(i === 0 ? '#3B82F6' : '#E5E7EB');
    stroke(i === 0 ? '#2563EB' : '#9CA3AF');
    strokeWeight(1);
    rect(x, buttonY, 70, 28, 4);

    // Button text
    fill(i === 0 ? 255 : 50);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(buttons[i], x + 35, buttonY + 14);
  }

  // Tab order indicator
  fill(16, 185, 129);
  textSize(9);
  textAlign(LEFT, BOTTOM);
  text('Tab order: left-to-right, top-to-bottom', b.x + 20, b.y + b.h - 5);
}

function drawTabFlowArrows(layoutX, layoutY, layoutW, layoutH) {
  // Draw animated arrows showing tab navigation
  let arrowX = layoutX + layoutW + 15;

  // Arrow properties
  stroke('#10B981');
  strokeWeight(2);
  fill('#10B981');

  let arrows = [];

  // Collect section positions
  for (let i = 0; i < sections.length - 1; i++) {
    let currentSection = sections[i];
    let nextSection = sections[i + 1];

    if (currentSection.bounds && nextSection.bounds) {
      let startY = currentSection.bounds.y + currentSection.bounds.h / 2;
      let endY = nextSection.bounds.y + nextSection.bounds.h / 2;

      // Draw arrow line
      line(arrowX, startY, arrowX, endY - 8);

      // Draw arrowhead
      push();
      translate(arrowX, endY - 8);
      triangle(-5, -8, 5, -8, 0, 0);
      pop();
    }
  }

  // Tab key indicator
  let tabY = layoutY + 20;

  // Animated glow
  let glowAlpha = map(sin(animationPhase * 2), -1, 1, 100, 255);

  fill(16, 185, 129, glowAlpha);
  noStroke();
  rect(arrowX - 15, tabY, 30, 24, 4);

  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Tab', arrowX, tabY + 12);
  textStyle(NORMAL);

  // Arrow down from tab key
  stroke('#10B981');
  strokeWeight(2);
  line(arrowX, tabY + 30, arrowX, sections[0].bounds.y + sections[0].bounds.h / 2);
}

function drawAnnotations(layoutX, layoutY, layoutW, layoutH) {
  // Left side annotations
  let annotationX = margin - 5;

  push();
  fill('#10B981');
  noStroke();
  textSize(10);
  textAlign(RIGHT, CENTER);

  // Annotation for controls below canvas
  let noteY = sections[2].bounds.y + sections[2].bounds.h / 2;

  // Draw annotation line
  stroke('#10B981');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);

  let lineStartX = annotationX - 60;
  let lineEndX = sections[2].bounds.x - 5;
  line(lineStartX, noteY, lineEndX, noteY);
  drawingContext.setLineDash([]);

  // Annotation text box
  fill('#D1FAE5');
  stroke('#10B981');
  strokeWeight(1);
  let textBoxW = 140;
  let textBoxH = 45;
  rect(lineStartX - textBoxW - 5, noteY - textBoxH / 2, textBoxW, textBoxH, 4);

  fill('#065F46');
  noStroke();
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Controls placed BELOW\ncanvas, not overlapping', lineStartX - textBoxW / 2 - 5, noteY);

  pop();
}

function drawDetailPanel(section) {
  if (!section) return;

  // Semi-transparent overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Detail panel
  let panelW = min(500, canvasWidth - 60);
  let panelH = 250;
  let panelX = (canvasWidth - panelW) / 2;
  let panelY = (drawHeight - panelH) / 2;

  // Panel background
  fill(255);
  stroke(section.borderColor);
  strokeWeight(3);
  rect(panelX, panelY, panelW, panelH, 8);

  // Panel header
  fill(section.color);
  noStroke();
  rect(panelX, panelY, panelW, 45, 8, 8, 0, 0);

  // Section title
  fill(50);
  textSize(18);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(section.label + ' ' + section.sublabel, panelX + panelW / 2, panelY + 22);
  textStyle(NORMAL);

  // Description
  fill(60);
  textSize(12);
  textAlign(LEFT, TOP);
  text(section.description, panelX + 20, panelY + 55, panelW - 40, 50);

  // Requirements header
  fill(50);
  textSize(14);
  textStyle(BOLD);
  text('Accessibility Requirements:', panelX + 20, panelY + 110);
  textStyle(NORMAL);

  // Requirements list
  fill(70);
  textSize(11);
  let reqY = panelY + 132;
  for (let i = 0; i < section.requirements.length; i++) {
    fill('#10B981');
    text('\u2713', panelX + 25, reqY);
    fill(70);
    text(section.requirements[i], panelX + 45, reqY, panelW - 70, 20);
    reqY += 22;
  }

  // Close instruction
  fill(100);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('Click anywhere to close', panelX + panelW / 2, panelY + panelH - 10);
}

function mousePressed() {
  // Check if clicking on detail panel (to close it)
  if (selectedSection) {
    selectedSection = null;
    return;
  }

  // Check if clicking on a section
  for (let section of sections) {
    if (section.bounds) {
      let b = section.bounds;
      if (mouseX > b.x && mouseX < b.x + b.w &&
          mouseY > b.y && mouseY < b.y + b.h) {
        selectedSection = section.id;
        return;
      }
    }
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
