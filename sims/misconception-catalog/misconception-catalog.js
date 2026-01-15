// Misconception Catalog - Interactive Reference for Instructional Designers
// Data structure for misconceptions across multiple domains

const misconceptionsData = [
    // ============ PHYSICS ============
    {
        id: "phys-001",
        domain: "physics",
        statement: "Heavier objects fall faster than lighter ones",
        intuitionReason: "In everyday experience, a rock falls faster than a feather, suggesting weight determines fall speed.",
        correctConcept: "In a vacuum, all objects fall at the same rate regardless of mass. Air resistance causes lighter objects to fall slower in everyday conditions.",
        prevalence: 85,
        gradeLevel: "6-8",
        difficulty: "medium",
        tags: ["gravity", "motion", "Galileo", "air resistance"],
        detailedExplanation: "Galileo demonstrated this principle in the 16th century. The confusion arises because air resistance affects objects differently based on their shape and density. In a vacuum, a hammer and feather fall at exactly the same rate, as demonstrated on the Moon by Apollo 15 astronauts.",
        interventions: [
            "Use video of Apollo 15 hammer-feather drop on the Moon",
            "Conduct experiments with objects of similar shape but different mass",
            "Discuss the difference between mass and air resistance"
        ],
        relatedMisconceptions: ["phys-002", "phys-003"],
        citation: "Halloun, I. A., & Hestenes, D. (1985). Common sense concepts about motion. American Journal of Physics, 53(11), 1056-1065."
    },
    {
        id: "phys-002",
        domain: "physics",
        statement: "Objects in motion require continuous force to keep moving",
        intuitionReason: "We observe that cars stop when engines turn off and balls stop rolling eventually, suggesting motion requires constant force.",
        correctConcept: "Newton's First Law states that objects in motion stay in motion unless acted upon by an external force. Friction and air resistance are the external forces that slow things down.",
        prevalence: 78,
        gradeLevel: "6-8",
        difficulty: "hard",
        tags: ["Newton's laws", "inertia", "friction", "motion"],
        detailedExplanation: "This Aristotelian view persisted for nearly 2000 years before Newton. The key insight is that friction is an ever-present force on Earth that creates the illusion that motion requires continuous force. In space, objects continue moving indefinitely without any applied force.",
        interventions: [
            "Use air hockey tables or low-friction surfaces",
            "Show footage of objects moving in space",
            "Discuss what would happen without friction"
        ],
        relatedMisconceptions: ["phys-001", "phys-004"],
        citation: "McCloskey, M. (1983). Naive theories of motion. Mental models, 299-324."
    },
    {
        id: "phys-003",
        domain: "physics",
        statement: "Heat and temperature are the same thing",
        intuitionReason: "We use 'hot' and 'heat' interchangeably in everyday language, and both relate to how warm something feels.",
        correctConcept: "Temperature measures the average kinetic energy of particles, while heat is the transfer of thermal energy between objects. A spark has high temperature but little heat; a bathtub has lower temperature but more total heat.",
        prevalence: 72,
        gradeLevel: "9-12",
        difficulty: "medium",
        tags: ["thermodynamics", "energy", "temperature"],
        detailedExplanation: "The distinction becomes clear when comparing a lit match to a swimming pool at room temperature. The match has higher temperature but the pool contains far more thermal energy. Heat always flows from higher to lower temperature objects.",
        interventions: [
            "Compare touching a metal vs. wooden surface at the same temperature",
            "Discuss why a spark doesn't burn but a lower-temperature iron does",
            "Use simulations showing particle motion at different temperatures"
        ],
        relatedMisconceptions: ["phys-005"],
        citation: "Erickson, G. L. (1979). Children's conceptions of heat and temperature. Science education, 63(2), 221-230."
    },
    {
        id: "phys-004",
        domain: "physics",
        statement: "Current is used up as it flows through a circuit",
        intuitionReason: "Like water flowing through a pipe and being 'used' by plants, electricity seems to be consumed by devices.",
        correctConcept: "Current (the flow of electrons) is the same at all points in a series circuit. Energy is transferred from the electrons to devices, but the electrons themselves continue flowing.",
        prevalence: 70,
        gradeLevel: "9-12",
        difficulty: "hard",
        tags: ["electricity", "circuits", "current", "energy"],
        detailedExplanation: "The confusion stems from conflating current (flow of charge) with energy. While energy is indeed transferred and transformed in circuits, the current entering a device equals the current leaving it. Think of it like a bicycle chain - the chain keeps moving but transfers energy to the wheel.",
        interventions: [
            "Measure current at different points in a series circuit",
            "Use analogies like bicycle chains or water in closed pipes",
            "Distinguish between current (charge flow) and power (energy transfer rate)"
        ],
        relatedMisconceptions: ["phys-002"],
        citation: "Shipstone, D. M. (1984). A study of children's understanding of electricity in simple DC circuits. European Journal of Science Education, 6(2), 185-198."
    },
    {
        id: "phys-005",
        domain: "physics",
        statement: "Cold flows into warm objects",
        intuitionReason: "When we open a freezer, we feel 'cold air' rush out, suggesting cold is something that moves.",
        correctConcept: "Only heat (thermal energy) flows, always from warmer to cooler objects. The sensation of cold is the absence of heat being transferred away from our skin.",
        prevalence: 65,
        gradeLevel: "6-8",
        difficulty: "easy",
        tags: ["thermodynamics", "heat transfer", "temperature"],
        detailedExplanation: "There is no such thing as 'cold' in physics - only varying amounts of thermal energy. When you touch ice, heat flows FROM your hand TO the ice, making your hand feel cold. The ice doesn't transmit 'coldness' to you.",
        interventions: [
            "Discuss heat flow direction with real examples",
            "Use infrared cameras to visualize heat transfer",
            "Explore why insulators work by slowing heat flow, not by 'keeping cold in'"
        ],
        relatedMisconceptions: ["phys-003"],
        citation: "Erickson, G. L. (1979). Children's conceptions of heat and temperature. Science education, 63(2), 221-230."
    },

    // ============ BIOLOGY ============
    {
        id: "bio-001",
        domain: "biology",
        statement: "Evolution means species are always improving or progressing toward perfection",
        intuitionReason: "The word 'evolution' suggests advancement, and we see complex organisms as more 'advanced' than simple ones.",
        correctConcept: "Evolution is adaptation to current environmental conditions, not progress toward a goal. Simple organisms like bacteria are extremely successful. 'Fitness' means reproductive success in a particular environment, not overall superiority.",
        prevalence: 75,
        gradeLevel: "9-12",
        difficulty: "hard",
        tags: ["evolution", "natural selection", "adaptation"],
        detailedExplanation: "This teleological misconception treats evolution as goal-directed. In reality, evolution has no foresight or purpose. Species that are well-adapted to their current environment may become extinct when conditions change. Bacteria remain simple because simplicity works for them.",
        interventions: [
            "Show examples of 'evolutionary dead ends' and vestigial structures",
            "Discuss how environmental changes can make previous adaptations harmful",
            "Compare diverse successful strategies (complexity vs. simplicity)"
        ],
        relatedMisconceptions: ["bio-002", "bio-003"],
        citation: "Gregory, T. R. (2009). Understanding natural selection: Essential concepts and common misconceptions. Evolution: Education and Outreach, 2(2), 156-175."
    },
    {
        id: "bio-002",
        domain: "biology",
        statement: "Acquired traits can be inherited (Lamarckism)",
        intuitionReason: "If parents work out and become muscular, it seems logical their children might inherit stronger muscles.",
        correctConcept: "Only genetic changes are passed to offspring. Environmental effects on an organism's body (like muscle development from exercise) do not alter its DNA and cannot be inherited.",
        prevalence: 68,
        gradeLevel: "9-12",
        difficulty: "medium",
        tags: ["genetics", "inheritance", "evolution", "DNA"],
        detailedExplanation: "This pre-Darwinian idea from Lamarck has been repeatedly disproven. Changes to body cells (somatic mutations) are not passed on; only changes to reproductive cells (germline mutations) can be inherited. The giraffe's neck didn't grow because ancestors stretched for leaves.",
        interventions: [
            "Explain the distinction between somatic and germline cells",
            "Use examples like circumcision or tattoos not being inherited",
            "Discuss epigenetics as a limited exception to the rule"
        ],
        relatedMisconceptions: ["bio-001"],
        citation: "Bishop, B. A., & Anderson, C. W. (1990). Student conceptions of natural selection and its role in evolution. Journal of research in science teaching, 27(5), 415-427."
    },
    {
        id: "bio-003",
        domain: "biology",
        statement: "Plants get their mass from the soil",
        intuitionReason: "Plants have roots in soil, soil decreases around growing plants, and we add fertilizer to soil to help plants grow.",
        correctConcept: "Most of a plant's mass comes from carbon dioxide in the air, converted to sugars through photosynthesis. Water and small amounts of minerals come from soil, but the bulk of plant mass is carbon from atmospheric CO2.",
        prevalence: 80,
        gradeLevel: "6-8",
        difficulty: "medium",
        tags: ["photosynthesis", "plants", "carbon cycle"],
        detailedExplanation: "This misconception dates back centuries. Van Helmont's willow tree experiment in 1648 showed that a tree gained 164 pounds while the soil lost only 2 ounces. Plants are essentially solidified air - they capture carbon dioxide and build their bodies from it.",
        interventions: [
            "Calculate carbon content in plant matter vs. soil loss",
            "Trace where atoms in glucose come from (CO2 and H2O)",
            "Use simulations showing photosynthesis at the molecular level"
        ],
        relatedMisconceptions: ["bio-004"],
        citation: "Canal, P. (1999). Photosynthesis and 'inverse respiration' in plants: An inevitable misconception?. International Journal of Science Education, 21(4), 363-371."
    },
    {
        id: "bio-004",
        domain: "biology",
        statement: "Respiration and breathing are the same thing",
        intuitionReason: "We commonly use 'respiration' to mean breathing, and both involve oxygen.",
        correctConcept: "Breathing (ventilation) is the mechanical process of moving air in and out of lungs. Cellular respiration is the biochemical process in cells that converts glucose and oxygen into ATP energy, occurring in all living cells.",
        prevalence: 70,
        gradeLevel: "6-8",
        difficulty: "easy",
        tags: ["respiration", "cells", "energy", "metabolism"],
        detailedExplanation: "Every living cell performs cellular respiration, including plant cells and organisms without lungs. Fish don't breathe air but still perform cellular respiration. The equation C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP happens in mitochondria, not lungs.",
        interventions: [
            "Compare breathing in different organisms (fish, insects, mammals)",
            "Show cellular respiration occurring in plant cells",
            "Distinguish gas exchange from energy production"
        ],
        relatedMisconceptions: ["bio-003"],
        citation: "Sanders, M. (1993). Erroneous ideas about respiration: The teacher factor. Journal of Research in Science Teaching, 30(8), 919-934."
    },
    {
        id: "bio-005",
        domain: "biology",
        statement: "All bacteria are harmful germs",
        intuitionReason: "Media coverage of bacterial infections and the term 'germs' creates negative associations with all bacteria.",
        correctConcept: "Most bacteria are harmless or beneficial. Humans have trillions of bacteria in their gut microbiome that aid digestion, produce vitamins, and protect against pathogens. Only a small fraction of bacterial species cause disease.",
        prevalence: 60,
        gradeLevel: "K-5",
        difficulty: "easy",
        tags: ["microbiome", "bacteria", "health", "pathogens"],
        detailedExplanation: "The human body contains more bacterial cells than human cells. Beneficial bacteria in our gut help digest food, produce vitamin K, and outcompete harmful microbes. Antibiotics can disrupt this balance, which is why they should be used judiciously.",
        interventions: [
            "Discuss the role of gut bacteria in digestion",
            "Show examples of beneficial bacteria (yogurt, cheese production)",
            "Calculate the ratio of beneficial to harmful bacterial species"
        ],
        relatedMisconceptions: [],
        citation: "Simonneaux, L. (2000). A study of pupils' conceptions and reasoning in connection with 'microbes', as a contribution to research in biotechnology education. International Journal of Science Education, 22(6), 619-644."
    },

    // ============ MATHEMATICS ============
    {
        id: "math-001",
        domain: "mathematics",
        statement: "Multiplication always makes numbers bigger",
        intuitionReason: "Early multiplication is taught with whole numbers where products are always larger than the factors.",
        correctConcept: "Multiplying by numbers less than 1 (proper fractions or decimals) produces smaller results. For example, 10 x 0.5 = 5, and 6 x (1/3) = 2.",
        prevalence: 85,
        gradeLevel: "K-5",
        difficulty: "medium",
        tags: ["multiplication", "fractions", "decimals", "operations"],
        detailedExplanation: "This misconception is reinforced by years of whole-number multiplication before introducing fractions. Students struggle to reconcile that '3 x 1/2' means '3 groups of 1/2' which is less than 3. The phrase 'times' implies increase, but multiplication is really about scaling.",
        interventions: [
            "Use visual models showing multiplication as scaling",
            "Practice with number lines and area models for fraction multiplication",
            "Discuss multiplication as 'groups of' rather than 'making bigger'"
        ],
        relatedMisconceptions: ["math-002"],
        citation: "Greer, B. (1992). Multiplication and division as models of situations. Handbook of research on mathematics teaching and learning, 276-295."
    },
    {
        id: "math-002",
        domain: "mathematics",
        statement: "Division always makes numbers smaller",
        intuitionReason: "Dividing whole numbers by whole numbers greater than 1 always produces smaller quotients, reinforcing this belief.",
        correctConcept: "Dividing by numbers less than 1 produces larger results. For example, 6 divided by 0.5 equals 12. Dividing asks 'how many groups of the divisor fit in the dividend?'",
        prevalence: 82,
        gradeLevel: "K-5",
        difficulty: "medium",
        tags: ["division", "fractions", "decimals", "operations"],
        detailedExplanation: "When students encounter 6 divided by 1/2, many predict the answer will be 3 or less. Understanding requires reconceptualizing division as 'how many half-units fit in 6 units?' The answer is 12 half-units.",
        interventions: [
            "Use measurement division contexts (how many 1/2 cups in 6 cups?)",
            "Visual models with fraction strips",
            "Connect to real-world examples like cutting pizza"
        ],
        relatedMisconceptions: ["math-001"],
        citation: "Tirosh, D. (2000). Enhancing prospective teachers' knowledge of children's conceptions: The case of division of fractions. Journal for Research in Mathematics Education, 31(1), 5-25."
    },
    {
        id: "math-003",
        domain: "mathematics",
        statement: "0.25 is larger than 0.5 because 25 > 5",
        intuitionReason: "Students apply whole number comparison rules to decimals, comparing digits without understanding place value.",
        correctConcept: "Decimal place value means 0.5 (five tenths) is larger than 0.25 (twenty-five hundredths). 0.5 = 0.50, which is clearly greater than 0.25.",
        prevalence: 75,
        gradeLevel: "K-5",
        difficulty: "easy",
        tags: ["decimals", "place value", "comparison", "fractions"],
        detailedExplanation: "Students often treat decimals as two separate whole numbers (0 and 25 vs 0 and 5). Converting to equivalent forms (0.50 vs 0.25) or fractions (1/2 vs 1/4) reveals the true relationship. Visual representations on number lines also help.",
        interventions: [
            "Always write decimals with the same number of places when comparing",
            "Convert decimals to fractions for comparison",
            "Use money as a familiar decimal context ($0.50 vs $0.25)"
        ],
        relatedMisconceptions: ["math-004"],
        citation: "Steinle, V., & Stacey, K. (2004). A longitudinal study of students' understanding of decimal notation: An overview and refined results. Proceedings of the 28th Conference of the International Group for the Psychology of Mathematics Education, 4, 49-56."
    },
    {
        id: "math-004",
        domain: "mathematics",
        statement: "A negative times a negative equals a negative",
        intuitionReason: "Two negative things together seem 'extra negative,' and the rule seems arbitrary without context.",
        correctConcept: "A negative times a negative equals a positive. This can be understood through patterns, number lines, or the concept of 'reversing a reversal.'",
        prevalence: 65,
        gradeLevel: "6-8",
        difficulty: "medium",
        tags: ["integers", "multiplication", "negative numbers"],
        detailedExplanation: "Consider owing someone $5 three times: 3 x (-5) = -15 (you owe $15). Now consider removing 3 debts of $5 each: (-3) x (-5) = +15 (you're $15 richer). Alternatively, extending the multiplication pattern: 3x(-2)=-6, 2x(-2)=-4, 1x(-2)=-2, 0x(-2)=0, (-1)x(-2)=+2.",
        interventions: [
            "Use the debt model: removing a debt is gaining money",
            "Show pattern continuation in multiplication tables",
            "Physical model: walking backwards while facing backwards = moving forward"
        ],
        relatedMisconceptions: ["math-005"],
        citation: "Vlassis, J. (2004). Making sense of the minus sign or becoming flexible in 'negativity'. Learning and Instruction, 14(5), 469-484."
    },
    {
        id: "math-005",
        domain: "mathematics",
        statement: "The equal sign means 'the answer is'",
        intuitionReason: "Early arithmetic (3+2=__) positions the equal sign before a blank for the answer, reinforcing operational rather than relational understanding.",
        correctConcept: "The equal sign indicates that both sides have the same value. It expresses a relationship of equivalence, not a signal to compute.",
        prevalence: 70,
        gradeLevel: "K-5",
        difficulty: "hard",
        tags: ["equality", "algebra readiness", "operations"],
        detailedExplanation: "This operational view makes students struggle with equations like 8 = 3 + 5 or 3 + 4 = __ + 5. Relational understanding of equality is essential for algebraic thinking, where equations like 2x + 3 = 11 require seeing both sides as equivalent expressions.",
        interventions: [
            "Use balance scale models for equations",
            "Present equations in non-standard forms (answer on left, blanks in middle)",
            "Practice true/false equations: Is 5 + 3 = 4 + 4 true?"
        ],
        relatedMisconceptions: [],
        citation: "Knuth, E. J., Stephens, A. C., McNeil, N. M., & Alibali, M. W. (2006). Does understanding the equal sign matter? Evidence from solving equations. Journal for research in Mathematics Education, 37(4), 297-312."
    },

    // ============ COMPUTER SCIENCE ============
    {
        id: "cs-001",
        domain: "computer-science",
        statement: "Computers understand programming languages like humans understand English",
        intuitionReason: "Programming languages have words and grammar, suggesting computers 'read' code like we read text.",
        correctConcept: "Computers only execute binary machine code. Programming languages are translated (compiled or interpreted) into machine instructions. Computers don't 'understand' anything - they follow precise sequences of operations.",
        prevalence: 72,
        gradeLevel: "9-12",
        difficulty: "medium",
        tags: ["programming", "compilation", "machine code", "abstraction"],
        detailedExplanation: "High-level languages are for human convenience. Compilers and interpreters translate human-readable code into sequences of simple operations (add, compare, jump) that processors can execute. The 'understanding' happens in the translation layer, not the computer itself.",
        interventions: [
            "Show the compilation process from source to assembly to machine code",
            "Demonstrate how a simple line of code becomes many machine instructions",
            "Discuss why syntax errors exist (computer needs exact translation rules)"
        ],
        relatedMisconceptions: ["cs-002"],
        citation: "Sorva, J. (2013). Notional machines and introductory programming education. ACM Transactions on Computing Education, 13(2), 1-31."
    },
    {
        id: "cs-002",
        domain: "computer-science",
        statement: "Variables in programming are like variables in algebra",
        intuitionReason: "Both use letters to represent values, and math class teaches that x represents an unknown quantity.",
        correctConcept: "Programming variables are named storage locations that can change value. Unlike math variables (which represent fixed unknowns), programming variables can be reassigned. x = x + 1 is nonsense in math but common in programming.",
        prevalence: 78,
        gradeLevel: "9-12",
        difficulty: "medium",
        tags: ["variables", "assignment", "programming basics"],
        detailedExplanation: "In algebra, x = x + 1 has no solution. In programming, it means 'take the current value of x, add 1, and store the result back in x.' Programming '=' means assignment, not mathematical equality. This is why some languages use ':=' or '<-' for assignment.",
        interventions: [
            "Use box/container metaphors for variables",
            "Trace through code showing variable values changing",
            "Compare mathematical equations to programming assignments"
        ],
        relatedMisconceptions: ["cs-001", "math-005"],
        citation: "Kohn, T. (2017). Variable evaluation: An exploration of novice programmers' understanding and common misconceptions. Proceedings of the 2017 ACM SIGCSE Technical Symposium, 345-350."
    },
    {
        id: "cs-003",
        domain: "computer-science",
        statement: "Recursion creates infinite copies of a function",
        intuitionReason: "A function calling itself seems like it would create unlimited duplicates running simultaneously.",
        correctConcept: "Recursion uses a call stack where each call waits for the next to complete before resuming. Base cases stop the recursion, and each call uses memory for its local variables until it returns.",
        prevalence: 68,
        gradeLevel: "College",
        difficulty: "hard",
        tags: ["recursion", "call stack", "memory", "algorithms"],
        detailedExplanation: "Each recursive call creates a new stack frame with its own local variables, but only one call executes at a time. The others are paused, waiting for results. Without a base case, the stack grows until it overflows (stack overflow error), but finite recursion completes and unwinds.",
        interventions: [
            "Visualize the call stack growing and shrinking",
            "Trace simple recursive functions step by step",
            "Use physical stack of cards to model function calls"
        ],
        relatedMisconceptions: ["cs-004"],
        citation: "Dicheva, D., & Close, J. (1996). Mental models of recursion. Journal of Educational Computing Research, 14(1), 1-23."
    },
    {
        id: "cs-004",
        domain: "computer-science",
        statement: "AI systems like ChatGPT truly understand language and think like humans",
        intuitionReason: "Large language models produce coherent, contextual responses that seem to demonstrate understanding and reasoning.",
        correctConcept: "Current AI systems process patterns in data without genuine understanding. They predict likely next tokens based on training data, without consciousness, intentionality, or true comprehension of meaning.",
        prevalence: 65,
        gradeLevel: "9-12",
        difficulty: "hard",
        tags: ["AI", "machine learning", "language models", "consciousness"],
        detailedExplanation: "Large language models are sophisticated pattern matchers trained on vast text corpora. They learn statistical relationships between words and can generate plausible text, but they lack the grounded understanding that comes from embodied experience. They don't 'know' anything; they calculate probable outputs.",
        interventions: [
            "Demonstrate AI failures on novel reasoning tasks",
            "Explain the training process and statistical nature of predictions",
            "Discuss the Chinese Room thought experiment"
        ],
        relatedMisconceptions: ["cs-001"],
        citation: "Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots. Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency, 610-623."
    },

    // ============ PSYCHOLOGY ============
    {
        id: "psych-001",
        domain: "psychology",
        statement: "We only use 10% of our brains",
        intuitionReason: "This myth has been repeated in popular culture, and we're not consciously aware of all brain activity.",
        correctConcept: "Brain imaging shows activity throughout the brain during various tasks. Different regions have different functions, and damage to even small areas can cause significant deficits. We use all of our brains, just not all at once.",
        prevalence: 65,
        gradeLevel: "9-12",
        difficulty: "easy",
        tags: ["brain", "neuroscience", "myths"],
        detailedExplanation: "This myth may have originated from misinterpretation of early neuroscience research or from the fact that glial cells outnumber neurons. PET and fMRI scans show that even simple tasks activate many brain regions. Evolution would not maintain such a metabolically expensive organ if 90% were unused.",
        interventions: [
            "Show brain imaging during various activities",
            "Discuss effects of localized brain damage",
            "Explain evolutionary cost of maintaining brain tissue"
        ],
        relatedMisconceptions: ["psych-002"],
        citation: "Beyerstein, B. L. (1999). Whence cometh the myth that we only use 10% of our brains?. Mind myths: Exploring popular assumptions about the mind and brain, 1, 3-24."
    },
    {
        id: "psych-002",
        domain: "psychology",
        statement: "People are either left-brained (logical) or right-brained (creative)",
        intuitionReason: "People identify as 'logical' or 'creative' types, and the brain has two hemispheres with some functional differences.",
        correctConcept: "Both hemispheres work together in almost all tasks. While some functions are lateralized (like language in the left hemisphere for most people), creativity and logic involve distributed networks across both hemispheres.",
        prevalence: 72,
        gradeLevel: "9-12",
        difficulty: "easy",
        tags: ["brain", "hemispheres", "learning styles", "myths"],
        detailedExplanation: "This oversimplification emerged from studies of split-brain patients. While there are some hemispheric specializations, the corpus callosum normally allows constant communication between hemispheres. Complex tasks like creativity require integrated whole-brain activity.",
        interventions: [
            "Show brain imaging during creative AND logical tasks - both sides active",
            "Discuss corpus callosum function and hemisphere communication",
            "Examine the original split-brain research and how it was misinterpreted"
        ],
        relatedMisconceptions: ["psych-001", "psych-003"],
        citation: "Nielsen, J. A., Zielinski, B. A., Ferguson, M. A., Lainhart, J. E., & Anderson, J. S. (2013). An evaluation of the left-brain vs. right-brain hypothesis with resting state functional connectivity magnetic resonance imaging. PloS one, 8(8), e71275."
    },
    {
        id: "psych-003",
        domain: "psychology",
        statement: "Learning styles (visual, auditory, kinesthetic) determine how we should teach each student",
        intuitionReason: "People have preferences for how they like to receive information, and individualized instruction seems logical.",
        correctConcept: "Research consistently fails to support the idea that matching instruction to learning styles improves outcomes. Effective teaching depends on the content being taught, not the supposed learning style of the student.",
        prevalence: 89,
        gradeLevel: "College",
        difficulty: "hard",
        tags: ["learning", "education", "teaching methods", "myths"],
        detailedExplanation: "While people have preferences, no well-designed studies have shown that 'style-matched' instruction produces better learning than mismatched instruction. A visual diagram helps everyone learn anatomy, regardless of 'learning style.' The persistence of this myth diverts resources from evidence-based practices.",
        interventions: [
            "Review the research showing lack of evidence for learning styles",
            "Discuss content-appropriate teaching methods instead",
            "Distinguish between preference and effectiveness"
        ],
        relatedMisconceptions: ["psych-002"],
        citation: "Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles: Concepts and evidence. Psychological science in the public interest, 9(3), 105-119."
    },

    // ============ ECONOMICS ============
    {
        id: "econ-001",
        domain: "economics",
        statement: "Prices are determined by production costs",
        intuitionReason: "Businesses calculate costs and add markup, suggesting that costs drive prices.",
        correctConcept: "Prices are determined by supply and demand in markets. Production costs affect supply (whether firms can profitably produce), but consumers' willingness to pay determines what prices the market will bear.",
        prevalence: 70,
        gradeLevel: "9-12",
        difficulty: "medium",
        tags: ["supply and demand", "pricing", "markets"],
        detailedExplanation: "If costs determined prices, luxury goods couldn't command premiums far above production costs, and commodities with similar costs would have similar prices. In reality, diamond prices reflect scarcity and demand, while water (essential for life) is cheap due to abundance.",
        interventions: [
            "Compare prices of items with similar production costs but different demand",
            "Analyze why some costly-to-produce items sell cheaply",
            "Simulate market price discovery through supply-demand experiments"
        ],
        relatedMisconceptions: ["econ-002"],
        citation: "Siegfried, J. J., & Meszaros, B. T. (1998). Voluntary economics content standards for America's schools: Rationale and development. Journal of Economic Education, 29(2), 139-149."
    },
    {
        id: "econ-002",
        domain: "economics",
        statement: "Trade is zero-sum: one country's gain is another's loss",
        intuitionReason: "If I buy something from another country, my money leaves and goes to them, suggesting they gain what I lose.",
        correctConcept: "Trade creates value for both parties through specialization and comparative advantage. Both buyer and seller benefit - the buyer values the good more than the money, the seller values the money more than the good.",
        prevalence: 68,
        gradeLevel: "9-12",
        difficulty: "medium",
        tags: ["trade", "comparative advantage", "economics basics"],
        detailedExplanation: "Voluntary trade only occurs when both parties expect to benefit. Countries specialize in producing goods where they have comparative advantage, then trade for other goods. Total production increases through specialization, making both trading partners better off.",
        interventions: [
            "Simulate trade between students with different production capabilities",
            "Calculate total output with and without trade",
            "Discuss why people voluntarily trade (both expect to benefit)"
        ],
        relatedMisconceptions: ["econ-001"],
        citation: "Walstad, W. B., & Rebeck, K. (2002). Assessing the economic knowledge and economic opinions of adults. The Quarterly Review of Economics and Finance, 42(5), 921-935."
    },
    {
        id: "econ-003",
        domain: "economics",
        statement: "Saving money is always better than spending it",
        intuitionReason: "Personal finance advice emphasizes saving, and we're taught that spending is wasteful.",
        correctConcept: "While personal saving is often prudent, at the macroeconomic level, spending drives economic activity. The 'paradox of thrift' shows that if everyone saves simultaneously, total output falls, potentially leaving everyone worse off.",
        prevalence: 55,
        gradeLevel: "College",
        difficulty: "hard",
        tags: ["saving", "spending", "macroeconomics", "paradox of thrift"],
        detailedExplanation: "What's rational for an individual may not be optimal for the economy. Your spending is someone else's income. During recessions, increased saving can reduce aggregate demand, leading to job losses and lower income, which forces even more saving - a deflationary spiral.",
        interventions: [
            "Trace how spending becomes income for others",
            "Simulate the paradox of thrift in a classroom economy",
            "Distinguish between individual rationality and collective outcomes"
        ],
        relatedMisconceptions: ["econ-002"],
        citation: "Mankiw, N. G. (2020). Principles of economics. Cengage Learning."
    },

    // ============ EARTH SCIENCE ============
    {
        id: "earth-001",
        domain: "earth-science",
        statement: "Seasons are caused by Earth's distance from the Sun",
        intuitionReason: "Closer to a heat source means warmer, so Earth being closer to the Sun should cause summer.",
        correctConcept: "Seasons are caused by Earth's 23.5-degree axial tilt. When a hemisphere tilts toward the Sun, it receives more direct sunlight and experiences summer. Earth is actually closest to the Sun during Northern Hemisphere winter.",
        prevalence: 87,
        gradeLevel: "6-8",
        difficulty: "hard",
        tags: ["seasons", "astronomy", "Earth's tilt", "solar radiation"],
        detailedExplanation: "Earth's orbit is nearly circular, and distance variations are only about 3%. The axial tilt causes sunlight to hit different hemispheres at different angles throughout the year. When tilted toward the Sun, a hemisphere gets more hours of daylight and more direct rays.",
        interventions: [
            "Use a globe and lamp to demonstrate seasonal changes",
            "Note that Southern Hemisphere has opposite seasons",
            "Show that Earth is closest to Sun in January (Northern winter)"
        ],
        relatedMisconceptions: ["earth-002"],
        citation: "Atwood, R. K., & Atwood, V. A. (1996). Preservice elementary teachers' conceptions of the causes of seasons. Journal of Research in Science Teaching, 33(5), 553-563."
    },
    {
        id: "earth-002",
        domain: "earth-science",
        statement: "The Moon has a permanent 'dark side' that never gets sunlight",
        intuitionReason: "We only see one face of the Moon, so the other side must always be dark.",
        correctConcept: "The Moon rotates on its axis once per orbit (tidal locking), so we always see the same face. But the 'far side' receives just as much sunlight as the near side - it just always faces away from Earth.",
        prevalence: 75,
        gradeLevel: "6-8",
        difficulty: "easy",
        tags: ["Moon", "astronomy", "tidal locking", "lunar phases"],
        detailedExplanation: "Tidal locking means the Moon's rotation period equals its orbital period. As it orbits Earth, it rotates at the same rate, always keeping one face toward us. The far side experiences regular day/night cycles just like the near side - it's not perpetually dark.",
        interventions: [
            "Demonstrate tidal locking with a student walking around another while always facing them",
            "Show images of the far side in sunlight (from spacecraft)",
            "Track where sunlight falls on Moon during lunar phases"
        ],
        relatedMisconceptions: ["earth-001", "earth-003"],
        citation: "Trundle, K. C., Atwood, R. K., & Christopher, J. E. (2002). Preservice elementary teachers' conceptions of moon phases before and after instruction. Journal of Research in Science Teaching, 39(7), 633-658."
    },
    {
        id: "earth-003",
        domain: "earth-science",
        statement: "Continents don't move - they've always been in their current positions",
        intuitionReason: "Land seems solid and permanent; we can't feel any movement.",
        correctConcept: "Plate tectonics shows that continents ride on moving tectonic plates, shifting centimeters per year. Over millions of years, this movement has dramatically rearranged the continents. GPS measurements confirm ongoing movement.",
        prevalence: 52,
        gradeLevel: "6-8",
        difficulty: "medium",
        tags: ["plate tectonics", "geology", "continental drift"],
        detailedExplanation: "Wegener proposed continental drift in 1912, noting how Africa and South America fit together like puzzle pieces. Modern plate tectonics explains how convection in Earth's mantle drives plate movement. The Atlantic Ocean widens about 2.5 cm per year.",
        interventions: [
            "Show continental reconstructions at different geological times",
            "Match fossils and rock formations across now-separated continents",
            "Examine current GPS measurements of plate motion"
        ],
        relatedMisconceptions: ["earth-004"],
        citation: "Marques, L., & Thompson, D. (1997). Portuguese students' understanding at ages 10-11 and 14-15 of the origin and nature of the Earth and the development of life. Research in Science & Technological Education, 15(1), 29-51."
    },
    {
        id: "earth-004",
        domain: "earth-science",
        statement: "Dinosaurs and humans coexisted",
        intuitionReason: "Pop culture (movies, cartoons) frequently depicts humans and dinosaurs together.",
        correctConcept: "Non-avian dinosaurs went extinct about 66 million years ago. The first humans appeared only about 300,000 years ago. A gap of over 65 million years separates us from dinosaurs.",
        prevalence: 40,
        gradeLevel: "K-5",
        difficulty: "easy",
        tags: ["dinosaurs", "evolution", "geological time", "extinction"],
        detailedExplanation: "The Cretaceous-Paleogene extinction event eliminated non-avian dinosaurs 66 million years ago. Mammals existed then but were small. It took tens of millions of years for mammals to diversify and eventually evolve into primates and then humans.",
        interventions: [
            "Create scaled timelines showing vast gaps between events",
            "Discuss what fossils are found in the same vs. different rock layers",
            "Explore the K-Pg boundary evidence"
        ],
        relatedMisconceptions: ["earth-003"],
        citation: "Trend, R. D. (2001). Deep time framework: A preliminary study of UK primary teachers' conceptions of geological time and perceptions of geoscience. Journal of Research in Science Teaching, 38(2), 191-221."
    },

    // ============ CHEMISTRY ============
    {
        id: "chem-001",
        domain: "chemistry",
        statement: "Chemical reactions destroy atoms",
        intuitionReason: "Materials seem to disappear when burned or dissolved, suggesting atoms are destroyed.",
        correctConcept: "Atoms are conserved in chemical reactions - they are rearranged, not created or destroyed. The total mass of reactants equals the total mass of products (conservation of mass).",
        prevalence: 68,
        gradeLevel: "6-8",
        difficulty: "medium",
        tags: ["conservation of mass", "reactions", "atoms"],
        detailedExplanation: "When wood burns, it combines with oxygen and releases carbon dioxide and water vapor into the air. The atoms aren't destroyed - they've just formed gases that dispersed. Weighing all reactants and products (including gases) shows mass is conserved.",
        interventions: [
            "Burn steel wool and show mass increases (oxygen added)",
            "Balance chemical equations to show atom conservation",
            "Use molecular models to rearrange atoms in reactions"
        ],
        relatedMisconceptions: ["chem-002"],
        citation: "Stavy, R. (1990). Children's conception of changes in the state of matter: From liquid (or solid) to gas. Journal of Research in Science Teaching, 27(3), 247-266."
    },
    {
        id: "chem-002",
        domain: "chemistry",
        statement: "Atoms in a solid are motionless",
        intuitionReason: "Solids don't flow or change shape like liquids, so their particles must be stationary.",
        correctConcept: "Atoms in all states of matter are in constant motion. In solids, atoms vibrate in place around fixed positions. Temperature reflects this motion - even cold objects have atomic vibration.",
        prevalence: 72,
        gradeLevel: "6-8",
        difficulty: "medium",
        tags: ["states of matter", "atomic motion", "temperature"],
        detailedExplanation: "Absolute zero (0 Kelvin) is the theoretical temperature at which all motion stops, but it can never be reached. At room temperature, atoms in solids vibrate rapidly around equilibrium positions, held by interatomic forces that prevent flowing like liquids.",
        interventions: [
            "Show animations of atomic vibration in solids",
            "Discuss absolute zero and what temperature really measures",
            "Compare vibration rates at different temperatures"
        ],
        relatedMisconceptions: ["chem-001", "chem-003"],
        citation: "Lee, O., Eichinger, D. C., Anderson, C. W., Berkheimer, G. D., & Blakeslee, T. D. (1993). Changing middle school students' conceptions of matter and molecules. Journal of Research in Science Teaching, 30(3), 249-270."
    },
    {
        id: "chem-003",
        domain: "chemistry",
        statement: "Acids can dissolve anything",
        intuitionReason: "Movies show acids dissolving metal, bone, and concrete, suggesting unlimited dissolving power.",
        correctConcept: "Different acids react with different materials. Some strong acids are stored in glass or plastic containers that they don't react with. Hydrofluoric acid dissolves glass but not some plastics.",
        prevalence: 58,
        gradeLevel: "9-12",
        difficulty: "easy",
        tags: ["acids", "reactions", "chemistry safety"],
        detailedExplanation: "Chemical reactions require compatible reactants. Sulfuric acid is stored in glass because it doesn't react with silicon dioxide. Hydrofluoric acid attacks glass (used to etch it) but is stored in plastic. No acid dissolves everything.",
        interventions: [
            "Test different acids on different materials",
            "Discuss what containers different acids are stored in and why",
            "Examine the chemistry of specific acid-material reactions"
        ],
        relatedMisconceptions: ["chem-001"],
        citation: "Nakhleh, M. B. (1992). Why some students don't learn chemistry: Chemical misconceptions. Journal of Chemical Education, 69(3), 191."
    }
];

