---
title: Chart Type Selection Guide
description: An interactive infographic that helps learners quickly identify the appropriate chart type based on their data characteristics and communication goals.
image: /sims/chart-type-selection/chart-type-selection.png
og:image: /sims/chart-type-selection/chart-type-selection.png
twitter:image: /sims/chart-type-selection/chart-type-selection.png
quality_score: 85
social:
   cards: false
---

# Chart Type Selection Guide

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Chart Type Selection Guide Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Chart Type Selection Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## About This MicroSim

This interactive infographic helps learners quickly identify the appropriate chart type based on their data characteristics and communication goals. It presents six common chart types in a 2x3 grid format, each with a distinctive color, icon, use case, and example.

### How to Use

1. **Browse the Cards** - Each card displays a chart type with its primary use case
2. **Hover for Details** - Move your mouse over any card to see an expanded description explaining when and why to use that chart type
3. **Click to Highlight** - Click on a card to select and highlight it for emphasis
4. **Click Again to Deselect** - Click the selected card or anywhere else to deselect

### Chart Types Covered

| Chart Type | Use When | Example | Library |
|------------|----------|---------|---------|
| **Line Chart** | Showing trends over time | Stock prices over 12 months | Chart.js or Plotly |
| **Bar Chart** | Comparing categories | Sales by region | Chart.js |
| **Pie/Doughnut** | Parts of a whole (max 6 categories) | Market share distribution | Chart.js |
| **Scatter Plot** | Showing correlations | Height vs. weight | Chart.js or Plotly |
| **Function Plot** | Mathematical functions | y = sin(x) | Plotly |
| **Radar Chart** | Multi-variable comparison | Skill assessment profiles | Chart.js |

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/chart-type-selection/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Identify** the six common chart types and their visual characteristics (Remember)
2. **Explain** when to use each chart type based on data characteristics (Understand)
3. **Select** the appropriate chart type for a given data scenario (Apply)
4. **Compare** different chart types and justify selection decisions (Analyze)

### Bloom's Taxonomy Level

This MicroSim targets **Apply** level, as students learn to select and apply the correct chart type for specific data visualization scenarios.

### Prerequisites

- Basic understanding of data types (categorical, numerical, time series)
- Familiarity with common chart formats

### Suggested Activities

1. **Exploration (5 min)**: Browse all six chart types, hovering over each to read the expanded descriptions

2. **Matching Exercise (10 min)**: Given these scenarios, identify the best chart type:
   - Monthly website traffic over a year
   - Budget breakdown by department
   - Test scores vs. study hours
   - Company market share compared to competitors
   - Student performance across multiple subjects
   - Population growth curve modeling

3. **Library Selection (10 min)**: Discuss when to choose Chart.js vs. Plotly based on the data and visualization needs

4. **Real-World Analysis (15 min)**: Find examples of charts in news articles or reports and evaluate whether the appropriate chart type was used

### Assessment

- **Quiz**: Present 10 data scenarios and have students select the most appropriate chart type
- **Practical**: Given a dataset, create visualizations using two different chart types and write a paragraph defending which is more effective

## Design Decisions

### Color Coding

Each chart type has a distinct background color to aid visual recognition and memory:

- **Line Chart**: Green - growth and trends
- **Bar Chart**: Blue - stability and comparison
- **Pie/Doughnut**: Orange - warmth and parts
- **Scatter Plot**: Purple - complexity and relationships
- **Function Plot**: Cyan - mathematical precision
- **Radar Chart**: Deep Orange - multi-dimensional assessment

### Icon Design

Each icon provides a simplified visual representation of the chart type to reinforce recognition without requiring text labels.

## References

- Few, S. (2012). Show Me the Numbers: Designing Tables and Graphs to Enlighten
- Tufte, E. (2001). The Visual Display of Quantitative Information
- Chart.js Documentation: https://www.chartjs.org/
- Plotly.js Documentation: https://plotly.com/javascript/
