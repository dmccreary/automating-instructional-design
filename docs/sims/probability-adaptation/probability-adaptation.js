// Probability Concept Adaptation MicroSim
// Shows how a single concept (probability) is adapted for different audience levels
// Tabbed interface with 7 different educational approaches

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Tab configuration
const tabs = [
  {
    id: "early",
    label: "Early Childhood",
    shortLabel: "Early",
    title: "Lucky Duck Pond",
    ageRange: "Ages 3-5",
    color: "#FF6B6B",
    approach: "Playful exploration with immediate visual feedback",
    features: [
      "Colorful animated ducks floating on a pond",
      "Tap/click to pick a duck and see what's underneath",
      "Celebration animations when correct",
      "No numbers or text - purely visual",
      "Sound effects for engagement"
    ],
    keyDifferences: [
      "No mathematical notation",
      "Concrete, tangible objects",
      "Immediate gratification",
      "Game-based learning"
    ],
    sketch: drawEarlyChildhood
  },
  {
    id: "elementary",
    label: "Elementary",
    shortLabel: "Elem",
    title: "Marble Jar Predictor",
    ageRange: "Ages 6-10",
    color: "#4ECDC4",
    approach: "Visual counting with simple fractions",
    features: [
      "Transparent jar with colored marbles",
      "Drag to shake and mix marbles",
      "Predict which color appears most",
      "Track predictions with tally marks",
      "Simple fractions: '3 out of 10'"
    ],
    keyDifferences: [
      "Introduction of counting",
      "Simple ratios as fractions",
      "Tracking results over time",
      "Building intuition for 'more likely'"
    ],
    sketch: drawElementary
  },
  {
    id: "middle",
    label: "Middle School",
    shortLabel: "Middle",
    title: "Probability Explorer",
    ageRange: "Ages 11-13",
    color: "#45B7D1",
    approach: "Multiple scenarios with adjustable parameters",
    features: [
      "Multiple probability scenarios (dice, coins, spinners)",
      "Sliders to adjust proportions",
      "Form and test hypotheses",
      "Probability notation: P(event) = x/n",
      "Compare theoretical vs experimental results"
    ],
    keyDifferences: [
      "Formal probability notation",
      "Abstract representation",
      "Hypothesis testing",
      "Multiple representations"
    ],
    sketch: drawMiddleSchool
  },
  {
    id: "high",
    label: "High School",
    shortLabel: "High",
    title: "Insurance Risk Calculator",
    ageRange: "Ages 14-18",
    color: "#96CEB4",
    approach: "Real-world application with full mathematical framework",
    features: [
      "Real insurance scenario simulation",
      "Multiple risk factors affect premium",
      "Full probability math displayed",
      "Compound probability calculations",
      "Data visualization of risk distributions"
    ],
    keyDifferences: [
      "Real-world context",
      "Multiple variables",
      "Compound probability",
      "Professional notation"
    ],
    sketch: drawHighSchool
  },
  {
    id: "undergrad",
    label: "Undergraduate",
    shortLabel: "Undergrad",
    title: "Bayesian Reasoning Lab",
    ageRange: "Ages 18-22",
    color: "#FFEAA7",
    approach: "Statistical inference with interactive distributions",
    features: [
      "Prior, likelihood, posterior distributions",
      "Bayes' theorem step-by-step",
      "Interactive parameter adjustment",
      "Medical diagnosis scenario",
      "Sensitivity/specificity exploration"
    ],
    keyDifferences: [
      "Bayesian framework",
      "Distribution visualization",
      "Conditional probability",
      "Formal theorem application"
    ],
    sketch: drawUndergraduate
  },
  {
    id: "grad",
    label: "Graduate",
    shortLabel: "Grad",
    title: "MCMC Sampler",
    ageRange: "Graduate/PhD",
    color: "#DDA0DD",
    approach: "Research-ready computational tool",
    features: [
      "Parameter space visualization",
      "Markov chain sampling animation",
      "Convergence diagnostics",
      "Multiple chain comparison",
      "Export capabilities for research"
    ],
    keyDifferences: [
      "Computational methods",
      "Research application",
      "Algorithm visualization",
      "Advanced diagnostics"
    ],
    sketch: drawGraduate
  },
  {
    id: "corp",
    label: "Corporate",
    shortLabel: "Corp",
    title: "Risk Decision Tool",
    ageRange: "Professional",
    color: "#74B9FF",
    approach: "Business decision support with uncertainty quantification",
    features: [
      "Business scenario with uncertainty",
      "Multiple decision options",
      "Risk-adjusted recommendations",
      "Confidence intervals",
      "Executive summary output"
    ],
    keyDifferences: [
      "Decision-focused",
      "ROI calculations",
      "Risk tolerance integration",
      "Actionable recommendations"
    ],
    sketch: drawCorporate
  }
];

