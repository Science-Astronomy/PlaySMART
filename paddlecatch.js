// ===== Canvas & UI =====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

// Modal elements
const questionModal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const submitAnswer = document.getElementById("submitAnswer");
const feedback = document.getElementById("feedback");
// Grade 9
const questionsArrayMathGradeNine = [
  { q: "What is the value of π (pi) to two decimal places?", a: "3.14" },
  { q: "What is the formula to calculate the area of a circle?", a: "A = πr²" },
  { q: "What is the Pythagorean theorem?", a: "a² + b² = c²" },
  { q: "What is the value of the square root of 64?", a: "8" },
  { q: "f(x) = 2x + 3. What is f(4)?", a: "11" },
  {
    q: "What is the slope of the line represented by the equation y = 3x + 2?",
    a: "3",
  },
  {
    q: "What is the formula to calculate the volume of a rectangular prism?",
    a: "V = lwh",
  },
  { q: "What is the value of 7! (7 factorial)?", a: "5040" },
  {
    q: "What is the formula to calculate the circumference of a circle?",
    a: "C = 2πr",
  },
  { q: "What is the value of the expression 2^3 * 2^4?", a: "128" },
];

const questionsArrayScienceGradeNine = [
  { q: "What is the chemical symbol for water?", a: "H2O" },
  { q: "What planet is known as the Red Planet?", a: "Mars" },
  {
    q: "What gas do plants absorb from the atmosphere during photosynthesis?",
    a: "Carbon dioxide",
  },
  { q: "What is the powerhouse of the cell?", a: "Mitochondria" },
  {
    q: "What is the process by which a liquid changes into a gas?",
    a: "Evaporation",
  },
  { q: "What is the chemical formula for table salt?", a: "NaCl" },
  {
    q: "What organ in the human body is responsible for pumping blood?",
    a: "Heart",
  },
  { q: "What is the largest organ in the human body?", a: "Skin" },
  { q: "What force keeps us grounded on Earth?", a: "Gravity" },
  { q: "What is the basic unit of life?", a: "Cell" },
];

const questionsArraySpanishGradeNine = [
  { q: "How do you say 'Hello' in Spanish?", a: "Hola" },
  { q: "What is the Spanish word for 'Thank you'?", a: "Gracias" },
  { q: "How do you say 'Goodbye' in Spanish?", a: "Adiós" },
  { q: "What is the Spanish word for 'Please'?", a: "Por favor" },
  { q: "How do you say 'Yes' in Spanish?", a: "Sí" },
  { q: "What is the Spanish word for 'No'?", a: "No" },
  { q: "How do you say 'Excuse me' in Spanish?", a: "Perdón" },
  { q: "What is the Spanish word for 'Friend'?", a: "Amigo" },
  { q: "How do you say 'Family' in Spanish?", a: "Familia" },
  { q: "What is the Spanish word for 'School'?", a: "Escuela" },
];

// Grade 10
const questionsArrayMathGradeTen = [
  {
    q: "What is the value of e (Euler's number) to two decimal places?",
    a: "2.72",
  },
  {
    q: "What is the formula to calculate the area of a triangle?",
    a: "A = 1/2bh",
  },
  {
    q: "If f(x) = x² - 4x + 4, what are the roots of the equation f(x) = 0?",
    a: "2",
  },
  { q: "What is the value of the square root of 121?", a: "11" },
  {
    q: "What is the slope of the line represented by the equation y = -2x + 5?",
    a: "-2",
  },
  {
    q: "What is the formula to calculate the volume of a cylinder?",
    a: "V = πr²h",
  },
  { q: "What is the value of 5! (5 factorial)?", a: "120" },
  {
    q: "What is the formula to calculate the surface area of a sphere? Do control+p on mac or alt 227 on windows to get π and use (^) for power...",
    a: "A = 4πr^²",
  },
  { q: "What is the value of the expression 3^2 * 3^3?", a: "243" },
];

const questionsArrayScienceGradeTen = [
  { q: "What is the chemical symbol for carbon dioxide?", a: "CO2" },
  { q: "What planet is known as the Earth's twin?", a: "Venus" },
  { q: "What gas do humans exhale during respiration?", a: "Carbon dioxide" },
  { q: "What is the basic unit of heredity?", a: "Gene" },
  {
    q: "What is the process by which plants make their own food?",
    a: "Photosynthesis",
  },
  { q: "What is the chemical formula for glucose?", a: "C6H12O6" },
  {
    q: "What organ in the human body is responsible for filtering blood?",
    a: "Kidneys",
  },
  { q: "What is the largest bone in the human body?", a: "Femur" },
  { q: "What force causes objects to fall towards the Earth?", a: "Gravity" },
  { q: "What is the study of living organisms called?", a: "Biology" },
];

