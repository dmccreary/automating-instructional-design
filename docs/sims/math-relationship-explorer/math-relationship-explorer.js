// Math Relationship Explorer MicroSim
// Interactive visualization of the Logistic Function
// f(x) = L / (1 + e^(-k(x - x0)))
// Students manipulate parameters to discover mathematical relationships

// Canvas dimensions
let canvasWidth = 1000;
let canvasHeight = 700;

// Layout regions
let equationAreaHeight = 100;
let visualizationWidth = 700;
let visualizationHeight = 500;
let controlPanelWidth = 300;
let derivativeAreaHeight = 100;

// Logistic function parameters
let L = 10;          // Carrying capacity (height)
let k = 1;           // Steepness (growth rate)
let x0 = 0;          // Midpoint (horizontal shift)

// Graph settings
let graphMargin = 50;
let xMin = -10;
let xMax = 10;
let yMin = -2;
let yMax = 15;

// Interactive elements
let tangentX = 0;    // X position of tangent point
let isDraggingTangent = false;

// Integration bounds
let integrationStart = -5;
let integrationEnd = 5;

// UI Controls
let sliderL, sliderK, sliderX0;
let sliderTangent;
let sliderIntegStart, sliderIntegEnd;
let checkboxTangent, checkboxIntegral, checkboxAnnotations, checkboxDerivative;
let randomButton;

// Display options
let showTangent = true;
let showIntegral = true;
let showAnnotations = true;
let showDerivative = true;

// Animation
let animationSpeed = 0.1;
let targetL, targetK, targetX0;

// Colors
let functionColor;
let tangentColor;
let integralColor;
let annotationColor;
let derivativeColor;
let gridColor;
let axisColor;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    functionColor = color(41, 128, 185);      // Blue
    tangentColor = color(231, 76, 60);        // Red
    integralColor = color(46, 204, 113, 100); // Green with transparency
    annotationColor = color(155, 89, 182);    // Purple
    derivativeColor = color(230, 126, 34);    // Orange
    gridColor = color(220, 220, 220);
    axisColor = color(100, 100, 100);

    // Initialize animation targets
    targetL = L;
    targetK = k;
    targetX0 = x0;

    createControls();

    textFont('Arial');

    describe('Interactive logistic function explorer. Adjust parameters L, k, and x0 to see how the curve changes. Shows tangent lines, integrals, and derivatives.', LABEL);
}

function draw() {
    updateCanvasSize();
    background(255);

    // Animate parameter changes
    L = lerp(L, targetL, animationSpeed);
    k = lerp(k, targetK, animationSpeed);
    x0 = lerp(x0, targetX0, animationSpeed);

    // Draw main sections
    drawEquationArea();
    drawVisualizationArea();
    drawControlPanel();
    drawDerivativeArea();

    // Update slider values
    updateSliderValues();
}

function drawEquationArea() {
    // Background
    fill(245, 245, 250);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, canvasWidth, equationAreaHeight);

    // Title
    fill(50);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Logistic Function Explorer', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Main equation with current values
    textSize(16);
    textAlign(CENTER, CENTER);

    let eqText = 'f(x) = L / (1 + e^(-k(x - x' + String.fromCharCode(8320) + ')))';
    text(eqText, canvasWidth / 2, 45);

    // Current parameter values
    textSize(14);
    let paramText = 'L = ' + L.toFixed(2) + '    k = ' + k.toFixed(2) + '    x' + String.fromCharCode(8320) + ' = ' + x0.toFixed(2);
    fill(41, 128, 185);
    text(paramText, canvasWidth / 2, 75);
}

