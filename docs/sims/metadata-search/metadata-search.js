// MicroSim Metadata Search - Interactive Database Filter
// Mock data representing a collection of educational MicroSims

const microSimData = [
    {
        id: 1,
        title: "Ohm's Law Simulator",
        description: "Interactive circuit simulator demonstrating the relationship between voltage, current, and resistance. Students can adjust sliders to see real-time changes in an animated circuit.",
        subject: "Physics",
        gradeLevel: "9-12",
        library: "p5.js",
        bloomLevel: "Apply",
        qualityScore: 95,
        author: "Dr. Sarah Chen",
        dateCreated: "2024-03-15",
        concepts: ["Ohm's Law", "Electric Circuits", "Voltage", "Current", "Resistance"],
        tags: ["interactive", "physics", "electricity", "simulation"],
        url: "/sims/ohms-law-simulator/"
    },
    {
        id: 2,
        title: "Learning Dependency Network",
        description: "Visualize concept prerequisites and learning pathways in a course curriculum. Nodes represent concepts while edges show dependencies.",
        subject: "Computer Science",
        gradeLevel: "Undergraduate",
        library: "vis-network",
        bloomLevel: "Analyze",
        qualityScore: 92,
        author: "Prof. Michael Torres",
        dateCreated: "2024-02-28",
        concepts: ["Graph Theory", "Prerequisites", "Curriculum Design", "Learning Paths"],
        tags: ["network", "visualization", "curriculum", "dependencies"],
        url: "/sims/learning-dependency-network/"
    },
    {
        id: 3,
        title: "Bloom's Taxonomy Pyramid",
        description: "Interactive pyramid showing the six cognitive levels from Remember to Create. Hover over each level to see action verbs and examples.",
        subject: "Computer Science",
        gradeLevel: "Undergraduate",
        library: "p5.js",
        bloomLevel: "Understand",
        qualityScore: 88,
        author: "Dan McCreary",
        dateCreated: "2024-01-20",
        concepts: ["Bloom's Taxonomy", "Cognitive Levels", "Learning Objectives"],
        tags: ["education", "taxonomy", "cognitive", "interactive"],
        url: "/sims/bloom-taxonomy/"
    },
    {
        id: 4,
        title: "Sorting Algorithm Race",
        description: "Watch different sorting algorithms compete in real-time. Compare bubble sort, quicksort, merge sort, and more on randomized data.",
        subject: "Computer Science",
        gradeLevel: "9-12",
        library: "p5.js",
        bloomLevel: "Analyze",
        qualityScore: 91,
        author: "Alex Johnson",
        dateCreated: "2024-04-05",
        concepts: ["Sorting Algorithms", "Time Complexity", "Algorithm Comparison"],
        tags: ["algorithms", "sorting", "comparison", "animation"],
        url: "/sims/sorting-algorithm-race/"
    },
    {
        id: 5,
        title: "Probability Tree Explorer",
        description: "Build and explore probability trees for compound events. Calculate probabilities along different paths interactively.",
        subject: "Mathematics",
        gradeLevel: "6-8",
        library: "D3.js",
        bloomLevel: "Apply",
        qualityScore: 85,
        author: "Dr. Emily Watson",
        dateCreated: "2024-03-01",
        concepts: ["Probability", "Tree Diagrams", "Compound Events", "Statistics"],
        tags: ["probability", "math", "trees", "statistics"],
        url: "/sims/probability-tree-explorer/"
    },
    {
        id: 6,
        title: "Cell Division Animation",
        description: "Step-by-step visualization of mitosis and meiosis. Control the animation speed and pause at any phase to study cell structures.",
        subject: "Biology",
        gradeLevel: "9-12",
        library: "p5.js",
        bloomLevel: "Remember",
        qualityScore: 79,
        author: "Dr. Rachel Kim",
        dateCreated: "2024-02-14",
        concepts: ["Mitosis", "Meiosis", "Cell Division", "Chromosomes"],
        tags: ["biology", "cells", "animation", "mitosis"],
        url: "/sims/cell-division/"
    },
    {
        id: 7,
        title: "Climate Data Dashboard",
        description: "Explore historical climate data through interactive charts. Compare temperature trends, precipitation, and CO2 levels across decades.",
        subject: "Data Science",
        gradeLevel: "Undergraduate",
        library: "Chart.js",
        bloomLevel: "Evaluate",
        qualityScore: 87,
        author: "Dr. James Liu",
        dateCreated: "2024-01-30",
        concepts: ["Data Visualization", "Climate Change", "Time Series", "Trend Analysis"],
        tags: ["climate", "charts", "data", "environment"],
        url: "/sims/climate-dashboard/"
    },
    {
        id: 8,
        title: "Fraction Builder",
        description: "Manipulate visual fraction models to understand equivalence, addition, and comparison. Drag and drop pieces to build fractions.",
        subject: "Mathematics",
        gradeLevel: "3-5",
        library: "p5.js",
        bloomLevel: "Understand",
        qualityScore: 93,
        author: "Maria Garcia",
        dateCreated: "2024-04-10",
        concepts: ["Fractions", "Equivalence", "Addition", "Number Sense"],
        tags: ["fractions", "elementary", "visual", "manipulative"],
        url: "/sims/fraction-builder/"
    },
    {
        id: 9,
        title: "Molecular Structure Viewer",
        description: "Rotate and examine 3D molecular structures. View bond angles, atom types, and molecular geometry for common compounds.",
        subject: "Chemistry",
        gradeLevel: "9-12",
        library: "Three.js",
        bloomLevel: "Understand",
        qualityScore: 82,
        author: "Dr. Peter Zhang",
        dateCreated: "2024-03-22",
        concepts: ["Molecular Geometry", "Chemical Bonds", "3D Structure", "VSEPR"],
        tags: ["chemistry", "3d", "molecules", "structure"],
        url: "/sims/molecular-viewer/"
    },
    {
        id: 10,
        title: "Geographic Data Map",
        description: "Interactive map showing population density, economic indicators, and demographic data by region. Zoom and click for details.",
        subject: "Data Science",
        gradeLevel: "Undergraduate",
        library: "Leaflet",
        bloomLevel: "Analyze",
        qualityScore: 84,
        author: "Dr. Anna Schmidt",
        dateCreated: "2024-02-08",
        concepts: ["Geographic Data", "Maps", "Demographics", "Data Visualization"],
        tags: ["maps", "geography", "data", "demographics"],
        url: "/sims/geographic-map/"
    },
    {
        id: 11,
        title: "Pendulum Wave Machine",
        description: "Simulate the mesmerizing pendulum wave effect. Adjust pendulum lengths and count to create beautiful harmonic patterns.",
        subject: "Physics",
        gradeLevel: "6-8",
        library: "p5.js",
        bloomLevel: "Apply",
        qualityScore: 90,
        author: "Dr. Robert Brown",
        dateCreated: "2024-04-18",
        concepts: ["Harmonic Motion", "Pendulums", "Wave Patterns", "Period"],
        tags: ["physics", "waves", "pendulum", "patterns"],
        url: "/sims/pendulum-wave/"
    },
    {
        id: 12,
        title: "Neural Network Playground",
        description: "Build and train simple neural networks visually. Adjust layers, neurons, and watch the network learn classification tasks.",
        subject: "Computer Science",
        gradeLevel: "Graduate",
        library: "D3.js",
        bloomLevel: "Create",
        qualityScore: 96,
        author: "Prof. David Lee",
        dateCreated: "2024-01-15",
        concepts: ["Neural Networks", "Machine Learning", "Deep Learning", "Classification"],
        tags: ["ai", "neural", "machine-learning", "deep-learning"],
        url: "/sims/neural-network/"
    },
    {
        id: 13,
        title: "Color Pattern Matching",
        description: "Early childhood game for recognizing and extending color patterns. Drag colored blocks to complete sequences.",
        subject: "Mathematics",
        gradeLevel: "K-2",
        library: "p5.js",
        bloomLevel: "Remember",
        qualityScore: 88,
        author: "Lisa Anderson",
        dateCreated: "2024-03-08",
        concepts: ["Patterns", "Colors", "Sequences", "Matching"],
        tags: ["patterns", "colors", "early-childhood", "game"],
        url: "/sims/color-patterns/"
    },
    {
        id: 14,
        title: "Ecosystem Food Web",
        description: "Explore predator-prey relationships in an interactive food web. Add or remove species to see ecosystem effects.",
        subject: "Biology",
        gradeLevel: "6-8",
        library: "vis-network",
        bloomLevel: "Evaluate",
        qualityScore: 86,
        author: "Dr. Jennifer White",
        dateCreated: "2024-02-22",
        concepts: ["Food Webs", "Ecosystems", "Predator-Prey", "Biodiversity"],
        tags: ["ecology", "food-web", "ecosystem", "biology"],
        url: "/sims/food-web/"
    },
    {
        id: 15,
        title: "Bridge Engineering Challenge",
        description: "Design and test virtual bridges under load. Experiment with different materials, truss patterns, and structural designs.",
        subject: "Engineering",
        gradeLevel: "9-12",
        library: "p5.js",
        bloomLevel: "Create",
        qualityScore: 89,
        author: "Prof. Thomas Miller",
        dateCreated: "2024-04-25",
        concepts: ["Structural Engineering", "Forces", "Materials", "Design"],
        tags: ["engineering", "bridges", "design", "structures"],
        url: "/sims/bridge-challenge/"
    }
];

