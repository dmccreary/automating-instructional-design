// xAPI Data Flow MicroSim
// Shows how xAPI events flow from MicroSim interactions to LRS storage and analytics

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = 450;

// Component data
let components = [];
let dataPackets = [];
let hoveredComponent = -1;
let selectedPath = -1;
let animationSpeed = 2;

// Colors
let userColor, techColor, dataColor, securityColor, bgColor, textColor, arrowColor;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.clientWidth;
  } else {
    canvasWidth = min(windowWidth - 40, 800);
  }
  canvasWidth = min(canvasWidth, 900);
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Define colors per specification
  userColor = color(34, 197, 94);       // Green for user interaction
  techColor = color(59, 130, 246);      // Blue for technical components
  dataColor = color(156, 163, 175);     // Gray for data flow arrows
  securityColor = color(239, 68, 68);   // Red for security accents
  bgColor = color(248, 250, 252);       // Light background
  textColor = color(30, 41, 59);        // Dark text
  arrowColor = color(107, 114, 128);    // Gray arrows

  initializeComponents();
  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function initializeComponents() {
  components = [];

  let spacing = canvasWidth / 6;
  let centerY = drawHeight / 2;

  // Component 1: Student with Device (left side)
  components.push({
    id: 0,
    name: "Student",
    shortName: "Student",
    x: spacing * 0.7,
    y: centerY,
    width: 80,
    height: 100,
    type: "user",
    icon: "laptop",
    description: "Student interacting with MicroSim on device",
    annotation: ""
  });

  // Component 2: MicroSim Application
  components.push({
    id: 1,
    name: "MicroSim",
    shortName: "MicroSim",
    x: spacing * 1.8,
    y: centerY,
    width: 90,
    height: 100,
    type: "tech",
    icon: "code",
    description: "Interactive simulation with xAPI instrumentation code",
    annotation: "Every interactive event generates xAPI statement"
  });

  // Component 3: xAPI Statement
  components.push({
    id: 2,
    name: "xAPI Statement",
    shortName: "xAPI",
    x: spacing * 3,
    y: centerY,
    width: 90,
    height: 100,
    type: "tech",
    icon: "statement",
    description: "Actor-Verb-Object statement structure",
    annotation: ""
  });

  // Component 4: Learning Record Store
  components.push({
    id: 3,
    name: "Learning Record Store",
    shortName: "LRS",
    x: spacing * 4.2,
    y: centerY,
    width: 90,
    height: 100,
    type: "tech",
    icon: "database",
    description: "Secure database storing millions of learning statements",
    annotation: "Stores millions of statements, queryable"
  });

  // Component 5: Analytics Dashboard
  components.push({
    id: 4,
    name: "Analytics",
    shortName: "Analytics",
    x: spacing * 5.3,
    y: centerY,
    width: 90,
    height: 100,
    type: "tech",
    icon: "chart",
    description: "Dashboard showing learning patterns and A/B test results",
    annotation: "Pattern recognition, A/B test results"
  });
}

function draw() {
  background(bgColor);

  // Update component positions on resize
  let spacing = canvasWidth / 6;
  let centerY = drawHeight / 2;

  components[0].x = spacing * 0.7;
  components[1].x = spacing * 1.8;
  components[2].x = spacing * 3;
  components[3].x = spacing * 4.2;
  components[4].x = spacing * 5.3;

  for (let c of components) {
    c.y = centerY;
  }

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("xAPI Data Flow", canvasWidth / 2, 25);

  // Draw data flow arrows
  drawDataFlowArrows();

  // Draw components
  for (let i = 0; i < components.length; i++) {
    drawComponent(components[i], i === hoveredComponent, selectedPath === i || selectedPath === i - 1);
  }

  // Draw annotations
  drawAnnotations();

  // Draw animated data packets
  updateAndDrawPackets();

  // Draw legend
  drawLegend();

  // Draw hover description
  if (hoveredComponent >= 0) {
    drawDescription(components[hoveredComponent]);
  }

  // Spawn new packets periodically
  if (frameCount % 90 === 0) {
    spawnDataPacket();
  }
}

function drawDataFlowArrows() {
  strokeWeight(3);

  // Arrow labels
  let arrowLabels = [
    "clicks, drags, inputs",
    "event triggers",
    "HTTP POST (HTTPS)",
    "query & aggregate",
    "visualizations"
  ];

  for (let i = 0; i < components.length - 1; i++) {
    let c1 = components[i];
    let c2 = components[i + 1];

    let startX = c1.x + c1.width / 2 + 5;
    let endX = c2.x - c2.width / 2 - 15;
    let y = c1.y;

    // Highlight if selected
    let isSelected = selectedPath === i;

    // Draw arrow line
    if (isSelected) {
      stroke(techColor);
      strokeWeight(4);
    } else {
      stroke(arrowColor);
      strokeWeight(2);
    }

    line(startX, y, endX, y);

    // Draw arrowhead
    fill(isSelected ? techColor : arrowColor);
    noStroke();
    push();
    translate(endX, y);
    triangle(0, 0, -12, -6, -12, 6);
    pop();

    // Draw HTTPS lock icon for LRS connection
    if (i === 2) {
      drawLockIcon((startX + endX) / 2, y - 25);
    }

    // Draw arrow label
    fill(isSelected ? techColor : color(107, 114, 128));
    textSize(9);
    textStyle(NORMAL);
    noStroke();
    text(arrowLabels[i], (startX + endX) / 2, y + 20);
  }
}

