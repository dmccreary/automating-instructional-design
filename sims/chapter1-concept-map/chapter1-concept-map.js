// Chapter 1 Concept Map MicroSim
// Shows relationships between all 17 concepts from Chapter 1

// Define node colors by category
const colors = {
    core: {
        background: '#2196F3',
        border: '#1565C0',
        font: '#ffffff'
    },
    bloom: {
        background: '#9C27B0',
        border: '#6A1B9A',
        font: '#ffffff'
    },
    levels: {
        remember: { background: '#E3F2FD', border: '#1976D2', font: '#333' },
        understand: { background: '#E8F5E9', border: '#388E3C', font: '#333' },
        apply: { background: '#FFF9C4', border: '#FBC02D', font: '#333' },
        analyze: { background: '#FFE0B2', border: '#F57C00', font: '#333' },
        evaluate: { background: '#FCE4EC', border: '#C2185B', font: '#333' },
        create: { background: '#E1BEE7', border: '#7B1FA2', font: '#333' }
    },
    objective: {
        background: '#4CAF50',
        border: '#2E7D32',
        font: '#ffffff'
    },
    decomposition: {
        background: '#FF9800',
        border: '#E65100',
        font: '#ffffff'
    }
};

// Node definitions
const nodeData = [
    // Core Concepts (Blue)
    { id: 1, label: 'Instructional\nDesign', category: 'core', x: -200, y: 0, size: 35 },
    { id: 2, label: 'Educational\nTechnology', category: 'core', x: -400, y: -80, size: 28 },
    { id: 3, label: 'Learning\nObjective', category: 'core', x: 0, y: 0, size: 30 },

    // Bloom's Taxonomy Hub
    { id: 4, label: "Bloom's\nTaxonomy", category: 'bloom', x: 200, y: -50, size: 30 },
    { id: 5, label: 'Cognitive\nComplexity', category: 'bloom', x: 350, y: -120, size: 22 },

    // Six Levels (Rainbow)
    { id: 6, label: 'Remember', category: 'remember', x: 400, y: 80, size: 18 },
    { id: 7, label: 'Understand', category: 'understand', x: 350, y: 130, size: 18 },
    { id: 8, label: 'Apply', category: 'apply', x: 280, y: 170, size: 18 },
    { id: 9, label: 'Analyze', category: 'analyze', x: 200, y: 190, size: 18 },
    { id: 10, label: 'Evaluate', category: 'evaluate', x: 120, y: 170, size: 18 },
    { id: 11, label: 'Create', category: 'create', x: 60, y: 130, size: 18 },

    // Objective Components (Green)
    { id: 12, label: 'Action\nVerbs', category: 'objective', x: 100, y: -120, size: 22 },
    { id: 13, label: 'Measurable\nOutcomes', category: 'objective', x: -100, y: -140, size: 22 },
    { id: 14, label: 'Learning\nOutcome', category: 'objective', x: -50, y: 100, size: 22 },

    // Decomposition Concepts (Orange)
    { id: 15, label: 'Objective\nDecomposition', category: 'decomposition', x: -300, y: 150, size: 22 },
    { id: 16, label: 'Atomic\nConcepts', category: 'decomposition', x: -200, y: 220, size: 20 },
    { id: 17, label: 'Compound\nObjectives', category: 'decomposition', x: -400, y: 180, size: 20 }
];

// Edge definitions with labels
const edgeData = [
    { from: 1, to: 3, label: 'uses' },
    { from: 1, to: 2, label: 'employs' },
    { from: 3, to: 13, label: 'measured by' },
    { from: 3, to: 14, label: 'produces' },
    { from: 3, to: 4, label: 'categorized by' },
    { from: 4, to: 5, label: 'defines' },
    { from: 4, to: 6, label: 'contains' },
    { from: 4, to: 7, label: 'contains' },
    { from: 4, to: 8, label: 'contains' },
    { from: 4, to: 9, label: 'contains' },
    { from: 4, to: 10, label: 'contains' },
    { from: 4, to: 11, label: 'contains' },
    { from: 12, to: 5, label: 'indicates' },
    { from: 17, to: 16, label: 'decompose to' },
    { from: 15, to: 16, label: 'produces' },
    { from: 15, to: 17, label: 'analyzes' }
];

// Node descriptions
const nodeDescriptions = {
    1: 'The systematic process of creating effective educational experiences',
    2: 'Tools and systems for delivering and enhancing learning',
    3: 'Clear statement of what learners will be able to do',
    4: 'Framework for classifying learning objectives by cognitive level',
    5: 'The mental demands different tasks place on learners',
    6: 'L1: Retrieving information from memory',
    7: 'L2: Constructing meaning from information',
    8: 'L3: Using procedures in given situations',
    9: 'L4: Breaking material into parts, detecting relationships',
    10: 'L5: Making judgments based on criteria',
    11: 'L6: Putting elements together to form something new',
    12: 'Verbs that communicate the cognitive level of objectives',
    13: 'Criteria for assessing whether objectives were achieved',
    14: 'What learners actually achieved after instruction',
    15: 'Breaking complex objectives into teachable parts',
    16: 'Single, indivisible units of knowledge or skill',
    17: 'Complex objectives combining multiple skills'
};

