// Early Childhood MicroSim Pattern
// Demonstrates essential components of early childhood MicroSim design

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Region definitions for the wireframe mockup
let regions = [];
let hoveredRegion = null;

// Interactive example elements
let shapes = [];
let stars = [];
let celebrationActive = false;
let celebrationTimer = 0;
let celebrationParticles = [];

// Audio feedback simulation
let audioFeedbackActive = false;
let audioFeedbackTimer = 0;

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(800, container.clientWidth - 20);
    }
    canvasHeight = drawHeight + controlHeight;
}

function setup() {
    updateCanvasSize();

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const container = document.querySelector('main');
    if (container) {
        canvas.parent(container);
    }

    textFont('Arial');

    // Define wireframe regions
    defineRegions();

    // Create interactive shapes for the demo area
    createInteractiveElements();
}

function defineRegions() {
    regions = [];

    let margin = 15;
    let leftWidth = canvasWidth * 0.65;
    let rightWidth = canvasWidth * 0.30;
    let rightX = leftWidth + margin * 2;

    // Main interaction area with large touch targets
    regions.push({
        name: 'Touch Targets',
        x: margin,
        y: margin,
        w: leftWidth - margin,
        h: drawHeight * 0.55,
        color: [255, 220, 100],
        label: 'Touch Target: 64px minimum',
        description: 'Large, colorful interactive elements (letters, shapes, characters) with oversized touch targets (64px minimum). High contrast colors and clear visual affordances show clickability.',
        labelPos: 'top-left'
    });

    // Celebration animation zone
    regions.push({
        name: 'Celebration Zone',
        x: margin,
        y: margin + drawHeight * 0.58,
        w: leftWidth - margin,
        h: drawHeight * 0.20,
        color: [255, 150, 200],
        label: 'Celebration Animation Zone',
        description: 'Area dedicated to celebration animations. When a child completes a task correctly, animated rewards (stars, confetti, dancing characters) appear here to provide positive reinforcement.',
        labelPos: 'center'
    });

    // Simple instruction area
    regions.push({
        name: 'Instructions',
        x: margin,
        y: margin + drawHeight * 0.80,
        w: leftWidth - margin,
        h: drawHeight * 0.17,
        color: [150, 220, 255],
        label: 'Simple Visual Instructions',
        description: 'Clear, concise instructions using simple words and icons. Audio option available for pre-readers. Instructions use child-friendly language and may include animated demonstrations.',
        labelPos: 'center'
    });

    // Audio feedback indicator
    regions.push({
        name: 'Audio Feedback',
        x: rightX,
        y: margin,
        w: rightWidth,
        h: drawHeight * 0.30,
        color: [180, 255, 180],
        label: 'Immediate Audio Feedback',
        description: 'Audio feedback system provides immediate sound responses to all interactions. Positive sounds for correct actions, gentle encouragement for incorrect attempts. Speaker icon indicates audio support.',
        labelPos: 'center'
    });

    // Progress rewards area
    regions.push({
        name: 'Progress Rewards',
        x: rightX,
        y: margin + drawHeight * 0.33,
        w: rightWidth,
        h: drawHeight * 0.64,
        color: [255, 200, 150],
        label: 'Progress Rewards',
        description: 'Visual progress tracking using stars, stickers, or badges. Young children can easily see their accomplishments. Non-numeric representation avoids abstract concepts.',
        labelPos: 'top'
    });
}

function createInteractiveElements() {
    shapes = [];
    stars = [];

    // Create large touchable shapes in the touch target area
    let region = regions[0];
    let shapeSize = 64; // Minimum touch target size

    // Circle (red)
    shapes.push({
        type: 'circle',
        x: region.x + 80,
        y: region.y + 80,
        size: shapeSize,
        color: [220, 60, 60],
        label: 'A'
    });

    // Square (blue)
    shapes.push({
        type: 'square',
        x: region.x + 180,
        y: region.y + 80,
        size: shapeSize,
        color: [60, 100, 220],
        label: 'B'
    });

    // Triangle (green)
    shapes.push({
        type: 'triangle',
        x: region.x + 280,
        y: region.y + 80,
        size: shapeSize,
        color: [60, 180, 60],
        label: 'C'
    });

    // Star (yellow)
    shapes.push({
        type: 'star',
        x: region.x + 380,
        y: region.y + 80,
        size: shapeSize,
        color: [255, 200, 0],
        label: '1'
    });

    // Progress stars
    for (let i = 0; i < 5; i++) {
        stars.push({
            x: regions[4].x + 30 + i * 45,
            y: regions[4].y + 100,
            earned: i < 2, // First 2 stars earned
            size: 35
        });
    }
}

