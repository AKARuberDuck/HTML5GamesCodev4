const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const orbRadius = 10;
let orb = { x: 0, y: 0 };

const playerSize = 20;
const players = [
  { x: 50, y: 50, color: "red", keys: { up: "w", down: "s", left: "a", right: "d" }, score: 0 },
  { x: 750, y: 450, color: "blue", keys: { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }, score: 0 }
];

const speed = 5;
let keysPressed = {};

function spawnOrb() {
  orb.x = Math.random() * (canvas.width - 2 * orbRadius) + orbRadius;
  orb.y = Math.random() * (canvas.height - 2 * orbRadius) + orbRadius;
}

function update() {
  players.forEach((p, index) => {
    if (keysPressed[p.keys.up]) p.y -= speed;
    if (keysPressed[p.keys.down]) p.y += speed;
    if (keysPressed[p.keys.left]) p.x -= speed;
    if (keysPressed[p.keys.right]) p.x += speed;

    const dx = p.x - orb.x;
    const dy = p.y - orb.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < playerSize / 2 + orbRadius) {
      p.score++;
      document.getElementById("score" + (index + 1)).textContent = p.score;
      if (p.score >= 10) {
        alert(`Player ${index + 1} wins!`);
        resetGame();
      } else {
        spawnOrb();
      }
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Orb
  ctx.beginPath();
  ctx.arc(orb.x, orb.y, orbRadius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();

  // Players
  players.forEach(p => {
    ctx.beginPath();
    ctx.rect(p.x - playerSize / 2, p.y - playerSize / 2, playerSize, playerSize);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.closePath();
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function resetGame() {
  players[0].score = players[1].score = 0;
  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";
  players[0].x = 50; players[0].y = 50;
  players[1].x = 750; players[1].y = 450;
  spawnOrb();
}

document.addEventListener("keydown", e => keysPressed[e.key] = true);
document.addEventListener("keyup", e => keysPressed[e.key] = false);

// Start game
spawnOrb();
loop();
