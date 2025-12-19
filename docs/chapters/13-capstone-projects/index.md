# Capstone Projects

Now that you are an expert at automating instructional design you get
to show your instructor and your classmates what you can do.
This chapter only contains high level guidelines on what
types of projects you might take on.  It also makes sense
for larger projects to have teams of two or more people working
on these projects.


## Suggestions for Success

For a capstone that combines **Intelligent Textbooks + MicroSims**, the biggest risk is not technical failure—it’s **diffuse scope and shallow integration**. The guidance below is designed to help teams of 3–5 students focus on *learning impact*, *coherence*, and *evidence of thinking*, not just shiny demos.

### 1. Start With a Learning Spine, Not a an Entire Textbook

Before any writing or coding, require teams to define a **learning spine**:

- Target learner (age, background, constraints)
- One *core transformation*:
  “Before this book, the learner could not ___; after, they can ___.”

Have them express this as a **single sentence** and get it approved.

**Why:**
This prevents the “Copy a Wikipedia article and add random sims” failure mode.

### 2. Define a Concept Dependency Graph Early

Ask teams to explicitly create a **concept dependency graph** (even a rough one):

* 15–30 concepts total (30-60 concepts for a course)
* Clear prerequisites
* No cycles
* One *capstone concept* at the far right

This graph becomes the **table of contents**, not the other way around.

**Rule of thumb:**
If a concept does not *enable* another concept, question whether it belongs in the project.

### 3. Map Each MicroSim to a Cognitive Purpose

Require that **every MicroSim declare its instructional role**, not just its behavior.

For each MicroSim, teams should state:

* Which concept(s) it supports
* Bloom level(s) it targets (e.g., Understand → Analyze)
* What misconception it helps surface or correct

**Example:**

> “This MicroSim targets *Understanding* and *Applying* Ohm’s Law by allowing learners to vary resistance and observe non-linear power effects.”

**Anti-pattern to avoid:**
“Fun but conceptually orphaned” simulations.

### 4. Design MicroSims as Experiments, Not Animations

Encourage teams to treat MicroSims as **interactive experiments**:

* At least one controllable variable
* One observable outcome
* One learner question the sim helps answer

Ask teams to explicitly state:

* What should the learner *predict* before running the sim?
* What should surprise them?

This aligns naturally with PRIMM-style learning without naming it explicitly.


### 5. Require Accessibility as a First-Class Constraint

Before coding begins, teams should answer:

* How can this MicroSim be explored with:

  * Keyboard only?
  * Reduced motion?
  * Screen reader narration?
* What textual feedback mirrors the visual state?

This reframes accessibility as **design intelligence**, not compliance.

### 6. Limit the Scope on Purpose

Give teams explicit limits:

* 5–7 chapters maximum
* 1–2 MicroSims per chapter
* One “hero” MicroSim they polish deeply

**Why:**
Depth beats coverage. A well-integrated MicroSim is more impressive than five shallow ones.

!!! Note
    You will not receive a lower grade for an incomplete textbook.
    We encourage teams to push themselves for depth, not breath.

### 7. Encourage Clear Team Roles (but Shared Ownership)

Suggest—but do not rigidly enforce—roles:

* Learning Architect (concepts, flow, assessments)
* MicroSim Designer (interaction, experimentation)
* Content Curator (writing, examples, clarity)
* Integrator (MkDocs structure, navigation, polish)

Make it clear:

* Everyone must contribute to **at least one MicroSim**
* Everyone must contribute to **concept modeling**

### 8. Require an Explicit “AI Usage Disclosure”

Since this is an *intelligent* textbook, ask teams to document:

* Where AI was used (drafting, concept extraction, sim ideation, feedback)
* Where human judgment overrode AI output
* One mistake the AI made and how it was corrected

This reinforces *critical AI literacy*, not passive use.

### 9. Define Success in Terms of Learner Evidence

Ask teams to include:

* 3–5 learner tasks or challenges
* What success looks like for each
* How the MicroSims support those tasks

Optional but powerful:

* A short “If we had more time” reflection identifying the next MicroSim they would build.

### 10. End With a Narrative, Not a Demo

For final presentations, encourage teams to:

* Walk the audience through a **learner journey**
* Show confusion → exploration → insight
* Use one MicroSim live, not many slides

The goal is to demonstrate:

> “We understand how people learn with interactive systems.”


## A Strong Framing Sentence You Can Give Students

> “Your capstone is not a book with simulations attached—it is a learning system where text, interaction, and feedback work together to change how someone thinks.”

If you’d like, I can turn this into:

* A **one-page capstone brief** for students
* A **grading rubric** aligned to learning impact
* A **starter MkDocs + MicroSim template** that bakes these constraints in
