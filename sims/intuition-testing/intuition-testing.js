// Intuition Testing MicroSim
// Interactive simulation for testing intuitive responses against scientific understanding
// Reveals common misconceptions through engaging scenario-based testing

// Canvas dimensions
let canvasWidth = 800;
let canvasHeight = 550;
let drawHeight = 500;
let controlHeight = 50;

// Scenario definitions
const scenarios = [
  {
    id: 1,
    title: "Circular Motion",
    question: "A ball travels through a curved tube. Select the path it takes after exiting.",
    options: [
      { label: "A", description: "Continues curving", correct: false, misconception: "circular impetus - the intuitive belief that objects 'remember' circular motion" },
      { label: "B", description: "Straight tangent", correct: true, explanation: "Newton's First Law: objects in motion continue in a straight line unless acted upon by a force. Once the tube no longer constrains the ball, it moves tangentially." },
      { label: "C", description: "Straight down", correct: false, misconception: "gravity dominance - overestimating gravity's immediate effect on horizontal velocity" }
    ],
    commonPercent: [45, 35, 20],
    animationType: "circularMotion"
  },
  {
    id: 2,
    title: "Falling Objects",
    question: "A heavy ball (10kg) and a light ball (1kg) are dropped from the same height at the same time. Which lands first?",
    options: [
      { label: "A", description: "Heavy ball first", correct: false, misconception: "Aristotelian physics - heavier objects fall faster, a common intuition that Galileo disproved" },
      { label: "B", description: "Same time", correct: true, explanation: "In the absence of air resistance, all objects fall at the same rate (9.8 m/s^2) regardless of mass. This is because gravitational acceleration is independent of mass." },
      { label: "C", description: "Light ball first", correct: false, misconception: "reverse weight assumption - rare but sometimes occurs from overcorrection" }
    ],
    commonPercent: [58, 32, 10],
    animationType: "fallingObjects"
  },
  {
    id: 3,
    title: "Electric Current",
    question: "In a simple circuit with a battery and bulb, is the current the same on both sides of the bulb?",
    options: [
      { label: "A", description: "Less after bulb", correct: false, misconception: "current consumption model - believing current gets 'used up' by the bulb, like water being absorbed" },
      { label: "B", description: "Same current", correct: true, explanation: "Current is conserved in a circuit. The same number of electrons flow into and out of the bulb. Energy is converted to light and heat, but current (charge flow) remains constant." },
      { label: "C", description: "More after bulb", correct: false, misconception: "current accumulation - a rare misconception about electricity behavior" }
    ],
    commonPercent: [52, 38, 10],
    animationType: "circuit"
  },
  {
    id: 4,
    title: "Evolution",
    question: "A beetle population was mostly brown, but over many generations became mostly green. Why?",
    options: [
      { label: "A", description: "Beetles changed to survive", correct: false, misconception: "Lamarckian inheritance - the intuitive but incorrect idea that organisms can will themselves to change" },
      { label: "B", description: "Green beetles survived better", correct: true, explanation: "Natural selection: green beetles were more likely to survive (perhaps better camouflaged) and pass on their genes. The population shifted because green individuals reproduced more successfully." },
      { label: "C", description: "Beetles chose to adapt", correct: false, misconception: "intentional evolution - attributing conscious choice to evolutionary processes" }
    ],
    commonPercent: [35, 40, 25],
    animationType: "evolution"
  }
];

// State management
let currentScenario = 0;
let state = "intro"; // intro, scenario, thinking, answered, feedback, animation, complete
let selectedOption = -1;
let confidenceLevel = 50;
let startTime = 0;
let responseTime = 0;
let timerRunning = false;
let maxTime = 10; // seconds for intuitive response

// Results tracking
let results = [];
let totalCorrect = 0;

// Animation state
let animTime = 0;
let animDuration = 180; // frames (3 seconds at 60fps)
let showingCorrect = false;

// Colors
let bgColor, cardColor, primaryColor, correctColor, incorrectColor;
let textColor, lightTextColor, accentColor;

