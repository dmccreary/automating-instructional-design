# MicroSim Quality Evaluation Framework

## Purpose

This document defines objective, machine-measurable quality tests for evaluating MicroSimulations (MicroSims) within intelligent textbooks.

These metrics are designed to:

* Detect shallow alignment with learning objectives
* Identify pedagogical weaknesses
* Enforce cognitive science principles
* Ensure technical maintainability
* Support large-scale graph-driven quality analytics

The goal is to enable systematic, automated, and repeatable evaluation of MicroSim quality across an entire textbook ecosystem.

---

# 1. Learning Objective Alignment Metrics

## 1.1 Objective Coverage Score (OCS)

### Definition

The percentage of decomposed atomic learning objective components explicitly represented in the MicroSim.

### Measurement Process

1. Decompose the learning objective into atomic concepts.
2. Map each concept to:

   * A visual representation
   * An interactive control
   * A feedback or explanatory element
3. Count covered vs. uncovered concepts.

### Formula

OCS = covered_components / total_components

### Interpretation

* 0.90–1.00: Strong alignment
* 0.70–0.89: Moderate alignment
* Below 0.70: Shallow alignment

---

## 1.2 Bloom Level Match Score (BLMS)

### Definition

The degree to which the MicroSim interaction complexity matches the intended Bloom’s Taxonomy level.

### Measurement Process

1. Extract the Bloom verb from the learning objective.
2. Classify the MicroSim interaction type.
3. Compare expected cognitive level with implemented level.

### Example

Objective: Analyze the effect of air resistance
MicroSim: Passive animation only

Result: Mismatch (Analyze vs. Remember)

### Scoring

* Exact match = 1.0
* One level off = 0.7
* Two or more levels off = 0.4

---

## 1.3 Misconception Targeting Index (MTI)

### Definition

Measures whether the MicroSim explicitly addresses known misconceptions.

### Criteria

* Prediction prompt present (1 or 0)
* Reveal or contrast step present (1 or 0)
* Explicit correction explanation present (1 or 0)

### Score Range

0 to 3

---

# 2. Cognitive Load Metrics

## 2.1 Simultaneous Control Count (SCC)

### Definition

Number of interactive controls visible at the same time.

### Target Guidelines

* Early learners: 3 or fewer
* Middle school: 5 or fewer
* Advanced: 7 or fewer

### Penalty

Score decreases when exceeding recommended limits.

---

## 2.2 Visual Element Density (VED)

### Definition

Total visible instructional elements per viewport area.

### Includes

* Labels
* Data points
* Animated objects
* Text blocks
* Color-coded elements

Higher density indicates potential extraneous cognitive load.

---

## 2.3 Progressive Disclosure Score (PDS)

### Definition

Measures whether complexity is revealed gradually.

### Criteria

* Advanced options hidden initially
* Step-by-step mode available
* Layered information structure

Binary or tiered scoring.

---

# 3. Interactivity Depth Metrics

## 3.1 Interaction-to-Display Ratio (IDR)

### Formula

IDR = number_of_interactive_events / number_of_visual_objects

### Interpretation

Low ratio indicates passive demonstration.
Higher ratio indicates exploratory engagement.

---

## 3.2 State Space Richness (SSR)

### Definition

Measures the size and diversity of reachable states.

### Includes

* Independent parameters
* Distinct outcomes
* Edge cases

Encourages meaningful exploration rather than static animation.

---

## 3.3 Prediction Prompt Presence (PPP)

### Definition

Binary metric indicating whether the learner must predict before reveal.

Prediction significantly increases conceptual engagement.

---

# 4. Technical Quality Metrics

## 4.1 Code Coherence Score (CCS)

### Measured By

* Cyclomatic complexity
* Modular function structure
* Variable naming clarity
* Code duplication detection

Higher scores indicate maintainable, professional-quality code.

---

## 4.2 Dependency Cleanliness Index (DCI)

### Checks

* Approved visualization libraries used
* No unused imports
* Separation of concerns maintained
* No redundant CSS or inline duplication

---

## 4.3 Runtime Stability Score (RSS)

### Automated Tests

* Console errors
* Frame rate consistency
* Memory leaks
* Event handler duplication

---

# 5. Accessibility Metrics

## 5.1 Keyboard Navigability Score (KNS)

### Criteria

* Tab order defined
* Focusable controls
* Slider accessibility
* Button activation via keyboard

---

## 5.2 Contrast Compliance Score (CCS-A11y)

Automated WCAG contrast ratio validation.

---

## 5.3 Reduced Motion Compatibility (RMC)

### Checks

* Honors prefers-reduced-motion
* Adjustable animation speed
* Animation pause controls

---

# 6. Audience Calibration Metrics

## 6.1 Audience Complexity Fit (ACF)

### Measures

* Vocabulary level
* Mathematical abstraction level
* Number of parameters exposed

Compared against declared audience level.

---

## 6.2 Parameter Abstraction Depth (PAD)

Advanced audiences should expose:

* Equations
* Model assumptions
* Edge case analysis

Early audiences should simplify or hide these.

---

# 7. Maintainability and Reusability Metrics

## 7.1 Specification Traceability Score (STS)

### Requirements

* Learning objective ID linked
* Concept graph node IDs linked
* Version history stored
* Pattern references documented

---

## 7.2 Pattern Library Conformance (PLC)

### Checks

* Approved layout template used
* Approved pedagogy pattern applied
* Approved interaction pattern applied

---

# 8. Analytics and Instrumentation Metrics

## 8.1 Interaction Logging Coverage (ILC)

Percentage of meaningful learner events logged.

Includes:

* Parameter changes
* Prediction submissions
* Reveal events
* Reset events

---

## 8.2 Time-to-Concept Engagement (TCE)

Time between page load and first meaningful interaction.

Lower values indicate faster cognitive engagement.

---

# 9. Composite MicroSim Quality Index (MSQI)

A weighted composite score may be calculated as:

* 25% Learning Objective Alignment
* 15% Cognitive Load
* 15% Interactivity
* 15% Technical Quality
* 10% Accessibility
* 10% Audience Calibration
* 10% Maintainability

MSQI enables:

* Cross-MicroSim comparison
* Longitudinal quality tracking
* Graph-based pattern analysis
* Automated generation feedback loops

---

# Implementation Notes

These metrics are designed to be:

* Machine measurable
* Human auditable
* Graph-storable
* Automatable inside a knowledge-graph architecture

Each metric can be represented as a node linked to a MicroSim node in a labeled property graph for large-scale analysis and continuous improvement.

---

# Recommended Initial Focus

If prioritization is required, begin with:

* Objective Coverage Score
* Bloom Level Match Score
* Prediction Prompt Presence
* Simultaneous Control Count
* Code Coherence Score

These five metrics directly detect the most common failure modes in AI-generated MicroSims and provide the highest leverage for improving overall quality.
