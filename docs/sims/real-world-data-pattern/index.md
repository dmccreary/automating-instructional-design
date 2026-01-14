---
title: Real-World Data Pattern MicroSim
description: An interactive climate modeling MicroSim that compares simulation-generated data with real-world observations, teaching students to evaluate model accuracy and interpret authentic data patterns.
image: /sims/real-world-data-pattern/real-world-data-pattern.png
og:image: /sims/real-world-data-pattern/real-world-data-pattern.png
twitter:image: /sims/real-world-data-pattern/real-world-data-pattern.png
quality_score: 90
social:
   cards: false
---

# Real-World Data Pattern MicroSim

<iframe src="main.html" height="750px" width="100%" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<a href="main.html" target="_blank" title="Open in a new tab to expand">
  <img src="/automating-instructional-design/img/icons/fullscreen.png" alt="Fullscreen" style="cursor: pointer; width: 24px; height: 24px;">
</a>

## About This MicroSim

This interactive MicroSim demonstrates how to design educational simulations that incorporate authentic, real-world data alongside model predictions. Students learn to evaluate model accuracy by comparing simulated data against actual observations, developing critical data interpretation skills essential for scientific literacy.

The default example uses climate data, allowing students to:

- Explore the relationship between CO2 levels and temperature changes
- Adjust model parameters to improve the fit with real data
- Analyze where simplified models succeed and fail
- Consider factors that might explain discrepancies

### Learning Objective

