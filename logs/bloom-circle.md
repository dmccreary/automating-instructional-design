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
- 8 clickable action verbs per level arranged in two rows (5 outer, 3 inner)
- Center area displays selected verb details and level description
- Hover effects highlight sections and verbs
- "Generate Template" button creates learning objective templates and copies to clipboard
- "Random Verb" button for practice
- Pulsing animation on selected verb
- Responsive width design
- Animation pauses when mouse leaves canvas

## Iterative Refinements

1. **Initial implementation** - Created basic wheel with 6 sections and verb circles

2. **Label orientation fix** - Flipped "Apply" and "Create" labels so they read right-side-up instead of upside-down

3. **Label font size** - Increased level labels from 12pt to 16pt (later adjusted to 20pt by user)

4. **Verb distribution** - Changed from bunched-up central positioning to two-row layout:
   - Initially split 4/4 between outer and inner rows
   - Changed to 5/3 split (5 verbs outer, 3 inner)

5. **Angular spread** - Expanded verb spacing within wedges:
   - Started at 85% of wedge span
   - Increased outer row to 105%, then 115%
   - Set both rows to 115% of wedge span for maximum spread

## Technical Notes

- Canvas dimensions: 600px wide (responsive), 660px draw height + 60px control height
- Wheel center offset by +20px to accommodate title
- Outer row positioned at 70% of wedge depth
- Inner row positioned at 30% of wedge depth
- Uses `lerpColor()` for hover/selection effects

## Testing

Local testing URL: `http://127.0.0.1:8000/automating-instructional-design/sims/bloom-wheel/`

## Reminder

Create a screenshot named `bloom-wheel.png` for social media previews.
