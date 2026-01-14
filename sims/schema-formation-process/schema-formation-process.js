// Schema Formation Process MicroSim
// Visualizes how new information gets integrated into existing knowledge structures

let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Stage constants
const STAGE_NEW_INFO = 0;
const STAGE_ELABORATION = 1;
const STAGE_ORGANIZATION = 2;
const STAGE_INTEGRATION = 3;
const STAGE_FINAL = 4;

// Animation state
let currentStage = STAGE_NEW_INFO;
let animationProgress = 0;
let autoPlay = false;
let animationSpeed = 0.02;

// Dots representing information
let newInfoDots = [];
let existingSchemaDots = [];
let numNewDots = 12;
let numExistingDots = 15;

// Colors
let newInfoColor, existingColor, integratedColor, processingZoneColor;

// Button positions
let playButton, resetButton;

// Hover state
let hoveredStage = null;

// Stage descriptions
const stageDescriptions = {
    0: {
        title: "New Information",
        description: "Raw, unorganized information enters working memory as scattered, disconnected pieces.",
        example: "A student hears new vocabulary words in a foreign language class for the first time."
    },
    1: {
        title: "Elaboration",
        description: "Working memory connects new information to existing knowledge through meaningful associations.",
        example: "The student associates 'maison' (house) with their mental image of home."
    },
    2: {
        title: "Organization",
        description: "Related pieces of information are grouped into meaningful clusters and categories.",
        example: "The student groups household vocabulary: kitchen items, bedroom items, bathroom items."
    },
    3: {
        title: "Integration",
        description: "Organized clusters merge with existing schemas, creating enriched knowledge structures.",
        example: "New vocabulary integrates with existing language knowledge, enabling spontaneous use."
    },
    4: {
        title: "Organized Schema",
        description: "A coherent, interconnected network of concepts ready for retrieval and application.",
        example: "The student can now describe their house in the new language without conscious effort."
    }
};

// Domain examples for click interaction
const domainExamples = [
    { domain: "Mathematics", newInfo: "New formula", existing: "Prior math concepts", result: "Problem-solving schema" },
    { domain: "Programming", newInfo: "New syntax", existing: "Programming logic", result: "Coding schema" },
    { domain: "History", newInfo: "New events", existing: "Timeline knowledge", result: "Historical understanding" },
    { domain: "Science", newInfo: "New phenomena", existing: "Scientific principles", result: "Scientific model" }
];
let currentDomainIndex = 0;

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
    newInfoColor = color(255, 193, 7);      // Yellow - new information
    existingColor = color(66, 135, 245);    // Blue - existing knowledge
    integratedColor = color(76, 175, 80);   // Green - integrated schema
    processingZoneColor = color(240, 240, 245);

    // Initialize dots
    initializeDots();

    textFont('Arial');
}

function initializeDots() {
    newInfoDots = [];
    existingSchemaDots = [];

    // Create scattered new information dots (left side)
    let leftZoneX = 50;
    let leftZoneWidth = canvasWidth * 0.2;

    for (let i = 0; i < numNewDots; i++) {
        newInfoDots.push({
            x: leftZoneX + random(leftZoneWidth),
            y: 80 + random(drawHeight - 160),
            targetX: 0,
            targetY: 0,
            size: random(8, 14),
            color: newInfoColor,
            cluster: floor(random(3)),  // For organization stage
            connected: false
        });
    }

    // Create existing schema dots (bottom, then move right)
    let bottomY = drawHeight - 60;
    let schemaWidth = canvasWidth * 0.25;
    let schemaX = canvasWidth * 0.65;

    for (let i = 0; i < numExistingDots; i++) {
        let angle = (i / numExistingDots) * TWO_PI;
        let radius = 40 + random(20);
        existingSchemaDots.push({
            x: schemaX + cos(angle) * radius,
            y: bottomY + sin(angle) * radius * 0.3 - 20,
            baseX: schemaX + cos(angle) * radius,
            baseY: bottomY + sin(angle) * radius * 0.3 - 20,
            size: random(10, 16),
            color: existingColor,
            connections: []
        });
    }

    // Create connections between existing schema dots
    for (let i = 0; i < existingSchemaDots.length; i++) {
        let numConnections = floor(random(1, 3));
        for (let j = 0; j < numConnections; j++) {
            let target = floor(random(existingSchemaDots.length));
            if (target !== i && !existingSchemaDots[i].connections.includes(target)) {
                existingSchemaDots[i].connections.push(target);
            }
        }
    }

    // Calculate target positions for each stage
    calculateTargetPositions();
}

