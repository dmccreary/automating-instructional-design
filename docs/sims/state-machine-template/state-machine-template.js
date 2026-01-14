// State Machine Template MicroSim
// A template for creating interactive state machine visualizations

let canvasWidth = 750;
let canvasHeight = 460;
let drawHeight = 400;
let controlHeight = 60;

// State machine configuration
let states = [];
let transitions = [];
let currentState = null;
let stateHistory = [];

// UI elements
let resetButton;
let transitionButtons = [];

// Colors
let backgroundColor = '#f5f5f5';
let stateColor = '#e3f2fd';
let currentStateColor = '#2196f3';
let stateStrokeColor = '#1565c0';
let textColor = '#212121';
let arrowColor = '#616161';
let highlightArrowColor = '#2196f3';
let historyBgColor = '#ffffff';

// State configuration
const STATE_RADIUS = 40;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    // Define states with positions
    defineStates();

    // Define transitions between states
    defineTransitions();

    // Set initial state
    currentState = states[0];
    stateHistory = [currentState.name];

    // Create reset button
    resetButton = createButton('Reset');
    resetButton.parent('canvas-container');
    resetButton.position(10, drawHeight + 15);
    resetButton.mousePressed(resetStateMachine);
    resetButton.style('padding', '8px 16px');
    resetButton.style('font-size', '14px');
    resetButton.style('cursor', 'pointer');
    resetButton.style('background-color', '#ff5722');
    resetButton.style('color', 'white');
    resetButton.style('border', 'none');
    resetButton.style('border-radius', '4px');

    // Create transition buttons
    updateTransitionButtons();

    textFont('Arial');
}

function updateCanvasSize() {
    const container = select('#canvas-container');
    if (container) {
        canvasWidth = container.width;
    }
    canvasWidth = max(canvasWidth, 400);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateStatePositions();
    updateTransitionButtons();
}

function defineStates() {
    // Define 5 states in a circular arrangement
    const centerX = canvasWidth * 0.35;
    const centerY = drawHeight / 2;
    const radius = 120;

    const stateNames = ['Idle', 'Running', 'Paused', 'Error', 'Complete'];
    const stateDescriptions = [
        'Initial waiting state',
        'Active processing',
        'Temporarily suspended',
        'Error occurred',
        'Task finished'
    ];

    for (let i = 0; i < stateNames.length; i++) {
        const angle = -PI / 2 + (TWO_PI * i) / stateNames.length;
        states.push({
            name: stateNames[i],
            description: stateDescriptions[i],
            x: centerX + radius * cos(angle),
            y: centerY + radius * sin(angle),
            id: i
        });
    }
}

function updateStatePositions() {
    const centerX = canvasWidth * 0.35;
    const centerY = drawHeight / 2;
    const radius = 120;

    for (let i = 0; i < states.length; i++) {
        const angle = -PI / 2 + (TWO_PI * i) / states.length;
        states[i].x = centerX + radius * cos(angle);
        states[i].y = centerY + radius * sin(angle);
    }
}

function defineTransitions() {
    // Define allowed transitions: [fromStateId, toStateId, label]
    transitions = [
        { from: 0, to: 1, label: 'Start' },      // Idle -> Running
        { from: 1, to: 2, label: 'Pause' },      // Running -> Paused
        { from: 1, to: 3, label: 'Fail' },       // Running -> Error
        { from: 1, to: 4, label: 'Finish' },     // Running -> Complete
        { from: 2, to: 1, label: 'Resume' },     // Paused -> Running
        { from: 2, to: 0, label: 'Cancel' },     // Paused -> Idle
        { from: 3, to: 0, label: 'Reset' },      // Error -> Idle
        { from: 4, to: 0, label: 'Restart' }     // Complete -> Idle
    ];
}

function getTransitionsFromState(state) {
    return transitions.filter(t => t.from === state.id);
}

function updateTransitionButtons() {
    // Remove existing buttons
    for (let btn of transitionButtons) {
        btn.remove();
    }
    transitionButtons = [];

    // Get available transitions from current state
    const availableTransitions = getTransitionsFromState(currentState);

    // Create buttons for each transition
    let xPos = 90;
    for (let i = 0; i < availableTransitions.length; i++) {
        const t = availableTransitions[i];
        const targetState = states[t.to];

        let btn = createButton(t.label + ' → ' + targetState.name);
        btn.parent('canvas-container');
        btn.position(xPos, drawHeight + 15);
        btn.mousePressed(() => executeTransition(t));
        btn.style('padding', '8px 12px');
        btn.style('font-size', '12px');
        btn.style('cursor', 'pointer');
        btn.style('background-color', '#4caf50');
        btn.style('color', 'white');
        btn.style('border', 'none');
        btn.style('border-radius', '4px');
        btn.style('margin-right', '5px');

        transitionButtons.push(btn);
        xPos += btn.elt.offsetWidth + 10;
    }
}

