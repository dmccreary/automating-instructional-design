---
title: Process Timeline
description: An interactive process timeline showing the steps in an instructional design workflow. Click steps to highlight and view details, navigate with Previous/Next buttons.
image: /sims/process-timeline/process-timeline.png
og:image: /sims/process-timeline/process-timeline.png
twitter:image: /sims/process-timeline/process-timeline.png
social:
   cards: false
---

# Process Timeline

<iframe src="main.html" height="352px" width="100%" scrolling="no"></iframe>

[Run the Process Timeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Process Timeline MicroSim Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim visualizes the instructional design process as a horizontal timeline with seven sequential steps. It demonstrates how instructional designers move through a systematic workflow to create effective learning experiences.

### Features

- **Interactive Step Nodes**: Click on any step to select it and view detailed information
- **Visual Progress Indicator**: Completed steps are highlighted on the timeline
- **Navigation Buttons**: Previous/Next buttons to move through the timeline sequentially
- **Keyboard Navigation**: Use left/right arrow keys to navigate between steps
- **Step Details Panel**: Displays the description of the currently selected step
- **Progress Dots**: Visual indicator showing current position in the workflow
- **Responsive Design**: Adjusts to container width

### The 7 Process Steps

1. **Define Objectives** - Identify clear learning objectives using SMART criteria
2. **Analyze Learners** - Assess learner characteristics and prior knowledge
3. **Design Content** - Create instructional content structure and sequence topics
4. **Develop Materials** - Build learning materials including MicroSims
5. **Implement Instruction** - Deliver instruction and facilitate activities
6. **Evaluate Outcomes** - Assess learner achievement and gather feedback
7. **Revise & Iterate** - Analyze data and continuously improve the design

### Color Coding

| Element | Meaning |
|---------|---------|
| Colored node | Currently selected step |
| Green node | Completed step |
| Blue node | Current active step |
| Gray node | Future step |
| Green timeline | Completed portion of workflow |

## How to Use

1. **Click on Steps**: Click any numbered circle to select that step and view its details
2. **Navigate with Buttons**: Use Previous/Next buttons to move through steps sequentially
3. **Keyboard Navigation**: Press left/right arrow keys to move between steps
4. **View Progress**: The progress dots at the bottom show your position in the workflow

## Instructional Design Context

This timeline represents a simplified version of the ADDIE model (Analysis, Design, Development, Implementation, Evaluation), which is a widely used instructional design framework. The seven steps shown here expand on the traditional five phases to provide more granular guidance for practitioners.

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/process-timeline/main.html" height="352px" scrolling="no"></iframe>
```

## Lesson Plan

### Objective

Students will understand the systematic nature of instructional design and be able to describe the purpose of each phase in the design workflow.

### Activities

1. **Exploration (5 minutes)**: Have students navigate through all seven steps, reading each description carefully.

2. **Sequencing Exercise (10 minutes)**: Discuss why the steps are arranged in this particular order. What would happen if you skipped a step or changed the sequence?

3. **Case Study Application (15 minutes)**: Given a learning scenario (e.g., teaching a new software tool), have students outline what they would do at each step.

4. **Reflection (5 minutes)**: Ask students to identify which step they think is most challenging and why.

### Assessment

Students demonstrate understanding by correctly explaining the purpose of each step and justifying the sequential nature of the instructional design process.

## Technical Details

- **Framework**: p5.js 1.11.10
- **Interaction**: Mouse click, keyboard arrows
- **Responsive**: Width-responsive canvas
- **Accessibility**: Step numbers and labels for screen reader support

## References

- [ADDIE Model](https://en.wikipedia.org/wiki/ADDIE_Model) - The foundational instructional design framework
- [Instructional Design](../../chapters/01/index.md) - Introduction to instructional design concepts
- [Learning Objectives](../../chapters/02/index.md) - How to define effective learning objectives
