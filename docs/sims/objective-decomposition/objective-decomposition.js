// Objective Decomposition Tree MicroSim
// Shows how compound objectives break down into atomic concepts

// Define node colors for different types
const colors = {
    compound: {
        background: '#EF5350',
        border: '#C62828',
        font: '#ffffff'
    },
    cluster: {
        background: '#FF9800',
        border: '#E65100',
        font: '#ffffff'
    },
    atomic: {
        background: '#66BB6A',
        border: '#2E7D32',
        font: '#ffffff'
    },
    highlight: {
        background: '#FFD54F',
        border: '#FF8F00',
        font: '#333333'
    }
};

// Node definitions - hierarchical layout
const nodeData = [
    // Compound Objective (top)
    { id: 1, label: 'Create a Data\nVisualization Dashboard', type: 'compound', x: -200, y: -200 },

    // Skill Clusters (middle)
    { id: 2, label: 'Data Processing\nSkills', type: 'cluster', x: -400, y: -50 },
    { id: 3, label: 'Visualization\nSkills', type: 'cluster', x: -200, y: -50 },
    { id: 4, label: 'Dashboard\nAssembly', type: 'cluster', x: 0, y: -50 },

    // Atomic Concepts (bottom)
    { id: 5, label: 'Load data\nfrom CSV', type: 'atomic', x: -500, y: 120 },
    { id: 6, label: 'Clean missing\nvalues', type: 'atomic', x: -400, y: 120 },
    { id: 7, label: 'Transform\ndata types', type: 'atomic', x: -300, y: 120 },
    { id: 8, label: 'Create\nbar chart', type: 'atomic', x: -250, y: 200 },
    { id: 9, label: 'Create\nline chart', type: 'atomic', x: -150, y: 200 },
    { id: 10, label: 'Add chart\nlabels', type: 'atomic', x: -200, y: 280 },
    { id: 11, label: 'Arrange\ncomponents', type: 'atomic', x: 0, y: 120 },
    { id: 12, label: 'Add\ninteractivity', type: 'atomic', x: 100, y: 120 }
];

// Edge definitions
const edgeData = [
    // Compound to clusters
    { from: 1, to: 2, type: 'decompose' },
    { from: 1, to: 3, type: 'decompose' },
    { from: 1, to: 4, type: 'decompose' },

    // Data Processing cluster to atomics
    { from: 2, to: 5, type: 'decompose' },
    { from: 2, to: 6, type: 'decompose' },
    { from: 2, to: 7, type: 'decompose' },

    // Visualization cluster to atomics
    { from: 3, to: 8, type: 'decompose' },
    { from: 3, to: 9, type: 'decompose' },
    { from: 3, to: 10, type: 'decompose' },

    // Dashboard cluster to atomics
    { from: 4, to: 11, type: 'decompose' },
    { from: 4, to: 12, type: 'decompose' },

    // Prerequisites (dashed lines)
    { from: 5, to: 6, type: 'requires', dashes: true },
    { from: 6, to: 7, type: 'requires', dashes: true },
    { from: 8, to: 10, type: 'requires', dashes: true },
    { from: 9, to: 10, type: 'requires', dashes: true }
];

// Animation state
let currentStep = 0;
let nodes, edges, network;
let selectedNode = null;

// Node descriptions for info panel
const nodeDescriptions = {
    1: { title: 'Compound Objective', bloom: 'Create (L6)', desc: 'A complex objective combining multiple skills that needs to be broken down for effective instruction.' },
    2: { title: 'Data Processing Skills', bloom: 'Apply (L3)', desc: 'A cluster of skills related to preparing data for visualization.' },
    3: { title: 'Visualization Skills', bloom: 'Apply (L3)', desc: 'A cluster of skills for creating visual representations of data.' },
    4: { title: 'Dashboard Assembly', bloom: 'Create (L6)', desc: 'A cluster of skills for combining visualizations into a cohesive dashboard.' },
    5: { title: 'Load CSV Data', bloom: 'Apply (L3)', desc: 'Read data from a CSV file into a data structure. Foundation skill.' },
    6: { title: 'Clean Missing Values', bloom: 'Apply (L3)', desc: 'Handle null/missing values appropriately. Requires loaded data.' },
    7: { title: 'Transform Data Types', bloom: 'Apply (L3)', desc: 'Convert data types for proper analysis. Requires clean data.' },
    8: { title: 'Create Bar Chart', bloom: 'Apply (L3)', desc: 'Generate a bar chart from prepared data.' },
    9: { title: 'Create Line Chart', bloom: 'Apply (L3)', desc: 'Generate a line chart from prepared data.' },
    10: { title: 'Add Chart Labels', bloom: 'Apply (L3)', desc: 'Add titles, axis labels, and legends. Requires existing chart.' },
    11: { title: 'Arrange Components', bloom: 'Apply (L3)', desc: 'Layout multiple visualizations on a dashboard canvas.' },
    12: { title: 'Add Interactivity', bloom: 'Create (L6)', desc: 'Add filters, tooltips, and interactive controls.' }
};

