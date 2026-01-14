---
title: Chart Selection Helper
description: An interactive tool that helps learners choose the appropriate chart type based on their data type and the question they want to answer.
image: /sims/chart-selection/chart-selection.png
og:image: /sims/chart-selection/chart-selection.png
twitter:image: /sims/chart-selection/chart-selection.png
quality_score: 85
social:
   cards: false
---

# Chart Selection Helper

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Chart Selection Helper Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Chart Selection Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/...){ .md-button }

## About This MicroSim

This interactive tool helps learners understand which chart type is most appropriate for visualizing their data. By selecting the type of data and the question they want to answer, users see recommendations highlighted among six common chart types.

### How to Use

1. **Select Data Type** - Choose from Categorical, Continuous, Time Series, Parts of a Whole, or Two Variables
2. **Select Question Type** - Choose what you want to show: Compare Values, Trend Over Time, Distribution, Relationship, or Composition
3. **View Recommendations** - Charts that match your selections are highlighted in green as "RECOMMENDED"
4. **Hover for Details** - Move your mouse over any chart card to see a detailed description of when to use that chart type

### Chart Types Covered

| Chart Type | Best For |
|------------|----------|
| **Bar Chart** | Comparing values across categories |
| **Line Chart** | Showing trends over time |
| **Pie Chart** | Displaying parts of a whole |
| **Scatter Plot** | Revealing relationships between two variables |
| **Area Chart** | Showing cumulative trends or stacked data |
| **Histogram** | Showing frequency distribution of continuous data |

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/chart-selection/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify the six common chart types and their primary uses
2. Match data types to appropriate visualization methods
3. Select charts based on the analytical question being asked
4. Justify chart selection decisions using data characteristics

### Suggested Activities

1. **Exploration (5 min)**: Explore all combinations of data and question types, noting which charts appear as recommendations
2. **Matching Exercise (10 min)**: Given 10 data scenarios, select the most appropriate chart type
3. **Analysis (10 min)**: Find examples of charts used incorrectly in media and explain why a different chart would be better
4. **Creation (15 min)**: Take a dataset and create visualizations using multiple chart types, then defend which is most effective

### Assessment

- Quiz: Match data scenarios to appropriate chart types
- Practical: Create three different charts from the same dataset and write a paragraph defending which visualization is most effective

## Data Visualization Best Practices

- **Keep it simple**: Choose the simplest chart that effectively communicates your message
- **Consider your audience**: Technical audiences may understand complex visualizations; general audiences prefer simpler charts
- **Avoid 3D effects**: They often distort data perception
- **Use color purposefully**: Color should highlight important information, not just decorate
- **Label clearly**: Axes, legends, and titles should make the chart self-explanatory

## References

- Few, S. (2012). Show Me the Numbers: Designing Tables and Graphs to Enlighten
- Tufte, E. (2001). The Visual Display of Quantitative Information
- Cairo, A. (2016). The Truthful Art: Data, Charts, and Maps for Communication
