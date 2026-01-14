// Specification Clarity Analyzer MicroSim
// Analyzes specification text for clarity, completeness, ambiguity, and actionability

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Layout
let leftPanelWidth;
let rightPanelWidth;
let dividerX;

// State
let mouseOverCanvas = false;
let specText = "";
let analysisResults = null;
let issues = [];
let hoveredIssue = -1;
let selectedIssue = -1;
let scrollOffset = 0;
let maxScroll = 0;

// Text input
let textInput;
let analyzeBtn;
let exampleBtn;

// Colors
const colors = {
  background: '#F5F7FA',
  panelBg: '#FFFFFF',
  divider: '#E0E0E0',
  text: '#333333',
  subtext: '#666666',
  accent: '#2196F3',

  // Meter colors
  specificity: '#4CAF50',
  completeness: '#2196F3',
  ambiguity: '#FF9800',
  actionability: '#9C27B0',

  // Score backgrounds
  meterBg: '#E8E8E8',
  excellent: '#4CAF50',
  good: '#8BC34A',
  fair: '#FF9800',
  poor: '#F44336',

  // Issue severity
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // Buttons
  analyzeBtn: '#4CAF50',
  analyzeBtnHover: '#43A047',
  exampleBtn: '#2196F3',
  exampleBtnHover: '#1E88E5',

  // Highlight
  highlight: 'rgba(255, 235, 59, 0.5)'
};

// Vague terms to detect
const vagueTerms = [
  'good', 'nice', 'appropriate', 'proper', 'suitable', 'reasonable',
  'various', 'some', 'many', 'few', 'several', 'multiple',
  'etc', 'and so on', 'stuff', 'things', 'something',
  'maybe', 'perhaps', 'possibly', 'might', 'could',
  'easy', 'simple', 'complex', 'hard', 'difficult',
  'fast', 'slow', 'quick', 'soon', 'later',
  'big', 'small', 'large', 'tiny', 'huge',
  'pretty', 'very', 'really', 'quite', 'somewhat'
];

