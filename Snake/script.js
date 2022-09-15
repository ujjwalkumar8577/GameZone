var inputDir = {x:0, y:0};
var eatFoodSound = new Audio('food.mp3');
var gameOverSound = new Audio('gameover.mp3');
var moveSound = new Audio('move.mp3');
var musicSound = new Audio('music.mp3');
var speed = 10;
var score = 0;
var highscore = localStorage.getItem("highscore");
var lastPaintTime = 0;
var snakeArray = [{x:15, y:15}];
var food = {x:5, y:5};

difficultyRange.value = speed;

function main(time) {
    window.requestAnimationFrame(main);
    if((time - lastPaintTime)/1000 < 1/speed)
        return;
    
    lastPaintTime = time;
    gameEngine();
}

function isCollide() {
    let headx = snakeArray[0].x;
    let heady = snakeArray[0].y;
    for(let i=1; i<snakeArray.length; i++) {
        if(snakeArray[i].x == headx && snakeArray[i].y == heady)
            return true;
    }

    if(headx>=30 || headx<=0 || heady>=30 || heady<=0)
        return true;

    return false;
}

function gameEngine(){

    // Updating the snake array & Food
    if(isCollide()) {
        endGame();
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArray[0].y === food.y && snakeArray[0].x ===food.x) {
        eatFoodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(hiscoreval));
            highScoreElement.innerHTML = "highscore: " + hiscoreval;
        }
        scoreElement.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        gameContainer = document.querySelector('.food');
        gameContainer.style.backgroundImage = "url(" + getFoodString() + ")";
    }

    // Moving the snake
    for (let i = snakeArray.length - 2; i>=0; i--) { 
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();
if(highscore === null){
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(highscore);
    highScoreElement.innerHTML = "highscore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});

// var isPlayingMusic = false;
// var isGameRunning = true;

// var alienImages = [];
// var alienImageUrls = [  "https://i.imgur.com/tvJOu59.png",
//                         "https://i.imgur.com/e1pkJRF.png",
//                         "https://i.imgur.com/aRumf1r.png",
//                         "https://i.imgur.com/jjOPpWL.png",
//                         "https://i.imgur.com/hsdEpsM.png",
//                         "https://i.imgur.com/u5eNyl8.png"];

// var fireImage = new Image();
// fireImage.src = ["https://i.imgur.com/pPvOuhq.png"];

// var shipImages = [];
// var shipUrls = ["https://i.imgur.com/gLLRj2T.png",
//                 "https://i.imgur.com/ZhshGO4.png",
//                 "https://i.imgur.com/E0wiPJC.png",
//                 "https://i.imgur.com/WmsDf2l.png",
//                 "https://i.imgur.com/EjfY1iE.png",
//                 "https://i.imgur.com/t3VGw8g.png",
//                 "https://i.imgur.com/d6OT3qt.png"];

// var bulletImage1 = new Image();
// bulletImage1.src = ["https://i.imgur.com/dM81aDs.gif"];
// var bulletImage2 = new Image();
// bulletImage2.src = ["https://i.imgur.com/NyaUjNn.gif"];

// // alien = me
// // fire = my bullet
// // ship = enemy
// // bullet = enemy bullet

// for(var i = 0;i< shipUrls.length ;i++) {
//     var shipImage = new Image();
//     shipImage.src = shipUrls[i];
//     shipImages.push(shipImage);
// }

// // create ships according to difficulty
// applyDifficulty(difficulty);
    
// for( var i=0; i<alienImageUrls.length ; i++ ) {
//     var image = new Image();
//     image.src = alienImageUrls[i];
//     alienImages.push(image);
// }

// // create 1 alien
// var alien = {};
// alien.images = alienImages;
// alien.width = 100;
// alien.height = 100;
// alien.x = 300;
// alien.y = HEIGHT-100;
// alien.speed = 10;

musicCheckbox.onclick = function() {
    if (musicCheckbox.checked == true){
        musicSound.play();
    }
    else {
        musicSound.pause();
    }
}

difficultyRange.onchange = function() {
    speed = difficultyRange.value;
    console.log(speed);
    canvas.focus();
}

// restart.onclick = function() {
//     startGame();
// }

// // Play music on loop
// function playMusicNow() {
//     isPlayingMusic = true;
//     audio.addEventListener('ended', function () {
//         this.currentTime = 0;
//         this.play();
//     }, false);

//     audio.play();
// }

function updateScore() {
    if(score>highscore)
        highscore = score;
    
    document.getElementById("highScoreElement").innerHTML = "High Score : " + highscore;
    document.getElementById("scoreElement").innerHTML = "Score : " + score;
}

// function update() {

//     // Clear all backgroud to black
//     ctx.fillStyle = "#000000";
//     ctx.fillRect(0, 0, 520, 520);

//     // Hovering effect
//     alien.x += -2+Math.random()*4;
//     alien.y += -2+Math.random()*4;
// }

function getFoodString() {
    let r = Math.round(1 + (5-1)* Math.random());
    console.log(r);
    switch (r) {
        case 1:
            return 'apple.png';
        
        case 2:
            return 'mango.png';

        case 1:
            return 'orange.png';
        
        case 2:
            return 'banana.png';

        case 1:
            return 'peach.png';                  
    
        default:
            return 'mango.png';
    }
}

function startGame() {
    isGameRunning = true;
    musicSound.play();
    score = 0;
    musicCheckbox.checked = true;
    gameOver.style.visibility = "hidden";
    restart.style.visibility = "hidden";
    restart.classList.remove('animateRestart');
    updateScore(); 
    isPlayingMusic = false;

    gameEngine();
}

function endGame() {
    inputDir =  {x: 0, y: 0};
    snakeArray = [{x: 15, y: 15}];
    musicSound.play();
    score = 0;
    isGameRunning = false;
    musicSound.pause();
    gameOverSound.play();
    gameOver.style.visibility = "visible";
    restart.style.visibility = "visible";
    restart.classList.add('animateRestart');
}

// startGame();