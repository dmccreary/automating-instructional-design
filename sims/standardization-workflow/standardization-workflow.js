// Standardization Workflow MicroSim
// Interactive flowchart showing the MicroSim standardization process

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Workflow nodes
let nodes = [];
let connections = [];
let selectedNode = null;
let hoveredNode = null;

// Color scheme
const colors = {
    blue: '#3B82F6',      // File operations
    yellow: '#F59E0B',    // Decision points
    green: '#10B981',     // Success outcomes
    purple: '#8B5CF6',    // Validation steps
    start: '#6366F1',     // Start/End
    text: '#1F2937',
    background: '#F9FAFB',
    highlight: '#FEF3C7'
};

// Sample input state for path highlighting
let sampleScore = 70;
let isP5js = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textAlign(CENTER, CENTER);

    initializeNodes();
    initializeConnections();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth - 20, 900);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    initializeNodes();
    initializeConnections();
}

function initializeNodes() {
    nodes = [];

    let centerX = canvasWidth / 2;
    let startY = 40;
    let rowHeight = 70;

    // Row 1: Start
    nodes.push({
        id: 1,
        type: 'terminal',
        label: 'Receive MicroSim Path',
        description: 'User provides path to MicroSim directory for evaluation',
        x: centerX,
        y: startY,
        w: 180,
        h: 35,
        color: colors.start
    });

    // Row 2: Decision - Score check
    nodes.push({
        id: 2,
        type: 'decision',
        label: 'Score >= 85?',
        description: 'Check YAML frontmatter for existing quality_score',
        x: centerX,
        y: startY + rowHeight,
        w: 120,
        h: 60,
        color: colors.yellow
    });

    // Row 3: Skip (Yes branch) and Begin (No branch)
    nodes.push({
        id: 3,
        type: 'process',
        label: 'Skip',
        description: 'MicroSim already meets standards (score >= 85)',
        x: centerX + 150,
        y: startY + rowHeight * 1.5,
        w: 100,
        h: 35,
        color: colors.green
    });

    nodes.push({
        id: 4,
        type: 'process',
        label: 'Begin Checklist',
        description: 'Start full evaluation process for MicroSim',
        x: centerX,
        y: startY + rowHeight * 2,
        w: 140,
        h: 35,
        color: colors.blue
    });

    // Row 4: Check Core Files
    nodes.push({
        id: 5,
        type: 'process',
        label: 'Check Core Files',
        description: 'Verify main.html, index.md, metadata.json exist',
        x: centerX,
        y: startY + rowHeight * 2.8,
        w: 150,
        h: 35,
        color: colors.blue
    });

    // Row 5: Validate index.md
    nodes.push({
        id: 6,
        type: 'process',
        label: 'Validate index.md',
        description: 'Check YAML frontmatter, headers, iframes, and links',
        x: centerX,
        y: startY + rowHeight * 3.6,
        w: 160,
        h: 35,
        color: colors.purple
    });

    // Row 6: Is p5.js decision
    nodes.push({
        id: 7,
        type: 'decision',
        label: 'Is p5.js?',
        description: 'Detect if MicroSim uses p5.js library',
        x: centerX,
        y: startY + rowHeight * 4.4,
        w: 100,
        h: 50,
        color: colors.yellow
    });

    // Row 7: p5.js editor check (Yes) and Continue (No)
    nodes.push({
        id: 8,
        type: 'process',
        label: 'Check Editor Link',
        description: 'Verify p5.js Editor link exists for online testing',
        x: centerX - 130,
        y: startY + rowHeight * 5.2,
        w: 140,
        h: 35,
        color: colors.blue
    });

    nodes.push({
        id: 9,
        type: 'process',
        label: 'Skip Type Check',
        description: 'Continue to content validation (non-p5.js)',
        x: centerX + 130,
        y: startY + rowHeight * 5.2,
        w: 130,
        h: 35,
        color: colors.green
    });

    // Row 8: Validate Content
    nodes.push({
        id: 10,
        type: 'process',
        label: 'Validate Content',
        description: 'Check description, lesson plan, and references sections',
        x: centerX,
        y: startY + rowHeight * 6,
        w: 150,
        h: 35,
        color: colors.purple
    });

    // Row 9: Validate metadata.json
    nodes.push({
        id: 11,
        type: 'process',
        label: 'Validate metadata',
        description: 'Run JSON Schema validation on metadata.json',
        x: centerX,
        y: startY + rowHeight * 6.7,
        w: 150,
        h: 35,
        color: colors.purple
    });

    // Row 10: Calculate Score
    nodes.push({
        id: 12,
        type: 'process',
        label: 'Calculate Score',
        description: 'Sum points from standardization rubric (0-100)',
        x: centerX,
        y: startY + rowHeight * 7.4,
        w: 140,
        h: 35,
        color: colors.blue
    });

    // Row 11: Write Score
    nodes.push({
        id: 13,
        type: 'process',
        label: 'Write Score',
        description: 'Update YAML frontmatter with quality_score',
        x: centerX,
        y: startY + rowHeight * 8.1,
        w: 130,
        h: 35,
        color: colors.blue
    });

    // Row 12: End
    nodes.push({
        id: 14,
        type: 'terminal',
        label: 'Complete',
        description: 'Standardization workflow finished',
        x: centerX,
        y: startY + rowHeight * 8.8,
        w: 140,
        h: 35,
        color: colors.start
    });
}

