# Quiz: Visualization Libraries and Tools

Test your understanding of JavaScript visualization libraries and tools for creating educational MicroSims.

---

#### 1. Which JavaScript library is best suited for creating custom animations and physics simulations?

<div class="upper-alpha" markdown>
1. Chart.js
2. p5.js
3. Mermaid
4. vis-timeline
</div>

??? question "Show Answer"
    The correct answer is **B**. p5.js is the go-to library for creative, animated, and interactive visualizations. It excels at custom animations, physics simulations, and experiences requiring precise control over every pixel. The setup() and draw() paradigm allows for continuous animation loops, making it perfect for bouncing balls, projectile motion, pendulums, and other dynamic simulations.

    **Concept Tested:** p5.js Animation

    **See:** [p5.js: The Swiss Army Knife of Animation](#p5js-the-swiss-army-knife-of-animation)

---

#### 2. What critical function must be called at the beginning of setup() in every p5.js MicroSim?

<div class="upper-alpha" markdown>
1. createCanvas()
2. drawBackground()
3. updateCanvasSize()
4. initializeSliders()
</div>

??? question "Show Answer"
    The correct answer is **C**. The function updateCanvasSize() must be called at the beginning of setup() to ensure the simulation adapts to any screen size. This function reads the container width and enables responsive design. Forgetting this call is one of the most common mistakes new MicroSim creators make.

    **Concept Tested:** p5.js Animation

    **See:** [The Anatomy of a p5.js MicroSim](#the-anatomy-of-a-p5js-microsim)

---

#### 3. When should you choose Plotly over Chart.js for data visualization?

<div class="upper-alpha" markdown>
1. When you need simple bar charts
2. When you need to plot mathematical functions with precise coordinates
3. When you need pie charts
4. When you only have categorical data
</div>

??? question "Show Answer"
    The correct answer is **B**. Plotly excels when you need to plot mathematical functions (like y = sin(x)), create scientific visualizations, or provide advanced interactivity with hover tooltips showing precise coordinates. Chart.js is better for standard business charts with discrete categorical data. Use Plotly for continuous mathematical functions; use Chart.js for standard data charts.

    **Concept Tested:** Plotly Library

    **See:** [Plotly: When You Need Mathematical Muscle](#plotly-when-you-need-mathematical-muscle)

---

#### 4. What is the critical setting that MUST be disabled when embedding vis-network in a textbook via iframe?

<div class="upper-alpha" markdown>
1. Node colors
2. Edge labels
3. zoomView (mouse zoom)
4. Node physics
</div>

??? question "Show Answer"
    The correct answer is **C**. When embedding vis-network in an iframe, you MUST disable zoomView and dragView in the interaction options. Otherwise, users scrolling through the textbook will accidentally zoom the diagram instead of scrolling the page. This is one of the most common usability mistakes in educational visualizations.

    **Concept Tested:** vis-network Library

    **See:** [The vis-network Architecture Pattern](#the-vis-network-architecture-pattern)

---

#### 5. What is the primary advantage of Mermaid for creating diagrams?

<div class="upper-alpha" markdown>
1. It produces the most visually stunning graphics
2. It allows creating diagrams from simple text descriptions without drag-and-drop
3. It only works with geographical data
4. It requires no browser to view
</div>

??? question "Show Answer"
    The correct answer is **B**. Mermaid's primary advantage is that it creates diagrams from simple text descriptions. You describe the structure (like flowchart steps and connections), and Mermaid renders it as a professional diagram. This makes diagrams easy to version control, modify, and maintain—no pixel-pushing or drag-and-drop required.

    **Concept Tested:** Mermaid Library

    **See:** [Mermaid: Diagrams from Text](#mermaid-diagrams-from-text)

---

#### 6. Which library is specifically designed for visualizing geographic locations with interactive maps?

<div class="upper-alpha" markdown>
1. Chart.js
2. vis-network
3. Leaflet
4. p5.js
</div>

??? question "Show Answer"
    The correct answer is **C**. Leaflet is the leading open-source JavaScript library for interactive maps. It provides multiple tile layers (street maps, satellite imagery, terrain), markers with popups, GeoJSON support for complex regions, layer controls, and responsive design for mobile devices. It's essential for teaching concepts with geographic components.

    **Concept Tested:** Leaflet Library

    **See:** [Map Visualization: Geography Matters](#map-visualization-geography-matters)

---

#### 7. What does the MicroSim Generator skill actually do?

<div class="upper-alpha" markdown>
1. It only generates p5.js code
2. It routes requests to specialized sub-skills based on the type of visualization needed
3. It creates physical simulations only
4. It converts images to code
</div>

??? question "Show Answer"
    The correct answer is **B**. The MicroSim Generator skill is actually a router that analyzes requests for trigger words and data characteristics, then directs them to specialized sub-skills. It matches requests like "bouncing ball simulation" to microsim-p5, "bar chart comparing sales" to chartjs-generator, "plot sine function" to math-function-plotter-plotly, and so on.

    **Concept Tested:** MicroSim Generator

    **See:** [The MicroSim Generator Ecosystem](#the-microsim-generator-ecosystem)

---

#### 8. What is the standard file structure for a MicroSim?

<div class="upper-alpha" markdown>
1. A single HTML file with everything embedded
2. Separate files: index.md, main.html, script.js, style.css, and optionally data.json and metadata.json
3. Only JavaScript files with inline HTML
4. PDF documents with embedded scripts
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard MicroSim structure includes: index.md (documentation with iframe embed), main.html (HTML container with library CDN links), script.js (all visualization logic), style.css (responsive styling), and optionally data.json (data separated from code) and metadata.json (Dublin Core metadata). This separation provides data independence, style customization, and version control friendliness.

    **Concept Tested:** Template Library

    **See:** [The Standard MicroSim Structure](#the-standard-microsim-structure)

---

#### 9. When deciding which visualization library to use, what is the first question you should ask?

<div class="upper-alpha" markdown>
1. What is the budget for development?
2. Is animation or physics essential?
3. How many users will view the MicroSim?
4. What color scheme should be used?
</div>

??? question "Show Answer"
    The correct answer is **B**. The decision framework starts by asking "Is animation or physics essential?" If yes, choose p5.js. Then proceed through: Is it primarily data/statistics? (Chart.js or Plotly) → Are there relationships/connections? (vis-network) → Is time the organizing principle? (vis-timeline) → Is geography involved? (Leaflet) → Otherwise, Mermaid for process/workflow.

    **Concept Tested:** Code Generation

    **See:** [The Decision Framework](#the-decision-framework)

---

#### 10. What type of learning objective is Chart.js best suited for?

<div class="upper-alpha" markdown>
1. Simulating projectile motion
2. Comparing categorical data with standard charts like bar, line, and pie
3. Showing concept dependencies in a network
4. Animating sorting algorithms
</div>

??? question "Show Answer"
    The correct answer is **B**. Chart.js excels at visualizing discrete categorical data through standard chart types: bar charts for comparing categories, line charts for trends over time, pie/doughnut charts for parts of a whole, radar charts for multi-variable comparison, and scatter plots for correlations. It produces professional-looking charts quickly without the overhead needed for custom animations.

    **Concept Tested:** Chart.js Library

    **See:** [Chart.js: Simple, Beautiful, and Fast](#chartjs-simple-beautiful-and-fast)

