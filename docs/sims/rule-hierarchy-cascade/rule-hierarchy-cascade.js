// Rule Hierarchy Cascade MicroSim
// Visualizes how rules cascade through 5 hierarchy levels with conflict resolution

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation state
let animationPhase = 0; // 0=idle, 1=cascading
let cascadeProgress = 0;
let cascadeSpeed = 0.02;

// Hierarchy levels (top to bottom)
const levels = [
  {
    name: "Enterprise",
    color: "#1a3a5c", // Dark blue
    width: 0.95,
    rules: [
      { text: "Brand colors", mandatory: false, status: "active" },
      { text: "Accessibility", mandatory: true, status: "active" },
      { text: "Legal requirements", mandatory: true, status: "active" }
    ]
  },
  {
    name: "Business Unit",
    color: "#2a5a8c", // Medium blue
    width: 0.80,
    rules: [
      { text: "Technology stack", mandatory: false, status: "active" },
      { text: "Platform standards", mandatory: false, status: "active" },
      { text: "Brand colors", mandatory: false, status: "override", overrides: "Custom colors" }
    ]
  },
  {
    name: "Department",
    color: "#4a8ac0", // Light blue
    width: 0.65,
    rules: [
      { text: "Subject conventions", mandatory: false, status: "active" },
      { text: "Pedagogical approach", mandatory: false, status: "active" },
      { text: "Platform standards", mandatory: false, status: "conflict", resolution: "Dept wins (most specific)" }
    ]
  },
  {
    name: "Project",
    color: "#2a9d8f", // Teal
    width: 0.50,
    rules: [
      { text: "Visual style", mandatory: false, status: "active" },
      { text: "Chapter conventions", mandatory: false, status: "active" },
      { text: "Accessibility", mandatory: true, status: "locked" }
    ]
  },
  {
    name: "Personal",
    color: "#52b788", // Green
    width: 0.35,
    rules: [
      { text: "Development prefs", mandatory: false, status: "active" },
      { text: "Code style", mandatory: false, status: "active" }
    ]
  }
];

// Side panel content
const conflictResolution = {
  title: "Conflict Resolution",
  rules: [
    "Most specific level wins",
    "MANDATORY rules never change",
    "Override requires explicit declaration"
  ]
};

// Interaction state
let hoveredLevel = -1;
let hoveredRule = null;
let selectedRule = null;
let showCascadePath = false;

// Cascade animation particles
let cascadeParticles = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  describe('Interactive visualization showing how rules cascade through 5 organizational hierarchy levels with conflict resolution mechanics.', LABEL);
}

