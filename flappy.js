// ===== flappy.js =====

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// Game state
let bird, pipes, score, highScore, running, gameOver;
const gravity = 0.45;
const flapStrength = -7.5;
const pipeGap = 150;
const pipeWidth = 60;
const pipeInterval = 1200; // ms between pipes
let lastPipeTime = 0;

// Input
function flap() {
  if (!running) startGame();
  if (gameOver) return;
  bird.vy = flapStrength;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") flap();
});
document.addEventListener("mousedown", flap);
document.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    flap();
  },
  { passive: false }
);

document.getElementById("restart").addEventListener("click", reset);

// Reset everything
function reset() {
  bird = { x: 80, y: H / 2, r: 16, vy: 0 };
  pipes = [];
  score = 0;
  running = false;
  gameOver = false;
  lastPipeTime = 0;
  draw();
}

// Start the game
function startGame() {
  if (running) return;
  running = true;
  lastPipeTime = performance.now();
}

// Add a new pipe
function addPipe() {
  const margin = 50;
  const topHeight = margin + Math.random() * (H - 2 * margin - pipeGap);
  const bottomY = topHeight + pipeGap;
  pipes.push({
    x: W + pipeWidth,
    top: { y: 0, h: topHeight },
    bottom: { y: bottomY, h: H - bottomY },
    passed: false,
  });
}

// Helpers to draw
function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function circle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// Collision detection
function collide(b, p) {
  const inX = b.x + b.r > p.x && b.x - b.r < p.x + pipeWidth;
  if (!inX) return false;
  const hitTop = b.y - b.r < p.top.h;
  const hitBottom = b.y + b.r > p.bottom.y;
  return hitTop || hitBottom;
}

// Update game state
function update(dt, now) {
  bird.vy += gravity;
  bird.y += bird.vy;

  // Top/bottom boundaries
  if (bird.y - bird.r < 0) {
    bird.y = bird.r;
    bird.vy = 0;
  }
  if (bird.y + bird.r > H) {
    bird.y = H - bird.r;
    endGame();
  }

  // Spawn pipes
  if (now - lastPipeTime > pipeInterval) {
    addPipe();
    lastPipeTime = now;
  }

  // Move pipes
  for (const p of pipes) {
    p.x -= 2.5;

    if (!p.passed && p.x + pipeWidth < bird.x - bird.r) {
      p.passed = true;
      score++;
      highScore = Math.max(highScore || 0, score);
    }

    if (collide(bird, p)) endGame();
  }

  // Remove off-screen pipes
  pipes = pipes.filter((p) => p.x + pipeWidth > 0);
}

// Draw everything
function draw() {
  // Background
  rect(0, 0, W, H, "#9be2ff");
  rect(0, H - 50, W, 50, "#7fc37f");

  // Pipes
  for (const p of pipes) {
    rect(p.x, p.top.y, pipeWidth, p.top.h, "#2da12d");
    rect(p.x, p.bottom.y, pipeWidth, p.bottom.h, "#2da12d");
  }

  // Bird
  circle(bird.x, bird.y, bird.r, "#ffdf40");
  circle(bird.x + 6, bird.y - 4, 3, "#222"); // simple eye

  // Score
  ctx.fillStyle = "#111";
  ctx.font = "24px sans-serif";
  ctx.fillText(`Score: ${score}`, 12, 32);
  if (highScore != null) ctx.fillText(`Best: ${highScore}`, 12, 60);

  if (!running && !gameOver) {
    ctx.fillStyle = "#111";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Click / Space / Tap to start", W / 2, H / 2);
    ctx.textAlign = "start";
  }

  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    rect(0, 0, W, H, "rgba(0,0,0,0.35)");
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "28px sans-serif";
    ctx.fillText("Game Over", W / 2, H / 2 - 10);
    ctx.font = "18px sans-serif";
    ctx.fillText("Press Restart to try again", W / 2, H / 2 + 20);
    ctx.textAlign = "start";
  }
}

// End game
function endGame() {
  gameOver = true;
  running = false;
}

// Game loop
let last = performance.now();
function loop(now) {
  const dt = Math.min(33, now - last);
  last = now;
  if (running && !gameOver) update(dt, now);
  draw();
  requestAnimationFrame(loop);
}

// Start things off
reset();
requestAnimationFrame(loop);
