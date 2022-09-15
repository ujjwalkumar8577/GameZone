score = 0;                                  // to store current score
isGameRunning = true;                       // to check if game is running
firstKey = true;                            // to check first key-press
cross = true;                               // to check crossing of the two
audio = new Audio('music.mp3');             // game music
audiogo = new Audio('gameover.mp3');        // game over music
w = window.innerWidth;                      // to store window width
h = window.innerHeight;                     // to store window height
console.log(w,h);

document.onkeydown = function (e) {
    if(isGameRunning)
    {
        if(firstKey)
        {
            audio.play();
            firstKey=false;
        }
        key=e.keyCode;
        console.log("Key code is: ", key)

        if (key == 38) {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }

        if (key == 39) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX<=w-336)
                dino.style.left = dinoX + 112 + "px";           // 180 is good for jumping
        }
        
        if (key == 37) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX>=0)
                dino.style.left = (dinoX - 112) + "px";
        }
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 109 && offsetY < 52) {
        isGameRunning = false;
        gameOver.innerHTML = "Game Over - Reload to Play Again";
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
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}