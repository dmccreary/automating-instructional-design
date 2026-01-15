# p5.js vs Mermaid for Interactive Workflow Diagrams

**Date:** 2025-01-15
**Case Study:** Accessibility Audit Workflow MicroSim

## Executive Summary

Both implementations achieve the same functional result—an interactive workflow diagram with Pass/Fail buttons, progress tracking, tooltips, and reset functionality. However, they differ significantly in complexity, maintainability, and the types of problems encountered during development.

**Recommendation:** Use **p5.js** for interactive workflows with embedded controls. Use **Mermaid** for static or minimally interactive workflow documentation.

---

## Quantitative Comparison

| Metric | p5.js Version | Mermaid Version |
|--------|---------------|-----------------|
| Total Lines of Code | 644 | 522 (330 HTML + 192 CSS) |
| Files | 1 (.js) | 2 (.html, .css) |
| External Dependencies | p5.js library | Mermaid.js library |
| Data Locations | 1 (steps array) | 2 (Mermaid syntax + JS object) |
| Custom Hit Detection | Yes | Yes (for button overlays) |
| DOM Manipulation | Minimal | Extensive |
| Debug Difficulty | Low | High |

---

## Architectural Differences

### p5.js Approach: "Draw Everything"

```
┌─────────────────────────────────────┐
│  JavaScript (p5.js)                 │
│  ┌─────────────────────────────┐   │
│  │ Data: steps[] array          │   │
│  │ - nodes, positions, colors   │   │
│  │ - questions, descriptions    │   │
│  └─────────────────────────────┘   │
│              ↓                      │
│  ┌─────────────────────────────┐   │
│  │ Rendering: draw() loop       │   │
│  │ - drawConnectors()           │   │
│  │ - drawNode()                 │   │
│  │ - drawPassFailButtons()      │   │
│  │ - drawControlArea()          │   │
│  └─────────────────────────────┘   │
│              ↓                      │
│  ┌─────────────────────────────┐   │
│  │ Interaction: mousePressed()  │   │
│  │ - getNodeAt()                │   │
│  │ - getButtonAt()              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Mermaid Approach: "Render + Overlay"

```
┌─────────────────────────────────────┐
│  Mermaid.js (external library)      │
│  ┌─────────────────────────────┐   │
│  │ Mermaid Syntax (in HTML)     │   │
│  │ - flowchart TD               │   │
│  │ - Node definitions           │   │
│  │ - classDef styles            │   │
│  └─────────────────────────────┘   │
│              ↓                      │
│  ┌─────────────────────────────┐   │
│  │ SVG Output (black box)       │   │
│  │ - Generated node IDs         │   │
│  │ - Internal structure varies  │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  JavaScript (custom)                │
│  ┌─────────────────────────────┐   │
│  │ Data: testData{} object      │   │
│  │ - Duplicates node info       │   │
│  └─────────────────────────────┘   │
│              ↓                      │
│  ┌─────────────────────────────┐   │
│  │ DOM Manipulation             │   │
│  │ - findNodeElement()          │   │
│  │ - getBoundingClientRect()    │   │
│  │ - createButtonOverlays()     │   │
│  │ - updateNodeColor()          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Problems Encountered

### p5.js Problems (Minor)

1. **Button positioning within nodes** - Required manual calculation of offsets
2. **Text centering in ellipses** - Needed conditional offset for different node types
3. **Connector spacing** - Manual Y-position adjustments

**Resolution:** All problems were straightforward arithmetic adjustments to constants.

### Mermaid Problems (Significant)

1. **Node ID discovery** - Mermaid v11 generates IDs like `flowchart-Test1-0`, but this varies by version
2. **Button visibility** - Required z-index debugging, scroll offset handling
3. **SVG manipulation** - Changing node colors requires DOM queries into generated SVG
4. **Positioning overlays** - `getBoundingClientRect()` relative to container with scroll offsets
5. **Data duplication** - Node info exists in Mermaid syntax AND JavaScript object

