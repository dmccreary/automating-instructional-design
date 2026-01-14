# Elementary Scaffolding Progression

<iframe src="main.html" width="820" height="520" style="border: none; max-width: 100%;"></iframe>

[Run in Fullscreen](main.html){ .md-button .md-button--primary target="_blank" }

[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button .md-button--secondary target="_blank" }

## Description

This MicroSim demonstrates **scaffolded learning** through a simple physics simulation where controls unlock progressively as learners complete experiments. Scaffolding is an instructional strategy where teachers provide temporary support to help students achieve learning goals they couldn't reach independently.

### How It Works

1. **Level 1 - Basic Drop**: Start with a simple ball drop. Click the button to observe gravity in action.
2. **Level 2 - Adjust Height**: After 3 experiments, unlock the height slider to control where the ball starts.
3. **Level 3 - Adjust Mass**: Unlock mass control to see how heavier balls behave differently.
4. **Level 4 - Air Resistance**: Toggle air drag to observe how resistance affects falling objects.
5. **Level 5 - Multiple Balls**: Unlock the ability to drop multiple balls simultaneously for comparison.

### Key Scaffolding Principles Demonstrated

- **Progressive Complexity**: New variables are introduced only after mastering simpler concepts
- **Visual Feedback**: Locked controls are visible but grayed out, showing what's coming next
- **Mastery Requirements**: Students must complete experiments before advancing
- **Celebration of Progress**: Animations reinforce achievement when unlocking new levels

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Define scaffolding in an educational context
2. Identify the key elements of scaffolded instruction
3. Design a scaffolded learning sequence for a chosen topic
4. Evaluate the effectiveness of progressive unlocking as a scaffolding technique

### Activity Sequence (45 minutes)

**Introduction (10 minutes)**

1. Ask students: "Think of a complex skill you learned. How did your teacher break it down?"
2. Introduce the concept of scaffolding - temporary support that is removed as learners gain competence
3. Preview the simulation as an example of scaffolded learning

**Exploration (15 minutes)**

1. Have students work through the simulation from Level 1 to Level 5
2. Ask them to note:
   - How did it feel when controls were locked?
   - Was the progression logical?
   - Did the 3-experiment requirement feel right?
3. Discuss observations as a class

**Application (15 minutes)**

1. In pairs, students choose a topic they might teach
2. Design a 5-level scaffolding progression for that topic
3. Identify:
   - What's the simplest starting point?
   - What controls/variables unlock at each level?
   - How will students demonstrate readiness to advance?

**Reflection (5 minutes)**

1. Share key insights from pair work
2. Discuss: When might scaffolding be too restrictive? Too permissive?
3. Connect to Vygotsky's Zone of Proximal Development

### Assessment Ideas

- Have students create a scaffolding diagram for their topic
- Ask students to critique an existing learning activity and suggest scaffolding improvements
- Design a rubric for evaluating scaffolded instruction

### Extensions

- Modify the simulation code to change the number of experiments required
- Add new physics variables (friction, elasticity) as additional levels
- Compare this approach to other instructional strategies like worked examples

## Technical Details

This simulation is built with p5.js and demonstrates:

- Progressive UI unlocking based on user progress
- Simple physics simulation (gravity, collision, air resistance)
- State management for tracking level progression
- Celebration animations for positive reinforcement
- Responsive design for different screen sizes

The scaffolding pattern shown here can be applied to any interactive learning tool where complexity needs to be introduced gradually.
