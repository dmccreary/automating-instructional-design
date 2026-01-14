// Misconception Catalog MicroSim
// Interactive card-based catalog of common student misconceptions

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Misconception data
const misconceptions = [
    {
        id: 1,
        title: "Multiplication Makes Bigger",
        subject: "Math",
        gradeRange: "3-6",
        statement: "Multiplication always makes numbers bigger.",
        whyBelieved: "Early experiences with whole numbers (2 x 3 = 6) reinforce this pattern before students encounter fractions or decimals.",
        correct: "Multiplying by numbers less than 1 (fractions or decimals) results in smaller products. For example, 10 x 0.5 = 5.",
        strategy: "Use visual models showing multiplication by fractions. Have students predict, then verify with number lines or area models."
    },
    {
        id: 2,
        title: "Heavy Objects Fall Faster",
        subject: "Physics",
        gradeRange: "5-12",
        statement: "Heavy objects fall faster than light objects.",
        whyBelieved: "Everyday experience with air resistance (feather vs. rock) seems to confirm this, and it aligns with intuition about 'heaviness'.",
        correct: "In a vacuum, all objects fall at the same rate regardless of mass. Air resistance, not weight, causes observed differences.",
        strategy: "Use video of Apollo 15 hammer-feather drop on the Moon. Conduct controlled experiments with similar shapes but different masses."
    },
    {
        id: 3,
        title: "Blood in Veins is Blue",
        subject: "Biology",
        gradeRange: "4-8",
        statement: "Blood in veins is blue because it lacks oxygen.",
        whyBelieved: "Veins appear blue through the skin, and diagrams use blue for deoxygenated blood by convention.",
        correct: "All blood is red. Deoxygenated blood is dark red. Veins appear blue due to how light penetrates and reflects through skin.",
        strategy: "Show actual blood samples. Discuss why diagrams use color conventions. Explain the physics of light absorption through tissue."
    },
    {
        id: 4,
        title: "Seasons from Sun Distance",
        subject: "Earth Science",
        gradeRange: "3-8",
        statement: "Seasons are caused by Earth's changing distance from the Sun.",
        whyBelieved: "It seems logical that being closer to a heat source would make it warmer. Distance is an intuitive explanation.",
        correct: "Seasons result from Earth's 23.5-degree axial tilt, which changes the angle and duration of sunlight hitting different regions.",
        strategy: "Use a globe and flashlight to demonstrate angle of incidence. Point out that hemispheres have opposite seasons simultaneously."
    },
    {
        id: 5,
        title: "Lightning Never Strikes Twice",
        subject: "Physics",
        gradeRange: "3-12",
        statement: "Lightning never strikes the same place twice.",
        whyBelieved: "The phrase is commonly used, and lightning seems random and unpredictable.",
        correct: "Lightning frequently strikes the same locations, especially tall structures. The Empire State Building is struck about 20-25 times per year.",
        strategy: "Show data on lightning strikes to tall buildings. Discuss why certain locations are more likely targets due to height and conductivity."
    },
    {
        id: 6,
        title: "Electrons Orbit Like Planets",
        subject: "Chemistry",
        gradeRange: "7-12",
        statement: "Electrons orbit the nucleus in circular paths like planets around the Sun.",
        whyBelieved: "The Bohr model, often taught first, depicts electrons this way. The solar system analogy is easy to visualize.",
        correct: "Electrons exist in probability clouds (orbitals) and don't follow fixed paths. Their behavior is described by quantum mechanics.",
        strategy: "Use interactive simulations showing electron probability distributions. Discuss how models evolve with new scientific understanding."
    },
    {
        id: 7,
        title: "Plants Get Food from Soil",
        subject: "Biology",
        gradeRange: "3-8",
        statement: "Plants get their food from the soil through their roots.",
        whyBelieved: "We feed plants by putting fertilizer in soil, and roots are clearly important for plant growth.",
        correct: "Plants make their own food through photosynthesis using carbon dioxide from air and light energy. Roots absorb water and minerals, not food.",
        strategy: "Track plant mass gain vs. soil mass loss. Discuss that most plant mass comes from CO2. Use experiments growing plants in water only."
    },
    {
        id: 8,
        title: "Cold Causes Colds",
        subject: "Biology",
        gradeRange: "4-12",
        statement: "Being cold or going outside with wet hair causes colds.",
        whyBelieved: "Colds are more common in winter, and parents often warn against getting cold. The illness is even named 'cold'.",
        correct: "Colds are caused by viruses, not temperature. Winter colds increase because people spend more time indoors in close contact.",
        strategy: "Discuss germ theory and virus transmission. Analyze why indoor crowding in winter increases infection rates. Review handwashing importance."
    },
    {
        id: 9,
        title: "Evolution is Progressive",
        subject: "Biology",
        gradeRange: "7-12",
        statement: "Evolution means species progress from 'lower' to 'higher' forms.",
        whyBelieved: "Linear evolution diagrams (fish to amphibian to human) and language like 'more evolved' reinforce this ladder concept.",
        correct: "Evolution is adaptation to environments, not progress toward a goal. Bacteria are just as 'evolved' as humans for their niches.",
        strategy: "Use tree diagrams instead of ladders. Discuss examples of 'devolution' like cave fish losing eyes. Emphasize adaptation, not advancement."
    },
    {
        id: 10,
        title: "Negative Times Negative",
        subject: "Math",
        gradeRange: "6-9",
        statement: "A negative times a negative gives a negative (or students are unsure why it's positive).",
        whyBelieved: "Multiplying 'bad by bad' intuitively seems like it should stay bad. The rule seems arbitrary without conceptual grounding.",
        correct: "Negative times negative equals positive. This can be understood through patterns, debt analogies, or number line rotations.",
        strategy: "Use number patterns extending into negatives. Try debt/credit contexts: removing a $5 debt three times = gaining $15."
    },
    {
        id: 11,
        title: "We Only Use 10% of Brain",
        subject: "Biology",
        gradeRange: "5-12",
        statement: "Humans only use 10% of their brains.",
        whyBelieved: "This myth is repeated in media and seems to explain untapped potential. Misunderstanding of neuroscience research.",
        correct: "Brain imaging shows all parts of the brain are active over time. Different regions have different functions, all of which are used.",
        strategy: "Show fMRI images of brain activity. Discuss what happens when brain regions are damaged. Trace the origin of this myth."
    },
    {
        id: 12,
        title: "Zero is Nothing",
        subject: "Math",
        gradeRange: "K-5",
        statement: "Zero means nothing and isn't really a number.",
        whyBelieved: "Zero represents the absence of quantity. Young learners often skip zero when counting.",
        correct: "Zero is a number with its own properties and crucial role in place value, number lines, and operations.",
        strategy: "Use number lines that include zero. Discuss temperature (0 degrees is a real temperature). Explore zero's role in place value."
    },
    {
        id: 13,
        title: "Division Makes Smaller",
        subject: "Math",
        gradeRange: "3-6",
        statement: "Division always makes numbers smaller.",
        whyBelieved: "Dividing whole numbers by other whole numbers (12 / 3 = 4) always gives smaller results in early math.",
        correct: "Dividing by numbers less than 1 gives larger results. For example, 6 / 0.5 = 12.",
        strategy: "Use measurement contexts: how many half-meters in 6 meters? Extend division patterns to include decimals less than 1."
    },
    {
        id: 14,
        title: "Sugar Causes Hyperactivity",
        subject: "Biology",
        gradeRange: "3-12",
        statement: "Eating sugar makes children hyperactive.",
        whyBelieved: "Children often eat sugary foods at exciting events (parties, holidays), creating a perceived correlation.",
        correct: "Multiple controlled studies show no causal link between sugar consumption and hyperactivity in children.",
        strategy: "Discuss correlation vs. causation. Review the context of sugar consumption events. Analyze experimental evidence."
    },
    {
        id: 15,
        title: "The Great Wall is Visible from Space",
        subject: "Earth Science",
        gradeRange: "3-8",
        statement: "The Great Wall of China is the only human-made structure visible from space.",
        whyBelieved: "This 'fact' has been widely published and seems plausible given the wall's length.",
        correct: "The Great Wall is too narrow (about 15 feet) to see from orbit without aid. Many larger structures like highways and airports are more visible.",
        strategy: "Calculate the wall's width vs. orbital altitude. Compare to highway widths. Show actual astronaut photos and quotes."
    },
    {
        id: 16,
        title: "Equals Sign Means Answer",
        subject: "Math",
        gradeRange: "K-5",
        statement: "The equals sign means 'the answer comes next'.",
        whyBelieved: "Students see 3 + 4 = ___ format repeatedly. The equals sign always comes before the answer box.",
        correct: "The equals sign indicates equivalence - both sides have the same value. Equations can be written as 7 = 3 + 4.",
        strategy: "Use balance scales to show equivalence. Present equations in non-standard formats. Have students judge if equations are true or false."
    }
];