**Resolution:** Required workaround functions (`findNodeElement`), debug logging, and multiple iteration cycles.

---

## Maintainability Analysis

### Adding a New Test Step

**p5.js:** Add one object to the `steps[]` array:
```javascript
{
  id: 'newtest',
  type: 'test',
  label: 'New Test\nName',
  color: colors.inProgress,
  x: 0.5,
  y: 0.XX,  // Adjust Y positions
  testNum: 6,
  questions: ['Question 1?', 'Question 2?'],
  description: 'Description here.'
}
```

**Mermaid:** Update THREE places:
1. Mermaid syntax in HTML
2. `testData{}` JavaScript object
3. `auditResults{}` state object

### Changing Node Appearance

**p5.js:** Modify `drawNode()` function with full control over shapes, colors, effects.

**Mermaid:** Limited to `classDef` CSS-like syntax, or post-render DOM manipulation.

### Debugging Interaction Issues

**p5.js:** Add `console.log(mouseX, mouseY)` in event handlers; coordinates are predictable.

**Mermaid:** Must account for SVG viewBox, container positioning, scroll offsets, and varying node ID formats.

---

## Decision Rules for MicroSim Matcher

Use these rules to determine which approach to recommend:

### Choose p5.js When:

| Condition | Weight |
|-----------|--------|
| Workflow nodes need embedded interactive controls (buttons, sliders) | +100 |
| Node appearance changes based on state (color, size, shape) | +50 |
| Custom animations or transitions are needed | +50 |
| Pixel-precise positioning is required | +30 |
| Hover effects beyond simple tooltips | +30 |
| Diagram will be frequently modified | +20 |

### Choose Mermaid When:

| Condition | Weight |
|-----------|--------|
| Workflow is static (view-only, no interaction) | +100 |
| Standard flowchart shapes are sufficient | +50 |
| Diagram is documentation (not a learning tool) | +50 |
| Quick prototype needed | +30 |
| Diagram content comes from text/markdown source | +30 |
| No custom interaction beyond link clicks | +20 |

### Scoring Algorithm

```
IF sum(p5_conditions) > sum(mermaid_conditions):
    RECOMMEND p5.js
ELSE IF workflow has ANY embedded controls:
    RECOMMEND p5.js  # Hard requirement
ELSE:
    RECOMMEND Mermaid
```

---

## Code Complexity Patterns

### p5.js Patterns (Predictable)

```javascript
// Data-driven rendering
for (let step of steps) {
  drawNode(step);
}

// Hit detection
function getNodeAt(mx, my) {
  for (let i = 0; i < steps.length; i++) {
    // Simple bounds checking
  }
}
```

### Mermaid Patterns (Fragile)

```javascript
// Node discovery (version-dependent)
function findNodeElement(testId) {
  let node = document.getElementById('flowchart-' + testId + '-0');
  if (!node) node = document.getElementById('flowchart-' + testId);
  if (!node) node = document.querySelector(`[data-id="${testId}"]`);
  // ... fallback searches
}

// Position calculation (container-relative)
const nodeRect = nodeEl.getBoundingClientRect();
const areaRect = diagramArea.getBoundingClientRect();
const scrollTop = diagramArea.scrollTop;
const centerX = nodeRect.left - areaRect.left + scrollTop + nodeRect.width / 2;
```

---

## Conclusion

For the Accessibility Audit Workflow use case—an interactive checklist with Pass/Fail buttons embedded in workflow nodes—**p5.js is the superior choice**. The additional lines of code are offset by:

1. Single source of truth for data
2. Predictable, debuggable coordinate system
3. No dependency on library internals
4. Full control over all visual elements
5. Straightforward maintenance path

Mermaid excels at its intended purpose: generating attractive diagrams from text descriptions. When interactivity is added beyond basic tooltips, the abstraction becomes a liability rather than an asset.

### Rule of Thumb

> **If users need to click ON diagram elements (not just view them), use p5.js.**
> **If the diagram is documentation or navigation, use Mermaid.**
