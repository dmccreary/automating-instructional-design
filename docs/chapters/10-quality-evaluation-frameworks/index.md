---
title: Quality Evaluation Frameworks
description: Comprehensive frameworks for evaluating MicroSim quality across technical, pedagogical, and user experience dimensions, including completeness rubrics, metadata standards, and strategies for search and reuse.
generated_by: claude skill chapter-content-generator
date: 2025-12-18 15:30:00
version: 0.03
---

# Quality Evaluation Frameworks

## Summary

This chapter presents comprehensive frameworks for evaluating MicroSim quality across three dimensions: technical, pedagogical, and user experience. You will learn output validation techniques, quality scores, functionality and responsiveness testing methods, and bug identification strategies. The chapter covers pedagogical evaluation including objective alignment, cognitive level matching, and effectiveness measurement. UX evaluation addresses intuitiveness and engagement balance. You will also learn rubric development, automated versus human evaluation methods, documentation standards, metadata standards, and designing for reusability.

## Concepts Covered

This chapter covers the following concepts from the learning graph:

1. Output Validation
2. Technical Evaluation
3. Pedagogical Evaluation
4. UX Evaluation
5. Functionality Testing
6. Responsiveness Testing
7. Bug Identification
8. Objective Alignment
9. Cognitive Level Match
10. Effectiveness Measure
11. Intuitiveness
12. Engagement Balance
13. Evaluation Rubric
14. Rubric Development
15. Automated Evaluation
16. Human Evaluation
17. Documentation Standard
18. Reusability
19. Quality Score
20. Standardization Score
21. MicroSim Metadata
22. Search and Reuse

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Learning Objective Analysis](../01-foundations-learning-objective-analysis/index.md)
- [Chapter 9: Generating MicroSims with AI Tools](../09-generating-microsims-ai-tools/index.md)

---

## Introduction: Why Quality Matters (And Why You Should Care)

Here's a joke for you: How many instructional designers does it take to evaluate a MicroSim? Just one—but they'll need three different rubrics, a metadata schema, and a strong cup of coffee.

All joking aside, creating a MicroSim is only half the battle. Without rigorous quality evaluation, you might deploy a simulation that looks pretty but teaches poorly, works on your laptop but crashes on a student's tablet, or disappears into the digital void because nobody can find it when they need it.

This chapter arms you with the frameworks, rubrics, and standards needed to ensure your MicroSims are not just functional, but genuinely effective educational tools. Think of quality evaluation as the immune system of instructional design—it protects learners from buggy interfaces, misaligned objectives, and the heartbreak of a beautiful simulation that nobody can find or reuse.

The three pillars of MicroSim quality form what we call the **Three-Lens Evaluation Model**:

- **Technical Quality**: Does it work reliably across devices and browsers?
- **Pedagogical Quality**: Does it actually teach what it claims to teach?
- **User Experience Quality**: Is it intuitive and engaging without being distracting?

Let's explore each lens in detail, starting with the nuts and bolts of technical evaluation.

---

## The Three-Lens Evaluation Model

Before diving into specifics, let's visualize how these three evaluation lenses work together to create a holistic quality assessment.

#### Diagram: Three-Lens Evaluation Model

<details markdown="1">
<summary>Three-Lens Evaluation Model</summary>
Type: diagram

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand how technical, pedagogical, and UX evaluation dimensions interact to form a complete quality assessment framework.

Components to show:
- Three overlapping circles representing Technical, Pedagogical, and UX evaluation
- Central intersection labeled "High-Quality MicroSim"
- Each circle contains key evaluation criteria:
  - Technical: Functionality, Responsiveness, Bug-Free, Standardization
  - Pedagogical: Objective Alignment, Cognitive Level Match, Effectiveness
  - UX: Intuitiveness, Engagement Balance, Accessibility
- Arrows showing how deficiencies in one area impact overall quality

Visual style: Venn diagram with three circles, center highlighted in gold

