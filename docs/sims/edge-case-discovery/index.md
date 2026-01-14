---
title: Edge Case Discovery Simulator
description: An interactive simulation where students experiment with physics parameters to identify edge cases like negative gravity, oversized objects, and energy conservation violations.
image: /sims/edge-case-discovery/edge-case-discovery.png
og:image: /sims/edge-case-discovery/edge-case-discovery.png
twitter:image: /sims/edge-case-discovery/edge-case-discovery.png
quality_score: 85
social:
   cards: false
---

# Edge Case Discovery Simulator

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Edge Case Discovery Simulator Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Edge Case Discovery Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/...){ .md-button }

## About This MicroSim

This interactive simulator helps students understand **edge cases** in software systems by experimenting with a simple physics simulation. By adjusting parameters to extreme or unusual values, students can observe how systems behave at their boundaries and discover potential failure modes.

### How to Use

1. **Adjust the sliders** to modify physics parameters:
   - **Gravity**: Try negative values to see the ball "fall" upward
   - **Ball Radius**: Increase until the ball is larger than the container
   - **Bounciness**: Values above 1.0 cause the ball to gain energy with each bounce
   - **Initial Speed**: Very high values may cause "tunneling" through walls

2. **Observe the ball** as it responds to your parameter changes
3. **Monitor the Edge Case Log** on the right panel for detected anomalies
4. **Click "Log State"** to record the current parameter configuration
5. **Click "Restart Ball"** to relaunch with the current speed setting
6. **Click "Reset"** to return all parameters to default values

### Edge Cases Demonstrated

| Parameter | Edge Case | What Happens |
|-----------|-----------|--------------|
| Gravity < 0 | Negative gravity | Ball accelerates upward instead of falling |
| Radius > container | Oversized object | Ball cannot fit within boundaries |
| Bounciness > 1 | Energy gain | Ball speeds up with each bounce (perpetual motion) |
| Speed > 500 | High velocity | Risk of tunneling through walls |
| Any extreme | Performance | Frame rate drops with complex calculations |

### Key Concepts

- **Edge Case**: An input or condition at the extreme end of the expected range
- **Boundary Testing**: Systematically testing values at parameter limits
- **Tunneling**: When objects move so fast they pass through collision boundaries
- **Energy Conservation**: Physical systems should not gain energy spontaneously
- **Defensive Programming**: Anticipating and handling unusual inputs gracefully

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/edge-case-discovery/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define what constitutes an edge case in software systems
2. Identify at least four types of edge cases through experimentation
3. Explain why edge case testing is important for software quality
4. Predict potential edge cases given a system specification
5. Document observed edge cases and their system effects

### Suggested Activities

1. **Exploration (10 min)**: Have students freely experiment with sliders, recording any unusual behaviors they observe in the log

2. **Guided Discovery (15 min)**: Present specific challenges:
   - "Make the ball fall upward"
   - "Create a ball that moves faster over time"
   - "Make the ball larger than its container"
   - "Try to make the ball escape through a wall"

3. **Classification (10 min)**: Students categorize discovered edge cases by type:
   - Physical impossibilities (negative gravity)
   - Constraint violations (oversized ball)
   - Conservation violations (energy gain)
   - Implementation limits (tunneling, performance)

4. **Real-World Connections (15 min)**: Discuss edge cases in real software:
   - What happens when you withdraw $0 from an ATM?
   - How does a calendar app handle February 29?
   - What if a username contains special characters?

5. **Specification Review (10 min)**: Given a simple specification, students predict potential edge cases before testing

### Assessment

- **Observation Log**: Students submit their documented edge cases with explanations
- **Prediction Quiz**: Given new specifications, identify potential edge cases
- **Reflection**: Written analysis of why the most dangerous edge case was the most dangerous
- **Application**: Propose edge case tests for a different simulation

### Discussion Questions

1. Which edge case was hardest to discover? Why?
2. How might a developer prevent these edge cases from occurring?
3. What real-world consequences could result from unhandled edge cases?
4. How does bounciness > 1 violate the laws of physics?

## Technical Notes

- The simulation uses simplified 2D physics with configurable parameters
- Ball position and velocity are updated each frame using basic kinematics
- Collision detection uses simple boundary checking
- The edge case log uses timestamp-based deduplication to avoid spam
- Performance monitoring tracks frame times to detect degradation

## References

- Myers, G.J., Sandler, C., & Badgett, T. (2011). The Art of Software Testing
- Beizer, B. (1990). Software Testing Techniques
- Kaner, C., Falk, J., & Nguyen, H.Q. (1999). Testing Computer Software
