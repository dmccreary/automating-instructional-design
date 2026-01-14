// Elementary Scaffolding Progression MicroSim
// Demonstrates scaffolded learning through progressive unlocking of physics controls

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Simulation area and control panel dimensions
let simWidth = 600;
let controlPanelX = 600;
let controlPanelWidth = 200;

// Current level (1-5)
let currentLevel = 1;
let experimentsCompleted = 0;
let experimentsNeeded = 3;
let totalExperiments = 0;

// Ball properties
let balls = [];
let gravity = 0.5;
let groundY;

// Control values
let dropHeight = 100;
let ballMass = 20;
let airResistance = false;
let maxBalls = 1;

// UI elements
let dropButton;
let heightSlider;
let massSlider;
let airResistanceCheckbox;
let ballCountSlider;
let resetButton;

// Animation states
let celebrationActive = false;
let celebrationTimer = 0;
let celebrationParticles = [];

// Colors
let lockedColor;
let unlockedColor;
let ballColor;
let groundColor;
let backgroundColor;

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(800, container.clientWidth - 20);
        simWidth = canvasWidth - controlPanelWidth;
        if (simWidth < 400) {
            simWidth = canvasWidth;
            controlPanelX = 0;
            controlPanelWidth = canvasWidth;
            canvasHeight = drawHeight + 300; // Extra space for stacked controls
        } else {
            controlPanelX = simWidth;
        }
    }
}

function setup() {
    updateCanvasSize();

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const container = document.querySelector('main');
    if (container) {
        canvas.parent(container);
    }

    // Initialize colors
    lockedColor = color(150, 150, 150);
    unlockedColor = color(30, 100, 200);
    ballColor = color(220, 80, 80);
    groundColor = color(100, 80, 60);
    backgroundColor = color(240, 245, 250);

    groundY = drawHeight - 30;

    textFont('Arial');

    // Create UI controls (they will be positioned in draw based on layout)
    createControls();
}

function createControls() {
    // Drop button - always active
    dropButton = createButton('Drop Ball');
    dropButton.mousePressed(dropBall);
    dropButton.style('padding', '10px 20px');
    dropButton.style('font-size', '14px');
    dropButton.style('cursor', 'pointer');
    dropButton.style('background-color', '#1e64c8');
    dropButton.style('color', 'white');
    dropButton.style('border', 'none');
    dropButton.style('border-radius', '5px');

    // Height slider - Level 2
    heightSlider = createSlider(50, 350, 100);
    heightSlider.style('width', '150px');

    // Mass slider - Level 3
    massSlider = createSlider(10, 50, 20);
    massSlider.style('width', '150px');

    // Air resistance checkbox - Level 4
    airResistanceCheckbox = createCheckbox('', false);

    // Ball count slider - Level 5
    ballCountSlider = createSlider(1, 5, 1);
    ballCountSlider.style('width', '150px');

    // Reset button
    resetButton = createButton('Reset Progress');
    resetButton.mousePressed(resetProgress);
    resetButton.style('padding', '5px 10px');
    resetButton.style('font-size', '12px');
    resetButton.style('cursor', 'pointer');
    resetButton.style('background-color', '#666');
    resetButton.style('color', 'white');
    resetButton.style('border', 'none');
    resetButton.style('border-radius', '3px');

    updateControlStates();
}

