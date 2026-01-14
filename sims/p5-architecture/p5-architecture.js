// p5.js MicroSim Architecture Diagram
// Shows the standard structure of a p5.js MicroSim with its distinct regions

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation variables
let pulsePhase = 0;
let pulseSpeed = 0.02;

// Hover state
let hoveredElement = null;

// Colors
let drawRegionColor, controlRegionColor, containerColor, canvasOutlineColor;
let textColor, annotationColor, highlightColor;

// Element definitions for interactive hover
let elements = [];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth - 40, 550);
  } else {
    canvasWidth = Math.min(windowWidth - 40, 550);
  }
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);

  // Attach to main element if available
  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  // Define colors
  drawRegionColor = color(240, 248, 255);     // aliceblue
  controlRegionColor = color(255, 255, 255);  // white
  containerColor = color(230, 230, 230);      // light gray for container
  canvasOutlineColor = color(192, 192, 192);  // silver
  textColor = color(30, 41, 59);              // dark slate
  annotationColor = color(59, 130, 246);      // blue
  highlightColor = color(251, 191, 36);       // amber

  textAlign(CENTER, CENTER);
  textFont('Arial');

  defineElements();
}

function defineElements() {
  let diagramLeft = margin + 30;
  let diagramWidth = canvasWidth - 2 * margin - 60;
  let browserTop = 50;
  let browserHeight = 300;

  elements = [
    {
      name: "Browser Window",
      x: diagramLeft,
      y: browserTop,
      w: diagramWidth,
      h: 30,
      info: "The browser window that hosts the HTML page containing the MicroSim"
    },
    {
      name: "Container",
      x: diagramLeft + 10,
      y: browserTop + 40,
      w: diagramWidth - 20,
      h: browserHeight - 50,
      info: "HTML container element (main or div) that holds the p5.js canvas. Canvas width adapts to container.offsetWidth"
    },
    {
      name: "Draw Region",
      x: diagramLeft + 20,
      y: browserTop + 55,
      w: diagramWidth - 40,
      h: 150,
      info: "Top area for visualization (aliceblue background). Height is fixed (drawHeight = 400). Contains animated graphics and visual elements"
    },
    {
      name: "Control Region",
      x: diagramLeft + 20,
      y: browserTop + 215,
      w: diagramWidth - 40,
      h: 55,
      info: "Bottom area for UI controls (white background). Height is fixed (controlHeight = 50). Contains sliders, buttons, and labels"
    },
    {
      name: "Slider",
      x: diagramLeft + 50,
      y: browserTop + 235,
      w: 100,
      h: 20,
      info: "p5.js slider element created with createSlider(). Positioned in control region with slider.position(x, y)"
    },
    {
      name: "Label",
      x: diagramLeft + 180,
      y: browserTop + 235,
      w: 60,
      h: 20,
      info: "Text labels drawn with text() function to describe slider values and provide user guidance"
    }
  ];
}

function draw() {
  background(248, 250, 252);

  // Update animation
  pulsePhase = (pulsePhase + pulseSpeed) % TWO_PI;

  // Check hover state
  checkHover();

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("p5.js MicroSim Architecture", canvasWidth / 2, 25);

  // Draw the architecture diagram
  drawArchitectureDiagram();

  // Draw annotations
  drawAnnotations();

  // Draw hover info if applicable
  if (hoveredElement) {
    drawHoverInfo();
  }

  // Draw instruction
  fill(textColor);
  textSize(11);
  textStyle(ITALIC);
  text("Hover over components for details", canvasWidth / 2, drawHeight + 25);
}

