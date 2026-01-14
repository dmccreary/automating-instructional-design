// Cognitive Load Meter MicroSim
// Interactive tool to demonstrate how a cognitive load meter works
// Allows learners to calibrate their intuitions about cognitive load
// by adjusting parameters and observing meter response

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 550;
let canvasHeight = drawHeight;
let margin = 20;

// Layout
let contentAreaWidth;
let meterAreaWidth;
let meterAreaX;

// Control elements
let complexitySelect;
let visualSlider;
let textSlider;
let integrationSlider;
let experienceSelect;
let animationToggle;

// Control values
let contentComplexity = 1; // 0: Simple, 1: Moderate, 2: Complex
let visualElements = 8;
let textDensity = 5;
let integrationLevel = 5; // 1: Split, 10: Integrated
let learnerExperience = 1; // 0: Novice, 1: Intermediate, 2: Expert
let animationActive = false;

// Load values (percentages)
let intrinsicLoad = 0;
let extraneousLoad = 0;
let germaneLoad = 0;
let totalLoad = 0;

// Animation
let meterNeedle = 0;
let targetNeedle = 0;
let warningFlash = 0;
let animationPhase = 0;
let contentElements = [];

// Colors
const greenZone = '#27AE60';
const yellowZone = '#F39C12';
const redZone = '#E74C3C';
const intrinsicColor = '#3498DB';
const extraneousColor = '#E74C3C';
const germaneColor = '#27AE60';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');
    calculateLayout();
    createControls();
    generateContentElements();
    calculateLoads();

    describe('Interactive cognitive load meter showing real-time load calculations based on content complexity, visual elements, text density, integration level, learner experience, and animation state.', LABEL);
}

function calculateLayout() {
    contentAreaWidth = canvasWidth * 0.65;
    meterAreaWidth = canvasWidth * 0.35;
    meterAreaX = contentAreaWidth;
}

function createControls() {
    let controlContainer = createDiv('');
    controlContainer.parent(document.querySelector('main'));
    controlContainer.style('display', 'flex');
    controlContainer.style('flex-wrap', 'wrap');
    controlContainer.style('gap', '15px');
    controlContainer.style('padding', '15px 20px');
    controlContainer.style('font-family', 'Arial, sans-serif');
    controlContainer.style('background', '#f5f5f5');
    controlContainer.style('border-radius', '8px');
    controlContainer.style('margin-top', '10px');
    controlContainer.style('max-width', (canvasWidth - 40) + 'px');

    // Content Complexity dropdown
    let complexityDiv = createControlDiv(controlContainer, 'Content Complexity:');
    complexitySelect = createSelect();
    complexitySelect.parent(complexityDiv);
    complexitySelect.option('Simple', 0);
    complexitySelect.option('Moderate', 1);
    complexitySelect.option('Complex', 2);
    complexitySelect.selected(1);
    complexitySelect.changed(() => {
        contentComplexity = parseInt(complexitySelect.value());
        generateContentElements();
        calculateLoads();
    });
    styleSelect(complexitySelect);

    // Visual Elements slider
    visualSlider = createSliderControl(controlContainer, 'Visual Elements:', 1, 20, 8, (val) => {
        visualElements = val;
        generateContentElements();
        calculateLoads();
    });

    // Text Density slider
    textSlider = createSliderControl(controlContainer, 'Text Density:', 1, 10, 5, (val) => {
        textDensity = val;
        generateContentElements();
        calculateLoads();
    });

    // Integration Level slider
    integrationSlider = createSliderControl(controlContainer, 'Integration:', 1, 10, 5, (val) => {
        integrationLevel = val;
        generateContentElements();
        calculateLoads();
    }, 'Split', 'Integrated');

    // Learner Experience dropdown
    let experienceDiv = createControlDiv(controlContainer, 'Learner Experience:');
    experienceSelect = createSelect();
    experienceSelect.parent(experienceDiv);
    experienceSelect.option('Novice', 0);
    experienceSelect.option('Intermediate', 1);
    experienceSelect.option('Expert', 2);
    experienceSelect.selected(1);
    experienceSelect.changed(() => {
        learnerExperience = parseInt(experienceSelect.value());
        calculateLoads();
    });
    styleSelect(experienceSelect);

    // Animation toggle
    let animDiv = createControlDiv(controlContainer, 'Animation:');
    animationToggle = createCheckbox('Active', false);
    animationToggle.parent(animDiv);
    animationToggle.style('font-size', '12px');
    animationToggle.changed(() => {
        animationActive = animationToggle.checked();
        calculateLoads();
    });
}

