---
title: Concept Dependencies Graph
description: An interactive directed acyclic graph showing concept dependencies with REQUIRES and SUPPORTS edge types, allowing users to explore prerequisite relationships.
---

# Concept Dependencies Graph

<iframe src="main.html" height="500px" width="100%" scrolling="no" style="border: none;"></iframe>

[Run the Concept Dependencies MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive visualization demonstrates how concepts in a learning domain depend on each other. The directed acyclic graph (DAG) shows both hard prerequisites (REQUIRES) and soft prerequisites (SUPPORTS) between concepts.

### Interactive Features

- **Click** on any concept node to highlight its complete dependency chain
- **Green nodes** show prerequisites (concepts you should learn first)
- **Pink nodes** show downstream concepts (what this concept leads to)
- **Orange** highlights the selected concept
- **Hover** over nodes to see concept descriptions

### Edge Types

| Edge Type | Visual Style | Meaning |
|-----------|-------------|---------|
| **REQUIRES** | Solid arrow | Hard prerequisite - must learn before proceeding |
| **SUPPORTS** | Dashed arrow | Soft prerequisite - helpful but not strictly required |

### Understanding the Graph

The graph shows 12 programming concepts arranged by their dependencies:

**Foundation Layer** (Top)
: Variables, Data Types, Operators - the building blocks

**Control Structures** (Middle)
: Expressions, Conditionals, Loops, Functions - program flow

**Data Organization** (Lower)
: Arrays, Objects, Recursion - working with data

**Advanced Concepts** (Bottom)
: Algorithms, Data Structures - putting it all together

### Example Exploration

1. Click on "Loops" to see that it requires Variables, Data Types, Operators, and Expressions
2. Notice that Conditionals "supports" Loops (helpful but not required)
3. See that Loops leads to Functions and Algorithms

## Learning Objectives

By exploring this diagram, students will be able to:

1. **Identify** prerequisite relationships between concepts
2. **Distinguish** between hard and soft dependencies
3. **Plan** a learning path through a topic
4. **Understand** how concepts build upon each other

## Use Cases

This visualization pattern is useful for:

- **Course Design**: Planning the sequence of topics
- **Student Guidance**: Helping learners understand what to study first
- **Curriculum Mapping**: Visualizing learning progressions
- **Competency Frameworks**: Showing skill dependencies

## Technical Details

- Built with vis-network library
- Physics disabled for stable fixed-position layout
- Recursive traversal for dependency highlighting
- Zoom/drag disabled for iframe embedding
- Navigation buttons enabled for accessibility
