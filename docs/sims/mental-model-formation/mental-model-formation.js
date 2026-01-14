// Mental Model Formation MicroSim
// Visualizes how mental models form from various sources and influence interpretation of new information

let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Colors based on specification
let inputColor;        // Blue for input sources
let mentalModelColor;  // Green for central mental model
let outputColor;       // Orange for outputs/behaviors
let filterColor;       // Red for filtering effect

// Input sources (6 spokes)
const inputSources = [
    { name: "Direct Experience", icon: "hand", angle: -PI/2,
      description: "Learning through hands-on interaction with the world",
      example: "Burning your hand teaches you that fire is hot",
      risk: "Limited to personal encounters; may miss broader patterns" },
    { name: "Observation", icon: "eye", angle: -PI/2 + PI/3,
      description: "Watching others or phenomena without direct participation",
      example: "Seeing a colleague get promoted for their work ethic",
      risk: "May misinterpret what we observe without context" },
    { name: "Instruction", icon: "teacher", angle: -PI/2 + 2*PI/3,
      description: "Formal teaching from teachers, books, or courses",
      example: "Learning mathematics principles in school",
      risk: "May accept incorrect information from authority figures" },
    { name: "Analogy", icon: "link", angle: -PI/2 + PI,
      description: "Understanding new concepts by comparison to familiar ones",
      example: "Understanding electricity flow by comparing it to water in pipes",
      risk: "Analogies break down; differences matter as much as similarities" },
    { name: "Intuition", icon: "lightbulb", angle: -PI/2 + 4*PI/3,
      description: "Unconscious pattern recognition based on past experience",
      example: "A chess master 'sensing' a winning move",
      risk: "Can be fooled by cognitive biases and heuristics" },
    { name: "Cultural Transmission", icon: "people", angle: -PI/2 + 5*PI/3,
      description: "Knowledge passed down through social groups and traditions",
      example: "Learning cooking techniques from family recipes",
      risk: "May perpetuate outdated or incorrect beliefs" }
];

// Output behaviors
const outputBehaviors = [
    { name: "Predictions", angle: -PI/4 },
    { name: "Interpretations", angle: 0 },
    { name: "Problem-solving", angle: PI/4 },
    { name: "Communication", angle: PI/2 }
];

// Animation state
let hoveredSource = null;
let hoveredOutput = null;
let selectedSource = null;
let animationPhase = 0;
let infoFlowProgress = 0;
let feedbackProgress = 0;
let filterPulse = 0;

// Misconception examples for each source
const misconceptionExamples = {
    "Direct Experience": {
        title: "Survivorship Bias",
        description: "We only learn from experiences we survive. A gambler remembers wins but forgets losses, forming a mental model that gambling is profitable."
    },
    "Observation": {
        title: "Fundamental Attribution Error",
        description: "Observing someone fail, we attribute it to their character rather than circumstances, forming a biased mental model about competence."
    },
    "Instruction": {
        title: "Outdated Textbooks",
        description: "Students learn that there are nine planets, forming a mental model that persists even after Pluto was reclassified."
    },
    "Analogy": {
        title: "Electricity Misconception",
        description: "The water-pipe analogy for electricity leads students to believe current 'uses up' as it flows, like water evaporating."
    },
    "Intuition": {
        title: "Availability Heuristic",
        description: "After news coverage of plane crashes, our intuition tells us flying is dangerous, despite statistics showing it's the safest travel mode."
    },
    "Cultural Transmission": {
        title: "Flat Earth Beliefs",
        description: "In some communities, cultural transmission preserves incorrect models about Earth's shape despite scientific evidence."
    }
};

