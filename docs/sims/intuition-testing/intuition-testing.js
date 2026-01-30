// Intuition Testing MicroSim
// Interactive simulation for testing intuitive responses against scientific understanding
// Reveals common misconceptions through engaging scenario-based testing
// Uses canvas-based controls for iframe compatibility

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

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
    question: "A heavy ball (10kg) and a light ball (1kg) are dropped from the same height. Which lands first?",
    options: [
      { label: "A", description: "Heavy ball first", correct: false, misconception: "Aristotelian physics - heavier objects fall faster, a common intuition that Galileo disproved" },
      { label: "B", description: "Same time", correct: true, explanation: "In the absence of air resistance, all objects fall at the same rate (9.8 m/s^2) regardless of mass. Gravitational acceleration is independent of mass." },
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
      { label: "A", description: "Less after bulb", correct: false, misconception: "current consumption model - believing current gets 'used up' by the bulb" },
      { label: "B", description: "Same current", correct: true, explanation: "Current is conserved in a circuit. The same electrons flow into and out of the bulb. Energy is converted to light and heat, but current remains constant." },
      { label: "C", description: "More after bulb", correct: false, misconception: "current accumulation - a rare misconception about electricity behavior" }
    ],
    commonPercent: [52, 38, 10],
    animationType: "circuit"
  },
  {
    id: 4,
    title: "Evolution",
    question: "A beetle population was mostly brown, but over generations became mostly green. Why?",
    options: [
      { label: "A", description: "Beetles changed to survive", correct: false, misconception: "Lamarckian inheritance - the intuitive but incorrect idea that organisms can will themselves to change" },
      { label: "B", description: "Green beetles survived better", correct: true, explanation: "Natural selection: green beetles were more likely to survive (better camouflaged) and pass on their genes. The population shifted because green individuals reproduced more." },
      { label: "C", description: "Beetles chose to adapt", correct: false, misconception: "intentional evolution - attributing conscious choice to evolutionary processes" }
    ],
    commonPercent: [35, 40, 25],
    animationType: "evolution"
  }
];

// State management
let currentScenario = 0;
let state = "intro"; // intro, scenario, answered, animation, feedback, complete
let selectedOption = -1;
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

// Colors
let bgColor, cardColor, primaryColor, correctColor, incorrectColor;
let textColor, lightTextColor, accentColor;

// Button definitions
let buttons = [];

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

  textFont('Arial');

  describe('Interactive intuition testing simulation that reveals common misconceptions in physics and biology through scenario-based questions', LABEL);
}

function draw() {
  background(bgColor);

  // Draw main area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Clear buttons array each frame
  buttons = [];

  switch (state) {
    case "intro":
      drawIntro();
      break;
    case "scenario":
      drawScenario();
      updateTimer();
      break;
    case "answered":
    case "animation":
      drawAnimation();
      break;
    case "feedback":
      drawFeedback();
      break;
    case "complete":
      drawComplete();
      break;
  }

  if (state !== "intro" && state !== "complete") {
    drawProgressIndicator();
  }
}

function drawIntro() {
  // Title
  fill(primaryColor);
  noStroke();
  textSize(28);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Intuition Testing", canvasWidth / 2, 70);

  // Description
  fill(textColor);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);

  let desc = "Test your intuitive understanding of physics and biology.\n\nYou'll see 4 scenarios and answer based on your first instinct.\nA timer encourages quick, intuitive responses.\n\nThere's no judgment here - this reveals common\nmisconceptions that even experts initially share.";
  text(desc, canvasWidth / 2, 120);

  // Start button
  drawButton("Begin Test", canvasWidth / 2 - 80, 300, 160, 50, primaryColor, () => {
    state = "scenario";
    startTime = millis();
    timerRunning = true;
  });
}

