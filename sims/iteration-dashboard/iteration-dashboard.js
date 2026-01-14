// Iteration Dashboard MicroSim
// Learning Objective: Provide a multi-panel dashboard for tracking iteration progress with quality gates

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;

// Version history data
let versions = [
    { id: 'v1.0', score: 45, date: 'Jan 1', status: 'released' },
    { id: 'v1.1', score: 58, date: 'Jan 8', status: 'released' },
    { id: 'v1.2', score: 72, date: 'Jan 15', status: 'released' },
    { id: 'v1.3', score: 81, date: 'Jan 22', status: 'released' },
    { id: 'v1.4', score: 88, date: 'Jan 29', status: 'current' }
];

let selectedVersionIndex = 4;

// Quality metrics per version
let qualityMetrics = [
    { tech: 40, pedagogy: 50, ux: 45, accessibility: 45 },
    { tech: 55, pedagogy: 60, ux: 58, accessibility: 59 },
    { tech: 70, pedagogy: 75, ux: 72, accessibility: 71 },
    { tech: 80, pedagogy: 82, ux: 80, accessibility: 82 },
    { tech: 90, pedagogy: 88, ux: 85, accessibility: 89 }
];

// Issues data
let issues = [
    { id: 1, text: 'Navigation broken on mobile', severity: 'critical', resolved: true },
    { id: 2, text: 'Quiz scoring incorrect', severity: 'critical', resolved: true },
    { id: 3, text: 'Slow load time > 5s', severity: 'major', resolved: true },
    { id: 4, text: 'Color contrast too low', severity: 'major', resolved: true },
    { id: 5, text: 'Missing alt text on images', severity: 'major', resolved: false },
    { id: 6, text: 'Typo in Chapter 3 title', severity: 'minor', resolved: true },
    { id: 7, text: 'Button hover state unclear', severity: 'minor', resolved: false },
    { id: 8, text: 'Footer links misaligned', severity: 'minor', resolved: false }
];

// Decision log
let decisions = [
    { text: 'Use p5.js for interactive sims', rationale: 'Best balance of features and learning curve', date: 'Jan 5' },
    { text: 'Implement mobile-first design', rationale: 'Analytics show 60% mobile users', date: 'Jan 10' },
    { text: 'Add keyboard navigation', rationale: 'Required for WCAG 2.1 AA compliance', date: 'Jan 18' },
    { text: 'Reduce initial bundle size', rationale: 'Target load time under 2 seconds', date: 'Jan 25' }
];

let issueFilter = 'all'; // 'all', 'critical', 'major', 'minor', 'resolved'
let hoveredMetric = null;

// Panel dimensions
let panelMargin = 10;
let panelWidth, panelHeight;
let headerHeight = 30;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, drawHeight + controlHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    panelWidth = (canvasWidth - panelMargin * 3) / 2;
    panelHeight = (drawHeight - panelMargin * 3 - controlHeight) / 2;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth - 20, 900);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, drawHeight + controlHeight);
    panelWidth = (canvasWidth - panelMargin * 3) / 2;
    panelHeight = (drawHeight - panelMargin * 3 - controlHeight) / 2;
}

function draw() {
    background(240);

    // Draw title
    fill(30, 60, 120);
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
    text('Iteration Dashboard', panelMargin, 8);

    // Draw quality gates status
    drawQualityGates();

    // Draw four panels
    let startY = 45;

    // Panel 1: Version History (top-left)
    drawPanel(panelMargin, startY, panelWidth, panelHeight, 'Version History');
    drawVersionHistory(panelMargin, startY + headerHeight, panelWidth, panelHeight - headerHeight);

    // Panel 2: Quality Metrics (top-right)
    drawPanel(panelWidth + panelMargin * 2, startY, panelWidth, panelHeight, 'Quality Metrics');
    drawQualityMetrics(panelWidth + panelMargin * 2, startY + headerHeight, panelWidth, panelHeight - headerHeight);

    // Panel 3: Issues Tracker (bottom-left)
    drawPanel(panelMargin, startY + panelHeight + panelMargin, panelWidth, panelHeight, 'Issues Tracker');
    drawIssuesTracker(panelMargin, startY + panelHeight + panelMargin + headerHeight, panelWidth, panelHeight - headerHeight);

    // Panel 4: Decision Log (bottom-right)
    drawPanel(panelWidth + panelMargin * 2, startY + panelHeight + panelMargin, panelWidth, panelHeight, 'Decision Log');
    drawDecisionLog(panelWidth + panelMargin * 2, startY + panelHeight + panelMargin + headerHeight, panelWidth, panelHeight - headerHeight);

    // Draw controls
    drawControls();

    // Draw tooltip if hovering
    drawTooltip();
}

