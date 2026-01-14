---
title: Rule Hierarchy Cascade
description: An interactive visualization showing how rules cascade through organizational hierarchy levels and how conflicts are resolved using specificity.
---

# Rule Hierarchy Cascade

<iframe src="main.html" height="570px" width="100%" scrolling="no"></iframe>

[Run the Rule Hierarchy Cascade MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive MicroSim visualizes how configuration rules flow down through organizational hierarchy levels, demonstrating the concept of rule inheritance and conflict resolution in hierarchical systems.

### The Five Hierarchy Levels

From top (most general) to bottom (most specific):

1. **Enterprise** (Dark Blue) - Organization-wide rules like brand colors, accessibility requirements, and legal mandates
2. **Business Unit** (Medium Blue) - Division-specific rules for technology stacks and platform standards
3. **Department** (Light Blue) - Subject-specific conventions and pedagogical approaches
4. **Project** (Teal) - Project-level visual styles and chapter conventions
5. **Personal** (Green) - Individual developer preferences and code styles

### Key Concepts

- **MANDATORY Rules**: Marked with a lock icon, these rules cannot be overridden at any lower level
- **Rule Override**: When a lower level explicitly replaces a higher-level rule (shown with strikethrough)
- **Conflict Resolution**: When rules conflict, the most specific (lowest) level wins
- **Inheritance**: Rules automatically flow down unless explicitly overridden

### Interactive Features

- **Hover** over hierarchy levels to highlight them
- **Hover** over rule chips to see detailed information
- **Click** "Animate Cascade" to watch rules flow through the hierarchy
- **Legend panel** explains the visual indicators

## Learning Objectives

After exploring this MicroSim, learners will be able to:

- Explain how rules cascade through organizational hierarchies
- Identify when a rule can and cannot be overridden
- Predict how conflicts between levels are resolved
- Apply the "most specific wins" principle to resolve configuration conflicts

## Use Cases

This pattern applies to many real-world scenarios:

- **CSS Cascading**: How styles inherit and override in web development
- **Configuration Management**: Enterprise to personal settings in software systems
- **Policy Hierarchies**: How organizational policies flow down through departments
- **Permissions Systems**: How access controls inherit through organizational levels

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/rule-hierarchy-cascade/main.html" height="570px" scrolling="no"></iframe>
```

## References

- CSS Specificity and Cascade Rules
- Configuration Management Best Practices
- Hierarchical Policy Systems in Enterprise Architecture
