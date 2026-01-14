# Progressive Disclosure Demonstration

<iframe src="main.html" width="820" height="560" style="border: none; max-width: 100%;"></iframe>

[Run in Fullscreen](main.html){ .md-button .md-button--primary target="_blank" }

[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button .md-button--secondary target="_blank" }

## Description

This MicroSim demonstrates **progressive disclosure** as an instructional design technique by letting you experience it firsthand while learning about supply and demand economics. Progressive disclosure is a design pattern that sequences information and functionality to match the learner's growing understanding, reducing cognitive load and building confidence incrementally.

### The Five Stages

**Stage 1 - The Basics**

- Single supply curve (blue) and demand curve (red)
- Equilibrium point highlighted where curves intersect
- Only price and quantity axes visible
- Focus: Understand the fundamental relationship between supply and demand

**Stage 2 - Interactive Exploration**

- Draggable curve shifters appear on each curve
- Price and quantity readouts show current equilibrium values
- Drag the circles up or down to shift curves
- Focus: Explore how changing supply or demand affects market equilibrium

**Stage 3 - Real-World Factors**

- Dropdown menu for common market shift scenarios
- Animated transitions between different market states
- Examples: technology improvements, population growth, cost changes
- Focus: Connect abstract curves to real-world economic events

**Stage 4 - Advanced Analysis**

- Consumer and producer surplus visualization (shaded areas)
- Elasticity control to see how responsiveness affects markets
- Elastic curves respond more to price changes; inelastic curves respond less
- Focus: Deeper economic analysis concepts

**Stage 5 - Expert Mode**

- Second related market showing cross-price effects
- Full parameter control across both markets
- Observe how changes in one market affect related markets
- Focus: Complex market interdependencies

### Key Progressive Disclosure Principles Demonstrated

- **Staged Complexity**: Each stage adds only 1-2 new concepts
- **Visual Progress Tracking**: Progress dots show current position
- **Skill Building**: Later stages build on earlier understanding
- **User Control**: "Show all features" toggle for advanced users
- **Guided Discovery**: Features unlock as learners progress

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Define progressive disclosure and explain its purpose in instructional design
2. Identify how progressive disclosure reduces cognitive load
3. Experience the psychological benefits of staged learning firsthand
4. Evaluate when progressive disclosure is appropriate for different content types
5. Design a progressive disclosure sequence for educational content

### Activity Sequence (50 minutes)

**Introduction (10 minutes)**

1. Ask students: "Have you ever felt overwhelmed when learning something new? What helped?"
2. Introduce progressive disclosure as a solution to information overload
3. Preview the simulation as a meta-learning experience (learning about learning)

**Stage-by-Stage Exploration (20 minutes)**

1. Have students start at Stage 1 and spend 3-4 minutes per stage
2. At each stage, ask them to note:
   - What new element appeared?
   - Did it feel manageable or overwhelming?
   - How does the new element build on previous knowledge?
3. Encourage students NOT to use "Show all features" initially

**Comparison Activity (10 minutes)**

1. Have students toggle "Show all features" on
2. Discuss: How does seeing everything at once feel compared to the staged approach?
3. Consider: For whom might the "all at once" view be appropriate?
4. Relate to user experience research on cognitive load

**Design Challenge (10 minutes)**

1. In pairs, students choose a topic they might teach
2. Design a 5-stage progressive disclosure sequence for that topic
3. Identify:
   - What's the simplest starting point (Stage 1)?
   - What elements unlock at each subsequent stage?
   - What triggers advancement (automatic or user-controlled)?
4. Share designs with another pair for feedback

### Assessment Ideas

- Have students create a progressive disclosure storyboard for a new topic
- Ask students to evaluate an existing tutorial and suggest progressive disclosure improvements
- Design a rubric for assessing the quality of progressive disclosure in educational software

### Discussion Questions

1. How does progressive disclosure relate to Vygotsky's Zone of Proximal Development?
2. When might progressive disclosure be inappropriate or frustrating?
3. How should the pace of disclosure be determined (time-based, mastery-based, user-controlled)?
4. What's the difference between progressive disclosure and scaffolding?

### Extensions

- Modify the simulation code to add a sixth stage with new features
- Create a version where stage advancement requires completing tasks
- Compare this approach to other patterns like contextual help or wizard interfaces
- Research progressive disclosure in professional software (Adobe, Microsoft)

## Technical Details

This simulation is built with p5.js and demonstrates:

- Stage-based UI unlocking with smooth transitions
- Interactive curve dragging with real-time updates
- Animated state transitions using easing functions
- Economic modeling (supply/demand, elasticity, surplus)
- Responsive design for different screen sizes
- Multi-market visualization for advanced concepts

The progressive disclosure pattern shown here can be applied to any complex interface or learning system where gradual complexity introduction benefits the user.

## Related Concepts

- Cognitive Load Theory
- Scaffolding
- Zone of Proximal Development
- Information Architecture
- User Experience Design
- Microlearning
