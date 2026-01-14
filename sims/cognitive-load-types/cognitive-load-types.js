// Cognitive Load Types MicroSim
// Visualizes intrinsic, extraneous, and germane cognitive load

let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Tank dimensions
let tankWidth = 180;
let tankHeight = 280;
let tankY = 50;

// Load levels (percentages of tank height)
let intrinsicLoad = 30;  // Blue - inherent to material
let extraneousLoad = 25; // Red - poor design
let germaneLoad = 20;    // Green - productive effort

// Slider for complexity
let complexitySlider;
let designSlider;

// Animation
let animationOffset = 0;

// Hover state
let hoveredSection = null;

// Colors
let intrinsicColor, extraneousColor, germaneColor, overflowColor, tankBorderColor;

// Descriptions for each load type
const loadDescriptions = {
    intrinsic: {
        title: "Intrinsic Load",
        subtitle: "The necessary challenge",
        description: "Inherent complexity of the material itself. Cannot be eliminated, only managed through scaffolding.",
        examples: [
            "Learning a new programming concept",
            "Understanding mathematical relationships",
            "Grasping abstract physics principles"
        ]
    },
    extraneous: {
        title: "Extraneous Load",
        subtitle: "The unnecessary burden",
        description: "Cognitive effort wasted on poor instructional design. Should be minimized.",
        examples: [
            "Confusing navigation in a simulation",
            "Irrelevant decorative graphics",
            "Poorly organized information",
            "Split attention between text and diagram"
        ]
    },
    germane: {
        title: "Germane Load",
        subtitle: "The good struggle",
        description: "Productive mental effort for schema construction and deep learning. Should be maximized.",
        examples: [
            "Making connections between concepts",
            "Practicing retrieval and application",
            "Reflecting on problem-solving strategies"
        ]
    },
    overflow: {
        title: "Overload Zone",
        subtitle: "Learning fails here",
        description: "When total cognitive load exceeds working memory capacity, learning breaks down.",
        examples: [
            "Information is lost or ignored",
            "Learner becomes frustrated",
            "Misconceptions may form",
            "Motivation decreases"
        ]
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
    intrinsicColor = color(66, 135, 245);    // Blue
    extraneousColor = color(239, 83, 80);    // Red
    germaneColor = color(76, 175, 80);       // Green
    overflowColor = color(255, 152, 0, 150); // Orange with transparency
    tankBorderColor = color(100);            // Gray

    // Create sliders
    let sliderY = drawHeight + 15;

    // Complexity slider (affects intrinsic load)
    complexitySlider = createSlider(10, 50, 30, 1);
    complexitySlider.position(100, sliderY);
    complexitySlider.size(150);
    complexitySlider.input(updateLoads);

    // Design quality slider (affects extraneous load)
    designSlider = createSlider(5, 50, 25, 1);
    designSlider.position(canvasWidth/2 + 100, sliderY);
    designSlider.size(150);
    designSlider.input(updateLoads);

    textFont('Arial');
}

function updateLoads() {
    intrinsicLoad = complexitySlider.value();
    // As design quality improves (slider moves right), extraneous load decreases
    extraneousLoad = 55 - designSlider.value();
    // Germane load fills available space up to a maximum
    let usedCapacity = intrinsicLoad + extraneousLoad;
    germaneLoad = min(35, max(10, 100 - usedCapacity - 20));
}

function draw() {
    background(248, 249, 250);

    // Animation
    animationOffset += 0.02;

    // Update hover state
    checkHover();

    // Title
    fill(50);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text("Three Types of Cognitive Load", canvasWidth/2, 10);

    // Draw poor design tank (left)
    let leftTankX = canvasWidth/4 - tankWidth/2;
    drawTank(leftTankX, tankY, 40, 35, 15, "Poor Design");

    // Draw good design tank (right)
    let rightTankX = 3*canvasWidth/4 - tankWidth/2;
    drawTank(rightTankX, tankY, intrinsicLoad, extraneousLoad, germaneLoad, "Good Design");

    // Draw slider labels
    drawSliderLabels();

    // Draw hover tooltip
    if (hoveredSection) {
        drawTooltip();
    }

    // Draw legend
    drawLegend();
}

function drawTank(x, y, intrinsic, extraneous, germane) {
    let totalLoad = intrinsic + extraneous + germane;
    let capacityLine = y + 20; // Top of usable capacity
    let tankBottom = y + tankHeight;
    let usableHeight = tankHeight - 20;

    // Calculate pixel heights for each load
    let intrinsicHeight = (intrinsic / 100) * usableHeight;
    let extraneousHeight = (extraneous / 100) * usableHeight;
    let germaneHeight = (germane / 100) * usableHeight;

    // Draw tank background
    fill(255);
    stroke(tankBorderColor);
    strokeWeight(3);
    rect(x, y, tankWidth, tankHeight, 5);

    // Draw capacity line
    stroke(100);
    strokeWeight(2);
    strokeDasharray([5, 5]);
    line(x, capacityLine, x + tankWidth, capacityLine);

    // Reset stroke
    strokeWeight(1);
    noStroke();

    // Draw loads from bottom up
    let currentY = tankBottom;

    // Intrinsic load (bottom - blue)
    let intrinsicY = currentY - intrinsicHeight;
    fill(intrinsicColor);
    rect(x + 2, intrinsicY, tankWidth - 4, intrinsicHeight - 2);

    // Add wave effect to intrinsic
    drawWave(x + 2, intrinsicY, tankWidth - 4, intrinsicColor);

    currentY = intrinsicY;

    // Extraneous load (middle - red)
    let extraneousY = currentY - extraneousHeight;
    fill(extraneousColor);
    rect(x + 2, extraneousY, tankWidth - 4, extraneousHeight);

    // Add wave effect to extraneous
    drawWave(x + 2, extraneousY, tankWidth - 4, extraneousColor);

    currentY = extraneousY;

    // Germane load (top - green)
    let germaneY = currentY - germaneHeight;
    fill(germaneColor);
    rect(x + 2, germaneY, tankWidth - 4, germaneHeight);

    // Add wave effect to germane
    drawWave(x + 2, germaneY, tankWidth - 4, germaneColor);

    // Draw overflow if total exceeds capacity
    if (totalLoad > 80) {
        let overflowAmount = totalLoad - 80;
        let overflowHeight = (overflowAmount / 100) * usableHeight;

        // Draw overflow with pulsing effect
        let pulseAlpha = 150 + sin(animationOffset * 5) * 50;
        fill(255, 152, 0, pulseAlpha);
        rect(x + 2, y - overflowHeight + 20, tankWidth - 4, overflowHeight);

        // Overflow warning
        fill(200, 0, 0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("OVERLOAD!", x + tankWidth/2, y - overflowHeight/2 + 20);
    }

    // Draw capacity label
    fill(80);
    textSize(11);
    textAlign(LEFT, CENTER);
    push();
    translate(x - 15, y + tankHeight/2);
    rotate(-HALF_PI);
    text("Working Memory Capacity", 0, 0);
    pop();

    // Draw percentage labels on tank
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);

    if (intrinsicHeight > 20) {
        text(intrinsic + "%", x + tankWidth/2, tankBottom - intrinsicHeight/2);
    }
    if (extraneousHeight > 20) {
        text(extraneous + "%", x + tankWidth/2, intrinsicY - extraneousHeight/2);
    }
    if (germaneHeight > 20) {
        text(germane + "%", x + tankWidth/2, extraneousY - germaneHeight/2);
    }
}

function drawWave(x, y, w, baseColor) {
    // Add subtle wave animation at the top of each section
    push();
    noStroke();
    fill(red(baseColor), green(baseColor), blue(baseColor), 100);

    beginShape();
    for (let i = 0; i <= w; i += 5) {
        let waveY = y + sin(animationOffset * 3 + i * 0.05) * 2;
        vertex(x + i, waveY);
    }
    vertex(x + w, y + 5);
    vertex(x, y + 5);
    endShape(CLOSE);
    pop();
}

function strokeDasharray(pattern) {
    // Helper for dashed lines - using drawingContext
    if (drawingContext.setLineDash) {
        drawingContext.setLineDash(pattern);
    }
}

function checkHover() {
    hoveredSection = null;

    // Check both tanks
    let tanks = [
        { x: canvasWidth/4 - tankWidth/2, intrinsic: 40, extraneous: 35, germane: 15 },
        { x: 3*canvasWidth/4 - tankWidth/2, intrinsic: intrinsicLoad, extraneous: extraneousLoad, germane: germaneLoad }
    ];

    for (let tank of tanks) {
        if (mouseX >= tank.x && mouseX <= tank.x + tankWidth) {
            let tankBottom = tankY + tankHeight;
            let usableHeight = tankHeight - 20;

            // Calculate positions
            let intrinsicHeight = (tank.intrinsic / 100) * usableHeight;
            let extraneousHeight = (tank.extraneous / 100) * usableHeight;
            let germaneHeight = (tank.germane / 100) * usableHeight;

            let intrinsicTop = tankBottom - intrinsicHeight;
            let extraneousTop = intrinsicTop - extraneousHeight;
            let germaneTop = extraneousTop - germaneHeight;

            // Check which section is hovered
            if (mouseY >= intrinsicTop && mouseY <= tankBottom) {
                hoveredSection = 'intrinsic';
            } else if (mouseY >= extraneousTop && mouseY < intrinsicTop) {
                hoveredSection = 'extraneous';
            } else if (mouseY >= germaneTop && mouseY < extraneousTop) {
                hoveredSection = 'germane';
            } else if (mouseY >= tankY && mouseY < germaneTop) {
                let totalLoad = tank.intrinsic + tank.extraneous + tank.germane;
                if (totalLoad > 80) {
                    hoveredSection = 'overflow';
                }
            }
        }
    }
}

function drawTooltip() {
    if (!hoveredSection || !loadDescriptions[hoveredSection]) return;

    let info = loadDescriptions[hoveredSection];

    // Tooltip dimensions
    let tooltipWidth = 280;
    let tooltipHeight = 160;
    let tooltipX = mouseX + 15;
    let tooltipY = mouseY - tooltipHeight/2;

    // Keep tooltip on screen
    if (tooltipX + tooltipWidth > canvasWidth - 10) {
        tooltipX = mouseX - tooltipWidth - 15;
    }
    if (tooltipY < 10) tooltipY = 10;
    if (tooltipY + tooltipHeight > drawHeight - 10) {
        tooltipY = drawHeight - tooltipHeight - 10;
    }

    // Draw tooltip background
    fill(255, 255, 255, 245);
    stroke(150);
    strokeWeight(1);
    rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

    // Draw content
    noStroke();
    let yPos = tooltipY + 15;

    // Title with color indicator
    let titleColor;
    if (hoveredSection === 'intrinsic') titleColor = intrinsicColor;
    else if (hoveredSection === 'extraneous') titleColor = extraneousColor;
    else if (hoveredSection === 'germane') titleColor = germaneColor;
    else titleColor = overflowColor;

    fill(titleColor);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(info.title, tooltipX + 15, yPos);

    yPos += 18;
    fill(100);
    textSize(11);
    textStyle(ITALIC);
    text(info.subtitle, tooltipX + 15, yPos);

    yPos += 18;
    fill(60);
    textSize(10);
    textStyle(NORMAL);

    // Word wrap description
    let words = info.description.split(' ');
    let line = '';
    let lineHeight = 14;

    for (let word of words) {
        let testLine = line + word + ' ';
        if (textWidth(testLine) > tooltipWidth - 30) {
            text(line, tooltipX + 15, yPos);
            line = word + ' ';
            yPos += lineHeight;
        } else {
            line = testLine;
        }
    }
    text(line, tooltipX + 15, yPos);

    yPos += 20;
    fill(80);
    textSize(10);
    textStyle(BOLD);
    text("Examples:", tooltipX + 15, yPos);

    yPos += 14;
    textStyle(NORMAL);
    fill(70);
    for (let i = 0; i < min(2, info.examples.length); i++) {
        text("• " + info.examples[i], tooltipX + 15, yPos);
        yPos += 13;
    }
}

function drawLegend() {
    let legendX = canvasWidth/2 - 200;
    let legendY = tankY + tankHeight + 15;

    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    // Intrinsic
    fill(intrinsicColor);
    rect(legendX, legendY, 15, 15, 3);
    fill(60);
    text("Intrinsic: The necessary challenge", legendX + 22, legendY + 8);

    // Extraneous
    fill(extraneousColor);
    rect(legendX + 200, legendY, 15, 15, 3);
    fill(60);
    text("Extraneous: Minimize this", legendX + 222, legendY + 8);

    // Germane (second row)
    fill(germaneColor);
    rect(legendX, legendY + 22, 15, 15, 3);
    fill(60);
    text("Germane: The good struggle", legendX + 22, legendY + 30);

    // Overflow
    fill(255, 152, 0);
    rect(legendX + 200, legendY + 22, 15, 15, 3);
    fill(60);
    text("Overflow: Learning fails", legendX + 222, legendY + 30);
}

function drawSliderLabels() {
    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    // Complexity slider label
    text("Content Complexity:", 10, drawHeight + 22);

    // Design quality slider label
    text("Design Quality:", canvasWidth/2 + 10, drawHeight + 22);

    // Tank labels
    textSize(13);
    textAlign(CENTER, TOP);
    fill(80);
    text("Poor Design", canvasWidth/4, tankY + tankHeight - 25);
    text("Good Design", 3*canvasWidth/4, tankY + tankHeight - 25);

    // Insight text
    textSize(10);
    fill(100);
    textAlign(CENTER, TOP);
    let insight = "Hover over each section to learn more. Adjust sliders to see how design choices affect cognitive load.";
    text(insight, canvasWidth/2, tankY + tankHeight + 55);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition sliders
    let sliderY = drawHeight + 15;
    complexitySlider.position(100, sliderY);
    designSlider.position(canvasWidth/2 + 100, sliderY);
}