function draw() {
    // Bright, child-friendly background
    background(250, 248, 245);

    // Draw title
    drawTitle();

    // Draw wireframe regions
    drawRegions();

    // Draw interactive elements
    drawInteractiveElements();

    // Draw hover tooltip
    drawTooltip();

    // Draw audio feedback animation
    if (audioFeedbackActive) {
        drawAudioFeedback();
    }

    // Draw celebration animation
    if (celebrationActive) {
        drawCelebration();
    }

    // Draw bottom info bar
    drawInfoBar();
}

function drawTitle() {
    fill(30, 60, 100);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('EARLY CHILDHOOD MICROSIM DESIGN PATTERN', 15, 5);
    textStyle(NORMAL);
}

function drawRegions() {
    for (let region of regions) {
        let isHovered = hoveredRegion === region;

        // Region background
        let c = region.color;
        if (isHovered) {
            fill(c[0], c[1], c[2], 220);
            strokeWeight(3);
            stroke(c[0] * 0.6, c[1] * 0.6, c[2] * 0.6);
        } else {
            fill(c[0], c[1], c[2], 150);
            strokeWeight(2);
            stroke(c[0] * 0.7, c[1] * 0.7, c[2] * 0.7);
        }

        // Rounded rectangle for child-friendly appearance
        rect(region.x, region.y, region.w, region.h, 12);

        // Region label
        fill(40, 40, 60);
        noStroke();
        textSize(11);
        textStyle(BOLD);

        let labelX, labelY;
        textAlign(CENTER, CENTER);

        if (region.labelPos === 'top-left') {
            textAlign(LEFT, TOP);
            labelX = region.x + 10;
            labelY = region.y + 8;
        } else if (region.labelPos === 'top') {
            labelX = region.x + region.w / 2;
            labelY = region.y + 15;
        } else {
            labelX = region.x + region.w / 2;
            labelY = region.y + region.h / 2;
        }

        text(region.label, labelX, labelY);
        textStyle(NORMAL);
    }
}

