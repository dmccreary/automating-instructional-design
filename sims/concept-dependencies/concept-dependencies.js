// Concept Dependencies Graph
// Interactive vis-network visualization showing concept dependencies with REQUIRES and SUPPORTS edges
// Click nodes to highlight upstream/downstream dependencies

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let network = null;
let nodes = null;
let edges = null;
let allNodes = [];
let allEdges = [];

// ===========================================
// CONCEPT DATA
// ===========================================
// 12 concepts arranged in a learning dependency structure
const conceptData = [
    { id: 1, label: "Variables", x: -300, y: -200, description: "Named containers that store data values" },
    { id: 2, label: "Data Types", x: -100, y: -200, description: "Categories of data (number, string, boolean)" },
    { id: 3, label: "Operators", x: 100, y: -200, description: "Symbols for mathematical and logical operations" },
    { id: 4, label: "Expressions", x: 300, y: -100, description: "Combinations of values, variables, and operators" },
    { id: 5, label: "Conditionals", x: -200, y: 0, description: "If-then-else decision structures" },
    { id: 6, label: "Loops", x: 0, y: 0, description: "Repeated execution of code blocks" },
    { id: 7, label: "Functions", x: 200, y: 0, description: "Reusable blocks of code with parameters" },
    { id: 8, label: "Arrays", x: -150, y: 150, description: "Ordered collections of elements" },
    { id: 9, label: "Objects", x: 100, y: 150, description: "Collections of key-value pairs" },
    { id: 10, label: "Recursion", x: 300, y: 150, description: "Functions that call themselves" },
    { id: 11, label: "Algorithms", x: 0, y: 300, description: "Step-by-step problem-solving procedures" },
    { id: 12, label: "Data\nStructures", x: 200, y: 300, description: "Organized ways to store and access data" }
];

// Edge definitions: REQUIRES (solid) = hard prerequisites, SUPPORTS (dashed) = helpful but not required
const edgeData = [
    // REQUIRES edges (hard prerequisites)
    { from: 1, to: 2, type: "requires" },      // Variables -> Data Types
    { from: 2, to: 3, type: "requires" },      // Data Types -> Operators
    { from: 3, to: 4, type: "requires" },      // Operators -> Expressions
    { from: 4, to: 5, type: "requires" },      // Expressions -> Conditionals
    { from: 4, to: 6, type: "requires" },      // Expressions -> Loops
    { from: 1, to: 7, type: "requires" },      // Variables -> Functions
    { from: 2, to: 8, type: "requires" },      // Data Types -> Arrays
    { from: 2, to: 9, type: "requires" },      // Data Types -> Objects
    { from: 7, to: 10, type: "requires" },     // Functions -> Recursion
    { from: 6, to: 11, type: "requires" },     // Loops -> Algorithms
    { from: 8, to: 12, type: "requires" },     // Arrays -> Data Structures

    // SUPPORTS edges (soft prerequisites - helpful but not strictly required)
    { from: 5, to: 6, type: "supports" },      // Conditionals -> Loops
    { from: 6, to: 7, type: "supports" },      // Loops -> Functions
    { from: 8, to: 6, type: "supports" },      // Arrays -> Loops
    { from: 9, to: 12, type: "supports" },     // Objects -> Data Structures
    { from: 5, to: 11, type: "supports" },     // Conditionals -> Algorithms
    { from: 10, to: 11, type: "supports" }     // Recursion -> Algorithms
];

// Color scheme
const colors = {
    node: {
        default: { background: '#4A90D9', border: '#2E5A8B', font: '#FFFFFF' },
        highlighted: { background: '#FFB347', border: '#E69422', font: '#000000' },
        upstream: { background: '#90EE90', border: '#228B22', font: '#000000' },
        downstream: { background: '#FFB6C1', border: '#DC143C', font: '#000000' }
    },
    edge: {
        requires: '#2E5A8B',
        supports: '#888888',
        highlighted: '#E69422'
    }
};

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
function updateInfoPanel(nodeId, mode = 'hover') {
    const node = conceptData.find(n => n.id === nodeId);
    if (!node) return;

    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = node.label.replace('\n', ' ');

    if (mode === 'click') {
        const upstream = getUpstreamNodes(nodeId);
        const downstream = getDownstreamNodes(nodeId);

        textEl.innerHTML = `
            <p>${node.description}</p>
            <p><strong>Prerequisites (${upstream.length}):</strong><br>
            ${upstream.length > 0 ? upstream.map(id => {
                const n = conceptData.find(c => c.id === id);
                return n ? n.label.replace('\n', ' ') : '';
            }).join(', ') : 'None'}</p>
            <p><strong>Leads to (${downstream.length}):</strong><br>
            ${downstream.length > 0 ? downstream.map(id => {
                const n = conceptData.find(c => c.id === id);
                return n ? n.label.replace('\n', ' ') : '';
            }).join(', ') : 'None'}</p>
        `;
    } else {
        textEl.innerHTML = `<p>${node.description}</p>`;
    }
}

function resetInfoPanel() {
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = 'Concept Dependencies';
    textEl.innerHTML = `
        <p><strong>Click</strong> a concept to highlight its dependencies.</p>
        <p><strong>Hover</strong> to see descriptions.</p>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 11px;">
            <span style="color: #90EE90;">Green</span> = Prerequisites<br>
            <span style="color: #FFB6C1;">Pink</span> = Leads to<br>
            <span style="color: #FFB347;">Orange</span> = Selected
        </p>
    `;
}