function drawPanel(x, y, w, h, title) {
    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Header
    fill(30, 60, 120);
    noStroke();
    rect(x, y, w, headerHeight, 5, 5, 0, 0);

    // Title
    fill(255);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(title, x + 10, y + headerHeight / 2);
}

function drawQualityGates() {
    let gateY = 12;
    let gateX = canvasWidth - 320;

    // Testing gate
    let criticalResolved = issues.filter(i => i.severity === 'critical' && !i.resolved).length === 0;
    fill(criticalResolved ? color(46, 125, 50) : color(198, 40, 40));
    noStroke();
    ellipse(gateX, gateY + 8, 12, 12);
    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Testing Ready', gateX + 10, gateY + 8);

    // Deployment gate
    let currentScore = versions[selectedVersionIndex].score;
    let deployReady = currentScore >= 85;
    fill(deployReady ? color(46, 125, 50) : color(198, 40, 40));
    ellipse(gateX + 140, gateY + 8, 12, 12);
    fill(60);
    text('Deploy Ready (>85)', gateX + 150, gateY + 8);
}

function drawVersionHistory(x, y, w, h) {
    let padding = 15;
    let timelineY = y + h / 2;
    let nodeSpacing = (w - padding * 2) / (versions.length - 1);

    // Draw timeline line
    stroke(180);
    strokeWeight(2);
    line(x + padding, timelineY, x + w - padding, timelineY);

    // Draw version nodes
    for (let i = 0; i < versions.length; i++) {
        let nodeX = x + padding + i * nodeSpacing;
        let v = versions[i];
        let isSelected = i === selectedVersionIndex;

        // Node circle
        strokeWeight(isSelected ? 3 : 1);
        stroke(isSelected ? color(30, 60, 120) : 150);
        fill(getScoreColor(v.score));
        ellipse(nodeX, timelineY, isSelected ? 30 : 24, isSelected ? 30 : 24);

        // Version label
        fill(isSelected ? color(30, 60, 120) : 80);
        noStroke();
        textSize(isSelected ? 12 : 10);
        textAlign(CENTER, CENTER);
        text(v.id, nodeX, timelineY - 25);

        // Score
        fill(255);
        textSize(10);
        text(v.score, nodeX, timelineY);

        // Date
        fill(100);
        textSize(9);
        text(v.date, nodeX, timelineY + 25);

        // Arrow to next
        if (i < versions.length - 1) {
            let arrowX = nodeX + (isSelected ? 18 : 15);
            stroke(180);
            strokeWeight(1);
            fill(180);
            triangle(arrowX + 8, timelineY, arrowX + 3, timelineY - 4, arrowX + 3, timelineY + 4);
        }
    }

    // Current version indicator
    if (versions[selectedVersionIndex].status === 'current') {
        fill(30, 60, 120);
        textSize(10);
        textAlign(CENTER, TOP);
        let currentX = x + padding + selectedVersionIndex * nodeSpacing;
        text('CURRENT', currentX, timelineY + 38);
    }
}

