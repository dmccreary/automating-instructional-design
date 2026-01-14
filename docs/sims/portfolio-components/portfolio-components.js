// Portfolio Components MicroSim
// Hub-and-spoke diagram showing eight portfolio components radiating from center
// Hover for details, click to highlight dependency paths

let canvasWidth = 400;
let canvasHeight = 500;
let drawHeight = 450;
let controlHeight = 50;

// Component data
let components = [];
let hoveredComponent = -1;
let selectedComponent = -1;

// Colors based on phases
let colors = {
  design: null,       // Blue #3B82F6
  implementation: null, // Green #10B981
  evaluation: null,   // Orange #F59E0B
  documentation: null, // Purple #8B5CF6
  center: null,       // Gradient/special
  bg: null,
  text: null
};

// Component definitions with phase colors and dependencies
let componentData = [
  {
    id: 0,
    name: "Learning Objective\nAnalysis",
    shortName: "Analysis",
    phase: "design",
    icon: "magnifier",
    elements: ["Bloom's level", "Decomposition", "Readiness"],
    desc: "Define clear learning objectives using Bloom's taxonomy and analyze prerequisite knowledge",
    dependsOn: [],
    leadsTo: [1]
  },
  {
    id: 1,
    name: "MicroSim\nSpecification",
    shortName: "Specification",
    phase: "design",
    icon: "blueprint",
    elements: ["Visual mockup", "Interactions", "Accessibility"],
    desc: "Create detailed specifications including wireframes, interaction patterns, and accessibility requirements",
    dependsOn: [0],
    leadsTo: [2]
  },
  {
    id: 2,
    name: "Working\nMicroSim",
    shortName: "MicroSim",
    phase: "implementation",
    icon: "play",
    elements: ["Functional", "Responsive", "Accessible"],
    desc: "Implement a fully functional, responsive, and accessible interactive simulation",
    dependsOn: [1],
    leadsTo: [3, 4]
  },
  {
    id: 3,
    name: "Evaluation\nRubric",
    shortName: "Rubric",
    phase: "evaluation",
    icon: "checklist",
    elements: ["Technical", "Pedagogical", "UX criteria"],
    desc: "Develop comprehensive evaluation criteria covering technical quality, learning effectiveness, and user experience",
    dependsOn: [2],
    leadsTo: [4]
  },
  {
    id: 4,
    name: "User Testing\nReport",
    shortName: "Testing",
    phase: "evaluation",
    icon: "people",
    elements: ["Methodology", "Findings", "Changes"],
    desc: "Conduct user testing with learners and document methodology, findings, and recommended changes",
    dependsOn: [2, 3],
    leadsTo: [5]
  },
  {
    id: 5,
    name: "Iteration\nLog",
    shortName: "Iteration",
    phase: "evaluation",
    icon: "branches",
    elements: ["Versions", "Rationale", "Comparisons"],
    desc: "Document the evolution of your MicroSim through multiple versions with rationale for changes",
    dependsOn: [4],
    leadsTo: [2]  // Feeds back to working MicroSim
  },
  {
    id: 6,
    name: "Accessibility\nAudit",
    shortName: "Accessibility",
    phase: "documentation",
    icon: "universal",
    elements: ["Tests", "Results", "Fixes"],
    desc: "Perform comprehensive accessibility testing and document results with implemented fixes",
    dependsOn: [2],
    leadsTo: [7]
  },
  {
    id: 7,
    name: "Deployment\nDocumentation",
    shortName: "Deployment",
    phase: "documentation",
    icon: "cloud",
    elements: ["Platform", "Integration", "Maintenance"],
    desc: "Document deployment platform, integration steps, and ongoing maintenance procedures",
    dependsOn: [6],
    leadsTo: []
  }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.clientWidth;
  } else {
    canvasWidth = min(windowWidth - 40, 700);
  }
  canvasWidth = min(canvasWidth, 700);
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const containerEl = document.querySelector('main');
  if (containerEl) {
    canvas.parent(containerEl);
  }

  // Define colors
  colors.design = color(59, 130, 246);       // Blue #3B82F6
  colors.implementation = color(16, 185, 129); // Green #10B981
  colors.evaluation = color(245, 158, 11);    // Orange #F59E0B
  colors.documentation = color(139, 92, 246); // Purple #8B5CF6
  colors.center = color(99, 102, 241);        // Indigo for center
  colors.bg = color(248, 250, 252);           // Light background
  colors.text = color(30, 41, 59);            // Dark text

  // Calculate positions in a circle (8 components)
  calculatePositions();

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function calculatePositions() {
  components = [];
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let radius = min(canvasWidth, drawHeight) / 2 - 90;

  for (let i = 0; i < 8; i++) {
    // Start from top and go clockwise
    let angle = -PI / 2 + (TWO_PI / 8) * i;
    components.push({
      ...componentData[i],
      x: centerX + cos(angle) * radius,
      y: centerY + sin(angle) * radius,
      angle: angle
    });
  }
}