// Domain configuration
const domains = [
    { id: "all", name: "All Domains", icon: "" },
    { id: "physics", name: "Physics", icon: "" },
    { id: "biology", name: "Biology", icon: "" },
    { id: "chemistry", name: "Chemistry", icon: "" },
    { id: "mathematics", name: "Mathematics", icon: "" },
    { id: "economics", name: "Economics", icon: "" },
    { id: "computer-science", name: "Computer Science", icon: "" },
    { id: "psychology", name: "Psychology", icon: "" },
    { id: "earth-science", name: "Earth Science", icon: "" }
];

// State management
let currentDomain = "all";
let currentGrade = "all";
let currentSort = "prevalence";
let searchQuery = "";
let myList = JSON.parse(localStorage.getItem("misconceptionList") || "[]");

// DOM Elements
const domainTabsContainer = document.getElementById("domainTabs");
const cardsGrid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const gradeFilter = document.getElementById("gradeFilter");
const sortBy = document.getElementById("sortBy");
const myListBtn = document.getElementById("myListBtn");
const myListCount = document.getElementById("myListCount");
const myListModal = document.getElementById("myListModal");
const modalClose = document.getElementById("modalClose");
const myListBody = document.getElementById("myListBody");
const clearListBtn = document.getElementById("clearListBtn");
const exportListBtn = document.getElementById("exportListBtn");
const resultsInfo = document.getElementById("resultsInfo");