// Subject colors
const subjectColors = {
    "Math": { r: 66, g: 133, b: 244 },      // Blue
    "Physics": { r: 251, g: 140, b: 0 },    // Orange
    "Biology": { r: 76, g: 175, b: 80 },    // Green
    "Chemistry": { r: 156, g: 39, b: 176 }, // Purple
    "Earth Science": { r: 121, g: 85, b: 72 } // Brown
};

// State
let filteredMisconceptions = [...misconceptions];
let activeSubject = "All";
let activeGrade = "All";
let searchQuery = "";
let selectedCard = null;
let scrollOffset = 0;
let cardWidth = 240;
let cardHeight = 180;
let cardMargin = 15;
let cardsPerRow = 3;
let collection = [];
let showCollection = false;

// UI Elements
let searchInput;

function updateCanvasSize() {
    const main = document.querySelector('main');
    if (main) {
        canvasWidth = Math.min(main.offsetWidth - 20, 900);
    }
    cardsPerRow = canvasWidth < 600 ? 2 : 3;
    cardWidth = (canvasWidth - (cardsPerRow + 1) * cardMargin) / cardsPerRow;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const main = document.querySelector('main');
    if (main) {
        canvas.parent(main);
    }

    textFont('Arial');

    // Create search input
    searchInput = createInput('');
    searchInput.attribute('placeholder', 'Search misconceptions...');
    searchInput.size(150);
    searchInput.position(canvasWidth - 170, drawHeight + 15);
    searchInput.input(handleSearch);
}