// Steps for guided exploration
const steps = [
    { action: 'start', nodes: [], description: 'This tree shows how a compound learning objective decomposes into atomic concepts. Click "Next" to explore.' },
    { action: 'highlight', nodes: [1], description: 'The COMPOUND OBJECTIVE (red) is a complex goal requiring multiple skills. It\'s too broad to teach directly.' },
    { action: 'highlight', nodes: [2, 3, 4], description: 'SKILL CLUSTERS (orange) group related atomic concepts. They represent intermediate learning goals.' },
    { action: 'highlight', nodes: [5, 6, 7], description: 'ATOMIC CONCEPTS (green) under Data Processing can be taught and assessed independently.' },
    { action: 'highlight', nodes: [8, 9, 10], description: 'ATOMIC CONCEPTS under Visualization. Notice the dashed lines showing prerequisites.' },
    { action: 'highlight', nodes: [11, 12], description: 'ATOMIC CONCEPTS under Dashboard Assembly. Each can be taught in a focused lesson.' },
    { action: 'all', nodes: [], description: 'The complete decomposition reveals 8 atomic concepts, 3 skill clusters, and prerequisite relationships. Click any node for details.' }
];

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
            position: { x: -180, y: 60 },
            scale: 0.9,
            animation: false
        });
    }
}

function getNodeStyle(node) {
    const colorSet = colors[node.type];
    return {
        id: node.id,
        label: node.label,
        x: node.x,
        y: node.y,
        shape: node.type === 'atomic' ? 'ellipse' : 'box',
        color: {
            background: colorSet.background,
            border: colorSet.border
        },
        font: { color: colorSet.font, size: 14, multi: 'html' },
        borderWidth: node.type === 'compound' ? 4 : 3,
        size: node.type === 'compound' ? 30 : (node.type === 'cluster' ? 25 : 20)
    };
}

function initializeNetwork() {
    currentStep = 0;
    selectedNode = null;

    const initialNodes = nodeData.map(node => getNodeStyle(node));

    const initialEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        color: { color: edge.type === 'requires' ? '#999999' : '#666666' },
        width: edge.type === 'requires' ? 1 : 2,
        dashes: edge.type === 'requires',
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        smooth: { type: 'cubicBezier', roundness: 0.3 }
    }));

    nodes = new vis.DataSet(initialNodes);
    edges = new vis.DataSet(initialEdges);

    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            navigationButtons: true,
            hover: true
        },
        nodes: {
            margin: 10,
            font: { size: 14, face: 'Arial' },
            borderWidth: 3,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.2)',
                size: 5,
                x: 2,
                y: 2
            }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            width: 2
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            selectedNode = params.nodes[0];
            showNodeInfo(selectedNode);
        } else {
            selectedNode = null;
            hideNodeInfo();
        }
    });

    setTimeout(positionView, 200);
    updateUI();
}

function highlightNodes(nodeIds) {
    // Reset all nodes to their original style
    nodeData.forEach(node => {
        nodes.update(getNodeStyle(node));
    });

    // Highlight specified nodes
    nodeIds.forEach(id => {
        const node = nodeData.find(n => n.id === id);
        if (node) {
            nodes.update({
                id: id,
                borderWidth: 5,
                shadow: {
                    enabled: true,
                    color: 'rgba(255,193,7,0.5)',
                    size: 15,
                    x: 0,
                    y: 0
                }
            });
        }
    });
}

function showNodeInfo(nodeId) {
    const info = nodeDescriptions[nodeId];
    if (info) {
        const infoPanel = document.getElementById('node-info');
        const infoContent = document.getElementById('node-info-content');
        infoContent.innerHTML = `
            <div class="info-title">${info.title}</div>
            <div class="info-bloom">Bloom's Level: ${info.bloom}</div>
            <div class="info-desc">${info.desc}</div>
        `;
        infoPanel.style.display = 'block';
    }
}

function hideNodeInfo() {
    document.getElementById('node-info').style.display = 'none';
}

function updateUI() {
    const stepCounter = document.getElementById('step-counter');
    const statusText = document.getElementById('status-text');
    const nextBtn = document.getElementById('next-btn');

    stepCounter.textContent = `Step ${currentStep} / ${steps.length - 1}`;

    if (currentStep < steps.length) {
        statusText.textContent = steps[currentStep].description;
    }

    nextBtn.disabled = currentStep >= steps.length - 1;
}

function executeStep() {
    if (currentStep >= steps.length - 1) return;

    currentStep++;
    const step = steps[currentStep];

    if (step.action === 'highlight') {
        highlightNodes(step.nodes);
    } else if (step.action === 'all') {
        // Reset all to normal
        nodeData.forEach(node => {
            nodes.update(getNodeStyle(node));
        });
    }

    updateUI();
}

function reset() {
    initializeNetwork();
    hideNodeInfo();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    document.getElementById('next-btn').addEventListener('click', executeStep);
    document.getElementById('reset-btn').addEventListener('click', reset);
    window.addEventListener('resize', positionView);
});
