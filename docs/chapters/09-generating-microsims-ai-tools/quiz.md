# Quiz: Generating MicroSims with AI Tools

Test your understanding of AI collaboration techniques, prompt engineering, and the complete generation workflow for creating educational MicroSims.

---

#### 1. What is prompt engineering in the context of MicroSim generation?

<div class="upper-alpha" markdown>
1. Writing code that generates random prompts for users
2. The art and science of crafting inputs that elicit optimal outputs from AI systems
3. Engineering hardware that can display prompts faster
4. Creating database schemas for storing user prompts
</div>

??? question "Show Answer"
    The correct answer is **B**. Prompt engineering is the art and science of crafting inputs that elicit optimal outputs from AI systems. It's not quite programming, not quite writing—it's a new discipline that sits at the intersection of clear communication, technical understanding, and understanding how AI systems interpret and respond to requests.

    **Concept Tested:** Prompt Engineering

    **See:** [Chapter Content](index.md)

---

#### 2. What are the five phases of the MicroSim generation workflow?

<div class="upper-alpha" markdown>
1. Planning, Coding, Testing, Debugging, Deployment
2. Specification, Initial Generation, Evaluation, Refinement, Finalization
3. Design, Development, Review, Release, Maintenance
4. Brainstorming, Prototyping, Implementation, Validation, Launch
</div>

??? question "Show Answer"
    The correct answer is **B**. The five phases of MicroSim generation are: Specification (creating detailed requirements), Initial Generation (AI produces first version), Evaluation (assessing output against specification), Refinement (iterating through improvements), and Finalization (deploying the polished result). The workflow isn't always linear—you might jump back to specification if something is missing.

    **Concept Tested:** Generation Workflow

    **See:** [Chapter Content](index.md)

---

#### 3. According to the chapter, which phase typically takes the most time in MicroSim generation?

<div class="upper-alpha" markdown>
1. Initial Generation (AI works fast)
2. Finalization (polish and deployment)
3. Specification (getting requirements right)
4. Evaluation (testing and assessment)
</div>

??? question "Show Answer"
    The correct answer is **C**. Specification typically takes 30-40% of the total time because getting requirements right is crucial. Time invested in clear specifications pays dividends in faster generation and fewer iterations. Rushing the spec to "let AI figure it out" is a false economy that leads to frustrating refinement cycles.

    **Concept Tested:** Generation Workflow

    **See:** [Chapter Content](index.md)

---

#### 4. What is a refinement prompt?

<div class="upper-alpha" markdown>
1. The first prompt you send to an AI system
2. A follow-up message that guides AI toward improvements after the initial generation
3. A prompt that automatically refines itself
4. A template for writing specifications
</div>

??? question "Show Answer"
    The correct answer is **B**. Refinement prompts are follow-up messages that guide AI toward improvements after the initial generation. Good refinement prompts acknowledge what's working, identify specific issues, explain why something needs change, suggest approaches when you have ideas, and maintain context by referencing the specification.

    **Concept Tested:** Refinement Prompt

    **See:** [Chapter Content](index.md)

---

#### 5. What is the regeneration decision, and when should you regenerate rather than manually fix?

<div class="upper-alpha" markdown>
1. The choice between using different AI models; regenerate when cost is high
2. The judgment call between asking AI to try again versus fixing things yourself; regenerate when the fundamental approach is wrong
3. The decision about which version control system to use; regenerate when files are corrupted
4. The choice between manual and automated testing; regenerate when tests fail
</div>

??? question "Show Answer"
    The correct answer is **B**. The regeneration decision is the judgment call between asking AI to regenerate code versus manually adjusting what you have. You should regenerate when the fundamental approach is wrong, multiple interrelated issues require extensive manual changes, the specification has changed significantly, or the code quality is too poor to salvage. You should manually adjust when issues are isolated, the structure is sound, and changes are small and localized.

    **Concept Tested:** Regeneration Decision

    **See:** [Chapter Content](index.md)

---

