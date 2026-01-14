---
title: Ohm's Law Circuit Simulator
description: An interactive circuit simulator demonstrating Ohm's Law (V = IR) with animated current flow, adjustable voltage and resistance, and real-time calculations.
image: /sims/ohms-law-simulator/ohms-law-simulator.png
og:image: /sims/ohms-law-simulator/ohms-law-simulator.png
twitter:image: /sims/ohms-law-simulator/ohms-law-simulator.png
quality_score: 90
social:
   cards: false
---

# Ohm's Law Circuit Simulator

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

[Edit Ohm's Law Simulator in p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive circuit simulator helps students understand Ohm's Law (V = IR) through hands-on experimentation. By adjusting voltage and resistance values, students can observe how current changes in real-time, discovering the direct relationship between voltage and current and the inverse relationship between resistance and current.

### Key Features

- **Animated Current Flow**: Yellow particles flow through the circuit at speeds proportional to the current
- **Dynamic Resistor Color**: The resistor changes from blue (cold) to red (hot) based on current level
- **Overload Warning**: When current exceeds 20A, the ammeter flashes red with "OVERLOAD!" warning
- **Real-time Equation Display**: Shows the V = IR calculation updating as you adjust parameters

### Circuit Components

1. **Battery** (left): Provides voltage from 1V to 24V
2. **Resistor** (top): Provides resistance from 1 ohm to 20 ohms, color indicates heat level
3. **Ammeter** (right): Displays the calculated current in Amperes

### Controls

| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Voltage Slider | 1V - 24V | 12V | Adjusts the battery voltage |
| Resistance Slider | 1 ohm - 20 ohm | 4 ohm | Adjusts the resistor value |
| Reset Button | - | - | Returns all values to defaults |
| Show Equation | On/Off | On | Toggles the equation display |

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/ohms-law-simulator/main.html"
        height="452px" width="100%" scrolling="no"
        style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;">
</iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Remember**: State Ohm's Law formula (V = IR)
2. **Understand**: Explain the relationship between voltage, current, and resistance
3. **Apply**: Calculate current when given voltage and resistance values
4. **Analyze**: Predict how changing one variable affects the others

### Prerequisite Knowledge

- Basic understanding of electrical circuits
- Familiarity with units: Volts (V), Amperes (A), Ohms (ohm)

### Suggested Activities

#### Activity 1: Discovery (10 minutes)

1. Set voltage to 12V and resistance to 4 ohms. Record the current.
2. Double the voltage to 24V. What happens to current?
3. Return to 12V. Now double resistance to 8 ohms. What happens to current?
4. Write a sentence describing each relationship.

#### Activity 2: Prediction and Verification (15 minutes)

| Voltage | Resistance | Predicted Current | Actual Current |
|---------|------------|-------------------|----------------|
| 6V | 2 ohm | | |
| 12V | 3 ohm | | |
| 18V | 6 ohm | | |
| 24V | 12 ohm | | |
| 10V | 5 ohm | | |

#### Activity 3: Finding Overload Conditions (5 minutes)

1. What is the minimum resistance needed to keep current under 20A at 24V?
2. What is the maximum voltage that keeps current under 20A with 1 ohm resistance?

### Assessment Questions

1. If voltage is 15V and resistance is 5 ohms, what is the current?
2. If current is 3A and resistance is 4 ohms, what is the voltage?
3. If voltage is 12V and current is 2A, what is the resistance?
4. Why does the resistor turn red when current is high?

### Key Insights

- **Direct Relationship**: Voltage and current are directly proportional (double voltage = double current)
- **Inverse Relationship**: Resistance and current are inversely proportional (double resistance = half current)
- **Power Dissipation**: High current through a resistor generates heat (P = I squared R)
- **Safety**: Real circuits use fuses or circuit breakers to prevent dangerous overload conditions

## p5.js Editor Template

```javascript
// Ohm's Law Circuit Simulator
// Demonstrates V = IR relationship

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let voltage = 12;
let resistance = 4;
let current = 3;

let voltageSlider, resistanceSlider;

function setup() {
    updateCanvasSize();
    createCanvas(canvasWidth, canvasHeight);

    voltageSlider = createSlider(1, 24, 12, 0.5);
    resistanceSlider = createSlider(1, 20, 4, 0.5);

    textFont('Arial');
}

function draw() {
    background(255);

    voltage = voltageSlider.value();
    resistance = resistanceSlider.value();
    current = voltage / resistance;

    // Draw circuit and display values
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("V = " + voltage.toFixed(1) + "V", width/2, 100);
    text("R = " + resistance.toFixed(1) + " ohms", width/2, 150);
    text("I = " + current.toFixed(2) + "A", width/2, 200);
    text("V = I x R", width/2, 280);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
```

## References

- [Ohm's Law - Wikipedia](https://en.wikipedia.org/wiki/Ohm%27s_law)
- [PhET Interactive Simulations - Circuit Construction Kit](https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc)
- [Electronics Tutorials - Ohm's Law](https://www.electronics-tutorials.ws/dccircuits/dcp_2.html)
