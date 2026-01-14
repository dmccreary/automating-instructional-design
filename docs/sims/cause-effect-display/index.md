---
title: Cause-Effect Display
description: An interactive demonstration of the standard MicroSim structure with a control panel for input variables (causes) and a visualization area showing output effects (water state changes).
image: /sims/cause-effect-display/cause-effect-display.png
og:image: /sims/cause-effect-display/cause-effect-display.png
twitter:image: /sims/cause-effect-display/cause-effect-display.png
quality_score: 85
social:
   cards: false
---

# Cause-Effect Display

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Cause-Effect Display Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Cause-Effect Display Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## About This MicroSim

This MicroSim demonstrates the **standard cause-effect display structure** commonly used in educational simulations. It features:

- **Left Panel (Causes)**: Input controls that users manipulate
- **Right Panel (Effects)**: Visualization that responds to input changes
- **Immediate Feedback**: Real-time updates as inputs change

### The Water State Example

This demonstration uses the familiar example of water changing states based on physical conditions:

1. **Temperature**: Controls whether water is frozen, liquid, boiling, or steam
2. **Pressure**: Affects the boiling and freezing points
3. **Humidity**: Influences the water level in the container

### How to Use

1. **Adjust Temperature**: Move the slider to change temperature from -20C to 150C
2. **Modify Pressure**: Change atmospheric pressure from 0.1 to 2.0 atm
3. **Set Humidity**: Control the humidity level from 0% to 100%
4. **Observe Effects**: Watch how the water visualization changes in real-time

### Water States Shown

| State | Temperature Range | Visual Effect |
|-------|------------------|---------------|
| Ice (Solid) | Below freezing point | Blue crystalline block with frost |
| Liquid | Between freezing and boiling | Calm water with surface reflections |
| Boiling | Near boiling point | Turbulent water with bubbles and steam |
| Steam (Gas) | Above boiling point | Rising vapor particles with heat glow |

## Design Pattern

This MicroSim illustrates a fundamental design pattern for educational simulations:

```
+------------------+     +----------------------+
|     CAUSES       |     |       EFFECTS        |
|  (Input Panel)   | --> |  (Output Display)    |
|                  |     |                      |
|  - Slider 1      |     |  Visual feedback     |
|  - Slider 2      |     |  that changes based  |
|  - Slider 3      |     |  on input values     |
+------------------+     +----------------------+
```

### When to Use This Pattern

- Demonstrating relationships between variables
- Teaching cause-and-effect concepts
- Visualizing mathematical functions
- Showing physical phenomena

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/cause-effect-display/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify the cause-effect structure in educational simulations
2. Explain how input variables affect output visualizations
3. Describe the phase transitions of water based on temperature and pressure
4. Apply the cause-effect pattern to design their own simulations

### Suggested Activities

1. **Exploration (5 min)**: Have students experiment with all three sliders
2. **State Identification (5 min)**: Students find temperature ranges for each water state
3. **Pressure Effects (10 min)**: Explore how pressure changes boiling/freezing points
4. **Pattern Recognition (10 min)**: Discuss how this pattern applies to other simulations

### Discussion Questions

1. What other physical phenomena could be demonstrated with this cause-effect pattern?
2. How does pressure affect the boiling point of water?
3. Why is immediate visual feedback important in educational simulations?
4. How might you extend this simulation with additional input variables?

## References

- Phase diagrams and water state transitions
- Educational simulation design patterns
- p5.js interactive visualization library
