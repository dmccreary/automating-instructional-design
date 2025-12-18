# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs Material-based intelligent textbook about automating instructional design—transforming learning objectives into interactive educational simulations (MicroSims) using AI-assisted tools.

**Live site:** https://dmccreary.github.io/automating-instructional-design/

## Build and Development Commands

```bash
# Local development server (runs at http://127.0.0.1:8000/automating-instructional-design/)
mkdocs serve

# Build static site to /site directory
mkdocs build

# Deploy to GitHub Pages (gh-pages branch)
mkdocs gh-deploy
```

### Python Dependencies

```bash
pip install mkdocs mkdocs-material[imaging] jsonschema
```

For social card generation on macOS, install system dependencies:
```bash
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

### Learning Graph Utilities

Located in `docs/learning-graph/`:

```bash
# Validate learning graph against schema
python3 validate-learning-graph.py learning-graph.json <schema-file>

# Analyze graph structure
python3 analyze-graph.py

# Convert CSV to JSON format
python3 csv-to-json.py

# Add taxonomy categories to concepts
python3 add-taxonomy.py

# Generate taxonomy distribution report
python3 taxonomy-distribution.py
```

## Architecture

### Directory Structure

```
docs/
├── chapters/           # 12 educational chapters (01-12)
├── learning-graph/     # Course ontology: 200 concepts with dependencies
│   ├── learning-graph.json    # Main graph data
│   ├── learning-graph.csv     # Spreadsheet format
│   └── *.py                   # Validation/analysis scripts
├── sims/               # Interactive MicroSims (vis-network, p5.js)
├── stories/            # Narrative visual content with panel images
├── prompts/            # AI generation prompts for content creation
├── css/extra.css       # Custom styles
└── js/extra.js         # Copy-to-clipboard for prompts
```

### Chapter Content Structure

Each chapter uses this structure:
```markdown
---
title: Chapter Title
description: Brief description
generated_by: claude skill chapter-content-generator
date: YYYY-MM-DD HH:MM:SS
version: 0.03
---

# Chapter Title
## Summary
## Concepts Covered
## Prerequisites
[Main content with diagrams, MicroSims, tables]
```

### MicroSim Structure

Each MicroSim in `docs/sims/` contains:
- `index.md` - MkDocs page embedding the sim
- `main.html` - Standalone HTML file
- `*.js` - JavaScript (p5.js or vis-network)
- `local.css` - Scoped styles

### Content Generation

Chapter content is generated using Claude skills. Diagram specifications use `<details markdown="1">` blocks:
```markdown
#### Diagram: Diagram Name

<details markdown="1">
<summary>Diagram Name</summary>
Type: [microsim|diagram|infographic|workflow|chart|timeline]

Bloom Taxonomy: [Remember|Understand|Apply|Analyze|Evaluate|Create] (L1-L6)

Learning Objective: What the student should learn

[Detailed specification for implementation]

Implementation: [p5.js|vis-network|HTML/CSS/JavaScript|Mermaid]
</details>
```

## Key Conventions

- **Navigation tabs disabled**: Never add `navigation.tabs` to mkdocs.yml features
- **Local MicroSim testing**: Include repo name in path: `http://127.0.0.1:8000/automating-instructional-design/sims/...`
- **p5.js setup**: Always call `updateCanvasSize()` as first step in `setup()` for responsive width
- **Image optimization**: Compress large images (1-2MB) to 200-300KB using TinyPNG
- **vis-network labels**: Add slight y-offset (480→490) for horizontal edge labels to render correctly
- **Admonitions**: Use sparingly (max 1 per page). Requires `pymdownx.details` extension
- **Details blocks**: No leading spaces or indentation inside `<details markdown="1">` content
