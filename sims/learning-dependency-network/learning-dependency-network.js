// Learning Dependency Network Graph
// Interactive vis-network visualization showing learning dependencies between concepts
// with different node shapes for concept types and PREREQUISITE_OF/EXTENDS edges
// Click nodes to highlight all prerequisites

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let network = null;
let nodes = null;
let edges = null;

// ===========================================
// COLOR SCHEME
// ===========================================
const colors = {
    foundation: {
        background: '#e0e0e0',
        border: '#9e9e9e',
        font: '#333333'
    },
    prerequisite: {
        background: '#4facfe',
        border: '#2196f3',
        font: '#ffffff'
    },
    target: {
        background: '#4caf50',
        border: '#388e3c',
        font: '#ffffff'
    },
    advanced: {
        background: '#9c27b0',
        border: '#7b1fa2',
        font: '#ffffff'
    },
    edge: {
        prerequisite: '#2196f3',
        extends: '#9c27b0',
        highlighted: '#ff9800'
    },
    highlighted: {
        background: '#ff9800',
        border: '#f57c00',
        font: '#000000'
    },
    dimmed: {
        background: '#f5f5f5',
        border: '#e0e0e0',
        font: '#bdbdbd'
    }
};

// ===========================================
// CONCEPT DATA
// ===========================================
// Hierarchical layout: foundation at bottom (y=400), target at top (y=0)
const conceptData = [
    // Foundation concepts (gray circles) - bottom layer
    {
        id: 1,
        label: "Basic\nArithmetic",
        x: 0,
        y: 400,
        type: "foundation",
        description: "Fundamental operations: addition, subtraction, multiplication, division. The building block for all mathematical concepts."
    },

    // Prerequisite concepts (light blue rectangles) - middle layers
    {
        id: 2,
        label: "Variables",
        x: -150,
        y: 280,
        type: "prerequisite",
        description: "Symbols representing unknown or changing values. Essential for expressing mathematical relationships."
    },
    {
        id: 3,
        label: "Functions",
        x: 150,
        y: 280,
        type: "prerequisite",
        description: "Mathematical relationships that map inputs to outputs. Key concept for understanding change and dependency."
    },
    {
        id: 4,
        label: "Algebra",
        x: 0,
        y: 160,
        type: "prerequisite",
        description: "Manipulation of variables and equations to solve problems. Bridges arithmetic to advanced mathematics."
    },

    // Target concept (green hexagon) - near top
    {
        id: 5,
        label: "Calculus",
        x: 0,
        y: 40,
        type: "target",
        description: "Study of continuous change through derivatives and integrals. The gateway to advanced mathematics and science."
    },

    // Advanced concepts (purple diamonds) - top layer
    {
        id: 6,
        label: "Differential\nEquations",
        x: 0,
        y: -80,
        type: "advanced",
        description: "Equations involving derivatives that model real-world phenomena. Applied in physics, engineering, and biology."
    }
];

// Edge definitions: PREREQUISITE_OF (solid) and EXTENDS (dashed)
const edgeData = [
    // PREREQUISITE_OF edges (solid arrows) - points from prerequisite to dependent concept
    { from: 1, to: 2, type: "prerequisite", label: "PREREQUISITE_OF" },  // Basic Arithmetic -> Variables
    { from: 1, to: 3, type: "prerequisite", label: "PREREQUISITE_OF" },  // Basic Arithmetic -> Functions
    { from: 2, to: 4, type: "prerequisite", label: "PREREQUISITE_OF" },  // Variables -> Algebra
    { from: 3, to: 4, type: "prerequisite", label: "PREREQUISITE_OF" },  // Functions -> Algebra
    { from: 4, to: 5, type: "prerequisite", label: "PREREQUISITE_OF" },  // Algebra -> Calculus

    // EXTENDS edges (dashed arrows) - points from concept to advanced application
    { from: 5, to: 6, type: "extends", label: "EXTENDS" }  // Calculus -> Differential Equations
];

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
function getConceptTypeName(type) {
    const typeNames = {
        foundation: "Foundation Concept",
        prerequisite: "Prerequisite Concept",
        target: "Target Concept",
        advanced: "Advanced Concept"
    };
    return typeNames[type] || "Concept";
}

