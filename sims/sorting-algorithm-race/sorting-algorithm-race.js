// Sorting Algorithm Race MicroSim
// Compare the efficiency of different sorting algorithms

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Colors
const bgColor = '#1a1a2e';
const laneColors = {
  bubble: { main: '#e63946', light: '#ff6b6b' },
  selection: { main: '#f77f00', light: '#fcbf49' },
  insertion: { main: '#eae151', light: '#f9f871' },
  quick: { main: '#2a9d8f', light: '#52b788' }
};

// Algorithm states
let algorithms = [];
let masterArray = [];
let isRacing = false;
let isPaused = false;
let raceFinished = false;
let winner = null;

// Controls
let arraySizeSlider, speedSlider;
let generateBtn, startBtn, pauseBtn, resetBtn;
let arraySize = 50;
let animationSpeed = 50;

// Lane dimensions
let laneHeight;
let laneMargin = 10;
let barWidth;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth - 20;
  }
  canvasWidth = max(600, min(canvasWidth, 1200));
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  textFont('Arial');

  // Calculate lane dimensions
  laneHeight = (drawHeight - 120) / 4;

  // Create controls
  createControls();

  // Initialize with random array
  generateNewArray();
}

function createControls() {
  // Array Size Slider
  arraySizeSlider = createSlider(10, 100, 50);
  arraySizeSlider.position(120, canvasHeight + 10);
  arraySizeSlider.style('width', '150px');
  arraySizeSlider.input(onArraySizeChange);

  // Speed Slider
  speedSlider = createSlider(1, 100, 50);
  speedSlider.position(420, canvasHeight + 10);
  speedSlider.style('width', '150px');

  // Buttons
  generateBtn = createButton('Generate New Array');
  generateBtn.position(10, canvasHeight + 45);
  generateBtn.mousePressed(generateNewArray);

  startBtn = createButton('Start Race');
  startBtn.position(160, canvasHeight + 45);
  startBtn.mousePressed(startRace);

  pauseBtn = createButton('Pause');
  pauseBtn.position(260, canvasHeight + 45);
  pauseBtn.mousePressed(togglePause);

  resetBtn = createButton('Reset');
  resetBtn.position(340, canvasHeight + 45);
  resetBtn.mousePressed(resetRace);
}

function onArraySizeChange() {
  if (!isRacing) {
    generateNewArray();
  }
}

function generateNewArray() {
  arraySize = arraySizeSlider.value();
  masterArray = [];
  for (let i = 0; i < arraySize; i++) {
    masterArray.push(floor(random(10, 100)));
  }
  initializeAlgorithms();
  raceFinished = false;
  winner = null;
}

function initializeAlgorithms() {
  algorithms = [
    {
      name: 'Bubble Sort',
      array: [...masterArray],
      comparisons: 0,
      swaps: 0,
      color: laneColors.bubble,
      finished: false,
      i: 0,
      j: 0,
      sorted: false
    },
    {
      name: 'Selection Sort',
      array: [...masterArray],
      comparisons: 0,
      swaps: 0,
      color: laneColors.selection,
      finished: false,
      i: 0,
      minIdx: 0,
      j: 0,
      sorted: false
    },
    {
      name: 'Insertion Sort',
      array: [...masterArray],
      comparisons: 0,
      swaps: 0,
      color: laneColors.insertion,
      finished: false,
      i: 1,
      j: 0,
      key: 0,
      sorted: false
    },
    {
      name: 'Quick Sort',
      array: [...masterArray],
      comparisons: 0,
      swaps: 0,
      color: laneColors.quick,
      finished: false,
      stack: [[0, masterArray.length - 1]],
      partitionState: null,
      sorted: false
    }
  ];
}

function startRace() {
  if (!isRacing && !raceFinished) {
    isRacing = true;
    isPaused = false;
    startBtn.html('Racing...');
    startBtn.attribute('disabled', '');
  }
}

function togglePause() {
  if (isRacing) {
    isPaused = !isPaused;
    pauseBtn.html(isPaused ? 'Resume' : 'Pause');
  }
}

function resetRace() {
  isRacing = false;
  isPaused = false;
  raceFinished = false;
  winner = null;
  initializeAlgorithms();
  startBtn.html('Start Race');
  startBtn.removeAttribute('disabled');
  pauseBtn.html('Pause');
}