function drawScenario() {
  let scenario = scenarios[currentScenario];

  // Scenario title
  fill(primaryColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Scenario " + (currentScenario + 1) + ": " + scenario.title, canvasWidth / 2, 15);

  // Question
  fill(textColor);
  textSize(13);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text(scenario.question, canvasWidth / 2, 45, canvasWidth - 60);

  // Timer bar
  drawTimer();

  // Draw scenario-specific visualization
  drawScenarioVisualization(scenario, 95, 120);

  // Options
  drawOptions(scenario, 260);

  // Lock in button (only if option selected)
  if (selectedOption >= 0) {
    drawButton("Lock In Answer", canvasWidth / 2 - 70, drawHeight + 8, 140, 34, primaryColor, lockInAnswer);
  }
}

function drawTimer() {
  let elapsed = timerRunning ? (millis() - startTime) / 1000 : 0;
  let remaining = max(0, maxTime - elapsed);
  let progress = remaining / maxTime;

  // Timer bar background
  fill(230);
  noStroke();
  rect(50, 75, canvasWidth - 100, 10, 5);

  // Timer bar fill
  if (progress > 0.3) {
    fill(primaryColor);
  } else if (progress > 0.1) {
    fill(color(245, 158, 11));
  } else {
    fill(incorrectColor);
  }
  rect(50, 75, (canvasWidth - 100) * progress, 10, 5);

  // Time text
  fill(lightTextColor);
  textSize(10);
  textAlign(RIGHT, CENTER);
  noStroke();
  text(nf(remaining, 1, 1) + "s", canvasWidth - 50, 80);
}

function updateTimer() {
  let elapsed = (millis() - startTime) / 1000;
  if (elapsed >= maxTime && selectedOption >= 0) {
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
  strokeWeight(18);
  arc(cx - 50, cy, 100, 100, -PI / 2, PI / 2);

  stroke(180);
  strokeWeight(14);
  arc(cx - 50, cy, 100, 100, -PI / 2, PI / 2);

  // Ball in tube
  let ballAngle = PI / 3;
  let ballX = cx - 50 + cos(ballAngle) * 50;
  let ballY = cy + sin(ballAngle) * 50;

  fill(primaryColor);
  noStroke();
  ellipse(ballX, ballY, 20, 20);

  // Exit indicator
  stroke(accentColor);
  strokeWeight(2);
  line(cx, cy + 50, cx + 40, cy + 50);
  line(cx + 35, cy + 45, cx + 40, cy + 50);
  line(cx + 35, cy + 55, cx + 40, cy + 50);

  // Label
  fill(lightTextColor);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text("Ball exits here", cx + 20, cy + 60);
}

function drawFallingObjectsPreview(cx, cy) {
  // Platform
  stroke(100);
  strokeWeight(3);
  line(cx - 70, cy - 40, cx + 70, cy - 40);

  // Heavy ball
  fill(color(59, 130, 246));
  noStroke();
  ellipse(cx - 35, cy - 20, 36, 36);
  fill(255);
  textSize(9);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("10kg", cx - 35, cy - 20);

  // Light ball
  fill(color(34, 197, 94));
  noStroke();
  ellipse(cx + 35, cy - 20, 22, 22);
  fill(255);
  textSize(7);
  text("1kg", cx + 35, cy - 20);

  // Ground
  stroke(100);
  strokeWeight(2);
  line(cx - 70, cy + 40, cx + 70, cy + 40);

  // Dotted fall lines
  stroke(lightTextColor);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(cx - 35, cy, cx - 35, cy + 40);
  line(cx + 35, cy - 9, cx + 35, cy + 40);
  drawingContext.setLineDash([]);

  textStyle(NORMAL);
}

function drawCircuitPreview(cx, cy) {
  // Battery
  stroke(100);
  strokeWeight(2);
  line(cx - 90, cy - 15, cx - 90, cy + 15);
  strokeWeight(4);
  line(cx - 80, cy - 8, cx - 80, cy + 8);

  fill(lightTextColor);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  text("Battery", cx - 85, cy + 22);

  // Wires
  stroke(100);
  strokeWeight(2);
  noFill();
  line(cx - 90, cy - 15, cx - 90, cy - 35);
  line(cx - 90, cy - 35, cx + 50, cy - 35);
  line(cx + 50, cy - 35, cx + 50, cy - 12);
  line(cx - 80, cy + 15, cx - 80, cy + 35);
  line(cx - 80, cy + 35, cx + 50, cy + 35);
  line(cx + 50, cy + 35, cx + 50, cy + 12);

  // Bulb
  fill(color(255, 220, 100));
  stroke(100);
  strokeWeight(2);
  ellipse(cx + 50, cy, 24, 24);

  // Current arrows
  fill(primaryColor);
  noStroke();
  textSize(8);
  textAlign(CENTER, BOTTOM);
  text("Current in", cx - 30, cy - 38);
  text("Current out?", cx + 25, cy - 38);

  // Arrow indicators
  stroke(primaryColor);
  strokeWeight(2);
  line(cx - 60, cy - 35, cx - 40, cy - 35);
  line(cx - 45, cy - 38, cx - 40, cy - 35);
  line(cx - 45, cy - 32, cx - 40, cy - 35);
}

function drawEvolutionPreview(cx, cy) {
  // Generation labels
  fill(lightTextColor);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text("Before:", cx - 90, cy - 25);
  text("After:", cx - 90, cy + 25);

  // Before: mostly brown beetles
  for (let i = 0; i < 8; i++) {
    let bx = cx - 25 + (i % 4) * 30;
    let by = cy - 35 + floor(i / 4) * 18;
    fill(i < 6 ? color(139, 90, 43) : color(34, 139, 34));
    noStroke();
    ellipse(bx, by, 16, 10);
  }

  // After: mostly green beetles
  for (let i = 0; i < 8; i++) {
    let bx = cx - 25 + (i % 4) * 30;
    let by = cy + 15 + floor(i / 4) * 18;
    fill(i < 2 ? color(139, 90, 43) : color(34, 139, 34));
    noStroke();
    ellipse(bx, by, 16, 10);
  }

  // Arrow
  stroke(lightTextColor);
  strokeWeight(2);
  line(cx + 70, cy - 15, cx + 70, cy + 15);
  line(cx + 65, cy + 10, cx + 70, cy + 15);
  line(cx + 75, cy + 10, cx + 70, cy + 15);

  fill(lightTextColor);
  noStroke();
  textSize(8);
  textAlign(CENTER, CENTER);
  text("Many\ngenerations", cx + 90, cy);
}

function drawOptions(scenario, startY) {
  let optionWidth = (canvasWidth - 80) / 3;
  let optionHeight = 100;
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
      stroke(color(180));
      strokeWeight(2);
      cursor(HAND);
    } else {
      fill(cardColor);
      stroke(color(220));
      strokeWeight(1);
    }
    rect(x, y, optionWidth, optionHeight, 10);

    // Store button for click detection
    buttons.push({
      x: x, y: y, w: optionWidth, h: optionHeight,
      action: () => { selectedOption = i; }
    });

    // Option label
    fill(isSelected ? primaryColor : textColor);
    noStroke();
    textSize(22);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(opt.label, x + optionWidth / 2, y + 12);

    // Option description
    fill(isSelected ? primaryColor : lightTextColor);
    textSize(11);
    textStyle(NORMAL);
    textAlign(CENTER, TOP);
    text(opt.description, x + optionWidth / 2, y + 50, optionWidth - 16);
  }
}

