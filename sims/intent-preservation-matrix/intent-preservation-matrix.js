// Intent Preservation Matrix
// Interactive vis-network visualization showing traceability from learning objectives
// to specification details for a Supply and Demand MicroSim example
// Click nodes to highlight connection paths, toggle orphan detection

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let network = null;
let nodes = null;
let edges = null;
let showingOrphans = false;

// ===========================================
// HIERARCHY LEVEL DEFINITIONS
// ===========================================
const LEVELS = {
    OBJECTIVE: 0,
    CONCEPT: 1,
    FEATURE: 2,
    DETAIL: 3
};

// ===========================================
// COLOR SCHEME
// ===========================================
const colors = {
    objective: { background: '#1a365d', border: '#0d1b2a', font: '#ffffff' },
    concept: { background: '#2563eb', border: '#1d4ed8', font: '#ffffff' },
    feature: { background: '#60a5fa', border: '#3b82f6', font: '#1a365d' },
    detail: { background: '#94a3b8', border: '#64748b', font: '#ffffff' },
    orphan: { background: '#ef4444', border: '#dc2626', font: '#ffffff' },
    highlighted: { background: '#fbbf24', border: '#f59e0b', font: '#000000' },
    dimmed: { background: '#e2e8f0', border: '#cbd5e1', font: '#94a3b8' },
    edge: {
        default: '#64748b',
        highlighted: '#f59e0b',
        dimmed: '#e2e8f0'
    }
};

// ===========================================
// NODE DATA - Supply and Demand MicroSim Example
// ===========================================
const nodeData = [
    // Level 0: Learning Objective (1 node, spans width)
    {
        id: 'obj1',
        label: 'Understand how price equilibrium\nemerges from supply and demand interaction',
        level: LEVELS.OBJECTIVE,
        rationale: 'This is the core learning goal. Every element in the simulation should help students discover how market forces find balance.',
        x: 0, y: 0
    },

    // Level 1: Key Concepts (4 nodes)
    {
        id: 'con1',
        label: 'Supply curve\nslopes upward',
        level: LEVELS.CONCEPT,
        rationale: 'Students must understand that higher prices incentivize more supply. This is a foundational economic principle.',
        x: -300, y: 100
    },
    {
        id: 'con2',
        label: 'Demand curve\nslopes downward',
        level: LEVELS.CONCEPT,
        rationale: 'Students must understand that higher prices reduce demand. This complements the supply concept.',
        x: -100, y: 100
    },
    {
        id: 'con3',
        label: 'Equilibrium occurs\nat intersection',
        level: LEVELS.CONCEPT,
        rationale: 'The key insight is that markets self-balance where supply meets demand. This is the "aha" moment.',
        x: 100, y: 100
    },
    {
        id: 'con4',
        label: 'Shifts affect\nequilibrium',
        level: LEVELS.CONCEPT,
        rationale: 'Students explore cause-and-effect by seeing how external factors change the balance point.',
        x: 300, y: 100
    },

    // Level 2: Features/Elements (5 nodes)
    {
        id: 'feat1',
        label: 'Draggable\ndemand curve',
        level: LEVELS.FEATURE,
        rationale: 'Direct manipulation helps students build intuition about how demand changes affect markets.',
        x: -350, y: 220
    },
    {
        id: 'feat2',
        label: 'Draggable\nsupply curve',
        level: LEVELS.FEATURE,
        rationale: 'Matching interaction for supply reinforces the symmetry of market forces.',
        x: -175, y: 220
    },
    {
        id: 'feat3',
        label: 'Equilibrium\npoint marker',
        level: LEVELS.FEATURE,
        rationale: 'Visual emphasis on the intersection makes the key concept salient and memorable.',
        x: 0, y: 220
    },
    {
        id: 'feat4',
        label: 'Price/quantity\nreadout',
        level: LEVELS.FEATURE,
        rationale: 'Numeric feedback connects the visual representation to quantitative understanding.',
        x: 175, y: 220
    },
    {
        id: 'feat5',
        label: 'Shift\nbuttons',
        level: LEVELS.FEATURE,
        rationale: 'Structured exploration through buttons guides students to discover shift effects systematically.',
        x: 350, y: 220
    },

    // Level 3: Specification Details (5 nodes)
    {
        id: 'det1',
        label: 'Demand: blue, dashed,\nendpoints draggable',
        level: LEVELS.DETAIL,
        rationale: 'Blue color is conventionally associated with demand in economics. Dashed line distinguishes from supply.',
        x: -350, y: 340
    },
    {
        id: 'det2',
        label: 'Supply: red, solid,\nendpoints draggable',
        level: LEVELS.DETAIL,
        rationale: 'Red for supply creates clear visual contrast. Solid line indicates the "given" curve students typically see first.',
        x: -175, y: 340
    },
    {
        id: 'det3',
        label: 'Intersection: yellow circle,\n10px radius',
        level: LEVELS.DETAIL,
        rationale: 'Yellow draws attention as a highlight color. Size is large enough to see but not overwhelming.',
        x: 0, y: 340
    },
    {
        id: 'det4',
        label: 'Numeric display\nupdates in real-time',
        level: LEVELS.DETAIL,
        rationale: 'Immediate feedback maintains cognitive connection between action and result.',
        x: 175, y: 340
    },
    {
        id: 'det5',
        label: 'Shift buttons move curve\nleft/right by 20 units',
        level: LEVELS.DETAIL,
        rationale: '20 units provides visible change without being so large that intermediate states are skipped.',
        x: 350, y: 340
    },

    // Orphan node for demonstration (intentionally unconnected)
    {
        id: 'orphan1',
        label: 'Background\ngrid lines',
        level: LEVELS.DETAIL,
        rationale: 'This decorative element has no clear connection to learning objectives - it may be unnecessary.',
        x: 450, y: 280,
        isOrphan: true
    }
];