function createControlDiv(parent, labelText) {
    let div = createDiv('');
    div.parent(parent);
    div.style('display', 'flex');
    div.style('flex-direction', 'column');
    div.style('gap', '3px');

    let label = createSpan(labelText);
    label.parent(div);
    label.style('font-size', '12px');
    label.style('color', '#555');

    return div;
}

function styleSelect(sel) {
    sel.style('padding', '5px 10px');
    sel.style('border-radius', '4px');
    sel.style('border', '1px solid #ccc');
    sel.style('font-size', '12px');
}

function createSliderControl(parent, labelText, minVal, maxVal, defaultVal, callback, minLabel, maxLabel) {
    let sliderDiv = createDiv('');
    sliderDiv.parent(parent);
    sliderDiv.style('display', 'flex');
    sliderDiv.style('flex-direction', 'column');
    sliderDiv.style('gap', '3px');

    let label = createSpan(labelText);
    label.parent(sliderDiv);
    label.style('font-size', '12px');
    label.style('color', '#555');

    let sliderRow = createDiv('');
    sliderRow.parent(sliderDiv);
    sliderRow.style('display', 'flex');
    sliderRow.style('align-items', 'center');
    sliderRow.style('gap', '5px');

    if (minLabel) {
        let minSpan = createSpan(minLabel);
        minSpan.parent(sliderRow);
        minSpan.style('font-size', '10px');
        minSpan.style('color', '#888');
    }

    let slider = createSlider(minVal, maxVal, defaultVal);
    slider.parent(sliderRow);
    slider.style('width', '80px');

    if (maxLabel) {
        let maxSpan = createSpan(maxLabel);
        maxSpan.parent(sliderRow);
        maxSpan.style('font-size', '10px');
        maxSpan.style('color', '#888');
    }

    let valueSpan = createSpan(String(defaultVal));
    valueSpan.parent(sliderRow);
    valueSpan.style('font-size', '12px');
    valueSpan.style('color', '#333');
    valueSpan.style('min-width', '25px');
    valueSpan.style('text-align', 'center');
    valueSpan.style('font-weight', 'bold');

    slider.input(() => {
        valueSpan.html(slider.value());
        callback(slider.value());
    });

    return slider;
}

function generateContentElements() {
    contentElements = [];

    // Generate visual elements based on settings
    let numElements = visualElements;
    let separation = map(integrationLevel, 1, 10, 150, 20);

    for (let i = 0; i < numElements; i++) {
        contentElements.push({
            x: random(40, contentAreaWidth - 100),
            y: random(80, drawHeight - 150),
            size: random(20, 50),
            type: floor(random(4)), // 0: circle, 1: rect, 2: triangle, 3: line
            color: color(random(100, 200), random(100, 200), random(100, 200), 180),
            rotation: random(TWO_PI),
            speed: random(0.01, 0.03)
        });
    }
}

function calculateLoads() {
    // Experience multiplier (novice=1.5, intermediate=1.0, expert=0.6)
    let experienceMultiplier = [1.5, 1.0, 0.6][learnerExperience];

    // Base intrinsic load from content complexity
    let baseIntrinsic = [15, 30, 50][contentComplexity];
    intrinsicLoad = baseIntrinsic * experienceMultiplier;

    // Extraneous load factors
    let visualClutter = map(visualElements, 1, 20, 2, 25);
    let textProcessing = map(textDensity, 1, 10, 2, 15);
    let splitAttention = map(integrationLevel, 1, 10, 20, 2); // Lower integration = more split attention
    let animationProcessing = animationActive ? 12 : 0;

    extraneousLoad = visualClutter + textProcessing + splitAttention + animationProcessing;

    // Germane load (learning effort - productive)
    // Higher when extraneous is managed well
    let baseGermane = 15;
    let extraneousPenalty = map(extraneousLoad, 0, 60, 0, 10);
    germaneLoad = max(5, baseGermane - extraneousPenalty + [0, 3, 6][learnerExperience]);

    // Total load
    totalLoad = intrinsicLoad + extraneousLoad + germaneLoad;

    // Cap at 100 for display
    totalLoad = min(totalLoad, 100);
    targetNeedle = totalLoad;
}

function draw() {
    background(250);

    // Animate needle
    meterNeedle = lerp(meterNeedle, targetNeedle, 0.08);

    // Update animation phase
    if (animationActive) {
        animationPhase += 0.02;
    }

    // Warning flash
    if (totalLoad >= 70) {
        warningFlash = (warningFlash + 0.1) % TWO_PI;
    }

    // Draw content area
    drawContentArea();

    // Draw meter area
    drawMeterArea();

    // Draw divider
    stroke(200);
    strokeWeight(2);
    line(contentAreaWidth, 0, contentAreaWidth, drawHeight);
}