function draw() {
  background(bgColor);

  // Draw title
  fill(255);
  textSize(24);
  textAlign(CENTER, TOP);
  text('Sorting Algorithm Race', canvasWidth / 2, 10);

  // Draw control labels
  fill(200);
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Array Size: ' + arraySizeSlider.value(), 10, canvasHeight + 20);
  text('Speed: ' + speedSlider.value(), 310, canvasHeight + 20);

  // Draw lanes
  let laneY = 50;
  for (let i = 0; i < algorithms.length; i++) {
    drawLane(algorithms[i], laneY, i);
    laneY += laneHeight + laneMargin;
  }

  // Draw stats table
  drawStatsTable();

  // Run sorting steps if racing
  if (isRacing && !isPaused && !raceFinished) {
    let stepsPerFrame = map(speedSlider.value(), 1, 100, 1, 10);
    for (let s = 0; s < stepsPerFrame; s++) {
      performSortingSteps();
    }
    checkForWinner();
  }

  // Draw winner announcement
  if (raceFinished && winner) {
    drawWinnerAnnouncement();
  }
}

function drawLane(algo, y, index) {
  // Lane background
  fill(40, 40, 60);
  stroke(algo.color.main);
  strokeWeight(2);
  rect(10, y, canvasWidth - 20, laneHeight, 5);

  // Algorithm name and stats
  fill(algo.color.light);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text(algo.name, 20, y + 5);

  fill(200);
  textSize(11);
  text('Comparisons: ' + algo.comparisons, 150, y + 5);
  text('Swaps: ' + algo.swaps, 280, y + 5);

  // Status indicator
  if (algo.finished) {
    fill(algo.color.light);
    text('DONE!', 380, y + 5);
  }

  // Draw array bars
  let barAreaWidth = canvasWidth - 40;
  barWidth = barAreaWidth / algo.array.length;
  let maxVal = 100;
  let barAreaHeight = laneHeight - 35;

  for (let i = 0; i < algo.array.length; i++) {
    let barHeight = map(algo.array[i], 0, maxVal, 5, barAreaHeight);
    let barX = 20 + i * barWidth;
    let barY = y + laneHeight - 5 - barHeight;

    // Color based on value
    let c = lerpColor(color(algo.color.main), color(algo.color.light), algo.array[i] / maxVal);
    fill(c);
    noStroke();
    rect(barX, barY, max(1, barWidth - 1), barHeight);
  }

  // Progress bar
  let progress = algo.finished ? 1 : calculateProgress(algo);
  fill(60, 60, 80);
  rect(20, y + laneHeight - 3, barAreaWidth, 2);
  fill(algo.color.main);
  rect(20, y + laneHeight - 3, barAreaWidth * progress, 2);
}

function calculateProgress(algo) {
  // Estimate progress based on algorithm state
  let n = algo.array.length;
  if (algo.name === 'Bubble Sort' || algo.name === 'Selection Sort') {
    return algo.i / n;
  } else if (algo.name === 'Insertion Sort') {
    return algo.i / n;
  } else if (algo.name === 'Quick Sort') {
    // Estimate based on comparisons vs expected
    let expected = n * Math.log2(n);
    return min(1, algo.comparisons / expected);
  }
  return 0;
}

function drawStatsTable() {
  let tableY = drawHeight - 50;
  let tableWidth = canvasWidth - 40;
  let colWidth = tableWidth / 4;

  // Table header
  fill(60, 60, 80);
  rect(20, tableY, tableWidth, 45, 5);

  fill(255);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Algorithm', 20 + colWidth * 0.5, tableY + 5);
  text('Comparisons', 20 + colWidth * 1.5, tableY + 5);
  text('Swaps', 20 + colWidth * 2.5, tableY + 5);
  text('Status', 20 + colWidth * 3.5, tableY + 5);

  // Table data
  fill(200);
  textSize(10);
  let rowY = tableY + 22;
  for (let algo of algorithms) {
    text(algo.name, 20 + colWidth * 0.5, rowY);
    text(algo.comparisons, 20 + colWidth * 1.5, rowY);
    text(algo.swaps, 20 + colWidth * 2.5, rowY);
    fill(algo.finished ? color(algo.color.light) : color(200));
    text(algo.finished ? 'Complete' : 'Running', 20 + colWidth * 3.5, rowY);
    fill(200);
    rowY += 12;
  }
}

function drawWinnerAnnouncement() {
  // Semi-transparent overlay
  fill(0, 0, 0, 150);
  rect(canvasWidth / 2 - 200, 180, 400, 100, 10);

  // Winner text
  fill(winner.color.light);
  textSize(28);
  textAlign(CENTER, CENTER);
  text('Winner: ' + winner.name + '!', canvasWidth / 2, 210);

  fill(200);
  textSize(16);
  text('Comparisons: ' + winner.comparisons + ' | Swaps: ' + winner.swaps, canvasWidth / 2, 250);
}

