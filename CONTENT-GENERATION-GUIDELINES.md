# Content Generation Guidelines

Rules for generating **user-facing content** for the Automating
Instructional Design textbook: chapters, lesson plans, quizzes, FAQ,
glossary, references, stories, and mascot admonitions.

Instructor-facing content (teacher's guide / instructor's guide) is exempt
from the mascot rules in this file, but should still follow the reading
level guidance below.

## Target Audience & Reading Level

Target audience (from [`docs/course-description.md`](docs/course-description.md)):
working professionals who create educational content — K-12 teachers,
corporate training specialists, higher education faculty, instructional
designers, curriculum developers, and subject matter experts. No
programming background is assumed.

Reading level targets for this audience:

| Metric | Target |
|--------|--------|
| Flesch-Kincaid Grade Level | 10-14 |
| Flesch Reading Ease | 30-50 (college level) |
| Average sentence length | 15-20 words |
| Technical terms | Always explained on first use |

Verify with the `reading-level-analysis` skill (`docs/learning-graph/chapter-reading-levels.md`)
or the per-content quality reports (e.g. `docs/learning-graph/faq-quality-report.md`,
`docs/learning-graph/glossary-quality-report.md`) before publishing new content.

## Chapter Content Structure

Each chapter uses this structure:
```markdown
---
title: Chapter Title
description: Brief description
generated_by: claude skill chapter-content-generator
date: YYYY-MM-DD HH:MM:SS
version: 0.03
---

# Chapter Title
## Summary
## Concepts Covered
## Prerequisites
[Main content with diagrams, MicroSims, tables]
```

## Diagram Specifications

Chapter content is generated using Claude skills. Diagram specifications use
`<details markdown="1">` blocks:
```markdown
#### Diagram: Diagram Name

<details markdown="1">
<summary>Diagram Name</summary>
Type: [microsim|diagram|infographic|workflow|chart|timeline]

Bloom Taxonomy: [Remember|Understand|Apply|Analyze|Evaluate|Create] (L1-L6)

Learning Objective: What the student should learn

[Detailed specification for implementation]

Implementation: [p5.js|vis-network|HTML/CSS/JavaScript|Mermaid]
</details>
```

## Admonitions

- **General (non-mascot) admonitions**: use sparingly, max 1 per page.
  Requires the `pymdownx.details` extension.
- **Details blocks**: no leading spaces or indentation inside
  `<details markdown="1">` content.
- Mascot admonitions follow their own, more permissive frequency rules —
  see Placement Rules below. Do not apply the "max 1 per page" limit to them.

## Learning Mascot: Sim the Builder-Bot

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Character Overview

- **Name**: Sim
- **Species**: Builder-bot (small friendly robot)
- **Personality**: Friendly, patient, encouraging, slightly playful/goofy
- **Catchphrase**: "Let's build it!"
- **Visual**: Small, compact, rounded blue robot (#1976D2) with orange accents (#F57C00), a tool belt (wrench + screwdriver), a gear-shaped chest badge, and round LED eyes.

### Voice Characteristics

- Uses simple, encouraging language
- Leans on construction/assembly metaphors ("let's bolt that idea in," "time to assemble the pieces")
- Refers to students as "builders" or "makers"
- Signature phrases: "Let's build it!", "Time to assemble!", "Nice fit!"

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar.
Image paths are relative to the *rendered page URL* (MkDocs uses directory
URLs), not the markdown file — count directories from the page to
`docs/img/mascot/`. For a chapter page at `chapters/01-.../index.md`, use
`../../img/mascot/`.

    !!! mascot-welcome "Title Here"
        ![Sim waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
        Admonition text goes here after the image.

### Chapter 1 Self-Introduction (Special Rule)

The **first** `mascot-welcome` admonition — Sim's very first appearance,
which always falls in Chapter 1 — is not a normal chapter-opening welcome.
It must be a **self-introduction** that orients the reader to Sim's role
for the rest of the book, so no later chapter ever needs to re-explain who
Sim is or why Sim shows up.

The self-introduction must:

- Use the `mascot-welcome` admonition type (it doubles as the Chapter 1 opener).
- Have Sim state their name, that they're a builder-bot, and one
  personality detail, in a warm first-person voice.
- Enumerate all six pose-roles as a numbered list, in the order they
  typically appear during a chapter (welcome → think → tip → warn →
  encourage → celebrate). Each item is one short sentence describing what
  Sim *does* in that pose, not what the pose looks like.
- End with a contract sentence — e.g. "If I'm not doing one of those six
  things, I'm not in the chapter." — so the reader understands Sim is used
  with restraint and is a *signal*, not decoration.

Do this **only in Chapter 1, only once**. Chapters 2+ open with a normal
`mascot-welcome` that gets straight into that chapter's content — never
repeat the self-introduction.

See [`docs/chapters/01-foundations-learning-objective-analysis/index.md`](docs/chapters/01-foundations-learning-objective-analysis/index.md)
for a worked example.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Section completion | mascot-celebration | End of major sections |

### Do's and Don'ts

**Do:**

- Use Sim to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Sim more than 5-6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Sim's personality or speech patterns

Note: instructor-facing content (teacher's guide, instructor's guide) does
not need to use Sim.
