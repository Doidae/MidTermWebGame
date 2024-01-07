const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//Score variable
let score = 0;

//player variables
const player = {
    x: canvas.width / 2-20,
    y: canvas.height - 30,
    width: 40,
    height: 30,
    color: '#00F',
    isShooting: false,
    bullet: null
};


//enemy variables
const enemies = [];
const enemyWidth = 30;
const enemyHeight = 30;
const enemyRowCount = 5;
const enemyColCount = 10;
let enemyDirection = 1; //put -1 for left

//create the enemies
for (let col = 0; col <enemyColCount; col++){
    for (let row = 0; row < enemyRowCount; row++){
        const enemy = {
            x: col * (enemyWidth + 10),
            y: row * (enemyHeight + 10),
            width: enemyWidth,
            height: enemyHeight,
            color: '#7AD0B2',
            alive: true
        };
        enemies.push(enemy); //push it into the array
    }
}