// State
let activeTab = 0;
let comparisonMode = false;
let compareTab = -1;

// Animation state for sketches
let animTime = 0;
let ducks = [];
let marbles = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Initialize ducks for early childhood
  initDucks();
  initMarbles();

  describe('Interactive comparison of probability concepts adapted for seven different audience levels from early childhood to corporate professionals.', LABEL);
}

function initDucks() {
  ducks = [];
  let colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7', '#DDA0DD'];
  for (let i = 0; i < 5; i++) {
    ducks.push({
      x: 80 + i * 70,
      y: 280 + sin(i * 0.5) * 10,
      color: colors[i],
      bobOffset: random(TWO_PI),
      revealed: false
    });
  }
}

function initMarbles() {
  marbles = [];
  let colors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12'];
  let counts = [4, 3, 2, 1];
  for (let c = 0; c < colors.length; c++) {
    for (let i = 0; i < counts[c]; i++) {
      marbles.push({
        x: random(60, 140),
        y: random(200, 320),
        color: colors[c],
        size: random(18, 24)
      });
    }
  }
}

function draw() {
  updateCanvasSize();
  background(250);
  animTime += 0.02;

  // Draw tab bar
  drawTabBar();

  // Draw main content area
  drawContentArea();

  // Draw comparison toggle
  drawComparisonToggle();
}

function drawTabBar() {
  let tabWidth = (canvasWidth - margin * 2) / tabs.length;
  let tabY = drawHeight;
  let tabH = controlHeight - 5;

  for (let i = 0; i < tabs.length; i++) {
    let x = margin + i * tabWidth;
    let isActive = (i === activeTab);
    let isCompare = (i === compareTab && comparisonMode);

    // Tab background
    if (isActive) {
      fill(tabs[i].color);
    } else if (isCompare) {
      fill(red(color(tabs[i].color)), green(color(tabs[i].color)), blue(color(tabs[i].color)), 180);
    } else {
      fill(220);
    }

    stroke(150);
    strokeWeight(1);
    rect(x, tabY, tabWidth - 2, tabH, 5, 5, 0, 0);

    // Tab label
    fill(isActive || isCompare ? 255 : 80);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(tabs[i].shortLabel, x + tabWidth/2 - 1, tabY + tabH/2);
  }
}

function drawContentArea() {
  // Content background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(margin, margin, canvasWidth - margin * 2, drawHeight - margin * 2, 10);

  if (comparisonMode && compareTab >= 0 && compareTab !== activeTab) {
    // Split view comparison
    drawSplitComparison();
  } else {
    // Single tab view
    drawSingleView(activeTab, margin, margin, canvasWidth - margin * 2, drawHeight - margin * 2);
  }
}