function calculateTargetPositions() {
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2;

    // Stage 1 targets: Move toward center processing zone
    for (let i = 0; i < newInfoDots.length; i++) {
        let dot = newInfoDots[i];
        dot.stage1X = centerX - 80 + random(-30, 30);
        dot.stage1Y = centerY + random(-60, 60);
    }

    // Stage 2 targets: Cluster formation
    let clusterCenters = [
        { x: centerX - 60, y: centerY - 50 },
        { x: centerX - 80, y: centerY + 40 },
        { x: centerX - 40, y: centerY }
    ];

    for (let i = 0; i < newInfoDots.length; i++) {
        let dot = newInfoDots[i];
        let cluster = clusterCenters[dot.cluster];
        dot.stage2X = cluster.x + random(-20, 20);
        dot.stage2Y = cluster.y + random(-20, 20);
    }

    // Stage 3 & 4 targets: Merge with existing schema
    let finalX = canvasWidth * 0.72;
    let finalY = drawHeight / 2;

    for (let i = 0; i < newInfoDots.length; i++) {
        let angle = (i / newInfoDots.length) * TWO_PI + PI;
        let radius = 50 + random(30);
        let dot = newInfoDots[i];
        dot.stage3X = finalX + cos(angle) * radius * 0.5;
        dot.stage3Y = finalY + sin(angle) * radius * 0.6;
        dot.stage4X = finalX + cos(angle) * radius;
        dot.stage4Y = finalY + sin(angle) * radius * 0.6;
    }
}

function draw() {
    background(248, 249, 250);

    // Update animation
    if (autoPlay && animationProgress < 1) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 1;
            if (currentStage < STAGE_FINAL) {
                setTimeout(() => {
                    if (autoPlay && currentStage < STAGE_FINAL) {
                        currentStage++;
                        animationProgress = 0;
                    }
                }, 1000);
            } else {
                autoPlay = false;
            }
        }
    }

    // Check hover state
    checkHover();

    // Draw title
    drawTitle();

    // Draw stage labels
    drawStageLabels();

    // Draw zones
    drawZones();

    // Draw existing schema
    drawExistingSchema();

    // Draw new information dots
    drawNewInfoDots();

    // Draw connections based on stage
    drawConnections();

    // Draw controls
    drawControls();

    // Draw hover tooltip
    if (hoveredStage !== null) {
        drawTooltip();
    }

    // Draw domain example
    drawDomainExample();
}

function drawTitle() {
    fill(50);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text("Schema Formation Process", canvasWidth / 2, 8);
}

function drawStageLabels() {
    let stages = ["New\nInformation", "Elaboration", "Organization", "Integration", "Organized\nSchema"];
    let positions = [
        canvasWidth * 0.1,
        canvasWidth * 0.3,
        canvasWidth * 0.45,
        canvasWidth * 0.6,
        canvasWidth * 0.8
    ];

    textSize(10);
    textAlign(CENTER, TOP);

    for (let i = 0; i < stages.length; i++) {
        // Highlight current stage
        if (i === currentStage) {
            fill(66, 135, 245);
            noStroke();
            rect(positions[i] - 40, 32, 80, 32, 4);
            fill(255);
        } else if (i < currentStage) {
            fill(76, 175, 80);
        } else {
            fill(150);
        }
        text(stages[i], positions[i], 36);
    }

    // Draw progress arrows
    stroke(180);
    strokeWeight(1);
    for (let i = 0; i < stages.length - 1; i++) {
        let x1 = positions[i] + 35;
        let x2 = positions[i + 1] - 35;
        let y = 48;
        line(x1, y, x2, y);
        // Arrowhead
        line(x2, y, x2 - 5, y - 3);
        line(x2, y, x2 - 5, y + 3);
    }
}

function drawZones() {
    noStroke();

    // Left zone - New Information
    fill(255, 248, 225, 150);
    rect(30, 70, canvasWidth * 0.22, drawHeight - 140, 8);

    // Middle zone - Working Memory Processing
    fill(processingZoneColor);
    rect(canvasWidth * 0.28, 70, canvasWidth * 0.32, drawHeight - 140, 8);

    // Right zone - Organized Schema
    fill(232, 245, 233, 150);
    rect(canvasWidth * 0.62, 70, canvasWidth * 0.3, drawHeight - 140, 8);

    // Zone labels
    fill(100);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text("New Information", canvasWidth * 0.14, drawHeight - 55);
    text("Working Memory Processing", canvasWidth * 0.44, drawHeight - 55);
    text("Organized Schema", canvasWidth * 0.77, drawHeight - 55);
}

