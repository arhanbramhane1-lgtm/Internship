/* ═══════════════════════════════════════
   DARK / LIGHT THEME TOGGLE
═══════════════════════════════════════ */
function toggleTheme() {
  const html  = document.documentElement;
  const label = document.getElementById('themeLabel');
  const isDark = html.getAttribute('data-theme') === 'dark';

  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  label.textContent = isDark ? 'Dark mode' : 'Light mode';

  // Save preference so it persists on reload
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Apply saved theme on page load
(function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const label = document.getElementById('themeLabel');
    if (label) label.textContent = saved === 'light' ? 'Dark mode' : 'Light mode';
  }
})();


/* ═══════════════════════════════════════
   LIVE DATE & TIME
═══════════════════════════════════════ */
function updateClock() {
  const now = new Date();

  // Date: e.g. "Saturday, June 27, 2026"
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric'
  });

  // Time: e.g. "04:35:20 PM"
  const timeStr = now.toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById('liveDate').textContent = dateStr;
  document.getElementById('liveTime').textContent = timeStr;

  // Footer also shows the time
  const footerEl = document.getElementById('footerTime');
  if (footerEl) footerEl.textContent = timeStr;
}

// Run immediately, then update every second
updateClock();
setInterval(updateClock, 1000);


/* ═══════════════════════════════════════
   TAB SWITCHING
═══════════════════════════════════════ */
function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  btn.classList.add('active');
}


/* ═══════════════════════════════════════
   PROJECT 1 — MULTIPLICATION TABLE
   Concept: for loop iterates from 1 to limit
═══════════════════════════════════════ */
function generateTable() {
  const num   = parseInt(document.getElementById('multNum').value)   || 1;
  const limit = parseInt(document.getElementById('multLimit').value) || 10;

  const grid = document.getElementById('multGrid');
  grid.innerHTML = '';
  let codeOut = '';

  // Core for loop — i counts from 1 up to the limit
  for (let i = 1; i <= limit; i++) {
    const product = num * i;

    // Visual card for each row
    const cell = document.createElement('div');
    cell.className = 'mult-cell';
    cell.innerHTML = `<span>${num} × ${i}</span><br><span class="res">${product}</span>`;
    grid.appendChild(cell);

    // Text output line
    codeOut += `${num} × ${String(i).padStart(2)} = ${product}\n`;
  }

  document.getElementById('multOut').textContent = codeOut.trim();
}


/* ═══════════════════════════════════════
   PROJECT 2 — FACTORIAL CALCULATOR
   Concept: recursive function + for loop
═══════════════════════════════════════ */

// Recursive approach — function calls itself with (n - 1)
function factorialRecursive(n) {
  if (n === 0 || n === 1) return 1n;             // base case (BigInt)
  return BigInt(n) * factorialRecursive(n - 1);  // recursive call
}

function calcFactorial() {
  const n = parseInt(document.getElementById('factNum').value);

  if (isNaN(n) || n < 0 || n > 20) {
    document.getElementById('factBig').textContent = '–';
    document.getElementById('factEq').textContent  = 'Enter a number between 0 and 20';
    document.getElementById('factSteps').innerHTML  = '';
    return;
  }

  const result = factorialRecursive(n);

  // Build equation string: "6 × 5 × 4 × 3 × 2 × 1"
  const steps = [];
  for (let i = n; i >= 1; i--) steps.push(i);

  document.getElementById('factBig').textContent = result.toLocaleString();
  document.getElementById('factEq').textContent  = n === 0
    ? '0! = 1 (by definition)'
    : `${n}! = ${steps.join(' × ')}`;

  // Render step pills (only if n is small enough to display nicely)
  const stepsEl = document.getElementById('factSteps');
  stepsEl.innerHTML = '';
  if (n > 0 && n <= 10) {
    steps.forEach((s, i) => {
      const pill = document.createElement('span');
      pill.className = 'step-pill';
      pill.textContent = s;
      stepsEl.appendChild(pill);
      if (i < steps.length - 1) {
        const arr = document.createElement('span');
        arr.className = 'step-arrow';
        arr.textContent = '×';
        stepsEl.appendChild(arr);
      }
    });
  }
}