function drawSplitComparison() {
  let halfWidth = (canvasWidth - margin * 3) / 2;

  // Left panel (active tab)
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(margin, margin, halfWidth, drawHeight - margin * 2);
  drawingContext.clip();
  drawSingleView(activeTab, margin, margin, halfWidth, drawHeight - margin * 2);
  drawingContext.restore();
  pop();

  // Divider
  stroke(150);
  strokeWeight(2);
  line(margin + halfWidth + margin/2, margin + 10, margin + halfWidth + margin/2, drawHeight - margin - 10);

  // Right panel (compare tab)
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(margin * 2 + halfWidth, margin, halfWidth, drawHeight - margin * 2);
  drawingContext.clip();
  drawSingleView(compareTab, margin * 2 + halfWidth, margin, halfWidth, drawHeight - margin * 2);
  drawingContext.restore();
  pop();
}

function drawSingleView(tabIndex, x, y, w, h) {
  let tab = tabs[tabIndex];
  let contentX = x + 15;
  let contentY = y + 15;
  let contentW = w - 30;
  let contentH = h - 30;

  // Header with color accent
  fill(tab.color);
  noStroke();
  rect(x, y, w, 50, 10, 10, 0, 0);

  // Title
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(tab.title, contentX, y + 25);

  // Age range badge
  textSize(11);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  text(tab.ageRange, x + w - 15, y + 25);

  // Main content area - divided into sketch and info
  let sketchWidth = contentW * 0.45;
  let infoWidth = contentW * 0.5;
  let sketchX = contentX;
  let infoX = contentX + sketchWidth + 15;
  let mainY = y + 60;
  let mainH = contentH - 50;

  // Draw mini sketch/preview
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(sketchX, mainY, sketchWidth, mainH);
  drawingContext.clip();

  // Sketch background
  fill(248);
  stroke(200);
  strokeWeight(1);
  rect(sketchX, mainY, sketchWidth, mainH, 8);

  // Draw the actual sketch
  tab.sketch(sketchX, mainY, sketchWidth, mainH, tabIndex);

  drawingContext.restore();
  pop();

  // Info panel
  drawInfoPanel(tab, infoX, mainY, infoWidth, mainH);
}

function drawInfoPanel(tab, x, y, w, h) {
  // Approach
  fill(60);
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Approach:", x, y);

  textStyle(NORMAL);
  fill(80);
  textSize(11);
  let approachLines = wrapText(tab.approach, w);
  let lineY = y + 18;
  for (let line of approachLines) {
    text(line, x, lineY);
    lineY += 14;
  }

  // Features
  lineY += 10;
  fill(60);
  textSize(12);
  textStyle(BOLD);
  text("Features:", x, lineY);
  lineY += 18;

  textStyle(NORMAL);
  fill(80);
  textSize(10);
  for (let i = 0; i < min(tab.features.length, 4); i++) {
    let featureLines = wrapText("- " + tab.features[i], w - 10);
    for (let line of featureLines) {
      if (lineY < y + h - 80) {
        text(line, x, lineY);
        lineY += 13;
      }
    }
  }

  // Key differences callout
  lineY = y + h - 70;
  fill(tab.color);
  textSize(11);
  textStyle(BOLD);
  text("What Changes:", x, lineY);
  lineY += 16;

  textStyle(NORMAL);
  fill(100);
  textSize(10);
  for (let i = 0; i < min(tab.keyDifferences.length, 3); i++) {
    text("* " + tab.keyDifferences[i], x, lineY);
    lineY += 13;
  }
}

function drawComparisonToggle() {
  let btnX = canvasWidth - 140;
  let btnY = 8;
  let btnW = 120;
  let btnH = 24;

  // Button background
  fill(comparisonMode ? tabs[activeTab].color : 230);
  stroke(150);
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 12);

  // Button text
  fill(comparisonMode ? 255 : 80);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text(comparisonMode ? "Exit Compare" : "Compare Mode", btnX + btnW/2, btnY + btnH/2);
}

