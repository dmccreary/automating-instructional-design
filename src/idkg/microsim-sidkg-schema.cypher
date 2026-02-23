// microsim-sidkg-schema.cypher
// Neo4j schema for MicroSims + Senior Instructional Designer Knowledge Graph (SID-KG)
// Run this in Neo4j Browser, cypher-shell, or as part of a migration step.
//
// This file creates:
//   - Uniqueness constraints for key node identifiers
//   - Helpful indexes for common query patterns
//
// Compatible with Neo4j 5.x+ (IF NOT EXISTS syntax).
// -------------------------------------------------------------

// ----------------------
// Core entity constraints
// ----------------------

// Evidence layer (your 800+ MicroSims)
CREATE CONSTRAINT microsim_id IF NOT EXISTS
FOR (m:MicroSim) REQUIRE m.id IS UNIQUE;

CREATE CONSTRAINT jsonfield_path IF NOT EXISTS
FOR (f:JsonField) REQUIRE f.path IS UNIQUE;

// Observations / derived features / findings
CREATE CONSTRAINT observedvalue_id IF NOT EXISTS
FOR (v:ObservedValue) REQUIRE v.observedValueId IS UNIQUE;

CREATE CONSTRAINT feature_id IF NOT EXISTS
FOR (x:Feature) REQUIRE x.featureId IS UNIQUE;

CREATE CONSTRAINT finding_id IF NOT EXISTS
FOR (g:Finding) REQUIRE g.findingId IS UNIQUE;

// SID-KG layer (senior instructional designer knowledge)
CREATE CONSTRAINT pedagogy_pattern_id IF NOT EXISTS
FOR (p:PedagogyPattern) REQUIRE p.patternId IS UNIQUE;

CREATE CONSTRAINT cognitive_rule_id IF NOT EXISTS
FOR (r:CognitiveLoadRule) REQUIRE r.ruleId IS UNIQUE;

CREATE CONSTRAINT ui_template_id IF NOT EXISTS
FOR (t:UILayoutTemplate) REQUIRE t.templateId IS UNIQUE;

CREATE CONSTRAINT failure_mode_id IF NOT EXISTS
FOR (fm:FailureMode) REQUIRE fm.failureId IS UNIQUE;

CREATE CONSTRAINT fix_pattern_id IF NOT EXISTS
FOR (fx:FixPattern) REQUIRE fx.fixId IS UNIQUE;

CREATE CONSTRAINT test_pattern_id IF NOT EXISTS
FOR (tp:TestPattern) REQUIRE tp.testId IS UNIQUE;

CREATE CONSTRAINT linter_rule_id IF NOT EXISTS
FOR (lr:LinterRule) REQUIRE lr.linterId IS UNIQUE;

CREATE CONSTRAINT rubric_item_id IF NOT EXISTS
FOR (qi:QualityRubricItem) REQUIRE qi.rubricId IS UNIQUE;


// ----------------------
// Helpful indexes
// ----------------------

// Common lookups / filters
CREATE INDEX microsim_title IF NOT EXISTS
FOR (m:MicroSim) ON (m.title);

CREATE INDEX microsim_repo IF NOT EXISTS
FOR (m:MicroSim) ON (m.repo);

CREATE INDEX microsim_sourceUri IF NOT EXISTS
FOR (m:MicroSim) ON (m.sourceUri);

CREATE INDEX jsonfield_description IF NOT EXISTS
FOR (f:JsonField) ON (f.description);

// Findings and quality operations
CREATE INDEX finding_severity IF NOT EXISTS
FOR (g:Finding) ON (g.severity);

CREATE INDEX finding_createdAt IF NOT EXISTS
FOR (g:Finding) ON (g.createdAt);

// Observed values and features
CREATE INDEX observedvalue_present IF NOT EXISTS
FOR (v:ObservedValue) ON (v.present);

CREATE INDEX feature_name IF NOT EXISTS
FOR (x:Feature) ON (x.name);

// SID-KG exploration
CREATE INDEX failure_mode_name IF NOT EXISTS
FOR (fm:FailureMode) ON (fm.name);

CREATE INDEX fix_pattern_name IF NOT EXISTS
FOR (fx:FixPattern) ON (fx.name);

CREATE INDEX pedagogy_pattern_name IF NOT EXISTS
FOR (p:PedagogyPattern) ON (p.name);

CREATE INDEX ui_template_name IF NOT EXISTS
FOR (t:UILayoutTemplate) ON (t.name);


// ----------------------
// Relationship type catalog (documentation only)
// ----------------------
// Neo4j does not require relationship schema creation, but this list documents
// the canonical relationship names used by the model.
//
// Evidence relationships:
//   (:MicroSim)-[:HAS_FIELD]->(:JsonField)
//   (:MicroSim)-[:HAS_VALUE]->(:ObservedValue)-[:OF_FIELD]->(:JsonField)
//   (:MicroSim)-[:HAS_FEATURE]->(:Feature)
//   (:MicroSim)-[:DECLARES_PATTERN]->(:PedagogyPattern)
//   (:MicroSim)-[:USES_TEMPLATE]->(:UILayoutTemplate)
//
// SID-KG field bindings (the key “bind to schema paths” mechanism):
//   (:PedagogyPattern)-[:REQUIRES_FIELD {level:"must"|"should"}]->(:JsonField)
//   (:PedagogyPattern)-[:RECOMMENDS_FIELD]->(:JsonField)
//   (:CognitiveLoadRule)-[:CONSTRAINS_FIELD {constraint:..., value:...}]->(:JsonField)
//   (:UILayoutTemplate)-[:SETS_FIELD {action:"set"|"derive"}]->(:JsonField)
//   (:FixPattern)-[:MODIFIES_FIELD {patchType:"add"|"remove"|"edit"|"move"}]->(:JsonField)
//   (:FailureMode)-[:TYPICALLY_INVOLVES]->(:JsonField)
//
// Detection / verification / repair loop:
//   (:FailureMode)-[:DETECTED_BY]->(:LinterRule|:TestPattern)
//   (:FailureMode)-[:FIXED_BY]->(:FixPattern)
//   (:FixPattern)-[:VALIDATED_BY]->(:TestPattern)
//   (:QualityRubricItem)-[:ASSESSED_BY]->(:LinterRule|:TestPattern)
//
// Traceability for an audit run:
//   (:MicroSim)-[:HAS_FINDING]->(:Finding)
//   (:Finding)-[:INSTANCE_OF]->(:FailureMode)
//   (:Finding)-[:POINTS_TO_FIELD]->(:JsonField)
//   (:Finding)-[:SUGGESTS_FIX]->(:FixPattern)

