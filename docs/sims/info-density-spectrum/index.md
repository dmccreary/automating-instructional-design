# Information Density Spectrum

<iframe src="main.html" width="100%" height="500" style="border: none; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"></iframe>

<a href="main.html" target="_blank" class="button">Full Screen</a>
<a href="https://editor.p5js.org/" target="_blank" class="button">Edit in p5.js Editor</a>

## About This MicroSim

This interactive visualization helps instructional designers understand how information density affects learning outcomes across different audience types. Finding the optimal density level is critical for creating effective educational materials.

### The Three Density Zones

**Too Sparse** (Red Zone - Left) represents screens with excessive whitespace and minimal content. While cognitively easy to process, sparse layouts waste screen space, require excessive scrolling, and may leave learners feeling the content lacks substance.

**Optimal Zone** (Green Zone - Center) represents the sweet spot where information is efficiently organized without overwhelming the learner. This zone shifts based on the target audience, with novices needing sparser layouts and experts tolerating denser presentations.

**Too Dense** (Red Zone - Right) represents screens packed with information that risk cognitive overload. While comprehensive, dense layouts overwhelm novice learners, increase the chance of missing important details, and require significant mental effort to process.

### Key Insight

The optimal density zone is not fixed. It shifts based on your target audience:

- **Novice Learners**: Need more whitespace, fewer elements, and gradual information reveal
- **Intermediate Learners**: Can handle moderate density with good organization
- **Expert Learners**: Prefer denser layouts for efficiency, but still need clear structure

## How to Use

1. **Adjust the Density Slider** to see how a screen morphs from sparse to dense
2. **Select Different Audiences** to watch the optimal zone shift on the spectrum
3. **Hover over each example screen** to see detailed pros, cons, and usage guidance
4. **Compare the metrics** below each screen: whitespace percentage, element count, and cognitive load

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Identify the three density zones and their characteristics
2. Evaluate information density levels for appropriateness given a target audience
3. Explain why optimal density varies by audience expertise level
4. Apply density principles when designing instructional materials

### Discussion Questions

1. Think of a dashboard or learning interface you use regularly. Where would you place it on the density spectrum? Is it appropriate for its intended audience?

2. How might the same content be presented at different density levels for a middle school student versus a graduate student?

3. What visual and structural elements contribute to perceived density beyond just the amount of content?

4. How do mobile devices change our thinking about information density compared to desktop displays?

### Activity: Density Audit

Have students:

1. Select an existing educational resource (website, app, or document)
2. Identify the apparent target audience
3. Rate the information density on a 0-100 scale
4. Determine if the density is appropriate for the audience
5. Propose specific changes to optimize the density level
6. Present findings with before/after mockups

### Checklist for Optimal Density

Use these indicators to evaluate information density:

- [ ] Whitespace is present but not excessive (30-50%)
- [ ] Content can be scanned without scrolling for key information
- [ ] Related elements are grouped logically
- [ ] Visual hierarchy guides attention appropriately
- [ ] Cognitive load matches audience capabilities
- [ ] No unnecessary decorative elements competing for attention

## Source Code

```js
// See info-density-spectrum.js for the full source code
```

[View Source on GitHub](https://github.com/dmccreary/automating-instructional-design/blob/main/docs/sims/info-density-spectrum/info-density-spectrum.js)

## References

- Mayer, R. E. (2009). *Multimedia Learning* (2nd ed.). Cambridge University Press.
- Sweller, J., Ayres, P., & Kalyuga, S. (2011). *Cognitive Load Theory*. Springer.
- Few, S. (2012). *Show Me the Numbers: Designing Tables and Graphs to Enlighten* (2nd ed.). Analytics Press.
- Tufte, E. R. (2001). *The Visual Display of Quantitative Information* (2nd ed.). Graphics Press.
