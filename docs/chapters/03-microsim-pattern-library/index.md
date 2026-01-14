---
title: The MicroSim Pattern Library
description: A comprehensive guide to visualization paradigms for MicroSim development, from motion simulations to state machines
generated_by: claude skill chapter-content-generator
date: 2024-12-18
version: 0.03
---

# The MicroSim Pattern Library

## Summary

This chapter provides a comprehensive overview of visualization paradigms used in MicroSim development. You will explore motion simulations, physics engines, dynamic systems, and cause-effect displays. The chapter covers relationship graphs, hierarchies, dependency mapping, and influence diagrams for network-style visualizations. You will also learn about sequence displays, timelines, charts for trends and distributions, spatial visualizations, flowcharts, state machines, and classification displays. By mastering these patterns, you will be able to select the most appropriate visualization approach for any learning objective.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Visualization Paradigm
2. Network Graph
3. Venn Diagram
4. Set Visualization
5. Motion Simulation
6. Physics Simulation
7. Dynamic Systems
8. Cause-Effect Display
9. Relationship Graph
10. Hierarchy Display
11. Dependency Mapping
12. Influence Diagram
13. Sequence Display
14. Process Timeline
15. Trend Chart
16. Distribution Chart
17. Correlation Display
18. Spatial Visualization
19. Flowchart
20. State Machine Diagram
21. Classification Display
22. Paradigm Selection
23. Concept Characteristics
24. Visual Affordances

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Learning Objective Analysis](../01-foundations-learning-objective-analysis/index.md)
- [Chapter 2: Prerequisite Analysis and MicroSim Fundamentals](../02-prerequisite-analysis-microsim-fundamentals/index.md)

---

## Welcome to the Visualization Buffet

If instructional design were a restaurant, this chapter would be the menu. And what a menu it is! We're about to explore over two dozen ways to visualize learning—from bouncing balls to branching flowcharts, from nested circles to networked nodes. By the end, you'll have a mental cookbook of visualization patterns ready to deploy whenever a learning objective crosses your desk.

Here's the beautiful truth about MicroSim development: **you don't need to reinvent the wheel every time you build something**. Most educational concepts fit into a handful of visualization patterns, and once you recognize which pattern matches your content, the design process becomes dramatically simpler. It's like having a key that unlocks the right template.

Think of this chapter as your pattern recognition training. We're going to look at each major visualization paradigm, understand when it shines, and see real examples in action. Ready to become a visualization virtuoso? Let's dive in!

## Understanding Visualization Paradigms

A **visualization paradigm** is a fundamental approach to representing information visually. It's the "shape" of your visualization—not the specific colors or labels, but the underlying structure that organizes information.

Choosing the right paradigm is like choosing the right vehicle for a journey. A sedan is great for highway driving, but terrible for crossing a river. A boat handles water beautifully but won't get you far on land. Similarly, a timeline is perfect for showing historical progression but hopeless for displaying hierarchical relationships.

| Paradigm Type | Best For | Examples |
|---------------|----------|----------|
| Motion/Physics | Continuous processes, cause-effect, dynamic systems | Pendulums, projectiles, wave propagation |
| Network/Graph | Relationships, connections, dependencies | Social networks, concept maps, organizational charts |
| Timeline/Sequence | Chronological progression, processes, workflows | Historical events, project phases, algorithms |
| Chart/Statistical | Quantitative comparisons, trends, distributions | Bar charts, line graphs, scatter plots |
| Spatial/Map | Geographic or spatial relationships | Location data, floor plans, anatomy |
| Flow/State | Decisions, processes, state transitions | Flowcharts, state machines, decision trees |
| Set/Classification | Categorization, overlapping groups, membership | Venn diagrams, classification matrices |

The magic happens when you match the paradigm to your content's inherent structure. Force a concept into the wrong paradigm, and learners struggle. Find the right fit, and understanding clicks into place like a puzzle piece finding its home.

#### Diagram: Visualization Paradigm Selection Guide

<details markdown="1">
<summary>Visualization Paradigm Selection Guide</summary>
Type: infographic

Purpose: Help learners quickly identify which visualization paradigm best fits their content type

Bloom Taxonomy Level: Apply

Learning Objective: Students will be able to select an appropriate visualization paradigm based on the characteristics of their learning content.

Layout: Decision-tree style flowchart with branching paths

Starting Question: "What type of information are you visualizing?"

Branch 1: "Changes over time?"
- Yes → "Continuous or discrete?"
  - Continuous → Motion/Physics Simulation
  - Discrete → Timeline/Sequence Display

Branch 2: "Relationships between entities?"
- Yes → "Hierarchical or networked?"
  - Hierarchical → Hierarchy Display
  - Networked → Network Graph

Branch 3: "Quantities or measurements?"
- Yes → "Comparing categories or showing trends?"
  - Categories → Bar/Distribution Chart
  - Trends → Line/Trend Chart
  - Relationships → Correlation/Scatter Display

Branch 4: "Categories or classifications?"
- Yes → "Overlapping or mutually exclusive?"
  - Overlapping → Venn Diagram
  - Exclusive → Classification Display

Branch 5: "Processes or decisions?"
- Yes → "Sequential or state-based?"
  - Sequential → Flowchart
  - State-based → State Machine Diagram

Branch 6: "Physical locations?"
- Yes → Spatial/Map Visualization

Visual Style: Clean flowchart with rounded rectangles and arrows
Color Scheme: Each paradigm family gets a distinct color
- Motion/Physics: Orange
- Network/Graph: Blue
- Timeline/Sequence: Green
- Charts: Purple
- Spatial: Teal
- Flow/State: Red
- Set/Classification: Yellow

Interactive Features:
- Click any endpoint to see example MicroSims
- Hover over branches for additional decision criteria
- Responsive design that adapts to window size

Implementation: HTML/CSS/JavaScript with SVG graphics
</details>

