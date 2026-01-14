---
title: Cognitive Load Simulator
description: An interactive simulator for experimenting with instructional design choices and visualizing their impact on intrinsic, extraneous, and germane cognitive load.
image: /sims/cognitive-load-simulator/cognitive-load-simulator.png
og:image: /sims/cognitive-load-simulator/cognitive-load-simulator.png
twitter:image: /sims/cognitive-load-simulator/cognitive-load-simulator.png
social:
   cards: false
---

# Cognitive Load Simulator

<iframe src="main.html" height="700px" width="100%" scrolling="no"></iframe>

[Run the Cognitive Load Simulator Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Cognitive Load Simulator Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim allows learners to experiment with different instructional design choices and observe their impact on the three types of cognitive load defined by Cognitive Load Theory (Sweller, 1988). By manipulating various design parameters, users develop intuition for the tradeoffs involved in creating effective instructional materials.

### The Three Types of Cognitive Load

Cognitive Load Theory distinguishes between three types of load that compete for limited working memory resources:

1. **Intrinsic Load (Blue)**: The inherent complexity of the material being learned. This load is determined by the number of interacting elements in the content and the learner's prior knowledge. More schemas (organized knowledge structures) mean lower intrinsic load.

2. **Extraneous Load (Red)**: Cognitive effort wasted on poor instructional design rather than learning. This includes visual clutter, split attention effects, and redundant information. Good design minimizes extraneous load.

3. **Germane Load (Green)**: Productive cognitive effort devoted to constructing and automating schemas. This is the "good" cognitive load that leads to learning. Effective instruction maximizes germane load within capacity constraints.

### Interactive Controls

- **Select Scenario**: Choose between three instructional contexts (Supply/Demand, Cell Division, Electrical Circuit) with different inherent complexity levels
- **Visual Complexity (1-10)**: Controls the number and intricacy of visual elements
- **Text Density (1-10)**: Adjusts the amount of text and annotations
- **Element Separation (1-10)**: Simulates split attention by spreading related information apart
- **Include Decorative Elements**: Toggles seductive but irrelevant visual elements
- **Provide Worked Example**: Adds step-by-step guidance that supports schema construction
- **Prior Knowledge (Novice to Expert)**: Represents learner expertise level

### Load Visualization

The bottom panel displays:

- Individual bar meters for each load type
- A combined total bar showing the sum of all loads
- A capacity ceiling line marking working memory limits
- An "OVERLOAD!" warning when total load exceeds capacity
- The preview area shows "Learning Impaired" when overloaded

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/cognitive-load-simulator/main.html" height="700px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to analyze instructional design choices and predict their impact on cognitive load, developing the ability to optimize designs for effective learning.

### Pre-Assessment (3 minutes)

Ask students:

- "Have you ever felt overwhelmed when trying to learn something new? What made it overwhelming?"
- "Have you encountered learning materials that seemed unnecessarily complicated? What made them hard to use?"

### Guided Exploration (15 minutes)

#### Part 1: Understanding Load Types (5 minutes)

1. Start with default settings and observe the load distribution
2. Identify which type of load is highest and discuss why
3. Note the capacity line and current total

#### Part 2: Manipulating Extraneous Load (5 minutes)

1. **Visual Complexity Experiment**:
   - Set visual complexity to 1, observe extraneous load
   - Increase to 10, note the change
   - Discuss: When does visual complexity become counterproductive?

2. **Split Attention Effect**:
   - Set element separation to 1 (integrated)
   - Increase to 10 (separated)
   - Observe extraneous load increase
   - Discuss: Why does separating related elements increase cognitive effort?

3. **Seductive Details**:
   - Toggle "Include decorative elements"
   - Observe the extraneous load spike
   - Discuss: Why do attractive but irrelevant elements hurt learning?

#### Part 3: Modifying Intrinsic Load (5 minutes)

1. **Prior Knowledge Effect**:
   - Set prior knowledge to "Novice" (1)
   - Note intrinsic load level
   - Slide to "Expert" (10)
   - Observe intrinsic load decrease
   - Discuss: How do schemas reduce cognitive load?

2. **Scenario Complexity**:
   - Compare the three scenarios
   - Note different base intrinsic loads
   - Discuss: What makes some content inherently more complex?

### Application Activity (10 minutes)

In small groups, students should:

1. **Create an Overload Scenario**: Manipulate controls to exceed capacity, document which settings caused overload

2. **Optimize for Learning**: Starting from overload, reduce extraneous load while maintaining content integrity. What is the minimum extraneous load achievable?

3. **Expert vs. Novice Design**: Create optimal settings for a novice learner, then for an expert. How do they differ? Why?

4. **Worked Example Trade-off**: Toggle worked examples on/off and observe germane load changes. When are worked examples most beneficial?

### Discussion Questions (10 minutes)

1. Why can't we simply maximize germane load?
2. How does the expertise reversal effect explain why worked examples sometimes hurt learning?
3. What is the relationship between the Zone of Proximal Development and cognitive load capacity?
4. How can MicroSims help manage cognitive load compared to static materials?
5. What design principles would you derive from this simulation?

### Assessment

Students demonstrate understanding by:

- Explaining how each control affects specific load types
- Predicting load changes before manipulating controls
- Designing an optimal instructional scenario for a specified learner level
- Articulating design principles derived from experimentation

## Theoretical Background

### Cognitive Load Theory

Cognitive Load Theory (CLT), developed by John Sweller in the 1980s, is based on the understanding that working memory is limited in both capacity and duration. The theory proposes that instructional design should:

1. **Reduce extraneous load** by eliminating unnecessary cognitive effort
2. **Manage intrinsic load** by sequencing content appropriately and building prerequisite knowledge
3. **Optimize germane load** by directing cognitive resources toward schema construction

### Key Principles Demonstrated

This simulator illustrates several CLT principles:

- **Split Attention Effect**: Separating related information forces learners to mentally integrate it, consuming working memory
- **Redundancy Effect**: Decorative elements add cognitive cost without learning benefit
- **Worked Example Effect**: Studying examples reduces extraneous load for novices
- **Expertise Reversal Effect**: What helps novices may hinder experts (prior knowledge slider)
- **Coherence Principle**: Removing interesting but irrelevant material improves learning

### Implications for MicroSim Design

When designing educational MicroSims:

- Integrate text and graphics to reduce split attention
- Remove seductive details that do not contribute to learning objectives
- Provide scaffolding for novices, optional for experts
- Consider the complexity of content when designing interactions
- Monitor total cognitive load to stay within capacity

## References

- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257-285.
- Sweller, J., van Merrienboer, J. J., & Paas, F. G. (1998). Cognitive architecture and instructional design. Educational Psychology Review, 10(3), 251-296.
- Mayer, R. E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.
- Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. Educational Psychologist, 38(1), 23-31.
- Paas, F., Renkl, A., & Sweller, J. (2003). Cognitive load theory and instructional design: Recent developments. Educational Psychologist, 38(1), 1-4.
