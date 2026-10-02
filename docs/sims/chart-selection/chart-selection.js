// Chart Selection Matrix MicroSim
// CANVAS_HEIGHT: 702
// Decision matrix: data type (rows) by question type (columns). Each cell
// recommends a chart type. Click a chart to see when to use it and a sample
// chart, or press Practice Scenario and pick the right cell yourself.
// Learning Objective: Select the most appropriate chart type based on the
// nature of the data and the question to be answered. (Bloom: Apply)
// Content lives in data.json; this file builds the matrix and draws the charts.

(function () {
  'use strict';

  let data = null;
  let selected = null;        // { chartKey, rowKey, colKey }
  let sampleSeed = 7;         // changes each time Show Me is pressed
  let practice = null;        // { index, tries, solved } while a scenario is active
  let scenarioOrder = [];
  let scenarioPointer = -1;

  const DEFAULT_COACH = 'Find your data type in a row, then your question in a column. ' +
    'Click a chart to see when to use it, or press Practice Scenario to test yourself.';

  // Colors for multi-series sample charts
  const SERIES = ['#2563a8', '#e08a1e', '#3d9a63', '#b3336b', '#6f42b8', '#17889c'];

  // ---------------------------------------------------------------
  // Start-up
  // ---------------------------------------------------------------
  async function init() {
    try {
      const response = await fetch('./data.json');
      data = await response.json();
    } catch (err) {
      document.getElementById('coach').textContent =
        'Could not load data.json. Open this MicroSim from a web server.';
      return;
    }
    buildMatrix();
    buildLegend();
    setCoach(DEFAULT_COACH, '');

    document.getElementById('advancedToggle').addEventListener('change', onAdvancedToggle);
    document.getElementById('practiceBtn').addEventListener('click', nextScenario);
    document.getElementById('showMeBtn').addEventListener('click', onShowMe);
    window.addEventListener('resize', redrawAll);

    // Open on the most familiar chart so the detail panel is never empty
    selectChart('bar', 'categorical', 'compare');
  }

  // ---------------------------------------------------------------
  // Matrix
  // ---------------------------------------------------------------
  function buildMatrix() {
    const head = document.getElementById('matrixHead');
    const corner = document.createElement('th');
    corner.className = 'corner';
    corner.innerHTML = 'Data type ↓<br>Question →';
    head.appendChild(corner);
    data.columns.forEach(function (col) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = col.short + '<span class="sub">' + col.question + '</span>';
      th.title = col.name;
      head.appendChild(th);
    });

    const body = document.getElementById('matrixBody');
    data.rows.forEach(function (row) {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.scope = 'row';
      th.innerHTML = row.name + '<span class="sub">' + row.subtitle + '</span>';
      tr.appendChild(th);

      data.columns.forEach(function (col) {
        const td = document.createElement('td');
        td.dataset.row = row.key;
        td.dataset.col = col.key;
        const inner = document.createElement('div');
        inner.className = 'cell-inner';
        td.appendChild(inner);

        const keys = (data.cells[row.key] && data.cells[row.key][col.key]) || [];
        const misused = data.misused[row.key] && data.misused[row.key][col.key];
        const basicCount = keys.filter(function (k) { return !data.charts[k].advanced; }).length;

        if (basicCount === 0 && !misused) {
          const dash = document.createElement('span');
          dash.className = 'dash';
          dash.textContent = '–';
          dash.title = 'No standard chart for this pairing';
          inner.appendChild(dash);
          if (keys.length > 0) td.classList.add('only-advanced');
        }
        if (keys.length > 1) td.classList.add('multi');
        keys.forEach(function (key) {
          inner.appendChild(makeChip(key, row.key, col.key));
        });
        if (misused) {
          inner.appendChild(makeChip(misused, row.key, col.key));
        }

        td.addEventListener('click', function () { onCellClick(row.key, col.key); });
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
    drawIcons();
  }

  function makeChip(chartKey, rowKey, colKey) {
    const chart = data.charts[chartKey];
    const family = data.families[chart.family];
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.dataset.chart = chartKey;
    chip.dataset.row = rowKey;
    chip.dataset.col = colKey;
    chip.style.background = family.background;
    chip.style.borderColor = family.color;
    chip.title = chart.fullName + ' - ' + chart.useWhen;
    if (chart.advanced) chip.classList.add('advanced');
    if (chart.hidden) chip.classList.add('misused');
    if (chart.badge === 'best') chip.classList.add('best');

    const icon = document.createElement('canvas');
    icon.dataset.icon = chartKey;
    chip.appendChild(icon);

    const name = document.createElement('span');
    name.className = 'chip-name';
    name.textContent = chart.hidden ? 'Avoid pie' : chart.name;
    chip.appendChild(name);

    if (chart.badge) {
      chip.insertAdjacentHTML('beforeend', badgeSvg(chart.badge, 'badge'));
    }

    // Hover or keyboard focus previews; click selects
    chip.addEventListener('mouseenter', function () { showDetail(chartKey, rowKey, colKey); });
    chip.addEventListener('focus', function () { showDetail(chartKey, rowKey, colKey); });
    chip.addEventListener('mouseleave', restoreDetail);
    chip.addEventListener('blur', restoreDetail);
    chip.addEventListener('click', function () { selectChart(chartKey, rowKey, colKey); });
    return chip;
  }

  // Small inline icons: green check for best practice, amber triangle for caution
  function badgeSvg(kind, cls) {
    if (kind === 'best') {
      return '<svg class="' + cls + '" viewBox="0 0 16 16" aria-label="Best practice">' +
        '<circle cx="8" cy="8" r="7.5" fill="#2e8b57"/>' +
        '<path d="M4.3 8.3l2.5 2.5 4.9-5.3" fill="none" stroke="#fff" stroke-width="1.9"/></svg>';
    }
    return '<svg class="' + cls + '" viewBox="0 0 16 16" aria-label="Use with care">' +
      '<path d="M8 1.2L15.3 14.5H0.7z" fill="#f2b01e" stroke="#7a4b00" stroke-width="1"/>' +
      '<path d="M8 6v4.2" stroke="#3b2500" stroke-width="1.7"/>' +
      '<circle cx="8" cy="12.2" r="0.95" fill="#3b2500"/></svg>';
  }

  function buildLegend() {
    const legend = document.getElementById('legend');
    let html = '';
    Object.keys(data.families).forEach(function (key) {
      const fam = data.families[key];
      html += '<span class="legend-item"><span class="swatch" style="background:' + fam.background +
        ';border-color:' + fam.color + '"></span>' + fam.name.replace(' family', '') + '</span>';
    });
    html += '<span class="legend-item">' + badgeSvg('best', '') + 'best practice</span>';
    html += '<span class="legend-item">' + badgeSvg('warn', '') + 'use with care</span>';
    legend.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // Detail panel
  // ---------------------------------------------------------------
  function selectChart(chartKey, rowKey, colKey) {
    selected = { chartKey: chartKey, rowKey: rowKey, colKey: colKey };
    document.querySelectorAll('.chip.selected').forEach(function (el) {
      el.classList.remove('selected');
    });
    const chip = document.querySelector('.chip[data-chart="' + chartKey + '"][data-row="' +
      rowKey + '"][data-col="' + colKey + '"]');
    if (chip) chip.classList.add('selected');
    showDetail(chartKey, rowKey, colKey);
  }

  function restoreDetail() {
    if (selected) showDetail(selected.chartKey, selected.rowKey, selected.colKey);
  }

  function showDetail(chartKey, rowKey, colKey) {
    const chart = data.charts[chartKey];
    const family = data.families[chart.family];
    const row = data.rows.find(function (r) { return r.key === rowKey; });
    const col = data.columns.find(function (c) { return c.key === colKey; });

    document.getElementById('detailDot').style.background = family.color;
    document.getElementById('detailName').textContent = chart.fullName;
    const pill = document.getElementById('detailPill');
    pill.className = 'pill';
    pill.textContent = '';
    if (chart.badge === 'best') {
      pill.classList.add('best');
      pill.textContent = 'Best practice';
    } else if (chart.badge === 'warn') {
      pill.classList.add('warn');
      pill.textContent = chart.hidden ? 'Avoid' : 'Use with care';
    } else if (chart.advanced) {
      pill.classList.add('advanced');
      pill.textContent = 'Advanced';
    }
    document.getElementById('detailContext').textContent =
      row.name + ' data × ' + col.name + ' · ' + family.name;
    document.getElementById('detailUseLabel').textContent = chart.hidden ? 'Why not:' : 'Use when:';
    document.getElementById('detailUseWhen').textContent = chart.useWhen;
    document.getElementById('detailDescription').textContent = chart.description;
    document.getElementById('detailExample').textContent = chart.example;
    const tip = document.getElementById('detailTip');
    tip.textContent = chart.tip;
    tip.className = 'detail-tip' + (chart.badge === 'warn' ? ' warn' : '');

    document.getElementById('sampleTitle').textContent = chart.sampleTitle;
    const canvas = document.getElementById('sampleChart');
    canvas.setAttribute('aria-label', 'Sample ' + chart.fullName + ': ' + chart.sampleTitle);
    drawChart(canvas, chartKey, sampleSeed + hashKey(chartKey), false);
  }

  function onShowMe() {
    sampleSeed += 1;
    restoreDetail();
  }

  function onAdvancedToggle(event) {
    document.body.classList.toggle('show-advanced', event.target.checked);
    // If the selected chart was just hidden, fall back to the bar chart
    if (!event.target.checked && selected && data.charts[selected.chartKey].advanced) {
      selectChart('bar', 'categorical', 'compare');
    }
    drawIcons();
  }

  // ---------------------------------------------------------------
  // Practice scenarios
  // ---------------------------------------------------------------
  function setCoach(message, state) {
    const coach = document.getElementById('coach');
    coach.textContent = message;
    coach.className = 'coach' + (state ? ' ' + state : '');
  }

  function clearMarks() {
    document.querySelectorAll('td.target, td.miss').forEach(function (td) {
      td.classList.remove('target', 'miss');
    });
  }

  function nextScenario() {
    if (scenarioPointer < 0 || scenarioPointer >= scenarioOrder.length - 1) {
      // fixed first pass in the authored order, then keep cycling
      scenarioOrder = data.scenarios.map(function (s, i) { return i; });
      scenarioPointer = -1;
    }
    scenarioPointer += 1;
    practice = { index: scenarioOrder[scenarioPointer], tries: 0, solved: false };
    clearMarks();
    const scenario = data.scenarios[practice.index];
    setCoach('Scenario ' + (scenarioPointer + 1) + ' of ' + data.scenarios.length + ': ' +
      scenario.text + ' Click the cell you would use.', '');
    document.getElementById('practiceBtn').textContent = 'Next Scenario';
  }

  function onCellClick(rowKey, colKey) {
    if (!practice || practice.solved) return;
    const scenario = data.scenarios[practice.index];
    const row = data.rows.find(function (r) { return r.key === scenario.row; });
    const td = document.querySelector('td[data-row="' + rowKey + '"][data-col="' + colKey + '"]');
    clearMarks();

    if (rowKey === scenario.row && scenario.answers.indexOf(colKey) >= 0) {
      practice.solved = true;
      td.classList.add('target');
      const keys = data.cells[rowKey][colKey].filter(function (k) { return !data.charts[k].advanced; });
      const chart = data.charts[keys[0]];
      selectChart(keys[0], rowKey, colKey);
      setCoach('Correct! ' + row.name + ' data and the goal "' + columnName(colKey).toLowerCase() +
        '" lead to: ' + chart.fullName + '. Press Next Scenario for another one.', 'correct');
      return;
    }

    practice.tries += 1;
    td.classList.add('miss');
    let hint;
    if (practice.tries === 1) {
      hint = 'Not quite. First decide what kind of data you have (pick the row), then what you want to show (pick the column).';
    } else if (practice.tries === 2) {
      hint = 'Hint: this is ' + row.name.toLowerCase() + ' data (' + row.subtitle + '). Which column matches the question?';
    } else {
      hint = 'Hint: use the ' + row.name + ' row and the "' + columnName(scenario.answers[0]) + '" column.';
    }
    setCoach(hint + ' Scenario: ' + scenario.text, 'wrong');
  }

  function columnName(colKey) {
    return data.columns.find(function (c) { return c.key === colKey; }).name;
  }

  // ---------------------------------------------------------------
  // Chart drawing (plain canvas, no library)
  // ---------------------------------------------------------------
  function hashKey(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 9973;
    return h;
  }

  // Small seeded random number generator so icons never change
  function makeRng(seed) {
    let a = (seed * 2654435761) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawIcons() {
    document.querySelectorAll('canvas[data-icon]').forEach(function (canvas) {
      if (canvas.offsetWidth === 0) return;   // hidden advanced chip
      drawChart(canvas, canvas.dataset.icon, 3 + hashKey(canvas.dataset.icon), true);
    });
  }

  function redrawAll() {
    drawIcons();
    restoreDetail();
  }

  function drawChart(canvas, chartKey, seed, icon) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const chart = data.charts[chartKey];
    const main = data.families[chart.family].color;
    const rng = makeRng(seed);
    // plot rectangle
    const box = icon ?
      { x: 2, y: 2, w: w - 4, h: h - 4 } :
      { x: 26, y: 10, w: w - 38, h: h - 28 };
    const env = { ctx: ctx, box: box, rng: rng, icon: icon, main: main, w: w, h: h };

    // Multi-series samples get a small legend above the plot
    if (!icon && chart.legend) {
      box.y += 12;
      box.h -= 12;
      const colors = chartKey === 'dualAxis' ? [tint(main, 0.5), '#b85c00'] : SERIES;
      drawLegend(env, chart.legend, colors);
    }

    const twoAxes = chartKey === 'dualAxis';
    const noAxes = ['pie', 'pieBad', 'treemap', 'heatmap'].indexOf(chartKey) >= 0;
    if (!icon && !noAxes) drawAxes(env, twoAxes);
    CHARTS[chartKey](env);
  }

  function drawAxes(env, twoAxes) {
    const ctx = env.ctx;
    const b = env.box;
    ctx.strokeStyle = '#e3e7ec';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      const y = Math.round(b.y + b.h - b.h * i / 4) + 0.5;
      ctx.beginPath();
      ctx.moveTo(b.x, y);
      ctx.lineTo(b.x + b.w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(b.x + 0.5, b.y);
    ctx.lineTo(b.x + 0.5, b.y + b.h + 0.5);
    ctx.lineTo(b.x + b.w, b.y + b.h + 0.5);
    if (twoAxes) ctx.lineTo(b.x + b.w, b.y);
    ctx.stroke();
  }

  function drawLegend(env, labels, colors) {
    const ctx = env.ctx;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    let total = 0;
    // use a smaller font when the legend would not fit (narrow iframes)
    [11, 9, 8].some(function (size) {
      ctx.font = size + 'px Arial, Helvetica, sans-serif';
      total = 0;
      labels.forEach(function (text) { total += 13 + ctx.measureText(text).width + 8; });
      return total <= env.w;
    });
    let x = Math.max(2, (env.w - total) / 2);
    labels.forEach(function (text, i) {
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, 4, 9, 9);
      ctx.fillStyle = '#333';
      ctx.fillText(text, x + 13, 9);
      x += 13 + ctx.measureText(text).width + 8;
    });
  }

  function label(env, text, x, y, align) {
    if (env.icon) return;
    const ctx = env.ctx;
    ctx.fillStyle = '#444';
    ctx.font = '11px Arial, Helvetica, sans-serif';
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
  }

  function range(env, n, lo, hi) {
    const out = [];
    for (let i = 0; i < n; i++) out.push(lo + env.rng() * (hi - lo));
    return out;
  }

  // Fixed shapes for the tiny icons, so each one reads clearly at 44 x 26 pixels
  const ICON_WALKS = [
    [0.25, 0.5, 0.38, 0.7, 0.58, 0.9],
    [0.55, 0.4, 0.62, 0.5, 0.75, 0.66],
    [0.35, 0.6, 0.45, 0.72, 0.6, 0.85]
  ];

  // Random walk that stays between 0.15 and 0.95
  function walk(env, n, start) {
    if (env.icon) {
      env.iconSeries = (env.iconSeries || 0) + 1;
      return ICON_WALKS[(env.iconSeries - 1) % ICON_WALKS.length].slice(0, n);
    }
    const out = [];
    let v = start;
    for (let i = 0; i < n; i++) {
      v += (env.rng() - 0.42) * 0.16;
      v = Math.min(0.95, Math.max(0.15, v));
      out.push(v);
    }
    return out;
  }

  function normal(env) {
    return (env.rng() + env.rng() + env.rng() + env.rng() - 2) / 0.58;
  }

  function tint(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const mix = function (c) { return Math.round(c + (255 - c) * amount); };
    return 'rgb(' + mix(r) + ',' + mix(g) + ',' + mix(b) + ')';
  }

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  function categoryBars(env, groups, series, stacked) {
    const ctx = env.ctx, b = env.box;
    const slot = b.w / groups;
    const pad = slot * (env.icon ? 0.14 : 0.2);
    for (let g = 0; g < groups; g++) {
      const x0 = b.x + g * slot + pad;
      const width = slot - 2 * pad;
      if (stacked) {
        let top = b.y + b.h;
        const parts = range(env, series, 0.12, 0.34);
        for (let s = 0; s < series; s++) {
          const hh = parts[s] * b.h * 0.95;
          ctx.fillStyle = env.icon ? tint(env.main, s * 0.33) : SERIES[s];
          ctx.fillRect(x0, top - hh, width, hh);
          top -= hh;
        }
      } else {
        const each = width / series;
        for (let s = 0; s < series; s++) {
          const v = 0.25 + env.rng() * 0.7;
          ctx.fillStyle = series === 1 ? env.main : (env.icon ? tint(env.main, s * 0.5) : SERIES[s]);
          ctx.fillRect(x0 + s * each, b.y + b.h - v * b.h, each - (series > 1 ? 1 : 0), v * b.h);
        }
      }
      label(env, LETTERS[g], b.x + g * slot + slot / 2, b.y + b.h + 3);
    }
  }

  function seriesPath(env, values, close) {
    const ctx = env.ctx, b = env.box;
    ctx.beginPath();
    values.forEach(function (v, i) {
      const x = b.x + b.w * i / (values.length - 1);
      const y = b.y + b.h - v * b.h;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    if (close) {
      ctx.lineTo(b.x + b.w, b.y + b.h);
      ctx.lineTo(b.x, b.y + b.h);
      ctx.closePath();
    }
  }

  function monthLabels(env, n) {
    const b = env.box;
    const step = b.w / n < 13 ? 2 : 1;   // every other month when space is tight
    for (let i = 0; i < n; i += step) {
      label(env, MONTHS[i % 12], b.x + b.w * i / (n - 1), b.y + b.h + 3);
    }
  }

  const CHARTS = {
    bar: function (env) { categoryBars(env, env.icon ? 4 : 5, 1, false); },
    groupedBar: function (env) { categoryBars(env, env.icon ? 3 : 4, 2, false); },
    stackedBar: function (env) { categoryBars(env, env.icon ? 3 : 4, 3, true); },

    line: function (env) {
      const ctx = env.ctx;
      const n = env.icon ? 6 : 12;
      const lines = env.icon ? 1 : 2;
      for (let s = 0; s < lines; s++) {
        const values = walk(env, n, 0.35 + s * 0.2);
        ctx.strokeStyle = lines === 1 ? env.main : SERIES[s];
        ctx.lineWidth = env.icon ? 2 : 2.2;
        seriesPath(env, values, false);
        ctx.stroke();
      }
      monthLabels(env, n);
    },

    area: function (env) {
      const ctx = env.ctx;
      const n = env.icon ? 6 : 12;
      const values = walk(env, n, 0.35);
      ctx.fillStyle = tint(env.main, 0.55);
      seriesPath(env, values, true);
      ctx.fill();
      ctx.strokeStyle = env.main;
      ctx.lineWidth = 2;
      seriesPath(env, values, false);
      ctx.stroke();
      monthLabels(env, n);
    },

    stackedArea: function (env) {
      const ctx = env.ctx;
      const n = env.icon ? 6 : 12;
      const layers = [walk(env, n, 0.2), walk(env, n, 0.25), walk(env, n, 0.2)];
      // cumulative totals, scaled so the tallest point nearly fills the plot
      let tallest = 0;
      for (let i = 0; i < n; i++) {
        tallest = Math.max(tallest, layers[0][i] + layers[1][i] + layers[2][i]);
      }
      const scale = 0.92 / tallest;
      const totals = [];
      for (let s = 0; s < 3; s++) {
        totals.push(layers[s].map(function (v, i) {
          return (s > 0 ? totals[s - 1][i] : 0) + v * scale;
        }));
      }
      for (let s = 2; s >= 0; s--) {
        ctx.fillStyle = env.icon ? tint(env.main, s * 0.33) : SERIES[s];
        seriesPath(env, totals[s], true);
        ctx.fill();
      }
      monthLabels(env, n);
    },

    dualAxis: function (env) {
      const ctx = env.ctx, b = env.box;
      const n = env.icon ? 5 : 8;
      const slot = b.w / n;
      const bars = walk(env, n, 0.45);
      ctx.fillStyle = tint(env.main, 0.5);
      bars.forEach(function (v, i) {
        ctx.fillRect(b.x + i * slot + slot * 0.18, b.y + b.h - v * b.h, slot * 0.64, v * b.h);
      });
      const values = walk(env, n, 0.5);
      ctx.strokeStyle = '#b85c00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      values.forEach(function (v, i) {
        const x = b.x + i * slot + slot / 2;
        const y = b.y + b.h - v * b.h;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      label(env, '°F', b.x - 3, b.y - 6, 'right');
      label(env, '$', b.x + b.w + 3, b.y - 6, 'left');
    },

    histogram: function (env) {
      const ctx = env.ctx, b = env.box;
      const bins = env.icon ? 7 : 12;
      const counts = new Array(bins).fill(0);
      const center = 0.42 + env.rng() * 0.16;
      for (let i = 0; i < 300; i++) {
        const v = center + normal(env) * 0.17;
        const k = Math.floor(v * bins);
        if (k >= 0 && k < bins) counts[k] += 1;
      }
      const most = Math.max.apply(null, counts);
      const slot = b.w / bins;
      ctx.fillStyle = env.main;
      counts.forEach(function (c, i) {
        const hh = c / most * b.h * 0.95;
        ctx.fillRect(b.x + i * slot + 0.5, b.y + b.h - hh, slot - 1, hh);
      });
      label(env, '0', b.x, b.y + b.h + 3);
      label(env, '50', b.x + b.w / 2, b.y + b.h + 3);
      label(env, '100', b.x + b.w, b.y + b.h + 3);
    },

    scatter: function (env) {
      const ctx = env.ctx, b = env.box;
      const n = env.icon ? 12 : 40;
      const slope = 0.55 + env.rng() * 0.25;
      ctx.fillStyle = env.main;
      for (let i = 0; i < n; i++) {
        const x = 0.06 + env.rng() * 0.88;
        const y = Math.min(0.96, Math.max(0.04, 0.12 + slope * x + normal(env) * 0.1));
        ctx.beginPath();
        ctx.arc(b.x + x * b.w, b.y + b.h - y * b.h, env.icon ? 1.5 : 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!env.icon) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y + b.h - 0.12 * b.h);
        ctx.lineTo(b.x + b.w, b.y + b.h - (0.12 + slope) * b.h);
        ctx.stroke();
        ctx.setLineDash([]);
        label(env, 'hours', b.x + b.w / 2, b.y + b.h + 3);
      }
    },

    bubble: function (env) {
      const ctx = env.ctx, b = env.box;
      const n = env.icon ? 5 : 14;
      for (let i = 0; i < n; i++) {
        const x = 0.12 + env.rng() * 0.76;
        const y = Math.min(0.85, Math.max(0.15, 0.15 + 0.6 * x + normal(env) * 0.12));
        const r = (env.icon ? 2 : 4) + env.rng() * (env.icon ? 4 : 11);
        ctx.fillStyle = tint(env.main, 0.35);
        ctx.strokeStyle = env.main;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(b.x + x * b.w, b.y + b.h - y * b.h, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      label(env, 'hours', b.x + b.w / 2, b.y + b.h + 3);
    },

    heatmap: function (env) {
      const ctx = env.ctx;
      const b = env.icon ? env.box : { x: 30, y: 6, w: env.w - 40, h: env.h - 24 };
      const cols = env.icon ? 5 : 7;
      const rows = env.icon ? 4 : 5;
      const peakC = 1 + env.rng() * (cols - 2);
      const peakR = 1 + env.rng() * (rows - 2);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const d = Math.hypot((c - peakC) / cols, (r - peakR) / rows);
          const v = Math.max(0, Math.min(1, 1 - d * 2.2 + (env.rng() - 0.5) * 0.25));
          ctx.fillStyle = tint(env.main, 0.92 - v * 0.9);
          ctx.fillRect(b.x + c * b.w / cols + 0.5, b.y + r * b.h / rows + 0.5, b.w / cols - 1, b.h / rows - 1);
        }
      }
      if (!env.icon) {
        ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (d, c) {
          label(env, d, b.x + (c + 0.5) * b.w / cols, b.y + b.h + 3);
        });
        ['am', '', 'noon', '', 'pm'].forEach(function (t, r) {
          label(env, t, b.x - 3, b.y + (r + 0.5) * b.h / rows - 5, 'right');
        });
      }
    },

    pie: function (env) { pieSlices(env, range(env, 4, 0.6, 2.2), true); },
    pieBad: function (env) { pieSlices(env, range(env, 5, 0.9, 1.12), false); },

    treemap: function (env) {
      const ctx = env.ctx;
      const b = env.icon ? env.box : { x: 8, y: 6, w: env.w - 16, h: env.h - 12 };
      const values = range(env, env.icon ? 5 : 7, 0.4, 2.4).sort(function (a, c) { return c - a; });
      let rect = { x: b.x, y: b.y, w: b.w, h: b.h };
      let remaining = values.reduce(function (a, c) { return a + c; }, 0);
      values.forEach(function (v, i) {
        const share = v / remaining;
        let tile;
        if (rect.w >= rect.h) {
          tile = { x: rect.x, y: rect.y, w: i === values.length - 1 ? rect.w : rect.w * share, h: rect.h };
          rect = { x: rect.x + tile.w, y: rect.y, w: rect.w - tile.w, h: rect.h };
        } else {
          tile = { x: rect.x, y: rect.y, w: rect.w, h: i === values.length - 1 ? rect.h : rect.h * share };
          rect = { x: rect.x, y: rect.y + tile.h, w: rect.w, h: rect.h - tile.h };
        }
        remaining -= v;
        ctx.fillStyle = tint(env.main, Math.min(0.8, i * (env.icon ? 0.18 : 0.12)));
        ctx.fillRect(tile.x + 0.5, tile.y + 0.5, tile.w - 1, tile.h - 1);
        if (!env.icon && tile.w > 22 && tile.h > 14) {
          ctx.fillStyle = i < 3 ? '#fff' : '#222';
          ctx.font = '10px Arial, Helvetica, sans-serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText(LETTERS[i] || 'G', tile.x + 4, tile.y + 4);
        }
      });
    },

    boxPlot: function (env) {
      const ctx = env.ctx, b = env.box;
      const groups = 3;
      const slot = b.w / groups;
      for (let g = 0; g < groups; g++) {
        const cx = b.x + g * slot + slot / 2;
        const median = 0.35 + env.rng() * 0.3;
        const q1 = median - (0.08 + env.rng() * 0.1);
        const q3 = median + (0.08 + env.rng() * 0.1);
        const lo = q1 - (0.08 + env.rng() * 0.1);
        const hi = q3 + (0.08 + env.rng() * 0.12);
        const y = function (v) { return b.y + b.h - v * b.h; };
        const half = slot * 0.26;
        ctx.strokeStyle = env.main;
        ctx.lineWidth = env.icon ? 1 : 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, y(lo)); ctx.lineTo(cx, y(q1));
        ctx.moveTo(cx, y(q3)); ctx.lineTo(cx, y(hi));
        ctx.moveTo(cx - half / 2, y(lo)); ctx.lineTo(cx + half / 2, y(lo));
        ctx.moveTo(cx - half / 2, y(hi)); ctx.lineTo(cx + half / 2, y(hi));
        ctx.stroke();
        ctx.fillStyle = tint(env.main, 0.6);
        ctx.fillRect(cx - half, y(q3), half * 2, y(q1) - y(q3));
        ctx.strokeRect(cx - half, y(q3), half * 2, y(q1) - y(q3));
        ctx.beginPath();
        ctx.lineWidth = env.icon ? 1.5 : 2.5;
        ctx.moveTo(cx - half, y(median)); ctx.lineTo(cx + half, y(median));
        ctx.stroke();
        label(env, LETTERS[g], cx, b.y + b.h + 3);
      }
    },

    violin: function (env) {
      const ctx = env.ctx, b = env.box;
      const groups = 3;
      const slot = b.w / groups;
      for (let g = 0; g < groups; g++) {
        const cx = b.x + g * slot + slot / 2;
        // one or two bumps so some violins are two-peaked
        const m1 = 0.3 + env.rng() * 0.15;
        const m2 = 0.6 + env.rng() * 0.15;
        const weight2 = g === 1 ? 0.9 : env.rng() * 0.5;
        const density = function (v) {
          const d1 = Math.exp(-Math.pow((v - m1) / 0.11, 2));
          const d2 = Math.exp(-Math.pow((v - m2) / 0.11, 2)) * weight2;
          return d1 + d2;
        };
        const steps = 24;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const v = 0.04 + 0.92 * i / steps;
          const half = density(v) * slot * 0.36;
          const y = b.y + b.h - v * b.h;
          if (i === 0) ctx.moveTo(cx + half, y); else ctx.lineTo(cx + half, y);
        }
        for (let i = steps; i >= 0; i--) {
          const v = 0.04 + 0.92 * i / steps;
          const half = density(v) * slot * 0.36;
          ctx.lineTo(cx - half, b.y + b.h - v * b.h);
        }
        ctx.closePath();
        ctx.fillStyle = tint(env.main, 0.55);
        ctx.strokeStyle = env.main;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        label(env, LETTERS[g], cx, b.y + b.h + 3);
      }
    }
  };

  function pieSlices(env, values, donut) {
    const ctx = env.ctx;
    const cx = env.w / 2;
    const cy = env.h / 2;
    const radius = Math.min(env.w, env.h) / 2 - (env.icon ? 1 : 8);
    const total = values.reduce(function (a, c) { return a + c; }, 0);
    let angle = -Math.PI / 2;
    values.forEach(function (v, i) {
      const sweep = v / total * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + sweep);
      ctx.closePath();
      ctx.fillStyle = env.icon ? tint(env.main, i * 0.22) : SERIES[i];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
      if (!env.icon) {
        const mid = angle + sweep / 2;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Arial, Helvetica, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(LETTERS[i], cx + Math.cos(mid) * radius * 0.72, cy + Math.sin(mid) * radius * 0.72);
      }
      angle += sweep;
    });
    if (donut) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = env.icon ? data.families.part.background : '#fff';
      ctx.fill();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
