// Parameter Space Explorer MicroSim
// Interactive visualization for exploring parameter spaces and system behaviors
// Students can click on the heat map to explore different parameter combinations

// Canvas dimensions
let canvasWidth = 1200;
let drawHeight = 750;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Heat map dimensions and position
let heatMapSize = 500;
let heatMapX = 50;
let heatMapY = 80;

// System visualization dimensions
let sysVizSize = 350;
let sysVizX, sysVizY;

// Parameter traces dimensions
let tracesWidth = 180;
let tracesHeight = 350;
let tracesX, tracesY;

// Analysis panel dimensions
let analysisPanelWidth = 350;
let analysisPanelHeight = 180;
let analysisPanelX, analysisPanelY;

// Parameter space data
let parameterData = [];
let resolution = 50;
let minResolution = 10;
let maxResolution = 80;

// Current parameter values
let paramX = 0.5;  // sigma for Lorenz (normalized 0-1)
let paramY = 0.5;  // rho for Lorenz (normalized 0-1)

// Actual Lorenz parameters
let sigma = 10;    // Range: 0-20
let rho = 28;      // Range: 0-50
let beta = 8/3;    // Fixed for simplicity

// Exploration history
let explorationHistory = [];
let maxHistoryPoints = 100;

// Interesting points saved by user
let savedPoints = [];
let maxSavedPoints = 20;

// Lorenz attractor state
let lorenzPoints = [];
let lorenzX = 0.1, lorenzY = 0, lorenzZ = 0;
let dt = 0.01;
let lorenzIterations = 2000;

// Behavior metrics
let currentMetric = 'lyapunov';
let metrics = ['lyapunov', 'period', 'stability', 'amplitude'];
let metricNames = {
    'lyapunov': 'Lyapunov Exponent',
    'period': 'Oscillation Period',
    'stability': 'Stability Index',
    'amplitude': 'Attractor Size'
};

// UI Controls
let metricSelect;
let resolutionSlider;
let scanButton;
let exportButton;
let clearButton;

// Colors for heat map
let coolColor, warmColor, hotColor;
let trailColor;

// Hover preview
let hoverX = -1, hoverY = -1;
let isHovering = false;

// Animation
let needsRecalculation = true;
let isScanning = false;
let scanProgress = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    coolColor = color(0, 100, 255);
    warmColor = color(255, 255, 0);
    hotColor = color(255, 50, 50);
    trailColor = color(100, 200, 100, 150);

    calculateLayout();
    createControls();

    // Calculate initial parameter space
    calculateParameterSpace();

    // Calculate initial Lorenz attractor
    calculateLorenzAttractor();

    textFont('Arial');

    describe('Parameter Space Explorer for visualizing the Lorenz system behavior across different parameter values. Click on the heat map to explore, drag to create parameter sweeps.');
}

function draw() {
    updateCanvasSize();
    calculateLayout();

    // Background
    background(245);

    // Title
    fill(40);
    noStroke();
    textSize(22);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text("Parameter Space Explorer - Lorenz System", margin, 15);
    textStyle(NORMAL);
    textSize(12);
    fill(100);
    text("Click on heat map to explore parameter combinations | Drag to create sweeps", margin, 42);

    // Draw main components
    drawHeatMap();
    drawSystemVisualization();
    drawParameterTraces();
    drawAnalysisPanel();

    // Draw control area background
    fill(235);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update control positions
    updateControlPositions();

    // Draw control labels
    drawControlLabels();

    // Recalculate if needed
    if (needsRecalculation) {
        calculateParameterSpace();
        needsRecalculation = false;
    }

    // Handle scanning animation
    if (isScanning) {
        updateScan();
    }
}

function calculateLayout() {
    // Recalculate positions based on canvas size
    let availableWidth = canvasWidth - heatMapX - heatMapSize - 60;

    sysVizX = heatMapX + heatMapSize + 40;
    sysVizY = heatMapY;

    tracesX = sysVizX + sysVizSize + 20;
    tracesY = heatMapY;

    analysisPanelX = sysVizX;
    analysisPanelY = sysVizY + sysVizSize + 20;
}