/* ═══════════════════════════════════════
   PROJECT 3 — NUMBER GUESSING GAME
   Concept: Math.random, if/else, counters
═══════════════════════════════════════ */
let secret, attemptsLeft, totalGuesses, rangeMin, rangeMax;
const MAX_ATTEMPTS = 7;

function startGame() {
  // Pick a random integer between 1 and 100
  secret       = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = MAX_ATTEMPTS;
  totalGuesses = 0;
  rangeMin     = 1;
  rangeMax     = 100;

  // Reset UI
  document.getElementById('statAttempts').textContent = attemptsLeft;
  document.getElementById('statGuesses').textContent  = totalGuesses;
  document.getElementById('statRange').textContent    = `${rangeMin}–${rangeMax}`;
  document.getElementById('attemptsFill').style.width = '100%';
  document.getElementById('guessInput').disabled      = false;
  document.getElementById('guessInput').value         = '';
  document.getElementById('guessBtn').disabled        = false;
  document.getElementById('gameLog').innerHTML        = '';

  const hint = document.getElementById('hintMsg');
  hint.style.display = 'none';
  hint.className     = 'hint-msg';
}

function makeGuess() {
  const input = document.getElementById('guessInput');
  const guess = parseInt(input.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    showHint('hint-low', 'Enter a valid number between 1 and 100.');
    return;
  }

  attemptsLeft--;
  totalGuesses++;

  // Update stats
  document.getElementById('statAttempts').textContent = attemptsLeft;
  document.getElementById('statGuesses').textContent  = totalGuesses;

  // Shrink progress bar
  const pct = (attemptsLeft / MAX_ATTEMPTS) * 100;
  document.getElementById('attemptsFill').style.width = pct + '%';

  // Check result with if / else if / else
  if (guess === secret) {
    showHint('hint-win', `🎉 Correct! The number was ${secret}. You won in ${totalGuesses} guess${totalGuesses > 1 ? 'es' : ''}!`);
    addLog(guess, '✓ Correct!', 'var(--teal)');
    endGame();

  } else if (attemptsLeft === 0) {
    showHint('hint-lose', `❌ Game over! The secret number was ${secret}.`);
    addLog(guess, 'No attempts left', '#ef5350');
    endGame();

  } else if (guess < secret) {
    // Narrow down the range — we now know min is at least guess + 1
    rangeMin = Math.max(rangeMin, guess + 1);
    showHint('hint-low', `📈 Too low! Try higher. (${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left)`);
    addLog(guess, '↑ Too low', 'var(--amber)');

  } else {
    // Narrow down the range — we now know max is at most guess - 1
    rangeMax = Math.min(rangeMax, guess - 1);
    showHint('hint-high', `📉 Too high! Try lower. (${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left)`);
    addLog(guess, '↓ Too high', 'var(--purple)');
  }

  document.getElementById('statRange').textContent = `${rangeMin}–${rangeMax}`;
  input.value = '';
  input.focus();
}

function showHint(cls, msg) {
  const el = document.getElementById('hintMsg');
  el.className      = 'hint-msg ' + cls;
  el.textContent    = msg;
  el.style.display  = 'block';
}

function addLog(guess, hint, color) {
  const log  = document.getElementById('gameLog');
  const item = document.createElement('div');
  item.className = 'log-item';
  item.innerHTML = `
    <span>Guess #${totalGuesses}: <span class="log-guess">${guess}</span></span>
    <span style="color:${color}; font-size:11px;">${hint}</span>
  `;
  // Newest guess appears at top
  log.prepend(item);
}

function endGame() {
  document.getElementById('guessInput').disabled = true;
  document.getElementById('guessBtn').disabled   = true;
}

// Press Enter to submit a guess
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement.id === 'guessInput') {
    makeGuess();
  }
});


/* ═══════════════════════════════════════
   INIT — run all defaults on page load
═══════════════════════════════════════ */
generateTable();
calcFactorial();
startGame();