function drawContentArea() {
    // Background
    fill(255);
    noStroke();
    rect(0, 0, contentAreaWidth, drawHeight);

    // Title
    fill(50);
    textSize(16);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text("Sample Instructional Content", contentAreaWidth / 2, 15);
    textStyle(NORMAL);

    // Complexity label
    textSize(11);
    fill(100);
    let complexityLabels = ['Simple', 'Moderate', 'Complex'];
    text('Complexity: ' + complexityLabels[contentComplexity], contentAreaWidth / 2, 38);

    // Draw content preview box
    let boxX = 25;
    let boxY = 60;
    let boxW = contentAreaWidth - 50;
    let boxH = drawHeight - 100;

    fill(252, 252, 255);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 5);

    push();
    // Clip to content box
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(boxX, boxY, boxW, boxH);
    drawingContext.clip();

    // Draw visual elements
    for (let elem of contentElements) {
        let x = elem.x;
        let y = elem.y;

        // Apply integration level (separation)
        let separation = map(integrationLevel, 10, 1, 0, 50);
        x += sin(elem.rotation) * separation;
        y += cos(elem.rotation) * separation;

        // Animation movement
        if (animationActive) {
            x += sin(animationPhase + elem.rotation) * 15;
            y += cos(animationPhase * 0.7 + elem.rotation) * 10;
        }

        fill(elem.color);
        noStroke();

        push();
        translate(x, y);
        if (animationActive) {
            rotate(animationPhase * elem.speed * 10);
        }

        switch(elem.type) {
            case 0: // circle
                ellipse(0, 0, elem.size, elem.size);
                break;
            case 1: // rect
                rectMode(CENTER);
                rect(0, 0, elem.size, elem.size * 0.7, 3);
                break;
            case 2: // triangle
                triangle(-elem.size/2, elem.size/3, elem.size/2, elem.size/3, 0, -elem.size/2);
                break;
            case 3: // line/connector
                stroke(elem.color);
                strokeWeight(3);
                line(-elem.size/2, -elem.size/4, elem.size/2, elem.size/4);
                break;
        }
        pop();
    }

    // Draw text blocks based on density
    drawTextBlocks(boxX, boxY, boxW, boxH);

    // Draw diagram based on complexity
    drawDiagram(boxX, boxY, boxW, boxH);

    drawingContext.restore();
    pop();
}

function drawTextBlocks(boxX, boxY, boxW, boxH) {
    let numLines = textDensity * 2;
    let lineHeight = 12;
    let startY = boxY + boxH - 20 - numLines * lineHeight;

    // Text separation from visuals based on integration
    let textOffset = map(integrationLevel, 1, 10, boxW * 0.6, 0);

    fill(80);
    noStroke();
    textSize(9);
    textAlign(LEFT, TOP);

    for (let i = 0; i < numLines; i++) {
        let lineWidth = random(boxW * 0.3, boxW * 0.5);
        let x = boxX + 15 + textOffset;
        let y = startY + i * lineHeight;

        // Draw text line representation
        fill(180);
        rect(x, y, lineWidth, 8, 2);
    }
}

