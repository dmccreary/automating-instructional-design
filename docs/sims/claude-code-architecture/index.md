# Claude Code Skills Architecture

This interactive diagram visualizes how Claude Code Skills manage context efficiently through summary indexing and on-demand loading, enabling Claude to work with dozens of specialized capabilities while staying within context limits.

## About This MicroSim

The diagram illustrates the key components of the Claude Code Skills architecture:

1. **Context Window** - The bounded space available for processing, divided into:
   - Conversation history (variable size)
   - Skill Index (~3000 tokens of summaries)
   - Active skill content (loaded on demand)
   - Working space (remaining capacity for generation)

2. **Skill Registry** - A catalog of 30 available skills:
   - Green cards indicate currently loaded skills
   - Gray cards show available but unloaded skills
   - Click any skill to simulate loading/unloading

3. **Loading Mechanism** - The flow between components:
   - Relevance detection scans user input against skill summaries
   - On-demand loading brings full skill content into context

4. **Example Scenario** - Demonstrates the loading process when a user requests a physics simulation

<iframe src="main.html" width="100%" height="520px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## Key Concepts

### Summary Indexing

The skill index contains brief summaries (~100 tokens each) of all available skills. This allows Claude to quickly scan which skills might be relevant to a user's request without loading full skill content. The summaries describe:

- What the skill does
- When to use it
- Key capabilities

### On-Demand Loading

When a skill is determined to be relevant:

1. The skill name is detected in the index
2. Full skill content is loaded into context
3. Skill instructions guide Claude's behavior
4. Only relevant skills consume context space

### Context Efficiency

This architecture enables Claude Code to support many specialized capabilities:

- **30+ skills** available without overwhelming context
- **~3000 tokens** for the complete skill index
- **Variable allocation** for active skills based on need
- **Maximum flexibility** for working space

## Interactive Elements

- **Click skills** in the registry to load or unload them
- **Hover over skills** to see their descriptions
- **Run Scenario** button demonstrates the loading process
- **Reset** button returns to initial state

## How It Works

```
User Request
     |
     v
+------------------+
| Skill Index Scan | <-- Compare request to skill summaries
+------------------+
     |
     v
+------------------+
| Relevance Match  | <-- Identify applicable skills
+------------------+
     |
     v
+------------------+
| Load Full Skill  | <-- Bring skill content into context
+------------------+
     |
     v
+------------------+
| Execute with     | <-- Use skill knowledge to respond
| Skill Knowledge  |
+------------------+
```

## References

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Context Window Management](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)
- [p5.js Reference](https://p5js.org/reference/)
