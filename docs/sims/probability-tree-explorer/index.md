---
title: Probability Tree Explorer
description: An interactive probability tree visualization for understanding compound probabilities when drawing balls without replacement, demonstrating why probabilities multiply along branches.
---

# Probability Tree Explorer

<iframe src="main.html" height="570px" width="100%" scrolling="no"></iframe>

[Run the Probability Tree Explorer Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Probability Tree Explorer in the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim helps students understand compound probability by visualizing a probability tree for drawing two balls from a bag without replacement. The key insight is that **branch widths narrow with each level**, making the multiplication of probabilities visually intuitive.

### Pedagogical Intent

Students often struggle to understand why we multiply probabilities along branches in a probability tree. This MicroSim addresses that challenge by:

1. **Visual Width Representation**: Branch widths are proportional to probability, so students can see how the "probability flow" narrows
2. **Dynamic Conditional Probabilities**: Changing the ball counts shows how removing a ball affects the second draw
3. **Calculation Transparency**: Hovering over outcomes reveals the step-by-step multiplication

### Features

- **Interactive Sliders**: Adjust the number of red (1-10) and blue (1-10) balls
- **Probability Tree Visualization**: Shows all possible outcomes (RR, RB, BR, BB)
- **Proportional Branch Widths**: Wider branches = higher probability
- **Path Highlighting**: Hover over outcome nodes to highlight the path
- **Calculation Panel**: See the step-by-step probability calculation for each path
- **Show All Calculations**: Toggle to display all four outcome probabilities at once

### Scenario

A bag contains red and blue balls. You draw two balls one at a time **without replacement** (the first ball is not returned before drawing the second). The tree shows:

1. **First Level**: Probability of drawing each color first
2. **Second Level**: Conditional probability of each color given the first draw
3. **Outcome Nodes**: Final compound probabilities for all four possible outcomes

## How to Use

1. **Adjust the sliders** to set the number of red and blue balls
2. **Observe the tree** - notice how branch widths change with different ball counts
3. **Hover over outcome nodes** (RR, RB, BR, BB) to see the calculation
4. **Check "Show Calculations"** to see all probabilities simultaneously
5. **Click "Reset"** to return to default values (5 red, 3 blue)

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/probability-tree-explorer/main.html" height="570px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to calculate compound probabilities by tracing paths through a probability tree and multiplying branch probabilities.

### Bloom's Taxonomy Level

**Analyze** (Level 4) - Students break down compound probability problems into sequential events and determine the relationship between conditional and compound probabilities.

### Prerequisites

- Understanding of basic probability (favorable outcomes / total outcomes)
- Familiarity with fractions and decimal conversion

### Activities

**1. Exploration (5 minutes)**

Have students explore the default configuration (5 red, 3 blue balls):

- What is the probability of drawing red first?
- Why is P(RR) different from P(RB)?
- What do you notice about the branch widths?

**2. Investigation (10 minutes)**

Students answer guided questions:

- Set red = 5, blue = 5. What patterns do you notice?
- What happens when red = 1? What is P(RR)?
- When does P(RR) = P(BB)?

**3. Calculation Practice (10 minutes)**

Without hovering, have students calculate:

- P(BR) when there are 4 red and 6 blue balls
- Verify their answer by hovering over the BR node

**4. Discussion (5 minutes)**

- Why do we multiply probabilities along a path?
- Why is "without replacement" different from "with replacement"?
- Why do all four outcome probabilities sum to 1?

### Assessment Questions

1. If there are 3 red and 2 blue balls, what is P(RB)?
2. Explain why P(Red on second draw | Red on first draw) is different from P(Red on first draw)
3. For what combination of balls is P(RR) = P(BB)?

### Extensions

- Compare to "with replacement" (probabilities stay constant)
- Extend to three draws - what would the tree look like?
- Calculate P(at least one red) using the complement rule

## Mathematical Background

For drawing without replacement from a bag with R red and B blue balls (total T = R + B):

**First Draw Probabilities:**

- P(Red first) = R/T
- P(Blue first) = B/T

**Conditional Probabilities (Second Draw):**

- P(Red second | Red first) = (R-1)/(T-1)
- P(Blue second | Red first) = B/(T-1)
- P(Red second | Blue first) = R/(T-1)
- P(Blue second | Blue first) = (B-1)/(T-1)

**Compound Probabilities:**

- P(RR) = (R/T) x ((R-1)/(T-1))
- P(RB) = (R/T) x (B/(T-1))
- P(BR) = (B/T) x (R/(T-1))
- P(BB) = (B/T) x ((B-1)/(T-1))

Note that P(RR) + P(RB) + P(BR) + P(BB) = 1 (certainty).

## References

- [Khan Academy: Dependent Probability](https://www.khanacademy.org/math/statistics-probability/probability-library/dependent-events-precalc/v/introduction-to-dependent-probability)
- [Math is Fun: Probability Trees](https://www.mathsisfun.com/data/probability-tree-diagrams.html)