function updateCanvasSize() {
    const main = document.querySelector('main');
    if (main) {
        canvasWidth = Math.min(main.offsetWidth - 20, 900);
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const main = document.querySelector('main');
    if (main) {
        canvas.parent(main);
    }

    // Initialize colors
    inputColor = color(66, 135, 245);       // Blue
    mentalModelColor = color(76, 175, 80);  // Green
    outputColor = color(255, 152, 0);       // Orange
    filterColor = color(244, 67, 54);       // Red

    textFont('Arial');
}

function draw() {
    background(248, 249, 250);

    // Update animations
    animationPhase += 0.02;
    infoFlowProgress = (sin(animationPhase) + 1) / 2;
    feedbackProgress = (sin(animationPhase * 0.7) + 1) / 2;
    filterPulse = (sin(animationPhase * 2) + 1) / 2;

    // Check hover state
    checkHover();

    // Draw title
    drawTitle();

    // Draw the radial diagram
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;
    let inputRadius = min(canvasWidth, drawHeight) * 0.28;
    let outputRadius = min(canvasWidth, drawHeight) * 0.18;

    // Draw new information input with filter
    drawNewInfoFilter(centerX, centerY, inputRadius);

    // Draw input source spokes
    drawInputSources(centerX, centerY, inputRadius);

    // Draw central mental model hub
    drawMentalModelHub(centerX, centerY);

    // Draw output arrows
    drawOutputArrows(centerX, centerY, outputRadius);

    // Draw feedback loop
    drawFeedbackLoop(centerX, centerY, inputRadius, outputRadius);

    // Draw info panel if hovering or selected
    if (selectedSource !== null) {
        drawMisconceptionPanel();
    } else if (hoveredSource !== null) {
        drawHoverTooltip();
    }

    // Draw controls
    drawControls();
}

function drawTitle() {
    fill(50);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text("Mental Model Formation", canvasWidth / 2, 8);

    textSize(11);
    fill(100);
    text("How we construct and use mental representations of the world", canvasWidth / 2, 30);
}

function drawMentalModelHub(centerX, centerY) {
    // Outer glow
    noStroke();
    for (let i = 5; i >= 0; i--) {
        fill(76, 175, 80, 20 - i * 3);
        ellipse(centerX, centerY, 100 + i * 10, 100 + i * 10);
    }

    // Main hub
    fill(mentalModelColor);
    stroke(56, 142, 60);
    strokeWeight(3);
    ellipse(centerX, centerY, 100, 100);

    // Brain/thought bubble icon
    noStroke();
    fill(255);

    // Simple brain icon
    let bx = centerX;
    let by = centerY - 5;

    // Brain shape using ellipses
    fill(255);
    ellipse(bx - 12, by - 5, 25, 28);
    ellipse(bx + 12, by - 5, 25, 28);
    ellipse(bx - 8, by + 10, 20, 18);
    ellipse(bx + 8, by + 10, 20, 18);

    // Brain details
    stroke(200);
    strokeWeight(1);
    noFill();
    arc(bx - 5, by - 5, 15, 12, PI, TWO_PI);
    arc(bx + 5, by - 5, 15, 12, PI, TWO_PI);

    // Label
    noStroke();
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text("Mental", centerX, centerY + 25);
    text("Model", centerX, centerY + 36);
}

function drawInputSources(centerX, centerY, radius) {
    for (let i = 0; i < inputSources.length; i++) {
        let source = inputSources[i];
        let x = centerX + cos(source.angle) * radius;
        let y = centerY + sin(source.angle) * radius;

        // Calculate arrow path
        let arrowStartX = centerX + cos(source.angle) * (radius + 40);
        let arrowStartY = centerY + sin(source.angle) * (radius + 40);
        let arrowEndX = centerX + cos(source.angle) * 55;
        let arrowEndY = centerY + sin(source.angle) * 55;

        // Draw animated arrow toward center
        let pulseOffset = (sin(animationPhase + i * 0.5) + 1) / 2;

        // Arrow line
        stroke(inputColor);
        strokeWeight(2);
        line(arrowStartX, arrowStartY, arrowEndX, arrowEndY);

        // Animated dot along arrow
        let dotX = lerp(arrowStartX, arrowEndX, pulseOffset);
        let dotY = lerp(arrowStartY, arrowEndY, pulseOffset);
        noStroke();
        fill(inputColor);
        ellipse(dotX, dotY, 8, 8);

        // Arrowhead
        let arrowAngle = atan2(arrowEndY - arrowStartY, arrowEndX - arrowStartX);
        fill(inputColor);
        push();
        translate(arrowEndX, arrowEndY);
        rotate(arrowAngle);
        triangle(0, 0, -12, -6, -12, 6);
        pop();

        // Source node
        let isHovered = (hoveredSource === i);
        let isSelected = (selectedSource === i);
        let nodeSize = isHovered || isSelected ? 75 : 65;

        // Node background
        noStroke();
        if (isSelected) {
            fill(66, 135, 245, 200);
        } else if (isHovered) {
            fill(66, 135, 245, 150);
        } else {
            fill(240, 248, 255);
        }
        ellipse(x, y, nodeSize, nodeSize);

        // Node border
        stroke(inputColor);
        strokeWeight(isHovered || isSelected ? 3 : 2);
        noFill();
        ellipse(x, y, nodeSize, nodeSize);

        // Draw icon
        drawSourceIcon(source.icon, x, y - 8, isHovered || isSelected);

        // Label
        noStroke();
        fill(isHovered || isSelected ? 255 : 50);
        textSize(8);
        textAlign(CENTER, CENTER);

        // Word wrap for longer names
        let words = source.name.split(' ');
        if (words.length > 1) {
            text(words[0], x, y + 15);
            text(words.slice(1).join(' '), x, y + 24);
        } else {
            text(source.name, x, y + 18);
        }
    }
}

function drawSourceIcon(iconType, x, y, highlighted) {
    let iconColor = highlighted ? color(255) : inputColor;
    fill(iconColor);
    noStroke();

    switch(iconType) {
        case "hand":
            // Hand icon
            ellipse(x, y, 18, 20);
            rect(x - 9, y, 18, 8, 2);
            for (let i = 0; i < 4; i++) {
                rect(x - 7 + i * 4, y - 12, 3, 12, 1);
            }
            break;

        case "eye":
            // Eye icon
            beginShape();
            vertex(x - 12, y);
            bezierVertex(x - 6, y - 8, x + 6, y - 8, x + 12, y);
            bezierVertex(x + 6, y + 8, x - 6, y + 8, x - 12, y);
            endShape(CLOSE);
            fill(highlighted ? inputColor : 255);
            ellipse(x, y, 8, 8);
            fill(highlighted ? 255 : inputColor);
            ellipse(x, y, 4, 4);
            break;

        case "teacher":
            // Person with board icon
            ellipse(x, y - 8, 10, 10);
            rect(x - 5, y - 2, 10, 15, 2);
            rect(x + 8, y - 6, 10, 12, 1);
            break;

        case "link":
            // Chain link icon
            stroke(iconColor);
            strokeWeight(3);
            noFill();
            arc(x - 5, y, 12, 12, -PI/2, PI/2);
            arc(x + 5, y, 12, 12, PI/2, 3*PI/2);
            line(x - 5, y - 6, x + 5, y - 6);
            line(x - 5, y + 6, x + 5, y + 6);
            noStroke();
            break;

        case "lightbulb":
            // Lightbulb icon
            ellipse(x, y - 4, 16, 18);
            rect(x - 4, y + 5, 8, 6, 1);
            // Rays
            stroke(iconColor);
            strokeWeight(2);
            for (let a = 0; a < 5; a++) {
                let rayAngle = -PI + a * PI/4;
                line(x + cos(rayAngle) * 10, y - 4 + sin(rayAngle) * 11,
                     x + cos(rayAngle) * 14, y - 4 + sin(rayAngle) * 15);
            }
            noStroke();
            break;

        case "people":
            // Group of people icon
            ellipse(x - 8, y - 4, 8, 8);
            ellipse(x, y - 6, 10, 10);
            ellipse(x + 8, y - 4, 8, 8);
            rect(x - 11, y + 2, 6, 10, 2);
            rect(x - 4, y, 8, 12, 2);
            rect(x + 5, y + 2, 6, 10, 2);
            break;
    }
}

function drawOutputArrows(centerX, centerY, radius) {
    let outputStartX = centerX + 50;
    let outputY = centerY;

    for (let i = 0; i < outputBehaviors.length; i++) {
        let output = outputBehaviors[i];
        let endX = centerX + cos(output.angle) * (radius + 100);
        let endY = centerY + sin(output.angle) * (radius + 40);

        let isHovered = (hoveredOutput === i);

        // Animated arrow
        let pulseOffset = (sin(animationPhase + i * 0.8 + 1) + 1) / 2;

        // Arrow line
        stroke(outputColor);
        strokeWeight(isHovered ? 3 : 2);

        // Curved arrow from center
        noFill();
        beginShape();
        let startX = centerX + 50;
        let startY = centerY + (i - 1.5) * 15;
        let cpX = centerX + 80;
        let cpY = (startY + endY) / 2;
        vertex(startX, startY);
        quadraticVertex(cpX, cpY, endX - 20, endY);
        endShape();

        // Animated dot
        let t = pulseOffset;
        let dotX = bezierPoint(startX, cpX, cpX, endX - 20, t);
        let dotY = bezierPoint(startY, cpY, cpY, endY, t);
        noStroke();
        fill(outputColor);
        ellipse(dotX, dotY, 8, 8);

        // Arrowhead
        let arrowAngle = atan2(endY - cpY, endX - 20 - cpX);
        push();
        translate(endX - 20, endY);
        rotate(arrowAngle);
        triangle(0, 0, -10, -5, -10, 5);
        pop();

        // Label
        textAlign(LEFT, CENTER);
        textSize(isHovered ? 12 : 11);
        fill(isHovered ? color(255, 120, 0) : outputColor);
        text(output.name, endX - 15, endY);
    }
}

function drawNewInfoFilter(centerX, centerY, radius) {
    // "New Information" box on left side
    let boxX = 30;
    let boxY = centerY - 40;
    let boxW = 80;
    let boxH = 80;

    // Box
    fill(255, 245, 238);
    stroke(filterColor);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 8);

    // Label
    noStroke();
    fill(filterColor);
    textSize(10);
    textAlign(CENTER, CENTER);
    text("New", boxX + boxW/2, boxY + boxH/2 - 8);
    text("Information", boxX + boxW/2, boxY + boxH/2 + 5);

    // Filter lens between new info and mental model
    let filterX = boxX + boxW + 40;
    let filterY = centerY;

    // Animated filter pulse
    let filterSize = 50 + filterPulse * 10;

    // Filter background
    noStroke();
    fill(255, 235, 238, 150);
    ellipse(filterX, filterY, filterSize + 20, filterSize + 20);

    // Filter with lens shape
    stroke(filterColor);
    strokeWeight(2);
    strokeJoin(ROUND);
    noFill();

    // Lens shape
    arc(filterX, filterY, filterSize, filterSize * 0.8, -PI/2, PI/2);
    arc(filterX - 10, filterY, filterSize * 0.7, filterSize * 0.5, -PI/2, PI/2);

    // Dotted line showing filtered path
    drawingContext.setLineDash([5, 5]);
    stroke(filterColor);
    line(boxX + boxW, centerY, filterX - filterSize/2, centerY);
    line(filterX + filterSize/2 - 10, centerY, centerX - 50, centerY);
    drawingContext.setLineDash([]);

    // Filter label
    noStroke();
    fill(filterColor);
    textSize(9);
    text("Filter", filterX, filterY + filterSize/2 + 15);
    text("(Existing model", filterX, filterY + filterSize/2 + 26);
    text("shapes perception)", filterX, filterY + filterSize/2 + 37);

    // Animated information particles
    let numParticles = 5;
    for (let i = 0; i < numParticles; i++) {
        let t = (infoFlowProgress + i / numParticles) % 1;
        let particleX, particleY;

        if (t < 0.5) {
            // Before filter
            particleX = lerp(boxX + boxW, filterX - filterSize/2, t * 2);
            particleY = centerY + sin(t * 20 + i) * 5;
            fill(255, 200, 200, 200);
        } else {
            // After filter (some get through, transformed)
            if (i % 2 === 0) {
                particleX = lerp(filterX + filterSize/2 - 10, centerX - 50, (t - 0.5) * 2);
                particleY = centerY + sin(t * 15 + i) * 3;
                fill(200, 255, 200, 200);
            } else {
                continue; // This particle was filtered out
            }
        }
        noStroke();
        ellipse(particleX, particleY, 6, 6);
    }
}

