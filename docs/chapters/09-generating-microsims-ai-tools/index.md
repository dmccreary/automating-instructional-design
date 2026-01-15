---
title: Generating MicroSims with AI Tools
description: Mastering the art and science of collaborating with AI systems to generate educational simulations
generated_by: claude skill chapter-content-generator
date: 2025-12-18 16:30:00
version: 0.03
---

# Generating MicroSims with AI Tools

## Summary

This chapter teaches you how to effectively use AI tools to generate MicroSims from your specifications. You will learn prompt engineering techniques for effective communication with AI systems, how to craft refinement prompts for iterative improvement, and understand the complete generation workflow. The chapter covers output interpretation, issue identification, making regeneration decisions versus manual adjustments, version control practices, and iteration management strategies. These skills enable you to collaborate effectively with AI tools throughout the MicroSim development process.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Prompt Engineering
2. Refinement Prompt
3. Generation Workflow
4. Output Interpretation
5. Issue Identification
6. Regeneration Decision
7. Manual Adjustment
8. Version Control
9. Iteration Management

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Visualization Libraries and Tools](../04-visualization-libraries-tools/index.md)
- [Chapter 5: Writing Effective MicroSim Specifications](../05-writing-microsim-specifications/index.md)

---

## Introduction: Your New AI Collaborator

Welcome to the chapter that will fundamentally change how you create educational content. You're about to learn how to collaborate with one of the most powerful tools ever created for instructional design: AI-powered code generation. And yes, "collaborate" is the right word—this isn't about giving orders to a machine, it's about a creative partnership that combines human pedagogical expertise with AI's ability to generate code at superhuman speed.

Think of AI as that incredibly talented colleague who can code circles around most humans, works 24/7 without coffee breaks, and never complains about last-minute changes. The catch? This colleague speaks a slightly different language and needs clear, specific instructions to do their best work. Learning to communicate effectively with AI tools is the new superpower of instructional design.

The good news: if you've made it through the previous chapters on specifications and visualization libraries, you already have most of what you need. Writing effective AI prompts is, at its core, just writing effective specifications—with a few extra tricks for getting the best results. This chapter will teach you those tricks, from the fundamentals of prompt engineering to advanced techniques like Claude Code Skills and hierarchical rule systems that maintain consistency across entire textbook ecosystems.

Let's fire up the generation engine.

## The Generation Workflow: From Specification to Simulation

Before diving into specific techniques, let's understand the complete **generation workflow**—the end-to-end process of transforming your MicroSim specification into a working simulation. Understanding this workflow helps you know where you are at any point and what to do next.

### The Five Phases of MicroSim Generation

1. **Specification**: You create a detailed specification (covered in Chapter 5)
2. **Initial Generation**: AI produces the first version of code
3. **Evaluation**: You assess the output against your specification
4. **Refinement**: You iterate through improvements
5. **Finalization**: You deploy the polished result

Each phase has its own skills and decision points. The workflow isn't always linear—you might jump back to specification if you realize something was missing, or skip refinement if the initial generation nails it.

<iframe src="../../sims/microsim-generation-workflow/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/microsim-generation-workflow/main.html){ .md-button .md-button--primary }

#### Diagram: MicroSim Generation Workflow

<details markdown="1">
<summary>MicroSim Generation Workflow</summary>
Type: workflow

Bloom Taxonomy: Understand (L2)

Learning Objective: Visualize the complete generation workflow and understand the decision points at each phase

Visual style: Flowchart with five main phases, decision diamonds, and feedback loops

Phases (left to right):

Phase 1 - "Specification":
- Box: "Write MicroSim Specification"
- Outputs: Learning objectives, visual design, interactions, parameters
- Decision: "Specification complete?" → If no, return to start

Phase 2 - "Initial Generation":
- Box: "Submit to AI Tool"
- Sub-steps: Select skill/model, include context, submit prompt
- Output: Generated code (HTML, CSS, JavaScript)

Phase 3 - "Evaluation":
- Diamond: "Output Assessment"
- Three paths:
  - "Works perfectly" → Phase 5
  - "Minor issues" → Phase 4 (Manual Adjustment)
  - "Major issues" → Decision diamond

Phase 3b - "Issue Assessment":
- Diamond: "Can prompt fix it?"
- Two paths:
  - "Yes" → Phase 4 (Refinement Prompt)
  - "No" → Back to Phase 1 (revise specification)

Phase 4 - "Refinement":
- Two parallel tracks:
  - Track A: "Refinement Prompt" → Back to Phase 3
  - Track B: "Manual Adjustment" → Phase 5
- Decision: "Improvement sufficient?" → If no, loop

Phase 5 - "Finalization":
- Box: "Deploy & Document"
- Sub-steps: Version control, testing, deployment
- Output: Production-ready MicroSim

Feedback loops shown:
- From Evaluation back to Specification (major redesign)
- From Refinement back to Evaluation (iterative improvement)
- From Finalization back to Refinement (post-deployment fixes)

Color scheme:
- Blue for main process boxes
- Yellow for decision diamonds
- Green for success paths
- Orange for iteration/rework paths
- Purple for final output

Annotations:
- "Most iterations happen here" pointing to Phase 3-4 loop
- "Typical: 2-5 iterations" as note
- "Don't skip this!" pointing to Evaluation

Implementation: HTML/CSS/JavaScript or Mermaid flowchart
</details>

### Time Distribution Across Phases

Understanding where time goes helps you plan effectively:

| Phase | Typical Time | What Takes Time |
|-------|-------------|-----------------|
| Specification | 30-40% | Getting requirements right |
| Initial Generation | 5-10% | AI works fast |
| Evaluation | 15-20% | Testing and assessment |
| Refinement | 20-30% | Iteration cycles |
| Finalization | 10-15% | Polish and deployment |

Notice that **specification takes the most time**—and that's exactly right. Time invested in clear specifications pays dividends in faster generation and fewer iterations. Rushing the spec to "let AI figure it out" is a false economy that leads to frustrating refinement cycles.

## Prompt Engineering: Speaking AI's Language

**Prompt engineering** is the art and science of crafting inputs that elicit optimal outputs from AI systems. It's not quite programming, not quite writing—it's a new discipline that sits at the intersection of clear communication, technical understanding, and a bit of psychology (yes, even for machines).

### The Anatomy of an Effective Prompt

Every effective MicroSim generation prompt contains these elements:

1. **Context**: What kind of output you need
2. **Specification**: The detailed requirements
3. **Constraints**: Technical limitations and requirements
4. **Examples**: Sample outputs or patterns to follow
5. **Format**: How the output should be structured

Let's break down each component:

### Context Setting

Context tells the AI what role to play and what kind of output you need. This primes the AI's "mental model" for the task ahead.

**Weak context:**
```
Make a simulation about supply and demand.
```

**Strong context:**
```
You are creating an educational MicroSim for college-level economics
students. The simulation should demonstrate the relationship between
supply, demand, and market equilibrium using interactive controls
and real-time visualization.
```

The strong context establishes:

- The educational purpose (not entertainment or research)
- The audience level (college)
- The subject domain (economics)
- The interaction model (interactive controls, real-time)

