---
title: Prompt Engineering Practices
description: An interactive infographic providing a quick reference for crafting effective MicroSim generation prompts, organized into five expandable sections with good and bad examples.
image: /sims/prompt-engineering-practices/prompt-engineering-practices.png
og:image: /sims/prompt-engineering-practices/prompt-engineering-practices.png
twitter:image: /sims/prompt-engineering-practices/prompt-engineering-practices.png
quality_score: 85
social:
   cards: false
---

# Prompt Engineering Practices

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Prompt Engineering Practices Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit Prompt Engineering Practices Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## About This MicroSim

This interactive infographic provides a quick reference guide for crafting effective prompts when generating MicroSims with AI assistance. Each section represents a critical aspect of prompt engineering, with expandable cards revealing detailed checklists and hoverable items that show good and bad examples.

### How to Use

1. **Click section headers** to expand or collapse each practice category
2. **Hover over checklist items** to see specific good and bad examples
3. **Note the impact meters** showing relative importance (High/Medium)
4. **Use as a checklist** when crafting your own MicroSim prompts

### The Five Practice Categories

#### 1. Context Setting (High Impact)

Before diving into specifications, establish the foundation:

- **Educational purpose**: What will students learn?
- **Audience level**: Grade level, prior knowledge
- **Subject domain**: Specific topic area
- **Output type**: Type of visualization or simulation

#### 2. Specification Depth (High Impact)

Provide comprehensive details for accurate generation:

- **Learning objectives**: Specific, measurable outcomes
- **Visual elements**: All shapes, colors, layouts
- **Interactions**: User inputs and responses
- **Parameters**: Ranges, defaults, constraints
- **Edge cases**: Boundary conditions and error handling

#### 3. Technical Constraints (Medium Impact)

Define the implementation boundaries:

- **Libraries/frameworks**: p5.js, vis-network, etc.
- **File structure**: Expected output files
- **Dependencies**: External resource limitations
- **Platform targets**: Browser and device support

#### 4. Examples & Patterns (Medium Impact)

Provide reference points for consistency:

- **Code structure**: Organization patterns
- **Naming conventions**: Variable and file naming
- **Style patterns**: Visual design consistency
- **Similar references**: Existing MicroSims to emulate

#### 5. Output Format (High Impact)

Specify what you expect to receive:

- **File format**: Separate files or combined
- **Completeness**: No placeholders or TODOs
- **Comments**: Documentation expectations

## Best Practices Summary

| Practice | Impact | Key Consideration |
|----------|--------|-------------------|
| Context Setting | High | Always start with the "why" |
| Specification Depth | High | More detail = fewer revisions |
| Technical Constraints | Medium | Prevents compatibility issues |
| Examples & Patterns | Medium | Ensures consistency |
| Output Format | High | Clear expectations = better results |

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/prompt-engineering-practices/main.html" height="552px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify the five key categories of effective MicroSim prompts
2. Distinguish between good and bad prompt examples
3. Apply the checklist when writing their own prompts
4. Understand the relative importance of different prompt elements

### Suggested Activities

1. **Self-Assessment (10 min)**: Review a previous prompt you wrote and check it against each category
2. **Prompt Improvement (15 min)**: Take a minimal prompt and expand it using all five categories
3. **Peer Review (10 min)**: Exchange prompts with a partner and provide feedback using the checklist
4. **A/B Testing (20 min)**: Generate MicroSims from minimal vs. comprehensive prompts and compare results

### Assessment

- Compare generation success rates between prompts with different levels of completeness
- Evaluate the quality of first-generation outputs based on prompt thoroughness
- Track revision cycles needed for different prompt quality levels

## References

- OpenAI. (2024). Prompt Engineering Guide.
- Anthropic. (2024). Claude Prompt Design Guidelines.
- Reynolds, L., & McDonell, K. (2021). Prompt Programming for Large Language Models.