function handleSearch() {
    searchQuery = searchInput.value().toLowerCase();
    filterMisconceptions();
}

function filterMisconceptions() {
    filteredMisconceptions = misconceptions.filter(m => {
        const matchesSubject = activeSubject === "All" || m.subject === activeSubject;
        const matchesGrade = activeGrade === "All" || gradeInRange(m.gradeRange, activeGrade);
        const matchesSearch = searchQuery === "" ||
            m.title.toLowerCase().includes(searchQuery) ||
            m.statement.toLowerCase().includes(searchQuery) ||
            m.subject.toLowerCase().includes(searchQuery);
        return matchesSubject && matchesGrade && matchesSearch;
    });
    scrollOffset = 0;
}

function gradeInRange(gradeRange, targetGrade) {
    const [minGrade, maxGrade] = gradeRange.split('-').map(g => {
        if (g === 'K') return 0;
        return parseInt(g);
    });
    const target = targetGrade === 'K' ? 0 : parseInt(targetGrade);
    return target >= minGrade && target <= maxGrade;
}

function draw() {
    background(245, 247, 250);

    // Draw filter bar
    drawFilterBar();

    // Draw cards or expanded view
    if (selectedCard !== null) {
        drawExpandedCard();
    } else if (showCollection) {
        drawCollectionView();
    } else {
        drawCards();
    }

    // Draw control bar
    drawControlBar();
}

