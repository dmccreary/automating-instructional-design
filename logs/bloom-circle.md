# Bloom Wheel MicroSim Development Session

**Date:** 2025-12-19
**Location:** `docs/sims/bloom-wheel/`

## Summary

Created an interactive Bloom's Taxonomy Action Verb Wheel MicroSim using p5.js. The wheel helps instructional designers select appropriate action verbs when writing learning objectives at different cognitive complexity levels.

## Files Created

- `docs/sims/bloom-wheel/bloom-wheel.js` - Main p5.js implementation
- `docs/sims/bloom-wheel/main.html` - HTML wrapper with p5.js CDN
- `docs/sims/bloom-wheel/index.md` - Documentation page with iframe embed
- Updated `mkdocs.yml` - Added navigation entry for Bloom Wheel

## Features Implemented

- Six color-coded wedge sections for Bloom's Taxonomy levels:
  - Remember (Blue)
  - Understand (Green)
  - Apply (Yellow)
  - Analyze (Orange)
  - Evaluate (Pink)
  - Create (Purple)
- 8 clickable action verbs per level arranged in three rows (4 outer, 3 middle, 1 inner)
- Center area displays selected verb details and level description
- Hover effects highlight sections and verbs
- "Random Verb" button for practice
- Example learning objective displayed in control area when verb is selected
- Pulsing animation on selected verb
- Responsive width design
- Animation pauses when mouse leaves canvas
- Dynamic circle sizing based on text width

## Iterative Refinements

### Phase 1: Initial Implementation
1. **Initial implementation** - Created basic wheel with 6 sections and verb circles

### Phase 2: Label Adjustments
2. **Label orientation fix** - Flipped "Apply" and "Create" labels so they read right-side-up instead of upside-down (special case handling in rotation logic)

3. **Label font size** - Increased level labels from 12pt to 16pt, then to 20pt

### Phase 3: Verb Distribution (Two Rows)
4. **Verb distribution** - Changed from bunched-up central positioning to two-row layout:
   - Initially split 4/4 between outer and inner rows
   - Changed to 5/3 split (5 verbs outer, 3 inner)

5. **Angular spread** - Expanded verb spacing within wedges:
   - Started at 85% of wedge span
   - Increased outer row to 105%, then 115%
   - Set both rows to 115% of wedge span
   - Final: outer row at 130%, inner row at 115%

6. **Row positioning** - Adjusted radius scaling:
   - Outer row: 0.7 → 0.8 of wedge depth
   - Inner row: 0.3 → 0.5 of wedge depth

### Phase 4: Three-Row Layout
7. **Added third ring** - Changed from 2 rows to 3 rows:
   - Inner row: 1 verb (longest word) at 0.2 scale
   - Middle row: 3 verbs at 0.5 scale
   - Outer row: 4 verbs at 0.8 scale

8. **Dynamic circle sizing** - Circle width now depends on text width of verb label:
   - Uses `textWidth()` to measure verb text
   - Adds 24px padding (12px each side)
   - Fixed height of 22px
   - Hover and click detection updated to use dynamic dimensions

9. **Position adjustment for overlap** - Added angle adjustment for Evaluate and Understand slices:
   - Inner row circles moved by 0.15 radians clockwise
   - Prevents overlap with middle row circles

### Phase 5: Control Area Redesign
10. **Removed Generate Template button** - Button removed from UI

11. **Added example display** - When a verb is selected, the example learning objective is displayed in the control area using `text()`:
    - Position: (120, drawHeight + 20)
    - Prefixed with "Example: "
    - Font size: 14pt

12. **Repositioned Random Verb button** - Moved to position (10, drawHeight + 8)

## Technical Notes

- Canvas dimensions: 600px wide (responsive), 660px draw height + 60px control height
- Wheel center offset by +20px to accommodate title
- Three-row layout:
  - Inner row: 0.2 of wedge depth (1 longest verb, centered)
  - Middle row: 0.5 of wedge depth (3 verbs)
  - Outer row: 0.8 of wedge depth (4 verbs)
- Angular spans:
  - Outer row: 130% of wedge span
  - Middle/Inner rows: 115% of wedge span
- Verbs sorted by length; longest placed in inner ring
- Uses `lerpColor()` for hover/selection effects
- Dynamic ellipse sizing based on `textWidth()` + padding

## Final Configuration

```javascript
// Row positioning
innerRowRadius = innerRadius + (outerRadius - innerRadius) * 0.2;
middleRowRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
outerRowRadius = innerRadius + (outerRadius - innerRadius) * 0.8;

// Verb distribution per wedge
innerVerbs: 1 (longest)
middleVerbs: 3
outerVerbs: 4

// Angular spread
outerRow: verbAngleSpan * 1.30
middleRow: verbAngleSpan * 1.15
innerRow: centered + angleAdjust for Evaluate/Understand

// Circle sizing
ellipseWidth = textWidth(verb) + 24
ellipseHeight = 22
```

## Testing

Local testing URL: `http://127.0.0.1:8000/automating-instructional-design/sims/bloom-wheel/`

## Reminder

Create a screenshot named `bloom-wheel.png` for social media previews.
