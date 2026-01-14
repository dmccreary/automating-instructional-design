// Cause-Effect Display MicroSim
// Demonstrates standard structure with control panel (causes) and visualization area (effects)
// Example: Temperature slider controls water state (ice/liquid/steam)

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Panel dimensions
let leftPanelWidth;
let rightPanelWidth;
let panelGap = 20;

// Sliders for cause inputs
let temperatureSlider;
let pressureSlider;
let humiditySlider;

// Animation state
let bubbles = [];
let steamParticles = [];
let iceShards = [];
let animationPhase = 0;

// Colors
const panelBgColor = '#f8f9fa';
const borderColor = '#dee2e6';
const waterColor = '#3498db';
const iceColor = '#a8d8ea';
const steamColor = '#ecf0f1';
const labelColor = '#2c3e50';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');

    // Create sliders
    createSliders();

    // Initialize particles
    initializeParticles();

    describe('Interactive cause-effect display showing how temperature, pressure, and humidity affect water state, demonstrating the standard MicroSim layout with controls on the left and visualization on the right.', LABEL);
}

function createSliders() {
    // Remove existing sliders if any
    if (temperatureSlider) temperatureSlider.remove();
    if (pressureSlider) pressureSlider.remove();
    if (humiditySlider) humiditySlider.remove();

    let sliderX = margin + 20;
    let sliderWidth = leftPanelWidth - 60;

    // Temperature slider: -20 to 150 degrees C
    temperatureSlider = createSlider(-20, 150, 25);
    temperatureSlider.position(sliderX, 130);
    temperatureSlider.style('width', sliderWidth + 'px');
    temperatureSlider.parent(document.querySelector('main'));

    // Pressure slider: 0.1 to 2 atm
    pressureSlider = createSlider(1, 20, 10);
    pressureSlider.position(sliderX, 230);
    pressureSlider.style('width', sliderWidth + 'px');
    pressureSlider.parent(document.querySelector('main'));

    // Humidity slider: 0 to 100%
    humiditySlider = createSlider(0, 100, 50);
    humiditySlider.position(sliderX, 330);
    humiditySlider.style('width', sliderWidth + 'px');
    humiditySlider.parent(document.querySelector('main'));
}

function initializeParticles() {
    bubbles = [];
    steamParticles = [];
    iceShards = [];

    // Create bubbles for boiling effect
    for (let i = 0; i < 20; i++) {
        bubbles.push({
            x: random(0, 1),
            y: random(0, 1),
            size: random(5, 15),
            speed: random(0.01, 0.03)
        });
    }

    // Create steam particles
    for (let i = 0; i < 30; i++) {
        steamParticles.push({
            x: random(0, 1),
            y: random(0, 1),
            size: random(10, 30),
            speed: random(0.005, 0.015),
            wobble: random(0, TWO_PI)
        });
    }

    // Create ice shards
    for (let i = 0; i < 15; i++) {
        iceShards.push({
            x: random(0.1, 0.9),
            y: random(0.1, 0.9),
            rotation: random(0, TWO_PI),
            size: random(20, 40)
        });
    }
}

function draw() {
    updateCanvasSize();
    animationPhase += 0.02;

    // Get current values
    let temperature = temperatureSlider.value();
    let pressure = pressureSlider.value() / 10; // Convert to atm
    let humidity = humiditySlider.value();

    // Calculate boiling and freezing points based on pressure
    let boilingPoint = 100 * pressure;
    let freezingPoint = 0 - (pressure - 1) * 5;

    // Background
    background('#e9ecef');

    // Draw main areas
    drawLeftPanel(temperature, pressure, humidity);
    drawRightPanel(temperature, boilingPoint, freezingPoint, humidity);

    // Control area footer
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Instructions
    fill('#666');
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Adjust the sliders on the left to see how causes affect the water state visualization on the right.", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawLeftPanel(temperature, pressure, humidity) {
    // Left panel background (Causes)
    fill(panelBgColor);
    stroke(borderColor);
    strokeWeight(2);
    rect(margin, margin, leftPanelWidth, drawHeight - margin * 2, 10);

    // Panel title
    fill(labelColor);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text("CAUSES", margin + leftPanelWidth / 2, margin + 15);
    textStyle(NORMAL);

    // Subtitle
    fill('#6c757d');
    textSize(12);
    text("Input Variables", margin + leftPanelWidth / 2, margin + 42);

    // Divider
    stroke('#dee2e6');
    strokeWeight(1);
    line(margin + 30, margin + 70, margin + leftPanelWidth - 30, margin + 70);

    // Temperature control
    drawControlLabel("Temperature", temperature + " C", margin + 20, 100, '#e74c3c', getTemperatureIcon(temperature));

    // Pressure control
    drawControlLabel("Pressure", pressure.toFixed(1) + " atm", margin + 20, 200, '#9b59b6', "P");

    // Humidity control
    drawControlLabel("Humidity", humidity + "%", margin + 20, 300, '#3498db', "H");

    // Connection arrow
    drawConnectionArrow();
}