function drawInteractiveElements() {
    // Draw shapes in touch target area
    for (let shape of shapes) {
        let isHovered = dist(mouseX, mouseY, shape.x, shape.y) < shape.size / 2;

        // Shadow for depth
        fill(0, 0, 0, 30);
        noStroke();
        ellipse(shape.x + 4, shape.y + 4, shape.size + 10);

        // Shape with hover effect
        let c = shape.color;
        if (isHovered) {
            fill(c[0] + 30, c[1] + 30, c[2] + 30);
            strokeWeight(4);
            stroke(255);
            // Scale up slightly on hover
            push();
            translate(shape.x, shape.y);
            scale(1.1);
            translate(-shape.x, -shape.y);
        } else {
            fill(c[0], c[1], c[2]);
            strokeWeight(3);
            stroke(c[0] * 0.6, c[1] * 0.6, c[2] * 0.6);
        }

        // Draw shape
        if (shape.type === 'circle') {
            ellipse(shape.x, shape.y, shape.size);
        } else if (shape.type === 'square') {
            rectMode(CENTER);
            rect(shape.x, shape.y, shape.size * 0.85, shape.size * 0.85, 8);
            rectMode(CORNER);
        } else if (shape.type === 'triangle') {
            let h = shape.size * 0.8;
            triangle(
                shape.x, shape.y - h/2,
                shape.x - h/2, shape.y + h/2,
                shape.x + h/2, shape.y + h/2
            );
        } else if (shape.type === 'star') {
            drawStar(shape.x, shape.y, shape.size * 0.3, shape.size * 0.5, 5);
        }

        if (isHovered) {
            pop();
        }

        // Label on shape
        fill(255);
        noStroke();
        textSize(20);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(shape.label, shape.x, shape.y);
        textStyle(NORMAL);
    }

    // Draw size indicator
    let region = regions[0];
    fill(80, 80, 100);
    textSize(10);
    textAlign(LEFT, BOTTOM);
    text('64px', region.x + 55, region.y + 130);

    // Draw size bracket
    stroke(80, 80, 100);
    strokeWeight(1);
    line(region.x + 80 - 32, region.y + 115, region.x + 80 + 32, region.y + 115);
    line(region.x + 80 - 32, region.y + 115, region.x + 80 - 32, region.y + 120);
    line(region.x + 80 + 32, region.y + 115, region.x + 80 + 32, region.y + 120);

    // Draw example character in touch area
    drawCharacter(region.x + region.w - 80, region.y + 100);

    // Draw celebration zone content
    let celebZone = regions[1];
    fill(255, 100, 150, 100);
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Yay! Great Job!', celebZone.x + celebZone.w / 2, celebZone.y + celebZone.h / 2);

    // Draw instruction area content
    let instrZone = regions[2];
    fill(60, 100, 150);
    textSize(14);
    text('Tap the shapes to learn!', instrZone.x + instrZone.w / 2, instrZone.y + instrZone.h / 2 - 10);

    // Speaker icon
    drawSpeakerIcon(instrZone.x + instrZone.w - 40, instrZone.y + instrZone.h / 2);

    // Draw audio feedback area content
    let audioZone = regions[3];
    drawSpeakerIcon(audioZone.x + audioZone.w / 2, audioZone.y + audioZone.h / 2 - 10);
    fill(60, 120, 60);
    textSize(10);
    text('Sound On', audioZone.x + audioZone.w / 2, audioZone.y + audioZone.h - 20);

    // Draw progress stars
    let progressZone = regions[4];
    fill(80, 60, 40);
    textSize(12);
    textAlign(CENTER, TOP);
    text('Your Stars:', progressZone.x + progressZone.w / 2, progressZone.y + 55);

    for (let star of stars) {
        if (star.earned) {
            fill(255, 200, 0);
            stroke(200, 150, 0);
        } else {
            fill(200, 200, 200);
            stroke(150, 150, 150);
        }
        strokeWeight(2);
        drawStar(star.x, star.y, star.size * 0.4, star.size * 0.6, 5);
    }

    // Sticker collection label
    fill(80, 60, 40);
    noStroke();
    textSize(10);
    text('2 of 5 earned', progressZone.x + progressZone.w / 2, progressZone.y + 140);
}

function drawCharacter(x, y) {
    // Simple friendly character
    // Body
    fill(100, 180, 255);
    stroke(70, 130, 200);
    strokeWeight(2);
    ellipse(x, y + 30, 50, 60);

    // Head
    fill(255, 220, 180);
    stroke(200, 170, 140);
    ellipse(x, y - 10, 45, 45);

    // Eyes
    fill(40, 40, 60);
    noStroke();
    ellipse(x - 10, y - 12, 8, 10);
    ellipse(x + 10, y - 12, 8, 10);

    // Eye highlights
    fill(255);
    ellipse(x - 8, y - 14, 3, 3);
    ellipse(x + 12, y - 14, 3, 3);

    // Smile
    noFill();
    stroke(200, 100, 100);
    strokeWeight(2);
    arc(x, y - 2, 20, 15, 0.2, PI - 0.2);

    // Waving hand
    fill(255, 220, 180);
    stroke(200, 170, 140);
    strokeWeight(1);
    ellipse(x + 35, y, 15, 15);
}

function drawSpeakerIcon(x, y) {
    fill(80, 80, 100);
    noStroke();

    // Speaker body
    beginShape();
    vertex(x - 12, y - 6);
    vertex(x - 5, y - 6);
    vertex(x + 5, y - 15);
    vertex(x + 5, y + 15);
    vertex(x - 5, y + 6);
    vertex(x - 12, y + 6);
    endShape(CLOSE);

    // Sound waves
    noFill();
    stroke(80, 80, 100);
    strokeWeight(2);
    arc(x + 10, y, 12, 20, -PI/3, PI/3);
    arc(x + 15, y, 20, 30, -PI/3, PI/3);
}

