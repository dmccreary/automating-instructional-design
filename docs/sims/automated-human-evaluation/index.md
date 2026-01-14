---
title: Automated vs Human Evaluation Matrix
description: An interactive 2x2 matrix that helps students distinguish evaluation criteria suitable for automation versus those requiring human judgment.
image: /sims/automated-human-evaluation/automated-human-evaluation.png
og:image: /sims/automated-human-evaluation/automated-human-evaluation.png
twitter:image: /sims/automated-human-evaluation/automated-human-evaluation.png
quality_score: 85
social:
   cards: false
---

# Automated vs Human Evaluation Matrix

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Automated vs Human Evaluation Matrix Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/...){ .md-button }

## About This MicroSim

This interactive MicroSim presents a 2x2 matrix that helps learners analyze and categorize different types of evaluation criteria based on two dimensions:

- **Evaluation Type** (horizontal axis): Ranges from fully automated evaluation to human-centered evaluation
- **Criteria Type** (vertical axis): Ranges from objective, measurable criteria to subjective, judgment-based criteria

### The Four Quadrants

#### 1. Fully Automated (Bottom-Left, Green)
Objective criteria that can be completely automated:

- **File existence checks** - Verify required files and assets are present
- **Code syntax validation** - Parse code to check for syntax errors
- **Responsive breakpoint testing** - Automatically test layouts at different viewport sizes
- **Accessibility checkers** - Automated tools for contrast ratios, alt text, ARIA labels
- **Link validation** - Crawl and verify all internal and external links

#### 2. Human-Assisted Automation (Bottom-Right, Blue)
Objective criteria that benefit from human oversight:

- **Quality score calculation** - Automated metrics with human-defined thresholds
- **Pattern matching against standards** - Match patterns with human verification of edge cases
- **Automated testing with human review** - Run tests, then have humans review results

#### 3. Automation-Assisted Human (Top-Left, Yellow)
Subjective criteria where automation supports human judgment:

- **Code review with linting suggestions** - Linting helps humans focus on logic and design
- **A11y audit with manual verification** - Automated scans identify issues for manual review
- **Performance profiling with interpretation** - Tools gather data, humans interpret significance

#### 4. Fully Human (Top-Right, Orange)
Subjective criteria requiring human judgment:

- **Pedagogical effectiveness assessment** - Does content actually teach the intended concepts?
- **User experience intuition** - Evaluating flow, feel, and emotional response
- **Learning objective alignment** - Do activities truly support stated learning goals?
- **Engagement quality** - Measuring genuine interest and motivation
- **Cultural appropriateness** - Ensuring content respects diverse backgrounds

### How to Use

1. **Hover** over criteria items to see detailed descriptions
2. **Click** on quadrants to highlight them for discussion
3. **Toggle** the workflow view to see how evaluations typically flow from automated to human review

## Learning Objectives

By using this MicroSim, learners will be able to:

1. **Analyze** which evaluation criteria can be automated versus which require human judgment
2. **Categorize** evaluation methods based on objectivity and automation potential
3. **Design** evaluation workflows that appropriately balance automated and human review
4. **Recognize** the strengths and limitations of both automated and human evaluation

## Pedagogical Value

Understanding the spectrum from automated to human evaluation is essential for:

- **Instructional designers** planning quality assurance processes
- **Developers** implementing testing and validation pipelines
- **Project managers** allocating review resources effectively
- **Educators** designing assessment strategies for learning content

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/automated-human-evaluation/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Related Concepts

- Automated testing frameworks
- Human-in-the-loop systems
- Quality assurance pipelines
- Accessibility evaluation
- Pedagogical review processes