#### 6. What problem do Claude Code Skills solve?

<div class="upper-alpha" markdown>
1. They replace the need for human oversight in AI development
2. They solve the context window challenge by providing intelligent context management through summary indexing and on-demand loading
3. They automatically write all code without human input
4. They eliminate the need for version control systems
</div>

??? question "Show Answer"
    The correct answer is **B**. Claude Code Skills solve the context window challenge. Every AI conversation has limited context space, but you might want Claude to know about hundreds of things. Skills solve this through intelligent context management: each skill has a short summary (~100 tokens) in the context, and full skill content is loaded on-demand only when relevant. This is like a library card catalog—Claude doesn't carry every book, just indexes them.

    **Concept Tested:** Claude Code Skills

    **See:** [Chapter Content](index.md)

---

#### 7. What is the purpose of rule hierarchies in MicroSim generation?

<div class="upper-alpha" markdown>
1. To rank MicroSims by popularity
2. To ensure consistency across multiple MicroSims by providing layered guidelines that cascade from organizational standards to project-specific rules
3. To determine which AI model to use
4. To prioritize bug fixes in order of severity
</div>

??? question "Show Answer"
    The correct answer is **B**. Rule hierarchies enable consistency at scale by providing layered sets of guidelines that cascade from broad organizational standards down to specific project requirements. Like CSS specificity rules, more specific rules override more general ones. This ensures that all MicroSims use the same styling, follow the same interaction patterns, and maintain the same quality standards.

    **Concept Tested:** Rule Hierarchy

    **See:** [Chapter Content](index.md)

---

#### 8. What does the chapter recommend regarding personal ownership of AI-generated code?

<div class="upper-alpha" markdown>
1. Always protect and patch code you've worked on, never delete it
2. Learn to hold code loosely—invest in specifications rather than code, as code is a renewable resource
3. Never modify AI-generated code manually
4. Delete all AI-generated code and rewrite from scratch
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter recommends a fundamental shift in thinking: invest in specifications, not code. Developers who thrive with AI tools learn to hold code loosely, seeing it as a renewable resource—cheap to generate, easy to replace. Their investment goes into specifications, rules, and skills—the durable assets that make regeneration powerful. When you discover something important, update the specification so the fix becomes permanent and reproducible.

    **Concept Tested:** Manual Adjustment, Iteration Management

    **See:** [Chapter Content](index.md)

---

#### 9. What is the recommended structure for git commit messages when working with AI-generated MicroSims?

<div class="upper-alpha" markdown>
1. Use random unique identifiers only
2. Use prefixes like "gen:", "ref:", "fix:", and "regen:" to track the development process
3. Only commit final versions, never intermediate work
4. Use the AI-generated timestamp as the commit message
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter recommends using meaningful commit prefixes to track the development process: `gen:` for initial AI generation, `ref:` for refinement via prompt, `fix:` for manual bug fixes, `regen:` for full regeneration, and `style:` for formatting changes. This helps track whether changes came from AI generation, AI refinement, or manual editing.

    **Concept Tested:** Version Control

    **See:** [Chapter Content](index.md)

---

#### 10. What are iteration anti-patterns that should be avoided?

<div class="upper-alpha" markdown>
1. Testing after every change, documenting decisions, using version control
2. Endless refinement without shipping, specification drift, manual takeover where you write more code than AI
3. Setting iteration limits, shipping MVPs, freezing specifications
4. Using Claude Code Skills, following rule hierarchies, writing refinement prompts
</div>

??? question "Show Answer"
    The correct answer is **B**. Iteration anti-patterns include: endless refinement (10+ iterations without shipping), specification drift (requirements changing mid-iteration), manual takeover (writing more code than AI generates), regeneration spiral (each regeneration introduces new issues), and polish paralysis (spending hours on minor visual tweaks). Solutions include setting iteration limits, freezing specs, stepping back to rethink prompts, and using time boxes for polish.

    **Concept Tested:** Iteration Management

    **See:** [Chapter Content](index.md)