// UI elements
let confidenceSlider;
let lockInButton;
let nextButton;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.clientWidth - 20, 800);
  } else {
    canvasWidth = Math.min(windowWidth - 40, 800);
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const container = document.querySelector('main');
  if (container) {
    canvas.parent(container);
  }

  // Define colors
  bgColor = color(248, 250, 252);
  cardColor = color(255);
  primaryColor = color(59, 130, 246);
  correctColor = color(34, 197, 94);
  incorrectColor = color(239, 68, 68);
  textColor = color(30, 41, 59);
  lightTextColor = color(100, 116, 139);
  accentColor = color(147, 51, 234);

  // Create UI elements
  createUIElements();

  textFont('Arial');
}

function createUIElements() {
  // Confidence slider
  confidenceSlider = createSlider(0, 100, 50, 1);
  confidenceSlider.position(canvasWidth / 2 - 100, drawHeight + 15);
  confidenceSlider.style('width', '200px');
  confidenceSlider.hide();

  // Lock in button
  lockInButton = createButton('Lock In Answer');
  lockInButton.position(canvasWidth / 2 - 60, drawHeight + 15);
  lockInButton.mousePressed(lockInAnswer);
  lockInButton.style('background-color', '#3b82f6');
  lockInButton.style('color', 'white');
  lockInButton.style('border', 'none');
  lockInButton.style('padding', '10px 20px');
  lockInButton.style('border-radius', '8px');
  lockInButton.style('cursor', 'pointer');
  lockInButton.style('font-weight', 'bold');
  lockInButton.hide();

  // Next button
  nextButton = createButton('Next Scenario');
  nextButton.position(canvasWidth / 2 - 60, drawHeight + 15);
  nextButton.mousePressed(nextScenario);
  nextButton.style('background-color', '#22c55e');
  nextButton.style('color', 'white');
  nextButton.style('border', 'none');
  nextButton.style('padding', '10px 20px');
  nextButton.style('border-radius', '8px');
  nextButton.style('cursor', 'pointer');
  nextButton.style('font-weight', 'bold');
  nextButton.hide();
}

function draw() {
  background(bgColor);

  switch (state) {
    case "intro":
      drawIntro();
      break;
    case "scenario":
      drawScenario();
      updateTimer();
      break;
    case "thinking":
      drawConfidencePhase();
      break;
    case "answered":
    case "feedback":
      drawFeedback();
      break;
    case "animation":
      drawAnimation();
      break;
    case "complete":
      drawComplete();
      break;
  }

  drawProgressIndicator();
}

function drawIntro() {
  // Title
  fill(primaryColor);
  textSize(28);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Intuition Testing", canvasWidth / 2, 80);

  // Description
  fill(textColor);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);

  let desc = "Test your intuitive understanding of physics and biology.\n\nYou'll see 4 scenarios and answer based on your first instinct.\nA timer encourages quick, intuitive responses.\n\nThere's no judgment here - this reveals common\nmisconceptions that even experts initially share.";
  text(desc, canvasWidth / 2, 140);

  // Start button area
  let btnX = canvasWidth / 2 - 80;
  let btnY = 320;
  let btnW = 160;
  let btnH = 50;

  if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
    fill(primaryColor);
    cursor(HAND);
  } else {
    fill(color(red(primaryColor), green(primaryColor), blue(primaryColor), 230));
    cursor(ARROW);
  }
  noStroke();
  rect(btnX, btnY, btnW, btnH, 10);

  fill(255);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Begin Test", canvasWidth / 2, btnY + btnH / 2);
}

function drawScenario() {
  let scenario = scenarios[currentScenario];

  // Scenario title
  fill(primaryColor);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Scenario " + (currentScenario + 1) + ": " + scenario.title, canvasWidth / 2, 20);

  // Question
  fill(textColor);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text(scenario.question, canvasWidth / 2, 55, canvasWidth - 60);

  // Timer bar
  drawTimer();

  // Draw scenario-specific visualization
  drawScenarioVisualization(scenario, 110, 140);

  // Options
  drawOptions(scenario, 300);

  // Show lock-in button when option selected
  if (selectedOption >= 0) {
    lockInButton.show();
    lockInButton.position(canvasWidth / 2 - 60, drawHeight + 15);
  }
}