// ===========================================
// DEPENDENCY TRAVERSAL
// ===========================================
function getUpstreamNodes(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const upstream = [];
    edgeData.forEach(edge => {
        if (edge.to === nodeId) {
            upstream.push(edge.from);
            upstream.push(...getUpstreamNodes(edge.from, visited));
        }
    });
    return [...new Set(upstream)];
}

function getDownstreamNodes(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const downstream = [];
    edgeData.forEach(edge => {
        if (edge.from === nodeId) {
            downstream.push(edge.to);
            downstream.push(...getDownstreamNodes(edge.to, visited));
        }
    });
    return [...new Set(downstream)];
}

function getConnectedEdges(nodeId, upstreamNodes, downstreamNodes) {
    const connected = [];
    edgeData.forEach((edge, index) => {
        // Edges leading TO this node or FROM upstream nodes
        if (edge.to === nodeId ||
            (upstreamNodes.includes(edge.from) && upstreamNodes.includes(edge.to)) ||
            (upstreamNodes.includes(edge.from) && edge.to === nodeId)) {
            connected.push(index);
        }
        // Edges leading FROM this node or TO downstream nodes
        if (edge.from === nodeId ||
            (downstreamNodes.includes(edge.to) && downstreamNodes.includes(edge.from)) ||
            (edge.from === nodeId && downstreamNodes.includes(edge.to))) {
            connected.push(index);
        }
    });
    return [...new Set(connected)];
}

// ===========================================
// HIGHLIGHT FUNCTIONS
// ===========================================
function highlightDependencies(nodeId) {
    const upstream = getUpstreamNodes(nodeId);
    const downstream = getDownstreamNodes(nodeId);
    const connectedEdges = getConnectedEdges(nodeId, upstream, downstream);

    // Update all nodes
    const updatedNodes = conceptData.map(node => {
        let nodeColor;
        if (node.id === nodeId) {
            nodeColor = colors.node.highlighted;
        } else if (upstream.includes(node.id)) {
            nodeColor = colors.node.upstream;
        } else if (downstream.includes(node.id)) {
            nodeColor = colors.node.downstream;
        } else {
            nodeColor = {
                background: '#E0E0E0',
                border: '#AAAAAA',
                font: '#888888'
            };
        }

        return {
            id: node.id,
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: { background: nodeColor.background, border: nodeColor.border }
            },
            font: { color: nodeColor.font, size: 14, face: 'Arial' }
        };
    });

    // Update all edges
    const updatedEdges = edgeData.map((edge, index) => {
        const isConnected = connectedEdges.includes(index);
        return {
            id: index,
            color: {
                color: isConnected ? colors.edge.highlighted : '#DDDDDD',
                highlight: isConnected ? colors.edge.highlighted : '#DDDDDD'
            },
            width: isConnected ? 2.5 : 1,
            dashes: edge.type === 'supports' ? [8, 4] : false
        };
    });

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    updateInfoPanel(nodeId, 'click');
}

function resetHighlight() {
    const updatedNodes = conceptData.map(node => ({
        id: node.id,
        color: {
            background: colors.node.default.background,
            border: colors.node.default.border,
            highlight: {
                background: colors.node.default.background,
                border: '#333'
            }
        },
        font: { color: colors.node.default.font, size: 14, face: 'Arial' }
    }));

    const updatedEdges = edgeData.map((edge, index) => ({
        id: index,
        color: {
            color: edge.type === 'requires' ? colors.edge.requires : colors.edge.supports,
            highlight: colors.edge.highlighted
        },
        width: edge.type === 'requires' ? 2 : 1.5,
        dashes: edge.type === 'supports' ? [8, 4] : false
    }));

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    resetInfoPanel();
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    const inIframe = isInIframe();

    // Create nodes with styling
    const initialNodes = conceptData.map(node => ({
        id: node.id,
        label: node.label,
        x: node.x,
        y: node.y,
        color: {
            background: colors.node.default.background,
            border: colors.node.default.border,
            highlight: {
                background: colors.node.default.background,
                border: '#333'
            },
            hover: {
                background: colors.node.default.background,
                border: '#000'
            }
        },
        font: {
            color: colors.node.default.font,
            size: 14,
            face: 'Arial',
            multi: true
        },
        shape: 'box',
        margin: 10,
        borderWidth: 2
    }));

    // Create edges with styling
    const initialEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        color: {
            color: edge.type === 'requires' ? colors.edge.requires : colors.edge.supports,
            highlight: colors.edge.highlighted,
            hover: '#555'
        },
        width: edge.type === 'requires' ? 2 : 1.5,
        dashes: edge.type === 'supports' ? [8, 4] : false,
        arrows: {
            to: { enabled: true, scaleFactor: 0.8, type: 'arrow' }
        },
        smooth: {
            type: 'curvedCW',
            roundness: 0.1
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
            borderWidth: 2,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.2)',
                size: 5,
                x: 2,
                y: 2
            }
        },
        edges: {
            smooth: {
                type: 'curvedCW',
                roundness: 0.1
            }
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Center the view
    setTimeout(() => {
        network.moveTo({
            position: { x: 50, y: 80 },
            scale: 0.9,
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
            highlightDependencies(params.nodes[0]);
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
