
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//score variable
let score = 0;

// Player variables
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 30, //positions the player at the bottom of the canvas
    width: 40,
    height: 30,
    color: '#00F',
    isShooting: false,
    bullet: null
};

// Enemy variables
const enemies = [];
const enemyWidth = 30;
const enemyHeight = 30;
const enemyRowCount = 5;
const enemyColCount = 10;
let enemyDirection = 1; // 1 for right, -1 for left

// Create enemies
for (let col = 0; col < enemyColCount; col++) {
    for (let row = 0; row < enemyRowCount; row++) {
        const enemy = {
            x: col * (enemyWidth + 10),
            y: row * (enemyHeight + 10),
            width: enemyWidth,
            height: enemyHeight,
            color: '#7AD0B2',
            alive: true
        };
        enemies.push(enemy);
    }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const speed = 10; // Adjust the player's movement speed

    // Move player left
    if (event.key === 'ArrowLeft') {
        player.x = Math.max(player.x - speed, 0); // Ensure player doesn't go past the left edge
    }

    // Move player right
    if (event.key === 'ArrowRight') {
        player.x = Math.min(player.x + speed, canvas.width - player.width); // Ensure player doesn't go past the right edge
    }

    if (event.key === ' ' && !player.isShooting) {
        player.isShooting = true;
        player.bullet = {
            x: player.x + player.width / 2 - 2.5, // Bullet centered on the player
            y: player.y,
            width: 5,
            height: 10,
            color: '#0F0'
        };
        shootSound();
    }
}
function resetGame() {
    // Reset player position
    player.x = canvas.width / 2 - 20;
    player.y = canvas.height - 30;

    // Reset enemy variables
    enemies.length = 0; // Clear existing enemies

    // Create new enemies
    for (let col = 0; col < enemyColCount; col++) {
        for (let row = 0; row < enemyRowCount; row++) {
            const enemy = {
                x: col * (enemyWidth + 10),
                y: row * (enemyHeight + 10),
                width: enemyWidth,
                height: enemyHeight,
                color: '#7AD0B2',
                alive: true
            };
            enemies.push(enemy);
        }
    }

    // Increase the speed of enemies
    enemyDirection = Math.abs(enemyDirection) + 1;
    if (Math.random() < 0.5) {
        enemyDirection *= -1; // Randomly reverse direction
    }
}
// Game loop
function gameLoop() {
    const allEnemiesDead = enemies.every(enemy => !enemy.alive); //checks if all enemies are dead
    if (allEnemiesDead) {
        resetGame();
    }
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const playerTop = player.y;
    const playerBottom = player.y + player.height;

    enemies.forEach(enemy => {
        if (
            enemy.alive &&
            playerRight > enemy.x &&
            playerLeft < enemy.x + enemy.width &&
            playerBottom > enemy.y &&
            playerTop < enemy.y + enemy.height
        ) {
            // Collision detected, end the game
            gameEnd();
        }
    });
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw enemies
    enemies.forEach(enemy => {
        if (enemy.alive) {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    });

    // Draw player's bullet
    if (player.isShooting) {
        ctx.fillStyle = player.bullet.color;
        ctx.fillRect(player.bullet.x, player.bullet.y, player.bullet.width, player.bullet.height);

        // Check for collisions with enemies
        enemies.forEach(enemy => { // this line iterates through each enemy in the enemies array using the forEach method
            if (
                enemy.alive && //Checks if the current enemy is alive (enemy.alive is true) and proceeds with the collision detection
                player.bullet.x < enemy.x + enemy.width &&                     //checks if the left side of the bullet is to the left of the right side of the enemy.
                player.bullet.x + player.bullet.width > enemy.x &&            //checks if the right side of the bullet is to the right of the left side of the enemy.
                player.bullet.y < enemy.y + enemy.height &&                  //checks if the top side of the bullet is above the bottom side of the enemy.
                player.bullet.y + player.bullet.height > enemy.y            //checks if the bottom side of the bullet is below the top side of the enemy.
            ) {
                // Collision detected, make the enemy not alive
                enemy.alive = false;
                player.isShooting = false;
                popSound();
                score+=10;
                // console.log(score) tested to see if the score worked
            }
        });

        // Check if the bullet is out of the canvas
        if (player.bullet.y < 0) {
            player.isShooting = false;
        }

        player.bullet.y -= 10; // Adjust bullet speed
    }
    
    // Move enemies
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.x += enemyDirection * 1; // Adjust speed here

            // Change direction if enemies hit the canvas border
            if (enemy.x + enemy.width >= canvas.width || enemy.x <= 0) { //or
                enemyDirection *= -1; // Change direction
                enemies.forEach(e => {
                    e.y += 10; // Move enemies down when changing direction
                });
            }
        }
    });
    document.getElementById('scoreBoard').innerHTML = "Score: "+ score; //Del?
    requestAnimationFrame(gameLoop); //runs gameloops or animatioins
}   
function deathSound(){
    let audio = new Audio("./deathSound.mp3")  //Death sound
    audio.volume=0.2;
    audio.play()
}

function popSound(){
    let audio2 = new Audio("./popSound.mp3")
    audio2.volume=0.2;
    audio2.play()
}
function shootSound(){
    let audio3 = new Audio("./shootSound.mp3")
    audio3.volume=0.2;
    audio3.play()
}
function gameEnd() {
    // Add any game over logic here
    deathSound(); // Play the death sound
    alert("Game Over! Enemies touched the player."); // Display a message (you can replace this with your own game over screen)
    resetGame(); // Restart the game
    score = 0;// score would continue over 
}

// Start the game loop
gameLoop();