function drawTimer() {
  let elapsed = timerRunning ? (millis() - startTime) / 1000 : 0;
  let remaining = max(0, maxTime - elapsed);
  let progress = remaining / maxTime;

  // Timer bar background
  fill(230);
  noStroke();
  rect(50, 90, canvasWidth - 100, 12, 6);

  // Timer bar fill
  if (progress > 0.3) {
    fill(primaryColor);
  } else if (progress > 0.1) {
    fill(color(245, 158, 11));
  } else {
    fill(incorrectColor);
  }
  rect(50, 90, (canvasWidth - 100) * progress, 12, 6);

  // Time text
  fill(lightTextColor);
  textSize(10);
  textAlign(RIGHT, CENTER);
  text(nf(remaining, 1, 1) + "s", canvasWidth - 50, 96);
}

function updateTimer() {
  if (!timerRunning) {
    startTime = millis();
    timerRunning = true;
  }

  let elapsed = (millis() - startTime) / 1000;
  if (elapsed >= maxTime && selectedOption >= 0) {
    // Auto-lock if time runs out and option selected
    lockInAnswer();
  }
}

function drawScenarioVisualization(scenario, startY, height) {
  let centerX = canvasWidth / 2;
  let centerY = startY + height / 2;

  switch (scenario.animationType) {
    case "circularMotion":
      drawCircularMotionPreview(centerX, centerY);
      break;
    case "fallingObjects":
      drawFallingObjectsPreview(centerX, centerY);
      break;
    case "circuit":
      drawCircuitPreview(centerX, centerY);
      break;
    case "evolution":
      drawEvolutionPreview(centerX, centerY);
      break;
  }
}

function drawCircularMotionPreview(cx, cy) {
  // Draw curved tube
  noFill();
  stroke(100);
  strokeWeight(20);
  arc(cx - 50, cy, 120, 120, -PI / 2, PI / 2);

  stroke(180);
  strokeWeight(16);
  arc(cx - 50, cy, 120, 120, -PI / 2, PI / 2);

  // Ball in tube
  let ballAngle = PI / 3;
  let ballX = cx - 50 + cos(ballAngle) * 60;
  let ballY = cy + sin(ballAngle) * 60;

  fill(primaryColor);
  noStroke();
  ellipse(ballX, ballY, 24, 24);

  // Exit arrow
  stroke(accentColor);
  strokeWeight(2);
  drawArrow(cx + 10, cy + 60, cx + 60, cy + 60);

  // Label
  fill(lightTextColor);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text("Ball exits here", cx + 35, cy + 70);
}

function drawFallingObjectsPreview(cx, cy) {
  // Platform
  stroke(100);
  strokeWeight(3);
  line(cx - 80, cy - 50, cx + 80, cy - 50);

  // Heavy ball
  fill(color(59, 130, 246));
  noStroke();
  ellipse(cx - 40, cy - 30, 40, 40);
  fill(255);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("10kg", cx - 40, cy - 30);

  // Light ball
  fill(color(34, 197, 94));
  noStroke();
  ellipse(cx + 40, cy - 30, 24, 24);
  fill(255);
  textSize(8);
  text("1kg", cx + 40, cy - 30);

  // Ground
  stroke(100);
  strokeWeight(2);
  line(cx - 80, cy + 50, cx + 80, cy + 50);

  // Dotted fall lines
  stroke(lightTextColor);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(cx - 40, cy - 10, cx - 40, cy + 50);
  line(cx + 40, cy - 18, cx + 40, cy + 50);
  drawingContext.setLineDash([]);

  textStyle(NORMAL);
}

