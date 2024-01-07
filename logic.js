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
let enemyDirection = 1; 