// Individual sketch functions for each level
function drawEarlyChildhood(x, y, w, h, tabIndex) {
  // Pond background
  fill(100, 180, 220);
  noStroke();
  ellipse(x + w/2, y + h * 0.65, w * 0.85, h * 0.5);

  // Lily pads
  fill(80, 160, 80);
  ellipse(x + w * 0.2, y + h * 0.55, 30, 15);
  ellipse(x + w * 0.75, y + h * 0.7, 25, 12);

  // Draw ducks
  let duckColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7', '#DDA0DD'];
  for (let i = 0; i < 4; i++) {
    let duckX = x + w * 0.2 + i * (w * 0.2);
    let duckY = y + h * 0.6 + sin(animTime * 2 + i) * 5;

    // Duck body
    fill(duckColors[i]);
    ellipse(duckX, duckY, 35, 25);

    // Duck head
    ellipse(duckX + 12, duckY - 10, 20, 18);

    // Beak
    fill(255, 180, 0);
    triangle(duckX + 20, duckY - 10, duckX + 30, duckY - 8, duckX + 20, duckY - 5);

    // Eye
    fill(0);
    ellipse(duckX + 15, duckY - 12, 4, 4);
  }

  // Label
  fill(80);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text("Tap a duck!", x + w/2, y + h - 10);
}

function drawElementary(x, y, w, h, tabIndex) {
  // Jar outline
  stroke(150);
  strokeWeight(2);
  fill(255, 255, 255, 200);

  // Jar body
  beginShape();
  vertex(x + w * 0.25, y + h * 0.3);
  vertex(x + w * 0.2, y + h * 0.35);
  vertex(x + w * 0.2, y + h * 0.85);
  bezierVertex(x + w * 0.2, y + h * 0.95, x + w * 0.8, y + h * 0.95, x + w * 0.8, y + h * 0.85);
  vertex(x + w * 0.8, y + h * 0.35);
  vertex(x + w * 0.75, y + h * 0.3);
  endShape(CLOSE);

  // Jar neck
  rect(x + w * 0.3, y + h * 0.2, w * 0.4, h * 0.12, 3);

  // Draw marbles
  let marbleColors = ['#E74C3C', '#E74C3C', '#E74C3C', '#E74C3C',
                      '#3498DB', '#3498DB', '#3498DB',
                      '#2ECC71', '#2ECC71',
                      '#F39C12'];

  for (let i = 0; i < marbleColors.length; i++) {
    let mx = x + w * 0.3 + (i % 4) * (w * 0.12) + sin(animTime + i) * 2;
    let my = y + h * 0.5 + floor(i / 4) * (h * 0.15);

    fill(marbleColors[i]);
    noStroke();
    ellipse(mx, my, 22, 22);

    // Shine
    fill(255, 255, 255, 100);
    ellipse(mx - 4, my - 4, 8, 8);
  }

  // Tally marks
  fill(80);
  textSize(10);
  textAlign(LEFT, TOP);
  text("Red: |||| ", x + 10, y + 15);
  text("Blue: ||| ", x + 10, y + 28);
}

function drawMiddleSchool(x, y, w, h, tabIndex) {
  // Probability notation header
  fill(60);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("P(event) = favorable / total", x + w/2, y + 15);
  textStyle(NORMAL);

  // Spinner
  let spinnerX = x + w * 0.3;
  let spinnerY = y + h * 0.55;
  let spinnerR = min(w, h) * 0.25;

  // Spinner sections
  let sections = [
    { angle: PI * 0.5, color: '#E74C3C', label: '25%' },
    { angle: PI * 0.75, color: '#3498DB', label: '37.5%' },
    { angle: PI * 0.75, color: '#2ECC71', label: '37.5%' }
  ];

  let startAngle = -PI/2 + animTime * 0.5;
  for (let s of sections) {
    fill(s.color);
    stroke(255);
    strokeWeight(2);
    arc(spinnerX, spinnerY, spinnerR * 2, spinnerR * 2, startAngle, startAngle + s.angle, PIE);
    startAngle += s.angle;
  }

  // Center pin
  fill(50);
  noStroke();
  ellipse(spinnerX, spinnerY, 10, 10);

  // Arrow
  fill(50);
  triangle(spinnerX, spinnerY - spinnerR - 5, spinnerX - 8, spinnerY - spinnerR + 10, spinnerX + 8, spinnerY - spinnerR + 10);

  // Results panel
  fill(80);
  textSize(10);
  textAlign(LEFT, TOP);
  text("Theoretical: 0.25", x + w * 0.6, y + h * 0.4);
  text("Experimental: 0.28", x + w * 0.6, y + h * 0.5);
  text("Trials: 50", x + w * 0.6, y + h * 0.6);
}

