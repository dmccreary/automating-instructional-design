# Misconception Correction Cycle

This interactive diagram illustrates the four-stage framework for correcting learner misconceptions through MicroSim design. The cycle emphasizes that effective misconception correction requires deliberate activation, cognitive conflict, resolution with a better model, and ongoing consolidation.

## About This MicroSim

The circular workflow shows four key stages, each with a distinct purpose and color:

1. **ACTIVATE** (Yellow) - Surface the existing belief by asking prediction questions and having learners commit to an answer
2. **CONFLICT** (Red) - Create cognitive dissonance by showing evidence that contradicts the prediction
3. **RESOLVE** (Green) - Provide a better alternative model that explains everything including the conflict
4. **CONSOLIDATE** (Blue) - Practice and reinforce by applying the new model to multiple examples

Hover over each stage to see detailed guidance for that phase of the correction process.

<iframe src="main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Key Design Principles

- **Activation is essential** - Learners must explicitly hold and commit to the misconception before it can be challenged
- **Conflict must be felt** - The misconception must visibly fail; abstract contradiction is not enough
- **Resolution requires superiority** - The new model must explain MORE than the old one, not just be labeled "correct"
- **Consolidation prevents relapse** - Misconceptions regrow without regular reinforcement

## Applying the Cycle to MicroSim Design

When designing a MicroSim to address misconceptions:

| Stage | MicroSim Design Element |
|-------|------------------------|
| Activate | Include prediction prompts before revealing behavior |
| Conflict | Design scenarios where the misconception leads to wrong predictions |
| Resolve | Provide clear visual explanations of the correct model |
| Consolidate | Offer multiple practice scenarios with varied contexts |

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// Misconception Correction Cycle MicroSim
// Circular workflow showing the four stages of misconception correction

let canvasWidth = 400;
let canvasHeight = 450;
let drawHeight = 450;
let controlHeight = 50;

// Stage data
let stages = [];
let hoveredStage = -1;
let centerHovered = false;

// Colors for each stage
let activateColor, conflictColor, resolveColor, consolidateColor;
let bgColor, textColor, arrowColor;

function setup() {
  canvasWidth = min(windowWidth - 40, 500);
  canvasHeight = drawHeight + controlHeight;
  createCanvas(canvasWidth, canvasHeight);

  // Define colors for each stage
  activateColor = color(251, 191, 36);      // Yellow - illumination
  conflictColor = color(239, 68, 68);       // Red - tension
  resolveColor = color(34, 197, 94);        // Green - solution
  consolidateColor = color(59, 130, 246);   // Blue - stability
  bgColor = color(248, 250, 252);           // Light background
  textColor = color(30, 41, 59);            // Dark text
  arrowColor = color(156, 163, 175);        // Gray arrows

  // Define the 4 stages with their details
  let stageData = [
    {
      name: "ACTIVATE",
      description: "Surface the existing belief",
      actions: "Ask prediction questions, have learner commit to an answer",
      hoverText: "Don't skip this! Learners must explicitly hold the misconception before it can be challenged.",
      icon: "lightbulb",
      color: activateColor,
      nextLabel: "Commitment made"
    },
    {
      name: "CONFLICT",
      description: "Create cognitive dissonance",
      actions: "Show evidence that contradicts prediction, demonstrate boundary failure",
      hoverText: "The misconception must visibly FAIL. Learners must feel the contradiction.",
      icon: "lightning",
      color: conflictColor,
      nextLabel: "Dissonance created"
    },
    {
      name: "RESOLVE",
      description: "Provide better alternative",
      actions: "Introduce correct model, show how it explains everything including the conflict",
      hoverText: "The new model must explain MORE than the old one, not just be 'correct.'",
      icon: "puzzle",
      color: resolveColor,
      nextLabel: "Alternative accepted"
    },
    {
      name: "CONSOLIDATE",
      description: "Practice and reinforce",
      actions: "Apply new model to multiple examples, revisit potential misconception triggers",
      hoverText: "Misconceptions regrow! Regular reinforcement prevents relapse.",
      icon: "checkmark",
      color: consolidateColor,
      nextLabel: "Test with new contexts"
    }
  ];

  // Calculate positions in a circle (4 stages)
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let radius = min(canvasWidth, drawHeight) / 2 - 85;

  for (let i = 0; i < 4; i++) {
    let angle = -PI / 2 + (TWO_PI / 4) * i; // Start from top
    stages.push({
      ...stageData[i],
      x: centerX + cos(angle) * radius,
      y: centerY + sin(angle) * radius,
      angle: angle
    });
  }

  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(bgColor);

  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let radius = min(canvasWidth, drawHeight) / 2 - 85;

  // Draw title
  fill(textColor);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Misconception Correction Cycle", centerX, 22);

  // Draw connecting arrows with labels
  drawArrowsWithLabels(centerX, centerY, radius);

  // Draw center element
  drawCenter(centerX, centerY);

  // Draw stage nodes
  for (let i = 0; i < stages.length; i++) {
    drawStage(stages[i], i === hoveredStage);
  }

  // Draw hover information
  if (hoveredStage >= 0) {
    drawHoverInfo(stages[hoveredStage]);
  } else if (centerHovered) {
    drawCenterHoverInfo(centerX, centerY);
  }
}

// Additional helper functions would go here...
// See full implementation in the MicroSim files
```

## References

- [Addressing Misconceptions in Science Education](https://www.nap.edu/read/11625/chapter/4) - National Research Council
- [Conceptual Change Theory](https://www.tandfonline.com/doi/abs/10.1080/00461520.2015.1065219) - Educational Psychology Review
- [The Role of Cognitive Conflict in Learning](https://www.sciencedirect.com/science/article/abs/pii/S0959475206000473) - Learning and Instruction