<iframe src="../../sims/viz-paradigm-selection/main.html" height="502px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/viz-paradigm-selection/main.html){ .md-button .md-button--primary }

## Motion and Physics Simulations

Let's start with the paradigm that brings learning to life—literally. **Motion simulations** show objects moving through space, while **physics simulations** add realistic forces like gravity, friction, and acceleration. These are the rock stars of STEM education because they let learners see abstract equations become tangible reality.

When Isaac Newton formulated $F = ma$, he probably didn't envision students dragging sliders on glowing screens to watch virtual apples fall. But here we are, living in the future, and it's glorious.

### When Motion Simulations Shine

Motion simulations are your go-to choice when teaching:

- **Kinematics**: Position, velocity, acceleration relationships
- **Dynamics**: Forces and their effects on motion
- **Oscillations**: Pendulums, springs, waves
- **Collisions**: Momentum and energy transfer
- **Projectile motion**: Trajectories under gravity

The key characteristic of motion simulations is that **time is a primary variable**. Things change, move, evolve. If your concept involves something going from point A to point B (or oscillating between them), motion simulation is probably your paradigm.

!!! example "Real-World MicroSim Examples"
    The MicroSim library includes numerous motion simulations such as the **Integer Operations Number Line** simulation, which animates addition and subtraction as movement along a number line—turning abstract arithmetic into visual journeys.

### Physics Simulation: Adding Realism

**Physics simulations** take motion simulations up a notch by incorporating realistic physical laws. Instead of just moving objects around, they calculate forces, apply constraints, and produce behavior that matches real-world expectations.

The learning power of physics simulations comes from their predictive capability. Learners can hypothesize what will happen, run the simulation, and immediately see if their mental model was correct. This predict-observe-explain cycle is educational gold.

| Physics Concept | Simulation Approach | Key Parameters |
|-----------------|---------------------|----------------|
| Gravity | Constant downward acceleration | g (9.8 m/s²) |
| Friction | Velocity-dependent opposing force | μ (coefficient) |
| Springs | Restoring force proportional to displacement | k (spring constant) |
| Collisions | Momentum and energy conservation | Elasticity coefficient |
| Air resistance | Velocity-squared drag | Drag coefficient |

#### Diagram: Physics Simulation Architecture

<details markdown="1">
<summary>Physics Simulation Architecture</summary>
Type: diagram

Purpose: Show the computational structure of a physics simulation engine

Bloom Taxonomy Level: Understand

Learning Objective: Students will be able to explain how physics simulations calculate motion over time using the simulation loop pattern.

Components to show:
- Input Layer:
  - User Controls (sliders, buttons)
  - Initial Conditions (position, velocity)
  - Physical Constants (gravity, friction)

- Simulation Loop (central, emphasized):
  - Calculate Forces
  - Update Acceleration (F = ma)
  - Update Velocity (v += a * dt)
  - Update Position (x += v * dt)
  - Check Boundaries/Collisions

- Output Layer:
  - Render Objects
  - Update Displays
  - Record Data

Connections:
- Arrow from Input Layer to Simulation Loop
- Circular arrow showing loop iteration
- Arrow from Loop to Output Layer
- Feedback arrow from Output back to Input (for interactive controls)

Visual Style: Block diagram with clear data flow
Color Scheme:
- Input: Green (user interaction)
- Simulation Loop: Blue (computation)
- Output: Orange (visualization)

Labels:
- "Time Step (dt)" on the loop
- "60 FPS = 16.67ms per frame"
- "Forces determine everything"

Implementation: SVG diagram with optional animation showing the loop cycling
</details>

<iframe src="../../sims/physics-sim-architecture/main.html" height="452px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/physics-sim-architecture/main.html){ .md-button .md-button--primary }

### Dynamic Systems: When Everything Affects Everything

**Dynamic systems** represent an important subset of physics simulations where multiple variables interact and influence each other over time. Unlike simple motion where one object follows a trajectory, dynamic systems involve feedback loops, equilibrium states, and emergent behavior.

Think of a predator-prey ecosystem. Rabbits eat grass and multiply. Foxes eat rabbits and multiply. More foxes mean fewer rabbits. Fewer rabbits mean fewer foxes. Fewer foxes mean more rabbits. And round and round we go—a beautiful, chaotic dance that simple equations somehow capture.

Dynamic system simulations are particularly powerful for teaching:

- **Systems thinking**: Understanding how parts interact
- **Equilibrium concepts**: Stable vs. unstable states
- **Feedback loops**: Positive and negative feedback
- **Emergent behavior**: Complex patterns from simple rules
- **Sensitivity to initial conditions**: Chaos theory basics

### Cause-Effect Displays: Making Connections Visible

**Cause-effect displays** are a specialized type of motion/dynamic simulation focused specifically on showing causal relationships. When you change X, what happens to Y? These simulations make abstract causation concrete and manipulable.

The pedagogical power here is enormous. Instead of telling learners "increasing temperature increases reaction rate," you let them drag a temperature slider and watch molecules bounce faster and collisions increase. The cause-effect relationship becomes visceral, not just verbal.

#### Diagram: Cause-Effect Display Template

<details markdown="1">
<summary>Cause-Effect Display Template</summary>
Type: microsim

Purpose: Demonstrate the standard structure of a cause-effect display MicroSim

Bloom Taxonomy Level: Apply

Learning Objective: Students will be able to design cause-effect MicroSims that clearly show relationships between input variables and output behaviors.

Canvas Layout:
- Top section: Title and brief instructions
- Left side (40%): Control panel with input variables
- Center (50%): Main visualization area
- Bottom: Output metrics and explanation

Control Panel Elements:
- 2-4 sliders for independent variables
- Each slider has:
  - Label with current value
  - Min/max range indicators
  - Units displayed
- Reset button
- "Show relationship" toggle

