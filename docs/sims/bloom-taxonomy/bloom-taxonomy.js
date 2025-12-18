// Bloom's Taxonomy Interactive Pyramid MicroSim
// Pyramid on left 2/3, hover details on right 1/3
// Counter tracks levels viewed, celebration when all 6 are viewed

// Canvas dimensions - no control area for this MicroSim
let canvasWidth = 600;
let canvasHeight = 450;
let margin = 20;

// Pyramid dimensions
let pyramidWidth;
let pyramidHeight;
let pyramidLeft;
let pyramidTop;
let pyramidBottom;

// Info panel dimensions
let infoPanelLeft;
let infoPanelWidth;

// Bloom's taxonomy levels (bottom to top)
const levels = [
  {
    name: "Remember",
    color: "#E74C3C",  // Red
    description: "Retrieve relevant knowledge from long-term memory",
    verbs: ["Define", "List", "Recall", "Identify", "Name", "Recognize"],
    example: "List the six levels of Bloom's Taxonomy",
    viewed: false
  },
  {
    name: "Understand",
    color: "#E67E22",  // Orange
    description: "Construct meaning from instructional messages",
    verbs: ["Explain", "Summarize", "Classify", "Compare", "Interpret"],
    example: "Explain the difference between Remember and Understand",
    viewed: false
  },
  {
    name: "Apply",
    color: "#F1C40F",  // Yellow
    description: "Carry out or use a procedure in a given situation",
    verbs: ["Execute", "Implement", "Solve", "Use", "Demonstrate"],
    example: "Apply Bloom's Taxonomy to write learning objectives",
    viewed: false
  },
  {
    name: "Analyze",
    color: "#2ECC71",  // Green
    description: "Break material into parts and determine relationships",
    verbs: ["Differentiate", "Organize", "Attribute", "Deconstruct", "Outline"],
    example: "Analyze a lesson plan to identify which taxonomy levels it addresses",
    viewed: false
  },
  {
    name: "Evaluate",
    color: "#3498DB",  // Blue
    description: "Make judgments based on criteria and standards",
    verbs: ["Check", "Critique", "Judge", "Justify", "Assess", "Defend"],
    example: "Evaluate the effectiveness of a teaching strategy",
    viewed: false
  },
  {
    name: "Create",
    color: "#9B59B6",  // Purple
    description: "Put elements together to form a coherent whole",
    verbs: ["Design", "Construct", "Produce", "Invent", "Compose", "Plan"],
    example: "Create a new curriculum using Bloom's Taxonomy",
    viewed: false
  }
];

// Hover state
let hoveredLevel = -1;
let levelsViewed = 0;
let celebrationTriggered = false;

// Celebration particles
let particles = [];
let celebrationActive = false;

// Mouse tracking for iframe
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Track mouse enter/leave for animation control
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');
  calculateDimensions();

  describe('Interactive Bloom\'s Taxonomy pyramid with six cognitive levels from Remember to Create. Hover over each level to see details.', LABEL);
}

function calculateDimensions() {
  // Pyramid takes left 2/3 of canvas
  pyramidWidth = (canvasWidth * 0.6) - margin * 2;
  pyramidHeight = canvasHeight - margin * 3 - 40; // Leave room for title
  pyramidLeft = margin;
  pyramidTop = margin + 40;
  pyramidBottom = pyramidTop + pyramidHeight;

  // Info panel on right 1/3
  infoPanelLeft = canvasWidth * 0.65;
  infoPanelWidth = canvasWidth * 0.35 - margin;
}

