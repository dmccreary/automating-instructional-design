# Accessibility Audit Workflow MicroSim Redesign

**Date:** 2025-01-14
**File:** `docs/sims/accessibility-audit-workflow/accessibility-audit-workflow.js`

## Problem Statement

The original UI had poor discoverability for how to mark test steps as Pass or Fail:

1. **Hidden interaction pattern**: Users had to click on the *left half* of a test node to mark it as "Fail" or the *right half* to mark it as "Pass"
2. **Misleading visual elements**: The "Pass" and "Fail" labels appeared on branch connectors, suggesting they might be clickable buttons, but they were purely decorative
3. **Buried instructions**: The only hint was small text at the bottom: "Click test nodes: Left = Pass, Right = Fail"
4. **Non-standard affordance**: Split-click zones on a single element is an unconventional pattern with no visual indication

From an instructional design perspective, this violated the principle of clear affordances—users couldn't discover how to interact without reading hidden instructions.

## Solution

Redesigned the interface with explicit, clearly labeled Pass/Fail buttons below each test node.

### Changes Made

1. **Added explicit buttons**: Each test node now has two clearly visible buttons labeled "Pass" (green) and "Fail" (red) positioned directly below it

2. **Visual states for buttons**:
   - **Default**: White background with colored outline
   - **Hover**: Light colored fill with full outline
   - **Selected**: Solid fill with white text

3. **Removed misleading branch labels**: The decorative "Pass"/"Fail" labels on the connector branches were removed to avoid confusion

4. **Simplified connectors**: Changed from branching connectors to simple vertical lines since the visual branching was decorative only

5. **Updated instructions**: Changed from "Click test nodes: Left = Pass, Right = Fail" to "Click Pass or Fail buttons to record test results"

6. **Increased canvas height**: From 750px to 850px to accommodate the buttons below each test node

7. **Adjusted node spacing**: Y positions were adjusted to provide adequate spacing between nodes with their buttons

### Technical Implementation

**New constants added:**
```javascript
const buttonWidth = 50;
const buttonHeight = 24;
const buttonGap = 10;
const buttonYOffset = 38;
```

**New colors added:**
```javascript
passDark: '#059669',
failDark: '#DC2626',
buttonBorder: '#E2E8F0'
```

**New functions:**
- `drawPassFailButtons(step, x, y)` - Renders Pass/Fail buttons below a test node
- `getButtonAt(mx, my)` - Hit detection for Pass/Fail buttons

**Modified functions:**
- `drawConnectors()` - Simplified to vertical lines, accounts for button space
- `drawNode()` - Calls `drawPassFailButtons()` for test nodes
- `mouseMoved()` - Detects button hover state
- `mousePressed()` - Handles button clicks separately from node clicks

### Before/After Layout

**Before:**
```
    ┌─────────────────┐
    │   Test Node     │  ← Click left half=Fail, right half=Pass (hidden!)
    └─────────────────┘
   Fail ──┤    ├── Pass   ← Decorative labels (misleading)
```

**After:**
```
    ┌─────────────────┐
    │   Test Node     │  ← Click to view details
    └─────────────────┘
      [Pass]  [Fail]     ← Explicit clickable buttons
```

## Design Principles Applied

1. **Clear affordance**: Buttons look like buttons and behave like buttons
2. **Discoverability**: No hidden interactions; all controls are visible
3. **Immediate feedback**: Button states change on hover and selection
4. **Consistency**: Standard button patterns that users already understand
5. **Reduced cognitive load**: Users don't need to read instructions to understand the interface
