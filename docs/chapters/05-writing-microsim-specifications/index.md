---
title: Writing Effective MicroSim Specifications
description: Master the art of Specification-Driven Design to create crystal-clear MicroSim specifications that AI tools can implement faithfully.
generated_by: claude skill chapter-content-generator
date: 2025-12-18 14:30:00
version: 0.03
---

# Writing Effective MicroSim Specifications

## Summary

This chapter teaches you how to write clear, complete specifications for MicroSim development. You will learn the anatomy of a specification document, how to describe visual elements without writing code, and how to specify interaction behaviors and constraints. The chapter covers defining success criteria, documenting edge cases, avoiding specification ambiguity, preserving pedagogical intent, and understanding how AI interprets your specifications. These skills ensure that generated MicroSims match your educational vision.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Specification Document
2. Visual Description
3. Interaction Behavior
4. Behavior Constraints
5. Success Criteria
6. Edge Case Definition
7. Specification Ambiguity
8. Intent Preservation
9. AI Interpretation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Prerequisite Analysis and MicroSim Fundamentals](../02-prerequisite-analysis-microsim-fundamentals/index.md)
- [Chapter 4: Visualization Libraries and Tools](../04-visualization-libraries-tools/index.md)

---

## The Power of Specification-Driven Design

**Specification-Driven Design (SDD) is the single most important skill you'll develop as an instructional designer working with AI tools.** It's the difference between getting a MicroSim that makes you say "Yes! That's exactly what I imagined!" versus one that makes you wonder if the AI was having an off day.

Here's the revolutionary insight: you don't need to write code. You don't need to understand JavaScript, p5.js, or CSS. What you *do* need is the ability to describe *precisely* what you want—the WHAT, not the HOW. Think of yourself as the architect, not the construction crew. Your blueprints need to be so clear that any builder (or AI) could construct your vision without asking a single clarifying question.

Why does this matter for making the world a better place? Because every hour you spend fighting with vague specifications is an hour you could spend helping students learn. Every frustrating round of "that's not what I meant" is cognitive energy stolen from educational innovation. When you master SDD, you unlock the ability to rapidly prototype, iterate, and deploy educational experiences that genuinely transform how people understand difficult concepts.

The spec is spec-tacular when done right. (Sorry, not sorry for the pun—we promised fun!)

## What Is a Specification Document?

A **specification document** is your detailed blueprint for a MicroSim. It answers every question an implementer might have *before* they ask it. Think of it as a contract between your educational vision and the AI that will bring it to life.

A well-crafted specification document contains these essential components:

- **Title and Purpose**: What is this MicroSim called, and why does it exist?
- **Learning Objective**: What specific concept or skill should students gain?
- **Visual Description**: What should the learner see on screen?
- **Interaction Behavior**: What can the learner do, and how does the system respond?
- **Behavior Constraints**: What are the limits and boundaries of the simulation?
- **Success Criteria**: How do we know the MicroSim is working correctly?
- **Edge Cases**: What happens at the boundaries of normal operation?

| Component | Purpose | Example Question It Answers |
|-----------|---------|----------------------------|
| Title | Identification | "What do we call this?" |
| Learning Objective | Educational focus | "What will students learn?" |
| Visual Description | Appearance | "What does it look like?" |
| Interaction Behavior | User actions | "What can students do?" |
| Behavior Constraints | Boundaries | "What can't happen?" |
| Success Criteria | Validation | "How do we know it works?" |
| Edge Cases | Robustness | "What about weird situations?" |

!!! tip "The Coffee Shop Test"
    Imagine describing your MicroSim to a friend at a coffee shop who has never seen it. If they could sketch it on a napkin and describe how it works, your specification is clear enough. If they look confused and ask "but what happens when...?" you need more detail.

## Visual Description: Painting with Words

A **visual description** specifies exactly what learners see on screen without writing any code. This is where many specifications fail—being too vague or too technical. The sweet spot is detailed prose that creates a clear mental picture.

### The Anatomy of a Great Visual Description

A strong visual description addresses these elements:

- **Layout**: Where are elements positioned relative to each other?
- **Components**: What objects, shapes, or UI elements exist?
- **Colors**: What color scheme communicates your message?
- **Size relationships**: What's big, what's small, what's emphasized?
- **Text and labels**: What words appear on screen?
- **Dynamic elements**: What moves or changes?

### Example: The Vague vs. The Vivid

Consider this **vague** visual description:

> "Show some balls bouncing around with gravity."

Now compare it to this **vivid** specification:

> "The canvas displays a 600-pixel wide by 400-pixel tall physics playground with a light gray background (#f0f0f0). Five circles of varying sizes (diameters: 20, 30, 40, 50, and 60 pixels) start at random horizontal positions along the top of the canvas. Each ball has a distinct color from a warm palette: red (#e74c3c), orange (#e67e22), yellow (#f1c40f), pink (#fd79a8), and coral (#ff7675). The balls fall under simulated gravity (acceleration of 0.5 pixels per frame squared), bounce off the bottom edge with 80% energy retention, and bounce off the left and right walls with 95% energy retention. A horizontal line marks the 'ground' at y=380, drawn as a 2-pixel thick dark gray line."

The second version leaves nothing to imagination or interpretation. An AI—or a human developer—could implement this without asking any questions.

<iframe src="../../sims/visual-description-checklist/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/visual-description-checklist/main.html){ .md-button .md-button--primary }

#### Diagram: Visual Description Completeness Checklist

<details markdown="1">
<summary>Visual Description Completeness Checklist</summary>
Type: infographic

Bloom Taxonomy Level: Remember/Understand

Learning Objective: Students will be able to recall and verify that their visual descriptions include all essential components.

Purpose: Provide an interactive checklist that instructional designers can use to verify their visual descriptions are complete.

Layout: A vertical checklist with expandable sections for each category.

Categories and items:
1. Canvas/Container
   - [ ] Width specified (pixels or responsive)
   - [ ] Height specified (pixels or responsive)
   - [ ] Background color (hex code or named)
   - [ ] Border or frame description

2. Visual Elements
   - [ ] Each element named/identified
   - [ ] Shape or form described
   - [ ] Size (absolute or relative)
   - [ ] Position (absolute, relative, or algorithmic)
   - [ ] Color (hex codes preferred)

3. Text Elements
   - [ ] Font size specified
   - [ ] Text content defined
   - [ ] Position described
   - [ ] Color specified

4. Dynamic Elements
   - [ ] Initial state described
   - [ ] Motion or change pattern specified
   - [ ] Speed or timing noted

5. Layout Relationships
   - [ ] Spacing between elements
   - [ ] Alignment rules
   - [ ] Responsive behavior

Interactive features:
- Click checkbox to mark complete
- Hover over items to see example specifications
- Progress bar shows completion percentage
- Export checklist as text for documentation