Visualization Area:
- Animated elements that respond to slider changes
- Color coding that intensifies/diminishes with effect
- Clear visual metaphor for the concept
- Real-time updates (no lag between input and display)

Output Metrics:
- Numerical display of dependent variable(s)
- Simple graph showing relationship (optional)
- Text explanation of current state

Behavior:
- Changes to any slider immediately update visualization
- Smooth transitions between states
- Clear visual feedback for cause-effect connection

Design Principles:
- Maximum 4 input variables (cognitive load management)
- Direct manipulation (sliders, not text input)
- Immediate feedback (under 100ms response)
- Multiple representations (visual + numerical)

Implementation: p5.js with responsive canvas
</details>

<iframe src="../../sims/cause-effect-display/main.html" height="502px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/cause-effect-display/main.html){ .md-button .md-button--primary }

## Network and Graph Visualizations

If motion simulations show how things *move*, network visualizations show how things *connect*. This paradigm family is all about relationships—who knows whom, what depends on what, how ideas link together.

In our increasingly connected world, network thinking is becoming essential. Social networks, supply chains, neural networks, concept maps—they all share the same underlying structure of nodes and edges. Master this paradigm, and you've got a tool for visualizing an enormous range of concepts.

### Network Graphs: Nodes and Edges

A **network graph** (also called a graph visualization) consists of:

- **Nodes** (vertices): The entities being related
- **Edges** (links): The relationships between entities

That's it. Two components. Yet from this simple foundation, we can represent astonishing complexity.

!!! example "Real-World MicroSim Examples"
    The MicroSim library includes the **Learning Graph Viewer** (vis-network), which displays concept dependencies as an interactive network where learners can explore how ideas connect and build upon each other.

Network graphs excel at teaching:

- **Social relationships**: Who knows whom, influence patterns
- **Dependencies**: What requires what, prerequisite structures
- **Semantic relationships**: How concepts relate
- **Organizational structures**: Reporting relationships, team compositions
- **System architectures**: Components and their connections

| Network Property | What It Reveals | Teaching Application |
|------------------|-----------------|----------------------|
| Degree (connections per node) | Importance/influence | Identify key concepts |
| Clustering | Community structure | Find related topics |
| Path length | Separation between nodes | Trace concept dependencies |
| Centrality | Most connected nodes | Find prerequisite concepts |
| Components | Disconnected subgraphs | Identify independent topics |

### Relationship Graphs: Adding Meaning to Connections

While basic network graphs just show that connections exist, **relationship graphs** add semantic meaning to those connections. The edge isn't just "connected to"—it's "depends on," "influences," "conflicts with," or "supports."

In educational contexts, relationship graphs help learners understand not just *that* concepts are related, but *how* they're related. This is crucial for building accurate mental models.

#### Diagram: Relationship Graph Types

<details markdown="1">
<summary>Relationship Graph Types</summary>
Type: graph-model

Purpose: Demonstrate different types of relationships that can be represented in graph visualizations

Bloom Taxonomy Level: Analyze

Learning Objective: Students will be able to distinguish between different relationship types and select appropriate edge representations for their content.

Node Types:
1. Concept Node (circles)
   - Color: Light blue
   - Properties: name, description

2. Example Node (rounded rectangles)
   - Color: Light green
   - Properties: name, detail

Edge Types (with visual encoding):
1. "PREREQUISITE" (solid arrow)
   - Direction: From required to dependent
   - Color: Dark blue
   - Meaning: Must understand A before B

2. "RELATED TO" (dashed line, no arrow)
   - Direction: Bidirectional
   - Color: Gray
   - Meaning: Conceptually connected

3. "CONTRASTS WITH" (dotted line, double arrow)
   - Direction: Bidirectional
   - Color: Red
   - Meaning: Important differences

4. "EXEMPLIFIES" (solid arrow)
   - Direction: From example to concept
   - Color: Green
   - Meaning: Instance of category

5. "INFLUENCES" (wavy arrow)
   - Direction: Unidirectional
   - Color: Orange
   - Meaning: Causal relationship

Sample Data:
- "Learning Objective" --PREREQUISITE→ "MicroSim Design"
- "Learning Objective" ←EXEMPLIFIES-- "Explain photosynthesis"
- "Motion Simulation" --CONTRASTS WITH-- "Static Diagram"
- "Visualization" --RELATED TO-- "Cognitive Load"
- "Complexity" --INFLUENCES→ "Learning Time"

Layout: Force-directed with relationship type affecting edge length
- PREREQUISITE: Short (tightly coupled)
- RELATED TO: Medium
- CONTRASTS WITH: Long (conceptual distance)

Interactive Features:
- Hover edge to see relationship description
- Click node to highlight all its relationships
- Filter by relationship type
- Zoom and pan

Visual Styling:
- Edge thickness based on strength (if applicable)
- Animated arrows for directional relationships
- Legend explaining all edge types

Implementation: vis-network JavaScript library
</details>

<iframe src="../../sims/relationship-graph-types/main.html" height="500px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/relationship-graph-types/main.html){ .md-button .md-button--primary }

### Hierarchy Displays: Top-Down Organization

**Hierarchy displays** are specialized network graphs where relationships are strictly top-down (or parent-child). Every node has at most one parent, creating a tree structure.

Hierarchies are everywhere in education:

- **Taxonomy structures**: Kingdom → Phylum → Class → Order...
- **Organizational charts**: CEO → VPs → Directors → Managers...
- **Outline structures**: Chapter → Section → Subsection...
- **Classification trees**: Decisions branching to subcategories

The visual convention for hierarchies places parent nodes above children, with connections flowing downward. This spatial arrangement reinforces the conceptual relationship.

!!! example "Real-World MicroSim Examples"
    The **Number Systems Hierarchy Diagram** shows how natural numbers nest within whole numbers, which nest within integers, which nest within rationals—a perfect example of hierarchical classification.

### Dependency Mapping: Following the Thread

