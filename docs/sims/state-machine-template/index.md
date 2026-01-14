# State Machine Template

A template for creating interactive state machine visualizations with p5.js. This MicroSim demonstrates a 5-state machine with transitions, history tracking, and interactive controls.

## About This Template

This template provides a foundation for building state machine visualizations. It includes:

- **5 states** arranged in a circular layout: Idle, Running, Paused, Error, and Complete
- **8 transitions** connecting the states with labeled arrows
- **Current state highlighting** shows which state is active
- **Transition buttons** dynamically update based on available transitions
- **History panel** tracks the path through the state machine
- **Reset button** returns to the initial state

## How to Use

1. Click the colored transition buttons to move between states
2. Only valid transitions from the current state are shown
3. Watch the history panel to see your path through the states
4. Click "Reset" to return to the Idle state

<div id="canvas-container" style="min-height: 502px; border: 1px solid #ccc;">
    <iframe id="sim-iframe" src="./main.html"
            style="width: 100%; height: 502px; border: none; display: block;">
    </iframe>
</div>

<a href="./main.html" target="_blank" class="button">Open Full Screen</a>

## Customization Guide

To adapt this template for your own state machine:

### 1. Modify States

Edit the `defineStates()` function to change state names and descriptions:

```javascript
const stateNames = ['State1', 'State2', 'State3', 'State4', 'State5'];
const stateDescriptions = [
    'Description for state 1',
    'Description for state 2',
    // ...
];
```

### 2. Modify Transitions

Edit the `defineTransitions()` function to define allowed state changes:

```javascript
transitions = [
    { from: 0, to: 1, label: 'Action' },  // State1 -> State2
    { from: 1, to: 2, label: 'Next' },    // State2 -> State3
    // Add more transitions as needed
];
```

### 3. Customize Colors

Adjust the color variables at the top of the script:

```javascript
let stateColor = '#e3f2fd';           // Default state fill
let currentStateColor = '#2196f3';     // Active state fill
let stateStrokeColor = '#1565c0';      // State border
```

## State Machine Concepts

This visualization demonstrates key state machine concepts:

| Concept | Description |
|---------|-------------|
| **State** | A distinct condition or mode of the system |
| **Transition** | A change from one state to another |
| **Initial State** | The starting state (Idle in this example) |
| **Terminal State** | A final state (Complete in this example) |
| **Event/Action** | What triggers a transition |

## Example Use Cases

State machines are useful for modeling:

- **User Interface flows** - Login, navigation, form wizards
- **Game logic** - Character states, game phases
- **Protocol design** - Network handshakes, communication
- **Workflow systems** - Approval processes, order fulfillment
- **Hardware control** - Device modes, power states

## p5.js Editor Template

You can copy and paste the JavaScript code into the [p5.js Web Editor](https://editor.p5js.org/) to experiment with modifications.

```javascript
// Copy the contents of state-machine-template.js
// Modify the setup() function to remove updateCanvasSize() call
// and set fixed canvas dimensions for the editor

function setup() {
    createCanvas(750, 460);
    // Rest of setup code...
}
```