function updateInfoPanel(nodeId, mode = 'hover') {
    const node = conceptData.find(n => n.id === nodeId);
    if (!node) return;

    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = node.label.replace('\n', ' ');

    if (mode === 'click') {
        const prerequisites = getPrerequisites(nodeId);
        const dependents = getDependents(nodeId);

        textEl.innerHTML = `
            <p><strong>Type:</strong> ${getConceptTypeName(node.type)}</p>
            <p>${node.description}</p>
            <hr>
            <p><strong>Prerequisites (${prerequisites.length}):</strong><br>
            ${prerequisites.length > 0 ? prerequisites.map(id => {
                const n = conceptData.find(c => c.id === id);
                return n ? n.label.replace('\n', ' ') : '';
            }).join(', ') : 'None - Foundation concept'}</p>
            <p><strong>Leads to (${dependents.length}):</strong><br>
            ${dependents.length > 0 ? dependents.map(id => {
                const n = conceptData.find(c => c.id === id);
                return n ? n.label.replace('\n', ' ') : '';
            }).join(', ') : 'None'}</p>
        `;
    } else {
        textEl.innerHTML = `
            <p><strong>Type:</strong> ${getConceptTypeName(node.type)}</p>
            <p>${node.description}</p>
        `;
    }
}

function resetInfoPanel() {
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = 'Learning Dependencies';
    textEl.innerHTML = `
        <p><strong>Click</strong> a concept to highlight all its prerequisites.</p>
        <p><strong>Hover</strong> to see concept definitions.</p>
        <hr>
        <p style="font-size: 11px;">
            Follow the arrows upward to see<br>what you need to learn first!
        </p>
    `;
}

// ===========================================
// DEPENDENCY TRAVERSAL
// ===========================================
// Get all prerequisites (upstream nodes)
function getPrerequisites(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const prerequisites = [];
    edgeData.forEach(edge => {
        if (edge.to === nodeId) {
            prerequisites.push(edge.from);
            prerequisites.push(...getPrerequisites(edge.from, visited));
        }
    });
    return [...new Set(prerequisites)];
}

// Get all dependent concepts (downstream nodes)
function getDependents(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const dependents = [];
    edgeData.forEach(edge => {
        if (edge.from === nodeId) {
            dependents.push(edge.to);
            dependents.push(...getDependents(edge.to, visited));
        }
    });
    return [...new Set(dependents)];
}

// Get edges connected to the selected node and its prerequisites
function getConnectedEdges(nodeId, prerequisites) {
    const connected = [];
    edgeData.forEach((edge, index) => {
        // Edges leading TO this node from prerequisites
        if (edge.to === nodeId && prerequisites.includes(edge.from)) {
            connected.push(index);
        }
        // Edges between prerequisite nodes
        if (prerequisites.includes(edge.from) && prerequisites.includes(edge.to)) {
            connected.push(index);
        }
        // Edge directly to the selected node
        if (edge.to === nodeId) {
            connected.push(index);
        }
    });
    return [...new Set(connected)];
}

// ===========================================
// NODE SHAPE CONFIGURATION
// ===========================================
function getNodeShape(type) {
    const shapes = {
        foundation: 'ellipse',      // Gray circles
        prerequisite: 'box',        // Light blue rectangles
        target: 'hexagon',          // Green hexagon
        advanced: 'diamond'         // Purple diamonds
    };
    return shapes[type] || 'ellipse';
}

function getNodeColor(type) {
    return colors[type] || colors.prerequisite;
}

