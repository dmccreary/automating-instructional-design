// Color Blindness Simulator MicroSim
// Learning Objective: Apply color accessibility principles by testing
// MicroSim color schemes under simulated color vision deficiencies

let canvasWidth;
let drawHeight = 400;
let controlHeight = 50;

// Color palettes with specified hex values
const defaultPalette = [
    { name: 'Red', hex: '#EF4444', rgb: [239, 68, 68] },
    { name: 'Green', hex: '#10B981', rgb: [16, 185, 129] },
    { name: 'Blue', hex: '#3B82F6', rgb: [59, 130, 246] },
    { name: 'Yellow', hex: '#F59E0B', rgb: [245, 158, 11] },
    { name: 'Orange', hex: '#F97316', rgb: [249, 115, 22] },
    { name: 'Purple', hex: '#8B5CF6', rgb: [139, 92, 246] },
    { name: 'Teal', hex: '#14B8A6', rgb: [20, 184, 166] },
    { name: 'Pink', hex: '#EC4899', rgb: [236, 72, 153] }
];

const trafficLightPalette = [
    { name: 'Red Stop', hex: '#DC2626', rgb: [220, 38, 38] },
    { name: 'Yellow Wait', hex: '#FBBF24', rgb: [251, 191, 36] },
    { name: 'Green Go', hex: '#16A34A', rgb: [22, 163, 74] },
    { name: 'Flashing Red', hex: '#B91C1C', rgb: [185, 28, 28] },
    { name: 'Amber', hex: '#D97706', rgb: [217, 119, 6] },
    { name: 'Lime', hex: '#84CC16', rgb: [132, 204, 22] },
    { name: 'Dark Red', hex: '#991B1B', rgb: [153, 27, 27] },
    { name: 'Emerald', hex: '#059669', rgb: [5, 150, 105] }
];

const heatMapPalette = [
    { name: 'Cold', hex: '#1E40AF', rgb: [30, 64, 175] },
    { name: 'Cool', hex: '#3B82F6', rgb: [59, 130, 246] },
    { name: 'Neutral', hex: '#06B6D4', rgb: [6, 182, 212] },
    { name: 'Mild', hex: '#22C55E', rgb: [34, 197, 94] },
    { name: 'Warm', hex: '#EAB308', rgb: [234, 179, 8] },
    { name: 'Hot', hex: '#F97316', rgb: [249, 115, 22] },
    { name: 'Very Hot', hex: '#EF4444', rgb: [239, 68, 68] },
    { name: 'Extreme', hex: '#B91C1C', rgb: [185, 28, 28] }
];

const colorblindSafePalette = [
    { name: 'Blue', hex: '#0077BB', rgb: [0, 119, 187] },
    { name: 'Cyan', hex: '#33BBEE', rgb: [51, 187, 238] },
    { name: 'Teal', hex: '#009988', rgb: [0, 153, 136] },
    { name: 'Orange', hex: '#EE7733', rgb: [238, 119, 51] },
    { name: 'Red', hex: '#CC3311', rgb: [204, 51, 17] },
    { name: 'Magenta', hex: '#EE3377', rgb: [238, 51, 119] },
    { name: 'Gray', hex: '#BBBBBB', rgb: [187, 187, 187] },
    { name: 'Black', hex: '#000000', rgb: [0, 0, 0] }
];

// Color blindness transformation matrices
// Based on Brettel, Vienot, and Mollon research
const transformMatrices = {
    'Normal Vision': null,
    'Deuteranopia': {
        r: [0.625, 0.375, 0.0],
        g: [0.700, 0.300, 0.0],
        b: [0.0, 0.300, 0.700]
    },
    'Protanopia': {
        r: [0.567, 0.433, 0.0],
        g: [0.558, 0.442, 0.0],
        b: [0.0, 0.242, 0.758]
    },
    'Tritanopia': {
        r: [0.950, 0.050, 0.0],
        g: [0.0, 0.433, 0.567],
        b: [0.0, 0.475, 0.525]
    },
    'Monochromacy': {
        r: [0.299, 0.587, 0.114],
        g: [0.299, 0.587, 0.114],
        b: [0.299, 0.587, 0.114]
    }
};

