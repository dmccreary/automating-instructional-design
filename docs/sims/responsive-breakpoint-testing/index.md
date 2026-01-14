---
title: Responsive Breakpoint Testing
description: An interactive visualization for evaluating MicroSim adaptability across device sizes, from desktop to mobile.
image: /sims/responsive-breakpoint-testing/responsive-breakpoint-testing.png
og:image: /sims/responsive-breakpoint-testing/responsive-breakpoint-testing.png
twitter:image: /sims/responsive-breakpoint-testing/responsive-breakpoint-testing.png
social:
   cards: false
---

# Responsive Breakpoint Testing

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[Run the Responsive Breakpoint Testing Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit Using the p5.js Editor](https://editor.p5js.org/)

## Description

This interactive MicroSim demonstrates how educational simulations adapt across different device sizes and breakpoints. It displays four device mockups side by side - Desktop (1920px), Laptop (1366px), Tablet (768px), and Mobile (375px) - each showing how the same MicroSim layout adjusts for different screen sizes.

### Key Features

- **Device Mockups**: Realistic representations of desktop monitors, laptops, tablets, and mobile phones
- **Layout Visualization**: Shows how canvas and control panel positions change at each breakpoint
- **Traffic Light Indicators**: Green (pass), yellow (issues), and red (fail) status for each device
- **Interactive Checklists**: Click any device to view its detailed responsive design checklist

### What Changes at Each Breakpoint

**Desktop (1920px)**
- Control panel positioned on the right side
- Full horizontal layout with ample spacing
- Standard font sizes for comfortable reading
- Mouse-optimized click targets

**Laptop (1366px)**
- Slightly condensed layout
- Side panel may narrow but remains horizontal
- Font sizes maintained
- Mouse interactions still primary

**Tablet (768px)**
- Control panel moves from side to bottom
- Vertical stacking of elements begins
- Touch targets increase to minimum 44px
- Fonts scale proportionally

**Mobile (375px)**
- Single column layout
- All controls positioned below canvas
- Large touch targets (48px+) for thumb navigation
- Increased font weight for readability

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/responsive-breakpoint-testing/main.html" height="500px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will apply responsive design testing criteria to evaluate MicroSim adaptability across device sizes, identifying potential usability issues at different breakpoints.

### Pre-Assessment (3 minutes)

Ask students:

- "What devices do you use most often to access educational content?"
- "Have you ever encountered a learning application that did not work well on your phone or tablet?"

### Guided Exploration (10 minutes)

#### Part 1: Understanding Breakpoints (5 minutes)

1. Observe the four device mockups and their relative sizes
2. Note how the MicroSim layout differs in each device
3. Identify which devices show horizontal vs. vertical control panels
4. Discuss why the layout changes are necessary

#### Part 2: Evaluating Responsiveness (5 minutes)

1. Click on the Desktop device to view its checklist
2. Note all items are checked (green) - this device passes all tests
3. Click on the Mobile device
4. Identify which checklist items are not yet checked
5. Discuss what "single column layout" and "48px touch targets" mean

### Application Activity (10 minutes)

In pairs, students should:

1. **Analyze the Traffic Lights**: Why do Desktop and Laptop show green while Tablet and Mobile show yellow?

2. **Create a Testing Plan**: For a MicroSim you are designing, list three things you would test at each breakpoint

3. **Prioritize Fixes**: If you could only fix two issues on mobile, which would you choose and why?

4. **Document Requirements**: Write responsive design requirements for a new MicroSim project

### Discussion Questions (5 minutes)

1. Why is 768px often used as the tablet breakpoint?
2. What is the minimum touch target size recommended for mobile, and why?
3. How does moving controls to the bottom improve mobile usability?
4. When might a MicroSim choose to disable certain features on mobile rather than adapt them?

### Assessment

Students demonstrate understanding by:

- Explaining the purpose of responsive breakpoints
- Identifying layout changes needed for different devices
- Evaluating a MicroSim design against the device checklists
- Proposing solutions for responsive design issues

## Technical Background

### Common Breakpoints

| Device Category | Common Breakpoints |
|----------------|-------------------|
| Mobile | < 480px, < 576px |
| Tablet Portrait | 768px |
| Tablet Landscape | 1024px |
| Laptop | 1366px |
| Desktop | 1920px+ |

### Touch Target Guidelines

- **iOS Human Interface Guidelines**: Minimum 44 x 44 points
- **Material Design**: Minimum 48 x 48 dp
- **WCAG 2.1**: Minimum 44 x 44 CSS pixels for Level AAA

### Layout Adaptation Strategies

1. **Reflow**: Content reorganizes to fit available width
2. **Resize**: Elements scale proportionally
3. **Reveal/Hide**: Secondary content hidden on smaller screens
4. **Reposition**: Controls move from side to bottom

## References

- Google Material Design Responsive Layout Grid
- Apple Human Interface Guidelines - Adaptivity and Layout
- W3C WCAG 2.1 Target Size Guidelines
- Nielsen Norman Group: Mobile Usability Research