function drawFeedbackLoop(centerX, centerY, inputRadius, outputRadius) {
    // Draw curved feedback arrow from outputs back to mental model
    let startX = centerX + outputRadius + 80;
    let startY = centerY + 60;
    let endX = centerX;
    let endY = centerY + 70;

    stroke(76, 175, 80, 150);
    strokeWeight(2);
    noFill();

    // Curved path going down and back
    beginShape();
    vertex(startX, startY);
    bezierVertex(startX + 20, startY + 60, centerX, centerY + 100, endX, endY);
    endShape();

    // Arrowhead pointing to mental model
    fill(76, 175, 80, 150);
    noStroke();
    push();
    translate(endX, endY);
    rotate(-PI/2);
    triangle(0, 0, -8, -5, -8, 5);
    pop();

    // Animated dot on feedback loop
    let t = feedbackProgress;
    let fbX = bezierPoint(startX, startX + 20, centerX, endX, t);
    let fbY = bezierPoint(startY, startY + 60, centerY + 100, endY, t);
    fill(76, 175, 80);
    ellipse(fbX, fbY, 8, 8);

    // Feedback label
    fill(76, 175, 80);
    textSize(9);
    textAlign(CENTER, CENTER);
    text("Feedback Loop", centerX + 50, centerY + 95);
    text("(Outcomes modify models)", centerX + 50, centerY + 106);
}

