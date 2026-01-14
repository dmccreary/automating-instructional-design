---
title: Visualization Library Decision Tree
description: An interactive decision tree that guides learners through selecting the appropriate JavaScript visualization library based on their content type and requirements.
---

# Visualization Library Decision Tree

<iframe src="main.html" height="470px" width="100%" scrolling="no"></iframe>

[Run the Visualization Library Decision Tree Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the MicroSim Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim helps learners navigate the decision-making process of selecting the appropriate JavaScript visualization library for their educational simulations (MicroSims). By answering a series of questions about the content type and requirements, users are guided to the most suitable library for their needs.

### Features

- **Interactive Decision Tree**: Click through decision nodes to navigate the flowchart
- **Visual Path Highlighting**: See your decision path highlighted in green
- **Library Information**: Hover over or select library nodes to see detailed descriptions
- **Direct Library Selection**: Click any library endpoint to see its path and description
- **Reset Button**: Start over at any time to explore different paths

### Library Options

The decision tree guides users to one of seven visualization libraries:

| Library | Best For | Color |
|---------|----------|-------|
| **p5.js** | Creative coding, animations, physics simulations | Pink |
| **Chart.js** | Simple charts (bar, line, pie, doughnut, radar) | Orange |
| **Plotly** | Scientific plots, 3D charts, mathematical functions | Blue |
| **vis-network** | Network graphs, concept maps, hierarchies | Teal |
| **vis-timeline** | Timelines, Gantt charts, event sequences | Green |
| **Leaflet** | Interactive maps, geographic data | Forest Green |
| **Mermaid** | Flowcharts, sequence diagrams, workflows | Purple |

### Decision Flow

1. **Start**: What type of content do you want to visualize?
2. **Animation/Physics**: Is it animated or physics-based? Yes leads to p5.js
3. **Data/Statistics**: Is it data or statistics? Yes continues to math function check
4. **Math Functions**: Need mathematical functions? Yes leads to Plotly, No leads to Chart.js
5. **Relationships**: Does it show relationships or networks? Yes leads to vis-network
6. **Time-based**: Is it time-based or chronological? Yes leads to vis-timeline
7. **Geographic**: Is it geographic or location-based? Yes leads to Leaflet, No leads to Mermaid

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/viz-library-decision/main.html" height="470px" scrolling="no"></iframe>
```

## Lesson Plan

### Objective

Students will understand the characteristics of different JavaScript visualization libraries and be able to select the appropriate library for various types of educational content.

### Activities

1. **Exploration (5 minutes)**: Have students navigate through the decision tree multiple times, exploring different paths to discover all seven library endpoints.

2. **Discussion (10 minutes)**: As a class, discuss:
   - Why is p5.js recommended for animations while Chart.js is for static data?
   - What makes vis-network better for relationships than a standard chart library?
   - When would you choose Plotly over Chart.js for data visualization?

3. **Application (15 minutes)**: Give students a list of visualization scenarios and have them use the decision tree to determine the appropriate library:
   - A bouncing ball simulation (p5.js)
   - Student grade distribution (Chart.js)
   - Historical timeline of scientific discoveries (vis-timeline)
   - Concept dependency map for a course (vis-network)
   - Map showing school locations (Leaflet)

4. **Analysis (10 minutes)**: Have students identify a topic from their own studies and determine which visualization library would be most appropriate, justifying their choice based on the decision criteria.

### Assessment

Students demonstrate understanding by correctly identifying appropriate visualization libraries for given scenarios and explaining their reasoning based on content characteristics.

## References

- [p5.js Reference](https://p5js.org/reference/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Plotly.js Documentation](https://plotly.com/javascript/)
- [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/)
- [vis-timeline Documentation](https://visjs.github.io/vis-timeline/docs/timeline/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Mermaid Documentation](https://mermaid.js.org/intro/)
