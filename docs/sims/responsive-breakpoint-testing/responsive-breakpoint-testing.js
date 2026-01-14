// Responsive Breakpoint Testing MicroSim
// Demonstrates how MicroSims adapt across device sizes with visual mockups

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let selectedDevice = -1;
let hoveredDevice = -1;
let mouseOverCanvas = false;

// Device definitions
const devices = [
  {
    name: 'Desktop',
    width: 1920,
    displayWidth: 170,
    frameWidth: 180,
    frameHeight: 140,
    type: 'monitor',
    breakpointChanges: [
      'Control panel on right side',
      'Full horizontal layout',
      'Standard font sizes',
      'Mouse-optimized targets'
    ],
    status: 'pass' // pass, warning, fail
  },
  {
    name: 'Laptop',
    width: 1366,
    displayWidth: 140,
    frameWidth: 160,
    frameHeight: 120,
    type: 'laptop',
    breakpointChanges: [
      'Slightly condensed layout',
      'Side panel may narrow',
      'Font sizes maintained',
      'Mouse interactions'
    ],
    status: 'pass'
  },
  {
    name: 'Tablet',
    width: 768,
    displayWidth: 100,
    frameWidth: 110,
    frameHeight: 140,
    type: 'tablet',
    breakpointChanges: [
      'Control panel moves to bottom',
      'Vertical stacking begins',
      'Touch targets: 44px minimum',
      'Fonts scale down slightly'
    ],
    status: 'warning'
  },
  {
    name: 'Mobile',
    width: 375,
    displayWidth: 60,
    frameWidth: 70,
    frameHeight: 130,
    type: 'phone',
    breakpointChanges: [
      'Single column layout',
      'Controls below canvas',
      'Large touch targets: 48px+',
      'Increased font weight'
    ],
    status: 'warning'
  }
];

// Colors
const colors = {
  background: '#F5F7FA',
  controlBg: '#FFFFFF',
  deviceFrame: '#333333',
  deviceScreen: '#FFFFFF',
  deviceStand: '#555555',
  canvas: '#E3F2FD',
  controlPanel: '#FFF3E0',
  annotation: '#1976D2',
  annotationBg: 'rgba(25, 118, 210, 0.1)',
  text: '#333333',
  subtext: '#666666',
  pass: '#4CAF50',
  warning: '#FF9800',
  fail: '#F44336',
  hover: 'rgba(25, 118, 210, 0.15)',
  selected: 'rgba(25, 118, 210, 0.25)',
  title: '#1565C0'
};

