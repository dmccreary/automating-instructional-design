// Animation Control Guide MicroSim
// Shows best practices for animation controls in MicroSims

let canvasWidth = 400;
let canvasHeight = 520;
let drawWidth, drawHeight;
let margin = 20;

// Colors
let bgColor, textColor, accentColor, controlBgColor, highlightColor;
let playColor, resetColor, stepColor, scrubberColor, speedColor;

// Animation state (for the demo simulation)
let isPlaying = false;
let animationTime = 0;
let animationDuration = 100;
let animationSpeed = 1.0;
let loopEnabled = false;

// Ball physics for demo
let balls = [];
let gravity = 0.2;

// UI state
let hoveredElement = null;
let hoveredRegion = null;
let draggingScrubber = false;

// Control positions
let controlsY;
let scrubberY;
let speedSliderY;
let advancedY;

// Speed options
let speedOptions = [0.25, 0.5, 1.0, 1.5, 2.0];
let currentSpeedIndex = 2; // Default to 1x

function updateCanvasSize() {
  const container = select('#canvas-container');
  if (container) {
    canvasWidth = min(container.width, 600);
  } else {
    canvasWidth = min(windowWidth - 40, 600);
  }
  canvasHeight = 430;
  drawWidth = canvasWidth;
  drawHeight = canvasHeight;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');

  // Define colors
  bgColor = color(240, 248, 255); // aliceblue
  textColor = color(30, 41, 59);
  accentColor = color(59, 130, 246);
  controlBgColor = color(241, 245, 249);
  highlightColor = color(251, 191, 36);
  playColor = color(34, 197, 94);
  resetColor = color(239, 68, 68);
  stepColor = color(100, 116, 139);
  scrubberColor = color(147, 51, 234);
  speedColor = color(236, 72, 153);

  // Calculate layout positions
  calculatePositions();

  // Initialize balls for demo
  initializeBalls();

  textFont('Arial');
}

function calculatePositions() {
  controlsY = 200;
  scrubberY = 260;
  speedSliderY = 320;
  advancedY = 390;
}

function initializeBalls() {
  balls = [];
  for (let i = 0; i < 3; i++) {
    balls.push({
      x: 80 + i * 100,
      y: 50 + random(-10, 10),
      vx: random(-1, 1),
      vy: 0,
      radius: 15,
      color: color(
        [59, 130, 246][i % 3],
        [130, 51, 197][i % 3],
        [246, 234, 94][i % 3]
      )
    });
  }
  // Assign specific colors
  balls[0].color = color(59, 130, 246);
  balls[1].color = color(147, 51, 234);
  balls[2].color = color(34, 197, 94);
}

function draw() {
  background(bgColor);
  hoveredRegion = null;

  // Update animation if playing
  if (isPlaying) {
    animationTime += animationSpeed;
    if (animationTime >= animationDuration) {
      if (loopEnabled) {
        animationTime = 0;
        initializeBalls();
      } else {
        animationTime = animationDuration;
        isPlaying = false;
      }
    }
    updateBalls();
  }

  // Draw title
  drawTitle();

  // Draw demo viewport
  drawViewport();

  // Draw transport controls with annotations
  drawTransportControls();

  // Draw scrubber with annotations
  drawScrubber();

  // Draw speed control with annotations
  drawSpeedControl();

  // Draw advanced controls
  drawAdvancedControls();
}

function drawTitle() {
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Animation Control Guide", drawWidth / 2, 20);

  textSize(11);
  textStyle(NORMAL);
  fill(100);
  text("Best practices for MicroSim animation controls", drawWidth / 2, 40);
}