**Dependency mapping** visualizes what depends on what. Unlike general networks where edges might mean anything, dependency maps specifically show prerequisite relationships: "Before you can understand X, you must understand Y."

This paradigm is crucial for instructional design because learning itself is a dependency problem. You can't teach calculus to someone who doesn't understand algebra. You can't explain recursion to someone who doesn't grasp function calls. Dependency maps make these invisible constraints visible.

The **Learning Graph Viewer** MicroSim is a prime example of dependency mapping in action—showing exactly which concepts must come before others in a course structure.

### Influence Diagrams: Causal Networks

**Influence diagrams** show how factors affect outcomes in complex systems. Unlike simple cause-effect displays (which typically show one cause affecting one effect), influence diagrams map entire networks of causal relationships.

These are particularly powerful for:

- **Decision analysis**: How choices lead to outcomes
- **Systems dynamics**: Feedback loops and delays
- **Risk assessment**: Factors affecting probability
- **Policy analysis**: Intervention points in complex systems

The visual encoding typically uses:
- Nodes for variables
- Arrows for causal influence
- Arrow thickness or color for strength of influence
- Plus/minus signs for direction of effect

## Set Visualizations and Classification

Sometimes the key insight isn't how things connect (networks) or how they move (simulations)—it's how they're categorized. **Set visualizations** show membership, overlap, and classification relationships.

### Venn Diagrams: The Classic Overlap

Ah, the **Venn diagram**—that beloved trio (or duo, or quartet) of overlapping circles that has graced whiteboards and textbooks for over a century. John Venn introduced them in 1880, and educators have been drawing them ever since.

Venn diagrams are perfect for showing:

- **Set membership**: What belongs where
- **Overlapping categories**: Items that fit multiple groups
- **Logical relationships**: Union, intersection, difference
- **Comparisons**: Similarities and differences between concepts

The power of the Venn diagram is its spatial mapping of logical relationships. Items in the overlap region share properties of both sets. Items outside all circles belong to neither category. The visual layout *is* the logic.

!!! example "Real-World MicroSim Examples"
    The **Number Systems Venn Diagram** and **Number Types Venn Diagram** MicroSims beautifully illustrate how different number types (Natural, Whole, Integer, Rational, Real) nest within each other, with interactive hover states explaining each region.

#### Diagram: Venn Diagram Builder

<details markdown="1">
<summary>Interactive Venn Diagram Builder</summary>
Type: microsim

Purpose: Allow learners to create and manipulate Venn diagrams to understand set relationships

Bloom Taxonomy Level: Apply, Analyze

Learning Objective: Students will be able to construct Venn diagrams representing relationships between categories and correctly place items in appropriate regions.

Canvas Layout (responsive):
- Left side (30%): Item palette and controls
- Center (60%): Main Venn diagram area
- Right side (10%): Region labels/counts

Control Panel:
- Number of sets selector: 2, 3, or 4
- Set name text inputs (editable labels)
- Item list with drag handles
- "Add Item" button
- "Reset" button

Venn Diagram Area:
- 2 sets: Two overlapping circles
- 3 sets: Three overlapping circles (classic Venn)
- 4 sets: Four overlapping ellipses (more complex)
- Each region highlighted on hover
- Item icons/labels positioned within regions

Interaction:
- Drag items from palette to diagram regions
- Items snap to nearest valid region
- Highlight region when dragging over
- Double-click item to remove
- Click region to see all items

Visual Styling:
- Each set: distinct semi-transparent color
- Overlap regions: blended colors
- Selected items: highlighted border
- Hover states: subtle glow effect

Validation:
- Optional "check" button to verify placement
- Green checkmark for correct placement
- Red X with explanation for incorrect

Implementation: p5.js or SVG with drag-and-drop
</details>

<iframe src="../../sims/venn-builder/main.html" height="502px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/venn-builder/main.html){ .md-button .md-button--primary }

### Set Visualizations: Beyond the Circle

While Venn diagrams are the poster child for set visualization, they're not the only option. **Set visualizations** encompass any approach to showing membership and categorization:

- **Euler diagrams**: Like Venns, but without requiring all overlap regions
- **Nested sets**: Concentric shapes showing subset relationships
- **UpSet plots**: Matrix-based approach for many overlapping sets
- **Containment maps**: Rectangular nesting (like treemaps)

The choice depends on your data. Three sets with significant overlap? Classic Venn. Seven sets with sparse overlap? UpSet plot. Strict hierarchy of containment? Nested rectangles.

### Classification Displays: Sorting and Categorizing

**Classification displays** focus on the act of categorization itself—taking items and sorting them into groups. Unlike Venn diagrams (which show the result of classification), classification displays often involve interactive sorting.

These are fantastic for assessment because they require active demonstration of understanding. Instead of passively viewing categories, learners must actively decide where items belong.

Types of classification displays:

- **Card sorting**: Drag items to category columns
- **Matrix classification**: Place items in row/column intersections
- **Hierarchical sorting**: Multi-level categorization
- **Binary trees**: Yes/no decision paths

#### Diagram: Classification Matrix Display

<details markdown="1">
<summary>Classification Matrix Display</summary>
Type: microsim

Purpose: Allow learners to classify items along two dimensions simultaneously

Bloom Taxonomy Level: Analyze, Evaluate

Learning Objective: Students will be able to classify items using two independent criteria and justify their placement in the resulting quadrants.

Canvas Layout:
- Title and instructions at top
- Main 2x2 (or larger) matrix grid in center
- Item bank on left or bottom
- Score/feedback area

Matrix Structure:
- Row headers: Dimension 1 categories (e.g., "High Cost / Low Cost")
- Column headers: Dimension 2 categories (e.g., "High Impact / Low Impact")
- Grid cells: Drop zones for items
- Each cell represents combination of both dimensions