function drawLockIcon(x, y) {
  push();
  translate(x, y);

  // Lock body
  fill(securityColor);
  noStroke();
  rect(-8, 0, 16, 12, 2);

  // Lock shackle
  noFill();
  stroke(securityColor);
  strokeWeight(2);
  arc(0, 0, 12, 12, PI, TWO_PI);

  // HTTPS label
  fill(securityColor);
  noStroke();
  textSize(8);
  textStyle(BOLD);
  text("HTTPS", 0, 20);

  pop();
}

function drawComponent(comp, isHovered, isOnPath) {
  let x = comp.x;
  let y = comp.y;
  let w = comp.width;
  let h = comp.height;

  let baseColor = comp.type === "user" ? userColor : techColor;

  // Glow effect when hovered or on selected path
  if (isHovered || isOnPath) {
    noStroke();
    for (let i = 4; i > 0; i--) {
      fill(red(baseColor), green(baseColor), blue(baseColor), 25);
      rect(x - w/2 - i*4, y - h/2 - i*4, w + i*8, h + i*8, 12);
    }
  }

  // Main component box
  fill(255);
  stroke(baseColor);
  strokeWeight(isHovered ? 3 : 2);
  rect(x - w/2, y - h/2, w, h, 8);

  // Draw icon
  drawIcon(comp.icon, x, y - 15, baseColor);

  // Component name
  fill(textColor);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  text(comp.shortName, x, y + 30);

  // Lock icon for LRS
  if (comp.icon === "database") {
    drawSmallLock(x + w/2 - 12, y - h/2 + 12);
  }
}

function drawSmallLock(x, y) {
  push();
  translate(x, y);
  fill(securityColor);
  noStroke();
  rect(-4, 2, 8, 6, 1);
  noFill();
  stroke(securityColor);
  strokeWeight(1.5);
  arc(0, 2, 6, 6, PI, TWO_PI);
  pop();
}

function drawIcon(iconType, x, y, col) {
  push();
  translate(x, y);

  switch(iconType) {
    case "laptop":
      // Laptop screen
      fill(col);
      noStroke();
      rect(-20, -15, 40, 25, 3);
      // Screen content
      fill(255);
      rect(-17, -12, 34, 19, 2);
      // Keyboard base
      fill(col);
      rect(-25, 12, 50, 6, 2);
      // Person icon above
      fill(col);
      ellipse(0, -28, 12, 12);
      rect(-6, -22, 12, 4, 2);
      break;

    case "code":
      // Code brackets
      stroke(col);
      strokeWeight(3);
      noFill();
      // Left bracket
      line(-15, -15, -22, 0);
      line(-22, 0, -15, 15);
      // Right bracket
      line(15, -15, 22, 0);
      line(22, 0, 15, 15);
      // Code lines
      strokeWeight(2);
      line(-8, -5, 8, -5);
      line(-5, 0, 10, 0);
      line(-8, 5, 5, 5);
      break;

    case "statement":
      // Actor-Verb-Object boxes
      fill(userColor);
      noStroke();
      rect(-25, -12, 16, 24, 3);
      fill(techColor);
      rect(-6, -12, 16, 24, 3);
      fill(color(147, 51, 234));
      rect(13, -12, 16, 24, 3);
      // Labels
      fill(255);
      textSize(7);
      textStyle(BOLD);
      text("A", -17, 0);
      text("V", 2, 0);
      text("O", 21, 0);
      break;

    case "database":
      // Database cylinder
      fill(col);
      noStroke();
      ellipse(0, -18, 40, 12);
      rect(-20, -18, 40, 36);
      ellipse(0, 18, 40, 12);
      // Highlight rings
      noFill();
      stroke(255, 100);
      strokeWeight(1);
      ellipse(0, -6, 36, 10);
      ellipse(0, 6, 36, 10);
      break;

    case "chart":
      // Chart background
      fill(255);
      stroke(col);
      strokeWeight(2);
      rect(-22, -18, 44, 36, 4);
      // Bar chart
      fill(col);
      noStroke();
      rect(-16, 5, 8, 10);
      rect(-5, -5, 8, 20);
      rect(6, 0, 8, 15);
      // Trend line
      stroke(userColor);
      strokeWeight(2);
      noFill();
      beginShape();
      vertex(-12, 8);
      vertex(-1, -2);
      vertex(10, 3);
      vertex(18, -8);
      endShape();
      break;
  }

  pop();
}