// Vision type descriptions
const visionDescriptions = {
    'Normal Vision': 'Full color vision - perceives all colors normally',
    'Deuteranopia': 'Green cone deficiency (most common, ~6% of males) - difficulty distinguishing red/green',
    'Protanopia': 'Red cone deficiency (~2% of males) - reds appear darker, confusion with green',
    'Tritanopia': 'Blue cone deficiency (rare, <0.01%) - difficulty distinguishing blue/yellow',
    'Monochromacy': 'Complete color blindness (very rare) - sees only in grayscale'
};

// Problematic pairs for each type (indices into default palette)
const problematicPairs = {
    'Normal Vision': [],
    'Deuteranopia': [[0, 1], [3, 4], [1, 6]], // Red-Green, Yellow-Orange, Green-Teal
    'Protanopia': [[0, 1], [3, 4], [0, 4]], // Red-Green, Yellow-Orange, Red-Orange
    'Tritanopia': [[2, 5], [3, 1], [6, 1]], // Blue-Purple, Yellow-Green, Teal-Green
    'Monochromacy': [[0, 1], [2, 5], [3, 4], [6, 7]] // Many pairs look similar
};

let currentPalette;
let currentPaletteName = 'Default';
let currentVisionType = 'Normal Vision';
let visionSelect;

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    } else {
        canvasWidth = windowWidth;
    }
    canvasWidth = min(canvasWidth, 900);
    canvasWidth = max(canvasWidth, 400);
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, drawHeight + controlHeight);
    const container = document.querySelector('main');
    if (container) {
        canvas.parent(container);
    }

    currentPalette = defaultPalette;
    textFont('Arial');

    // Create controls container
    let controlDiv = createDiv('');
    controlDiv.style('display', 'flex');
    controlDiv.style('flex-wrap', 'wrap');
    controlDiv.style('gap', '15px');
    controlDiv.style('padding', '10px 20px');
    controlDiv.style('background', '#f5f5f5');
    controlDiv.style('border-radius', '8px');
    controlDiv.style('margin-top', '10px');
    controlDiv.style('align-items', 'center');
    if (container) {
        controlDiv.parent(container);
    }

    // Vision type dropdown
    let visionLabel = createSpan('Vision Type: ');
    visionLabel.style('font-size', '14px');
    visionLabel.style('font-weight', 'bold');
    visionLabel.parent(controlDiv);

    visionSelect = createSelect();
    visionSelect.option('Normal Vision');
    visionSelect.option('Deuteranopia (Red-Green)');
    visionSelect.option('Protanopia (Red-Green)');
    visionSelect.option('Tritanopia (Blue-Yellow)');
    visionSelect.option('Monochromacy (Grayscale)');
    visionSelect.changed(onVisionChange);
    visionSelect.style('font-size', '14px');
    visionSelect.style('padding', '6px 10px');
    visionSelect.style('border-radius', '4px');
    visionSelect.style('border', '1px solid #ccc');
    visionSelect.parent(controlDiv);

    // Preset buttons
    let presetLabel = createSpan('Presets: ');
    presetLabel.style('font-size', '14px');
    presetLabel.style('font-weight', 'bold');
    presetLabel.style('margin-left', '20px');
    presetLabel.parent(controlDiv);

    createPresetButton('Default', defaultPalette, controlDiv);
    createPresetButton('Traffic Light', trafficLightPalette, controlDiv);
    createPresetButton('Heat Map', heatMapPalette, controlDiv);
    createPresetButton('Colorblind-Safe', colorblindSafePalette, controlDiv);

    describe('Interactive color blindness simulator showing original colors on the left and simulated color vision on the right.');
}

function createPresetButton(name, palette, parent) {
    let btn = createButton(name);
    btn.style('padding', '6px 12px');
    btn.style('border-radius', '4px');
    btn.style('border', '1px solid #ccc');
    btn.style('background', '#fff');
    btn.style('cursor', 'pointer');
    btn.style('font-size', '12px');
    btn.mousePressed(() => {
        currentPalette = palette;
        currentPaletteName = name;
    });
    btn.parent(parent);
}