function drawViewport() {
  // Viewport background
  let vpX = margin;
  let vpY = 55;
  let vpW = drawWidth - 2 * margin;
  let vpH = 120;

  fill(192, 192, 192); // silver
  stroke(accentColor);
  strokeWeight(2);
  rect(vpX, vpY, vpW, vpH, 8);

  // Draw balls
  noStroke();
  for (let ball of balls) {
    fill(ball.color);
    let displayX = map(ball.x, 0, 300, vpX + 20, vpX + vpW - 20);
    let displayY = map(ball.y, 0, 100, vpY + 20, vpY + vpH - 20);
    ellipse(displayX, displayY, ball.radius * 2);

    // Draw shadow at floor level, directly under ball
    fill(0, 50);
    ellipse(displayX, vpY + vpH - 15, ball.radius * 2, ball.radius * 0.5);
  }

  // Viewport label
  fill(60);
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  text("Sample Physics Animation", vpX + 10, vpY + 5);

  // Check hover and show callout
  if (mouseX > vpX && mouseX < vpX + vpW && mouseY > vpY && mouseY < vpY + vpH) {
    hoveredRegion = 'viewport';
    drawCallout(vpX + vpW + 5, vpY + 30, "Animation viewport\nshows simulation\nin progress", -1, 0);
  }
}

function updateBalls() {
  for (let ball of balls) {
    ball.vy += gravity * animationSpeed;
    ball.y += ball.vy;
    ball.x += ball.vx;

    // Bounce off bottom
    if (ball.y > 85) {
      ball.y = 85;
      ball.vy *= -0.7;
    }

    // Bounce off walls
    if (ball.x < 15 || ball.x > 285) {
      ball.vx *= -1;
      ball.x = constrain(ball.x, 15, 285);
    }
  }
}

function drawTransportControls() {
  let y = controlsY;
  let centerX = drawWidth / 2;

  // Section label
  fill(textColor);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("Transport Controls", margin, y);

  // Control bar background
  fill(controlBgColor);
  stroke(200);
  strokeWeight(1);
  let barW = 280;
  let barH = 44;
  rect(centerX - barW/2, y, barW, barH, 8);

  // Buttons
  let btnSize = 32;
  let btnSpacing = 50;
  let btnY = y + barH/2;

  // Reset button
  let resetX = centerX - btnSpacing * 2;
  drawButton(resetX, btnY, btnSize, 'reset', hoveredElement === 'reset');

  // Step back button
  let stepBackX = centerX - btnSpacing;
  drawButton(stepBackX, btnY, btnSize, 'stepBack', hoveredElement === 'stepBack');

  // Play/Pause button (larger, prominent)
  let playX = centerX;
  let playSize = 40;
  drawButton(playX, btnY, playSize, isPlaying ? 'pause' : 'play', hoveredElement === 'play');

  // Step forward button
  let stepFwdX = centerX + btnSpacing;
  drawButton(stepFwdX, btnY, btnSize, 'stepFwd', hoveredElement === 'stepFwd');

  // Skip to end button
  let skipEndX = centerX + btnSpacing * 2;
  drawButton(skipEndX, btnY, btnSize, 'skipEnd', hoveredElement === 'skipEnd');

  // Check hover and show callout to the right of control bar
  if (mouseX > centerX - barW/2 && mouseX < centerX + barW/2 && mouseY > y - 25 && mouseY < y + barH + 10) {
    hoveredRegion = 'transport';
    let rightEdge = centerX + barW/2 + 10;
    drawCallout(rightEdge, y, "Play/pause is prominent\nas most used control.\nReset provides an\nescape hatch.", 1, 0);
  }
}