function drawFilterBar() {
    // Filter bar background
    fill(255);
    noStroke();
    rect(0, 0, canvasWidth, 45);

    // Subject filter buttons
    const subjects = ["All", "Math", "Physics", "Biology", "Chemistry", "Earth Science"];
    let btnX = 10;
    let btnY = 8;
    let btnHeight = 28;

    textSize(11);
    for (let subj of subjects) {
        let btnWidth = textWidth(subj) + 16;

        // Button background
        if (activeSubject === subj) {
            if (subj === "All") {
                fill(100, 100, 100);
            } else {
                let c = subjectColors[subj];
                fill(c.r, c.g, c.b);
            }
        } else {
            fill(230, 230, 230);
        }

        // Hover effect
        if (mouseX >= btnX && mouseX <= btnX + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight) {
            fill(red(color(activeSubject === subj ? 80 : 200)),
                 green(color(activeSubject === subj ? 80 : 200)),
                 blue(color(activeSubject === subj ? 80 : 200)));
        }

        rect(btnX, btnY, btnWidth, btnHeight, 14);

        // Button text
        fill(activeSubject === subj ? 255 : 80);
        textAlign(CENTER, CENTER);
        text(subj, btnX + btnWidth/2, btnY + btnHeight/2);

        btnX += btnWidth + 6;
    }

    // Separator line
    stroke(230);
    line(0, 45, canvasWidth, 45);
}

function drawCards() {
    let startY = 55;
    let visibleHeight = drawHeight - startY - 10;

    // Calculate total content height
    let rows = Math.ceil(filteredMisconceptions.length / cardsPerRow);
    let totalHeight = rows * (cardHeight + cardMargin);

    // Draw cards
    push();
    // Clip to visible area
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, startY, canvasWidth, visibleHeight);
    drawingContext.clip();

    for (let i = 0; i < filteredMisconceptions.length; i++) {
        let row = Math.floor(i / cardsPerRow);
        let col = i % cardsPerRow;

        let x = cardMargin + col * (cardWidth + cardMargin);
        let y = startY + row * (cardHeight + cardMargin) - scrollOffset;

        // Only draw if visible
        if (y + cardHeight > startY && y < drawHeight) {
            drawCard(filteredMisconceptions[i], x, y);
        }
    }

    drawingContext.restore();
    pop();

    // Scroll indicator
    if (totalHeight > visibleHeight) {
        let scrollBarHeight = (visibleHeight / totalHeight) * visibleHeight;
        let scrollBarY = startY + (scrollOffset / totalHeight) * visibleHeight;

        fill(200);
        noStroke();
        rect(canvasWidth - 8, scrollBarY, 6, scrollBarHeight, 3);
    }

    // No results message
    if (filteredMisconceptions.length === 0) {
        fill(120);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("No misconceptions match your filters", canvasWidth/2, drawHeight/2);
    }
}

function drawCard(m, x, y) {
    let c = subjectColors[m.subject];
    let isInCollection = collection.includes(m.id);

    // Card shadow
    fill(0, 0, 0, 20);
    noStroke();
    rect(x + 3, y + 3, cardWidth, cardHeight, 8);

    // Card background
    fill(255);
    rect(x, y, cardWidth, cardHeight, 8);

    // Colored top bar
    fill(c.r, c.g, c.b);
    rect(x, y, cardWidth, 35, 8, 8, 0, 0);

    // Title
    fill(255);
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    let title = m.title;
    if (textWidth(title) > cardWidth - 20) {
        while (textWidth(title + "...") > cardWidth - 20 && title.length > 0) {
            title = title.slice(0, -1);
        }
        title += "...";
    }
    text(title, x + 10, y + 17);
    textStyle(NORMAL);

    // Subject and grade
    fill(c.r, c.g, c.b);
    textSize(10);
    text(m.subject + " | Grades " + m.gradeRange, x + 10, y + 50);

    // Misconception statement (truncated)
    fill(80);
    textSize(11);
    let statement = '"' + m.statement + '"';
    let lines = wrapText(statement, cardWidth - 20, 3);
    let lineY = y + 68;
    for (let line of lines) {
        text(line, x + 10, lineY);
        lineY += 14;
    }

    // Collection indicator
    if (isInCollection) {
        fill(255, 193, 7);
        noStroke();
        ellipse(x + cardWidth - 18, y + 52, 20, 20);
        fill(255);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(String.fromCharCode(9733), x + cardWidth - 18, y + 52); // Star
    }

    // Click to expand text
    fill(150);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text("Click to expand", x + cardWidth/2, y + cardHeight - 8);

    // Hover effect
    if (mouseX >= x && mouseX <= x + cardWidth &&
        mouseY >= y && mouseY <= y + cardHeight) {
        stroke(c.r, c.g, c.b);
        strokeWeight(2);
        noFill();
        rect(x, y, cardWidth, cardHeight, 8);
        cursor(HAND);
    }
}

