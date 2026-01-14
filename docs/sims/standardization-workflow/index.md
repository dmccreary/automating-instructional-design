---
title: Standardization Workflow
description: Interactive flowchart showing the MicroSim standardization process for evaluating and upgrading quality scores.
author: Dan McCreary
date: 2025-01-14
quality_score: 85
type: microsim
library: p5.js
bloom_level: Apply (L3)
learning_objective: Students will apply the standardization workflow to evaluate and upgrade MicroSim quality.
concepts:
  - standardization
  - workflow
  - quality-assurance
  - validation
  - metadata
---

# Standardization Workflow

This interactive flowchart demonstrates the complete standardization workflow used to evaluate and upgrade MicroSim quality. The workflow ensures all MicroSims meet consistent quality standards through systematic validation.

<iframe src="main.html" width="100%" height="680px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

[Run the Standardization Workflow MicroSim](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

1. **Explore the Workflow**: Click on any step (node) to see its detailed description
2. **Adjust Sample Score**: Use the slider at the bottom to change the sample quality score (0-100)
3. **Toggle p5.js Type**: Click the toggle to switch between p5.js and non-p5.js MicroSim types
4. **Observe Path Highlighting**: The active workflow path is highlighted in green based on your inputs

## Workflow Steps Explained

### Step 1: Receive MicroSim Path
The workflow begins when a user provides the path to a MicroSim directory for evaluation.

### Step 2: Check Existing Score
The system checks the YAML frontmatter for an existing `quality_score`. If the score is already 85 or higher, standardization is skipped.

### Steps 3-4: Begin or Skip
- **Skip**: If score >= 85, the MicroSim already meets standards
- **Begin Checklist**: If score < 85, proceed with full evaluation

### Step 5: Check Core Files
Verify that required files exist:
- `main.html` - Standalone HTML file
- `index.md` - MkDocs documentation page
- `metadata.json` - Structured metadata

### Step 6: Validate index.md Structure
Check for proper structure:
- YAML frontmatter with required fields
- Proper markdown headers
- Embedded iframe for the simulation
- Links to standalone version

### Step 7: Detect MicroSim Type
Determine if the MicroSim uses p5.js library by checking the HTML and JavaScript files.

### Steps 8-9: Type-Specific Checks
- **p5.js MicroSims**: Verify p5.js Editor link exists for online testing
- **Other Types**: Skip type-specific checks and continue

### Step 10: Validate Content Sections
Ensure the documentation includes:
- Clear description of the simulation
- Lesson plan for educators
- References and resources

### Step 11: Validate metadata.json
Run JSON Schema validation to ensure metadata follows the required structure.

### Step 12: Calculate Quality Score
Sum points from the standardization rubric to generate a score from 0-100.

### Step 13: Write Score
Update the YAML frontmatter in index.md with the new `quality_score` value.

### Step 14: Complete
The standardization workflow is finished.

## Color Coding Legend

| Color | Category | Description |
|-------|----------|-------------|
| Blue | File Operations | Reading, writing, or checking files |
| Yellow | Decision Points | Branches in the workflow based on conditions |
| Green | Success Outcomes | Steps that indicate successful completion or skip |
| Purple | Validation Steps | Content and structure verification |
| Indigo | Start/End | Terminal nodes of the workflow |

## References

- [MicroSim Standards Documentation](../../chapters/11-quality-assurance/)
- [Quality Rubric Guidelines](../../chapters/11-quality-assurance/rubric/)
- [Metadata Schema Specification](../../learning-graph/)