const questionsArraySpanishGradeTen = [
  {
    q: "How do you say 'Good morning' in Spanish? Type answer as one word (no spaces)",
    a: "Buenos días",
  },
  {
    q: "What is the Spanish word for 'Please'? Type answer as one word (no spaces)",
    a: "Por favor",
  },
  {
    q: "How do you say 'See you later' in Spanish? Type answer as one word (no spaces)",
    a: "Hasta luego",
  },
  { q: "What is the Spanish word for 'Excuse me'?", a: "Perdón" },
  { q: "How do you say 'Maybe' in Spanish?", a: "Quizás" },
  { q: "What is the Spanish word for 'Family'?", a: "Familia" },
  { q: "How do you say 'Work' in Spanish?", a: "Trabajo" },
  { q: "What is the Spanish word for 'City'?", a: "Ciudad" },
  { q: "How do you say 'Country' in Spanish?", a: "País" },
  { q: "What is the Spanish word for 'Language'?", a: "Idioma" },
];

// Grade 11
const questionsArrayMathGradeEleven = [
  {
    q: "What is the value of the golden ratio (φ) to two decimal places?",
    a: "1.62",
  },
  {
    q: "What is the formula to calculate the area of a trapezoid?",
    a: "A = 1/2(a + b)h",
  },
  {
    q: "If f(x) = 3x² - 6x + 3, what are the roots of the equation f(x) = 0?",
    a: "1",
  },
  { q: "What is the value of the square root of 169?", a: "13" },
  {
    q: "What is the slope of the line represented by the equation y = 4x - 7?",
    a: "4",
  },
  {
    q: "What is the formula to calculate the volume of a cone? Do control+p on mac or alt 227 on windows to get π and use (^) for power...",
    a: "V = 1/3πr^2h",
  },
  { q: "What is the value of 6! (6 factorial)?", a: "720" },
];

const questionsArrayScienceGradeEleven = [
  { q: "What is the chemical symbol for methane?", a: "CH4" },
  { q: "What planet has the most moons in our solar system?", a: "Saturn" },
  { q: "What gas is most abundant in the Earth's atmosphere?", a: "Nitrogen" },
  {
    q: "What is the process by which cells divide to form two identical daughter cells?",
    a: "Mitosis",
  },
  { q: "What is the chemical formula for ammonia?", a: "NH3" },
  {
    q: "What organ in the human body is responsible for producing insulin?",
    a: "Pancreas",
  },
  { q: "What force keeps planets in orbit around the sun?", a: "Gravity" },
  {
    q: "What is the study of matter and its interactions called?",
    a: "Chemistry",
  },
];

const questionsArraySpanishGradeEleven = [
  { q: "How do you say 'Congratulations' in Spanish?", a: "Felicidades" },
  { q: "What is the Spanish word for 'Happiness'?", a: "Felicidad" },
  {
    q: "How do you say 'I love you' in Spanish? Type answer as one word (no spaces)",
    a: "Te amo",
  },
  { q: "What is the Spanish word for 'Dream'?", a: "Sueño" },
  { q: "How do you say 'Adventure' in Spanish?", a: "Aventura" },
  { q: "What is the Spanish word for 'Journey'?", a: "Viaje" },
  { q: "How do you say 'Success' in Spanish?", a: "Éxito" },
  { q: "What is the Spanish word for 'Challenge'?", a: "Desafío" },
];

// Grade 12
const questionsArrayMathGradeTwelve = [
  { q: "What is the value of the imaginary unit (i) squared?", a: "-1" },
  {
    q: "What is the formula to calculate the area of a parallelogram?",
    a: "A = bh",
  },
  {
    q: "If f(x) = x³ - 3x² + 4, what are the critical points of the function?",
    a: "0, 2",
  },
  { q: "What is the value of the square root of 256?", a: "16" },
  {
    q: "What is the slope of the line represented by the equation y = -5x + 9?",
    a: "-5",
  },
  {
    q: "What is the formula to calculate the volume of a pyramid?",
    a: "V = 1/3Bh",
  },
  { q: "What is the value of 8! (8 factorial)?", a: "40320" },
  { q: "What is the value of the expression 4^3 * 4^2?", a: "1024" },
];