Color scheme:
- Technical: Blue (#3B82F6)
- Pedagogical: Green (#10B981)
- UX: Purple (#8B5CF6)
- Center intersection: Gold (#F59E0B)

Implementation: HTML/CSS/JavaScript with SVG or p5.js
</details>

The magic happens at the intersection of all three circles. A MicroSim might achieve technical perfection—zero bugs, responsive across all devices—but if it confuses learners or targets the wrong cognitive level, it fails its educational mission. Similarly, a pedagogically brilliant simulation that crashes on mobile devices serves no one.

---

## Technical Evaluation: The Foundation of Trust

Technical evaluation answers a fundamental question: **Does this thing actually work?**

It sounds simple, but "working" encompasses far more than just loading without errors. Technical quality includes functionality testing, responsiveness across devices, bug identification, and adherence to standardization requirements.

### Output Validation: The First Line of Defense

Output validation is the process of verifying that a MicroSim produces expected results given specific inputs. Think of it as the quality control checkpoint on the assembly line.

For AI-generated MicroSims, output validation is particularly critical because generative AI systems can produce code that looks correct but contains subtle logical errors. Consider a physics simulation where gravity is accidentally set to a positive value instead of negative—the objects float upward instead of falling. The code runs fine; the physics is just hilariously wrong.

Key output validation checks include:

- **Visual correctness**: Do elements render in expected positions and colors?
- **Mathematical accuracy**: Do calculations produce correct results?
- **Behavioral consistency**: Does the simulation respond predictably to user inputs?
- **Edge case handling**: What happens with extreme values or unexpected inputs?
- **State management**: Does the simulation reset properly?

### Functionality Testing

Functionality testing systematically verifies that every interactive element performs its intended function.

| Test Category | What to Check | Common Failures |
|--------------|---------------|-----------------|
| Controls | Sliders respond, buttons trigger actions | Range limits not enforced |
| Animations | Start/stop/reset work correctly | Animation loops don't reset |
| Data Display | Values update in real-time | Display lag or stale values |
| User Input | Text fields validate input | No input sanitization |
| Audio/Visual | Feedback triggers appropriately | Missing confirmation signals |

### Responsiveness Testing

In 2024, learners access content on everything from 27-inch desktop monitors to 5-inch smartphone screens. A MicroSim that only works on the developer's MacBook Pro is a MicroSim that fails most learners.

Responsiveness testing verifies that:

- Canvas dimensions adapt to viewport size
- Control panels reorganize appropriately on smaller screens
- Touch targets are large enough for mobile interaction (minimum 44x44 pixels)
- Text remains readable at all breakpoints
- No horizontal scrolling is required

#### Diagram: Responsive Breakpoint Testing

<details markdown="1">
<summary>Responsive Breakpoint Testing</summary>
Type: diagram

Bloom Taxonomy: Apply (L3)

Learning Objective: Students will apply responsive design testing criteria to evaluate MicroSim adaptability across device sizes.

Components to show:
- Four device mockups side by side: Desktop (1920px), Laptop (1366px), Tablet (768px), Mobile (375px)
- Each mockup shows same MicroSim at that breakpoint
- Callout annotations showing what changes at each breakpoint:
  - Control panel moves from side to bottom
  - Fonts scale proportionally
  - Touch targets increase size on mobile
- Traffic light indicators: green (pass), yellow (issues), red (fail)

Visual style: Device mockup comparison with annotations

Color scheme: Device frames in dark gray, content areas in white, annotations in blue

Implementation: HTML/CSS or static diagram
</details>

### Bug Identification: Finding the Gremlins

Bugs in educational software aren't just annoying—they can actively harm learning. A student who encounters a crash during a "eureka moment" may lose motivation entirely. A calculation error can reinforce misconceptions rather than correcting them.

Common bug categories in MicroSims include:

- **Logic errors**: Calculations produce wrong results
- **State corruption**: Variables retain values when they shouldn't
- **Race conditions**: Timing-dependent behavior causes inconsistency
- **Memory leaks**: Performance degrades over extended use
- **Browser incompatibilities**: Works in Chrome, fails in Safari
- **Accessibility failures**: Screen readers can't parse content

Pro tip: If you ever want to find bugs quickly, hand your MicroSim to a middle schooler. They will click everything, in every order, as fast as possible—and find edge cases you never imagined.

---

## Pedagogical Evaluation: Teaching What You Mean to Teach

Technical perfection means nothing if a MicroSim doesn't effectively teach its intended concepts. Pedagogical evaluation examines whether the simulation aligns with learning objectives, targets appropriate cognitive levels, and demonstrably improves student understanding.

### Objective Alignment: Staying on Target

Objective alignment verifies that every element of a MicroSim serves its stated learning objective. This sounds obvious, but scope creep is a constant temptation. A simulation designed to teach supply and demand might gradually accumulate features for market equilibrium, price elasticity, government intervention, and international trade—until it teaches nothing well.

Questions to ask during objective alignment review:

- Does the simulation directly address the stated learning objective?
- Are there features that distract from the core concept?
- Can a learner complete the interaction without engaging with the key insight?
- Is the objective achievable within a reasonable time frame?

| Alignment Issue | Symptom | Solution |
|----------------|---------|----------|
| Scope creep | Too many concepts, unfocused | Remove tangential features |
| Hidden complexity | Core concept buried in interface | Simplify to essential elements |
| False completion | Can "finish" without understanding | Add understanding checks |
| Missing scaffolding | Jumps to complex without building | Add progressive difficulty |

### Cognitive Level Match

Not all learning objectives are created equal. Bloom's Taxonomy (2001 revision) distinguishes six cognitive levels, from simple recall to creative synthesis. A MicroSim designed for "Remember" level learning (vocabulary flashcards) requires different design patterns than one targeting "Analyze" level (comparing multiple data sets).

**Cognitive Level Matching Checklist:**

- **Remember (L1)**: Does the sim support fact recall? (flashcards, matching games)
- **Understand (L2)**: Does it enable explanation of concepts? (labeled diagrams, cause-effect demos)
- **Apply (L3)**: Can learners use knowledge to solve problems? (parameter manipulation, scenario testing)
- **Analyze (L4)**: Does it reveal relationships and patterns? (data exploration, network visualization)
- **Evaluate (L5)**: Can learners make judgments based on criteria? (comparison tools, trade-off analysis)
- **Create (L6)**: Does it support generating original work? (model builders, design tools)

A common mismatch occurs when a learning objective targets "Analyze" but the MicroSim only supports "Understand"—the simulation explains concepts beautifully but never challenges learners to discover relationships themselves.

#### Diagram: Bloom's Taxonomy and MicroSim Types

<details markdown="1">
<summary>Bloom's Taxonomy and MicroSim Types</summary>
Type: infographic

Bloom Taxonomy: Analyze (L4)

Learning Objective: Students will analyze the relationship between Bloom's Taxonomy cognitive levels and appropriate MicroSim types for each level.

Layout: Vertical pyramid with six levels, each containing example MicroSim types

Content:
- Level 6 - Create: Model editors, free-form design tools, hypothesis builders
- Level 5 - Evaluate: Comparison simulators, trade-off analyzers, judgment exercises
- Level 4 - Analyze: Network graphs, data explorers, pattern identification tools
- Level 3 - Apply: Parameter sliders, scenario testers, problem solvers
- Level 2 - Understand: Animated explanations, cause-effect demos, concept maps
- Level 1 - Remember: Flashcard games, matching exercises, term sorters

Interactive elements:
- Hover over each level to see detailed examples and design considerations
- Click to expand with case studies of successful MicroSims at each level

Color scheme: Gradient from light blue (Remember) to dark purple (Create)

Implementation: HTML/CSS/JavaScript with progressive disclosure
</details>

### Effectiveness Measurement

The ultimate test of pedagogical quality is whether students actually learn. Effectiveness measurement goes beyond "Did they complete the simulation?" to ask "Did their understanding improve?"

Methods for measuring MicroSim effectiveness include:

- **Pre/post assessments**: Test understanding before and after MicroSim use
- **Embedded checkpoints**: Questions within the simulation that verify understanding
- **Transfer tasks**: Can learners apply concepts to new situations?
- **Long-term retention**: Does understanding persist over time?
- **Comparison studies**: How does learning compare to alternative methods?

---

## UX Evaluation: The Human Factor

A MicroSim can work perfectly and teach effectively, yet still frustrate users with confusing navigation, overwhelming interfaces, or interactions that feel like wrestling with an angry octopus.

### Intuitiveness: Can They Figure It Out?

Intuitiveness measures whether users can accomplish their goals without extensive instruction. The gold standard is the "Grandma Test"—can someone with minimal technical background figure out how to use it within 30 seconds?

Indicators of poor intuitiveness:

- Users click randomly hoping something happens
- The "obvious" next step isn't actually obvious
- Critical controls are hidden or unlabeled
- Feedback doesn't match user expectations
- Reset functions are hard to find

### Engagement Balance: The Goldilocks Zone

There's a sweet spot between "so boring I'm falling asleep" and "so gamified I forgot I'm supposed to be learning." Engagement balance seeks that Goldilocks zone where learners are sufficiently motivated to persist without being distracted by bells, whistles, and virtual confetti.

| Too Little Engagement | Balanced | Too Much Engagement |
|----------------------|----------|---------------------|
| Plain text only | Subtle animations | Constant motion |
| No feedback | Meaningful responses | Points for everything |
| Static displays | Interactive controls | Addictive mechanics |
| No progress indication | Clear milestones | Leaderboards dominating |

The key question: **Does the engagement serve the learning, or does learning serve the engagement?**

#### Diagram: Engagement vs. Learning Trade-off

<details markdown="1">
<summary>Engagement vs. Learning Trade-off</summary>
Type: chart

Bloom Taxonomy: Evaluate (L5)

Learning Objective: Students will evaluate the relationship between engagement features and learning effectiveness to identify optimal design approaches.

Chart type: Scatter plot with trend curve

X-axis: Engagement Features (0-10 scale)
Y-axis: Learning Effectiveness (0-10 scale)

Data points showing:
- Low engagement/low learning: Static diagram (1,3)
- Moderate engagement/high learning: Interactive simulation (5,8)
- High engagement/moderate learning: Game-heavy design (9,5)
- Optimal zone highlighted in green (4-6 on X, 7-9 on Y)

Annotations:
- "Boring" zone (left side)
- "Optimal Balance" zone (center-top)
- "Distraction Risk" zone (right side)
- Curve showing diminishing returns on engagement beyond optimal point

Color scheme: Blue dots, green optimal zone, trend line in dark gray

Implementation: Chart.js or Plotly
</details>

---

## The Completeness Quality Score: A Rubric LLMs Can Follow

Here's where the rubber meets the road. How do you translate these evaluation dimensions into a concrete, measurable score that both humans and AI systems can consistently apply?

The **Completeness Quality Score** is a 100-point rubric that evaluates whether a MicroSim includes all required components for standardization. Note that this score measures *completeness*, not usability—a MicroSim can achieve a perfect 100 and still be pedagogically questionable. Think of it as a checklist for structural integrity, not artistic merit.

!!! tip "Why Completeness Matters for AI"
    Large Language Models are remarkably precise at following structured rules. By encoding quality criteria as a rubric with clear checkpoints, we enable automated quality assessment during and after MicroSim generation.

### The 100-Point Completeness Rubric

| Test Name | Description | Points |
|-----------|-------------|--------|
| Title | index.md file has a title in markdown level 1 header | 2 |
| main.html | The file main.html is present in the MicroSim directory | 10 |
| Metadata 1 | index.md has title and description metadata in YAML | 3 |
| Metadata 2 | index.md has image references for social preview | 5 |
| metadata.json present | A metadata.json file is present | 10 |
| metadata.json valid | The MicroSim JSON Schema passes validation with no errors | 20 |
| iframe | An iframe that uses src="main.html" is present | 10 |
| Fullscreen Link | A button to view the MicroSim in fullscreen is present | 5 |
| iframe example | An iframe example in an HTML source block is present for embedding | 5 |
| image | A screenshot image is present and referenced in header metadata | 5 |
| Overview | A description of the MicroSim and how to use it is present | 5 |
| Lesson Plan | A detailed lesson plan is present | 10 |
| References | A list of references in markdown format | 5 |
| Type-Specific Format | Varies by type (e.g., p5.js editor link for p5.js MicroSims) | 5 |
| **Total** | | **100** |

### Quality Score Interpretation

- **90-100**: Production ready. All components present, excellent documentation.
- **70-89**: Good quality. Most components present, may lack lesson plan.
- **50-69**: Needs work. Core components present but minimal documentation.
- **Below 50**: Incomplete. Missing critical components; do not deploy.

The quality score is stored in the YAML frontmatter of the index.md file:

```yaml
---
title: Bouncing Ball Simulation
description: Interactive demonstration of gravity and elastic collisions
quality_score: 86
---
```

---

## The Standardization Process: A Step-by-Step Walkthrough

Let's walk through the complete standardization process for bringing a MicroSim up to quality standards. This process is designed to be followed by humans or automated by AI agents.

### Step 1: Locate the MicroSim Directory

MicroSim directories follow the standard structure:
```
docs/sims/[microsim-name]/
```

The `microsim-name` must use kebab-case (lowercase letters and dashes only). No spaces, underscores, or uppercase characters.

### Step 2: Check Existing Quality Score

Before diving into evaluation, check if a quality score already exists in the index.md YAML frontmatter:

```yaml
---
quality_score: 86
---
```

If the score is 85 or above, the MicroSim meets standards. Consider whether your time is better spent creating new simulations rather than perfecting existing ones.

### Step 3: Verify Core Files Exist

At minimum, a MicroSim directory must contain:

- `main.html` - The core simulation file (required)
- `index.md` - The MkDocs documentation page (required for integration)
- `metadata.json` - Dublin Core metadata for discoverability (required for searchability)

### Step 4: Validate index.md Structure

The index.md file must include:

**YAML Frontmatter (between `---` delimiters):**
```yaml
---
title: Simulation Name
description: Brief description for SEO and social previews
quality_score: 75
image: /sims/simulation-name/simulation-name.png
og:image: /sims/simulation-name/simulation-name.png
---
```

**Level 1 Header:**
```markdown
# Simulation Name
```

**Iframe Embed:**
```html
<iframe src="main.html" width="100%" height="600px"></iframe>
```

**Copy-Paste Iframe Example:**
````markdown
```html
<iframe src="https://yourdomain.github.io/path/sims/name/main.html" width="100%" height="600px"></iframe>
```
````

**Fullscreen Link:**
```markdown
[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }
```

### Step 5: Validate Type-Specific Requirements

Different MicroSim types have additional requirements:

**p5.js MicroSims** must include a link to the p5.js editor:
```markdown
[Edit in the p5.js Editor](https://editor.p5js.org/username/sketches/SKETCH_ID)
```

To detect if a MicroSim uses p5.js, check for:
- Import statements for p5.js CDN in main.html
- Use of p5.js functions like `setup()`, `draw()`, `createCanvas()`

Other library types (vis-network, Chart.js, D3.js) currently have no type-specific requirements, but this may change as the ecosystem evolves.

### Step 6: Validate Content Sections

Check for presence of documentation sections:

- **Description/How to Use**: Explains the MicroSim's purpose and interaction patterns
- **Lesson Plan** (10 points): Learning objectives, target audience, prerequisites, activities, assessment
- **References** (5 points): Links to relevant resources, papers, or library documentation

### Step 7: Validate metadata.json

The metadata.json file must pass schema validation. More on this in the next section.

### Step 8: Calculate and Record Quality Score

Sum points from the rubric and write the score to the index.md YAML frontmatter.

#### Diagram: Standardization Workflow

<details markdown="1">
<summary>Standardization Workflow</summary>
Type: workflow

Bloom Taxonomy: Apply (L3)

Learning Objective: Students will apply the standardization workflow to evaluate and upgrade MicroSim quality.

Visual style: Flowchart with decision diamonds and process rectangles

Steps:
1. Start: "Receive MicroSim Path"
   Hover text: "User provides path to MicroSim directory"

2. Decision: "Existing Score >= 85?"
   Hover text: "Check YAML frontmatter for quality_score field"

3a. Process: "Skip Standardization" (if Yes)
    Hover text: "MicroSim already meets quality standards"

3b. Process: "Begin Evaluation Checklist" (if No)
    Hover text: "Proceed with full standardization process"

4. Process: "Check Core Files"
   Hover text: "Verify main.html, index.md, metadata.json exist"

5. Process: "Validate index.md Structure"
   Hover text: "Check YAML, headers, iframes, links"

6. Decision: "Is p5.js MicroSim?"
   Hover text: "Detect p5.js library usage in main.html"

7a. Process: "Check p5.js Editor Link" (if Yes)
    Hover text: "Verify link to p5.js editor exists"

7b. Process: "Continue to Content" (if No)
    Hover text: "Skip type-specific checks"

8. Process: "Validate Content Sections"
   Hover text: "Check description, lesson plan, references"

9. Process: "Validate metadata.json"
   Hover text: "Run JSON Schema validation"

10. Process: "Calculate Quality Score"
    Hover text: "Sum points from rubric"

11. Process: "Write Score to index.md"
    Hover text: "Update YAML frontmatter with quality_score"

12. End: "Standardization Complete"
    Hover text: "MicroSim meets documentation standards"

Color coding:
- Blue: File operations
- Yellow: Decision points
- Green: Success outcomes
- Purple: Validation steps

Implementation: Mermaid or HTML/CSS/JavaScript flowchart
</details>

---

## MicroSim Metadata: The Key to Discoverability

Here's a truth that should be embroidered on every instructional designer's laptop bag:

> **"You can't reuse what you can't find."**

A brilliant MicroSim that's buried in an undocumented folder, lacking keywords and categorization, might as well not exist. Metadata is the bridge between creation and reuse—it makes simulations findable, comparable, and adaptable.

### The Power of Structured Metadata

The MicroSim ecosystem uses a comprehensive JSON Schema based on Dublin Core metadata standards, extended with educational and technical specifications. When every MicroSim includes a properly structured `metadata.json` file:

- Search tools like [https://dmccreary.github.io/search-microsims/](https://dmccreary.github.io/search-microsims/) can quickly narrow down databases by subject, grade level, JavaScript library, or complexity
- AI agents can find similar MicroSims to use as templates for new designs
- Educators can filter simulations by Bloom's Taxonomy level, prerequisite concepts, or curriculum standards

### The MicroSim JSON Schema

The schema defines several major sections:

**Dublin Core Metadata (dublinCore):**
```json
{
  "dublinCore": {
    "title": "Gravity Simulator",
    "creator": ["Dan McCreary"],
    "subject": ["physics", "gravity", "mechanics"],
    "description": "Interactive simulation demonstrating gravitational acceleration",
    "date": "2024-01-15T10:30:00Z",
    "type": "Interactive Simulation",
    "format": "text/html",
    "rights": "CC BY 4.0"
  }
}
```

**Search Metadata (search):**
```json
{
  "search": {
    "tags": ["physics", "gravity", "freefall", "STEM"],
    "visualizationType": ["simulation", "animation"],
    "interactionLevel": "moderate",
    "complexity": 4,
    "relatedConcepts": ["acceleration", "mass", "velocity"]
  }
}
```

**Educational Metadata (educational):**
```json
{
  "educational": {
    "gradeLevel": ["9", "10", "11", "12"],
    "subjectArea": ["Physics"],
    "topic": ["Newtonian mechanics", "Gravitational acceleration"],
    "learningObjectives": [
      "Demonstrate that gravitational acceleration is independent of mass"
    ],
    "bloomsTaxonomy": ["Understand", "Apply"],
    "prerequisites": ["Basic algebra", "Concept of velocity"],
    "difficulty": "Intermediate"
  }
}
```

**Technical Metadata (technical):**
```json
{
  "technical": {
    "framework": "p5.js",
    "version": "1.2.0",
    "canvasDimensions": {
      "width": 800,
      "height": 600,
      "responsive": true
    },
    "accessibility": {
      "screenReader": true,
      "keyboardNavigation": true,
      "colorContrast": true
    }
  }
}
```

### Why Generative AI Loves JSON Schemas

Here's an optimistic insight: Large Language Models are remarkably good at following JSON Schema specifications. When you provide a well-defined schema, AI systems can:

- Generate valid metadata.json files for new MicroSims
- Validate existing metadata against schema requirements
- Suggest missing fields based on content analysis
- Maintain consistency across large MicroSim libraries

This precision is a gift for quality automation. Instead of hoping an AI "gets it right," you define exactly what "right" means in a machine-readable format.

### Metadata Quality Scoring

Beyond structural validation, metadata can be evaluated for quality and completeness:

| Criterion | Description | Weight |
|-----------|-------------|--------|
| Required fields present | All required Dublin Core and educational fields | 40% |
| Keyword richness | Multiple relevant subject tags and search keywords | 15% |
| Educational detail | Learning objectives, Bloom's levels, prerequisites | 20% |
| Technical completeness | Framework, dimensions, accessibility info | 15% |
| Usage data | Popularity metrics, effectiveness studies (if available) | 10% |

Future metadata extensions may include:

- **Popularity metrics**: View counts, embedding frequency, user ratings
- **Effectiveness data**: Links to research studies demonstrating learning outcomes
- **Version history**: Tracking iterations and improvements over time
- **Remix relationships**: Which MicroSims were derived from this one?

#### Diagram: Metadata-Enabled Search

<details markdown="1">
<summary>Metadata-Enabled Search</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)

Learning Objective: Students will apply metadata filtering to efficiently search a MicroSim database by subject, grade level, and JavaScript library.

Canvas layout:
- Left panel (300px): Filter controls
- Right panel (remaining): Search results grid

Visual elements:
- Dropdown filters: Subject Area, Grade Level, JS Library, Bloom's Level
- Tag cloud showing popular search terms
- Results displayed as cards with thumbnail, title, description
- Quality score badge on each result card
- Click card to view full metadata

Interactive controls:
- Dropdown: Subject Area (Math, Science, Physics, etc.)
- Dropdown: Grade Level (K through Graduate)
- Dropdown: JS Library (p5.js, vis-network, Chart.js, etc.)
- Checkbox group: Bloom's Taxonomy levels
- Slider: Minimum quality score (0-100)
- Search button
- Reset filters button

Default parameters:
- No filters applied initially
- Results sorted by quality score descending

Behavior:
- Filter changes update results in real-time
- Empty state shows "No results match your criteria"
- Click result card to view full metadata modal
- Shows count of matching results

Implementation: HTML/CSS/JavaScript with mock data or API connection
</details>

---

## Automated vs. Human Evaluation

Not all evaluation tasks require human judgment. Understanding when to automate and when to rely on human expertise is key to efficient quality assurance.

### What Can Be Automated

Automated evaluation excels at objective, rule-based checks:

- **Structural validation**: File existence, YAML syntax, JSON schema compliance
- **Responsiveness testing**: Viewport simulation across breakpoints
- **Performance metrics**: Load time, memory usage, frame rate
- **Accessibility checks**: Color contrast ratios, ARIA labels, keyboard navigation
- **Link verification**: Broken links, missing images
- **Code quality**: Linting, syntax errors, deprecated function usage

Automated tools can run these checks consistently across hundreds of MicroSims without fatigue or variation.

### What Requires Human Evaluation

Humans remain essential for subjective, context-dependent judgments:

- **Pedagogical alignment**: Does this actually teach the concept?
- **Engagement quality**: Is it engaging without being distracting?
- **Visual aesthetics**: Does it look professional and inviting?
- **Cultural appropriateness**: Are examples inclusive and sensitive?
- **Intuitive design**: Can users figure it out without instructions?
- **Misconception handling**: Does it address common student errors?

Think of it this way: Computers can verify that a fullscreen button exists; only humans can judge whether students actually understand what they're supposed to learn.

### The Hybrid Approach

The most effective quality assurance combines automated pre-checks with human review:

1. **Automated tier**: Run all rule-based checks; flag issues for human review
2. **Human tier**: Focus expert attention on pedagogical and UX evaluation
3. **Crowd tier**: Gather feedback from actual learners through user testing

This pipeline ensures that human cognitive resources are spent on judgments that require human cognition, while machines handle the tedious verification work.

#### Diagram: Automated vs. Human Evaluation Matrix

<details markdown="1">
<summary>Automated vs. Human Evaluation Matrix</summary>
Type: diagram

Bloom Taxonomy: Analyze (L4)

Learning Objective: Students will analyze evaluation criteria to determine appropriate use of automated versus human evaluation methods.

Layout: 2x2 matrix with automation potential (high/low) on X-axis and judgment complexity (objective/subjective) on Y-axis

Quadrants:
- Top-left (High automation, Objective): "Fully Automate"
  - File structure checks
  - JSON validation
  - Responsiveness testing
  - Link verification

- Top-right (Low automation, Objective): "Semi-Automate"
  - Accessibility testing (some aspects)
  - Code quality checks
  - Performance benchmarks

- Bottom-left (High automation, Subjective): "AI-Assisted"
  - Content summarization
  - Keyword extraction
  - Similarity detection

- Bottom-right (Low automation, Subjective): "Human Required"
  - Pedagogical effectiveness
  - Visual aesthetics
  - Cultural sensitivity
  - Engagement quality

Color coding:
- Green: Fully automate
- Blue: Semi-automate
- Yellow: AI-assisted
- Purple: Human required

Implementation: HTML/CSS grid or SVG diagram
</details>

---

## Documentation Standards: Writing for Reuse

Good documentation transforms a one-time creation into a reusable asset. Documentation standards ensure that anyone—including your future self—can understand, maintain, and adapt a MicroSim.

### The Documentation Checklist

Every MicroSim should include:

1. **Purpose statement**: What does this simulation teach? (1-2 sentences)
2. **Usage instructions**: How do learners interact with it? (step-by-step)
3. **Learning objectives**: What should learners be able to do afterward?
4. **Target audience**: Grade level, prerequisites, assumed knowledge
5. **Technical requirements**: Browser compatibility, device recommendations
6. **Customization guide**: How can educators adapt it for different contexts?
7. **Known limitations**: What doesn't this simulation cover or do well?

### Lesson Plan Section

The lesson plan transforms a MicroSim from "neat demo" to "classroom-ready tool":

```markdown
## Lesson Plan

### Learning Objectives
After completing this simulation, students will be able to:
1. Explain that gravitational acceleration is independent of object mass
2. Predict the fall time of objects of different masses

### Target Audience
- Grade level: 9-12 Physics
- Prerequisites: Basic understanding of velocity and acceleration

### Activities
1. **Prediction phase** (5 minutes): Ask students to predict which ball falls faster
2. **Exploration phase** (10 minutes): Students manipulate parameters and observe
3. **Explanation phase** (10 minutes): Discuss observations, introduce formula
4. **Extension** (optional): Introduce air resistance toggle

### Assessment
- Formative: Embedded prediction prompts in simulation
- Summative: Exit ticket with transfer question
```

---

## Rubric Development: Building Your Own Evaluation Tools

The completeness rubric provided in this chapter is a starting point, not a final destination. Different contexts may require different evaluation criteria.

### Principles of Effective Rubric Design

1. **Specific criteria**: Vague items like "good quality" can't be measured
2. **Observable indicators**: What evidence demonstrates each criterion?
3. **Consistent scoring**: Different evaluators should arrive at similar scores
4. **Appropriate weighting**: Not all criteria are equally important
5. **Actionable feedback**: Scores should indicate what to improve

### Customization Example: Physics MicroSim Rubric

A physics department might extend the standard rubric with domain-specific criteria:

| Criterion | Description | Points |
|-----------|-------------|--------|
| Physical accuracy | Equations match textbook formulations | 15 |
| Unit labels | All quantities display appropriate units | 10 |
| Edge case behavior | Simulation handles extreme values correctly | 10 |
| Misconception targeting | Addresses documented student misconceptions | 15 |

#### Diagram: Evaluation Rubric Builder

<details markdown="1">
<summary>Evaluation Rubric Builder</summary>
Type: microsim

Bloom Taxonomy: Create (L6)

Learning Objective: Students will create custom evaluation rubrics by selecting and weighting criteria appropriate to their educational context.

Canvas layout:
- Left panel (350px): Criterion bank organized by category
- Center panel (300px): Active rubric being built
- Right panel (250px): Weighting and scoring controls

Visual elements:
- Categorized lists of criteria (Technical, Pedagogical, UX, Domain-specific)
- Drag-and-drop interface for adding criteria to rubric
- Weight sliders for each criterion (0-100%)
- Total weight indicator (must sum to 100%)
- Preview of rubric as checklist

Interactive controls:
- Checkbox lists for selecting criteria from each category
- Sliders to adjust weights
- Text input for custom criteria
- Button: Add Custom Criterion
- Button: Export Rubric as Markdown
- Button: Export Rubric as JSON
- Button: Reset to Default

Default parameters:
- Standard completeness rubric pre-loaded
- Weights set to default values

Behavior:
- Drag criteria from bank to active rubric
- Weight sliders automatically rebalance to sum to 100%
- Preview updates in real-time
- Export generates formatted rubric document

Implementation: HTML/CSS/JavaScript with drag-and-drop library
</details>

---

## Designing for Reusability: Future-Proofing Your Work

The final pillar of quality is reusability. A MicroSim that works today but can't be adapted, extended, or integrated tomorrow has limited value.

### Reusability Principles

1. **Separation of concerns**: Keep content, logic, and presentation separate
2. **Parameterization**: Make key values adjustable without code changes
3. **Documentation**: Enable others to understand and modify
4. **Standard formats**: Use common file types and coding conventions
5. **Open licensing**: Choose licenses that permit educational reuse
6. **Metadata completeness**: Enable discovery through rich metadata

### The Metadata-Reusability Connection

Complete metadata directly enables reuse:

- **Search and discovery**: Others can find your MicroSim when they need it
- **Adaptation**: Metadata reveals what prerequisites and concepts are involved
- **Quality signals**: Quality scores help educators choose reliable resources
- **Version tracking**: Future authors know which version to reference
- **Attribution**: Clear creator information enables proper credit

Remember: **You can't reuse what you can't find.** Invest in metadata now, and your work pays dividends across the entire educational community.

---

## Summary: The Quality Mindset

Quality evaluation isn't a one-time checkpoint—it's a mindset that infuses every stage of MicroSim development. From the first specification through final deployment, asking "Is this technically sound? Pedagogically effective? User-friendly? Findable and reusable?" keeps your work aligned with its educational mission.

The frameworks in this chapter give you:

- **Three-Lens Evaluation Model**: Technical, Pedagogical, and UX perspectives
- **100-Point Completeness Rubric**: Measurable standards for structural quality
- **Standardization Workflow**: Step-by-step process for bringing MicroSims to standard
- **Metadata Schema**: Structured format for discoverability and search
- **Automated/Human Balance**: Efficient allocation of evaluation resources
- **Documentation Standards**: Templates for reusable lesson planning
- **Rubric Development**: Tools for creating context-specific evaluation criteria

Armed with these tools, you're ready not just to create MicroSims, but to create *good* MicroSims—simulations that work reliably, teach effectively, engage appropriately, and remain useful long after their first deployment.

And that's the whole point, isn't it? We're not just making interactive widgets. We're building tools that help people understand the world better. That's worth doing well.

---

## Key Takeaways

- Quality evaluation examines three dimensions: **Technical** (does it work?), **Pedagogical** (does it teach?), and **UX** (is it usable?)
- The **Completeness Quality Score** provides a 100-point rubric that LLMs and humans can consistently apply
- **Standardization** follows a defined workflow: check existing score, validate structure, verify type-specific requirements, calculate and record quality
- **Metadata** is essential for discoverability—"You can't reuse what you can't find"
- The **MicroSim JSON Schema** provides comprehensive structure for Dublin Core, educational, technical, and search metadata
- **Automated evaluation** handles objective checks; **human evaluation** handles subjective judgments
- **Documentation standards** transform one-time creations into reusable educational assets
- Custom **rubrics** can extend the standard framework for domain-specific needs

---

## Reflection Questions

??? question "How would you prioritize evaluation dimensions for a time-limited review?"

If you only had 15 minutes to evaluate a MicroSim, you might focus on:
1. Does it load without errors? (Technical pass/fail)
2. Does it address its stated learning objective? (Pedagogical alignment)
3. Can a first-time user figure out how to interact with it? (Intuitiveness)

??? question "What metadata fields would be most valuable for your teaching context?"

Consider your specific needs:
- Do you need to filter by curriculum standards?
- Is accessibility information critical for your learners?
- Would Bloom's Taxonomy levels help you select appropriate complexity?

??? question "When would human evaluation be worth the additional time investment?"

Human evaluation is essential when:
- The MicroSim addresses common misconceptions (requires domain expertise)
- Cultural sensitivity is important (requires contextual judgment)
- The simulation will be widely deployed (higher stakes justify investment)

---

## References

1. Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.

2. Dublin Core Metadata Initiative. (2020). *DCMI Metadata Terms*. https://www.dublincore.org/specifications/dublin-core/dcmi-terms/

3. Nielsen, J. (1994). *Usability engineering*. Morgan Kaufmann.

4. Web Content Accessibility Guidelines (WCAG) 2.1. (2018). W3C Recommendation. https://www.w3.org/TR/WCAG21/

5. JSON Schema. (2020). *Understanding JSON Schema*. https://json-schema.org/understanding-json-schema/

