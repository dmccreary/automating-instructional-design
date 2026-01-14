// Learning Pathway Interactive MicroSim
// Students can mark known concepts and explore learning pathways
// Force-directed layout with 12 math concepts

// Canvas dimensions
let canvasWidth = 600;
let canvasHeight = 500;
let margin = 20;

// Control panel dimensions
let controlPanelHeight = 50;
let drawingHeight;

// Node properties
let nodeRadius = 28;
let nodes = [];
let edges = [];

// State tracking
let selectedGoal = null;
let pathToGoal = [];

// Colors
const colors = {
  locked: '#9E9E9E',      // Gray - not yet available
  known: '#4CAF50',       // Green - student knows this
  unlockable: '#FFC107',  // Yellow - prerequisites met
  goal: '#2196F3',        // Blue - selected goal
  edge: '#BDBDBD',        // Gray edge
  pathEdge: '#FF9800',    // Orange - path to goal
  text: '#FFFFFF',
  background: '#F5F5F5'
};

// 12 Math concepts with dependencies
const concepts = [
  { id: 0, name: "Numbers", prereqs: [], x: 0, y: 0 },
  { id: 1, name: "Addition", prereqs: [0], x: 0, y: 0 },
  { id: 2, name: "Subtraction", prereqs: [0], x: 0, y: 0 },
  { id: 3, name: "Multiplication", prereqs: [1], x: 0, y: 0 },
  { id: 4, name: "Division", prereqs: [2, 3], x: 0, y: 0 },
  { id: 5, name: "Fractions", prereqs: [4], x: 0, y: 0 },
  { id: 6, name: "Decimals", prereqs: [5], x: 0, y: 0 },
  { id: 7, name: "Percentages", prereqs: [5, 6], x: 0, y: 0 },
  { id: 8, name: "Variables", prereqs: [1, 2], x: 0, y: 0 },
  { id: 9, name: "Equations", prereqs: [8, 4], x: 0, y: 0 },
  { id: 10, name: "Functions", prereqs: [9], x: 0, y: 0 },
  { id: 11, name: "Graphing", prereqs: [10, 6], x: 0, y: 0 }
];

// Force-directed simulation parameters
let simulationRunning = true;
let simulationSteps = 0;
let maxSimulationSteps = 200;
let repulsionForce = 2000;
let attractionForce = 0.05;
let damping = 0.9;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  drawingHeight = canvasHeight - controlPanelHeight;

  textFont('Arial');
  initializeNodes();
  createEdges();

  describe('Interactive learning pathway visualization showing 12 math concepts. Click nodes to mark as known, see which concepts unlock, and trace paths to learning goals.', LABEL);
}

function initializeNodes() {
  nodes = [];

  // Initialize positions in a roughly layered layout
  let layers = [
    [0],           // Numbers
    [1, 2],        // Addition, Subtraction
    [3, 8],        // Multiplication, Variables
    [4],           // Division
    [5, 9],        // Fractions, Equations
    [6, 10],       // Decimals, Functions
    [7, 11]        // Percentages, Graphing
  ];

  for (let layerIdx = 0; layerIdx < layers.length; layerIdx++) {
    let layer = layers[layerIdx];
    let layerY = margin + 60 + (drawingHeight - 80) * (layerIdx / (layers.length - 1));

    for (let i = 0; i < layer.length; i++) {
      let conceptIdx = layer[i];
      let layerX = margin + 80 + (canvasWidth - 160) * ((i + 0.5) / layer.length);

      // Add some randomness for force-directed layout
      layerX += random(-20, 20);
      layerY += random(-10, 10);

      nodes.push({
        id: conceptIdx,
        name: concepts[conceptIdx].name,
        prereqs: concepts[conceptIdx].prereqs,
        x: layerX,
        y: layerY,
        vx: 0,
        vy: 0,
        known: conceptIdx === 0 // Start with "Numbers" as known
      });
    }
  }

  // Sort nodes by id for easy access
  nodes.sort((a, b) => a.id - b.id);
}

function createEdges() {
  edges = [];
  for (let node of nodes) {
    for (let prereqId of node.prereqs) {
      edges.push({
        from: prereqId,
        to: node.id
      });
    }
  }
}

function draw() {
  updateCanvasSize();
  background(colors.background);

  drawingHeight = canvasHeight - controlPanelHeight;

  // Run force-directed simulation
  if (simulationRunning && simulationSteps < maxSimulationSteps) {
    runForceSimulation();
    simulationSteps++;
  }

  // Update node states
  updateNodeStates();

  // Calculate path to goal if one is selected
  if (selectedGoal !== null) {
    pathToGoal = findPathToGoal(selectedGoal);
  }

  // Draw edges
  drawEdges();

  // Draw nodes
  drawNodes();

  // Draw control panel
  drawControlPanel();

  // Draw legend
  drawLegend();
}