function draw() {
  background(colors.bg);

  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;

  // Recalculate positions on resize
  calculatePositions();

  // Draw title
  fill(colors.text);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Portfolio Project Components", centerX, 25);

  // Draw dependency connections first (behind nodes)
  drawConnections(centerX, centerY);

  // Draw center hub
  drawCenter(centerX, centerY);

  // Draw component nodes
  for (let i = 0; i < components.length; i++) {
    drawComponent(components[i], i === hoveredComponent, i === selectedComponent);
  }

  // Draw legend
  drawLegend();

  // Draw info panel at bottom
  drawInfoPanel();
}

function drawConnections(cx, cy) {
  // Draw lines from center to each component
  for (let comp of components) {
    let col = getPhaseColor(comp.phase);

    // Highlight if this component is selected or in dependency path
    let isHighlighted = selectedComponent >= 0 &&
      (comp.id === selectedComponent ||
       isInDependencyPath(comp.id, selectedComponent));

    stroke(isHighlighted ? col : color(200));
    strokeWeight(isHighlighted ? 3 : 1.5);

    // Draw line from center to component
    line(cx, cy, comp.x, comp.y);
  }

  // Draw dependency arrows between components
  if (selectedComponent >= 0) {
    let selected = components[selectedComponent];
    let col = getPhaseColor(selected.phase);

    // Draw arrows showing dependencies
    stroke(col);
    strokeWeight(2);

    // Show what this depends on
    for (let depId of selected.dependsOn) {
      drawDependencyArrow(components[depId], selected, color(150, 150, 150));
    }

    // Show what this leads to
    for (let leadId of selected.leadsTo) {
      drawDependencyArrow(selected, components[leadId], col);
    }
  }
}

