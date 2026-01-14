// Evaluation Rubric Builder MicroSim
// Interactive tool for creating custom evaluation rubrics with weighted criteria

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

// Panel widths
let leftPanelWidth = 350;
let centerPanelWidth = 300;
let rightPanelWidth = 250;
let panelPadding = 10;

// State
let mouseOverCanvas = false;
let criterionBank = [];
let activeRubric = [];
let expandedCategory = 0;
let hoveredItem = null;
let hoveredButton = null;
let customCriterionText = "";
let customCriterionInput = null;
let inputActive = false;
let draggedCriterion = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Scrolling state for each panel
let leftScrollY = 0;
let centerScrollY = 0;

// Colors
const colors = {
    background: '#F5F7FA',
    panelBg: '#FFFFFF',
    panelBorder: '#E0E0E0',
    categoryHeader: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
    categoryLight: ['#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5'],
    text: '#333333',
    subtext: '#666666',
    buttonPrimary: '#2196F3',
    buttonPrimaryHover: '#1976D2',
    buttonSuccess: '#4CAF50',
    buttonSuccessHover: '#388E3C',
    buttonWarning: '#FF9800',
    buttonWarningHover: '#F57C00',
    buttonDanger: '#F44336',
    buttonDangerHover: '#D32F2F',
    sliderTrack: '#E0E0E0',
    sliderFill: '#4CAF50',
    sliderHandle: '#2196F3',
    weightOk: '#4CAF50',
    weightWarning: '#FF9800',
    weightError: '#F44336',
    dragPreview: 'rgba(33, 150, 243, 0.3)'
};

// Initialize criterion bank with categories
function initCriterionBank() {
    criterionBank = [
        {
            name: "Technical",
            expanded: true,
            items: [
                { id: "t1", text: "Code runs without errors", defaultWeight: 15 },
                { id: "t2", text: "Responsive design works", defaultWeight: 10 },
                { id: "t3", text: "Performance is acceptable", defaultWeight: 10 },
                { id: "t4", text: "Browser compatibility", defaultWeight: 5 },
                { id: "t5", text: "Accessibility standards met", defaultWeight: 10 },
                { id: "t6", text: "Code is well-documented", defaultWeight: 5 }
            ]
        },
        {
            name: "Pedagogical",
            expanded: false,
            items: [
                { id: "p1", text: "Learning objective achieved", defaultWeight: 20 },
                { id: "p2", text: "Bloom's taxonomy level appropriate", defaultWeight: 10 },
                { id: "p3", text: "Scaffolding supports learning", defaultWeight: 10 },
                { id: "p4", text: "Feedback is meaningful", defaultWeight: 10 },
                { id: "p5", text: "Prerequisites clearly stated", defaultWeight: 5 },
                { id: "p6", text: "Content accuracy verified", defaultWeight: 15 }
            ]
        },
        {
            name: "UX Design",
            expanded: false,
            items: [
                { id: "u1", text: "Interface is intuitive", defaultWeight: 15 },
                { id: "u2", text: "Visual hierarchy is clear", defaultWeight: 10 },
                { id: "u3", text: "Controls are discoverable", defaultWeight: 10 },
                { id: "u4", text: "Color scheme is appropriate", defaultWeight: 5 },
                { id: "u5", text: "Labels and text are readable", defaultWeight: 10 },
                { id: "u6", text: "Consistent styling throughout", defaultWeight: 5 }
            ]
        },
        {
            name: "Domain-Specific",
            expanded: false,
            items: [
                { id: "d1", text: "Subject accuracy", defaultWeight: 20 },
                { id: "d2", text: "Real-world relevance", defaultWeight: 10 },
                { id: "d3", text: "Appropriate complexity", defaultWeight: 10 },
                { id: "d4", text: "Expert-reviewed content", defaultWeight: 15 },
                { id: "d5", text: "Current best practices", defaultWeight: 10 },
                { id: "d6", text: "Standards alignment", defaultWeight: 10 }
            ]
        }
    ];
}

