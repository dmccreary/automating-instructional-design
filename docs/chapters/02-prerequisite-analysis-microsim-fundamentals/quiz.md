# Quiz: Prerequisite Analysis and MicroSim Fundamentals

Test your understanding of MicroSims, interactive simulations, prerequisite analysis, and concept dependencies with these questions.

---

#### 1. Who coined the term "MicroSim" and when?

<div class="upper-alpha" markdown>
1. Benjamin Bloom in 1956
2. Valarie Lockhart in 2023
3. Dan McCreary in 2025
4. Lorin Anderson in 2001
</div>

??? question "Show Answer"
    The correct answer is **B**. Valarie Lockhart coined the term "MicroSim" in 2023 to describe small, focused interactive simulations designed to teach single concepts. The name captures the essence: *micro* for small, single-concept learning experiences, and *sim* for simulation—interactive digital environments for experimentation.

    **Concept Tested:** MicroSim

    **See:** [The Birth of MicroSims: A Brief History](#the-birth-of-microsims-a-brief-history)

---

#### 2. What is the primary characteristic that distinguishes MicroSims from traditional educational simulations?

<div class="upper-alpha" markdown>
1. MicroSims are more visually appealing and have better graphics
2. MicroSims require a development team while traditional simulations can be built by individuals
3. MicroSims cover a single concept while traditional simulations cover many concepts
4. MicroSims are only for elementary education while traditional simulations are for higher education
</div>

??? question "Show Answer"
    The correct answer is **C**. The key distinguishing feature is scope: MicroSims cover one concept and do that one thing well, while traditional simulations typically cover many concepts. This modularity allows MicroSims to be created in hours (vs. months), composed into learning pathways, and easily updated independently.

    **Concept Tested:** MicroSim

    **See:** [MicroSims: Simulations That Scale](#microsims-simulations-that-scale)

---

#### 3. What makes an interactive simulation effective for learning?

<div class="upper-alpha" markdown>
1. High-quality graphics and animations
2. The feedback loop where learners take actions, observe consequences, adjust mental models, and try again
3. Integration with social media platforms for sharing progress
4. The ability to work without internet connection
</div>

??? question "Show Answer"
    The correct answer is **B**. What makes interactive simulations effective isn't just interactivity—it's the feedback loop. Learners take an action, observe a consequence, adjust their mental model, and try again. This cycle mirrors how humans naturally learn through experience and is the core pedagogical value of simulations.

    **Concept Tested:** Interactive Simulation

    **See:** [What Is an Interactive Simulation?](#what-is-an-interactive-simulation)

---

#### 4. What is the difference between prerequisite knowledge and assumed knowledge?

<div class="upper-alpha" markdown>
1. Prerequisite knowledge is optional; assumed knowledge is required
2. Prerequisite knowledge is for advanced courses; assumed knowledge is for introductory courses
3. Prerequisite knowledge may need review or scaffolding; assumed knowledge is the documented baseline that won't be taught
4. There is no difference; the terms are interchangeable
</div>

??? question "Show Answer"
    The correct answer is **C**. Prerequisite knowledge is what learners must know before engaging with new content—it may need to be reviewed or scaffolded for learners who are rusty. Assumed knowledge is a specific type of prerequisite that is explicitly documented as the baseline expectation and will not be taught or reviewed in the current content.

    **Concept Tested:** Prerequisite Knowledge, Assumed Knowledge

    **See:** [Assumed Knowledge: Setting the Baseline](#assumed-knowledge-setting-the-baseline)

---

#### 5. In the human-AI collaboration loop, which steps are performed by humans rather than AI?

<div class="upper-alpha" markdown>
1. Only the initial specification step
2. Specification, evaluation, refinement, and testing with learners
3. Only the final testing with learners
4. None—AI performs all steps in modern workflows
</div>

??? question "Show Answer"
    The correct answer is **B**. Humans bookend the AI-assisted design process. Humans specify the learning objective and constraints, evaluate against pedagogical criteria, refine specifications based on what's missing, and test with actual learners. AI accelerates the generation steps but doesn't replace human judgment at critical decision points.

    **Concept Tested:** AI-Assisted Design

    **See:** [The Human-AI Collaboration Loop](#the-human-ai-collaboration-loop)

---

#### 6. What are concept dependencies?

<div class="upper-alpha" markdown>
1. The relationships between concepts showing which must be understood before others can be learned
2. The list of software libraries required to run a MicroSim
3. The connections between chapters in a textbook
4. The budget required for developing educational materials
</div>

??? question "Show Answer"
    The correct answer is **A**. Concept dependencies describe the relationships between concepts—specifically, which concepts must be understood before others can be learned. These dependencies form a graph structure (a DAG—directed acyclic graph) where concepts are nodes and dependencies are directed edges, determining sequencing, diagnosis, and scaffolding.

    **Concept Tested:** Concept Dependencies

    **See:** [Concept Dependencies: Mapping the Learning Landscape](#concept-dependencies-mapping-the-learning-landscape)

---

#### 7. A learning pathway through a concept dependency graph should be described as:

<div class="upper-alpha" markdown>
1. A fixed, predetermined sequence that all learners must follow identically
2. A route through the dependency graph from starting knowledge to a target goal, which may vary based on prior knowledge
3. The shortest possible path that skips all prerequisite concepts
4. A path that only includes concepts at the Create level of Bloom's Taxonomy
</div>

??? question "Show Answer"
    The correct answer is **B**. A learning pathway is a sequence of concepts or learning experiences designed to take learners from their starting knowledge to a target goal. Given a dependency map, multiple valid pathways might exist. With AI-assisted education, pathways can be personalized based on prior knowledge, interests, performance, and learning style.

    **Concept Tested:** Learning Pathway

    **See:** [Learning Pathways: Routes Through the Content](#learning-pathways-routes-through-the-content)

---

#### 8. When assessing simulation readiness, which of the following is NOT one of the four key evaluation criteria?

<div class="upper-alpha" markdown>
1. Interactivity Value
2. Visual Representation
3. Development Cost
4. Scope Appropriateness
</div>

??? question "Show Answer"
    The correct answer is **C**. Development cost is not one of the four simulation readiness criteria. The four key criteria are: (1) Interactivity Value—can learners manipulate meaningful parameters? (2) Visual Representation—can the concept be effectively shown visually? (3) Feedback Opportunity—can the simulation provide immediate feedback? (4) Scope Appropriateness—can the concept fit in a single focused MicroSim?

    **Concept Tested:** Simulation Readiness

    **See:** [The Simulation Readiness Checklist](#the-simulation-readiness-checklist)

---

#### 9. Given a learning objective about understanding binary search, which prerequisite knowledge would be most essential?

<div class="upper-alpha" markdown>
1. Knowledge of web development and JavaScript
2. Understanding of what a sorted array is and how to compare values
3. Familiarity with multiple programming languages
4. Experience with database query optimization
</div>

??? question "Show Answer"
    The correct answer is **B**. Binary search requires learners to understand what an array is, what "sorted" means, and how to compare values. Without these foundational concepts, the algorithm's logic of repeatedly dividing a sorted collection in half and comparing to find a target value cannot be understood. Web development and programming languages are not required for understanding the concept.

    **Concept Tested:** Prerequisite Knowledge

    **See:** [Putting It All Together: From Objective to MicroSim](#putting-it-all-together-from-objective-to-microsim)

---

#### 10. Which type of learning objective is LEAST suited for MicroSim treatment?

<div class="upper-alpha" markdown>
1. Understanding how supply and demand curves interact
2. Memorizing the capitals of all 50 U.S. states
3. Analyzing how different sorting algorithms compare in performance
4. Applying Newton's laws to predict projectile motion
</div>

??? question "Show Answer"
    The correct answer is **B**. Pure memorization of facts (like state capitals) is less simulation-ready because there's limited interactivity value, no dynamic cause-and-effect relationships to explore, and flashcards or matching games might be more effective. The other options involve dynamic systems, cause-and-effect relationships, or comparisons that benefit from interactive visualization and exploration.

    **Concept Tested:** Simulation Readiness

    **See:** [Simulation Readiness: Is This Concept Ready for MicroSim Treatment?](#simulation-readiness-is-this-concept-ready-for-microsim-treatment)