function drawQualityMetrics(x, y, w, h) {
    let metrics = qualityMetrics[selectedVersionIndex];
    let metricNames = ['Technical', 'Pedagogical', 'UX', 'Accessibility'];
    let metricValues = [metrics.tech, metrics.pedagogy, metrics.ux, metrics.accessibility];

    let barWidth = 30;
    let barSpacing = (w - 40) / 4;
    let maxBarHeight = h - 50;
    let barY = y + h - 20;

    hoveredMetric = null;

    for (let i = 0; i < 4; i++) {
        let barX = x + 20 + i * barSpacing + barSpacing / 2 - barWidth / 2;
        let barHeight = (metricValues[i] / 100) * maxBarHeight;

        // Check hover
        if (mouseX >= barX && mouseX <= barX + barWidth &&
            mouseY >= barY - barHeight && mouseY <= barY) {
            hoveredMetric = { name: metricNames[i], value: metricValues[i], x: mouseX, y: mouseY };
        }

        // Bar background
        fill(230);
        noStroke();
        rect(barX, barY - maxBarHeight, barWidth, maxBarHeight, 3);

        // Bar value
        fill(getScoreColor(metricValues[i]));
        rect(barX, barY - barHeight, barWidth, barHeight, 3);

        // Value label
        fill(60);
        textSize(11);
        textAlign(CENTER, BOTTOM);
        text(metricValues[i], barX + barWidth / 2, barY - barHeight - 3);

        // Metric name
        textSize(9);
        textAlign(CENTER, TOP);
        text(metricNames[i], barX + barWidth / 2, barY + 3);
    }

    // Draw threshold lines
    stroke(255, 200, 0);
    strokeWeight(1);
    let threshold80Y = barY - (80 / 100) * maxBarHeight;
    line(x + 15, threshold80Y, x + w - 15, threshold80Y);

    stroke(255, 100, 100);
    let threshold50Y = barY - (50 / 100) * maxBarHeight;
    line(x + 15, threshold50Y, x + w - 15, threshold50Y);

    // Legend
    fill(100);
    textSize(8);
    textAlign(LEFT, CENTER);
    noStroke();
    fill(255, 200, 0);
    rect(x + 10, y + 5, 10, 2);
    fill(100);
    text('80 (Good)', x + 25, y + 6);

    fill(255, 100, 100);
    rect(x + 80, y + 5, 10, 2);
    fill(100);
    text('50 (Min)', x + 95, y + 6);
}

function drawIssuesTracker(x, y, w, h) {
    // Filter buttons
    let filters = ['all', 'critical', 'major', 'minor', 'resolved'];
    let filterColors = [color(100), color(198, 40, 40), color(230, 126, 34), color(241, 196, 15), color(46, 125, 50)];
    let btnWidth = (w - 20) / 5;

    for (let i = 0; i < filters.length; i++) {
        let btnX = x + 10 + i * btnWidth;
        let isActive = issueFilter === filters[i];

        fill(isActive ? filterColors[i] : 230);
        stroke(filterColors[i]);
        strokeWeight(1);
        rect(btnX, y + 5, btnWidth - 5, 20, 3);

        fill(isActive ? 255 : 80);
        noStroke();
        textSize(9);
        textAlign(CENTER, CENTER);
        text(filters[i].charAt(0).toUpperCase() + filters[i].slice(1), btnX + (btnWidth - 5) / 2, y + 15);
    }

    // Filter issues
    let filteredIssues = issues.filter(issue => {
        if (issueFilter === 'all') return true;
        if (issueFilter === 'resolved') return issue.resolved;
        return issue.severity === issueFilter && !issue.resolved;
    });

    // Issues list
    let listY = y + 35;
    let lineHeight = 22;
    let maxIssues = Math.floor((h - 45) / lineHeight);

    for (let i = 0; i < Math.min(filteredIssues.length, maxIssues); i++) {
        let issue = filteredIssues[i];
        let issueY = listY + i * lineHeight;

        // Status icon
        let iconColor;
        if (issue.resolved) {
            iconColor = color(46, 125, 50);
        } else {
            iconColor = issue.severity === 'critical' ? color(198, 40, 40) :
                        issue.severity === 'major' ? color(230, 126, 34) : color(241, 196, 15);
        }

        fill(iconColor);
        noStroke();
        if (issue.resolved) {
            // Checkmark
            ellipse(x + 15, issueY + 8, 12, 12);
            stroke(255);
            strokeWeight(2);
            line(x + 11, issueY + 8, x + 14, issueY + 11);
            line(x + 14, issueY + 11, x + 19, issueY + 5);
        } else {
            ellipse(x + 15, issueY + 8, 12, 12);
            fill(255);
            textSize(8);
            textAlign(CENTER, CENTER);
            text('!', x + 15, issueY + 8);
        }

        // Issue text
        fill(issue.resolved ? 150 : 60);
        noStroke();
        textSize(10);
        textAlign(LEFT, CENTER);
        let displayText = issue.text.length > 30 ? issue.text.substring(0, 30) + '...' : issue.text;
        text(displayText, x + 28, issueY + 8);
    }

    // Issue counts
    let counts = {
        critical: issues.filter(i => i.severity === 'critical' && !i.resolved).length,
        major: issues.filter(i => i.severity === 'major' && !i.resolved).length,
        minor: issues.filter(i => i.severity === 'minor' && !i.resolved).length,
        resolved: issues.filter(i => i.resolved).length
    };

    fill(80);
    textSize(9);
    textAlign(RIGHT, BOTTOM);
    text(`Open: ${counts.critical + counts.major + counts.minor} | Resolved: ${counts.resolved}`, x + w - 10, y + h - 5);
}

