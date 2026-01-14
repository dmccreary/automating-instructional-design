# Hypothesis Testing Interface

This interactive MicroSim demonstrates the hypothesis testing interface pattern for educational simulations. Students make predictions about pendulum behavior, adjust variables, run experiments, and compare their predictions against actual results.

## About This MicroSim

The simulation presents a split-panel layout optimized for the scientific method:

1. **Simulation Area (left)** - Interactive pendulum visualization with real-time physics
2. **Hypothesis Panel (right top)** - Where students record predictions before testing
3. **Results Panel (right bottom)** - Where outcomes are displayed and compared to predictions

### Pendulum Physics

The simulation uses accurate simple pendulum physics where the period depends on:

- **Length** - The primary factor affecting period (T = 2*pi*sqrt(L/g))
- **Initial Angle** - Minor effect for small angles (small angle approximation)
- **Mass** - No effect on period (a common misconception to discover)

<iframe src="main.html" width="100%" height="620px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## How to Use

### Hypothesis Workflow

1. **Observe** - Watch the pendulum at its current settings
2. **Predict** - Mentally form a hypothesis about what will happen if you change a variable
3. **Adjust** - Use the sliders to modify ONE variable (length, angle, or mass)
4. **Test** - Click "Test Hypothesis" to run the experiment
5. **Compare** - Review results in the Results Panel
6. **Iterate** - Click the history link to review past experiments

### Key Insights to Discover

Through experimentation, students can discover:

- Increasing pendulum length increases the period
- Decreasing pendulum length decreases the period
- Mass has virtually no effect on period (surprising to many!)
- Initial angle has a minimal effect for small angles

## Lesson Plan

### Grade Level
Middle School to High School Physics (Grades 7-12)

### Learning Objectives

By the end of this lesson, students will be able to:

1. Formulate testable hypotheses about pendulum behavior
2. Design controlled experiments by changing one variable at a time
3. Collect and analyze experimental data
4. Distinguish between correlation and causation
5. Identify and correct common misconceptions about pendulum motion

### Duration
45-60 minutes

### Materials
- Computer or tablet with web browser
- Student worksheet (optional)

### Lesson Procedure

**Introduction (10 minutes)**

1. Discuss the scientific method and hypothesis formation
2. Introduce the pendulum system and its variables
3. Demonstrate how to use the simulation interface

**Guided Exploration (15 minutes)**

1. Have students run a baseline test with default settings
2. Guide students to change ONLY the length and predict the effect
3. Discuss results as a class

**Independent Investigation (20 minutes)**

1. Students systematically test each variable
2. Students record predictions and results
3. Students identify which variables affect the period

**Discussion and Conclusion (10 minutes)**

1. Compare student findings with theoretical predictions
2. Address the common misconception about mass
3. Discuss sources of experimental error

### Assessment Questions

1. Which variable has the greatest effect on pendulum period?
2. Why doesn't mass affect the period?
3. How does doubling the length affect the period?
4. What is the importance of changing only one variable at a time?

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// Hypothesis Testing Interface - Simplified Version
// For use in p5.js web editor

let canvasWidth = 500;
let canvasHeight = 450;

// Pendulum parameters
let pendulumLength = 50; // cm
let pendulumAngle = 15;  // degrees
let pendulumMass = 100;  // grams
let gravity = 9.81;

// Pendulum state
let angle;
let angularVelocity = 0;
let isRunning = false;
let measuredPeriod = 0;
let swingCount = 0;
let startTime = 0;
let lastSign = 1;

// UI
let lengthSlider, testButton;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angle = radians(pendulumAngle);

  lengthSlider = createSlider(10, 100, 50, 1);
  lengthSlider.position(80, 420);
  lengthSlider.input(() => {
    pendulumLength = lengthSlider.value();
    resetPendulum();
  });

  testButton = createButton('Test');
  testButton.position(250, 415);
  testButton.mousePressed(() => {
    isRunning = true;
    startTime = millis();
    swingCount = 0;
  });
}

function resetPendulum() {
  angle = radians(pendulumAngle);
  angularVelocity = 0;
  isRunning = false;
  measuredPeriod = 0;
  swingCount = 0;
}

function draw() {
  background(248, 250, 252);

  // Update physics
  if (isRunning) {
    let L = pendulumLength / 100;
    let acc = -(gravity / L) * sin(angle);
    angularVelocity += acc * 0.016;
    angularVelocity *= 0.999;
    angle += angularVelocity * 0.016;

    // Count swings
    let sign = angle >= 0 ? 1 : -1;
    if (sign !== lastSign && sign === 1) {
      swingCount++;
      if (swingCount >= 3) {
        measuredPeriod = (millis() - startTime) / 1000 / swingCount;
        isRunning = false;
      }
    }
    lastSign = sign;
  }

  // Draw pendulum
  let pivotX = width / 2;
  let pivotY = 100;
  let scale = 2.5;
  let bobX = pivotX + sin(angle) * pendulumLength * scale;
  let bobY = pivotY + cos(angle) * pendulumLength * scale;

  stroke(80);
  strokeWeight(2);
  line(pivotX, pivotY, bobX, bobY);

  fill(59, 130, 246);
  noStroke();
  ellipse(bobX, bobY, 30, 30);

  // Draw info
  fill(30, 41, 59);
  textSize(14);
  textAlign(LEFT);
  text("Length: " + pendulumLength + " cm", 20, 380);
  text("Period: " + (measuredPeriod > 0 ? nf(measuredPeriod, 1, 3) + "s" : "---"), 20, 400);

  // Theoretical
  let theory = 2 * PI * sqrt(pendulumLength / 100 / gravity);
  text("Theory: " + nf(theory, 1, 3) + "s", 250, 400);

  text("Length:", 20, 430);
}
```

## Design Pattern Notes

This MicroSim demonstrates key principles of the **Hypothesis Testing Interface** pattern:

- **Prediction before observation**: Students commit to a hypothesis before seeing results
- **Controlled experimentation**: Interface encourages changing one variable at a time
- **Immediate feedback**: Results are displayed alongside predictions for comparison
- **History tracking**: Students can review their experimental journey
- **Structured inquiry**: The workflow guides students through the scientific method

## References

- [The Simple Pendulum](https://www.physicsclassroom.com/class/waves/Lesson-0/Pendulum-Motion) - Physics Classroom
- [Pendulum Lab](https://phet.colorado.edu/en/simulations/pendulum-lab) - PhET Interactive Simulations
- [Hypothesis-Driven Learning](https://www.sciencedirect.com/topics/computer-science/hypothesis-driven) - Educational Research