function draw() {
  updateCanvasSize();
  background(248, 250, 252);

  // Draw title
  fill(40);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Rule Hierarchy Cascade", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Calculate layout
  let cascadeLeft = margin;
  let cascadeWidth = canvasWidth * 0.65 - margin * 2;
  let cascadeTop = 45;
  let cascadeHeight = drawHeight - cascadeTop - 20;
  let levelHeight = cascadeHeight / 5;

  // Side panel dimensions
  let panelLeft = canvasWidth * 0.67;
  let panelWidth = canvasWidth * 0.33 - margin;
  let panelTop = cascadeTop;
  let panelHeight = cascadeHeight;

  // Reset hover state
  hoveredLevel = -1;
  hoveredRule = null;

  // Draw cascade levels
  for (let i = 0; i < 5; i++) {
    let level = levels[i];
    let levelY = cascadeTop + i * levelHeight;
    let levelW = cascadeWidth * level.width;
    let levelX = cascadeLeft + (cascadeWidth - levelW) / 2;

    // Check hover
    if (mouseX >= levelX && mouseX <= levelX + levelW &&
        mouseY >= levelY && mouseY <= levelY + levelHeight - 5) {
      hoveredLevel = i;
    }

    // Draw level background
    let levelColor = color(level.color);
    if (hoveredLevel === i) {
      fill(red(levelColor) + 20, green(levelColor) + 20, blue(levelColor) + 20);
    } else {
      fill(levelColor);
    }
    stroke(255, 100);
    strokeWeight(1);
    rect(levelX, levelY, levelW, levelHeight - 8, 8);

    // Draw level name
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(level.name, levelX + 15, levelY + 10);
    textStyle(NORMAL);

    // Draw rules as chips
    let chipX = levelX + 15;
    let chipY = levelY + 35;
    let chipSpacing = 8;

    for (let j = 0; j < level.rules.length; j++) {
      let rule = level.rules[j];
      let chipWidth = textWidth(rule.text) + 40;

      // Wrap to next line if needed
      if (chipX + chipWidth > levelX + levelW - 15) {
        chipX = levelX + 15;
        chipY += 28;
      }

      // Draw chip
      let chipColor = getRuleChipColor(rule);
      let isHovered = mouseX >= chipX && mouseX <= chipX + chipWidth &&
                      mouseY >= chipY && mouseY <= chipY + 24;

      if (isHovered) {
        hoveredRule = { level: i, ruleIndex: j, rule: rule, x: chipX, y: chipY, width: chipWidth };
        fill(red(chipColor) + 30, green(chipColor) + 30, blue(chipColor) + 30);
      } else {
        fill(chipColor);
      }

      stroke(255, 50);
      strokeWeight(1);
      rect(chipX, chipY, chipWidth, 24, 12);

      // Draw rule text
      fill(rule.status === 'override' ? 150 : 255);
      noStroke();
      textSize(11);
      textAlign(LEFT, CENTER);

      // Add lock icon for mandatory/locked
      let iconOffset = 0;
      if (rule.mandatory || rule.status === 'locked') {
        iconOffset = 16;
        textSize(12);
        text("\u{1F512}", chipX + 8, chipY + 12);
      }

      textSize(11);
      if (rule.status === 'override') {
        // Strikethrough effect
        let textX = chipX + 10 + iconOffset;
        text(rule.text, textX, chipY + 12);
        stroke(150);
        strokeWeight(1);
        line(textX, chipY + 12, textX + textWidth(rule.text), chipY + 12);
      } else {
        text(rule.text, chipX + 10 + iconOffset, chipY + 12);
      }

      chipX += chipWidth + chipSpacing;
    }

    // Draw cascade arrow to next level
    if (i < 4) {
      let arrowX = cascadeLeft + cascadeWidth / 2;
      let arrowY1 = levelY + levelHeight - 8;
      let arrowY2 = levelY + levelHeight + 2;

      stroke(100, 150);
      strokeWeight(2);
      line(arrowX, arrowY1, arrowX, arrowY2);

      // Arrowhead
      fill(100, 150);
      noStroke();
      triangle(arrowX - 6, arrowY2 - 3, arrowX + 6, arrowY2 - 3, arrowX, arrowY2 + 5);
    }
  }

  // Draw cascade particles during animation
  if (animationPhase === 1) {
    updateCascadeAnimation();
    drawCascadeParticles();
  }

  // Draw side panel
  drawSidePanel(panelLeft, panelTop, panelWidth, panelHeight);

  // Draw control area
  drawControls();

  // Draw tooltip for hovered rule
  if (hoveredRule) {
    drawRuleTooltip();
  }
}

function getRuleChipColor(rule) {
  if (rule.mandatory || rule.status === 'locked') {
    return color(200, 100, 100); // Red for mandatory
  } else if (rule.status === 'override') {
    return color(100, 100, 100); // Gray for overridden
  } else if (rule.status === 'conflict') {
    return color(230, 180, 80); // Yellow for conflict
  } else {
    return color(80, 80, 80, 200); // Dark gray for normal
  }
}

function drawSidePanel(x, y, w, h) {
  // Panel background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h, 10);

  let contentX = x + 15;
  let contentY = y + 20;

  // Title
  fill(50);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Conflict Resolution", contentX, contentY);
  textStyle(NORMAL);
  contentY += 35;

  // Resolution rules
  textSize(12);
  fill(70);
  for (let i = 0; i < conflictResolution.rules.length; i++) {
    let ruleText = conflictResolution.rules[i];
    fill(80);
    text("\u2022 " + ruleText, contentX, contentY);
    contentY += 25;
  }

  contentY += 15;

  // Visual legend
  fill(50);
  textSize(14);
  textStyle(BOLD);
  text("Legend", contentX, contentY);
  textStyle(NORMAL);
  contentY += 30;

  // Legend items
  let legendItems = [
    { color: color(200, 100, 100), icon: "\u{1F512}", text: "MANDATORY (locked)" },
    { color: color(80, 80, 80), icon: "\u2713", text: "Active rule" },
    { color: color(100, 100, 100), icon: "\u2014", text: "Overridden rule" },
    { color: color(230, 180, 80), icon: "!", text: "Conflict resolved" }
  ];

  for (let item of legendItems) {
    fill(item.color);
    noStroke();
    rect(contentX, contentY, 20, 20, 4);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(item.icon, contentX + 10, contentY + 10);

    fill(70);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(item.text, contentX + 30, contentY + 10);
    contentY += 30;
  }

  contentY += 20;

  // Example conflict
  fill(50);
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Example Conflict", contentX, contentY);
  textStyle(NORMAL);
  contentY += 25;

  textSize(11);
  fill(70);
  let conflictExample = [
    "Business Unit: Platform A",
    "Department: Platform B",
    "Result: Platform B applied",
    "(most specific wins)"
  ];

  for (let line of conflictExample) {
    text(line, contentX, contentY);
    contentY += 18;
  }

  contentY += 25;

  // Instructions
  fill(100);
  textSize(11);
  textStyle(ITALIC);
  text("Hover over rules to see details", contentX, contentY);
  contentY += 16;
  text("Click rules to trace cascade path", contentX, contentY);
  textStyle(NORMAL);
}