function createControls() {
    // Metric selector dropdown
    metricSelect = createSelect();
    metricSelect.option('Lyapunov Exponent', 'lyapunov');
    metricSelect.option('Oscillation Period', 'period');
    metricSelect.option('Stability Index', 'stability');
    metricSelect.option('Attractor Size', 'amplitude');
    metricSelect.selected('lyapunov');
    metricSelect.changed(() => {
        currentMetric = metricSelect.value();
        needsRecalculation = true;
    });

    // Resolution slider
    resolutionSlider = createSlider(minResolution, maxResolution, resolution, 5);
    resolutionSlider.style('width', '120px');
    resolutionSlider.input(() => {
        resolution = resolutionSlider.value();
        needsRecalculation = true;
    });

    // Scan region button
    scanButton = createButton('Scan Region');
    scanButton.mousePressed(startScan);
    scanButton.style('padding', '5px 15px');
    scanButton.style('cursor', 'pointer');

    // Export button
    exportButton = createButton('Export Data');
    exportButton.mousePressed(exportData);
    exportButton.style('padding', '5px 15px');
    exportButton.style('cursor', 'pointer');

    // Clear history button
    clearButton = createButton('Clear History');
    clearButton.mousePressed(clearHistory);
    clearButton.style('padding', '5px 15px');
    clearButton.style('cursor', 'pointer');
}

function updateControlPositions() {
    let controlY = drawHeight + 15;
    let startX = 20;
    let spacing = 180;

    metricSelect.position(startX + 60, controlY);
    resolutionSlider.position(startX + spacing + 80, controlY);
    scanButton.position(startX + spacing * 2 + 60, controlY);
    exportButton.position(startX + spacing * 3 + 20, controlY);
    clearButton.position(startX + spacing * 4 - 20, controlY);
}

function drawControlLabels() {
    fill(60);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);

    let controlY = drawHeight + 22;
    let startX = 20;
    let spacing = 180;

    text('Metric:', startX, controlY);
    text('Resolution: ' + resolution, startX + spacing, controlY);
}

function calculateParameterSpace() {
    parameterData = [];

    for (let i = 0; i < resolution; i++) {
        parameterData[i] = [];
        for (let j = 0; j < resolution; j++) {
            let s = map(i, 0, resolution - 1, 0, 20);  // sigma: 0-20
            let r = map(j, 0, resolution - 1, 0, 50);  // rho: 0-50

            let metricValue = calculateMetric(s, r, beta, currentMetric);
            parameterData[i][j] = metricValue;
        }
    }
}

function calculateMetric(s, r, b, metric) {
    // Simplified metric calculations based on Lorenz system properties
    // These are approximations for visualization purposes

    switch(metric) {
        case 'lyapunov':
            // Approximate Lyapunov exponent (chaotic when positive)
            // The Lorenz system becomes chaotic around rho > 24.74
            if (r < 1) return -1;
            let criticalRho = 24.74;
            if (r < criticalRho) {
                return map(r, 0, criticalRho, -0.5, 0);
            } else {
                // Chaotic regime with some structure
                let lyap = 0.9 + 0.1 * sin(r * 0.5) + 0.05 * sin(s * 0.3);
                return constrain(lyap, 0, 1.5);
            }

        case 'period':
            // Approximate oscillation period
            if (r < 1) return 10;
            let period = 10 / (1 + sqrt(r - 1) * 0.3);
            period += s * 0.05;
            return constrain(period, 0.5, 10);

        case 'stability':
            // Stability index (higher = more stable fixed points)
            let stability = 1;
            if (r < 1) {
                stability = 1;  // Origin is stable
            } else if (r < 24.74) {
                stability = map(r, 1, 24.74, 0.8, 0.3);  // Fixed points exist but stability decreases
            } else {
                stability = 0.1 + 0.1 * random();  // Chaotic - unstable
            }
            stability -= abs(s - 10) * 0.02;  // Deviation from sigma=10 reduces stability
            return constrain(stability, 0, 1);

        case 'amplitude':
            // Attractor size/amplitude
            if (r < 1) return 0;
            let amp = sqrt(b * (r - 1));
            if (r > 24.74) {
                amp *= (1 + 0.3 * sin(r * 0.2));  // Chaotic variation
            }
            return constrain(amp, 0, 15);

        default:
            return 0;
    }
}