function drawAnimation() {
  let scenario = scenarios[currentScenario];
  animTime++;

  fill(primaryColor);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Watch what actually happens...", canvasWidth / 2, 20);

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
  let cy = 220;

  // Draw tube
  noFill();
  stroke(100);
  strokeWeight(18);
  arc(cx - 50, cy, 140, 140, -PI / 2, PI / 2);

  stroke(180);
  strokeWeight(14);
  arc(cx - 50, cy, 140, 140, -PI / 2, PI / 2);

  // Ball position
  let ballX, ballY;

  if (progress < 0.4) {
    let angle = map(progress, 0, 0.4, -PI / 2, PI / 2);
    ballX = cx - 50 + cos(angle) * 70;
    ballY = cy + sin(angle) * 70;
  } else {
    let exitX = cx - 50 + cos(PI / 2) * 70;
    let exitY = cy + sin(PI / 2) * 70;
    let t = (progress - 0.4) / 0.6;
    ballX = exitX + t * 180;
    ballY = exitY + t * 40;
  }

  fill(primaryColor);
  noStroke();
  ellipse(ballX, ballY, 22, 22);

  // Trail
  if (progress > 0.4) {
    stroke(primaryColor);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    let exitX = cx - 50 + cos(PI / 2) * 70;
    let exitY = cy + sin(PI / 2) * 70;
    line(exitX, exitY, ballX, ballY);
    drawingContext.setLineDash([]);
  }

  if (progress > 0.5) {
    fill(textColor);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text("Straight tangent path!", cx + 80, cy + 100);
  }
}