// Initialize
function init() {
    renderDomainTabs();
    renderCards();
    updateMyListCount();
    setupEventListeners();
}

// Render domain tabs
function renderDomainTabs() {
    domainTabsContainer.innerHTML = domains.map(domain => {
        const count = domain.id === "all"
            ? misconceptionsData.length
            : misconceptionsData.filter(m => m.domain === domain.id).length;

        return `
            <button class="domain-tab ${domain.id === currentDomain ? 'active' : ''}"
                    data-domain="${domain.id}">
                ${domain.name}
                <span class="count">${count}</span>
            </button>
        `;
    }).join("");

    // Add click handlers
    domainTabsContainer.querySelectorAll(".domain-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            currentDomain = tab.dataset.domain;
            renderDomainTabs();
            renderCards();
        });
    });
}

// Filter and sort misconceptions
function getFilteredMisconceptions() {
    let filtered = [...misconceptionsData];

    // Filter by domain
    if (currentDomain !== "all") {
        filtered = filtered.filter(m => m.domain === currentDomain);
    }

    // Filter by grade level
    if (currentGrade !== "all") {
        filtered = filtered.filter(m => m.gradeLevel === currentGrade);
    }

    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(m =>
            m.statement.toLowerCase().includes(query) ||
            m.correctConcept.toLowerCase().includes(query) ||
            m.tags.some(tag => tag.toLowerCase().includes(query)) ||
            m.domain.toLowerCase().includes(query)
        );
    }

    // Sort
    switch (currentSort) {
        case "prevalence":
            filtered.sort((a, b) => b.prevalence - a.prevalence);
            break;
        case "difficulty":
            const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
            filtered.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
            break;
        case "domain":
            filtered.sort((a, b) => a.domain.localeCompare(b.domain));
            break;
    }

    return filtered;
}

