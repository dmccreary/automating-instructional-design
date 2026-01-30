# Intuition Testing

This interactive MicroSim allows learners to experience intuition testing and see how their intuitive responses compare to scientific understanding, revealing potential misconceptions that are common and natural.

## About This MicroSim

The simulation presents four carefully designed scenarios that probe common misconceptions in physics and biology. A timer encourages quick, intuitive responses rather than deliberate reasoning, helping reveal how our first instincts often differ from scientific understanding.

### Test Structure

The simulation includes four scenarios:

1. **Circular Motion** - What path does a ball take after exiting a curved tube?
2. **Falling Objects** - Which lands first: a heavy or light ball?
3. **Electric Current** - Is current the same on both sides of a light bulb?
4. **Evolution** - Why did a beetle population shift from brown to green?

### Key Features

- **Timed responses** - Encourages intuitive rather than deliberate thinking
- **Confidence rating** - Track how sure you are before seeing results
- **Animated explanations** - Visual demonstrations of correct answers
- **Non-judgmental feedback** - Uses "interesting" rather than "wrong" language
- **Population comparisons** - See how your responses compare to others

<iframe src="main.html" width="100%" height="532px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## How to Use

### Testing Workflow

1. **Read the scenario** - Understand the setup presented
2. **Trust your gut** - Select the answer that feels right (don't overthink!)
3. **Lock in your answer** - Click to confirm before time runs out
4. **Watch the animation** - See what actually happens scientifically
5. **Review the explanation** - Learn why the misconception feels natural
6. **Continue** - Progress through all four scenarios

### Understanding Your Results

The test reveals common misconceptions that even experts initially held:

- **Circular impetus** - The belief that objects "remember" circular motion
- **Aristotelian physics** - The intuition that heavier objects fall faster
- **Current consumption** - Thinking electricity gets "used up" by devices
- **Lamarckian inheritance** - Believing organisms can will themselves to change

## Lesson Plan

### Grade Level
Middle School to High School (Grades 7-12)

### Learning Objectives

By the end of this lesson, students will be able to:

1. Identify common scientific misconceptions in their own thinking
2. Distinguish between intuitive responses and scientific understanding
3. Explain why certain misconceptions feel natural and compelling
4. Apply metacognitive awareness to evaluate future intuitions

### Duration
30-45 minutes

### Materials
- Computer or tablet with web browser
- Optional: reflection worksheet

### Lesson Procedure

**Introduction (5 minutes)**

1. Explain that our brains develop intuitions about how the world works
2. These intuitions are often useful but sometimes conflict with science
3. The goal is awareness, not judgment

**Individual Testing (15 minutes)**

1. Students complete all four scenarios independently
2. Encourage quick, gut-level responses
3. No discussion during testing

**Group Discussion (15 minutes)**

1. Share aggregate results (show of hands for each scenario)
2. Discuss why each misconception feels natural
3. Connect to the history of science (Aristotle, Lamarck, etc.)

**Reflection (10 minutes)**

1. Students identify one misconception they held
2. Discuss strategies for recognizing when intuition might mislead
3. Emphasize that misconceptions are normal and valuable to discover

### Assessment Questions

1. Why do we call these "misconceptions" rather than "mistakes"?
2. Which scenario surprised you the most? Why?
3. How might awareness of these misconceptions help in science class?
4. What other intuitions about the world might be worth questioning?

## p5.js Editor Template

You can experiment with this code in the [p5.js web editor](https://editor.p5js.org/).

```javascript
// Intuition Testing - Simplified Version
// For use in p5.js web editor

let canvasWidth = 500;
let canvasHeight = 400;

// Simple state machine
let state = "question"; // question, feedback
let selectedOption = -1;
let isCorrect = false;

// Single scenario for demo
let scenario = {
  question: "A heavy ball (10kg) and light ball (1kg) are dropped together. Which lands first?",
  options: ["Heavy first", "Same time", "Light first"],
  correctIndex: 1,
  explanation: "In the absence of air resistance, all objects fall at the same rate regardless of mass."
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textFont('Arial');
}

function draw() {
  background(248, 250, 252);

  if (state === "question") {
    drawQuestion();
  } else {
    drawFeedback();
  }
}

function drawQuestion() {
  // Title
  fill(59, 130, 246);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Falling Objects", width / 2, 20);

  // Question
  fill(30, 41, 59);
  textSize(14);
  textStyle(NORMAL);
  text(scenario.question, width / 2, 60, width - 40);

  // Draw balls
  fill(59, 130, 246);
  noStroke();
  ellipse(width / 2 - 60, 150, 50, 50);
  fill(255);
  textSize(10);
  text("10kg", width / 2 - 60, 150);

  fill(34, 197, 94);
  ellipse(width / 2 + 60, 150, 30, 30);
  fill(255);
  textSize(8);
  text("1kg", width / 2 + 60, 150);

  // Options
  let optionWidth = 120;
  let startX = width / 2 - (optionWidth * 1.5 + 20);

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (optionWidth + 10);
    let y = 220;
    let isHovered = mouseX > x && mouseX < x + optionWidth &&
                    mouseY > y && mouseY < y + 50;
    let isSelected = selectedOption === i;

    fill(isSelected ? color(219, 234, 254) : (isHovered ? color(248, 250, 252) : 255));
    stroke(isSelected ? color(59, 130, 246) : color(200));
    strokeWeight(isSelected ? 2 : 1);
    rect(x, y, optionWidth, 50, 8);

    fill(30, 41, 59);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(scenario.options[i], x + optionWidth / 2, y + 25);
  }

  // Submit button
  if (selectedOption >= 0) {
    let btnX = width / 2 - 50;
    let btnY = 300;
    fill(59, 130, 246);
    noStroke();
    rect(btnX, btnY, 100, 40, 8);
    fill(255);
    textSize(14);
    text("Submit", width / 2, btnY + 20);
  }
}

function drawFeedback() {
  // Result
  fill(isCorrect ? color(34, 197, 94) : color(239, 68, 68));
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(isCorrect ? "Correct!" : "Interesting!", width / 2, 30);

  // Your answer
  fill(30, 41, 59);
  textSize(14);
  textStyle(NORMAL);
  text("You selected: " + scenario.options[selectedOption], width / 2, 70);

  // Correct answer
  fill(34, 197, 94);
  text("Correct: " + scenario.options[scenario.correctIndex], width / 2, 100);

  // Explanation
  fill(30, 41, 59);
  textSize(12);
  text(scenario.explanation, width / 2, 150, width - 60);

  // Animation
  let t = (frameCount % 120) / 120;
  let y = 220 + t * 100;

  fill(59, 130, 246);
  ellipse(width / 2 - 40, y, 40, 40);
  fill(34, 197, 94);
  ellipse(width / 2 + 40, y, 25, 25);

  // Ground
  stroke(100);
  line(width / 2 - 80, 320, width / 2 + 80, 320);

  // Try again
  fill(100, 116, 139);
  noStroke();
  textSize(11);
  text("Click anywhere to try again", width / 2, 360);
}

function mousePressed() {
  if (state === "question") {
    // Check option clicks
    let optionWidth = 120;
    let startX = width / 2 - (optionWidth * 1.5 + 20);

    for (let i = 0; i < 3; i++) {
      let x = startX + i * (optionWidth + 10);
      if (mouseX > x && mouseX < x + optionWidth &&
          mouseY > 220 && mouseY < 270) {
        selectedOption = i;
        return;
      }
    }

    // Check submit button
    if (selectedOption >= 0 &&
        mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > 300 && mouseY < 340) {
      isCorrect = selectedOption === scenario.correctIndex;
      state = "feedback";
    }
  } else {
    // Reset
    state = "question";
    selectedOption = -1;
  }
}
```

## Design Pattern Notes

This MicroSim demonstrates key principles of the **Intuition Testing** design pattern:

- **Time pressure**: Encourages System 1 (intuitive) rather than System 2 (deliberate) thinking
- **Non-judgmental framing**: Uses "interesting" rather than "wrong" to reduce defensiveness
- **Misconception explanation**: Explains WHY the intuition feels right, not just that it's wrong
- **Social comparison**: Shows that misconceptions are common, normalizing the experience
- **Visual demonstration**: Animations provide concrete evidence of scientific principles

## References

- [A Private Universe](https://www.learner.org/series/a-private-universe/) - Classic documentary on student misconceptions
- [Force Concept Inventory](https://www.physport.org/assessments/assessment.cfm?I=5) - Standard physics misconception assessment
- [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow) - Daniel Kahneman's work on intuitive vs. deliberate thinking
- [Teaching and Learning STEM](https://www.wiley.com/en-us/Teaching+and+Learning+STEM%3A+A+Practical+Guide-p-9781118925812) - Research on addressing student misconceptions
