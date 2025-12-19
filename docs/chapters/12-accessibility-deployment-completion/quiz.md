# Quiz: Accessibility, Deployment, and Course Completion

Test your understanding of accessibility principles, deployment strategies, and portfolio development for MicroSims.

---

#### 1. What is Universal Design?

<div class="upper-alpha" markdown>
1. A design approach that creates one version for the most common user
2. A philosophy that products should be usable by the widest possible range of people without requiring adaptation
3. A design system for creating universally compatible file formats
4. A method for translating designs into multiple languages
</div>

??? question "Show Answer"
    The correct answer is **B**. Universal Design is the philosophy that products should be usable by the widest possible range of people without requiring adaptation or specialized design. It originated in architecture (think: automatic doors that help wheelchair users, parents with strollers, and tired shoppers alike) but applies beautifully to educational technology. Building for everyone from the start is far more effective than retrofitting accessibility later.

    **Concept Tested:** Universal Design

    **See:** [Chapter Content](index.md)

---

#### 2. What are the three principles of Universal Design for Learning (UDL)?

<div class="upper-alpha" markdown>
1. Simplicity, Consistency, and Feedback
2. Multiple Means of Representation, Action/Expression, and Engagement
3. Visual, Auditory, and Kinesthetic learning styles
4. Input, Processing, and Output modalities
</div>

??? question "Show Answer"
    The correct answer is **B**. The three UDL principles are: Multiple Means of Representation (present information in multiple formats), Multiple Means of Action and Expression (let learners interact and demonstrate understanding in various ways), and Multiple Means of Engagement (offer different ways to motivate and sustain interest). UDL recognizes that learners vary in how they perceive information, navigate environments, and get engaged.

    **Concept Tested:** UDL Principles

    **See:** [Chapter Content](index.md)

---

#### 3. What is the p5.js describe() function, and why is it required for quality scores?

<div class="upper-alpha" markdown>
1. A function that describes the code structure for documentation purposes
2. A function that creates a description of canvas content for screen readers, making the MicroSim accessible to blind learners
3. A function that generates metadata about the MicroSim file
4. A function that describes errors in the console for debugging
</div>

??? question "Show Answer"
    The correct answer is **B**. The describe() function creates a description of the canvas content that screen readers can announce. For learners who are blind or have low vision, screen readers are their window into your MicroSim. MicroSims without proper describe() implementation cannot achieve high quality scores—this isn't bureaucratic box-checking; it's the difference between "usable by everyone" and "excludes blind learners entirely."

    **Concept Tested:** Screen Reader Support

    **See:** [Chapter Content](index.md)

---

#### 4. Why does the recommended MicroSim architecture place controls below the drawing area?

<div class="upper-alpha" markdown>
1. For aesthetic reasons—it looks more professional
2. To ensure keyboard users can Tab through focusable controls instead of the canvas being one opaque block
3. To maximize the canvas size for larger animations
4. To reduce memory usage by separating visual and control elements
</div>

??? question "Show Answer"
    The correct answer is **B**. Placing controls below the canvas rather than overlapping it is an accessibility decision. When controls overlap the canvas, keyboard users can't tab to canvas regions, and for screen reader users, the canvas is one opaque block. With controls below the canvas, Tab navigation flows through focusable controls logically, making the MicroSim accessible to users who can't use a mouse due to motor impairments, visual impairments, or other reasons.

    **Concept Tested:** Keyboard Navigation

    **See:** [Chapter Content](index.md)

---

#### 5. What is the key principle for designing for color blindness?

<div class="upper-alpha" markdown>
1. Use only grayscale colors
2. Never rely on color alone to convey information—always add shape, text, or pattern
3. Avoid using red and green in any design
4. Use the brightest colors possible for maximum visibility
</div>

??? question "Show Answer"
    The correct answer is **B**. Never rely on color alone to convey information. Approximately 8% of men have some form of color vision deficiency. Instead of using only color to distinguish elements (like green for correct, red for wrong), combine color with other visual cues: different shapes, checkmarks or X marks, labels, or patterns. Colorblind-safe palettes like blue/orange are distinguishable by almost everyone.

    **Concept Tested:** Color Blindness Design, Color Accessibility

    **See:** [Chapter Content](index.md)