Visual style: Clean, minimal design with green checkmarks for completed items
Color scheme: White background, dark gray text, green (#27ae60) for completed items

Implementation: HTML/CSS/JavaScript with localStorage for saving state
</details>

## Interaction Behavior: The Dance of User and System

**Interaction behavior** describes the dynamic relationship between what the learner does and how the MicroSim responds. This is where simulations come alive—and where specifications often fall short.

Every interaction has three parts:

1. **Trigger**: What action does the user take?
2. **Response**: What does the system do in reaction?
3. **Feedback**: How does the user know something happened?

### Types of Interactions

| Interaction Type | User Action | Common Responses |
|-----------------|-------------|------------------|
| Click | Mouse click or tap | Toggle state, select object, trigger animation |
| Drag | Click and move | Reposition element, adjust value, draw path |
| Slider | Move handle | Change parameter value continuously |
| Hover | Mouse over element | Show tooltip, highlight, preview |
| Input | Type in field | Update calculation, filter display |
| Button | Press button | Start/stop, reset, submit |

### Specifying Interactions with Precision

A vague interaction specification might say:

> "Users can adjust the speed."

A precise specification says:

> "A horizontal slider labeled 'Speed' appears below the animation canvas. The slider ranges from 0.1 (labeled 'Slow Motion') to 3.0 (labeled 'Fast Forward') with a default value of 1.0 (labeled 'Normal'). As the user drags the slider handle, the simulation speed multiplier updates in real-time—no button press required. The current numeric value displays above the slider, updating as the handle moves. Moving the slider to 0.1 causes the animation to run at one-tenth speed; moving to 3.0 causes it to run at triple speed."

The precise version answers every question: What's the range? What are the labels? What's the default? When does it take effect? What feedback does the user receive?

<iframe src="../../sims/interaction-spec-template/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/interaction-spec-template/main.html){ .md-button .md-button--primary }

#### Diagram: Interaction Specification Template

<details markdown="1">
<summary>Interaction Specification Template</summary>
Type: diagram

Bloom Taxonomy Level: Apply

Learning Objective: Students will be able to structure interaction specifications using a consistent template that ensures completeness.

Purpose: Show the three-part structure of a well-specified interaction.

Components:
1. Box labeled "TRIGGER" (blue, left side)
   - Contains: User action description
   - Sub-box: Input device (mouse, keyboard, touch)
   - Sub-box: Specific action (click, drag, type, etc.)
   - Sub-box: Target element

2. Arrow from Trigger to Response (labeled "causes")

3. Box labeled "RESPONSE" (orange, center)
   - Contains: System behavior
   - Sub-box: What changes (visual, data, state)
   - Sub-box: How fast (immediate, animated, delayed)
   - Sub-box: Affected elements

4. Arrow from Response to Feedback (labeled "produces")

5. Box labeled "FEEDBACK" (green, right side)
   - Contains: User perception
   - Sub-box: Visual feedback (color change, animation)
   - Sub-box: Audio feedback (click sound, completion tone)
   - Sub-box: Text feedback (labels, tooltips, messages)

Layout: Horizontal flow from left to right
Connecting arrows: Curved arrows with labels

Style: Rounded rectangles with drop shadows, icon in each box
Color scheme: Blue (#3498db) for trigger, orange (#e67e22) for response, green (#2ecc71) for feedback

Implementation: SVG or Mermaid diagram
</details>

## Behavior Constraints: Setting the Rules of the Game

**Behavior constraints** define what *can't* happen in your MicroSim. They're the guardrails that prevent unexpected behavior and ensure the simulation stays educationally valid.

Think of constraints as the rules of physics in your MicroSim universe. Without them, balls might fall through floors, sliders might accept negative numbers where they shouldn't, and simulations might enter states that confuse rather than educate.

### Categories of Constraints

1. **Value Constraints**: Limits on numerical inputs and outputs
   - Minimum and maximum values
   - Allowed increments (whole numbers only, multiples of 5, etc.)
   - Prohibited values (division by zero, negative quantities where inappropriate)

2. **State Constraints**: Rules about what states are valid
   - Mutually exclusive options (can't be both running and paused)
   - Required sequences (must click Start before Stop becomes available)
   - Valid combinations (certain parameters only valid together)

3. **Physical Constraints**: Rules that mirror real-world physics
   - Objects can't overlap (collision detection)
   - Values conserved (energy, mass, etc.)
   - Causality respected (effects follow causes)

4. **Pedagogical Constraints**: Rules that ensure learning
   - Prevent skipping required steps
   - Ensure students see consequences of actions
   - Maintain appropriate difficulty progression

### Example: Constraint Specification

Consider a MicroSim teaching supply and demand curves:

> **Value Constraints:**
> - Price cannot be negative (minimum: $0.00)
> - Price cannot exceed $1000.00
> - Quantity cannot be negative (minimum: 0 units)
> - Quantity cannot exceed 10,000 units
>
> **State Constraints:**
> - Supply and demand curves must always be visible (cannot be turned off)
> - Equilibrium point marker appears only when curves intersect within visible range
>
> **Physical Constraints:**
> - Demand curve must slope downward (higher price = lower quantity demanded)
> - Supply curve must slope upward (higher price = higher quantity supplied)
> - Curves cannot have the same slope (would never intersect or always overlap)
>
> **Pedagogical Constraints:**
> - Equilibrium price and quantity must be displayed numerically, not just graphically
> - When user adjusts demand shifters, the old demand curve remains visible as a dashed line for 3 seconds to show the shift

## Success Criteria: How Do We Know It Works?

**Success criteria** are specific, testable conditions that prove your MicroSim functions correctly. They're not subjective assessments like "looks good"—they're concrete checkpoints you can verify.

Good success criteria follow the SMART framework:

- **S**pecific: Exactly what should happen
- **M**easurable: Can be objectively verified
- **A**chievable: Technically possible
- **R**elevant: Connected to the learning objective
- **T**estable: Can be checked through observation

### Writing Success Criteria

Transform vague goals into testable criteria:

| Vague Goal | SMART Success Criterion |
|------------|------------------------|
| "Animation should be smooth" | "Animation runs at 60 frames per second with no visible stuttering when tested on Chrome, Firefox, and Safari" |
| "Slider should work" | "Moving the slider from 0 to 100 updates the displayed value within 50ms, with the simulation reflecting the new value within the same animation frame" |
| "Should handle bad input" | "Typing non-numeric characters in the input field produces no change to the simulation; a red outline appears on the input field and a tooltip reads 'Please enter a number'" |
| "Colors should be accessible" | "All text maintains a minimum contrast ratio of 4.5:1 against background colors; simulation remains interpretable in grayscale mode" |

### A Complete Success Criteria Section

Here's what success criteria look like for a pendulum simulation:

> **Functional Criteria:**
> 1. Pendulum swings continuously until damping reduces amplitude below 1 pixel
> 2. Period changes inversely with the square root of gravity (doubling gravity reduces period by factor of √2)
> 3. Period is independent of mass (changing mass has no effect on swing timing)
> 4. Amplitude affects maximum velocity but not period
>
> **Technical Criteria:**
> 1. Animation maintains 60fps during normal operation
> 2. All controls respond within 100ms of user input
> 3. Simulation remains stable for at least 10 minutes of continuous operation
> 4. Reset button returns all values to documented defaults within one frame
>
> **Pedagogical Criteria:**
> 1. Students can discover that period is independent of mass through experimentation
> 2. The relationship between length and period is visually apparent when adjusting the length slider
> 3. Energy display updates in real-time, showing conservation of energy principle

<iframe src="../../sims/success-criteria-workflow/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/success-criteria-workflow/main.html){ .md-button .md-button--primary }

#### Diagram: Success Criteria Flow

<details markdown="1">
<summary>Success Criteria Validation Workflow</summary>
Type: workflow

Bloom Taxonomy Level: Evaluate

Learning Objective: Students will be able to systematically validate MicroSims against defined success criteria.

Purpose: Show the process for validating a MicroSim against its success criteria.

Visual style: Flowchart with decision diamonds and process rectangles

Steps:
1. Start: "MicroSim Generated"
   Hover text: "AI has produced a working MicroSim from your specification"

2. Process: "Load Success Criteria Checklist"
   Hover text: "Open the specification document to the success criteria section"

3. Process: "Test Functional Criterion #1"
   Hover text: "Manually verify the first functional requirement"

4. Decision: "Criterion Met?"
   Hover text: "Does the MicroSim behavior match the specification exactly?"

5a. Process: "Document Pass" (if Yes)
    Hover text: "Check off the criterion and note any observations"

5b. Process: "Document Failure Details" (if No)
    Hover text: "Record exactly how behavior differs from specification"

6. Decision: "More Criteria?"
   Hover text: "Are there additional criteria to test?"

7a. Return to Step 3 (if Yes)

7b. Decision: "All Criteria Passed?" (if No more criteria)
    Hover text: "Review overall results"

8a. End: "MicroSim Approved" (if all passed)
    Hover text: "MicroSim ready for deployment or next phase"

8b. Process: "Create Refinement Request" (if some failed)
    Hover text: "Document specific issues for AI to address in next iteration"
    Return to Step 1

Color coding:
- Blue: Testing steps
- Yellow: Decision points
- Green: Success outcomes
- Orange: Iteration paths

Implementation: Mermaid flowchart or custom SVG
</details>

## Edge Case Definition: Planning for the Unexpected

**Edge cases** are the boundary conditions and unusual situations that test the robustness of your MicroSim. They're the "what if?" scenarios that students will inevitably discover—often accidentally, sometimes mischievously.

Edge cases aren't bugs waiting to happen; they're opportunities for learning when handled thoughtfully. A well-specified edge case defines both the unusual condition AND the desired response.

### Common Categories of Edge Cases

1. **Extreme Values**: Minimums, maximums, and values at boundaries
2. **Zero and Near-Zero**: Empty sets, zero quantities, infinitesimally small values
3. **Rapid Actions**: Quick repeated clicks, fast slider movements
4. **Invalid Inputs**: Wrong data types, out-of-range values
5. **Timing Issues**: Actions during animations, interrupted processes
6. **State Combinations**: Unusual but valid combinations of settings

### Specifying Edge Cases Properly

For each edge case, specify:

1. **The Condition**: What unusual situation might occur?
2. **The Trigger**: How would this situation arise?
3. **The Expected Behavior**: What should the MicroSim do?
4. **The Rationale**: Why is this the correct response?

**Example Edge Case Specifications:**

> **Edge Case 1: Division by Zero**
> - Condition: User adjusts denominator to zero in a fraction visualization
> - Trigger: Dragging the denominator slider to its minimum value of 0
> - Expected Behavior: Slider stops at 1 (not 0); tooltip appears saying "The denominator cannot be zero—that would break mathematics! (And create a black hole in our server room.)"
> - Rationale: Prevents undefined mathematical operations while using humor to make the constraint memorable
>
> **Edge Case 2: Rapid Clicking**
> - Condition: User clicks "Next Step" button faster than animation completes
> - Trigger: Multiple clicks within the 500ms animation duration
> - Expected Behavior: Button becomes disabled during animation (grayed out with cursor change); clicks during this period are ignored; button re-enables after animation completes
> - Rationale: Prevents animation queue buildup that could confuse learners or crash browser
>
> **Edge Case 3: Extreme Parameter Combinations**
> - Condition: User sets both damping to maximum and initial velocity to maximum
> - Trigger: Moving both sliders to their extreme values
> - Expected Behavior: Simulation runs normally but oscillation dies out within 2 seconds; informational tooltip appears: "High damping absorbs energy quickly!"
> - Rationale: Even unusual combinations should produce valid, educational results

<iframe src="../../sims/edge-case-discovery/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/edge-case-discovery/main.html){ .md-button .md-button--primary }

#### Diagram: Edge Case Discovery MicroSim

<details markdown="1">
<summary>Edge Case Discovery Simulator</summary>
Type: microsim

Bloom Taxonomy Level: Analyze

Learning Objective: Students will be able to identify potential edge cases by experimenting with parameter boundaries and observing system responses.

Canvas layout:
- Full width responsive design
- Drawing area (left 70%): Shows a simple physics simulation (bouncing ball)
- Control panel (right 30%): Contains parameter sliders and edge case log

Visual elements:
- A single ball that bounces within a rectangular container
- Container walls clearly visible
- Ball shows velocity vector arrow
- Current parameter values displayed numerically
- Edge case detection log (scrollable text area)

Interactive controls:
1. Slider: "Gravity" - Range: -10 to 10, Default: 9.8
   - Note: Negative gravity is an edge case (ball falls upward)
2. Slider: "Ball Radius" - Range: 1 to 200, Default: 20
   - Note: Radius larger than container is an edge case
3. Slider: "Bounciness" - Range: 0 to 2, Default: 0.8
   - Note: Values > 1 mean ball gains energy each bounce (edge case)
4. Slider: "Initial Speed" - Range: 0 to 1000, Default: 100
   - Note: Extremely high speeds may cause tunneling (edge case)
5. Button: "Log Current State"
   - Saves current parameters and observations to edge case log
6. Button: "Reset to Defaults"
   - Returns all parameters to default values

Edge case detection:
- When ball exits container bounds, log "EDGE CASE: Ball escaped container"
- When ball energy increases over time, log "EDGE CASE: Energy not conserved"
- When ball overlaps walls, log "EDGE CASE: Collision detection failed"
- When animation stutters (frame time > 32ms), log "EDGE CASE: Performance degradation"

Default parameters:
- Gravity: 9.8
- Ball Radius: 20
- Bounciness: 0.8
- Initial Speed: 100

Behavior:
- Ball bounces continuously with physics simulation
- Each parameter change takes effect immediately
- Edge cases are automatically detected and logged
- Log entries include timestamp and parameter values

Educational purpose:
- Students discover what constitutes edge cases through experimentation
- The log helps students document their findings
- Unusual behaviors become learning opportunities, not errors

Implementation: p5.js with responsive canvas design
</details>

## Specification Ambiguity: The Enemy of Good MicroSims

**Specification ambiguity** occurs when your specification can be interpreted in multiple valid ways. It's the enemy of getting what you want, because AI tools will make *some* choice when faced with ambiguity—just not necessarily *your* choice.

Ambiguity is sneaky. What seems perfectly clear to you might be genuinely ambiguous to someone (or something) without your context.

### The Seven Deadly Sins of Specification Ambiguity

1. **Vague Adjectives**: "large," "small," "fast," "slow," "nice colors"
   - Fix: Use specific values: "40 pixels," "500ms animation duration," "#3498db blue"

2. **Undefined References**: "the button," "that area," "the main display"
   - Fix: Name everything: "the Reset button," "the Parameter Control Panel," "the Simulation Canvas"

3. **Assumed Context**: "like in the previous example," "the usual way"
   - Fix: Be explicit every time; don't rely on shared context

4. **Ambiguous Pronouns**: "it should change when it's clicked"
   - Fix: "The Start Button should change from green to red when the user clicks it"

5. **Missing Defaults**: "the slider controls speed"
   - Fix: "The Speed Slider ranges from 0.1x to 3.0x with a default of 1.0x"

6. **Unspecified Timing**: "updates in real time"
   - Fix: "Updates within 16ms (one frame at 60fps) of parameter change"

7. **Implicit Behavior**: Assuming something is "obvious"
   - Fix: State everything explicitly; nothing is obvious to an AI

### The Ambiguity Test

Read your specification and ask: "Could a reasonable person interpret this differently than I intend?" If yes, add clarification.

| Ambiguous | Unambiguous |
|-----------|-------------|
| "Make the important elements stand out" | "Important elements (node labels and axis titles) use 16pt bold font and #2c3e50 dark blue color" |
| "The simulation should be responsive" | "The canvas resizes to fill its container width while maintaining a 16:9 aspect ratio, with minimum width of 320px" |
| "Include appropriate labels" | "Each axis has a label in 12pt Arial: X-axis reads 'Time (seconds)', Y-axis reads 'Distance (meters)'" |
| "Animation should feel natural" | "Objects accelerate at 9.8 px/frame² and decelerate with 0.98 velocity damping per frame" |

!!! warning "The Telephone Game"
    Remember playing telephone as a kid? The message gets distorted with each person. Your specification goes through a similar process: You → Specification Document → AI Interpretation → Generated Code → Running MicroSim. Each step can introduce drift. The clearer your initial message, the more faithful the final result.

## Intent Preservation: Keeping the "Why" Alive

**Intent preservation** ensures that your pedagogical purpose survives the journey from idea to implementation. It's not enough for a MicroSim to be technically correct—it must be educationally correct.

### The Intent Statement

Every specification should include an explicit intent statement that captures:

- **What concept** are students learning?
- **What misconception** might this address?
- **What discovery** should students make?
- **What feeling** should students have?

**Example Intent Statement:**

> **Pedagogical Intent:**
> This MicroSim teaches the concept of exponential growth vs. linear growth. Students often underestimate how quickly exponential functions overtake linear ones. By allowing students to adjust growth rates and visually see the curves diverge, they will discover that even small exponential rates eventually dominate large linear rates. Students should feel surprised at how quickly the exponential curve "takes off" and internalize the phrase "the power of exponential growth."

### How Intent Gets Lost

Intent can be lost at several stages:

1. **Specification Stage**: Focusing on mechanics over purpose
2. **Generation Stage**: AI optimizing for technical correctness, not learning
3. **Iteration Stage**: Fixing bugs without checking educational impact
4. **Deployment Stage**: Context stripped away from the simulation

### Preserving Intent Throughout the Process

Protect your intent by:

1. **State it explicitly** in the specification (the Intent Statement)
2. **Connect every feature** back to the learning objective
3. **Test with learners**, not just technically
4. **Review generated results** against the Intent Statement
5. **Resist scope creep** that dilutes the core message

<iframe src="../../sims/intent-preservation-matrix/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/intent-preservation-matrix/main.html){ .md-button .md-button--primary }

#### Diagram: Intent Preservation Matrix

<details markdown="1">
<summary>Intent Preservation Matrix</summary>
Type: diagram

Bloom Taxonomy Level: Analyze

Learning Objective: Students will be able to trace specification elements back to learning objectives to verify intent preservation.

Purpose: Show how each specification element should connect to the overarching pedagogical intent.

Layout: Matrix/table diagram with connecting lines

Structure:
- Top row: Learning Objective (single box spanning width)
- Second row: Key Concepts (3-5 boxes)
- Third row: Features/Elements (multiple boxes)
- Bottom row: Specification Details (many boxes)
- Lines connect each lower element to its parent(s)

Example content for a "Supply and Demand" MicroSim:
- Learning Objective: "Understand how price equilibrium emerges from supply and demand interaction"

- Key Concepts:
  - "Supply curve slopes upward"
  - "Demand curve slopes downward"
  - "Equilibrium occurs at intersection"
  - "Shifts affect equilibrium"

- Features:
  - "Draggable demand curve"
  - "Draggable supply curve"
  - "Equilibrium point marker"
  - "Price/quantity readout"
  - "Shift buttons"

- Specification Details:
  - "Demand curve: blue, dashed, endpoints draggable"
  - "Supply curve: red, solid, endpoints draggable"
  - "Intersection marked with yellow circle, 10px radius"
  - "Numeric display updates in real-time"
  - "Shift buttons move entire curve left/right by 20 units"

Visual style:
- Hierarchical layout from top to bottom
- Color coding by level (dark blue → medium blue → light blue → gray)
- Lines show traceability (every detail connects to a concept, every concept connects to objective)
- Orphan elements (unconnected) highlighted in red as warnings

Interactive features:
- Hover over any element to highlight its connections
- Click element to see rationale in side panel
- Toggle "show orphans" to find unconnected elements

Implementation: vis-network or custom SVG with JavaScript
</details>

## AI Interpretation: How Machines Read Your Words

**AI interpretation** is the process by which an AI system transforms your natural language specification into executable code. Understanding how this works helps you write specifications that produce better results.

### How AI "Understands" Specifications

AI language models don't understand specifications the way humans do. They:

1. **Pattern match** against training data (similar specifications → similar outputs)
2. **Resolve ambiguity** by picking the statistically most likely interpretation
3. **Fill gaps** with reasonable defaults (which may not match your expectations)
4. **Follow conventions** from the libraries and frameworks they've seen most often

This means:

- **Common patterns work better**: If your specification matches patterns the AI has seen before, results are more predictable
- **Unusual requests need more detail**: Novel requirements need explicit specification
- **Library conventions matter**: Specifying "p5.js style" vs "D3.js style" activates different patterns
- **Order matters**: Information presented earlier in the specification may be weighted more heavily

### Writing for AI Comprehension

Optimize your specifications for AI interpretation by:

1. **Use declarative language**: "The canvas IS 800 pixels wide" not "Make the canvas about 800 pixels"
2. **Front-load important information**: Put critical requirements early
3. **Use consistent terminology**: Pick one term and stick with it (don't alternate between "button" and "control")
4. **Be redundant strategically**: State important constraints in multiple ways
5. **Use structured formats**: Lists and tables are parsed more reliably than flowing prose
6. **Reference known patterns**: "Like a standard p5.js setup with setup() and draw()" activates reliable patterns

### Example: Specification Optimized for AI

Here's a specification structured for optimal AI interpretation:

> **MicroSim: Simple Harmonic Motion Pendulum**
>
> **Implementation Framework:** p5.js
>
> **Canvas:**
> - Width: Container width (responsive)
> - Height: 500 pixels
> - Background: #f8f9fa (light gray)
>
> **Visual Elements:**
> 1. Pivot Point
>    - Position: center-top of canvas (width/2, 50)
>    - Appearance: black circle, 10px diameter
>
> 2. Pendulum Rod
>    - Start: pivot point
>    - End: bob center
>    - Appearance: black line, 2px thick
>    - Length: controlled by Length Slider (100-300px, default 200px)
>
> 3. Pendulum Bob
>    - Shape: circle
>    - Diameter: 40px
>    - Color: #e74c3c (red)
>    - Position: calculated from rod length and current angle
>
> **Controls (below canvas):**
> - Slider: "Length" (100-300px, default 200px)
> - Slider: "Gravity" (1-20 m/s², default 9.8)
> - Slider: "Damping" (0-0.1, default 0.01)
> - Button: "Release" - starts pendulum from current angle
> - Button: "Reset" - returns to default values and stops motion
>
> **Physics:**
> - Angular acceleration: (-gravity / length) * sin(angle) - damping * angularVelocity
> - Update angle and angular velocity each frame
> - Initial angle: 45 degrees (π/4 radians)
>
> **Behavior:**
> - Pendulum swings when "Release" is clicked
> - Parameter changes take effect immediately if pendulum is stationary
> - If pendulum is moving when parameter changed, it continues with new parameters
> - Motion stops when angular velocity drops below 0.001 radians/frame

<iframe src="../../sims/spec-clarity-analyzer/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/spec-clarity-analyzer/main.html){ .md-button .md-button--primary }

#### Diagram: AI Specification Interpretation MicroSim

<details markdown="1">
<summary>Specification Clarity Analyzer</summary>
Type: microsim

Bloom Taxonomy Level: Evaluate

Learning Objective: Students will be able to evaluate the clarity of specification text by seeing how AI confidence varies with specificity.

Canvas layout:
- Full width responsive design
- Left panel (60%): Text input area for specification text
- Right panel (40%): Analysis results and confidence meters

Visual elements:
- Large text area for entering specification text
- Clarity score display (0-100 scale)
- Category breakdown bars:
  - Visual Description clarity (0-100)
  - Interaction clarity (0-100)
  - Constraint clarity (0-100)
  - Edge case clarity (0-100)
- Issue list highlighting specific problems
- Suggestion panel with improvement tips

Interactive controls:
1. Text area: Enter or paste specification text
2. Button: "Analyze Specification"
   - Triggers analysis and updates all meters
3. Dropdown: "Show Issues"
   - Filters: All, Critical, Warnings, Suggestions
4. Toggle: "Show Examples"
   - Displays example fixes inline with the text
5. Button: "Load Sample Specs"
   - Dropdown with pre-loaded examples (good, bad, ugly)

Analysis criteria (simplified heuristic for demo):
- Detects vague adjectives ("large", "small", "fast", "slow", "nice", "good")
- Flags undefined references ("it", "that", "the button" without prior definition)
- Checks for numeric specificity in dimensions and timing
- Identifies missing defaults in control specifications
- Flags ambiguous color descriptions ("blue" vs "#3498db")
- Rewards structured formatting (lists, tables)

Default state:
- Empty text area with placeholder: "Paste your specification here..."
- All meters at 0
- Sample specs available in dropdown

Behavior:
- Analysis runs when button clicked (not on every keystroke)
- Issues highlighted in text with colored underlines
- Clicking an issue scrolls to improvement suggestion
- Improvement suggestions are actionable (not just "be more specific")

Educational purpose:
- Students learn to recognize ambiguity in their own writing
- Immediate feedback helps develop specification instincts
- Comparison between good and bad samples builds pattern recognition

Implementation: p5.js for meters/visuals, HTML for text area, JavaScript for text analysis
</details>

## SDD and the Agile Connection

If you've worked in software development, Specification-Driven Design might feel familiar—and that's no accident. SDD shares DNA with Agile methodologies, particularly user stories and acceptance test plans. Understanding this connection helps you leverage decades of battle-tested practices while adapting them for educational contexts.

Think of it this way: Agile gave us tools for building software that users actually want. SDD gives us tools for building simulations that learners actually learn from. Same spirit, different superpowers.

### User Stories and MicroSim Specs Solve the Same Problem

In Agile, a **user story** captures intent in a compact, testable form:

> *As a [learner], I want to [manipulate X] so that I can [understand Y].*

A MicroSim specification is essentially a **pedagogically enriched user story**—it takes the same core structure and adds the educational context that makes learning happen.

| Agile Story Element | MicroSim SDD Equivalent |
|---------------------|------------------------|
| Actor | Learner (with grade level and prior knowledge) |
| Goal | Learning objective (Bloom-classified) |
| Motivation | Conceptual understanding or skill transfer |
| Constraints | UI layout rules, cognitive load limits |
| Acceptance Criteria | Learning outcomes and interaction behaviors |

### Example: Story to Specification

Here's an Agile-style story:

> *As a physics student, I want to change gravity so I can see how it affects projectile motion.*

Nice and compact! But watch what happens when we enrich it into a MicroSim specification:

> **Learning Objective:** Apply Newtonian mechanics to predict trajectory changes (Bloom: Apply)
>
> **Control:** Gravity slider (range: 0–20 m/s², default: 9.8 m/s², step: 0.1)
>
> **Visual:** Trajectory path updates immediately as slider moves; previous trajectory shown as faded dotted line for comparison
>
> **Constraint:** Canvas maintains 16:9 aspect ratio; width-responsive; minimum width 320px
>
> **Misconception Addressed:** "Heavier objects fall faster" — simulation shows identical trajectories regardless of mass setting
>
> **Success Criterion:** Student can predict landing position before releasing projectile after 5 practice throws

The story tells us *what* the learner wants. The specification tells us *exactly how* to deliver it—and *how we'll know* if we succeeded.

!!! tip "The Key Difference"
    Agile stories are planning artifacts—they guide development conversations. MicroSim specifications must be **executable**—they're contracts that AI (or developers) can implement without asking clarifying questions.

### Acceptance Test Plans: The Bridge Between Intent and Implementation

In Agile, **acceptance criteria** define when a story is "done." In SDD, **acceptance tests** define when a MicroSim is:

- **Pedagogically correct** — It teaches what it claims to teach
- **Technically compliant** — It works as specified
- **Learner-effective** — Students actually learn from it

Think of acceptance tests as the bridge where specification, implementation, and learning outcomes meet for coffee and verify they're all on the same page.

### The Four Categories of MicroSim Acceptance Tests

A complete acceptance test plan covers four distinct areas:

**1. Functional Tests**

These verify the MicroSim does what it's supposed to do mechanically:

- Slider changes immediately affect the simulation (within 16ms)
- Reset button returns all parameters to documented default values
- No controls overlap at any container width from 320px to 1920px
- All buttons respond to both click and keyboard activation
- Animation maintains 60fps under normal operation

**2. Pedagogical Tests**

These verify the MicroSim teaches what it's supposed to teach:

- Learner can observe the intended cause-and-effect relationship
- Target misconception is visibly contradicted by simulation behavior
- Learning objective is achievable within reasonable time (typically ≤15 minutes)
- Progressive complexity allows scaffolded discovery
- Key concepts are reinforced through multiple interaction patterns

**3. Technical Tests**

These verify the MicroSim meets implementation standards:

- Runs unmodified in standard p5.js web editor
- Passes responsive resize test (works at mobile, tablet, and desktop widths)
- Includes accessibility description for screen readers
- Loads within 3 seconds on standard broadband connection
- No console errors or warnings during normal operation

**4. Assessment-Ready Tests**

These verify the MicroSim can support learning analytics:

- User interactions are observable and loggable
- Completion or mastery conditions are inferable from interaction patterns
- Events can be logged deterministically (same inputs → same event sequence)
- Timestamps available for time-on-task analysis
- Error states and recovery actions are distinguishable in logs

<iframe src="../../sims/acceptance-test-matrix/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/acceptance-test-matrix/main.html){ .md-button .md-button--primary }

#### Diagram: Acceptance Test Coverage Matrix

<details markdown="1">
<summary>MicroSim Acceptance Test Coverage Matrix</summary>
Type: infographic

Bloom Taxonomy Level: Evaluate

Learning Objective: Students will be able to evaluate whether a MicroSim meets all acceptance criteria across functional, pedagogical, technical, and assessment dimensions.

Purpose: Interactive matrix showing test coverage across all four categories with pass/fail tracking.

Layout: 4-column grid with expandable test items

Structure:
- Header row with four category labels (Functional, Pedagogical, Technical, Assessment-Ready)
- Each column contains 5-7 specific test criteria
- Each criterion has checkbox and status indicator
- Bottom row shows category completion percentage
- Overall coverage score displayed prominently

Test items per category:

Functional (green theme):
- [ ] Controls respond within 16ms
- [ ] Reset returns to defaults
- [ ] No UI overlap at any width
- [ ] Keyboard navigation works
- [ ] Animation maintains 60fps
- [ ] All specified states reachable

Pedagogical (blue theme):
- [ ] Cause-effect visible
- [ ] Misconception addressed
- [ ] Objective achievable in ≤15min
- [ ] Scaffolding appropriate
- [ ] Feedback immediate and clear

Technical (orange theme):
- [ ] Runs in p5.js editor
- [ ] Responsive design works
- [ ] Accessibility included
- [ ] Loads in <3 seconds
- [ ] No console errors

Assessment-Ready (purple theme):
- [ ] Interactions loggable
- [ ] Completion detectable
- [ ] Events deterministic
- [ ] Timestamps available
- [ ] Errors distinguishable

Interactive features:
- Click checkbox to toggle pass/fail
- Hover for detailed test description
- Color coding: green=pass, red=fail, gray=untested
- Export results as markdown checklist
- Summary score updates in real-time

Visual style: Clean grid with rounded corners, subtle shadows
Color scheme: Category-specific colors with white backgrounds

Implementation: HTML/CSS/JavaScript with localStorage for persistence
</details>

### Why This Matters for AI-Generated MicroSims

Here's where SDD becomes genuinely transformative: **it's what makes generative AI reliable instead of lucky.**

Without SDD:

- Each MicroSim is a one-off creative act
- Quality varies wildly between generations
- Reuse and search are nearly impossible
- "It worked last time" is your best debugging strategy

With SDD:

- AI can select, adapt, and compose MicroSims systematically
- Learning objectives map cleanly to simulation patterns
- Automated quality scoring becomes possible
- MicroSims become composable units in a larger learning graph
- Iteration is targeted rather than random

The magic formula is: **Stories → Specifications → Acceptance Tests → Reproducible MicroSims**

This pipeline transforms educational design from an artisanal craft (beautiful but unscalable) into an engineering discipline (consistent, measurable, improvable). And yes, it's still creative—just like architecture is creative while still following building codes.

!!! note "The Executable Contract"
    Specification-driven design turns a learning objective into an **executable contract**. Agile stories express learner intent. Acceptance test plans verify that the resulting MicroSim faithfully delivers both the pedagogy and the behavior promised by the specification. Together, they form a complete quality assurance chain from concept to classroom.

## Putting It All Together: Complete Specification Examples

Now let's see how all these concepts combine into complete, production-ready specifications. Each example demonstrates how to avoid ambiguity, preserve intent, and write for AI comprehension.

### Example 1: Ohm's Law Interactive Demonstration

This specification teaches the relationship between voltage, current, and resistance.

<iframe src="../../sims/ohms-law-simulator/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/ohms-law-simulator/main.html){ .md-button .md-button--primary }

#### Diagram: Ohm's Law Circuit Simulator

<details markdown="1">
<summary>Ohm's Law Circuit Simulator</summary>
Type: microsim

Bloom Taxonomy Level: Apply

Learning Objective: Students will be able to apply Ohm's Law (V = IR) by manipulating circuit parameters and observing how changes in one variable affect the others.

**PEDAGOGICAL INTENT:**
Students often memorize V = IR without understanding the relationships. This MicroSim allows them to discover that increasing voltage increases current (direct relationship) while increasing resistance decreases current (inverse relationship). The "aha moment" occurs when students realize they can predict outcomes before seeing them.

**CANVAS SPECIFICATION:**
- Layout: Full width responsive, minimum width 320px
- Height: 450 pixels
- Background: #ffffff (white)
- Organized into three horizontal regions:
  1. Circuit display area (top, 300px height)
  2. Control panel (middle, 100px height)
  3. Equation display (bottom, 50px height)

**CIRCUIT VISUAL ELEMENTS:**
1. Battery (left side)
   - Position: x=50, y=150
   - Symbol: Standard battery symbol (long and short parallel lines)
   - Size: 60px tall
   - Color: Black lines, 2px stroke
   - Label: "V" with current voltage value below (e.g., "V = 12V")

2. Resistor (top of circuit)
   - Position: centered horizontally, y=50
   - Symbol: Zigzag line (standard resistor symbol)
   - Size: 100px wide, 30px tall
   - Color: Black lines, 2px stroke
   - Label: "R" with current resistance value (e.g., "R = 4Ω")
   - Fill color changes based on current flow: cold (#3498db blue) at low current, hot (#e74c3c red) at high current

3. Ammeter (right side)
   - Position: x=canvas width - 80, y=150
   - Symbol: Circle with "A" inside
   - Size: 40px diameter
   - Color: Black outline, white fill
   - Display: Current value in center (e.g., "3.0 A")

4. Wires
   - Color: Black, 3px stroke
   - Connect battery (+) → top wire → resistor → right wire → ammeter → bottom wire → battery (-)
   - Current flow animation: Small yellow dots move along wires in direction of conventional current
   - Animation speed proportional to current magnitude

5. Electron flow visualization (optional toggle)
   - Blue dots moving opposite to conventional current
   - Default: OFF

**CONTROL PANEL:**
Position: Below circuit, full width, light gray background (#f0f0f0)

1. Voltage Slider
   - Label: "Voltage (V)"
   - Range: 1V to 24V
   - Default: 12V
   - Step: 1V
   - Width: 200px
   - Position: Left third of control panel
   - Numeric display above slider shows current value

2. Resistance Slider
   - Label: "Resistance (Ω)"
   - Range: 1Ω to 20Ω
   - Default: 4Ω
   - Step: 0.5Ω
   - Width: 200px
   - Position: Center of control panel
   - Numeric display above slider shows current value

3. Control Buttons
   - Position: Right third of control panel
   - "Reset" button: Returns all values to defaults (12V, 4Ω)
   - "Show Equation" toggle: Reveals/hides the calculation at bottom

**EQUATION DISPLAY:**
Position: Bottom region, centered
- Shows: "V = I × R  →  [Voltage Value] = [Current Value] × [Resistance Value]"
- Example: "V = I × R  →  12V = 3.0A × 4Ω"
- Font: 18px monospace
- Updates in real-time with slider changes
- Hidden by default, shown when toggle is ON

**BEHAVIOR SPECIFICATION:**
1. When Voltage slider moves:
   - Current recalculates immediately: I = V/R
   - Wire animation speed updates
   - Ammeter display updates
   - Equation display updates
   - Battery label updates

2. When Resistance slider moves:
   - Current recalculates immediately: I = V/R
   - Wire animation speed updates
   - Ammeter display updates
   - Resistor heat color updates (lerp from blue to red based on power dissipation)
   - Equation display updates
   - Resistor label updates

3. Current flow animation:
   - Yellow dots appear on wires
   - 10 dots evenly spaced around circuit
   - Speed: pixels per frame = current × 2
   - When current is 0.5A, dots move at 1 px/frame
   - When current is 12A, dots move at 24 px/frame

**BEHAVIOR CONSTRAINTS:**
- Current cannot exceed 24A (would occur at V=24, R=1)
- Current cannot be negative
- If calculated current exceeds 20A, ammeter flashes red and displays "OVERLOAD!"
- Minimum current display: 0.1A (if calculated is less, show "<0.1A")

**SUCCESS CRITERIA:**
1. Moving voltage slider from 12V to 24V with R=4Ω doubles the current from 3A to 6A
2. Moving resistance slider from 4Ω to 8Ω with V=12V halves the current from 3A to 1.5A
3. All three values (V, I, R) are always mathematically consistent with V = IR
4. Animation speed visibly changes when current changes
5. Resistor color shifts from blue (1A) to red (20A+) based on current
6. Reset button returns to exactly: V=12V, R=4Ω, I=3A

**EDGE CASES:**
1. Minimum resistance (1Ω) with maximum voltage (24V):
   - Current = 24A, displays "OVERLOAD!" with flashing
   - Resistor color: bright red
   - Dots move very quickly
   - Simulation continues (does not stop)

2. Maximum resistance (20Ω) with minimum voltage (1V):
   - Current = 0.05A, displays "<0.1A"
   - Resistor color: blue
   - Dots move very slowly (barely perceptible)
   - Simulation continues normally

3. Rapid slider movement:
   - All values update every frame
   - No queuing or lag in updates

**ACCESSIBILITY:**
- All text minimum 14px
- Contrast ratio 4.5:1 minimum
- Keyboard navigation for sliders (left/right arrows)
- Current value announced to screen readers on change

Implementation: p5.js with responsive canvas design
</details>

### Example 2: Probability Tree Diagram Explorer

This specification teaches conditional probability through interactive tree diagrams.

<iframe src="../../sims/probability-tree-explorer/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/probability-tree-explorer/main.html){ .md-button .md-button--primary }

#### Diagram: Probability Tree Explorer

<details markdown="1">
<summary>Probability Tree Explorer</summary>
Type: microsim

Bloom Taxonomy Level: Analyze

Learning Objective: Students will be able to calculate compound probabilities by tracing paths through a probability tree and multiplying branch probabilities.

**PEDAGOGICAL INTENT:**
Students struggle to understand why we multiply probabilities along branches. This MicroSim makes the multiplication visible by showing how the path width narrows with each branch. When students trace a path to "draw two red balls," they SEE the probability shrinking, not just calculate it. The target "aha moment" is: "Oh! The path gets narrower because we're keeping less of the total each time!"

**CANVAS SPECIFICATION:**
- Layout: Full width responsive, minimum width 400px
- Height: 600 pixels
- Background: #fafafa (off-white)
- Regions:
  1. Tree diagram area (top, 400px)
  2. Calculation display (middle, 100px)
  3. Control panel (bottom, 100px)

**SCENARIO:**
A bag contains red and blue balls. Draw two balls without replacement. The tree shows all possible outcomes.

**TREE VISUAL ELEMENTS:**
1. Root Node (start)
   - Position: Left side, vertically centered in tree area
   - Label: "Start" in 14px font
   - Visual: Circle, 30px diameter, white fill, black outline
   - Represents: The bag before any draws

2. First Level Branches (from root)
   - Branch to "First Red": Probability = (red balls / total balls)
   - Branch to "First Blue": Probability = (blue balls / total balls)
   - Branch width: Proportional to probability (probability × 50 pixels)
   - Red branch color: #e74c3c (red), Blue branch color: #3498db (blue)
   - Label on each branch: Shows probability as fraction and decimal
   - Example: "5/8 = 0.625"

3. First Level Nodes
   - "First Red" node: Red circle, 25px, positioned right of root
   - "First Blue" node: Blue circle, 25px, positioned right of root
   - Vertical spacing: 150px between nodes

4. Second Level Branches (from each first level node)
   - From "First Red":
     - To "Red then Red": Probability = (red-1)/(total-1)
     - To "Red then Blue": Probability = blue/(total-1)
   - From "First Blue":
     - To "Blue then Red": Probability = red/(total-1)
     - To "Blue then Blue": Probability = (blue-1)/(total-1)
   - Branch width: Proportional to CUMULATIVE probability from root
   - Labels: Show conditional probability for this branch

5. Final Outcome Nodes (rightmost)
   - Four outcomes: RR, RB, BR, BB
   - Each shows final probability (product of path)
   - Node size proportional to final probability
   - Color: Gradient of path colors (red-red = dark red, blue-blue = dark blue, mixed = purple)

6. Path highlighting
   - When user hovers over final node, entire path highlights
   - Path glows yellow
   - Calculation appears in calculation display area

**CONTROL PANEL:**
1. Slider: "Red Balls"
   - Range: 1 to 10
   - Default: 5
   - Position: Left side of control panel

2. Slider: "Blue Balls"
   - Range: 1 to 10
   - Default: 3
   - Position: Center of control panel

3. Button: "Reset Defaults"
   - Returns to 5 red, 3 blue
   - Position: Right side of control panel

4. Toggle: "Show Calculations"
   - When ON: Branch labels show full calculations
   - When OFF: Labels show only final probabilities
   - Default: ON

**CALCULATION DISPLAY:**
- Shows the multiplication for the currently hovered path
- Example when hovering RR path:
  "P(Red then Red) = P(1st Red) × P(2nd Red | 1st Red)"
  "P(RR) = 5/8 × 4/7 = 20/56 = 5/14 ≈ 0.357"
- Font: 16px monospace
- Updates instantly on hover
- When nothing hovered: "Hover over an outcome to see the calculation"

**BEHAVIOR SPECIFICATION:**
1. When ball counts change:
   - Tree redraws with new probabilities
   - Branch widths recalculate
   - All labels update
   - Animation: 300ms transition for branch width changes

2. When hovering outcome node:
   - Path from root to that node highlights (yellow glow)
   - Calculation display shows step-by-step multiplication
   - Other paths dim (opacity 0.3)

3. When not hovering:
   - All paths at normal opacity
   - Calculation display shows instruction text

**BEHAVIOR CONSTRAINTS:**
- Total balls must be at least 2 (minimum 1 red + 1 blue)
- Red slider cannot go to 0 if blue is 1 (and vice versa)
- Probabilities always sum to 1 at each level (validate visually by total branch widths)

**SUCCESS CRITERIA:**
1. With 5 red and 3 blue balls:
   - P(RR) = 5/8 × 4/7 = 20/56 ≈ 0.357
   - P(RB) = 5/8 × 3/7 = 15/56 ≈ 0.268
   - P(BR) = 3/8 × 5/7 = 15/56 ≈ 0.268
   - P(BB) = 3/8 × 2/7 = 6/56 ≈ 0.107
   - Total: 56/56 = 1.000

2. Branch widths visually represent probabilities:
   - First Red branch visibly wider than First Blue branch (5/8 vs 3/8)
   - RR path visibly narrower than First Red branch alone

3. Changing red balls from 5 to 8 immediately updates all probabilities

4. All four outcome probabilities sum to 1.00 (displayed to 3 decimal places)

**EDGE CASES:**
1. Equal balls (5 red, 5 blue):
   - First branches equal width
   - All conditional probabilities symmetric

2. Extreme ratio (10 red, 1 blue):
   - Blue branch very narrow but still visible (minimum 3px width)
   - P(BB) = 1/11 × 0/10 = 0 → Display as "0.000 (impossible)"

3. Minimum balls (1 red, 1 blue):
   - Only two outcomes possible: RB and BR
   - Both with probability 0.500
   - Note: RR and BB paths show "0.000 (impossible)"

**ACCESSIBILITY:**
- Color is not the only distinguisher (branches also have labels)
- Keyboard navigation: Tab through outcome nodes
- Screen reader: Announces probability calculations when node focused

Implementation: p5.js with responsive canvas design
</details>

### Example 3: Sorting Algorithm Race

This specification compares different sorting algorithms visually.

<iframe src="../../sims/sorting-algorithm-race/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/sorting-algorithm-race/main.html){ .md-button .md-button--primary }

#### Diagram: Sorting Algorithm Racing MicroSim

<details markdown="1">
<summary>Sorting Algorithm Racing MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Analyze/Evaluate

Learning Objective: Students will be able to compare the efficiency of different sorting algorithms by observing their operation counts and completion times on identical datasets.

**PEDAGOGICAL INTENT:**
Students often memorize Big-O notation without understanding what it means in practice. This MicroSim creates a race between algorithms so students can SEE that O(n²) algorithms start fast but lose badly on large datasets, while O(n log n) algorithms have more overhead but scale better. The "aha moment" is watching Bubble Sort lead initially, then get demolished by Quick Sort as the array grows.

**CANVAS SPECIFICATION:**
- Layout: Full width responsive, minimum width 600px
- Height: 650 pixels
- Background: #1a1a2e (dark blue)
- Regions:
  1. Race lanes (top, 500px) - Four horizontal lanes for algorithms
  2. Stats display (middle, 100px) - Comparison counts, swap counts, time
  3. Control panel (bottom, 50px) - Array size, speed, start/reset

**RACE LANE VISUAL ELEMENTS:**
Each algorithm gets its own lane (4 lanes total, stacked vertically):

1. Lane Structure:
   - Width: 90% of canvas width, centered
   - Height: 100px per lane
   - Background: #16213e (slightly lighter blue)
   - Border: 1px solid #0f3460
   - Left side: Algorithm name and current status
   - Right side: Bar visualization of array being sorted

2. Bar Visualization (per lane):
   - Array represented as vertical bars
   - Each bar width: lane width / array size
   - Bar height: Proportional to value (value/max × 80px)
   - Bar color: Gradient based on value (low=#0f3460 to high=#e94560)
   - Currently compared bars: Yellow (#ffc857) highlight
   - Currently swapping bars: White (#ffffff) highlight with swap animation

3. Algorithm Labels:
   - Position: Left side of each lane, 15px from edge
   - Font: 14px bold, white
   - Shows: Algorithm name + current comparison count
   - Example: "Bubble Sort: 1,247 comparisons"

4. Progress Indicator:
   - Below each lane
   - Horizontal progress bar showing % sorted
   - Color: Green (#4ecca3) fill

**ALGORITHMS TO RACE:**
Lane 1: Bubble Sort (red theme)
Lane 2: Selection Sort (orange theme)
Lane 3: Insertion Sort (yellow theme)
Lane 4: Quick Sort (green theme)

**STATS DISPLAY:**
Columns showing real-time statistics:
| Algorithm | Comparisons | Swaps | Time (ms) | Status |
| Each cell updates in real-time during race |

**CONTROL PANEL:**
1. Slider: "Array Size"
   - Range: 10 to 200
   - Default: 50
   - Step: 10
   - Position: Left third

2. Slider: "Animation Speed"
   - Range: 1 (slow, 500ms per step) to 100 (fast, 5ms per step)
   - Default: 50 (50ms per step)
   - Position: Center

3. Buttons:
   - "Generate New Array": Creates new random array
   - "Start Race": Begins all four sorts simultaneously
   - "Pause": Pauses all algorithms (becomes "Resume")
   - "Reset": Clears stats, regenerates array
   - Position: Right third

**BEHAVIOR SPECIFICATION:**
1. Array Generation:
   - All four lanes receive IDENTICAL copy of the random array
   - Values range from 1 to array size (no duplicates for clarity)
   - Array is shuffled using Fisher-Yates shuffle

2. Race Execution:
   - All four algorithms run in parallel (using setTimeout for visualization)
   - Each algorithm proceeds at same visualization speed
   - Algorithm completes when array is sorted (verified)
   - Completion order is the race result

3. Visualization Updates:
   - Each comparison highlights the two compared bars in yellow
   - Each swap shows bars moving (quick animation: 100ms)
   - Bars in final position don't change color again
   - Stats update after each operation

4. Race Completion:
   - Winning algorithm lane flashes green
   - Final stats frozen for comparison
   - "Race Complete!" message appears
   - Ranking displayed: 1st, 2nd, 3rd, 4th with times

**BEHAVIOR CONSTRAINTS:**
- Cannot start race while one is in progress
- Cannot change array size during race
- Animation speed CAN be adjusted during race
- Pause affects all algorithms equally (no cheating!)
- Each algorithm must perform identical logical operations regardless of speed

**SUCCESS CRITERIA:**
1. With 50-element array, Quick Sort finishes first in >90% of races
2. Comparison counts for Bubble Sort: approximately n² (2500 for n=50)
3. Comparison counts for Quick Sort: approximately n log n (280 for n=50)
4. All four lanes show identical starting arrays
5. Speed slider makes visible difference in animation pace
6. Stats are accurate (manually verifiable for small arrays)

**EDGE CASES:**
1. Already sorted array:
   - Generate option includes "Already Sorted" preset
   - Insertion Sort should complete with only n-1 comparisons
   - Bubble Sort optimized version detects and exits early

2. Reverse sorted array:
   - Generate option includes "Reverse Sorted" preset
   - This is worst case for some algorithms
   - Quick Sort (with poor pivot) may struggle

3. Very small array (10 elements):
   - All algorithms complete almost instantly
   - Slows down minimum time to ensure visible difference

4. Very large array (200 elements):
   - May need to cap animation frames
   - Bubble Sort could take very long (40,000 operations)
   - Show warning if estimated time > 60 seconds

**EDUCATIONAL ANNOTATIONS:**
- Hover over algorithm name to see Big-O notation and brief explanation
- "Why is X winning?" tooltip explains current leader's advantage
- After race: Pop-up comparing expected vs actual operation counts

**ACCESSIBILITY:**
- Colors not sole distinguisher (algorithm names always visible)
- Pause allows time to observe state
- Screen reader announces comparison counts periodically
- Keyboard: Space = start/pause, R = reset

Implementation: p5.js with responsive canvas design
</details>

## Summary: Your Specification Checklist

Writing effective MicroSim specifications is both an art and a science. Like any skill, it improves with practice. As you write more specifications, you'll develop an intuition for what needs to be explicit and what can be left to sensible defaults.

Remember these key principles:

1. **Be specific, not vague**: Use numbers, hex colors, and precise descriptions
2. **State the WHAT, not the HOW**: Focus on behavior and appearance, not implementation
3. **Preserve your intent**: Always connect features back to learning objectives
4. **Plan for edge cases**: Think about what happens at boundaries and extremes
5. **Write for AI comprehension**: Use structured formats and consistent terminology
6. **Test your criteria**: Ensure success criteria are measurable and testable

The investment you make in writing clear specifications pays dividends throughout the development process. A well-specified MicroSim can be generated correctly on the first try, iterated quickly, and maintained easily. A poorly specified one will frustrate you with endless rounds of "that's not what I meant."

You now have the tools to spec-ify your vision with crystal clarity. Go forth and make educational simulations that change how people learn!

??? question "Quick Check: Can you identify the ambiguity?"
    Consider this specification snippet: "The slider should update the display quickly when moved."

    What's ambiguous here?

    - "quickly" - How quickly? 50ms? 500ms? Within the same frame?
    - "the display" - Which display? There might be multiple displays
    - "when moved" - While moving? After releasing? Both?

    A better version: "The Speed Slider updates the Velocity Display within 16ms (one animation frame) as the user drags the handle, providing real-time visual feedback during interaction."

## What's Next?

In the next chapter, we'll explore how to adapt MicroSim complexity for different audience levels—from kindergarteners to PhD students. You'll learn how the same core concept can be presented at wildly different complexity levels, and how your specifications need to change accordingly.

Until then, practice writing specifications for simple MicroSims. Start with something you know well, like a basic physics concept or a math visualization. Write the specification first, without thinking about code. Then imagine handing that specification to someone who has never seen what you're picturing. Could they build it?

If not, add more detail. If so, you're ready to let AI bring your vision to life!

---

*"A specification is a promise to your future self that you know what you want."* — Every instructional designer who's ever watched an AI interpret their vague request creatively
