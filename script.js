const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreBoard = document.getElementById("score-board");

let playerPosition = 50; // Player vertical position in percentage
let score = 0;
let isGameOver = false;

// Move the player up and down
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && playerPosition > 5) {
    playerPosition -= 5;
  }
  if (e.key === "ArrowDown" && playerPosition < 95) {
    playerPosition += 5;
  }
  player.style.bottom = playerPosition + "%";
});

// Spawn bullets
function createBullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.top = Math.random() * 90 + "%";
  bullet.style.left = "100%";

  gameContainer.appendChild(bullet);

  let bulletPosition = 400;

  const moveBullet = setInterval(() => {
    if (isGameOver) {
      clearInterval(moveBullet);
      return;
    }

    bulletPosition -= 5;
    bullet.style.left = bulletPosition + "px";

    // Check for collision
    const bulletRect = bullet.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      bulletRect.left < playerRect.right &&
      bulletRect.right > playerRect.left &&
      bulletRect.top < playerRect.bottom &&
      bulletRect.bottom > playerRect.top
    ) {
      endGame();
    }

    // Remove bullet if it moves off screen
    if (bulletPosition < 0) {
      clearInterval(moveBullet);
      bullet.remove();
      score++;
      scoreBoard.textContent = `Score: ${score}`;
    }
  }, 20);
}

// Game loop to spawn bullets
function startGame() {
  const gameLoop = setInterval(() => {
    if (isGameOver) {
      clearInterval(gameLoop);
      return;
    }
    createBullet();
  }, 1000);
}

// End the game
function endGame() {
  isGameOver = true;
  alert(`Game Over! Final Score: ${score}`);
  location.reload(); // Restart the game
}

startGame();
