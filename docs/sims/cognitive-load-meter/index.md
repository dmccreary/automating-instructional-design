---
title: Cognitive Load Meter
description: An interactive meter visualization that demonstrates cognitive load theory by allowing learners to adjust instructional design parameters and observe real-time load calculations.
---

# Cognitive Load Meter

<iframe src="main.html" height="720px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Cognitive Load Meter Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit Using the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive Cognitive Load Meter allows learners to calibrate their intuitions about cognitive load by adjusting instructional design parameters and observing the meter response in real-time. The simulation demonstrates how various factors contribute to the three types of cognitive load defined by Cognitive Load Theory.

### Learning Objective

Demonstrate how a cognitive load meter works and allow learners to calibrate their intuitions about cognitive load by adjusting parameters and observing the meter response.

### Bloom's Taxonomy Level

**Evaluate (L5)** - Learners assess and judge the impact of different design decisions on cognitive load, making informed decisions about instructional design optimization.

## Interactive Controls

### Content Parameters

| Control | Range | Description |
|---------|-------|-------------|
| **Content Complexity** | Simple / Moderate / Complex | Sets the inherent difficulty of the instructional content. Complex content has more interacting elements. |
| **Visual Elements** | 1-20 | Number of visual elements displayed in the content area. More elements increase visual clutter. |
| **Text Density** | 1-10 | Amount of text content in the instructional display. Higher density requires more processing. |
| **Integration Level** | Split to Integrated | How well text and visuals are integrated. Split presentation causes split-attention effect. |
| **Learner Experience** | Novice / Intermediate / Expert | Prior knowledge level. Experts have schemas that reduce intrinsic load. |
| **Animation Active** | On / Off | Whether content elements are animated. Animation adds processing demands. |

## The Meter Display

### Zone Colors

The thermometer-style meter displays three zones:

- **Green Zone (0-40%)**: Comfortable cognitive load. Learning is optimized with available working memory capacity.
- **Yellow Zone (40-70%)**: Moderate load. Learning is still possible but becoming challenging.
- **Red Zone (70-100%)**: Risk of overload. Working memory capacity may be exceeded, impairing learning.

### Load Breakdown

The breakdown section shows the contribution of each load type:

- **Intrinsic Load** (Blue): The inherent complexity of the material, modified by learner experience
- **Extraneous Load** (Red): Cognitive effort wasted on poor design rather than learning
- **Germane Load** (Green): Productive effort devoted to schema construction

### Calculation Factors

The meter displays specific calculation factors:

- Base intrinsic load from content complexity multiplied by experience factor
- Visual clutter penalty from number of elements
- Text processing load from density
- Split attention penalty when integration is low
- Animation processing load when active

## How Load is Calculated

### Intrinsic Load Formula

```
Intrinsic = BaseComplexity x ExperienceMultiplier

Where:
- Simple = 15, Moderate = 30, Complex = 50
- Novice = 1.5x, Intermediate = 1.0x, Expert = 0.6x
```

### Extraneous Load Components

```
Extraneous = VisualClutter + TextProcessing + SplitAttention + AnimationLoad

Where:
- Visual Clutter: 2-25% based on element count
- Text Processing: 2-15% based on density
- Split Attention: 2-20% (inversely related to integration)
- Animation: 12% when active, 0% when off
```

### Germane Load

Germane load represents productive learning effort. It decreases when extraneous load consumes too many resources and increases with learner expertise.

## Exploration Activities

### Activity 1: Finding the Threshold

1. Start with default settings and note the total load
2. Gradually increase visual elements until you enter the yellow zone
3. Continue until you enter the red zone
4. Record the settings at each threshold

### Activity 2: Expert vs. Novice Design

1. Set Experience to "Novice" and Content Complexity to "Complex"
2. Note the high intrinsic load
3. Adjust other parameters to keep total load under 70%
4. Switch to "Expert" and observe how much headroom you gain
5. Consider: What additional complexity could experts handle?

### Activity 3: The Split Attention Effect

1. Set Integration to maximum (Integrated)
2. Note the extraneous load value
3. Gradually move Integration to Split
4. Watch the split attention penalty increase
5. Consider: How does this relate to real instructional materials?

### Activity 4: Animation Trade-offs

1. Toggle Animation on with moderate other settings
2. Observe the 12% load increase
3. Consider: When is animation worth the cognitive cost?
4. Think about cases where animation might reduce load (showing motion, causation)

## Design Principles Illustrated

### 1. Coherence Principle
Reducing visual elements and irrelevant content decreases extraneous load without affecting learning value.

### 2. Spatial Contiguity Principle
Higher integration scores demonstrate how placing related text and visuals together reduces cognitive effort.

### 3. Expertise Reversal Effect
What overwhelms novices may be easily handled by experts. Scaffold for beginners but allow experts to skip basics.

### 4. Modality Effect
The simulation shows how multiple information channels (visual elements, text, animation) compete for limited resources.

## Embedding This MicroSim

Include this MicroSim on your website:

```html
<iframe
    src="https://dmccreary.github.io/automating-instructional-design/sims/cognitive-load-meter/main.html"
    height="720px"
    width="100%"
    scrolling="no">
</iframe>
```

## References

- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257-285.
- Mayer, R. E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.
- Paas, F., & van Merrienboer, J. J. G. (1994). Instructional control of cognitive load in the training of complex cognitive tasks. Educational Psychology Review, 6(4), 351-371.
- Kalyuga, S. (2007). Expertise reversal effect and its implications for learner-tailored instruction. Educational Psychology Review, 19(4), 509-539.
