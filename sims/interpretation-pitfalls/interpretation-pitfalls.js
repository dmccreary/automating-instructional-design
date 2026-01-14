// Interpretation Pitfalls MicroSim
// Four-quadrant infographic helping students identify and avoid common interpretation pitfalls

let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Quadrant data
const pitfalls = [
    {
        id: 'confirmation',
        name: 'Confirmation Bias',
        color: [220, 53, 69],      // Red/Pink
        hoverColor: [255, 82, 99],
        position: 'top-left',
        description: 'Seeing only what confirms your expectations',
        example: 'Ignoring negative feedback that contradicts your hypothesis',
        antidote: 'Actively seek disconfirming evidence',
        caseStudy: 'A designer tested a new checkout flow and only documented the 3 users who completed it smoothly, ignoring 5 users who abandoned mid-process. The feature launched and conversion dropped 15%.'
    },
    {
        id: 'overgeneralization',
        name: 'Small Sample Overgeneralization',
        color: [253, 126, 20],     // Orange
        hoverColor: [255, 153, 71],
        position: 'top-right',
        description: 'Drawing broad conclusions from limited data',
        example: '3 users struggled, so everyone will struggle',
        antidote: 'Note sample limitations; seek more data',
        caseStudy: 'After 3 expert users found a tutorial unnecessary, the team removed it entirely. When the feature launched, 40% of new users couldn\'t complete basic tasks without guidance.'
    },
    {
        id: 'correlation',
        name: 'Correlation/Causation Confusion',
        color: [255, 193, 7],      // Yellow
        hoverColor: [255, 213, 79],
        position: 'bottom-left',
        description: 'Assuming correlation implies causation',
        example: 'Users who skip tutorial fail more (maybe they\'re experts)',
        antidote: 'Consider alternative explanations',
        caseStudy: 'Analytics showed users who watched the intro video had higher success rates. The team made the video mandatory, but success rates didn\'t improve - motivated users had simply been more likely to watch it voluntarily.'
    },
    {
        id: 'blindspot',
        name: 'Expert Blind Spot',
        color: [111, 66, 193],     // Purple
        hoverColor: [142, 105, 212],
        position: 'bottom-right',
        description: 'Assuming others see what you see',
        example: '"It\'s obvious the button does X" (not to novices)',
        antidote: 'Test with actual target users',
        caseStudy: 'The development team thought their icon meanings were "intuitive" since they designed them. Usability testing revealed that only 20% of first-time users correctly identified what each icon meant.'
    }
];

// Interaction state
let hoveredPitfall = null;
let selectedPitfall = null;
let showAntidotesOnly = false;
let antidoteButton;

// Animation
let animationTime = 0;
let transitionProgress = {};

function updateCanvasSize() {
    const mainEl = document.querySelector('main');
    if (mainEl) {
        canvasWidth = Math.min(mainEl.offsetWidth - 20, 900);
    }
}

function setup() {
    updateCanvasSize();
    canvasHeight = drawHeight + controlHeight;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const mainEl = document.querySelector('main');
    if (mainEl) {
        canvas.parent(mainEl);
    }

    // Initialize transition progress for each pitfall
    pitfalls.forEach(p => {
        transitionProgress[p.id] = 0;
    });

    // Create antidotes toggle button
    antidoteButton = createButton('Show Antidotes Only');
    antidoteButton.position(canvasWidth / 2 - 80, drawHeight + 15);
    antidoteButton.mousePressed(toggleAntidotes);
    antidoteButton.style('padding', '8px 16px');
    antidoteButton.style('border-radius', '4px');
    antidoteButton.style('border', 'none');
    antidoteButton.style('background', '#4A90D9');
    antidoteButton.style('color', 'white');
    antidoteButton.style('cursor', 'pointer');
    antidoteButton.style('font-size', '12px');

    textFont('Arial');
}

function toggleAntidotes() {
    showAntidotesOnly = !showAntidotesOnly;
    if (showAntidotesOnly) {
        antidoteButton.html('Show Full Details');
        antidoteButton.style('background', '#28a745');
    } else {
        antidoteButton.html('Show Antidotes Only');
        antidoteButton.style('background', '#4A90D9');
    }
}

function draw() {
    background(248, 249, 250);
    animationTime += 0.02;

    // Title
    fill(50);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Common Interpretation Pitfalls in User Testing', canvasWidth / 2, 10);

    textStyle(NORMAL);
    textSize(12);
    fill(100);
    text('Hover to explore | Click for case study', canvasWidth / 2, 35);

    // Update hover state
    updateHoverState();

    // Draw the four quadrants
    drawQuadrants();

    // Draw case study modal if a pitfall is selected
    if (selectedPitfall) {
        drawCaseStudyModal();
    }
}