function drawExistingSchema() {
    let targetX = canvasWidth * 0.72;
    let targetY = drawHeight / 2;

    // Move existing schema to center during integration
    let schemaProgress = 0;
    if (currentStage >= STAGE_INTEGRATION) {
        schemaProgress = currentStage === STAGE_INTEGRATION ? animationProgress : 1;
    }

    // Draw connections between existing dots
    stroke(66, 135, 245, 100);
    strokeWeight(1);
    for (let i = 0; i < existingSchemaDots.length; i++) {
        let dot = existingSchemaDots[i];
        let currentX = lerp(dot.baseX, targetX + (dot.baseX - canvasWidth * 0.65), schemaProgress);
        let currentY = lerp(dot.baseY, targetY + (dot.baseY - (drawHeight - 80)) * 2, schemaProgress);

        for (let conn of dot.connections) {
            let other = existingSchemaDots[conn];
            let otherX = lerp(other.baseX, targetX + (other.baseX - canvasWidth * 0.65), schemaProgress);
            let otherY = lerp(other.baseY, targetY + (other.baseY - (drawHeight - 80)) * 2, schemaProgress);
            line(currentX, currentY, otherX, otherY);
        }
    }

    // Draw existing dots
    noStroke();
    for (let i = 0; i < existingSchemaDots.length; i++) {
        let dot = existingSchemaDots[i];
        let currentX = lerp(dot.baseX, targetX + (dot.baseX - canvasWidth * 0.65), schemaProgress);
        let currentY = lerp(dot.baseY, targetY + (dot.baseY - (drawHeight - 80)) * 2, schemaProgress);

        // Color transition during integration
        if (currentStage >= STAGE_FINAL) {
            fill(lerpColor(existingColor, integratedColor, 0.3));
        } else {
            fill(existingColor);
        }
        ellipse(currentX, currentY, dot.size);
    }

    // Label for existing knowledge base
    if (currentStage < STAGE_INTEGRATION) {
        fill(66, 135, 245);
        textSize(10);
        textAlign(CENTER, TOP);
        text("Existing Knowledge", canvasWidth * 0.72, drawHeight - 45);
    }
}

function drawNewInfoDots() {
    for (let i = 0; i < newInfoDots.length; i++) {
        let dot = newInfoDots[i];
        let currentX, currentY;
        let currentColor = newInfoColor;

        // Calculate position based on stage
        switch (currentStage) {
            case STAGE_NEW_INFO:
                currentX = dot.x;
                currentY = dot.y;
                break;
            case STAGE_ELABORATION:
                currentX = lerp(dot.x, dot.stage1X, animationProgress);
                currentY = lerp(dot.y, dot.stage1Y, animationProgress);
                break;
            case STAGE_ORGANIZATION:
                currentX = lerp(dot.stage1X, dot.stage2X, animationProgress);
                currentY = lerp(dot.stage1Y, dot.stage2Y, animationProgress);
                break;
            case STAGE_INTEGRATION:
                currentX = lerp(dot.stage2X, dot.stage3X, animationProgress);
                currentY = lerp(dot.stage2Y, dot.stage3Y, animationProgress);
                currentColor = lerpColor(newInfoColor, integratedColor, animationProgress * 0.5);
                break;
            case STAGE_FINAL:
                currentX = lerp(dot.stage3X, dot.stage4X, animationProgress);
                currentY = lerp(dot.stage3Y, dot.stage4Y, animationProgress);
                currentColor = lerpColor(newInfoColor, integratedColor, 0.5 + animationProgress * 0.5);
                break;
            default:
                currentX = dot.x;
                currentY = dot.y;
        }

        // Draw dot
        noStroke();
        fill(currentColor);
        ellipse(currentX, currentY, dot.size);

        // Store current position for connections
        dot.currentX = currentX;
        dot.currentY = currentY;
    }
}

function drawConnections() {
    // Draw connections between new info dots during organization
    if (currentStage >= STAGE_ORGANIZATION) {
        let connectionAlpha = currentStage === STAGE_ORGANIZATION ? animationProgress * 150 : 150;

        stroke(255, 193, 7, connectionAlpha);
        strokeWeight(1);

        // Connect dots in same cluster
        for (let i = 0; i < newInfoDots.length; i++) {
            for (let j = i + 1; j < newInfoDots.length; j++) {
                if (newInfoDots[i].cluster === newInfoDots[j].cluster) {
                    let d = dist(newInfoDots[i].currentX, newInfoDots[i].currentY,
                                newInfoDots[j].currentX, newInfoDots[j].currentY);
                    if (d < 60) {
                        line(newInfoDots[i].currentX, newInfoDots[i].currentY,
                             newInfoDots[j].currentX, newInfoDots[j].currentY);
                    }
                }
            }
        }
    }

    // Draw integration connections
    if (currentStage >= STAGE_INTEGRATION) {
        let integrationAlpha = currentStage === STAGE_INTEGRATION ? animationProgress * 100 : 100;
        stroke(76, 175, 80, integrationAlpha);
        strokeWeight(1);

        // Connect new dots to existing schema
        for (let i = 0; i < min(newInfoDots.length, existingSchemaDots.length); i++) {
            let newDot = newInfoDots[i];
            let existingDot = existingSchemaDots[i % existingSchemaDots.length];

            let targetX = canvasWidth * 0.72;
            let targetY = drawHeight / 2;
            let schemaProgress = currentStage === STAGE_INTEGRATION ? animationProgress : 1;
            let existingX = lerp(existingDot.baseX, targetX + (existingDot.baseX - canvasWidth * 0.65), schemaProgress);
            let existingY = lerp(existingDot.baseY, targetY + (existingDot.baseY - (drawHeight - 80)) * 2, schemaProgress);

            line(newDot.currentX, newDot.currentY, existingX, existingY);
        }
    }
}