function draw() {
  updateCanvasSize();
  background(250);

  // Draw title
  fill(50);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text("Bloom's Taxonomy", canvasWidth * 0.35, 12);

  // Draw counter in upper-right
  drawCounter();

  // Calculate pyramid center
  let pyramidCenterX = pyramidLeft + pyramidWidth / 2;

  // Draw pyramid levels
  let levelHeight = pyramidHeight / 6;
  hoveredLevel = -1;

  for (let i = 0; i < 6; i++) {
    // Calculate trapezoid for this level (bottom = 0, top = 5)
    let bottomY = pyramidBottom - i * levelHeight;
    let topY = bottomY - levelHeight;

    // Width tapers as we go up
    let bottomWidthRatio = 1 - (i * 0.12);
    let topWidthRatio = 1 - ((i + 1) * 0.12);

    let bottomHalfWidth = (pyramidWidth / 2) * bottomWidthRatio;
    let topHalfWidth = (pyramidWidth / 2) * topWidthRatio;

    // Check if mouse is over this level
    let isHovered = isPointInTrapezoid(
      mouseX, mouseY,
      pyramidCenterX - bottomHalfWidth, bottomY,
      pyramidCenterX + bottomHalfWidth, bottomY,
      pyramidCenterX + topHalfWidth, topY,
      pyramidCenterX - topHalfWidth, topY
    );

    if (isHovered) {
      hoveredLevel = i;
      // Mark as viewed
      if (!levels[i].viewed) {
        levels[i].viewed = true;
        levelsViewed++;
        // Check for celebration
        if (levelsViewed === 6 && !celebrationTriggered) {
          triggerCelebration();
        }
      }
    }

    // Draw the trapezoid
    let levelColor = color(levels[i].color);
    if (isHovered) {
      // Brighten on hover
      fill(red(levelColor) + 30, green(levelColor) + 30, blue(levelColor) + 30);
      stroke(50);
      strokeWeight(3);
    } else {
      fill(levelColor);
      stroke(100);
      strokeWeight(1);
    }

    beginShape();
    vertex(pyramidCenterX - bottomHalfWidth, bottomY);
    vertex(pyramidCenterX + bottomHalfWidth, bottomY);
    vertex(pyramidCenterX + topHalfWidth, topY);
    vertex(pyramidCenterX - topHalfWidth, topY);
    endShape(CLOSE);

    // Draw level name
    fill(255);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    let textY = (bottomY + topY) / 2;
    text(levels[i].name, pyramidCenterX, textY);

    // Draw viewed indicator
    if (levels[i].viewed) {
      fill(255, 255, 255, 180);
      textSize(12);
      text("✓", pyramidCenterX + topHalfWidth - 15, textY);
    }
  }

  // Draw info panel
  drawInfoPanel();

  // Update and draw celebration
  if (celebrationActive) {
    updateAndDrawCelebration();
  }

  // Reset text settings
  textAlign(LEFT, TOP);
  textSize(16);
}

function drawCounter() {
  let counterX = canvasWidth - margin - 70;
  let counterY = 10;

  // Counter background
  fill(255);
  stroke(100);
  strokeWeight(1);
  rect(counterX, counterY, 65, 30, 5);

  // Counter text
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(levelsViewed + " / 6", counterX + 32, counterY + 15);
}

function drawInfoPanel() {
  let panelTop = pyramidTop;
  let panelHeight = pyramidHeight;

  if (hoveredLevel >= 0) {
    let level = levels[hoveredLevel];
    let levelColor = color(level.color);

    // Panel background with colored border
    fill(255);
    stroke(levelColor);
    strokeWeight(3);
    rect(infoPanelLeft, panelTop, infoPanelWidth, panelHeight, 10);

    // Content
    let contentX = infoPanelLeft + 15;
    let contentY = panelTop + 20;
    let lineHeight = 22;

    // Level name header
    fill(levelColor);
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(level.name, contentX, contentY);
    contentY += lineHeight + 10;

    // Description
    textStyle(NORMAL);
    fill(50);
    textSize(13);
    let descLines = wrapText(level.description, infoPanelWidth - 30);
    for (let line of descLines) {
      text(line, contentX, contentY);
      contentY += lineHeight - 4;
    }
    contentY += 15;

    // Action verbs
    fill(levelColor);
    textSize(14);
    textStyle(BOLD);
    text("Action Verbs:", contentX, contentY);
    contentY += lineHeight;

    textStyle(NORMAL);
    fill(80);
    textSize(12);
    let verbText = level.verbs.join(", ");
    let verbLines = wrapText(verbText, infoPanelWidth - 30);
    for (let line of verbLines) {
      text(line, contentX, contentY);
      contentY += lineHeight - 4;
    }
    contentY += 15;

    // Example
    fill(levelColor);
    textSize(14);
    textStyle(BOLD);
    text("Example:", contentX, contentY);
    contentY += lineHeight;

    textStyle(ITALIC);
    fill(80);
    textSize(12);
    let exampleLines = wrapText('"' + level.example + '"', infoPanelWidth - 30);
    for (let line of exampleLines) {
      text(line, contentX, contentY);
      contentY += lineHeight - 4;
    }

    textStyle(NORMAL);
  } else {
    // Default panel - instructions
    fill(255);
    stroke(180);
    strokeWeight(2);
    rect(infoPanelLeft, panelTop, infoPanelWidth, panelHeight, 10);

    fill(100);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Hover over a level\nto see details", infoPanelLeft + infoPanelWidth/2, panelTop + panelHeight/2 - 20);

    textSize(13);
    fill(130);
    text("View all 6 levels\nfor a surprise!", infoPanelLeft + infoPanelWidth/2, panelTop + panelHeight/2 + 40);
  }
}

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

