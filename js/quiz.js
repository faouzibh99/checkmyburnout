/* ==========================================================================
   CheckMyBurnout.com — Quiz Engine
   20 questions across 5 dimensions, scored 0-100
   Dimensions: Workload, Emotional, Sleep, Boundaries, Meaning
   ========================================================================== */
(function () {
  'use strict';

  /* ── Question bank ──────────────────────────────────────────────────────── */
  const DIMENSIONS = {
    workload:   { label: 'Workload',       icon: '💼', color: '#6366F1' },
    emotional:  { label: 'Emotional State', icon: '💛', color: '#F59E0B' },
    sleep:      { label: 'Sleep & Recovery',icon: '🌙', color: '#8B5CF6' },
    boundaries: { label: 'Boundaries',      icon: '🛡️', color: '#10B981' },
    meaning:    { label: 'Purpose & Meaning',icon: '✨', color: '#EC4899' },
  };

  const QUESTIONS = [
    // WORKLOAD (4 questions)
    {
      id: 'w1', dim: 'workload',
      text: 'How many hours per week do you typically work (including evenings/weekends)?',
      type: 'choice',
      options: [
        { label: 'Under 40 hours',        score: 0 },
        { label: '40–48 hours',           score: 2 },
        { label: '49–55 hours',           score: 4 },
        { label: '56–65 hours',           score: 7 },
        { label: 'More than 65 hours',    score: 10 },
      ]
    },
    {
      id: 'w2', dim: 'workload',
      text: 'How often do you feel overwhelmed by your workload?',
      type: 'choice',
      options: [
        { label: 'Rarely or never',       score: 0 },
        { label: 'A few times a month',   score: 2 },
        { label: 'Weekly',                score: 5 },
        { label: 'Several times a week',  score: 8 },
        { label: 'Almost every day',      score: 10 },
      ]
    },
    {
      id: 'w3', dim: 'workload',
      text: 'Do you feel you have enough time to complete your work to a satisfying standard?',
      type: 'choice',
      options: [
        { label: 'Yes, usually',          score: 0 },
        { label: 'Sometimes',             score: 3 },
        { label: 'Rarely',                score: 7 },
        { label: 'Almost never',          score: 10 },
      ]
    },
    {
      id: 'w4', dim: 'workload',
      text: 'How often do work tasks follow you mentally into your personal time?',
      type: 'choice',
      options: [
        { label: 'Rarely — I switch off easily',     score: 0 },
        { label: 'Sometimes on busy weeks',           score: 3 },
        { label: 'Most evenings',                     score: 6 },
        { label: 'Almost always, even on weekends',  score: 10 },
      ]
    },
    // EMOTIONAL (4 questions)
    {
      id: 'e1', dim: 'emotional',
      text: 'How often do you feel emotionally drained at the end of a workday?',
      type: 'choice',
      options: [
        { label: 'Rarely',                score: 0 },
        { label: 'Once or twice a week',  score: 3 },
        { label: 'Three or four times',   score: 6 },
        { label: 'Almost every day',      score: 10 },
      ]
    },
    {
      id: 'e2', dim: 'emotional',
      text: 'How would you rate your overall mood over the past 2 weeks?',
      type: 'choice',
      options: [
        { label: '😊 Generally positive and stable',    score: 0 },
        { label: '😐 Neutral — not great, not terrible', score: 3 },
        { label: '😔 Often flat, irritable, or anxious',  score: 6 },
        { label: '😞 Consistently low, hopeless, or numb', score: 10 },
      ]
    },
    {
      id: 'e3', dim: 'emotional',
      text: 'Have you noticed increased cynicism toward your work or colleagues?',
      type: 'choice',
      options: [
        { label: 'No — I still feel engaged',            score: 0 },
        { label: 'Slightly — minor frustrations',         score: 3 },
        { label: 'Yes — I feel detached more often',     score: 7 },
        { label: 'Strongly — I feel disconnected from everything', score: 10 },
      ]
    },
    {
      id: 'e4', dim: 'emotional',
      text: 'How often do small obstacles at work feel disproportionately difficult?',
      type: 'choice',
      options: [
        { label: 'Rarely — I handle challenges well',    score: 0 },
        { label: 'Occasionally',                          score: 3 },
        { label: 'Often — my patience is thin',           score: 7 },
        { label: 'Almost always — I feel overwhelmed constantly', score: 10 },
      ]
    },
    // SLEEP & RECOVERY (4 questions)
    {
      id: 's1', dim: 'sleep',
      text: 'How many hours of sleep do you typically get per night?',
      type: 'choice',
      options: [
        { label: '8+ hours',         score: 0 },
        { label: '7–8 hours',        score: 1 },
        { label: '6–7 hours',        score: 4 },
        { label: '5–6 hours',        score: 7 },
        { label: 'Under 5 hours',    score: 10 },
      ]
    },
    {
      id: 's2', dim: 'sleep',
      text: 'How would you rate your sleep quality?',
      type: 'choice',
      options: [
        { label: 'Very good — I wake up refreshed',      score: 0 },
        { label: 'Moderate — some disruptions',           score: 3 },
        { label: 'Poor — I often wake tired',             score: 6 },
        { label: 'Very poor — sleep is a real struggle',  score: 10 },
      ]
    },
    {
      id: 's3', dim: 'sleep',
      text: 'When did you last take a real break — a day (or more) fully away from work?',
      type: 'choice',
      options: [
        { label: 'Within the last month',    score: 0 },
        { label: '1–3 months ago',           score: 3 },
        { label: '3–6 months ago',           score: 6 },
        { label: 'More than 6 months ago',   score: 9 },
        { label: "I can't remember",         score: 10 },
      ]
    },
    {
      id: 's4', dim: 'sleep',
      text: 'How physically energized do you feel during a typical workday?',
      type: 'choice',
      options: [
        { label: 'Good — steady energy through the day',  score: 0 },
        { label: 'Some afternoon slumps but manageable',  score: 3 },
        { label: 'Frequently tired, hard to concentrate', score: 6 },
        { label: 'Exhausted most of the day',             score: 10 },
      ]
    },
    // BOUNDARIES (4 questions)
    {
      id: 'b1', dim: 'boundaries',
      text: 'How often do you check work messages (email/Slack) outside working hours?',
      type: 'choice',
      options: [
        { label: 'Rarely or never',           score: 0 },
        { label: 'Occasionally for urgencies', score: 2 },
        { label: 'Most evenings',             score: 6 },
        { label: 'Constantly — I can never fully disconnect', score: 10 },
      ]
    },
    {
      id: 'b2', dim: 'boundaries',
      text: 'How comfortable are you saying "no" to additional tasks when overloaded?',
      type: 'choice',
      options: [
        { label: 'Very comfortable',          score: 0 },
        { label: 'Somewhat comfortable',      score: 2 },
        { label: 'Uncomfortable — I usually say yes anyway', score: 6 },
        { label: 'I never say no — it causes real anxiety', score: 10 },
      ]
    },
    {
      id: 'b3', dim: 'boundaries',
      text: 'Do you have hobbies, relationships, or activities outside work that you actively maintain?',
      type: 'choice',
      options: [
        { label: 'Yes — rich life outside work',         score: 0 },
        { label: "A few things, but less than I'd like",  score: 3 },
        { label: 'Rarely — work takes most of my time',  score: 7 },
        { label: "No — work has absorbed almost everything", score: 10 },
      ]
    },
    {
      id: 'b4', dim: 'boundaries',
      text: 'Do you feel guilt or anxiety when NOT working during personal time?',
      type: 'choice',
      options: [
        { label: 'No — I enjoy my time off',           score: 0 },
        { label: 'Occasionally during busy periods',    score: 3 },
        { label: 'Often — I struggle to relax',         score: 7 },
        { label: 'Almost always — rest feels unearned', score: 10 },
      ]
    },
    // MEANING (4 questions)
    {
      id: 'm1', dim: 'meaning',
      text: 'How meaningful does your work feel to you right now?',
      type: 'choice',
      options: [
        { label: 'Very meaningful — I feel a sense of purpose', score: 0 },
        { label: 'Somewhat meaningful',                          score: 3 },
        { label: 'Neutral — just going through the motions',    score: 6 },
        { label: 'Not at all — I feel empty or pointless at work', score: 10 },
      ]
    },
    {
      id: 'm2', dim: 'meaning',
      text: 'How often do you feel proud of or satisfied with your work output?',
      type: 'choice',
      options: [
        { label: 'Often',                    score: 0 },
        { label: 'Sometimes',                score: 3 },
        { label: 'Rarely',                   score: 7 },
        { label: 'Almost never',             score: 10 },
      ]
    },
    {
      id: 'm3', dim: 'meaning',
      text: 'How do you feel on Sunday evenings thinking about the work week ahead?',
      type: 'choice',
      options: [
        { label: 'Neutral or positive',                     score: 0 },
        { label: 'Mildly apprehensive',                     score: 3 },
        { label: 'Significant dread or anxiety',            score: 7 },
        { label: 'Severe dread — often affects my whole weekend', score: 10 },
      ]
    },
    {
      id: 'm4', dim: 'meaning',
      text: 'If you could quit your job today without financial consequences, how likely would you be to do it?',
      type: 'choice',
      options: [
        { label: "Not likely — I genuinely like my work",  score: 0 },
        { label: 'Unsure — depends on alternatives',        score: 3 },
        { label: 'Likely — I would seriously consider it',  score: 7 },
        { label: 'Definitely — I would quit immediately',   score: 10 },
      ]
    },
  ];

  /* ── Scoring logic ──────────────────────────────────────────────────────── */

  function calcResults(answers) {
    const dimScores = {};
    const dimMax = {};

    Object.keys(DIMENSIONS).forEach(d => { dimScores[d] = 0; dimMax[d] = 0; });

    QUESTIONS.forEach(q => {
      dimMax[q.dim] += 10;
      const a = answers[q.id];
      if (a !== undefined) dimScores[q.dim] += a;
    });

    // Normalize each dimension to 0-100
    const dimPct = {};
    Object.keys(DIMENSIONS).forEach(d => {
      dimPct[d] = dimMax[d] > 0 ? Math.round((dimScores[d] / dimMax[d]) * 100) : 0;
    });

    // Total score = weighted average across dimensions
    const total = Math.round(
      Object.values(dimPct).reduce((s, v) => s + v, 0) / Object.keys(dimPct).length
    );

    return { total, dimPct };
  }

  function getZone(score) {
    if (score <= 25) return { label: 'Healthy',       color: '#10B981', bgColor: 'rgba(16,185,129,0.1)',  borderColor: 'rgba(16,185,129,0.3)', emoji: '🌿' };
    if (score <= 45) return { label: 'Mild Strain',   color: '#34D399', bgColor: 'rgba(52,211,153,0.1)',  borderColor: 'rgba(52,211,153,0.3)', emoji: '🌤️' };
    if (score <= 60) return { label: 'At Risk',       color: '#F59E0B', bgColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', emoji: '⚠️' };
    if (score <= 75) return { label: 'Burnout Warning', color: '#F97316', bgColor: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.3)', emoji: '🔥' };
    return                 { label: 'Burnout Likely', color: '#EF4444', bgColor: 'rgba(239,68,68,0.1)',  borderColor: 'rgba(239,68,68,0.3)', emoji: '🆘' };
  }

  function getResultTitle(score) {
    if (score <= 25) return "You're doing well — keep protecting what's working";
    if (score <= 45) return "Some early warning signs — worth paying attention";
    if (score <= 60) return "Meaningful stress detected — time to take action";
    if (score <= 75) return "Significant burnout risk — this needs your attention now";
    return "High burnout likelihood — please prioritize your wellbeing";
  }

  function getResultSubtitle(score, zone) {
    if (score <= 25) return "Your current patterns suggest reasonable balance. Check your weakest dimensions below and build on your strengths.";
    if (score <= 45) return "Early signs of strain are showing up. These are important signals — easier to address now than later.";
    if (score <= 60) return "You're in a high-risk zone. Multiple dimensions are showing strain. The action plan below has specific next steps.";
    if (score <= 75) return "Your scores indicate serious burnout risk across several areas. Please take these results seriously and consider speaking to someone.";
    return "Your responses suggest you may already be experiencing burnout. You deserve support. Please reach out to a mental health professional or trusted person.";
  }

  function getActionPlan(dimPct, total) {
    // Find the 3 most stressed dimensions
    const sorted = Object.entries(dimPct)
      .sort(([,a],[,b]) => b - a)
      .slice(0, 3);

    const plans = {
      workload: {
        title: 'Reduce your cognitive load',
        desc: 'List your top 5 tasks each morning and ruthlessly cut or defer anything below the top 3. Tell your manager you need to have a conversation about capacity — this week, not next month.',
      },
      emotional: {
        title: 'Schedule emotional recovery',
        desc: 'Block 20 minutes per day for an activity that genuinely restores you (not scrolling). Consider speaking to a therapist or counselor — emotional depletion is a real clinical condition, not a character flaw.',
      },
      sleep: {
        title: 'Protect sleep as a non-negotiable',
        desc: "Set a hard \"screens off\" time 45 minutes before bed. If you're sleeping fewer than 6 hours, this is the single highest-leverage change you can make for everything else on this list.",
      },
      boundaries: {
        title: 'Build one new boundary this week',
        desc: 'Choose one specific boundary to practice: stop checking email after 7pm, protect one lunch break per week, or say no to one request that isn\'t truly yours to carry. Start with one.',
      },
      meaning: {
        title: 'Reconnect with why you started',
        desc: 'Write down 3 things you do at work that you\'re actually good at and that help someone. If you can\'t find 3, that\'s important information — and possibly a signal to explore what role would better use your strengths.',
      },
    };

    return sorted.map(([dim], i) => ({
      num: i + 1,
      dim,
      ...plans[dim],
    }));
  }

  /* ── History (localStorage) ─────────────────────────────────────────────── */

  const HISTORY_KEY = 'cmb_history';

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  function saveHistory(score, dimPct) {
    try {
      const history = loadHistory();
      history.push({
        date: new Date().toISOString().split('T')[0],
        score,
        dimPct,
        ts: Date.now(),
      });
      // Keep last 52 entries (1 year of weekly)
      const trimmed = history.slice(-52);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    } catch { /* storage unavailable */ }
  }

  /* ── History chart (pure canvas, no deps) ─────────────────────────────── */

  function drawHistoryChart(canvasId, history) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth; const H = 120;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const gridColor = isDark ? 'rgba(45,49,84,0.8)' : 'rgba(200,200,230,0.6)';
    const textColor = isDark ? '#555A7A' : '#8A8DAA';
    const lineColor = '#6366F1';

    ctx.clearRect(0, 0, W, H);

    const pad = { t:10, r:10, b:28, l:32 };
    const pw = W - pad.l - pad.r;
    const ph = H - pad.t - pad.b;

    // Grid lines
    ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
    [0,25,50,75,100].forEach(v => {
      const y = pad.t + ph - (v / 100) * ph;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + pw, y); ctx.stroke();
      ctx.fillStyle = textColor; ctx.font = '9px JetBrains Mono,monospace';
      ctx.textAlign = 'right'; ctx.fillText(v, pad.l - 4, y + 3);
    });

    // Data line
    const n = history.length;
    const pts = history.map((h, i) => ({
      x: pad.l + (i / (n - 1)) * pw,
      y: pad.t + ph - (h.score / 100) * ph,
      score: h.score,
    }));

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ph);
    grad.addColorStop(0, 'rgba(99,102,241,0.25)');
    grad.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.t + ph);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[n-1].x, pad.t + ph);
    ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = lineColor; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Dots
    pts.forEach(p => {
      const zone = getZone(p.score);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = zone.color; ctx.fill();
    });

    // Date labels for first/last
    ctx.fillStyle = textColor; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(history[0].date.slice(5), pts[0].x - 6, H - 6);
    ctx.textAlign = 'right';
    ctx.fillText(history[n-1].date.slice(5), pts[n-1].x + 6, H - 6);
  }

  /* ── Quiz state ─────────────────────────────────────────────────────────── */

  let currentQ = 0;
  let answers = {};
  let lastResult = null;

  /* ── DOM rendering ──────────────────────────────────────────────────────── */

  function renderQuestion(index) {
    const q = QUESTIONS[index];
    const dim = DIMENSIONS[q.dim];
    const pct = Math.round(((index) / QUESTIONS.length) * 100);

    // Update progress
    const progressFill = document.getElementById('progressFill');
    const progressPct = document.getElementById('progressPct');
    const stepLabel = document.getElementById('stepLabel');
    if (progressFill) {
      progressFill.style.width = pct + '%';
      // Shift gradient color based on progress
      progressFill.style.backgroundPosition = (pct) + '% 0%';
    }
    if (progressPct) progressPct.textContent = pct + '%';
    if (stepLabel) stepLabel.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;

    const block = document.getElementById('questionBlock');
    if (!block) return;

    const selected = answers[q.id];

    block.innerHTML = `
      <div class="question-category">
        <span class="category-dot" style="background:${dim.color}"></span>
        ${dim.icon} ${dim.label}
      </div>
      <div class="question-text">${q.text}</div>
      <div class="answer-grid">
        ${q.options.map((opt, i) => `
          <button class="answer-btn ${selected === opt.score && selected !== undefined ? 'selected' : ''}"
            data-score="${opt.score}" data-qid="${q.id}">
            <span class="answer-marker">${String.fromCharCode(65+i)}</span>
            ${opt.label}
          </button>
        `).join('')}
      </div>
    `;

    block.classList.remove('question-block');
    void block.offsetWidth;
    block.classList.add('question-block');

    // Attach answer listeners
    block.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const score = parseInt(btn.dataset.score);
        const qid = btn.dataset.qid;
        answers[qid] = score;
        block.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        btn.querySelector('.answer-marker').style.background = 'var(--indigo)';
        btn.querySelector('.answer-marker').style.borderColor = 'var(--indigo)';
        btn.querySelector('.answer-marker').style.color = '#fff';
        const nb = document.getElementById('nextBtn');
        if (nb) {
          nb.disabled = false;
          nb.style.opacity = '1';
          nb.style.pointerEvents = 'auto';
          nb.style.background = '';
          nb.style.color = '';
          nb.style.border = '';
          nb.style.cursor = 'pointer';
          nb.textContent = currentQ < QUESTIONS.length - 1 ? 'Next →' : 'See my results';
        }
        // Auto-advance after 400ms
        setTimeout(() => advanceQuestion(), 380);
      });
    });

    // Nav buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) {
      prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
      prevBtn.onclick = () => { if (currentQ > 0) { currentQ--; renderQuestion(currentQ); } };
    }
    if (nextBtn) {
      const hasAnswer = answers[q.id] !== undefined;
      if (index < QUESTIONS.length - 1) {
        nextBtn.textContent = hasAnswer ? 'Next →' : 'Select an answer to continue';
        nextBtn.onclick = () => {
          if (answers[q.id] !== undefined) advanceQuestion();
        };
      } else {
        nextBtn.textContent = hasAnswer ? 'See my results' : 'Select an answer to continue';
        nextBtn.onclick = () => {
          if (answers[q.id] !== undefined) showResults();
        };
      }
      nextBtn.disabled = !hasAnswer;
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = hasAnswer ? 'auto' : 'none';
      nextBtn.style.background = hasAnswer ? '' : 'transparent';
      nextBtn.style.color = hasAnswer ? '' : 'var(--text-muted)';
      nextBtn.style.border = hasAnswer ? '' : '1px dashed var(--border)';
      nextBtn.style.cursor = hasAnswer ? 'pointer' : 'default';
      nextBtn.style.boxShadow = 'none';
    }
  }

  function advanceQuestion() {
    const q = QUESTIONS[currentQ];
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = false;
    if (currentQ < QUESTIONS.length - 1) {
      currentQ++;
      renderQuestion(currentQ);
    } else {
      showResults();
    }
  }

  /* ── Results rendering ──────────────────────────────────────────────────── */

  function showResults() {
    const { total, dimPct } = calcResults(answers);
    const zone = getZone(total);
    const actions = getActionPlan(dimPct, total);
    lastResult = { total, dimPct, zone, actions };

    // Save to history
    saveHistory(total, dimPct);

    // Hide quiz, show results
    const quizSection = document.getElementById('quizSection');
    const resultsSection = document.getElementById('resultsSection');
    if (quizSection) quizSection.classList.add('hidden');
    if (resultsSection) resultsSection.classList.remove('hidden');

    // Animate score ring
    setTimeout(() => {
      const ringFill = document.getElementById('scoreRingFill');
      const scoreNum = document.getElementById('scoreNumber');
      if (ringFill) {
        const circumference = 502;
        const offset = circumference - (total / 100) * circumference;
        ringFill.style.strokeDashoffset = offset;
        ringFill.style.stroke = zone.color;
      }
      if (scoreNum) {
        scoreNum.style.color = zone.color;
        // Count up animation
        let start = 0;
        const end = total;
        const duration = 1200;
        const step = (end / duration) * 16;
        const timer = setInterval(() => {
          start = Math.min(start + step, end);
          scoreNum.textContent = Math.round(start);
          if (start >= end) clearInterval(timer);
        }, 16);
      }
    }, 100);

    // Zone badge
    const zoneBadge = document.getElementById('zoneBadge');
    if (zoneBadge) {
      zoneBadge.textContent = zone.emoji + ' ' + zone.label;
      zoneBadge.style.background = zone.bgColor;
      zoneBadge.style.borderColor = zone.borderColor;
      zoneBadge.style.color = zone.color;
    }

    // Title + subtitle
    const el = (id) => document.getElementById(id);
    if (el('resultsTitle')) el('resultsTitle').textContent = getResultTitle(total);
    if (el('resultsSubtitle')) el('resultsSubtitle').textContent = getResultSubtitle(total, zone);

    // Dimension bars
    Object.entries(dimPct).forEach(([dim, pct]) => {
      const bar = document.getElementById(`dim-bar-${dim}`);
      const num = document.getElementById(`dim-num-${dim}`);
      if (bar) {
        setTimeout(() => { bar.style.width = pct + '%'; bar.style.background = DIMENSIONS[dim].color; }, 200);
      }
      if (num) {
        num.textContent = pct + '/100';
        num.style.color = getZone(pct).color;
      }
    });

    // Action plan
    const actionList = document.getElementById('actionList');
    if (actionList) {
      actionList.innerHTML = actions.map(a => `
        <div class="action-item">
          <div class="action-num">${a.num}</div>
          <div class="action-content">
            <h4>${a.title} <span style="font-size:0.8rem;color:var(--text-muted);">(${DIMENSIONS[a.dim].icon} ${DIMENSIONS[a.dim].label})</span></h4>
            <p>${a.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // Crisis banner for high scores
    const crisis = document.getElementById('crisisBanner');
    if (crisis && total >= 70) crisis.classList.add('show');

    // History chart
    const history = loadHistory();
    const historyWrap = document.getElementById('historyWrap');
    const historyEmpty = document.getElementById('historyEmpty');
    if (history.length >= 2) {
      if (historyWrap) historyWrap.style.display = 'block';
      if (historyEmpty) historyEmpty.style.display = 'none';
      setTimeout(() => drawHistoryChart('historyChart', history), 300);
    } else {
      if (historyWrap) historyWrap.style.display = 'none';
      if (historyEmpty) historyEmpty.style.display = 'block';
    }

    // Share text
    const shareText = document.getElementById('shareText');
    if (shareText) {
      shareText.value = `I just took the Burnout Risk Assessment on CheckMyBurnout.com — my score: ${total}/100 (${zone.label}).\n\nWeakest area: ${DIMENSIONS[actions[0].dim].label}.\n\nTake the free 5-minute test: https://checkmyburnout.com`;
    }

    // Scroll to results
    resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Retake ──────────────────────────────────────────────────────────────── */

  function retakeQuiz() {
    answers = {};
    currentQ = 0;
    lastResult = null;
    const quizSection = document.getElementById('quizSection');
    const resultsSection = document.getElementById('resultsSection');
    if (quizSection) quizSection.classList.remove('hidden');
    if (resultsSection) resultsSection.classList.add('hidden');
    const crisis = document.getElementById('crisisBanner');
    if (crisis) crisis.classList.remove('show');
    renderQuestion(0);
    quizSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Init ────────────────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', () => {
    renderQuestion(0);

    document.getElementById('retakeBtn')?.addEventListener('click', retakeQuiz);
    document.getElementById('retakeBtn2')?.addEventListener('click', retakeQuiz);

    document.getElementById('copyShareBtn')?.addEventListener('click', () => {
      const shareText = document.getElementById('shareText');
      if (!shareText) return;
      navigator.clipboard.writeText(shareText.value).then(() => {
        const btn = document.getElementById('copyShareBtn');
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
      });
    });

    document.getElementById('exportPdfBtn')?.addEventListener('click', () => {
      window.print();
    });
  });

  window.BurnoutQuiz = { retakeQuiz, loadHistory, QUESTIONS, DIMENSIONS };
})();