function drawRuleTooltip() {
  if (!hoveredRule) return;

  let rule = hoveredRule.rule;
  let tooltipX = hoveredRule.x;
  let tooltipY = hoveredRule.y - 60;

  // Ensure tooltip stays on screen
  if (tooltipY < 50) tooltipY = hoveredRule.y + 30;

  let tooltipWidth = 180;
  let tooltipHeight = 50;

  // Adjust for override with extra info
  if (rule.status === 'override' || rule.status === 'conflict') {
    tooltipHeight = 70;
  }

  // Draw tooltip background
  fill(50, 240);
  stroke(100);
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 6);

  // Draw content
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(rule.text, tooltipX + 10, tooltipY + 10);
  textStyle(NORMAL);

  textSize(10);
  fill(200);
  let statusText = "";
  if (rule.mandatory) {
    statusText = "MANDATORY - Cannot be overridden";
  } else if (rule.status === 'locked') {
    statusText = "Inherited MANDATORY rule";
  } else if (rule.status === 'override') {
    statusText = "Replaced by: " + rule.overrides;
  } else if (rule.status === 'conflict') {
    statusText = rule.resolution;
  } else {
    statusText = "Level: " + levels[hoveredRule.level].name;
  }
  text(statusText, tooltipX + 10, tooltipY + 28);

  if (rule.status === 'override' || rule.status === 'conflict') {
    fill(150);
    text("Click to see cascade path", tooltipX + 10, tooltipY + 48);
  }
}

function drawControls() {
  let controlY = drawHeight;

  // Control background
  fill(240);
  noStroke();
  rect(0, controlY, canvasWidth, controlHeight);

  // Draw separator line
  stroke(200);
  strokeWeight(1);
  line(0, controlY, canvasWidth, controlY);

  // Animate button
  let btnX = margin;
  let btnY = controlY + 10;
  let btnW = 140;
  let btnH = 30;

  let btnHover = mouseX >= btnX && mouseX <= btnX + btnW &&
                 mouseY >= btnY && mouseY <= btnY + btnH;

  fill(btnHover ? color(42, 157, 143) : color(52, 168, 154));
  noStroke();
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(animationPhase === 1 ? "Animating..." : "Animate Cascade", btnX + btnW/2, btnY + btnH/2);

  // Instructions
  fill(100);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Watch rules flow down through hierarchy levels", btnX + btnW + 20, btnY + btnH/2);
}

function drawCascadeParticles() {
  for (let p of cascadeParticles) {
    if (p.alpha > 0) {
      fill(red(p.color), green(p.color), blue(p.color), p.alpha);
      noStroke();
      ellipse(p.x, p.y, p.size, p.size);
    }
  }
}

function updateCascadeAnimation() {
  cascadeProgress += cascadeSpeed;

  // Create new particles as cascade progresses
  if (frameCount % 3 === 0 && cascadeProgress < 1) {
    let cascadeWidth = (canvasWidth * 0.65 - margin * 2);
    let cascadeLeft = margin;
    let cascadeTop = 45;
    let levelHeight = (drawHeight - cascadeTop - 20) / 5;

    let currentLevel = floor(cascadeProgress * 5);
    if (currentLevel < 5) {
      let levelY = cascadeTop + currentLevel * levelHeight;
      let levelW = cascadeWidth * levels[currentLevel].width;
      let levelX = cascadeLeft + (cascadeWidth - levelW) / 2;

      // Add particles
      for (let i = 0; i < 3; i++) {
        cascadeParticles.push({
          x: levelX + random(levelW),
          y: levelY + levelHeight / 2,
          vx: random(-1, 1),
          vy: random(2, 4),
          size: random(4, 8),
          color: color(levels[currentLevel].color),
          alpha: 200
        });
      }
    }
  }

  // Update particles
  for (let p of cascadeParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 3;
  }

  // Remove dead particles
  cascadeParticles = cascadeParticles.filter(p => p.alpha > 0);

  // End animation
  if (cascadeProgress >= 1.2) {
    animationPhase = 0;
    cascadeProgress = 0;
    cascadeParticles = [];
  }
}

function mousePressed() {
  let controlY = drawHeight;

  // Check animate button
  let btnX = margin;
  let btnY = controlY + 10;
  let btnW = 140;
  let btnH = 30;

  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    if (animationPhase === 0) {
      animationPhase = 1;
      cascadeProgress = 0;
      cascadeParticles = [];
    }
  }

  // Handle rule click for cascade path
  if (hoveredRule && (hoveredRule.rule.status === 'override' || hoveredRule.rule.status === 'conflict')) {
    selectedRule = hoveredRule;
    showCascadePath = true;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth, 900);
    canvasHeight = drawHeight + controlHeight;
  }
}