Items:
- Displayed as cards in item bank
- Each card shows item name and optional description
- Draggable to matrix cells
- Visual feedback during drag

Interaction:
- Drag items from bank to matrix cells
- Items can be moved between cells
- Optional: click item for more details
- "Check" button for assessment mode

Feedback Modes:
1. Practice mode: Show correct answer after each placement
2. Assessment mode: Show results at end
3. Exploration mode: No right/wrong, just organization

Visual Styling:
- Distinct colors for each quadrant
- Items inherit quadrant color when placed
- Highlight valid drop zones during drag
- Animation for placement

Example Application:
- Learning activities classified by:
  - Rows: Bloom's level (Lower-order / Higher-order)
  - Columns: Engagement type (Passive / Active)

Implementation: HTML5 drag-and-drop or p5.js
</details>

<iframe src="../../sims/classification-matrix/main.html" height="502px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/classification-matrix/main.html){ .md-button .md-button--primary }

## Timelines and Sequence Displays

Time marches on, and sometimes that march is exactly what we need to visualize. **Timeline** and **sequence displays** show temporal relationships—what came before, what comes after, and how long things lasted.

History teachers have been drawing timelines since chalk met blackboard. But interactive digital timelines can do so much more: zoom in on specific eras, filter by category, link to detailed information, and even animate the passage of time.

### Sequence Displays: First This, Then That

**Sequence displays** show ordered events without necessarily emphasizing duration or specific dates. The focus is on order: Step 1, Step 2, Step 3.

These are essential for teaching:

- **Procedures**: How to do something
- **Algorithms**: Computational sequences
- **Processes**: How things unfold
- **Causal chains**: This leads to that leads to this

The visual convention is typically linear (horizontal or vertical), with clear numbering or arrows indicating direction.

### Process Timelines: Adding Time to Sequence

**Process timelines** combine sequence with duration. Not only do we see the order of events, but we see how long each phase lasts and when they overlap.

!!! example "Real-World MicroSim Examples"
    The **Chapter Content Generation Workflow Timeline** MicroSim shows the phases of creating textbook content, with each phase's duration and dependencies clearly visualized.

Process timelines are perfect for:

- **Project management**: Phases and milestones
- **Development cycles**: Design → Build → Test → Deploy
- **Biological processes**: Cell division stages
- **Historical analysis**: Overlapping periods and eras

#### Diagram: Interactive Process Timeline

<details markdown="1">
<summary>Interactive Process Timeline</summary>
Type: timeline

Purpose: Demonstrate a template for process-focused timeline MicroSims

Bloom Taxonomy Level: Understand, Analyze

Learning Objective: Students will be able to interpret process timelines to understand phase duration, overlap, and dependencies.

Time Period: Flexible (adapts to content)

Orientation: Horizontal (primary) with vertical swimlanes (optional)

Main Timeline Elements:
- Central time axis with tick marks
- Duration bars for each phase/activity
- Milestone markers (diamonds) for key events
- Dependency arrows between related items

Interactive Features:
- Zoom: Mouse wheel or pinch to zoom in/out on timeline
- Pan: Drag to scroll through time
- Filter: Toggle categories on/off
- Hover: Show detailed information popup
- Click: Expand to full phase description

Visual Encoding:
- Bar length = duration
- Bar color = category or status
- Bar position (vertical) = swimlane/track
- Opacity = certainty/confidence
- Pattern fill = different types within category

Example Data Structure:
```json
{
  "phases": [
    {"name": "Analysis", "start": 0, "end": 2, "color": "#3498db"},
    {"name": "Design", "start": 1, "end": 4, "color": "#2ecc71"},
    {"name": "Development", "start": 3, "end": 8, "color": "#e74c3c"},
    {"name": "Testing", "start": 6, "end": 9, "color": "#f39c12"}
  ],
  "milestones": [
    {"name": "Kickoff", "time": 0, "icon": "star"},
    {"name": "Design Review", "time": 4, "icon": "check"},
    {"name": "Launch", "time": 9, "icon": "rocket"}
  ]
}
```

Layout:
- Main canvas: Timeline visualization
- Side panel: Phase legend and details
- Bottom: Time scale with labels

Implementation: vis-timeline library or custom HTML5/SVG
</details>

<iframe src="../../sims/process-timeline/main.html" height="352px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/process-timeline/main.html){ .md-button .md-button--primary }

## Charts for Quantitative Data

Numbers tell stories, and charts help us read them. When your learning objective involves quantitative comparisons, trends, or distributions, you've entered chart territory.

Charts are so ubiquitous that it's easy to take them for granted. But choosing the right chart type is a genuine skill—and the wrong choice can mislead learners rather than enlighten them.

### Trend Charts: Change Over Time

**Trend charts** (typically line charts) show how values change over continuous time or some other continuous variable. The x-axis represents the independent variable, the y-axis the dependent variable, and the connecting line shows the pattern.

Trend charts answer questions like:

- Is it going up or down?
- How fast is it changing?
- Are there cycles or patterns?
- When did it change direction?
- How do multiple trends compare?

Key design decisions for trend charts:

| Decision | Options | When to Use |
|----------|---------|-------------|
| Scale | Linear vs. logarithmic | Log for exponential growth |
| Points | Shown vs. hidden | Show for sparse data |
| Line style | Solid vs. dashed | Distinguish actual vs. projected |
| Area fill | None vs. filled | Emphasize cumulative values |
| Multiple series | Overlaid vs. small multiples | Overlaid for comparison |

### Distribution Charts: Showing Spread

**Distribution charts** reveal how values are spread across a range. Instead of asking "what's the value?" they ask "how many values fall in each range?"

Common distribution visualizations:

- **Histograms**: Bars showing frequency in ranges
- **Box plots**: Summary statistics (median, quartiles, outliers)
- **Violin plots**: Distribution shape with density
- **Density plots**: Smooth continuous distribution curve