function drawVisualizationArea() {
    let startY = equationAreaHeight;

    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(0, startY, visualizationWidth, visualizationHeight);

    // Define graph region
    let graphX = graphMargin;
    let graphY = startY + graphMargin;
    let graphW = visualizationWidth - 2 * graphMargin;
    let graphH = visualizationHeight - 2 * graphMargin;

    push();
    // Clip to graph region
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(graphX, graphY, graphW, graphH);
    drawingContext.clip();

    // Draw grid
    drawGrid(graphX, graphY, graphW, graphH);

    // Draw integral area (under curve)
    if (showIntegral) {
        drawIntegralArea(graphX, graphY, graphW, graphH);
    }

    // Draw function curve
    drawFunctionCurve(graphX, graphY, graphW, graphH);

    // Draw derivative curve
    if (showDerivative) {
        drawDerivativeCurve(graphX, graphY, graphW, graphH);
    }

    // Draw tangent line
    if (showTangent) {
        drawTangentLine(graphX, graphY, graphW, graphH);
    }

    // Draw annotations
    if (showAnnotations) {
        drawAnnotations(graphX, graphY, graphW, graphH);
    }

    drawingContext.restore();
    pop();

    // Draw axes (outside clip to show labels)
    drawAxes(graphX, graphY, graphW, graphH);

    // Draw legend
    drawLegend(graphX + graphW - 150, graphY + 10);
}

function drawGrid(gx, gy, gw, gh) {
    stroke(gridColor);
    strokeWeight(1);

    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        let px = map(x, xMin, xMax, gx, gx + gw);
        line(px, gy, px, gy + gh);
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        let py = map(y, yMin, yMax, gy + gh, gy);
        line(gx, py, gx + gw, py);
    }
}

function drawAxes(gx, gy, gw, gh) {
    stroke(axisColor);
    strokeWeight(2);

    // X-axis
    let xAxisY = map(0, yMin, yMax, gy + gh, gy);
    if (xAxisY >= gy && xAxisY <= gy + gh) {
        line(gx, xAxisY, gx + gw, xAxisY);
    }

    // Y-axis
    let yAxisX = map(0, xMin, xMax, gx, gx + gw);
    if (yAxisX >= gx && yAxisX <= gx + gw) {
        line(yAxisX, gy, yAxisX, gy + gh);
    }

    // Axis labels
    fill(axisColor);
    noStroke();
    textSize(12);

    // X-axis tick labels
    textAlign(CENTER, TOP);
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 2) {
        let px = map(x, xMin, xMax, gx, gx + gw);
        text(x, px, gy + gh + 5);
    }

    // Y-axis tick labels
    textAlign(RIGHT, CENTER);
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 2) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, gy + gh, gy);
            text(y, gx - 5, py);
        }
    }

    // Axis titles
    textAlign(CENTER, TOP);
    textSize(14);
    text('x', gx + gw / 2, gy + gh + 25);

    push();
    translate(gx - 35, gy + gh / 2);
    rotate(-HALF_PI);
    text('f(x)', 0, 0);
    pop();
}

function logistic(x) {
    return L / (1 + Math.exp(-k * (x - x0)));
}

function logisticDerivative(x) {
    let fx = logistic(x);
    return k * fx * (1 - fx / L);
}

function drawFunctionCurve(gx, gy, gw, gh) {
    stroke(functionColor);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = map(px, gx, gx + gw, xMin, xMax);
        let y = logistic(x);
        let py = map(y, yMin, yMax, gy + gh, gy);
        vertex(px, py);
    }
    endShape();
}

function drawDerivativeCurve(gx, gy, gw, gh) {
    stroke(derivativeColor);
    strokeWeight(2);
    noFill();

    // Scale derivative for visibility
    let derivScale = L / 4;

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = map(px, gx, gx + gw, xMin, xMax);
        let dy = logisticDerivative(x) * derivScale;
        let py = map(dy, yMin, yMax, gy + gh, gy);
        vertex(px, py);
    }
    endShape();
}

function drawTangentLine(gx, gy, gw, gh) {
    let fx = logistic(tangentX);
    let slope = logisticDerivative(tangentX);

    // Tangent line: y - fx = slope * (x - tangentX)
    // y = slope * x - slope * tangentX + fx

    let x1 = xMin;
    let y1 = slope * (x1 - tangentX) + fx;
    let x2 = xMax;
    let y2 = slope * (x2 - tangentX) + fx;

    let px1 = map(x1, xMin, xMax, gx, gx + gw);
    let py1 = map(y1, yMin, yMax, gy + gh, gy);
    let px2 = map(x2, xMin, xMax, gx, gx + gw);
    let py2 = map(y2, yMin, yMax, gy + gh, gy);

    // Draw tangent line
    stroke(tangentColor);
    strokeWeight(2);
    line(px1, py1, px2, py2);

    // Draw tangent point
    let pxT = map(tangentX, xMin, xMax, gx, gx + gw);
    let pyT = map(fx, yMin, yMax, gy + gh, gy);

    fill(tangentColor);
    noStroke();
    ellipse(pxT, pyT, 12, 12);

    // Show slope value
    fill(tangentColor);
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text('slope = ' + slope.toFixed(3), pxT + 10, pyT - 5);
}

