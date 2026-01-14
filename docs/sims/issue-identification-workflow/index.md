---
title: Issue Identification Workflow
description: An interactive decision tree with testing checkpoints for systematically finding and categorizing issues in generated MicroSim code, guiding users through syntax checks, load tests, visual inspection, functional testing, edge cases, specification review, and code quality assessment.
image: /sims/issue-identification-workflow/issue-identification-workflow.png
og:image: /sims/issue-identification-workflow/issue-identification-workflow.png
twitter:image: /sims/issue-identification-workflow/issue-identification-workflow.png
quality_score: 85
social:
   cards: false
---

# Issue Identification Workflow

<iframe src="main.html" height="752px" width="100%" scrolling="no"></iframe>

[Run the Issue Identification Workflow Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Issue Identification Workflow Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## About This MicroSim

This interactive decision tree provides a systematic approach to finding and categorizing issues in generated MicroSim code. Each checkpoint represents a distinct testing phase with specific actions, decision points, and severity classifications.

### How to Use

1. **Click on checkpoint nodes** to cycle through states: Pending > In Progress > Complete
2. **View checkpoint details** by clicking on any node to see the action, decision, and checklist
3. **Track progress** using the indicator showing completed and in-progress checkpoints
4. **Reset** using the Reset All button to start a new issue identification session

### Severity Color Coding

| Color | Severity | Impact |
|-------|----------|--------|
| Red | Blocker | Prevents any further testing; must fix immediately |
| Orange | Critical | Core functionality broken; high priority fix |
| Yellow | Major | Significant issues affecting user experience |
| Green | Minor/Enhancement | Polish items and suggested improvements |

## The Seven Checkpoints

### Checkpoint 1: Syntax Check (Blocker)

**Action:** Open code in editor, check for red underlines

**Decision:** Are there syntax errors?

- **Yes:** Log as Blocker, request fix immediately
- **No:** Continue to next checkpoint

**Checklist:**

- No red underlines in editor
- No syntax highlighting errors
- All brackets and braces matched

### Checkpoint 2: Load Test (Blocker/Critical)

**Action:** Open in browser

**Decision:** Does it load without console errors?

- **No:** Examine console, log as Blocker or Critical
- **Yes:** Continue to visual inspection

**Checklist:**

- Page loads without errors
- No console errors
- Canvas/visualization appears

### Checkpoint 3: Visual Inspection (Major/Minor)

**Action:** Compare to specification mockup

**Decision:** Are there visual issues?

- **Yes:** Log as Major or Minor depending on severity
- **Continue regardless**

**Checklist:**

- Layout matches specification
- Colors are correct
- All controls are present
- Labels are readable

### Checkpoint 4: Functional Testing (Critical/Major)

**Action:** Test each control and interaction

**Decision:** Are there functional issues?

- **Yes:** Log issues as Critical or Major
- **No:** Continue to edge case testing

**Checklist:**

- Default values are correct
- Range controls work properly
- Changes update visualization
- Edge cases are handled

### Checkpoint 5: Edge Case Testing (Major)

**Action:** Try unusual inputs

**Decision:** Are there edge case issues?

- **Yes:** Log issues found
- **No:** Continue to specification review

**Checklist:**

- Minimum values work
- Maximum values work
- Rapid changes handled gracefully
- Browser resize works correctly

### Checkpoint 6: Specification Review (Major/Minor)

**Action:** Compare to specification line by line

**Decision:** Are there specification deviations?

- **Yes:** Log deviations with appropriate severity
- **No:** Continue to quality review

**Checklist:**

- All specified features are present
- Behavior matches specification
- Output format is correct
- Performance is acceptable

### Checkpoint 7: Quality Review (Minor/Enhancement)

**Action:** Perform code review

**Decision:** Are there quality issues?

- **Yes:** Log as Minor or Enhancement
- **No:** Complete workflow

**Checklist:**

- Comments are present
- Code is organized
- Accessibility features included
- Best practices followed

## After Completion

Once all checkpoints are complete:

1. **Priority Sorting:** Organize issues by severity (Blocker > Critical > Major > Minor > Enhancement)
2. **Refinement Prompt:** Generate a detailed prompt listing all issues for the AI to address
3. **Iteration:** Submit the refinement prompt and repeat the workflow on the updated code

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/issue-identification-workflow/main.html" height="752px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Apply a systematic approach to code testing and issue identification
2. Classify issues by severity level using standard categories
3. Document issues clearly for AI refinement prompts
4. Prioritize fixes based on impact and severity

### Suggested Activities

1. **Guided Walkthrough (15 min):** Use this workflow to identify issues in a sample MicroSim with intentional bugs
2. **Issue Classification (10 min):** Given a list of issues, practice assigning appropriate severity levels
3. **Refinement Prompt Writing (15 min):** Write a clear refinement prompt based on identified issues
4. **Peer Review (20 min):** Exchange generated MicroSims and conduct independent issue identification

### Assessment

- Evaluate completeness of issue identification
- Check accuracy of severity classifications
- Review quality of refinement prompts generated
- Track improvement in generated code quality over iterations

## References

- ISO/IEC 25010:2011 - Systems and software quality requirements and evaluation
- [ISTQB Foundation Level Syllabus](https://www.istqb.org/)
- Software Testing Fundamentals - Myers, G.J., Sandler, C., & Badgett, T.
