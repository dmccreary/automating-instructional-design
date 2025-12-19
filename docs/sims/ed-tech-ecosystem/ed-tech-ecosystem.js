// Educational Technology Ecosystem
// Interactive vis-network visualization showing ed-tech components in concentric rings
// Data loaded from data.json - supports edit mode for repositioning nodes

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let network = null;
let nodes = null;
let edges = null;
let graphData = null;  // Stores the loaded JSON data

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

/**
 * Check if edit mode is enabled via URL parameter
 * Usage: main.html?edit=true
 */
function isEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('edit') === 'true';
}

// ===========================================
// DATA LOADING
// ===========================================
async function loadGraphData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        graphData = await response.json();
        initializeNetwork();
        setupEditMode();
    } catch (error) {
        console.error('Error loading graph data:', error);
        document.getElementById('network').innerHTML =
            '<p style="color: red; padding: 20px; text-align: center;">Error loading data.json. Make sure the file exists.</p>';
    }
}

// ===========================================
// INFO PANEL MANAGEMENT
// ===========================================
function updateInfoPanel(nodeId) {
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (!node) return;

    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    // Get category class based on ring
    let categoryClass = 'category-' + (node.ring === 'center' ? 'learner' : node.ring);
    let categoryLabel = '';
    switch(node.ring) {
        case 'center': categoryLabel = 'Center Focus'; break;
        case 'inner': categoryLabel = 'Direct Learning Tool'; break;
        case 'middle': categoryLabel = 'Support System'; break;
        case 'outer': categoryLabel = 'Infrastructure'; break;
    }

    titleEl.textContent = node.label.replace('\n', ' ');
    textEl.innerHTML = `
        <span class="info-category ${categoryClass}">${categoryLabel}</span>
        <p>${node.description}</p>
    `;
}

function showExamples(nodeId) {
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (!node) return;

    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    let categoryClass = 'category-' + (node.ring === 'center' ? 'learner' : node.ring);
    let categoryLabel = '';
    switch(node.ring) {
        case 'center': categoryLabel = 'Center Focus'; break;
        case 'inner': categoryLabel = 'Direct Learning Tool'; break;
        case 'middle': categoryLabel = 'Support System'; break;
        case 'outer': categoryLabel = 'Infrastructure'; break;
    }

    titleEl.textContent = node.label.replace('\n', ' ');

    const examplesList = node.examples.map(ex => `<li>${ex}</li>`).join('');
    textEl.innerHTML = `
        <span class="info-category ${categoryClass}">${categoryLabel}</span>
        <p>${node.description}</p>
        <p><strong>Examples:</strong></p>
        <ul>${examplesList}</ul>
    `;
}

function resetInfoPanel() {
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    if (isEditMode()) {
        titleEl.textContent = 'Edit Mode Active';
        textEl.innerHTML = `
            <p><strong>Drag nodes</strong> to reposition them.</p>
            <p>Click <strong>Save Positions</strong> to download the updated data.json file.</p>
            <p>Replace the original data.json with the downloaded file to save your changes.</p>
        `;
    } else {
        titleEl.textContent = 'Educational Technology Ecosystem';
        textEl.innerHTML = `
            <p>This diagram shows how educational technology components work together to support learning.</p>
            <p><strong>Hover</strong> over any component to see its description.</p>
            <p><strong>Click</strong> to see examples of tools in that category.</p>
        `;
    }
}

// ===========================================
// EDIT MODE SETUP
// ===========================================
function setupEditMode() {
    const saveControls = document.getElementById('save-controls');
    const editIndicator = document.getElementById('edit-indicator');

    if (isEditMode()) {
        // Show save controls
        if (saveControls) {
            saveControls.style.display = 'flex';
        }
        // Show edit indicator
        if (editIndicator) {
            editIndicator.style.display = 'block';
        }
        // Update info panel for edit mode
        resetInfoPanel();
    } else {
        // Hide save controls
        if (saveControls) {
            saveControls.style.display = 'none';
        }
        // Hide edit indicator
        if (editIndicator) {
            editIndicator.style.display = 'none';
        }
    }
}

