---
title: Acceptance Test Matrix
description: An interactive matrix for tracking MicroSim acceptance criteria across functional, pedagogical, technical, and assessment dimensions with pass/fail tracking and markdown export.
image: /sims/acceptance-test-matrix/acceptance-test-matrix.png
og:image: /sims/acceptance-test-matrix/acceptance-test-matrix.png
twitter:image: /sims/acceptance-test-matrix/acceptance-test-matrix.png
social:
   cards: false
---

# Acceptance Test Matrix

<iframe src="main.html" height="700px" width="100%" scrolling="no"></iframe>

[Run the Acceptance Test Matrix Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive matrix helps instructional designers, developers, and QA testers systematically evaluate whether a MicroSim meets all acceptance criteria before deployment. The matrix organizes tests across four critical dimensions, each with specific pass/fail criteria.

### How to Use

1. **Click any test item** to cycle its status: Untested (gray) -> Pass (green) -> Fail (red) -> Untested
2. **Hover over items** to see detailed descriptions of what each test verifies
3. **Track progress** using the overall coverage score and progress bar at the top
4. **Export results** as a markdown checklist for documentation or sharing
5. **Reset all** to start a fresh evaluation
6. **Pass all** to quickly mark everything as passing (useful for baseline comparisons)

Your test results are **automatically saved** in your browser's localStorage.

### The Four Evaluation Dimensions

#### Functional (Green)
Verifies that the MicroSim works correctly from a user's perspective:

- **Controls respond within 16ms**: Immediate response to user input
- **Reset returns to defaults**: Clean state restoration
- **No UI overlap at any width**: Responsive layout integrity
- **Keyboard navigation works**: Full keyboard accessibility
- **Animation maintains 60fps**: Smooth visual performance
- **All specified states reachable**: Complete functionality coverage

#### Pedagogical (Blue)
Ensures the MicroSim effectively supports learning:

- **Cause-effect visible**: Clear relationship between input and output
- **Misconception addressed**: Active correction of common errors
- **Objective achievable in <=15min**: Appropriate scope for learning
- **Scaffolding appropriate**: Balanced support for different skill levels
- **Feedback immediate and clear**: Instant, understandable responses

#### Technical (Orange)
Confirms implementation quality and standards:

- **Runs in p5.js editor**: Compatible with standard development environment
- **Responsive design works**: Adapts to all screen sizes
- **Accessibility included**: ARIA labels and keyboard support
- **Loads in <3 seconds**: Fast initial render
- **No console errors**: Clean JavaScript execution

#### Assessment-Ready (Purple)
Validates integration with learning management systems:

- **Interactions loggable**: Events can be captured for analytics
- **Completion detectable**: Learning objective achievement is measurable
- **Events deterministic**: Reproducible outcomes for assessment
- **Timestamps available**: Time-based analysis support
- **Errors distinguishable**: Student vs system errors are identifiable

## Learning Objective

Students will be able to evaluate whether a MicroSim meets all acceptance criteria across functional, pedagogical, technical, and assessment dimensions using this systematic testing framework.

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/acceptance-test-matrix/main.html" height="700px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Objectives

By completing this activity, students will be able to:

1. Identify the four dimensions of MicroSim quality evaluation
2. Apply specific acceptance criteria to evaluate a MicroSim
3. Document test results in a shareable format
4. Prioritize issues based on category and impact

### Suggested Activities

1. **Self-Evaluation (10 min)**: Use the matrix to evaluate a MicroSim you have created. Export the results as markdown.

2. **Peer Review (15 min)**: Exchange MicroSims with a partner. Each person evaluates the other's work using the matrix. Compare exported results and discuss discrepancies.

3. **Gap Analysis (10 min)**: After testing multiple MicroSims, identify which categories consistently have the most failures. Discuss why these areas might be challenging.

4. **Priority Ranking (10 min)**: Given a MicroSim with failures in multiple categories, decide which failures should be fixed first. Consider: Which failures prevent learning? Which are quick fixes?

### Assessment

- Compare coverage scores before and after implementing fixes
- Evaluate the quality of peer review feedback based on specificity and actionability
- Track improvement in first-pass acceptance rates over time

## References

- Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann.
- Mayer, R.E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.
- W3C. (2018). Web Content Accessibility Guidelines (WCAG) 2.1.
- xAPI (Experience API). Advanced Distributed Learning Initiative.
