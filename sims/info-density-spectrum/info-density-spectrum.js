// Information Density Spectrum MicroSim
// Demonstrates optimal information density for different audiences

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Density slider
let densitySlider;
let audienceSelect;

// Current density level (0-100)
let currentDensity = 50;

// Audience type affects optimal zone
let audienceType = 'intermediate'; // novice, intermediate, expert

// Colors
let sparseColor, optimalColor, denseColor, warningColor;

// Zone definitions based on audience
const audienceZones = {
    novice: { optimal: { min: 25, max: 45 }, name: 'Novice Learner' },
    intermediate: { optimal: { min: 40, max: 60 }, name: 'Intermediate Learner' },
    expert: { optimal: { min: 55, max: 80 }, name: 'Expert Learner' }
};

// Hover state
let hoveredZone = null;

// Zone descriptions
const zoneDescriptions = {
    sparse: {
        title: "Too Sparse",
        subtitle: "Wasted opportunity",
        pros: ["Low cognitive load", "Breathing room", "Easy to scan"],
        cons: ["Requires excessive scrolling", "Wastes screen space", "May seem lacking content"],
        when: "Very young learners, accessibility needs, mobile first design",
        whitespace: "60-80%",
        elements: "2-5",
        comprehension: "< 30 sec",
        cognitiveLoad: "Very Low"
    },
    optimal: {
        title: "Optimal Zone",
        subtitle: "The sweet spot",
        pros: ["Efficient use of space", "Clear organization", "Supports learning flow"],
        cons: ["Requires careful design", "Audience-dependent"],
        when: "Most learning contexts, when audience is well-understood",
        whitespace: "30-50%",
        elements: "5-12",
        comprehension: "30-90 sec",
        cognitiveLoad: "Moderate"
    },
    dense: {
        title: "Too Dense",
        subtitle: "Cognitive overload risk",
        pros: ["Comprehensive info", "Expert-friendly", "Less navigation"],
        cons: ["Overwhelming for novices", "High cognitive load", "Easy to miss details"],
        when: "Expert dashboards, reference materials, advanced users only",
        whitespace: "10-25%",
        elements: "15-30+",
        comprehension: "> 2 min",
        cognitiveLoad: "High"
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
    sparseColor = color(239, 154, 154);      // Light red
    optimalColor = color(129, 199, 132);      // Light green
    denseColor = color(239, 83, 80);          // Red
    warningColor = color(255, 193, 7);        // Amber

    // Create density slider
    let sliderY = drawHeight + 15;
    densitySlider = createSlider(0, 100, 50, 1);
    densitySlider.position(150, sliderY);
    densitySlider.size(200);
    densitySlider.input(() => currentDensity = densitySlider.value());

    // Create audience selector
    audienceSelect = createSelect();
    audienceSelect.position(canvasWidth - 200, sliderY - 5);
    audienceSelect.option('Novice Learner', 'novice');
    audienceSelect.option('Intermediate', 'intermediate');
    audienceSelect.option('Expert', 'expert');
    audienceSelect.selected('intermediate');
    audienceSelect.changed(() => audienceType = audienceSelect.value());

    textFont('Arial');
}

function draw() {
    background(248, 249, 250);

    // Update from slider
    currentDensity = densitySlider.value();
    audienceType = audienceSelect.value();

    // Title
    fill(50);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text("Information Density Spectrum", canvasWidth / 2, 10);

    // Subtitle
    textSize(12);
    fill(100);
    text("Finding the optimal balance for your audience", canvasWidth / 2, 35);

    // Draw the spectrum bar
    drawSpectrum();

    // Draw the three example screens
    drawExampleScreens();

    // Draw current density indicator
    drawDensityIndicator();

    // Draw slider labels
    drawControls();

    // Draw hover tooltip
    checkHover();
    if (hoveredZone) {
        drawTooltip();
    }
}

function drawSpectrum() {
    let spectrumX = 50;
    let spectrumY = 60;
    let spectrumWidth = canvasWidth - 100;
    let spectrumHeight = 30;

    // Get optimal zone for current audience
    let zone = audienceZones[audienceType].optimal;
    let optimalStart = (zone.min / 100) * spectrumWidth;
    let optimalEnd = (zone.max / 100) * spectrumWidth;

    // Draw gradient background
    noStroke();

    // Sparse zone (0 to optimal start)
    for (let x = 0; x < optimalStart; x++) {
        let t = x / optimalStart;
        let c = lerpColor(sparseColor, optimalColor, t * 0.5);
        fill(c);
        rect(spectrumX + x, spectrumY, 1, spectrumHeight);
    }

    // Optimal zone
    fill(optimalColor);
    rect(spectrumX + optimalStart, spectrumY, optimalEnd - optimalStart, spectrumHeight);

    // Dense zone (optimal end to 100)
    let denseWidth = spectrumWidth - optimalEnd;
    for (let x = 0; x < denseWidth; x++) {
        let t = x / denseWidth;
        let c = lerpColor(optimalColor, denseColor, t);
        fill(c);
        rect(spectrumX + optimalEnd + x, spectrumY, 1, spectrumHeight);
    }

    // Border
    stroke(100);
    strokeWeight(2);
    noFill();
    rect(spectrumX, spectrumY, spectrumWidth, spectrumHeight, 3);

    // Zone labels
    textSize(10);
    noStroke();

    // Sparse label
    fill(150, 50, 50);
    textAlign(CENTER, TOP);
    text("TOO SPARSE", spectrumX + optimalStart / 2, spectrumY + spectrumHeight + 5);

    // Optimal label
    fill(46, 125, 50);
    text("OPTIMAL", spectrumX + (optimalStart + optimalEnd) / 2, spectrumY + spectrumHeight + 5);

    // Dense label
    fill(150, 50, 50);
    text("TOO DENSE", spectrumX + optimalEnd + (spectrumWidth - optimalEnd) / 2, spectrumY + spectrumHeight + 5);

    // Audience indicator
    fill(80);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text("Audience: " + audienceZones[audienceType].name, canvasWidth - 50, spectrumY + spectrumHeight / 2);
}

function drawExampleScreens() {
    let screenWidth = 180;
    let screenHeight = 180;
    let screenY = 110;
    let spacing = (canvasWidth - 3 * screenWidth) / 4;

    // Three screens: sparse, current (morphing), dense
    let screens = [
        { x: spacing, density: 20, label: "Sparse", zone: 'sparse' },
        { x: 2 * spacing + screenWidth, density: currentDensity, label: "Current", zone: getCurrentZone() },
        { x: 3 * spacing + 2 * screenWidth, density: 85, label: "Dense", zone: 'dense' }
    ];

    for (let screen of screens) {
        drawMockScreen(screen.x, screenY, screenWidth, screenHeight, screen.density, screen.label, screen.zone);
    }
}

function getCurrentZone() {
    let zone = audienceZones[audienceType].optimal;
    if (currentDensity < zone.min) return 'sparse';
    if (currentDensity > zone.max) return 'dense';
    return 'optimal';
}

function drawMockScreen(x, y, w, h, density, label, zone) {
    // Screen background
    fill(255);
    stroke(zone === 'optimal' ? color(76, 175, 80) : color(180));
    strokeWeight(zone === 'optimal' ? 3 : 2);
    rect(x, y, w, h, 5);

    // Title bar
    noStroke();
    fill(zone === 'optimal' ? color(76, 175, 80) : color(200));
    rect(x + 2, y + 2, w - 4, 20, 3, 3, 0, 0);

    // Draw content based on density
    drawScreenContent(x, y + 25, w, h - 30, density);

    // Zone indicator badge
    let badgeColor;
    if (zone === 'sparse') badgeColor = sparseColor;
    else if (zone === 'optimal') badgeColor = optimalColor;
    else badgeColor = denseColor;

    fill(badgeColor);
    noStroke();
    rect(x + w / 2 - 35, y + h + 5, 70, 18, 9);

    fill(zone === 'optimal' ? 255 : 80);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(label + " (" + density + "%)", x + w / 2, y + h + 14);

    // Indicators below screen
    textSize(9);
    fill(80);
    textAlign(CENTER, TOP);

    let metrics = getMetricsForDensity(density);
    let metricsY = y + h + 28;

    // Whitespace
    text("Whitespace: " + metrics.whitespace, x + w / 4, metricsY);
    text("Elements: " + metrics.elements, x + 3 * w / 4, metricsY);

    // Cognitive load meter
    drawCognitiveLoadMeter(x + w / 2 - 30, metricsY + 18, 60, 8, metrics.cognitiveLoad);
}

function drawScreenContent(x, y, w, h, density) {
    noStroke();
    let padding = 5;
    let innerX = x + padding;
    let innerY = y + padding;
    let innerW = w - 2 * padding;
    let innerH = h - 2 * padding;

    // Calculate number of elements based on density
    let numElements = floor(map(density, 0, 100, 2, 25));
    let elementHeight = 12;
    let spacing = map(density, 0, 100, 20, 4);

    fill(200);

    // Draw mock content elements
    let currentY = innerY;
    let elementsDrawn = 0;

    while (currentY < innerY + innerH - elementHeight && elementsDrawn < numElements) {
        // Vary element widths
        let elemWidth = random(0.4, 0.95) * innerW;

        // Alternate between different element types
        if (elementsDrawn % 5 === 0) {
            // Header-like element
            fill(150);
            rect(innerX, currentY, elemWidth * 0.6, elementHeight + 2, 2);
        } else if (elementsDrawn % 7 === 0 && density > 40) {
            // Graph/chart placeholder
            fill(180, 200, 220);
            rect(innerX, currentY, innerW * 0.8, elementHeight * 2, 2);
            currentY += elementHeight;
        } else {
            // Text line
            fill(200);
            rect(innerX, currentY, elemWidth, elementHeight - 2, 2);
        }

        currentY += elementHeight + spacing;
        elementsDrawn++;
    }

    // If very dense, add some overlapping elements
    if (density > 70) {
        fill(220, 180, 180, 150);
        for (let i = 0; i < floor((density - 70) / 10); i++) {
            rect(innerX + random(innerW * 0.5), innerY + random(innerH * 0.7),
                 random(30, 50), random(15, 25), 2);
        }
    }
}

function getMetricsForDensity(density) {
    if (density < 30) {
        return {
            whitespace: "65%+",
            elements: "2-5",
            cognitiveLoad: 0.2
        };
    } else if (density < 50) {
        return {
            whitespace: "45-60%",
            elements: "5-10",
            cognitiveLoad: 0.4
        };
    } else if (density < 70) {
        return {
            whitespace: "30-45%",
            elements: "8-15",
            cognitiveLoad: 0.6
        };
    } else {
        return {
            whitespace: "<30%",
            elements: "15+",
            cognitiveLoad: 0.85
        };
    }
}

function drawCognitiveLoadMeter(x, y, w, h, level) {
    // Background
    fill(230);
    noStroke();
    rect(x, y, w, h, h/2);

    // Fill level
    let fillColor;
    if (level < 0.4) fillColor = color(76, 175, 80);
    else if (level < 0.7) fillColor = color(255, 193, 7);
    else fillColor = color(239, 83, 80);

    fill(fillColor);
    rect(x, y, w * level, h, h/2);

    // Label
    fill(80);
    textSize(8);
    textAlign(CENTER, TOP);
    text("Cognitive Load", x + w/2, y + h + 2);
}

function drawDensityIndicator() {
    let spectrumX = 50;
    let spectrumY = 60;
    let spectrumWidth = canvasWidth - 100;

    // Current position on spectrum
    let indicatorX = spectrumX + (currentDensity / 100) * spectrumWidth;

    // Draw triangle indicator
    fill(50);
    noStroke();
    triangle(indicatorX - 8, spectrumY - 5, indicatorX + 8, spectrumY - 5, indicatorX, spectrumY + 5);

    // Current value label
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text(currentDensity + "%", indicatorX, spectrumY - 8);
}

function drawControls() {
    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    // Density slider label
    text("Density Level:", 50, drawHeight + 22);

    // Audience selector label
    text("Audience:", canvasWidth - 280, drawHeight + 22);
}

function checkHover() {
    hoveredZone = null;

    let screenWidth = 180;
    let screenHeight = 180;
    let screenY = 110;
    let spacing = (canvasWidth - 3 * screenWidth) / 4;

    // Check which screen is hovered
    let screens = [
        { x: spacing, zone: 'sparse' },
        { x: 2 * spacing + screenWidth, zone: getCurrentZone() },
        { x: 3 * spacing + 2 * screenWidth, zone: 'dense' }
    ];

    for (let screen of screens) {
        if (mouseX >= screen.x && mouseX <= screen.x + screenWidth &&
            mouseY >= screenY && mouseY <= screenY + screenHeight + 50) {
            hoveredZone = screen.zone;
            break;
        }
    }
}

function drawTooltip() {
    if (!hoveredZone || !zoneDescriptions[hoveredZone]) return;

    let info = zoneDescriptions[hoveredZone];

    // Tooltip dimensions
    let tooltipWidth = 280;
    let tooltipHeight = 200;
    let tooltipX = mouseX + 15;
    let tooltipY = mouseY - 20;

    // Keep tooltip on screen
    if (tooltipX + tooltipWidth > canvasWidth - 10) {
        tooltipX = mouseX - tooltipWidth - 15;
    }
    if (tooltipY < 10) tooltipY = 10;
    if (tooltipY + tooltipHeight > drawHeight - 10) {
        tooltipY = drawHeight - tooltipHeight - 10;
    }

    // Draw tooltip background
    fill(255, 255, 255, 250);
    stroke(150);
    strokeWeight(1);
    rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

    // Draw content
    noStroke();
    let yPos = tooltipY + 15;

    // Title with color indicator
    let titleColor = hoveredZone === 'optimal' ? optimalColor :
                     hoveredZone === 'sparse' ? sparseColor : denseColor;

    fill(titleColor);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(info.title, tooltipX + 15, yPos);

    yPos += 18;
    fill(100);
    textSize(10);
    textStyle(ITALIC);
    text(info.subtitle, tooltipX + 15, yPos);

    yPos += 20;

    // Pros
    fill(46, 125, 50);
    textSize(10);
    textStyle(BOLD);
    text("Pros:", tooltipX + 15, yPos);
    textStyle(NORMAL);
    yPos += 12;
    fill(60);
    for (let pro of info.pros.slice(0, 2)) {
        text("+ " + pro, tooltipX + 20, yPos);
        yPos += 12;
    }

    yPos += 5;

    // Cons
    fill(183, 28, 28);
    textStyle(BOLD);
    text("Cons:", tooltipX + 15, yPos);
    textStyle(NORMAL);
    yPos += 12;
    fill(60);
    for (let con of info.cons.slice(0, 2)) {
        text("- " + con, tooltipX + 20, yPos);
        yPos += 12;
    }

    yPos += 8;

    // Metrics
    fill(80);
    textSize(9);
    text("Whitespace: " + info.whitespace + "  |  Elements: " + info.elements, tooltipX + 15, yPos);
    yPos += 12;
    text("Comprehension time: " + info.comprehension, tooltipX + 15, yPos);
    yPos += 12;
    text("Cognitive Load: " + info.cognitiveLoad, tooltipX + 15, yPos);

    yPos += 15;
    fill(100);
    textStyle(ITALIC);
    text("Best for: " + info.when.substring(0, 40) + "...", tooltipX + 15, yPos);
    textStyle(NORMAL);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition controls
    let sliderY = drawHeight + 15;
    densitySlider.position(150, sliderY);
    audienceSelect.position(canvasWidth - 200, sliderY - 5);
}
