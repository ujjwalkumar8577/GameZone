// var score = 0;                                      // to store current score
var isGameRunning = true;                               // to check if game is running
var audioWon = new Audio('./audio/fire.mp3');           // game Won music
var audioLost = new Audio('./audio/gameover.mp3');      // game Lost music
var audioTied = new Audio('./audio/levelChange.mp3');   // game Tied music
var pos = [0,0,0,0,0,0,0,0,0,0];                        // store state of board (0-empty,1-user,2-computer)

b1.onclick = function() {
    if(isGameRunning&&pos[1]==0) {
        pos[1] = 1;
        b1.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }    
};

b2.onclick = function () {
    if(isGameRunning&&pos[2]==0) {
        pos[2] = 1;
        b2.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b3.onclick = function () {
    if(isGameRunning&&pos[3]==0) {
        pos[3] = 1;
        b3.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b4.onclick = function () {
    if(isGameRunning&&pos[4]==0) {
        pos[4] = 1;
        b4.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b5.onclick = function () {
    if(isGameRunning&&pos[5]==0) {
        pos[5] = 1;
        b5.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b6.onclick = function () {
    if(isGameRunning&&pos[6]==0) {
        pos[6] = 1;
        b6.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b7.onclick = function () {
    if(isGameRunning&&pos[7]==0) {
        pos[7] = 1;
        b7.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b8.onclick = function () {
    if(isGameRunning&&pos[8]==0) {
        pos[8] = 1;
        b8.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

b9.onclick = function () {
    if(isGameRunning&&pos[9]==0) {
        pos[9] = 1;
        b9.style.backgroundImage = "url(./img/circle.png)";
        check();
        moveNext();
    }
};

restart.onclick = function () {
    startGame();
};

function moveNext() {
    if(isGameRunning) {
        ran = (Math.ceil(Math.random()*10)+1)%10;
        if(ran!=0&&pos[ran]==0) {
            isGameRunning = false;
            setTimeout(() => {
                pos[ran] = 2;
                document.getElementById("b"+ran).style.backgroundImage = "url(./img/cross.png)";
                isGameRunning = true;
                check();
            }, 500);
        }
        else {
            if(isGameRunning)
                moveNext();
        }
    }    
}

function check() {
    if(pos[1]==pos[2]&&pos[2]==pos[3]) {
        if(pos[1]==1)
            declareWinner();
        else if(pos[1]==2)
            declareLoser();
        return;
    }
    else if(pos[4]==pos[5]&&pos[5]==pos[6]) {
        if(pos[4]==1)
            declareWinner();
        else if(pos[4]==2)
            declareLoser();
        return;
    }
    else if(pos[7]==pos[8]&&pos[8]==pos[9]) {
        if(pos[7]==1)
            declareWinner();
        else if(pos[7]==2)
            declareLoser();
        return;
    }
    else if(pos[1]==pos[4]&&pos[4]==pos[7]) {
        if(pos[1]==1)
            declareWinner();
        else if(pos[1]==2)
            declareLoser();
        return;
    }
    else if(pos[2]==pos[5]&&pos[5]==pos[8]) {
        if(pos[2]==1)
            declareWinner();
        else if(pos[2]==2)
            declareLoser();
        return;
    }
    else if(pos[3]==pos[6]&&pos[6]==pos[9]) {
        if(pos[3]==1)
            declareWinner();
        else if(pos[3]==2)
            declareLoser();
        return;
    }
    else if(pos[1]==pos[5]&&pos[5]==pos[9]) {
        if(pos[1]==1)
            declareWinner();
        else if(pos[1]==2)
            declareLoser();
        return;
    }
    else if(pos[3]==pos[5]&&pos[5]==pos[7]) {
        if(pos[3]==1)
            declareWinner();
        else if(pos[3]==2)
            declareLoser();
        return;
    }

    allFill = true;
    for(i=1;i<=9;i++) {
        if(pos[i]==0) {
            allFill = false;
            break;
        }
    }

    if(allFill) {
        declareTie();
    }  
}

function declareTie() {
    isGameRunning = false;
    audioTied.play();
    gameStatus.classList.remove('not-visible');
    gameStatus.classList.add('visible');
    gameStatus.classList.add('animateGameStatus');    
    gameStatus.innerHTML = "Game Tied";
    restart.style.visibility = 'visible';
}

function declareWinner() {
    isGameRunning = false;
    audioWon.play();
    gameStatus.classList.remove('not-visible');
    gameStatus.classList.add('visible');
    gameStatus.classList.add('animateGameStatus');
    gameStatus.innerHTML = "You Won";
    restart.style.visibility = 'visible';
}

function declareLoser() {
    isGameRunning = false;
    audioLost.play();
    gameStatus.classList.remove('not-visible');
    gameStatus.classList.add('visible');
    gameStatus.classList.add('animateGameStatus');
    gameStatus.innerHTML = "You Lost";
    restart.style.visibility = 'visible';
}

function testRandomness() {
    fre = [0,0,0,0,0,0,0,0,0,0];
    for(i=1;i<=1000;i++) {
        ran = (Math.ceil(Math.random()*10)+1)%10;
        fre[ran]++;
    }
    console.log(fre);
}

// start a new Game
function startGame() {
    restart.style.visibility = 'hidden';
    score = 0;
    pos = [0,0,0,0,0,0,0,0,0,0];
    isGameRunning = true;
    gameStatus.classList.remove('visible');
    gameStatus.classList.add('not-visible');
    b1.style.backgroundImage = "none";
    b2.style.backgroundImage = "none";
    b3.style.backgroundImage = "none";
    b4.style.backgroundImage = "none";
    b5.style.backgroundImage = "none";
    b6.style.backgroundImage = "none";
    b7.style.backgroundImage = "none";
    b8.style.backgroundImage = "none";
    b9.style.backgroundImage = "none";
    console.log("New Game started");
}

startGame();