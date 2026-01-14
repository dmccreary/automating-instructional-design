---
title: Design Tradeoff Decision Tree
description: An interactive decision tree that provides a systematic framework for making design tradeoff decisions, helping designers think through common choice points in educational simulation design.
---

# Design Tradeoff Decision Tree

<iframe src="main.html" height="620px" width="100%" scrolling="no"></iframe>

[Run the Design Tradeoff Decision Tree Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the MicroSim Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim provides a systematic framework for evaluating whether to include design features in educational simulations. By following the decision tree, designers can make informed tradeoff decisions that balance learning effectiveness, cognitive load, and learner engagement.

### Decision Framework

The tree guides designers through four key questions:

1. **Is it essential for the learning objective?** - Would learners fail to achieve the objective without this feature?
2. **Does it reduce cognitive load?** - Does this reduce extraneous load or support schema formation?
3. **Does it increase learner engagement?** - Does this motivate learners or support sustained attention?
4. **Does the engagement benefit outweigh the load cost?** - Would removing this hurt learning more than the load it adds?

### End States (Color Coded)

| State | Color | Description |
|-------|-------|-------------|
| **Include (essential)** | Green | Critical for achieving the learning objective |
| **Include (load reducer)** | Green | Helps learners by reducing cognitive burden |
| **Include (engagement)** | Yellow | Include but monitor - engagement benefit justifies tradeoff |
| **Progressive disclosure** | Light Green | Implement with gradual reveal or as optional |
| **Include in base design** | Green | Include in core design from the start |
| **Don't include (unnecessary)** | Red | Adds nothing meaningful to learning |
| **Don't include (seductive detail)** | Red | Engagement doesn't justify cognitive load cost |

### Features

- **Interactive Decision Tree**: Click Yes/No buttons to navigate through decisions
- **Visual Path Highlighting**: See your decision path highlighted in green
- **Hover Information**: Hover over any node to see explanatory text
- **Example Scenarios**: Select from pre-built examples to see typical decision paths
- **Progressive Disclosure Branch**: Features that pass initial tests are evaluated for progressive implementation

### Example Annotations

The dropdown menu includes three illustrative examples:

- **Decorative animation** - Follows path to "Don't include (unnecessary)"
- **Speed control slider** - Follows path to "Include in base design"
- **Gamification badges** - Follows path to "Progressive disclosure"

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/design-tradeoff-tree/main.html" height="620px" scrolling="no"></iframe>
```

## Lesson Plan

### Objective

Students will be able to systematically evaluate design features using cognitive load theory principles and make informed decisions about feature inclusion in educational simulations.

### Activities

1. **Exploration (5 minutes)**: Have students navigate through the decision tree multiple times, exploring all possible end states and reading the hover text for each decision.

2. **Example Analysis (10 minutes)**: Use the dropdown to select each example scenario. Discuss as a class:
   - Why does a decorative animation end up as "unnecessary"?
   - What makes a speed control slider "essential"?
   - Why might gamification badges benefit from progressive disclosure?

3. **Application (15 minutes)**: Give students a list of potential MicroSim features and have them use the decision tree to evaluate each:
   - Background music
   - Reset button
   - Colorful particle effects
   - Step-by-step instructions
   - Achievement leaderboard
   - Pause/play controls
   - Animated mascot guide

4. **Design Review (15 minutes)**: Have students evaluate an existing MicroSim using the decision framework. Identify features that:
   - Are essential and well-implemented
   - Could benefit from progressive disclosure
   - Might be seductive details that should be removed

### Assessment

Students demonstrate understanding by correctly categorizing new features using the decision tree and articulating clear rationale based on learning objectives, cognitive load, and engagement tradeoffs.

## Theoretical Foundation

This decision tree is grounded in several key instructional design principles:

- **Cognitive Load Theory** (Sweller): Features should minimize extraneous cognitive load
- **Seductive Details Effect** (Harp & Mayer): Engaging but irrelevant content can harm learning
- **Progressive Disclosure** (Keller): Revealing complexity gradually supports learning
- **Germane Load** (Sweller): Some cognitive effort supports schema formation

## References

- Sweller, J. (2011). Cognitive Load Theory. Springer.
- Mayer, R. E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.
- Harp, S. F., & Mayer, R. E. (1998). How seductive details do their damage. Journal of Educational Psychology.
- Keller, J. M. (2010). Motivational Design for Learning and Performance. Springer.