function updateControlStates() {
    // Level 2: Height slider
    if (currentLevel >= 2) {
        heightSlider.removeAttribute('disabled');
        heightSlider.style('cursor', 'pointer');
    } else {
        heightSlider.attribute('disabled', '');
        heightSlider.style('cursor', 'not-allowed');
    }

    // Level 3: Mass slider
    if (currentLevel >= 3) {
        massSlider.removeAttribute('disabled');
        massSlider.style('cursor', 'pointer');
    } else {
        massSlider.attribute('disabled', '');
        massSlider.style('cursor', 'not-allowed');
    }

    // Level 4: Air resistance
    if (currentLevel >= 4) {
        airResistanceCheckbox.removeAttribute('disabled');
        airResistanceCheckbox.style('cursor', 'pointer');
    } else {
        airResistanceCheckbox.attribute('disabled', '');
        airResistanceCheckbox.style('cursor', 'not-allowed');
    }

    // Level 5: Ball count
    if (currentLevel >= 5) {
        ballCountSlider.removeAttribute('disabled');
        ballCountSlider.style('cursor', 'pointer');
    } else {
        ballCountSlider.attribute('disabled', '');
        ballCountSlider.style('cursor', 'not-allowed');
    }
}

function positionControls() {
    const container = document.querySelector('main');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const canvasElement = document.querySelector('canvas');
    if (!canvasElement) return;

    const canvasRect = canvasElement.getBoundingClientRect();
    const baseX = canvasRect.left + controlPanelX + 25;
    const baseY = canvasRect.top + window.scrollY;

    if (simWidth === canvasWidth) {
        // Stacked layout for narrow screens
        const stackBaseY = baseY + drawHeight + 50;
        dropButton.position(baseX + 50, stackBaseY);
        heightSlider.position(baseX + 100, stackBaseY + 50);
        massSlider.position(baseX + 100, stackBaseY + 90);
        airResistanceCheckbox.position(baseX + 100, stackBaseY + 130);
        ballCountSlider.position(baseX + 100, stackBaseY + 170);
        resetButton.position(baseX + 60, stackBaseY + 220);
    } else {
        // Side panel layout
        dropButton.position(baseX + 25, baseY + 100);
        heightSlider.position(baseX, baseY + 180);
        massSlider.position(baseX, baseY + 240);
        airResistanceCheckbox.position(baseX + 130, baseY + 295);
        ballCountSlider.position(baseX, baseY + 355);
        resetButton.position(baseX + 30, baseY + 410);
    }
}

function draw() {
    background(backgroundColor);

    // Position HTML controls
    positionControls();

    // Read control values
    if (currentLevel >= 2) dropHeight = heightSlider.value();
    if (currentLevel >= 3) ballMass = massSlider.value();
    if (currentLevel >= 4) airResistance = airResistanceCheckbox.checked();
    if (currentLevel >= 5) maxBalls = ballCountSlider.value();

    // Draw simulation area
    drawSimulationArea();

    // Update and draw balls
    updateBalls();

    // Draw control panel
    drawControlPanel();

    // Draw celebration if active
    if (celebrationActive) {
        drawCelebration();
    }

    // Draw bottom info bar
    drawInfoBar();
}

function drawSimulationArea() {
    // Sky gradient effect
    for (let y = 0; y < drawHeight; y++) {
        let inter = map(y, 0, drawHeight, 0, 1);
        let c = lerpColor(color(135, 206, 235), color(200, 230, 255), inter);
        stroke(c);
        line(0, y, simWidth, y);
    }

    // Ground
    fill(groundColor);
    noStroke();
    rect(0, groundY, simWidth, drawHeight - groundY);

    // Ground texture
    fill(80, 60, 40);
    for (let x = 0; x < simWidth; x += 20) {
        rect(x, groundY, 2, 5);
    }

    // Drop height indicator
    if (currentLevel >= 2) {
        stroke(100, 100, 200, 150);
        strokeWeight(2);
        let dropY = groundY - dropHeight;
        line(simWidth/2 - 50, dropY, simWidth/2 + 50, dropY);

        // Height label
        fill(100, 100, 200);
        noStroke();
        textSize(12);
        textAlign(RIGHT, CENTER);
        text(dropHeight + 'px', simWidth/2 - 55, dropY);
    }

    // Border
    stroke(100);
    strokeWeight(2);
    noFill();
    rect(0, 0, simWidth, drawHeight);
}

