// Claude Code Skills Architecture Diagram
// Shows how skill summaries lead to SKILL.md loading, then template loading

let canvasWidth = 400;
let drawHeight = 580;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation state
let currentStep = 0; // 0=index only, 1=skill loading, 2=skill loaded, 3=template loading, 4=template loaded
let animationProgress = 0;
let animationSpeed = 0.02;

// Skill data - 30 skill summaries
let skillSummaries = [
  "microsim-generator", "learning-graph", "chapter-generator", "quiz-generator",
  "glossary-generator", "book-metrics", "faq-generator", "skill-creator",
  "reference-generator", "concept-classifier", "physics-sim", "pi-keys",
  "moving-rainbow", "installer", "linkedin-post", "readme-generator",
  "venn-builder", "chart-selector", "timeline-viz", "network-graph",
  "code-reviewer", "test-generator", "doc-writer", "api-analyzer",
  "schema-validator", "data-processor", "image-optimizer", "file-converter",
  "search-index", "cache-manager"
];

// Token counts
let indexTokens = 3000;      // ~100 tokens per skill × 30 skills
let skillTokens = 5000;      // Full SKILL.md
let templateTokens = 2000;   // Template file

// Colors
let colors = {};

// Hover state
let hoveredSkill = null;

// Skill descriptions for tooltips
let skillDescriptions = {
  "microsim-generator": "Creates interactive simulations using p5.js, Chart.js, vis-network, etc.",
  "learning-graph": "Generates concept dependencies and learning pathways",
  "chapter-generator": "Creates structured chapter outlines for textbooks",
  "quiz-generator": "Builds multiple-choice assessments aligned to concepts",
  "glossary-generator": "Produces ISO 11179 compliant term definitions",
  "book-metrics": "Analyzes content metrics for intelligent textbooks",
  "faq-generator": "Creates FAQs from course content and concepts",
  "skill-creator": "Guides creation of new Claude Code skills",
  "reference-generator": "Curates academic references for textbooks",
  "concept-classifier": "Creates classification quizzes using p5.js",
  "physics-sim": "Generates physics-based interactive simulations",
  "pi-keys": "Controls RGB LEDs on Raspberry Pi 500+ keyboard",
  "moving-rainbow": "MicroPython programs for LED strip projects",
  "installer": "Installs MkDocs Material templates and tools",
  "linkedin-post": "Generates LinkedIn announcements for textbooks",
  "readme-generator": "Creates GitHub README files with best practices",
  "venn-builder": "Creates interactive Venn diagram visualizations",
  "chart-selector": "Helps select appropriate chart types for data",
  "timeline-viz": "Creates interactive timeline visualizations",
  "network-graph": "Builds network/graph visualizations with vis-network",
  "code-reviewer": "Reviews code for quality and best practices",
  "test-generator": "Generates unit tests for code",
  "doc-writer": "Creates documentation for codebases",
  "api-analyzer": "Analyzes API endpoints and documentation",
  "schema-validator": "Validates JSON/data schemas",
  "data-processor": "Processes and transforms data formats",
  "image-optimizer": "Optimizes images for web delivery",
  "file-converter": "Converts between file formats",
  "search-index": "Creates search indexes for content",
  "cache-manager": "Manages caching strategies"
};

// User prompt
let userPrompt = "Use the microsim-generator skill to create a pendulum physics simulation";

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container && container.offsetWidth > 100) {
    canvasWidth = Math.min(container.offsetWidth - 40, 700);
  } else {
    canvasWidth = Math.min(window.innerWidth - 40, 700);
  }
  canvasWidth = Math.max(canvasWidth, 400);
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);

  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  colors = {
    background: color(248, 250, 252),
    contextBorder: color(59, 130, 246),
    indexColor: color(156, 163, 175),
    indexHighlight: color(251, 146, 60),
    skillColor: color(34, 197, 94),
    templateColor: color(168, 85, 247),
    text: color(30, 41, 59),
    white: color(255),
    userPrompt: color(250, 204, 21),
    lightGray: color(229, 231, 235)
  };

  textFont('Arial');
}

function draw() {
  background(colors.background);

  // Update animation
  updateAnimation();

  // Check hover state
  checkHover();

  // Draw title
  drawTitle();

  // Draw user prompt
  drawUserPrompt();

  // Draw context window
  drawContextWindow();

  // Draw explanation panel
  drawExplanation();

  // Draw controls
  drawControls();

  // Draw hover tooltip (last so it's on top)
  if (hoveredSkill !== null) {
    drawSkillTooltip();
  }
}

function drawTitle() {
  fill(colors.text);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Claude Code Skill Loading", canvasWidth / 2, 10);
}

function drawUserPrompt() {
  let y = 35;

  // User prompt box
  fill(colors.userPrompt);
  noStroke();
  rect(margin, y, canvasWidth - 2 * margin, 30, 6);

  fill(colors.text);
  textSize(11);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  text('User: "' + userPrompt + '"', margin + 10, y + 15);
}

