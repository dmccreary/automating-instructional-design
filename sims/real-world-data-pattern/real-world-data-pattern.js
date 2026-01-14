// Real-World Data Pattern MicroSim
// Climate Modeling: Compare simulated temperature with actual records

// Sample climate data (based on NASA GISS data)
const climateData = {
    global_temp: {
        name: "Global Temperature Anomaly",
        unit: "C",
        description: "Global mean surface temperature anomaly relative to 1951-1980 average",
        years: [],
        values: [],
        co2: [] // Corresponding CO2 levels for modeling
    },
    co2_levels: {
        name: "Atmospheric CO2 Levels",
        unit: "ppm",
        description: "Atmospheric CO2 concentration at Mauna Loa",
        years: [],
        values: []
    },
    sea_level: {
        name: "Sea Level Rise",
        unit: "mm",
        description: "Global mean sea level change relative to 1993-2008 average",
        years: [],
        values: []
    }
};

// Initialize sample data
function initializeData() {
    // Global Temperature Anomaly data (approximation based on NASA GISS)
    const tempData = [
        [1880, -0.16], [1885, -0.31], [1890, -0.36], [1895, -0.23], [1900, -0.08],
        [1905, -0.27], [1910, -0.43], [1915, -0.14], [1920, -0.27], [1925, -0.18],
        [1930, -0.14], [1935, -0.19], [1940, 0.12], [1945, 0.09], [1950, -0.18],
        [1955, -0.14], [1960, 0.02], [1965, -0.10], [1970, 0.03], [1975, -0.01],
        [1980, 0.26], [1985, 0.12], [1990, 0.39], [1995, 0.45], [2000, 0.42],
        [2005, 0.68], [2010, 0.72], [2015, 0.90], [2020, 1.02], [2023, 1.17]
    ];

    // Interpolate to annual data
    for (let year = 1880; year <= 2023; year++) {
        climateData.global_temp.years.push(year);

        // Find surrounding data points and interpolate
        let value = interpolateValue(tempData, year);
        // Add some realistic variation
        value += (Math.random() - 0.5) * 0.1;
        climateData.global_temp.values.push(value);

        // Estimate CO2 for that year (simple model based on historical trends)
        let co2 = estimateCO2(year);
        climateData.global_temp.co2.push(co2);
    }

    // CO2 Levels data (approximation based on NOAA data)
    for (let year = 1958; year <= 2023; year++) {
        climateData.co2_levels.years.push(year);
        let co2 = estimateCO2(year);
        co2 += (Math.random() - 0.5) * 2; // Add some noise
        climateData.co2_levels.values.push(co2);
    }

    // Sea Level Rise data (approximation based on NASA data)
    for (let year = 1993; year <= 2023; year++) {
        climateData.sea_level.years.push(year);
        // Approximately 3.4mm/year rise with acceleration
        let baseline = 1993;
        let yearsFromBaseline = year - baseline;
        let value = yearsFromBaseline * 3.4 + 0.02 * yearsFromBaseline * yearsFromBaseline;
        value += (Math.random() - 0.5) * 5; // Add some noise
        climateData.sea_level.values.push(value);
    }
}

function interpolateValue(dataArray, year) {
    // Find the two surrounding points
    let lower = dataArray[0];
    let upper = dataArray[dataArray.length - 1];

    for (let i = 0; i < dataArray.length - 1; i++) {
        if (dataArray[i][0] <= year && dataArray[i + 1][0] >= year) {
            lower = dataArray[i];
            upper = dataArray[i + 1];
            break;
        }
    }

    if (lower[0] === upper[0]) return lower[1];

    // Linear interpolation
    let ratio = (year - lower[0]) / (upper[0] - lower[0]);
    return lower[1] + ratio * (upper[1] - lower[1]);
}

function estimateCO2(year) {
    // Simple CO2 model: pre-industrial ~280ppm, exponential growth
    if (year < 1850) return 280;
    if (year < 1958) {
        // Linear approximation before Keeling Curve
        return 280 + (year - 1850) * 0.4;
    }
    // Based on actual Keeling Curve data pattern
    // Starting from ~315 ppm in 1958 to ~420 ppm in 2023
    let base = 315;
    let yearsFrom1958 = year - 1958;
    // Quadratic growth
    return base + yearsFrom1958 * 1.2 + 0.015 * yearsFrom1958 * yearsFrom1958;
}

// Chart instance
let chart = null;

// Current state
let currentDataset = 'global_temp';
let sensitivity = 1.5;
let baseline = 0;
let timeLag = 5;
let noiseLevel = 0;
let showRealData = true;
let showModel = true;
let showResiduals = false;
let showTrendline = false;
let yearStart = 1880;

// Initialize data
initializeData();

// Create the chart
function createChart() {
    const ctx = document.getElementById('chartCanvas').getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Climate Data: Model vs Reality',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(3);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temperature Anomaly (C)'
                    }
                }
            }
        }
    });

    updateChart();
}