function drawCircuitPreview(cx, cy) {
  // Battery
  stroke(100);
  strokeWeight(2);
  line(cx - 100, cy - 20, cx - 100, cy + 20);
  strokeWeight(4);
  line(cx - 90, cy - 10, cx - 90, cy + 10);

  fill(lightTextColor);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text("Battery", cx - 95, cy + 30);

  // Wires
  stroke(100);
  strokeWeight(2);
  noFill();
  // Top wire
  line(cx - 100, cy - 20, cx - 100, cy - 40);
  line(cx - 100, cy - 40, cx + 60, cy - 40);
  line(cx + 60, cy - 40, cx + 60, cy - 15);
  // Bottom wire
  line(cx - 90, cy + 20, cx - 90, cy + 40);
  line(cx - 90, cy + 40, cx + 60, cy + 40);
  line(cx + 60, cy + 40, cx + 60, cy + 15);

  // Bulb
  fill(color(255, 220, 100));
  stroke(100);
  strokeWeight(2);
  ellipse(cx + 60, cy, 30, 30);

  // Arrows showing current
  fill(primaryColor);
  noStroke();
  drawArrow(cx - 60, cy - 40, cx - 20, cy - 40);
  drawArrow(cx + 20, cy - 40, cx + 50, cy - 40);

  fill(accentColor);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("Current in", cx - 40, cy - 45);
  text("Current out?", cx + 35, cy - 45);
}

function drawEvolutionPreview(cx, cy) {
  // Generation labels
  fill(lightTextColor);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text("Before:", cx - 100, cy - 30);
  text("After:", cx - 100, cy + 30);

  // Before: mostly brown beetles
  for (let i = 0; i < 8; i++) {
    let bx = cx - 30 + (i % 4) * 35;
    let by = cy - 40 + floor(i / 4) * 20;
    fill(i < 6 ? color(139, 90, 43) : color(34, 139, 34));
    ellipse(bx, by, 18, 12);
  }

  // After: mostly green beetles
  for (let i = 0; i < 8; i++) {
    let bx = cx - 30 + (i % 4) * 35;
    let by = cy + 20 + floor(i / 4) * 20;
    fill(i < 2 ? color(139, 90, 43) : color(34, 139, 34));
    ellipse(bx, by, 18, 12);
  }

  // Arrow
  stroke(lightTextColor);
  strokeWeight(2);
  drawArrow(cx + 80, cy - 20, cx + 80, cy + 20);

  fill(lightTextColor);
  noStroke();
  textSize(9);
  textAlign(CENTER, CENTER);
  text("Many\ngenerations", cx + 100, cy);
}

function drawArrow(x1, y1, x2, y2) {
  let angle = atan2(y2 - y1, x2 - x1);
  let headLen = 8;

  stroke(currentDrawingContext ? currentDrawingContext.strokeColor : color(100));
  strokeWeight(2);
  line(x1, y1, x2, y2);

  // Arrow head
  line(x2, y2, x2 - headLen * cos(angle - PI / 6), y2 - headLen * sin(angle - PI / 6));
  line(x2, y2, x2 - headLen * cos(angle + PI / 6), y2 - headLen * sin(angle + PI / 6));
}

function drawOptions(scenario, startY) {
  let optionWidth = (canvasWidth - 80) / 3;
  let optionHeight = 120;
  let startX = 30;

  for (let i = 0; i < scenario.options.length; i++) {
    let opt = scenario.options[i];
    let x = startX + i * (optionWidth + 10);
    let y = startY;

    let isHovered = mouseX > x && mouseX < x + optionWidth &&
                    mouseY > y && mouseY < y + optionHeight;
    let isSelected = selectedOption === i;

    // Option card
    if (isSelected) {
      fill(color(219, 234, 254));
      stroke(primaryColor);
      strokeWeight(3);
    } else if (isHovered) {
      fill(color(248, 250, 252));
      stroke(color(200));
      strokeWeight(2);
      cursor(HAND);
    } else {
      fill(cardColor);
      stroke(color(220));
      strokeWeight(1);
    }
    rect(x, y, optionWidth, optionHeight, 10);

    // Option label
    fill(isSelected ? primaryColor : textColor);
    noStroke();
    textSize(24);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(opt.label, x + optionWidth / 2, y + 15);

    // Option description
    fill(isSelected ? primaryColor : lightTextColor);
    textSize(12);
    textStyle(NORMAL);
    textAlign(CENTER, TOP);
    text(opt.description, x + optionWidth / 2, y + 55, optionWidth - 20);
  }
}

function drawConfidencePhase() {
  let scenario = scenarios[currentScenario];

  fill(primaryColor);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("How confident are you?", canvasWidth / 2, 100);

  fill(textColor);
  textSize(14);
  textStyle(NORMAL);
  text("You selected: " + scenario.options[selectedOption].description, canvasWidth / 2, 150);

  // Confidence labels
  fill(lightTextColor);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Wild guess", canvasWidth / 2 - 130, drawHeight + 10);
  text("Very sure", canvasWidth / 2 + 130, drawHeight + 10);

  confidenceSlider.show();
}

