# Iteration Dashboard

<iframe src="main.html" width="100%" height="600px" style="border: none; overflow: hidden;"></iframe>

[Run the Iteration Dashboard MicroSim](main.html){ .md-button .md-button--primary target="_blank" }

## About This MicroSim

This interactive dashboard demonstrates how to track progress through multiple iterations of a MicroSim development project. It visualizes the key metrics and milestones that determine when a project is ready for testing and deployment.

## Learning Objective

Provide a multi-panel dashboard for tracking iteration progress with quality gates.

## Bloom Taxonomy Level

**Evaluate (L5)** - Students assess quality metrics, judge readiness for deployment, and evaluate the impact of issues on overall project health.

## Dashboard Panels

### Panel 1: Version History (Top-Left)

- Timeline showing version progression (v1.0 through v1.4)
- Each version displays its quality score with color coding
- Click on any version to view its details
- Current version is highlighted

### Panel 2: Quality Metrics (Top-Right)

- Bar chart showing four key metrics:
  - **Technical Quality** - Code quality, performance, reliability
  - **Pedagogical Alignment** - Educational effectiveness
  - **UX Score** - User experience and usability
  - **Accessibility Score** - WCAG compliance
- Color coding: Red (<50), Yellow (50-80), Green (>80)
- Hover over bars to see detailed scores

### Panel 3: Issues Tracker (Bottom-Left)

- List of issues with status icons
- Filter by severity: Critical (red), Major (orange), Minor (yellow), Resolved (green)
- Shows open and resolved issue counts
- Issues affect quality scores when unresolved

### Panel 4: Decision Log (Bottom-Right)

- Key decisions made during the iteration process
- Each entry includes date and rationale
- Provides audit trail for design choices

## Quality Gates

Two quality gates determine project readiness:

1. **Testing Ready** (green indicator) - All critical issues must be resolved
2. **Deploy Ready** (green indicator) - Overall quality score must exceed 85

## Interactive Features

- **Click versions** to view historical data
- **Hover over metrics** to see detailed breakdowns
- **Filter issues** by clicking severity buttons
- **Add Issue** button simulates discovering new problems
- **Resolve Issue** button simulates fixing problems
- **Reset** button returns to initial state

## How Quality Scores Update

When issues are added or resolved, the quality metrics update accordingly:

- Critical issues have the largest impact on scores
- Major issues have moderate impact
- Minor issues have smaller impact
- Resolving issues improves all metrics

This simulation helps learners understand the iterative nature of quality improvement and the relationship between issue resolution and deployment readiness.