function drawHeatMap() {
    // Draw border
    stroke(100);
    strokeWeight(1);
    fill(255);
    rect(heatMapX - 2, heatMapY - 2, heatMapSize + 4, heatMapSize + 4);

    // Draw heat map cells
    let cellWidth = heatMapSize / resolution;
    let cellHeight = heatMapSize / resolution;

    // Find min/max for color scaling
    let minVal = Infinity, maxVal = -Infinity;
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            if (parameterData[i] && parameterData[i][j] !== undefined) {
                minVal = min(minVal, parameterData[i][j]);
                maxVal = max(maxVal, parameterData[i][j]);
            }
        }
    }

    // Draw cells
    noStroke();
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            if (parameterData[i] && parameterData[i][j] !== undefined) {
                let val = parameterData[i][j];
                let normalizedVal = map(val, minVal, maxVal, 0, 1);
                let cellColor = getHeatColor(normalizedVal);

                fill(cellColor);
                rect(heatMapX + i * cellWidth, heatMapY + (resolution - 1 - j) * cellHeight, cellWidth + 1, cellHeight + 1);
            }
        }
    }

    // Draw stability boundary (approximate at rho = 24.74)
    stroke(255, 255, 255);
    strokeWeight(2);
    let boundaryY = heatMapY + heatMapSize - map(24.74, 0, 50, 0, heatMapSize);
    line(heatMapX, boundaryY, heatMapX + heatMapSize, boundaryY);

    // Draw bifurcation points
    drawBifurcationPoints();

    // Draw exploration history trail
    drawExplorationTrail();

    // Draw saved points
    drawSavedPoints();

    // Draw current position crosshairs
    drawCrosshairs();

    // Draw hover preview
    if (isHovering) {
        drawHoverPreview();
    }

    // Axis labels
    fill(40);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text("sigma (0-20)", heatMapX + heatMapSize / 2, heatMapY + heatMapSize + 8);

    push();
    translate(heatMapX - 25, heatMapY + heatMapSize / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text("rho (0-50)", 0, 0);
    pop();

    // Draw color legend
    drawColorLegend();
}

function getHeatColor(normalizedVal) {
    if (normalizedVal < 0.5) {
        return lerpColor(coolColor, warmColor, normalizedVal * 2);
    } else {
        return lerpColor(warmColor, hotColor, (normalizedVal - 0.5) * 2);
    }
}

function drawBifurcationPoints() {
    // Mark key bifurcation points in the Lorenz system
    let bifurcations = [
        {sigma: 10, rho: 1, label: "Pitchfork"},
        {sigma: 10, rho: 24.74, label: "Hopf"},
        {sigma: 10, rho: 28, label: "Chaos"}
    ];

    stroke(255);
    strokeWeight(2);
    fill(255, 100, 100);

    for (let bf of bifurcations) {
        let x = heatMapX + map(bf.sigma, 0, 20, 0, heatMapSize);
        let y = heatMapY + heatMapSize - map(bf.rho, 0, 50, 0, heatMapSize);

        // Draw diamond marker
        push();
        translate(x, y);
        rotate(QUARTER_PI);
        rectMode(CENTER);
        rect(0, 0, 10, 10);
        pop();
    }
}