function checkHover() {
    hoveredSource = null;
    hoveredOutput = null;

    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;
    let radius = min(canvasWidth, drawHeight) * 0.28;

    // Check input sources
    for (let i = 0; i < inputSources.length; i++) {
        let source = inputSources[i];
        let x = centerX + cos(source.angle) * radius;
        let y = centerY + sin(source.angle) * radius;

        if (dist(mouseX, mouseY, x, y) < 35) {
            hoveredSource = i;
            return;
        }
    }

    // Check outputs
    let outputRadius = min(canvasWidth, drawHeight) * 0.18;
    for (let i = 0; i < outputBehaviors.length; i++) {
        let output = outputBehaviors[i];
        let x = centerX + cos(output.angle) * (outputRadius + 100);
        let y = centerY + sin(output.angle) * (outputRadius + 40);

        if (dist(mouseX, mouseY, x, y) < 40) {
            hoveredOutput = i;
            return;
        }
    }
}

function drawHoverTooltip() {
    if (hoveredSource === null) return;

    let source = inputSources[hoveredSource];
    let tooltipWidth = 280;
    let tooltipHeight = 130;
    let tooltipX = mouseX + 15;
    let tooltipY = mouseY - 60;

    // Keep on screen
    if (tooltipX + tooltipWidth > canvasWidth - 10) {
        tooltipX = mouseX - tooltipWidth - 15;
    }
    if (tooltipY < 10) tooltipY = 10;
    if (tooltipY + tooltipHeight > drawHeight - 10) {
        tooltipY = drawHeight - tooltipHeight - 10;
    }

    // Background
    fill(255, 255, 255, 250);
    stroke(inputColor);
    strokeWeight(2);
    rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

    // Content
    noStroke();
    let yPos = tooltipY + 15;

    // Title
    fill(inputColor);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(source.name, tooltipX + 12, yPos);

    yPos += 24;
    fill(60);
    textSize(11);
    textStyle(NORMAL);
    text(source.description, tooltipX + 12, yPos, tooltipWidth - 24, 40);

    yPos += 35;
    fill(76, 175, 80);
    textStyle(ITALIC);
    textSize(10);
    text("Example: " + source.example, tooltipX + 12, yPos, tooltipWidth - 24, 30);

    yPos += 30;
    fill(244, 67, 54);
    textSize(9);
    text("Risk: " + source.risk, tooltipX + 12, yPos, tooltipWidth - 24, 30);
    textStyle(NORMAL);
}