---

#### 6. How should a MicroSim respond to the prefers-reduced-motion system preference?

<div class="upper-alpha" markdown>
1. Ignore it—animations are essential for learning
2. Provide alternatives like step-by-step views or instant state changes instead of continuous animation
3. Display a warning that the MicroSim requires motion
4. Reduce the frame rate but keep animations running
</div>

??? question "Show Answer"
    The correct answer is **B**. Animations can trigger vestibular disorders, causing dizziness, nausea, or migraines. When users set a preference for reduced motion, MicroSims should provide alternatives: step-by-step with button clicks instead of continuous movement, instant state changes instead of smooth transitions, play on demand instead of auto-play, and static layouts instead of parallax scrolling.

    **Concept Tested:** Reduced Motion

    **See:** [Chapter Content](index.md)

---

#### 7. What is the purpose of an accessibility audit?

<div class="upper-alpha" markdown>
1. To verify compliance with copyright laws
2. To systematically test a MicroSim against accessibility criteria including keyboard, screen reader, color, and motion
3. To audit the development costs of accessibility features
4. To check which users have accessed the MicroSim
</div>

??? question "Show Answer"
    The correct answer is **B**. An accessibility audit systematically tests against accessibility criteria: keyboard (all interactive elements reachable via Tab), screen reader (content announced, describe() works), color (information distinguishable in grayscale), motion (respects reduced-motion preference), zoom (layout usable at 200%), text (remains readable when enlarged), and touch (targets at least 44x44 pixels). The best way to understand accessibility needs is to experience constraints yourself.

    **Concept Tested:** Accessibility Audit

    **See:** [Chapter Content](index.md)

---

#### 8. What is LTI (Learning Tools Interoperability) and what does it enable?

<div class="upper-alpha" markdown>
1. A programming language for creating learning tools
2. A standard for deep LMS integration enabling single sign-on, grade passback, and context information
3. A file format for packaging educational content
4. A testing framework for learning management systems
</div>

??? question "Show Answer"
    The correct answer is **B**. LTI (Learning Tools Interoperability) is the standard for deep LMS integration. It enables single sign-on (students don't create new accounts), grade passback (MicroSim can report scores to the gradebook), and context information (which course, which student). This is more powerful than simple iframe embedding, which has limited integration and no grade passback.

    **Concept Tested:** LMS Integration

    **See:** [Chapter Content](index.md)

---

#### 9. What makes a textbook "intelligent" according to the chapter?

<div class="upper-alpha" markdown>
1. It uses artificial intelligence to grade student work
2. It includes embedded interactivity, adaptive sequencing, progress tracking, and non-linear navigation
3. It automatically updates its content from the internet
4. It can read itself aloud to students
</div>

??? question "Show Answer"
    The correct answer is **B**. An intelligent textbook features: embedded interactivity (MicroSims, quizzes, and exercises inline with content), adaptive sequencing (different paths based on learner performance), progress tracking (knowing what each learner has mastered), personalized recommendations (suggesting what to study next), and non-linear navigation (learners choose their own path). MicroSims shine when embedded in these adaptive environments.

    **Concept Tested:** Intelligent Textbook

    **See:** [Chapter Content](index.md)

---

#### 10. What are the eight components required in a portfolio project according to the chapter?

<div class="upper-alpha" markdown>
1. Resume, cover letter, references, work samples, certifications, awards, publications, presentations
2. Learning objective analysis, specification, working MicroSim, evaluation rubric, user testing report, iteration log, accessibility audit, deployment documentation
3. Code files, documentation, tests, README, license, changelog, contributing guide, issue templates
4. Design mockups, wireframes, prototypes, final designs, style guide, component library, documentation, presentation
</div>

??? question "Show Answer"
    The correct answer is **B**. The portfolio project requires: (1) Learning Objective Analysis Document, (2) Detailed MicroSim Specification, (3) Working MicroSim with quality score of 85 or higher, (4) Evaluation Rubric, (5) User Testing Report, (6) Iteration Log, (7) Accessibility Audit, and (8) Deployment Documentation. Together, these demonstrate comprehensive mastery of MicroSim development across all course competencies.

    **Concept Tested:** Portfolio Project

    **See:** [Chapter Content](index.md)