function drawControlPanel() {
    // Panel background
    fill(250, 250, 255);
    stroke(200);
    strokeWeight(1);
    rect(controlPanelX, 0, controlPanelWidth, drawHeight);

    // Title
    fill(30, 30, 80);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Scaffolding Controls', controlPanelX + controlPanelWidth/2, 15);

    // Level indicator
    textSize(14);
    textStyle(NORMAL);
    fill(unlockedColor);
    text('Level ' + currentLevel + ' / 5', controlPanelX + controlPanelWidth/2, 40);

    // Progress bar
    let progressWidth = 160;
    let progressX = controlPanelX + 20;
    let progressY = 60;
    fill(220);
    rect(progressX, progressY, progressWidth, 10, 5);
    fill(unlockedColor);
    rect(progressX, progressY, progressWidth * (experimentsCompleted / experimentsNeeded), 10, 5);

    textSize(10);
    fill(100);
    textAlign(CENTER, TOP);
    text(experimentsCompleted + '/' + experimentsNeeded + ' to unlock', controlPanelX + controlPanelWidth/2, progressY + 15);

    // Control labels
    textAlign(LEFT, CENTER);
    textSize(12);

    // Drop button label (always shown)
    fill(30);
    text('Drop:', controlPanelX + 15, 110);

    // Height slider - Level 2
    drawControlLabel('Height:', controlPanelX + 15, 170, currentLevel >= 2, 2);

    // Mass slider - Level 3
    drawControlLabel('Mass:', controlPanelX + 15, 230, currentLevel >= 3, 3);

    // Air resistance - Level 4
    drawControlLabel('Air Drag:', controlPanelX + 15, 295, currentLevel >= 4, 4);

    // Ball count - Level 5
    drawControlLabel('Ball Count:', controlPanelX + 15, 345, currentLevel >= 5, 5);

    // Current values display
    if (currentLevel >= 2) {
        fill(80);
        textSize(10);
        text(dropHeight + 'px', controlPanelX + 155, 195);
    }
    if (currentLevel >= 3) {
        fill(80);
        textSize(10);
        text(ballMass + 'g', controlPanelX + 155, 255);
    }
    if (currentLevel >= 5) {
        fill(80);
        textSize(10);
        text(maxBalls, controlPanelX + 155, 370);
    }
}

function drawControlLabel(labelText, x, y, unlocked, requiredLevel) {
    if (unlocked) {
        fill(30);
        text(labelText, x, y);
    } else {
        fill(lockedColor);
        text(labelText, x, y);

        // Lock icon
        textSize(10);
        fill(180);
        text('Unlock at L' + requiredLevel, x, y + 15);
        textSize(12);
    }
}

function drawInfoBar() {
    // Info bar at bottom
    fill(40, 50, 70);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    fill(255);
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Total Experiments: ' + totalExperiments, 20, drawHeight + controlHeight/2);

    textAlign(RIGHT, CENTER);
    let statusText = currentLevel < 5 ?
        'Complete ' + (experimentsNeeded - experimentsCompleted) + ' more to unlock Level ' + (currentLevel + 1) :
        'All levels unlocked! Experiment freely!';
    text(statusText, canvasWidth - 20, drawHeight + controlHeight/2);
}

function dropBall() {
    // Clear existing balls if at max
    if (balls.length >= maxBalls) {
        balls = [];
    }

    // Create new ball(s)
    let numToCreate = currentLevel >= 5 ? maxBalls : 1;
    for (let i = 0; i < numToCreate; i++) {
        let offsetX = numToCreate > 1 ? map(i, 0, numToCreate - 1, -50, 50) : 0;
        balls.push(new Ball(simWidth/2 + offsetX, groundY - dropHeight, ballMass));
    }
}