function generateModelData(dataset, years, co2Data) {
    const modelValues = [];
    const co2Baseline = 280; // Pre-industrial CO2 level

    if (dataset === 'global_temp') {
        for (let i = 0; i < years.length; i++) {
            // Get CO2 value with time lag
            let lagIndex = Math.max(0, i - timeLag);
            let co2 = co2Data ? co2Data[lagIndex] : estimateCO2(years[lagIndex]);

            // Simple climate model: temperature ~ log(CO2/CO2_baseline) * sensitivity + baseline
            let tempAnomaly = sensitivity * Math.log(co2 / co2Baseline) / Math.log(2) * 0.5 + baseline;

            // Add noise if requested
            if (noiseLevel > 0) {
                tempAnomaly += (Math.random() - 0.5) * 2 * noiseLevel;
            }

            modelValues.push(tempAnomaly);
        }
    } else if (dataset === 'co2_levels') {
        for (let i = 0; i < years.length; i++) {
            let co2 = estimateCO2(years[i]) * sensitivity;
            if (noiseLevel > 0) {
                co2 += (Math.random() - 0.5) * 2 * noiseLevel * 50;
            }
            modelValues.push(co2 + baseline * 50);
        }
    } else if (dataset === 'sea_level') {
        for (let i = 0; i < years.length; i++) {
            let yearsFromBaseline = years[i] - 1993;
            let value = sensitivity * (yearsFromBaseline * 3.4 + 0.02 * yearsFromBaseline * yearsFromBaseline);
            value += baseline * 10;
            if (noiseLevel > 0) {
                value += (Math.random() - 0.5) * 2 * noiseLevel * 20;
            }
            modelValues.push(value);
        }
    }

    return modelValues;
}

function calculateResiduals(actual, model) {
    const residuals = [];
    for (let i = 0; i < actual.length; i++) {
        residuals.push(actual[i] - model[i]);
    }
    return residuals;
}

function calculateTrendline(years, values) {
    const n = values.length;
    if (n < 2) return { slope: 0, intercept: 0, equation: 'y = 0' };

    // Linear regression
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
        sumX += years[i];
        sumY += values[i];
        sumXY += years[i] * values[i];
        sumXX += years[i] * years[i];
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return {
        slope: slope,
        intercept: intercept,
        equation: `y = ${slope.toFixed(4)}x ${intercept >= 0 ? '+' : ''} ${intercept.toFixed(2)}`
    };
}

function calculateStatistics(actual, model) {
    if (actual.length !== model.length || actual.length === 0) {
        return { rSquared: 0, rmse: 0 };
    }

    const n = actual.length;

    // Calculate mean of actual values
    let meanActual = actual.reduce((a, b) => a + b, 0) / n;

    // Calculate SS_tot and SS_res
    let ssTot = 0, ssRes = 0;
    for (let i = 0; i < n; i++) {
        ssTot += Math.pow(actual[i] - meanActual, 2);
        ssRes += Math.pow(actual[i] - model[i], 2);
    }

    // R-squared
    let rSquared = ssTot > 0 ? 1 - (ssRes / ssTot) : 0;
    rSquared = Math.max(0, Math.min(1, rSquared)); // Clamp between 0 and 1

    // RMSE
    let rmse = Math.sqrt(ssRes / n);

    return { rSquared, rmse };
}

function updateChart() {
    const data = climateData[currentDataset];

    // Filter data by year range
    const filteredIndices = [];
    for (let i = 0; i < data.years.length; i++) {
        if (data.years[i] >= yearStart) {
            filteredIndices.push(i);
        }
    }

    const years = filteredIndices.map(i => data.years[i]);
    const actualValues = filteredIndices.map(i => data.values[i]);
    const co2Values = data.co2 ? filteredIndices.map(i => data.co2[i]) : null;
    const modelValues = generateModelData(currentDataset, years, co2Values);
    const residuals = calculateResiduals(actualValues, modelValues);
    const trend = calculateTrendline(years, actualValues);
    const trendValues = years.map(y => trend.slope * y + trend.intercept);

    // Update chart labels
    chart.data.labels = years;

    // Clear existing datasets
    chart.data.datasets = [];

    // Add real data
    if (showRealData) {
        chart.data.datasets.push({
            label: `Real Data: ${data.name}`,
            data: actualValues,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 5,
            fill: false,
            tension: 0.1
        });
    }

    // Add model prediction
    if (showModel) {
        chart.data.datasets.push({
            label: 'Model Prediction',
            data: modelValues,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0.3
        });
    }

    // Add residuals
    if (showResiduals) {
        chart.data.datasets.push({
            label: 'Residuals (Real - Model)',
            data: residuals,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.3)',
            borderWidth: 1,
            pointRadius: 2,
            fill: true,
            tension: 0.1
        });
    }

    // Add trendline
    if (showTrendline) {
        chart.data.datasets.push({
            label: `Trend: ${trend.equation}`,
            data: trendValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [10, 5],
            pointRadius: 0,
            fill: false
        });
    }

    // Update Y axis label
    chart.options.scales.y.title.text = `${data.name} (${data.unit})`;
    chart.options.plugins.title.text = `Climate Data: ${data.name}`;

    // Update chart
    chart.update();

    // Calculate and display statistics
    const stats = calculateStatistics(actualValues, modelValues);
    document.getElementById('rSquared').textContent = stats.rSquared.toFixed(3);
    document.getElementById('rmse').textContent = `${stats.rmse.toFixed(3)} ${data.unit}`;
    document.getElementById('dataPoints').textContent = years.length;
}