### Specification Inclusion

Your MicroSim specification (from Chapter 5) forms the core of the prompt. Include all relevant details:

- Learning objectives
- Visual elements and layout
- Interactive controls
- Default parameters and ranges
- Behavioral descriptions
- Edge cases and error handling

!!! tip "Don't Summarize—Include"
    When working with AI tools that accept long inputs, include your full specification rather than summarizing it. AI can process detailed specs better than you might expect, and detail reduces ambiguity.

### Technical Constraints

Explicitly state technical requirements and limitations without specifying **how** to write the code:

!!! prompt
    Technical requirements:

    - Use p5.js for rendering (no other graphics libraries)
    - Generated JavaScript code in script.js must work in the p5.js editor without changes
    - All JavaScript code in single script.js file
    - Use a main.html consistent with the p5.js editor
    - Responsive design using container width to account for window resize events
    - No external dependencies except p5.js CDN
    - Support window resize events

These technical deployment constraints prevent the AI from making choices that don't fit your design or testing environment.
Without these deployment constraints you might get beautiful code that uses libraries you can't deploy.

### Pattern Examples

Showing examples of desired output structure dramatically improves results:

```
The structure of your main.html code like this example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />
  </head>
</head>
<body>
    <main>
        <h1>Title</h1>
        <!-- p5.js canvas will be placed in this element-->
        <main></main>
        <script src="sketch.js"></script>
    </main>
</body>
</html>
```

You can open the p5.js editor, look for the ">" icon to open the Sketch Files to
see the p5.js standard template.

### Output Format Instructions

Tell AI exactly how to deliver the output:

```
Output format:
- Use the p5.js main.html template
- Include all CSS in the style.css file
- Include JavaScript in the sketch.js file
- Add comments explaining key sections in the index.md file
- Do not truncate or abbreviate the generated code
```

### Using a Claude Code MicroSim Skill

The prompt for generating a MicroSim using a claude code skill does
All of the "rules" for generating a MicroSim are located within the Skill.
Template files for the main.html, style.css, script.js, index.md and metadata.json are
also located within the skill.
You do **not** need any of the deployment information in your prompt.  
You can just specify **what functionality** you want the MicroSim to do.

!!! prompt
    Use the microsim-generator skill to create a new microsim called `bouncing-ball`.
    The simulation will show a ball bouncing around the drawing area of the canvas.
    Allow the user to start and pause the simulation and change the ball's speed.

<iframe src="../../sims/prompt-engineering-practices/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/prompt-engineering-practices/main.html){ .md-button .md-button--primary }

#### Diagram: Prompt Engineering Best Practices

<details markdown="1">
<summary>Prompt Engineering Best Practices</summary>
Type: infographic

Bloom Taxonomy: Apply (L3)

Learning Objective: Provide a quick reference for crafting effective MicroSim generation prompts

Layout: Visual checklist with examples for each element

Main sections (cards or panels):

Section 1 - "Context Setting":
- Icon: Stage/theater curtain
- Checklist items:
  - [ ] Educational purpose stated
  - [ ] Audience level specified
  - [ ] Subject domain identified
  - [ ] Output type described
- Good example vs. Bad example comparison
- Impact meter: "High impact on relevance"

Section 2 - "Specification Depth":
- Icon: Blueprint/document
- Checklist items:
  - [ ] Learning objectives included
  - [ ] Visual elements described
  - [ ] Interactions specified
  - [ ] Parameters with ranges
  - [ ] Edge cases covered
- Spectrum showing: "Vague → Detailed"
- Impact meter: "Highest impact on accuracy"

Section 3 - "Technical Constraints":
- Icon: Gear with boundaries
- Checklist items:
  - [ ] Libraries/frameworks specified
  - [ ] File structure requirements
  - [ ] Dependency limitations
  - [ ] Browser/platform targets
  - [ ] Performance requirements
- Impact meter: "High impact on usability"

Section 4 - "Examples & Patterns":
- Icon: Template/pattern
- Checklist items:
  - [ ] Code structure example
  - [ ] Naming conventions
  - [ ] Style patterns
  - [ ] Similar MicroSim references
- Impact meter: "Medium-high impact on consistency"

Section 5 - "Output Format":
- Icon: Package/delivery
- Checklist items:
  - [ ] File format specified
  - [ ] Completeness requirement
  - [ ] Comment expectations
  - [ ] No truncation instruction
- Impact meter: "Medium impact on usability"

Bottom summary:
- "Time spent on prompt" vs "Time saved in iterations" graph showing positive ROI

Color scheme:
- Blue for section headers
- Green for good examples
- Red for bad examples
- Yellow for impact meters

Interactive features:
- Click sections to expand with more examples
- Hover over checklist items for tips

Implementation: HTML/CSS/JavaScript card-based layout
</details>

## Claude Code Skills: Intelligent Context Management

Now we enter territory that's particularly exciting for power users: **Claude Code Skills**. Skills are a mechanism for packaging specialized knowledge and procedures that Claude can invoke when needed. Understanding how skills work—and how to create your own—is the key to consistent, high-quality MicroSim generation at scale.

### How Skills Work: The Context Window Challenge

Every AI conversation has a **context window**—the total amount of text the AI can "see" at once. For Claude, this is substantial but not unlimited. Here's the challenge: you might want Claude to know about hundreds of things (coding standards, design patterns, domain knowledge, project conventions), but you can't include all of that in every conversation.

Skills solve this problem through intelligent context management:

1. **Skill Registration**: You define up to **30 skills** that Claude can access
2. **Summary Indexing**: Each skill has a short summary (~100 tokens) that Claude sees in its context
3. **On-Demand Loading**: When a skill is relevant, Claude loads the full skill content
4. **Context Efficiency**: Only relevant knowledge occupies context space

Think of it like a library. Claude doesn't carry every book at all times—that would be impossible. Instead, Claude has a card catalog (the skill summaries) always available and retrieves full books (skill content) only when needed.

### The 30-Skill Limit: Strategic Choices

Why 30 skills? It's a balance. Each skill summary occupies context space even when the skill isn't invoked. With 30 skills at ~100 tokens each, that's about 3,000 tokens just for the skill index—a meaningful but manageable portion of the context window.

This limit forces strategic thinking about what skills to include:

| Skill Category | Examples | Priority |
|----------------|----------|----------|
| Core generation | `microsim-generator`, `diagram-creator` | Essential |
| Domain-specific | `physics-sim`, `economics-charts` | High for relevant projects |
| Quality assurance | `accessibility-checker`, `code-reviewer` | Medium-high |
| Formatting | `readme-generator`, `glossary-creator` | Medium |
| Utilities | `file-organizer`, `dependency-checker` | Lower |

### Anatomy of a Skill

A well-designed skill contains:

```markdown
# Skill Name

## Description
Brief description for the skill summary index (~100 tokens max)

## When to Use
Conditions that trigger this skill

## Workflow
Step-by-step procedure Claude follows

## References
Files, templates, or examples the skill can access

## Best Practices
Guidelines for optimal results
```

