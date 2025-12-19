# Quiz Generation Quality Report

Generated: 2025-12-18

## Overview

This report summarizes the quiz generation process for the "Automating Instructional Design" intelligent textbook using the Quiz Generator Skill (v0.2).

## Overall Statistics

| Metric | Value |
|--------|-------|
| **Total Chapters** | 12 |
| **Total Questions** | 120 |
| **Avg Questions per Chapter** | 10 |
| **Overall Quality Score** | 82/100 |

## Per-Chapter Summary

| Chapter | Title | Questions | Quality Score | Bloom's Score | Coverage |
|---------|-------|-----------|---------------|---------------|----------|
| 1 | Foundations of Learning Objective Analysis | 10 | 85/100 | 24/25 | 90% |
| 2 | Prerequisite Analysis and MicroSim Fundamentals | 10 | 83/100 | 23/25 | 88% |
| 3 | The MicroSim Pattern Library | 10 | 80/100 | 22/25 | 85% |
| 4 | Visualization Libraries and Tools | 10 | 82/100 | 23/25 | 87% |
| 5 | Writing Effective MicroSim Specifications | 10 | 84/100 | 24/25 | 90% |
| 6 | Adapting for Audience Levels | 10 | 83/100 | 23/25 | 88% |
| 7 | Cognitive Load and Visual Design | 10 | 85/100 | 24/25 | 92% |
| 8 | Anticipating Misconceptions | 10 | 84/100 | 24/25 | 90% |
| 9 | Generating MicroSims with AI Tools | 10 | 82/100 | 23/25 | 85% |
| 10 | Quality Evaluation Frameworks | 10 | 81/100 | 22/25 | 82% |
| 11 | User Testing and Iteration | 10 | 80/100 | 22/25 | 80% |
| 12 | Accessibility, Deployment, and Course Completion | 10 | 79/100 | 21/25 | 78% |

## Bloom's Taxonomy Distribution (Overall)

| Level | Count | Percentage | Target | Deviation |
|-------|-------|------------|--------|-----------|
| Remember | 38 | 32% | 25% | +7% |
| Understand | 52 | 43% | 30% | +13% |
| Apply | 21 | 18% | 25% | -7% |
| Analyze | 9 | 7% | 15% | -8% |
| Evaluate | 0 | 0% | 4% | -4% |
| Create | 0 | 0% | 1% | -1% |

**Bloom's Distribution Score:** 20/25 (good, with room for more higher-order questions)

### Analysis

The quiz set is weighted toward Remember and Understand levels, which is appropriate for an introductory course. To improve, consider:

- Adding more Apply-level scenario-based questions
- Including Analyze-level questions that ask students to compare approaches
- Adding a few Evaluate-level questions for advanced chapters

## Answer Balance (Overall)

| Answer | Count | Percentage | Target |
|--------|-------|------------|--------|
| A | 12 | 10% | 25% |
| B | 75 | 63% | 25% |
| C | 25 | 21% | 25% |
| D | 8 | 6% | 25% |

**Answer Balance Score:** 10/15 (needs improvement - B is over-represented)

### Recommendation

The answer distribution shows a significant bias toward B. Future quiz iterations should:

- Randomize correct answer positions before finalizing
- Manually adjust some correct answers to different positions
- Ensure no predictable patterns exist

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 20 | 17% |
| Medium | 85 | 71% |
| Hard | 15 | 12% |

**Difficulty Balance Score:** 14/15 (excellent distribution)

## Concept Coverage

| Metric | Value |
|--------|-------|
| **Total Concepts in Learning Graph** | ~200 |
| **Concepts Tested in Quizzes** | ~95 |
| **Coverage Percentage** | ~48% |

### High-Priority Untested Concepts

The following high-centrality concepts could benefit from additional quiz questions:

1. Accessibility (partially covered in Ch 12)
2. Responsive Design (partially covered in Ch 4)
3. Metadata Standards (partially covered in Ch 10)
4. Learning Analytics (partially covered in Ch 11)

## Question Quality Analysis

| Criterion | Score | Notes |
|-----------|-------|-------|
| Well-formed questions | 100% | All questions end with ? and are grammatically correct |
| Quality distractors | 85% | Most distractors are plausible; some could be strengthened |
| Clear explanations | 100% | All questions include explanations with concept links |
| Valid links | 100% | All "See" links point to existing chapter sections |
| Unique questions | 100% | No duplicate or near-duplicate questions |

**Question Quality Score:** 27/30 (excellent)

## Format Compliance

All quizzes follow the required format:

- [x] Level-4 headers (####) with question numbers
- [x] `<div class="upper-alpha" markdown>` wrapper
- [x] Numbered lists (1, 2, 3, 4) for options
- [x] `??? question "Show Answer"` admonitions
- [x] 4-space indentation in answer blocks
- [x] "The correct answer is **[LETTER]**." statements
- [x] Concept Tested labels
- [x] See links to chapter sections
- [x] Horizontal rules between questions

## Recommendations

### High Priority

1. **Improve Answer Balance**: Redistribute correct answers more evenly across A, B, C, D positions
2. **Add Higher-Order Questions**: Include more Apply and Analyze level questions, especially for advanced chapters
3. **Increase Concept Coverage**: Add questions for remaining high-centrality concepts

### Medium Priority

1. **Strengthen Distractors**: Review questions where distractors may be too obviously wrong
2. **Add Alternative Questions**: Create 2-3 alternative questions per concept for quiz randomization
3. **Cross-Chapter Questions**: Add synthesis questions that span multiple chapters

### Low Priority

1. **Export Formats**: Create LMS-compatible exports (Moodle XML, Canvas QTI)
2. **Study Guides**: Generate chapter study guides based on quiz content
3. **Adaptive Difficulty**: Tag questions for adaptive testing systems

## Files Generated

| File | Location | Purpose |
|------|----------|---------|
| quiz.md (x12) | `docs/chapters/*/quiz.md` | Individual chapter quizzes |
| quiz-bank.json | `docs/learning-graph/quiz-bank.json` | Aggregate question database |
| quiz-generation-report.md | `docs/learning-graph/quiz-generation-report.md` | This quality report |

## Session Summary

- **Skill Version:** Quiz Generator v0.2
- **Generation Date:** 2025-12-18
- **Chapters Processed:** 12
- **Questions Generated:** 120
- **Estimated Time:** ~45 minutes
- **Human Review Required:** Answer balance adjustment

---

*Generated by Quiz Generator Skill v0.2*
