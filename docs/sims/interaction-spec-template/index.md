# Interaction Specification Template

An interactive visualization showing the three-part structure of a well-specified interaction: Trigger, Response, and Feedback.

## About This MicroSim

This MicroSim demonstrates how every user interaction in an educational simulation should be specified with three key components:

1. **Trigger** (Blue) - What user action initiates the interaction
2. **Response** (Orange) - How the system behaves in reaction
3. **Feedback** (Green) - How the user perceives the result

Understanding this template helps instructional designers create complete, unambiguous interaction specifications.

## How to Use

- **Click** on any box to expand or collapse its sub-items
- **Hover** over boxes to see detailed descriptions
- Watch the animated arrows showing the flow from Trigger to Response to Feedback

<div id="canvas-container" style="min-height: 452px; border: 1px solid #ccc;">
    <iframe id="sim-iframe" src="./main.html"
            style="width: 100%; height: 452px; border: none; display: block;">
    </iframe>
</div>

<a href="./main.html" target="_blank" class="button">Open Full Screen</a>

## Interaction Structure Breakdown

### Trigger Components

| Component | Description | Examples |
|-----------|-------------|----------|
| **Input Device** | Hardware used for input | Mouse, keyboard, touch screen, voice |
| **Specific Action** | The exact gesture or input | Click, drag, double-click, type, swipe |
| **Target Element** | What receives the input | Button, slider, canvas region, dropdown |

### Response Components

| Component | Description | Examples |
|-----------|-------------|----------|
| **What Changes** | Type of change that occurs | Visual update, data modification, state transition |
| **How Fast** | Timing of the response | Immediate (< 100ms), animated (300-500ms), delayed |
| **Affected Elements** | Components that update | Graph, counter, status indicator, multiple elements |

### Feedback Components

| Component | Description | Examples |
|-----------|-------------|----------|
| **Visual Feedback** | What the user sees | Color change, animation, highlight, cursor change |
| **Audio Feedback** | What the user hears | Click sound, success tone, error beep |
| **Text Feedback** | Written confirmation | Tooltip, label update, status message |

## Example Specification

Here is an example of a complete interaction specification for a slider control:

```
TRIGGER:
- Input Device: Mouse
- Action: Drag
- Target: Friction coefficient slider

RESPONSE:
- What Changes: Simulation physics parameters
- How Fast: Immediate (each frame)
- Affected Elements: Ball motion, friction value display

FEEDBACK:
- Visual: Slider handle follows cursor, ball slows down
- Audio: None
- Text: Numeric value updates in real-time
```

## Lesson Plan

### Learning Objectives

By exploring this MicroSim, students will be able to:

1. Identify the three components of an interaction specification
2. Distinguish between trigger, response, and feedback elements
3. Apply the template to specify interactions in their own MicroSim designs

### Activities

1. **Explore** (5 min): Click through all boxes to understand each component
2. **Analyze** (10 min): Choose an existing MicroSim and identify its trigger-response-feedback patterns
3. **Apply** (15 min): Write specifications for 3 interactions in your proposed MicroSim using this template

### Assessment Questions

1. What is the difference between a "response" and "feedback"?
2. Why is it important to specify the input device in the trigger?
3. How does "how fast" the response occurs affect user experience?

## p5.js Editor Template

You can experiment with this MicroSim in the [p5.js Web Editor](https://editor.p5js.org/). Copy the JavaScript code and modify the setup function for the editor environment:

```javascript
// For p5.js editor, replace updateCanvasSize() with fixed dimensions
function setup() {
    createCanvas(800, 450);
    // Rest of setup code...
}
```

## Related Concepts

- [State Machine Template](../state-machine-template/) - Modeling system states and transitions
- [Spec Quality Checklist](../spec-quality-checklist/) - Evaluating specification completeness
- [Cause Effect Display](../cause-effect-display/) - Visualizing causal relationships
