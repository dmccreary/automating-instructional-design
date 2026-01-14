// Relationship Graph Types MicroSim
// Interactive vis-network visualization showing different edge relationship types
// Click on legend items to highlight edges of that type

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let network = null;
let nodes = null;
let edges = null;

// Edge type definitions with styling
const edgeTypes = {
    prerequisite: {
        name: 'Prerequisites',
        color: '#2980B9',
        dashes: false,
        arrows: { to: { enabled: true, scaleFactor: 1 } },
        width: 2,
        description: 'Concept A must be learned before Concept B'
    },
    related: {
        name: 'Related to',
        color: '#7F8C8D',
        dashes: [5, 5],
        arrows: { to: { enabled: false } },
        width: 2,
        description: 'Concepts share common themes or overlap'
    },
    contrasts: {
        name: 'Contrasts with',
        color: '#E74C3C',
        dashes: false,
        arrows: { to: { enabled: false } },
        width: 2,
        description: 'Concepts are opposites or differ significantly'
    },
    exemplifies: {
        name: 'Exemplifies',
        color: '#27AE60',
        dashes: [2, 4],
        arrows: { to: { enabled: true, scaleFactor: 1 } },
        width: 2,
        description: 'Concept A is an example or instance of Concept B'
    },
    influences: {
        name: 'Influences',
        color: '#9B59B6',
        dashes: false,
        arrows: { to: { enabled: true, scaleFactor: 1, type: 'arrow' } },
        width: 2,
        smooth: { type: 'curvedCW', roundness: 0.3 },
        description: 'Concept A affects or shapes Concept B'
    }
};

// Node definitions
const nodeData = [
    { id: 1, label: 'Learning\nObjectives', x: -200, y: -100 },
    { id: 2, label: 'Bloom\'s\nTaxonomy', x: 0, y: -150 },
    { id: 3, label: 'Assessment', x: 200, y: -100 },
    { id: 4, label: 'Summative\nAssessment', x: 300, y: 50 },
    { id: 5, label: 'Formative\nAssessment', x: 150, y: 100 },
    { id: 6, label: 'Mastery\nLearning', x: -100, y: 100 },
    { id: 7, label: 'Traditional\nInstruction', x: -250, y: 50 },
    { id: 8, label: 'Instructional\nDesign', x: 0, y: 0 }
];

// Edge definitions with types
const edgeData = [
    { from: 1, to: 8, type: 'prerequisite', label: 'prerequisite' },
    { from: 2, to: 1, type: 'influences', label: 'influences' },
    { from: 8, to: 3, type: 'prerequisite', label: 'prerequisite' },
    { from: 4, to: 3, type: 'exemplifies', label: 'exemplifies' },
    { from: 5, to: 3, type: 'exemplifies', label: 'exemplifies' },
    { from: 4, to: 5, type: 'contrasts', label: 'contrasts with' },
    { from: 6, to: 7, type: 'contrasts', label: 'contrasts with' },
    { from: 2, to: 3, type: 'related', label: 'related to' },
    { from: 5, to: 6, type: 'influences', label: 'influences' },
    { from: 1, to: 2, type: 'related', label: 'related to' }
];

// Currently highlighted edge type
let highlightedType = null;

// ===========================================
// ENVIRONMENT DETECTION
// ===========================================
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ===========================================
// INFO PANEL MANAGEMENT
// ===========================================
function updateInfoPanel(type) {
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    if (type && edgeTypes[type]) {
        const edgeType = edgeTypes[type];
        titleEl.textContent = edgeType.name;
        textEl.innerHTML = `
            <p>${edgeType.description}</p>
            <p class="info-hint"><strong>Example in graph:</strong> Look at the highlighted edges to see this relationship type in context.</p>
        `;
    } else {
        resetInfoPanel();
    }
}

function resetInfoPanel() {
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = 'Relationship Types';
    textEl.innerHTML = `
        <p>This visualization demonstrates different types of relationships that can be represented in knowledge graphs.</p>
        <p><strong>Click</strong> on a legend item to highlight edges of that type.</p>
        <p><strong>Click</strong> on empty space to reset the view.</p>
    `;
}