function animateFallingObjects(progress) {
  let cx = canvasWidth / 2;

  // Platform
  stroke(100);
  strokeWeight(3);
  line(cx - 90, 80, cx + 90, 80);

  // Ground
  strokeWeight(2);
  line(cx - 90, 380, cx + 90, 380);

  // Calculate fall position (same for both!)
  let fallDist = progress * 260;
  let y = 100 + fallDist;

  // Heavy ball
  fill(color(59, 130, 246));
  noStroke();
  ellipse(cx - 45, y, 44, 44);
  fill(255);
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("10kg", cx - 45, y);

  // Light ball
  fill(color(34, 197, 94));
  noStroke();
  ellipse(cx + 45, y, 28, 28);
  fill(255);
  textSize(9);
  text("1kg", cx + 45, y);

  if (progress > 0.8) {
    fill(textColor);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text("They land at the same time!", cx, 400);
    textSize(11);
    fill(lightTextColor);
    text("Mass doesn't affect gravitational acceleration", cx, 420);
  }

  textStyle(NORMAL);
}

function animateCircuit(progress) {
  let cx = canvasWidth / 2;
  let cy = 220;

  // Battery
  stroke(100);
  strokeWeight(3);
  line(cx - 140, cy - 25, cx - 140, cy + 25);
  strokeWeight(5);
  line(cx - 125, cy - 12, cx - 125, cy + 12);

  // Wires
  stroke(100);
  strokeWeight(3);
  noFill();
  beginShape();
  vertex(cx - 140, cy - 25);
  vertex(cx - 140, cy - 70);
  vertex(cx + 90, cy - 70);
  vertex(cx + 90, cy - 25);
  endShape();
  beginShape();
  vertex(cx - 125, cy + 25);
  vertex(cx - 125, cy + 70);
  vertex(cx + 90, cy + 70);
  vertex(cx + 90, cy + 25);
  endShape();

  // Bulb
  fill(color(255, 220, 100, 150 + 100 * sin(progress * TWO_PI * 3)));
  stroke(100);
  strokeWeight(2);
  ellipse(cx + 90, cy, 45, 45);

  // Animated electrons (same speed on both sides!)
  let numElectrons = 8;
  fill(primaryColor);
  noStroke();

  for (let i = 0; i < numElectrons; i++) {
    let t = (progress * 2 + i / numElectrons) % 1;
    let ex, ey;

    if (t < 0.25) {
      ex = map(t, 0, 0.25, cx - 140, cx + 90);
      ey = cy - 70;
    } else if (t < 0.5) {
      ex = cx + 90;
      ey = map(t, 0.25, 0.5, cy - 70, cy + 70);
    } else if (t < 0.75) {
      ex = map(t, 0.5, 0.75, cx + 90, cx - 125);
      ey = cy + 70;
    } else {
      ex = cx - 135;
      ey = map(t, 0.75, 1, cy + 70, cy - 70);
    }

    ellipse(ex, ey, 10, 10);
  }

  fill(textColor);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("Current IN = Current OUT", cx, cy + 100);
  textSize(10);
  fill(lightTextColor);
  text("Same electrons, same flow rate everywhere", cx, cy + 118);
}