function wrapText(txt, maxWidth, maxLines) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (textWidth(testLine) > maxWidth) {
            if (currentLine) {
                lines.push(currentLine);
                if (lines.length >= maxLines - 1) {
                    lines.push(word + "...");
                    return lines;
                }
                currentLine = word;
            } else {
                lines.push(word);
                currentLine = '';
            }
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines.slice(0, maxLines);
}

function drawExpandedCard() {
    let m = misconceptions.find(mc => mc.id === selectedCard);
    if (!m) return;

    let c = subjectColors[m.subject];
    let cardX = 30;
    let cardY = 55;
    let cardW = canvasWidth - 60;
    let cardH = drawHeight - 70;

    // Dim background
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 45, canvasWidth, drawHeight - 45);

    // Card shadow
    fill(0, 0, 0, 40);
    rect(cardX + 5, cardY + 5, cardW, cardH, 12);

    // Card background
    fill(255);
    rect(cardX, cardY, cardW, cardH, 12);

    // Colored header
    fill(c.r, c.g, c.b);
    rect(cardX, cardY, cardW, 50, 12, 12, 0, 0);

    // Close button
    fill(255, 255, 255, 200);
    ellipse(cardX + cardW - 25, cardY + 25, 30, 30);
    fill(c.r, c.g, c.b);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("X", cardX + cardW - 25, cardY + 24);

    // Title
    fill(255);
    textSize(18);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(m.title, cardX + 15, cardY + 25);
    textStyle(NORMAL);

    // Subject and grade badge
    fill(255, 255, 255, 200);
    textSize(12);
    text(m.subject + " | Grades " + m.gradeRange, cardX + 15, cardY + 65);

    let contentY = cardY + 90;
    let contentX = cardX + 20;
    let contentW = cardW - 40;

    // Misconception statement
    fill(c.r, c.g, c.b);
    textSize(11);
    textStyle(BOLD);
    text("THE MISCONCEPTION:", contentX, contentY);
    textStyle(NORMAL);
    contentY += 18;

    fill(60);
    textSize(13);
    textStyle(ITALIC);
    let statementLines = wrapTextFull('"' + m.statement + '"', contentW);
    for (let line of statementLines) {
        text(line, contentX, contentY);
        contentY += 18;
    }
    textStyle(NORMAL);
    contentY += 15;

    // Why students believe it
    fill(c.r, c.g, c.b);
    textSize(11);
    textStyle(BOLD);
    text("WHY STUDENTS BELIEVE IT:", contentX, contentY);
    textStyle(NORMAL);
    contentY += 18;

    fill(80);
    textSize(12);
    let whyLines = wrapTextFull(m.whyBelieved, contentW);
    for (let line of whyLines) {
        text(line, contentX, contentY);
        contentY += 16;
    }
    contentY += 15;

    // Correct understanding
    fill(c.r, c.g, c.b);
    textSize(11);
    textStyle(BOLD);
    text("CORRECT UNDERSTANDING:", contentX, contentY);
    textStyle(NORMAL);
    contentY += 18;

    fill(60);
    textSize(12);
    let correctLines = wrapTextFull(m.correct, contentW);
    for (let line of correctLines) {
        text(line, contentX, contentY);
        contentY += 16;
    }
    contentY += 15;

    // Teaching strategy
    fill(c.r, c.g, c.b);
    textSize(11);
    textStyle(BOLD);
    text("TEACHING STRATEGY:", contentX, contentY);
    textStyle(NORMAL);
    contentY += 18;

    fill(80);
    textSize(12);
    let strategyLines = wrapTextFull(m.strategy, contentW);
    for (let line of strategyLines) {
        text(line, contentX, contentY);
        contentY += 16;
    }

    // Add to collection button
    let btnY = cardY + cardH - 45;
    let isInCollection = collection.includes(m.id);

    if (isInCollection) {
        fill(255, 193, 7);
    } else {
        fill(c.r, c.g, c.b);
    }
    rect(contentX, btnY, 180, 35, 8);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(isInCollection ? "Remove from Collection" : "Add to Collection", contentX + 90, btnY + 17);
}

