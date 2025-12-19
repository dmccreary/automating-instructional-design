# Quiz: User Testing and Iteration

Test your understanding of user testing methodologies, xAPI analytics, Learning Record Stores, and the iterative refinement process for MicroSims.

---

#### 1. What is the think-aloud protocol?

<div class="upper-alpha" markdown>
1. A method where testers explain the code structure verbally
2. A user testing method where learners verbalize their thoughts while using a MicroSim
3. A technique for AI systems to explain their reasoning
4. A protocol for recording audio narration in MicroSims
</div>

??? question "Show Answer"
    The correct answer is **B**. The think-aloud protocol is a user testing method where learners verbalize their thoughts while using your MicroSim. The basic premise: ask learners to say out loud everything they're thinking as they work through the simulation. This reveals insights that no amount of analytics can capture, including confusion, understanding, frustration, and "aha" moments.

    **Concept Tested:** Think-Aloud Protocol

    **See:** [Think-Aloud Protocol: Getting Inside Learners' Heads](#think-aloud-protocol-getting-inside-learners-heads)

---

#### 2. What is the fundamental difference between page-view tracking and simulation tracking?

<div class="upper-alpha" markdown>
1. Page-view tracking is more accurate than simulation tracking
2. Page-view tracking knows you were in the room; simulation tracking knows what you did while there
3. Simulation tracking only works with p5.js MicroSims
4. Page-view tracking requires user consent while simulation tracking does not
</div>

??? question "Show Answer"
    The correct answer is **B**. Page-view tracking (like Google Analytics) tells you a student visited the page and how long they stayed, but cannot tell you if they actually interacted with the simulation, which sliders they adjusted, or whether they tested the intended hypothesis. Simulation tracking knows what the user did while there—which controls were used, what values were tested, and the sequence of interactions.

    **Concept Tested:** Simulation Tracking, Google Analytics

    **See:** [The Page Views vs. Simulation Tracking Problem](#the-page-views-vs-simulation-tracking-problem)

---

#### 3. What is the core structure of an xAPI statement?

<div class="upper-alpha" markdown>
1. Input → Process → Output
2. Actor (Who) → Verb (What) → Object (When + Context)
3. Subject → Predicate → Complement
4. Event → Handler → Response
</div>

??? question "Show Answer"
    The correct answer is **B**. At its core, xAPI is beautifully simple. Every learning experience is recorded as a statement with three parts: Actor (Who) → Verb (What) → Object (When + Context). Examples include "Dan completed the Gravity Simulator at 2:34 PM" or "Sarah adjusted the mass slider to 50kg." These statements are machine-readable, standardized, and can be aggregated to reveal learning patterns.

    **Concept Tested:** xAPI, Tracking Who-What-When

    **See:** [xAPI: The Experience API for Fine-Grained Tracking](#xapi-the-experience-api-for-fine-grained-tracking)

---

#### 4. What is a Learning Record Store (LRS)?

<div class="upper-alpha" markdown>
1. A physical storage facility for educational materials
2. A database specifically designed to receive, store, and retrieve xAPI statements
3. A file system for organizing MicroSim source code
4. A retail store that sells educational technology
</div>

??? question "Show Answer"
    The correct answer is **B**. A Learning Record Store (LRS) is a database specifically designed to receive, store, and retrieve xAPI statements. Think of it as the filing cabinet for all learning experiences across your educational ecosystem. LRS implementations range from browser-based (local storage), server-based (self-hosted), cloud-based (SaaS), to LMS-integrated (built into Moodle, Canvas, etc.).

    **Concept Tested:** Learning Record Store, xAPI events to a LRS

    **See:** [The Learning Record Store: Where xAPI Events Live](#the-learning-record-store-where-xapi-events-live)

---

#### 5. What is the golden rule of MicroSim tracking stated in the chapter?

<div class="upper-alpha" markdown>
1. Track as much data as possible about every user
2. Every MicroSim must have at least one interactive event to enable tracking
3. Tracking should only be enabled for research purposes
4. User consent is optional for educational tracking
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter states: "Every MicroSim Must Have At Least One Interactive Event." Without interactivity, you cannot track whether a student actually used a MicroSim. A MicroSim that students can passively view without any interaction is, from an analytics perspective, invisible. You'll know they loaded the page, but you won't know if they learned anything.

    **Concept Tested:** Interaction Tracking, Simulation Tracking

    **See:** [The Golden Rule of MicroSim Tracking](#the-golden-rule-of-microsim-tracking)

---

#### 6. What are the phases of the design-test-refine cycle?

<div class="upper-alpha" markdown>
1. Plan, Build, Ship, Support
2. Design, Test, Analyze, Prioritize, Refine, then return to Test
3. Requirements, Development, Testing, Deployment
4. Create, Review, Approve, Publish
</div>

??? question "Show Answer"
    The correct answer is **B**. The design-test-refine cycle has these phases: Design (create or modify the MicroSim), Test (gather data through user testing and analytics), Analyze (interpret results, identify issues), Prioritize (decide which changes to make first), Refine (implement changes), then return to Test to verify improvements. This loop repeats until the MicroSim meets quality standards.

    **Concept Tested:** Design-Test-Refine Cycle, Iterative Refinement

    **See:** [The Design-Test-Refine Cycle](#the-design-test-refine-cycle)

---

#### 7. How should changes be prioritized after user testing?

<div class="upper-alpha" markdown>
1. Alphabetically by feature name
2. By severity: Critical (blocks learning), High (degrades experience), Medium (workaroundable), Low (nice-to-have)
3. By how easy they are to implement
4. By who requested them (stakeholders first)
</div>

??? question "Show Answer"
    The correct answer is **B**. Changes should be triaged by severity: Critical (blocks learning, crashes, produces wrong results—fix immediately), High (significantly degrades experience—next iteration), Medium (noticeable but workaroundable—when time permits), and Low/Nice-to-Have (polishing, preferences—if extra time). Critical changes include factual errors, accessibility blockers, platform failures, data corruption, and security vulnerabilities.

    **Concept Tested:** Change Prioritization, Critical Changes, Nice-to-Have Changes

    **See:** [Change Prioritization: Critical vs. Nice-to-Have](#change-prioritization-critical-vs-nice-to-have)

---

#### 8. What is scope creep and how should it be prevented?

<div class="upper-alpha" markdown>
1. Software bugs that spread to other files; prevent with automated testing
2. Gradual expansion of project goals beyond original boundaries; prevent with documented scope and parking lot lists
3. When MicroSims take too long to load; prevent with file compression
4. When users access features they shouldn't; prevent with authentication
</div>

??? question "Show Answer"
    The correct answer is **B**. Scope creep is the gradual expansion of a project's goals beyond its original boundaries, often through requests like "While we're at it, could we also add..." Each addition seems small but they accumulate into bloated, unfocused projects. Prevention strategies include documenting original scope, using a parking lot for new ideas, having a change control process, time boxing with deadlines, and feature freeze dates.

    **Concept Tested:** Scope Creep Prevention

    **See:** [Scope Creep Prevention: Staying Focused](#scope-creep-prevention-staying-focused)

---

#### 9. What distinguishes situations requiring fundamental redesign from those suitable for incremental improvement?

<div class="upper-alpha" markdown>
1. Fundamental redesign is needed when budget is unlimited; incremental when budget is tight
2. Fundamental redesign is needed when users consistently misunderstand the core concept; incremental when issues are isolated and core functionality works
3. Fundamental redesign is needed for small projects; incremental for large projects
4. There is no difference—always choose incremental improvement
</div>

??? question "Show Answer"
    The correct answer is **B**. Signs you need fundamental redesign include: users consistently misunderstand the core concept, multiple unrelated issues trace to the same design decision, the simulation metaphor doesn't match the learning objective, and technical debt makes every fix create new problems. Signs incremental improvement will work include: issues are isolated and independent, core functionality works, users "get it" but stumble on specific interactions, and each iteration shows measurable improvement.

    **Concept Tested:** Fundamental Redesign, Incremental Improvement

    **See:** [Fundamental Redesign vs. Incremental Improvement](#fundamental-redesign-vs-incremental-improvement)

---

#### 10. Why is documenting design rationale important, and what should it include?

<div class="upper-alpha" markdown>
1. It's only needed for legal compliance; include copyright information
2. It explains why design decisions were made so future collaborators understand the reasoning; include the decision, alternatives considered, and justification
3. It's optional documentation for marketing purposes; include user testimonials
4. It's only needed for commercial products; include pricing information
</div>

??? question "Show Answer"
    The correct answer is **B**. Design rationale documentation explains why decisions were made, not just what changed. This helps future collaborators (including your future self) understand the reasoning. Examples include explaining "Why two balls instead of one?" (to make side-by-side comparison undeniable for misconception confrontation) or "Why no air resistance by default?" (students became confused before understanding basic gravitational acceleration). Include the decision, alternatives considered, and justification.

    **Concept Tested:** Design Rationale, Change Log

    **See:** [Change Logs and Design Rationale: Documenting Your Decisions](#change-logs-and-design-rationale-documenting-your-decisions)