// ===========================================
// EDGE DATA - Traceability Connections
// ===========================================
const edgeData = [
    // Objective -> Concepts
    { from: 'obj1', to: 'con1' },
    { from: 'obj1', to: 'con2' },
    { from: 'obj1', to: 'con3' },
    { from: 'obj1', to: 'con4' },

    // Concepts -> Features
    { from: 'con1', to: 'feat2' },  // Supply curve concept -> Draggable supply
    { from: 'con2', to: 'feat1' },  // Demand curve concept -> Draggable demand
    { from: 'con3', to: 'feat3' },  // Equilibrium concept -> Equilibrium marker
    { from: 'con3', to: 'feat4' },  // Equilibrium concept -> Readout
    { from: 'con4', to: 'feat5' },  // Shifts concept -> Shift buttons
    { from: 'con4', to: 'feat1' },  // Shifts affect demand
    { from: 'con4', to: 'feat2' },  // Shifts affect supply

    // Features -> Details
    { from: 'feat1', to: 'det1' },  // Draggable demand -> Demand styling
    { from: 'feat2', to: 'det2' },  // Draggable supply -> Supply styling
    { from: 'feat3', to: 'det3' },  // Equilibrium marker -> Yellow circle spec
    { from: 'feat4', to: 'det4' },  // Readout -> Real-time update
    { from: 'feat5', to: 'det5' }   // Shift buttons -> 20 unit increment
];

// ===========================================
// HELPER FUNCTIONS
// ===========================================
function getColorForLevel(level) {
    switch (level) {
        case LEVELS.OBJECTIVE: return colors.objective;
        case LEVELS.CONCEPT: return colors.concept;
        case LEVELS.FEATURE: return colors.feature;
        case LEVELS.DETAIL: return colors.detail;
        default: return colors.detail;
    }
}

function getLevelName(level) {
    switch (level) {
        case LEVELS.OBJECTIVE: return 'Learning Objective';
        case LEVELS.CONCEPT: return 'Key Concept';
        case LEVELS.FEATURE: return 'Feature/Element';
        case LEVELS.DETAIL: return 'Specification Detail';
        default: return 'Unknown';
    }
}

function getLevelClass(level) {
    switch (level) {
        case LEVELS.OBJECTIVE: return 'objective';
        case LEVELS.CONCEPT: return 'concept';
        case LEVELS.FEATURE: return 'feature';
        case LEVELS.DETAIL: return 'detail';
        default: return 'detail';
    }
}

// Find all ancestors (nodes that lead to this node)
function getAncestors(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const ancestors = [];
    edgeData.forEach(edge => {
        if (edge.to === nodeId) {
            ancestors.push(edge.from);
            ancestors.push(...getAncestors(edge.from, visited));
        }
    });
    return [...new Set(ancestors)];
}

// Find all descendants (nodes that this node leads to)
function getDescendants(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const descendants = [];
    edgeData.forEach(edge => {
        if (edge.from === nodeId) {
            descendants.push(edge.to);
            descendants.push(...getDescendants(edge.to, visited));
        }
    });
    return [...new Set(descendants)];
}

// Find edges in the path to/from a node
function getConnectedEdgeIds(nodeId, ancestors, descendants) {
    const connected = [];
    edgeData.forEach((edge, index) => {
        const isOnPath =
            // Direct connection to selected node
            edge.from === nodeId || edge.to === nodeId ||
            // Connection between ancestors
            (ancestors.includes(edge.from) && (ancestors.includes(edge.to) || edge.to === nodeId)) ||
            // Connection between descendants
            (descendants.includes(edge.to) && (descendants.includes(edge.from) || edge.from === nodeId));

        if (isOnPath) {
            connected.push(index);
        }
    });
    return connected;
}

