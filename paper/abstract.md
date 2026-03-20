# Abstract

Title: A Graph-Guided Architecture for Automated Intelligent Textbook Generation

The central challenge in modern education is the generation of ultra-high-quality interactive textbooks customized to the needs of individual learners at sufficiently low cost to democratize access worldwide. Our research has shown that LLMs have already demonstrated the ability to perform quality content generation for textbooks with extremely low hallucination rates.  However, producing adaptive, standards-aligned, cognitively sound instructional materials with integrated MicroSimulations (MicroSims) requires connecting insights from software engineering, cognitive science, instructional design, accessibility, visualization theory, learner analytics and subject-matter experts. The difficulty is not the existence of precise rules or argentic skills, but connecting heterogeneous sources into coherent, pedagogically effective learning experiences. Neither human designers operating at scale nor single-agent LLMs can reliably manage this complexity.
Our prior research showed that single-shot prompting often results in 
textbooks and MicroSims with shallow alignment with learning objectives, 
MicroSims that human senior instructional designers would give failing grades, 
and incoherent code that no software developer would want to maintain.

We introduce a graph-centric argentic software framework guided by a large-scale graph database to generate and refine intelligent textbook generation components and ultra-high quality MicroSims. Specialized agents perform learning objective decomposition, standards alignment, evidence retrieval, design pattern extraction, and structured traversal of prerequisite concept networks. This graph-centric architecture enables relational reasoning across pedagogical constraints, MicroSim code generation, and learner adaptation strategies. Our comparative results demonstrate that our graph-centric approach outperforms single pass LLM prompting in multiple human and machine quality metrics.

By storing concepts from multiple knowledge domains in a single graph, the system allows
the autonomous generation of a first draft of large complex level 2.9 textbooks that include
interactive MicroSims. Demonstrated through adaptive MicroSim generation, the framework balances cognitive load, interactivity, and cost-efficiency—advancing scalable AI-assisted instructional design for global education access.
