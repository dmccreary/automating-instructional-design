// Claude Code Skills Architecture Diagram
// Shows how skills manage context through summary indexing and on-demand loading

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Animation variables
let loadingProgress = 0;
let isLoading = false;
let loadingSkillIndex = -1;
let pulsePhase = 0;

// Skill data (30 skills with names and loaded state)
let skills = [];
let skillNames = [
  "microsim-generator", "learning-graph", "chapter-generator", "quiz-generator",
  "glossary-generator", "book-metrics", "faq-generator", "skill-creator",
  "reference-generator", "concept-classifier", "physics-sim", "pi-keys",
  "moving-rainbow", "installer", "linkedin-post", "readme-generator",
  "venn-builder", "chart-selector", "timeline-viz", "network-graph",
  "code-reviewer", "test-generator", "doc-writer", "api-analyzer",
  "schema-validator", "data-processor", "image-optimizer", "file-converter",
  "search-index", "cache-manager"
];

// Context window sections
let contextSections = {
  conversation: { size: 25, label: "Conversation History" },
  skillIndex: { size: 15, label: "Skill Index (~3000 tokens)" },
  activeSkill: { size: 20, label: "Active Skill Content" },
  workingSpace: { size: 40, label: "Working Space" }
};

// Colors
let colors = {};

// Hover state
let hoveredSkill = null;
let hoveredSection = null;

// Scenario state
let scenarioActive = false;
let scenarioStep = 0;
let scenarioTimer = 0;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth - 40, 800);
  } else {
    canvasWidth = Math.min(windowWidth - 40, 800);
  }
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);

  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  // Define colors
  colors = {
    contextBorder: color(59, 130, 246),      // Blue
    loaded: color(34, 197, 94),               // Green
    available: color(156, 163, 175),          // Gray
    userInput: color(250, 204, 21),           // Yellow
    skillSummary: color(251, 146, 60),        // Orange
    background: color(248, 250, 252),
    text: color(30, 41, 59),
    white: color(255, 255, 255),
    lightBlue: color(219, 234, 254),
    lightGreen: color(220, 252, 231),
    lightOrange: color(254, 243, 199),
    lightPurple: color(243, 232, 255)
  };

  // Initialize skills
  initializeSkills();

  textFont('Arial');
}

function initializeSkills() {
  skills = [];
  for (let i = 0; i < 30; i++) {
    skills.push({
      name: skillNames[i],
      loaded: false,
      summary: getSummary(skillNames[i])
    });
  }
  // Pre-load a few skills
  skills[0].loaded = true;  // microsim-generator
  skills[1].loaded = true;  // learning-graph
}

function getSummary(name) {
  const summaries = {
    "microsim-generator": "Creates interactive simulations using p5.js, vis-network, etc.",
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
    "pi-keys": "Controls RGB LEDs on Raspberry Pi 500+ keyboard"
  };
  return summaries[name] || "Specialized skill for " + name.replace(/-/g, " ");
}

function draw() {
  background(colors.background);

  // Update animations
  pulsePhase = (pulsePhase + 0.03) % TWO_PI;
  updateLoading();
  updateScenario();

  // Check hover states
  checkHover();

  // Draw title
  fill(colors.text);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Claude Code Skills Architecture", canvasWidth / 2, 20);

  // Draw main components
  drawContextWindow();
  drawSkillRegistry();
  drawLoadingMechanism();
  drawScenarioPanel();

  // Draw hover tooltip
  if (hoveredSkill !== null) {
    drawSkillTooltip();
  }

  // Draw control region
  drawControlRegion();
}