function drawContextWindow() {
  let x = margin;
  let y = 80;
  let w = canvasWidth - 2 * margin;
  let h = 400;

  // Context window border
  stroke(colors.contextBorder);
  strokeWeight(3);
  fill(colors.white);
  rect(x, y, w, h, 8);

  // Title
  fill(colors.text);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Context Window", x + 10, y + 8);

  // Token counter
  let totalTokens = indexTokens;
  if (currentStep >= 2) totalTokens += skillTokens;
  if (currentStep >= 4) totalTokens += templateTokens;
  if (currentStep === 1) totalTokens += Math.floor(skillTokens * animationProgress);
  if (currentStep === 3) totalTokens += skillTokens + Math.floor(templateTokens * animationProgress);

  textSize(10);
  textStyle(NORMAL);
  fill(colors.contextBorder);
  textAlign(RIGHT, TOP);
  text(totalTokens.toLocaleString() + " / 128,000 tokens", x + w - 10, y + 10);

  // Draw sections based on current step
  let sectionY = y + 35;
  let sectionW = w - 20;

  // Section 1: Skill Index (always visible)
  drawSkillIndex(x + 10, sectionY, sectionW, 170);
  sectionY += 180;

  // Section 2: SKILL.md (visible from step 1+)
  if (currentStep >= 1) {
    drawSkillMd(x + 10, sectionY, sectionW, 90);
  }
  sectionY += 100;

  // Section 3: Template (visible from step 3+)
  if (currentStep >= 3) {
    drawTemplate(x + 10, sectionY, sectionW, 70);
  }
}

function drawSkillIndex(x, y, w, h) {
  // Background
  fill(colors.lightGray);
  stroke(150);
  strokeWeight(1);
  rect(x, y, w, h, 6);

  // Label
  fill(colors.text);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Skill Index (~" + indexTokens.toLocaleString() + " tokens)", x + 8, y + 6);

  // Draw 30 skill tokens in 6 columns x 5 rows
  let cols = 6;
  let rows = 5;
  let padding = 8;
  let gapX = 4;
  let gapY = 6;
  let tokenW = (w - 2 * padding - (cols - 1) * gapX) / cols;
  let tokenH = 22;  // Fixed height, decoupled from container
  let startX = x + padding;
  let startY = y + 25;

  for (let i = 0; i < 30; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let tx = startX + col * (tokenW + gapX);
    let ty = startY + row * (tokenH + gapY);

    // Highlight microsim-generator (index 0) when matched
    let isHighlighted = i === 0 && currentStep >= 1;
    let isHovered = hoveredSkill === i;

    if (isHighlighted) {
      fill(colors.indexHighlight);
      stroke(colors.indexHighlight);
      strokeWeight(2);
    } else if (isHovered) {
      fill(color(180, 190, 200));
      stroke(colors.contextBorder);
      strokeWeight(2);
    } else {
      fill(colors.indexColor);
      stroke(120);
      strokeWeight(1);
    }

    rect(tx, ty, tokenW, tokenH, 4);

    // Full skill name with wrapping
    fill(isHighlighted ? colors.white : colors.text);
    noStroke();
    textSize(9);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    textWrap(WORD);

    // Use text with bounding box for wrapping
    let skillName = skillSummaries[i];
    text(skillName, tx + 2, ty + 2, tokenW - 4, tokenH - 4);
  }
}

function drawSkillMd(x, y, w, h) {
  let progress = currentStep === 1 ? animationProgress : 1;
  let currentH = h * progress;

  // Background with loading animation
  fill(lerpColor(colors.lightGray, color(220, 252, 231), progress));
  stroke(colors.skillColor);
  strokeWeight(2);
  rect(x, y, w, currentH, 6);

  if (progress > 0.3) {
    // Label
    fill(colors.text);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("microsim-generator/SKILL.md (~" + skillTokens.toLocaleString() + " tokens)", x + 8, y + 6);

    if (progress > 0.5) {
      // Content preview
      textSize(8);
      textStyle(NORMAL);
      fill(80);
      let lines = [
        "• Routes to appropriate visualization library (p5.js, Chart.js, etc.)",
        "• Analyzes user requirements for best match",
        "• Generates complete MicroSim packages",
        "• Creates HTML, JavaScript, CSS, documentation"
      ];
      for (let i = 0; i < lines.length && i < Math.floor((progress - 0.5) * 8); i++) {
        text(lines[i], x + 12, y + 24 + i * 14);
      }
    }
  }
}

function drawTemplate(x, y, w, h) {
  let progress = currentStep === 3 ? animationProgress : 1;
  let currentH = h * progress;

  // Background with loading animation
  fill(lerpColor(colors.lightGray, color(243, 232, 255), progress));
  stroke(colors.templateColor);
  strokeWeight(2);
  rect(x, y, w, currentH, 6);

  if (progress > 0.3) {
    // Label
    fill(colors.text);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("p5js-template.md (~" + templateTokens.toLocaleString() + " tokens)", x + 8, y + 6);

    if (progress > 0.5) {
      // Content preview
      textSize(8);
      textStyle(NORMAL);
      fill(80);
      let lines = [
        "• Standard p5.js MicroSim structure",
        "• Responsive canvas setup, draw loop pattern"
      ];
      for (let i = 0; i < lines.length && i < Math.floor((progress - 0.5) * 4); i++) {
        text(lines[i], x + 12, y + 24 + i * 14);
      }
    }
  }
}