// Required sections for completeness
const requiredSections = [
  { pattern: /learning\s*objective/i, name: 'Learning Objective' },
  { pattern: /bloom['s]?\s*taxonomy/i, name: "Bloom's Taxonomy Level" },
  { pattern: /visual|layout|canvas|display/i, name: 'Visual Description' },
  { pattern: /control|slider|button|input|interactive/i, name: 'Controls/Interactivity' },
  { pattern: /color|colour/i, name: 'Color Specification' },
  { pattern: /dimension|width|height|size|px|pixel/i, name: 'Dimensions' },
  { pattern: /range|min|max|default|initial/i, name: 'Value Ranges/Defaults' },
  { pattern: /target|audience|student|learner|grade|level/i, name: 'Target Audience' }
];

// Concrete value patterns
const concretePatterns = [
  /\d+\s*(px|pixels?|%|percent)/i,
  /\d+\s*x\s*\d+/i,
  /#[0-9A-Fa-f]{3,6}/,
  /rgb\s*\(/i,
  /\d+\s*to\s*\d+/i,
  /range:\s*\d+/i,
  /default:\s*\d+/i,
  /min:\s*\d+/i,
  /max:\s*\d+/i
];

// Action verbs for actionability
const actionVerbs = [
  'click', 'drag', 'hover', 'select', 'adjust', 'move', 'rotate',
  'display', 'show', 'hide', 'update', 'animate', 'draw', 'render',
  'calculate', 'compute', 'respond', 'trigger', 'generate', 'create'
];

// Example specification
const exampleSpec = `Learning Objective: Students will understand how changing voltage and resistance affects current in an electrical circuit according to Ohm's Law.

Bloom's Taxonomy Level: Understand (Level 2)

Target Audience: High school physics students (grades 9-12)

Canvas Layout:
- Canvas dimensions: responsive width x 500px height
- Left panel (60%): Circuit visualization with battery, resistor, and ammeter
- Right panel (40%): Control sliders and digital readouts

Visual Elements:
- Battery icon: 80x40px rectangle with + and - terminals
- Resistor: zigzag line symbol, 60px wide
- Ammeter: circular gauge, 80px diameter
- Connecting wires: 3px stroke weight, #333333 color
- Background: #F5F5F5

Controls:
- Voltage slider: range 0-24V, default 12V, step 0.5V
- Resistance slider: range 1-100 ohms, default 10 ohms, step 1 ohm
- Reset button: returns all values to defaults

Interactivity:
- When user adjusts voltage slider, current updates in real-time
- Ammeter needle animates smoothly to new position
- Wire brightness changes to indicate current flow intensity
- Hovering over components shows tooltip with current values

Implementation: p5.js with responsive canvas`;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  textFont('Arial');

  // Create text input
  createTextInput();

  describe('Specification Clarity Analyzer with text input on the left and clarity metrics displayed as meter gauges on the right. Analyzes specifications for specificity, completeness, ambiguity, and actionability.', LABEL);
}

function createTextInput() {
  // Create textarea for spec input
  textInput = createElement('textarea');
  textInput.attribute('placeholder', 'Paste or type your MicroSim specification here...');
  textInput.parent(document.querySelector('main'));
  textInput.style('position', 'absolute');
  textInput.style('font-family', 'Arial, sans-serif');
  textInput.style('font-size', '13px');
  textInput.style('padding', '10px');
  textInput.style('border', '2px solid #E0E0E0');
  textInput.style('border-radius', '8px');
  textInput.style('resize', 'none');
  textInput.style('outline', 'none');
  textInput.style('background', '#FAFAFA');
  textInput.changed(() => {
    specText = textInput.value();
  });
  textInput.input(() => {
    specText = textInput.value();
  });

  updateTextInputPosition();
}

function updateTextInputPosition() {
  if (textInput) {
    let inputX = margin + 5;
    let inputY = 65;
    let inputWidth = leftPanelWidth - 20;
    let inputHeight = drawHeight - 130;

    textInput.style('left', inputX + 'px');
    textInput.style('top', inputY + 'px');
    textInput.style('width', inputWidth + 'px');
    textInput.style('height', inputHeight + 'px');
  }
}

function draw() {
  updateCanvasSize();

  // Calculate panel dimensions
  leftPanelWidth = (canvasWidth - margin * 3) / 2;
  rightPanelWidth = leftPanelWidth;
  dividerX = margin + leftPanelWidth + margin / 2;

  // Update text input position
  updateTextInputPosition();

  // Drawing area background
  fill(colors.background);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Specification Clarity Analyzer", canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw panels
  drawLeftPanel();
  drawRightPanel();

  // Draw divider
  stroke(colors.divider);
  strokeWeight(2);
  line(dividerX, 45, dividerX, drawHeight - 10);

  // Draw control area
  drawControlArea();
}

function drawLeftPanel() {
  let x = margin;
  let y = 45;
  let w = leftPanelWidth;

  // Panel label
  fill(colors.subtext);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text("SPECIFICATION INPUT", x + 5, y);

  // The textarea handles the actual text display
  // Show character count at bottom
  let charCount = specText.length;
  textSize(11);
  fill(colors.subtext);
  textAlign(LEFT, BOTTOM);
  text(charCount + " characters", x + 5, drawHeight - 10);
}

function drawRightPanel() {
  let x = dividerX + margin / 2;
  let y = 45;
  let w = rightPanelWidth;

  // Panel label
  fill(colors.subtext);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text("CLARITY ANALYSIS", x + 5, y);

  if (!analysisResults) {
    // Show placeholder
    fill(colors.subtext);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Enter a specification and\nclick 'Analyze' to see results", x + w / 2, drawHeight / 2 - 20);
    return;
  }

  // Draw overall score
  drawOverallScore(x + 5, y + 25, w - 10);

  // Draw individual meters
  let meterY = y + 100;
  let meterHeight = 55;
  let meterSpacing = 10;

  drawMeter("Specificity", analysisResults.specificity, colors.specificity, x + 5, meterY, w - 10, meterHeight);
  meterY += meterHeight + meterSpacing;

  drawMeter("Completeness", analysisResults.completeness, colors.completeness, x + 5, meterY, w - 10, meterHeight);
  meterY += meterHeight + meterSpacing;

  drawMeter("Clarity", 100 - analysisResults.ambiguity, colors.ambiguity, x + 5, meterY, w - 10, meterHeight);
  meterY += meterHeight + meterSpacing;

  drawMeter("Actionability", analysisResults.actionability, colors.actionability, x + 5, meterY, w - 10, meterHeight);

  // Draw issues list
  drawIssuesList(x + 5, meterY + meterHeight + 15, w - 10, drawHeight - meterY - meterHeight - 30);
}

function drawOverallScore(x, y, w) {
  let score = analysisResults.overall;
  let scoreColor = getScoreColor(score);

  // Background
  fill(colors.panelBg);
  stroke(colors.divider);
  strokeWeight(1);
  rect(x, y, w, 60, 8);

  // Score circle
  let circleX = x + 45;
  let circleY = y + 30;
  let circleSize = 50;

  // Circle background
  fill(colors.meterBg);
  noStroke();
  ellipse(circleX, circleY, circleSize);

  // Score arc
  noFill();
  stroke(scoreColor);
  strokeWeight(5);
  strokeCap(ROUND);
  let angle = map(score, 0, 100, -HALF_PI, -HALF_PI + TWO_PI);
  arc(circleX, circleY, circleSize - 5, circleSize - 5, -HALF_PI, angle);

  // Score text
  fill(scoreColor);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(Math.round(score), circleX, circleY);
  textStyle(NORMAL);

  // Label
  fill(colors.text);
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text("Overall Clarity Score", x + 80, y + 22);
  textStyle(NORMAL);

  // Rating text
  let rating = getScoreRating(score);
  fill(scoreColor);
  textSize(14);
  text(rating, x + 80, y + 42);
}

function drawMeter(label, value, color, x, y, w, h) {
  // Background
  fill(colors.panelBg);
  stroke(colors.divider);
  strokeWeight(1);
  rect(x, y, w, h, 6);

  // Label
  fill(colors.text);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(label, x + 10, y + 8);
  textStyle(NORMAL);

  // Value
  textAlign(RIGHT, TOP);
  fill(color);
  text(Math.round(value) + "%", x + w - 10, y + 8);

  // Meter bar background
  let barX = x + 10;
  let barY = y + 30;
  let barWidth = w - 20;
  let barHeight = 16;

  fill(colors.meterBg);
  noStroke();
  rect(barX, barY, barWidth, barHeight, 8);

  // Meter bar fill
  if (value > 0) {
    fill(color);
    rect(barX, barY, barWidth * (value / 100), barHeight, 8, value >= 100 ? 8 : 0, value >= 100 ? 8 : 0, 8);
  }
}

function drawIssuesList(x, y, w, h) {
  if (issues.length === 0) {
    fill(colors.excellent);
    textSize(12);
    textAlign(CENTER, TOP);
    text("No issues found!", x + w / 2, y + 5);
    return;
  }

  // Issues header
  fill(colors.subtext);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text("ISSUES FOUND (" + issues.length + ")", x, y);

  // Draw visible issues
  let issueY = y + 18;
  let issueHeight = 20;
  let visibleIssues = Math.floor((h - 20) / issueHeight);

  for (let i = 0; i < Math.min(issues.length, visibleIssues); i++) {
    let issue = issues[i + scrollOffset];
    if (!issue) continue;

    let isHovered = hoveredIssue === i + scrollOffset;
    let isSelected = selectedIssue === i + scrollOffset;

    // Issue background
    if (isSelected) {
      fill(colors.highlight);
      noStroke();
      rect(x, issueY - 2, w, issueHeight, 3);
    } else if (isHovered) {
      fill('#F5F5F5');
      noStroke();
      rect(x, issueY - 2, w, issueHeight, 3);
    }

    // Severity indicator
    let severityColor = issue.severity === 'error' ? colors.error :
                        issue.severity === 'warning' ? colors.warning : colors.info;
    fill(severityColor);
    noStroke();
    ellipse(x + 6, issueY + 8, 8, 8);

    // Issue text (truncated)
    fill(colors.text);
    textSize(11);
    textAlign(LEFT, TOP);
    let issueText = issue.message;
    if (textWidth(issueText) > w - 20) {
      while (textWidth(issueText + '...') > w - 20 && issueText.length > 0) {
        issueText = issueText.slice(0, -1);
      }
      issueText += '...';
    }
    text(issueText, x + 14, issueY);

    issueY += issueHeight;
  }

  // Scroll indicator if needed
  if (issues.length > visibleIssues) {
    fill(colors.subtext);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text("Scroll for more", x + w, y + h);
  }
}

function drawControlArea() {
  let buttonWidth = 100;
  let buttonHeight = 32;
  let buttonSpacing = 15;

  // Analyze button
  let analyzeX = canvasWidth / 2 - buttonWidth - buttonSpacing / 2;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  let analyzeHovered = mouseX >= analyzeX && mouseX <= analyzeX + buttonWidth &&
                       mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(analyzeHovered ? colors.analyzeBtnHover : colors.analyzeBtn);
  noStroke();
  rect(analyzeX, buttonY, buttonWidth, buttonHeight, 6);

  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Analyze", analyzeX + buttonWidth / 2, buttonY + buttonHeight / 2);
  textStyle(NORMAL);

  // Show Example button
  let exampleX = canvasWidth / 2 + buttonSpacing / 2;

  let exampleHovered = mouseX >= exampleX && mouseX <= exampleX + buttonWidth &&
                       mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  fill(exampleHovered ? colors.exampleBtnHover : colors.exampleBtn);
  noStroke();
  rect(exampleX, buttonY, buttonWidth, buttonHeight, 6);

  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Show Example", exampleX + buttonWidth / 2, buttonY + buttonHeight / 2);
  textStyle(NORMAL);
}

function analyzeSpecification() {
  if (!specText || specText.trim().length === 0) {
    analysisResults = null;
    issues = [];
    return;
  }

  issues = [];

  // Calculate specificity score
  let specificity = calculateSpecificity();

  // Calculate completeness score
  let completeness = calculateCompleteness();

  // Calculate ambiguity score (lower is better, we'll invert for display)
  let ambiguity = calculateAmbiguity();

  // Calculate actionability score
  let actionability = calculateActionability();

  // Calculate overall score (weighted average)
  let overall = (specificity * 0.25) + (completeness * 0.30) +
                ((100 - ambiguity) * 0.25) + (actionability * 0.20);

  analysisResults = {
    specificity: specificity,
    completeness: completeness,
    ambiguity: ambiguity,
    actionability: actionability,
    overall: overall
  };

  // Sort issues by severity
  issues.sort((a, b) => {
    const severityOrder = { error: 0, warning: 1, info: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

function calculateSpecificity() {
  let score = 50; // Base score
  let text = specText.toLowerCase();
  let lines = specText.split('\n');

  // Check for concrete values
  let concreteCount = 0;
  for (let pattern of concretePatterns) {
    let matches = specText.match(new RegExp(pattern, 'g'));
    if (matches) {
      concreteCount += matches.length;
    }
  }

  // More concrete values = higher score
  score += Math.min(concreteCount * 5, 40);

  // Check for numbers in general
  let numberMatches = specText.match(/\d+/g);
  if (numberMatches) {
    score += Math.min(numberMatches.length * 2, 20);
  }

  // Penalize for lack of specifics
  if (concreteCount < 3) {
    issues.push({
      severity: 'warning',
      message: 'Add more specific values (dimensions, colors, ranges)'
    });
  }

  return Math.min(Math.max(score, 0), 100);
}

function calculateCompleteness() {
  let score = 0;
  let foundSections = 0;
  let text = specText.toLowerCase();

  for (let section of requiredSections) {
    if (section.pattern.test(specText)) {
      foundSections++;
    } else {
      issues.push({
        severity: 'warning',
        message: 'Missing: ' + section.name
      });
    }
  }

  score = (foundSections / requiredSections.length) * 100;

  // Bonus for longer, more detailed specs
  let wordCount = specText.split(/\s+/).length;
  if (wordCount > 100) score += 5;
  if (wordCount > 200) score += 5;
  if (wordCount > 300) score += 5;

  // Check for structured formatting
  if (specText.includes(':')) score += 5;
  if (specText.includes('-') || specText.includes('*')) score += 5;

  return Math.min(score, 100);
}

function calculateAmbiguity() {
  let score = 0;
  let text = specText.toLowerCase();
  let foundVague = [];

  // Check for vague terms
  for (let term of vagueTerms) {
    let regex = new RegExp('\\b' + term + '\\b', 'gi');
    let matches = specText.match(regex);
    if (matches) {
      score += matches.length * 8;
      if (!foundVague.includes(term)) {
        foundVague.push(term);
      }
    }
  }

  // Report vague terms found
  if (foundVague.length > 0) {
    let displayTerms = foundVague.slice(0, 3).join(', ');
    if (foundVague.length > 3) displayTerms += '...';
    issues.push({
      severity: 'info',
      message: 'Vague terms found: ' + displayTerms
    });
  }

  // Check for question marks (uncertainty)
  let questions = (specText.match(/\?/g) || []).length;
  if (questions > 0) {
    score += questions * 10;
    issues.push({
      severity: 'info',
      message: 'Contains ' + questions + ' question(s) - consider clarifying'
    });
  }

  return Math.min(score, 100);
}

function calculateActionability() {
  let score = 30; // Base score
  let text = specText.toLowerCase();

  // Check for action verbs
  let actionCount = 0;
  for (let verb of actionVerbs) {
    let regex = new RegExp('\\b' + verb + '\\b', 'gi');
    if (regex.test(specText)) {
      actionCount++;
    }
  }

  score += Math.min(actionCount * 8, 50);

  // Check for interaction descriptions
  if (/when.*user/i.test(specText) || /user.*can/i.test(specText)) {
    score += 10;
  }

  // Check for cause-effect relationships
  if (/if.*then/i.test(specText) || /when.*will/i.test(specText)) {
    score += 10;
  }

  // Penalize if no controls mentioned
  if (!/slider|button|input|click|drag/i.test(specText)) {
    issues.push({
      severity: 'warning',
      message: 'No interactive controls specified'
    });
    score -= 20;
  }

  return Math.min(Math.max(score, 0), 100);
}

function getScoreColor(score) {
  if (score >= 80) return colors.excellent;
  if (score >= 60) return colors.good;
  if (score >= 40) return colors.fair;
  return colors.poor;
}

function getScoreRating(score) {
  if (score >= 80) return "Excellent - Ready for generation";
  if (score >= 60) return "Good - Minor improvements suggested";
  if (score >= 40) return "Fair - Review recommendations";
  return "Needs Work - Address issues before generating";
}

function mousePressed() {
  let buttonWidth = 100;
  let buttonHeight = 32;
  let buttonSpacing = 15;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  // Check Analyze button
  let analyzeX = canvasWidth / 2 - buttonWidth - buttonSpacing / 2;
  if (mouseX >= analyzeX && mouseX <= analyzeX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    specText = textInput.value();
    analyzeSpecification();
    return;
  }

  // Check Show Example button
  let exampleX = canvasWidth / 2 + buttonSpacing / 2;
  if (mouseX >= exampleX && mouseX <= exampleX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    textInput.value(exampleSpec);
    specText = exampleSpec;
    analyzeSpecification();
    return;
  }

  // Check issue clicks
  let issuesX = dividerX + margin / 2 + 5;
  let issuesY = 45 + 100 + (55 + 10) * 4 + 15 + 18;
  let issueHeight = 20;

  if (mouseX >= issuesX && mouseX <= issuesX + rightPanelWidth - 10) {
    for (let i = 0; i < issues.length; i++) {
      let iy = issuesY + i * issueHeight;
      if (mouseY >= iy - 2 && mouseY <= iy + issueHeight - 2) {
        selectedIssue = selectedIssue === i ? -1 : i;
        return;
      }
    }
  }
}

function mouseMoved() {
  hoveredIssue = -1;

  let buttonWidth = 100;
  let buttonHeight = 32;
  let buttonSpacing = 15;
  let buttonY = drawHeight + (controlHeight - buttonHeight) / 2;

  // Check button hovers
  let analyzeX = canvasWidth / 2 - buttonWidth - buttonSpacing / 2;
  let exampleX = canvasWidth / 2 + buttonSpacing / 2;

  if ((mouseX >= analyzeX && mouseX <= analyzeX + buttonWidth &&
       mouseY >= buttonY && mouseY <= buttonY + buttonHeight) ||
      (mouseX >= exampleX && mouseX <= exampleX + buttonWidth &&
       mouseY >= buttonY && mouseY <= buttonY + buttonHeight)) {
    cursor(HAND);
    return;
  }

  // Check issue hovers
  if (analysisResults && issues.length > 0) {
    let issuesX = dividerX + margin / 2 + 5;
    let issuesY = 45 + 100 + (55 + 10) * 4 + 15 + 18;
    let issueHeight = 20;

    if (mouseX >= issuesX && mouseX <= issuesX + rightPanelWidth - 10) {
      for (let i = 0; i < issues.length; i++) {
        let iy = issuesY + i * issueHeight;
        if (mouseY >= iy - 2 && mouseY <= iy + issueHeight - 2) {
          hoveredIssue = i;
          cursor(HAND);
          return;
        }
      }
    }
  }

  cursor(ARROW);
}

function mouseWheel(event) {
  if (analysisResults && issues.length > 5) {
    let issuesX = dividerX + margin / 2 + 5;
    let issuesY = 45 + 100 + (55 + 10) * 4 + 15;
    let issuesHeight = drawHeight - issuesY - 30;

    if (mouseX >= issuesX && mouseX <= issuesX + rightPanelWidth - 10 &&
        mouseY >= issuesY && mouseY <= issuesY + issuesHeight) {
      scrollOffset += event.delta > 0 ? 1 : -1;
      scrollOffset = constrain(scrollOffset, 0, Math.max(0, issues.length - 5));
      return false;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  leftPanelWidth = (canvasWidth - margin * 3) / 2;
  rightPanelWidth = leftPanelWidth;
  dividerX = margin + leftPanelWidth + margin / 2;
}