// Checklist for each device
const checklists = {
  'Desktop': [
    { item: 'Canvas fills available width', checked: true },
    { item: 'Controls positioned on side', checked: true },
    { item: 'Hover states functional', checked: true },
    { item: 'Keyboard navigation works', checked: true },
    { item: 'All text readable at 16px+', checked: true }
  ],
  'Laptop': [
    { item: 'Layout adapts to narrower viewport', checked: true },
    { item: 'No horizontal scrolling', checked: true },
    { item: 'Controls remain accessible', checked: true },
    { item: 'Interactive elements visible', checked: true },
    { item: 'Performance acceptable', checked: true }
  ],
  'Tablet': [
    { item: 'Touch targets minimum 44px', checked: true },
    { item: 'Controls move to bottom', checked: false },
    { item: 'Pinch-to-zoom disabled if needed', checked: true },
    { item: 'Portrait orientation supported', checked: false },
    { item: 'No hover-dependent features', checked: true }
  ],
  'Mobile': [
    { item: 'Touch targets minimum 48px', checked: true },
    { item: 'Single column layout', checked: false },
    { item: 'Thumb-reachable controls', checked: true },
    { item: 'Readable without zooming', checked: true },
    { item: 'Fast load time (<3s)', checked: true }
  ]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  describe('Responsive Breakpoint Testing visualization showing four device mockups (Desktop, Laptop, Tablet, Mobile) side by side. Each device displays a simplified MicroSim layout with annotations showing responsive design changes. Traffic light indicators show pass/warning/fail status.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill(colors.background);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill(colors.controlBg);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.title);
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Responsive Breakpoint Testing", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Subtitle
  fill(colors.subtext);
  textSize(12);
  text("Click a device to see detailed checklist", canvasWidth / 2, 36);

  // Calculate device positions
  let totalWidth = 0;
  for (let d of devices) {
    totalWidth += d.frameWidth + 20;
  }
  totalWidth -= 20;

  let startX = (canvasWidth - totalWidth) / 2;
  let deviceY = 70;

  // Draw devices
  let currentX = startX;
  for (let i = 0; i < devices.length; i++) {
    let device = devices[i];
    let isHovered = hoveredDevice === i;
    let isSelected = selectedDevice === i;

    // Draw device frame
    drawDevice(device, currentX, deviceY, isHovered, isSelected);

    currentX += device.frameWidth + 20;
  }

  // Draw selected device checklist
  if (selectedDevice >= 0) {
    drawChecklist(devices[selectedDevice]);
  }

  // Draw control area content
  drawControlArea();
}

function drawDevice(device, x, y, isHovered, isSelected) {
  let centerX = x + device.frameWidth / 2;

  // Selection/hover highlight
  if (isSelected || isHovered) {
    fill(isSelected ? colors.selected : colors.hover);
    noStroke();
    rect(x - 5, y - 5, device.frameWidth + 10, device.frameHeight + 60, 8);
  }

  // Draw device frame based on type
  push();

  if (device.type === 'monitor') {
    // Monitor frame
    fill(colors.deviceFrame);
    noStroke();
    rect(x, y, device.frameWidth, device.frameHeight - 20, 5);

    // Screen
    fill(colors.deviceScreen);
    rect(x + 8, y + 8, device.frameWidth - 16, device.frameHeight - 36, 2);

    // Stand
    fill(colors.deviceStand);
    rect(centerX - 15, y + device.frameHeight - 20, 30, 8);
    rect(centerX - 25, y + device.frameHeight - 12, 50, 8, 0, 0, 3, 3);

    // Draw MicroSim layout inside screen
    drawMicroSimLayout(device, x + 10, y + 10, device.frameWidth - 20, device.frameHeight - 40, 'horizontal');

  } else if (device.type === 'laptop') {
    // Laptop screen
    fill(colors.deviceFrame);
    noStroke();
    rect(x, y, device.frameWidth, device.frameHeight - 30, 5, 5, 0, 0);

    // Screen
    fill(colors.deviceScreen);
    rect(x + 6, y + 6, device.frameWidth - 12, device.frameHeight - 42, 2);

    // Keyboard base
    fill(colors.deviceFrame);
    beginShape();
    vertex(x - 10, y + device.frameHeight - 30);
    vertex(x + device.frameWidth + 10, y + device.frameHeight - 30);
    vertex(x + device.frameWidth + 15, y + device.frameHeight - 10);
    vertex(x - 15, y + device.frameHeight - 10);
    endShape(CLOSE);

    // Keyboard surface
    fill('#444444');
    rect(x - 8, y + device.frameHeight - 28, device.frameWidth + 16, 16, 2);

    // Trackpad
    fill('#555555');
    rect(centerX - 15, y + device.frameHeight - 26, 30, 10, 2);

    // Draw MicroSim layout inside screen
    drawMicroSimLayout(device, x + 8, y + 8, device.frameWidth - 16, device.frameHeight - 46, 'horizontal');

  } else if (device.type === 'tablet') {
    // Tablet frame
    fill(colors.deviceFrame);
    noStroke();
    rect(x, y, device.frameWidth, device.frameHeight, 8);

    // Screen
    fill(colors.deviceScreen);
    rect(x + 6, y + 10, device.frameWidth - 12, device.frameHeight - 20, 4);

    // Home button
    fill('#555555');
    ellipse(centerX, y + device.frameHeight - 6, 8, 8);

    // Draw MicroSim layout inside screen
    drawMicroSimLayout(device, x + 8, y + 12, device.frameWidth - 16, device.frameHeight - 26, 'vertical');

  } else if (device.type === 'phone') {
    // Phone frame
    fill(colors.deviceFrame);
    noStroke();
    rect(x, y, device.frameWidth, device.frameHeight, 10);

    // Screen
    fill(colors.deviceScreen);
    rect(x + 4, y + 12, device.frameWidth - 8, device.frameHeight - 24, 4);

    // Notch
    fill(colors.deviceFrame);
    rect(centerX - 10, y, 20, 12, 0, 0, 5, 5);

    // Home indicator
    fill('#555555');
    rect(centerX - 12, y + device.frameHeight - 8, 24, 4, 2);

    // Draw MicroSim layout inside screen
    drawMicroSimLayout(device, x + 6, y + 14, device.frameWidth - 12, device.frameHeight - 30, 'stacked');
  }

  pop();

  // Device name and dimensions
  fill(colors.text);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(device.name, centerX, y + device.frameHeight + 5);
  textStyle(NORMAL);

  fill(colors.subtext);
  textSize(10);
  text(device.width + 'px', centerX, y + device.frameHeight + 20);

  // Traffic light indicator
  let statusColor = device.status === 'pass' ? colors.pass :
                    device.status === 'warning' ? colors.warning : colors.fail;
  fill(statusColor);
  noStroke();
  ellipse(centerX, y + device.frameHeight + 42, 16, 16);

  // Status icon
  fill('white');
  textSize(10);
  textAlign(CENTER, CENTER);
  if (device.status === 'pass') {
    text('✓', centerX, y + device.frameHeight + 42);
  } else if (device.status === 'warning') {
    text('!', centerX, y + device.frameHeight + 42);
  } else {
    text('×', centerX, y + device.frameHeight + 42);
  }
}

function drawMicroSimLayout(device, x, y, w, h, layout) {
  // Background
  fill(colors.canvas);
  noStroke();
  rect(x, y, w, h, 2);

  if (layout === 'horizontal') {
    // Canvas area (left 70%)
    let canvasW = w * 0.68;
    fill('#BBDEFB');
    rect(x + 2, y + 2, canvasW - 2, h - 4, 2);

    // Simulation content placeholder
    fill('#90CAF9');
    ellipse(x + 2 + canvasW / 2, y + h / 2, min(canvasW, h) * 0.5);

    // Control panel (right 30%)
    fill(colors.controlPanel);
    rect(x + canvasW + 2, y + 2, w - canvasW - 4, h - 4, 2);

    // Control elements (sliders)
    fill('#FFE0B2');
    let controlX = x + canvasW + 6;
    let controlW = w - canvasW - 12;
    for (let i = 0; i < 3; i++) {
      rect(controlX, y + 8 + i * (h / 4), controlW, h / 6, 2);
    }

  } else if (layout === 'vertical') {
    // Canvas area (top 60%)
    let canvasH = h * 0.58;
    fill('#BBDEFB');
    rect(x + 2, y + 2, w - 4, canvasH - 2, 2);

    // Simulation content placeholder
    fill('#90CAF9');
    ellipse(x + w / 2, y + canvasH / 2, min(w, canvasH) * 0.4);

    // Control panel (bottom 40%)
    fill(colors.controlPanel);
    rect(x + 2, y + canvasH + 2, w - 4, h - canvasH - 4, 2);

    // Control elements (larger touch targets)
    fill('#FFE0B2');
    let btnW = (w - 12) / 2;
    let btnH = (h - canvasH - 12) / 2;
    rect(x + 4, y + canvasH + 4, btnW, btnH, 2);
    rect(x + btnW + 8, y + canvasH + 4, btnW, btnH, 2);

  } else if (layout === 'stacked') {
    // Canvas area (top 50%)
    let canvasH = h * 0.48;
    fill('#BBDEFB');
    rect(x + 2, y + 2, w - 4, canvasH - 2, 2);

    // Simulation content placeholder (smaller)
    fill('#90CAF9');
    ellipse(x + w / 2, y + canvasH / 2 + 2, min(w, canvasH) * 0.5);

    // Control panel (bottom 50%) - large touch targets
    fill(colors.controlPanel);
    rect(x + 2, y + canvasH + 2, w - 4, h - canvasH - 4, 2);

    // Large touch target buttons
    fill('#FFE0B2');
    let btnH = (h - canvasH - 8) / 2;
    rect(x + 4, y + canvasH + 4, w - 8, btnH - 2, 2);
    rect(x + 4, y + canvasH + btnH + 4, w - 8, btnH - 2, 2);
  }
}

function drawChecklist(device) {
  let checklistItems = checklists[device.name];
  if (!checklistItems) return;

  let boxWidth = 220;
  let boxHeight = 130;
  let boxX = canvasWidth - boxWidth - margin;
  let boxY = drawHeight - boxHeight - 10;

  // Background with shadow
  fill(0, 0, 0, 20);
  noStroke();
  rect(boxX + 3, boxY + 3, boxWidth, boxHeight, 8);

  fill(colors.controlBg);
  stroke(colors.annotation);
  strokeWeight(2);
  rect(boxX, boxY, boxWidth, boxHeight, 8);

  // Header
  fill(colors.annotation);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(device.name + ' Checklist', boxX + 10, boxY + 10);
  textStyle(NORMAL);

  // Checklist items
  let itemY = boxY + 30;
  textSize(10);
  for (let item of checklistItems) {
    // Checkbox
    if (item.checked) {
      fill(colors.pass);
      noStroke();
      rect(boxX + 10, itemY, 12, 12, 2);
      fill('white');
      textAlign(CENTER, CENTER);
      text('✓', boxX + 16, itemY + 6);
    } else {
      noFill();
      stroke(colors.warning);
      strokeWeight(1.5);
      rect(boxX + 10, itemY, 12, 12, 2);
    }

    // Item text
    fill(item.checked ? colors.text : colors.warning);
    noStroke();
    textAlign(LEFT, TOP);
    text(item.item, boxX + 28, itemY + 1);

    itemY += 18;
  }
}

function drawControlArea() {
  // Instructions
  fill(colors.subtext);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Desktop (1920px) and Laptop (1366px) pass all tests. Tablet (768px) and Mobile (375px) have responsive layout items to verify.',
       canvasWidth / 2, drawHeight + controlHeight / 2);
}

