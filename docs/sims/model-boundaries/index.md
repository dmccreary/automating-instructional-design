# Model Boundaries

<iframe src="main.html" width="100%" height="550" style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></iframe>

<a href="main.html" target="_blank" class="button">Open Fullscreen</a>

## About This MicroSim

This interactive simulation demonstrates that all physics models have boundaries of applicability. By testing different projectile motion models against various conditions, learners discover where each model succeeds and where it fails.

### The Four Models

| Model | Description | Best Used When |
|-------|-------------|----------------|
| **Naive (straight down)** | Objects fall straight down | Vertical drops with minimal horizontal velocity |
| **No air resistance** | Parabolic path in vacuum | Near-vacuum, heavy projectiles, short distances |
| **Linear air resistance** | Simplified drag proportional to velocity | Low speeds, moderate air density |
| **Full aerodynamic** | Quadratic drag with realistic coefficients | Most real-world conditions |

### How to Use

1. **Select a projectile** from the dropdown (baseball, feather, bullet, or basketball)
2. **Adjust parameters** using the sliders:
   - Launch angle (0-90 degrees)
   - Initial velocity (1-100 m/s)
   - Air density (0 = vacuum, 1.225 = normal atmosphere)
3. **Click model checkboxes** in the right panel to enable/disable models
4. **Launch** to see the trajectories
5. **Observe the traffic lights** indicating model validity for current conditions
6. **Use "Show All Models"** to compare all four simultaneously

### What to Observe

- **Traffic light indicators**: Green means the model is accurate for current conditions, yellow indicates approximate accuracy, and red means the model fails
- **Trajectory differences**: Watch how model predictions diverge as conditions change
- **Landing markers**: See where each model predicts the projectile will land
- **Prediction zones**: Colored bands show where models agree (green) vs. disagree (red/yellow)

### Key Insights

1. **No model is universally correct** - Each has conditions where it works and fails
2. **Simpler models work in specific regimes** - The "straight down" model works for vertical drops
3. **Complexity matches reality** - More complex models handle more conditions
4. **Parameters matter** - The same model can be accurate or inaccurate depending on velocity, mass, and air density

### Experiments to Try

- **Feather in atmosphere vs. vacuum**: Watch air resistance dominate
- **Bullet at high velocity**: See how even the "no air" model fails
- **Low angle, low speed**: All models converge
- **Straight up (90 degrees)**: The naive model becomes accurate

## Learning Objectives

After using this simulation, learners will be able to:

- Explain that all models have boundaries of applicability
- Identify conditions under which different physics models succeed or fail
- Analyze how model complexity relates to accuracy across different parameter ranges
- Evaluate which model is appropriate for a given real-world scenario

## Lesson Plan

### Grade Level
High School Physics (Grades 10-12) or Introductory College Physics

### Duration
45-60 minutes

### Prerequisites
- Basic kinematics concepts
- Understanding of projectile motion
- Concept of air resistance

### Learning Standards
- NGSS HS-PS2-1: Analyze data to support the claim that Newton's second law of motion describes the mathematical relationship among the net force on a macroscopic object, its mass, and its acceleration
- NGSS HS-ETS1-4: Use a computer simulation to model the impact of proposed solutions to a complex real-world problem

### Activities

1. **Warm-up (5 min)**: Ask students to predict how a feather and a baseball would fall differently on Earth vs. the Moon.

2. **Introduction (10 min)**: Discuss the concept that all models are simplifications of reality, and that understanding when a model applies is as important as knowing the model itself.

3. **Guided Exploration (15 min)**:
   - Start with the "No air resistance" model only
   - Launch a baseball at 45 degrees, 20 m/s
   - Enable "Full aerodynamic" and compare
   - Switch to feather and observe the dramatic difference

4. **Independent Investigation (15 min)**: Students complete a worksheet finding:
   - Conditions where the naive model works
   - The velocity threshold where air resistance becomes significant
   - Why the bullet behaves differently from the basketball

5. **Discussion (10 min)**:
   - When would an engineer use the simple model vs. the complex one?
   - What are the trade-offs between model accuracy and computational cost?
   - How does this relate to models in other sciences?

### Assessment Questions

1. Under what specific conditions does the "objects fall straight down" model give accurate predictions?
2. Why does the "no air resistance" model work better for a bullet than a feather, even in normal atmosphere?
3. A physics student uses the parabolic (no air resistance) equation to predict where a thrown baseball will land. Under what conditions would this prediction be accurate enough for practical purposes?

## Edit This Simulation

<a href="https://editor.p5js.org/" target="_blank" class="button">Open p5.js Editor</a>

Copy the code from [model-boundaries.js](./model-boundaries.js) into the p5.js editor to experiment with modifications such as:

- Adding more projectile types (golf ball, ping pong ball, cannonball)
- Implementing wind effects
- Adding Magnus force for spinning projectiles
- Creating a "challenge mode" where students predict outcomes
- Adding real-time numerical data displays