function performSortingSteps() {
  for (let algo of algorithms) {
    if (!algo.finished) {
      performStep(algo);
    }
  }
}

function performStep(algo) {
  let arr = algo.array;
  let n = arr.length;

  switch (algo.name) {
    case 'Bubble Sort':
      bubbleSortStep(algo);
      break;
    case 'Selection Sort':
      selectionSortStep(algo);
      break;
    case 'Insertion Sort':
      insertionSortStep(algo);
      break;
    case 'Quick Sort':
      quickSortStep(algo);
      break;
  }
}

function bubbleSortStep(algo) {
  let arr = algo.array;
  let n = arr.length;

  if (algo.i >= n - 1) {
    algo.finished = true;
    return;
  }

  algo.comparisons++;
  if (arr[algo.j] > arr[algo.j + 1]) {
    [arr[algo.j], arr[algo.j + 1]] = [arr[algo.j + 1], arr[algo.j]];
    algo.swaps++;
  }

  algo.j++;
  if (algo.j >= n - 1 - algo.i) {
    algo.j = 0;
    algo.i++;
  }
}

function selectionSortStep(algo) {
  let arr = algo.array;
  let n = arr.length;

  if (algo.i >= n - 1) {
    algo.finished = true;
    return;
  }

  algo.comparisons++;
  if (arr[algo.j] < arr[algo.minIdx]) {
    algo.minIdx = algo.j;
  }

  algo.j++;
  if (algo.j >= n) {
    if (algo.minIdx !== algo.i) {
      [arr[algo.i], arr[algo.minIdx]] = [arr[algo.minIdx], arr[algo.i]];
      algo.swaps++;
    }
    algo.i++;
    algo.minIdx = algo.i;
    algo.j = algo.i + 1;
  }
}

function insertionSortStep(algo) {
  let arr = algo.array;
  let n = arr.length;

  if (algo.i >= n) {
    algo.finished = true;
    return;
  }

  if (algo.j === 0 || algo.key === 0) {
    algo.key = arr[algo.i];
    algo.j = algo.i - 1;
  }

  algo.comparisons++;
  if (algo.j >= 0 && arr[algo.j] > algo.key) {
    arr[algo.j + 1] = arr[algo.j];
    algo.swaps++;
    algo.j--;
  } else {
    arr[algo.j + 1] = algo.key;
    algo.i++;
    algo.j = 0;
    algo.key = 0;
  }
}

function quickSortStep(algo) {
  let arr = algo.array;

  if (algo.stack.length === 0) {
    algo.finished = true;
    return;
  }

  if (!algo.partitionState) {
    let [low, high] = algo.stack[algo.stack.length - 1];
    if (low < high) {
      algo.partitionState = {
        low: low,
        high: high,
        pivot: arr[high],
        i: low - 1,
        j: low
      };
    } else {
      algo.stack.pop();
    }
    return;
  }

  let ps = algo.partitionState;

  if (ps.j < ps.high) {
    algo.comparisons++;
    if (arr[ps.j] < ps.pivot) {
      ps.i++;
      [arr[ps.i], arr[ps.j]] = [arr[ps.j], arr[ps.i]];
      algo.swaps++;
    }
    ps.j++;
  } else {
    [arr[ps.i + 1], arr[ps.high]] = [arr[ps.high], arr[ps.i + 1]];
    algo.swaps++;

    let pivotIdx = ps.i + 1;
    algo.stack.pop();

    if (pivotIdx - 1 > ps.low) {
      algo.stack.push([ps.low, pivotIdx - 1]);
    }
    if (pivotIdx + 1 < ps.high) {
      algo.stack.push([pivotIdx + 1, ps.high]);
    }

    algo.partitionState = null;
  }
}

function checkForWinner() {
  let allFinished = true;
  let firstFinished = null;

  for (let algo of algorithms) {
    if (algo.finished && !firstFinished) {
      firstFinished = algo;
    }
    if (!algo.finished) {
      allFinished = false;
    }
  }

  if (firstFinished && !winner) {
    winner = firstFinished;
  }

  if (allFinished) {
    raceFinished = true;
    isRacing = false;
    startBtn.html('Race Complete');
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition controls
  arraySizeSlider.position(120, canvasHeight + 10);
  speedSlider.position(420, canvasHeight + 10);
  generateBtn.position(10, canvasHeight + 45);
  startBtn.position(160, canvasHeight + 45);
  pauseBtn.position(260, canvasHeight + 45);
  resetBtn.position(340, canvasHeight + 45);
}