function runForceSimulation() {
  // Apply repulsion between all nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let dx = nodes[j].x - nodes[i].x;
      let dy = nodes[j].y - nodes[i].y;
      let dist = max(1, sqrt(dx * dx + dy * dy));
      let force = repulsionForce / (dist * dist);

      let fx = (dx / dist) * force;
      let fy = (dy / dist) * force;

      nodes[i].vx -= fx;
      nodes[i].vy -= fy;
      nodes[j].vx += fx;
      nodes[j].vy += fy;
    }
  }

  // Apply attraction along edges
  for (let edge of edges) {
    let fromNode = nodes[edge.from];
    let toNode = nodes[edge.to];

    let dx = toNode.x - fromNode.x;
    let dy = toNode.y - fromNode.y;
    let dist = sqrt(dx * dx + dy * dy);

    let force = dist * attractionForce;

    let fx = (dx / dist) * force;
    let fy = (dy / dist) * force;

    fromNode.vx += fx;
    fromNode.vy += fy;
    toNode.vx -= fx;
    toNode.vy -= fy;
  }

  // Apply vertical layering force (keep hierarchy)
  for (let node of nodes) {
    let targetY = margin + 60 + (drawingHeight - 80) * (getNodeDepth(node.id) / 6);
    node.vy += (targetY - node.y) * 0.02;
  }

  // Update positions with damping
  for (let node of nodes) {
    node.vx *= damping;
    node.vy *= damping;

    node.x += node.vx;
    node.y += node.vy;

    // Keep nodes within bounds
    node.x = constrain(node.x, margin + nodeRadius, canvasWidth - margin - nodeRadius);
    node.y = constrain(node.y, margin + nodeRadius + controlPanelHeight, canvasHeight - margin - nodeRadius - 60);
  }
}

function getNodeDepth(nodeId) {
  let node = nodes[nodeId];
  if (node.prereqs.length === 0) return 0;
  let maxPrereqDepth = 0;
  for (let prereqId of node.prereqs) {
    maxPrereqDepth = max(maxPrereqDepth, getNodeDepth(prereqId));
  }
  return maxPrereqDepth + 1;
}

function updateNodeStates() {
  for (let node of nodes) {
    node.unlockable = false;
    node.isGoal = (node.id === selectedGoal);
    node.onPath = false;

    // Check if unlockable (all prerequisites known)
    if (!node.known && node.prereqs.length > 0) {
      let allPrereqsKnown = true;
      for (let prereqId of node.prereqs) {
        if (!nodes[prereqId].known) {
          allPrereqsKnown = false;
          break;
        }
      }
      node.unlockable = allPrereqsKnown;
    }
  }

  // Mark nodes on path to goal
  for (let nodeId of pathToGoal) {
    nodes[nodeId].onPath = true;
  }
}

function findPathToGoal(goalId) {
  if (goalId === null) return [];

  let goalNode = nodes[goalId];
  if (goalNode.known) return [];

  // BFS to find shortest path of unknown concepts
  let path = [];
  let toVisit = [goalId];
  let visited = new Set();

  while (toVisit.length > 0) {
    let currentId = toVisit.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    let currentNode = nodes[currentId];
    if (!currentNode.known) {
      path.push(currentId);

      for (let prereqId of currentNode.prereqs) {
        if (!visited.has(prereqId)) {
          toVisit.push(prereqId);
        }
      }
    }
  }

  return path;
}

function drawEdges() {
  for (let edge of edges) {
    let fromNode = nodes[edge.from];
    let toNode = nodes[edge.to];

    // Check if this edge is on the path to goal
    let onPath = pathToGoal.includes(edge.from) && pathToGoal.includes(edge.to);

    if (onPath) {
      stroke(colors.pathEdge);
      strokeWeight(3);
    } else {
      stroke(colors.edge);
      strokeWeight(1.5);
    }

    // Draw line
    line(fromNode.x, fromNode.y, toNode.x, toNode.y);

    // Draw arrowhead
    let angle = atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
    let arrowX = toNode.x - cos(angle) * (nodeRadius + 2);
    let arrowY = toNode.y - sin(angle) * (nodeRadius + 2);

    push();
    translate(arrowX, arrowY);
    rotate(angle);
    fill(onPath ? colors.pathEdge : colors.edge);
    noStroke();
    triangle(0, 0, -10, -5, -10, 5);
    pop();
  }
}