function drawIntegralArea(gx, gy, gw, gh) {
    fill(integralColor);
    noStroke();

    beginShape();

    // Start at bottom left of integration region
    let pxStart = map(integrationStart, xMin, xMax, gx, gx + gw);
    let pxEnd = map(integrationEnd, xMin, xMax, gx, gx + gw);
    let pyZero = map(0, yMin, yMax, gy + gh, gy);

    vertex(pxStart, pyZero);

    // Trace the function
    for (let px = pxStart; px <= pxEnd; px += 2) {
        let x = map(px, gx, gx + gw, xMin, xMax);
        let y = logistic(x);
        let py = map(y, yMin, yMax, gy + gh, gy);
        vertex(px, py);
    }

    // Return to bottom
    vertex(pxEnd, pyZero);

    endShape(CLOSE);

    // Calculate numerical integral using trapezoidal rule
    let integral = 0;
    let dx = 0.1;
    for (let x = integrationStart; x < integrationEnd; x += dx) {
        integral += (logistic(x) + logistic(x + dx)) / 2 * dx;
    }

    // Display integral value
    fill(46, 204, 113);
    textSize(11);
    textAlign(CENTER, TOP);
    let midX = (pxStart + pxEnd) / 2;
    let midY = map(L / 2, yMin, yMax, gy + gh, gy);
    text('Area = ' + integral.toFixed(2), midX, midY + 10);
}

function drawAnnotations(gx, gy, gw, gh) {
    // Mark carrying capacity L (horizontal asymptote)
    let pyL = map(L, yMin, yMax, gy + gh, gy);
    if (pyL >= gy && pyL <= gy + gh) {
        stroke(annotationColor);
        strokeWeight(1);
        drawingContext.setLineDash([5, 5]);
        line(gx, pyL, gx + gw, pyL);
        drawingContext.setLineDash([]);

        fill(annotationColor);
        noStroke();
        textSize(11);
        textAlign(LEFT, BOTTOM);
        text('L = ' + L.toFixed(1) + ' (carrying capacity)', gx + 5, pyL - 3);
    }

    // Mark inflection point at x0, L/2
    let pxInflection = map(x0, xMin, xMax, gx, gx + gw);
    let pyInflection = map(L / 2, yMin, yMax, gy + gh, gy);

    if (pxInflection >= gx && pxInflection <= gx + gw) {
        // Vertical dashed line at x0
        stroke(annotationColor);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(pxInflection, gy, pxInflection, gy + gh);
        drawingContext.setLineDash([]);

        // Inflection point marker
        fill(annotationColor);
        noStroke();
        ellipse(pxInflection, pyInflection, 8, 8);

        textSize(10);
        textAlign(LEFT, TOP);
        text('Inflection (' + x0.toFixed(1) + ', ' + (L/2).toFixed(1) + ')', pxInflection + 5, pyInflection + 5);
    }

    // Mark y-axis asymptote at y = 0
    let pyZero = map(0, yMin, yMax, gy + gh, gy);
    stroke(annotationColor);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(gx, pyZero, gx + gw, pyZero);
    drawingContext.setLineDash([]);
}

function drawLegend(lx, ly) {
    let lineHeight = 18;
    let boxWidth = 140;
    let boxHeight = showDerivative ? 85 : 65;

    // Background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(lx, ly, boxWidth, boxHeight, 5);

    let y = ly + 15;

    // Function
    stroke(functionColor);
    strokeWeight(3);
    line(lx + 10, y, lx + 30, y);
    fill(50);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('f(x)', lx + 35, y);

    y += lineHeight;

    // Derivative
    if (showDerivative) {
        stroke(derivativeColor);
        strokeWeight(2);
        line(lx + 10, y, lx + 30, y);
        fill(50);
        noStroke();
        text("f'(x) (scaled)", lx + 35, y);
        y += lineHeight;
    }

    // Tangent
    if (showTangent) {
        stroke(tangentColor);
        strokeWeight(2);
        line(lx + 10, y, lx + 30, y);
        fill(50);
        noStroke();
        text('Tangent line', lx + 35, y);
        y += lineHeight;
    }

    // Integral
    if (showIntegral) {
        fill(integralColor);
        noStroke();
        rect(lx + 10, y - 6, 20, 12);
        fill(50);
        text('Integral area', lx + 35, y);
    }
}

