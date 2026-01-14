# MicroSim Types by Bloom's Taxonomy

This interactive infographic shows different types of MicroSims mapped to Bloom's Taxonomy cognitive levels. Each level represents increasing complexity of thinking skills, from basic recall (Remember) to creative synthesis (Create).

<div id="canvas-container" style="min-height:500px;">
    <iframe id="sim-iframe" src="./main.html" style="width:100%; height:502px; border:1px solid #ddd; border-radius:4px;"></iframe>
</div>

<button id="fullscreenBtn" onclick="toggleFullscreen()"
    style="margin-top:10px; padding:8px 16px; font-size:14px; cursor:pointer; background-color:#1976D2; color:white; border:none; border-radius:4px;">
    View Fullscreen
</button>

<script>
function toggleFullscreen() {
    const iframe = document.getElementById('sim-iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}
</script>

## About This Visualization

Bloom's Taxonomy provides a framework for classifying educational learning objectives into levels of complexity. This MicroSim shows example simulation types appropriate for each cognitive level:

| Level | Description | MicroSim Types |
|-------|-------------|----------------|
| **Remember** | Recall facts and basic concepts | Flashcard Drill, Term Matcher, Concept Sorter |
| **Understand** | Explain ideas or concepts | Animated Explainer, Comparison Viewer |
| **Apply** | Use information in new situations | Interactive Calculator, Step-by-Step Solver |
| **Analyze** | Draw connections among ideas | Data Explorer, Pattern Detector |
| **Evaluate** | Justify a decision or course of action | Quality Classifier, Rubric Applier |
| **Create** | Produce new or original work | Model Builder, Design Canvas |

Hover over any MicroSim type card to see a description of that simulation type.

## p5.js Editor Template

You can experiment with this code in the [p5.js Web Editor](https://editor.p5js.org/). Copy the JavaScript code below:

```javascript
// MicroSim Types by Bloom's Taxonomy Level
// Interactive infographic showing MicroSim types mapped to cognitive levels

// Canvas dimensions
let canvasWidth = 750;
let drawHeight = 480;
let canvasHeight = 500;

// Bloom's Taxonomy data with colors (bottom to top: Remember to Create)
const bloomLevels = [
  {
    level: "Create",
    color: "#9C27B0", // Purple
    types: ["Model Builder", "Design Canvas"]
  },
  {
    level: "Evaluate",
    color: "#E91E63", // Pink
    types: ["Quality Classifier", "Rubric Applier"]
  },
  {
    level: "Analyze",
    color: "#F44336", // Red
    types: ["Data Explorer", "Pattern Detector"]
  },
  {
    level: "Apply",
    color: "#FF9800", // Orange
    types: ["Interactive Calculator", "Step-by-Step Solver"]
  },
  {
    level: "Understand",
    color: "#FFEB3B", // Yellow
    types: ["Animated Explainer", "Comparison Viewer"]
  },
  {
    level: "Remember",
    color: "#4CAF50", // Green
    types: ["Flashcard Drill", "Term Matcher", "Concept Sorter"]
  }
];

// Hover state
let hoveredLevel = -1;
let hoveredType = -1;

// Layout constants
let marginLeft = 120;
let marginRight = 30;
let marginTop = 50;
let marginBottom = 30;
let rowHeight;
let contentWidth;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  rowHeight = (drawHeight - marginTop - marginBottom) / bloomLevels.length;
  contentWidth = canvasWidth - marginLeft - marginRight;
  textFont('Arial');
  noStroke();
}

function draw() {
  background(245);

  // Title
  fill(50);
  textSize(20);
  textAlign(CENTER, TOP);
  text("MicroSim Types by Bloom's Taxonomy Level", canvasWidth / 2, 12);

  // Draw each level row
  for (let i = 0; i < bloomLevels.length; i++) {
    drawLevelRow(i);
  }

  // Draw legend/instructions at bottom
  fill(100);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text("Hover over MicroSim types for details", canvasWidth / 2, canvasHeight - 5);
}

// ... (see full source code for complete implementation)
```

## References

- [Bloom's Taxonomy - Wikipedia](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy)
- [Revised Bloom's Taxonomy - Vanderbilt University](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/)
