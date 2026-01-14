// Process Timeline Interactive MicroSim
// Interactive process timeline showing steps in a workflow
// Click steps to highlight and show details, navigate with buttons

// Canvas dimensions
let canvasWidth = 600;
let canvasHeight = 350;
let margin = 20;

// Control panel dimensions
let controlPanelHeight = 50;
let drawingHeight;

// Timeline properties
let nodeRadius = 30;
let currentStep = 0;

// Process steps data
const processSteps = [
  {
    id: 0,
    name: "Define\nObjectives",
    shortName: "Objectives",
    description: "Identify clear learning objectives using SMART criteria. Define what students should know, understand, or be able to do after the lesson.",
    color: '#4CAF50'
  },
  {
    id: 1,
    name: "Analyze\nLearners",
    shortName: "Learners",
    description: "Assess learner characteristics including prior knowledge, learning styles, motivation, and any special needs or accommodations.",
    color: '#2196F3'
  },
  {
    id: 2,
    name: "Design\nContent",
    shortName: "Content",
    description: "Create instructional content structure, sequence topics logically, and select appropriate teaching strategies and media.",
    color: '#9C27B0'
  },
  {
    id: 3,
    name: "Develop\nMaterials",
    shortName: "Materials",
    description: "Build learning materials including presentations, activities, assessments, and interactive simulations (MicroSims).",
    color: '#FF9800'
  },
  {
    id: 4,
    name: "Implement\nInstruction",
    shortName: "Implement",
    description: "Deliver the instruction to learners, facilitate activities, and provide guidance and support throughout the learning process.",
    color: '#F44336'
  },
  {
    id: 5,
    name: "Evaluate\nOutcomes",
    shortName: "Evaluate",
    description: "Assess learner achievement, gather feedback, measure effectiveness against objectives, and identify areas for improvement.",
    color: '#00BCD4'
  },
  {
    id: 6,
    name: "Revise &\nIterate",
    shortName: "Revise",
    description: "Analyze evaluation data, make improvements to content and delivery, and continuously refine the instructional design.",
    color: '#795548'
  }
];

// Colors
const colors = {
  background: '#F5F5F5',
  timeline: '#BDBDBD',
  timelineActive: '#4CAF50',
  nodeDefault: '#E0E0E0',
  nodeSelected: '#4CAF50',
  nodeCurrent: '#2196F3',
  nodeCompleted: '#4CAF50',
  text: '#333333',
  textLight: '#FFFFFF',
  arrow: '#757575',
  detailsBg: '#FFFFFF',
  detailsBorder: '#E0E0E0',
  buttonBg: '#2196F3',
  buttonHover: '#1976D2',
  buttonDisabled: '#BDBDBD'
};

// UI state
let hoveredStep = -1;
let selectedStep = 0;

// Button dimensions
let btnWidth = 80;
let btnHeight = 32;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  drawingHeight = canvasHeight - controlPanelHeight;

  textFont('Arial');

  describe('Interactive process timeline showing 7 instructional design steps. Click steps to view details, use Previous/Next buttons to navigate through the workflow.', LABEL);
}

function draw() {
  updateCanvasSize();
  background(colors.background);

  drawingHeight = canvasHeight - controlPanelHeight;

  // Draw control panel
  drawControlPanel();

  // Draw timeline
  drawTimeline();

  // Draw step nodes
  drawNodes();

  // Draw arrows between nodes
  drawArrows();

  // Draw details panel
  drawDetailsPanel();

  // Draw navigation buttons
  drawNavigationButtons();
}

function drawControlPanel() {
  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(0, 0, canvasWidth, controlPanelHeight);

  // Title
  fill(50);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  textStyle(BOLD);
  text("Process Timeline", margin, controlPanelHeight / 2);
  textStyle(NORMAL);

  // Step counter
  fill(100);
  textAlign(RIGHT, CENTER);
  textSize(12);
  text(`Step ${selectedStep + 1} of ${processSteps.length}`, canvasWidth - margin, controlPanelHeight / 2);
}