function wrapTextFull(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (textWidth(testLine) > maxWidth) {
            if (currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                lines.push(word);
                currentLine = '';
            }
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines;
}

function drawCollectionView() {
    let startY = 55;

    // Header
    fill(255, 193, 7);
    rect(0, startY, canvasWidth, 40);

    fill(50);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("My Collection (" + collection.length + " items)", canvasWidth/2, startY + 20);
    textStyle(NORMAL);

    // Back button
    fill(80);
    rect(10, startY + 8, 60, 24, 12);
    fill(255);
    textSize(11);
    text("Back", 40, startY + 20);

    if (collection.length === 0) {
        fill(120);
        textSize(14);
        textAlign(CENTER, CENTER);
        text("Your collection is empty. Click on cards and add them!", canvasWidth/2, drawHeight/2);
        return;
    }

    // Draw collected cards
    let collectedItems = misconceptions.filter(m => collection.includes(m.id));
    let y = startY + 50;

    for (let m of collectedItems) {
        let c = subjectColors[m.subject];

        // Mini card
        fill(255);
        stroke(c.r, c.g, c.b);
        strokeWeight(2);
        rect(15, y, canvasWidth - 30, 60, 8);
        noStroke();

        // Subject color bar
        fill(c.r, c.g, c.b);
        rect(15, y, 6, 60, 8, 0, 0, 8);

        // Title
        fill(50);
        textSize(13);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        text(m.title, 30, y + 18);
        textStyle(NORMAL);

        // Subject and grade
        fill(100);
        textSize(10);
        text(m.subject + " | Grades " + m.gradeRange, 30, y + 38);

        // Remove button
        fill(239, 83, 80);
        rect(canvasWidth - 85, y + 15, 60, 28, 6);
        fill(255);
        textSize(10);
        textAlign(CENTER, CENTER);
        text("Remove", canvasWidth - 55, y + 29);

        y += 70;
    }
}

function drawControlBar() {
    // Control bar background
    fill(255);
    stroke(230);
    strokeWeight(1);
    rect(0, drawHeight, canvasWidth, controlHeight);
    noStroke();

    // Random button
    fill(66, 133, 244);
    rect(10, drawHeight + 12, 100, 28, 14);
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("Random", 60, drawHeight + 26);

    // Collection button
    fill(showCollection ? 255, 193, 7 : 100);
    rect(120, drawHeight + 12, 100, 28, 14);
    fill(255);
    textSize(11);
    text("Collection (" + collection.length + ")", 170, drawHeight + 26);

    // Count display
    fill(100);
    textSize(11);
    textAlign(LEFT, CENTER);
    text("Showing " + filteredMisconceptions.length + " of " + misconceptions.length, 240, drawHeight + 26);
}

function mousePressed() {
    // Check filter buttons
    if (mouseY >= 8 && mouseY <= 36) {
        const subjects = ["All", "Math", "Physics", "Biology", "Chemistry", "Earth Science"];
        let btnX = 10;
        textSize(11);

        for (let subj of subjects) {
            let btnWidth = textWidth(subj) + 16;
            if (mouseX >= btnX && mouseX <= btnX + btnWidth) {
                activeSubject = subj;
                filterMisconceptions();
                return;
            }
            btnX += btnWidth + 6;
        }
    }

    // Check expanded card interactions
    if (selectedCard !== null) {
        let m = misconceptions.find(mc => mc.id === selectedCard);
        if (!m) return;

        let c = subjectColors[m.subject];
        let cardX = 30;
        let cardY = 55;
        let cardW = canvasWidth - 60;
        let cardH = drawHeight - 70;

        // Close button
        if (dist(mouseX, mouseY, cardX + cardW - 25, cardY + 25) < 15) {
            selectedCard = null;
            return;
        }

        // Add/Remove from collection button
        let btnY = cardY + cardH - 45;
        if (mouseX >= cardX + 20 && mouseX <= cardX + 200 &&
            mouseY >= btnY && mouseY <= btnY + 35) {
            if (collection.includes(m.id)) {
                collection = collection.filter(id => id !== m.id);
            } else {
                collection.push(m.id);
            }
            return;
        }

        // Click outside card to close
        if (mouseX < cardX || mouseX > cardX + cardW ||
            mouseY < cardY || mouseY > cardY + cardH) {
            selectedCard = null;
        }
        return;
    }

    // Check collection view interactions
    if (showCollection) {
        let startY = 55;

        // Back button
        if (mouseX >= 10 && mouseX <= 70 &&
            mouseY >= startY + 8 && mouseY <= startY + 32) {
            showCollection = false;
            return;
        }

        // Remove buttons
        let y = startY + 50;
        let collectedItems = misconceptions.filter(m => collection.includes(m.id));
        for (let m of collectedItems) {
            if (mouseX >= canvasWidth - 85 && mouseX <= canvasWidth - 25 &&
                mouseY >= y + 15 && mouseY <= y + 43) {
                collection = collection.filter(id => id !== m.id);
                return;
            }
            y += 70;
        }
        return;
    }

    // Check control bar buttons
    if (mouseY >= drawHeight + 12 && mouseY <= drawHeight + 40) {
        // Random button
        if (mouseX >= 10 && mouseX <= 110) {
            let randomIndex = Math.floor(Math.random() * misconceptions.length);
            selectedCard = misconceptions[randomIndex].id;
            return;
        }

        // Collection button
        if (mouseX >= 120 && mouseX <= 220) {
            showCollection = !showCollection;
            return;
        }
    }

    // Check card clicks
    let startY = 55;
    for (let i = 0; i < filteredMisconceptions.length; i++) {
        let row = Math.floor(i / cardsPerRow);
        let col = i % cardsPerRow;

        let x = cardMargin + col * (cardWidth + cardMargin);
        let y = startY + row * (cardHeight + cardMargin) - scrollOffset;

        if (mouseX >= x && mouseX <= x + cardWidth &&
            mouseY >= y && mouseY <= y + cardHeight &&
            mouseY > startY && mouseY < drawHeight) {
            selectedCard = filteredMisconceptions[i].id;
            return;
        }
    }
}

function mouseWheel(event) {
    if (selectedCard !== null || showCollection) return;

    let startY = 55;
    let visibleHeight = drawHeight - startY - 10;
    let rows = Math.ceil(filteredMisconceptions.length / cardsPerRow);
    let totalHeight = rows * (cardHeight + cardMargin);
    let maxScroll = Math.max(0, totalHeight - visibleHeight);

    scrollOffset = constrain(scrollOffset + event.delta, 0, maxScroll);
    return false; // Prevent default scrolling
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    searchInput.position(canvasWidth - 170, drawHeight + 15);
}

function mouseMoved() {
    cursor(ARROW);
}
