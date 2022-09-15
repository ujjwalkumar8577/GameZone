var highscore = 0;                              // to store high score
var score = 0;                                  // to store current score
var isGameRunning = true;                       // to check if game is running
var firstKey = true;                            // to check first key-press
var cross = true;                               // to check crossing of the two
var audio = new Audio('music.mp3');             // game music
var audiogo = new Audio('gameover.mp3');        // game over music
var w = window.innerWidth;                      // to store window width
var h = window.innerHeight;                     // to store window height

function startGame() {
    console.log("New Game started");
    score = 0;
    isGameRunning = true;
    firstKey = true;
    cross = true;

    setInterval(() => {
    
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);
    
        if (offsetX < 100 && offsetY < 56) {               // 109,56 default values
            console.log("Game Over");
            console.log(offsetX,offsetY);
            isGameRunning = false;
            gameOver.innerHTML = "Game Over - Press any key to Play Again";
            obstacle.classList.remove('obstacleAni');
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);
        }
        
        else if (offsetX < 145 && cross) {
            score += 100;
            updateScore(score);
            cross = false;
    
            setTimeout(() => {
                cross = true;
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.05;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation duration: ', newDur);
            }, 1000);
        }
    
    }, 10);
}

startGame();

document.onclick = function (ev) {
    if(isGameRunning)
    {
        if(firstKey)
        {
            audio.play();
            firstKey=false;
        }

        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 1200);
    }
    else
    {
        gameOver.innerHTML = "Welcome to Dino Adventure";
        obstacle.style.animationDuration = 4 + 's';
        obstacle.classList.add('obstacleAni');
        audio.play();
        updateScore(0);
        startGame();
    }
}

document.onkeydown = function (e) {
    if(isGameRunning)
    {
        if(firstKey)
        {
            audio.play();
            firstKey=false;
        }
        key=e.keyCode;

        if (key == 38) {
            
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 1200);
        }
    }
    else
    {
        gameOver.innerHTML = "Welcome to Dino Adventure";
        obstacle.style.animationDuration = 4 + 's';
        obstacle.classList.add('obstacleAni');
        audio.play();
        updateScore(0);
        startGame();
    }
}

function updateScore(score) {
    if(score>highscore)
        highscore=score;
    
    highScoreCount.innerHTML = "High Score: " + highscore;
    scoreCount.innerHTML = "Your Score: " + score;
}