These are essential for statistics education, quality control concepts, and any domain where understanding variability matters as much as understanding averages.

### Correlation Displays: Relationships Between Variables

When you want to show how two quantitative variables relate, you need a **correlation display**—typically a scatter plot. Each point represents one observation, positioned according to its values on both variables.

Scatter plots reveal:

- **Positive correlation**: Points trend upward
- **Negative correlation**: Points trend downward
- **No correlation**: Points scattered randomly
- **Non-linear relationships**: Curved patterns
- **Outliers**: Points far from the trend

Adding a trend line (linear regression) quantifies the relationship and makes it visually explicit.

#### Diagram: Chart Type Selection Guide

<details markdown="1">
<summary>Chart Type Selection Guide</summary>
Type: infographic

Purpose: Help learners choose the appropriate chart type for their data

Bloom Taxonomy Level: Apply

Learning Objective: Students will be able to select the most appropriate chart type based on the nature of their data and the question they want to answer.

Layout: Decision matrix with data type on one axis and question type on the other

Data Types (rows):
- Categorical (names, groups)
- Time series (values over time)
- Distribution (spread of values)
- Relationship (two variables)
- Part-to-whole (percentages)

Question Types (columns):
- Compare values
- Show change
- Show composition
- Show distribution
- Show relationship

Matrix Cells (recommended chart types):
| | Compare | Change | Composition | Distribution | Relationship |
|---|---------|--------|-------------|--------------|--------------|
| Categorical | Bar | Grouped Bar | Stacked Bar | - | - |
| Time Series | Line | Area | Stacked Area | - | Dual Axis |
| Distribution | - | - | - | Histogram | - |
| Relationship | - | - | - | - | Scatter |
| Part-to-Whole | - | - | Pie/Donut | - | - |

Interactive Features:
- Click any cell to see example chart
- Hover for description of when to use
- Toggle "advanced charts" for more options (violin, treemap, etc.)
- "Show me" button generates sample chart

Visual Styling:
- Color-coded by chart family
- Icons representing each chart type
- Highlight "best practice" recommendations in green
- Warning symbols for commonly misused combinations

Implementation: Interactive HTML/CSS grid with JavaScript popups
</details>

<iframe src="../../sims/chart-selection/main.html" height="502px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/chart-selection/main.html){ .md-button .md-button--primary }

## Spatial Visualizations

Sometimes location is the key dimension. **Spatial visualizations** show where things are—on a map, in a room, across an anatomy, or through space.

### Maps: Geographic Context

When your content has a geographic component, **maps** provide the essential context. Students studying migration patterns, regional economics, climate zones, or historical campaigns need to see *where* things happened.

Interactive map features:

- **Zoom and pan**: Explore at different scales
- **Layers**: Toggle different data overlays
- **Markers**: Points of interest
- **Regions**: Colored areas (choropleth maps)
- **Movement arrows**: Show flows and migration

!!! example "Real-World MicroSim Examples"
    The **Interactive World Cities Map** MicroSim uses Leaflet to display major cities across continents, allowing learners to explore geographic distribution and urban patterns.

Maps aren't just for geography. Any spatial layout can use map-like visualization:

- **Campus maps**: Building locations and routes
- **Anatomical diagrams**: Organ locations and systems
- **Network topologies**: Physical device placement
- **Game boards**: Spatial strategy visualization

#### Diagram: Spatial Visualization Types

<details markdown="1">
<summary>Spatial Visualization Types</summary>
Type: diagram

Purpose: Show the variety of spatial visualization approaches and when to use each

Bloom Taxonomy Level: Understand

Learning Objective: Students will be able to distinguish between different spatial visualization types and select appropriate approaches for location-based content.

Layout: 2x3 grid of visualization type examples

Visualization Types:

1. Geographic Map
   - Use case: Real-world locations
   - Example: World map with city markers
   - Library: Leaflet
   - Features: Zoom, layers, real geography

2. Schematic Map
   - Use case: Simplified spatial relationships
   - Example: Subway map, circuit diagram
   - Library: SVG or Canvas
   - Features: Distorted for clarity, not to scale

3. Floor Plan
   - Use case: Indoor spaces, architecture
   - Example: Building layout, room arrangement
   - Library: SVG or Canvas
   - Features: To scale, overhead view

4. Anatomical Diagram
   - Use case: Biological structures
   - Example: Human body systems
   - Library: SVG with regions
   - Features: Labels, system highlighting

5. Network Topology
   - Use case: Physical system layout
   - Example: Computer network, power grid
   - Library: vis-network with fixed positions
   - Features: Geographic placement + connections

6. 3D Spatial
   - Use case: Volume, depth relationships
   - Example: Molecular structure, architectural walk-through
   - Library: Three.js
   - Features: Rotation, perspective

Visual Styling:
- Each type shown as a thumbnail with label
- Distinctive visual style for each
- "Best for" caption under each

Interactive Features:
- Click type to see larger example
- Hover for use case details

Implementation: Static SVG grid with modal popups for examples
</details>

<iframe src="../../sims/spatial-viz-types/main.html" height="452px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/spatial-viz-types/main.html){ .md-button .md-button--primary }

## Flow and State Diagrams

Some concepts are best understood as processes with decisions, branches, and states. **Flowcharts** and **state machine diagrams** excel at showing these logical structures.

### Flowcharts: Decisions and Processes

The humble **flowchart** might be the most widely recognized diagram type in business and technology. Rectangles for processes, diamonds for decisions, arrows for flow—it's a visual language that most professionals already speak.

Flowcharts are perfect for:

- **Algorithms**: Step-by-step computation
- **Business processes**: Workflows and procedures
- **Troubleshooting guides**: Decision trees
- **System interactions**: Data flow between components

The key insight flowcharts provide is **branching logic**. When you reach a decision point, the path you take depends on a condition. This fundamental concept underlies all programming and much of critical thinking.