The description is critical—it's what appears in Claude's "card catalog" and determines whether the skill gets invoked.

### Creating Your Own MicroSim Skills

Here's an example skill structure for MicroSim generation:

```markdown
# microsim-p5js-generator

## Description
Generates p5.js-based educational MicroSims from specifications.
Creates responsive, interactive simulations with standard controls,
consistent styling, and accessibility features. Use when user
requests a MicroSim or provides simulation specifications.

## When to Use
- User requests a MicroSim or simulation
- User provides a detailed specification
- User asks to create an interactive visualization
- User needs a p5.js-based educational component

## Workflow
1. Verify specification completeness
2. Load project style guidelines
3. Generate HTML/CSS/JavaScript code
4. Validate against accessibility requirements
5. Test responsive behavior
6. Provide code with documentation

## References
- /templates/microsim-template.html
- /styles/microsim-standard.css
- /docs/p5js-patterns.md
```

!!! note "Skill Economy"
    With only 30 skill slots, consider creating composite skills that handle related tasks rather than highly specialized single-purpose skills. A `microsim-generator` skill that handles multiple visualization types is often more valuable than separate skills for each type.

<iframe src="../../sims/claude-code-architecture/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/claude-code-architecture/main.html){ .md-button .md-button--primary }

#### Diagram: Claude Code Skills Architecture

<details markdown="1">
<summary>Claude Code Skills Architecture</summary>
Type: diagram

Bloom Taxonomy: Understand (L2)

Learning Objective: Visualize how Claude Code Skills manage context efficiently through summary indexing and on-demand loading

Components to show:

1. Context Window (large rectangle representing total available space):
- Fixed boundary showing context limit
- Divided into sections:
  - Conversation history (variable size)
  - Skill Index (fixed ~3000 tokens)
  - Active skill content (variable, loaded on demand)
  - Working space (available for generation)

2. Skill Registry (sidebar):
- 30 slots shown as cards
- Each card shows:
  - Skill name
  - ~100 token summary
  - "Load" indicator
- Some cards highlighted as "currently loaded"
- Some cards dimmed as "available but not loaded"

3. Loading Mechanism (arrows):
- Arrow from conversation to skill registry: "Relevance detection"
- Arrow from skill registry to context window: "On-demand loading"
- Arrow showing skill content expanding into context

4. Example scenario:
- User message: "Create a physics simulation"
- Skill index scan: "physics-sim" and "microsim-generator" highlighted
- Both skills loaded into context
- Remaining space shown as available

Flow annotations:
- "Step 1: User request enters context"
- "Step 2: Claude scans skill summaries"
- "Step 3: Relevant skills loaded"
- "Step 4: Generation uses skill knowledge"

Visual metaphors:
- Library card catalog for skill index
- Books being pulled from shelves for skill loading
- Desk workspace for active context

Color scheme:
- Blue for context window boundaries
- Green for loaded/active skills
- Gray for available but unloaded skills
- Yellow for user input
- Orange for skill summaries

Implementation: HTML/CSS/JavaScript with animated loading demonstration
</details>

## Building Consistency with Rule Hierarchies

Here's a challenge that emerges when you're creating not just one MicroSim, but dozens or hundreds across multiple textbooks: **consistency**. How do you ensure that all your MicroSims use the same styling, follow the same interaction patterns, and maintain the same quality standards?

The answer is **hierarchical rule systems**—layered sets of guidelines that cascade from broad organizational standards down to specific project requirements.

### The Rule Hierarchy Model

Think of rules like cascading style sheets (CSS) in web development. Just as CSS has specificity rules that determine which styles apply when conflicts occur, a rule hierarchy for MicroSim generation has layers that override each other in predictable ways.

From broadest to most specific:

1. **Global/Enterprise Rules**: Apply to all MicroSims across the organization - any changes have a large impact (blast radius)
2. **Business Unit Rules**: Apply to a division or major product line
3. **Department Rules**: Apply to a team or subject area
4. **Project Rules**: Apply to a specific textbook or course
5. **Personal Rules**: Apply to an individual creator's work

### Rule Content at Each Level

| Level | Example Rules | Typical Owner |
|-------|--------------|---------------|
| Enterprise | Brand colors, accessibility standards, legal requirements | Design system team |
| Business Unit | Technology stack, deployment platforms, API standards | Technical leadership |
| Department | Subject-specific conventions, pedagogical approaches | Department head |
| Project | Textbook styling, chapter conventions, navigation patterns | Project lead |
| Personal | IDE preferences, code formatting, personal shortcuts | Individual |

### Example: Rules at Each Level

**Enterprise Rules (applies to all):**
```markdown
# Enterprise MicroSim Standards

## Branding
- Primary color: #1E88E5 (corporate blue)
- Secondary color: #FFA726 (corporate orange)
- Font family: "Roboto", sans-serif

## Accessibility
- WCAG 2.1 AA compliance required
- Minimum contrast ratio: 4.5:1
- Keyboard navigation mandatory
- Screen reader compatibility required

## Legal
- Copyright notice in all files
- No external tracking scripts
- Data privacy compliance
```

**Business Unit Rules (K-12 Education Division):**
```markdown
# K-12 Education MicroSim Standards

## Extends: Enterprise Standards

## Technology
- p5.js for animations
- Chart.js for data visualization
- No dependencies requiring accounts/logins

## Pedagogy
- Maximum 3 interactive controls per MicroSim
- Always include reset button
- Provide scaffolded difficulty levels
```

**Department Rules (Science Education):**
```markdown
# Science Education MicroSim Standards

## Extends: K-12 Education Standards

## Subject Conventions
- SI units required (with Imperial conversions where appropriate)
- Scientific notation for very large/small numbers
- Significant figures displayed appropriately

## Visualization
- Real-world scale indicators where possible
- Time controls for process simulations
- Data collection/export capability
```

**Project Rules (Physics Textbook, Grade 9):**
```markdown
# Grade 9 Physics Textbook MicroSim Standards

## Extends: Science Education Standards

## Visual Style
- Chapter accent colors: Ch1=#E53935, Ch2=#8E24AA, Ch3=#1E88E5...
- Mascot character appears in hint tooltips
- Consistent control layout across all MicroSims

## Pedagogical
- Pre-test prediction prompts
- Post-interaction reflection questions
- Connection to specific textbook sections
```

**Personal Rules (individual preferences):**
```markdown
# Dan's MicroSim Preferences

## Extends: Grade 9 Physics Standards

## Development
- Always run updateCanvasSize() first in setup()
- Console.log learning events for debugging
- Include timing metadata in generated files
```

### Conflict Resolution: The Specificity Principle

What happens when rules conflict? Like CSS, more specific rules override more general ones. The hierarchy provides automatic conflict resolution:

**General principle**: The most specific rule wins.

```
Enterprise: "Use corporate blue (#1E88E5) for primary actions"
Project: "Use chapter accent color for primary actions"

Resolution: Project rule wins (more specific)
```

### The !important Override

Sometimes a higher-level rule must not be overridden—it's a hard requirement, not a default. Like CSS's `!important` declaration, rule systems need an override mechanism:

```markdown
## Accessibility [MANDATORY]
- WCAG 2.1 AA compliance required
- This rule cannot be overridden at lower levels
```

The `[MANDATORY]` tag (or similar marker) indicates that this rule is not subject to cascade override. Use sparingly—too many mandatory rules eliminate the flexibility that makes hierarchies useful.

| Override Level | Meaning | When to Use |
|----------------|---------|-------------|
| Normal | Can be overridden by more specific rules | Default preferences |
| `[RECOMMENDED]` | Should only be overridden with justification | Best practices |
| `[MANDATORY]` | Cannot be overridden | Legal, accessibility, safety |

<iframe src="../../sims/rule-hierarchy-cascade/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/rule-hierarchy-cascade/main.html){ .md-button .md-button--primary }

#### Diagram: Rule Hierarchy Cascade

<details markdown="1">
<summary>Rule Hierarchy Cascade</summary>
Type: diagram

Bloom Taxonomy: Analyze (L4)

Learning Objective: Visualize how rules cascade through hierarchy levels and how conflicts are resolved

Visual layout: Vertical cascade showing rules flowing down through levels

Structure (top to bottom):

Level 1 - Enterprise (top, widest):
- Box containing sample rules
- Color: Dark blue
- Width: Full width
- Rules: "Brand colors", "Accessibility [MANDATORY]", "Legal requirements"
- Arrow flowing down

Level 2 - Business Unit:
- Box slightly narrower
- Color: Medium blue
- Rules: "Technology stack", "Platform standards"
- Shows some enterprise rules passing through unchanged
- Shows one rule being overridden (strikethrough in enterprise box)
- Arrow flowing down

Level 3 - Department:
- Box narrower still
- Color: Light blue
- Rules: "Subject conventions", "Pedagogical approach"
- Conflict example highlighted:
  - Enterprise says X
  - Department says Y
  - Y is applied (shown with checkmark)
- Arrow flowing down

Level 4 - Project:
- Box even narrower
- Color: Teal
- Rules: "Visual style", "Chapter conventions"
- MANDATORY rule from enterprise shown as unchanged/locked
- Arrow flowing down

Level 5 - Personal (bottom, narrowest):
- Box narrowest
- Color: Green
- Rules: "Development preferences", "Code style"
- Final applied rules shown

Conflict Resolution Panel (side):
- Example conflict scenario
- Visual showing "most specific wins"
- Exception: MANDATORY rules shown with lock icon
- Resulting rule highlighted

Visual indicators:
- Lock icon for MANDATORY rules
- Override arrows showing rule replacement
- Passthrough arrows for unchanged rules
- Color gradient from dark (general) to light (specific)

Interactive elements:
- Click on any rule to see its cascade path
- Hover to see which level defined the rule
- Toggle to show conflicts only

Implementation: HTML/CSS/JavaScript with animated cascade demonstration
</details>

### Implementing Rule Repositories

Where do these rules actually live? Several approaches:

**Option 1: Hierarchical Files**
```
/rules
  /enterprise
    - brand-standards.md
    - accessibility.md
    - legal.md
  /business-unit
    /k12-education
      - technology.md
      - pedagogy.md
  /department
    /science
      - conventions.md
  /project
    /physics-grade9
      - style-guide.md
```

**Option 2: Flat with Tags**
```
/rules
  - enterprise-brand-standards.md
  - enterprise-accessibility.md
  - bu-k12-technology.md
  - dept-science-conventions.md
  - proj-physics9-style.md
```

**Option 3: Single File with Sections**
```
/rules
  - complete-ruleset.md (with hierarchical sections)
```

**Option 4: Database/CMS**
```
Rules stored in structured database with:
  - Level (enterprise, bu, dept, project, personal)
  - Category (visual, technical, pedagogical)
  - Override status (normal, recommended, mandatory)
  - Effective dates
  - Owner/approver
```

### Pros and Cons of Hierarchy Depth

Should you use all five levels, or keep it simpler?

| Approach | Pros | Cons |
|----------|------|------|
| **Deep hierarchy (5+ levels)** | Maximum flexibility; clear ownership; can scale to large orgs | Complexity; harder to track which rule applies; maintenance burden |
| **Medium hierarchy (3 levels)** | Good balance; covers most use cases; manageable complexity | May not fit very large or very small organizations |
| **Shallow hierarchy (1-2 levels)** | Simple; easy to understand; fast to implement | Limited flexibility; may require frequent overrides; doesn't scale |

**Recommendation**: Start with 3 levels (organization, project, personal) and add intermediate levels only when you have clear use cases. Complexity you add early tends to stick around.

!!! warning "Hierarchy Maintenance"
    1. **Training for Top Level Editor** - Be very carful about changing **ANY** high-level rules.
    Because these rules are widely used, they can have a large negative impact if they
    are not tested carefully.  Only your most experienced developers should be given permission
    to change enterprise-level rules.  This is where regression testing is most valuable.
    2. Every level you add requires someone to maintain it. An abandoned middle level is worse than no level at all—it creates confusion about whether rules are current or deprecated. Only add levels if you have committed owners.

## Refinement Prompts: The Art of Iteration

Unless you are using mature skills, the first version of a MicroSim rarely produces a perfect result. **Refinement prompts** are follow-up messages that guide AI toward improvements. This is where the real craft of AI collaboration emerges.

### The Refinement Mindset

Refinement is not about criticizing AI or starting over—it's about collaborative improvement. The AI has made an attempt based on its understanding; your refinement prompt helps clarify where that understanding was incomplete or where the result needs adjustment.

Good refinement prompts:

- Acknowledge what's working (builds on successes)
- Identify specific issues (not vague dissatisfaction)
- Explain why something needs change (context helps AI understand)
- Suggest approaches (when you have ideas)
- Maintain context (reference the specification)

### Refinement Prompt Patterns

**Pattern 1: The Specific Fix**
```
The simulation works well, but the slider for "price" should range
from $0 to $100, not 0 to 1. Please update the slider range and
ensure the display shows dollar signs.
```

**Pattern 2: The Behavior Clarification**
```
When the user adjusts supply, the curve shifts correctly. However,
the equilibrium point should animate smoothly to its new position
rather than jumping instantly. Add a transition animation of
approximately 500ms.
```

**Pattern 3: The Visual Adjustment**
```
The colors work but are hard to distinguish for colorblind users.
Please change the supply curve to #1E88E5 (blue) and the demand
curve to #E53935 (red), which have better contrast and are
accessible.
```

**Pattern 4: The Added Feature**
```
Please add a "Reset" button below the controls that returns all
parameters to their default values and resets the visualization
to its initial state.
```

**Pattern 5: The Architecture Change**
```
The current approach uses separate functions for each control.
Please refactor to use a single updateVisualization() function
that reads all current control values and updates the display.
This will make future modifications easier.
```

### What Makes Refinement Prompts Effective

| Characteristic | Example | Why It Helps |
|----------------|---------|--------------|
| Specific | "Change slider range to 0-100" | AI knows exactly what to modify |
| Contextual | "As specified in the requirements..." | References shared understanding |
| Reasoned | "...for accessibility compliance" | Explains the why, aids future decisions |
| Actionable | "Add a transition animation" | Clear next step |
| Constructive | "The colors work but..." | Preserves what's good |