function onVisionChange() {
    let selected = visionSelect.value();
    if (selected.includes('Deuteranopia')) {
        currentVisionType = 'Deuteranopia';
    } else if (selected.includes('Protanopia')) {
        currentVisionType = 'Protanopia';
    } else if (selected.includes('Tritanopia')) {
        currentVisionType = 'Tritanopia';
    } else if (selected.includes('Monochromacy')) {
        currentVisionType = 'Monochromacy';
    } else {
        currentVisionType = 'Normal Vision';
    }
}

function draw() {
    background(250);

    const halfWidth = canvasWidth / 2;
    const margin = 15;

    // Draw section headers
    fill(50);
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Original Colors', halfWidth / 2, 12);
    text('Simulated: ' + currentVisionType, halfWidth + halfWidth / 2, 12);
    textStyle(NORMAL);

    // Draw divider line
    stroke(180);
    strokeWeight(2);
    line(halfWidth, 35, halfWidth, drawHeight - 70);
    noStroke();

    // Draw vision type description
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    text(visionDescriptions[currentVisionType], canvasWidth / 2, 35);

    // Calculate grid layout
    const cols = 4;
    const rows = 2;
    const padding = 15;
    const availableWidth = halfWidth - padding * 2 - 10;
    const availableHeight = drawHeight - 140;
    const squareSize = min(availableWidth / cols - 8, availableHeight / rows - 35);
    const startY = 55;

    // Draw original palette (left side)
    drawPalette(currentPalette, padding, startY, squareSize, cols, rows, false);

    // Draw simulated palette (right side)
    drawPalette(currentPalette, halfWidth + padding, startY, squareSize, cols, rows, true);

    // Draw accessibility indicator
    drawAccessibilityIndicator();
}

function drawPalette(palette, startX, startY, size, cols, rows, simulate) {
    const gap = 8;
    const totalWidth = cols * size + (cols - 1) * gap;
    const offsetX = ((canvasWidth / 2 - 30) - totalWidth) / 2;

    for (let i = 0; i < palette.length; i++) {
        const col = i % cols;
        const row = floor(i / cols);
        const x = startX + offsetX + col * (size + gap);
        const y = startY + row * (size + 35);

        let colorRgb = palette[i].rgb.slice();

        if (simulate && currentVisionType !== 'Normal Vision') {
            colorRgb = transformColor(colorRgb, currentVisionType);
        }

        // Draw color square with shadow
        noStroke();
        fill(0, 0, 0, 30);
        rect(x + 2, y + 2, size, size, 6);

        // Draw color square
        fill(colorRgb[0], colorRgb[1], colorRgb[2]);
        stroke(100);
        strokeWeight(1);
        rect(x, y, size, size, 6);
        noStroke();

        // Draw color name
        fill(50);
        textSize(10);
        textAlign(CENTER, TOP);
        text(palette[i].name, x + size / 2, y + size + 3);

        // Draw hex value
        textSize(8);
        fill(100);
        if (simulate && currentVisionType !== 'Normal Vision') {
            const simHex = rgbToHex(colorRgb);
            text(simHex, x + size / 2, y + size + 15);
        } else {
            text(palette[i].hex, x + size / 2, y + size + 15);
        }

        // Draw warning icon for problematic colors on simulated side
        if (simulate && currentVisionType !== 'Normal Vision' && isProblematic(i)) {
            // Warning triangle background
            fill(255, 200, 0);
            stroke(200, 150, 0);
            strokeWeight(1);
            triangle(x + size - 3, y + 12, x + size - 13, y + 12, x + size - 8, y + 2);
            noStroke();

            // Exclamation mark
            fill(50);
            textSize(9);
            textAlign(CENTER, CENTER);
            text('!', x + size - 8, y + 8);
        }
    }
}

