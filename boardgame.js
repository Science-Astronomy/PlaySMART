// === DOM Elements ===
const board = document.getElementById("game-board");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const topicSelect = document.getElementById("topic-select");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const gameOverBox = document.getElementById("game-over");
const rewardPage = document.getElementById("reward-page");
const answerInput = document.getElementById("answer-input");
const submitAnswerBtn = document.getElementById("submit-answer");
const feedback = document.getElementById("feedback");
const playAgainBtn = document.getElementById("play-again-btn");

// Reward game elements
const playFlappyBtn = document.getElementById("play-flappy");
const playClickerBtn = document.getElementById("play-clicker");
const flappyContainer = document.getElementById("flappy-container");
const clickerContainer = document.getElementById("clicker-container");
const exitFlappyBtn = document.getElementById("exit-flappy");
const exitClickerBtn = document.getElementById("exit-clicker");

const clickBtn = document.getElementById("click-btn");
const clickCountText = document.getElementById("click-count");

// === Game Variables ===
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;
let selectedTopic = "math";
let matchedPairs = 0;
let currentQuestion = null;
let correctAnswers = 0;

// Shapes
const shapes = ["⬜", "⬛", "🔺", "🔵", "⭐", "❤️", "⚡", "🍀"];

// Question banks
const topics = {
  math: [
    { question: "Solve: 2x + 3 = 7", answer: "x = 2" },
    { question: "Simplify: (x + 1) + 1", answer: "x + 2" },
    { question: "Find slope: y = 4x + 5", answer: "4" },
  ],
  science: [
    { question: "Basic unit of life?", answer: "Cell" },
    { question: "What force pulls us down?", answer: "Gravity" },
    { question: "Center of atom?", answer: "Nucleus" },
  ],
  spanish: [
    { question: "What is 'blue' in Spanish?", answer: "Azul" },
    { question: "Translate: See you", answer: "Nos vemos" },
    { question: "How to say '28' in Spanish?", answer: "Veintiocho" },
  ],
};

// === Helper Functions ===
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// === Create Memory Board ===
function createBoard() {
  board.innerHTML = "";
  questionBox.style.display = "none";
  gameOverBox.style.display = "none";
  rewardPage.style.display = "none";
  board.style.display = "grid";

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  tries = 0;
  matchedPairs = 0;
  correctAnswers = 0;

  selectedTopic = topicSelect.value;

  // duplicate shapes → 16 cards
  let cards = [...shapes, ...shapes];
  shuffle(cards);

  cards.forEach((shape) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.shape = shape;
    card.textContent = "?";
    board.appendChild(card);
  });
}

// === Flip Logic ===
board.addEventListener("click", function (event) {
  const clicked = event.target;
  if (!clicked.classList.contains("card") || lockBoard) return;
  if (clicked.classList.contains("flipped")) return;

  clicked.textContent = clicked.dataset.shape;
  clicked.classList.add("flipped");

  if (!firstCard) {
    firstCard = clicked;
  } else {
    secondCard = clicked;
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
});

// === Check Match ===
function checkMatch() {
  tries++;

  if (firstCard.dataset.shape === secondCard.dataset.shape) {
    matchedPairs++;
    if (matchedPairs === shapes.length) {
      board.style.display = "none";
      gameOverBox.style.display = "none";
      rewardPage.style.display = "block"; // show reward page
    }
  } else {
    // Wrong → flip back
    firstCard.textContent = "?";
    secondCard.textContent = "?";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    if (tries >= 2) {
      showRandomQuestion();
      tries = 0; // reset after showing a question
    }
  }

  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// === Random Question ===
function showRandomQuestion() {
  const bank = topics[selectedTopic];
  const index = Math.floor(Math.random() * bank.length);
  currentQuestion = bank[index];

  questionText.textContent = currentQuestion.question;
  questionBox.style.display = "block";
  feedback.textContent = "";
  answerInput.value = "";
}

// === Answer Submission ===
submitAnswerBtn.addEventListener("click", function () {
  const userAnswer = answerInput.value.trim();

  if (userAnswer === "") {
    feedback.textContent = "⚠️ Please type an answer before submitting.";
    feedback.style.color = "orange";
    return;
  }

  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    correctAnswers++;
    setTimeout(() => {
      questionBox.style.display = "none";
    }, 1000);
  } else {
    feedback.textContent = `❌ Incorrect! The answer was: ${currentQuestion.answer}`;
    feedback.style.color = "red";
  }
});

// === CLICKER GAME ===
let clickCount = 0;

clickBtn.addEventListener("click", () => {
  clickCount++;
  clickCountText.textContent = "Clicks: " + clickCount;
});

exitClickerBtn.addEventListener("click", () => {
  clickerContainer.style.display = "none";
  clickCount = 0;
  clickCountText.textContent = "Clicks: 0";
});

// === FLAPPY BIRD GAME ===
const canvas = document.getElementById("flappy-canvas");
const ctx = canvas.getContext("2d");

let flappyY, velocity, gravity, pipeX, pipeGap, pipeHeight, score;
let flappyRunning = false;

playFlappyBtn.addEventListener("click", () => {
  flappyContainer.style.display = "block";
  clickerContainer.style.display = "none";
  startFlappyBird();
});

playClickerBtn.addEventListener("click", () => {
  clickerContainer.style.display = "block";
  flappyContainer.style.display = "none";
});

function startFlappyBird() {
  flappyY = 200;
  velocity = 0;
  gravity = 0.6;
  pipeX = canvas.width;
  pipeGap = 120;
  pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 20;
  score = 0;
  flappyRunning = true;

  document.addEventListener("keydown", flap);
  requestAnimationFrame(gameLoop);
}

function flap(e) {
  if (e.code === "Space") {
    velocity = -8; // Flap upward
  }
}

function gameLoop() {
  if (!flappyRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  velocity += gravity;
  flappyY += velocity;
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(50, flappyY, 15, 0, Math.PI * 2);
  ctx.fill();

  // Pipes
  ctx.fillStyle = "green";
  ctx.fillRect(pipeX, 0, 40, pipeHeight);
  ctx.fillRect(
    pipeX,
    pipeHeight + pipeGap,
    40,
    canvas.height - (pipeHeight + pipeGap)
  );
  pipeX -= 2;

  // Reset pipe
  if (pipeX + 40 < 0) {
    pipeX = canvas.width;
    pipeHeight =
      Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 20;
    score++;
  }

  // Score display
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);

  // Collision detection
  if (
    flappyY + 15 > canvas.height ||
    flappyY - 15 < 0 ||
    (50 + 15 > pipeX &&
      50 - 15 < pipeX + 40 &&
      (flappyY - 15 < pipeHeight || flappyY + 15 > pipeHeight + pipeGap))
  ) {
    endFlappyBird();
    return;
  }

  requestAnimationFrame(gameLoop);
}

function endFlappyBird() {
  flappyRunning = false;
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over!", 80, canvas.height / 2);
}

exitFlappyBtn.addEventListener("click", () => {
  flappyContainer.style.display = "none";
  flappyRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.removeEventListener("keydown", flap);
});

// === Return to Memory Game ===
playAgainBtn.addEventListener("click", () => {
  rewardPage.style.display = "none";
  flappyContainer.style.display = "none";
  clickerContainer.style.display = "none";
  createBoard();
});

// === Start and Restart ===
startBtn.addEventListener("click", createBoard);
restartBtn.addEventListener("click", createBoard);
