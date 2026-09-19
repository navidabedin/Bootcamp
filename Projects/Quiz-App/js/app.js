/* ── State ───────────────────────────────────────────────────── */
let state = {
  settings:        null,   // { amount, difficulty, category }
  questions:       [],     // raw API results
  currentIndex:    0,
  score:           0,
  answers:         [],     // { question, correct, chosen, isCorrect }
  timerInterval:   null,
  timerRemaining:  15,
};

const TIMER_SECONDS = 15;

/* ── DOM refs ────────────────────────────────────────────────── */
const pages = {
  start:  document.getElementById('start-page'),
  quiz:   document.getElementById('quiz-page'),
  result: document.getElementById('result-page'),
};
const loadingOverlay = document.getElementById('loading-overlay');

// Start page
const settingsForm   = document.getElementById('quiz-settings');
const amountInput    = document.getElementById('amount');
const difficultyInput= document.getElementById('difficulty');
const categoryInput  = document.getElementById('category');
const amountError    = document.getElementById('amount-error');

// Quiz page
const progressFill   = document.getElementById('progress-fill');
const currentQEl     = document.getElementById('current-q');
const totalQEl       = document.getElementById('total-q');
const currentScoreEl = document.getElementById('current-score');
const timerCountEl   = document.getElementById('timer-count');
const questionTextEl = document.getElementById('question-text');
const optionsGrid    = document.getElementById('options-grid');

// Result page
const finalScoreEl   = document.getElementById('final-score-value');
const finalTotalEl   = document.getElementById('final-total');
const answersListEl  = document.getElementById('answers-list');
const restartBtn     = document.getElementById('restart-btn');

const apiErrorEl = document.getElementById('api-error');


/* ── Page routing ────────────────────────────────────────────── */
function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[name].classList.add('active');
}

/* ── Loading overlay ─────────────────────────────────────────── */
function setLoading(on) {
  loadingOverlay.classList.toggle('hidden', !on);
}

/* ── Category population ─────────────────────────────────────── */
async function loadCategories() {
  try {
    const cats = await fetchCategories();
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      categoryInput.appendChild(opt);
    });
  } catch {
    // non-critical: categories stay as "Any Category" only
  }
}

/* ── Helpers ─────────────────────────────────────────────────── */
function decodeHTML(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Timer ───────────────────────────────────────────────────── */
function startTimer() {
  clearInterval(state.timerInterval);
  timerCountEl.textContent = state.timerRemaining;
  timerCountEl.style.color = state.timerRemaining <= 5 ? 'var(--color-danger)' : '';
  /* state.timerRemaining = TIMER_SECONDS;
  timerCountEl.textContent = TIMER_SECONDS; */

  state.timerInterval = setInterval(() => {
    state.timerRemaining -= 1;
    timerCountEl.textContent = state.timerRemaining;

    if (state.timerRemaining <= 5) {
      timerCountEl.style.color = 'var(--color-danger)';
    }

    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      // Auto-submit as wrong (no answer chosen)
      recordAnswer(null);
      nextQuestion();
      return;
    }
    persistState();
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
  timerCountEl.style.color = '';
}

/* ── Quiz rendering ──────────────────────────────────────────── */
function renderQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;

  // Meta
  currentQEl.textContent  = state.currentIndex + 1;
  totalQEl.textContent    = total;
  currentScoreEl.textContent = state.score;

  // Progress bar
  const pct = ((state.currentIndex) / total) * 100;
  progressFill.style.width = `${pct}%`;
  pages.quiz.querySelector('.progress-bar')
    .setAttribute('aria-valuenow', state.currentIndex + 1);

  // Question
  questionTextEl.textContent = decodeHTML(q.question);

  // Options
  const options = shuffle([
    ...q.incorrect_answers.map(a => ({ text: decodeHTML(a), correct: false })),
    { text: decodeHTML(q.correct_answer), correct: true },
  ]);

  optionsGrid.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.dataset.correct = opt.correct;
    btn.addEventListener('click', () => handleAnswer(btn, opt));
    optionsGrid.appendChild(btn);
  });

  startTimer();
  persistState();
}

