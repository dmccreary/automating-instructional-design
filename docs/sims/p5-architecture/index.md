# p5.js MicroSim Architecture

This interactive diagram illustrates the standard structure of a p5.js MicroSim, showing how educational simulations are organized with distinct regions for visualization and user controls.

## About This MicroSim

The diagram displays the key architectural components of a p5.js MicroSim:

1. **Browser Window** - The HTML page container that hosts the simulation
2. **Container Element** - The `main` or `div` element that the canvas attaches to for responsive sizing
3. **Draw Region** - The top area with an aliceblue background where visualizations and animations are rendered
4. **Control Region** - The bottom area with a white background containing sliders, buttons, and labels

Hover over any component to see detailed information about its purpose and implementation.

<iframe src="main.html" width="100%" height="480px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Key Concepts

- **Fixed Heights, Variable Width** - The draw region and control region have fixed heights (drawHeight and controlHeight), while the canvas width adapts to the container width for responsive design
- **updateCanvasSize()** - This function must be called as the first line in setup() to read the container width and establish proper canvas dimensions
- **Canvas Attachment** - The canvas is attached to `document.querySelector('main')` to integrate with the MkDocs Material page layout
- **Separation of Concerns** - Visual content stays in the draw region while interactive controls are organized in the control region

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// p5.js MicroSim Architecture Template
// Standard structure for educational simulations

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Slider reference
let speedSlider;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.min(container.offsetWidth - 40, 500);
  } else {
    canvasWidth = Math.min(windowWidth - 40, 500);
  }
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);

  // Attach to main element if available
  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  // Create slider in control region
  speedSlider = createSlider(1, 10, 5, 1);
  speedSlider.position(120, drawHeight + 15);
  speedSlider.style('width', '150px');

  textFont('Arial');
}

function draw() {
  // Draw region (aliceblue background)
  fill(240, 248, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control region (white background)
  fill(255);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Separator line
  stroke(200);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Draw region content
  fill(30, 41, 59);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Draw Region", canvasWidth / 2, drawHeight / 2 - 20);
  text("Your visualization goes here", canvasWidth / 2, drawHeight / 2 + 10);

  // Control region label
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Speed:", 20, drawHeight + 25);

  // Display slider value
  let speed = speedSlider.value();
  textAlign(RIGHT, CENTER);
  text(speed, canvasWidth - 20, drawHeight + 25);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  speedSlider.position(120, drawHeight + 15);
}
```

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Identify** the key structural components of a p5.js MicroSim
2. **Explain** the purpose of separating draw and control regions
3. **Implement** responsive canvas sizing using updateCanvasSize()
4. **Create** a basic MicroSim following the standard architecture pattern

### Activities

1. **Exploration (5 min)** - Interact with the diagram, hovering over each component to understand its role
2. **Code Review (10 min)** - Copy the template code to the p5.js editor and identify each architectural element
3. **Modification (15 min)** - Modify the template to add a second slider and display its value
4. **Creation (20 min)** - Build a simple animation MicroSim using the architectural pattern

### Discussion Questions

1. Why is it important to call updateCanvasSize() as the first line in setup()?
2. What are the benefits of using fixed heights for regions while allowing variable width?
3. How does attaching the canvas to the main element help with MkDocs Material integration?

## References

- [p5.js Reference](https://p5js.org/reference/) - Official p5.js documentation
- [createCanvas()](https://p5js.org/reference/p5/createCanvas/) - Canvas creation function
- [createSlider()](https://p5js.org/reference/p5/createSlider/) - Slider UI element
