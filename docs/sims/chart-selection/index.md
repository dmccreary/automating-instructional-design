---
title: Chart Selection Matrix
description: An interactive decision matrix that crosses five data types with five question types to recommend a chart. Click a chart for guidance and a sample, or practice choosing the right chart for nine scenarios.
image: /sims/chart-selection/chart-selection.png
og:image: /sims/chart-selection/chart-selection.png
twitter:image: /sims/chart-selection/chart-selection.png
social:
   cards: false
quality_score: 100
---

# Chart Selection Matrix

<iframe src="main.html" height="704px" width="100%" scrolling="no"></iframe>

[Run the Chart Selection Matrix MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Choosing a chart comes down to two questions. What kind of data do you have? What do you want the reader to see? This MicroSim turns those two questions into a decision matrix. The rows are data types, and the columns are question types. The cell where your row and your column meet holds the recommended chart.

This is the matrix version of the Chart Type Selection Guide from Chapter 3. A related MicroSim, the [Chart Type Selection Guide](../chart-type-selection/index.md) in Chapter 4, shows six chart types as cards and names the JavaScript library for each.

### The Decision Matrix

| Data type | Compare values | Show change | Show composition | Show distribution | Show relationship |
|-----------|----------------|-------------|------------------|-------------------|-------------------|
| **Categorical** (names, groups) | Bar | Grouped Bar | Stacked Bar | | |
| **Time series** (values over time) | Line | Area | Stacked Area | | Dual Axis |
| **Distribution** (spread of values) | *Box Plot* | | | Histogram, *Violin* | |
| **Relationship** (two variables) | | | | *Heatmap* | Scatter, *Bubble* |
| **Part-to-whole** (percentages) | Avoid pie | | Pie / Donut, *Treemap* | | |

Charts in *italics* appear only when **Show advanced charts** is checked. An empty cell means that pairing has no standard chart. When you land on an empty cell, rethink either the data type or the question.

### Visual Cues

- **Color** shows the chart family: bar (blue), line and area (teal), distribution (purple), relationship (orange), and part-to-whole (rose).
- A **green check** marks a best-practice default: Bar, Line, Histogram, and Scatter.
- An **amber triangle** marks a chart that is often misused: Dual Axis and Pie / Donut.
- The dashed **Avoid pie** cell flags a common mistake. A pie chart is a poor way to compare values, because people judge angles less accurately than lengths.

## How to Use

1. **Read the matrix.** Find your data type in a row, then your question in a column.
2. **Hover over a chart** to preview its guidance in the panel below the matrix.
3. **Click a chart** to keep it selected. The panel shows when to use it, an example, a tip, and a sample chart.
4. **Press Show Me** to redraw the sample chart with new data. The chart type stays the same while the numbers change.
5. **Check Show advanced charts** to add Box Plot, Violin, Heatmap, Bubble, and Treemap.
6. **Press Practice Scenario** to get a short data story. Click the cell you would use. A wrong answer gives a hint, and each further miss gives a stronger hint.
7. **Press Next Scenario** to move through all nine scenarios.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/chart-selection/main.html"
        height="704px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to select the most appropriate chart type based on the nature of their data and the question they want to answer.

### Bloom's Taxonomy Level

This MicroSim targets the **Apply** level. Learners use a two-step decision rule on new scenarios and get feedback on each choice.

### Audience

Instructional designers, teachers, corporate trainers, and subject matter experts who specify charts for MicroSims. No programming background is needed.

### Duration

15-20 minutes

### Prerequisites

- Recognizing common charts such as bar, line, and pie charts
- Telling a category (a name or group) apart from a number
- The idea that a chart should answer one question

### Activities

1. **Explore the matrix** (5 min): Click each best-practice chart, the ones with a green check. For each one, state the data type and the question in your own words.
2. **Spot the traps** (3 min): Click the two charts with an amber triangle and the Avoid pie cell. Explain why each one misleads readers when it is used carelessly.
3. **Practice** (7 min): Press **Practice Scenario** and work through all nine scenarios. Keep a tally of how many you solve on the first click.
4. **Apply it to your own content** (5 min): Pick one learning objective from a lesson you teach. Describe the data, name the question, and use the matrix to choose a chart. Write one sentence that defends the choice.

### Discussion Questions

1. Why does the matrix ask about the data type first and the question second?
2. The same monthly sales data could go in a Line chart or a Stacked Area chart. What question does each chart answer?
3. Most cells in the matrix are empty. What should you do when your data and your question meet at an empty cell?
4. When is a Dual Axis chart worth the risk, and what could you use in its place?

### Assessment

Learners have met the objective when they can:

- name the data type and the question type for a new scenario
- choose a chart from the matrix and justify it in one sentence
- name one chart that is often misused and state the safer choice

## Design Notes

- **Two decisions, in order.** The row comes first, because the data type limits which charts are possible. The column then narrows the choice to one chart.
- **Worked example on load.** The Bar chart is selected when the MicroSim opens, so the guidance panel is never empty.
- **Hints that build.** The first miss restates the two-step rule. The second miss names the row. The third miss names both the row and the column.
- **No chart library.** The icons and sample charts are drawn on plain HTML canvas elements. The text content lives in `data.json`, so the matrix can be edited without changing the code.

## References

1. Few, S. (2012). *Show Me the Numbers: Designing Tables and Graphs to Enlighten* (2nd ed.). Analytics Press.
2. Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. *Journal of the American Statistical Association*, 79(387), 531-554.
3. [From Data to Viz](https://www.data-to-viz.com/) - a decision tree that leads from data type to chart type
4. [Chart - Wikipedia](https://en.wikipedia.org/wiki/Chart)
