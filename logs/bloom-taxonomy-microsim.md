# Bloom's Taxonomy MicroSim Session Log

**Date:** 2025-12-18
**Skill Used:** microsim-generator (p5.js)

## Request

Create a MicroSim called 'bloom-taxonomy' based on the Wikipedia SVG of Bloom's Revised Taxonomy pyramid. Requirements:
- Pyramid in left 2/3 of canvas
- Detailed hovers with matching border color in right 1/3
- No controls area
- Counter in upper-right tracking levels viewed
- Celebration animation when all six levels viewed

## Reference

Wikipedia SVG: https://en.wikipedia.org/wiki/Bloom%27s_taxonomy#/media/File:Bloom's_revised_taxonomy.svg

## Files Created

1. `docs/sims/bloom-taxonomy/bloom-taxonomy.js` - Main p5.js visualization
2. `docs/sims/bloom-taxonomy/main.html` - HTML wrapper with p5.js CDN
3. `docs/sims/bloom-taxonomy/index.md` - Documentation page

## Implementation Details

### Pyramid Structure
Six trapezoidal levels drawn from bottom to top:
1. **Remember** (Red #E74C3C) - Base level
2. **Understand** (Orange #E67E22)
3. **Apply** (Yellow #F1C40F)
4. **Analyze** (Green #2ECC71)
5. **Evaluate** (Blue #3498DB)
6. **Create** (Purple #9B59B6) - Apex

### Interactive Features
- **Hover Detection**: Point-in-trapezoid algorithm using cross-product method
- **Info Panel**: Displays level name, description, action verbs, and example
- **Border Color**: Matches the hovered level's color
- **Checkmarks**: Show which levels have been viewed
- **Counter**: Upper-right shows "X / 6" progress

### Celebration Animation
- Triggers when all 6 levels have been hovered
- 80 particles in pyramid colors
- Mixed shapes: circles, stars, squares
- Physics: gravity, velocity, rotation, alpha fade
- Click counter to reset and try again

### Technical Notes
- Width-responsive design using `updateCanvasSize()`
- Canvas height: 450px (no control area)
- Pyramid takes left ~60% of canvas
- Info panel takes right ~35% of canvas
- Text wrapping function for long descriptions

## Navigation Update

Added to `mkdocs.yml`:
```yaml
- MicroSims:
  - Graph Viewer: sims/graph-viewer/index.md
  - Bloom's Taxonomy: sims/bloom-taxonomy/index.md
```

## Testing

Local test URL: http://127.0.0.1:8000/automating-instructional-design/sims/bloom-taxonomy/

## Prompt Used

```
Use the microsim-generator skill to create a new MicroSim called 'bloom-taxonomy'
Use the following SVG file as your guide. Place the pyramid in the left 2/3 of
the canvas, and have detailed hovers with the same color for the border as the
level appear in the right 1/3 of the canvas. Do not use a controls area in this
MicroSim. Add a counter in the upper-right corner that counts the number of
levels the user has hovered over. Do a celebration animation when all six
levels have been viewed.
```

## TODO

- [ ] Create bloom-taxonomy.png screenshot for social media previews