function updateHoverState() {
    if (selectedPitfall) {
        hoveredPitfall = null;
        return;
    }

    let quadWidth = (canvasWidth - 30) / 2;
    let quadHeight = (drawHeight - 60) / 2;
    let startY = 55;
    let startX = 10;
    let gap = 10;

    hoveredPitfall = null;

    for (let pitfall of pitfalls) {
        let qx, qy;

        switch (pitfall.position) {
            case 'top-left':
                qx = startX;
                qy = startY;
                break;
            case 'top-right':
                qx = startX + quadWidth + gap;
                qy = startY;
                break;
            case 'bottom-left':
                qx = startX;
                qy = startY + quadHeight + gap;
                break;
            case 'bottom-right':
                qx = startX + quadWidth + gap;
                qy = startY + quadHeight + gap;
                break;
        }

        if (mouseX >= qx && mouseX <= qx + quadWidth &&
            mouseY >= qy && mouseY <= qy + quadHeight) {
            hoveredPitfall = pitfall.id;
        }
    }

    // Update transition progress
    pitfalls.forEach(p => {
        if (hoveredPitfall === p.id) {
            transitionProgress[p.id] = min(1, transitionProgress[p.id] + 0.1);
        } else {
            transitionProgress[p.id] = max(0, transitionProgress[p.id] - 0.1);
        }
    });
}

function drawQuadrants() {
    let quadWidth = (canvasWidth - 30) / 2;
    let quadHeight = (drawHeight - 60) / 2;
    let startY = 55;
    let startX = 10;
    let gap = 10;

    for (let pitfall of pitfalls) {
        let qx, qy;

        switch (pitfall.position) {
            case 'top-left':
                qx = startX;
                qy = startY;
                break;
            case 'top-right':
                qx = startX + quadWidth + gap;
                qy = startY;
                break;
            case 'bottom-left':
                qx = startX;
                qy = startY + quadHeight + gap;
                break;
            case 'bottom-right':
                qx = startX + quadWidth + gap;
                qy = startY + quadHeight + gap;
                break;
        }

        drawQuadrant(pitfall, qx, qy, quadWidth, quadHeight);
    }
}

function drawQuadrant(pitfall, x, y, w, h) {
    let isHovered = hoveredPitfall === pitfall.id;
    let progress = transitionProgress[pitfall.id];

    // Background with hover effect
    let bgColor = isHovered ? pitfall.hoverColor : pitfall.color;
    let shadowOffset = isHovered ? 4 : 2;

    // Draw shadow
    noStroke();
    fill(0, 0, 0, 30);
    rect(x + shadowOffset, y + shadowOffset, w, h, 8);

    // Draw main rectangle
    fill(bgColor[0], bgColor[1], bgColor[2]);
    stroke(bgColor[0] - 30, bgColor[1] - 30, bgColor[2] - 30);
    strokeWeight(2);
    rect(x, y, w, h, 8);

    // Draw icon
    let iconX = x + 30;
    let iconY = y + 35;
    drawIcon(pitfall.id, iconX, iconY, isHovered);

    // Draw pitfall name
    fill(255);
    noStroke();
    textSize(isHovered ? 15 : 14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);

    let textX = x + 60;
    let textY = y + 20;
    text(pitfall.name, textX, textY);

    // Draw content based on mode
    textStyle(NORMAL);
    textSize(11);

    if (showAntidotesOnly) {
        // Antidote only view
        fill(255, 255, 255, 230);
        textSize(13);
        textAlign(CENTER, CENTER);

        // Antidote icon (shield)
        let shieldX = x + w / 2;
        let shieldY = y + h / 2 - 20;
        drawShield(shieldX, shieldY);

        // Antidote text
        fill(255);
        textSize(12);
        textStyle(BOLD);
        text('Antidote:', x + w / 2, y + h / 2 + 10);
        textStyle(NORMAL);
        textSize(11);

        // Word wrap antidote
        let words = pitfall.antidote.split(' ');
        let lines = [];
        let currentLine = '';

        for (let word of words) {
            let testLine = currentLine + word + ' ';
            if (textWidth(testLine) > w - 40) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine.trim());

        let lineY = y + h / 2 + 28;
        for (let line of lines) {
            text(line, x + w / 2, lineY);
            lineY += 16;
        }
    } else {
        // Full details view
        let contentY = y + 45;

        // Description
        fill(255, 255, 255, 220);
        textAlign(LEFT, TOP);

        let descLines = wrapText(pitfall.description, w - 30);
        for (let line of descLines) {
            text(line, x + 15, contentY);
            contentY += 14;
        }

        contentY += 8;

        // Example section
        if (!isHovered) {
            fill(255, 255, 255, 180);
            textStyle(ITALIC);
            textSize(10);
            text('Example:', x + 15, contentY);
            contentY += 14;

            textStyle(NORMAL);
            let exLines = wrapText('"' + pitfall.example + '"', w - 30);
            for (let line of exLines) {
                text(line, x + 15, contentY);
                contentY += 13;
            }
        }

        // Expanded details on hover
        if (isHovered) {
            contentY += 5;

            // Example with more prominence
            fill(255, 255, 255, 200);
            textSize(11);
            textStyle(BOLD);
            text('Example:', x + 15, contentY);
            contentY += 16;

            textStyle(ITALIC);
            fill(255);
            let exLines = wrapText('"' + pitfall.example + '"', w - 30);
            for (let line of exLines) {
                text(line, x + 15, contentY);
                contentY += 14;
            }

            contentY += 12;

            // Antidote section
            textStyle(BOLD);
            fill(200, 255, 200);
            text('Antidote:', x + 15, contentY);
            contentY += 16;

            textStyle(NORMAL);
            fill(220, 255, 220);
            let antLines = wrapText(pitfall.antidote, w - 30);
            for (let line of antLines) {
                text(line, x + 15, contentY);
                contentY += 14;
            }

            // Click hint
            fill(255, 255, 255, 150);
            textSize(10);
            textAlign(CENTER, BOTTOM);
            text('Click for case study', x + w / 2, y + h - 8);
        }
    }
}

