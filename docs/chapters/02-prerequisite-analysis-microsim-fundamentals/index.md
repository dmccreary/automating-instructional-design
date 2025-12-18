---
title: Prerequisite Analysis and MicroSim Fundamentals
description: Learn the fundamentals of MicroSims and how to analyze prerequisite knowledge for effective educational simulation design
generated_by: claude skill chapter-content-generator
date: 2024-12-18
version: 0.03
---

# Prerequisite Analysis and MicroSim Fundamentals

## Summary

This chapter introduces the core concepts of MicroSims and interactive simulations while teaching you how to analyze prerequisite knowledge and concept dependencies. You will learn to identify assumed knowledge, map learning pathways, and assess whether a learning objective is ready for simulation. These skills are essential for designing effective educational simulations that meet learners where they are and build on their existing knowledge.

## Concepts Covered

This chapter covers the following 8 concepts from the learning graph:

1. MicroSim
2. Interactive Simulation
3. AI-Assisted Design
4. Prerequisite Knowledge
5. Assumed Knowledge
6. Simulation Readiness
7. Concept Dependencies
8. Learning Pathway

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Learning Objective Analysis](../01-foundations-learning-objective-analysis/index.md)

---

## The Birth of MicroSims: A Brief History

In 2023, educational technologist **Valarie Lockhart** coined the term "MicroSim" to describe a new paradigm in educational simulation design. The name captures the essence of the approach: *micro* for small, focused, single-concept learning experiences, and *sim* for simulation—interactive digital environments where learners can experiment, explore, and discover.

The timing wasn't accidental. As large language models exploded in capability, Lockhart and others recognized that the bottleneck in educational content creation was shifting. It was no longer primarily about *technical* capability—AI could now generate working code. The bottleneck had moved to *pedagogical* capability—knowing what to build and why.

!!! info "MicroSim Research Foundation"
    The theoretical framework for MicroSims was formalized in the paper "MicroSims: A Framework for AI-Generated, Scalable Educational Simulations with Universal Embedding and Adaptive Learning Support," published in November 2025. This paper established the principles for designing simulations that are both pedagogically sound and AI-generatable.

By December 2025, the first courses in generating intelligent textbooks using MicroSims were being taught by **Dan McCreary**. These courses leveraged the growing power of large language models and, crucially, introduced the concept of *Claude Code Skills*—structured rule sets that ensure consistency and high-quality content generation. Without such guardrails, AI-generated educational content tends to drift, vary wildly in quality, and miss pedagogical targets. Skills brought discipline to the creative process.

