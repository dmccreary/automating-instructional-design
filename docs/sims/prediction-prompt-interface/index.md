# Prediction Prompt Interface

This interactive MicroSim demonstrates best practices for designing prediction prompt interfaces in educational simulations. The 5-panel workflow shows how to effectively capture learner predictions before observations, maximizing engagement and learning.

## About This MicroSim

The simulation presents an annotated mockup of an ideal prediction prompt sequence, walking through each stage of the prediction-observation-reflection cycle that makes learning stick.

### The 5-Panel Workflow

1. **Setup** - Present the scenario clearly with initial conditions visible
2. **Prediction Input** - Capture predictions using multiple input methods
3. **Reasoning Capture** - Optionally capture why learners made their prediction
4. **Observation** - Run the simulation with prediction visible alongside results
5. **Reflection** - Guide explicit acknowledgment and connect to concepts

<iframe src="main.html" width="100%" height="520px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Key Design Principles

### 1. Commitment Before Observation

The most critical principle: learners must commit to a prediction **before** seeing the outcome. This:

- Creates cognitive investment in the result
- Activates prior knowledge and mental models
- Makes the observation personally meaningful
- Enables genuine surprise when expectations differ

### 2. Multiple Input Methods

Effective prediction interfaces offer various ways to express predictions:

- **Multiple choice** - Quick, easy to analyze, can include common misconceptions
- **Drawing/sketching** - For trajectories, graphs, or spatial predictions
- **Sliders/values** - For quantitative predictions
- **Free-form text** - For complex reasoning

### 3. Confidence Indicators

Asking "How sure are you?" (1-5 scale) provides valuable data:

- Identifies areas of uncertainty for targeted instruction
- Helps learners calibrate their metacognition
- Enables adaptive difficulty adjustments

### 4. No Skip Option

The interface should **not** allow skipping the prediction step. Commitment is crucial for learning. Design the experience so prediction feels natural and valuable, not like a barrier.

### 5. Visible Comparison

During and after observation:

- Keep the prediction visible alongside the actual result
- Provide clear visual comparison
- Celebrate engagement, not just correctness

### 6. Structured Reflection

After observation, guide reflection with:

- Explicit acknowledgment ("Was your prediction correct?")
- Explanation for unexpected results
- Connection to underlying concepts
- Option to retry with new understanding

## Color Scheme

The mockup uses a consistent color scheme to signal different types of content:

| Color | Purpose |
|-------|---------|
| Blue | Prompts and questions |
| Yellow | Learner input areas |
| Green | Observation and results |
| Orange | Reflection and warnings |

## Implementation Tips

When implementing prediction prompts in your MicroSims:

```javascript
// Lock predictions before running simulation
let predictionLocked = false;

function lockPrediction() {
  predictionLocked = true;
  // Store prediction timestamp
  predictionTime = millis();
  // Disable input modification
  disablePredictionInputs();
  // Enable simulation start
  enableRunButton();
}

function runSimulation() {
  if (!predictionLocked) {
    alert("Please make a prediction first!");
    return;
  }
  // Run simulation with prediction visible
  showPredictionOverlay = true;
  startAnimation();
}
```

## Research Foundation

The prediction-observation-reflection cycle is grounded in:

- **Constructivism** - Learners build knowledge by testing mental models
- **Cognitive conflict** - Surprise at unexpected results drives schema change
- **Active learning** - Engagement improves retention and transfer
- **Metacognition** - Reflecting on predictions builds self-awareness

Studies show that students who make predictions before observations learn significantly more than those who simply observe, even when their predictions are wrong.

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// Prediction Prompt Interface - Simplified Template
// For use in p5.js web editor

let canvasWidth = 500;
let canvasHeight = 400;
let currentPanel = 1;
const totalPanels = 5;

let predictionMade = false;
let predictionValue = -1;
let simulationRan = false;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textFont('Arial');
}