function drawExplorationTrail() {
    if (explorationHistory.length < 2) return;

    // Draw trail as connected line with fading opacity
    noFill();
    for (let i = 1; i < explorationHistory.length; i++) {
        let alpha = map(i, 0, explorationHistory.length, 50, 200);
        stroke(100, 200, 100, alpha);
        strokeWeight(2);

        let p1 = explorationHistory[i - 1];
        let p2 = explorationHistory[i];

        let x1 = heatMapX + p1.x * heatMapSize;
        let y1 = heatMapY + (1 - p1.y) * heatMapSize;
        let x2 = heatMapX + p2.x * heatMapSize;
        let y2 = heatMapY + (1 - p2.y) * heatMapSize;

        line(x1, y1, x2, y2);
    }

    // Draw points
    for (let i = 0; i < explorationHistory.length; i++) {
        let alpha = map(i, 0, explorationHistory.length, 100, 255);
        let size = map(i, 0, explorationHistory.length, 4, 8);
        fill(100, 200, 100, alpha);
        noStroke();

        let p = explorationHistory[i];
        let x = heatMapX + p.x * heatMapSize;
        let y = heatMapY + (1 - p.y) * heatMapSize;

        ellipse(x, y, size, size);
    }
}

function drawSavedPoints() {
    stroke(255, 200, 0);
    strokeWeight(2);
    fill(255, 200, 0);

    for (let i = 0; i < savedPoints.length; i++) {
        let p = savedPoints[i];
        let x = heatMapX + p.x * heatMapSize;
        let y = heatMapY + (1 - p.y) * heatMapSize;

        // Draw star marker
        push();
        translate(x, y);
        for (let j = 0; j < 5; j++) {
            rotate(TWO_PI / 5);
            line(0, 0, 0, -8);
        }
        pop();

        // Number label
        noStroke();
        textSize(8);
        textAlign(CENTER, CENTER);
        text(i + 1, x, y + 12);
    }
}

function drawCrosshairs() {
    let x = heatMapX + paramX * heatMapSize;
    let y = heatMapY + (1 - paramY) * heatMapSize;

    stroke(255);
    strokeWeight(2);

    // Horizontal line
    line(heatMapX, y, heatMapX + heatMapSize, y);
    // Vertical line
    line(x, heatMapY, x, heatMapY + heatMapSize);

    // Center point
    fill(255);
    ellipse(x, y, 12, 12);
    fill(0);
    ellipse(x, y, 6, 6);
}

function drawHoverPreview() {
    let x = heatMapX + hoverX * heatMapSize;
    let y = heatMapY + (1 - hoverY) * heatMapSize;

    // Draw preview indicator
    stroke(255, 255, 0);
    strokeWeight(1);
    noFill();
    ellipse(x, y, 20, 20);

    // Show parameter values in tooltip
    let tipX = x + 15;
    let tipY = y - 25;

    // Keep tooltip within heat map bounds
    if (tipX + 100 > heatMapX + heatMapSize) tipX = x - 115;
    if (tipY < heatMapY) tipY = y + 15;

    fill(0, 0, 0, 200);
    noStroke();
    rect(tipX, tipY, 100, 40, 5);

    fill(255);
    textSize(10);
    textAlign(LEFT, TOP);
    let hoverSigma = map(hoverX, 0, 1, 0, 20);
    let hoverRho = map(hoverY, 0, 1, 0, 50);
    text("sigma: " + hoverSigma.toFixed(2), tipX + 5, tipY + 5);
    text("rho: " + hoverRho.toFixed(2), tipX + 5, tipY + 20);
}

function drawColorLegend() {
    let legendX = heatMapX + heatMapSize + 10;
    let legendY = heatMapY;
    let legendWidth = 15;
    let legendHeight = heatMapSize;

    // Draw gradient
    for (let i = 0; i < legendHeight; i++) {
        let val = map(i, 0, legendHeight, 1, 0);
        stroke(getHeatColor(val));
        line(legendX, legendY + i, legendX + legendWidth, legendY + i);
    }

    // Border
    stroke(100);
    strokeWeight(1);
    noFill();
    rect(legendX, legendY, legendWidth, legendHeight);

    // Labels
    fill(40);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text("High", legendX + legendWidth + 5, legendY + 10);
    text("Low", legendX + legendWidth + 5, legendY + legendHeight - 10);
}