function drawDecisionLog(x, y, w, h) {
    let listY = y + 10;
    let entryHeight = (h - 20) / Math.min(decisions.length, 4);

    for (let i = 0; i < Math.min(decisions.length, 4); i++) {
        let decision = decisions[i];
        let entryY = listY + i * entryHeight;

        // Date badge
        fill(30, 60, 120);
        noStroke();
        rect(x + 10, entryY, 40, 16, 3);
        fill(255);
        textSize(9);
        textAlign(CENTER, CENTER);
        text(decision.date, x + 30, entryY + 8);

        // Decision text
        fill(40);
        textSize(11);
        textAlign(LEFT, TOP);
        let displayText = decision.text.length > 35 ? decision.text.substring(0, 35) + '...' : decision.text;
        text(displayText, x + 55, entryY);

        // Rationale
        fill(100);
        textSize(9);
        let rationaleText = decision.rationale.length > 45 ? decision.rationale.substring(0, 45) + '...' : decision.rationale;
        text(rationaleText, x + 55, entryY + 15);

        // Divider
        if (i < decisions.length - 1) {
            stroke(230);
            strokeWeight(1);
            line(x + 10, entryY + entryHeight - 5, x + w - 10, entryY + entryHeight - 5);
        }
    }
}

function drawControls() {
    let controlY = drawHeight;

    // Add Issue button
    fill(30, 60, 120);
    noStroke();
    rect(panelMargin, controlY + 10, 100, 30, 5);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Add Issue', panelMargin + 50, controlY + 25);

    // Resolve Issue button
    fill(46, 125, 50);
    rect(panelMargin + 110, controlY + 10, 110, 30, 5);
    fill(255);
    text('Resolve Issue', panelMargin + 165, controlY + 25);

    // Reset button
    fill(150);
    rect(panelMargin + 230, controlY + 10, 80, 30, 5);
    fill(255);
    text('Reset', panelMargin + 270, controlY + 25);

    // Instructions
    fill(100);
    textSize(10);
    textAlign(RIGHT, CENTER);
    text('Click versions to view history | Use buttons to simulate changes', canvasWidth - panelMargin, controlY + 25);
}

function drawTooltip() {
    if (hoveredMetric) {
        let tipW = 120;
        let tipH = 40;
        let tipX = Math.min(hoveredMetric.x + 10, canvasWidth - tipW - 10);
        let tipY = hoveredMetric.y - tipH - 10;

        fill(40, 40, 40, 230);
        noStroke();
        rect(tipX, tipY, tipW, tipH, 5);

        fill(255);
        textSize(11);
        textAlign(LEFT, TOP);
        text(hoveredMetric.name, tipX + 10, tipY + 8);
        text('Score: ' + hoveredMetric.value + '/100', tipX + 10, tipY + 22);
    }
}

function getScoreColor(score) {
    if (score < 50) return color(198, 40, 40);
    if (score < 80) return color(241, 196, 15);
    return color(46, 125, 50);
}