function handleAnswer(btn, opt) {
  stopTimer();
  disableOptions();

  if (opt.correct) {
    btn.classList.add('correct');
    state.score += 1;
    currentScoreEl.textContent = state.score;
  } else {
    btn.classList.add('wrong');
    // Highlight correct
    optionsGrid.querySelectorAll('.option-btn').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  recordAnswer(opt.text);    
  state.timerRemaining = TIMER_SECONDS;
  persistState();

  setTimeout(() => nextQuestion(), 1000);
}

function disableOptions() {
  optionsGrid.querySelectorAll('.option-btn')
    .forEach(b => { b.disabled = true; });
}

function recordAnswer(chosenText) {
  const q = state.questions[state.currentIndex];
  const correct = decodeHTML(q.correct_answer);
  const chosen  = chosenText ?? null;

  state.answers.push({
    question: decodeHTML(q.question),
    correct,
    chosen,
    isCorrect: chosen !== null && chosen === correct,
  });
}


function nextQuestion() {
  state.currentIndex += 1;
  if (state.currentIndex >= state.questions.length) {
    showResult();
  } else {
    state.timerRemaining = TIMER_SECONDS;
    renderQuestion();
  }
}

/* ── Results ─────────────────────────────────────────────────── */
function showResult() {
  showPage('result');

  const total = state.questions.length;
  finalScoreEl.textContent = state.score;
  finalTotalEl.textContent = total;

  answersListEl.innerHTML = '';
  state.answers.forEach(a => {
    const li = document.createElement('li');
    li.className = 'answer-item';
    li.innerHTML = `
      <p class="q-text">${a.question}</p>
      <p class="${a.isCorrect ? 'a-correct' : 'a-wrong'}">
        ${a.isCorrect ? '✓' : '✗'} Your answer: ${a.chosen ?? 'No answer'}
      </p>
      ${!a.isCorrect
        ? `<p class="a-correct">Correct: ${a.correct}</p>`
        : ''}
    `;
    answersListEl.appendChild(li);
  });

  Storage.clear();
}

/* ── Persist & restore ───────────────────────────────────────── */
function persistState() {
  Storage.save({
    settings:     state.settings,
    questions:    state.questions,
    currentIndex: state.currentIndex,
    score:        state.score,
    answers:      state.answers,
    timerRemaining: state.timerRemaining,
  });
}

function tryRestoreSession() {
  const saved = Storage.load();
  if (!saved || !saved.questions?.length) return false;

  state.settings     = saved.settings;
  state.questions    = saved.questions;
  state.currentIndex = saved.currentIndex;
  state.score        = saved.score;
  state.answers      = saved.answers;
   state.timerRemaining =
    (typeof saved.timerRemaining === 'number' && saved.timerRemaining > 0)
      ? saved.timerRemaining
      : TIMER_SECONDS;

      while (state.currentIndex < state.questions.length &&
         state.answers.length > state.currentIndex) {
         state.currentIndex += 1;
       }

      if (state.currentIndex >= state.questions.length) {
        showResult();
        return true;
      }

  showPage('quiz');
  renderQuestion();
  return true;
}

/* ── Start flow ──────────────────────────────────────────────── */
settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  apiErrorEl.classList.add('hidden');

  // Validate amount
  const amount = parseInt(amountInput.value, 10);
  if (!amount || amount < 1 || amount > 50) {
    amountError.textContent = 'Enter a number between 1 and 50.';
    amountInput.classList.add('error');
    amountInput.focus();
    return;
  }
  amountError.textContent = '';
  amountInput.classList.remove('error');

  state.settings = {
    amount,
    difficulty: difficultyInput.value,
    category:   categoryInput.value,
  };

  setLoading(true);

  try {
    state.questions    = await fetchQuestions(state.settings);
    if (!state.questions.length) {               
      apiErrorEl.textContent = 'سوالی یافت نشد';   
      apiErrorEl.classList.remove('hidden');     
      return;                   
    }
    state.currentIndex = 0;
    state.score        = 0;
    state.answers      = [];
    state.timerRemaining = TIMER_SECONDS;

    showPage('quiz');
    renderQuestion();
    
  } catch (err) {

    apiErrorEl.textContent = 'Could not load questions. Please try again.'; 
    apiErrorEl.classList.remove('hidden');

    console.error(err);

  } finally {

    setLoading(false);

  }
});

/* ── Restart ─────────────────────────────────────────────────── */
restartBtn.addEventListener('click', () => {
  state = {
    settings: null, questions: [], currentIndex: 0,
    score: 0, answers: [], timerInterval: null, timerRemaining: 15,
  };
  Storage.clear();
  showPage('start');
});

/* ── Init ────────────────────────────────────────────────────── */

(async function init() {

  const restored = tryRestoreSession(); 

  await loadCategories();   

  if (!restored) showPage('start');

}
)();