function animateEvolution(progress) {
  let cx = canvasWidth / 2;
  let generation = floor(progress * 10);

  let greenRatio = 0.25 + progress * 0.5;

  let beetles = [];
  randomSeed(42); // Consistent random for animation
  for (let i = 0; i < 16; i++) {
    beetles.push(random() < greenRatio ? "green" : "brown");
  }

  fill(textColor);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Generation " + (generation + 1), cx, 60);

  for (let i = 0; i < 16; i++) {
    let bx = cx - 90 + (i % 4) * 60;
    let by = 110 + floor(i / 4) * 45;

    fill(beetles[i] === "green" ? color(34, 139, 34) : color(139, 90, 43));
    noStroke();
    ellipse(bx, by, 28, 18);
  }

  let greenCount = beetles.filter(b => b === "green").length;
  let brownCount = 16 - greenCount;

  fill(lightTextColor);
  textSize(11);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  text("Green beetles: " + greenCount + " (better camouflaged)", cx - 110, 320);
  text("Brown beetles: " + brownCount + " (more visible to predators)", cx - 110, 340);

  if (progress > 0.7) {
    fill(textColor);
    textSize(12);
    textAlign(CENTER, TOP);
    text("Green beetles survive better and have more offspring", cx, 380);
    text("The population shifts - beetles don't 'try' to change", cx, 400);
  }
}