function drawExplanation() {
  let x = margin;
  let y = 490;
  let w = canvasWidth - 2 * margin;

  fill(255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, 75, 6);

  fill(colors.text);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);

  let explanations = [
    "Step 1: Context starts with 30 skill summaries (~100 tokens each)",
    "Step 2: User prompt matches 'microsim-generator' skill",
    "Step 3: Full SKILL.md loaded into context (+5,000 tokens)",
    "Step 4: Skill requests p5.js template (+2,000 tokens)",
    "Complete: All resources loaded, ready to generate MicroSim"
  ];

  for (let i = 0; i < explanations.length; i++) {
    let stepNum = Math.floor(currentStep / 1);
    if (currentStep === 1 || currentStep === 3) stepNum = currentStep;

    if (i <= Math.floor((currentStep + 1) / 1)) {
      fill(i === Math.min(currentStep, 4) ? colors.contextBorder : colors.text);
      textStyle(i === Math.min(currentStep, 4) ? BOLD : NORMAL);
    } else {
      fill(180);
      textStyle(NORMAL);
    }
    text((i === Math.min(currentStep, 4) ? "→ " : "   ") + explanations[i], x + 10, y + 8 + i * 13);
  }
}

function drawControls() {
  let y = drawHeight + 10;

  // Separator
  stroke(200);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Step button
  let btnX = canvasWidth / 2 - 60;
  let btnW = 80;
  let btnH = 32;

  fill(currentStep >= 4 ? colors.lightGray : colors.contextBorder);
  noStroke();
  rect(btnX, y + 5, btnW, btnH, 6);

  fill(colors.white);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(currentStep >= 4 ? "Done" : "Next Step", btnX + btnW / 2, y + 5 + btnH / 2);

  // Reset button
  let resetX = canvasWidth / 2 + 30;
  fill(colors.indexColor);
  rect(resetX, y + 5, 60, btnH, 6);
  fill(colors.white);
  text("Reset", resetX + 30, y + 5 + btnH / 2);
}

function updateAnimation() {
  if (currentStep === 1 || currentStep === 3) {
    animationProgress += animationSpeed;
    if (animationProgress >= 1) {
      animationProgress = 0;
      currentStep++;
    }
  }
}

function checkHover() {
  hoveredSkill = null;

  // Calculate skill index position (matches drawSkillIndex)
  let x = margin;
  let y = 80;
  let w = canvasWidth - 2 * margin;
  let h = 400;
  let sectionY = y + 35;
  let sectionW = w - 20;
  let indexH = 180;

  let cols = 6;
  let rows = 5;
  let padding = 8;
  let gapX = 4;
  let gapY = 6;
  let tokenW = (sectionW - 2 * padding - (cols - 1) * gapX) / cols;
  let tokenH = 22;  // Fixed height, decoupled from container
  let startX = x + 10 + padding;
  let startY = sectionY + 25;

  for (let i = 0; i < 30; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let tx = startX + col * (tokenW + gapX);
    let ty = startY + row * (tokenH + gapY);

    if (mouseX >= tx && mouseX <= tx + tokenW &&
        mouseY >= ty && mouseY <= ty + tokenH) {
      hoveredSkill = i;
      break;
    }
  }
}

function drawSkillTooltip() {
  let skillName = skillSummaries[hoveredSkill];
  let description = skillDescriptions[skillName] || "Specialized skill for " + skillName.replace(/-/g, " ");

  let boxW = 200;
  let boxH = 60;
  let boxX = mouseX + 15;
  let boxY = mouseY + 15;

  // Keep tooltip on screen
  if (boxX + boxW > canvasWidth - 10) boxX = mouseX - boxW - 15;
  if (boxY + boxH > canvasHeight - 10) boxY = mouseY - boxH - 15;

  // Tooltip background
  fill(255, 255, 240);
  stroke(colors.contextBorder);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 6);

  // Skill name
  fill(colors.contextBorder);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(skillName, boxX + 8, boxY + 6);

  // Token estimate
  textSize(8);
  textStyle(NORMAL);
  fill(colors.indexHighlight);
  text("~100 tokens in index", boxX + 8, boxY + 22);

  // Description with word wrap
  fill(colors.text);
  textSize(9);
  textWrap(WORD);
  text(description, boxX + 8, boxY + 36, boxW - 16, boxH - 42);
}

function mousePressed() {
  let y = drawHeight + 10;
  let btnH = 32;

  // Next Step button
  let btnX = canvasWidth / 2 - 60;
  let btnW = 80;

  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= y + 5 && mouseY <= y + 5 + btnH) {
    if (currentStep < 4 && currentStep !== 1 && currentStep !== 3) {
      currentStep++;
      animationProgress = 0;
    }
  }

  // Reset button
  let resetX = canvasWidth / 2 + 30;
  if (mouseX >= resetX && mouseX <= resetX + 60 &&
      mouseY >= y + 5 && mouseY <= y + 5 + btnH) {
    currentStep = 0;
    animationProgress = 0;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