function drawArchitectureDiagram() {
  let diagramLeft = margin + 30;
  let diagramWidth = canvasWidth - 2 * margin - 60;
  let browserTop = 50;
  let browserHeight = 300;

  // Browser window frame
  fill(100, 100, 100);
  stroke(60, 60, 60);
  strokeWeight(2);
  rect(diagramLeft, browserTop, diagramWidth, 30, 8, 8, 0, 0);

  // Browser buttons (traffic lights)
  noStroke();
  fill(255, 95, 86);
  ellipse(diagramLeft + 15, browserTop + 15, 10, 10);
  fill(255, 189, 46);
  ellipse(diagramLeft + 30, browserTop + 15, 10, 10);
  fill(39, 201, 63);
  ellipse(diagramLeft + 45, browserTop + 15, 10, 10);

  // Browser title bar text
  fill(255);
  textSize(10);
  textStyle(NORMAL);
  text("main.html", diagramLeft + diagramWidth / 2, browserTop + 15);

  // Main container (gray background)
  fill(containerColor);
  stroke(150);
  strokeWeight(1);
  rect(diagramLeft + 10, browserTop + 40, diagramWidth - 20, browserHeight - 50, 4);

  // Container label
  fill(80);
  noStroke();
  textSize(9);
  text("Container (main)", diagramLeft + diagramWidth / 2, browserTop + 50);

  // Canvas outline
  let canvasLeft = diagramLeft + 20;
  let canvasTop = browserTop + 55;
  let canvasDisplayWidth = diagramWidth - 40;
  let canvasDisplayHeight = 210;

  stroke(canvasOutlineColor);
  strokeWeight(2);
  noFill();
  rect(canvasLeft, canvasTop, canvasDisplayWidth, canvasDisplayHeight, 2);

  // Draw region (aliceblue)
  let drawRegionHeight = 150;
  let isDrawHovered = hoveredElement && hoveredElement.name === "Draw Region";

  if (isDrawHovered) {
    fill(220, 238, 255);
    stroke(annotationColor);
    strokeWeight(3);
  } else {
    fill(drawRegionColor);
    stroke(canvasOutlineColor);
    strokeWeight(1);
  }
  rect(canvasLeft + 1, canvasTop + 1, canvasDisplayWidth - 2, drawRegionHeight - 1);

  // Draw region label
  fill(textColor);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  text("Draw Region", canvasLeft + canvasDisplayWidth / 2, canvasTop + 40);

  textSize(10);
  textStyle(NORMAL);
  fill(100);
  text("(aliceblue background)", canvasLeft + canvasDisplayWidth / 2, canvasTop + 58);

  // Animated visual element in draw region
  let pulseSize = 30 + sin(pulsePhase) * 5;
  fill(59, 130, 246, 150);
  noStroke();
  ellipse(canvasLeft + canvasDisplayWidth / 2, canvasTop + 100, pulseSize, pulseSize);

  // Draw height annotation arrow
  drawDimensionArrow(canvasLeft - 15, canvasTop, canvasLeft - 15, canvasTop + drawRegionHeight, "drawHeight");

  // Control region (white)
  let controlTop = canvasTop + drawRegionHeight;
  let controlDisplayHeight = 60;
  let isControlHovered = hoveredElement && hoveredElement.name === "Control Region";

  if (isControlHovered) {
    fill(245, 245, 255);
    stroke(annotationColor);
    strokeWeight(3);
  } else {
    fill(controlRegionColor);
    stroke(canvasOutlineColor);
    strokeWeight(1);
  }
  rect(canvasLeft + 1, controlTop, canvasDisplayWidth - 2, controlDisplayHeight - 1);

  // Control region label
  fill(textColor);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  text("Control Region", canvasLeft + canvasDisplayWidth / 2, controlTop + 15);

  textSize(10);
  textStyle(NORMAL);
  fill(100);
  text("(white background)", canvasLeft + canvasDisplayWidth / 2, controlTop + 30);

  // Draw sample slider in control region
  let sliderY = controlTop + 45;
  let sliderX = canvasLeft + 30;
  let sliderWidth = 80;

  // Slider track
  stroke(180);
  strokeWeight(4);
  line(sliderX, sliderY, sliderX + sliderWidth, sliderY);

  // Slider thumb
  fill(59, 130, 246);
  noStroke();
  ellipse(sliderX + sliderWidth * 0.6, sliderY, 14, 14);

  // Slider label
  fill(textColor);
  textSize(10);
  text("Speed: 5", sliderX + sliderWidth + 40, sliderY);

  // Control height annotation arrow
  drawDimensionArrow(canvasLeft - 15, controlTop, canvasLeft - 15, controlTop + controlDisplayHeight, "controlHeight");

  // Canvas width annotation
  let widthY = canvasTop + canvasDisplayHeight + 15;
  stroke(annotationColor);
  strokeWeight(1);
  line(canvasLeft, widthY, canvasLeft + canvasDisplayWidth, widthY);

  // Width arrowheads
  fill(annotationColor);
  noStroke();
  triangle(canvasLeft, widthY, canvasLeft + 8, widthY - 4, canvasLeft + 8, widthY + 4);
  triangle(canvasLeft + canvasDisplayWidth, widthY, canvasLeft + canvasDisplayWidth - 8, widthY - 4, canvasLeft + canvasDisplayWidth - 8, widthY + 4);

  // Width label
  fill(annotationColor);
  textSize(9);
  textStyle(BOLD);
  text("canvasWidth", canvasLeft + canvasDisplayWidth / 2, widthY + 12);
}

