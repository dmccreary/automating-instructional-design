// Interaction Specification Template MicroSim
// Shows the three-part structure: Trigger -> Response -> Feedback
// Click boxes to expand/collapse sub-items, hover for descriptions

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// State
let mouseOverCanvas = false;
let hoveredBox = null;
let expandedBoxes = { trigger: true, response: true, feedback: true };

// Animation
let arrowAnimOffset = 0;

// Colors from specification
const colors = {
  background: '#F8FAFC',
  trigger: '#3498db',
  triggerLight: '#E8F4FD',
  response: '#e67e22',
  responseLight: '#FDF2E8',
  feedback: '#2ecc71',
  feedbackLight: '#E8FDF2',
  text: '#333333',
  subtext: '#666666',
  arrow: '#555555',
  shadow: 'rgba(0, 0, 0, 0.15)',
  controlBg: '#FFFFFF'
};

// Box data with sub-items
const boxes = {
  trigger: {
    label: 'TRIGGER',
    description: 'User action that initiates the interaction - what the user does to start something',
    icon: 'click',
    color: colors.trigger,
    lightColor: colors.triggerLight,
    subItems: [
      { label: 'Input Device', desc: 'Mouse, keyboard, touch, voice' },
      { label: 'Specific Action', desc: 'Click, drag, type, swipe, etc.' },
      { label: 'Target Element', desc: 'Button, slider, canvas, etc.' }
    ]
  },
  response: {
    label: 'RESPONSE',
    description: 'System behavior - what the application does in reaction to the trigger',
    icon: 'gear',
    color: colors.response,
    lightColor: colors.responseLight,
    subItems: [
      { label: 'What Changes', desc: 'Visual, data, or state changes' },
      { label: 'How Fast', desc: 'Immediate, animated, or delayed' },
      { label: 'Affected Elements', desc: 'Components that update' }
    ]
  },
  feedback: {
    label: 'FEEDBACK',
    description: 'User perception - how the user knows the action was received and processed',
    icon: 'eye',
    color: colors.feedback,
    lightColor: colors.feedbackLight,
    subItems: [
      { label: 'Visual Feedback', desc: 'Color change, animation, highlight' },
      { label: 'Audio Feedback', desc: 'Click sound, completion tone' },
      { label: 'Text Feedback', desc: 'Labels, tooltips, messages' }
    ]
  }
};

// Layout positions (will be calculated)
let boxPositions = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Interaction Specification Template showing three connected boxes: Trigger (blue) causes Response (orange) which produces Feedback (green). Click boxes to expand/collapse details, hover for descriptions.', LABEL);
}

