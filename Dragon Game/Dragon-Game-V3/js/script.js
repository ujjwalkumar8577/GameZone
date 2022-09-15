var highscore = 0;                                  // to store high score
var score = 0;                                      // to store current score
var isGameRunning = true;                           // to check if game is running
var firstKey = true;                                // to check first key-press
var cross = true;                                   // to check crossing of the two
var audio = new Audio('./audio/music1.mp3');         // game music
var audiogo = new Audio('./audio/gameover.mp3');    // game over music
var lchange = new Audio('./audio/levelChange.mp3'); // level change music
var fsound = new Audio('./audio/fire.mp3');         // fire sound
var w = window.innerWidth;                          // to store window width
var h = window.innerHeight;                         // to store window height
var numOfBG = 4;                                    // to store number of background image
console.log(w,h);

// start a new Game
function startGame() {
    console.log("New Game started");
    score = 0;
    isGameRunning = true;
    firstKey = true;
    cross = true;
  
    // update background in 10s
    setInterval(() => {
        r = ((Math.ceil(Math.random()*10))%numOfBG)+1;
        gameContainer = document.querySelector('.gameContainer');
        gameContainer.style.backgroundImage = "url(./img/bg" + r + ".png)";
        lchange.play();
    }, 10000);

    // check for collision in 10ms
    setInterval(() => {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);

        // Collision occured
        if (offsetX < 109 && offsetY < 52) {
            isGameRunning = false;
            gameOver.innerHTML = "Game Over - Reload to Play Again";
            obstacle.classList.remove('animateObstacle');
            audio.pause();
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
            }, 3000);
        }
        // Check crossing of dino and obstacle
        else if (offsetX < 145 && cross) {
            score += 100;
            updateScore(score);
            cross = false;

            setTimeout(() => {
                cross = true;
            }, 1000);

            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation duration: ', newDur);
            }, 500);
        }
    }, 10);
}

// Handling key press
document.onkeydown = function (e) {
    if(isGameRunning)
    {
        if(firstKey)
        {
            audio.play();
            firstKey=false;
        }
        key=e.keyCode;
        // console.log("Key code is: ", key)

        // move up
        if (key == 38) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }

        // move right
        if (key == 39) {
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX<=w-336)
                dino.style.left = dinoX + 112 + "px";           // 180 is good for jumping
        }
        
        // move left
        if (key == 37) {
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX>=0)
                dino.style.left = (dinoX - 112) + "px";
        }

        // fire
        if (key == 70) {
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

            fsound.play();
            fire.classList.remove('not-visible')
            fire.classList.add('visible');
            fire.classList.add('animateFire');
            fire.style.left = (dinoX + 200) + "px";
            fire.style.top = dinoY + "px";

            setInterval(() => {
                ndx = parseInt(window.getComputedStyle(fire, null).getPropertyValue('left'));
                ndy = parseInt(window.getComputedStyle(fire, null).getPropertyValue('top'));
                nox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
                noy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
                noffsetX = Math.abs(ndx - nox);
                noffsetY = Math.abs(ndy - noy);
            
                if (noffsetX < 109 && noffsetY < 52) {
                    obstacle.classList.remove('animateObstacle');
                    obstacle.classList.add('not-visible');
                    fire.classList.remove('animateFire');
                    fire.style.left = "-1000px";
                    
                    fsound.pause();
                    score += 100;
                    updateScore(score);

                    setTimeout(() => {
                        obstacle.classList.remove('not-visible');
                        obstacle.classList.add('animateObstacle');
                    }, 500);
                }
            }, 10);

            setTimeout(() => {
                fire.classList.remove('animateFire');
                fire.classList.remove('visible')
                fire.classList.add('not-visible');
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation duration: ', newDur);
            }, 800);
        }
    }
    else
    {
        gameOver.innerHTML = "Press F to fire";
        obstacle.style.animationDuration = 5 + 's';
        obstacle.classList.add('animateObstacle');
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

startGame();

// function getBG() {
//     bgname = "\"url(\'bg" + (Math.ceil(Math.random()*10)+1)%5 + ".png\')\"";
//     console.log(bgname);
//     return bgname;
// }

// setInterval(() => {
//     powerup.classList.add('animatePowerup');
//     powerup.classList.remove('not-visible')
//     powerup.classList.add('visible');


//     setTimeout(()=> {
//         powerup.classList.remove('animatePowerup')
//         powerup.classList.remove('visible')
//         powerup.classList.add('not-visible');
//     },2000);

// },5000);