function drawFeedback() {
  let scenario = scenarios[currentScenario];
  let selectedOpt = scenario.options[selectedOption];
  let isCorrect = selectedOpt.correct;

  // Result header
  fill(isCorrect ? correctColor : incorrectColor);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(isCorrect ? "Interesting - You matched the scientific view!" : "Interesting finding!", canvasWidth / 2, 20);

  // Response time
  fill(lightTextColor);
  textSize(12);
  textStyle(NORMAL);
  text("Response time: " + nf(responseTime, 1, 1) + "s | Confidence: " + confidenceLevel + "%", canvasWidth / 2, 50);

  // Selected answer
  fill(textColor);
  textSize(14);
  textAlign(LEFT, TOP);
  let answerY = 80;
  text("Your answer: " + selectedOpt.description, 40, answerY);

  // If wrong, show misconception explanation
  if (!isCorrect) {
    fill(color(254, 243, 199));
    stroke(color(245, 158, 11));
    strokeWeight(1);
    rect(30, answerY + 30, canvasWidth - 60, 60, 8);

    fill(color(161, 98, 7));
    noStroke();
    textSize(12);
    textStyle(BOLD);
    text("Why this feels right:", 45, answerY + 45);
    textStyle(NORMAL);
    textSize(11);
    text(selectedOpt.misconception, 45, answerY + 65, canvasWidth - 90);
  }

  // Correct answer explanation
  let correctOpt = scenario.options.find(o => o.correct);
  let explainY = isCorrect ? answerY + 40 : answerY + 110;

  fill(color(220, 252, 231));
  stroke(correctColor);
  strokeWeight(1);
  rect(30, explainY, canvasWidth - 60, 80, 8);

  fill(color(22, 101, 52));
  noStroke();
  textSize(12);
  textStyle(BOLD);
  text("Scientific explanation:", 45, explainY + 15);
  textStyle(NORMAL);
  textSize(11);
  text(correctOpt.explanation, 45, explainY + 35, canvasWidth - 90);

  // How others answered
  let othersY = explainY + 100;
  fill(textColor);
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("How others typically answer:", canvasWidth / 2, othersY);

  // Bar chart of responses
  let barY = othersY + 25;
  let barMaxWidth = 150;

  for (let i = 0; i < scenario.options.length; i++) {
    let opt = scenario.options[i];
    let pct = scenario.commonPercent[i];
    let barWidth = (pct / 100) * barMaxWidth;
    let y = barY + i * 30;

    // Bar background
    fill(230);
    noStroke();
    rect(canvasWidth / 2 - 20, y, barMaxWidth, 20, 4);

    // Bar fill
    fill(opt.correct ? correctColor : (i === selectedOption ? color(254, 202, 202) : color(200)));
    rect(canvasWidth / 2 - 20, y, barWidth, 20, 4);

    // Label
    fill(textColor);
    textSize(11);
    textStyle(NORMAL);
    textAlign(RIGHT, CENTER);
    text(opt.description, canvasWidth / 2 - 30, y + 10);

    // Percentage
    textAlign(LEFT, CENTER);
    text(pct + "%", canvasWidth / 2 - 15 + barMaxWidth + 10, y + 10);
  }

  // Show next button
  nextButton.show();
  nextButton.position(canvasWidth / 2 - 60, drawHeight + 15);

  if (currentScenario >= scenarios.length - 1) {
    nextButton.html('See Results');
  }
}

function drawAnimation() {
  let scenario = scenarios[currentScenario];
  animTime++;

  fill(primaryColor);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Watch what actually happens...", canvasWidth / 2, 30);

  let progress = min(1, animTime / animDuration);

  switch (scenario.animationType) {
    case "circularMotion":
      animateCircularMotion(progress);
      break;
    case "fallingObjects":
      animateFallingObjects(progress);
      break;
    case "circuit":
      animateCircuit(progress);
      break;
    case "evolution":
      animateEvolution(progress);
      break;
  }

  if (animTime >= animDuration) {
    state = "feedback";
    animTime = 0;
  }
}