function drawDiagram(boxX, boxY, boxW, boxH) {
    let diagramX = boxX + 40;
    let diagramY = boxY + 80;
    let diagramW = 180;
    let diagramH = 150;

    // Adjust position based on integration
    let offset = map(integrationLevel, 1, 10, 100, 0);
    diagramX += offset;

    // Draw based on complexity
    stroke(100);
    strokeWeight(1);
    noFill();

    if (contentComplexity === 0) {
        // Simple: basic shapes
        fill(200, 220, 255);
        ellipse(diagramX + diagramW/2, diagramY + diagramH/2, 80, 80);
        fill(50);
        textSize(10);
        textAlign(CENTER, CENTER);
        text("Concept A", diagramX + diagramW/2, diagramY + diagramH/2);
    } else if (contentComplexity === 1) {
        // Moderate: connected nodes
        fill(200, 220, 255);
        ellipse(diagramX + 40, diagramY + 40, 50, 50);
        ellipse(diagramX + diagramW - 40, diagramY + 40, 50, 50);
        ellipse(diagramX + diagramW/2, diagramY + diagramH - 30, 50, 50);

        stroke(150);
        line(diagramX + 65, diagramY + 50, diagramX + diagramW - 65, diagramY + 50);
        line(diagramX + 50, diagramY + 65, diagramX + diagramW/2 - 15, diagramY + diagramH - 55);
        line(diagramX + diagramW - 50, diagramY + 65, diagramX + diagramW/2 + 15, diagramY + diagramH - 55);

        fill(50);
        noStroke();
        textSize(9);
        textAlign(CENTER, CENTER);
        text("A", diagramX + 40, diagramY + 40);
        text("B", diagramX + diagramW - 40, diagramY + 40);
        text("C", diagramX + diagramW/2, diagramY + diagramH - 30);
    } else {
        // Complex: network diagram
        let nodes = [];
        for (let i = 0; i < 6; i++) {
            let angle = (TWO_PI / 6) * i - HALF_PI;
            let r = 55;
            nodes.push({
                x: diagramX + diagramW/2 + cos(angle) * r,
                y: diagramY + diagramH/2 + sin(angle) * r
            });
        }
        nodes.push({ x: diagramX + diagramW/2, y: diagramY + diagramH/2 });

        // Draw connections
        stroke(150);
        strokeWeight(1);
        for (let i = 0; i < 6; i++) {
            line(nodes[6].x, nodes[6].y, nodes[i].x, nodes[i].y);
            line(nodes[i].x, nodes[i].y, nodes[(i+1)%6].x, nodes[(i+1)%6].y);
        }

        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
            fill(i === 6 ? color(255, 200, 200) : color(200, 220, 255));
            stroke(100);
            ellipse(nodes[i].x, nodes[i].y, 35, 35);

            fill(50);
            noStroke();
            textSize(8);
            textAlign(CENTER, CENTER);
            text(String.fromCharCode(65 + i), nodes[i].x, nodes[i].y);
        }
    }
}

function drawMeterArea() {
    let areaX = meterAreaX;
    let areaW = meterAreaWidth;

    // Background
    fill(248, 248, 252);
    noStroke();
    rect(areaX, 0, areaW, drawHeight);

    // Title
    fill(50);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text("Cognitive Load Meter", areaX + areaW/2, 15);
    textStyle(NORMAL);

    // Draw thermometer-style meter
    drawThermometerMeter(areaX + areaW/2 - 30, 50, 60, 200);

    // Draw breakdown bars
    drawBreakdownBars(areaX + 20, 280, areaW - 40);

    // Draw tips when overloaded
    if (totalLoad >= 70) {
        drawTips(areaX + 15, 450, areaW - 30);
    }
}

function drawThermometerMeter(x, y, w, h) {
    // Meter background
    fill(240);
    stroke(180);
    strokeWeight(2);
    rect(x, y, w, h, 8);

    // Zone colors (from bottom to top)
    let greenH = h * 0.4;
    let yellowH = h * 0.3;
    let redH = h * 0.3;

    // Draw zones
    noStroke();

    // Green zone (bottom)
    fill(greenZone);
    rect(x + 4, y + h - greenH, w - 8, greenH - 4, 0, 0, 6, 6);

    // Yellow zone (middle)
    fill(yellowZone);
    rect(x + 4, y + redH, w - 8, yellowH);

    // Red zone (top)
    fill(redZone);
    rect(x + 4, y + 4, w - 8, redH - 4, 6, 6, 0, 0);

    // Zone labels
    fill(255);
    textSize(9);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("RISK", x + w/2, y + redH/2 + 2);
    text("MOD", x + w/2, y + redH + yellowH/2);
    text("OK", x + w/2, y + h - greenH/2 - 2);
    textStyle(NORMAL);

    // Percentage markers
    fill(80);
    textSize(8);
    textAlign(RIGHT, CENTER);
    text("100%", x - 5, y + 8);
    text("70%", x - 5, y + redH);
    text("40%", x - 5, y + redH + yellowH);
    text("0%", x - 5, y + h - 8);

    // Draw fill level
    let fillH = map(meterNeedle, 0, 100, 0, h - 8);
    fillH = constrain(fillH, 0, h - 8);

    // Gradient fill
    let fillY = y + h - 4 - fillH;

    // Semi-transparent overlay for current level
    fill(50, 50, 50, 100);
    rect(x + 8, fillY, w - 16, fillH, 4);

    // Needle/indicator line
    stroke(50);
    strokeWeight(3);
    let needleY = y + h - 4 - fillH;
    line(x - 10, needleY, x + w + 10, needleY);

    // Needle triangle
    fill(50);
    noStroke();
    triangle(x - 15, needleY, x - 5, needleY - 6, x - 5, needleY + 6);
    triangle(x + w + 15, needleY, x + w + 5, needleY - 6, x + w + 5, needleY + 6);

    // Percentage display
    let displayY = y + h + 20;

    // Warning flash effect
    if (totalLoad >= 70) {
        let flashAlpha = map(sin(warningFlash), -1, 1, 150, 255);
        fill(231, 76, 60, flashAlpha);
        noStroke();
        rect(x - 15, displayY - 5, w + 30, 30, 5);
    }

    fill(totalLoad >= 70 ? 255 : 50);
    textSize(20);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(nf(meterNeedle, 1, 0) + "%", x + w/2, displayY);
    textStyle(NORMAL);

    // Status text
    let status = totalLoad < 40 ? "Comfortable" : (totalLoad < 70 ? "Moderate" : "Overload Risk!");
    textSize(11);
    text(status, x + w/2, displayY + 25);
}

