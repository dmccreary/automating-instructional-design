---
title: Math Relationship Explorer - Logistic Function
description: An interactive visualization for exploring the logistic function f(x) = L/(1 + e^(-k(x-x0))) with parameter manipulation, derivatives, integrals, and mathematical annotations.
image: /sims/math-relationship-explorer/math-relationship-explorer.png
og:image: /sims/math-relationship-explorer/math-relationship-explorer.png
twitter:image: /sims/math-relationship-explorer/math-relationship-explorer.png
quality_score: 85
social:
   cards: false
---

# Math Relationship Explorer - Logistic Function

<iframe src="main.html" height="720px" width="100%" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

[Edit Math Relationship Explorer in p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive MicroSim helps students understand the logistic function and its mathematical properties through hands-on parameter manipulation. The logistic function is fundamental in modeling growth processes, population dynamics, neural network activation functions, and probability in logistic regression.

### The Logistic Function

$$f(x) = \frac{L}{1 + e^{-k(x - x_0)}}$$

Where:

- **L** (carrying capacity): The maximum value the function approaches as x approaches infinity
- **k** (steepness/growth rate): Controls how quickly the function transitions from 0 to L
- **x_0** (midpoint): The x-value where f(x) = L/2 (the inflection point)

### Key Mathematical Properties

1. **Horizontal Asymptotes**: y = 0 (as x approaches negative infinity) and y = L (as x approaches positive infinity)

2. **Inflection Point**: Located at (x_0, L/2) where the curve changes from concave up to concave down

3. **Derivative**: The derivative of the logistic function has a particularly elegant form:
   $$f'(x) = k \cdot f(x) \cdot \left(1 - \frac{f(x)}{L}\right)$$

4. **Maximum Slope**: The steepest part of the curve occurs at the inflection point, with slope = kL/4

### Key Features

- **Animated Parameter Changes**: Smooth transitions when adjusting parameters
- **Tangent Line Visualization**: Draggable point shows instantaneous rate of change
- **Integration Area**: Shaded region shows definite integral with numerical value
- **Derivative Curve**: Scaled derivative overlaid on the function
- **Mathematical Annotations**: Carrying capacity, inflection point, and asymptotes labeled

### Controls

| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| L (carrying capacity) | 0.5 - 15 | 10 | Maximum value of the function |
| k (steepness) | 0.1 - 3 | 1 | Growth rate parameter |
| x_0 (midpoint) | -8 to 8 | 0 | Horizontal shift (inflection point location) |
| Tangent at x | -8 to 8 | 0 | Position of tangent line |
| Integration start | -10 to 10 | -5 | Left bound for integral calculation |
| Integration end | -10 to 10 | 5 | Right bound for integral calculation |
| Show Tangent | On/Off | On | Toggle tangent line display |
| Show Integral | On/Off | On | Toggle shaded integral area |
| Show Annotations | On/Off | On | Toggle mathematical annotations |
| Show Derivative | On/Off | On | Toggle derivative curve |
| Random Parameters | Button | - | Generates random L, k, x_0 values |

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/math-relationship-explorer/main.html"
        height="720px" width="100%" scrolling="no"
        style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;">
</iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Remember**: Identify the parameters L, k, and x_0 in the logistic function equation
2. **Understand**: Explain how each parameter affects the shape and position of the curve
3. **Apply**: Predict the behavior of a logistic function given specific parameter values
4. **Analyze**: Design MicroSims that reveal mathematical relationships through parameter manipulation

### Prerequisite Knowledge

- Understanding of exponential functions (e^x)
- Basic concept of limits and asymptotes
- Familiarity with derivatives as rate of change
- Understanding of definite integrals as area under a curve

### Suggested Activities

#### Activity 1: Parameter Exploration (10 minutes)

1. Set L = 10, k = 1, x_0 = 0 (defaults). Observe the S-curve shape.
2. Change L from 5 to 15. What changes? What stays the same?
3. Return L to 10. Now vary k from 0.5 to 2.5. Describe the effect.
4. With k = 1, shift x_0 from -5 to 5. What moves?
5. Write a sentence describing what each parameter controls.

#### Activity 2: Derivative Investigation (10 minutes)

1. Enable "Show Derivative" and "Show Tangent"
2. Move the tangent point from x = -5 to x = 5
3. Where is the slope maximum? How does this relate to the derivative curve?
4. Set k = 0.5, then k = 2. How does this affect the maximum slope?
5. Verify that the maximum slope equals kL/4 for different parameter values

#### Activity 3: Integration Exploration (10 minutes)

1. Enable "Show Integral" with bounds from -5 to 5
2. Keep L = 10, vary x_0. Does the integral value change significantly?
3. Now change L. How does the integral scale?
4. Set narrow bounds (e.g., -1 to 1) around the inflection point. What portion of the total area does this capture?

#### Activity 4: Real-World Modeling (15 minutes)

Choose a scenario and find parameters that model it:

| Scenario | Characteristic |
|----------|---------------|
| Virus spread in a population | L = total population, k relates to infection rate |
| Learning curve | L = maximum skill level, k = learning speed |
| Technology adoption | L = market size, x_0 = time of fastest growth |
| Enzyme reaction rate | L = maximum rate, k = enzyme efficiency |

### Assessment Questions

1. If L = 8 and x_0 = 2, what is f(2)? What is the significance of this value?

2. A population model has L = 1000, k = 0.5, x_0 = 10. At what time is the population growing fastest?

3. How would you modify the parameters to create a steeper transition that occurs earlier (more negative x)?

4. The derivative f'(x) = k * f(x) * (1 - f(x)/L) is zero when f(x) = 0 or f(x) = L. Explain why this makes sense graphically.

5. What is the integral of the logistic function from negative infinity to positive infinity approaching?

### Key Insights

- **Parameter Independence**: L controls height, k controls steepness, x_0 controls position - they work independently
- **Symmetry**: The logistic function is symmetric around its inflection point
- **Self-Reference**: The derivative depends on the function value itself, making it useful for modeling self-limiting growth
- **Universal Shape**: Despite different parameters, all logistic functions have the same characteristic S-shape
- **Rate vs. Accumulation**: The derivative shows instantaneous rate of change; the integral shows total accumulation

## Applications

The logistic function appears in many fields:

- **Biology**: Population growth, epidemic modeling, enzyme kinetics
- **Machine Learning**: Sigmoid activation function, logistic regression
- **Economics**: Technology adoption curves, market saturation
- **Chemistry**: Reaction kinetics, titration curves
- **Psychology**: Learning curves, response probability

## p5.js Editor Template

```javascript
// Math Relationship Explorer - Logistic Function
// Demonstrates f(x) = L / (1 + e^(-k(x - x0)))

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Logistic parameters
let L = 10;    // Carrying capacity
let k = 1;     // Steepness
let x0 = 0;    // Midpoint

let sliderL, sliderK, sliderX0;

function setup() {
    updateCanvasSize();
    createCanvas(canvasWidth, canvasHeight);

    sliderL = createSlider(0.5, 15, 10, 0.1);
    sliderK = createSlider(0.1, 3, 1, 0.05);
    sliderX0 = createSlider(-8, 8, 0, 0.1);

    textFont('Arial');
}

function logistic(x) {
    return L / (1 + Math.exp(-k * (x - x0)));
}

function draw() {
    background(255);

    L = sliderL.value();
    k = sliderK.value();
    x0 = sliderX0.value();

    // Draw function
    stroke(41, 128, 185);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let px = 0; px < width; px++) {
        let x = map(px, 0, width, -10, 10);
        let y = logistic(x);
        let py = map(y, -2, 15, height - 50, 50);
        vertex(px, py);
    }
    endShape();

    // Labels
    fill(0);
    noStroke();
    textSize(16);
    text('L = ' + L.toFixed(1), 20, 30);
    text('k = ' + k.toFixed(2), 20, 50);
    text('x0 = ' + x0.toFixed(1), 20, 70);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
```

## References

- [Logistic Function - Wikipedia](https://en.wikipedia.org/wiki/Logistic_function)
- [Logistic Growth Models - Khan Academy](https://www.khanacademy.org/science/ap-biology/ecology-ap/population-ecology-ap/v/logistic-growth)
- [Sigmoid Function in Machine Learning - ML Glossary](https://ml-cheatsheet.readthedocs.io/en/latest/activation_functions.html)
- [Population Dynamics - HHMI BioInteractive](https://www.biointeractive.org/classroom-resources/population-dynamics)
