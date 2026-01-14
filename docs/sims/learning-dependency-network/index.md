---
title: Learning Dependency Network
description: An interactive vis-network visualization demonstrating how learning dependencies between concepts can be represented, showing prerequisites flowing to target learning objectives.
---

# Learning Dependency Network

<iframe src="main.html" height="500px" width="100%" scrolling="no" style="border: none;"></iframe>

[Run the Learning Dependency Network Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive visualization demonstrates how vis-network can visualize learning dependencies between educational concepts. The hierarchical graph shows how prerequisite knowledge flows upward toward target learning objectives, with advanced extensions building upon mastered concepts.

### Node Types

| Shape | Color | Type | Description |
|-------|-------|------|-------------|
| Circle | Gray (#e0e0e0) | **Foundation** | Base concepts that form the starting point |
| Rectangle | Blue (#4facfe) | **Prerequisite** | Required concepts that must be learned first |
| Hexagon | Green (#4caf50) | **Target** | The main learning objective |
| Diamond | Purple (#9c27b0) | **Advanced** | Extensions beyond the target concept |

### Edge Types

| Style | Name | Meaning |
|-------|------|---------|
| Solid arrow | **PREREQUISITE_OF** | Points from prerequisite to dependent concept |
| Dashed arrow | **EXTENDS** | Points from concept to advanced application |

### Interactive Features

- **Click** on any concept to highlight all its prerequisites
- **Hover** over nodes to see concept definitions
- **Orange highlighting** shows the selected concept
- Dimmed nodes indicate concepts not in the prerequisite chain

### Sample Learning Path

The visualization shows a mathematics learning path:

1. **Basic Arithmetic** (Foundation) - The starting point
2. **Variables** and **Functions** (Prerequisites) - Build on arithmetic
3. **Algebra** (Prerequisite) - Requires both variables and functions
4. **Calculus** (Target) - The main learning goal, requires algebra
5. **Differential Equations** (Advanced) - Extends calculus knowledge

## Lesson Plan

### Learning Objectives

By exploring this visualization, students will be able to:

1. **Understand** how learning dependencies form a directed graph structure
2. **Analyze** prerequisite chains to identify required knowledge
3. **Distinguish** between different types of concepts (foundation, prerequisite, target, advanced)
4. **Apply** dependency analysis to plan their own learning paths

### Suggested Activities

**Activity 1: Prerequisite Exploration (5 minutes)**
: Click on "Calculus" to see all prerequisites highlighted. Discuss why each concept is necessary for learning calculus.

**Activity 2: Learning Path Planning (10 minutes)**
: Starting from a target concept in your own domain, work backward to identify all prerequisites. Create a similar dependency graph.

**Activity 3: Gap Analysis (10 minutes)**
: If a student struggles with calculus, use the dependency graph to identify which prerequisite concepts might need review.

### Discussion Questions

1. Why is it important to learn concepts in a specific order?
2. What happens if you skip a prerequisite concept?
3. How can dependency graphs help with curriculum design?
4. What other domains could benefit from learning dependency visualization?

## Use Cases

This visualization pattern is valuable for:

- **Curriculum Design** - Planning the sequence of topics in a course
- **Student Assessment** - Identifying knowledge gaps based on dependencies
- **Adaptive Learning** - Recommending what to study next
- **Course Prerequisites** - Visualizing required prior knowledge
- **Competency Frameworks** - Mapping skill dependencies in professional development

## Technical Details

- Built with vis-network library
- Hierarchical layout with foundation concepts at bottom, target concepts near top
- Fixed node positions for consistent visualization
- Recursive traversal for prerequisite highlighting
- Zoom/drag disabled for iframe embedding
- Navigation buttons enabled for accessibility