function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function drawTooltip() {
    if (hoveredRegion) {
        let tipWidth = 280;
        let tipHeight = 80;
        let tipX = mouseX + 15;
        let tipY = mouseY + 15;

        // Keep tooltip on screen
        if (tipX + tipWidth > canvasWidth - 10) {
            tipX = mouseX - tipWidth - 15;
        }
        if (tipY + tipHeight > drawHeight - 10) {
            tipY = mouseY - tipHeight - 15;
        }

        // Tooltip background
        fill(50, 50, 70, 240);
        stroke(100, 100, 120);
        strokeWeight(2);
        rect(tipX, tipY, tipWidth, tipHeight, 8);

        // Tooltip title
        fill(255, 220, 100);
        noStroke();
        textSize(12);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text(hoveredRegion.name, tipX + 10, tipY + 10);
        textStyle(NORMAL);

        // Tooltip description
        fill(240, 240, 250);
        textSize(10);
        text(hoveredRegion.description, tipX + 10, tipY + 28, tipWidth - 20, tipHeight - 35);
    }
}

function drawAudioFeedback() {
    audioFeedbackTimer++;

    // Draw sound wave animation
    let audioZone = regions[3];
    let cx = audioZone.x + audioZone.w / 2;
    let cy = audioZone.y + audioZone.h / 2;

    noFill();
    stroke(100, 200, 100, map(audioFeedbackTimer, 0, 30, 255, 0));
    strokeWeight(3);

    let radius = map(audioFeedbackTimer, 0, 30, 20, 60);
    ellipse(cx, cy, radius, radius);

    if (audioFeedbackTimer > 30) {
        audioFeedbackActive = false;
        audioFeedbackTimer = 0;
    }
}

function drawCelebration() {
    celebrationTimer++;

    // Update and draw particles
    for (let i = celebrationParticles.length - 1; i >= 0; i--) {
        let p = celebrationParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life--;

        if (p.life > 0) {
            fill(p.color[0], p.color[1], p.color[2], map(p.life, 0, 80, 0, 255));
            noStroke();

            if (p.type === 'star') {
                drawStar(p.x, p.y, p.size * 0.4, p.size, 5);
            } else {
                ellipse(p.x, p.y, p.size);
            }
        } else {
            celebrationParticles.splice(i, 1);
        }
    }

    if (celebrationTimer > 90 && celebrationParticles.length === 0) {
        celebrationActive = false;
        celebrationTimer = 0;
    }
}

function triggerCelebration() {
    celebrationActive = true;
    celebrationTimer = 0;
    celebrationParticles = [];

    let celebZone = regions[1];
    let cx = celebZone.x + celebZone.w / 2;
    let cy = celebZone.y + celebZone.h / 2;

    for (let i = 0; i < 30; i++) {
        celebrationParticles.push({
            x: cx,
            y: cy,
            vx: random(-6, 6),
            vy: random(-8, -3),
            color: [random([255, 255, 100]), random([200, 100, 255]), random([100, 200, 255])],
            size: random(8, 18),
            type: random() > 0.5 ? 'star' : 'circle',
            life: random(50, 80)
        });
    }
}

function drawInfoBar() {
    fill(50, 70, 100);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    fill(255);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Hover over regions for details', 20, drawHeight + controlHeight / 2);

    textAlign(RIGHT, CENTER);
    text('Click shapes to trigger celebration', canvasWidth - 20, drawHeight + controlHeight / 2);
}

function mouseMoved() {
    hoveredRegion = null;

    for (let region of regions) {
        if (mouseX >= region.x && mouseX <= region.x + region.w &&
            mouseY >= region.y && mouseY <= region.y + region.h) {
            hoveredRegion = region;
            break;
        }
    }
}

function mousePressed() {
    // Check if clicking on interactive shapes
    for (let shape of shapes) {
        if (dist(mouseX, mouseY, shape.x, shape.y) < shape.size / 2) {
            triggerCelebration();
            audioFeedbackActive = true;
            audioFeedbackTimer = 0;
            return;
        }
    }

    // Check if clicking speaker icon in instructions
    let instrZone = regions[2];
    if (dist(mouseX, mouseY, instrZone.x + instrZone.w - 40, instrZone.y + instrZone.h / 2) < 25) {
        audioFeedbackActive = true;
        audioFeedbackTimer = 0;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    defineRegions();
    createInteractiveElements();
}
