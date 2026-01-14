---
title: Parameter Space Explorer
description: An interactive tool for exploring parameter spaces and system behaviors using the Lorenz chaotic system as an example. Features heat map visualization, attractor rendering, and exploration tracking.
image: /sims/parameter-space-explorer/parameter-space-explorer.png
og:image: /sims/parameter-space-explorer/parameter-space-explorer.png
twitter:image: /sims/parameter-space-explorer/parameter-space-explorer.png
quality_score: 85
social:
   cards: false
---

# Parameter Space Explorer

<iframe src="main.html" height="852px" width="100%" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

[Edit Parameter Space Explorer in p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive Parameter Space Explorer demonstrates how to systematically investigate complex dynamical systems by visualizing behavior across multiple parameter combinations. Using the famous Lorenz system as an example, students can discover how small changes in parameters lead to dramatically different system behaviors, from stable fixed points to chaotic attractors.

### Key Features

- **2D Heat Map**: Color-coded visualization of system behavior metrics across two-dimensional parameter space
- **Real-time Attractor Visualization**: 3D Lorenz attractor projection updates as you explore different parameters
- **Exploration Tracking**: Trail showing your path through parameter space
- **Multiple Metrics**: Switch between Lyapunov exponent, oscillation period, stability index, and attractor amplitude
- **Save Points**: Double-click to save interesting parameter combinations for later comparison
- **Data Export**: Download your exploration data as JSON for further analysis

### The Lorenz System

The Lorenz system is a simplified model of atmospheric convection defined by three coupled differential equations:

$$
\frac{dx}{dt} = \sigma(y - x)
$$

$$
\frac{dy}{dt} = x(\rho - z) - y
$$

$$
\frac{dz}{dt} = xy - \beta z
$$

Where:

- **sigma (σ)**: Prandtl number, related to fluid viscosity (typical value: 10)
- **rho (ρ)**: Rayleigh number, related to temperature difference (critical value: ~24.74)
- **beta (β)**: Geometric factor (typical value: 8/3)

### Parameter Space Layout

| Component | Description |
|-----------|-------------|
| Heat Map (500x500) | 2D color map showing metric values for sigma (x-axis) and rho (y-axis) |
| Attractor View (350x350) | X-Z projection of the Lorenz attractor at current parameters |
| Exploration History | Time series of your parameter exploration path |
| Analysis Panel | Quantitative metrics for current parameter values |

### Interactive Controls

| Control | Function |
|---------|----------|
| Click on Heat Map | Set parameters to clicked location |
| Drag on Heat Map | Create parameter sweep through region |
| Double-click | Save current point as "interesting" |
| Metric Dropdown | Select which behavior metric to visualize |
| Resolution Slider | Adjust heat map calculation resolution |
| Scan Region | Automatically explore entire parameter space |
| Export Data | Download exploration data as JSON |
| Clear History | Reset exploration trail and saved points |

### Behavior Metrics

1. **Lyapunov Exponent**: Measures sensitivity to initial conditions. Positive values indicate chaos.
2. **Oscillation Period**: Characteristic time scale of oscillations in the system.
3. **Stability Index**: How stable the system's equilibrium points are.
4. **Attractor Size**: Spatial extent of the attractor in phase space.

### Key Bifurcations

The Lorenz system exhibits several important bifurcations marked on the heat map:

- **ρ = 1 (Pitchfork)**: Origin loses stability, two new fixed points appear
- **ρ = 24.74 (Hopf)**: Fixed points become unstable, limit cycles emerge
- **ρ > 24.74 (Chaos)**: Strange attractor appears, chaotic behavior dominates

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/parameter-space-explorer/main.html"
        height="852px" width="100%" scrolling="no"
        style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;">
</iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Remember**: Identify the parameters of the Lorenz system and their typical values
2. **Understand**: Explain how parameter changes affect dynamical system behavior
3. **Apply**: Use the heat map to locate regions of chaotic vs. periodic behavior
4. **Analyze**: Distinguish between different dynamical regimes based on visual patterns
5. **Evaluate**: Assess which parameter combinations produce stable vs. chaotic behavior
6. **Create**: Design a systematic exploration strategy to map interesting boundaries

### Prerequisite Knowledge

- Basic understanding of differential equations
- Familiarity with phase space and attractors
- Concept of sensitivity to initial conditions

### Suggested Activities

#### Activity 1: Discovery (15 minutes)

1. Set the metric to "Lyapunov Exponent" and observe the heat map
2. Click on different regions and observe the attractor changes
3. Find the boundary between blue (negative Lyapunov) and red (positive Lyapunov)
4. What happens to the attractor as you cross this boundary?

#### Activity 2: Systematic Exploration (20 minutes)

1. Click "Scan Region" to automatically explore the parameter space
2. Observe how the exploration trail covers the space
3. Switch between different metrics - how do the patterns compare?
4. Export your data and examine the JSON structure

#### Activity 3: Bifurcation Hunting (15 minutes)

| Parameter Region | Expected Behavior | Observed Behavior |
|------------------|-------------------|-------------------|
| σ=10, ρ=0.5 | | |
| σ=10, ρ=15 | | |
| σ=10, ρ=28 | | |
| σ=5, ρ=28 | | |
| σ=15, ρ=28 | | |

#### Activity 4: Research Questions (10 minutes)

1. Is there a value of sigma where chaos never occurs (for any rho)?
2. What is the smallest rho value that produces chaos at sigma=10?
3. Double-click to save 5 "most interesting" parameter combinations

### Assessment Questions

1. What does the Lyapunov exponent tell us about a dynamical system?
2. Why does the attractor structure change dramatically around ρ=24.74?
3. How could you use this tool to study other dynamical systems?
4. What are the advantages of visualizing parameter space vs. single simulations?

### Key Insights

- **Bifurcations**: Sharp boundaries in parameter space mark qualitative changes in behavior
- **Sensitivity**: Chaotic systems show extreme sensitivity to both initial conditions AND parameters
- **Universality**: Similar patterns appear in many different chaotic systems
- **Research Method**: Systematic parameter exploration is a powerful research technique

## Technical Implementation

### p5.js Architecture

```javascript
// Simplified structure - see full code for details

function setup() {
    updateCanvasSize();  // FIRST LINE - get container width
    createCanvas(canvasWidth, canvasHeight);
    calculateParameterSpace();
    createControls();
}

function draw() {
    drawHeatMap();           // 2D parameter visualization
    drawSystemVisualization(); // Lorenz attractor
    drawParameterTraces();    // History traces
    drawAnalysisPanel();      // Metrics display
}

function calculateMetric(sigma, rho, beta, metricType) {
    // Calculate behavior metric for given parameters
    // Returns value for heat map coloring
}

function calculateLorenzAttractor() {
    // Integrate Lorenz equations
    // Store trajectory for visualization
}
```

### Research Applications

This type of parameter space explorer is used in:

- Climate modeling
- Fluid dynamics research
- Neural network analysis
- Economic modeling
- Population dynamics

## References

- [Lorenz System - Wikipedia](https://en.wikipedia.org/wiki/Lorenz_system)
- [Chaos Theory Introduction](https://en.wikipedia.org/wiki/Chaos_theory)
- [Bifurcation Theory](https://en.wikipedia.org/wiki/Bifurcation_theory)
- [Lyapunov Exponent](https://en.wikipedia.org/wiki/Lyapunov_exponent)
- Strogatz, S. H. (2015). *Nonlinear Dynamics and Chaos*. Westview Press.