function draw() {
  background(240);

  // Draw panel indicator
  fill(50);
  textSize(16);
  textAlign(CENTER, TOP);
  text("Panel " + currentPanel + " of " + totalPanels, width/2, 10);

  // Draw panel content
  switch(currentPanel) {
    case 1: drawSetupPanel(); break;
    case 2: drawPredictionPanel(); break;
    case 3: drawReasoningPanel(); break;
    case 4: drawObservationPanel(); break;
    case 5: drawReflectionPanel(); break;
  }

  // Draw navigation
  drawNavigation();
}

function drawSetupPanel() {
  fill(50);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Present your scenario here", width/2, height/2 - 40);

  fill(59, 130, 246);
  textSize(18);
  textStyle(BOLD);
  text("What do you predict will happen?", width/2, height/2 + 40);
  textStyle(NORMAL);
}

function drawPredictionPanel() {
  fill(50);
  textSize(14);
  textAlign(LEFT, TOP);

  let options = ["Option A", "Option B", "Option C"];
  for (let i = 0; i < options.length; i++) {
    let y = 100 + i * 50;

    // Radio button
    fill(predictionValue === i ? color(59, 130, 246) : 255);
    stroke(50);
    ellipse(50, y, 20, 20);

    // Label
    fill(50);
    noStroke();
    text(options[i], 70, y - 7);
  }

  // Lock button
  if (predictionValue >= 0 && !predictionMade) {
    fill(39, 174, 96);
    noStroke();
    rect(width/2 - 60, height - 100, 120, 40, 8);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Lock Prediction", width/2, height - 80);
  }
}

function drawReasoningPanel() {
  fill(50);
  textAlign(CENTER, CENTER);
  text("Why do you think this?", width/2, height/2);
}

function drawObservationPanel() {
  fill(50);
  textAlign(CENTER, CENTER);

  if (predictionMade) {
    text("Your prediction: Option " + String.fromCharCode(65 + predictionValue), width/2, height/2 - 40);
    text("Run simulation to see result...", width/2, height/2 + 20);
  } else {
    text("Make a prediction first!", width/2, height/2);
  }
}

function drawReflectionPanel() {
  fill(50);
  textAlign(CENTER, CENTER);
  text("Was your prediction correct?", width/2, height/2 - 20);
  text("What did you learn?", width/2, height/2 + 20);
}

function drawNavigation() {
  // Previous button
  if (currentPanel > 1) {
    fill(59, 130, 246);
    noStroke();
    rect(20, height - 50, 80, 35, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    text("< Prev", 60, height - 32);
  }

  // Next button
  if (currentPanel < totalPanels) {
    fill(59, 130, 246);
    rect(width - 100, height - 50, 80, 35, 6);
    fill(255);
    text("Next >", width - 60, height - 32);
  }
}

function mousePressed() {
  // Check prediction selection
  if (currentPanel === 2 && !predictionMade) {
    for (let i = 0; i < 3; i++) {
      let y = 100 + i * 50;
      if (dist(mouseX, mouseY, 50, y) < 15) {
        predictionValue = i;
      }
    }

    // Check lock button
    if (predictionValue >= 0 && mouseY > height - 100 && mouseY < height - 60) {
      predictionMade = true;
    }
  }

  // Navigation
  if (mouseY > height - 50) {
    if (mouseX < 100 && currentPanel > 1) currentPanel--;
    if (mouseX > width - 100 && currentPanel < totalPanels) currentPanel++;
  }
}
```

## References

- [Prediction-Observation-Explanation (POE)](https://www.sciencedirect.com/topics/social-sciences/predict-observe-explain) - Science Education Research
- [Making Predictions to Enhance Learning](https://www.learningscientists.org/blog/2016/6/16-1) - The Learning Scientists
- [PhET Interactive Simulations](https://phet.colorado.edu/) - Examples of prediction-based physics simulations
- [Cognitive Conflict in Learning](https://www.tandfonline.com/doi/abs/10.1080/00220671.1983.10885493) - Educational Psychology