function drawButton(x, y, size, type, hovered) {
  push();
  translate(x, y);

  // Button background
  if (hovered) {
    fill(accentColor);
  } else if (type === 'play' || type === 'pause') {
    fill(playColor);
  } else if (type === 'reset') {
    fill(resetColor);
  } else {
    fill(stepColor);
  }

  noStroke();
  ellipse(0, 0, size);

  // Icon
  fill(255);
  noStroke();

  if (type === 'play') {
    triangle(-size/6, -size/4, -size/6, size/4, size/4, 0);
  } else if (type === 'pause') {
    rectMode(CENTER);
    rect(-size/8, 0, size/6, size/3, 2);
    rect(size/8, 0, size/6, size/3, 2);
  } else if (type === 'reset') {
    // Skip to start icon
    rectMode(CENTER);
    rect(-size/8, 0, size/10, size/3);
    triangle(size/5, -size/4, size/5, size/4, -size/10, 0);
  } else if (type === 'stepBack') {
    triangle(-size/8, -size/5, -size/8, size/5, -size/4, 0);
    rectMode(CENTER);
    rect(size/10, 0, size/10, size/3);
  } else if (type === 'stepFwd') {
    triangle(size/8, -size/5, size/8, size/5, size/4, 0);
    rectMode(CENTER);
    rect(-size/10, 0, size/10, size/3);
  } else if (type === 'skipEnd') {
    // Skip to end icon
    rectMode(CENTER);
    rect(size/8, 0, size/10, size/3);
    triangle(-size/5, -size/4, -size/5, size/4, size/10, 0);
  }

  pop();
}

function drawScrubber() {
  let y = scrubberY;
  let x = margin + 20;
  let w = drawWidth - 2 * margin - 80;

  // Section label
  fill(textColor);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("Timeline", margin, y - 15);

  // Track background
  fill(220);
  noStroke();
  rect(x, y + 8, w, 8, 4);

  // Progress fill
  let progress = animationTime / animationDuration;
  fill(scrubberColor);
  rect(x, y + 8, w * progress, 8, 4);

  // Segment markers
  stroke(150);
  strokeWeight(2);
  for (let i = 1; i < 4; i++) {
    let markerX = x + (w * i / 4);
    line(markerX, y + 4, markerX, y + 20);
  }

  // Playhead
  let playheadX = x + w * progress;
  fill(scrubberColor);
  noStroke();
  ellipse(playheadX, y + 12, 16, 16);
  fill(255);
  ellipse(playheadX, y + 12, 8, 8);

  // Time display
  fill(textColor);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  let currentSec = (animationTime / 10).toFixed(1);
  let totalSec = (animationDuration / 10).toFixed(1);
  text(currentSec + "s / " + totalSec + "s", x + w + 10, y + 12);

  // Check hover and show callout to the right
  if (mouseX > margin && mouseX < drawWidth - margin && mouseY > y - 20 && mouseY < y + 30) {
    hoveredRegion = 'scrubber';
    let rightEdge = x + w + 50;
    drawCallout(rightEdge, y, "Allow random access\nto any point. Markers\nshow structure.", 1, 0);
  }
}

function drawSpeedControl() {
  let y = speedSliderY;
  let x = margin + 40;
  let w = 160;

  // Section label
  fill(textColor);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("Speed Control", margin, y - 15);

  // Track background
  fill(220);
  noStroke();
  rect(x, y + 8, w, 8, 4);

  // Speed markers and labels
  textSize(9);
  textAlign(CENTER, TOP);
  for (let i = 0; i < speedOptions.length; i++) {
    let markerX = x + (w * i / (speedOptions.length - 1));

    // Marker tick
    stroke(150);
    strokeWeight(1);
    line(markerX, y + 4, markerX, y + 20);

    // Label
    noStroke();
    fill(i === currentSpeedIndex ? speedColor : color(100));
    text(speedOptions[i] + "x", markerX, y + 22);
  }

  // Current speed indicator
  let sliderX = x + (w * currentSpeedIndex / (speedOptions.length - 1));
  fill(speedColor);
  noStroke();
  ellipse(sliderX, y + 12, 16, 16);
  fill(255);
  ellipse(sliderX, y + 12, 6, 6);

  // Current speed display
  fill(speedColor);
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("Current: " + speedOptions[currentSpeedIndex] + "x", x + w + 30, y + 12);

  // Check hover and show callout to the right
  if (mouseX > margin && mouseX < drawWidth - margin && mouseY > y - 20 && mouseY < y + 45) {
    hoveredRegion = 'speed';
    let rightEdge = x + w + 150;
    drawCallout(rightEdge, y, "Default to 1x speed.\nAllow slower playback\nfor complex content.", 1, 0);
  }
}

