---
title: Zone of Proximal Development Visualization
description: An interactive visualization of Vygotsky's Zone of Proximal Development showing three concentric learning zones with adjustable scaffolding level.
image: /sims/zpd-visualization/zpd-visualization.png
og:image: /sims/zpd-visualization/zpd-visualization.png
twitter:image: /sims/zpd-visualization/zpd-visualization.png
social:
   cards: false
---

# Zone of Proximal Development Visualization

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>

[Run the ZPD Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the ZPD Visualization MicroSim Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim visualizes Lev Vygotsky's Zone of Proximal Development (ZPD), a foundational concept in educational psychology and instructional design. The ZPD represents the sweet spot for learning where students can accomplish tasks with appropriate support that they cannot yet do independently.

### The Three Learning Zones

The visualization displays three concentric circles representing different levels of learner capability:

1. **Can Do Independently (Green - Inner Circle)**: Skills and knowledge the learner has already mastered. These tasks require no external support.

2. **Zone of Proximal Development (Yellow/Orange - Middle Ring)**: The critical learning zone where growth happens. With appropriate scaffolding from teachers, peers, or educational technology like MicroSims, learners can accomplish tasks just beyond their current independent ability.

3. **Cannot Do Yet (Red - Outer Ring)**: Tasks that are too far beyond the learner's current capability. Even with assistance, the cognitive gap is too large for meaningful learning.

### Interactive Features

- **Scaffolding Slider**: Adjust the scaffolding level (0-100%) to see how increased support expands the Zone of Proximal Development, making more tasks accessible to learners
- **Hover for Details**: Hover over each zone to see detailed descriptions, characteristics, and example tasks
- **MicroSim Features Toggle**: Click the button to see how different MicroSim features map to the learning zones
- **Vygotsky Quote**: A foundational quote at the bottom contextualizes the theory

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/zpd-visualization/main.html" height="550px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to identify the Zone of Proximal Development and understand its implications for scaffolding in instructional design.

### Pre-Assessment (2 minutes)

Ask students: "What happens when you try to learn something that's way too hard for you? What about something too easy?"

### Exploration Activity (10 minutes)

1. **Zone Discovery**: Have students hover over each zone and read the descriptions. Ask them to write down one personal example for each zone based on a skill they're currently developing.

2. **Scaffolding Experiment**:
   - Set the slider to 0% and note the size of the ZPD
   - Gradually increase to 100% and observe how the learning zone expands
   - Discuss: "What does this tell us about the importance of scaffolding?"

3. **MicroSim Feature Mapping**: Click "Show MicroSim Features" and discuss how different interactive features help learners work within their ZPD.

### Discussion Questions (10 minutes)

1. Why is the ZPD called the "zone" of proximal development rather than the "point"?
2. How can teachers identify a student's ZPD for a particular skill?
3. What happens if scaffolding is removed too quickly? Too slowly?
4. How do MicroSims provide scaffolding compared to traditional instruction?

### Application Activity (15 minutes)

In pairs, students should:

1. Choose a concept from your curriculum
2. Identify what would be in each zone for a typical learner
3. Design three scaffolding strategies to help learners work within their ZPD
4. Explain how a MicroSim could provide one of these scaffolds

### Assessment

Students demonstrate understanding by:

- Correctly classifying tasks into the three zones
- Explaining how scaffolding expands the ZPD
- Designing appropriate scaffolding strategies for their chosen concept

## Theoretical Background

### Vygotsky's Social Constructivism

Lev Vygotsky (1896-1934) was a Soviet psychologist who developed the concept of the Zone of Proximal Development as part of his sociocultural theory of cognitive development. Key principles include:

- **Social Learning**: Learning is fundamentally a social process
- **More Knowledgeable Other (MKO)**: Learning is facilitated by someone (or something) with more knowledge
- **Scaffolding**: Temporary support that is gradually removed as competence develops

### Implications for MicroSim Design

When designing educational MicroSims, the ZPD framework suggests:

- **Adaptive Difficulty**: Simulations should adjust to keep learners in their ZPD
- **Built-in Scaffolds**: Hints, prompts, and guided modes help learners attempt challenging tasks
- **Gradual Release**: Support should fade as learner competence grows
- **Immediate Feedback**: Helps learners recognize when they're succeeding

## References

- Vygotsky, L. S. (1978). Mind in Society: The Development of Higher Psychological Processes. Harvard University Press.
- Wood, D., Bruner, J. S., & Ross, G. (1976). The role of tutoring in problem solving. Journal of Child Psychology and Psychiatry, 17(2), 89-100.
- Shabani, K., Khatib, M., & Ebadi, S. (2010). Vygotsky's Zone of Proximal Development: Instructional Implications and Teachers' Professional Development. English Language Teaching, 3(4), 237-248.