// ===========================================
// EDGE HIGHLIGHTING
// ===========================================
function highlightEdgeType(type) {
    highlightedType = type;

    const updatedEdges = edgeData.map((edge, index) => {
        const edgeType = edgeTypes[edge.type];
        const isHighlighted = edge.type === type;
        const isDimmed = type !== null && !isHighlighted;

        return {
            id: index,
            color: {
                color: isDimmed ? '#ddd' : edgeType.color,
                highlight: edgeType.color,
                hover: edgeType.color
            },
            width: isHighlighted ? 4 : (isDimmed ? 1 : 2),
            font: {
                color: isDimmed ? '#ccc' : '#333',
                size: 11,
                strokeWidth: 3,
                strokeColor: '#fff'
            }
        };
    });

    edges.update(updatedEdges);

    // Also dim/highlight nodes
    const updatedNodes = nodeData.map(node => {
        // Find edges connected to this node
        const connectedEdges = edgeData.filter(e =>
            (e.from === node.id || e.to === node.id) && e.type === type
        );
        const isConnected = type === null || connectedEdges.length > 0;

        return {
            id: node.id,
            opacity: isConnected ? 1 : 0.3,
            font: {
                color: isConnected ? '#333' : '#bbb'
            }
        };
    });

    nodes.update(updatedNodes);

    updateInfoPanel(type);
}

function resetHighlight() {
    highlightedType = null;

    const updatedEdges = edgeData.map((edge, index) => {
        const edgeType = edgeTypes[edge.type];
        return {
            id: index,
            color: {
                color: edgeType.color,
                highlight: edgeType.color,
                hover: edgeType.color
            },
            width: 2,
            font: {
                color: '#333',
                size: 11,
                strokeWidth: 3,
                strokeColor: '#fff'
            }
        };
    });

    edges.update(updatedEdges);

    const updatedNodes = nodeData.map(node => ({
        id: node.id,
        opacity: 1,
        font: { color: '#333' }
    }));

    nodes.update(updatedNodes);

    resetInfoPanel();
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    // Create nodes
    const initialNodes = nodeData.map(node => ({
        id: node.id,
        label: node.label,
        x: node.x,
        y: node.y,
        color: {
            background: '#fff',
            border: '#3498DB',
            highlight: {
                background: '#EBF5FB',
                border: '#2980B9'
            },
            hover: {
                background: '#EBF5FB',
                border: '#2980B9'
            }
        },
        font: {
            color: '#333',
            size: 14,
            face: 'Arial'
        },
        shape: 'box',
        margin: 10,
        borderWidth: 2
    }));

    // Create edges with styling based on type
    const initialEdges = edgeData.map((edge, index) => {
        const edgeType = edgeTypes[edge.type];

        const edgeConfig = {
            id: index,
            from: edge.from,
            to: edge.to,
            label: edge.label,
            color: {
                color: edgeType.color,
                highlight: edgeType.color,
                hover: edgeType.color
            },
            dashes: edgeType.dashes,
            width: edgeType.width,
            arrows: edgeType.arrows,
            font: {
                size: 11,
                color: '#333',
                strokeWidth: 3,
                strokeColor: '#fff',
                align: 'middle'
            }
        };

        // Add smooth curve for 'influences' type
        if (edgeType.smooth) {
            edgeConfig.smooth = edgeType.smooth;
        }

        return edgeConfig;
    });

    nodes = new vis.DataSet(initialNodes);
    edges = new vis.DataSet(initialEdges);

    const options = {
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            zoomView: false,
            dragView: false,
            dragNodes: false,
            navigationButtons: true,
            hover: true
        },
        nodes: {
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                size: 6,
                x: 2,
                y: 2
            }
        },
        edges: {
            smooth: {
                type: 'continuous'
            }
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Position view
    setTimeout(positionView, 200);

    // Click on empty space resets highlight
    network.on('click', function(params) {
        if (params.nodes.length === 0 && params.edges.length === 0) {
            resetHighlight();
        }
    });
}

// ===========================================
// VIEW POSITIONING
// ===========================================
function positionView() {
    if (network) {
        const container = document.getElementById('network');
        const containerWidth = container.offsetWidth;

        // Account for right panel
        const rightPanelWidth = 220;
        const xOffset = rightPanelWidth / 2;

        network.moveTo({
            position: { x: xOffset, y: 0 },
            scale: 1.1,
            animation: false
        });
    }
}

// ===========================================
// LEGEND INTERACTIVITY
// ===========================================
function setupLegendInteractivity() {
    const legendItems = document.querySelectorAll('.legend-item');

    legendItems.forEach(item => {
        const type = item.getAttribute('data-type');

        item.addEventListener('click', function() {
            // Toggle highlight
            if (highlightedType === type) {
                resetHighlight();
                // Remove active class from all items
                legendItems.forEach(li => li.classList.remove('active'));
            } else {
                highlightEdgeType(type);
                // Update active class
                legendItems.forEach(li => li.classList.remove('active'));
                item.classList.add('active');
            }
        });

        item.addEventListener('mouseenter', function() {
            item.style.backgroundColor = '#f0f0f0';
        });

        item.addEventListener('mouseleave', function() {
            if (!item.classList.contains('active')) {
                item.style.backgroundColor = '';
            }
        });
    });
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    setupLegendInteractivity();
    window.addEventListener('resize', positionView);
});