function drawIcon(id, x, y, isHovered) {
    let size = isHovered ? 28 : 24;

    push();
    translate(x, y);
    fill(255);
    noStroke();

    switch (id) {
        case 'confirmation':
            // Magnifying glass with checkmark
            stroke(255);
            strokeWeight(2);
            noFill();
            ellipse(0, 0, size * 0.7, size * 0.7);
            line(size * 0.25, size * 0.25, size * 0.4, size * 0.4);

            // Checkmark inside
            strokeWeight(2);
            line(-size * 0.15, 0, -size * 0.05, size * 0.1);
            line(-size * 0.05, size * 0.1, size * 0.15, -size * 0.15);
            break;

        case 'overgeneralization':
            // Three people with arrow to world
            noStroke();
            fill(255);

            // Three small circles (people)
            ellipse(-size * 0.3, 0, size * 0.2, size * 0.2);
            ellipse(-size * 0.15, -size * 0.15, size * 0.2, size * 0.2);
            ellipse(-size * 0.15, size * 0.15, size * 0.2, size * 0.2);

            // Arrow
            stroke(255);
            strokeWeight(2);
            line(0, 0, size * 0.2, 0);
            line(size * 0.15, -size * 0.08, size * 0.2, 0);
            line(size * 0.15, size * 0.08, size * 0.2, 0);

            // World circle
            noFill();
            ellipse(size * 0.35, 0, size * 0.3, size * 0.3);
            arc(size * 0.35, 0, size * 0.3, size * 0.3, -PI/4, PI/4);
            break;

        case 'correlation':
            // Two connected circles with question mark
            noFill();
            stroke(255);
            strokeWeight(2);

            ellipse(-size * 0.2, 0, size * 0.35, size * 0.35);
            ellipse(size * 0.2, 0, size * 0.35, size * 0.35);

            // Connection line
            line(-size * 0.02, 0, size * 0.02, 0);

            // Question mark
            fill(255);
            noStroke();
            textSize(size * 0.4);
            textAlign(CENTER, CENTER);
            text('?', 0, -size * 0.35);
            break;

        case 'blindspot':
            // Eye with blind spot
            noFill();
            stroke(255);
            strokeWeight(2);

            // Eye outline
            beginShape();
            vertex(-size * 0.4, 0);
            bezierVertex(-size * 0.2, -size * 0.3, size * 0.2, -size * 0.3, size * 0.4, 0);
            bezierVertex(size * 0.2, size * 0.3, -size * 0.2, size * 0.3, -size * 0.4, 0);
            endShape();

            // Pupil
            fill(255);
            ellipse(0, 0, size * 0.25, size * 0.25);

            // Blind spot (X)
            stroke(pitfalls[3].color);
            strokeWeight(3);
            line(-size * 0.08, -size * 0.08, size * 0.08, size * 0.08);
            line(size * 0.08, -size * 0.08, -size * 0.08, size * 0.08);
            break;
    }

    pop();
}

