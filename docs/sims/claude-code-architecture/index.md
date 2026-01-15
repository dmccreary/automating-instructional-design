# Claude Code Skill Loading

<iframe src="main.html" width="100%" height="660px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

[Fullscreen](main.html)
[Edit](https://editor.p5js.org/dmccreary/sketches/T9VrF1S21)

This interactive diagram visualizes the step-by-step process of how Claude Code loads skills into the context window, from initial skill index matching to loading full skill content and templates.

## How Skill Loading Works

Click **Next Step** to walk through the loading process:

### Step 1: Skill Index in Context
The context window starts with a **Skill Index** containing 30 skill summaries (~100 tokens each, ~3,000 tokens total). Each summary describes what the skill does and when to use it. This lightweight index allows Claude to quickly identify relevant skills without consuming much context space.

### Step 2: User Prompt Triggers Match
When a user makes a request (e.g., "Create a pendulum physics simulation"), Claude scans the skill index for matches. The **microsim-generator** skill is identified as relevant and highlighted in orange.

### Step 3: SKILL.md Loaded
The full skill file (`SKILL.md`, ~5,000 tokens) is loaded into the context window. This contains:

- Detailed instructions for the skill
- Routing logic to select the right visualization library
- Quality standards and best practices
- File structure requirements

### Step 4: Template Loaded
The skill references a template file (`p5js-template.md`, ~2,000 tokens) which is also loaded. This provides:

- Standard MicroSim structure
- Responsive canvas setup patterns
- Draw loop conventions

### Step 5: Ready to Generate
With all resources loaded (~10,000 tokens total), Claude has everything needed to generate a complete MicroSim while still leaving ~118,000 tokens of working space.

## Interactive Elements

- **Hover over skills** in the index to see their descriptions
- **Next Step** button advances through the loading process
- **Reset** button returns to the initial state

## Key Concepts

### Context Efficiency
This architecture enables Claude Code to support many specialized capabilities:

- **30+ skills** available without overwhelming context
- **~3,000 tokens** for the complete skill index
- **On-demand loading** of full skill content only when needed
- **Template reuse** across multiple skills

### The Loading Flow

```
User Request
     │
     ▼
┌──────────────────┐
│  Skill Index     │ ◄── ~3,000 tokens always in context
│  (30 summaries)  │
└──────────────────┘
     │
     ▼
┌──────────────────┐
│  Match Detected  │ ◄── "microsim-generator" matches request
└──────────────────┘
     │
     ▼
┌──────────────────┐
│  Load SKILL.md   │ ◄── +5,000 tokens
└──────────────────┘
     │
     ▼
┌──────────────────┐
│  Load Template   │ ◄── +2,000 tokens (if skill needs it)
└──────────────────┘
     │
     ▼
┌──────────────────┐
│  Generate Output │ ◄── ~118,000 tokens remaining
└──────────────────┘
```

## References

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Context Window Management](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)
- [p5.js Reference](https://p5js.org/reference/)