function animateCircularMotion(progress) {
  let cx = canvasWidth / 2;
  let cy = 250;

  // Draw tube
  noFill();
  stroke(100);
  strokeWeight(20);
  arc(cx - 50, cy, 160, 160, -PI / 2, PI / 2);

  stroke(180);
  strokeWeight(16);
  arc(cx - 50, cy, 160, 160, -PI / 2, PI / 2);

  // Ball position
  let ballX, ballY;

  if (progress < 0.4) {
    // Ball in tube
    let angle = map(progress, 0, 0.4, -PI / 2, PI / 2);
    ballX = cx - 50 + cos(angle) * 80;
    ballY = cy + sin(angle) * 80;
  } else {
    // Ball exits tangentially (straight line)
    let exitX = cx - 50 + cos(PI / 2) * 80;
    let exitY = cy + sin(PI / 2) * 80;
    let t = (progress - 0.4) / 0.6;
    ballX = exitX + t * 200; // Move right (tangent direction)
    ballY = exitY + t * 50; // Slight gravity effect
  }

  fill(primaryColor);
  noStroke();
  ellipse(ballX, ballY, 24, 24);

  // Trail
  if (progress > 0.4) {
    stroke(primaryColor);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    let exitX = cx - 50 + cos(PI / 2) * 80;
    let exitY = cy + sin(PI / 2) * 80;
    line(exitX, exitY, ballX, ballY);
    drawingContext.setLineDash([]);
  }

  // Label
  if (progress > 0.5) {
    fill(textColor);
    textSize(12);
    textAlign(CENTER, TOP);
    text("Straight tangent path!", cx + 100, cy + 120);
  }
}

function animateFallingObjects(progress) {
  let cx = canvasWidth / 2;

  // Platform
  stroke(100);
  strokeWeight(3);
  line(cx - 100, 100, cx + 100, 100);

  // Ground
  strokeWeight(2);
  line(cx - 100, 400, cx + 100, 400);

  // Calculate fall position (same for both!)
  let fallDist = progress * 280;
  let y = 120 + fallDist;

  // Heavy ball
  fill(color(59, 130, 246));
  noStroke();
  ellipse(cx - 50, y, 50, 50);
  fill(255);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("10kg", cx - 50, y);

  // Light ball
  fill(color(34, 197, 94));
  noStroke();
  ellipse(cx + 50, y, 30, 30);
  fill(255);
  textSize(9);
  text("1kg", cx + 50, y);

  // Message
  if (progress > 0.8) {
    fill(textColor);
    textSize(14);
    textAlign(CENTER, TOP);
    text("They land at the same time!", cx, 420);
    textSize(11);
    fill(lightTextColor);
    text("Mass doesn't affect gravitational acceleration", cx, 440);
  }

  textStyle(NORMAL);
}

function animateCircuit(progress) {
  let cx = canvasWidth / 2;
  let cy = 250;

  // Battery
  stroke(100);
  strokeWeight(3);
  line(cx - 150, cy - 30, cx - 150, cy + 30);
  strokeWeight(6);
  line(cx - 135, cy - 15, cx - 135, cy + 15);

  // Wires
  stroke(100);
  strokeWeight(3);
  noFill();
  // Top wire
  beginShape();
  vertex(cx - 150, cy - 30);
  vertex(cx - 150, cy - 80);
  vertex(cx + 100, cy - 80);
  vertex(cx + 100, cy - 30);
  endShape();
  // Bottom wire
  beginShape();
  vertex(cx - 135, cy + 30);
  vertex(cx - 135, cy + 80);
  vertex(cx + 100, cy + 80);
  vertex(cx + 100, cy + 30);
  endShape();

  // Bulb
  fill(color(255, 220, 100, 150 + 100 * sin(progress * TWO_PI * 3)));
  stroke(100);
  strokeWeight(2);
  ellipse(cx + 100, cy, 50, 50);

  // Animated electrons (same speed on both sides!)
  let numElectrons = 8;
  fill(primaryColor);
  noStroke();

  for (let i = 0; i < numElectrons; i++) {
    let t = (progress * 2 + i / numElectrons) % 1;
    let ex, ey;

    // Top wire (going right)
    if (t < 0.25) {
      ex = map(t, 0, 0.25, cx - 150, cx + 100);
      ey = cy - 80;
    }
    // Right side down through bulb
    else if (t < 0.5) {
      ex = cx + 100;
      ey = map(t, 0.25, 0.5, cy - 80, cy + 80);
    }
    // Bottom wire (going left)
    else if (t < 0.75) {
      ex = map(t, 0.5, 0.75, cx + 100, cx - 135);
      ey = cy + 80;
    }
    // Left side up through battery
    else {
      ex = cx - 145;
      ey = map(t, 0.75, 1, cy + 80, cy - 80);
    }

    ellipse(ex, ey, 10, 10);
  }

  // Labels
  fill(textColor);
  textSize(12);
  textAlign(CENTER, TOP);
  text("Current IN = Current OUT", cx, cy + 110);
  textSize(10);
  fill(lightTextColor);
  text("Same electrons, same flow rate everywhere", cx, cy + 130);
}