function drawMisconceptionPanel() {
    let source = inputSources[selectedSource];
    let misconception = misconceptionExamples[source.name];

    let panelWidth = 300;
    let panelHeight = 160;
    let panelX = (canvasWidth - panelWidth) / 2;
    let panelY = 60;

    // Semi-transparent overlay
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 50, canvasWidth, drawHeight - 50);

    // Panel background
    fill(255);
    stroke(244, 67, 54);
    strokeWeight(3);
    rect(panelX, panelY, panelWidth, panelHeight, 12);

    // Close button
    fill(244, 67, 54);
    noStroke();
    ellipse(panelX + panelWidth - 15, panelY + 15, 24, 24);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("x", panelX + panelWidth - 15, panelY + 14);

    // Content
    noStroke();
    let yPos = panelY + 20;

    // Source name
    fill(inputColor);
    textSize(11);
    textAlign(LEFT, TOP);
    text("Source: " + source.name, panelX + 15, yPos);

    yPos += 20;
    fill(244, 67, 54);
    textSize(14);
    textStyle(BOLD);
    text("Common Misconception:", panelX + 15, yPos);

    yPos += 20;
    fill(50);
    textSize(13);
    text(misconception.title, panelX + 15, yPos);

    yPos += 22;
    textStyle(NORMAL);
    textSize(11);
    fill(80);
    text(misconception.description, panelX + 15, yPos, panelWidth - 30, 70);

    // Instruction
    yPos = panelY + panelHeight - 20;
    fill(150);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text("Click anywhere to close", panelX + panelWidth/2, yPos);
}