Today, hundreds of working MicroSim examples spanning audiences from kindergarten to graduate school are available in the [MicroSim Textbook](https://dmccreary.github.io/microsims/). This open resource demonstrates the breadth of what's possible when thoughtful instructional design meets AI-assisted implementation.

But enough history. Let's dive into what MicroSims actually *are* and why they matter for your work as an instructional designer.

## What Is an Interactive Simulation?

An **interactive simulation** is a digital environment that models some aspect of the real world (or an abstract concept) and allows users to manipulate variables, observe outcomes, and develop understanding through experimentation. Unlike passive content like videos or text, simulations put learners in the driver's seat.

Interactive simulations have been used in education for decades:

- **Flight simulators** train pilots without risking actual aircraft
- **PhET simulations** from the University of Colorado help students explore physics and chemistry
- **Business simulations** let MBA students run virtual companies
- **Medical simulations** allow practitioners to practice procedures safely

What makes these effective isn't just the interactivity—it's the *feedback loop*. Learners take an action, observe a consequence, adjust their mental model, and try again. This cycle mirrors how humans naturally learn through experience.

| Passive Learning | Interactive Learning |
|-----------------|---------------------|
| Watch a video about gravity | Drop virtual objects and observe acceleration |
| Read about supply and demand | Adjust price and quantity sliders, watch market response |
| Listen to a lecture on recursion | Step through a recursive algorithm visually |
| Memorize sorting algorithm steps | Watch algorithms race to sort different datasets |

The problem with traditional interactive simulations is that they're expensive and time-consuming to build. A high-quality PhET simulation might take a team of developers, designers, and subject matter experts months to create. That's fine for foundational concepts taught to millions of students, but it doesn't scale to the long tail of specialized topics.

Enter MicroSims.

## MicroSims: Simulations That Scale

A **MicroSim** is a small, focused interactive simulation designed to teach a single concept or learning objective. The "micro" isn't just about size—it's about *scope*. Each MicroSim targets one specific learning goal and does that one thing well.

Here's what distinguishes MicroSims from traditional educational simulations:

| Traditional Simulation | MicroSim |
|----------------------|----------|
| Covers many concepts | Covers one concept |
| Complex, feature-rich | Simple, focused |
| Months to develop | Hours to generate |
| Requires development team | Generated with AI assistance |
| Standalone application | Embeds in any web page |
| One-size-fits-all | Adaptable to audience level |

The power of MicroSims comes from their composability. Instead of building one massive simulation that tries to teach everything about a topic, you build a *library* of focused MicroSims that can be assembled into learning pathways. It's like the difference between a single encyclopedic textbook and a modular curriculum where each piece can be updated, replaced, or recombined independently.

#### Diagram: Traditional Simulation vs MicroSim Architecture

<details markdown="1">
<summary>Traditional Simulation vs MicroSim Architecture</summary>
Type: diagram

Purpose: Contrast the monolithic architecture of traditional simulations with the modular, composable architecture of MicroSims

Bloom Taxonomy Level: Understand

Learning Objective: Students will be able to explain the architectural differences between traditional simulations and MicroSim-based approaches.

Components to show:
Left side - Traditional Simulation:
- Large monolithic box labeled "Comprehensive Simulation"
- Multiple concepts listed inside (Concept A, B, C, D, E)
- Single entry point at top
- Heavy dependencies shown as tangled lines between concepts
- Labels: "Long development time", "Hard to update", "Fixed scope"

Right side - MicroSim Architecture:
- Multiple small boxes, each containing single concept
- MicroSim A, MicroSim B, MicroSim C, MicroSim D, MicroSim E
- Clean arrows showing optional learning pathways between them
- Central "Learning Pathway Manager" connecting to each
- Labels: "Quick to create", "Easy to update", "Flexible combinations"

Visual Style: Side-by-side comparison diagram
Color Scheme:
- Traditional: Grays and muted colors suggesting complexity
- MicroSim: Bright, distinct colors for each module suggesting clarity

Annotations:
- Arrow pointing to traditional: "Months to build"
- Arrow pointing to MicroSims: "Hours per simulation"
- Bottom comparison: "Update one concept = rebuild everything" vs "Update one concept = replace one MicroSim"

Implementation: HTML/CSS/SVG with responsive layout
</details>

### Characteristics of Effective MicroSims

Not every small simulation qualifies as a well-designed MicroSim. Effective MicroSims share several characteristics:

- **Single Learning Objective**: Each MicroSim targets exactly one learning objective at a specific Bloom's level
- **Immediate Feedback**: Learners receive instant visual or textual feedback on their actions
- **Learner Control**: Users can manipulate relevant parameters through intuitive controls (sliders, buttons, drag-and-drop)
- **Progressive Disclosure**: Complexity is revealed gradually, not dumped all at once
- **Embedded Assessment**: The simulation itself reveals whether learners understand the concept
- **Universal Embedding**: MicroSims work in any web context—LMS, textbook, standalone page
- **Responsive Design**: They adapt to different screen sizes and devices

!!! tip "The 30-Second Test"
    A well-designed MicroSim should communicate its purpose within 30 seconds. If a learner can't figure out what they're supposed to do or learn, the simulation needs work. Complexity should come from the *concept*, not the *interface*.

### MicroSim Types by Bloom's Level

Different learning objectives call for different types of MicroSims. Here's how MicroSim types map to Bloom's Taxonomy:

| Bloom's Level | MicroSim Type | Example |
|--------------|---------------|---------|
| Remember | Flashcard, Matching, Sorting | Drag vocabulary terms to definitions |
| Understand | Visualization, Animation, Comparison | Watch supply/demand curves shift and intersect |
| Apply | Calculator, Solver, Procedure Practice | Calculate compound interest with adjustable parameters |
| Analyze | Data Explorer, Pattern Finder, Relationship Mapper | Explore correlations in a dataset |
| Evaluate | Classifier, Rubric Applier, Decision Tree | Judge whether code samples follow best practices |
| Create | Model Builder, Designer, Composer | Build a state machine diagram from requirements |

This mapping isn't rigid—many MicroSims span multiple levels. But having a primary target level helps focus the design and ensures the simulation actually tests what you intend.

#### Diagram: MicroSim Types by Bloom's Level

<details markdown="1">
<summary>MicroSim Types by Bloom's Level</summary>
Type: infographic

Purpose: Show the mapping between Bloom's Taxonomy levels and appropriate MicroSim types with visual examples

Bloom Taxonomy Level: Understand

Learning Objective: Given a learning objective at a specific Bloom's level, students will be able to identify appropriate MicroSim types.

Layout: Six-row table/grid format with visual icons for each MicroSim type

Rows (bottom to top, matching Bloom's hierarchy):
1. Remember (Blue background)
   - Icon: Brain with cards
   - MicroSim Types: Flashcard Drill, Term Matcher, Concept Sorter
   - Example thumbnail: Cards being matched
   - Key action: "Recall and recognize"

2. Understand (Green background)
   - Icon: Lightbulb with animation frames
   - MicroSim Types: Animated Explainer, Comparison Viewer, Concept Visualizer
   - Example thumbnail: Animated diagram
   - Key action: "See and comprehend"

3. Apply (Yellow background)
   - Icon: Calculator/tool
   - MicroSim Types: Interactive Calculator, Step-by-Step Solver, Procedure Simulator
   - Example thumbnail: Slider adjusting values
   - Key action: "Use and execute"

4. Analyze (Orange background)
   - Icon: Magnifying glass over data
   - MicroSim Types: Data Explorer, Pattern Detector, Relationship Grapher
   - Example thumbnail: Network graph
   - Key action: "Examine and connect"

5. Evaluate (Pink background)
   - Icon: Balance scale with checkmarks
   - MicroSim Types: Quality Classifier, Rubric Applier, Decision Simulator
   - Example thumbnail: Items being sorted into categories
   - Key action: "Judge and decide"

6. Create (Purple background)
   - Icon: Pencil with sparkles
   - MicroSim Types: Model Builder, Design Canvas, Composition Tool
   - Example thumbnail: User-constructed diagram
   - Key action: "Design and produce"

Interactive Features:
- Hover over any MicroSim type to see full description
- Click to see live example from MicroSim library
- Filter by subject area

Implementation: HTML/CSS grid with icons and hover states, responsive design
</details>

## AI-Assisted Design: Your New Creative Partner

**AI-assisted design** refers to the use of artificial intelligence tools—particularly large language models like Claude—to help create educational content. This isn't about replacing instructional designers; it's about amplifying their capabilities.

Think of AI as a very fast, very knowledgeable assistant who can:

- Generate working code from natural language descriptions
- Produce multiple variations of content quickly
- Adapt existing content for different audiences
- Check specifications for completeness and consistency
- Suggest improvements based on pedagogical principles

But AI assistants have significant limitations:

- They don't inherently *understand* how humans learn
- They can generate plausible-sounding but pedagogically flawed content
- They may miss cultural context or accessibility requirements
- They need clear, specific instructions to produce quality output
- They can't evaluate whether a simulation actually teaches effectively

This is why the knowledge you're building in this course matters so much. AI is a powerful tool, but tools need skilled operators. A chainsaw in the hands of a trained arborist creates beautiful results; the same chainsaw wielded randomly creates a mess (and possibly a trip to the emergency room).

!!! warning "The Plausible Nonsense Problem"
    AI can generate content that *sounds* educational but doesn't actually support learning. It might create a simulation that's visually impressive but targets the wrong concept, or one that technically works but overwhelms learners with cognitive load. Your job as an instructional designer is to specify clearly and evaluate critically.

### The Human-AI Collaboration Loop

Effective AI-assisted design follows an iterative loop:

1. **Human specifies** the learning objective, audience, and constraints
2. **AI generates** a first draft (specification, code, content)
3. **Human evaluates** against pedagogical criteria
4. **Human refines** the specification based on what's missing or wrong
5. **AI regenerates** with improved instructions
6. **Repeat** until quality standards are met
7. **Human tests** with actual learners
8. **Human iterates** based on learner feedback

Notice that humans bookend the process. We define what success looks like, and we verify that we've achieved it. AI accelerates the middle steps but doesn't replace human judgment at the critical points.

#### Diagram: Human-AI Collaboration Loop

<details markdown="1">
<summary>Human-AI Collaboration Loop</summary>
Type: workflow

Purpose: Illustrate the iterative collaboration between human instructional designers and AI tools in MicroSim development

Bloom Taxonomy Level: Understand

Learning Objective: Students will be able to describe the stages of human-AI collaboration in educational content development.

Visual style: Circular workflow diagram with alternating human and AI steps

Steps (clockwise from top):
1. SPECIFY (Human, blue)
   - Icon: Person with document
   - Hover text: "Define learning objective, audience, and requirements"
   - Position: 12 o'clock

2. GENERATE (AI, purple)
   - Icon: Robot/AI chip
   - Hover text: "AI produces first draft of simulation or content"
   - Position: 2 o'clock

3. EVALUATE (Human, blue)
   - Icon: Person with magnifying glass
   - Hover text: "Check against pedagogical criteria and learning goals"
   - Position: 4 o'clock

4. REFINE (Human, blue)
   - Icon: Person with pencil
   - Hover text: "Improve specification based on evaluation"
   - Position: 6 o'clock

5. REGENERATE (AI, purple)
   - Icon: Robot with refresh arrow
   - Hover text: "AI creates improved version with better instructions"
   - Position: 8 o'clock

6. TEST (Human, blue)
   - Icon: Person with group of learners
   - Hover text: "Validate with actual target learners"
   - Position: 10 o'clock

Center element:
- "Quality MicroSim" with star icon
- Arrows showing iteration cycles

Annotations:
- Inner loop (steps 2-5): "Rapid iteration cycle"
- Outer path (including step 6): "Learner validation cycle"

Color coding:
- Human steps: Educational blue
- AI steps: Tech purple
- Arrows: Gradient between

Implementation: HTML/CSS/SVG with hover interactions, responsive circular layout
</details>

## Understanding Prerequisite Knowledge

**Prerequisite knowledge** is what learners must already know before they can successfully engage with new content. It's the foundation on which new learning is built. Miss this foundation, and everything constructed on top will be shaky.

Consider teaching someone to solve quadratic equations. What must they already know?

- Basic arithmetic operations
- Order of operations (PEMDAS)
- Variables and algebraic notation
- Solving linear equations
- The concept of squaring a number
- The concept of square roots

Try teaching the quadratic formula to someone who doesn't understand what a variable is, and you'll quickly discover why prerequisite analysis matters.

In the context of MicroSims, prerequisite knowledge determines:

- **What the MicroSim can assume** learners already understand
- **What vocabulary** can be used without explanation
- **What complexity** is appropriate for controls and displays
- **Where learners might struggle** if prerequisites are missing
- **What scaffolding** might be needed for learners with gaps

### Identifying Prerequisites

Prerequisites come in several varieties:

| Type | Description | Example for "Binary Search" |
|------|-------------|----------------------------|
| **Conceptual** | Abstract ideas that must be understood | Understanding what "sorted" means |
| **Procedural** | Skills or processes that must be mastered | Ability to compare two values |
| **Terminological** | Vocabulary that must be known | Words like "array," "index," "midpoint" |
| **Contextual** | Background knowledge that provides meaning | Why we might need to search large datasets |

Failing to identify prerequisites leads to the "curse of knowledge" problem—experts forget what it's like not to know something and inadvertently skip over crucial foundations.

!!! note "The Expert Blind Spot"
    Subject matter experts are often the worst at identifying prerequisites because the foundational knowledge has become so automatic they no longer notice it. This is why instructional designers add value—they can ask the "naive" questions that experts have forgotten to ask.

## Assumed Knowledge: Setting the Baseline

**Assumed knowledge** is a specific type of prerequisite—it's knowledge that learners are expected to bring to the learning experience, which won't be taught or reviewed. It's the documented starting point.

Every educational experience makes assumptions. A calculus course assumes algebra. A Python programming course might assume basic computer literacy but not prior programming experience. A corporate training on a new software tool might assume familiarity with the previous version.

The key is to make these assumptions *explicit*. This serves multiple purposes:

- **Learners** can self-assess whether they're ready
- **Instructional designers** know what to build on vs. what to teach
- **AI tools** know what vocabulary and concepts to use freely
- **Assessment** can distinguish between missing prerequisites and failure to learn new content

#### Diagram: Prerequisite vs Assumed Knowledge

<details markdown="1">
<summary>Prerequisite vs Assumed Knowledge</summary>
Type: diagram

Purpose: Clarify the relationship between prerequisite knowledge, assumed knowledge, and new content being taught

Bloom Taxonomy Level: Understand

Learning Objective: Students will be able to distinguish between prerequisite knowledge and assumed knowledge in instructional design.

Layout: Layered/foundation diagram showing knowledge building blocks

Components:
Bottom layer (Foundation):
- Label: "Assumed Knowledge"
- Color: Solid gray
- Description: "What learners are expected to already know—not taught in this course"
- Examples shown: "Basic computer literacy", "Reading comprehension", "Prior course content"
- Visual: Solid, stable blocks

Middle layer (Bridge):
- Label: "Prerequisite Knowledge"
- Color: Dotted/hatched pattern
- Description: "Required foundations—may need review or scaffolding"
- Examples: "Concepts from Chapter 1", "Prior module content"
- Visual: Blocks with some gaps that might need filling

Top layer (Target):
- Label: "New Content"
- Color: Bright blue
- Description: "What this chapter/module teaches"
- Examples: "MicroSim design", "Prerequisite analysis"
- Visual: New blocks being added

Side annotations:
- Arrow from Assumed to Prerequisite: "Builds on"
- Arrow from Prerequisite to New: "Enables"
- Gap indicator between layers: "Potential struggle points"

Right side checklist:
- "Assumed Knowledge: Document but don't teach"
- "Prerequisite Knowledge: Review or scaffold"
- "New Content: Primary focus"

Implementation: HTML/CSS layered diagram, responsive design
</details>

### Documenting Assumptions

When creating a MicroSim or any educational content, document assumptions clearly:

```markdown
## Assumed Knowledge

This MicroSim assumes learners:
- Can read and interpret basic graphs (x-y axes, data points)
- Understand the concept of variables in mathematics
- Have basic mouse/touchscreen interaction skills
- Know what "average" means in everyday language

This MicroSim does NOT assume:
- Prior statistics coursework
- Programming knowledge
- Familiarity with specific statistical software
```

This documentation helps everyone—including the AI tools generating content—understand the boundaries.

## Concept Dependencies: Mapping the Learning Landscape

**Concept dependencies** describe the relationships between concepts—specifically, which concepts must be understood before others can be learned. These dependencies form a graph structure where concepts are nodes and dependencies are directed edges.

Understanding dependencies is crucial because:

- **Sequencing**: You can't teach B before A if B depends on A
- **Diagnosis**: If a learner struggles with C, the problem might be with B or A
- **Scaffolding**: Knowing the chain helps identify where to provide support
- **Assessment**: Testing should check prerequisites before advanced concepts

### Types of Dependencies

Dependencies come in several flavors:

| Dependency Type | Description | Example |
|----------------|-------------|---------|
| **Hard prerequisite** | Absolutely must know A before B | Must know addition before multiplication |
| **Soft prerequisite** | Helpful to know A before B, but not strictly required | Helpful to know history of AI before studying current models |
| **Corequisite** | A and B should be learned together | Learning syntax and semantics of a programming construct |
| **Parallel** | A and B can be learned in any order | Different sorting algorithms |

Most learning graphs use hard prerequisites as their primary structure, with soft prerequisites as supplementary recommendations.

#### Diagram: Concept Dependency Graph Example

<details markdown="1">
<summary>Concept Dependency Graph Example</summary>
Type: graph-model

Purpose: Demonstrate how concept dependencies form a directed acyclic graph (DAG) using this chapter's concepts as an example

Bloom Taxonomy Level: Analyze

Learning Objective: Students will be able to read a concept dependency graph and identify prerequisite chains.

Node types:
1. Foundation Concepts (blue circles, largest)
   - From Chapter 1: Learning Objective, Bloom's Taxonomy

2. Chapter 2 Core Concepts (green circles, medium)
   - Interactive Simulation
   - MicroSim
   - AI-Assisted Design
   - Prerequisite Knowledge
   - Assumed Knowledge
   - Concept Dependencies
   - Simulation Readiness
   - Learning Pathway

Sample dependency structure:
- Learning Objective → MicroSim
- Learning Objective → Prerequisite Knowledge
- Interactive Simulation → MicroSim
- Bloom's Taxonomy → Simulation Readiness
- Prerequisite Knowledge → Assumed Knowledge
- Prerequisite Knowledge → Concept Dependencies
- Concept Dependencies → Learning Pathway
- MicroSim + AI-Assisted Design → Simulation Readiness

Edge types:
- REQUIRES (solid arrows): Hard prerequisite
- SUPPORTS (dashed arrows): Soft prerequisite

Layout: Hierarchical left-to-right showing dependency flow

Interactive features:
- Click node to highlight all prerequisites (upstream)
- Shift-click to highlight all dependents (downstream)
- Hover to see concept definition
- Toggle to show/hide soft prerequisites
- Animation showing "learning path" traversal

Visual styling:
- Node size indicates number of dependents
- Edge thickness indicates strength of dependency
- Color gradient from blue (foundational) to green (advanced)

Legend:
- Solid arrow: "Must learn first"
- Dashed arrow: "Helpful to learn first"
- Node size: "Number of concepts that depend on this"

Implementation: vis-network with hierarchical layout, responsive width
</details>

### Creating Dependency Maps

When designing a curriculum or analyzing existing content, creating a dependency map helps visualize the structure:

1. **List all concepts** to be covered
2. **For each concept, ask**: "What must a learner know before they can understand this?"
3. **Draw edges** from prerequisites to dependent concepts
4. **Check for cycles**—if you find any, there's a logical error (you can't require A before B and B before A)
5. **Identify entry points**—concepts with no prerequisites (these are your starting points)
6. **Identify culminating concepts**—concepts that nothing else depends on (these are your endpoints)

The resulting graph is a **Directed Acyclic Graph (DAG)**—directed because dependencies have a direction, and acyclic because there can't be circular dependencies.

## Learning Pathways: Routes Through the Content

A **learning pathway** is a sequence of concepts or learning experiences designed to take learners from their starting knowledge to a target goal. It's the route through the dependency graph.

Given a well-constructed dependency map, multiple valid pathways might exist. Consider a map with these dependencies:

```
A → C
B → C
C → D
C → E
D → F
E → F
```

To reach F, a learner must complete A or B (or both), then C, then both D and E. But the *order* of A and B, and the order of D and E, is flexible. Valid pathways include:

- A → B → C → D → E → F
- B → A → C → E → D → F
- A → C → D → B → C → E → F (with C reviewed)

### Personalized Pathways

One of the exciting possibilities with AI-assisted education is **personalized pathways**. Instead of all learners following the same fixed sequence, each learner's path can be:

- **Adjusted based on prior knowledge**: Skip what they already know
- **Branched based on interests**: Explore optional tangents
- **Paced based on performance**: Spend more time where needed
- **Varied based on learning style**: Different representations of the same concept

MicroSims support personalized pathways beautifully because they're modular. A pathway system can:

1. Assess what the learner already knows
2. Identify the shortest path to the learning goal
3. Recommend the next MicroSim to engage with
4. Track progress and adjust recommendations

#### Diagram: Learning Pathway Visualization

<details markdown="1">
<summary>Learning Pathway Visualization</summary>
Type: microsim

Purpose: Interactive demonstration of how learners can take different paths through a concept dependency graph based on their prior knowledge and goals

Bloom Taxonomy Level: Apply

Learning Objective: Students will be able to trace valid learning pathways through a dependency graph and identify which concepts can be skipped based on prior knowledge.

Canvas layout:
- Main area (80%): Graph visualization showing concepts as nodes
- Side panel (20%): Controls and pathway display

Visual elements:
- 12 concept nodes arranged in dependency graph
- Nodes colored by status: gray (locked), blue (available), green (completed), gold (current target)
- Directed edges showing prerequisites
- Highlighted path showing current recommended route

Sample concept graph:
- Start: "Basic Math" (entry point, no prerequisites)
- Level 1: "Variables", "Equations" (both require Basic Math)
- Level 2: "Functions" (requires Variables), "Inequalities" (requires Equations)
- Level 3: "Linear Functions", "Quadratic Equations"
- Goal: "Systems of Equations"

Interactive controls:
- Checkbox list: "Mark as already known" for each concept
- Dropdown: "Select your goal"
- Button: "Calculate shortest path"
- Button: "Reset"
- Display: Current pathway as numbered list
- Display: "Estimated time to goal"

Behavior:
- When concept marked as known, it turns green and dependents become available (blue)
- Clicking "Calculate shortest path" highlights the recommended route
- Clicking a concept shows its description and prerequisites
- Invalid paths (skipping prerequisites) show warning

Default state:
- All concepts locked except entry points
- Goal set to final concept
- Full pathway displayed

Animation:
- Smooth transitions when concepts unlock
- Path highlights with animated pulse

Implementation: p5.js with force-directed graph layout, responsive canvas using updateCanvasSize()
</details>

## Simulation Readiness: Is This Concept Ready for MicroSim Treatment?

Not every learning objective benefits equally from a MicroSim. **Simulation readiness** is an assessment of whether a given concept or learning objective is a good candidate for interactive simulation.

Some concepts are *highly* simulation-ready:

- Dynamic systems where variables interact
- Processes that unfold over time
- Cause-and-effect relationships
- Comparisons between approaches
- Concepts with visual or spatial components
- Procedures that can be practiced

Other concepts are *less* simulation-ready:

- Pure memorization of facts (flashcards might be better than simulations)
- Historical events (timelines or narratives might be better)
- Definitions and terminology (glossaries or matching games)
- Emotional or ethical reasoning (discussions or case studies)

### The Simulation Readiness Checklist

When evaluating whether to build a MicroSim for a learning objective, consider these questions:

**Interactivity Value**

- [ ] Can learners manipulate meaningful parameters?
- [ ] Do different inputs produce visibly different outputs?
- [ ] Is there something to *discover* through interaction?
- [ ] Would passive viewing be significantly less effective?

**Visual Representation**

- [ ] Can the concept be represented visually?
- [ ] Would visualization clarify rather than complicate?
- [ ] Are there relationships that diagrams can show better than text?

**Feedback Opportunity**

- [ ] Can the simulation provide immediate feedback?
- [ ] Can learners recognize when they're right or wrong?
- [ ] Is there a clear success state?

**Scope Appropriateness**

- [ ] Can the concept be isolated into a single MicroSim?
- [ ] Is the concept not too trivial (making a MicroSim overkill)?
- [ ] Is the concept not too complex (requiring multiple MicroSims)?

If you're answering "yes" to most of these, you have a good MicroSim candidate. If you're getting mostly "no" answers, consider a different content format.

#### Diagram: Simulation Readiness Assessment

<details markdown="1">
<summary>Simulation Readiness Assessment</summary>
Type: infographic

Purpose: Provide a visual decision tree for assessing whether a learning objective is a good candidate for MicroSim development

Bloom Taxonomy Level: Evaluate

Learning Objective: Given a learning objective, students will be able to assess its simulation readiness using established criteria.

Layout: Flowchart/decision tree with four main evaluation branches

Entry point:
- "Learning Objective" box at top
- Arrow down to first decision

Decision branches:

1. Interactivity Check (Blue branch)
   - Question: "Can learners manipulate meaningful parameters?"
   - Yes → Continue
   - No → "Consider: Visualization, Video, or Text"

2. Visualization Check (Green branch)
   - Question: "Can this be represented visually in a meaningful way?"
   - Yes → Continue
   - No → "Consider: Audio, Discussion, or Reading"

3. Feedback Check (Yellow branch)
   - Question: "Can the simulation provide immediate, meaningful feedback?"
   - Yes → Continue
   - No → "Consider: Practice exercises with delayed feedback"

4. Scope Check (Orange branch)
   - Question: "Can this fit in a single focused MicroSim?"
   - Yes → "✓ Good MicroSim Candidate!"
   - Too small → "Consider: Part of larger MicroSim"
   - Too large → "Consider: Multiple MicroSims"

End states (color-coded boxes):
- Green: "Build a MicroSim"
- Yellow: "Consider alternatives"
- Orange: "Adjust scope first"

Side panel: Quick checklist version of all criteria

Interactive features:
- Click each decision point for detailed explanation
- Hover for examples at each branch
- Input field to test your own learning objective

Implementation: HTML/CSS/JavaScript flowchart, responsive layout
</details>

## Putting It All Together: From Objective to MicroSim

Let's trace through the complete process of taking a learning objective and preparing it for MicroSim development.

**Starting Point**: "Students will understand how binary search works."

**Step 1: Refine the Objective**
This objective uses "understand"—not specific enough. Let's rewrite:
"Students will predict which half of a sorted array will be searched next during binary search execution."

**Step 2: Identify Prerequisites**
What must learners already know?

- What an array is (conceptual)
- What "sorted" means (conceptual)
- How to compare values (procedural)
- Array indexing notation (terminological)
- Why searching matters (contextual)

**Step 3: Document Assumed Knowledge**
We'll assume learners know:

- Basic programming concepts
- What arrays/lists are
- How to compare numbers

We won't assume:

- Any sorting algorithm knowledge
- Binary search specifically
- Big O notation

**Step 4: Map Dependencies**
Binary search understanding depends on:

- Arrays → Sorted Arrays → Binary Search
- Comparison Operations → Binary Search
- (Optional) Linear Search → Binary Search (for comparison)

**Step 5: Assess Simulation Readiness**

- Interactivity: YES—learners can step through and predict
- Visualization: YES—array and pointer positions are visual
- Feedback: YES—predictions can be immediately verified
- Scope: YES—single algorithm, single MicroSim

**Step 6: Specify the MicroSim**
Now we're ready to write a detailed specification that an AI tool or developer can implement. We know exactly what the learner should already understand, what we're teaching, and why a simulation is the right format.

!!! success "The Power of Preparation"
    This six-step process might seem like a lot of work before any "real" development happens. But this preparation is what makes AI-assisted generation effective. A clear specification with documented prerequisites and dependencies produces dramatically better results than a vague request like "make a binary search simulator."

## Chapter Summary

You've now learned the foundational concepts that bridge learning objectives and MicroSim development:

- **MicroSims** are small, focused simulations targeting single learning objectives—coined by Valarie Lockhart in 2023 and formalized in the 2025 research framework
- **Interactive simulations** put learners in control, creating powerful feedback loops for learning
- **AI-assisted design** amplifies instructional designers' capabilities but requires clear specifications and human judgment
- **Prerequisite knowledge** is what learners must know before engaging with new content
- **Assumed knowledge** is the documented baseline that won't be taught
- **Concept dependencies** form graphs that structure curriculum sequencing
- **Learning pathways** are routes through the dependency graph from start to goal
- **Simulation readiness** assesses whether a concept is a good MicroSim candidate

With these tools, you're ready to start analyzing any learning domain for MicroSim potential. In the next chapter, we'll explore the pattern library of visualization types and match them to different kinds of learning objectives.

Remember: The world needs better education, and now we have tools to create it at scale. That's not just professionally exciting—it's genuinely optimistic. Every well-designed MicroSim has the potential to help someone learn something they couldn't learn before. And that makes the world a little bit better, one simulation at a time.

---

## Review Questions

??? question "Who coined the term 'MicroSim' and when?"
    **Valarie Lockhart** coined the term "MicroSim" in **2023** to describe small, focused interactive simulations designed to teach single concepts.

??? question "What are the key differences between traditional educational simulations and MicroSims?"
    Key differences include:

    | Traditional Simulation | MicroSim |
    |----------------------|----------|
    | Covers many concepts | Covers one concept |
    | Months to develop | Hours to generate |
    | Requires development team | Generated with AI assistance |
    | Standalone application | Embeds in any web page |
    | One-size-fits-all | Adaptable to audience |

    The fundamental shift is from monolithic, expensive productions to modular, composable, AI-assisted creations.

??? question "What is the difference between prerequisite knowledge and assumed knowledge?"
    **Prerequisite knowledge** is what learners must know before engaging with new content—it may need to be reviewed or scaffolded.

    **Assumed knowledge** is a subset of prerequisites that is documented as the baseline expectation—it won't be taught or reviewed in the current content. It's the explicit starting line.

??? question "What four criteria should be evaluated to assess simulation readiness?"
    The four key criteria are:

    1. **Interactivity Value**: Can learners manipulate meaningful parameters with different outcomes?
    2. **Visual Representation**: Can the concept be effectively shown visually?
    3. **Feedback Opportunity**: Can the simulation provide immediate, meaningful feedback?
    4. **Scope Appropriateness**: Can the concept fit in a single focused MicroSim?

    If most answers are "yes," the concept is a good MicroSim candidate.

??? question "Where can you find hundreds of working MicroSim examples?"
    The [MicroSim Textbook](https://dmccreary.github.io/microsims/) contains hundreds of working MicroSim examples spanning audiences from kindergarten to graduate school, demonstrating the breadth of what's possible with AI-assisted educational simulation design.