function drawHighSchool(x, y, w, h, tabIndex) {
  // Title
  fill(60);
  textSize(11);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Auto Insurance Risk Model", x + w/2, y + 12);
  textStyle(NORMAL);

  // Risk factors
  let factors = [
    { name: "Age", value: 0.7 },
    { name: "History", value: 0.4 },
    { name: "Vehicle", value: 0.6 },
    { name: "Location", value: 0.5 }
  ];

  let barX = x + 15;
  let barY = y + 35;
  let barW = w * 0.4;
  let barH = 18;

  for (let i = 0; i < factors.length; i++) {
    // Label
    fill(80);
    textSize(9);
    textAlign(LEFT, CENTER);
    text(factors[i].name, barX, barY + i * 25 + barH/2);

    // Bar background
    fill(230);
    noStroke();
    rect(barX + 50, barY + i * 25, barW, barH, 3);

    // Bar fill
    let barColor = lerpColor(color('#2ECC71'), color('#E74C3C'), factors[i].value);
    fill(barColor);
    rect(barX + 50, barY + i * 25, barW * factors[i].value, barH, 3);
  }

  // Premium calculation
  fill(60);
  textSize(10);
  textAlign(LEFT, TOP);
  text("P(claim) = 0.15", x + w * 0.6, y + 45);
  text("E[payout] = $4,200", x + w * 0.6, y + 60);
  text("Premium: $630/yr", x + w * 0.6, y + 80);

  // Formula
  fill(100);
  textSize(8);
  text("P = E[X] * (1 + margin)", x + w * 0.6, y + h * 0.7);
}

function drawUndergraduate(x, y, w, h, tabIndex) {
  // Title
  fill(60);
  textSize(11);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Bayes' Theorem Visualization", x + w/2, y + 10);
  textStyle(NORMAL);

  // Distribution curves
  let curveY = y + h * 0.5;
  let curveH = h * 0.25;

  // Prior (blue)
  stroke('#3498DB');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < w - 20; i++) {
    let xPos = x + 10 + i;
    let t = (i / (w - 20)) * 4 - 2;
    let yVal = exp(-t * t / 0.5) * curveH;
    vertex(xPos, curveY - yVal);
  }
  endShape();

  // Likelihood (green)
  stroke('#2ECC71');
  beginShape();
  for (let i = 0; i < w - 20; i++) {
    let xPos = x + 10 + i;
    let t = (i / (w - 20)) * 4 - 2;
    let yVal = exp(-(t - 0.5) * (t - 0.5) / 0.3) * curveH * 0.8;
    vertex(xPos, curveY - yVal);
  }
  endShape();

  // Posterior (purple)
  stroke('#9B59B6');
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < w - 20; i++) {
    let xPos = x + 10 + i;
    let t = (i / (w - 20)) * 4 - 2;
    let yVal = exp(-(t - 0.3) * (t - 0.3) / 0.25) * curveH * 1.1;
    vertex(xPos, curveY - yVal);
  }
  endShape();

  // Legend
  let legendY = y + h - 50;
  textSize(9);
  noStroke();

  fill('#3498DB');
  rect(x + 10, legendY, 15, 10);
  fill(80);
  textAlign(LEFT, CENTER);
  text("Prior", x + 30, legendY + 5);

  fill('#2ECC71');
  rect(x + 70, legendY, 15, 10);
  fill(80);
  text("Likelihood", x + 90, legendY + 5);

  fill('#9B59B6');
  rect(x + 10, legendY + 15, 15, 10);
  fill(80);
  text("Posterior", x + 30, legendY + 20);
}

