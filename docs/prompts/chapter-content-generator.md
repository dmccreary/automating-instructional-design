## Chapter 1

Run the chapter-content-generator skill on @docs/chapters/01-foundations-learning-objective-analysis/
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Introduce the chapter with an observation that the METR.org studies show that AI is doubling in capabilities every 7 months
when we measure the probability that a LLM and agents will get a task of a specific length correct.
AI can be the instructional designer's greatest tool, but we MUST include knowledge of how
students learn to be effective at generating intelligent textbooks.
Do not put leading spaces in the <details> text.

## Chapter 2 - MicroSims

Run the chapter-content-generator skill on @docs/chapters/01-prerequisite-analysis-microsim-fundamentals/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.
Mention that the term MicroSim was coined by Valarie Lockhart in 2023.
Note that the MicroSim paper "MicroSims: A Framework for AI-Generated, Scalable Educational Simulations with Universal Embedding and Adaptive Learning Support" was published in November of 2025.
Mention that courses in generating intelligent textbooks were first taught by Dan McCreary in December of 2025.  These
courses were made possible by the growing power of LLMs and specifically the use of Claude Code Skills to assure
rules for consistency and high-quality content generation were used.
Reference the original MicroSim textbook https://dmccreary.github.io/microsims/ that has hundreds of examples of working MicroSims for students from Kindergarten to Graduate School.

## Chapter 3

Run the chapter-content-generator skill on @docs/chapters/03-microsim-pattern-library/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

For each Microsim Visualization Paradigm, you may cite examples of this type from this file: /Users/dan/Documents/ws/search-microsims/docs/search/microsims-data.json.  You may also create a #### Diagram/<details> block that references each MicroSim.

## Chapter 4

Run the chapter-content-generator skill on @docs/chapters/04-visualization-libraries-tools/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

Use the microsim generator skill located here for references of working microsim-generation skills 

/Users/dan/Documents/ws/claude-skills/skills/microsim-generator  

Note that the resources directory has the detailed rules for each MicroSim type:

microsim-generator/references $ ls
bubble-guide.md			p5-guide.md
causal-loop-guide.md		plotly-guide.md
celebration-guide.md		routing-criteria.md
chartjs-guide.md		timeline-guide.md
comparison-table-guide.md	venn-guide.md
map-guide.md			vis-network-guide.md
mermaid-guide.md

Note that these skills are tuned to place the visualizations within a narrow iframe within a textbook, however
MicroSims can also use parameters such as the Quiz Mode "quiz-mode=true" to enable a quiz mode within a microsim 
and an Editor Mode "editor-mode=true" to allow the MicroSim designer to move node elements around on a graph.

Note that MicroSim modularity (separate files for index.md, main.html, style.css, data.json, script.js) makes
these MicroSims easier to maintain and extend.

Also note that extending MircoSims to track user events using the xAPI protocols will be covered in a later chapter.




## Chapter 5

Run the chapter-content-generator skill on @docs/chapters/05-writing-microsim-specifications/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

Begin with a compelling statement that Specification-Driven Design (SDD) is a powerful design process that focuses
on teaching instructional designers to write crystal-clear high-quality specifications for each MicroSim.
The key is to focus on WHAT the microsim should do, but leave it up to the LLMs to decide HOW to implement
the MicroSim.  Create several full examples of MicroSim specification files and describe how they avoided ambiguity of the design and also used specific language to make clear how the MicroSim should behave.

## Chapter 6

Run the chapter-content-generator skill on @docs/chapters/06-adapting-audience-levels/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

Mention that MicroSim can be used in books from Kindergarten to graduate school.  Mention that
the book "Reading for Kindergarten" https://dmccreary.github.io/reading-for-kindergarten/ already has
a detail framework of MicroSims that focus on young readers.  Get some sample here: https://github.com/dmccreary/reading-for-kindergarten/blob/main/docs/sims/index.md. Note the focus on colorful celebration animations so kids have fun!

On the other extreme, we have MicroSims that have been used at the college and graduate school level.  Here are some samples of the Signal Processing course: https://github.com/dmccreary/signal-processing/blob/main/docs/sims/index.md

This shows that the same concepts apply to all levels of instructional design.

## Chapter 7

Run the chapter-content-generator skill on @docs/chapters/07-cognitive-load-visual-design/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

# Chapter 8

Run the chapter-content-generator skill on @docs/chapters/08-anticipating-misconceptions/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

# Chapter 9
Run the chapter-content-generator skill on @docs/chapters/09-generating-microsims-ai-tools/index.md
The writing level is college students or business professionals.
Make the tone fun, and optimistic with a holistic view that knowing how to automate instructional design will make the world a better place.  Feel free to add puns and jokes to lighten the tone.
Do not put leading spaces in the <details> text.

Put a special emphasis on the the use of Claude Code Skill as the strategies that Claude Code Skills use for intelligently putting the right content into the context window.  Describe how Claude limits users to 30 skills and only puts a short 100-token summary of skills into a context window.  Go into depth about creating rules that make your MicroSims consistent across an entire textbook or group of textbooks.  Describe strategies for putting rules in global enterprise rule repositories, business unit repositories, department repositories, project repositories and personal project rules.  Describe how conflicting rules can be resolved similar to the way that the "!important" rule in CSS can be resolved. Discuss the pros and cons of having many hierarchies of rules compared to one or two repositories of rules.

# Chapter 10
