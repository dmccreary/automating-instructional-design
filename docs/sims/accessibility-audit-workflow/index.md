---
title: Accessibility Audit Workflow
description: An interactive flowchart for conducting systematic accessibility audits on MicroSims, evaluating keyboard navigation, screen reader compatibility, color contrast, motion, and touch accessibility.
image: /sims/accessibility-audit-workflow/accessibility-audit-workflow.png
og:image: /sims/accessibility-audit-workflow/accessibility-audit-workflow.png
twitter:image: /sims/accessibility-audit-workflow/accessibility-audit-workflow.png
quality_score: 85
social:
   cards: false
---

# Accessibility Audit Workflow

<iframe src="main.html" height="802px" width="100%" scrolling="no"></iframe>

[Run the Accessibility Audit Workflow Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Accessibility Audit Workflow Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## About This MicroSim

This interactive flowchart guides instructional designers and developers through a systematic accessibility audit for MicroSims. Each test phase evaluates a different accessibility dimension, helping ensure that educational simulations are usable by all learners, including those with disabilities.

### How to Use

1. **Click on test nodes** to mark them as Pass (right side) or Fail (left side)
2. **View test details** by clicking on any node to see the specific questions to evaluate
3. **Track progress** using the status indicator showing passed, failed, and pending tests
4. **Reset** using the Reset All button to start a new audit

### The Eight Audit Phases

#### 1. Begin Accessibility Audit
Start the systematic audit process. Each test evaluates a different dimension of accessibility.

#### 2. Keyboard Navigation
Verify that all interactive elements can be operated using only the keyboard:

- Can you Tab to all controls?
- Can you activate all buttons with Enter/Space?
- Is focus visible at all times?

#### 3. Screen Reader Compatibility
Ensure screen readers can convey the simulation state:

- Does `describe()` provide current state?
- Are all controls labeled?
- Are live regions announcing changes?

#### 4. Color and Contrast
Check that visual information is accessible:

- Does it pass WCAG contrast ratios (4.5:1 for normal text)?
- Is color not the only differentiator?
- Is it usable in grayscale?

#### 5. Motion and Animation
Verify that motion can be controlled:

- Does it respect `prefers-reduced-motion`?
- Can animations be paused?
- Is there a static alternative?

#### 6. Touch and Motor
Ensure the simulation works for users with motor impairments:

- Are touch targets at least 44x44 pixels?
- Is precision not required for interactions?
- Are there keyboard alternatives to drag operations?

#### 7. Generate Audit Report
Review all test results:

- List all passed tests
- List all failed tests with severity
- Prioritize fixes based on impact

#### 8. Audit Complete
The accessibility audit is finished. Address any failed tests to improve MicroSim accessibility.

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/accessibility-audit-workflow/main.html" height="602px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify the five key dimensions of accessibility testing
2. Evaluate MicroSims against accessibility criteria
3. Prioritize accessibility fixes based on impact and severity
4. Apply systematic audit methodology to new projects

### Suggested Activities

1. **Guided Audit (15 min)**: Use this flowchart to audit an existing MicroSim together as a class
2. **Peer Review (20 min)**: Exchange MicroSims with a partner and conduct independent audits, then compare findings
3. **Fix Prioritization (10 min)**: Given a list of audit failures, discuss which issues to fix first and why
4. **Accessibility Improvement (30 min)**: Take one failed test and implement the fix in code

### Assessment

- Compare audit results between students for the same MicroSim
- Track improvement in accessibility scores after implementing fixes
- Evaluate completeness of audit documentation

## WCAG Reference

This audit workflow is based on the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA criteria:

| Test Category | Related WCAG Criteria |
|---------------|----------------------|
| Keyboard Navigation | 2.1.1 Keyboard, 2.4.7 Focus Visible |
| Screen Reader | 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value |
| Color and Contrast | 1.4.3 Contrast (Minimum), 1.4.1 Use of Color |
| Motion and Animation | 2.3.3 Animation from Interactions |
| Touch and Motor | 2.5.5 Target Size, 2.5.1 Pointer Gestures |

## References

- W3C Web Accessibility Initiative (WAI). [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- WebAIM. [Introduction to Web Accessibility](https://webaim.org/intro/)
- Processing Foundation. [p5.js Web Accessibility](https://p5js.org/learn/accessibility.html)
