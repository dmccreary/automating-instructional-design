---
title: Paradigm Affordance Matrix
description: An interactive matrix showing how different visualization paradigms (Timeline, Map, Network, Chart, Flowchart) afford different learning interactions across Bloom's Taxonomy levels.
image: /sims/paradigm-affordance/paradigm-affordance.png
og:image: /sims/paradigm-affordance/paradigm-affordance.png
twitter:image: /sims/paradigm-affordance/paradigm-affordance.png
social:
   cards: false
---

# Paradigm Affordance Matrix

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Paradigm Affordance MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Paradigm Affordance MicroSim Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim displays a matrix showing how different visualization paradigms support various cognitive levels in Bloom's Taxonomy. Understanding these affordances helps instructional designers select the most appropriate visualization type for their learning objectives.

### Features

- **Interactive Matrix**: Rows show visualization types, columns show Bloom's levels
- **Affordance Indicators**: Visual strength indicators (Strong, Moderate, Weak)
- **Hover Details**: Hover over any cell to see specific affordance descriptions
- **Row Selection**: Click any row to highlight and lock selection
- **Color-Coded Headers**: Bloom's levels use consistent taxonomy colors

### Visualization Paradigms

1. **Timeline** - Sequential visualization showing events over time
2. **Map** - Spatial visualization showing geographic relationships
3. **Network** - Graph visualization showing connections and relationships
4. **Chart** - Statistical visualization for comparing quantities
5. **Flowchart** - Process visualization showing steps and decisions

### Bloom's Taxonomy Levels

| Level | Name | Description |
|-------|------|-------------|
| L1 | Remember | Recall facts and basic concepts |
| L2 | Understand | Explain ideas or concepts |
| L3 | Apply | Use information in new situations |
| L4 | Analyze | Draw connections among ideas |
| L5 | Evaluate | Justify decisions or judgments |
| L6 | Create | Produce new or original work |

### Key Insights

- **Charts** excel at lower cognitive levels (Remember through Analyze) but have limited affordance for Create
- **Networks** are particularly strong for Analyze tasks due to their relational nature
- **Flowcharts** have strong affordance for Create as they naturally support designing new processes
- **Maps** provide strong spatial anchoring that supports memory and understanding
- **Timelines** naturally support sequential thinking and historical analysis

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/paradigm-affordance/main.html" height="452px" scrolling="no"></iframe>
```

## Lesson Plan

### Objective

Students will analyze visualization paradigms and select appropriate types based on learning objectives aligned with Bloom's Taxonomy levels.

### Activities

1. **Exploration (5 minutes)**: Have students hover over each cell to discover how different paradigms support different cognitive levels.

2. **Pattern Recognition (10 minutes)**: As a class, discuss:
   - Which paradigms are best for lower-order thinking skills?
   - Which paradigms support higher-order thinking?
   - Why might certain paradigms have weak affordance for specific levels?

3. **Application (15 minutes)**: Give students three learning objectives at different Bloom's levels. Have them select the most appropriate visualization paradigm for each and justify their choices.

4. **Design Challenge (15 minutes)**: Have students design a lesson that uses at least two different visualization paradigms to address learning objectives at three different cognitive levels.

### Assessment

Students demonstrate understanding by correctly matching visualization paradigms to learning objectives and articulating the affordance rationale for their choices.

## References

- Anderson, L.W., & Krathwohl, D.R. (Eds.). (2001). A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy of Educational Objectives. Longman.
- Mayer, R.E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.
- Card, S.K., Mackinlay, J.D., & Shneiderman, B. (1999). Readings in Information Visualization: Using Vision to Think. Morgan Kaufmann.
