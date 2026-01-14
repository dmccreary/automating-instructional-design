# MicroSim Generation Workflow

This interactive swimlane flowchart illustrates the complete workflow from defining a learning objective to deploying a live MicroSim on an intelligent textbook. The diagram emphasizes the collaborative role between instructional designers and Claude Code skills in automating the generation process.

## About This MicroSim

The workflow is organized into three swimlanes representing the key participants:

1. **Instructional Designer** (Blue) - Human tasks including objective definition, concept analysis, library selection, specification writing, and quality testing
2. **Claude Code** (Purple) - AI-assisted tasks including invoking the microsim-generator skill and iterating based on feedback
3. **MicroSim Files** (Green) - Output artifacts including the generated HTML, JavaScript, CSS, and documentation files

**Interactions:**
- **Hover** over any node to see a brief description and highlight connected steps
- **Click** a node to lock the description panel for detailed reading
- Click again or elsewhere to deselect

<iframe src="main.html" width="100%" height="520px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Workflow Steps Explained

| Step | Swimlane | Description |
|------|----------|-------------|
| 1. Define Learning Objective | Designer | Identify what the learner should be able to do after completing the MicroSim |
| 2. Analyze Concept Type | Designer | Determine if the concept is a process, relationship, comparison, spatial, or data-focused |
| 3. Select Library Type | Designer | Choose appropriate library (p5.js, vis-network, Chart.js, etc.) based on concept type |
| 4. Write Specification | Designer | Create detailed spec with visual elements, interactions, and educational scaffolding |
| 5. Invoke MicroSim Generator Skill | Claude Code | The skill analyzes the spec and routes to the appropriate template |
| 6. Generate Files | MicroSim Files | Creates complete package: HTML, JS, CSS, index.md, and metadata.json |
| 7. Test in Browser | Designer | Test locally using mkdocs serve, check functionality and educational effectiveness |
| 8. Iterate with Feedback | Claude Code | If issues found, refine based on specific feedback |
| 9. Deploy to Textbook | MicroSim Files | Commit to repo and deploy via mkdocs gh-deploy |
| 10. MicroSim Live! | All | Available to learners on the published intelligent textbook |

## Key Insights

- **Human expertise guides AI** - Clear specifications and quality criteria improve results
- **Iteration is normal** - Most MicroSims require 1-3 feedback cycles for optimal quality
- **Skills automate patterns** - Claude Code skills encode best practices for consistent output
- **Testing validates learning** - The ultimate measure is whether learners achieve the objective

## Lesson Plan

**Grade Level:** Professional Development / Graduate

**Duration:** 30 minutes

**Learning Objectives:**
- Understand the end-to-end workflow for creating educational MicroSims
- Identify the roles of humans and AI in the generation process
- Recognize decision points and iteration patterns in quality assurance

**Activities:**

1. **Explore the Workflow (5 min)** - Click through each node to read descriptions
2. **Trace a Path (5 min)** - Follow the happy path from start to "MicroSim Live!"
3. **Identify Feedback Loop (5 min)** - Trace what happens when testing finds issues
4. **Discussion (10 min)** - What makes a good specification? What feedback helps AI iterate effectively?
5. **Practice (5 min)** - Draft a brief specification for a simple MicroSim concept

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// MicroSim Generation Workflow - Swimlane Flowchart
// Interactive workflow showing the complete MicroSim generation process

let canvasWidth = 800;
let canvasHeight = 500;
let drawHeight = 450;
let controlHeight = 50;

// Swimlane colors
const DESIGNER_COLOR = '#2196f3';   // Blue
const CLAUDE_COLOR = '#9c27b0';      // Purple
const FILES_COLOR = '#4caf50';       // Green

// Swimlane definitions
const swimlanes = [
  { name: "Instructional Designer", color: DESIGNER_COLOR },
  { name: "Claude Code", color: CLAUDE_COLOR },
  { name: "MicroSim Files", color: FILES_COLOR }
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(248, 250, 252);

  // Draw swimlanes
  const laneHeight = (drawHeight - 60) / 3;
  for (let i = 0; i < swimlanes.length; i++) {
    const y = 40 + i * laneHeight;
    noStroke();
    fill(hexToRgb(swimlanes[i].color, 15));
    rect(0, y, canvasWidth, laneHeight);
  }

  // Draw title
  fill(30, 41, 59);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  text("MicroSim Generation Workflow", canvasWidth / 2, 20);

  // Add your nodes and connections here
}

function hexToRgb(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return color(r, g, b, alpha);
}
```

## References

- [MicroSim Generator Skill Documentation](/automating-instructional-design/chapters/08/)
- [Visualization Paradigm Selection](/automating-instructional-design/sims/viz-paradigm-selection/)
- [Human-AI Collaboration Loop](/automating-instructional-design/sims/human-ai-loop/)