let nodes, edges, network;
let selectedNode = null;

function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function positionView() {
    if (network) {
        network.moveTo({
            position: { x: -50, y: 50 },
            scale: 0.85,
            animation: false
        });
    }
}

function getNodeColor(node) {
    if (node.category === 'core') return colors.core;
    if (node.category === 'bloom') return colors.bloom;
    if (node.category === 'objective') return colors.objective;
    if (node.category === 'decomposition') return colors.decomposition;
    if (colors.levels[node.category]) return colors.levels[node.category];
    return colors.core;
}

function initializeNetwork() {
    selectedNode = null;

    const initialNodes = nodeData.map(node => {
        const colorSet = getNodeColor(node);
        return {
            id: node.id,
            label: node.label,
            x: node.x,
            y: node.y,
            shape: 'ellipse',
            size: node.size || 20,
            color: {
                background: colorSet.background,
                border: colorSet.border,
                highlight: {
                    background: colorSet.background,
                    border: '#333'
                }
            },
            font: { color: colorSet.font, size: 12, multi: 'html' },
            borderWidth: 3
        };
    });

    const initialEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        color: { color: '#666666' },
        width: 1.5,
        font: { size: 10, color: '#555', background: 'rgba(255,255,255,0.8)' },
        arrows: { to: { enabled: true, scaleFactor: 0.6 } },
        smooth: { type: 'curvedCW', roundness: 0.15 }
    }));

    nodes = new vis.DataSet(initialNodes);
    edges = new vis.DataSet(initialEdges);

    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: true,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            navigationButtons: true,
            hover: true,
            tooltipDelay: 200
        },
        nodes: {
            font: { size: 12, face: 'Arial' },
            borderWidth: 3,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                size: 5,
                x: 2,
                y: 2
            }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.6 } },
            width: 1.5
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            selectedNode = params.nodes[0];
            showNodeInfo(selectedNode);
            highlightConnected(selectedNode);
        } else {
            selectedNode = null;
            hideNodeInfo();
            resetHighlight();
        }
    });

    network.on('hoverNode', function(params) {
        if (!selectedNode) {
            highlightConnected(params.node);
        }
    });

    network.on('blurNode', function(params) {
        if (!selectedNode) {
            resetHighlight();
        }
    });

    setTimeout(positionView, 200);
}

function highlightConnected(nodeId) {
    // Get connected nodes
    const connectedEdges = edges.get().filter(e => e.from === nodeId || e.to === nodeId);
    const connectedNodes = new Set([nodeId]);
    connectedEdges.forEach(e => {
        connectedNodes.add(e.from);
        connectedNodes.add(e.to);
    });

    // Dim non-connected nodes
    nodes.get().forEach(node => {
        if (!connectedNodes.has(node.id)) {
            nodes.update({
                id: node.id,
                opacity: 0.3
            });
        } else {
            nodes.update({
                id: node.id,
                opacity: 1
            });
        }
    });

    // Highlight connected edges
    edges.get().forEach(edge => {
        if (edge.from === nodeId || edge.to === nodeId) {
            edges.update({
                id: edge.id,
                width: 3,
                color: { color: '#1976D2' }
            });
        } else {
            edges.update({
                id: edge.id,
                width: 1,
                color: { color: '#ccc' }
            });
        }
    });
}

function resetHighlight() {
    nodes.get().forEach(node => {
        nodes.update({
            id: node.id,
            opacity: 1
        });
    });

    edges.get().forEach(edge => {
        edges.update({
            id: edge.id,
            width: 1.5,
            color: { color: '#666666' }
        });
    });
}

function showNodeInfo(nodeId) {
    const node = nodeData.find(n => n.id === nodeId);
    const desc = nodeDescriptions[nodeId];

    if (node && desc) {
        const infoPanel = document.getElementById('node-info');
        const infoContent = document.getElementById('node-info-content');
        infoContent.innerHTML = `
            <div class="info-title">${node.label.replace('\n', ' ')}</div>
            <div class="info-category">Category: ${node.category}</div>
            <div class="info-desc">${desc}</div>
        `;
        infoPanel.style.display = 'block';
    }
}

function hideNodeInfo() {
    document.getElementById('node-info').style.display = 'none';
}

function toggleLabels() {
    const btn = document.getElementById('toggle-labels');
    const showLabels = btn.textContent.includes('Show');

    edges.get().forEach(edge => {
        edges.update({
            id: edge.id,
            font: { size: showLabels ? 10 : 0 }
        });
    });

    btn.textContent = showLabels ? 'Hide Labels' : 'Show Labels';
}

function reset() {
    initializeNetwork();
    hideNodeInfo();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    document.getElementById('toggle-labels').addEventListener('click', toggleLabels);
    document.getElementById('reset-btn').addEventListener('click', reset);
    window.addEventListener('resize', positionView);
});