function mousePressed() {
    // Check version clicks
    let startY = 45;
    let timelineY = startY + headerHeight + (panelHeight - headerHeight) / 2;
    let padding = 15;
    let nodeSpacing = (panelWidth - padding * 2) / (versions.length - 1);

    for (let i = 0; i < versions.length; i++) {
        let nodeX = panelMargin + padding + i * nodeSpacing;
        if (dist(mouseX, mouseY, nodeX, timelineY) < 18) {
            selectedVersionIndex = i;
            return;
        }
    }

    // Check filter buttons
    let issuesPanelY = startY + panelHeight + panelMargin + headerHeight;
    let filters = ['all', 'critical', 'major', 'minor', 'resolved'];
    let btnWidth = (panelWidth - 20) / 5;

    for (let i = 0; i < filters.length; i++) {
        let btnX = panelMargin + 10 + i * btnWidth;
        if (mouseX >= btnX && mouseX <= btnX + btnWidth - 5 &&
            mouseY >= issuesPanelY + 5 && mouseY <= issuesPanelY + 25) {
            issueFilter = filters[i];
            return;
        }
    }

    // Check control buttons
    let controlY = drawHeight;

    // Add Issue button
    if (mouseX >= panelMargin && mouseX <= panelMargin + 100 &&
        mouseY >= controlY + 10 && mouseY <= controlY + 40) {
        addRandomIssue();
        return;
    }

    // Resolve Issue button
    if (mouseX >= panelMargin + 110 && mouseX <= panelMargin + 220 &&
        mouseY >= controlY + 10 && mouseY <= controlY + 40) {
        resolveRandomIssue();
        return;
    }

    // Reset button
    if (mouseX >= panelMargin + 230 && mouseX <= panelMargin + 310 &&
        mouseY >= controlY + 10 && mouseY <= controlY + 40) {
        resetData();
        return;
    }
}

function addRandomIssue() {
    let newIssues = [
        { text: 'Button text cut off on small screens', severity: 'minor' },
        { text: 'Form validation message unclear', severity: 'major' },
        { text: 'Data not saving correctly', severity: 'critical' },
        { text: 'Animation stuttering on scroll', severity: 'minor' },
        { text: 'Search results not filtering', severity: 'major' }
    ];

    let randomIssue = newIssues[Math.floor(Math.random() * newIssues.length)];
    issues.push({
        id: issues.length + 1,
        text: randomIssue.text,
        severity: randomIssue.severity,
        resolved: false
    });

    // Update quality score based on new issues
    updateQualityScores();
}

function resolveRandomIssue() {
    let unresolvedIssues = issues.filter(i => !i.resolved);
    if (unresolvedIssues.length > 0) {
        let randomIndex = Math.floor(Math.random() * unresolvedIssues.length);
        unresolvedIssues[randomIndex].resolved = true;
        updateQualityScores();
    }
}

function updateQualityScores() {
    let unresolvedCount = issues.filter(i => !i.resolved).length;
    let criticalCount = issues.filter(i => i.severity === 'critical' && !i.resolved).length;

    // Adjust current version metrics based on issues
    let baseMetrics = { tech: 90, pedagogy: 88, ux: 85, accessibility: 89 };
    let penalty = unresolvedCount * 3 + criticalCount * 10;

    qualityMetrics[selectedVersionIndex] = {
        tech: Math.max(30, baseMetrics.tech - penalty),
        pedagogy: Math.max(30, baseMetrics.pedagogy - penalty * 0.8),
        ux: Math.max(30, baseMetrics.ux - penalty * 1.2),
        accessibility: Math.max(30, baseMetrics.accessibility - penalty * 0.9)
    };

    // Update version score
    let metrics = qualityMetrics[selectedVersionIndex];
    versions[selectedVersionIndex].score = Math.round((metrics.tech + metrics.pedagogy + metrics.ux + metrics.accessibility) / 4);
}

function resetData() {
    issues = [
        { id: 1, text: 'Navigation broken on mobile', severity: 'critical', resolved: true },
        { id: 2, text: 'Quiz scoring incorrect', severity: 'critical', resolved: true },
        { id: 3, text: 'Slow load time > 5s', severity: 'major', resolved: true },
        { id: 4, text: 'Color contrast too low', severity: 'major', resolved: true },
        { id: 5, text: 'Missing alt text on images', severity: 'major', resolved: false },
        { id: 6, text: 'Typo in Chapter 3 title', severity: 'minor', resolved: true },
        { id: 7, text: 'Button hover state unclear', severity: 'minor', resolved: false },
        { id: 8, text: 'Footer links misaligned', severity: 'minor', resolved: false }
    ];

    qualityMetrics[selectedVersionIndex] = { tech: 90, pedagogy: 88, ux: 85, accessibility: 89 };
    versions[selectedVersionIndex].score = 88;
    issueFilter = 'all';
}