function drawControlPanel() {
    let startX = visualizationWidth;
    let startY = equationAreaHeight;

    // Background
    fill(250, 250, 252);
    stroke(200);
    strokeWeight(1);
    rect(startX, startY, controlPanelWidth, visualizationHeight);

    // Title
    fill(50);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Parameters', startX + controlPanelWidth / 2, startY + 10);
    textStyle(NORMAL);
}

function drawDerivativeArea() {
    let startY = equationAreaHeight + visualizationHeight;

    // Background
    fill(248, 248, 252);
    stroke(200);
    strokeWeight(1);
    rect(0, startY, canvasWidth, derivativeAreaHeight);

    // Title
    fill(50);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Related Expressions:', 20, startY + 10);
    textStyle(NORMAL);

    // Derivative formula
    textSize(13);
    fill(230, 126, 34);
    text("Derivative: f'(x) = k * f(x) * (1 - f(x)/L)", 20, startY + 35);

    // Current derivative value at tangent point
    let derivAtTangent = logisticDerivative(tangentX);
    fill(100);
    text("f'(" + tangentX.toFixed(1) + ") = " + derivAtTangent.toFixed(4), 20, startY + 55);

    // Integral information
    fill(46, 204, 113);
    text("Integral: F(x) = L * ln(1 + e^(k(x-x" + String.fromCharCode(8320) + "))) / k + C", 350, startY + 35);

    // Numerical integral value
    let integral = 0;
    let dx = 0.1;
    for (let x = integrationStart; x < integrationEnd; x += dx) {
        integral += (logistic(x) + logistic(x + dx)) / 2 * dx;
    }
    fill(100);
    text("Area from " + integrationStart.toFixed(1) + " to " + integrationEnd.toFixed(1) + " = " + integral.toFixed(3), 350, startY + 55);

    // Key properties
    fill(155, 89, 182);
    text("Properties: Inflection at x = x" + String.fromCharCode(8320) + ", Max slope = kL/4 = " + (k * L / 4).toFixed(3), 700, startY + 35);

    // Warning for extreme parameters
    if (Math.abs(k) > 5) {
        fill(231, 76, 60);
        text("Warning: High steepness may cause numerical instability", 700, startY + 55);
    } else if (L < 0.5) {
        fill(231, 76, 60);
        text("Warning: Very small L values may be hard to visualize", 700, startY + 55);
    }
}