!!! example "Real-World MicroSim Examples"
    The **MkDocs Build Process Workflow**, **ADDIE Model Workflow**, and **Data-Driven Ethics Process Flow** MicroSims all use Mermaid-based flowcharts to illustrate complex sequential processes with decision points.

### State Machine Diagrams: Being vs. Doing

While flowcharts focus on *what happens*, **state machine diagrams** focus on *what state the system is in*. This subtle distinction is crucial for understanding systems with persistence and memory.

A state machine consists of:

- **States**: Conditions the system can be in
- **Transitions**: Events that cause state changes
- **Guards**: Conditions that enable transitions
- **Actions**: Activities that occur during transitions

State machines are essential for teaching:

- **User interface behavior**: Button states, form validation
- **Protocol design**: Communication states
- **Game logic**: Character states, game phases
- **Workflow status**: Document approval stages

#### Diagram: State Machine Template

<details markdown="1">
<summary>State Machine Visualization Template</summary>
Type: diagram

Purpose: Provide a template for state machine MicroSims

Bloom Taxonomy Level: Analyze

Learning Objective: Students will be able to trace state transitions in a state machine diagram and predict system behavior given a sequence of events.

Components:

States (rounded rectangles):
- Name prominently displayed
- Optional: entry actions, exit actions
- Visual distinction for special states:
  - Initial state: filled circle
  - Final state: filled circle with ring
  - Current state: highlighted border

Transitions (arrows):
- Event label above arrow
- Guard condition in brackets [guard]
- Action after slash /action
- Self-loops for events that don't change state

Layout Options:
- Hierarchical: States arranged top-to-bottom
- Circular: States around a center
- Left-to-right: Timeline-like progression

Example State Machine (Document Workflow):
- States: Draft, Under Review, Approved, Rejected, Published
- Transitions:
  - Draft --submit→ Under Review
  - Under Review --approve→ Approved
  - Under Review --reject→ Rejected
  - Rejected --revise→ Draft
  - Approved --publish→ Published

Interactive Features:
- Click state to see description
- Click transition to see event details
- "Simulate" mode: click events to watch state changes
- Current state indicator moves with transitions
- Event history displayed

Visual Styling:
- State colors indicate category (e.g., active vs. terminal)
- Transition arrow colors indicate event type
- Animation for state transitions
- Pulsing effect on current state

Implementation: Mermaid.js for static, custom SVG/JS for interactive simulation
</details>

<iframe src="../../sims/state-machine-template/main.html" height="502px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/state-machine-template/main.html){ .md-button .md-button--primary }

## Paradigm Selection: The Art of Matching

Now that you've seen the full buffet of visualization paradigms, the crucial skill is selection. **Paradigm selection** is the art of looking at a learning objective and recognizing which visualization approach will best illuminate the concept.

This isn't always obvious. Consider teaching "how a bill becomes a law." You could use:

- A **flowchart** (focus on decision points and branches)
- A **timeline** (focus on sequence and duration)
- A **state machine** (focus on bill status transitions)
- A **network graph** (focus on stakeholder relationships)

Each reveals different aspects of the same process. The "right" choice depends on what aspect you want learners to understand.

### Concept Characteristics: The Diagnostic Framework

**Concept characteristics** are the inherent properties of educational content that suggest appropriate visualization approaches. By analyzing these characteristics, you can systematically match concepts to paradigms.

Key characteristics to analyze:

| Characteristic | Questions to Ask | Implications |
|----------------|------------------|--------------|
| **Temporality** | Does time matter? Is there sequence? | Timeline, sequence, motion |
| **Relationship structure** | How are parts related? Hierarchical? Networked? | Graph, hierarchy, influence diagram |
| **Quantitative nature** | Are there numbers? Comparisons? Distributions? | Charts, statistical displays |
| **Spatial organization** | Does location matter? Is there physical arrangement? | Maps, spatial diagrams |
| **Process vs. state** | Focus on actions or conditions? | Flowchart vs. state machine |
| **Category membership** | Are things being classified? Do categories overlap? | Venn diagram, classification display |
| **Causality** | Do things cause other things? Are there feedback loops? | Cause-effect, influence diagram |
| **Dynamism** | Does it change continuously? Are there forces? | Physics simulation, animation |

### Visual Affordances: What Visualizations "Suggest"

**Visual affordances** are the actions or interpretations that a visualization naturally suggests. A button looks "clickable." A slider looks "draggable." A network looks "explorable."

Understanding affordances helps you match visualization to learning activity:

- **Passive viewing**: Diagrams, infographics
- **Exploration**: Networks, maps, timelines
- **Manipulation**: Simulations, interactive charts
- **Construction**: Builders, editors, sorters
- **Prediction**: Cause-effect displays, simulations

The affordance should match the learning objective's verb. If learners need to "analyze relationships," give them an explorable network. If they need to "predict outcomes," give them a manipulable simulation. If they need to "classify items," give them a sorting activity.

#### Diagram: Paradigm-Affordance Mapping

<details markdown="1">
<summary>Paradigm-Affordance Mapping</summary>
Type: infographic

Purpose: Show how different visualization paradigms afford different types of learning interactions

Bloom Taxonomy Level: Evaluate

Learning Objective: Students will be able to evaluate the match between visualization paradigms and learning objectives based on affordance alignment.

Layout: Matrix with paradigms as rows and learning activities as columns

Paradigms (rows):
1. Motion/Physics Simulation
2. Network Graph
3. Hierarchy Display
4. Timeline/Sequence
5. Statistical Chart
6. Spatial Map
7. Flowchart
8. State Machine
9. Venn/Set Diagram
10. Classification Display

Learning Activities (columns):
1. Observe/Watch
2. Explore/Navigate
3. Compare/Contrast
4. Manipulate/Experiment
5. Predict/Hypothesize
6. Construct/Build
7. Classify/Sort
8. Trace/Follow
9. Analyze Relationships