function exportCSV() {
    const data = climateData[currentDataset];
    const modelValues = generateModelData(currentDataset, data.years, data.co2);

    let csv = 'Year,Real Data,Model Prediction,Residual\n';
    for (let i = 0; i < data.years.length; i++) {
        if (data.years[i] >= yearStart) {
            const residual = data.values[i] - modelValues[i];
            csv += `${data.years[i]},${data.values[i].toFixed(4)},${modelValues[i].toFixed(4)},${residual.toFixed(4)}\n`;
        }
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${currentDataset}_data.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function resetParameters() {
    document.getElementById('sensitivitySlider').value = 1.5;
    document.getElementById('baselineSlider').value = 0;
    document.getElementById('lagSlider').value = 5;
    document.getElementById('noiseSlider').value = 0;
    document.getElementById('yearStartSlider').value = 1880;

    sensitivity = 1.5;
    baseline = 0;
    timeLag = 5;
    noiseLevel = 0;
    yearStart = 1880;

    updateSliderDisplays();
    updateChart();
}

function updateSliderDisplays() {
    document.getElementById('sensitivityValue').textContent = sensitivity.toFixed(1);
    document.getElementById('baselineValue').textContent = baseline.toFixed(2);
    document.getElementById('lagValue').textContent = timeLag;
    document.getElementById('noiseValue').textContent = noiseLevel.toFixed(2);
    document.getElementById('yearRangeValue').textContent = `${yearStart} - 2023`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    createChart();

    // Dataset selector
    document.getElementById('datasetSelect').addEventListener('change', function(e) {
        currentDataset = e.target.value;

        // Adjust year start based on dataset
        if (currentDataset === 'co2_levels') {
            yearStart = Math.max(yearStart, 1958);
            document.getElementById('yearStartSlider').min = 1958;
            document.getElementById('yearStartSlider').value = yearStart;
        } else if (currentDataset === 'sea_level') {
            yearStart = Math.max(yearStart, 1993);
            document.getElementById('yearStartSlider').min = 1993;
            document.getElementById('yearStartSlider').value = yearStart;
        } else {
            document.getElementById('yearStartSlider').min = 1880;
        }

        updateSliderDisplays();
        updateChart();
    });

    // Sensitivity slider
    document.getElementById('sensitivitySlider').addEventListener('input', function(e) {
        sensitivity = parseFloat(e.target.value);
        document.getElementById('sensitivityValue').textContent = sensitivity.toFixed(1);
        updateChart();
    });

    // Baseline slider
    document.getElementById('baselineSlider').addEventListener('input', function(e) {
        baseline = parseFloat(e.target.value);
        document.getElementById('baselineValue').textContent = baseline.toFixed(2);
        updateChart();
    });

    // Lag slider
    document.getElementById('lagSlider').addEventListener('input', function(e) {
        timeLag = parseInt(e.target.value);
        document.getElementById('lagValue').textContent = timeLag;
        updateChart();
    });

    // Noise slider
    document.getElementById('noiseSlider').addEventListener('input', function(e) {
        noiseLevel = parseFloat(e.target.value);
        document.getElementById('noiseValue').textContent = noiseLevel.toFixed(2);
        updateChart();
    });

    // Year range slider
    document.getElementById('yearStartSlider').addEventListener('input', function(e) {
        yearStart = parseInt(e.target.value);
        document.getElementById('yearRangeValue').textContent = `${yearStart} - 2023`;
        updateChart();
    });

    // Toggle checkboxes
    document.getElementById('showRealData').addEventListener('change', function(e) {
        showRealData = e.target.checked;
        updateChart();
    });

    document.getElementById('showModel').addEventListener('change', function(e) {
        showModel = e.target.checked;
        updateChart();
    });

    document.getElementById('showResiduals').addEventListener('change', function(e) {
        showResiduals = e.target.checked;
        updateChart();
    });

    document.getElementById('showTrendline').addEventListener('change', function(e) {
        showTrendline = e.target.checked;
        updateChart();
    });

    // Buttons
    document.getElementById('exportBtn').addEventListener('click', exportCSV);
    document.getElementById('resetBtn').addEventListener('click', resetParameters);
});