function createControls() {
    let startX = visualizationWidth + 20;
    let startY = equationAreaHeight + 45;
    let sliderWidth = 200;
    let rowHeight = 55;

    // L slider (carrying capacity)
    sliderL = createSlider(0.5, 15, 10, 0.1);
    sliderL.position(startX, startY);
    sliderL.style('width', sliderWidth + 'px');
    sliderL.input(() => { targetL = sliderL.value(); });

    // K slider (steepness)
    sliderK = createSlider(0.1, 3, 1, 0.05);
    sliderK.position(startX, startY + rowHeight);
    sliderK.style('width', sliderWidth + 'px');
    sliderK.input(() => { targetK = sliderK.value(); });

    // X0 slider (midpoint)
    sliderX0 = createSlider(-8, 8, 0, 0.1);
    sliderX0.position(startX, startY + rowHeight * 2);
    sliderX0.style('width', sliderWidth + 'px');
    sliderX0.input(() => { targetX0 = sliderX0.value(); });

    // Tangent point slider
    sliderTangent = createSlider(-8, 8, 0, 0.1);
    sliderTangent.position(startX, startY + rowHeight * 3);
    sliderTangent.style('width', sliderWidth + 'px');
    sliderTangent.input(() => { tangentX = sliderTangent.value(); });

    // Integration bounds sliders
    sliderIntegStart = createSlider(-10, 10, -5, 0.5);
    sliderIntegStart.position(startX, startY + rowHeight * 4);
    sliderIntegStart.style('width', sliderWidth + 'px');
    sliderIntegStart.input(() => { integrationStart = sliderIntegStart.value(); });

    sliderIntegEnd = createSlider(-10, 10, 5, 0.5);
    sliderIntegEnd.position(startX, startY + rowHeight * 5);
    sliderIntegEnd.style('width', sliderWidth + 'px');
    sliderIntegEnd.input(() => { integrationEnd = sliderIntegEnd.value(); });

    // Checkboxes
    let checkY = startY + rowHeight * 6 + 10;

    checkboxTangent = createCheckbox(' Show Tangent', true);
    checkboxTangent.position(startX, checkY);
    checkboxTangent.changed(() => { showTangent = checkboxTangent.checked(); });

    checkboxIntegral = createCheckbox(' Show Integral', true);
    checkboxIntegral.position(startX, checkY + 25);
    checkboxIntegral.changed(() => { showIntegral = checkboxIntegral.checked(); });

    checkboxAnnotations = createCheckbox(' Show Annotations', true);
    checkboxAnnotations.position(startX, checkY + 50);
    checkboxAnnotations.changed(() => { showAnnotations = checkboxAnnotations.checked(); });

    checkboxDerivative = createCheckbox(' Show Derivative', true);
    checkboxDerivative.position(startX, checkY + 75);
    checkboxDerivative.changed(() => { showDerivative = checkboxDerivative.checked(); });

    // Random parameters button
    randomButton = createButton('Random Parameters');
    randomButton.position(startX + 40, checkY + 110);
    randomButton.style('padding', '8px 16px');
    randomButton.style('cursor', 'pointer');
    randomButton.style('background-color', '#3498db');
    randomButton.style('color', 'white');
    randomButton.style('border', 'none');
    randomButton.style('border-radius', '4px');
    randomButton.mousePressed(randomizeParameters);
}

function updateSliderValues() {
    let startX = visualizationWidth + 20;
    let startY = equationAreaHeight + 35;
    let rowHeight = 55;

    fill(50);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    // Parameter labels with values
    text('L (carrying capacity): ' + L.toFixed(2), startX, startY);
    text('k (steepness): ' + k.toFixed(2), startX, startY + rowHeight);
    text('x' + String.fromCharCode(8320) + ' (midpoint): ' + x0.toFixed(2), startX, startY + rowHeight * 2);
    text('Tangent at x = ' + tangentX.toFixed(2), startX, startY + rowHeight * 3);
    text('Integration start: ' + integrationStart.toFixed(1), startX, startY + rowHeight * 4);
    text('Integration end: ' + integrationEnd.toFixed(1), startX, startY + rowHeight * 5);
}

function randomizeParameters() {
    targetL = random(2, 12);
    targetK = random(0.3, 2.5);
    targetX0 = random(-5, 5);

    sliderL.value(targetL);
    sliderK.value(targetK);
    sliderX0.value(targetX0);
}

function mousePressed() {
    // Check if clicking near tangent point for dragging
    let gx = graphMargin;
    let gy = equationAreaHeight + graphMargin;
    let gw = visualizationWidth - 2 * graphMargin;
    let gh = visualizationHeight - 2 * graphMargin;

    let pxT = map(tangentX, xMin, xMax, gx, gx + gw);
    let pyT = map(logistic(tangentX), yMin, yMax, gy + gh, gy);

    if (dist(mouseX, mouseY, pxT, pyT) < 20) {
        isDraggingTangent = true;
    }
}

function mouseReleased() {
    isDraggingTangent = false;
}

function mouseDragged() {
    if (isDraggingTangent) {
        let gx = graphMargin;
        let gw = visualizationWidth - 2 * graphMargin;

        tangentX = map(mouseX, gx, gx + gw, xMin, xMax);
        tangentX = constrain(tangentX, xMin, xMax);
        sliderTangent.value(tangentX);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(container.offsetWidth, 800);
        // Recalculate widths proportionally
        visualizationWidth = canvasWidth * 0.7;
        controlPanelWidth = canvasWidth * 0.3;
    }
}
