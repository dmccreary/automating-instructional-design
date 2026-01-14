# Success Criteria Validation Workflow

This interactive flowchart illustrates the systematic process for validating a MicroSim against its defined success criteria. The workflow ensures thorough testing and provides clear paths for both approval and iterative refinement.

## About This MicroSim

The workflow demonstrates a quality assurance process with four types of steps:

1. **Testing Steps** (Blue) - Actions for verifying MicroSim behavior against specifications
2. **Decision Points** (Yellow) - Evaluation checkpoints that determine the next action
3. **Success Outcomes** (Green) - Positive results and final approval states
4. **Iteration Paths** (Orange) - Feedback loops that return to the AI for refinement

**Interactions:**

- **Hover** over any node to see a brief description of that step
- **Click** a node to lock the description panel for detailed reading
- Click again or elsewhere to deselect

<iframe src="main.html" width="100%" height="620px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Workflow Steps Explained

| Step | Type | Description |
|------|------|-------------|
| 1. MicroSim Generated | Start | AI has produced a working MicroSim from your specification |
| 2. Load Success Criteria Checklist | Process | Open the specification document to the success criteria section |
| 3. Test Functional Criterion #1 | Process | Manually verify each functional requirement one at a time |
| 4. Criterion Met? | Decision | Evaluate if the MicroSim behavior matches the specification exactly |
| 5a. Document Pass | Process | Check off the criterion and note any observations |
| 5b. Document Failure Details | Process | Record exactly how behavior differs from specification |
| 6. More Criteria? | Decision | Check if there are additional criteria remaining to test |
| 7. All Criteria Passed? | Decision | Review the overall results after testing all criteria |
| 8a. MicroSim Approved | End | MicroSim is ready for deployment or the next phase |
| 8b. Create Refinement Request | Process | Document specific issues for AI to address in the next iteration |

## Key Insights

- **Systematic testing prevents oversights** - Testing each criterion individually ensures comprehensive validation
- **Documentation is essential** - Recording both passes and failures creates an audit trail and helps with future refinements
- **Iteration is expected** - The workflow includes explicit paths back to the generation step, acknowledging that refinement is normal
- **Specific feedback improves results** - Documenting exactly how behavior differs from specification helps AI make targeted improvements

## Use Cases

This workflow applies to validating:

- Interactive educational simulations
- Data visualizations
- User interface components
- Algorithm demonstrations
- Any specification-driven generated content

## Lesson Plan

**Grade Level:** Professional Development / Graduate

**Duration:** 20 minutes

**Bloom's Taxonomy Level:** Evaluate

**Learning Objectives:**

- Understand the systematic process for validating MicroSims against success criteria
- Identify decision points in the quality assurance workflow
- Recognize when to approve vs. iterate on generated content

**Activities:**

1. **Explore the Workflow (5 min)** - Click through each node to understand the validation process
2. **Trace the Happy Path (3 min)** - Follow the path from generation through approval
3. **Trace the Iteration Path (3 min)** - Follow what happens when criteria fail
4. **Discussion (5 min)** - What makes good success criteria? How specific should failure documentation be?
5. **Practice (4 min)** - Write 3 success criteria for a simple MicroSim concept

## References

- [MicroSim Specification Quality Checklist](/automating-instructional-design/sims/spec-quality-checklist/)
- [Design-Test-Refine Cycle](/automating-instructional-design/sims/design-test-refine-cycle/)
- [MicroSim Generation Workflow](/automating-instructional-design/sims/microsim-generation-workflow/)