function transformColor(rgb, type) {
    const matrix = transformMatrices[type];
    if (!matrix) return rgb;

    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const newR = matrix.r[0] * r + matrix.r[1] * g + matrix.r[2] * b;
    const newG = matrix.g[0] * r + matrix.g[1] * g + matrix.g[2] * b;
    const newB = matrix.b[0] * r + matrix.b[1] * g + matrix.b[2] * b;

    return [
        round(constrain(newR, 0, 255)),
        round(constrain(newG, 0, 255)),
        round(constrain(newB, 0, 255))
    ];
}

function rgbToHex(rgb) {
    return '#' + rgb.map(x => {
        const hex = round(x).toString(16).toUpperCase();
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function isProblematic(index) {
    if (currentVisionType === 'Normal Vision') return false;
    if (currentPaletteName === 'Colorblind-Safe') return false;

    const pairs = problematicPairs[currentVisionType];
    if (!pairs) return false;

    for (let pair of pairs) {
        if (pair.includes(index)) return true;
    }
    return false;
}

function calculatePaletteSafety() {
    if (currentVisionType === 'Normal Vision') return null;
    if (currentPaletteName === 'Colorblind-Safe') return true;

    // Check color differences in simulated view
    let minDiff = Infinity;
    for (let i = 0; i < currentPalette.length; i++) {
        for (let j = i + 1; j < currentPalette.length; j++) {
            const c1 = transformColor(currentPalette[i].rgb, currentVisionType);
            const c2 = transformColor(currentPalette[j].rgb, currentVisionType);

            const diff = sqrt(
                pow(c1[0] - c2[0], 2) +
                pow(c1[1] - c2[1], 2) +
                pow(c1[2] - c2[2], 2)
            );
            minDiff = min(minDiff, diff);
        }
    }

    // Threshold for distinguishability
    return minDiff > 50;
}

function drawAccessibilityIndicator() {
    const y = drawHeight - 55;
    const x = 20;
    const width = canvasWidth - 40;

    if (currentVisionType === 'Normal Vision') {
        // Info box
        fill(230, 240, 250);
        stroke(100, 150, 200);
        strokeWeight(1);
        rect(x, y, width, 45, 6);
        noStroke();

        fill(50, 80, 120);
        textSize(12);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        text('Select a color blindness type to test accessibility', x + 15, y + 10);
        textStyle(NORMAL);
        textSize(10);
        fill(80);
        text('Choose from dropdown above to see how colors appear to people with different vision types', x + 15, y + 28);
    } else {
        const isSafe = calculatePaletteSafety();

        if (isSafe) {
            // Safe indicator
            fill(212, 237, 218);
            stroke(40, 167, 69);
            strokeWeight(1);
            rect(x, y, width, 45, 6);
            noStroke();

            // Checkmark circle
            fill(40, 167, 69);
            ellipse(x + 22, y + 22, 24, 24);
            fill(255);
            textSize(14);
            textAlign(CENTER, CENTER);
            text('\u2713', x + 22, y + 22);

            fill(21, 87, 36);
            textSize(12);
            textAlign(LEFT, TOP);
            textStyle(BOLD);
            text('SAFE - Colors are distinguishable', x + 42, y + 10);
            textStyle(NORMAL);
            textSize(10);
            fill(80);
            text('This palette works well for users with ' + currentVisionType.toLowerCase(), x + 42, y + 28);
        } else {
            // Problematic indicator
            fill(248, 215, 218);
            stroke(220, 53, 69);
            strokeWeight(1);
            rect(x, y, width, 45, 6);
            noStroke();

            // Warning circle
            fill(220, 53, 69);
            ellipse(x + 22, y + 22, 24, 24);
            fill(255);
            textSize(14);
            textAlign(CENTER, CENTER);
            text('!', x + 22, y + 22);

            fill(114, 28, 36);
            textSize(12);
            textAlign(LEFT, TOP);
            textStyle(BOLD);
            text('PROBLEMATIC - Some colors may be confused', x + 42, y + 10);
            textStyle(NORMAL);
            textSize(10);
            fill(80);
            text('Consider using patterns, shapes, or the Colorblind-Safe palette for better accessibility', x + 42, y + 28);
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, drawHeight + controlHeight);
}