function initializeConnections() {
    connections = [
        { from: 1, to: 2 },
        { from: 2, to: 3, label: 'Yes', offsetX: 75 },
        { from: 2, to: 4, label: 'No' },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8, label: 'Yes', offsetX: -50 },
        { from: 7, to: 9, label: 'No', offsetX: 50 },
        { from: 8, to: 10 },
        { from: 9, to: 10 },
        { from: 10, to: 11 },
        { from: 11, to: 12 },
        { from: 12, to: 13 },
        { from: 13, to: 14 }
    ];
}

function draw() {
    background(colors.background);

    // Draw title
    fill(colors.text);
    textSize(18);
    textStyle(BOLD);
    text('MicroSim Standardization Workflow', canvasWidth / 2, 15);
    textStyle(NORMAL);

    // Draw connections first (behind nodes)
    drawConnections();

    // Draw nodes
    for (let node of nodes) {
        drawNode(node);
    }

    // Draw info panel at bottom
    drawInfoPanel();
}

function drawConnections() {
    stroke(100);
    strokeWeight(2);

    for (let conn of connections) {
        let fromNode = nodes.find(n => n.id === conn.from);
        let toNode = nodes.find(n => n.id === conn.to);

        if (fromNode && toNode) {
            // Highlight active path
            let isActive = isConnectionActive(conn);
            if (isActive) {
                stroke(colors.green);
                strokeWeight(3);
            } else {
                stroke(150);
                strokeWeight(2);
            }

            let startX = fromNode.x + (conn.offsetX || 0);
            let startY = fromNode.y + fromNode.h / 2;
            let endX = toNode.x;
            let endY = toNode.y - toNode.h / 2;

            // Draw line
            if (conn.offsetX) {
                // Curved connection for branches
                noFill();
                beginShape();
                vertex(startX, startY);
                vertex(startX, (startY + endY) / 2);
                vertex(endX, (startY + endY) / 2);
                vertex(endX, endY);
                endShape();
            } else {
                line(startX, startY, endX, endY);
            }

            // Draw arrow
            drawArrow(endX, endY);

            // Draw label
            if (conn.label) {
                noStroke();
                fill(colors.text);
                textSize(11);
                let labelX = startX + (conn.offsetX ? 0 : 15);
                let labelY = startY + 15;
                text(conn.label, labelX, labelY);
            }
        }
    }
}

function isConnectionActive(conn) {
    // Determine if connection is on the active path based on sample input
    if (conn.from === 2) {
        if (conn.to === 3 && sampleScore >= 85) return true;
        if (conn.to === 4 && sampleScore < 85) return true;
    }
    if (conn.from === 7) {
        if (conn.to === 8 && isP5js) return true;
        if (conn.to === 9 && !isP5js) return true;
    }
    // Always active connections
    if ([1, 4, 5, 6, 8, 9, 10, 11, 12, 13].includes(conn.from) &&
        ![3].includes(conn.to)) {
        if (sampleScore < 85) return true;
    }
    return false;
}

function drawArrow(x, y) {
    fill(100);
    noStroke();
    triangle(x - 5, y - 8, x + 5, y - 8, x, y);
}