function drawTimeline() {
  let timelineY = controlPanelHeight + 60;
  let startX = margin + nodeRadius + 10;
  let endX = canvasWidth - margin - nodeRadius - 10;

  // Draw main timeline line
  stroke(colors.timeline);
  strokeWeight(4);
  line(startX, timelineY, endX, timelineY);

  // Draw completed portion
  if (currentStep > 0) {
    let nodeSpacing = (endX - startX) / (processSteps.length - 1);
    let completedX = startX + nodeSpacing * currentStep;
    stroke(colors.timelineActive);
    strokeWeight(4);
    line(startX, timelineY, completedX, timelineY);
  }
}

function drawNodes() {
  let timelineY = controlPanelHeight + 60;
  let startX = margin + nodeRadius + 10;
  let endX = canvasWidth - margin - nodeRadius - 10;
  let nodeSpacing = (endX - startX) / (processSteps.length - 1);

  hoveredStep = -1;

  for (let i = 0; i < processSteps.length; i++) {
    let step = processSteps[i];
    let x = startX + nodeSpacing * i;
    let y = timelineY;

    // Check hover
    let d = dist(mouseX, mouseY, x, y);
    if (d < nodeRadius) {
      hoveredStep = i;
    }

    // Determine node color
    let nodeColor;
    let isCompleted = i < currentStep;
    let isCurrent = i === currentStep;
    let isSelected = i === selectedStep;

    if (isSelected) {
      nodeColor = step.color;
    } else if (isCompleted) {
      nodeColor = colors.nodeCompleted;
    } else if (isCurrent) {
      nodeColor = colors.nodeCurrent;
    } else {
      nodeColor = colors.nodeDefault;
    }

    // Draw node shadow
    noStroke();
    fill(0, 30);
    ellipse(x + 2, y + 2, nodeRadius * 2, nodeRadius * 2);

    // Draw node
    fill(nodeColor);
    if (isSelected || hoveredStep === i) {
      stroke(50);
      strokeWeight(3);
    } else {
      stroke(150);
      strokeWeight(1);
    }
    ellipse(x, y, nodeRadius * 2, nodeRadius * 2);

    // Draw step number
    fill(isSelected || isCompleted || isCurrent ? colors.textLight : colors.text);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(i + 1, x, y);
    textStyle(NORMAL);

    // Draw label below
    fill(colors.text);
    textSize(10);
    textAlign(CENTER, TOP);
    text(step.shortName, x, y + nodeRadius + 8);
  }

  // Update cursor
  if (hoveredStep >= 0) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawArrows() {
  let timelineY = controlPanelHeight + 60;
  let startX = margin + nodeRadius + 10;
  let endX = canvasWidth - margin - nodeRadius - 10;
  let nodeSpacing = (endX - startX) / (processSteps.length - 1);

  for (let i = 0; i < processSteps.length - 1; i++) {
    let x1 = startX + nodeSpacing * i + nodeRadius + 5;
    let x2 = startX + nodeSpacing * (i + 1) - nodeRadius - 10;
    let y = timelineY;

    // Only draw arrow if there's enough space
    if (x2 - x1 > 15) {
      let midX = (x1 + x2) / 2;

      // Arrow color based on completion
      let arrowColor = i < currentStep ? colors.timelineActive : colors.arrow;

      stroke(arrowColor);
      strokeWeight(2);
      fill(arrowColor);

      // Arrow head
      push();
      translate(x2, y);
      triangle(0, 0, -8, -4, -8, 4);
      pop();
    }
  }
}

function drawDetailsPanel() {
  let panelY = controlPanelHeight + 130;
  let panelHeight = canvasHeight - panelY - 60;
  let panelWidth = canvasWidth - 2 * margin;

  // Panel background
  fill(colors.detailsBg);
  stroke(colors.detailsBorder);
  strokeWeight(1);
  rect(margin, panelY, panelWidth, panelHeight, 8);

  // Step indicator bar
  let step = processSteps[selectedStep];
  noStroke();
  fill(step.color);
  rect(margin, panelY, 6, panelHeight, 8, 0, 0, 8);

  // Step title
  fill(step.color);
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  let titleLines = step.name.split('\n');
  text(titleLines.join(' '), margin + 16, panelY + 10);
  textStyle(NORMAL);

  // Step description
  fill(colors.text);
  textSize(12);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  text(step.description, margin + 16, panelY + 32, panelWidth - 32, panelHeight - 45);
}

function drawNavigationButtons() {
  let btnY = canvasHeight - 45;
  let prevBtnX = margin;
  let nextBtnX = canvasWidth - margin - btnWidth;

  // Previous button
  let prevEnabled = selectedStep > 0;
  let prevHover = mouseX >= prevBtnX && mouseX <= prevBtnX + btnWidth &&
                  mouseY >= btnY && mouseY <= btnY + btnHeight;

  fill(prevEnabled ? (prevHover ? colors.buttonHover : colors.buttonBg) : colors.buttonDisabled);
  noStroke();
  rect(prevBtnX, btnY, btnWidth, btnHeight, 5);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text("Previous", prevBtnX + btnWidth/2, btnY + btnHeight/2);

  // Next button
  let nextEnabled = selectedStep < processSteps.length - 1;
  let nextHover = mouseX >= nextBtnX && mouseX <= nextBtnX + btnWidth &&
                  mouseY >= btnY && mouseY <= btnY + btnHeight;

  fill(nextEnabled ? (nextHover ? colors.buttonHover : colors.buttonBg) : colors.buttonDisabled);
  noStroke();
  rect(nextBtnX, btnY, btnWidth, btnHeight, 5);

  fill(255);
  textAlign(CENTER, CENTER);
  text("Next", nextBtnX + btnWidth/2, btnY + btnHeight/2);
  textStyle(NORMAL);

  // Progress indicator dots
  let dotsY = btnY + btnHeight/2;
  let dotsStartX = canvasWidth/2 - (processSteps.length * 12)/2;

  for (let i = 0; i < processSteps.length; i++) {
    if (i === selectedStep) {
      fill(processSteps[i].color);
    } else if (i < currentStep) {
      fill(colors.nodeCompleted);
    } else {
      fill(colors.nodeDefault);
    }
    noStroke();
    ellipse(dotsStartX + i * 12, dotsY, 8, 8);
  }
}

function mousePressed() {
  let timelineY = controlPanelHeight + 60;
  let startX = margin + nodeRadius + 10;
  let endX = canvasWidth - margin - nodeRadius - 10;
  let nodeSpacing = (endX - startX) / (processSteps.length - 1);

  // Check if clicking on a node
  for (let i = 0; i < processSteps.length; i++) {
    let x = startX + nodeSpacing * i;
    let y = timelineY;
    let d = dist(mouseX, mouseY, x, y);

    if (d < nodeRadius) {
      selectedStep = i;
      // Update current step if clicking ahead
      if (i > currentStep) {
        currentStep = i;
      }
      return;
    }
  }

  // Check navigation buttons
  let btnY = canvasHeight - 45;
  let prevBtnX = margin;
  let nextBtnX = canvasWidth - margin - btnWidth;

  // Previous button
  if (selectedStep > 0 &&
      mouseX >= prevBtnX && mouseX <= prevBtnX + btnWidth &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    selectedStep--;
    return;
  }

  // Next button
  if (selectedStep < processSteps.length - 1 &&
      mouseX >= nextBtnX && mouseX <= nextBtnX + btnWidth &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    selectedStep++;
    if (selectedStep > currentStep) {
      currentStep = selectedStep;
    }
    return;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && selectedStep > 0) {
    selectedStep--;
  } else if (keyCode === RIGHT_ARROW && selectedStep < processSteps.length - 1) {
    selectedStep++;
    if (selectedStep > currentStep) {
      currentStep = selectedStep;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  drawingHeight = canvasHeight - controlPanelHeight;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