function animateEvolution(progress) {
  let cx = canvasWidth / 2;
  let generation = floor(progress * 10);

  // Calculate beetle composition based on generation
  let greenRatio = 0.25 + progress * 0.5; // Start 25% green, end 75% green

  // Draw beetles
  let beetles = [];
  for (let i = 0; i < 16; i++) {
    beetles.push(random() < greenRatio ? "green" : "brown");
  }

  // Title
  fill(textColor);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Generation " + (generation + 1), cx, 80);

  // Draw beetle grid
  for (let i = 0; i < 16; i++) {
    let bx = cx - 100 + (i % 4) * 70;
    let by = 130 + floor(i / 4) * 50;

    fill(beetles[i] === "green" ? color(34, 139, 34) : color(139, 90, 43));
    noStroke();
    ellipse(bx, by, 30, 20);
  }

  // Selection pressure indicator
  let greenCount = beetles.filter(b => b === "green").length;
  let brownCount = 16 - greenCount;

  fill(lightTextColor);
  textSize(11);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  text("Green beetles: " + greenCount + " (better camouflaged)", cx - 120, 360);
  text("Brown beetles: " + brownCount + " (more visible to predators)", cx - 120, 380);

  // Explanation
  if (progress > 0.7) {
    fill(textColor);
    textSize(12);
    textAlign(CENTER, TOP);
    text("Green beetles survive better and have more offspring", cx, 420);
    text("The population shifts - beetles don't 'try' to change", cx, 440);
  }
}

function drawComplete() {
  // Final results
  fill(primaryColor);
  textSize(28);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Your Results", canvasWidth / 2, 40);

  // Score
  let accuracy = (totalCorrect / scenarios.length) * 100;
  fill(textColor);
  textSize(48);
  text(totalCorrect + " / " + scenarios.length, canvasWidth / 2, 90);

  textSize(16);
  textStyle(NORMAL);
  fill(lightTextColor);
  text("Aligned with scientific understanding", canvasWidth / 2, 145);

  // Individual results
  let startY = 190;
  for (let i = 0; i < results.length; i++) {
    let r = results[i];
    let y = startY + i * 55;

    // Background
    fill(r.correct ? color(220, 252, 231) : color(254, 243, 199));
    noStroke();
    rect(40, y, canvasWidth - 80, 45, 8);

    // Scenario name
    fill(textColor);
    textSize(13);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(scenarios[i].title, 55, y + 8);

    // Result
    textStyle(NORMAL);
    textSize(11);
    fill(lightTextColor);
    text("Your answer: " + r.selected + " | " + (r.correct ? "Matched science" : "Common intuition"), 55, y + 26);

    // Response time
    textAlign(RIGHT, TOP);
    text(nf(r.time, 1, 1) + "s", canvasWidth - 55, y + 15);
  }

  // Encouragement
  fill(textColor);
  textSize(13);
  textAlign(CENTER, TOP);
  textStyle(NORMAL);

  let message;
  if (accuracy >= 75) {
    message = "Excellent scientific intuition! Your mental models align well with physics and biology.";
  } else if (accuracy >= 50) {
    message = "You share some common misconceptions. These intuitions are very natural - even experts had them initially!";
  } else {
    message = "Your responses reflect very common intuitions. The good news: awareness is the first step to updating mental models!";
  }

  text(message, canvasWidth / 2, startY + results.length * 55 + 20, canvasWidth - 80);

  // Restart button
  let btnX = canvasWidth / 2 - 60;
  let btnY = drawHeight + 10;
  let btnW = 120;
  let btnH = 35;

  if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
    fill(accentColor);
    cursor(HAND);
  } else {
    fill(color(red(accentColor), green(accentColor), blue(accentColor), 200));
  }
  noStroke();
  rect(btnX, btnY, btnW, btnH, 8);

  fill(255);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Try Again", canvasWidth / 2, btnY + btnH / 2);
}

