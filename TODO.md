# TODO

<!-- p5js-v2-audit-2026-09-05 -->
## p5.js 2.x Upgrade: MicroSim Fixes Needed (2026-09-05)

A static scan of this repo's `docs/sims/` MicroSims found **16 sim(s)** using p5.js v1-only APIs that will break if upgraded to p5.js 2.x (the microsim-generator skill's templates now default to p5@2.3.2). Fix these before bumping this repo's MicroSims past p5@1.x.

- [ ] **ai-generation-workflow** (`docs/sims/ai-generation-workflow/`)
    - `ai-generation-workflow.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **cognitive-development-chart** (`docs/sims/cognitive-development-chart/`)
    - `cognitive-development-chart.js` uses `curveVertex(...)`, renamed to `splineVertex()` in v2 with changed anchor-point rules — rename to `splineVertex()`; drop the old duplicated first/last anchor points and rely on `endShape(CLOSE)` for a smooth closed loop.
- [ ] **corporate-learning-module** (`docs/sims/corporate-learning-module/`)
    - `corporate-learning-module.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **design-tradeoff-tree** (`docs/sims/design-tradeoff-tree/`)
    - `design-tradeoff-tree.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **interaction-spec-template** (`docs/sims/interaction-spec-template/`)
    - `interaction-spec-template.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **interpretation-pitfalls** (`docs/sims/interpretation-pitfalls/`)
    - `interpretation-pitfalls.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **learning-pathway** (`docs/sims/learning-pathway/`)
    - `learning-pathway.js` compares `mouseButton` to the old `LEFT`/`RIGHT`/`CENTER` constants — `mouseButton` is now an object in v2 — use `mouseButton.left` / `.right` / `.center` (boolean) instead.
- [ ] **mental-model-formation** (`docs/sims/mental-model-formation/`)
    - `mental-model-formation.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
    - `mental-model-formation.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **microsim-generation-workflow** (`docs/sims/microsim-generation-workflow/`)
    - `microsim-generation-workflow.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **page-view-tracking-comparison** (`docs/sims/page-view-tracking-comparison/`)
    - `page-view-tracking-comparison.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **portfolio-components** (`docs/sims/portfolio-components/`)
    - `portfolio-components.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **prediction-prompt-interface** (`docs/sims/prediction-prompt-interface/`)
    - `prediction-prompt-interface.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **probability-adaptation** (`docs/sims/probability-adaptation/`)
    - `probability-adaptation.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **sim-readiness** (`docs/sims/sim-readiness/`)
    - `sim-readiness.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **viz-library-decision** (`docs/sims/viz-library-decision/`)
    - `viz-library-decision.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **viz-paradigm-selection** (`docs/sims/viz-paradigm-selection/`)
    - `viz-paradigm-selection.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.

Reference: [p5.js Teachers' Guide to v2 transition](https://p5js.org/tutorials/v2_transition/)
