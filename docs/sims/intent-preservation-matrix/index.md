---
title: Intent Preservation Matrix
description: An interactive hierarchical diagram showing how specification elements trace back to learning objectives, ensuring pedagogical intent is preserved throughout the design process.
---

# Intent Preservation Matrix

<iframe src="main.html" height="550px" width="100%" scrolling="no" style="border: none;"></iframe>

[Run the Intent Preservation Matrix Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive visualization demonstrates how every element in a MicroSim specification should connect back to the learning objective. The hierarchical structure shows traceability from high-level pedagogical goals down to specific implementation details.

### Interactive Features

- **Click** any element to highlight its complete connection path
- **Hover** over elements to see their rationale
- **Show Orphans** button highlights unconnected elements in red
- **Reset View** returns to the default state

### Hierarchy Levels

| Level | Color | Purpose |
|-------|-------|---------|
| **Learning Objective** | Dark Blue | The overarching pedagogical goal |
| **Key Concepts** | Blue | Core ideas students must understand |
| **Features/Elements** | Light Blue | Interactive components that teach concepts |
| **Specification Details** | Gray | Implementation specifics |

### Example: Supply and Demand MicroSim

The visualization uses a Supply and Demand economics simulation as an example:

**Learning Objective**
: "Understand how price equilibrium emerges from supply and demand interaction"

**Key Concepts** (4 items)
: Supply curve slopes upward, Demand curve slopes downward, Equilibrium at intersection, Shifts affect equilibrium

**Features** (5 items)
: Draggable curves, equilibrium marker, numeric readout, shift buttons

**Specification Details** (5 items)
: Color choices, visual styling, update behavior, increment values

### Traceability Principle

Every specification detail should be traceable back to the learning objective:

1. **Detail**: "Intersection marked with yellow circle, 10px radius"
2. **Feature**: Equilibrium point marker
3. **Concept**: Equilibrium occurs at intersection
4. **Objective**: Understand price equilibrium

If a detail cannot be traced back, it may be an **orphan** - an element that adds complexity without pedagogical value.

### Detecting Orphans

Click "Show Orphans" to identify elements without traceability connections. These appear in red and should be:

- **Removed** if they add unnecessary complexity
- **Connected** by adding a rationale linking them to a concept
- **Reconsidered** if they serve only decorative purposes

## Learning Objectives

By exploring this diagram, students will be able to:

1. **Trace** specification elements back to learning objectives
2. **Identify** orphan elements that lack pedagogical justification
3. **Evaluate** whether features serve the educational goals
4. **Design** specifications with intent preservation in mind

## Use Cases

This visualization pattern is useful for:

- **Specification Review**: Verify all elements support learning goals
- **Design Documentation**: Show the reasoning behind decisions
- **Quality Assurance**: Catch feature creep and unnecessary complexity
- **Team Communication**: Explain why specific choices were made

## Technical Details

- Built with vis-network library
- Hierarchical layout with fixed node positions
- Physics disabled for stable positioning
- Zoom/drag disabled for iframe embedding
- Navigation buttons enabled for accessibility
- Orphan detection highlights unconnected nodes