// Find orphan nodes (no incoming or outgoing edges, or only connects to orphans)
function findOrphans() {
    const orphanIds = [];
    nodeData.forEach(node => {
        const hasIncoming = edgeData.some(e => e.to === node.id);
        const hasOutgoing = edgeData.some(e => e.from === node.id);

        // A node is orphan if it has no connections
        if (!hasIncoming && !hasOutgoing) {
            orphanIds.push(node.id);
        }
        // Or if it's marked as orphan in the data
        if (node.isOrphan) {
            orphanIds.push(node.id);
        }
    });
    return [...new Set(orphanIds)];
}

// ===========================================
// INFO PANEL MANAGEMENT
// ===========================================
function updateInfoPanel(nodeId, mode = 'hover') {
    const node = nodeData.find(n => n.id === nodeId);
    if (!node) return;

    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = node.label.replace(/\n/g, ' ');

    const levelClass = getLevelClass(node.level);
    const levelName = getLevelName(node.level);

    if (mode === 'click') {
        const ancestors = getAncestors(nodeId);
        const descendants = getDescendants(nodeId);

        textEl.innerHTML = `
            <span class="level-badge ${levelClass}">${levelName}</span>
            <div class="rationale">
                <strong>Rationale:</strong><br>
                ${node.rationale}
            </div>
            <hr>
            <p><strong>Traces up to (${ancestors.length}):</strong><br>
            ${ancestors.length > 0 ? ancestors.map(id => {
                const n = nodeData.find(c => c.id === id);
                return n ? n.label.replace(/\n/g, ' ') : '';
            }).join('<br>') : 'None (top level)'}</p>
            <p><strong>Leads to (${descendants.length}):</strong><br>
            ${descendants.length > 0 ? descendants.map(id => {
                const n = nodeData.find(c => c.id === id);
                return n ? n.label.replace(/\n/g, ' ') : '';
            }).join('<br>') : 'None (leaf level)'}</p>
        `;
    } else {
        textEl.innerHTML = `
            <span class="level-badge ${levelClass}">${levelName}</span>
            <div class="rationale">
                <strong>Rationale:</strong><br>
                ${node.rationale}
            </div>
        `;
    }
}

function resetInfoPanel() {
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');

    titleEl.textContent = 'Intent Preservation Matrix';
    textEl.innerHTML = `
        <p><strong>Click</strong> any element to highlight its connections.</p>
        <p><strong>Hover</strong> to see details and rationale.</p>
        <hr>
        <p style="font-size: 11px;">
            Every specification detail should trace back to a learning objective through the hierarchy.
        </p>
        <p style="font-size: 11px; margin-top: 8px;">
            <strong>Color Key:</strong><br>
            <span style="color: #1a365d;">Dark Blue</span> = Objective<br>
            <span style="color: #2563eb;">Blue</span> = Concepts<br>
            <span style="color: #60a5fa;">Light Blue</span> = Features<br>
            <span style="color: #94a3b8;">Gray</span> = Details<br>
            <span style="color: #ef4444;">Red</span> = Orphans
        </p>
    `;
}

// ===========================================
// HIGHLIGHT FUNCTIONS
// ===========================================
function highlightConnections(nodeId) {
    const ancestors = getAncestors(nodeId);
    const descendants = getDescendants(nodeId);
    const connectedEdges = getConnectedEdgeIds(nodeId, ancestors, descendants);
    const allConnected = [nodeId, ...ancestors, ...descendants];

    // Update nodes
    const updatedNodes = nodeData.map(node => {
        let nodeColor;
        if (node.id === nodeId) {
            nodeColor = colors.highlighted;
        } else if (allConnected.includes(node.id)) {
            nodeColor = getColorForLevel(node.level);
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
            font: { color: nodeColor.font, size: 12, face: 'Arial', multi: true }
        };
    });

    // Update edges
    const updatedEdges = edgeData.map((edge, index) => {
        const isConnected = connectedEdges.includes(index);
        return {
            id: index,
            color: {
                color: isConnected ? colors.edge.highlighted : colors.edge.dimmed,
                highlight: isConnected ? colors.edge.highlighted : colors.edge.dimmed
            },
            width: isConnected ? 3 : 1
        };
    });

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    updateInfoPanel(nodeId, 'click');
}