function drawDependencyArrow(from, to, col) {
  stroke(col);
  strokeWeight(2);

  // Calculate points offset from center of nodes
  let angle = atan2(to.y - from.y, to.x - from.x);
  let startX = from.x + cos(angle) * 35;
  let startY = from.y + sin(angle) * 35;
  let endX = to.x - cos(angle) * 40;
  let endY = to.y - sin(angle) * 40;

  // Draw curved line
  noFill();
  let midX = (startX + endX) / 2;
  let midY = (startY + endY) / 2;
  let perpAngle = angle + PI / 2;
  let offset = 20;
  let ctrlX = midX + cos(perpAngle) * offset;
  let ctrlY = midY + sin(perpAngle) * offset;

  beginShape();
  vertex(startX, startY);
  quadraticVertex(ctrlX, ctrlY, endX, endY);
  endShape();

  // Draw arrowhead
  push();
  translate(endX, endY);
  let arrowAngle = atan2(endY - ctrlY, endX - ctrlX);
  rotate(arrowAngle);
  fill(col);
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function isInDependencyPath(compId, selectedId) {
  let selected = componentData[selectedId];
  return selected.dependsOn.includes(compId) || selected.leadsTo.includes(compId);
}

function drawCenter(cx, cy) {
  // Outer glow
  noStroke();
  for (let i = 5; i > 0; i--) {
    fill(99, 102, 241, 25);
    ellipse(cx, cy, 100 + i * 10, 100 + i * 10);
  }

  // Main circle with gradient effect
  fill(colors.center);
  stroke(255);
  strokeWeight(3);
  ellipse(cx, cy, 100, 100);

  // Icon - graduation cap
  fill(255);
  noStroke();

  // Cap top
  beginShape();
  vertex(cx - 25, cy - 5);
  vertex(cx, cy - 18);
  vertex(cx + 25, cy - 5);
  vertex(cx, cy + 2);
  endShape(CLOSE);

  // Cap base
  rect(cx - 18, cy, 36, 8, 2);

  // Tassel
  stroke(255);
  strokeWeight(2);
  line(cx + 20, cy - 3, cx + 25, cy + 10);
  noStroke();
  ellipse(cx + 25, cy + 12, 6, 6);

  // Text
  fill(255);
  textSize(10);
  textStyle(BOLD);
  text("Portfolio", cx, cy + 25);
  text("Project", cx, cy + 36);
}

function drawComponent(comp, isHovered, isSelected) {
  let col = getPhaseColor(comp.phase);
  let nodeSize = (isHovered || isSelected) ? 70 : 60;

  // Glow effect when hovered or selected
  noStroke();
  if (isHovered || isSelected) {
    for (let i = 4; i > 0; i--) {
      fill(red(col), green(col), blue(col), 35);
      ellipse(comp.x, comp.y, nodeSize + i * 12, nodeSize + i * 12);
    }
  }

  // Main node
  fill(col);
  stroke(255);
  strokeWeight(3);
  ellipse(comp.x, comp.y, nodeSize, nodeSize);

  // Draw icon
  drawIcon(comp.x, comp.y - 8, comp.icon, isHovered || isSelected);

  // Component short name
  fill(255);
  noStroke();
  textSize((isHovered || isSelected) ? 10 : 9);
  textStyle(BOLD);
  text(comp.shortName, comp.x, comp.y + 15);
}

function drawIcon(x, y, icon, large) {
  let size = large ? 18 : 14;
  fill(255);
  noStroke();

  switch(icon) {
    case "magnifier":
      // Magnifying glass
      noFill();
      stroke(255);
      strokeWeight(2);
      ellipse(x - 2, y - 2, size * 0.7, size * 0.7);
      line(x + 3, y + 3, x + 7, y + 7);
      break;

    case "blueprint":
      // Blueprint/wireframe
      stroke(255);
      strokeWeight(1.5);
      noFill();
      rect(x - size/2, y - size/2, size, size * 0.8, 2);
      line(x - size/3, y - 2, x + size/3, y - 2);
      line(x - size/3, y + 3, x + size/4, y + 3);
      break;

    case "play":
      // Play button
      fill(255);
      noStroke();
      triangle(x - 4, y - 6, x - 4, y + 6, x + 6, y);
      break;

    case "checklist":
      // Checklist with checks
      stroke(255);
      strokeWeight(1.5);
      noFill();
      for (let i = 0; i < 3; i++) {
        let yOff = y - 5 + i * 5;
        rect(x - 6, yOff, 4, 4);
        line(x + 1, yOff + 2, x + 7, yOff + 2);
      }
      break;

    case "people":
      // People with speech bubbles
      noStroke();
      fill(255);
      ellipse(x - 5, y - 2, 8, 8);
      ellipse(x + 5, y - 2, 8, 8);
      // Speech bubbles
      ellipse(x - 8, y - 10, 6, 4);
      ellipse(x + 8, y - 10, 6, 4);
      break;

    case "branches":
      // Version branches
      stroke(255);
      strokeWeight(2);
      noFill();
      line(x - 6, y + 6, x - 6, y - 6);
      line(x - 6, y - 2, x + 2, y - 6);
      line(x + 2, y - 6, x + 2, y + 2);
      ellipse(x - 6, y + 6, 4, 4);
      ellipse(x + 2, y + 2, 4, 4);
      break;

    case "universal":
      // Universal access symbol
      noFill();
      stroke(255);
      strokeWeight(2);
      ellipse(x, y, size, size);
      // Person in circle
      fill(255);
      noStroke();
      ellipse(x, y - 3, 5, 5);
      rect(x - 2, y + 1, 4, 6, 1);
      break;

    case "cloud":
      // Cloud with arrow
      noStroke();
      fill(255);
      ellipse(x - 4, y, 10, 8);
      ellipse(x + 3, y - 1, 12, 10);
      ellipse(x + 8, y + 1, 8, 6);
      // Upload arrow
      fill(getPhaseColor("documentation"));
      triangle(x + 2, y + 8, x - 2, y + 12, x + 6, y + 12);
      break;
  }
}

function getPhaseColor(phase) {
  switch(phase) {
    case "design": return colors.design;
    case "implementation": return colors.implementation;
    case "evaluation": return colors.evaluation;
    case "documentation": return colors.documentation;
    default: return colors.text;
  }
}

function drawLegend() {
  let legendY = drawHeight + 15;
  let startX = 40;
  let spacing = canvasWidth / 4.5;

  textSize(10);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);

  let phases = [
    { name: "Design", color: colors.design },
    { name: "Implementation", color: colors.implementation },
    { name: "Evaluation", color: colors.evaluation },
    { name: "Documentation", color: colors.documentation }
  ];

  for (let i = 0; i < phases.length; i++) {
    let x = startX + i * spacing;
    fill(phases[i].color);
    noStroke();
    ellipse(x, legendY, 14, 14);
    fill(colors.text);
    text(phases[i].name, x + 12, legendY);
  }

  textAlign(CENTER, CENTER);
}

function drawInfoPanel() {
  let panelY = drawHeight + 30;
  let panelHeight = 18;

  if (hoveredComponent >= 0 || selectedComponent >= 0) {
    let comp = components[hoveredComponent >= 0 ? hoveredComponent : selectedComponent];
    let col = getPhaseColor(comp.phase);

    // Description text
    fill(colors.text);
    noStroke();
    textSize(11);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);

    // Show key elements
    let elementsText = comp.elements.join(" | ");
    text(elementsText, canvasWidth / 2, panelY + 8);
  } else {
    fill(color(150));
    textSize(11);
    textStyle(ITALIC);
    text("Hover over components for details | Click to show dependencies", canvasWidth / 2, panelY + 8);
  }
}

function mouseMoved() {
  hoveredComponent = -1;

  for (let i = 0; i < components.length; i++) {
    let d = dist(mouseX, mouseY, components[i].x, components[i].y);
    if (d < 35) {
      hoveredComponent = i;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
}

function mousePressed() {
  // Check if clicking on a component
  for (let i = 0; i < components.length; i++) {
    let d = dist(mouseX, mouseY, components[i].x, components[i].y);
    if (d < 35) {
      // Toggle selection
      if (selectedComponent === i) {
        selectedComponent = -1;
      } else {
        selectedComponent = i;
      }
      return;
    }
  }
  // Click elsewhere to deselect
  selectedComponent = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculatePositions();
}