function drawProgressIndicator() {
  if (state === "intro" || state === "complete") return;

  let dotSize = 12;
  let spacing = 25;
  let startX = canvasWidth / 2 - (scenarios.length - 1) * spacing / 2;
  let y = 470;

  for (let i = 0; i < scenarios.length; i++) {
    let x = startX + i * spacing;

    if (i < currentScenario) {
      fill(correctColor);
    } else if (i === currentScenario) {
      fill(primaryColor);
    } else {
      fill(220);
    }
    noStroke();
    ellipse(x, y, dotSize, dotSize);
  }

  // Label
  fill(lightTextColor);
  textSize(10);
  textAlign(CENTER, TOP);
  text("Scenario " + (currentScenario + 1) + " of " + scenarios.length, canvasWidth / 2, y + 12);
}

function mousePressed() {
  // Handle intro start button
  if (state === "intro") {
    let btnX = canvasWidth / 2 - 80;
    let btnY = 320;
    if (mouseX > btnX && mouseX < btnX + 160 && mouseY > btnY && mouseY < btnY + 50) {
      state = "scenario";
      return;
    }
  }

  // Handle option selection
  if (state === "scenario") {
    let scenario = scenarios[currentScenario];
    let optionWidth = (canvasWidth - 80) / 3;
    let optionHeight = 120;
    let startX = 30;
    let startY = 300;

    for (let i = 0; i < scenario.options.length; i++) {
      let x = startX + i * (optionWidth + 10);
      if (mouseX > x && mouseX < x + optionWidth &&
          mouseY > startY && mouseY < startY + optionHeight) {
        selectedOption = i;
        return;
      }
    }
  }

  // Handle complete restart button
  if (state === "complete") {
    let btnX = canvasWidth / 2 - 60;
    let btnY = drawHeight + 10;
    if (mouseX > btnX && mouseX < btnX + 120 && mouseY > btnY && mouseY < btnY + 35) {
      restartTest();
    }
  }
}

function lockInAnswer() {
  if (selectedOption < 0) return;

  responseTime = (millis() - startTime) / 1000;
  timerRunning = false;
  confidenceLevel = confidenceSlider.value();

  lockInButton.hide();
  confidenceSlider.hide();

  // Record result
  let scenario = scenarios[currentScenario];
  let isCorrect = scenario.options[selectedOption].correct;

  results.push({
    scenario: currentScenario,
    selected: scenario.options[selectedOption].description,
    correct: isCorrect,
    confidence: confidenceLevel,
    time: responseTime
  });

  if (isCorrect) totalCorrect++;

  state = "animation";
  animTime = 0;
}

function nextScenario() {
  nextButton.hide();

  if (currentScenario >= scenarios.length - 1) {
    state = "complete";
  } else {
    currentScenario++;
    selectedOption = -1;
    timerRunning = false;
    state = "scenario";
  }
}

function restartTest() {
  currentScenario = 0;
  selectedOption = -1;
  results = [];
  totalCorrect = 0;
  timerRunning = false;
  state = "intro";

  lockInButton.hide();
  confidenceSlider.hide();
  nextButton.hide();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition UI elements
  confidenceSlider.position(canvasWidth / 2 - 100, drawHeight + 15);
  lockInButton.position(canvasWidth / 2 - 60, drawHeight + 15);
  nextButton.position(canvasWidth / 2 - 60, drawHeight + 15);
}