function drawControls() {
    let buttonY = drawHeight + 15;
    let buttonWidth = 80;
    let buttonHeight = 25;

    // Play/Pause button
    let playX = canvasWidth / 2 - 100;
    fill(autoPlay ? color(239, 83, 80) : color(76, 175, 80));
    noStroke();
    rect(playX, buttonY, buttonWidth, buttonHeight, 4);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(autoPlay ? "Pause" : "Play", playX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Reset button
    let resetX = canvasWidth / 2 + 20;
    fill(100);
    rect(resetX, buttonY, buttonWidth, buttonHeight, 4);

    fill(255);
    text("Reset", resetX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Stage indicator
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text("Stage: " + (currentStage + 1) + " / 5", 20, buttonY + buttonHeight / 2);

    // Click for domain example hint
    textAlign(RIGHT, CENTER);
    fill(100);
    text("Click canvas for domain examples", canvasWidth - 20, buttonY + buttonHeight / 2);
}

function checkHover() {
    hoveredStage = null;

    // Check if hovering over zone areas
    if (mouseY > 70 && mouseY < drawHeight - 70) {
        if (mouseX > 30 && mouseX < 30 + canvasWidth * 0.22) {
            hoveredStage = 0;
        } else if (mouseX > canvasWidth * 0.28 && mouseX < canvasWidth * 0.6) {
            if (mouseX < canvasWidth * 0.38) hoveredStage = 1;
            else if (mouseX < canvasWidth * 0.48) hoveredStage = 2;
            else hoveredStage = 3;
        } else if (mouseX > canvasWidth * 0.62 && mouseX < canvasWidth * 0.92) {
            hoveredStage = 4;
        }
    }
}

function drawTooltip() {
    if (hoveredStage === null || !stageDescriptions[hoveredStage]) return;

    let info = stageDescriptions[hoveredStage];
    let tooltipWidth = 260;
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
    fill(255, 255, 255, 245);
    stroke(150);
    strokeWeight(1);
    rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

    // Content
    noStroke();
    let yPos = tooltipY + 15;

    // Title
    fill(66, 135, 245);
    textSize(13);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(info.title, tooltipX + 12, yPos);

    yPos += 22;
    fill(60);
    textSize(10);
    textStyle(NORMAL);

    // Word wrap description
    let words = info.description.split(' ');
    let line = '';
    for (let word of words) {
        let testLine = line + word + ' ';
        if (textWidth(testLine) > tooltipWidth - 24) {
            text(line, tooltipX + 12, yPos);
            line = word + ' ';
            yPos += 13;
        } else {
            line = testLine;
        }
    }
    text(line, tooltipX + 12, yPos);

    yPos += 20;
    fill(80);
    textStyle(ITALIC);
    textSize(9);
    text("Example: " + info.example, tooltipX + 12, yPos, tooltipWidth - 24, 40);
    textStyle(NORMAL);
}

function drawDomainExample() {
    let example = domainExamples[currentDomainIndex];

    fill(100);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text("Domain: " + example.domain + " | " + example.newInfo + " + " + example.existing + " = " + example.result,
         canvasWidth / 2, drawHeight - 8);
}

function mousePressed() {
    let buttonY = drawHeight + 15;
    let buttonWidth = 80;
    let buttonHeight = 25;

    // Check play button
    let playX = canvasWidth / 2 - 100;
    if (mouseX > playX && mouseX < playX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        autoPlay = !autoPlay;
        return;
    }

    // Check reset button
    let resetX = canvasWidth / 2 + 20;
    if (mouseX > resetX && mouseX < resetX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        currentStage = STAGE_NEW_INFO;
        animationProgress = 0;
        autoPlay = false;
        initializeDots();
        return;
    }

    // Click on canvas cycles domain examples
    if (mouseY < drawHeight && mouseY > 70) {
        currentDomainIndex = (currentDomainIndex + 1) % domainExamples.length;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    initializeDots();
}