function drawNode(node) {
    let isHovered = hoveredNode === node;
    let isSelected = selectedNode === node;
    let isOnPath = isNodeOnPath(node);

    // Shadow for hovered/selected
    if (isHovered || isSelected) {
        noStroke();
        fill(0, 0, 0, 30);
        if (node.type === 'decision') {
            push();
            translate(node.x + 3, node.y + 3);
            rotate(PI / 4);
            rectMode(CENTER);
            rect(0, 0, node.w * 0.7, node.w * 0.7);
            pop();
        } else if (node.type === 'terminal') {
            rectMode(CENTER);
            rect(node.x + 3, node.y + 3, node.w, node.h, node.h / 2);
        } else {
            rectMode(CENTER);
            rect(node.x + 3, node.y + 3, node.w, node.h, 5);
        }
    }

    // Node fill
    if (isOnPath) {
        fill(node.color);
    } else {
        // Dimmed if not on path
        let c = color(node.color);
        fill(red(c), green(c), blue(c), 100);
    }

    stroke(isSelected ? colors.text : 80);
    strokeWeight(isSelected ? 3 : 1.5);

    // Draw shape based on type
    if (node.type === 'decision') {
        push();
        translate(node.x, node.y);
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, node.w * 0.7, node.w * 0.7);
        pop();
    } else if (node.type === 'terminal') {
        rectMode(CENTER);
        rect(node.x, node.y, node.w, node.h, node.h / 2);
    } else {
        rectMode(CENTER);
        rect(node.x, node.y, node.w, node.h, 5);
    }

    // Draw label
    noStroke();
    fill(node.type === 'decision' ? colors.text : 'white');
    textSize(11);
    textStyle(BOLD);
    text(node.label, node.x, node.y);
    textStyle(NORMAL);
}

function isNodeOnPath(node) {
    // Check if node is on the active path based on sample input
    if (sampleScore >= 85) {
        return [1, 2, 3].includes(node.id);
    }

    // Score < 85: go through main workflow
    if ([1, 2, 4, 5, 6, 7, 10, 11, 12, 13, 14].includes(node.id)) return true;
    if (node.id === 8 && isP5js) return true;
    if (node.id === 9 && !isP5js) return true;

    return false;
}

function drawInfoPanel() {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Controls
    noStroke();
    fill(colors.text);
    textSize(12);
    textAlign(LEFT, CENTER);

    // Score slider
    text('Sample Score: ' + sampleScore, 20, drawHeight + 25);

    // Slider
    fill(220);
    rect(130, drawHeight + 18, 100, 14, 7);
    fill(colors.blue);
    let sliderX = map(sampleScore, 0, 100, 130, 230);
    ellipse(sliderX, drawHeight + 25, 16, 16);

    // p5.js toggle
    fill(colors.text);
    text('Is p5.js:', 260, drawHeight + 25);

    // Toggle button
    fill(isP5js ? colors.green : 200);
    rect(320, drawHeight + 15, 50, 20, 10);
    fill(255);
    ellipse(isP5js ? 355 : 335, drawHeight + 25, 16, 16);

    // Selected node info
    if (selectedNode || hoveredNode) {
        let node = selectedNode || hoveredNode;
        fill(colors.text);
        textSize(11);
        text('Step ' + node.id + ': ' + node.description, 390, drawHeight + 25);
    } else {
        fill(150);
        textSize(11);
        text('Click a step for details', 390, drawHeight + 25);
    }

    textAlign(CENTER, CENTER);
}

function mousePressed() {
    // Check slider
    if (mouseY > drawHeight + 10 && mouseY < drawHeight + 40) {
        if (mouseX >= 130 && mouseX <= 230) {
            sampleScore = Math.round(map(mouseX, 130, 230, 0, 100));
            return;
        }
        // Toggle
        if (mouseX >= 320 && mouseX <= 370) {
            isP5js = !isP5js;
            return;
        }
    }

    // Check nodes
    for (let node of nodes) {
        if (isOverNode(node)) {
            selectedNode = (selectedNode === node) ? null : node;
            return;
        }
    }
    selectedNode = null;
}

function mouseDragged() {
    // Slider drag
    if (mouseY > drawHeight + 10 && mouseY < drawHeight + 40) {
        if (mouseX >= 125 && mouseX <= 235) {
            sampleScore = Math.round(constrain(map(mouseX, 130, 230, 0, 100), 0, 100));
        }
    }
}

function mouseMoved() {
    hoveredNode = null;
    for (let node of nodes) {
        if (isOverNode(node)) {
            hoveredNode = node;
            cursor(HAND);
            return;
        }
    }
    cursor(ARROW);
}

function isOverNode(node) {
    if (node.type === 'decision') {
        // Diamond hit test (simplified as square)
        let dx = abs(mouseX - node.x);
        let dy = abs(mouseY - node.y);
        return (dx + dy) < node.w * 0.5;
    } else {
        // Rectangle hit test
        return mouseX > node.x - node.w / 2 &&
               mouseX < node.x + node.w / 2 &&
               mouseY > node.y - node.h / 2 &&
               mouseY < node.y + node.h / 2;
    }
}