function drawGraduate(x, y, w, h, tabIndex) {
  // Title
  fill(60);
  textSize(11);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("MCMC Parameter Space", x + w/2, y + 10);
  textStyle(NORMAL);

  // Parameter space background
  fill(240);
  stroke(200);
  strokeWeight(1);
  rect(x + 15, y + 30, w - 30, h - 70, 5);

  // Draw sampling chain
  stroke('#9B59B6');
  strokeWeight(1);
  noFill();

  let chainX = x + 25;
  let chainY = y + 50;
  let chainW = w - 50;
  let chainH = h - 100;

  beginShape();
  for (let i = 0; i < 50; i++) {
    let t = i / 50;
    let px = chainX + chainW * (0.3 + 0.4 * t + 0.1 * sin(t * 10 + animTime));
    let py = chainY + chainH * (0.3 + 0.4 * t + 0.1 * cos(t * 8 + animTime));
    vertex(px, py);
  }
  endShape();

  // Current sample point
  let currentX = chainX + chainW * (0.7 + 0.1 * sin(animTime * 2));
  let currentY = chainY + chainH * (0.7 + 0.1 * cos(animTime * 2));
  fill('#E74C3C');
  noStroke();
  ellipse(currentX, currentY, 8, 8);

  // Convergence indicator
  fill(80);
  textSize(9);
  textAlign(LEFT, BOTTOM);
  text("R-hat: 1.02", x + 15, y + h - 10);
  text("ESS: 4,200", x + w/2, y + h - 10);
}

function drawCorporate(x, y, w, h, tabIndex) {
  // Title
  fill(60);
  textSize(11);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Investment Risk Analysis", x + w/2, y + 10);
  textStyle(NORMAL);

  // Decision options
  let options = [
    { name: "Option A", expected: "$2.4M", risk: "Low", confidence: "85%" },
    { name: "Option B", expected: "$3.8M", risk: "Med", confidence: "62%" },
    { name: "Option C", expected: "$5.1M", risk: "High", confidence: "41%" }
  ];

  let optY = y + 35;

  for (let i = 0; i < options.length; i++) {
    // Option box
    fill(i === 1 ? '#E8F4FD' : 250);
    stroke(i === 1 ? '#74B9FF' : 200);
    strokeWeight(i === 1 ? 2 : 1);
    rect(x + 10, optY + i * 40, w - 20, 35, 5);

    // Option details
    fill(60);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(options[i].name, x + 20, optY + i * 40 + 12);
    textStyle(NORMAL);

    textSize(9);
    text("E[V]: " + options[i].expected, x + 20, optY + i * 40 + 26);
    text("Risk: " + options[i].risk, x + w * 0.45, optY + i * 40 + 26);
    text("CI: " + options[i].confidence, x + w * 0.7, optY + i * 40 + 26);
  }

  // Recommendation
  fill('#27AE60');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  textStyle(BOLD);
  text("Recommended: Option B", x + w/2, y + h - 10);
  textStyle(NORMAL);
}

// Utility functions
function wrapText(txt, maxWidth) {
  let words = txt.split(' ');
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

function mousePressed() {
  // Check tab clicks
  let tabWidth = (canvasWidth - margin * 2) / tabs.length;
  let tabY = drawHeight;
  let tabH = controlHeight - 5;

  if (mouseY >= tabY && mouseY <= tabY + tabH) {
    let tabIndex = floor((mouseX - margin) / tabWidth);
    if (tabIndex >= 0 && tabIndex < tabs.length) {
      if (comparisonMode && activeTab !== tabIndex) {
        compareTab = tabIndex;
      } else {
        activeTab = tabIndex;
        compareTab = -1;
      }
    }
  }

  // Check comparison toggle
  let btnX = canvasWidth - 140;
  let btnY = 8;
  let btnW = 120;
  let btnH = 24;

  if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    comparisonMode = !comparisonMode;
    if (!comparisonMode) {
      compareTab = -1;
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
    canvasWidth = container.offsetWidth;
  }
}