// Popular tags for the tag cloud
const popularTags = [
    "interactive", "simulation", "visualization", "physics", "math",
    "algorithms", "biology", "data", "animation", "patterns"
];

// DOM Elements
const subjectSelect = document.getElementById('subject');
const gradeSelect = document.getElementById('grade');
const librarySelect = document.getElementById('library');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('quality-value');
const sortSelect = document.getElementById('sort');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsGrid = document.getElementById('results-grid');
const resultCount = document.getElementById('result-count');
const tagCloud = document.getElementById('tag-cloud');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalViewBtn = document.getElementById('modal-view-btn');

let selectedTag = null;
let currentMicroSim = null;

// Initialize the application
function init() {
    renderTagCloud();
    applyFilters();
    setupEventListeners();
}

// Render the tag cloud
function renderTagCloud() {
    tagCloud.innerHTML = popularTags.map(tag =>
        `<span class="tag" data-tag="${tag}">${tag}</span>`
    ).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Filter change events - real-time filtering
    subjectSelect.addEventListener('change', applyFilters);
    gradeSelect.addEventListener('change', applyFilters);
    librarySelect.addEventListener('change', applyFilters);
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value;
        applyFilters();
    });
    sortSelect.addEventListener('change', applyFilters);

    // Checkbox change events
    document.querySelectorAll('.checkbox-group input').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Tag cloud clicks
    tagCloud.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            const tag = e.target.dataset.tag;
            if (selectedTag === tag) {
                selectedTag = null;
                e.target.classList.remove('active');
            } else {
                document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                selectedTag = tag;
                e.target.classList.add('active');
            }
            applyFilters();
        }
    });

    // Button clicks
    searchBtn.addEventListener('click', applyFilters);
    resetBtn.addEventListener('click', resetFilters);

    // Modal events
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    modalViewBtn.addEventListener('click', () => {
        if (currentMicroSim && currentMicroSim.url) {
            window.open(currentMicroSim.url, '_blank');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Get selected Bloom's levels
function getSelectedBloomLevels() {
    const checkboxes = document.querySelectorAll('.checkbox-group input:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Apply filters and render results
function applyFilters() {
    const filters = {
        subject: subjectSelect.value,
        grade: gradeSelect.value,
        library: librarySelect.value,
        bloomLevels: getSelectedBloomLevels(),
        minQuality: parseInt(qualitySlider.value),
        tag: selectedTag
    };

    let results = microSimData.filter(sim => {
        // Subject filter
        if (filters.subject && sim.subject !== filters.subject) return false;

        // Grade filter
        if (filters.grade && sim.gradeLevel !== filters.grade) return false;

        // Library filter
        if (filters.library && sim.library !== filters.library) return false;

        // Bloom's level filter
        if (filters.bloomLevels.length > 0 && !filters.bloomLevels.includes(sim.bloomLevel)) return false;

        // Quality filter
        if (sim.qualityScore < filters.minQuality) return false;

        // Tag filter
        if (filters.tag && !sim.tags.includes(filters.tag)) return false;

        return true;
    });

    // Sort results
    const sortValue = sortSelect.value;
    results.sort((a, b) => {
        switch (sortValue) {
            case 'quality-desc':
                return b.qualityScore - a.qualityScore;
            case 'quality-asc':
                return a.qualityScore - b.qualityScore;
            case 'name-asc':
                return a.title.localeCompare(b.title);
            case 'name-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    renderResults(results);
}

// Reset all filters
function resetFilters() {
    subjectSelect.value = '';
    gradeSelect.value = '';
    librarySelect.value = '';
    qualitySlider.value = 0;
    qualityValue.textContent = '0';
    sortSelect.value = 'quality-desc';
    selectedTag = null;

    // Reset Bloom's checkboxes to all checked
    document.querySelectorAll('.checkbox-group input').forEach(cb => {
        cb.checked = true;
    });

    // Clear active tags
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));

    applyFilters();
}

// Render the results grid
function renderResults(results) {
    resultCount.textContent = results.length;

    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="empty-state">
                <div class="icon">&#128269;</div>
                <h3>No results match your criteria</h3>
                <p>Try adjusting your filters or reset to see all MicroSims.</p>
            </div>
        `;
        return;
    }

    resultsGrid.innerHTML = results.map(sim => {
        const qualityClass = sim.qualityScore >= 90 ? 'quality-high' :
                            sim.qualityScore >= 70 ? 'quality-medium' : 'quality-low';

        const icon = getLibraryIcon(sim.library);

        return `
            <div class="result-card" data-id="${sim.id}">
                <div class="card-thumbnail" style="background: ${getGradient(sim.subject)}">
                    <span class="icon">${icon}</span>
                    <span class="quality-badge ${qualityClass}">${sim.qualityScore}%</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${sim.title}</h3>
                    <p class="card-description">${sim.description}</p>
                    <div class="card-tags">
                        <span class="card-tag bloom">${sim.bloomLevel}</span>
                        <span class="card-tag library">${sim.library}</span>
                        <span class="card-tag">${sim.gradeLevel}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to cards
    document.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const sim = microSimData.find(s => s.id === id);
            if (sim) openModal(sim);
        });
    });
}

// Get gradient based on subject
function getGradient(subject) {
    const gradients = {
        'Physics': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Mathematics': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'Computer Science': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'Biology': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'Chemistry': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'Data Science': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        'Engineering': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    };
    return gradients[subject] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

// Get icon based on library
function getLibraryIcon(library) {
    const icons = {
        'p5.js': '&#127912;',        // Art palette
        'vis-network': '&#128300;',   // Network
        'Chart.js': '&#128200;',      // Chart
        'D3.js': '&#128202;',         // Bar chart
        'Three.js': '&#127922;',      // 3D cube
        'Plotly': '&#128201;',        // Trend chart
        'Leaflet': '&#127758;'        // Globe
    };
    return icons[library] || '&#128187;';
}

// Open modal with full metadata
function openModal(sim) {
    currentMicroSim = sim;
    modalTitle.textContent = sim.title;

    const qualityClass = sim.qualityScore >= 90 ? 'quality-high' :
                        sim.qualityScore >= 70 ? 'quality-medium' : 'quality-low';

    modalBody.innerHTML = `
        <div class="metadata-row">
            <span class="metadata-label">Description:</span>
            <span class="metadata-value">${sim.description}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Subject Area:</span>
            <span class="metadata-value">${sim.subject}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Grade Level:</span>
            <span class="metadata-value">${sim.gradeLevel}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">JS Library:</span>
            <span class="metadata-value">${sim.library}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Bloom's Level:</span>
            <span class="metadata-value">${sim.bloomLevel}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Quality Score:</span>
            <span class="metadata-value ${qualityClass}">${sim.qualityScore}%</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Author:</span>
            <span class="metadata-value">${sim.author}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Date Created:</span>
            <span class="metadata-value">${sim.dateCreated}</span>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Concepts:</span>
            <div class="metadata-value metadata-tags">
                ${sim.concepts.map(c => `<span class="card-tag">${c}</span>`).join('')}
            </div>
        </div>
        <div class="metadata-row">
            <span class="metadata-label">Tags:</span>
            <div class="metadata-value metadata-tags">
                ${sim.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    currentMicroSim = null;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);