Matrix Values (color-coded strength):
- Strong fit (green): Paradigm naturally affords this activity
- Moderate fit (yellow): Possible with additional design work
- Poor fit (red): Fighting against the paradigm's nature
- Not applicable (gray): Doesn't make sense for this combination

Example entries:
- Motion Simulation × Predict = Strong (natural experiment)
- Network Graph × Analyze Relationships = Strong (core purpose)
- Timeline × Trace/Follow = Strong (natural affordance)
- Venn Diagram × Classify/Sort = Strong (core purpose)
- Statistical Chart × Manipulate = Moderate (with interactive controls)

Interactive Features:
- Click cell to see examples of that combination
- Filter by Bloom's taxonomy level
- Highlight best matches for a given learning objective
- Export recommendations

Visual Styling:
- Color intensity indicates strength
- Icons for each activity type
- Hover details with rationale

Implementation: Interactive HTML table with filtering
</details>

<iframe src="../../sims/paradigm-affordance/main.html" height="452px" width="100%" scrolling="no"></iframe>
[Run Fullscreen](../../sims/paradigm-affordance/main.html){ .md-button .md-button--primary }

## Putting It All Together: Your Pattern Recognition Toolkit

Congratulations! You've just toured the complete MicroSim visualization landscape. Let's consolidate what you've learned into a practical toolkit you can use immediately.

### The Five-Minute Paradigm Selection Process

When faced with a new learning objective, run through this quick analysis:

1. **What's changing?**
   - Time → Timeline/Sequence
   - Position → Motion Simulation
   - State → State Machine
   - Quantity → Charts

2. **What's related?**
   - Hierarchy → Hierarchy Display
   - Network → Network Graph
   - Sets → Venn Diagram
   - Causes → Influence Diagram

3. **What should learners do?**
   - Observe → Any visualization
   - Explore → Network, Map, Timeline
   - Manipulate → Simulation, Interactive Chart
   - Classify → Venn, Classification Display
   - Trace → Flowchart, State Machine

4. **What level of Bloom's Taxonomy?**
   - Remember → Static diagrams, simple displays
   - Understand → Explorable visualizations
   - Apply → Interactive simulations
   - Analyze → Network analysis, cause-effect
   - Evaluate → Comparison tools, rubric applications
   - Create → Builders, editors, constructors

### Common Paradigm Pairings

Many MicroSims combine paradigms for richer learning experiences:

- **Simulation + Chart**: Show physics while graphing variables over time
- **Network + Timeline**: Display relationship evolution
- **Flowchart + State Machine**: Process view with state awareness
- **Map + Timeline**: Historical events with geographic context
- **Classification + Network**: Category membership plus relationships

### Your Pattern Library Is Your Superpower

Here's the optimistic truth that motivated this chapter: **most educational concepts fit known patterns**. The more patterns you recognize, the faster you can design effective MicroSims.

You're not starting from scratch every time. You're recognizing "Oh, this is a classification problem—I'll use a Venn or sorting approach" or "This involves feedback loops—influence diagram time." Pattern recognition transforms design from creative struggle to informed selection.

And remember: the AI tools you'll use in later chapters already know these patterns too. When you tell an AI "create a motion simulation showing harmonic oscillation" or "build a network graph of character relationships," you're speaking a shared language. The patterns are the vocabulary.

## Summary and Key Takeaways

Let's recap the visualization paradigms you've mastered:

**Motion and Physics Family:**
- Motion Simulation: Objects moving through space
- Physics Simulation: Realistic forces and behaviors
- Dynamic Systems: Multiple interacting variables
- Cause-Effect Display: Input → Output relationships

**Network and Graph Family:**
- Network Graph: Nodes and edges showing connections
- Relationship Graph: Semantic meaning on connections
- Hierarchy Display: Tree structures, parent-child
- Dependency Mapping: Prerequisites and requirements
- Influence Diagram: Causal networks

**Set and Classification Family:**
- Venn Diagram: Overlapping categories
- Set Visualization: Membership and containment
- Classification Display: Sorting and categorizing

**Timeline and Sequence Family:**
- Sequence Display: Ordered steps
- Process Timeline: Duration and overlap

**Chart Family:**
- Trend Chart: Change over continuous variable
- Distribution Chart: Spread of values
- Correlation Display: Relationship between variables

**Spatial Family:**
- Spatial Visualization: Location-based displays
- Maps: Geographic context

**Flow and State Family:**
- Flowchart: Processes with decisions
- State Machine Diagram: States and transitions

**Meta-Skills:**
- Paradigm Selection: Matching concept to visualization
- Concept Characteristics: Analyzing content properties
- Visual Affordances: Understanding what visualizations suggest

With these patterns in your toolkit, you're ready to tackle any learning objective and quickly identify the visualization approach that will make it shine. In the next chapter, we'll dive into actually writing MicroSim specifications—turning your paradigm selection into detailed blueprints that AI tools can build.

Welcome to the pattern library. Now go make some learning magic happen!

??? question "Review Questions"
    1. **What visualization paradigm would you choose for teaching the water cycle, and why?**

    The water cycle involves continuous transformation (liquid → gas → liquid) happening in different locations. A **motion/physics simulation** combined with **spatial visualization** would work well—showing particles moving through the cycle stages positioned on a simplified geography (ocean, atmosphere, mountains).

    2. **When would you choose a state machine diagram over a flowchart?**

    Choose a state machine when the **current state matters** for understanding behavior—when the system "remembers" where it is and that affects what can happen next. Flowcharts are better when you're showing a **linear process** that starts, executes, and ends without persistent state.

    3. **What concept characteristics suggest using a network graph?**

    Network graphs are indicated when: (a) multiple entities exist that need to be shown, (b) relationships between entities are non-hierarchical, (c) the pattern of connections matters for understanding, and (d) learners need to explore or analyze the relationship structure.