function drawControlLabel(name, value, x, y, color, icon) {
    // Icon circle
    fill(color);
    noStroke();
    ellipse(x + 15, y + 5, 30, 30);

    fill('white');
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(icon, x + 15, y + 5);
    textStyle(NORMAL);

    // Label
    fill(labelColor);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(name, x + 40, y);

    // Value box
    fill('white');
    stroke(color);
    strokeWeight(2);
    let valueBoxWidth = 80;
    rect(x + leftPanelWidth - valueBoxWidth - 60, y - 12, valueBoxWidth, 30, 5);

    fill(color);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(value, x + leftPanelWidth - valueBoxWidth / 2 - 60, y + 3);
    textStyle(NORMAL);
}

function getTemperatureIcon(temp) {
    if (temp < 0) return "C";
    if (temp > 100) return "H";
    return "T";
}

function drawConnectionArrow() {
    let arrowX = margin + leftPanelWidth + panelGap / 2;
    let arrowY = drawHeight / 2;

    // Arrow body
    stroke('#495057');
    strokeWeight(3);
    line(arrowX - 15, arrowY, arrowX + 10, arrowY);

    // Arrowhead
    fill('#495057');
    noStroke();
    triangle(arrowX + 15, arrowY, arrowX + 5, arrowY - 8, arrowX + 5, arrowY + 8);

    // Label
    push();
    translate(arrowX, arrowY - 25);
    rotate(-HALF_PI);
    fill('#6c757d');
    textSize(11);
    textAlign(CENTER, CENTER);
    text("AFFECTS", 0, 0);
    pop();
}

function drawRightPanel(temperature, boilingPoint, freezingPoint, humidity) {
    let rightX = margin + leftPanelWidth + panelGap;

    // Right panel background (Effects)
    fill(panelBgColor);
    stroke(borderColor);
    strokeWeight(2);
    rect(rightX, margin, rightPanelWidth, drawHeight - margin * 2, 10);

    // Panel title
    fill(labelColor);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text("EFFECTS", rightX + rightPanelWidth / 2, margin + 15);
    textStyle(NORMAL);

    // Subtitle
    fill('#6c757d');
    textSize(12);
    text("Output Visualization", rightX + rightPanelWidth / 2, margin + 42);

    // Divider
    stroke('#dee2e6');
    strokeWeight(1);
    line(rightX + 30, margin + 70, rightX + rightPanelWidth - 30, margin + 70);

    // Visualization area
    let vizX = rightX + 30;
    let vizY = margin + 85;
    let vizWidth = rightPanelWidth - 60;
    let vizHeight = 250;

    // Determine water state
    let state = getWaterState(temperature, boilingPoint, freezingPoint);

    // Draw container
    drawContainer(vizX, vizY, vizWidth, vizHeight, state, temperature, humidity);

    // State label
    drawStateLabel(rightX + rightPanelWidth / 2, vizY + vizHeight + 30, state, temperature);
}

function getWaterState(temperature, boilingPoint, freezingPoint) {
    if (temperature <= freezingPoint) {
        return 'ice';
    } else if (temperature >= boilingPoint) {
        return 'steam';
    } else if (temperature > boilingPoint - 20) {
        return 'boiling';
    } else {
        return 'liquid';
    }
}

function drawContainer(x, y, w, h, state, temperature, humidity) {
    // Container background
    fill('#1a1a2e');
    stroke('#16213e');
    strokeWeight(3);
    rect(x, y, w, h, 8);

    // Draw based on state
    switch(state) {
        case 'ice':
            drawIceState(x, y, w, h, temperature);
            break;
        case 'liquid':
            drawLiquidState(x, y, w, h, humidity);
            break;
        case 'boiling':
            drawBoilingState(x, y, w, h);
            break;
        case 'steam':
            drawSteamState(x, y, w, h);
            break;
    }
}

function drawIceState(x, y, w, h, temperature) {
    // Ice block
    let iceHeight = h * 0.7;
    let iceY = y + h - iceHeight - 10;

    // Gradient effect for ice
    for (let i = 0; i < 5; i++) {
        let alpha = map(i, 0, 4, 200, 100);
        fill(168, 216, 234, alpha);
        noStroke();
        rect(x + 10 + i * 3, iceY + i * 3, w - 20 - i * 6, iceHeight - i * 6, 5);
    }

    // Ice cracks
    stroke(255, 255, 255, 150);
    strokeWeight(2);
    for (let shard of iceShards) {
        let sx = x + 20 + shard.x * (w - 40);
        let sy = iceY + 10 + shard.y * (iceHeight - 20);

        push();
        translate(sx, sy);
        rotate(shard.rotation);
        line(-shard.size / 4, 0, shard.size / 4, 0);
        line(0, -shard.size / 6, 0, shard.size / 6);
        pop();
    }

    // Frost particles
    fill(255, 255, 255, 100 + sin(animationPhase) * 50);
    noStroke();
    for (let i = 0; i < 10; i++) {
        let fx = x + 20 + noise(i, animationPhase * 0.5) * (w - 40);
        let fy = y + 20 + noise(i + 100, animationPhase * 0.5) * (h - 40);
        ellipse(fx, fy, 4, 4);
    }
}