// Initialize default rubric
function initDefaultRubric() {
    activeRubric = [
        { id: "p1", text: "Learning objective achieved", weight: 25, categoryIndex: 1 },
        { id: "t1", text: "Code runs without errors", weight: 20, categoryIndex: 0 },
        { id: "u1", text: "Interface is intuitive", weight: 20, categoryIndex: 2 },
        { id: "p4", text: "Feedback is meaningful", weight: 15, categoryIndex: 1 },
        { id: "t5", text: "Accessibility standards met", weight: 20, categoryIndex: 0 }
    ];
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    canvas.mouseOver(() => mouseOverCanvas = true);
    canvas.mouseOut(() => mouseOverCanvas = false);

    // Create custom criterion input field
    customCriterionInput = createInput('');
    customCriterionInput.parent(document.querySelector('main'));
    customCriterionInput.style('position', 'absolute');
    customCriterionInput.style('display', 'none');
    customCriterionInput.style('font-size', '12px');
    customCriterionInput.style('padding', '5px');
    customCriterionInput.style('border', '1px solid #ccc');
    customCriterionInput.style('border-radius', '4px');
    customCriterionInput.attribute('placeholder', 'Enter custom criterion...');
    customCriterionInput.input(() => customCriterionText = customCriterionInput.value());

    textFont('Arial');
    initCriterionBank();
    initDefaultRubric();

    describe('Evaluation Rubric Builder with three panels: criterion bank on left, active rubric in center, and weight controls on right. Create custom rubrics by selecting criteria and adjusting weights.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Main background
    background(colors.background);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Calculate panel positions
    let totalPanelWidth = leftPanelWidth + centerPanelWidth + rightPanelWidth + panelPadding * 4;
    let startX = (canvasWidth - totalPanelWidth) / 2;
    if (startX < panelPadding) startX = panelPadding;

    // Adjust panel widths for smaller screens
    let availableWidth = canvasWidth - panelPadding * 4;
    let scaleFactor = Math.min(1, availableWidth / (leftPanelWidth + centerPanelWidth + rightPanelWidth));

    let scaledLeft = Math.floor(leftPanelWidth * scaleFactor);
    let scaledCenter = Math.floor(centerPanelWidth * scaleFactor);
    let scaledRight = Math.floor(rightPanelWidth * scaleFactor);

    let leftX = panelPadding;
    let centerX = leftX + scaledLeft + panelPadding;
    let rightX = centerX + scaledCenter + panelPadding;

    // Draw title
    fill(colors.text);
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text("Evaluation Rubric Builder", canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw panels
    drawLeftPanel(leftX, 35, scaledLeft, drawHeight - 45);
    drawCenterPanel(centerX, 35, scaledCenter, drawHeight - 45);
    drawRightPanel(rightX, 35, scaledRight, drawHeight - 45);

    // Draw control area
    drawControlArea();

    // Draw dragged item
    if (draggedCriterion) {
        drawDraggedCriterion();
    }

    // Position and show/hide input
    positionCustomInput(leftX, scaledLeft);
}

function drawLeftPanel(x, y, w, h) {
    // Panel background
    fill(colors.panelBg);
    stroke(colors.panelBorder);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Panel header
    fill(colors.buttonPrimary);
    noStroke();
    rect(x, y, w, 30, 8, 8, 0, 0);

    fill('white');
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Criterion Bank", x + w / 2, y + 15);
    textStyle(NORMAL);

    // Draw categories
    let yOffset = y + 35;
    let categoryWidth = w - 16;

    for (let i = 0; i < criterionBank.length; i++) {
        if (yOffset > y + h - 10) break;
        yOffset = drawBankCategory(i, x + 8, yOffset, categoryWidth, y + h - 10);
    }

    // Custom criterion section
    let customY = y + h - 70;
    fill(colors.background);
    noStroke();
    rect(x + 4, customY, w - 8, 65, 0, 0, 6, 6);

    fill(colors.subtext);
    textSize(11);
    textAlign(LEFT, TOP);
    text("Add Custom Criterion:", x + 10, customY + 5);
}

function drawBankCategory(index, x, y, width, maxY) {
    let cat = criterionBank[index];
    let headerHeight = 28;
    let itemHeight = 24;

    // Check if we have room
    if (y + headerHeight > maxY - 80) return y;

    // Category header
    fill(colors.categoryHeader[index]);
    noStroke();
    rect(x, y, width, headerHeight, 4);

    // Arrow and name
    fill('white');
    textSize(12);
    textAlign(LEFT, CENTER);
    let arrow = cat.expanded ? "\u25BC" : "\u25B6";
    text(arrow + " " + cat.name, x + 8, y + headerHeight / 2);

    // Count of available items (not in rubric)
    let availableCount = cat.items.filter(item =>
        !activeRubric.find(r => r.id === item.id)
    ).length;
    textAlign(RIGHT, CENTER);
    textSize(10);
    text(availableCount + " items", x + width - 8, y + headerHeight / 2);

    let nextY = y + headerHeight + 4;

    // Draw items if expanded
    if (cat.expanded) {
        for (let j = 0; j < cat.items.length; j++) {
            if (nextY + itemHeight > maxY - 80) break;

            let item = cat.items[j];
            let isInRubric = activeRubric.find(r => r.id === item.id);

            if (!isInRubric) {
                let isHovered = hoveredItem === item.id;

                // Item background
                fill(isHovered ? colors.categoryLight[index] : colors.panelBg);
                stroke(isHovered ? colors.categoryHeader[index] : colors.panelBorder);
                strokeWeight(1);
                rect(x + 4, nextY, width - 8, itemHeight - 2, 3);

                // Item text
                fill(colors.text);
                noStroke();
                textSize(11);
                textAlign(LEFT, CENTER);
                let displayText = item.text;
                if (textWidth(displayText) > width - 45) {
                    while (textWidth(displayText + "...") > width - 45 && displayText.length > 0) {
                        displayText = displayText.slice(0, -1);
                    }
                    displayText += "...";
                }
                text(displayText, x + 10, nextY + itemHeight / 2 - 1);

                // Add button
                let btnX = x + width - 28;
                let btnY = nextY + 3;
                let btnSize = itemHeight - 8;

                fill(isHovered ? colors.buttonSuccess : colors.categoryLight[index]);
                noStroke();
                rect(btnX, btnY, btnSize, btnSize, 3);

                fill(isHovered ? 'white' : colors.buttonSuccess);
                textSize(14);
                textAlign(CENTER, CENTER);
                text("+", btnX + btnSize / 2, btnY + btnSize / 2);

                nextY += itemHeight;
            }
        }
    }

    return nextY + 4;
}

function drawCenterPanel(x, y, w, h) {
    // Panel background
    fill(colors.panelBg);
    stroke(colors.panelBorder);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Panel header
    fill(colors.buttonSuccess);
    noStroke();
    rect(x, y, w, 30, 8, 8, 0, 0);

    fill('white');
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Active Rubric (" + activeRubric.length + " criteria)", x + w / 2, y + 15);
    textStyle(NORMAL);

    // Draw rubric items
    let yOffset = y + 40;
    let itemWidth = w - 16;
    let itemHeight = 50;

    if (activeRubric.length === 0) {
        fill(colors.subtext);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Click + on criteria to add", x + w / 2, y + h / 2);
        text("or drag from bank", x + w / 2, y + h / 2 + 18);
    } else {
        for (let i = 0; i < activeRubric.length; i++) {
            if (yOffset + itemHeight > y + h - 10) break;
            drawRubricItem(i, x + 8, yOffset, itemWidth, itemHeight - 4);
            yOffset += itemHeight;
        }
    }
}

function drawRubricItem(index, x, y, width, height) {
    let item = activeRubric[index];
    let catIndex = item.categoryIndex !== undefined ? item.categoryIndex : 0;
    let isHovered = hoveredItem === "rubric_" + item.id;

    // Item background
    fill(isHovered ? colors.categoryLight[catIndex] : colors.panelBg);
    stroke(colors.categoryHeader[catIndex]);
    strokeWeight(2);
    rect(x, y, width, height, 5);

    // Category indicator bar
    fill(colors.categoryHeader[catIndex]);
    noStroke();
    rect(x, y, 6, height, 5, 0, 0, 5);

    // Item text
    fill(colors.text);
    textSize(11);
    textAlign(LEFT, TOP);
    let displayText = item.text;
    if (textWidth(displayText) > width - 60) {
        while (textWidth(displayText + "...") > width - 60 && displayText.length > 0) {
            displayText = displayText.slice(0, -1);
        }
        displayText += "...";
    }
    text(displayText, x + 12, y + 6);

    // Weight display
    fill(colors.subtext);
    textSize(18);
    textAlign(LEFT, BOTTOM);
    textStyle(BOLD);
    text(item.weight + "%", x + 12, y + height - 4);
    textStyle(NORMAL);

    // Remove button
    let btnX = x + width - 26;
    let btnY = y + 6;
    let btnSize = 18;

    fill(isHovered ? colors.buttonDanger : '#FFEBEE');
    noStroke();
    rect(btnX, btnY, btnSize, btnSize, 3);

    fill(isHovered ? 'white' : colors.buttonDanger);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("\u00D7", btnX + btnSize / 2, btnY + btnSize / 2);
}

function drawRightPanel(x, y, w, h) {
    // Panel background
    fill(colors.panelBg);
    stroke(colors.panelBorder);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Panel header
    fill(colors.buttonWarning);
    noStroke();
    rect(x, y, w, 30, 8, 8, 0, 0);

    fill('white');
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Weight Controls", x + w / 2, y + 15);
    textStyle(NORMAL);

    // Total weight indicator
    let totalWeight = activeRubric.reduce((sum, item) => sum + item.weight, 0);
    let weightColor = totalWeight === 100 ? colors.weightOk :
                     (totalWeight < 100 ? colors.weightWarning : colors.weightError);

    let indicatorY = y + 45;
    fill(colors.background);
    noStroke();
    rect(x + 10, indicatorY, w - 20, 40, 5);

    fill(weightColor);
    textSize(24);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(totalWeight + "%", x + w / 2, indicatorY + 5);
    textStyle(NORMAL);

    textSize(10);
    fill(colors.subtext);
    text(totalWeight === 100 ? "Total (Valid)" : "Total (Must = 100%)", x + w / 2, indicatorY + 28);

    // Weight sliders for each criterion
    let sliderY = indicatorY + 55;
    let sliderHeight = 40;

    if (activeRubric.length === 0) {
        fill(colors.subtext);
        textSize(11);
        textAlign(CENTER, CENTER);
        text("Add criteria to adjust weights", x + w / 2, y + h / 2);
    } else {
        for (let i = 0; i < activeRubric.length; i++) {
            if (sliderY + sliderHeight > y + h - 10) break;
            drawWeightSlider(i, x + 10, sliderY, w - 20, sliderHeight - 5);
            sliderY += sliderHeight;
        }
    }

    // Auto-balance button
    let btnY = y + h - 40;
    let btnW = w - 20;
    let btnH = 30;
    let isHovered = hoveredButton === "balance";

    fill(isHovered ? colors.buttonPrimaryHover : colors.buttonPrimary);
    noStroke();
    rect(x + 10, btnY, btnW, btnH, 5);

    fill('white');
    textSize(11);
    textAlign(CENTER, CENTER);
    text("Auto-Balance Weights", x + w / 2, btnY + btnH / 2);
}

function drawWeightSlider(index, x, y, width, height) {
    let item = activeRubric[index];
    let catIndex = item.categoryIndex !== undefined ? item.categoryIndex : 0;

    // Label
    fill(colors.text);
    textSize(10);
    textAlign(LEFT, TOP);
    let label = item.text.length > 25 ? item.text.substring(0, 22) + "..." : item.text;
    text(label, x, y);

    // Slider track
    let trackY = y + 16;
    let trackHeight = 8;
    fill(colors.sliderTrack);
    noStroke();
    rect(x, trackY, width - 35, trackHeight, 4);

    // Slider fill
    let fillWidth = map(item.weight, 0, 100, 0, width - 35);
    fill(colors.categoryHeader[catIndex]);
    rect(x, trackY, fillWidth, trackHeight, 4, 0, 0, 4);

    // Slider handle
    let handleX = x + fillWidth - 6;
    fill(colors.sliderHandle);
    stroke('white');
    strokeWeight(2);
    ellipse(handleX + 6, trackY + trackHeight / 2, 14, 14);

    // Weight value
    fill(colors.text);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    textStyle(BOLD);
    text(item.weight + "%", x + width, trackY + trackHeight / 2);
    textStyle(NORMAL);
}

function drawControlArea() {
    // Button dimensions
    let btnW = 140;
    let btnH = 35;
    let btnSpacing = 15;
    let totalBtnWidth = btnW * 4 + btnSpacing * 3;
    let startX = (canvasWidth - totalBtnWidth) / 2;
    let btnY = drawHeight + (controlHeight - btnH) / 2;

    // Export Markdown button
    let btn1Hovered = hoveredButton === "exportMd";
    fill(btn1Hovered ? colors.buttonSuccessHover : colors.buttonSuccess);
    noStroke();
    rect(startX, btnY, btnW, btnH, 5);
    fill('white');
    textSize(11);
    textAlign(CENTER, CENTER);
    text("Export as Markdown", startX + btnW / 2, btnY + btnH / 2);

    // Export JSON button
    let btn2X = startX + btnW + btnSpacing;
    let btn2Hovered = hoveredButton === "exportJson";
    fill(btn2Hovered ? colors.buttonPrimaryHover : colors.buttonPrimary);
    rect(btn2X, btnY, btnW, btnH, 5);
    fill('white');
    text("Export as JSON", btn2X + btnW / 2, btnY + btnH / 2);

    // Add Custom button
    let btn3X = btn2X + btnW + btnSpacing;
    let btn3Hovered = hoveredButton === "addCustom";
    fill(btn3Hovered ? colors.buttonWarningHover : colors.buttonWarning);
    rect(btn3X, btnY, btnW, btnH, 5);
    fill('white');
    text("Add Custom Criterion", btn3X + btnW / 2, btnY + btnH / 2);

    // Reset button
    let btn4X = btn3X + btnW + btnSpacing;
    let btn4Hovered = hoveredButton === "reset";
    fill(btn4Hovered ? colors.buttonDangerHover : colors.buttonDanger);
    rect(btn4X, btnY, btnW, btnH, 5);
    fill('white');
    text("Reset to Default", btn4X + btnW / 2, btnY + btnH / 2);
}

function drawDraggedCriterion() {
    if (!draggedCriterion) return;

    fill(colors.dragPreview);
    stroke(colors.buttonPrimary);
    strokeWeight(2);
    rect(mouseX - 75, mouseY - 15, 150, 30, 5);

    fill(colors.text);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    let displayText = draggedCriterion.text;
    if (displayText.length > 20) displayText = displayText.substring(0, 17) + "...";
    text(displayText, mouseX, mouseY);
}

function positionCustomInput(leftX, leftW) {
    if (customCriterionInput) {
        let inputX = leftX + 10;
        let inputY = drawHeight - 40;
        let inputW = leftW - 80;

        customCriterionInput.position(inputX, inputY);
        customCriterionInput.size(inputW, 22);
        customCriterionInput.style('display', 'block');
    }
}

function mousePressed() {
    // Check control buttons
    let btnW = 140;
    let btnH = 35;
    let btnSpacing = 15;
    let totalBtnWidth = btnW * 4 + btnSpacing * 3;
    let startX = (canvasWidth - totalBtnWidth) / 2;
    let btnY = drawHeight + (controlHeight - btnH) / 2;

    // Export Markdown
    if (mouseX >= startX && mouseX <= startX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        exportAsMarkdown();
        return;
    }

    // Export JSON
    let btn2X = startX + btnW + btnSpacing;
    if (mouseX >= btn2X && mouseX <= btn2X + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        exportAsJSON();
        return;
    }

    // Add Custom
    let btn3X = btn2X + btnW + btnSpacing;
    if (mouseX >= btn3X && mouseX <= btn3X + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        addCustomCriterion();
        return;
    }

    // Reset
    let btn4X = btn3X + btnW + btnSpacing;
    if (mouseX >= btn4X && mouseX <= btn4X + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        resetToDefault();
        return;
    }

    // Check auto-balance button
    let availableWidth = canvasWidth - panelPadding * 4;
    let scaleFactor = Math.min(1, availableWidth / (leftPanelWidth + centerPanelWidth + rightPanelWidth));
    let scaledLeft = Math.floor(leftPanelWidth * scaleFactor);
    let scaledCenter = Math.floor(centerPanelWidth * scaleFactor);
    let scaledRight = Math.floor(rightPanelWidth * scaleFactor);
    let rightX = panelPadding + scaledLeft + panelPadding + scaledCenter + panelPadding;
    let rightPanelY = 35;
    let rightPanelH = drawHeight - 45;

    let balanceBtnY = rightPanelY + rightPanelH - 40;
    if (mouseX >= rightX + 10 && mouseX <= rightX + scaledRight - 10 &&
        mouseY >= balanceBtnY && mouseY <= balanceBtnY + 30) {
        autoBalanceWeights();
        return;
    }

    // Check category headers in left panel
    let leftX = panelPadding;
    let yOffset = 70;

    for (let i = 0; i < criterionBank.length; i++) {
        let cat = criterionBank[i];
        let headerHeight = 28;

        if (mouseX >= leftX && mouseX <= leftX + scaledLeft - 8 &&
            mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
            cat.expanded = !cat.expanded;
            return;
        }

        let itemHeight = 24;
        let nextY = yOffset + headerHeight + 4;

        if (cat.expanded) {
            for (let j = 0; j < cat.items.length; j++) {
                let item = cat.items[j];
                let isInRubric = activeRubric.find(r => r.id === item.id);

                if (!isInRubric) {
                    // Check add button
                    let btnX = leftX + scaledLeft - 36;
                    if (mouseX >= btnX && mouseX <= btnX + 20 &&
                        mouseY >= nextY + 3 && mouseY <= nextY + itemHeight - 5) {
                        addCriterionToRubric(item, i);
                        return;
                    }
                    nextY += itemHeight;
                }
            }
        }

        yOffset = nextY + 4;
    }

    // Check remove buttons in center panel
    let centerX = leftX + scaledLeft + panelPadding;
    let centerY = 35;
    let itemHeight = 50;
    let itemY = centerY + 40;

    for (let i = 0; i < activeRubric.length; i++) {
        let btnX = centerX + scaledCenter - 34;
        if (mouseX >= btnX && mouseX <= btnX + 18 &&
            mouseY >= itemY + 6 && mouseY <= itemY + 24) {
            removeCriterionFromRubric(i);
            return;
        }
        itemY += itemHeight;
    }

    // Check weight sliders
    let sliderStartY = rightPanelY + 100;
    let sliderHeight = 40;
    let trackWidth = scaledRight - 55;

    for (let i = 0; i < activeRubric.length; i++) {
        let sliderY = sliderStartY + i * sliderHeight + 16;
        if (mouseX >= rightX + 10 && mouseX <= rightX + 10 + trackWidth &&
            mouseY >= sliderY - 5 && mouseY <= sliderY + 13) {
            // Clicked on slider - update weight
            let newWeight = Math.round(map(mouseX, rightX + 10, rightX + 10 + trackWidth, 0, 100));
            newWeight = constrain(newWeight, 0, 100);
            activeRubric[i].weight = newWeight;
            return;
        }
    }
}

function mouseDragged() {
    // Check if dragging a weight slider
    let availableWidth = canvasWidth - panelPadding * 4;
    let scaleFactor = Math.min(1, availableWidth / (leftPanelWidth + centerPanelWidth + rightPanelWidth));
    let scaledLeft = Math.floor(leftPanelWidth * scaleFactor);
    let scaledCenter = Math.floor(centerPanelWidth * scaleFactor);
    let scaledRight = Math.floor(rightPanelWidth * scaleFactor);
    let rightX = panelPadding + scaledLeft + panelPadding + scaledCenter + panelPadding;
    let rightPanelY = 35;

    let sliderStartY = rightPanelY + 100;
    let sliderHeight = 40;
    let trackWidth = scaledRight - 55;

    for (let i = 0; i < activeRubric.length; i++) {
        let sliderY = sliderStartY + i * sliderHeight + 16;
        if (mouseY >= sliderY - 10 && mouseY <= sliderY + 18) {
            let newWeight = Math.round(map(mouseX, rightX + 10, rightX + 10 + trackWidth, 0, 100));
            newWeight = constrain(newWeight, 0, 100);
            activeRubric[i].weight = newWeight;
            return;
        }
    }
}

function mouseMoved() {
    hoveredItem = null;
    hoveredButton = null;
    cursor(ARROW);

    // Check control buttons
    let btnW = 140;
    let btnH = 35;
    let btnSpacing = 15;
    let totalBtnWidth = btnW * 4 + btnSpacing * 3;
    let startX = (canvasWidth - totalBtnWidth) / 2;
    let btnY = drawHeight + (controlHeight - btnH) / 2;

    if (mouseY >= btnY && mouseY <= btnY + btnH) {
        if (mouseX >= startX && mouseX <= startX + btnW) {
            hoveredButton = "exportMd";
            cursor(HAND);
            return;
        }
        let btn2X = startX + btnW + btnSpacing;
        if (mouseX >= btn2X && mouseX <= btn2X + btnW) {
            hoveredButton = "exportJson";
            cursor(HAND);
            return;
        }
        let btn3X = btn2X + btnW + btnSpacing;
        if (mouseX >= btn3X && mouseX <= btn3X + btnW) {
            hoveredButton = "addCustom";
            cursor(HAND);
            return;
        }
        let btn4X = btn3X + btnW + btnSpacing;
        if (mouseX >= btn4X && mouseX <= btn4X + btnW) {
            hoveredButton = "reset";
            cursor(HAND);
            return;
        }
    }

    // Check auto-balance button
    let availableWidth = canvasWidth - panelPadding * 4;
    let scaleFactor = Math.min(1, availableWidth / (leftPanelWidth + centerPanelWidth + rightPanelWidth));
    let scaledLeft = Math.floor(leftPanelWidth * scaleFactor);
    let scaledCenter = Math.floor(centerPanelWidth * scaleFactor);
    let scaledRight = Math.floor(rightPanelWidth * scaleFactor);
    let rightX = panelPadding + scaledLeft + panelPadding + scaledCenter + panelPadding;
    let rightPanelY = 35;
    let rightPanelH = drawHeight - 45;

    let balanceBtnY = rightPanelY + rightPanelH - 40;
    if (mouseX >= rightX + 10 && mouseX <= rightX + scaledRight - 10 &&
        mouseY >= balanceBtnY && mouseY <= balanceBtnY + 30) {
        hoveredButton = "balance";
        cursor(HAND);
        return;
    }

    // Check items in left panel
    let leftX = panelPadding;
    let yOffset = 70;

    for (let i = 0; i < criterionBank.length; i++) {
        let cat = criterionBank[i];
        let headerHeight = 28;

        if (mouseX >= leftX && mouseX <= leftX + scaledLeft - 8 &&
            mouseY >= yOffset && mouseY <= yOffset + headerHeight) {
            cursor(HAND);
            return;
        }

        let itemHeight = 24;
        let nextY = yOffset + headerHeight + 4;

        if (cat.expanded) {
            for (let j = 0; j < cat.items.length; j++) {
                let item = cat.items[j];
                let isInRubric = activeRubric.find(r => r.id === item.id);

                if (!isInRubric) {
                    if (mouseX >= leftX + 4 && mouseX <= leftX + scaledLeft - 12 &&
                        mouseY >= nextY && mouseY <= nextY + itemHeight - 2) {
                        hoveredItem = item.id;
                        cursor(HAND);
                        return;
                    }
                    nextY += itemHeight;
                }
            }
        }

        yOffset = nextY + 4;
    }

    // Check items in center panel
    let centerX = leftX + scaledLeft + panelPadding;
    let centerY = 35;
    let itemHeight = 50;
    let itemY = centerY + 40;

    for (let i = 0; i < activeRubric.length; i++) {
        if (mouseX >= centerX + 8 && mouseX <= centerX + scaledCenter - 8 &&
            mouseY >= itemY && mouseY <= itemY + itemHeight - 4) {
            hoveredItem = "rubric_" + activeRubric[i].id;
            cursor(HAND);
            return;
        }
        itemY += itemHeight;
    }
}

function addCriterionToRubric(criterion, categoryIndex) {
    // Check if already in rubric
    if (activeRubric.find(r => r.id === criterion.id)) return;

    // Add with default weight
    activeRubric.push({
        id: criterion.id,
        text: criterion.text,
        weight: criterion.defaultWeight,
        categoryIndex: categoryIndex
    });

    // Auto-balance if total exceeds 100
    autoBalanceIfNeeded();
}

function removeCriterionFromRubric(index) {
    activeRubric.splice(index, 1);
}

function addCustomCriterion() {
    if (customCriterionText.trim() === '') return;

    let customId = "custom_" + Date.now();
    activeRubric.push({
        id: customId,
        text: customCriterionText.trim(),
        weight: 10,
        categoryIndex: 3 // Domain-specific color
    });

    customCriterionText = "";
    customCriterionInput.value('');
    autoBalanceIfNeeded();
}

function autoBalanceWeights() {
    if (activeRubric.length === 0) return;

    let equalWeight = Math.floor(100 / activeRubric.length);
    let remainder = 100 - (equalWeight * activeRubric.length);

    for (let i = 0; i < activeRubric.length; i++) {
        activeRubric[i].weight = equalWeight + (i < remainder ? 1 : 0);
    }
}

function autoBalanceIfNeeded() {
    let total = activeRubric.reduce((sum, item) => sum + item.weight, 0);
    if (total > 100) {
        autoBalanceWeights();
    }
}

function resetToDefault() {
    initDefaultRubric();
}

function exportAsMarkdown() {
    let totalWeight = activeRubric.reduce((sum, item) => sum + item.weight, 0);

    let md = "# Evaluation Rubric\n\n";
    md += "| Criterion | Weight |\n";
    md += "|-----------|--------|\n";

    for (let item of activeRubric) {
        md += "| " + item.text + " | " + item.weight + "% |\n";
    }

    md += "\n**Total Weight:** " + totalWeight + "%\n";

    if (totalWeight !== 100) {
        md += "\n> **Warning:** Weights do not sum to 100%\n";
    }

    md += "\n---\n*Generated by Evaluation Rubric Builder MicroSim*\n";

    downloadFile(md, "evaluation-rubric.md", "text/markdown");
}

function exportAsJSON() {
    let totalWeight = activeRubric.reduce((sum, item) => sum + item.weight, 0);

    let data = {
        rubricName: "Custom Evaluation Rubric",
        generatedAt: new Date().toISOString(),
        totalWeight: totalWeight,
        isValid: totalWeight === 100,
        criteria: activeRubric.map(item => ({
            id: item.id,
            criterion: item.text,
            weight: item.weight,
            category: getCategoryName(item.categoryIndex)
        }))
    };

    let json = JSON.stringify(data, null, 2);
    downloadFile(json, "evaluation-rubric.json", "application/json");
}

function getCategoryName(index) {
    const names = ["Technical", "Pedagogical", "UX Design", "Domain-Specific"];
    return names[index] || "Custom";
}

function downloadFile(content, filename, mimeType) {
    let blob = new Blob([content], { type: mimeType });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
}
