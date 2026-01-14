---
title: Metadata Search
description: An interactive MicroSim database search tool demonstrating metadata filtering by subject, grade level, JavaScript library, and Bloom's Taxonomy level.
---

# Metadata Search

<iframe src="main.html" height="800px" width="100%" scrolling="no"></iframe>

[Run the Metadata Search MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive MicroSim demonstrates how metadata filtering can be applied to efficiently search a database of educational simulations. Students learn to apply multiple filter criteria simultaneously to find relevant learning resources.

### Learning Objective

Students will apply metadata filtering to efficiently search a MicroSim database by subject, grade level, and JavaScript library.

### Bloom's Taxonomy Level

**Apply (L3)** - Students use filtering controls to locate specific MicroSims, demonstrating practical application of database search concepts.

## Features

### Filter Controls (Left Panel)

| Filter | Options |
|--------|---------|
| **Subject Area** | Mathematics, Physics, Computer Science, Biology, Chemistry, Data Science, Engineering |
| **Grade Level** | K-2, 3-5, 6-8, 9-12, Undergraduate, Graduate |
| **JS Library** | p5.js, vis-network, Chart.js, D3.js, Three.js, Plotly, Leaflet |
| **Bloom's Level** | Remember, Understand, Apply, Analyze, Evaluate, Create (multi-select) |
| **Quality Score** | Slider from 0-100% minimum threshold |

### Interactive Elements

- **Real-time Filtering**: Results update instantly as you change any filter
- **Tag Cloud**: Click popular tags to filter by topic
- **Sortable Results**: Sort by quality score or alphabetically
- **Result Cards**: Visual cards showing thumbnail, title, and key metadata
- **Quality Badges**: Color-coded scores (green > 90%, yellow 70-90%, red < 70%)
- **Detail Modal**: Click any card to view complete metadata

### Result Card Information

Each result card displays:

- Subject-specific color gradient thumbnail
- Library icon indicator
- Quality score badge
- Title and description
- Bloom's level tag
- JavaScript library tag
- Grade level tag

## How to Use

1. **Apply Filters**: Use the dropdown menus and checkboxes to narrow your search
2. **Set Quality Threshold**: Drag the slider to set minimum quality requirements
3. **Click Tags**: Use the tag cloud for quick topic-based filtering
4. **View Details**: Click any result card to see full metadata
5. **Reset**: Click "Reset" to clear all filters and start over

## Concepts Covered

- **Metadata**: Structured data that describes other data
- **Database Filtering**: Reducing result sets using multiple criteria
- **Faceted Search**: Using multiple independent filters simultaneously
- **Information Architecture**: Organizing content with consistent taxonomies
- **Quality Metrics**: Using standardized scores to evaluate resources

## Mock Data

This MicroSim includes 15 sample MicroSims with complete metadata:

1. Ohm's Law Simulator (Physics, p5.js)
2. Learning Dependency Network (CS, vis-network)
3. Bloom's Taxonomy Pyramid (CS, p5.js)
4. Sorting Algorithm Race (CS, p5.js)
5. Probability Tree Explorer (Math, D3.js)
6. Cell Division Animation (Biology, p5.js)
7. Climate Data Dashboard (Data Science, Chart.js)
8. Fraction Builder (Math, p5.js)
9. Molecular Structure Viewer (Chemistry, Three.js)
10. Geographic Data Map (Data Science, Leaflet)
11. Pendulum Wave Machine (Physics, p5.js)
12. Neural Network Playground (CS, D3.js)
13. Color Pattern Matching (Math, p5.js)
14. Ecosystem Food Web (Biology, vis-network)
15. Bridge Engineering Challenge (Engineering, p5.js)

## Use Cases

This MicroSim is useful for:

- **Instructional Designers**: Finding appropriate simulations for curriculum
- **Teachers**: Locating grade-appropriate interactive resources
- **Developers**: Understanding metadata schema requirements
- **Students**: Learning database search and filtering concepts

## Technical Implementation

- **Framework**: Pure HTML/CSS/JavaScript (no external dependencies)
- **Layout**: CSS Flexbox and Grid for responsive design
- **Data**: Client-side JSON array (mock data)
- **Filtering**: Real-time JavaScript array filtering
- **Modal**: CSS overlay with click-outside-to-close

## References

- Dublin Core Metadata Initiative. (2020). DCMI Metadata Terms. https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
- IEEE Learning Technology Standards Committee. (2002). IEEE Standard for Learning Object Metadata.