function drawSystemVisualization() {
    // Border and background
    stroke(100);
    strokeWeight(1);
    fill(10);
    rect(sysVizX, sysVizY, sysVizSize, sysVizSize);

    // Title
    fill(40);
    noStroke();
    textSize(14);
    textAlign(LEFT, BOTTOM);
    textStyle(BOLD);
    text("Lorenz Attractor", sysVizX, sysVizY - 5);
    textStyle(NORMAL);

    // Parameter display
    textSize(11);
    fill(100);
    textAlign(RIGHT, BOTTOM);
    text("sigma=" + sigma.toFixed(2) + "  rho=" + rho.toFixed(2) + "  beta=" + beta.toFixed(2), sysVizX + sysVizSize, sysVizY - 5);

    // Draw Lorenz attractor
    if (lorenzPoints.length > 1) {
        // Find bounds for scaling
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        for (let p of lorenzPoints) {
            minX = min(minX, p.x); maxX = max(maxX, p.x);
            minY = min(minY, p.y); maxY = max(maxY, p.y);
            minZ = min(minZ, p.z); maxZ = max(maxZ, p.z);
        }

        // Add padding
        let padX = (maxX - minX) * 0.1 || 1;
        let padY = (maxY - minY) * 0.1 || 1;

        // Draw trajectory
        noFill();
        beginShape();
        for (let i = 0; i < lorenzPoints.length; i++) {
            let p = lorenzPoints[i];
            let progress = i / lorenzPoints.length;

            // Map to screen coordinates (X-Y projection)
            let screenX = map(p.x, minX - padX, maxX + padX, sysVizX + 20, sysVizX + sysVizSize - 20);
            let screenY = map(p.z, minZ, maxZ + 10, sysVizY + sysVizSize - 20, sysVizY + 20);

            // Color by progress
            let c = lerpColor(color(50, 100, 255), color(255, 100, 50), progress);
            stroke(c);
            strokeWeight(1);

            vertex(screenX, screenY);
        }
        endShape();

        // Draw current point
        if (lorenzPoints.length > 0) {
            let lastP = lorenzPoints[lorenzPoints.length - 1];
            let screenX = map(lastP.x, minX - padX, maxX + padX, sysVizX + 20, sysVizX + sysVizSize - 20);
            let screenY = map(lastP.z, minZ, maxZ + 10, sysVizY + sysVizSize - 20, sysVizY + 20);

            fill(255, 255, 0);
            noStroke();
            ellipse(screenX, screenY, 8, 8);
        }
    }

    // Axis labels
    fill(150);
    textSize(10);
    textAlign(CENTER, TOP);
    text("X", sysVizX + sysVizSize / 2, sysVizY + sysVizSize - 15);

    push();
    translate(sysVizX + 15, sysVizY + sysVizSize / 2);
    rotate(-HALF_PI);
    text("Z", 0, 0);
    pop();
}

function drawParameterTraces() {
    // Check if traces panel fits
    if (tracesX + tracesWidth > canvasWidth - 10) return;

    // Border and background
    stroke(100);
    strokeWeight(1);
    fill(255);
    rect(tracesX, tracesY, tracesWidth, tracesHeight);

    // Title
    fill(40);
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    textStyle(BOLD);
    text("Exploration History", tracesX, tracesY - 5);
    textStyle(NORMAL);

    if (explorationHistory.length < 2) {
        fill(150);
        textSize(10);
        textAlign(CENTER, CENTER);
        text("Click on heat map\nto start exploring", tracesX + tracesWidth / 2, tracesY + tracesHeight / 2);
        return;
    }

    // Draw sigma trace (top half)
    let traceHeight = (tracesHeight - 30) / 2;

    // Sigma trace
    fill(60);
    textSize(10);
    textAlign(LEFT, TOP);
    text("sigma", tracesX + 5, tracesY + 5);

    stroke(100, 150, 255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < explorationHistory.length; i++) {
        let x = map(i, 0, explorationHistory.length - 1, tracesX + 5, tracesX + tracesWidth - 5);
        let y = map(explorationHistory[i].x, 0, 1, tracesY + traceHeight, tracesY + 20);
        vertex(x, y);
    }
    endShape();

    // Rho trace (bottom half)
    fill(60);
    textSize(10);
    textAlign(LEFT, TOP);
    text("rho", tracesX + 5, tracesY + traceHeight + 15);

    stroke(255, 150, 100);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < explorationHistory.length; i++) {
        let x = map(i, 0, explorationHistory.length - 1, tracesX + 5, tracesX + tracesWidth - 5);
        let y = map(explorationHistory[i].y, 0, 1, tracesY + tracesHeight - 5, tracesY + traceHeight + 30);
        vertex(x, y);
    }
    endShape();

    // Separator line
    stroke(200);
    line(tracesX + 5, tracesY + traceHeight + 10, tracesX + tracesWidth - 5, tracesY + traceHeight + 10);
}