function isPointInTrapezoid(px, py, x1, y1, x2, y2, x3, y3, x4, y4) {
  // Check if point is in quadrilateral using cross product method
  function sign(p1x, p1y, p2x, p2y, p3x, p3y) {
    return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
  }

  // Split quad into two triangles and check both
  // Triangle 1: (x1,y1), (x2,y2), (x3,y3)
  let d1 = sign(px, py, x1, y1, x2, y2);
  let d2 = sign(px, py, x2, y2, x3, y3);
  let d3 = sign(px, py, x3, y3, x1, y1);

  let hasNeg1 = (d1 < 0) || (d2 < 0) || (d3 < 0);
  let hasPos1 = (d1 > 0) || (d2 > 0) || (d3 > 0);

  let inTriangle1 = !(hasNeg1 && hasPos1);

  // Triangle 2: (x1,y1), (x3,y3), (x4,y4)
  d1 = sign(px, py, x1, y1, x3, y3);
  d2 = sign(px, py, x3, y3, x4, y4);
  d3 = sign(px, py, x4, y4, x1, y1);

  hasNeg1 = (d1 < 0) || (d2 < 0) || (d3 < 0);
  hasPos1 = (d1 > 0) || (d2 > 0) || (d3 > 0);

  let inTriangle2 = !(hasNeg1 && hasPos1);

  return inTriangle1 || inTriangle2;
}

// Celebration animation
function triggerCelebration() {
  celebrationTriggered = true;
  celebrationActive = true;
  particles = [];

  // Create colorful particles from pyramid levels
  for (let i = 0; i < 80; i++) {
    let levelIndex = i % 6;
    particles.push({
      x: canvasWidth * 0.35,
      y: canvasHeight / 2,
      vx: random(-8, 8),
      vy: random(-12, -4),
      size: random(8, 20),
      color: color(levels[levelIndex].color),
      alpha: 255,
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.2, 0.2),
      gravity: 0.15,
      shape: floor(random(3)) // 0=circle, 1=star, 2=square
    });
  }
}

function updateAndDrawCelebration() {
  let activeCount = 0;

  for (let p of particles) {
    // Update physics
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.alpha -= 2;

    if (p.alpha > 0) {
      activeCount++;

      // Draw particle
      push();
      translate(p.x, p.y);
      rotate(p.rotation);

      let c = p.color;
      fill(red(c), green(c), blue(c), p.alpha);
      noStroke();

      if (p.shape === 0) {
        ellipse(0, 0, p.size, p.size);
      } else if (p.shape === 1) {
        drawStar(0, 0, p.size/2, p.size/4, 5);
      } else {
        rectMode(CENTER);
        rect(0, 0, p.size * 0.8, p.size * 0.8);
      }

      pop();
    }
  }

  if (activeCount === 0) {
    celebrationActive = false;
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateDimensions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    calculateDimensions();
  }
}

// Allow user to reset and view celebration again by clicking
function mousePressed() {
  if (celebrationTriggered && !celebrationActive) {
    // Check if clicking in counter area to reset
    let counterX = canvasWidth - margin - 70;
    let counterY = 10;
    if (mouseX >= counterX && mouseX <= counterX + 65 &&
        mouseY >= counterY && mouseY <= counterY + 30) {
      // Reset all levels
      for (let level of levels) {
        level.viewed = false;
      }
      levelsViewed = 0;
      celebrationTriggered = false;
    }
  }
}
