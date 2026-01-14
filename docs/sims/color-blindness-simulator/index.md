# Color Blindness Simulator

<iframe src="./main.html" width="100%" height="520px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

[Run the Color Blindness Simulator in Full Screen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive simulation helps designers and developers test color accessibility by visualizing how color palettes appear to people with different types of color vision deficiencies.

## How to Use

1. **Select a Vision Type** - Use the dropdown to choose from:
    - **Normal Vision** - Full color perception
    - **Deuteranopia** - Green cone deficiency (most common, affects ~6% of males)
    - **Protanopia** - Red cone deficiency (affects ~2% of males)
    - **Tritanopia** - Blue cone deficiency (rare, <0.01% of population)
    - **Monochromacy** - Complete color blindness (grayscale vision)

2. **Choose a Color Preset** - Test different palettes:
    - **Default** - Common web colors including red, green, blue, yellow, orange, purple, teal, and pink
    - **Traffic Light** - Colors used in traffic signals and status indicators
    - **Heat Map** - Sequential color ramp from cold (blue) to hot (red)
    - **Colorblind-Safe** - A palette specifically designed for accessibility

3. **Compare Results** - The left panel shows original colors while the right panel shows how they appear with the selected vision type

4. **Check Accessibility** - Warning triangles appear on problematic color pairs, and the status bar indicates whether the palette is safe or problematic

## Color Blindness Facts

| Type | Affected Cone | Prevalence | Main Confusion |
|------|---------------|------------|----------------|
| Deuteranopia | Green | ~6% of males | Red/Green |
| Protanopia | Red | ~2% of males | Red/Green |
| Tritanopia | Blue | <0.01% | Blue/Yellow |
| Monochromacy | All | Very rare | All colors |

## Design Recommendations

- **Never rely on color alone** to convey information
- Use **patterns, shapes, or labels** in addition to color
- Test designs with the **Colorblind-Safe palette** as a reference
- Ensure sufficient **contrast** between adjacent colors
- Consider using **color blindness simulation tools** during design reviews

## Technical Notes

This simulator uses color transformation matrices based on research by Brettel, Vienot, and Mollon to accurately simulate how colors appear to people with different types of color vision deficiency. The matrices transform RGB values to approximate the reduced color discrimination experienced by affected individuals.