function drawControls() {
    let buttonY = drawHeight + 15;

    // Instructions
    fill(80);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("Hover over sources to see details  |  Click a source to see how it creates misconceptions",
         canvasWidth / 2, buttonY + 12);

    // Legend
    let legendX = 20;
    let legendY = drawHeight + 8;
    textSize(9);
    textAlign(LEFT, TOP);

    // Input color
    fill(inputColor);
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text("Input Sources", legendX + 16, legendY + 1);

    // Output color
    legendX += 90;
    fill(outputColor);
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text("Outputs", legendX + 16, legendY + 1);

    // Mental model color
    legendX += 70;
    fill(mentalModelColor);
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text("Mental Model", legendX + 16, legendY + 1);

    // Filter color
    legendX += 95;
    fill(filterColor);
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text("Filter Effect", legendX + 16, legendY + 1);
}

function mousePressed() {
    // Check if clicking close button on panel
    if (selectedSource !== null) {
        let panelWidth = 300;
        let panelX = (canvasWidth - panelWidth) / 2;
        let panelY = 60;

        // Close button check
        if (dist(mouseX, mouseY, panelX + panelWidth - 15, panelY + 15) < 15) {
            selectedSource = null;
            return;
        }

        // Click anywhere else to close
        selectedSource = null;
        return;
    }

    // Check if clicking on an input source
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;
    let radius = min(canvasWidth, drawHeight) * 0.28;

    for (let i = 0; i < inputSources.length; i++) {
        let source = inputSources[i];
        let x = centerX + cos(source.angle) * radius;
        let y = centerY + sin(source.angle) * radius;

        if (dist(mouseX, mouseY, x, y) < 35) {
            selectedSource = i;
            return;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