function drawDimensionArrow(x, y1, y2, label) {
  // Vertical line
  stroke(annotationColor);
  strokeWeight(1);
  line(x, y1, x, y2);

  // Top arrowhead
  fill(annotationColor);
  noStroke();
  triangle(x, y1, x - 4, y1 + 8, x + 4, y1 + 8);

  // Bottom arrowhead
  triangle(x, y2, x - 4, y2 - 8, x + 4, y2 - 8);

  // Label (rotated)
  push();
  translate(x - 12, (y1 + y2) / 2);
  rotate(-HALF_PI);
  fill(annotationColor);
  textSize(9);
  textStyle(BOLD);
  text(label, 0, 0);
  pop();
}

function drawAnnotations() {
  let rightEdge = canvasWidth - margin - 10;
  let noteY = 70;

  // Annotation box
  fill(255, 250, 230);
  stroke(highlightColor);
  strokeWeight(2);
  rectMode(CORNER);
  rect(rightEdge - 100, noteY, 105, 90, 6);

  // Annotation text
  fill(textColor);
  noStroke();
  textSize(9);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Key Points:", rightEdge - 95, noteY + 8);

  textStyle(NORMAL);
  textSize(8);
  let lineHeight = 12;
  text("- Fixed heights", rightEdge - 95, noteY + 24);
  text("- Variable width", rightEdge - 95, noteY + 24 + lineHeight);
  text("- updateCanvasSize()", rightEdge - 95, noteY + 24 + lineHeight * 2);
  text("  called in setup()", rightEdge - 95, noteY + 24 + lineHeight * 3);
  text("- Responsive design", rightEdge - 95, noteY + 24 + lineHeight * 4);

  textAlign(CENTER, CENTER);

  // Code snippet box
  let codeY = 175;
  fill(40, 44, 52);
  stroke(60, 64, 72);
  strokeWeight(1);
  rectMode(CORNER);
  rect(rightEdge - 100, codeY, 105, 55, 6);

  // Code text
  fill(152, 195, 121);  // green for function
  textSize(8);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  text("function", rightEdge - 95, codeY + 8);

  fill(97, 175, 239);  // blue for function name
  text("setup", rightEdge - 95 + 45, codeY + 8);

  fill(200, 200, 200);
  text("() {", rightEdge - 95 + 70, codeY + 8);

  fill(229, 192, 123);  // yellow for function call
  text("updateCanvasSize();", rightEdge - 92, codeY + 22);

  fill(200, 200, 200);
  text("...", rightEdge - 92, codeY + 36);
  text("}", rightEdge - 95, codeY + 45);

  textAlign(CENTER, CENTER);
}

function checkHover() {
  hoveredElement = null;

  for (let elem of elements) {
    if (mouseX >= elem.x && mouseX <= elem.x + elem.w &&
        mouseY >= elem.y && mouseY <= elem.y + elem.h) {
      hoveredElement = elem;
      break;
    }
  }
}

function drawHoverInfo() {
  let boxWidth = 200;
  let boxHeight = 70;
  let boxX = mouseX + 15;
  let boxY = mouseY + 15;

  // Keep tooltip on screen
  if (boxX + boxWidth > canvasWidth - 10) {
    boxX = mouseX - boxWidth - 15;
  }
  if (boxY + boxHeight > canvasHeight - 10) {
    boxY = mouseY - boxHeight - 15;
  }

  // Tooltip background
  fill(255, 255, 240);
  stroke(annotationColor);
  strokeWeight(2);
  rectMode(CORNER);
  rect(boxX, boxY, boxWidth, boxHeight, 6);

  // Tooltip title
  fill(annotationColor);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(hoveredElement.name, boxX + 10, boxY + 8);

  // Tooltip content
  fill(textColor);
  textSize(9);
  textStyle(NORMAL);

  // Word wrap the info text
  let words = hoveredElement.info.split(' ');
  let line = '';
  let y = boxY + 25;
  let maxWidth = boxWidth - 20;

  for (let word of words) {
    let testLine = line + word + ' ';
    if (textWidth(testLine) > maxWidth && line !== '') {
      text(line.trim(), boxX + 10, y);
      line = word + ' ';
      y += 12;
      if (y > boxY + boxHeight - 15) break;
    } else {
      line = testLine;
    }
  }
  if (y <= boxY + boxHeight - 15) {
    text(line.trim(), boxX + 10, y);
  }

  textAlign(CENTER, CENTER);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  defineElements();
}
