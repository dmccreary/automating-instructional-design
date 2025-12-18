# Automating Instructional Design

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/automating-instructional-design/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fautomating--instructional--design-blue?logo=github)](https://github.com/dmccreary/automating-instructional-design)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![vis-network](https://img.shields.io/badge/vis--network-239120?logo=javascript&logoColor=white)](https://visjs.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/automating-instructional-design/](https://dmccreary.github.io/automating-instructional-design/)

## Overview

This is an interactive, AI-generated intelligent textbook on **Automating Instructional Design**—a hands-on guide for educators and training professionals who want to transform learning objectives into interactive educational simulations (MicroSims) using AI-assisted tools.

Built using MkDocs with the Material theme, this course incorporates learning graphs with 200 concepts and dependencies, interactive MicroSims built with p5.js and vis-network, and AI-assisted content generation using Claude Code skills. The textbook follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses concept dependency graphs to ensure proper prerequisite sequencing.

Whether you're a K-12 teacher, corporate trainer, instructional designer, or curriculum developer, this course provides comprehensive coverage of how to analyze learning objectives, select visualization paradigms, write effective specifications, and generate working simulations—all without writing code yourself.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 200 |
| Chapters | 12 |
| Markdown Files | 38 |
| Total Words | 62,634 |
| MicroSims | 2 |
| Stories | 1 |
| Images | 18 |
| References | 9 |

**Completion Status:** Active development

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/automating-instructional-design.git
cd automating-instructional-design
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs mkdocs-material[imaging]
```

For social card generation on macOS, install system dependencies:

```bash
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://127.0.0.1:8000/automating-instructional-design/`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

### Using the Course

**Navigation:**
- Use the left sidebar to browse chapters
- Click on the search icon to search all content
- Each chapter covers a key aspect of MicroSim design

**Interactive MicroSims:**
- Found in the "MicroSims" section
- Includes Bloom's Taxonomy pyramid and Learning Graph viewer
- Each simulation runs standalone in your browser

**Learning Graph:**
- Visualize the 200 concepts and their dependencies
- Explore concept taxonomy and quality metrics

## Repository Structure

```
automating-instructional-design/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 12 educational chapters
│   │   ├── 01-foundations-learning-objective-analysis/
│   │   ├── 02-prerequisite-analysis-microsim-fundamentals/
│   │   └── ...
│   ├── sims/                      # Interactive MicroSims
│   │   ├── bloom-taxonomy/        # Bloom's Taxonomy pyramid
│   │   └── graph-viewer/          # Learning graph visualization
│   ├── learning-graph/            # Learning graph data and analysis
│   │   ├── learning-graph.json    # 200 concepts with dependencies
│   │   ├── concept-list.md        # Concept enumeration
│   │   └── quality-metrics.md     # Graph quality analysis
│   ├── stories/                   # Narrative visual content
│   │   └── bloom/                 # Bloom's Taxonomy story
│   ├── prompts/                   # AI generation prompts
│   ├── glossary.md                # Key terms and definitions
│   ├── references.md              # Curated references
│   └── index.md                   # Course home page
├── mkdocs.yml                     # MkDocs configuration
├── CLAUDE.md                      # Project instructions for Claude Code
└── README.md                      # This file
```

## Course Chapters

1. **Foundations of Learning Objective Analysis** - Understanding Bloom's Taxonomy and objective decomposition
2. **Prerequisite Analysis and MicroSim Fundamentals** - Concept dependencies and simulation basics
3. **The MicroSim Pattern Library** - Common patterns for educational simulations
4. **Visualization Libraries and Tools** - p5.js, vis-network, Chart.js, and more
5. **Writing Effective MicroSim Specifications** - Detailed blueprints for AI implementation
6. **Adapting for Audience Levels** - Age-appropriate design from K-12 to corporate training
7. **Cognitive Load and Visual Design** - Creating effective learning experiences
8. **Anticipating Misconceptions** - Designing for conceptual change
9. **Generating MicroSims with AI Tools** - Claude Code skills and iterative refinement
10. **Quality Evaluation Frameworks** - Technical, pedagogical, and UX assessment
11. **User Testing and Iteration** - Gathering feedback and improving designs
12. **Accessibility, Deployment, and Course Completion** - Universal design and LMS integration

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/automating-instructional-design/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [LICENSE](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[p5.js](https://p5js.org/)** - Creative coding library from NYU ITP for MicroSim animations
- **[vis-network](https://visjs.org/)** - Network visualization library for learning graphs
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the educators and developers who contribute to making educational resources accessible and interactive.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