function drawContextWindow() {
  let x = margin;
  let y = 45;
  let w = canvasWidth * 0.45;
  let h = 200;

  // Context window border
  stroke(colors.contextBorder);
  strokeWeight(3);
  fill(colors.white);
  rect(x, y, w, h, 8);

  // Title
  fill(colors.text);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Context Window", x + 10, y + 8);

  // Fixed boundary indicator
  textSize(8);
  textStyle(ITALIC);
  fill(colors.contextBorder);
  text("(128K token limit)", x + 100, y + 10);

  // Draw sections
  let sectionY = y + 30;
  let sectionW = w - 20;
  let totalPercent = 0;

  let sectionColors = [
    colors.lightBlue,
    colors.lightOrange,
    colors.lightGreen,
    colors.lightPurple
  ];

  let sectionKeys = Object.keys(contextSections);
  for (let i = 0; i < sectionKeys.length; i++) {
    let key = sectionKeys[i];
    let section = contextSections[key];
    let sectionH = (h - 40) * (section.size / 100);

    // Section background
    fill(sectionColors[i]);
    stroke(150);
    strokeWeight(1);
    rect(x + 10, sectionY, sectionW, sectionH, 4);

    // Section label
    fill(colors.text);
    noStroke();
    textSize(9);
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    text(section.label, x + 15, sectionY + sectionH / 2);

    // Percentage
    textAlign(RIGHT, CENTER);
    textSize(8);
    fill(100);
    text(section.size + "%", x + sectionW + 5, sectionY + sectionH / 2);

    sectionY += sectionH + 2;
  }
}

function drawSkillRegistry() {
  let x = canvasWidth * 0.55;
  let y = 45;
  let w = canvasWidth * 0.42;
  let h = 200;

  // Registry border (like a card catalog)
  stroke(139, 90, 43);
  strokeWeight(2);
  fill(colors.white);
  rect(x, y, w, h, 8);

  // Wood grain effect on edges
  fill(210, 180, 140);
  noStroke();
  rect(x, y, w, 25, 8, 8, 0, 0);
  rect(x, y + h - 10, w, 10, 0, 0, 8, 8);

  // Title
  fill(colors.text);
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Skill Registry (30 Skills)", x + 10, y + 6);

  // Card catalog icon
  textSize(14);
  text("\uD83D\uDDC3", x + w - 25, y + 4);

  // Skill cards grid (6 columns x 5 rows)
  let cardW = (w - 30) / 6;
  let cardH = 25;
  let startX = x + 10;
  let startY = y + 30;

  for (let i = 0; i < 30; i++) {
    let col = i % 6;
    let row = Math.floor(i / 6);
    let cardX = startX + col * (cardW + 2);
    let cardY = startY + row * (cardH + 3);

    // Card color based on state
    if (skills[i].loaded) {
      fill(colors.loaded);
      if (isLoading && loadingSkillIndex === i) {
        // Pulsing effect while loading
        let pulse = sin(pulsePhase * 3) * 0.3 + 0.7;
        fill(lerpColor(colors.available, colors.loaded, loadingProgress));
      }
    } else {
      fill(colors.available);
    }

    // Highlight on hover
    if (hoveredSkill === i) {
      stroke(colors.contextBorder);
      strokeWeight(2);
    } else {
      stroke(100);
      strokeWeight(1);
    }

    rect(cardX, cardY, cardW, cardH, 3);

    // Skill name (abbreviated)
    fill(skills[i].loaded ? 255 : colors.text);
    noStroke();
    textSize(6);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    let shortName = skills[i].name.substring(0, 8);
    if (skills[i].name.length > 8) shortName += "..";
    text(shortName, cardX + cardW / 2, cardY + cardH / 2);
  }

  // Legend
  let legendY = y + h - 8;
  fill(colors.loaded);
  noStroke();
  rect(x + 10, legendY, 8, 8, 2);
  fill(colors.text);
  textSize(7);
  textAlign(LEFT, CENTER);
  text("Loaded", x + 22, legendY + 4);

  fill(colors.available);
  rect(x + 60, legendY, 8, 8, 2);
  fill(colors.text);
  text("Available", x + 72, legendY + 4);
}

function drawLoadingMechanism() {
  let midX = canvasWidth * 0.5;
  let y = 260;

  // Title
  fill(colors.text);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Loading Mechanism", midX, y);

  // Arrow 1: Conversation to Registry (Relevance Detection)
  let arrow1StartX = margin + canvasWidth * 0.22;
  let arrow1StartY = y + 25;
  let arrow1EndX = canvasWidth * 0.55;
  let arrow1EndY = y + 25;

  stroke(colors.skillSummary);
  strokeWeight(2);
  drawArrow(arrow1StartX, arrow1StartY, arrow1EndX, arrow1EndY);

  fill(colors.skillSummary);
  noStroke();
  textSize(8);
  textStyle(ITALIC);
  text("Relevance Detection", (arrow1StartX + arrow1EndX) / 2, arrow1StartY - 8);

  // Arrow 2: Registry to Context (On-demand Loading)
  let arrow2StartX = canvasWidth * 0.55;
  let arrow2StartY = y + 50;
  let arrow2EndX = margin + canvasWidth * 0.22;
  let arrow2EndY = y + 50;

  stroke(colors.loaded);
  strokeWeight(2);
  drawArrow(arrow2StartX, arrow2StartY, arrow2EndX, arrow2EndY);

  fill(colors.loaded);
  noStroke();
  text("On-demand Loading", (arrow2StartX + arrow2EndX) / 2, arrow2StartY + 12);

  // Visual metaphor: Books being pulled
  textSize(16);
  let bookX = midX - 10 + sin(pulsePhase) * 5;
  text("\uD83D\uDCDA", bookX, y + 37);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);

  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 8;

  push();
  translate(x2, y2);
  rotate(angle);
  fill(colors.loaded);
  noStroke();
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();
}