### The Refinement Conversation Flow

A typical refinement conversation looks like this:

1. **Initial generation**: AI produces first version
2. **Testing**: You test in browser, identify 3 issues
3. **Refinement 1**: "Please fix issues A and B" (most important first)
4. **Testing**: A fixed, B partially fixed, new issue C appeared
5. **Refinement 2**: "B still needs X, and the change caused C, please fix both"
6. **Testing**: All issues resolved
7. **Final refinement**: "Add code comments and format consistently"

Notice the batching strategy—grouping related fixes reduces round trips while keeping prompts focused.

## Output Interpretation: Reading What AI Gives You

**Output interpretation** is the skill of understanding what AI has generated and assessing its quality. This isn't just "does it run?"—it's evaluating whether the generated code meets your specification, follows best practices, and will be maintainable.

### Levels of Output Assessment

**Level 1: Syntax Validity**
- Does the code have any syntax errors?
- Are all tags/brackets properly closed?
- Are dependencies correctly referenced?

**Level 2: Functional Correctness**
- Does the MicroSim run without JavaScript errors?
- Do the controls produce expected behavior?
- Is the visualization mathematically/scientifically correct?

**Level 3: Specification Compliance**
- Are all specified features implemented?
- Do parameters use correct ranges?
- Does the visual design match requirements?
- Are all learning objectives supported?

**Level 4: Quality Standards**
- Is the code clean and readable?
- Are there appropriate comments?
- Is the structure maintainable?
- Does it follow project conventions?

**Level 5: Pedagogical Effectiveness**
- Does the interaction support learning?
- Is the cognitive load appropriate?
- Are misconceptions avoided?
- Is feedback clear and helpful?

### Common Output Patterns to Watch For

| Pattern | What to Look For | Risk Level |
|---------|-----------------|------------|
| Truncated code | Code ends abruptly mid-function | High—won't run |
| Placeholder comments | `// TODO: implement this` | Medium—incomplete |
| Hardcoded values | Magic numbers instead of parameters | Medium—inflexible |
| Missing error handling | No validation of inputs | Medium—fragile |
| Inconsistent naming | Mixed camelCase and snake_case | Low—maintenance issue |
| Excessive complexity | Over-engineered solutions | Low—but watch for bugs |

## Issue Identification: Finding What's Wrong

**Issue identification** is the systematic process of finding problems in generated output. This is detective work—some issues are obvious, others hide in edge cases.

### Issue Categories

**Category 1: Crashes and Errors**
- JavaScript errors in console
- Failed resource loading
- Infinite loops
- Memory leaks

**Category 2: Functional Bugs**
- Incorrect calculations
- Broken interactions
- State management problems
- Edge case failures

**Category 3: Visual Issues**
- Layout problems
- Color/contrast issues
- Responsive breakage
- Animation glitches

**Category 4: Specification Deviations**
- Missing features
- Wrong parameter ranges
- Incorrect default values
- Unexpected behaviors

**Category 5: Quality Concerns**
- Poor code organization
- Missing comments
- Accessibility failures
- Performance problems

### The Issue Triage Process

When you find multiple issues, triage them:

1. **Blockers**: Must fix before any testing continues (crashes, data corruption)
2. **Critical**: Prevents core functionality (feature doesn't work)
3. **Major**: Significantly impacts usability (confusing UI, wrong behavior)
4. **Minor**: Noticeable but functional (visual polish, code style)
5. **Enhancement**: Would be nice but not required (extra features)

Address blockers and critical issues first. Don't waste time on polish if fundamentals are broken.

<iframe src="../../sims/issue-identification-workflow/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/issue-identification-workflow/main.html){ .md-button .md-button--primary }

#### Diagram: Issue Identification Workflow

<details markdown="1">
<summary>Issue Identification Workflow</summary>
Type: workflow

Bloom Taxonomy: Apply (L3)

Learning Objective: Provide a systematic approach to finding and categorizing issues in generated MicroSim code

Visual style: Decision tree with testing checkpoints

Main flow:

Start: "Generated Code Received"

Checkpoint 1 - "Syntax Check":
- Action: Open in code editor, check for red underlines
- Decision: Syntax errors?
  - Yes → Log as Blocker, request fix immediately
  - No → Continue

Checkpoint 2 - "Load Test":
- Action: Open in browser
- Decision: Does it load without console errors?
  - No → Examine console, log as Blocker/Critical
  - Yes → Continue

Checkpoint 3 - "Visual Inspection":
- Action: Compare to specification mockup
- Checklist:
  - [ ] Layout matches spec
  - [ ] Colors correct
  - [ ] Controls present
  - [ ] Labels readable
- Decision: Visual issues found?
  - Yes → Log as Major/Minor depending on severity
  - Continue regardless

Checkpoint 4 - "Functional Testing":
- Action: Test each control/interaction
- For each control:
  - Default value correct?
  - Range works as specified?
  - Updates visualization?
  - Edge cases handled?
- Log issues as Critical/Major

Checkpoint 5 - "Edge Case Testing":
- Action: Try unusual inputs
- Tests:
  - Minimum values
  - Maximum values
  - Rapid changes
  - Browser resize
- Log issues found

Checkpoint 6 - "Specification Review":
- Action: Compare to spec line by line
- Check every specified feature
- Log deviations as appropriate severity

Checkpoint 7 - "Quality Review":
- Action: Code review
- Check:
  - Comments present?
  - Code organized?
  - Accessibility features?
- Log as Minor/Enhancement

End: "Issue List Complete" → Priority sorting → Refinement prompt

Color coding:
- Red: Blocker checkpoints
- Orange: Critical checkpoints
- Yellow: Major checkpoints
- Green: Minor/Enhancement checkpoints

Implementation: HTML/CSS/JavaScript interactive checklist
</details>

## The Regeneration Decision: Try Again or Fix by Hand?

One of the most important judgment calls in AI-assisted development: when you find issues, should you ask AI to **regenerate** the code, or should you **manually adjust** what you have? This is the **regeneration decision**.

### Factors Favoring Regeneration

Regenerate when:

- The fundamental approach is wrong (need different architecture)
- Multiple interrelated issues would require extensive manual changes
- The specification has changed significantly
- You want to try a completely different approach
- The code quality is too poor to salvage

### Factors Favoring Manual Adjustment

Manually adjust when:

- Issues are isolated and well-understood
- The overall structure is sound
- Changes are small and localized
- You need precise control over the fix
- You've already invested in understanding the generated code
- Manual fix is faster than explaining the change

### The Decision Matrix

| Situation | Regenerate | Manual Fix |
|-----------|------------|------------|
| Wrong algorithm | ✓ | |
| Missing feature | ✓ | |
| Incorrect parameter | | ✓ |
| Style/formatting | | ✓ |
| Multiple bugs from same cause | ✓ | |
| Single isolated bug | | ✓ |
| Major refactoring needed | ✓ | |
| Minor refactoring needed | | ✓ |
| Don't understand the code | ✓ | |
| Understand code well | | ✓ |

### The Hybrid Approach

Often the best approach is hybrid:

1. Make small manual fixes for quick wins
2. Test to verify fixes don't break other things
3. Use refinement prompts for larger changes
4. Regenerate only if you're starting over conceptually

## Manual Adjustment: When You Take the Wheel

**Manual adjustment** is directly editing AI-generated code yourself. This requires understanding the generated code well enough to modify it safely.

### When Manual Beats AI

Manual adjustment is often faster for:

- Changing a single value
- Fixing typos or naming
- Adding a simple feature to existing structure
- Adjusting CSS for visual tweaks
- Adding console.log for debugging
- Fixing obvious bugs

### Safe Manual Modification Practices

1. **Understand before modifying**: Read the relevant section thoroughly
2. **Make one change at a time**: Easier to identify what broke if something does
3. **Test after each change**: Don't accumulate untested modifications
4. **Keep the original**: Copy before modifying so you can compare
5. **Document your changes**: Comments or commit messages explaining why
6. **Match existing style**: Your additions should look like AI's code

### Common Manual Adjustments

```javascript
// Original AI-generated code
let sliderValue = slider.value;  // Range 0-1

// Manual adjustment: Change range to 0-100
let sliderValue = slider.value * 100;  // Range 0-100 (adjusted)
```

```javascript
// Original AI-generated code
function draw() {
  background(255);
  // ... drawing code
}

// Manual adjustment: Add responsive sizing (from project rules)
function draw() {
  updateCanvasSize();  // Added: ensure responsive sizing
  background(255);
  // ... drawing code
}
```

!!! tip "The 5-Minute Rule"
    If you can make a manual fix in under 5 minutes with confidence, do it manually. If it would take longer or you're uncertain, write a refinement prompt instead. AI can often make complex changes faster and with fewer bugs than humans—that's the whole point.

### Personal Ownership of Code: Learning to Let Go

Here's a psychological challenge that surprises many developers new to AI-assisted development: **letting go of code you've invested time in**. Traditional development creates a strong sense of ownership. You wrote those functions. You debugged that tricky edge case at 2 AM. That code is *yours*.

Then someone suggests: "Why don't we just regenerate the whole thing with an updated specification?"

And something inside you screams: "But I spent three hours on that animation timing!"

This reaction is natural, but it can sabotage your productivity. The code isn't the product—**the working MicroSim is the product**. If regenerating from a better specification gets you to a working MicroSim faster than patching your existing code, then regeneration wins, regardless of your emotional attachment.

### The Sunk Cost Trap in Code

Developers new to AI often fall into a familiar trap:

1. Generate initial code
2. Spend hours tweaking and adjusting manually
3. Requirements change
4. Refuse to regenerate because "I already fixed so many things"
5. Spend more hours patching the patched code
6. End up with a fragile mess that nobody understands

This is the sunk cost fallacy applied to code. The time you already spent is gone—it shouldn't influence whether regeneration is the right choice *now*.

### The Specification-First Mindset

The solution is a fundamental shift in thinking: **invest in specifications, not code**.

| Traditional Approach | Specification-First Approach |
|---------------------|------------------------------|
| Code is the asset | Specification is the asset |
| Protect and patch code | Regenerate code freely |
| Manual tweaks accumulate | Improvements go into spec |
| Hard to reproduce | Always reproducible |
| Knowledge in code comments | Knowledge in specification |
| "Don't touch what works" | "Regenerate when spec improves" |

When you discover something important during development—a better interaction pattern, a cleaner visual design, an edge case that needs handling—don't just fix the code. **Update the specification**. Then the fix becomes permanent, reproducible, and applicable to future MicroSims.

### Training Teams for Specification-Driven Development

If you're leading a team transitioning to AI-assisted development, expect resistance. Developers have spent years building intuitions about protecting and incrementally improving code. Those intuitions served them well—but they can become obstacles in an AI-assisted workflow.

Strategies for helping teams adapt:

1. **Model the behavior**: When requirements change, visibly choose regeneration over patching. Show that it works.

2. **Celebrate specification improvements**: When someone adds a useful clause to the specification, recognize it. Make specification quality a team value.

3. **Track regeneration outcomes**: Keep data on how long patching takes versus regenerating. The numbers usually speak for themselves.

4. **Create psychological safety**: Make it clear that regenerating isn't "throwing away work"—it's using the work (captured in the specification) more effectively.

5. **Start with low-stakes MicroSims**: Let developers practice the regeneration workflow on simple projects before applying it to complex ones.

### Signs You Should Regenerate Instead of Patch

Watch for these indicators that regeneration would serve you better than continued patching:

- You've made more than 10 manual changes to generated code
- You're not sure what all your changes were anymore
- The code has become hard to understand
- A new requirement would touch multiple parts of the code
- You find yourself saying "I'm not sure why this works, but don't change it"
- The specification has evolved significantly since generation

### The Courage to Start Fresh

There's a certain courage required to delete working code and regenerate. It feels wasteful, even reckless. But consider: if your specification is good, regeneration takes minutes. If it produces something worse, you can always revert (that's why we have version control).

The developers who thrive with AI tools are those who learn to hold code loosely. They see code as a **renewable resource**—cheap to generate, easy to replace. Their investment goes into specifications, rules, and skills—the durable assets that make regeneration powerful.

!!! note "Patience with the Transition"
    Adjusting to generative AI tools takes time. Developers who've spent years honing their craft may feel that AI threatens their expertise. Help them see that their expertise is more valuable than ever—it just applies to specifications and evaluation rather than line-by-line coding. Be patient. The mindset shift is real, but so are the productivity gains on the other side.

## Version Control: Tracking Your Journey

**Version control** is the practice of systematically tracking changes to your MicroSim code over time. In AI-assisted development, this becomes even more important because you're potentially generating large amounts of code quickly.

### Why Version Control Matters for AI Work

Traditional coding produces gradual changes. AI-assisted coding can produce massive changes in single generations. Without version control:

- You can't undo a bad regeneration
- You lose track of what worked before
- You can't compare approaches
- Collaboration becomes chaotic

### Git Workflow for MicroSim Development

```bash
# Initial generation
git add physics-sim.html
git commit -m "Initial AI generation of physics MicroSim"

# After refinement round 1
git add physics-sim.html
git commit -m "Refinement: fixed slider range, added reset button"

# After manual adjustments
git add physics-sim.html
git commit -m "Manual fix: adjusted animation timing for smoothness"

# After major regeneration
git add physics-sim.html
git commit -m "Regeneration: new approach using requestAnimationFrame"
```

### Meaningful Commit Messages for AI Work

Structure your commits to track the development process:

| Prefix | Meaning | Example |
|--------|---------|---------|
| `gen:` | Initial AI generation | `gen: supply-demand simulation from spec v2` |
| `ref:` | Refinement via prompt | `ref: added equilibrium animation` |
| `fix:` | Manual bug fix | `fix: corrected price calculation formula` |
| `regen:` | Full regeneration | `regen: new visualization approach` |
| `style:` | Formatting/style changes | `style: applied project conventions` |

