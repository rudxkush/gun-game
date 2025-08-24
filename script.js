// Game elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startGameBtn");
const currentScoreEl = document.getElementById("currentScore");
const highestScoreEl = document.getElementById("highestScore");

// Game objects
let gun = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    dx: 20
};

let bullets = [];
let target = {
    x: 100,
    y: 50,
    radius: 20,
    dx: 6
};

// Game state
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let gameState = "notStarted";
let consecutiveMisses = 0;
let keys = {};

// Audio
let bulletSound = new Audio('bulletFire.mp3');
let gameOverSound = new Audio('gameOver.wav');

// Images
let monsterImg = new Image();
monsterImg.src = "monsterimage.png";
let bulletImg = new Image();
bulletImg.src = "bulletimage.png";
let gunImg = new Image();
gunImg.src = "gunimage.png";

// Initialize
updateScoreDisplay();

// Event listeners
startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(e) {
    keys[e.code] = true;
    
    if (e.code === "Enter" && gameState === "notStarted") {
        startGame();
    }
    
    if (gameState === "ongoing" && e.code === "Space") {
        e.preventDefault();
        shootBullet();
    }
}

function handleKeyUp(e) {
    keys[e.code] = false;
}

function startGame() {
    gameState = "ongoing";
    score = 0;
    consecutiveMisses = 0;
    bullets = [];
    
    // Reset positions
    gun.x = canvas.width / 2 - 25;
    target.x = 100;
    target.y = 50;
    target.dx = 6;
    
    canvas.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    startBtn.textContent = "Game Running...";
    startBtn.disabled = true;
    
    updateScoreDisplay();
    gameLoop();
}

function shootBullet() {
    bullets.push({
        x: gun.x + gun.width / 2 - 5,
        y: gun.y,
        width: 10,
        height: 20,
        dy: -8
    });
    
    bulletSound.currentTime = 0;
    bulletSound.play().catch(() => {});
}

function updateGame() {
    // Move gun
    if (keys["ArrowLeft"] && gun.x > 0) {
        gun.x -= gun.dx;
    }
    if (keys["ArrowRight"] && gun.x < canvas.width - gun.width) {
        gun.x += gun.dx;
    }
    
    // Move bullets
    bullets.forEach((bullet, index) => {
        bullet.y += bullet.dy;
        
        // Remove bullets that go off screen
        if (bullet.y < 0) {
            bullets.splice(index, 1);
            consecutiveMisses++;
            score = Math.max(0, score - 2);
            updateScoreDisplay();
            
            if (consecutiveMisses >= 3) {
                endGame();
            }
        }
    });
    
    // Move target
    target.x += target.dx;
    if (target.x <= target.radius || target.x >= canvas.width - target.radius) {
        target.dx = -target.dx;
    }
    
    // Increase speed after score 50
    if (score > 50 && Math.abs(target.dx) < 10) {
        target.dx = target.dx > 0 ? 10 : -10;
    }
    
    // Collision detection
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        const dist = Math.sqrt(
            Math.pow(bullet.x + bullet.width/2 - target.x, 2) + 
            Math.pow(bullet.y + bullet.height/2 - target.y, 2)
        );
        
        if (dist < target.radius + 10) {
            bullets.splice(i, 1);
            score += 5;
            consecutiveMisses = 0;
            updateScoreDisplay();
            
            // Reposition target
            target.x = Math.random() * (canvas.width - target.radius * 2) + target.radius;
            target.y = Math.random() * 200 + 50;
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gun
    if (gunImg.complete) {
        ctx.drawImage(gunImg, gun.x, gun.y, gun.width, gun.height);
    } else {
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(gun.x, gun.y, gun.width, gun.height);
    }
    
    // Draw bullets
    bullets.forEach(bullet => {
        if (bulletImg.complete) {
            ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
        } else {
            ctx.fillStyle = "#f39c12";
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });
    
    // Draw target
    if (monsterImg.complete) {
        ctx.drawImage(monsterImg, target.x - target.radius, target.y - target.radius, target.radius * 2, target.radius * 2);
    } else {
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function gameLoop() {
    if (gameState === "ongoing") {
        updateGame();
        drawGame();
        requestAnimationFrame(gameLoop);
    }
}

function endGame() {
    gameState = "ended";
    canvas.style.setProperty('background-color', 'red', 'important');
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        updateScoreDisplay();
    }
    
    gameOverSound.currentTime = 0;
    gameOverSound.play().catch(() => {});
    
    startBtn.textContent = "Start Game";
    startBtn.disabled = false;
}

function updateScoreDisplay() {
    currentScoreEl.textContent = `Score: ${score}`;
    highestScoreEl.textContent = `High Score: ${highScore}`;
}