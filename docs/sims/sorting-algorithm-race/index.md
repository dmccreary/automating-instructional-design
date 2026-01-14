# Sorting Algorithm Race

<iframe src="main.html" width="100%" height="650" style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></iframe>

<a href="main.html" target="_blank" class="button">Open Fullscreen</a>

## About This MicroSim

This interactive MicroSim allows you to visualize and compare the performance of four common sorting algorithms racing to sort the same array. Watch as Bubble Sort, Selection Sort, Insertion Sort, and Quick Sort compete to see which finishes first.

### How to Use

1. **Array Size Slider**: Adjust the size of the array to be sorted (10-100 elements)
2. **Speed Slider**: Control the animation speed
3. **Generate New Array**: Create a new random array for all algorithms
4. **Start Race**: Begin the sorting competition
5. **Pause/Resume**: Pause or continue the race
6. **Reset**: Reset all algorithms to start fresh

### What to Observe

- **Comparison Count**: How many times the algorithm compares two elements
- **Swap Count**: How many times elements are moved
- **Progress Bars**: Visual indication of how close each algorithm is to finishing
- **Winner Announcement**: See which algorithm wins the race

### Key Insights

| Algorithm | Time Complexity | Best For |
|-----------|-----------------|----------|
| Bubble Sort | O(n^2) | Small, nearly sorted arrays |
| Selection Sort | O(n^2) | Minimizing swaps |
| Insertion Sort | O(n^2) | Small or nearly sorted arrays |
| Quick Sort | O(n log n) avg | Large, random arrays |

Try these experiments:
- Start with a small array (10 elements) and increase to 100
- Notice how Quick Sort becomes increasingly dominant as array size grows
- Watch how O(n^2) algorithms slow down dramatically with larger arrays

### Learning Objectives

- Compare the efficiency of different sorting algorithms visually
- Understand why Big-O notation matters in practice
- Observe how algorithm complexity affects performance at scale

## Lesson Plan

### Grade Level
High School (Grades 9-12) or Introductory Computer Science

### Duration
45-60 minutes

### Prerequisites
- Basic understanding of arrays
- Concept of sorting data

### Learning Standards
- CSTA 2-AP-16: Incorporate existing code, media, and libraries into original programs
- CSTA 3A-AP-13: Create prototypes that use algorithms to solve computational problems

### Activities

1. **Warm-up (5 min)**: Ask students how they would sort a deck of cards. Discuss different strategies.

2. **Introduction (10 min)**: Explain the four algorithms conceptually before running the simulation.

3. **Exploration (15 min)**:
   - Run races with array size 20, then 50, then 100
   - Record winner and comparison counts for each

4. **Analysis (10 min)**:
   - Create a graph of array size vs. comparisons for each algorithm
   - Discuss why Quick Sort pulls ahead on larger arrays

5. **Discussion (10 min)**:
   - When might you choose Selection Sort over Quick Sort?
   - What is the trade-off between comparisons and swaps?

### Assessment Questions

1. Which algorithm consistently wins with large arrays? Why?
2. What happens to the O(n^2) algorithms as array size doubles?
3. Why does Big-O notation focus on large inputs?

## Edit This Simulation

<a href="https://editor.p5js.org/" target="_blank" class="button">Open p5.js Editor</a>

Copy the code from [sorting-algorithm-race.js](./sorting-algorithm-race.js) into the p5.js editor to experiment with modifications such as:
- Adding more sorting algorithms (Merge Sort, Heap Sort)
- Changing the visualization style
- Adding sound effects for swaps
- Implementing step-by-step mode