### Branching for Experimentation

Use branches to try different approaches without losing your current progress:

```bash
# Current working version on main
git checkout -b experiment/different-layout

# Try regeneration with different approach
# ... generate and test ...

# If it works better, merge
git checkout main
git merge experiment/different-layout

# If it doesn't, just delete the branch
git branch -d experiment/different-layout
```

## Iteration Management: Orchestrating the Process

**Iteration management** is the high-level skill of orchestrating the entire generation-refinement cycle. It's project management for AI collaboration.

### The Iteration Log

Keep a log of your iterations:

```markdown
# Supply-Demand MicroSim Development Log

## Iteration 1 - Initial Generation
- Date: 2024-01-15
- Prompt: Full spec v1
- Result: Basic functionality, several issues
- Issues: Slider ranges wrong, no reset button, colors too similar
- Decision: Refinement prompt for all three

## Iteration 2 - Refinement
- Date: 2024-01-15
- Prompt: Fix slider ranges, add reset, change colors
- Result: Sliders fixed, reset added, colors still problematic
- Issues: Colors changed but still low contrast
- Decision: Manual adjustment (faster than explaining colorblindness again)

## Iteration 3 - Manual + Refinement
- Date: 2024-01-15
- Manual: Fixed colors to accessible palette
- Prompt: Add prediction prompt feature
- Result: Both changes successful
- Issues: None functional, code could use comments
- Decision: Final refinement for polish

## Iteration 4 - Finalization
- Date: 2024-01-15
- Prompt: Add code comments, format consistently
- Result: Production ready
- Decision: Deploy
```

### Knowing When to Stop

Perfectionism is the enemy of shipped MicroSims. Establish stopping criteria:

1. **Core functionality works**: All specified features operational
2. **Major issues resolved**: No blockers or critical bugs
3. **Accessibility met**: Keyboard navigation, contrast requirements
4. **Code is maintainable**: Reasonably commented, structured
5. **Tested with learners**: At least informal validation

If you meet these criteria, ship it. You can always iterate post-deployment based on real feedback.

### Iteration Anti-Patterns

| Anti-Pattern | Symptom | Solution |
|--------------|---------|----------|
| Endless refinement | 10+ iterations without shipping | Set iteration limit, ship MVP |
| Specification drift | Requirements changing mid-iteration | Freeze spec, iterate within scope |
| Manual takeover | Writing more code than AI | Step back, rethink prompts |
| Regeneration spiral | Each regeneration introduces new issues | Return to last good version |
| Polish paralysis | Spending hours on minor visual tweaks | Set time boxes for polish |

<iframe src="../../sims/iteration-dashboard/main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run MicroSim Fullscreen](../../sims/iteration-dashboard/main.html){ .md-button .md-button--primary }

#### Diagram: Iteration Management Dashboard

<details markdown="1">
<summary>Iteration Management Dashboard</summary>
Type: infographic

Bloom Taxonomy: Evaluate (L5)

Learning Objective: Provide a visual tool for tracking iteration progress and making go/no-go decisions

Layout: Dashboard with multiple panels

Panel 1 - "Iteration Counter":
- Current iteration number (large display)
- Iterations remaining (if limit set)
- Color coding: Green (on track), Yellow (watch), Red (excessive)
- Suggested max: 5-7 iterations

Panel 2 - "Issue Tracker":
- Stacked bar showing issues by severity
- Resolved vs remaining
- Trend line showing if issues are decreasing
- Alert if issues increasing after iteration

Panel 3 - "Specification Coverage":
- Checklist of specified features
- Percentage complete
- Unchecked items highlighted
- Must be 100% before finalization

Panel 4 - "Quality Gates":
- Checklist of quality criteria:
  - [ ] Core functionality works
  - [ ] No blocking issues
  - [ ] Accessibility compliance
  - [ ] Code maintainability
  - [ ] Performance acceptable
- Status: "Ready to ship" when all checked

Panel 5 - "Decision Point":
- Current status summary
- Recommended action:
  - "Continue refinement" (issues remaining)
  - "Ready for final polish" (functionality complete)
  - "Ready to ship" (all gates passed)
  - "Consider regeneration" (too many issues)
  - "Stop and reassess" (iteration limit hit)

Panel 6 - "Time Investment":
- Time spent per phase
- Comparison to similar projects
- ROI indicator (value created vs time spent)

Interactive features:
- Click to expand each panel
- Input fields for logging iterations
- Export iteration log as markdown
- Reset for new MicroSim

Color scheme:
- Green: On track / complete
- Yellow: Attention needed
- Red: Problem / blocked
- Blue: Information / neutral

Implementation: HTML/CSS/JavaScript dashboard with local storage for persistence
</details>

## Case Study: p5.js vs Mermaid for Interactive Workflows

To illustrate the importance of library selection and the regeneration decision, let's examine a real case where the same MicroSim was implemented using two different approaches: p5.js and Mermaid.js.

### The Challenge: Interactive Accessibility Audit Workflow

The goal was to create an interactive workflow diagram that guides users through a systematic accessibility audit. The workflow has 8 steps including 5 test nodes, each requiring:

- **Pass/Fail buttons** embedded within each test node
- **Color changes** to reflect test results (green for pass, red for fail, orange for pending)
- **Progress tracking** showing passed, failed, and pending counts
- **Tooltips** displaying test questions on hover
- **Reset functionality** to start a new audit

### Implementation 1: p5.js (Canvas-Based)

The p5.js version treats everything as a custom drawing problem. All elements—nodes, connectors, buttons, text—are rendered programmatically on an HTML canvas.

<iframe src="../../sims/accessibility-audit-workflow/main.html" height="700px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[View p5.js Version Fullscreen](../../sims/accessibility-audit-workflow/main.html){ .md-button }

**Architecture:**
```
JavaScript (p5.js)
  └── Data: steps[] array (single source of truth)
        └── Rendering: draw() loop
              └── Interaction: mousePressed() with hit detection
```

### Implementation 2: Mermaid.js (Render + Overlay)

The Mermaid version uses the library to render the flowchart SVG, then overlays interactive HTML buttons using JavaScript DOM manipulation.

<iframe src="../../sims/accessibility-audit-mermaid/main.html" height="1000px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[View Mermaid Version Fullscreen](../../sims/accessibility-audit-mermaid/main.html){ .md-button }

**Architecture:**
```
Mermaid.js (external library)
  └── Mermaid Syntax (in HTML) → SVG Output (black box)
        └── JavaScript (custom)
              └── Data: testData{} object (duplicates node info)
                    └── DOM Manipulation: overlays, color changes
```

### Quantitative Comparison

| Metric | p5.js Version | Mermaid Version |
|--------|---------------|-----------------|
| Total Lines of Code | 644 | 522 (330 HTML + 192 CSS) |
| Files | 1 (.js) | 2 (.html, .css) |
| Data Locations | 1 (steps array) | 2 (Mermaid syntax + JS object) |
| Debug Difficulty | Low | High |

### Problems Encountered

