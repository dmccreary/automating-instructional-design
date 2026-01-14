# Page View Tracking vs Simulation Tracking

This interactive comparison illustrates the fundamental difference between traditional web analytics (like Google Analytics) and simulation-level tracking (using xAPI). Understanding these differences is essential for instructional designers who need to select appropriate analytics for evaluating MicroSim effectiveness.

## About This MicroSim

The diagram presents a side-by-side comparison of two analytics approaches:

### Left Column: Page-View Tracking (Traditional Analytics)

Traditional analytics tools capture surface-level metrics:

- **Page URL visited** - Which pages users navigate to
- **Time on page** - Aggregate duration (not granular)
- **Referrer source** - Where visitors came from
- **Device/browser** - Technical environment
- **Geographic location** - User's city/region
- **Bounce rate** - Percentage who leave quickly

**Limitation**: Cannot see what happens within interactive content

### Right Column: Simulation Tracking (xAPI)

xAPI-instrumented MicroSims capture detailed learning behavior:

- **Control interactions** - Every button click and control use
- **Slider value changes** - Parameter adjustments over time
- **Button timestamps** - Precise timing of actions
- **Prediction accuracy** - How well students predict outcomes
- **Activity time** - Duration on specific learning tasks
- **Interaction sequence** - The order of student actions

**Advantage**: Fine-grained data reveals learning patterns

## Interactive Features

- **Hover** over any metric to see a real-world example
- **Click** on either column to see sample data in that format
- **Toggle** the "Show Sample Data" button to compare raw data formats
- **Close** the detailed view by clicking the X or outside the modal

<iframe src="main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Key Insights

### The Depth Gap

Traditional analytics answer: "Did they visit the simulation?"

xAPI tracking answers: "Did they understand the concept? How did they approach the problem? Where did they struggle?"

### Actionable Intelligence

With xAPI data, instructional designers can:

1. **Identify misconceptions** - See which parameter values students try first
2. **Optimize scaffolding** - Know where students need more guidance
3. **A/B test designs** - Compare learning outcomes between simulation versions
4. **Personalize paths** - Adapt content based on interaction patterns

### When to Use Each

| Use Case | Page-View | xAPI |
|----------|-----------|------|
| Traffic analysis | Preferred | Overkill |
| Learning effectiveness | Insufficient | Essential |
| Engagement metrics | Basic | Detailed |
| Misconception detection | Cannot | Primary tool |

## References

- [Google Analytics Overview](https://analytics.google.com/) - Traditional page-view tracking
- [xAPI Specification](https://github.com/adlnet/xAPI-Spec) - Experience API standard
- [Learning Analytics Overview](https://www.solaresearch.org/) - Society for Learning Analytics Research