// Render cards
function renderCards() {
    const filtered = getFilteredMisconceptions();

    // Update results info
    resultsInfo.textContent = `Showing ${filtered.length} misconception${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
        cardsGrid.innerHTML = `
            <div class="no-results">
                <h3>No misconceptions found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    cardsGrid.innerHTML = filtered.map(m => {
        const isInList = myList.includes(m.id);
        const difficultyLabels = { easy: "Easy to correct", medium: "Medium difficulty", hard: "Hard to correct" };

        return `
            <div class="card" data-id="${m.id}" data-domain="${m.domain}">
                <div class="card-header">
                    <span class="domain-label">${m.domain.replace("-", " ")}</span>
                    <span class="difficulty">
                        <span class="difficulty-icon difficulty-${m.difficulty}">${m.difficulty[0].toUpperCase()}</span>
                        ${difficultyLabels[m.difficulty]}
                    </span>
                </div>
                <div class="card-body">
                    <div class="misconception-statement">"${m.statement}"</div>
                    <div class="intuition-reason">Why it seems true: ${m.intuitionReason}</div>
                    <div class="correct-concept">
                        <strong>Correct:</strong> ${m.correctConcept}
                    </div>
                    <div class="card-meta">
                        ${m.prevalence ? `<span class="meta-item"><strong>${m.prevalence}%</strong> of students</span>` : ''}
                        <span class="meta-item">Common in: <strong>${m.gradeLevel}</strong></span>
                    </div>
                    <div class="tags">
                        ${m.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                    <div class="card-actions">
                        <button class="expand-btn" data-id="${m.id}">
                            Show details and interventions
                        </button>
                        <button class="add-to-list-btn ${isInList ? 'added' : ''}" data-id="${m.id}">
                            ${isInList ? 'In My List' : 'Add to My List'}
                        </button>
                    </div>
                </div>
                <div class="expanded-content" id="expanded-${m.id}">
                    <div class="expanded-section">
                        <h4>Detailed Explanation</h4>
                        <p>${m.detailedExplanation}</p>
                    </div>
                    <div class="expanded-section">
                        <h4>Suggested Interventions</h4>
                        <ul>
                            ${m.interventions.map(i => `<li>${i}</li>`).join("")}
                        </ul>
                    </div>
                    ${m.relatedMisconceptions.length > 0 ? `
                        <div class="expanded-section">
                            <h4>Related Misconceptions</h4>
                            <div class="related-misconceptions">
                                ${m.relatedMisconceptions.map(relId => {
                                    const related = misconceptionsData.find(x => x.id === relId);
                                    return related ? `<a class="related-link" data-id="${relId}">${related.statement.substring(0, 40)}...</a>` : '';
                                }).join("")}
                            </div>
                        </div>
                    ` : ''}
                    <div class="expanded-section">
                        <p class="citation">Source: ${m.citation}</p>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // Add event listeners to cards
    setupCardListeners();
}

// Setup card event listeners
function setupCardListeners() {
    // Expand buttons
    document.querySelectorAll(".expand-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const card = document.querySelector(`.card[data-id="${id}"]`);
            card.classList.toggle("expanded");
            btn.textContent = card.classList.contains("expanded")
                ? "Hide details"
                : "Show details and interventions";
        });
    });

    // Add to list buttons
    document.querySelectorAll(".add-to-list-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            toggleListItem(id);
            btn.classList.toggle("added");
            btn.textContent = btn.classList.contains("added") ? "In My List" : "Add to My List";
        });
    });

    // Related misconception links
    document.querySelectorAll(".related-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = link.dataset.id;
            const related = misconceptionsData.find(m => m.id === id);
            if (related) {
                // Reset filters and search for this misconception
                currentDomain = related.domain;
                searchInput.value = related.statement.substring(0, 30);
                searchQuery = searchInput.value;
                renderDomainTabs();
                renderCards();
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Toggle item in my list
function toggleListItem(id) {
    const index = myList.indexOf(id);
    if (index === -1) {
        myList.push(id);
    } else {
        myList.splice(index, 1);
    }
    localStorage.setItem("misconceptionList", JSON.stringify(myList));
    updateMyListCount();
}

// Update my list count
function updateMyListCount() {
    myListCount.textContent = myList.length;
}

// Render my list modal
function renderMyList() {
    if (myList.length === 0) {
        myListBody.innerHTML = `
            <div class="empty-list">
                <p>Your list is empty.</p>
                <p>Click "Add to My List" on misconception cards to save them here.</p>
            </div>
        `;
        return;
    }

    myListBody.innerHTML = myList.map(id => {
        const m = misconceptionsData.find(x => x.id === id);
        if (!m) return '';
        return `
            <div class="my-list-item">
                <div class="my-list-item-text">
                    <div class="my-list-item-domain">${m.domain.replace("-", " ")}</div>
                    <div>${m.statement}</div>
                </div>
                <button class="remove-btn" data-id="${id}">Remove</button>
            </div>
        `;
    }).join("");

    // Add remove handlers
    myListBody.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            toggleListItem(btn.dataset.id);
            renderMyList();
            renderCards(); // Update card buttons
        });
    });
}

// Export list as JSON
function exportList() {
    const exportData = myList.map(id => misconceptionsData.find(m => m.id === id)).filter(Boolean);
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-misconceptions-list.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderCards();
    });

    // Grade filter
    gradeFilter.addEventListener("change", (e) => {
        currentGrade = e.target.value;
        renderCards();
    });

    // Sort by
    sortBy.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderCards();
    });

    // My list button
    myListBtn.addEventListener("click", () => {
        renderMyList();
        myListModal.classList.add("active");
    });

    // Modal close
    modalClose.addEventListener("click", () => {
        myListModal.classList.remove("active");
    });

    // Click outside modal to close
    myListModal.addEventListener("click", (e) => {
        if (e.target === myListModal) {
            myListModal.classList.remove("active");
        }
    });

    // Clear list button
    clearListBtn.addEventListener("click", () => {
        myList = [];
        localStorage.setItem("misconceptionList", JSON.stringify(myList));
        updateMyListCount();
        renderMyList();
        renderCards();
    });

    // Export list button
    exportListBtn.addEventListener("click", exportList);

    // Keyboard shortcut to close modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && myListModal.classList.contains("active")) {
            myListModal.classList.remove("active");
        }
    });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", init);
