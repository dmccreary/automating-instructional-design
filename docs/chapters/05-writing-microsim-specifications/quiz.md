# Quiz: Writing Effective MicroSim Specifications

Test your understanding of Specification-Driven Design and how to write clear, complete specifications that AI tools can implement faithfully.

---

#### 1. What is Specification-Driven Design (SDD)?

<div class="upper-alpha" markdown>
1. A programming methodology focused on writing efficient code
2. The skill of describing precisely what you want—the WHAT, not the HOW—so that AI can implement your vision
3. A design pattern for database schemas
4. A method for testing software after development
</div>

??? question "Show Answer"
    The correct answer is **B**. Specification-Driven Design is the skill of describing precisely what you want—the WHAT, not the HOW. You don't need to write code; you need to describe behavior and appearance so clearly that any builder (or AI) could construct your vision without asking clarifying questions. Think of yourself as the architect, not the construction crew.

    **Concept Tested:** Specification Document

    **See:** [Chapter Content](index.md)

---

#### 2. Which of the following is an example of a vague visual description that should be avoided?

<div class="upper-alpha" markdown>
1. "Five circles of varying sizes (diameters: 20, 30, 40, 50, and 60 pixels) with colors #e74c3c, #e67e22, #f1c40f, #fd79a8, and #ff7675"
2. "A 600-pixel wide by 400-pixel tall physics playground with a light gray background (#f0f0f0)"
3. "Show some balls bouncing around with gravity"
4. "The balls fall under simulated gravity (acceleration of 0.5 pixels per frame squared) and bounce off the bottom edge with 80% energy retention"
</div>

??? question "Show Answer"
    The correct answer is **C**. "Show some balls bouncing around with gravity" is vague because it doesn't specify how many balls, what sizes, what colors, how strong the gravity is, or how bouncing works. The other options provide specific, measurable values that an AI or developer could implement without asking questions.

    **Concept Tested:** Visual Description

    **See:** [Chapter Content](index.md)

---

#### 3. Every interaction specification should include which three parts?

<div class="upper-alpha" markdown>
1. Color, size, and position
2. Trigger (user action), Response (system behavior), and Feedback (user perception)
3. Input, output, and storage
4. Start, middle, and end
</div>

??? question "Show Answer"
    The correct answer is **B**. Every interaction has three parts: Trigger (what action the user takes), Response (what the system does in reaction), and Feedback (how the user knows something happened). A complete interaction specification describes all three parts precisely, like "The Start Button (trigger) changes from green to red (response) when the user clicks it, and the simulation begins playing (feedback)."

    **Concept Tested:** Interaction Behavior

    **See:** [Chapter Content](index.md)

---

#### 4. What are behavior constraints in a MicroSim specification?

<div class="upper-alpha" markdown>
1. The maximum file size of the MicroSim
2. Rules defining what can't happen—the guardrails preventing unexpected behavior
3. The number of users who can view the MicroSim simultaneously
4. The programming languages that can be used
</div>

??? question "Show Answer"
    The correct answer is **B**. Behavior constraints define what can't happen in your MicroSim—they're the guardrails that prevent unexpected behavior and ensure the simulation stays educationally valid. Examples include: values can't be negative, objects can't overlap, sliders can't exceed certain ranges, and mutually exclusive options can't both be selected.

    **Concept Tested:** Behavior Constraints

    **See:** [Chapter Content](index.md)

---

#### 5. What does the SMART framework stand for in the context of success criteria?

<div class="upper-alpha" markdown>
1. Simple, Memorable, Attractive, Responsive, Technical
2. Specific, Measurable, Achievable, Relevant, Testable
3. Speed, Memory, Accuracy, Reliability, Testing
4. Start, Middle, Action, Result, Timeline
</div>