**p5.js Problems (Minor):**

1. Button positioning within nodes—straightforward arithmetic adjustments
2. Text centering in ellipses—conditional offset for node types
3. Connector spacing—manual Y-position adjustments

**Resolution:** All problems were simple coordinate calculations.

**Mermaid Problems (Significant):**

1. **Node ID discovery**—Mermaid v11 generates IDs like `flowchart-Test1-0`, but this varies by version
2. **Button visibility**—Required z-index debugging and scroll offset handling
3. **SVG manipulation**—Changing node colors requires DOM queries into generated SVG
4. **Positioning overlays**—`getBoundingClientRect()` relative to container with scroll offsets
5. **Data duplication**—Node info exists in both Mermaid syntax AND JavaScript object

**Resolution:** Required workaround functions, debug logging, and multiple iteration cycles.

### Maintainability Analysis

**Adding a new test step:**

| Task | p5.js | Mermaid |
|------|-------|---------|
| Places to update | 1 (steps array) | 3 (Mermaid syntax, testData{}, auditResults{}) |
| Risk of inconsistency | Low | High |
| Time required | ~2 minutes | ~5 minutes |

**Changing node appearance:**

- **p5.js:** Full control via `drawNode()` function—shapes, colors, effects, animations
- **Mermaid:** Limited to `classDef` CSS-like syntax or post-render DOM manipulation

### Decision Rules: When to Choose Each

Based on this case study, here are decision rules for the **regeneration decision** when choosing between implementations:

**Choose p5.js when:**

| Condition | Weight |
|-----------|--------|
| Workflow nodes need embedded interactive controls (buttons, sliders) | Critical |
| Node appearance changes based on state (color, size, shape) | High |
| Custom animations or transitions are needed | High |
| Pixel-precise positioning is required | Medium |
| Diagram will be frequently modified | Medium |

**Choose Mermaid when:**

| Condition | Weight |
|-----------|--------|
| Workflow is static (view-only, no interaction) | Critical |
| Standard flowchart shapes are sufficient | High |
| Diagram is documentation (not a learning tool) | High |
| Quick prototype needed | Medium |
| Diagram content comes from text/markdown source | Medium |

### The Key Insight

> **If users need to click ON diagram elements (not just view them), use p5.js.**
> **If the diagram is documentation or navigation, use Mermaid.**

This case study demonstrates why the **regeneration decision** matters. When the original Mermaid implementation encountered significant interaction challenges, the appropriate response was to recognize that the library choice was fundamentally mismatched to the requirements—and either regenerate with a different approach or accept significant workaround complexity.

For interactive educational workflows with embedded controls, the additional p5.js code complexity is more than offset by:

1. Single source of truth for data
2. Predictable, debuggable coordinate system
3. No dependency on library internals
4. Full control over all visual elements
5. Straightforward maintenance path

Mermaid excels at its intended purpose: generating attractive diagrams from text descriptions. When interactivity extends beyond basic tooltips, the abstraction becomes a liability rather than an asset.

---

## Putting It All Together: The Complete AI Collaboration Workflow

Let's synthesize everything into a practical workflow you can follow:

### Pre-Generation Checklist

Before starting generation:

- [ ] Specification complete and reviewed
- [ ] Project rules identified and accessible
- [ ] Generation skill selected
- [ ] Success criteria defined
- [ ] Iteration limit set (suggest: 5-7)

### Generation Phase

1. Craft your prompt with full specification, context, constraints, examples
2. Include relevant rules from your hierarchy
3. Submit and wait for generation
4. Save output immediately (version control)

### Evaluation Phase

1. Syntax check in editor
2. Load test in browser
3. Visual inspection against spec
4. Functional testing of all controls
5. Edge case testing
6. Specification compliance review

### Refinement Phase

1. Triage identified issues
2. Decide: regenerate or refine?
3. If refining: craft specific, contextual refinement prompt
4. If manual: make isolated, tested changes
5. Repeat evaluation

### Finalization Phase

1. Verify all quality gates passed
2. Final polish iteration (comments, formatting)
3. Commit with meaningful message
4. Deploy to target environment
5. Document in iteration log

## Summary: Your AI Collaboration Toolkit

You've now mastered the skills for effective AI collaboration in MicroSim development. Let's recap what you've learned:

**Generation Workflow** provides the five-phase framework from specification through finalization. Understanding this workflow helps you know where you are and what comes next.

**Prompt Engineering** is the foundation skill—crafting prompts with context, specifications, constraints, examples, and format instructions that elicit optimal results.

**Claude Code Skills** offer intelligent context management through summary indexing and on-demand loading, letting you maintain up to 30 specialized skills that Claude can invoke when relevant.

**Rule Hierarchies** enable consistency at scale—from enterprise standards through business units, departments, projects, and personal preferences, with clear conflict resolution via specificity and mandatory overrides.

**Refinement Prompts** are the art of iterative improvement—specific, contextual, reasoned, and constructive messages that guide AI toward better results.

**Output Interpretation** is reading what AI generates with critical assessment at multiple levels from syntax validity through pedagogical effectiveness.

**Issue Identification** is systematic detective work, triaging problems by severity and addressing blockers before polish.

**Regeneration Decision** is the judgment call between asking AI to try again versus fixing things yourself—guided by factors like issue scope, code understanding, and time investment.

**Manual Adjustment** is knowing when to take the wheel for quick fixes, always following safe modification practices.

**Version Control** tracks your journey through iterations, enabling rollback, comparison, and collaboration.

**Iteration Management** orchestrates the whole process, keeping logs, knowing when to stop, and avoiding anti-patterns like endless refinement.

When you combine these skills with your pedagogical expertise and domain knowledge, you become something new: not just an instructional designer, not just a developer, but a **conductor** orchestrating AI capabilities toward educational goals. That's a powerful role, and the world needs more people who can fill it.

The MicroSims you create with these skills will help learners around the globe understand complex concepts through interactive exploration. Every simulation you generate is a small step toward a world where education is more engaging, more effective, and more accessible to everyone.

Now go forth and generate. Your AI collaborator is ready when you are.

## References and Further Reading

For those wanting to dive deeper into AI-assisted development:

- Anthropic. (2024). *Claude Documentation: Prompt Engineering Guide*. https://docs.anthropic.com
- White, J., et al. (2023). A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT. *arXiv preprint*.
- GitHub. (2024). *GitHub Copilot Documentation*. https://docs.github.com/copilot
- Nielsen, J. (2023). AI Tools in Professional Workflows. *Nielsen Norman Group*.

??? question "Test Your Understanding: Refinement vs. Regeneration"
    You've generated a MicroSim and found three issues: (1) a single wrong default value, (2) the entire animation approach is too slow and needs a different implementation, and (3) a typo in a label. How would you handle each issue?

    **Answer**:

    1. **Manual fix** - changing one value is faster than explaining it. 
    2. **Regeneration or major refinement prompt** - a fundamental approach change needs AI help. 
    3. **Manual fix** - typos are trivial to fix directly. The optimal approach is hybrid: manually fix the value and typo, then submit a refinement prompt focused solely on the animation approach.