function drawAnalysisPanel() {
    // Border and background
    stroke(100);
    strokeWeight(1);
    fill(255);
    rect(analysisPanelX, analysisPanelY, analysisPanelWidth, analysisPanelHeight);

    // Title
    fill(40);
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    textStyle(BOLD);
    text("Analysis Metrics", analysisPanelX, analysisPanelY - 5);
    textStyle(NORMAL);

    // Calculate metrics for current position
    let lyapunov = calculateMetric(sigma, rho, beta, 'lyapunov');
    let period = calculateMetric(sigma, rho, beta, 'period');
    let stability = calculateMetric(sigma, rho, beta, 'stability');
    let amplitude = calculateMetric(sigma, rho, beta, 'amplitude');

    // Display metrics
    let startY = analysisPanelY + 20;
    let lineHeight = 25;
    let labelX = analysisPanelX + 15;
    let valueX = analysisPanelX + 150;
    let barX = analysisPanelX + 200;
    let barWidth = 130;

    // Metric display function
    function drawMetricRow(label, value, minV, maxV, y, highlightColor) {
        fill(60);
        textSize(11);
        textAlign(LEFT, CENTER);
        text(label + ":", labelX, y);

        textAlign(RIGHT, CENTER);
        text(value.toFixed(3), valueX, y);

        // Bar
        let normalizedVal = constrain(map(value, minV, maxV, 0, 1), 0, 1);
        fill(220);
        noStroke();
        rect(barX, y - 6, barWidth, 12, 3);
        fill(highlightColor);
        rect(barX, y - 6, barWidth * normalizedVal, 12, 3);
    }

    drawMetricRow("Lyapunov Exp.", lyapunov, -1, 1.5, startY, color(255, 100, 100));
    drawMetricRow("Period", period, 0, 10, startY + lineHeight, color(100, 200, 100));
    drawMetricRow("Stability", stability, 0, 1, startY + lineHeight * 2, color(100, 150, 255));
    drawMetricRow("Amplitude", amplitude, 0, 15, startY + lineHeight * 3, color(255, 200, 100));

    // System state interpretation
    fill(40);
    textSize(11);
    textAlign(LEFT, TOP);
    textStyle(BOLD);

    let stateText = "";
    if (rho < 1) {
        stateText = "State: Origin is globally stable";
    } else if (rho < 24.74) {
        stateText = "State: Two stable fixed points exist";
    } else {
        stateText = "State: Chaotic attractor present";
    }

    text(stateText, analysisPanelX + 15, startY + lineHeight * 4 + 5);
    textStyle(NORMAL);

    // Saved points count
    fill(100);
    textSize(10);
    text("Saved points: " + savedPoints.length + "/" + maxSavedPoints + " (Double-click to save)", analysisPanelX + 15, startY + lineHeight * 5);
}

function calculateLorenzAttractor() {
    lorenzPoints = [];
    lorenzX = 0.1;
    lorenzY = 0;
    lorenzZ = 0;

    for (let i = 0; i < lorenzIterations; i++) {
        let dx = sigma * (lorenzY - lorenzX);
        let dy = lorenzX * (rho - lorenzZ) - lorenzY;
        let dz = lorenzX * lorenzY - beta * lorenzZ;

        lorenzX += dx * dt;
        lorenzY += dy * dt;
        lorenzZ += dz * dt;

        // Check for divergence
        if (abs(lorenzX) > 1000 || abs(lorenzY) > 1000 || abs(lorenzZ) > 1000) {
            break;
        }

        // Store every 5th point for efficiency
        if (i % 5 === 0) {
            lorenzPoints.push({x: lorenzX, y: lorenzY, z: lorenzZ});
        }
    }
}

