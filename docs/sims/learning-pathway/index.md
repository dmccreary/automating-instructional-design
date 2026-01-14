---
title: Learning Pathway Explorer
description: An interactive visualization for exploring learning pathways through prerequisite dependencies. Mark concepts as known, see which concepts unlock, and trace valid paths to learning goals.
image: /sims/learning-pathway/learning-pathway.png
og:image: /sims/learning-pathway/learning-pathway.png
twitter:image: /sims/learning-pathway/learning-pathway.png
social:
   cards: false
---

# Learning Pathway Explorer

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Learning Pathway MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Learning Pathway MicroSim Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim demonstrates how learning concepts build upon each other through prerequisite dependencies. It visualizes a directed acyclic graph (DAG) of 12 fundamental math concepts, showing how mastery of foundational concepts unlocks access to more advanced topics.

### Features

- **Interactive Concept Nodes**: Click on nodes to mark concepts as "known"
- **Dependency Visualization**: Arrows show prerequisite relationships between concepts
- **Unlock Tracking**: Yellow nodes indicate concepts that become available once prerequisites are met
- **Goal Selection**: Right-click (or Ctrl+click) on a locked concept to set it as a learning goal
- **Path Highlighting**: When a goal is selected, the path of concepts needed to reach it is highlighted in orange
- **Force-Directed Layout**: Nodes automatically arrange themselves for optimal readability
- **Reset Button**: Clear all progress and start fresh

### Color Coding

| Color | Meaning |
|-------|---------|
| Green | Known - concept has been learned |
| Yellow | Unlockable - prerequisites are met, ready to learn |
| Gray | Locked - prerequisites not yet met |
| Blue | Goal - selected learning target |
| Orange outline | On path to goal |

### The 12 Math Concepts

The simulation includes these concepts with their dependencies:

1. **Numbers** - Foundation (no prerequisites)
2. **Addition** - Requires: Numbers
3. **Subtraction** - Requires: Numbers
4. **Multiplication** - Requires: Addition
5. **Division** - Requires: Subtraction, Multiplication
6. **Fractions** - Requires: Division
7. **Decimals** - Requires: Fractions
8. **Percentages** - Requires: Fractions, Decimals
9. **Variables** - Requires: Addition, Subtraction
10. **Equations** - Requires: Variables, Division
11. **Functions** - Requires: Equations
12. **Graphing** - Requires: Functions, Decimals

## How to Use

1. **Mark Known Concepts**: Click on any green or yellow node to toggle its "known" status
2. **Set a Learning Goal**: Right-click (or Ctrl+click) on any gray or yellow node to set it as your goal
3. **Follow the Path**: Orange-highlighted nodes show the concepts you need to learn to reach your goal
4. **Reset**: Click the Reset button to start over with only "Numbers" as known

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/learning-pathway/main.html" height="502px" scrolling="no"></iframe>
```

## Lesson Plan

### Objective
Students will understand the concept of prerequisite dependencies in learning and be able to identify optimal learning pathways through a knowledge graph.

### Activities

1. **Exploration (5 minutes)**: Have students interact with the simulation, clicking on concepts to mark them as known and observing how new concepts become unlockable.

2. **Goal Setting (5 minutes)**: Ask students to set "Graphing" as their learning goal and trace the path from their current knowledge to that goal.

3. **Discussion (10 minutes)**:
   - Why can't you learn Division before Multiplication?
   - What happens when a concept has multiple prerequisites?
   - How does this relate to your own learning experiences?

4. **Application (15 minutes)**: Have students map out the prerequisites for a topic in another subject area (e.g., a science concept or a skill in their hobby).

### Assessment
Students demonstrate understanding by correctly identifying prerequisite chains and explaining why certain learning orders are more efficient than others.

## Technical Details

- **Framework**: p5.js 1.11.10
- **Layout Algorithm**: Force-directed with hierarchical constraints
- **Interaction**: Mouse click for toggle, right-click/Ctrl+click for goal selection
- **Responsive**: Width-responsive canvas

## References

- [Learning Graphs](../../chapters/03/index.md) - Understanding concept dependencies
- [Directed Acyclic Graphs](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - The mathematical structure behind learning graphs
- [Prerequisite Learning](https://en.wikipedia.org/wiki/Mastery_learning) - Educational theory on sequential skill acquisition
