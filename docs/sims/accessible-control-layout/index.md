---
title: Accessible Control Layout
description: An interactive diagram showing recommended MicroSim structure with proper accessibility for mouse, keyboard, and screen reader users.
image: /sims/accessible-control-layout/accessible-control-layout.png
og:image: /sims/accessible-control-layout/accessible-control-layout.png
twitter:image: /sims/accessible-control-layout/accessible-control-layout.png
social:
   cards: false
---

# Accessible Control Layout

<iframe src="main.html" height="430px" width="100%" scrolling="no"></iframe>

[Run the Accessible Control Layout Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Accessible Control Layout Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/H9W-HNkDI)

## Description

This interactive MicroSim demonstrates the recommended layout structure for creating accessible educational simulations. It shows three key sections that should be vertically stacked for optimal accessibility:

1. **Canvas Area** - The visual simulation at the top
2. **Status Area** - Text-based feedback in the middle
3. **Control Panel** - Interactive controls at the bottom

### Key Accessibility Principles

The layout demonstrates several critical accessibility principles:

- **Controls below canvas, not overlapping**: Placing controls below the canvas ensures they are reachable via keyboard navigation and do not interfere with visual content.

- **Logical tab order**: Users navigating with Tab key should move left-to-right, top-to-bottom through controls.

- **Screen reader support**: The canvas uses `describe()` to provide content descriptions, and the status area uses `aria-live` to announce changes.

- **Visible focus indicators**: All interactive elements show clear visual feedback when focused.

### Interactive Features

- **Click on sections** to see detailed accessibility requirements for each area
- **Toggle Tab navigation flow** to visualize the keyboard navigation path
- **Reset View** to return to the overview

## The Three Sections

### Canvas Area (Top)

The visual simulation area where graphical content is displayed:

- Full-width responsive canvas
- Uses `describe()` to provide screen reader descriptions
- Shows focus indicator when canvas receives focus
- Contains all visual simulation elements

### Status Area (Middle)

A text-based output region for simulation state:

- Uses `aria-live="polite"` for dynamic announcements
- Displays current values in text form
- Provides non-visual feedback for simulation changes
- Keeps announcements concise and meaningful

### Control Panel (Bottom)

The interactive control section:

- Contains sliders with visible labels
- Includes action buttons (Start, Pause, Reset)
- All controls reachable via Tab key
- Clear focus indicators on all interactive elements
- Tab order flows logically left-to-right, top-to-bottom

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/accessible-control-layout/main.html" height="600px" scrolling="no"></iframe>
```

## Design Guidelines

When implementing this layout in your own MicroSims:

1. **Never place controls overlapping the canvas** - They may be unreachable for keyboard users
2. **Always provide text alternatives** - Use `describe()` for canvas content
3. **Use semantic HTML** - Labels should be associated with their controls
4. **Test with keyboard only** - Ensure all functionality works without a mouse
5. **Test with screen readers** - Verify announcements are meaningful and timely
6. **Maintain contrast ratios** - Focus indicators should meet WCAG requirements (at least 3:1)

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [p5.js Accessibility](https://p5js.org/learn/accessibility.html)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [MDN ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