??? question "Show Answer"
    The correct answer is **B**. SMART success criteria are: Specific (exactly what should happen), Measurable (can be objectively verified), Achievable (technically possible), Relevant (connected to the learning objective), and Testable (can be checked through observation). This transforms vague goals like "animation should be smooth" into testable criteria like "animation runs at 60 fps with no visible stuttering."

    **Concept Tested:** Success Criteria

    **See:** [Chapter Content](index.md)

---

#### 6. Which of the following is an example of a properly specified edge case?

<div class="upper-alpha" markdown>
1. "Handle errors gracefully"
2. "The system should work properly with unusual inputs"
3. "When user adjusts denominator to zero: slider stops at 1, tooltip appears saying 'The denominator cannot be zero'"
4. "Edge cases should not crash the simulation"
</div>

??? question "Show Answer"
    The correct answer is **C**. A properly specified edge case includes: the condition (denominator adjusted to zero), the trigger (dragging the slider to minimum), the expected behavior (slider stops at 1, tooltip appears), and ideally a rationale. The other options are vague statements without specific behaviors.

    **Concept Tested:** Edge Case Definition

    **See:** [Chapter Content](index.md)

---

#### 7. What is "specification ambiguity" and why is it problematic?

<div class="upper-alpha" markdown>
1. When specifications are too detailed, causing confusion
2. When specifications can be interpreted in multiple valid ways, leading AI to make choices that may not match your intent
3. When specifications use too many technical terms
4. When specifications are written in multiple languages
</div>

??? question "Show Answer"
    The correct answer is **B**. Specification ambiguity occurs when your specification can be interpreted in multiple valid ways. It's problematic because AI tools will make some choice when faced with ambiguity—just not necessarily your choice. Examples include vague adjectives ("large," "fast"), undefined references ("the button"), and missing defaults.

    **Concept Tested:** Specification Ambiguity

    **See:** [Chapter Content](index.md)

---

#### 8. What should an intent statement in a specification capture?

<div class="upper-alpha" markdown>
1. The programming language and libraries to use
2. What concept students are learning, what misconception it addresses, what discovery they should make
3. The file naming conventions
4. The deployment schedule
</div>

??? question "Show Answer"
    The correct answer is **B**. An intent statement captures the pedagogical purpose: what concept students are learning, what misconception this might address, what discovery students should make, and even what feeling students should have. This ensures that the educational purpose survives the journey from idea to implementation.

    **Concept Tested:** Intent Preservation

    **See:** [Chapter Content](index.md)

---

#### 9. How do AI language models interpret specifications?

<div class="upper-alpha" markdown>
1. They understand specifications exactly like humans do
2. They pattern match against training data, resolve ambiguity by picking the most likely interpretation, and fill gaps with defaults
3. They ask clarifying questions before proceeding
4. They ignore natural language and only process code
</div>

??? question "Show Answer"
    The correct answer is **B**. AI language models pattern match against training data (similar specifications lead to similar outputs), resolve ambiguity by picking statistically most likely interpretations, fill gaps with reasonable defaults (which may not match your expectations), and follow conventions from libraries they've seen most often. This means common patterns work better, and unusual requests need more detail.

    **Concept Tested:** AI Interpretation

    **See:** [Chapter Content](index.md)

---

#### 10. Which of the following specification strategies helps optimize for AI comprehension?

<div class="upper-alpha" markdown>
1. Using flowing prose with creative metaphors
2. Varying terminology to keep the specification interesting
3. Using declarative language, front-loading important information, and structured formats like lists and tables
4. Keeping specifications as brief as possible
</div>

??? question "Show Answer"
    The correct answer is **C**. To optimize for AI comprehension: use declarative language ("The canvas IS 800 pixels wide" not "Make the canvas about 800 pixels"), front-load important information, use consistent terminology, use structured formats (lists and tables are parsed more reliably than prose), and reference known patterns. These strategies reduce ambiguity and improve the accuracy of AI-generated implementations.

    **Concept Tested:** AI Interpretation

    **See:** [Chapter Content](index.md)

