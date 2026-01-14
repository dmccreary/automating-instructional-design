# Split Attention Effect Demonstration

<iframe src="main.html" width="100%" height="550" style="border: 1px solid #ddd; border-radius: 8px;" scrolling="no"></iframe>

<a href="main.html" target="_blank" class="btn btn-primary" style="margin-top: 10px; display: inline-block; padding: 8px 16px; background-color: #1976d2; color: white; text-decoration: none; border-radius: 4px;">Open Fullscreen</a>

## About This MicroSim

This interactive visualization demonstrates the **Split Attention Effect**, a key principle from Cognitive Load Theory. When learners must mentally integrate information from multiple separated sources (like a diagram and a separate legend), their working memory becomes overloaded with extraneous processing, leaving less capacity for actual learning.

The side-by-side comparison uses a water cycle diagram to show how:

- **Split Attention Design** (left): Uses letter labels on the diagram with definitions in a separate legend, plus explanatory text in another location. This forces learners to constantly shift attention between sources.

- **Integrated Design** (right): Places labels and brief explanations directly on the relevant diagram elements using callout boxes. Information is spatially and temporally integrated.

### Interactive Features

- **Eye Tracking Toggle**: Show or hide simulated eye-tracking patterns that reveal the chaotic scan path required by split designs versus the efficient path in integrated designs
- **Try It Yourself Mode**: Experience the difference firsthand by revealing content progressively
- **Hover Tooltips**: Hover over diagram elements to see cognitive cost analysis
- **Metrics Comparison**: View quantified differences in eye movement distance, learning time, working memory load, and retention

### Key Metrics Displayed

| Metric | Split Design | Integrated Design |
|--------|--------------|-------------------|
| Eye Movement Distance | 847 pixels | 312 pixels |
| Time to Comprehension | 45 seconds | 22 seconds |
| Working Memory Load | High (6-7 chunks) | Low (3-4 chunks) |
| Learning Retention | 62% | 89% |

## Learning Objectives

After exploring this visualization, students will be able to:

- Recognize split attention problems in instructional materials
- Explain why integrated designs reduce extraneous cognitive load
- Identify specific design elements that cause split attention
- Apply integration principles when designing learning materials

## Lesson Plan Ideas

1. **Before and After**: Have students find examples of split attention in their textbooks or course materials. Challenge them to redesign one example using integration principles.

2. **Eye Tracking Experiment**: Use the "Try It Yourself" mode to have students describe their experience learning from each design. Discuss the mental effort differences.

3. **Design Challenge**: Present students with a complex diagram using letter labels and a separate legend. Have them redesign it with integrated labels and compare effectiveness.

4. **Cognitive Load Analysis**: Have students identify and categorize cognitive load in various instructional materials as intrinsic (content complexity), extraneous (poor design), or germane (beneficial processing).

5. **Multimedia Principles Review**: Connect the split attention effect to Mayer's other multimedia learning principles. How do spatial contiguity and temporal contiguity relate to this effect?

## Theoretical Background

The Split Attention Effect was identified by John Sweller and colleagues as part of Cognitive Load Theory research in the late 1980s. It occurs when:

1. Multiple sources of information must be integrated
2. The sources are physically or temporally separated
3. Neither source is intelligible in isolation

The solution is to **physically integrate** the sources so learners don't waste cognitive resources searching, matching, and mentally integrating disparate information.

## Edit This MicroSim

[Open in p5.js Editor](https://editor.p5js.org/)

To use this code in the p5.js online editor:

1. Click the link above to open the p5.js editor
2. Copy the contents of `split-attention-effect.js`
3. Paste into the editor's sketch.js file
4. Click the Play button to run

## Related Concepts

- Cognitive Load Theory
- Extraneous Cognitive Load
- Spatial Contiguity Principle
- Temporal Contiguity Principle
- Working Memory Limitations
- Multimedia Learning Principles
- Instructional Design Optimization