function drawAdvancedControls() {
  let y = advancedY;

  // Section label
  fill(textColor);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("Advanced Controls (Optional)", margin, y - 15);

  fill(100);
  textSize(10);
  textStyle(ITALIC);
  text("shown in secondary position", margin + 180, y - 15);

  // Control group background
  fill(controlBgColor);
  stroke(200);
  strokeWeight(1);
  rect(margin, y, drawWidth - 2 * margin, 50, 8);

  let btnY = y + 25;
  let startX = margin + 50;

  // Loop toggle
  fill(loopEnabled ? accentColor : color(180));
  noStroke();
  rectMode(CENTER);
  rect(startX, btnY, 40, 24, 12);
  fill(255);
  let toggleX = loopEnabled ? startX + 8 : startX - 8;
  ellipse(toggleX, btnY, 18, 18);
  rectMode(CORNER);

  fill(textColor);
  textSize(10);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  text("Loop", startX + 30, btnY);

  // Fullscreen button
  let fsX = startX + 100;
  fill(stepColor);
  noStroke();
  rectMode(CENTER);
  rect(fsX, btnY, 28, 28, 4);

  // Fullscreen icon
  stroke(255);
  strokeWeight(2);
  noFill();
  rect(fsX - 6, btnY - 6, 12, 12);
  line(fsX - 8, btnY - 8, fsX - 4, btnY - 4);
  line(fsX + 8, btnY + 8, fsX + 4, btnY + 4);
  line(fsX - 8, btnY + 8, fsX - 4, btnY + 4);
  line(fsX + 8, btnY - 8, fsX + 4, btnY - 4);
  rectMode(CORNER);

  fill(textColor);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text("Fullscreen", fsX + 20, btnY);

  // Quality dropdown
  let qualX = fsX + 110;
  fill(stepColor);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(qualX, btnY, 60, 26, 4);
  rectMode(CORNER);

  fill(255);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text("HD", qualX, btnY);

  // Dropdown arrow
  fill(255);
  triangle(qualX + 20, btnY - 3, qualX + 25, btnY - 3, qualX + 22.5, btnY + 3);

  fill(textColor);
  textAlign(LEFT, CENTER);
  text("Quality", qualX + 40, btnY);
}

function drawCallout(x, y, labelText, anchorX, anchorY) {
  push();

  // Constrain callout to canvas
  let textW = 130;
  let padding = 8;

  // Adjust position based on anchor
  let boxX = x;
  let boxY = y;

  if (anchorX < 0) boxX = x - textW - padding * 2;
  else if (anchorX === 0) boxX = x - textW/2 - padding;

  // Keep within bounds
  boxX = constrain(boxX, 5, drawWidth - textW - padding * 2 - 5);

  // Background
  fill(255, 240);
  stroke(highlightColor);
  strokeWeight(2);

  textSize(9);
  let lines = labelText.split('\n');
  let boxH = lines.length * 12 + padding * 2;

  rectMode(CORNER);
  rect(boxX, boxY, textW + padding * 2, boxH, 4);

  // Text
  fill(textColor);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(NORMAL);

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], boxX + padding, boxY + padding + i * 12);
  }

  pop();
}

