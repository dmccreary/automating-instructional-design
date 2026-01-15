---
title: Accessibility Audit Workflow (Mermaid)
description: Interactive Mermaid-based flowchart for conducting systematic accessibility audits on MicroSims with Pass/Fail tracking.
image: /sims/accessibility-audit-mermaid/accessibility-audit-mermaid.png
quality_score: 85
---

# Accessibility Audit Workflow (Mermaid Version)

<iframe src="main.html" width="100%" height="700" style="border:1px solid silver;" scrolling="no"></iframe>

[View Fullscreen](main.html){: target="_blank" }

## Overview

This interactive workflow diagram guides you through a systematic accessibility audit for MicroSims. Built with Mermaid.js for the flowchart rendering and enhanced with JavaScript for interactive Pass/Fail tracking.

## How to Use

1. **Review each test step** by hovering over the nodes to see the specific questions to ask
2. **Click Pass or Fail** buttons below each test node to record results
3. **Track progress** in the status bar showing passed, failed, and pending tests
4. **Reset All** to start a new audit

## Workflow Steps

1. **Begin Accessibility Audit** - Start the systematic audit process
2. **Keyboard Navigation** - Test that all controls are keyboard accessible
3. **Screen Reader Compatibility** - Verify screen reader support
4. **Color and Contrast** - Check WCAG contrast compliance
5. **Motion and Animation** - Ensure motion preferences are respected
6. **Touch and Motor** - Validate touch target sizes and motor accessibility
7. **Generate Audit Report** - Review all test results
8. **Audit Complete** - Address any failed tests

## Key Accessibility Tests

### Test 1: Keyboard Navigation
- Can you Tab to all controls?
- Can you activate buttons with Enter/Space?
- Is focus visible at all times?

### Test 2: Screen Reader Compatibility
- Does describe() provide current state?
- Are all controls labeled?
- Are live regions announcing changes?

### Test 3: Color and Contrast
- Does it pass WCAG contrast ratios?
- Is color not the only differentiator?
- Is it usable in grayscale?

### Test 4: Motion and Animation
- Does it respect prefers-reduced-motion?
- Can animations be paused?
- Is there a static alternative?

### Test 5: Touch and Motor
- Are touch targets >= 44x44px?
- Is precision not required?
- Are there keyboard alternatives to drag?

## Implementation Notes

This version uses:
- **Mermaid.js** for the flowchart diagram rendering
- **JavaScript overlays** for interactive Pass/Fail buttons
- **Dynamic node coloring** based on test results
- **Tooltips** showing test questions on hover

## Lesson Plan

### Learning Objectives
- Understand the five key dimensions of MicroSim accessibility
- Apply a systematic audit process to evaluate accessibility
- Identify and prioritize accessibility improvements

### Suggested Activities
1. Run the audit on a sample MicroSim
2. Document findings for each test category
3. Prioritize fixes based on impact and effort
4. Re-audit after implementing improvements

### Assessment
- Complete audit of at least one MicroSim
- Written report documenting findings and recommendations
- Demonstration of fixes implemented

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [p5.js Accessibility](https://p5js.org/learn/accessibility.html)
- [Mermaid.js Documentation](https://mermaid.js.org/)
