# Model Comparison Tool

<iframe src="main.html" width="100%" height="600" style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></iframe>

<a href="main.html" target="_blank" class="button">Open Fullscreen</a>

## About This MicroSim

This interactive simulation enables learners to actively compare multiple physics models against various test cases. By observing how different models predict motion and forces, students develop understanding of how scientific models are evaluated and selected.

### The Three Models

| Model | Era | Core Assumption | Typical Failures |
|-------|-----|-----------------|------------------|
| **Impetus Model** | Medieval | Objects contain internal "impetus" that gradually depletes | Predicts objects stop moving when impetus runs out, not due to external forces |
| **Common Sense Model** | Naive Physics | Objects need force to keep moving; heavy things fall faster | Fails for frictionless motion, equal fall rates |
| **Newtonian Model** | Scientific | Objects in motion stay in motion; gravity accelerates all objects equally | Matches observations for everyday velocities |

### Test Cases

1. **Ball Dropped from Tower** - Compare fall rates for different masses
2. **Ball Thrown Horizontally** - Observe projectile path predictions
3. **Ball on Frictionless Ice** - Test motion without friction
4. **Projectile on Moon** - Evaluate predictions without air resistance
5. **Car After Engine Off** - Examine coasting behavior predictions

### How to Use

1. **Select a test case** using the numbered buttons (1-5)
2. **Click Play** to run the simulation
3. **Observe the four panels** showing each model's prediction plus actual behavior
4. **Adjust speed** with the slider to slow down or speed up animations
5. **Click "Why X failed?"** in the comparison table for explanations
6. **Track scores** as you test multiple scenarios

### What to Observe

- **Side-by-side predictions**: See how each model behaves differently for the same scenario
- **Checkmarks and X marks**: After animation completes, see which models got it right
- **Running score**: The comparison table tracks model accuracy across all tested scenarios
- **Expandable explanations**: Click to understand why incorrect models failed

### Key Insights

1. **Models are approximations** - No model is perfect; each has assumptions
2. **Test cases reveal limitations** - Different scenarios expose different model failures
3. **Scientific models are selected** - We choose models based on predictive accuracy
4. **Historical context matters** - The impetus model was reasonable given medieval observations

### Learning Objectives

After using this simulation, learners will be able to:

- Compare predictions from multiple physics models for the same scenario
- Evaluate which model best matches observed behavior
- Explain why certain models fail for specific test cases
- Describe the process by which scientific models are selected

## Lesson Plan

### Grade Level
Middle School to High School Physics (Grades 7-12)

### Duration
30-45 minutes

### Prerequisites
- Basic understanding of motion concepts
- Familiarity with terms like velocity, acceleration, and force

### Learning Standards
- NGSS MS-PS2-2: Plan an investigation to provide evidence that the change in motion depends on the sum of forces and mass
- NGSS HS-PS2-1: Analyze data to support the claim that Newton's second law describes the relationship among force, mass, and acceleration

### Activities

1. **Warm-up (5 min)**: Ask students what they think happens when you push a ball on ice vs. on carpet. Record predictions.

2. **Introduction to Models (10 min)**: Introduce the three models and their historical context. The impetus model made sense to medieval thinkers who observed objects slowing down.

3. **Guided Exploration (15 min)**:
   - Run Test 1 (Ball Dropped) and discuss predictions
   - Run Test 3 (Frictionless Ice) - most surprising for students
   - Run Test 2 (Horizontal Throw) - shows how impetus model fails

4. **Independent Investigation (10 min)**: Students complete remaining tests and record which model wins overall.

5. **Discussion (5 min)**:
   - Why did medieval scholars believe in impetus?
   - How do we decide which model to use?
   - Are there situations where the "common sense" model works well enough?

### Assessment Questions

1. For the "Ball on Frictionless Ice" scenario, what does the Common Sense model predict, and why is this incorrect?

2. The Impetus Model correctly predicts the "Ball Dropped from Tower" scenario. Does this mean it's a good model? Explain.

3. If you were a medieval scientist without access to frictionless surfaces, why might the Impetus Model have seemed reasonable?

## Edit This Simulation

<a href="https://editor.p5js.org/" target="_blank" class="button">Open p5.js Editor</a>

Copy the code from [model-comparison-tool.js](./model-comparison-tool.js) into the p5.js editor to experiment with modifications such as:

- Adding more test cases (pendulum, rolling ball, collision)
- Including more historical models (Aristotelian, air resistance models)
- Adding quantitative predictions with numerical accuracy scores
- Creating a quiz mode where students predict before seeing results