function mousePressed() {
  let centerX = drawWidth / 2;
  let btnY = controlsY + 22;
  let btnSpacing = 50;

  // Check play button
  if (dist(mouseX, mouseY, centerX, btnY) < 20) {
    isPlaying = !isPlaying;
    if (isPlaying && animationTime >= animationDuration) {
      animationTime = 0;
      initializeBalls();
    }
  }

  // Check reset button
  if (dist(mouseX, mouseY, centerX - btnSpacing * 2, btnY) < 16) {
    animationTime = 0;
    isPlaying = false;
    initializeBalls();
  }

  // Check step back
  if (dist(mouseX, mouseY, centerX - btnSpacing, btnY) < 16) {
    animationTime = max(0, animationTime - 10);
  }

  // Check step forward
  if (dist(mouseX, mouseY, centerX + btnSpacing, btnY) < 16) {
    animationTime = min(animationDuration, animationTime + 10);
  }

  // Check skip to end
  if (dist(mouseX, mouseY, centerX + btnSpacing * 2, btnY) < 16) {
    animationTime = animationDuration;
    isPlaying = false;
  }

  // Check scrubber
  let scrubX = margin + 40;
  let scrubW = drawWidth - 2 * margin - 80;
  if (mouseY > scrubberY && mouseY < scrubberY + 30 &&
      mouseX > scrubX && mouseX < scrubX + scrubW) {
    draggingScrubber = true;
    let progress = (mouseX - scrubX) / scrubW;
    animationTime = constrain(progress * animationDuration, 0, animationDuration);
  }

  // Check speed control
  let speedX = margin + 40;
  let speedW = 160;
  if (mouseY > speedSliderY && mouseY < speedSliderY + 40 &&
      mouseX > speedX && mouseX < speedX + speedW) {
    let clickPos = (mouseX - speedX) / speedW;
    currentSpeedIndex = round(clickPos * (speedOptions.length - 1));
    currentSpeedIndex = constrain(currentSpeedIndex, 0, speedOptions.length - 1);
    animationSpeed = speedOptions[currentSpeedIndex];
  }

  // Check loop toggle
  let loopX = margin + 50;
  let loopY = advancedY + 25;
  if (mouseX > loopX - 25 && mouseX < loopX + 25 &&
      mouseY > loopY - 15 && mouseY < loopY + 15) {
    loopEnabled = !loopEnabled;
  }
}

function mouseDragged() {
  if (draggingScrubber) {
    let scrubX = margin + 40;
    let scrubW = drawWidth - 2 * margin - 80;
    let progress = (mouseX - scrubX) / scrubW;
    animationTime = constrain(progress * animationDuration, 0, animationDuration);
  }
}

function mouseReleased() {
  draggingScrubber = false;
}

function mouseMoved() {
  let centerX = drawWidth / 2;
  let btnY = controlsY + 22;
  let btnSpacing = 50;

  hoveredElement = null;

  if (dist(mouseX, mouseY, centerX, btnY) < 20) {
    hoveredElement = 'play';
  } else if (dist(mouseX, mouseY, centerX - btnSpacing * 2, btnY) < 16) {
    hoveredElement = 'reset';
  } else if (dist(mouseX, mouseY, centerX - btnSpacing, btnY) < 16) {
    hoveredElement = 'stepBack';
  } else if (dist(mouseX, mouseY, centerX + btnSpacing, btnY) < 16) {
    hoveredElement = 'stepFwd';
  } else if (dist(mouseX, mouseY, centerX + btnSpacing * 2, btnY) < 16) {
    hoveredElement = 'skipEnd';
  }
}

function keyPressed() {
  // Space to play/pause
  if (key === ' ') {
    isPlaying = !isPlaying;
    if (isPlaying && animationTime >= animationDuration) {
      animationTime = 0;
      initializeBalls();
    }
    return false;
  }

  // Left arrow to step back
  if (keyCode === LEFT_ARROW) {
    animationTime = max(0, animationTime - 10);
    return false;
  }

  // Right arrow to step forward
  if (keyCode === RIGHT_ARROW) {
    animationTime = min(animationDuration, animationTime + 10);
    return false;
  }

  // R to reset
  if (key === 'r' || key === 'R') {
    animationTime = 0;
    isPlaying = false;
    initializeBalls();
    return false;
  }

  // L to toggle loop
  if (key === 'l' || key === 'L') {
    loopEnabled = !loopEnabled;
    return false;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculatePositions();
}