function drawNodes() {
  for (let node of nodes) {
    let nodeColor;
    let strokeColor = '#333333';
    let strokeW = 2;

    if (node.known) {
      nodeColor = colors.known;
    } else if (node.isGoal) {
      nodeColor = colors.goal;
      strokeW = 4;
    } else if (node.unlockable) {
      nodeColor = colors.unlockable;
    } else {
      nodeColor = colors.locked;
    }

    // Highlight if on path
    if (node.onPath && !node.known) {
      strokeColor = colors.pathEdge;
      strokeW = 4;
    }

    // Draw node
    fill(nodeColor);
    stroke(strokeColor);
    strokeWeight(strokeW);
    ellipse(node.x, node.y, nodeRadius * 2, nodeRadius * 2);

    // Draw label
    fill(node.known || node.isGoal ? colors.text : '#333333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(node.name, node.x, node.y);
    textStyle(NORMAL);
  }
}

function drawControlPanel() {
  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(0, 0, canvasWidth, controlPanelHeight);

  // Title
  fill(50);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  textStyle(BOLD);
  text("Learning Pathway Explorer", margin, controlPanelHeight / 2);
  textStyle(NORMAL);

  // Reset button
  let btnX = canvasWidth - margin - 70;
  let btnY = 10;
  let btnW = 60;
  let btnH = 30;

  let overBtn = mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH;

  fill(overBtn ? '#E53935' : '#F44336');
  noStroke();
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Reset", btnX + btnW/2, btnY + btnH/2);

  // Instructions
  fill(100);
  textAlign(LEFT, CENTER);
  textSize(11);
  text("Click: mark known | Right-click: set goal", canvasWidth/2 - 80, controlPanelHeight/2);
}

function drawLegend() {
  let legendY = canvasHeight - 50;
  let legendX = margin;
  let boxSize = 16;
  let spacing = 100;

  // Background
  fill(255, 240);
  noStroke();
  rect(legendX - 5, legendY - 5, canvasWidth - 2*margin + 10, 45, 5);

  textSize(10);
  textAlign(LEFT, CENTER);

  // Known
  fill(colors.known);
  rect(legendX, legendY, boxSize, boxSize, 3);
  fill(50);
  text("Known", legendX + boxSize + 5, legendY + boxSize/2);

  // Unlockable
  legendX += spacing;
  fill(colors.unlockable);
  rect(legendX, legendY, boxSize, boxSize, 3);
  fill(50);
  text("Unlockable", legendX + boxSize + 5, legendY + boxSize/2);

  // Locked
  legendX += spacing;
  fill(colors.locked);
  rect(legendX, legendY, boxSize, boxSize, 3);
  fill(50);
  text("Locked", legendX + boxSize + 5, legendY + boxSize/2);

  // Goal
  legendX += spacing;
  fill(colors.goal);
  rect(legendX, legendY, boxSize, boxSize, 3);
  fill(50);
  text("Goal", legendX + boxSize + 5, legendY + boxSize/2);

  // Path info
  if (selectedGoal !== null && pathToGoal.length > 0) {
    legendY += 22;
    textSize(11);
    fill(colors.pathEdge);
    textAlign(LEFT, CENTER);
    text("Path to " + nodes[selectedGoal].name + ": " + pathToGoal.length + " concepts to learn", margin, legendY);
  }
}

function mousePressed() {
  // Check reset button
  let btnX = canvasWidth - margin - 70;
  let btnY = 10;
  let btnW = 60;
  let btnH = 30;

  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    resetSimulation();
    return;
  }

  // Check if clicking on a node
  for (let node of nodes) {
    let d = dist(mouseX, mouseY, node.x, node.y);
    if (d < nodeRadius) {
      if (mouseButton === LEFT) {
        // Toggle known state (can only mark as known if unlockable or already known)
        if (node.unlockable || node.known || node.prereqs.length === 0) {
          node.known = !node.known;
          // Clear goal if we just learned it
          if (node.known && node.id === selectedGoal) {
            selectedGoal = null;
            pathToGoal = [];
          }
        }
      }
      return;
    }
  }
}

// Right-click to set goal
function mouseClicked() {
  if (mouseButton === RIGHT || (mouseButton === LEFT && keyIsDown(CONTROL))) {
    for (let node of nodes) {
      let d = dist(mouseX, mouseY, node.x, node.y);
      if (d < nodeRadius) {
        if (!node.known) {
          if (selectedGoal === node.id) {
            selectedGoal = null;
            pathToGoal = [];
          } else {
            selectedGoal = node.id;
          }
        }
        return false;
      }
    }
  }
}

// Prevent context menu
function contextMenuHandler(e) {
  e.preventDefault();
  return false;
}

function resetSimulation() {
  // Reset all nodes to initial state
  for (let node of nodes) {
    node.known = (node.id === 0); // Only "Numbers" is known
  }
  selectedGoal = null;
  pathToGoal = [];

  // Reset positions and restart force simulation
  initializeNodes();
  simulationSteps = 0;
  simulationRunning = true;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  drawingHeight = canvasHeight - controlPanelHeight;

  // Restart simulation to adjust positions
  simulationSteps = 0;
  simulationRunning = true;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}

// Disable context menu on canvas
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.addEventListener('contextmenu', contextMenuHandler);
  }
});