function drawBreakdownBars(x, y, w) {
    // Title
    fill(50);
    textSize(11);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text("Load Breakdown", x, y);
    textStyle(NORMAL);

    let barY = y + 25;
    let barH = 18;
    let barGap = 35;
    let maxBarW = w - 50;

    let loads = [
        { name: "Intrinsic", value: intrinsicLoad, color: intrinsicColor, desc: "Content complexity" },
        { name: "Extraneous", value: extraneousLoad, color: extraneousColor, desc: "Design overhead" },
        { name: "Germane", value: germaneLoad, color: germaneColor, desc: "Learning effort" }
    ];

    for (let load of loads) {
        // Label
        fill(80);
        textSize(10);
        textAlign(LEFT, CENTER);
        text(load.name, x, barY + barH/2);

        // Background bar
        let barX = x + 60;
        fill(230);
        noStroke();
        rect(barX, barY, maxBarW, barH, 3);

        // Value bar
        fill(load.color);
        let valW = map(load.value, 0, 60, 0, maxBarW);
        valW = constrain(valW, 0, maxBarW);
        rect(barX, barY, valW, barH, 3);

        // Value text
        fill(80);
        textSize(9);
        textAlign(LEFT, CENTER);
        text(nf(load.value, 1, 0) + "%", barX + maxBarW + 5, barY + barH/2);

        barY += barGap;
    }

    // Calculation factors
    barY += 10;
    fill(100);
    textSize(9);
    textAlign(LEFT, TOP);
    text("Calculation Factors:", x, barY);

    barY += 15;
    textSize(8);
    fill(120);

    let experienceNames = ['Novice (1.5x)', 'Intermediate (1.0x)', 'Expert (0.6x)'];
    let complexityNames = ['Simple (15)', 'Moderate (30)', 'Complex (50)'];

    text("Base intrinsic: " + complexityNames[contentComplexity] + " x " + experienceNames[learnerExperience].split(' ')[1], x, barY);
    barY += 12;
    text("Visual clutter: +" + nf(map(visualElements, 1, 20, 2, 25), 1, 0) + "%", x, barY);
    barY += 12;
    text("Text processing: +" + nf(map(textDensity, 1, 10, 2, 15), 1, 0) + "%", x, barY);
    barY += 12;
    text("Split attention: +" + nf(map(integrationLevel, 1, 10, 20, 2), 1, 0) + "%", x, barY);
    barY += 12;
    if (animationActive) {
        text("Animation: +12%", x, barY);
    } else {
        fill(180);
        text("Animation: +0%", x, barY);
    }
}

function drawTips(x, y, w) {
    // Tips box
    let flashAlpha = map(sin(warningFlash * 0.5), -1, 1, 200, 255);
    fill(255, 240, 240, flashAlpha);
    stroke(231, 76, 60);
    strokeWeight(1);
    rect(x, y, w, 85, 5);

    fill(180, 50, 50);
    textSize(10);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text("Tips to Reduce Load:", x + 10, y + 8);
    textStyle(NORMAL);

    textSize(9);
    fill(100, 40, 40);
    let tipY = y + 25;

    // Generate relevant tips based on current settings
    let tips = [];

    if (visualElements > 10) {
        tips.push("Reduce visual elements (currently " + visualElements + ")");
    }
    if (textDensity > 6) {
        tips.push("Decrease text density");
    }
    if (integrationLevel < 5) {
        tips.push("Better integrate text and visuals");
    }
    if (animationActive) {
        tips.push("Turn off animation when not needed");
    }
    if (contentComplexity === 2 && learnerExperience === 0) {
        tips.push("Scaffold complex content for novices");
    }

    if (tips.length === 0) {
        tips.push("Consider simplifying content");
    }

    for (let i = 0; i < min(tips.length, 4); i++) {
        text("- " + tips[i], x + 10, tipY);
        tipY += 14;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    calculateLayout();
    generateContentElements();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 950);
        canvasWidth = max(canvasWidth, 600);
        calculateLayout();
    }
}