const questionsArrayScienceGradeTwelve = [
  { q: "What is the chemical symbol for sulfuric acid?", a: "H2SO4" },
  { q: "What planet is known for its prominent ring system?", a: "Saturn" },
  { q: "What gas is essential for human respiration?", a: "Oxygen" },
  {
    q: "What is the process by which DNA is copied to RNA?",
    a: "Transcription",
  },
  { q: "What is the chemical formula for benzene?", a: "C6H6" },
  {
    q: "What organ in the human body is responsible for detoxifying chemicals?",
    a: "Liver",
  },
  {
    q: "What force is responsible for the attraction between two masses?",
    a: "Gravity",
  },
  {
    q: "What is the study of the structure and function of cells called?",
    a: "Cell biology",
  },
];

const questionsArraySpanishGradeTwelve = [
  { q: "How do you say 'Freedom' in Spanish?", a: "Libertad" },
  { q: "What is the Spanish word for 'Justice'?", a: "Justicia" },
  { q: "How do you say 'Equality' in Spanish?", a: "Igualdad" },
  { q: "What is the Spanish word for 'Peace'?", a: "Paz" },
  { q: "How do you say 'Liberty' in Spanish?", a: "Libertad" },
  { q: "What is the Spanish word for 'Democracy'?", a: "Democracia" },
  { q: "What is the Spanish word for 'Rights'?", a: "Derechos" },
  { q: "What is the Spanish word for 'Responsibility'?", a: "Responsabilidad" },
];

const BANKS = {
  math: {
    nine: questionsArrayMathGradeNine,
    ten: questionsArrayMathGradeTen,
    eleven: questionsArrayMathGradeEleven,
    twelve: questionsArrayMathGradeTwelve,
  },
  science: {
    nine: questionsArrayScienceGradeNine,
    ten: questionsArrayScienceGradeTen,
    eleven: questionsArrayScienceGradeEleven,
    twelve: questionsArrayScienceGradeTwelve,
  },
  spanish: {
    nine: questionsArraySpanishGradeNine,
    ten: questionsArraySpanishGradeTen,
    eleven: questionsArraySpanishGradeEleven,
    twelve: questionsArraySpanishGradeTwelve,
  },
};
const subjectSel = document.getElementById("subjectSel");
const gradeSel = document.getElementById("gradeSel");

function getActiveBank() {
  const subj = subjectSel.value; // "math", "science", or "spanish"
  const grade = gradeSel.value; // "nine", "ten", "eleven", "twelve"
  return BANKS[subj][grade]; // return the right array of {q,a}
}

// Modal functions
function showQuestionModal(question, correctAnswer) {
  questionText.textContent = question;
  answerInput.value = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  questionModal.style.display = "block";
  answerInput.focus();

  // Store the correct answer for validation
  answerInput.dataset.correctAnswer = correctAnswer;
}

function hideQuestionModal() {
  questionModal.style.display = "none";
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = answerInput.dataset.correctAnswer.toLowerCase();

  if (userAnswer === correctAnswer) {
    feedback.textContent =
      "✅ Correct! You may restart the game. Click the space bar to restart the game";
    feedback.className = "feedback correct";

    // Hide modal after a short delay and allow restart
    setTimeout(() => {
      hideQuestionModal();
      // Reset the game state to allow restart
      state.running = false;
      state.paused = false;
      updateHUD("Press Space to Start");
    }, 2000);
  } else {
    feedback.textContent = `❌ Incorrect. Try again!`;
    feedback.className = "feedback incorrect";
    answerInput.value = "";
    answerInput.focus();
  }
}

// Event listeners for modal
submitAnswer.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// ===== Constants =====

// ===== Game State =====
const state = {
  running: false,
  paused: false,
  score: 0,
  lives: 3,
  // bucket
  bucket: {
    w: 100,
    h: 16,
    x: canvas.width / 2 - 50,
    y: canvas.height - 28,
    speed: 6, // px per frame when key held
    moveLeft: false,
    moveRight: false,
  },
  // ball
  ball: {
    r: 10,
    x: canvas.width / 2,
    y: 40,
    vy: 9.0, // "moderate" fall speed
  },
};

// ===== Helpers =====
function resetBall() {
  state.ball.x =
    Math.floor(Math.random() * (canvas.width - state.ball.r * 2)) +
    state.ball.r;
  state.ball.y = -20;
  // tiny difficulty ramp based on score
  state.ball.vy = 8.0 + Math.min(2.2, state.score * 0.05);
}

function resetGame() {
  state.score = 0;
  state.lives = 3;
  state.bucket.x = canvas.width / 2 - state.bucket.w / 2;
  state.bucket.moveLeft = state.bucket.moveRight = false;
  resetBall();
  updateHUD("Game on! Catch the ball.");
}