function mousePressed() {
  // Check if clicking on a device
  let totalWidth = 0;
  for (let d of devices) {
    totalWidth += d.frameWidth + 20;
  }
  totalWidth -= 20;

  let startX = (canvasWidth - totalWidth) / 2;
  let deviceY = 70;

  let currentX = startX;
  for (let i = 0; i < devices.length; i++) {
    let device = devices[i];

    if (mouseX >= currentX - 5 && mouseX <= currentX + device.frameWidth + 5 &&
        mouseY >= deviceY - 5 && mouseY <= deviceY + device.frameHeight + 55) {
      selectedDevice = selectedDevice === i ? -1 : i;
      return;
    }

    currentX += device.frameWidth + 20;
  }

  // Click outside devices deselects
  selectedDevice = -1;
}

function mouseMoved() {
  hoveredDevice = -1;

  let totalWidth = 0;
  for (let d of devices) {
    totalWidth += d.frameWidth + 20;
  }
  totalWidth -= 20;

  let startX = (canvasWidth - totalWidth) / 2;
  let deviceY = 70;

  let currentX = startX;
  for (let i = 0; i < devices.length; i++) {
    let device = devices[i];

    if (mouseX >= currentX - 5 && mouseX <= currentX + device.frameWidth + 5 &&
        mouseY >= deviceY - 5 && mouseY <= deviceY + device.frameHeight + 55) {
      hoveredDevice = i;
      cursor(HAND);
      return;
    }

    currentX += device.frameWidth + 20;
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
  canvasHeight = drawHeight + controlHeight;
}