function drawFeedback() {
  let scenario = scenarios[currentScenario];
  let selectedOpt = scenario.options[selectedOption];
  let isCorrect = selectedOpt.correct;

  // Result header
  fill(isCorrect ? correctColor : incorrectColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(isCorrect ? "You matched the scientific view!" : "Interesting finding!", canvasWidth / 2, 15);

  // Response time
  fill(lightTextColor);
  textSize(11);
  textStyle(NORMAL);
  text("Response time: " + nf(responseTime, 1, 1) + "s", canvasWidth / 2, 40);

  // Selected answer
  fill(textColor);
  textSize(13);
  textAlign(LEFT, TOP);
  text("Your answer: " + selectedOpt.description, 35, 65);

  let yOffset = 85;

  // If wrong, show misconception
  if (!isCorrect) {
    fill(color(254, 243, 199));
    stroke(color(245, 158, 11));
    strokeWeight(1);
    rect(25, yOffset, canvasWidth - 50, 55, 8);

    fill(color(161, 98, 7));
    noStroke();
    textSize(11);
    textStyle(BOLD);
    text("Why this feels right:", 40, yOffset + 10);
    textStyle(NORMAL);
    textSize(10);
    text(selectedOpt.misconception, 40, yOffset + 28, canvasWidth - 80);
    yOffset += 65;
  }

  // Correct answer explanation
  let correctOpt = scenario.options.find(o => o.correct);

  fill(color(220, 252, 231));
  stroke(correctColor);
  strokeWeight(1);
  rect(25, yOffset, canvasWidth - 50, 70, 8);

  fill(color(22, 101, 52));
  noStroke();
  textSize(11);
  textStyle(BOLD);
  text("Scientific explanation:", 40, yOffset + 10);
  textStyle(NORMAL);
  textSize(10);
  text(correctOpt.explanation, 40, yOffset + 28, canvasWidth - 80);
  yOffset += 80;

  // How others answered
  fill(textColor);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("How others typically answer:", canvasWidth / 2, yOffset);

  let barY = yOffset + 20;
  let barMaxWidth = 130;

  for (let i = 0; i < scenario.options.length; i++) {
    let opt = scenario.options[i];
    let pct = scenario.commonPercent[i];
    let barWidth = (pct / 100) * barMaxWidth;
    let y = barY + i * 28;

    fill(230);
    noStroke();
    rect(canvasWidth / 2 - 15, y, barMaxWidth, 18, 4);

    fill(opt.correct ? correctColor : (i === selectedOption ? color(254, 202, 202) : color(180)));
    rect(canvasWidth / 2 - 15, y, barWidth, 18, 4);

    fill(textColor);
    textSize(10);
    textStyle(NORMAL);
    textAlign(RIGHT, CENTER);
    text(opt.description, canvasWidth / 2 - 25, y + 9);

    textAlign(LEFT, CENTER);
    text(pct + "%", canvasWidth / 2 - 10 + barMaxWidth + 8, y + 9);
  }

  // Next button
  let btnLabel = currentScenario >= scenarios.length - 1 ? "See Results" : "Next Scenario";
  drawButton(btnLabel, canvasWidth / 2 - 65, drawHeight + 8, 130, 34, correctColor, nextScenario);
}

function drawComplete() {
  fill(primaryColor);
  noStroke();
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Your Results", canvasWidth / 2, 30);

  // Score
  fill(textColor);
  textSize(42);
  text(totalCorrect + " / " + scenarios.length, canvasWidth / 2, 70);

  textSize(14);
  textStyle(NORMAL);
  fill(lightTextColor);
  text("Aligned with scientific understanding", canvasWidth / 2, 120);

  // Individual results
  let startY = 155;
  for (let i = 0; i < results.length; i++) {
    let r = results[i];
    let y = startY + i * 50;

    fill(r.correct ? color(220, 252, 231) : color(254, 243, 199));
    noStroke();
    rect(35, y, canvasWidth - 70, 42, 8);

    fill(textColor);
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(scenarios[i].title, 50, y + 8);

    textStyle(NORMAL);
    textSize(10);
    fill(lightTextColor);
    text("Your answer: " + r.selected + " | " + (r.correct ? "Matched science" : "Common intuition"), 50, y + 25);

    textAlign(RIGHT, TOP);
    text(nf(r.time, 1, 1) + "s", canvasWidth - 50, y + 15);
  }

  // Encouragement
  fill(textColor);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(NORMAL);

  let accuracy = (totalCorrect / scenarios.length) * 100;
  let message;
  if (accuracy >= 75) {
    message = "Excellent scientific intuition! Your mental models align well with physics and biology.";
  } else if (accuracy >= 50) {
    message = "You share some common misconceptions. These intuitions are very natural!";
  } else {
    message = "Your responses reflect common intuitions. Awareness is the first step to updating mental models!";
  }

  text(message, canvasWidth / 2, startY + results.length * 50 + 15, canvasWidth - 80);

  // Restart button
  drawButton("Try Again", canvasWidth / 2 - 55, drawHeight + 8, 110, 34, accentColor, restartTest);
}

function drawProgressIndicator() {
  let dotSize = 10;
  let spacing = 22;
  let startX = canvasWidth / 2 - (scenarios.length - 1) * spacing / 2;
  let y = drawHeight - 25;

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

  fill(lightTextColor);
  textSize(9);
  textAlign(CENTER, TOP);
  noStroke();
  text("Scenario " + (currentScenario + 1) + " of " + scenarios.length, canvasWidth / 2, y + 10);
}

function drawButton(label, x, y, w, h, btnColor, action) {
  let isHovered = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;

  if (isHovered) {
    fill(btnColor);
    cursor(HAND);
  } else {
    fill(color(red(btnColor), green(btnColor), blue(btnColor), 220));
  }
  noStroke();
  rect(x, y, w, h, 8);

  fill(255);
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label, x + w / 2, y + h / 2);

  buttons.push({ x: x, y: y, w: w, h: h, action: action });
}

function mousePressed() {
  cursor(ARROW);

  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      btn.action();
      return;
    }
  }
}

function lockInAnswer() {
  if (selectedOption < 0) return;

  responseTime = (millis() - startTime) / 1000;
  timerRunning = false;

  let scenario = scenarios[currentScenario];
  let isCorrect = scenario.options[selectedOption].correct;

  results.push({
    scenario: currentScenario,
    selected: scenario.options[selectedOption].description,
    correct: isCorrect,
    time: responseTime
  });

  if (isCorrect) totalCorrect++;

  state = "animation";
  animTime = 0;
}

function nextScenario() {
  if (currentScenario >= scenarios.length - 1) {
    state = "complete";
  } else {
    currentScenario++;
    selectedOption = -1;
    timerRunning = true;
    startTime = millis();
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
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