function drawAnnotations() {
  textSize(9);
  textStyle(ITALIC);
  fill(color(100, 116, 139));
  noStroke();

  for (let comp of components) {
    if (comp.annotation) {
      // Draw annotation below component
      let annotY = comp.y + comp.height / 2 + 35;

      // Wrap text if needed
      push();
      textAlign(CENTER, TOP);
      let maxWidth = comp.width + 30;
      text(comp.annotation, comp.x - maxWidth/2, annotY, maxWidth);
      pop();
    }
  }
}

function spawnDataPacket() {
  dataPackets.push({
    x: components[0].x + components[0].width/2,
    y: components[0].y,
    targetIndex: 1,
    color: color(34, 197, 94, 200)
  });
}

function updateAndDrawPackets() {
  for (let i = dataPackets.length - 1; i >= 0; i--) {
    let p = dataPackets[i];
    let target = components[p.targetIndex];
    let targetX = target.x - target.width/2 - 10;

    // Move packet
    let dx = targetX - p.x;
    if (abs(dx) > animationSpeed) {
      p.x += animationSpeed * sign(dx);
    } else {
      // Reached target, move to next
      p.targetIndex++;
      if (p.targetIndex >= components.length) {
        dataPackets.splice(i, 1);
        continue;
      }
      // Change color as it progresses
      if (p.targetIndex === 2) p.color = color(59, 130, 246, 200);
      if (p.targetIndex === 3) p.color = color(147, 51, 234, 200);
      if (p.targetIndex === 4) p.color = color(34, 197, 94, 200);
    }

    // Draw packet
    fill(p.color);
    noStroke();
    ellipse(p.x, p.y, 12, 12);

    // Inner dot
    fill(255);
    ellipse(p.x, p.y, 4, 4);
  }
}

function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function drawLegend() {
  let legendY = drawHeight + 25;
  let startX = canvasWidth / 2 - 150;

  textSize(10);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);

  // User interaction
  fill(userColor);
  noStroke();
  ellipse(startX, legendY, 14, 14);
  fill(textColor);
  text("User Interaction", startX + 12, legendY);

  // Technical components
  fill(techColor);
  ellipse(startX + 120, legendY, 14, 14);
  fill(textColor);
  text("Technical", startX + 132, legendY);

  // Security
  fill(securityColor);
  ellipse(startX + 210, legendY, 14, 14);
  fill(textColor);
  text("Security", startX + 222, legendY);

  textAlign(CENTER, CENTER);
}

function drawDescription(comp) {
  let boxWidth = min(350, canvasWidth - 40);
  let boxHeight = 55;
  let boxX = canvasWidth / 2;
  let boxY = 70;

  // Background box
  fill(255, 245);
  stroke(comp.type === "user" ? userColor : techColor);
  strokeWeight(2);
  rectMode(CENTER);
  rect(boxX, boxY, boxWidth, boxHeight, 8);

  // Component name
  fill(textColor);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  text(comp.name, boxX, boxY - 12);

  // Description text
  textSize(11);
  textStyle(NORMAL);
  text(comp.description, boxX, boxY + 10);
  rectMode(CORNER);
}

function mouseMoved() {
  hoveredComponent = -1;
  selectedPath = -1;

  // Check components
  for (let i = 0; i < components.length; i++) {
    let c = components[i];
    if (mouseX > c.x - c.width/2 && mouseX < c.x + c.width/2 &&
        mouseY > c.y - c.height/2 && mouseY < c.y + c.height/2) {
      hoveredComponent = i;
      cursor(HAND);
      return;
    }
  }

  // Check arrows
  for (let i = 0; i < components.length - 1; i++) {
    let c1 = components[i];
    let c2 = components[i + 1];
    let startX = c1.x + c1.width/2;
    let endX = c2.x - c2.width/2;
    let y = c1.y;

    if (mouseX > startX && mouseX < endX &&
        mouseY > y - 25 && mouseY < y + 30) {
      selectedPath = i;
      cursor(HAND);
      return;
    }
  }

  cursor(ARROW);
}

function mousePressed() {
  // Click to highlight entire data flow path from clicked component
  for (let i = 0; i < components.length; i++) {
    let c = components[i];
    if (mouseX > c.x - c.width/2 && mouseX < c.x + c.width/2 &&
        mouseY > c.y - c.height/2 && mouseY < c.y + c.height/2) {
      // Spawn a data packet from this component
      if (i < components.length - 1) {
        dataPackets.push({
          x: c.x + c.width/2,
          y: c.y,
          targetIndex: i + 1,
          color: color(34, 197, 94, 200)
        });
      }
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  initializeComponents();
}
