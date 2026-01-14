// Prompt Engineering Practices MicroSim
// Interactive infographic with expandable cards for MicroSim prompt best practices

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let mouseOverCanvas = false;
let sections = [];
let expandedSection = 0; // First section expanded by default
let hoveredSection = -1;
let hoveredItem = null;
let tooltipTimer = 0;
let showTooltip = false;
let scrollOffset = 0;

// Colors
const colors = {
  background: '#F8FAFC',
  sectionHeader: ['#2563EB', '#059669', '#7C3AED', '#DC2626', '#EA580C'],
  sectionLight: ['#EFF6FF', '#ECFDF5', '#F5F3FF', '#FEF2F2', '#FFF7ED'],
  goodExample: '#10B981',
  badExample: '#EF4444',
  impactHigh: '#F59E0B',
  impactMedium: '#FBBF24',
  text: '#1E293B',
  subtext: '#64748B',
  checkmark: '#10B981',
  tooltipBg: '#1E293B',
  tooltipText: '#FFFFFF',
  controlBg: '#F1F5F9',
  buttonPrimary: '#2563EB',
  buttonHover: '#1D4ED8'
};

// Section data
function initSections() {
  sections = [
    {
      name: "Context Setting",
      icon: "curtain",
      impact: "High",
      expanded: true,
      items: [
        {
          text: "Educational purpose stated",
          checked: true,
          tip: "Good: 'Teach students to visualize wave interference patterns'\nBad: 'Make a cool animation'"
        },
        {
          text: "Audience level specified",
          checked: true,
          tip: "Good: 'Target: High school physics, grades 10-12'\nBad: No audience mentioned"
        },
        {
          text: "Subject domain identified",
          checked: true,
          tip: "Good: 'Physics - Wave mechanics and superposition'\nBad: 'Science stuff'"
        },
        {
          text: "Output type described",
          checked: true,
          tip: "Good: 'Interactive p5.js simulation with sliders'\nBad: 'Something visual'"
        }
      ]
    },
    {
      name: "Specification Depth",
      icon: "blueprint",
      impact: "High",
      expanded: false,
      items: [
        {
          text: "Learning objectives included",
          checked: true,
          tip: "Good: 'Students will manipulate frequency/amplitude and observe resulting patterns'\nBad: 'Learn about waves'"
        },
        {
          text: "Visual elements described",
          checked: true,
          tip: "Good: 'Two source points, concentric circles, interference pattern overlay'\nBad: 'Show waves'"
        },
        {
          text: "Interactions specified",
          checked: true,
          tip: "Good: 'Slider for frequency (1-10 Hz), click to place sources'\nBad: 'Make it interactive'"
        },
        {
          text: "Parameters with ranges",
          checked: true,
          tip: "Good: 'Amplitude: 0.1-2.0, default 1.0; Frequency: 1-10 Hz, default 3'\nBad: 'Adjustable settings'"
        },
        {
          text: "Edge cases covered",
          checked: true,
          tip: "Good: 'At amplitude=0, show flat line; at max frequency, limit animation fps'\nBad: No edge cases mentioned"
        }
      ]
    },
    {
      name: "Technical Constraints",
      icon: "gear",
      impact: "Medium",
      expanded: false,
      items: [
        {
          text: "Libraries/frameworks specified",
          checked: true,
          tip: "Good: 'Use p5.js v1.11.10, no external dependencies'\nBad: 'Use whatever works'"
        },
        {
          text: "File structure requirements",
          checked: true,
          tip: "Good: 'Create: main.html, sim-name.js, index.md, metadata.json'\nBad: 'Just make it work'"
        },
        {
          text: "Dependency limitations",
          checked: true,
          tip: "Good: 'CDN only, no npm packages, must work offline after load'\nBad: No constraints mentioned"
        },
        {
          text: "Browser/platform targets",
          checked: true,
          tip: "Good: 'Chrome, Firefox, Safari; touch support for tablets'\nBad: Assumes desktop only"
        }
      ]
    },
    {
      name: "Examples & Patterns",
      icon: "template",
      impact: "Medium",
      expanded: false,
      items: [
        {
          text: "Code structure example",
          checked: true,
          tip: "Good: 'Follow setup()/draw() pattern with updateCanvasSize() first'\nBad: No structure guidance"
        },
        {
          text: "Naming conventions",
          checked: true,
          tip: "Good: 'camelCase for JS, kebab-case for files, descriptive variable names'\nBad: Inconsistent naming"
        },
        {
          text: "Style patterns",
          checked: true,
          tip: "Good: 'Use color palette from design system, 4px border radius'\nBad: 'Make it look nice'"
        },
        {
          text: "Similar MicroSim references",
          checked: true,
          tip: "Good: 'See wave-interference-sim for animation approach'\nBad: No reference examples"
        }
      ]
    },
    {
      name: "Output Format",
      icon: "package",
      impact: "High",
      expanded: false,
      items: [
        {
          text: "File format specified",
          checked: true,
          tip: "Good: 'Separate .js file, embedded in iframe in index.md'\nBad: 'Just code'"
        },
        {
          text: "Completeness requirement",
          checked: true,
          tip: "Good: 'Provide complete, runnable code - no placeholders or TODO comments'\nBad: 'Give me the basics'"
        },
        {
          text: "Comment expectations",
          checked: true,
          tip: "Good: 'Include header comment with title, brief comments for complex logic'\nBad: No comment guidance"
        }
      ]
    }
  ];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');
  initSections();

  describe('Prompt Engineering Practices infographic with five expandable sections covering context setting, specification depth, technical constraints, examples and patterns, and output format. Click sections to expand for detailed checklists with tips.', LABEL);
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
  stroke('#E2E8F0');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title
  fill(colors.text);
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  noStroke();
  text("Prompt Engineering Best Practices", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Subtitle
  fill(colors.subtext);
  textSize(13);
  text("Quick reference for crafting effective MicroSim generation prompts", canvasWidth / 2, 34);

  // Draw sections
  let yOffset = 60;
  let sectionWidth = canvasWidth - margin * 2;

  for (let i = 0; i < sections.length; i++) {
    yOffset = drawSection(i, margin, yOffset, sectionWidth);
    if (yOffset > drawHeight - 10) break; // Stop if we run out of space
  }

  // Draw control area
  drawControlArea();

  // Draw tooltip if hovering
  if (showTooltip && hoveredItem) {
    drawTooltip();
  }

  // Update tooltip timer
  if (hoveredItem) {
    tooltipTimer++;
    if (tooltipTimer > 20) {
      showTooltip = true;
    }
  }
}

function drawSection(index, x, y, width) {
  let sec = sections[index];
  let headerHeight = 44;
  let itemHeight = 30;
  let isHovered = hoveredSection === index;

  // Calculate total height
  let totalHeight = headerHeight;
  if (sec.expanded) {
    totalHeight += sec.items.length * itemHeight + 14;
  }

  // Section background
  fill(colors.sectionLight[index]);
  stroke(colors.sectionHeader[index]);
  strokeWeight(2);
  rect(x, y, width, totalHeight, 10);

  // Header background
  fill(colors.sectionHeader[index]);
  noStroke();
  rect(x, y, width, headerHeight, 10, 10, sec.expanded ? 0 : 10, sec.expanded ? 0 : 10);

  // Expand/collapse arrow
  fill('white');
  textSize(12);
  textAlign(LEFT, CENTER);
  let arrowX = x + 14;
  let arrowY = y + headerHeight / 2;
  if (sec.expanded) {
    text("\u25BC", arrowX, arrowY);
  } else {
    text("\u25B6", arrowX, arrowY);
  }

  // Draw section icon
  drawSectionIcon(sec.icon, x + 42, y + headerHeight / 2, 'white');

  // Section name
  fill('white');
  textSize(15);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(sec.name, x + 70, y + headerHeight / 2);
  textStyle(NORMAL);

  // Impact meter
  let impactWidth = 70;
  let impactHeight = 22;
  let impactX = x + width - impactWidth - 14;
  let impactY = y + (headerHeight - impactHeight) / 2;

  fill(sec.impact === "High" ? colors.impactHigh : colors.impactMedium);
  noStroke();
  rect(impactX, impactY, impactWidth, impactHeight, 4);

  fill('white');
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(sec.impact + " Impact", impactX + impactWidth / 2, impactY + impactHeight / 2);
  textStyle(NORMAL);

  // Item count badge
  let countBadgeX = impactX - 45;
  fill('rgba(255,255,255,0.3)');
  ellipse(countBadgeX, y + headerHeight / 2, 28, 28);
  fill('white');
  textSize(12);
  textStyle(BOLD);
  text(sec.items.length, countBadgeX, y + headerHeight / 2);
  textStyle(NORMAL);

  // Draw items if expanded
  if (sec.expanded) {
    let itemY = y + headerHeight + 7;
    for (let j = 0; j < sec.items.length; j++) {
      drawChecklistItem(index, j, x + 20, itemY, width - 40, itemHeight - 4);
      itemY += itemHeight;
    }
  }

  return y + totalHeight + 6;
}

function drawSectionIcon(icon, x, y, col) {
  stroke(col);
  strokeWeight(1.5);
  noFill();

  switch(icon) {
    case "curtain":
      // Theater curtain icon
      arc(x, y - 4, 16, 10, 0, PI);
      line(x - 8, y - 4, x - 8, y + 6);
      line(x + 8, y - 4, x + 8, y + 6);
      line(x - 6, y + 6, x - 3, y + 4);
      line(x + 6, y + 6, x + 3, y + 4);
      break;
    case "blueprint":
      // Blueprint/document icon
      rect(x - 7, y - 7, 14, 14, 2);
      line(x - 4, y - 3, x + 4, y - 3);
      line(x - 4, y, x + 4, y);
      line(x - 4, y + 3, x + 2, y + 3);
      break;
    case "gear":
      // Gear with boundaries icon
      noFill();
      ellipse(x, y, 12, 12);
      for (let i = 0; i < 6; i++) {
        let angle = i * PI / 3;
        let x1 = x + cos(angle) * 5;
        let y1 = y + sin(angle) * 5;
        let x2 = x + cos(angle) * 8;
        let y2 = y + sin(angle) * 8;
        line(x1, y1, x2, y2);
      }
      break;
    case "template":
      // Template/pattern icon
      rect(x - 7, y - 6, 6, 5);
      rect(x + 1, y - 6, 6, 5);
      rect(x - 7, y + 1, 6, 5);
      rect(x + 1, y + 1, 6, 5);
      break;
    case "package":
      // Package/delivery icon
      rect(x - 7, y - 5, 14, 10, 2);
      line(x - 7, y - 2, x + 7, y - 2);
      line(x - 2, y - 5, x - 2, y - 2);
      line(x + 2, y - 5, x + 2, y - 2);
      break;
  }
}

function drawChecklistItem(secIndex, itemIndex, x, y, width, height) {
  let item = sections[secIndex].items[itemIndex];
  let checkSize = 18;
  let isHovered = hoveredItem &&
                  hoveredItem.secIndex === secIndex &&
                  hoveredItem.itemIndex === itemIndex;

  // Checkmark circle
  fill(colors.checkmark);
  stroke(colors.checkmark);
  strokeWeight(isHovered ? 2 : 1);
  ellipse(x + checkSize / 2, y + height / 2, checkSize, checkSize);

  // Checkmark
  stroke('white');
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(x + 4, y + height / 2);
  vertex(x + 7, y + height / 2 + 4);
  vertex(x + 14, y + height / 2 - 4);
  endShape();

  // Item text
  fill(colors.text);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(item.text, x + checkSize + 12, y + height / 2);

  // Hover hint
  if (isHovered) {
    fill(colors.subtext);
    textSize(10);
    textAlign(RIGHT, CENTER);
    text("hover for tip", x + width, y + height / 2);
  }
}

function drawTooltip() {
  if (!hoveredItem || !sections[hoveredItem.secIndex]) return;

  let item = sections[hoveredItem.secIndex].items[hoveredItem.itemIndex];
  if (!item || !item.tip) return;

  let tipLines = item.tip.split('\n');
  let tipPadding = 10;
  let lineHeight = 16;
  let tipMaxWidth = 340;

  textSize(11);

  // Calculate tooltip dimensions
  let maxLineWidth = 0;
  for (let line of tipLines) {
    maxLineWidth = max(maxLineWidth, textWidth(line));
  }
  let tipWidth = min(maxLineWidth + tipPadding * 2, tipMaxWidth);
  let tipHeight = tipLines.length * lineHeight + tipPadding * 2;

  // Position tooltip
  let tipX = mouseX + 15;
  let tipY = mouseY + 15;

  if (tipX + tipWidth > canvasWidth - margin) {
    tipX = mouseX - tipWidth - 15;
  }
  if (tipY + tipHeight > drawHeight - margin) {
    tipY = mouseY - tipHeight - 15;
  }

  // Draw tooltip background
  fill(colors.tooltipBg);
  noStroke();
  rect(tipX, tipY, tipWidth, tipHeight, 6);

  // Draw tooltip text with color coding
  textAlign(LEFT, TOP);
  let textY = tipY + tipPadding;

  for (let line of tipLines) {
    if (line.startsWith('Good:')) {
      fill(colors.goodExample);
      text('Good:', tipX + tipPadding, textY);
      fill(colors.tooltipText);
      text(line.substring(5), tipX + tipPadding + textWidth('Good:'), textY);
    } else if (line.startsWith('Bad:')) {
      fill(colors.badExample);
      text('Bad:', tipX + tipPadding, textY);
      fill(colors.tooltipText);
      text(line.substring(4), tipX + tipPadding + textWidth('Bad:'), textY);
    } else {
      fill(colors.tooltipText);
      text(line, tipX + tipPadding, textY);
    }
    textY += lineHeight;
  }
}

function drawControlArea() {
  // Instructions
  fill(colors.subtext);
  textSize(12);
  textAlign(LEFT, CENTER);
  noStroke();
  text("Click section headers to expand/collapse", margin + 10, drawHeight + controlHeight / 2);

  textAlign(RIGHT, CENTER);
  text("Hover over items for good/bad examples", canvasWidth - margin - 10, drawHeight + controlHeight / 2);

  // Center legend
  let legendX = canvasWidth / 2;
  let legendY = drawHeight + controlHeight / 2;

  // High impact
  fill(colors.impactHigh);
  noStroke();
  rect(legendX - 90, legendY - 8, 16, 16, 3);
  fill(colors.text);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("High", legendX - 70, legendY);

  // Medium impact
  fill(colors.impactMedium);
  rect(legendX + 10, legendY - 8, 16, 16, 3);
  fill(colors.text);
  text("Medium", legendX + 30, legendY);
}

function mousePressed() {
  // Check section headers
  let yOffset = 60;
  let sectionWidth = canvasWidth - margin * 2;

  for (let i = 0; i < sections.length; i++) {
    let sec = sections[i];
    let headerHeight = 44;
    let itemHeight = 30;

    // Check header click
    if (mouseX >= margin && mouseX <= margin + sectionWidth &&
        mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
      sec.expanded = !sec.expanded;
      return;
    }

    // Update yOffset for next section
    let totalHeight = headerHeight;
    if (sec.expanded) {
      totalHeight += sec.items.length * itemHeight + 14;
    }
    yOffset += totalHeight + 6;

    if (yOffset > drawHeight) break;
  }
}

function mouseMoved() {
  let prevHoveredItem = hoveredItem;
  hoveredSection = -1;
  hoveredItem = null;

  let yOffset = 60;
  let sectionWidth = canvasWidth - margin * 2;

  for (let i = 0; i < sections.length; i++) {
    let sec = sections[i];
    let headerHeight = 44;
    let itemHeight = 30;

    // Check header hover
    if (mouseX >= margin && mouseX <= margin + sectionWidth &&
        mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
      hoveredSection = i;
      cursor(HAND);
      if (!prevHoveredItem || prevHoveredItem.secIndex !== i) {
        tooltipTimer = 0;
        showTooltip = false;
      }
      return;
    }

    // Check item hovers
    if (sec.expanded) {
      let itemY = yOffset + headerHeight + 7;
      for (let j = 0; j < sec.items.length; j++) {
        let itemX = margin + 20;
        let itemWidth = sectionWidth - 40;
        let itemTop = itemY;
        let itemBottom = itemY + itemHeight - 4;

        if (mouseX >= itemX && mouseX <= itemX + itemWidth &&
            mouseY >= itemTop && mouseY <= itemBottom) {
          hoveredItem = { secIndex: i, itemIndex: j };
          cursor(ARROW);
          if (!prevHoveredItem ||
              prevHoveredItem.secIndex !== i ||
              prevHoveredItem.itemIndex !== j) {
            tooltipTimer = 0;
            showTooltip = false;
          }
          return;
        }
        itemY += itemHeight;
      }
    }

    // Update yOffset for next section
    let totalHeight = headerHeight;
    if (sec.expanded) {
      totalHeight += sec.items.length * itemHeight + 14;
    }
    yOffset += totalHeight + 6;

    if (yOffset > drawHeight) break;
  }

  cursor(ARROW);
  if (prevHoveredItem) {
    tooltipTimer = 0;
    showTooltip = false;
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