function drawScenarioPanel() {
  let x = margin;
  let y = 320;
  let w = canvasWidth - 2 * margin;
  let h = 115;

  // Panel background
  fill(255, 255, 240);
  stroke(colors.userInput);
  strokeWeight(2);
  rect(x, y, w, h, 8);

  // Title
  fill(colors.text);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Example Scenario", x + 10, y + 8);

  // User message
  fill(colors.userInput);
  rect(x + 10, y + 25, w - 20, 22, 4);
  fill(colors.text);
  textSize(9);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  text("User: \"Create a physics simulation for pendulum motion\"", x + 15, y + 36);

  // Skill index scan
  let scanY = y + 55;
  fill(colors.lightOrange);
  rect(x + 10, scanY, w - 20, 22, 4);

  fill(colors.text);
  textSize(9);
  textAlign(LEFT, CENTER);
  text("Skill index scan: ", x + 15, scanY + 11);

  // Highlighted skills
  let highlightX = x + 100;

  // physics-sim skill
  fill(scenarioActive && scenarioStep >= 1 ? colors.loaded : colors.available);
  stroke(100);
  strokeWeight(1);
  rect(highlightX, scanY + 3, 65, 16, 3);
  fill(scenarioActive && scenarioStep >= 1 ? 255 : colors.text);
  noStroke();
  textSize(8);
  textAlign(CENTER, CENTER);
  text("physics-sim", highlightX + 32, scanY + 11);

  // microsim-generator skill
  fill(scenarioActive && scenarioStep >= 2 ? colors.loaded : colors.available);
  stroke(100);
  strokeWeight(1);
  rect(highlightX + 75, scanY + 3, 95, 16, 3);
  fill(scenarioActive && scenarioStep >= 2 ? 255 : colors.text);
  noStroke();
  text("microsim-generator", highlightX + 122, scanY + 11);

  // Result
  let resultY = y + 85;
  fill(colors.lightGreen);
  noStroke();
  rect(x + 10, resultY, w - 20, 22, 4);

  fill(colors.text);
  textSize(9);
  textAlign(LEFT, CENTER);

  if (scenarioActive && scenarioStep >= 3) {
    text("Both skills loaded into context. Remaining space: ~80K tokens available", x + 15, resultY + 11);
  } else {
    text("Click 'Run Scenario' to see the loading process", x + 15, resultY + 11);
  }
}

function drawControlRegion() {
  // Control region background
  fill(255);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Separator line
  stroke(200);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Run Scenario button
  let btnX = canvasWidth / 2 - 80;
  let btnY = drawHeight + 12;
  let btnW = 100;
  let btnH = 28;

  fill(scenarioActive ? colors.available : colors.contextBorder);
  noStroke();
  rect(btnX, btnY, btnW, btnH, 6);

  fill(255);
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(scenarioActive ? "Running..." : "Run Scenario", btnX + btnW / 2, btnY + btnH / 2);

  // Reset button
  let resetX = canvasWidth / 2 + 30;
  fill(colors.available);
  rect(resetX, btnY, 60, btnH, 6);
  fill(255);
  text("Reset", resetX + 30, btnY + btnH / 2);

  // Instructions
  fill(colors.text);
  textSize(9);
  textStyle(ITALIC);
  textAlign(LEFT, CENTER);
  text("Click skills to load/unload", margin, drawHeight + 25);
}

