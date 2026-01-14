---
title: Evaluation Rubric Builder
description: An interactive tool for creating custom evaluation rubrics by selecting and weighting criteria from categories including Technical, Pedagogical, UX Design, and Domain-Specific considerations.
image: /sims/evaluation-rubric-builder/evaluation-rubric-builder.png
og:image: /sims/evaluation-rubric-builder/evaluation-rubric-builder.png
twitter:image: /sims/evaluation-rubric-builder/evaluation-rubric-builder.png
quality_score: 85
social:
   cards: false
---

# Evaluation Rubric Builder

<iframe src="main.html" height="620px" width="100%" scrolling="no"></iframe>

[Run the Evaluation Rubric Builder Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Evaluation Rubric Builder Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## About This MicroSim

This interactive tool helps instructional designers and educators create custom evaluation rubrics for assessing MicroSims, educational content, or any learning resource. The rubric builder allows you to select criteria from a categorized bank, adjust their relative weights, and export the final rubric in multiple formats.

### How to Use

1. **Browse the Criterion Bank** (left panel): Click category headers to expand/collapse. Categories include Technical, Pedagogical, UX Design, and Domain-Specific criteria.

2. **Add Criteria to Your Rubric**: Click the + button next to any criterion to add it to your active rubric.

3. **Adjust Weights** (right panel): Use the sliders to set the relative importance of each criterion. The total should sum to 100%.

4. **Auto-Balance**: Click the "Auto-Balance Weights" button to distribute weights evenly across all selected criteria.

5. **Add Custom Criteria**: Enter custom criterion text in the input field and click "Add Custom Criterion" to include domain-specific requirements not in the standard bank.

6. **Export Your Rubric**:
   - **Markdown**: Creates a formatted table suitable for documentation
   - **JSON**: Creates structured data for integration with automated systems

7. **Reset**: Click "Reset to Default" to restore the standard completeness rubric.

### The Four Criterion Categories

#### Technical
Evaluates implementation quality:
- Code runs without errors
- Responsive design works
- Performance is acceptable
- Browser compatibility
- Accessibility standards met
- Code is well-documented

#### Pedagogical
Assesses educational effectiveness:
- Learning objective achieved
- Bloom's taxonomy level appropriate
- Scaffolding supports learning
- Feedback is meaningful
- Prerequisites clearly stated
- Content accuracy verified

#### UX Design
Measures user experience quality:
- Interface is intuitive
- Visual hierarchy is clear
- Controls are discoverable
- Color scheme is appropriate
- Labels and text are readable
- Consistent styling throughout

#### Domain-Specific
Validates subject matter accuracy:
- Subject accuracy
- Real-world relevance
- Appropriate complexity
- Expert-reviewed content
- Current best practices
- Standards alignment

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/evaluation-rubric-builder/main.html" height="620px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify criteria relevant to evaluating educational simulations
2. Create weighted rubrics appropriate for different evaluation contexts
3. Balance criterion weights to sum to 100%
4. Export rubrics in formats suitable for manual and automated evaluation

### Bloom's Taxonomy Level

**Create (L6)**: This activity requires students to synthesize multiple criteria into a coherent evaluation framework, making decisions about inclusion, exclusion, and relative weighting based on their educational context.

### Suggested Activities

1. **Default Rubric Analysis (5 min)**: Examine the pre-loaded rubric and discuss why those criteria were selected and weighted as defaults.

2. **Context-Specific Rubric (15 min)**: Create a rubric tailored to a specific domain (e.g., K-12 math, corporate training, higher education science). Justify your criterion selections.

3. **Peer Review Exchange (10 min)**: Export your rubric and exchange with a partner. Use their rubric to evaluate a sample MicroSim and provide feedback on the rubric's effectiveness.

4. **Comparative Evaluation (20 min)**: Create two different rubrics with different priorities (e.g., "Technical Focus" vs "Pedagogical Focus"). Apply both to the same MicroSim and compare results.

### Assessment

- Rubric completeness: All weights sum to 100%
- Appropriateness: Criterion selection matches stated evaluation goals
- Justification: Can articulate why each criterion was included/excluded
- Application: Successfully uses rubric to evaluate a sample MicroSim

## References

- Wiggins, G., & McTighe, J. (2005). Understanding by Design (2nd ed.). ASCD.
- Brookhart, S.M. (2013). How to Create and Use Rubrics for Formative Assessment and Grading. ASCD.
- Clark, R.C. & Mayer, R.E. (2016). E-Learning and the Science of Instruction (4th ed.). Wiley.