function drawLiquidState(x, y, w, h, humidity) {
    // Water level based on humidity
    let waterLevel = map(humidity, 0, 100, 0.3, 0.8);
    let waterHeight = h * waterLevel;
    let waterY = y + h - waterHeight - 10;

    // Water body with wave effect
    fill(52, 152, 219, 200);
    noStroke();

    beginShape();
    vertex(x + 10, y + h - 10);
    vertex(x + 10, waterY + sin(animationPhase) * 3);

    // Wave top
    for (let wx = 0; wx <= w - 20; wx += 10) {
        let waveY = waterY + sin(animationPhase + wx * 0.05) * 5;
        vertex(x + 10 + wx, waveY);
    }

    vertex(x + w - 10, y + h - 10);
    endShape(CLOSE);

    // Surface reflection
    stroke(255, 255, 255, 100);
    strokeWeight(2);
    for (let rx = 0; rx < 3; rx++) {
        let reflectX = x + 30 + rx * 50 + sin(animationPhase + rx) * 10;
        let reflectY = waterY + 10 + sin(animationPhase * 1.5 + rx) * 3;
        line(reflectX, reflectY, reflectX + 20, reflectY);
    }
}

function drawBoilingState(x, y, w, h) {
    // Boiling water
    let waterHeight = h * 0.6;
    let waterY = y + h - waterHeight - 10;

    // Turbulent water
    fill(52, 152, 219, 180);
    noStroke();

    beginShape();
    vertex(x + 10, y + h - 10);
    vertex(x + 10, waterY);

    // Turbulent wave top
    for (let wx = 0; wx <= w - 20; wx += 5) {
        let waveY = waterY + sin(animationPhase * 3 + wx * 0.1) * 8 + cos(animationPhase * 2 + wx * 0.15) * 5;
        vertex(x + 10 + wx, waveY);
    }

    vertex(x + w - 10, y + h - 10);
    endShape(CLOSE);

    // Bubbles
    for (let bubble of bubbles) {
        let bx = x + 20 + bubble.x * (w - 40);
        let by = waterY + 20 + ((bubble.y + animationPhase * bubble.speed) % 1) * (waterHeight - 30);

        fill(255, 255, 255, 150);
        noStroke();
        ellipse(bx, y + h - 20 - (by - waterY), bubble.size, bubble.size);
    }

    // Rising steam
    for (let i = 0; i < 5; i++) {
        let steamX = x + 30 + i * (w - 60) / 4 + sin(animationPhase + i) * 10;
        let steamY = waterY - 10 - (animationPhase * 20 + i * 30) % 50;

        fill(255, 255, 255, 100 - ((animationPhase * 20 + i * 30) % 50) * 2);
        noStroke();
        ellipse(steamX, steamY, 15 + sin(animationPhase + i) * 5, 10);
    }
}

function drawSteamState(x, y, w, h) {
    // Steam/vapor filling container
    for (let particle of steamParticles) {
        let px = x + 20 + particle.x * (w - 40) + sin(animationPhase + particle.wobble) * 20;
        let py = y + 20 + ((particle.y - animationPhase * particle.speed) % 1 + 1) % 1 * (h - 40);

        let alpha = 50 + sin(animationPhase * 2 + particle.wobble) * 30;
        fill(255, 255, 255, alpha);
        noStroke();
        ellipse(px, py, particle.size, particle.size * 0.7);
    }

    // Hot glow at bottom
    for (let i = 0; i < 5; i++) {
        let glowAlpha = map(i, 0, 4, 80, 20);
        fill(231, 76, 60, glowAlpha);
        noStroke();
        rect(x + 10, y + h - 20 - i * 10, w - 20, 15, 3);
    }
}

function drawStateLabel(x, y, state, temperature) {
    let stateInfo = {
        'ice': { name: 'SOLID (Ice)', color: '#3498db', emoji: 'Frozen' },
        'liquid': { name: 'LIQUID (Water)', color: '#2980b9', emoji: 'Fluid' },
        'boiling': { name: 'BOILING', color: '#e67e22', emoji: 'Transitioning' },
        'steam': { name: 'GAS (Steam)', color: '#e74c3c', emoji: 'Vapor' }
    };

    let info = stateInfo[state];

    // State badge
    fill(info.color);
    noStroke();
    rectMode(CENTER);
    rect(x, y, 180, 35, 20);
    rectMode(CORNER);

    fill('white');
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(info.name, x, y);
    textStyle(NORMAL);

    // Description
    fill('#6c757d');
    textSize(12);
    text(info.emoji + " at " + temperature + " C", x, y + 28);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    createSliders();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }

    // Calculate panel widths
    leftPanelWidth = (canvasWidth - margin * 2 - panelGap) * 0.35;
    rightPanelWidth = (canvasWidth - margin * 2 - panelGap) * 0.65;

    // Ensure minimum widths
    if (leftPanelWidth < 200) leftPanelWidth = 200;
    if (rightPanelWidth < 300) rightPanelWidth = 300;
}
