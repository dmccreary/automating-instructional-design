# xAPI Data Flow

This interactive diagram illustrates how xAPI (Experience API) events flow from student interactions with a MicroSim all the way through to analytics dashboards. Understanding this data flow is essential for instructional designers who want to track learning effectiveness and optimize educational content.

## About This MicroSim

The diagram shows five key components in the xAPI data pipeline, arranged from left to right:

1. **Student** - A learner interacting with the MicroSim on their device (clicks, drags, inputs)
2. **MicroSim** - The interactive simulation with xAPI instrumentation code that captures learning events
3. **xAPI Statement** - The standardized Actor-Verb-Object structure that describes what happened
4. **Learning Record Store (LRS)** - A secure database that stores millions of learning statements
5. **Analytics** - Dashboards that query the LRS to reveal patterns and A/B test results

### Interactive Features

- **Hover** over any component to see its detailed description
- **Click** on a component to trigger a data packet animation showing the flow
- **Watch** the automatic animation of data packets flowing through the system
- Notice the **HTTPS lock icon** indicating secure data transmission to the LRS

<iframe src="main.html" width="100%" height="452px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Key Concepts

### The xAPI Statement Structure

Every learning event is captured as a statement with three parts:

- **Actor (A)** - Who did it (the learner, identified by email or account)
- **Verb (V)** - What they did (answered, completed, experienced, etc.)
- **Object (O)** - What they interacted with (the MicroSim, a question, a concept)

### Security and Privacy

The diagram highlights security features:

- **HTTPS encryption** on all data transmission
- **Lock icon** on the LRS indicating secure storage
- Data is anonymizable and compliant with privacy regulations

### From Events to Insights

The flow demonstrates how raw interaction data becomes actionable intelligence:

1. Student clicks a slider in a physics simulation
2. MicroSim generates: "Student X attempted physics-problem-1 with value 45"
3. Statement travels securely to the LRS
4. Analytics aggregates thousands of such statements
5. Dashboard reveals: "Students who adjust the slider 3+ times score 20% higher"

## References

- [xAPI Specification](https://github.com/adlnet/xAPI-Spec) - ADL Initiative
- [Learning Record Store Overview](https://xapi.com/learning-record-store/) - xAPI.com
- [xAPI Statement Reference](https://xapi.com/statements-101/) - Statement Structure Guide