function updateHUD(text) {
  scoreEl.textContent = state.score;
  livesEl.textContent = state.lives;
  if (text) statusEl.textContent = text;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// ===== Input =====
window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    state.bucket.moveLeft = true;
  }
  if (e.code === "ArrowRight") {
    state.bucket.moveRight = true;
  }
  if (e.code === "Space") {
    e.preventDefault();
    if (!state.running) startGame();
    else togglePause();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    state.bucket.moveLeft = false;
  }
  if (e.code === "ArrowRight") {
    state.bucket.moveRight = false;
  }
});

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);

function startGame() {
  resetGame();
  state.running = true;
  state.paused = false;
  loop();
}

function togglePause() {
  if (!state.running) return;
  state.paused = !state.paused;
  updateHUD(state.paused ? "Paused" : "Resumed");
  if (!state.paused) loop();
}

// ===== Drawing =====
function drawBackground() {
  // faint grid
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;

  const cell = 40;
  for (let x = 0; x <= canvas.width; x += cell) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += cell) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBucket() {
  const b = state.bucket;
  // bucket body
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(b.x, b.y, b.w, b.h);
  // lip
  ctx.fillStyle = "#16a34a";
  ctx.fillRect(b.x, b.y - 4, b.w, 4);
}

function drawBall() {
  const ball = state.ball;
  // ball
  const grad = ctx.createRadialGradient(
    ball.x - 3,
    ball.y - 5,
    2,
    ball.x,
    ball.y,
    ball.r
  );
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(1, "#60a5fa"); // blue-400 edge
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

// ===== Update =====
function update() {
  // bucket movement
  if (state.bucket.moveLeft) state.bucket.x -= state.bucket.speed;
  if (state.bucket.moveRight) state.bucket.x += state.bucket.speed;
  state.bucket.x = clamp(state.bucket.x, 0, canvas.width - state.bucket.w);

  // ball fall
  state.ball.y += state.ball.vy;

  // check catch / miss
  const b = state.bucket;
  const ball = state.ball;

  // When ball reaches bucket level
  const nearBucket = ball.y + ball.r >= b.y - 1;
  const withinX = ball.x >= b.x && ball.x <= b.x + b.w;

  if (nearBucket) {
    if (withinX) {
      // caught
      state.score += 1;
      updateHUD("Nice catch!");
      resetBall();
    } else if (ball.y - ball.r > canvas.height) {
      // fully missed after passing bottom
      state.lives -= 1;
      if (state.lives <= 0) {
        gameOver();
      } else {
        updateHUD("Missed! Keep going.");
        resetBall();
      }
    }
  } else if (ball.y - ball.r > canvas.height) {
    // fell past bottom without reaching bucket line (edge case)
    state.lives -= 1;
    if (state.lives <= 0) gameOver();
    else {
      updateHUD("Missed!");
      resetBall();
    }
  }
}

function gameOver() {
  state.running = false;
  state.paused = false;
  updateHUD(
    "Game Over. Answer your question to try again. CAPITALIZE FIRST LETTER OF A WORD ALWAYS!!!!!"
  );

  // draw overlay
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#e5e7eb";
  ctx.font = "bold 28px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = "16px system-ui";
  ctx.fillText(
    `Final Score: ${state.score}`,
    canvas.width / 2,
    canvas.height / 2 + 18
  );
  ctx.fillText(
    "Answer your question to try again",
    canvas.width / 2,
    canvas.height / 2 + 42
  );
  ctx.restore();

  // Show question modal
  const bank = getActiveBank();
  if (bank && bank.length > 0) {
    const idx = Math.floor(Math.random() * bank.length);
    const { q, a } = bank[idx]; // random question & answer
    showQuestionModal(q, a);
  }
}

// ===== Main Loop =====
let rafId = null;
function loop() {
  if (!state.running || state.paused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  update();
  drawBall();
  drawBucket();

  rafId = requestAnimationFrame(loop);
}

// ===== Resize: keep crisp on HiDPI and responsive width =====
function fitCanvasToDisplaySize() {
  const cssWidth = canvas.clientWidth;
  const cssHeight = canvas.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = Math.floor(cssWidth * dpr);
  const displayHeight = Math.floor(cssHeight * dpr);
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    // scale positions proportionally to new size (optional simple approach)
    state.bucket.y = canvas.height - 28 * dpr;
  }
}
new ResizeObserver(fitCanvasToDisplaySize).observe(canvas);
fitCanvasToDisplaySize();
updateHUD("Press Space to Start");
