# AI Generation Workflow

This interactive flowchart illustrates the complete end-to-end workflow for creating MicroSims, from defining a learning objective to deploying a working interactive simulation. The diagram highlights the collaborative interplay between human expertise and AI assistance throughout the process.

## About This MicroSim

The workflow is organized into three types of tasks, color-coded for easy identification:

1. **Human Tasks** (Blue) - Tasks requiring instructional design expertise: defining objectives, analyzing prerequisites, selecting visualization types, writing specifications, testing, and adding metadata
2. **AI Tasks** (Green) - Tasks where AI assists: generating code from specifications, iterating based on feedback, and deploying to production
3. **Quality Gates** (Yellow) - Decision points for quality assurance: verifying code works and checking if the MicroSim meets educational standards

**Interactions:**
- **Hover** over any step to see a detailed description, time estimate, and tips
- **Click** a step to lock the information panel for detailed reading
- Click elsewhere to deselect

<iframe src="main.html" width="100%" height="640px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Workflow Steps Explained

| Step | Type | Description | Estimated Time |
|------|------|-------------|----------------|
| 1. Learning Objective Defined | Human | Define what students should understand or be able to do | 5-10 min |
| 2. Analyze Prerequisites | Human | Identify required prior knowledge for appropriate scaffolding | 10-15 min |
| 3. Select Visualization Type | Human | Choose the paradigm (simulation, diagram, chart, network, etc.) | 5-10 min |
| 4. Choose JavaScript Library | Human | Select appropriate library (p5.js, vis-network, Chart.js, etc.) | 5 min |
| 5. Write Specification | Human | Create detailed spec with visuals, interactions, and scaffolding | 15-30 min |
| 6. AI Generates Code | AI | Claude interprets specification and generates complete code | 1-3 min |
| 7. Code Works? | Quality | Test if code runs without errors and behaves correctly | 5-10 min |
| 8. Iterate with AI | AI | Provide specific feedback to refine the code | 2-5 min |
| 9. Test & Validate | Human | Thoroughly test all interactions and educational effectiveness | 10-15 min |
| 10. Meets Standards? | Quality | Evaluate against quality checklist and learning objectives | 5-10 min |
| 11. Refine Specification | Human | Update spec to address quality issues | 10-20 min |
| 12. Add Metadata | Human | Add learning objectives, Bloom's level, tags, accessibility info | 5-10 min |
| 13. Deploy | AI | Commit to repository and deploy via mkdocs gh-deploy | 2-5 min |
| 14. MicroSim Live | Complete | Available to learners on the published site | Ongoing |

## Understanding the Iteration Loops

The workflow includes two important feedback loops:

### Code Iteration Loop (Steps 6-8)
When testing reveals that the generated code doesn't work correctly:
1. Identify the specific issue (error message, visual bug, interaction problem)
2. Provide clear feedback to the AI
3. AI regenerates code with fixes
4. Re-test until the code works

**Typical iterations:** 1-3 cycles for most MicroSims

### Quality Refinement Loop (Steps 5-11)
When the MicroSim works but doesn't meet educational standards:
1. Identify what's lacking (accessibility, clarity, cognitive load)
2. Update the specification with improvements
3. Regenerate with the refined spec
4. Re-evaluate against standards

**Typical iterations:** 0-2 cycles depending on specification quality

## Key Insights

- **Clear specifications reduce iterations** - Well-written specs lead to better first-pass code
- **Human expertise guides AI output** - Domain knowledge and educational goals shape effective MicroSims
- **Quality gates ensure effectiveness** - Testing against learning objectives, not just functionality
- **Iteration is expected** - Plan for refinement cycles in your timeline

## Total Time Estimates

| Complexity | First-Pass Time | With Iterations |
|------------|----------------|-----------------|
| Simple (single concept) | 45-60 min | 1-2 hours |
| Medium (multiple interactions) | 1-2 hours | 2-3 hours |
| Complex (advanced simulation) | 2-3 hours | 3-5 hours |

## Lesson Plan

**Grade Level:** Professional Development / Graduate

**Duration:** 45 minutes

**Learning Objectives:**
- Trace the complete workflow from learning objective to deployed MicroSim
- Identify human tasks, AI tasks, and quality gates in the process
- Recognize feedback loops and understand when they occur
- Estimate time requirements for MicroSim development

**Activities:**

1. **Explore the Workflow (10 min)** - Click through each step to read descriptions and tips
2. **Follow the Happy Path (5 min)** - Trace the ideal flow from start to "MicroSim Live"
3. **Trace Iteration Loops (10 min)** - Follow what happens when code fails or standards aren't met
4. **Time Estimation (10 min)** - Calculate total time for a simple MicroSim with 2 iterations
5. **Discussion (10 min)** - What makes a specification effective? When do you know a MicroSim is ready?

## References

- [MicroSim Generation Workflow](/automating-instructional-design/sims/microsim-generation-workflow/) - Swimlane version of this workflow
- [Specification Quality Checklist](/automating-instructional-design/sims/spec-quality-checklist/)
- [Visualization Paradigm Selection](/automating-instructional-design/sims/viz-paradigm-selection/)
- [Human-AI Collaboration Loop](/automating-instructional-design/sims/human-ai-loop/)