// ===========================================
// SAVE NODE POSITIONS
// ===========================================
function saveNodePositions() {
    if (!network || !graphData) return;

    // Get current positions from the network
    const positions = network.getPositions();

    // Update graphData with new positions
    graphData.nodes.forEach(node => {
        if (positions[node.id]) {
            node.x = Math.round(positions[node.id].x);
            node.y = Math.round(positions[node.id].y);
        }
    });

    // Update metadata
    graphData.metadata.lastUpdated = new Date().toISOString().split('T')[0];

    // Create JSON string with nice formatting
    const jsonString = JSON.stringify(graphData, null, 2);

    // Trigger download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show confirmation
    const textEl = document.getElementById('info-text');
    textEl.innerHTML = `
        <p style="color: green; font-weight: bold;">Positions saved!</p>
        <p>The data.json file has been downloaded. Replace the original file with the downloaded version to keep your changes.</p>
    `;
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    const enableMouseInteraction = !isInIframe();
    const editMode = isEditMode();
    const colors = graphData.colors;

    // Create nodes with styling based on ring
    const initialNodes = graphData.nodes.map(node => {
        let colorSet;
        switch(node.ring) {
            case 'center': colorSet = colors.learner; break;
            case 'inner': colorSet = colors.inner; break;
            case 'middle': colorSet = colors.middle; break;
            case 'outer': colorSet = colors.outer; break;
            default: colorSet = colors.inner;
        }

        return {
            id: node.id,
            label: node.label,
            x: node.x,
            y: node.y,
            color: {
                background: colorSet.background,
                border: colorSet.border,
                highlight: {
                    background: colorSet.background,
                    border: '#333'
                },
                hover: {
                    background: colorSet.background,
                    border: '#000'
                }
            },
            font: {
                color: colorSet.font,
                size: node.ring === 'center' ? 18 : 14,
                face: 'Arial',
                bold: node.ring === 'center'
            },
            size: node.ring === 'center' ? 40 : 25,
            shape: node.ring === 'center' ? 'circle' : 'box',
            margin: node.ring === 'center' ? 15 : 10
        };
    });

    // Create edges with labels
    const initialEdges = graphData.edges.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        font: {
            size: 10,
            color: '#555',
            strokeWidth: 3,
            strokeColor: '#fff',
            align: 'middle'
        },
        color: {
            color: '#888',
            highlight: '#333',
            hover: '#555'
        },
        width: 1.5,
        arrows: {
            to: { enabled: true, scaleFactor: 0.8 }
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
            selectConnectedEdges: true,
            zoomView: enableMouseInteraction || editMode,
            dragView: enableMouseInteraction || editMode,
            dragNodes: editMode,  // Only allow node dragging in edit mode
            navigationButtons: true,
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

    // Position view to center the graph
    setTimeout(positionView, 200);

    // Event handlers
    network.on('hoverNode', function(params) {
        updateInfoPanel(params.node);
    });

    network.on('blurNode', function() {
        resetInfoPanel();
    });

    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            showExamples(params.nodes[0]);
        } else {
            resetInfoPanel();
        }
    });

    // In edit mode, show position updates as nodes are dragged
    if (editMode) {
        network.on('dragEnd', function(params) {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const positions = network.getPositions([nodeId]);
                const pos = positions[nodeId];
                const titleEl = document.getElementById('info-title');
                const textEl = document.getElementById('info-text');
                titleEl.textContent = `Node: ${nodeId}`;
                textEl.innerHTML = `
                    <p><strong>New Position:</strong></p>
                    <p>x: ${Math.round(pos.x)}</p>
                    <p>y: ${Math.round(pos.y)}</p>
                    <p style="margin-top: 10px; color: #666;">Click "Save Positions" to download updated data.json</p>
                `;
            }
        });
    }
}

// ===========================================
// VIEW POSITIONING
// ===========================================
function positionView() {
    if (network) {
        // Get container width to calculate offset
        const container = document.getElementById('network');
        const containerWidth = container.offsetWidth;

        // Right panel is ~290px, so offset graph to center in left 2/3
        // Negative x moves the view right, showing content further left
        const rightPanelWidth = 290;
        const xOffset = rightPanelWidth / 2;

        network.moveTo({
            position: { x: xOffset, y: 0 },
            scale: 0.85,
            animation: false
        });
    }
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    loadGraphData();
    window.addEventListener('resize', positionView);

    // Setup save button event listener
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveNodePositions);
    }
});