**Students will be able to design MicroSims that incorporate authentic data and support data interpretation skills** (Bloom's Taxonomy Level: Evaluate)

### Canvas Layout (1000x600px)

| Area | Dimensions | Purpose |
|------|------------|---------|
| Data Visualization | 700x400px | Main Chart.js line graph showing model vs. reality |
| Control Panel | 300x400px | Data selection, model parameters, display options |
| Interpretation Prompts | 700x200px | Guided analysis questions for reflection |

### Key Features

#### Visual Elements

- **Simulation-generated data**: Red dashed line showing model predictions
- **Real-world comparison data**: Blue solid line with actual observations
- **Residual visualization**: Yellow shaded area showing model errors
- **Trend line with equation**: Green dashed line with linear regression equation

#### Interactive Controls

| Control | Range | Description |
|---------|-------|-------------|
| CO2 Sensitivity Factor | 0.5 - 3.0 | Climate sensitivity parameter |
| Base Temperature | -0.5 - 0.5 C | Baseline offset adjustment |
| Time Lag | 0 - 20 years | Thermal inertia of the climate system |
| Add Noise | 0 - 0.3 | Random variation for realism |
| Time Range | Variable | Filter data by starting year |
| Data Source | 3 options | Global temperature, CO2 levels, or sea level |

#### Display Toggles

- Show/hide real data
- Show/hide model predictions
- Show/hide residuals (error visualization)
- Show/hide trend line with equation

#### Export Functionality

- Export data as CSV file for external analysis
- Includes year, real data, model prediction, and residual columns

### Model Statistics

The MicroSim calculates and displays:

- **R-squared**: Coefficient of determination (model fit quality)
- **RMSE**: Root Mean Square Error (average error magnitude)
- **Data Points**: Number of observations in current view

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/automating-instructional-design/sims/real-world-data-pattern/main.html"
        height="750px" width="100%" scrolling="no"
        style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;">
</iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Remember**: Identify components of data visualization (axes, legends, trend lines)
2. **Understand**: Explain the difference between model predictions and actual observations
3. **Apply**: Adjust model parameters to improve fit with real data
4. **Analyze**: Identify patterns, trends, and anomalies in climate data
5. **Evaluate**: Assess model quality using statistical metrics (R-squared, RMSE)
6. **Create**: Propose improvements to the model based on observed discrepancies

### Prerequisites

- Basic understanding of graphs and data visualization
- Familiarity with the concept of mathematical models
- Elementary knowledge of climate science (helpful but not required)

### Suggested Activities

#### Activity 1: Data Exploration (10 minutes)

1. Select each dataset (temperature, CO2, sea level) and observe the patterns
2. Toggle the trend line on and note the slope for each dataset
3. Record observations about the general direction of each measurement over time

#### Activity 2: Model Calibration (15 minutes)

1. Start with Global Temperature Anomaly dataset
2. Adjust the sensitivity factor until the model line closely follows the real data
3. Fine-tune the baseline offset to minimize vertical gaps
4. Add time lag to account for ocean thermal inertia
5. Record your optimal parameter values and the resulting R-squared value

| Parameter | Your Value | R-squared Achieved |
|-----------|------------|-------------------|
| Sensitivity | | |
| Baseline | | |
| Time Lag | | |

#### Activity 3: Residual Analysis (15 minutes)

1. Toggle on "Show Residuals" with your calibrated model
2. Identify time periods where the model under-predicts (negative residuals)
3. Identify time periods where the model over-predicts (positive residuals)
4. Hypothesize what factors might cause these discrepancies:
   - Volcanic eruptions (cooling effect)
   - El Nino/La Nina cycles
   - Aerosol pollution (mid-century cooling)
   - Other climate oscillations

#### Activity 4: Guided Interpretation (15 minutes)

Answer the four interpretation prompts in the MicroSim:

1. **Pattern Recognition**: Describe the overall trend and any notable features
2. **Model Evaluation**: Assess how well your calibrated model matches reality
3. **Factor Analysis**: Consider what variables the simple model might be missing
4. **Prediction**: Based on patterns, make informed predictions about future trends

#### Activity 5: Design Challenge (20 minutes)

Based on your experience with this MicroSim, design a specification for a new "real-world data pattern" MicroSim for a different domain:

- Economics (stock prices, GDP growth, unemployment)
- Biology (population dynamics, disease spread)
- Physics (projectile motion, oscillation damping)
- Environmental science (air quality, water levels)

Include in your specification:
- What real data would you incorporate?
- What parameters would users adjust?
- What model equations would you use?
- What interpretation prompts would guide analysis?

### Assessment

#### Formative Assessment

- Observe students' ability to calibrate the model to achieve R-squared > 0.7
- Review written responses to interpretation prompts

#### Summative Assessment

1. Given a new dataset, calibrate the model and explain your parameter choices (Apply)
2. Analyze residuals and propose three possible explanations for model errors (Analyze)
3. Evaluate whether this simple CO2-temperature model is sufficient for climate policy decisions (Evaluate)
4. Design a MicroSim specification for a different real-world data comparison (Create)

## Design Rationale

### Why Real-World Data?

Incorporating authentic data into educational simulations:

- Builds trust in scientific methods
- Develops data literacy skills
- Shows the limitations of simplified models
- Connects abstract concepts to tangible measurements
- Prepares students for research and data analysis careers

### Scaffolded Interpretation

The guided prompts move students through increasing levels of analysis:

1. **Observation**: "What pattern do you observe?"
2. **Comparison**: "How well does your model match?"
3. **Explanation**: "What factors might explain differences?"
4. **Prediction**: "What does this suggest about future trends?"

### Model Simplification

The climate model used here is deliberately simplified (temperature proportional to log of CO2) to:

- Make parameters intuitive to adjust
- Allow for meaningful calibration exercises
- Highlight the gap between simple models and complex reality
- Prompt discussion of what's missing

## Data Sources and Citations

- **Temperature Data**: NASA GISS Surface Temperature Analysis
  - [https://data.giss.nasa.gov/gistemp/](https://data.giss.nasa.gov/gistemp/)
  - GISTEMP Team (2024). GISS Surface Temperature Analysis. NASA Goddard Institute for Space Studies.

- **CO2 Data**: NOAA Global Monitoring Laboratory
  - [https://gml.noaa.gov/ccgg/trends/](https://gml.noaa.gov/ccgg/trends/)
  - Keeling, C.D. et al. Scripps CO2 Program.

- **Sea Level Data**: NASA Climate
  - [https://climate.nasa.gov/vital-signs/sea-level/](https://climate.nasa.gov/vital-signs/sea-level/)
  - Satellite sea level observations from TOPEX/Poseidon, Jason-1/2/3.

### Data Collection Methods

- **Temperature**: Global network of weather stations (land) and ships/buoys (ocean); satellite measurements for recent decades
- **CO2**: Continuous measurements at Mauna Loa Observatory, Hawaii since 1958
- **Sea Level**: Tide gauges (historical) and satellite radar altimetry (since 1993)

## References

- IPCC (2021). Climate Change 2021: The Physical Science Basis. Intergovernmental Panel on Climate Change.
- Few, S. (2012). Show Me the Numbers: Designing Tables and Graphs to Enlighten.
- Tufte, E. (2001). The Visual Display of Quantitative Information.
- Chart.js Documentation: [https://www.chartjs.org/](https://www.chartjs.org/)
