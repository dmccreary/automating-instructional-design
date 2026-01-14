/**
 * Acceptance Test Matrix MicroSim
 * Interactive matrix for tracking MicroSim acceptance criteria across
 * functional, pedagogical, technical, and assessment dimensions.
 *
 * Features:
 * - Click to cycle test status: untested -> pass -> fail -> untested
 * - localStorage persistence
 * - Markdown export
 * - Real-time score calculation
 * - Full keyboard accessibility
 */

(function() {
    'use strict';

    // Test data structure with categories and individual test items
    const testData = {
        functional: {
            name: 'Functional',
            color: '#4CAF50',
            tests: [
                {
                    id: 'func-1',
                    name: 'Controls respond within 16ms',
                    description: 'User interactions (clicks, drags, keypresses) respond immediately with no perceptible lag.'
                },
                {
                    id: 'func-2',
                    name: 'Reset returns to defaults',
                    description: 'Reset button restores all controls, visualizations, and state to their initial default values.'
                },
                {
                    id: 'func-3',
                    name: 'No UI overlap at any width',
                    description: 'Controls and display elements remain readable and accessible from 320px to 1920px viewport width.'
                },
                {
                    id: 'func-4',
                    name: 'Keyboard navigation works',
                    description: 'All interactive elements can be accessed and operated using only the keyboard (Tab, Enter, Arrow keys).'
                },
                {
                    id: 'func-5',
                    name: 'Animation maintains 60fps',
                    description: 'Animated elements run smoothly at 60 frames per second without dropped frames or stuttering.'
                },
                {
                    id: 'func-6',
                    name: 'All specified states reachable',
                    description: 'Every state described in the specification can be achieved through user interaction.'
                }
            ]
        },
        pedagogical: {
            name: 'Pedagogical',
            color: '#2196F3',
            tests: [
                {
                    id: 'ped-1',
                    name: 'Cause-effect visible',
                    description: 'When users change inputs, the relationship between their action and the visual result is clear and immediate.'
                },
                {
                    id: 'ped-2',
                    name: 'Misconception addressed',
                    description: 'The simulation actively helps correct common misconceptions about the topic through visualization or feedback.'
                },
                {
                    id: 'ped-3',
                    name: 'Objective achievable in <=15min',
                    description: 'Students can complete the learning objective through interaction within a single 15-minute session.'
                },
                {
                    id: 'ped-4',
                    name: 'Scaffolding appropriate',
                    description: 'The simulation provides appropriate support for beginners without limiting advanced exploration.'
                },
                {
                    id: 'ped-5',
                    name: 'Feedback immediate and clear',
                    description: 'Users receive instant, understandable feedback about whether their actions are correct or effective.'
                }
            ]
        },
        technical: {
            name: 'Technical',
            color: '#FF9800',
            tests: [
                {
                    id: 'tech-1',
                    name: 'Runs in p5.js editor',
                    description: 'The simulation can be opened and executed in the p5.js web editor without modification.'
                },
                {
                    id: 'tech-2',
                    name: 'Responsive design works',
                    description: 'Layout adapts correctly to mobile, tablet, and desktop screen sizes using CSS responsive techniques.'
                },
                {
                    id: 'tech-3',
                    name: 'Accessibility included',
                    description: 'ARIA labels, roles, keyboard support, and screen reader compatibility are implemented.'
                },
                {
                    id: 'tech-4',
                    name: 'Loads in <3 seconds',
                    description: 'Complete page load including all scripts, styles, and initial render takes under 3 seconds on standard connection.'
                },
                {
                    id: 'tech-5',
                    name: 'No console errors',
                    description: 'Browser developer console shows no JavaScript errors or critical warnings during normal operation.'
                }
            ]
        },
        assessment: {
            name: 'Assessment-Ready',
            color: '#9C27B0',
            tests: [
                {
                    id: 'assess-1',
                    name: 'Interactions loggable',
                    description: 'User interactions can be captured as discrete events suitable for learning analytics systems.'
                },
                {
                    id: 'assess-2',
                    name: 'Completion detectable',
                    description: 'The simulation can signal when a student has achieved the learning objective or completed required tasks.'
                },
                {
                    id: 'assess-3',
                    name: 'Events deterministic',
                    description: 'Given the same inputs, the simulation produces the same outputs, enabling reproducible assessment.'
                },
                {
                    id: 'assess-4',
                    name: 'Timestamps available',
                    description: 'All logged events include accurate timestamps for time-on-task and sequence analysis.'
                },
                {
                    id: 'assess-5',
                    name: 'Errors distinguishable',
                    description: 'System can differentiate between student errors (learning opportunities) and system failures.'
                }
            ]
        }
    };

    // State management
    const STORAGE_KEY = 'acceptance-test-matrix-state';
    let state = loadState();

    /**
     * Load state from localStorage or initialize empty state
     */
    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load saved state:', e);
        }
        return initializeState();
    }

    /**
     * Initialize empty state object
     */
    function initializeState() {
        const newState = {};
        Object.values(testData).forEach(category => {
            category.tests.forEach(test => {
                newState[test.id] = 'untested'; // untested, pass, fail
            });
        });
        return newState;
    }

    /**
     * Save state to localStorage
     */
    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Could not save state:', e);
        }
    }

    /**
     * Cycle test status: untested -> pass -> fail -> untested
     */
    function cycleStatus(testId) {
        const current = state[testId];
        if (current === 'untested') {
            state[testId] = 'pass';
        } else if (current === 'pass') {
            state[testId] = 'fail';
        } else {
            state[testId] = 'untested';
        }
        saveState();
        render();
    }

    /**
     * Reset all tests to untested
     */
    function resetAll() {
        state = initializeState();
        saveState();
        render();
    }

    /**
     * Mark all tests as passed
     */
    function passAll() {
        Object.keys(state).forEach(key => {
            state[key] = 'pass';
        });
        saveState();
        render();
    }

    /**
     * Calculate scores for display
     */
    function calculateScores() {
        const scores = {
            overall: { total: 0, passed: 0, failed: 0 },
            categories: {}
        };

        Object.entries(testData).forEach(([categoryKey, category]) => {
            const categoryScore = { total: 0, passed: 0, failed: 0 };
            category.tests.forEach(test => {
                categoryScore.total++;
                scores.overall.total++;
                if (state[test.id] === 'pass') {
                    categoryScore.passed++;
                    scores.overall.passed++;
                } else if (state[test.id] === 'fail') {
                    categoryScore.failed++;
                    scores.overall.failed++;
                }
            });
            scores.categories[categoryKey] = categoryScore;
        });

        return scores;
    }

    /**
     * Generate markdown export of current state
     */
    function generateMarkdown() {
        const scores = calculateScores();
        const overallPercent = Math.round((scores.overall.passed / scores.overall.total) * 100);

        let md = `# MicroSim Acceptance Test Results\n\n`;
        md += `**Date:** ${new Date().toLocaleDateString()}\n`;
        md += `**Overall Coverage:** ${overallPercent}% (${scores.overall.passed}/${scores.overall.total} passed)\n\n`;

        Object.entries(testData).forEach(([categoryKey, category]) => {
            const catScore = scores.categories[categoryKey];
            const catPercent = Math.round((catScore.passed / catScore.total) * 100);

            md += `## ${category.name} (${catPercent}%)\n\n`;

            category.tests.forEach(test => {
                const status = state[test.id];
                let checkbox = '[ ]';
                if (status === 'pass') checkbox = '[x]';
                else if (status === 'fail') checkbox = '[-]';

                md += `- ${checkbox} ${test.name}\n`;
            });
            md += '\n';
        });

        md += `---\n`;
        md += `*Generated by Acceptance Test Matrix MicroSim*\n`;

        return md;
    }

    /**
     * Render the entire UI
     */
    function render() {
        const grid = document.getElementById('matrixGrid');
        const scores = calculateScores();

        // Update overall score display
        const overallPercent = Math.round((scores.overall.passed / scores.overall.total) * 100);
        document.getElementById('overallScore').textContent = overallPercent + '%';

        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = overallPercent + '%';
        progressBar.parentElement.setAttribute('aria-valuenow', overallPercent);

        // Update progress bar color based on score
        if (overallPercent >= 80) {
            progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        } else if (overallPercent >= 50) {
            progressBar.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #f44336, #FF5722)';
        }

        // Render category columns
        grid.innerHTML = '';

        Object.entries(testData).forEach(([categoryKey, category]) => {
            const catScore = scores.categories[categoryKey];
            const catPercent = Math.round((catScore.passed / catScore.total) * 100);

            const categoryDiv = document.createElement('div');
            categoryDiv.className = `category category-${categoryKey}`;
            categoryDiv.setAttribute('role', 'region');
            categoryDiv.setAttribute('aria-label', `${category.name} tests`);

            categoryDiv.innerHTML = `
                <div class="category-header">
                    <span class="category-title">${category.name}</span>
                    <span class="category-percent">${catPercent}%</span>
                </div>
                <div class="test-items" role="list">
                </div>
            `;

            const testItemsContainer = categoryDiv.querySelector('.test-items');

            category.tests.forEach(test => {
                const status = state[test.id];
                const testItem = document.createElement('div');
                testItem.className = `test-item ${status === 'pass' ? 'passed' : ''} ${status === 'fail' ? 'failed' : ''}`;
                testItem.setAttribute('role', 'listitem');
                testItem.setAttribute('tabindex', '0');
                testItem.setAttribute('aria-label', `${test.name}: ${status}`);
                testItem.dataset.testId = test.id;

                let checkIcon = '';
                if (status === 'pass') checkIcon = '&#10003;';
                else if (status === 'fail') checkIcon = '&#10005;';

                let statusClass = 'status-untested';
                let statusText = 'Untested';
                if (status === 'pass') {
                    statusClass = 'status-pass';
                    statusText = 'Pass';
                } else if (status === 'fail') {
                    statusClass = 'status-fail';
                    statusText = 'Fail';
                }

                testItem.innerHTML = `
                    <div class="test-checkbox" aria-hidden="true">${checkIcon}</div>
                    <div class="test-content">
                        <div class="test-name">${test.name}</div>
                        <div class="test-description">${test.description}</div>
                    </div>
                    <span class="status-indicator ${statusClass}">${statusText}</span>
                `;

                testItem.addEventListener('click', () => cycleStatus(test.id));
                testItem.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        cycleStatus(test.id);
                    }
                });

                testItemsContainer.appendChild(testItem);
            });

            grid.appendChild(categoryDiv);
        });
    }

    /**
     * Show export modal
     */
    function showExportModal() {
        const modal = document.getElementById('exportModal');
        const textarea = document.getElementById('exportTextarea');
        textarea.value = generateMarkdown();
        modal.classList.add('active');
        textarea.focus();
    }

    /**
     * Hide export modal
     */
    function hideExportModal() {
        const modal = document.getElementById('exportModal');
        modal.classList.remove('active');
        document.getElementById('exportBtn').focus();
    }

    /**
     * Copy export content to clipboard
     */
    function copyToClipboard() {
        const textarea = document.getElementById('exportTextarea');
        textarea.select();
        document.execCommand('copy');

        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }

    /**
     * Initialize event listeners and render
     */
    function init() {
        // Button event listeners
        document.getElementById('resetBtn').addEventListener('click', resetAll);
        document.getElementById('passAllBtn').addEventListener('click', passAll);
        document.getElementById('exportBtn').addEventListener('click', showExportModal);
        document.getElementById('modalClose').addEventListener('click', hideExportModal);
        document.getElementById('copyBtn').addEventListener('click', copyToClipboard);

        // Close modal on background click
        document.getElementById('exportModal').addEventListener('click', (e) => {
            if (e.target.id === 'exportModal') {
                hideExportModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('exportModal');
                if (modal.classList.contains('active')) {
                    hideExportModal();
                }
            }
        });

        // Initial render
        render();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