function executeTransition(transition) {
    const targetState = states[transition.to];
    currentState = targetState;
    stateHistory.push(currentState.name);

    // Limit history length
    if (stateHistory.length > 10) {
        stateHistory = stateHistory.slice(-10);
    }

    updateTransitionButtons();
}

function resetStateMachine() {
    currentState = states[0];
    stateHistory = [currentState.name];
    updateTransitionButtons();
}

function draw() {
    background(backgroundColor);

    // Draw title
    fill(textColor);
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
    text('State Machine Visualization', 10, 10);

    // Draw transitions (arrows)
    drawTransitions();

    // Draw states
    drawStates();

    // Draw history panel
    drawHistoryPanel();

    // Draw current state info
    drawCurrentStateInfo();

    // Draw control area separator
    stroke(200);
    strokeWeight(1);
    line(0, drawHeight, canvasWidth, drawHeight);
}

function drawStates() {
    for (let state of states) {
        const isCurrent = state.id === currentState.id;

        // Draw state circle
        if (isCurrent) {
            fill(currentStateColor);
            stroke(stateStrokeColor);
            strokeWeight(3);
        } else {
            fill(stateColor);
            stroke(stateStrokeColor);
            strokeWeight(2);
        }

        ellipse(state.x, state.y, STATE_RADIUS * 2);

        // Draw state name
        fill(isCurrent ? 'white' : textColor);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text(state.name, state.x, state.y);
    }
}

function drawTransitions() {
    const availableTransitions = getTransitionsFromState(currentState);

    for (let t of transitions) {
        const fromState = states[t.from];
        const toState = states[t.to];
        const isAvailable = availableTransitions.includes(t);

        // Calculate arrow positions
        const angle = atan2(toState.y - fromState.y, toState.x - fromState.x);
        const startX = fromState.x + (STATE_RADIUS + 5) * cos(angle);
        const startY = fromState.y + (STATE_RADIUS + 5) * sin(angle);
        const endX = toState.x - (STATE_RADIUS + 10) * cos(angle);
        const endY = toState.y - (STATE_RADIUS + 10) * sin(angle);

        // Draw arrow line
        if (isAvailable) {
            stroke(highlightArrowColor);
            strokeWeight(2);
        } else {
            stroke(arrowColor);
            strokeWeight(1);
        }

        // Curved arrow for self-loops or close states
        drawArrow(startX, startY, endX, endY, isAvailable);

        // Draw transition label
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // Offset label perpendicular to arrow
        const perpAngle = angle + PI / 2;
        const labelOffset = 12;
        const labelX = midX + labelOffset * cos(perpAngle);
        const labelY = midY + labelOffset * sin(perpAngle);

        fill(isAvailable ? highlightArrowColor : arrowColor);
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        text(t.label, labelX, labelY);
    }
}

function drawArrow(x1, y1, x2, y2, highlighted) {
    line(x1, y1, x2, y2);

    // Arrowhead
    const angle = atan2(y2 - y1, x2 - x1);
    const arrowSize = highlighted ? 10 : 8;

    push();
    translate(x2, y2);
    rotate(angle);

    if (highlighted) {
        fill(highlightArrowColor);
    } else {
        fill(arrowColor);
    }
    noStroke();

    triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
    pop();
}

function drawHistoryPanel() {
    const panelX = canvasWidth - 200;
    const panelY = 40;
    const panelWidth = 190;
    const panelHeight = 200;

    // Panel background
    fill(historyBgColor);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Panel title
    fill(textColor);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('State History', panelX + 10, panelY + 10);

    // Draw history path
    textSize(12);
    let yOffset = 35;
    for (let i = 0; i < stateHistory.length; i++) {
        const stateName = stateHistory[i];
        const isLast = i === stateHistory.length - 1;

        fill(isLast ? currentStateColor : textColor);
        text((i + 1) + '. ' + stateName, panelX + 15, panelY + yOffset);
        yOffset += 18;

        if (yOffset > panelHeight - 20) break;
    }
}

function drawCurrentStateInfo() {
    const infoX = canvasWidth - 200;
    const infoY = 260;
    const infoWidth = 190;
    const infoHeight = 100;

    // Info background
    fill(currentStateColor);
    stroke(stateStrokeColor);
    strokeWeight(2);
    rect(infoX, infoY, infoWidth, infoHeight, 5);

    // Current state label
    fill('white');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text('Current State:', infoX + 10, infoY + 10);

    textSize(18);
    text(currentState.name, infoX + 10, infoY + 30);

    textSize(11);
    text(currentState.description, infoX + 10, infoY + 55, infoWidth - 20, 40);
}
