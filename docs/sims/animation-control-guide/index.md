# Animation Control Guide

This interactive infographic demonstrates best practices for animation controls in MicroSims, providing a template that designers can follow when building educational simulations.

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Fullscreen](main.html)

## About This MicroSim

The guide showcases the essential components of a well-designed animation control system:

1. **Sample Animation Viewport** - A physics simulation demonstrating bouncing balls, showing how the controls affect the animation in real-time.

2. **Transport Controls** - Standard media player-style buttons:
   - Reset (skip to start) - Returns animation to initial state
   - Step backward - Move back one frame
   - Play/Pause - Central, prominent control for starting/stopping
   - Step forward - Advance one frame
   - Skip to end - Jump to final state

3. **Timeline/Scrubber** - Visual progress indicator with:
   - Progress bar showing current position
   - Draggable playhead for random access
   - Segment markers showing animation structure
   - Time display (current/total)

4. **Speed Control** - Adjustable playback speed:
   - Options: 0.25x, 0.5x, 1x (default), 1.5x, 2x
   - Visual indicator of current speed

5. **Advanced Controls** - Optional features:
   - Loop toggle for continuous playback
   - Fullscreen button
   - Quality/detail level selector


## Best Practices

Controls should follow these guidelines:

- :white_check_mark: **Follow media player conventions** - Users already know how video players work
- :white_check_mark: **Make important controls prominent** - Play/pause should be the most visible element
- :white_check_mark: **Provide keyboard shortcuts** - Space for play/pause, arrows for stepping
- :white_check_mark: **Remember user preferences** - Store settings between sessions

<div class="grid cards" markdown>

-   :material-check-circle:{ .lg .middle } **DO**

    ---

    - Use familiar iconography
    - Make controls touch-friendly
    - Show current state clearly
    - Support keyboard navigation

-   :material-close-circle:{ .lg .middle } **DON'T**

    ---

    - Auto-play without consent
    - Hide essential controls
    - Use non-standard icons
    - Forget mobile users

</div>

## Interactive Features

Try out the controls to see how they work:

- **Click Play/Pause** to start and stop the animation
- **Drag the scrubber** to jump to any point in the animation
- **Click speed markers** to change playback speed
- **Toggle Loop** to enable continuous playback
- **Use keyboard shortcuts**: Space (play/pause), Arrow keys (step), R (reset), L (loop)

## Implementation Notes

This MicroSim demonstrates:

- **p5.js** for rendering the animation and controls
- **Responsive design** that adapts to container width
- **Event handling** for mouse, touch, and keyboard input
- **State management** for tracking animation progress and settings

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| Left Arrow | Step backward |
| Right Arrow | Step forward |
| R | Reset to start |
| L | Toggle loop |

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// Animation Control Guide MicroSim
// Shows best practices for animation controls

let isPlaying = false;
let animationTime = 0;
let animationDuration = 100;
let animationSpeed = 1.0;
let loopEnabled = false;

function setup() {
  updateCanvasSize();
  createCanvas(canvasWidth, canvasHeight);
  textFont('Arial');
}

function draw() {
  background(248, 250, 252);

  if (isPlaying) {
    animationTime += animationSpeed;
    if (animationTime >= animationDuration) {
      if (loopEnabled) {
        animationTime = 0;
      } else {
        isPlaying = false;
      }
    }
  }

  drawViewport();
  drawTransportControls();
  drawScrubber();
  drawSpeedControl();
}

function keyPressed() {
  if (key === ' ') {
    isPlaying = !isPlaying;
    return false;
  }
}
```

## References

- [W3C WAI-ARIA Practices - Media Player](https://www.w3.org/WAI/ARIA/apg/) - Accessibility guidelines for media controls
- [Material Design - Progress Indicators](https://material.io/components/progress-indicators) - Design patterns for progress visualization
- [Nielsen Norman Group - Animation for Attention](https://www.nngroup.com/articles/animation-usability/) - Research on animation in user interfaces