// ===========================================
// HIGHLIGHT FUNCTIONS
// ===========================================
function highlightPrerequisites(nodeId) {
    const prerequisites = getPrerequisites(nodeId);
    const connectedEdges = getConnectedEdges(nodeId, prerequisites);

    // Update all nodes
    const updatedNodes = conceptData.map(node => {
        let nodeColor;
        if (node.id === nodeId) {
            nodeColor = colors.highlighted;
        } else if (prerequisites.includes(node.id)) {
            nodeColor = getNodeColor(node.type);
        } else {
            nodeColor = colors.dimmed;
        }

        return {
            id: node.id,
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: { background: nodeColor.background, border: nodeColor.border }
            },
            font: {
                color: nodeColor.font,
                size: 14,
                face: 'Arial',
                multi: true
            }
        };
    });

    // Update all edges
    const updatedEdges = edgeData.map((edge, index) => {
        const isConnected = connectedEdges.includes(index);
        return {
            id: index,
            color: {
                color: isConnected ? colors.edge.highlighted : '#e0e0e0',
                highlight: isConnected ? colors.edge.highlighted : '#e0e0e0'
            },
            width: isConnected ? 3 : 1,
            dashes: edge.type === 'extends' ? [10, 5] : false
        };
    });

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    updateInfoPanel(nodeId, 'click');
}

function resetHighlight() {
    const updatedNodes = conceptData.map(node => {
        const nodeColor = getNodeColor(node.type);
        return {
            id: node.id,
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: {
                    background: nodeColor.background,
                    border: '#333'
                }
            },
            font: {
                color: nodeColor.font,
                size: 14,
                face: 'Arial',
                multi: true
            }
        };
    });

    const updatedEdges = edgeData.map((edge, index) => ({
        id: index,
        color: {
            color: edge.type === 'prerequisite' ? colors.edge.prerequisite : colors.edge.extends,
            highlight: colors.edge.highlighted
        },
        width: 2,
        dashes: edge.type === 'extends' ? [10, 5] : false
    }));

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    resetInfoPanel();
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    // Create nodes with styling based on type
    const initialNodes = conceptData.map(node => {
        const nodeColor = getNodeColor(node.type);
        return {
            id: node.id,
            label: node.label,
            x: node.x,
            y: node.y,
            shape: getNodeShape(node.type),
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: {
                    background: nodeColor.background,
                    border: '#333'
                },
                hover: {
                    background: nodeColor.background,
                    border: '#000'
                }
            },
            font: {
                color: nodeColor.font,
                size: 14,
                face: 'Arial',
                multi: true
            },
            margin: 12,
            borderWidth: 3,
            size: node.type === 'target' ? 35 : 30
        };
    });

    // Create edges with styling
    const initialEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        color: {
            color: edge.type === 'prerequisite' ? colors.edge.prerequisite : colors.edge.extends,
            highlight: colors.edge.highlighted,
            hover: '#555'
        },
        width: 2,
        dashes: edge.type === 'extends' ? [10, 5] : false,
        arrows: {
            to: { enabled: true, scaleFactor: 1, type: 'arrow' }
        },
        smooth: {
            type: 'curvedCW',
            roundness: 0.15
        }
    }));

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
            selectConnectedEdges: false,
            zoomView: false,         // Disabled for iframe
            dragView: false,         // Disabled for iframe
            dragNodes: false,        // Nodes stay in fixed positions
            navigationButtons: true, // Enable navigation buttons
            hover: true
        },
        nodes: {
            borderWidth: 3,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.2)',
                size: 8,
                x: 3,
                y: 3
            }
        },
        edges: {
            smooth: {
                type: 'curvedCW',
                roundness: 0.15
            }
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Center the view - position adjusted for hierarchical layout
    setTimeout(() => {
        network.moveTo({
            position: { x: 0, y: 160 },
            scale: 1.0,
            animation: false
        });
    }, 100);

    // Event handlers
    network.on('hoverNode', function(params) {
        updateInfoPanel(params.node, 'hover');
    });

    network.on('blurNode', function() {
        // Only reset info panel if no node is selected
        const selected = network.getSelectedNodes();
        if (selected.length === 0) {
            resetInfoPanel();
        }
    });

    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            highlightPrerequisites(params.nodes[0]);
        } else {
            resetHighlight();
        }
    });

    // Initialize info panel
    resetInfoPanel();
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();

    // Reset button handler
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetHighlight);
    }
});