function drawSkillTooltip() {
  let skill = skills[hoveredSkill];
  let boxW = 180;
  let boxH = 55;
  let boxX = mouseX + 15;
  let boxY = mouseY + 15;

  // Keep on screen
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
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(skill.name, boxX + 8, boxY + 6);

  // Status
  textSize(8);
  textStyle(NORMAL);
  fill(skill.loaded ? colors.loaded : colors.available);
  text(skill.loaded ? "LOADED" : "AVAILABLE", boxX + 8, boxY + 20);

  // Summary
  fill(colors.text);
  textSize(8);

  // Word wrap
  let words = skill.summary.split(' ');
  let line = '';
  let y = boxY + 32;

  for (let word of words) {
    let testLine = line + word + ' ';
    if (textWidth(testLine) > boxW - 16 && line !== '') {
      text(line.trim(), boxX + 8, y);
      line = word + ' ';
      y += 10;
      if (y > boxY + boxH - 5) break;
    } else {
      line = testLine;
    }
  }
  if (y <= boxY + boxH - 5) {
    text(line.trim(), boxX + 8, y);
  }
}

function checkHover() {
  hoveredSkill = null;

  // Check skill cards
  let regX = canvasWidth * 0.55;
  let regY = 45;
  let w = canvasWidth * 0.42;
  let cardW = (w - 30) / 6;
  let cardH = 25;
  let startX = regX + 10;
  let startY = regY + 30;

  for (let i = 0; i < 30; i++) {
    let col = i % 6;
    let row = Math.floor(i / 6);
    let cardX = startX + col * (cardW + 2);
    let cardY = startY + row * (cardH + 3);

    if (mouseX >= cardX && mouseX <= cardX + cardW &&
        mouseY >= cardY && mouseY <= cardY + cardH) {
      hoveredSkill = i;
      break;
    }
  }
}

function mousePressed() {
  // Check skill card clicks
  let regX = canvasWidth * 0.55;
  let regY = 45;
  let w = canvasWidth * 0.42;
  let cardW = (w - 30) / 6;
  let cardH = 25;
  let startX = regX + 10;
  let startY = regY + 30;

  for (let i = 0; i < 30; i++) {
    let col = i % 6;
    let row = Math.floor(i / 6);
    let cardX = startX + col * (cardW + 2);
    let cardY = startY + row * (cardH + 3);

    if (mouseX >= cardX && mouseX <= cardX + cardW &&
        mouseY >= cardY && mouseY <= cardY + cardH) {
      // Toggle skill loaded state with animation
      if (!isLoading) {
        if (skills[i].loaded) {
          skills[i].loaded = false;
        } else {
          isLoading = true;
          loadingSkillIndex = i;
          loadingProgress = 0;
        }
      }
      return;
    }
  }

  // Check Run Scenario button
  let btnX = canvasWidth / 2 - 80;
  let btnY = drawHeight + 12;
  let btnW = 100;
  let btnH = 28;

  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    if (!scenarioActive) {
      scenarioActive = true;
      scenarioStep = 0;
      scenarioTimer = 0;
    }
    return;
  }

  // Check Reset button
  let resetX = canvasWidth / 2 + 30;
  if (mouseX >= resetX && mouseX <= resetX + 60 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    resetScenario();
    return;
  }
}

function updateLoading() {
  if (isLoading) {
    loadingProgress += 0.05;
    if (loadingProgress >= 1) {
      skills[loadingSkillIndex].loaded = true;
      isLoading = false;
      loadingProgress = 0;
      loadingSkillIndex = -1;
    }
  }
}

function updateScenario() {
  if (scenarioActive) {
    scenarioTimer++;

    if (scenarioTimer === 30 && scenarioStep === 0) {
      scenarioStep = 1;
      // Load physics-sim
      let physicsIndex = skillNames.indexOf("physics-sim");
      if (physicsIndex >= 0) skills[physicsIndex].loaded = true;
    }

    if (scenarioTimer === 60 && scenarioStep === 1) {
      scenarioStep = 2;
      // microsim-generator already loaded
    }

    if (scenarioTimer === 90 && scenarioStep === 2) {
      scenarioStep = 3;
      scenarioActive = false;
    }
  }
}

function resetScenario() {
  scenarioActive = false;
  scenarioStep = 0;
  scenarioTimer = 0;

  // Reset skills to initial state
  for (let skill of skills) {
    skill.loaded = false;
  }
  skills[0].loaded = true;  // microsim-generator
  skills[1].loaded = true;  // learning-graph
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