function draw() {
  updateCanvasSize();
  calculateLayout();

  // Animate arrow offset
  arrowAnimOffset = (arrowAnimOffset + 0.02) % 1;

  // Drawing area background
  fill(colors.background);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill(colors.controlBg);
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title
  fill(colors.text);
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Interaction Specification Template", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Subtitle
  fill(colors.subtext);
  textSize(12);
  text("Click boxes to expand/collapse | Hover for descriptions", canvasWidth / 2, 34);

  // Check hover state
  hoveredBox = getHoveredBox();

  // Draw connecting arrows
  drawArrow(boxPositions.trigger, boxPositions.response, "causes");
  drawArrow(boxPositions.response, boxPositions.feedback, "produces");

  // Draw boxes
  drawBox('trigger', boxPositions.trigger);
  drawBox('response', boxPositions.response);
  drawBox('feedback', boxPositions.feedback);

  // Draw tooltip if hovering
  if (hoveredBox && boxes[hoveredBox]) {
    drawTooltip(boxes[hoveredBox].description);
  }

  // Draw control area
  drawControlArea();

  // Update cursor
  if (hoveredBox) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function calculateLayout() {
  let boxWidth = min(180, (canvasWidth - margin * 4) / 3.5);
  let collapsedHeight = 60;
  let expandedHeight = 180;

  let totalWidth = boxWidth * 3 + 100; // boxes plus arrow spacing
  let startX = (canvasWidth - totalWidth) / 2;
  let centerY = drawHeight / 2 + 20;

  let triggerHeight = expandedBoxes.trigger ? expandedHeight : collapsedHeight;
  let responseHeight = expandedBoxes.response ? expandedHeight : collapsedHeight;
  let feedbackHeight = expandedBoxes.feedback ? expandedHeight : collapsedHeight;

  boxPositions = {
    trigger: { x: startX, y: centerY - triggerHeight/2, w: boxWidth, h: triggerHeight },
    response: { x: startX + boxWidth + 50, y: centerY - responseHeight/2, w: boxWidth, h: responseHeight },
    feedback: { x: startX + (boxWidth + 50) * 2, y: centerY - feedbackHeight/2, w: boxWidth, h: feedbackHeight }
  };
}

function drawBox(key, pos) {
  let box = boxes[key];
  let isHovered = hoveredBox === key;
  let isExpanded = expandedBoxes[key];

  // Shadow
  noStroke();
  fill(colors.shadow);
  rect(pos.x + 4, pos.y + 4, pos.w, pos.h, 12);

  // Box background
  fill(box.lightColor);
  stroke(box.color);
  strokeWeight(isHovered ? 3 : 2);
  rect(pos.x, pos.y, pos.w, pos.h, 12);

  // Header bar
  noStroke();
  fill(box.color);
  rect(pos.x, pos.y, pos.w, 50, 12, 12, isExpanded ? 0 : 12, isExpanded ? 0 : 12);

  // Icon
  drawIcon(box.icon, pos.x + 25, pos.y + 25, 'white');

  // Label
  fill('white');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(box.label, pos.x + 45, pos.y + 25);
  textStyle(NORMAL);

  // Expand/collapse indicator
  textSize(12);
  textAlign(RIGHT, CENTER);
  text(isExpanded ? '\u25BC' : '\u25B6', pos.x + pos.w - 15, pos.y + 25);

  // Sub-items (if expanded)
  if (isExpanded) {
    let subY = pos.y + 60;
    let subHeight = (pos.h - 60 - 10) / box.subItems.length;

    for (let i = 0; i < box.subItems.length; i++) {
      let item = box.subItems[i];
      let itemY = subY + i * subHeight;

      // Sub-item background
      fill(255, 255, 255, 180);
      noStroke();
      rect(pos.x + 10, itemY, pos.w - 20, subHeight - 5, 6);

      // Bullet point
      fill(box.color);
      ellipse(pos.x + 22, itemY + subHeight/2 - 3, 8, 8);

      // Sub-item label
      fill(colors.text);
      textSize(11);
      textAlign(LEFT, TOP);
      textStyle(BOLD);
      text(item.label, pos.x + 32, itemY + 5);
      textStyle(NORMAL);

      // Sub-item description
      fill(colors.subtext);
      textSize(9);
      text(item.desc, pos.x + 32, itemY + 20, pos.w - 50, subHeight - 25);
    }
  }
}

function drawArrow(fromPos, toPos, label) {
  let startX = fromPos.x + fromPos.w;
  let startY = fromPos.y + fromPos.h / 2;
  let endX = toPos.x;
  let endY = toPos.y + toPos.h / 2;

  let midX = (startX + endX) / 2;
  let controlOffset = 20;

  // Draw curved arrow path
  stroke(colors.arrow);
  strokeWeight(2);
  noFill();

  // Bezier curve
  beginShape();
  vertex(startX + 5, startY);
  bezierVertex(
    startX + 25, startY,
    endX - 25, endY,
    endX - 10, endY
  );
  endShape();

  // Animated dots along path
  fill(colors.arrow);
  noStroke();
  for (let i = 0; i < 3; i++) {
    let t = (arrowAnimOffset + i * 0.33) % 1;
    let dotX = bezierPoint(startX + 5, startX + 25, endX - 25, endX - 10, t);
    let dotY = bezierPoint(startY, startY, endY, endY, t);
    ellipse(dotX, dotY, 5, 5);
  }

  // Arrow head
  let arrowSize = 8;
  push();
  translate(endX - 5, endY);
  fill(colors.arrow);
  noStroke();
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
  pop();

  // Label
  fill(colors.subtext);
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(ITALIC);
  text(label, midX, min(startY, endY) - 15);
  textStyle(NORMAL);
}

function drawIcon(type, x, y, col) {
  stroke(col);
  strokeWeight(1.5);
  noFill();

  switch(type) {
    case 'click':
      // Mouse pointer icon
      beginShape();
      vertex(x - 6, y - 8);
      vertex(x - 6, y + 5);
      vertex(x - 2, y + 1);
      vertex(x + 2, y + 8);
      vertex(x + 5, y + 6);
      vertex(x + 1, y - 1);
      vertex(x + 6, y - 1);
      vertex(x - 6, y - 8);
      endShape(CLOSE);
      break;

    case 'gear':
      // Gear icon
      ellipse(x, y, 14, 14);
      ellipse(x, y, 6, 6);
      for (let i = 0; i < 6; i++) {
        let angle = i * PI / 3;
        let x1 = x + cos(angle) * 7;
        let y1 = y + sin(angle) * 7;
        let x2 = x + cos(angle) * 10;
        let y2 = y + sin(angle) * 10;
        line(x1, y1, x2, y2);
      }
      break;

    case 'eye':
      // Eye icon
      beginShape();
      vertex(x - 10, y);
      bezierVertex(x - 5, y - 6, x + 5, y - 6, x + 10, y);
      bezierVertex(x + 5, y + 6, x - 5, y + 6, x - 10, y);
      endShape();
      fill(col);
      ellipse(x, y, 6, 6);
      break;
  }
}

function drawTooltip(text) {
  let padding = 10;
  textSize(11);
  let textW = textWidth(text);
  let boxW = min(textW + padding * 2, 280);
  let boxH = 35;

  let tooltipX = mouseX + 15;
  let tooltipY = mouseY - boxH - 10;

  // Keep tooltip on screen
  if (tooltipX + boxW > canvasWidth - margin) {
    tooltipX = mouseX - boxW - 15;
  }
  if (tooltipY < margin) {
    tooltipY = mouseY + 20;
  }

  // Tooltip background
  fill(50, 50, 50, 230);
  noStroke();
  rect(tooltipX, tooltipY, boxW, boxH, 6);

  // Tooltip text
  fill(255);
  textAlign(LEFT, CENTER);
  textWrap(WORD);
  text(text, tooltipX + padding, tooltipY + boxH/2, boxW - padding * 2);
}

function drawControlArea() {
  // Instructions
  fill(colors.subtext);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Three-Part Interaction Structure: Every user interaction follows Trigger \u2192 Response \u2192 Feedback", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function getHoveredBox() {
  for (let key of ['trigger', 'response', 'feedback']) {
    let pos = boxPositions[key];
    if (pos && mouseX >= pos.x && mouseX <= pos.x + pos.w &&
        mouseY >= pos.y && mouseY <= pos.y + pos.h) {
      return key;
    }
  }
  return null;
}

function mousePressed() {
  if (mouseY > drawHeight) return; // Ignore clicks in control area

  let clicked = getHoveredBox();
  if (clicked) {
    expandedBoxes[clicked] = !expandedBoxes[clicked];
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