function highlightOrphans() {
    const orphanIds = findOrphans();

    const updatedNodes = nodeData.map(node => {
        const isOrphan = orphanIds.includes(node.id);
        const nodeColor = isOrphan ? colors.orphan : colors.dimmed;

        return {
            id: node.id,
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: { background: nodeColor.background, border: nodeColor.border }
            },
            font: { color: nodeColor.font, size: 12, face: 'Arial', multi: true }
        };
    });

    const updatedEdges = edgeData.map((edge, index) => ({
        id: index,
        color: { color: colors.edge.dimmed, highlight: colors.edge.dimmed },
        width: 1
    }));

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    // Update info panel
    const titleEl = document.getElementById('info-title');
    const textEl = document.getElementById('info-text');
    titleEl.textContent = 'Orphan Detection';
    textEl.innerHTML = `
        <p><strong>Found ${orphanIds.length} orphan element(s):</strong></p>
        ${orphanIds.map(id => {
            const node = nodeData.find(n => n.id === id);
            return `<p style="color: #ef4444;">${node.label.replace(/\n/g, ' ')}</p>`;
        }).join('')}
        <hr>
        <p style="font-size: 11px;">
            Orphan elements have no connection to the learning objective. Consider removing them or adding traceability.
        </p>
    `;
}

function resetHighlight() {
    const updatedNodes = nodeData.map(node => {
        const nodeColor = node.isOrphan && showingOrphans ? colors.orphan : getColorForLevel(node.level);
        return {
            id: node.id,
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: { background: colors.highlighted.background, border: colors.highlighted.border }
            },
            font: { color: nodeColor.font, size: 12, face: 'Arial', multi: true }
        };
    });

    const updatedEdges = edgeData.map((edge, index) => ({
        id: index,
        color: { color: colors.edge.default, highlight: colors.edge.highlighted },
        width: 2
    }));

    nodes.update(updatedNodes);
    edges.update(updatedEdges);

    resetInfoPanel();
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    // Create nodes with styling
    const initialNodes = nodeData.map(node => {
        const nodeColor = getColorForLevel(node.level);
        const nodeWidth = node.level === LEVELS.OBJECTIVE ? 400 : 120;

        return {
            id: node.id,
            label: node.label,
            x: node.x,
            y: node.y,
            color: {
                background: nodeColor.background,
                border: nodeColor.border,
                highlight: {
                    background: colors.highlighted.background,
                    border: colors.highlighted.border
                },
                hover: {
                    background: nodeColor.background,
                    border: '#000'
                }
            },
            font: {
                color: nodeColor.font,
                size: 12,
                face: 'Arial',
                multi: true
            },
            shape: 'box',
            margin: { top: 10, bottom: 10, left: 15, right: 15 },
            borderWidth: 2,
            widthConstraint: { minimum: nodeWidth, maximum: nodeWidth }
        };
    });

    // Create edges with styling
    const initialEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        color: {
            color: colors.edge.default,
            highlight: colors.edge.highlighted,
            hover: '#333'
        },
        width: 2,
        arrows: {
            to: { enabled: true, scaleFactor: 0.6, type: 'arrow' }
        },
        smooth: {
            type: 'cubicBezier',
            forceDirection: 'vertical',
            roundness: 0.4
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
            zoomView: false,
            dragView: false,
            dragNodes: false,
            navigationButtons: true,
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
                type: 'cubicBezier',
                forceDirection: 'vertical',
                roundness: 0.4
            }
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Center the view
    setTimeout(() => {
        network.moveTo({
            position: { x: 50, y: 180 },
            scale: 0.95,
            animation: false
        });
    }, 100);

    // Event handlers
    network.on('hoverNode', function(params) {
        updateInfoPanel(params.node, 'hover');
    });

    network.on('blurNode', function() {
        const selected = network.getSelectedNodes();
        if (selected.length === 0 && !showingOrphans) {
            resetInfoPanel();
        }
    });

    network.on('click', function(params) {
        if (showingOrphans) {
            // Exit orphan mode on any click
            showingOrphans = false;
            document.getElementById('toggle-orphans').textContent = 'Show Orphans';
            document.getElementById('toggle-orphans').classList.remove('active');
        }

        if (params.nodes.length > 0) {
            highlightConnections(params.nodes[0]);
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

    // Toggle orphans button handler
    const toggleBtn = document.getElementById('toggle-orphans');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            showingOrphans = !showingOrphans;
            if (showingOrphans) {
                highlightOrphans();
                toggleBtn.textContent = 'Hide Orphans';
                toggleBtn.classList.add('active');
            } else {
                resetHighlight();
                toggleBtn.textContent = 'Show Orphans';
                toggleBtn.classList.remove('active');
            }
        });
    }

    // Reset button handler
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            showingOrphans = false;
            document.getElementById('toggle-orphans').textContent = 'Show Orphans';
            document.getElementById('toggle-orphans').classList.remove('active');
            network.selectNodes([]);
            resetHighlight();
        });
    }
});