function drawShield(x, y) {
    push();
    translate(x, y);

    fill(255, 255, 255, 150);
    stroke(255);
    strokeWeight(2);

    beginShape();
    vertex(0, -20);
    vertex(15, -12);
    vertex(15, 5);
    bezierVertex(15, 15, 0, 22, 0, 22);
    bezierVertex(0, 22, -15, 15, -15, 5);
    vertex(-15, -12);
    endShape(CLOSE);

    // Checkmark
    stroke(100, 200, 100);
    strokeWeight(3);
    line(-5, 2, 0, 8);
    line(0, 8, 8, -5);

    pop();
}

function drawCaseStudyModal() {
    let pitfall = pitfalls.find(p => p.id === selectedPitfall);
    if (!pitfall) return;

    // Darken background
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);

    // Modal dimensions
    let modalWidth = min(500, canvasWidth - 40);
    let modalHeight = 280;
    let modalX = (canvasWidth - modalWidth) / 2;
    let modalY = (drawHeight - modalHeight) / 2;

    // Modal shadow
    fill(0, 0, 0, 50);
    rect(modalX + 5, modalY + 5, modalWidth, modalHeight, 12);

    // Modal background
    fill(255);
    stroke(pitfall.color[0], pitfall.color[1], pitfall.color[2]);
    strokeWeight(3);
    rect(modalX, modalY, modalWidth, modalHeight, 12);

    // Header bar
    fill(pitfall.color[0], pitfall.color[1], pitfall.color[2]);
    noStroke();
    rect(modalX, modalY, modalWidth, 50, 12, 12, 0, 0);

    // Title
    fill(255);
    textSize(16);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Case Study: ' + pitfall.name, modalX + 20, modalY + 25);

    // Close button
    textSize(20);
    textAlign(CENTER, CENTER);
    text('x', modalX + modalWidth - 25, modalY + 25);

    // Case study content
    fill(60);
    textSize(13);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);

    let textLines = wrapText(pitfall.caseStudy, modalWidth - 40);
    let textY = modalY + 70;

    for (let line of textLines) {
        text(line, modalX + 20, textY);
        textY += 20;
    }

    // Lesson learned section
    textY += 15;
    fill(pitfall.color[0], pitfall.color[1], pitfall.color[2]);
    textStyle(BOLD);
    textSize(12);
    text('Key Lesson:', modalX + 20, textY);

    textY += 20;
    fill(80);
    textStyle(NORMAL);
    let lessonLines = wrapText(pitfall.antidote + '.', modalWidth - 40);
    for (let line of lessonLines) {
        text(line, modalX + 20, textY);
        textY += 18;
    }

    // Close instruction
    fill(120);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Click anywhere to close', modalX + modalWidth / 2, modalY + modalHeight - 15);
}

function wrapText(str, maxWidth) {
    let words = str.split(' ');
    let lines = [];
    let currentLine = '';

    for (let word of words) {
        let testLine = currentLine + word + ' ';
        if (textWidth(testLine) > maxWidth && currentLine !== '') {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine.trim());

    return lines;
}

function mousePressed() {
    // Check if clicking close button or anywhere when modal is open
    if (selectedPitfall) {
        selectedPitfall = null;
        return;
    }

    // Check if clicking on a quadrant
    let quadWidth = (canvasWidth - 30) / 2;
    let quadHeight = (drawHeight - 60) / 2;
    let startY = 55;
    let startX = 10;
    let gap = 10;

    for (let pitfall of pitfalls) {
        let qx, qy;

        switch (pitfall.position) {
            case 'top-left':
                qx = startX;
                qy = startY;
                break;
            case 'top-right':
                qx = startX + quadWidth + gap;
                qy = startY;
                break;
            case 'bottom-left':
                qx = startX;
                qy = startY + quadHeight + gap;
                break;
            case 'bottom-right':
                qx = startX + quadWidth + gap;
                qy = startY + quadHeight + gap;
                break;
        }

        if (mouseX >= qx && mouseX <= qx + quadWidth &&
            mouseY >= qy && mouseY <= qy + quadHeight) {
            selectedPitfall = pitfall.id;
            break;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    canvasHeight = drawHeight + controlHeight;
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition button
    antidoteButton.position(canvasWidth / 2 - 80, drawHeight + 15);
}
