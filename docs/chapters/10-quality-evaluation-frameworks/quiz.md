# Quiz: Quality Evaluation Frameworks

Test your understanding of MicroSim quality evaluation across technical, pedagogical, and user experience dimensions, including rubrics, metadata standards, and strategies for search and reuse.

---

#### 1. What are the three dimensions of the Three-Lens Evaluation Model?

<div class="upper-alpha" markdown>
1. Speed, Cost, and Quality
2. Technical, Pedagogical, and User Experience (UX)
3. Design, Development, and Deployment
4. Input, Process, and Output
</div>

??? question "Show Answer"
    The correct answer is **B**. The Three-Lens Evaluation Model examines MicroSim quality across three dimensions: Technical (does it work reliably across devices and browsers?), Pedagogical (does it actually teach what it claims to teach?), and User Experience (is it intuitive and engaging without being distracting?). The magic happens at the intersection of all three—a MicroSim must succeed in all dimensions.

    **Concept Tested:** Technical Evaluation, Pedagogical Evaluation, UX Evaluation

    **See:** [The Three-Lens Evaluation Model](#the-three-lens-evaluation-model)

---

#### 2. What is output validation in the context of MicroSim quality?

<div class="upper-alpha" markdown>
1. Checking that the MicroSim file size meets requirements
2. Verifying that a MicroSim produces expected results given specific inputs
3. Validating user credentials before allowing access
4. Confirming that output files are saved to the correct location
</div>

??? question "Show Answer"
    The correct answer is **B**. Output validation is the process of verifying that a MicroSim produces expected results given specific inputs. It includes visual correctness (elements render properly), mathematical accuracy (calculations are correct), behavioral consistency (responds predictably), edge case handling (handles extreme values), and state management (resets properly). This is critical for AI-generated code which can contain subtle logical errors.

    **Concept Tested:** Output Validation

    **See:** [Output Validation: The First Line of Defense](#output-validation-the-first-line-of-defense)

---

#### 3. What must be disabled when embedding vis-network in a textbook via iframe?

<div class="upper-alpha" markdown>
1. Node colors and edge labels
2. Physics simulation and layout algorithms
3. zoomView (mouse zoom) to prevent accidental zooming when scrolling
4. All interactive features
</div>

??? question "Show Answer"
    The correct answer is **C**. When embedding vis-network in an iframe, you MUST disable zoomView and dragView in the interaction options. Otherwise, users scrolling through the textbook will accidentally zoom the diagram instead of scrolling the page. This is one of the most common usability mistakes in educational visualizations.

    **Concept Tested:** Responsiveness Testing, Bug Identification

    **See:** [Responsiveness Testing](#responsiveness-testing)

---

#### 4. What does objective alignment verify in pedagogical evaluation?

<div class="upper-alpha" markdown>
1. That the MicroSim file structure follows naming conventions
2. That every element of a MicroSim serves its stated learning objective without scope creep
3. That learning objectives are written in Bloom's Taxonomy format
4. That multiple objectives can be achieved simultaneously
</div>

??? question "Show Answer"
    The correct answer is **B**. Objective alignment verifies that every element of a MicroSim serves its stated learning objective. Scope creep is a constant temptation—a simulation designed to teach supply and demand might accumulate features for market equilibrium, price elasticity, and international trade until it teaches nothing well. Key questions include: does it directly address the objective? Are there distracting features? Can learners complete it without engaging with the key insight?

    **Concept Tested:** Objective Alignment

    **See:** [Objective Alignment: Staying on Target](#objective-alignment-staying-on-target)

---

#### 5. What is the purpose of the Completeness Quality Score rubric?

<div class="upper-alpha" markdown>
1. To measure how entertaining the MicroSim is
2. To evaluate whether a MicroSim includes all required components for standardization, providing a measurable 100-point score
3. To determine the MicroSim's loading speed
4. To calculate how many users can access it simultaneously
</div>

??? question "Show Answer"
    The correct answer is **B**. The Completeness Quality Score is a 100-point rubric that evaluates whether a MicroSim includes all required components for standardization. Note that it measures completeness, not usability—a MicroSim can achieve a perfect 100 and still be pedagogically questionable. It's a checklist for structural integrity, with scores interpreted as: 90-100 (production ready), 70-89 (good quality), 50-69 (needs work), below 50 (incomplete).

    **Concept Tested:** Quality Score, Evaluation Rubric

    **See:** [The Completeness Quality Score: A Rubric LLMs Can Follow](#the-completeness-quality-score-a-rubric-llms-can-follow)

---

#### 6. What is the golden rule of MicroSim discoverability mentioned in the chapter?

<div class="upper-alpha" markdown>
1. "The best MicroSim is the one you create yourself"
2. "You can't reuse what you can't find"
3. "Quality is more important than quantity"
4. "Simple designs are always better"
</div>

??? question "Show Answer"
    The correct answer is **B**. "You can't reuse what you can't find" is the golden rule of MicroSim discoverability. A brilliant MicroSim buried in an undocumented folder, lacking keywords and categorization, might as well not exist. Metadata is the bridge between creation and reuse—it makes simulations findable, comparable, and adaptable through search tools, AI agents, and educator filters.

    **Concept Tested:** MicroSim Metadata, Search and Reuse

    **See:** [MicroSim Metadata: The Key to Discoverability](#microsim-metadata-the-key-to-discoverability)

---

#### 7. What metadata standard does the MicroSim JSON Schema use as its foundation?

<div class="upper-alpha" markdown>
1. XML Schema Definition (XSD)
2. Dublin Core metadata standards, extended with educational and technical specifications
3. YAML Ain't Markup Language (YAML)
4. Resource Description Framework (RDF)
</div>

??? question "Show Answer"
    The correct answer is **B**. The MicroSim ecosystem uses a comprehensive JSON Schema based on Dublin Core metadata standards, extended with educational and technical specifications. Dublin Core provides the foundation (title, creator, subject, description, date, type, format, rights), while extensions add search metadata, educational metadata (grade level, Bloom's taxonomy, prerequisites), and technical metadata (framework, dimensions, accessibility).

    **Concept Tested:** MicroSim Metadata, Documentation Standard

    **See:** [The MicroSim JSON Schema](#the-microsim-json-schema)

---

#### 8. What is the key difference between automated and human evaluation?

<div class="upper-alpha" markdown>
1. Automated is always better than human evaluation
2. Automated handles objective, rule-based checks while human evaluation handles subjective, context-dependent judgments
3. Human evaluation is faster than automated evaluation
4. Automated evaluation can assess pedagogical effectiveness
</div>

??? question "Show Answer"
    The correct answer is **B**. Automated evaluation excels at objective, rule-based checks (structural validation, responsiveness testing, performance metrics, accessibility checks, link verification, code quality). Human evaluation remains essential for subjective, context-dependent judgments (pedagogical alignment, engagement quality, visual aesthetics, cultural appropriateness, intuitive design, misconception handling). The hybrid approach uses automated pre-checks and reserves human attention for judgments requiring human cognition.

    **Concept Tested:** Automated Evaluation, Human Evaluation

    **See:** [Automated vs. Human Evaluation](#automated-vs-human-evaluation)

---

#### 9. What does cognitive level match verify in pedagogical evaluation?

<div class="upper-alpha" markdown>
1. That the MicroSim matches the user's cognitive abilities
2. That the MicroSim's complexity matches the targeted Bloom's Taxonomy level for the learning objective
3. That all cognitive load is eliminated from the interface
4. That learners of all ages can use the MicroSim equally well
</div>

??? question "Show Answer"
    The correct answer is **B**. Cognitive level match verifies that a MicroSim's design patterns match the targeted Bloom's Taxonomy level. A simulation designed for "Remember" level (vocabulary flashcards) requires different patterns than one targeting "Analyze" level (comparing data sets). A common mismatch occurs when a learning objective targets "Analyze" but the MicroSim only supports "Understand"—explaining concepts beautifully but never challenging learners to discover relationships.

    **Concept Tested:** Cognitive Level Match

    **See:** [Cognitive Level Match](#cognitive-level-match)

---

#### 10. What is engagement balance in UX evaluation?

<div class="upper-alpha" markdown>
1. Balancing the number of users who can access the MicroSim simultaneously
2. Finding the sweet spot between "so boring I'm falling asleep" and "so gamified I forgot I'm learning"
3. Ensuring equal engagement across all age groups
4. Balancing visual elements evenly across the screen
</div>

??? question "Show Answer"
    The correct answer is **B**. Engagement balance seeks the Goldilocks zone where learners are sufficiently motivated to persist without being distracted by bells, whistles, and virtual confetti. Too little engagement means plain text and no feedback; too much means constant motion and points for everything. The key question: does the engagement serve the learning, or does learning serve the engagement?

    **Concept Tested:** Engagement Balance

    **See:** [Engagement Balance: The Goldilocks Zone](#engagement-balance-the-goldilocks-zone)