function mousePressed() {
    // Check if click is within heat map
    if (mouseX >= heatMapX && mouseX <= heatMapX + heatMapSize &&
        mouseY >= heatMapY && mouseY <= heatMapY + heatMapSize) {

        updateParameterFromMouse();
    }
}

function mouseDragged() {
    // Allow dragging within heat map for parameter sweeps
    if (mouseX >= heatMapX && mouseX <= heatMapX + heatMapSize &&
        mouseY >= heatMapY && mouseY <= heatMapY + heatMapSize) {

        updateParameterFromMouse();
    }
}

function doubleClicked() {
    // Save current point if within heat map
    if (mouseX >= heatMapX && mouseX <= heatMapX + heatMapSize &&
        mouseY >= heatMapY && mouseY <= heatMapY + heatMapSize) {

        if (savedPoints.length < maxSavedPoints) {
            savedPoints.push({
                x: paramX,
                y: paramY,
                sigma: sigma,
                rho: rho,
                metric: calculateMetric(sigma, rho, beta, currentMetric)
            });
        }
    }
}

function updateParameterFromMouse() {
    paramX = constrain((mouseX - heatMapX) / heatMapSize, 0, 1);
    paramY = constrain(1 - (mouseY - heatMapY) / heatMapSize, 0, 1);

    // Update actual parameters
    sigma = map(paramX, 0, 1, 0, 20);
    rho = map(paramY, 0, 1, 0, 50);

    // Add to exploration history
    explorationHistory.push({x: paramX, y: paramY, sigma: sigma, rho: rho});

    // Limit history size
    while (explorationHistory.length > maxHistoryPoints) {
        explorationHistory.shift();
    }

    // Recalculate Lorenz attractor
    calculateLorenzAttractor();
}

function mouseMoved() {
    // Update hover state
    if (mouseX >= heatMapX && mouseX <= heatMapX + heatMapSize &&
        mouseY >= heatMapY && mouseY <= heatMapY + heatMapSize) {

        isHovering = true;
        hoverX = (mouseX - heatMapX) / heatMapSize;
        hoverY = 1 - (mouseY - heatMapY) / heatMapSize;
    } else {
        isHovering = false;
    }
}

function startScan() {
    if (isScanning) return;

    isScanning = true;
    scanProgress = 0;
    explorationHistory = [];
}

function updateScan() {
    // Systematic scan across parameter space
    let scanPoints = 50;
    let scanSpeed = 2;

    for (let i = 0; i < scanSpeed; i++) {
        if (scanProgress >= scanPoints * scanPoints) {
            isScanning = false;
            return;
        }

        let ix = scanProgress % scanPoints;
        let iy = floor(scanProgress / scanPoints);

        paramX = ix / (scanPoints - 1);
        paramY = iy / (scanPoints - 1);

        sigma = map(paramX, 0, 1, 0, 20);
        rho = map(paramY, 0, 1, 0, 50);

        explorationHistory.push({x: paramX, y: paramY, sigma: sigma, rho: rho});

        scanProgress++;
    }

    // Limit history during scan
    while (explorationHistory.length > maxHistoryPoints * 2) {
        explorationHistory.shift();
    }

    // Update attractor at current position
    calculateLorenzAttractor();
}

function exportData() {
    // Create export data object
    let exportObj = {
        timestamp: new Date().toISOString(),
        currentParameters: {
            sigma: sigma,
            rho: rho,
            beta: beta
        },
        currentMetric: currentMetric,
        explorationHistory: explorationHistory,
        savedPoints: savedPoints,
        resolution: resolution
    };

    // Convert to JSON string
    let jsonStr = JSON.stringify(exportObj, null, 2);

    // Create download
    let blob = new Blob([jsonStr], {type: 'application/json'});
    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'parameter-space-exploration-' + Date.now() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearHistory() {
    explorationHistory = [];
    savedPoints = [];
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    calculateLayout();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = max(container.offsetWidth, 900);
    }
}