function updateBalls() {
    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        ball.update();
        ball.display();

        // Check if ball has settled
        if (ball.settled && !ball.counted) {
            ball.counted = true;
            totalExperiments++;
            experimentsCompleted++;

            // Check for level up
            if (experimentsCompleted >= experimentsNeeded && currentLevel < 5) {
                levelUp();
            }
        }

        // Remove balls that have been settled for a while
        if (ball.settledTime > 120) {
            balls.splice(i, 1);
        }
    }
}

function levelUp() {
    currentLevel++;
    experimentsCompleted = 0;
    celebrationActive = true;
    celebrationTimer = 0;

    // Create celebration particles
    celebrationParticles = [];
    for (let i = 0; i < 50; i++) {
        celebrationParticles.push({
            x: simWidth / 2,
            y: drawHeight / 2,
            vx: random(-5, 5),
            vy: random(-8, -2),
            color: color(random(255), random(255), random(255)),
            size: random(5, 15),
            life: 100
        });
    }

    updateControlStates();
}

function drawCelebration() {
    celebrationTimer++;

    // Draw "Level Up!" text
    if (celebrationTimer < 90) {
        push();
        textAlign(CENTER, CENTER);
        textSize(48);
        textStyle(BOLD);
        fill(255, 215, 0, map(celebrationTimer, 0, 90, 255, 0));
        text('Level ' + currentLevel + ' Unlocked!', simWidth/2, drawHeight/2);
        pop();
    }

    // Draw particles
    for (let i = celebrationParticles.length - 1; i >= 0; i--) {
        let p = celebrationParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life--;

        if (p.life > 0) {
            fill(red(p.color), green(p.color), blue(p.color), map(p.life, 0, 100, 0, 255));
            noStroke();
            ellipse(p.x, p.y, p.size);
        } else {
            celebrationParticles.splice(i, 1);
        }
    }

    if (celebrationTimer > 120 && celebrationParticles.length === 0) {
        celebrationActive = false;
    }
}

function resetProgress() {
    currentLevel = 1;
    experimentsCompleted = 0;
    totalExperiments = 0;
    balls = [];
    heightSlider.value(100);
    massSlider.value(20);
    airResistanceCheckbox.checked(false);
    ballCountSlider.value(1);
    dropHeight = 100;
    ballMass = 20;
    airResistance = false;
    maxBalls = 1;
    updateControlStates();
}

// Ball class
class Ball {
    constructor(x, y, mass) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.radius = map(mass, 10, 50, 12, 30);
        this.vy = 0;
        this.vx = 0;
        this.settled = false;
        this.counted = false;
        this.settledTime = 0;
        this.bounceCount = 0;
    }

    update() {
        if (!this.settled) {
            // Apply gravity
            let gravityForce = gravity;

            // Air resistance (Level 4)
            if (airResistance && currentLevel >= 4) {
                let drag = 0.02 * this.vy * this.vy * (this.radius / 20);
                if (this.vy > 0) drag = -drag;
                gravityForce += drag / this.mass;
            }

            this.vy += gravityForce;
            this.y += this.vy;

            // Ground collision
            if (this.y + this.radius > groundY) {
                this.y = groundY - this.radius;
                this.vy *= -0.6; // Bounce with energy loss
                this.bounceCount++;

                // Settle if velocity is low
                if (abs(this.vy) < 1) {
                    this.settled = true;
                    this.vy = 0;
                }
            }
        } else {
            this.settledTime++;
        }
    }

    display() {
        // Shadow
        fill(0, 0, 0, 30);
        noStroke();
        ellipse(this.x, groundY - 2, this.radius * 1.5, this.radius * 0.3);

        // Ball
        let c = color(ballColor);
        fill(c);
        stroke(100, 50, 50);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2);

        // Highlight
        fill(255, 255, 255, 100);
        noStroke();
        ellipse(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.5);

        // Mass label (Level 3+)
        if (currentLevel >= 3) {
            fill(255);
            textSize(10);
            textAlign(CENTER, CENTER);
            noStroke();
            text(this.mass + 'g', this.x, this.y);
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    groundY = drawHeight - 30;
}
