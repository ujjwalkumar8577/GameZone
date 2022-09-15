var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var WIDTH = 520;
var HEIGHT = 520;
var lastFireAt = new Date().getTime();
var gameOverSound = new Audio('GameOver.mp3');
var audio = new Audio('https://nhacchuong68.com/wp-content/uploads/2019/07/Alan-Walker-Faded-Instrumental-Version.mp3');
var counter = 0;
var highscore = 0;
var score = 0;
var isPlayingMusic = false;
var isGameRunning = true;
var fires = [];
var ships = [];
var bullets = [];
var difficulty = 5;
difficultyRange.value = difficulty;
var interval;

var alienImages = [];
var alienImageUrls = [  "https://i.imgur.com/tvJOu59.png",
                        "https://i.imgur.com/e1pkJRF.png",
                        "https://i.imgur.com/aRumf1r.png",
                        "https://i.imgur.com/jjOPpWL.png",
                        "https://i.imgur.com/hsdEpsM.png",
                        "https://i.imgur.com/u5eNyl8.png"];

var fireImage = new Image();
fireImage.src = ["https://i.imgur.com/pPvOuhq.png"];

var shipImages = [];
var shipUrls = ["https://i.imgur.com/gLLRj2T.png",
                "https://i.imgur.com/ZhshGO4.png",
                "https://i.imgur.com/E0wiPJC.png",
                "https://i.imgur.com/WmsDf2l.png",
                "https://i.imgur.com/EjfY1iE.png",
                "https://i.imgur.com/t3VGw8g.png",
                "https://i.imgur.com/d6OT3qt.png"];

var bulletImage1 = new Image();
bulletImage1.src = ["https://i.imgur.com/dM81aDs.gif"];
var bulletImage2 = new Image();
bulletImage2.src = ["https://i.imgur.com/NyaUjNn.gif"];

// alien = me
// fire = my bullet
// ship = enemy
// bullet = enemy bullet

for(var i = 0;i< shipUrls.length ;i++) {
    var shipImage = new Image();
    shipImage.src = shipUrls[i];
    shipImages.push(shipImage);
}

// create ships according to difficulty
applyDifficulty(difficulty);
    
for( var i=0; i<alienImageUrls.length ; i++ ) {
    var image = new Image();
    image.src = alienImageUrls[i];
    alienImages.push(image);
}

// create 1 alien
var alien = {};
alien.images = alienImages;
alien.width = 100;
alien.height = 100;
alien.x = 300;
alien.y = HEIGHT-100;
alien.speed = 10;

musicCheckbox.onclick = function() {
    if (musicCheckbox.checked == true){
        audio.play();
    }
    else {
        audio.pause();
    }
}

difficultyRange.onchange = function() {
    difficulty = difficultyRange.value;
    console.log(difficulty);
    applyDifficulty(difficulty);
}

restart.onclick = function() {
    startGame();
}

// handle key actions
var keyMap = {};
keyMap[38]	= { name :"up",		active:false , onactive: moveUP };
keyMap[87]	= { name :"up",		active:false , onactive: moveUP };
keyMap[40]	= { name :"down",	active:false , onactive: moveDOWN };
keyMap[83]	= { name :"down",	active:false , onactive: moveDOWN };
keyMap[37]	= { name :"left",	active:false , onactive: moveLEFT };
keyMap[65]	= { name :"left",	active:false , onactive: moveLEFT };
keyMap[39]	= { name :"right",	active:false , onactive: moveRIGHT };
keyMap[68]	= { name :"right",	active:false , onactive: moveRIGHT };
keyMap[32]	= { name :"space", 	active:false , onactive: FIRE };

document.addEventListener("keydown", function(event) {
    if(isGameRunning)
    {
        if(!isPlayingMusic)
            playMusicNow();

        handleKey(event, true);
    }
});

document.addEventListener("keyup", function(event) {
    handleKey(event, false);
});

function handleKey(event, status) {
    var currentController = keyMap[event.keyCode];
    if(!!currentController) {
        currentController.active = status;
    }
}

// key functions
function moveUP() {
    if(alien.y>40)
        alien.y-=alien.speed;
}
function moveDOWN() {
    if(alien.y<HEIGHT-40)
        alien.y+=alien.speed;
}
function moveLEFT() {
    if(alien.x>60)
        alien.x-=alien.speed;
}
function moveRIGHT() {
    if(alien.x<WIDTH-60)
        alien.x+=alien.speed;
}
function FIRE() {
    if(new Date().getTime() - lastFireAt>300) { 
        lastFireAt= new Date().getTime(); 
        addFire(alien.x,alien.y-30);
        // addFire(alien.x-30,alien.y-30);
        // addFire(alien.x+30,alien.y-30);
    }
}

// Play music on loop
function playMusicNow() {
    isPlayingMusic = true;
    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    audio.play();
}

// draw the given object in canvas
function drawObject(object) {
    // Find current index of image to be used.
    var currentImageIndex = counter%object.images.length;
    // Access image from array of images
    var currentImage = object.images[currentImageIndex];
    // Draw of canvas
    ctx.drawImage(currentImage,object.x-(object.width/2),object.y-(object.height/2),object.width,object.height);
}

function addFire(x,y) {
    var fire = {};
    fire.images = [fireImage];
    fire.x = x;
    fire.y = y;
    fire.width = 10;
    fire.height = 10;
    fire.speedX = 0;
    fire.speedY = -10;
    fire.active = true;
    fire.move = function() {
        this.y += this.speedY;
        if( this.y <= 0 ) {
            this.active = false;
        }
    }
    fires.push(fire);
}

function drawAndMoveFires() {
    var temp = [];
    for(var i=0;i<fires.length;i++) {
        fires[i].move();
        drawObject(fires[i]);
        // Only add active bullets				
        if(fires[i].active) {
            temp.push(fires[i]);
        }
    }
    fires = temp;
}

function addBullet(x,y) {
    var bullet = {};
    bullet.images = [bulletImage1,bulletImage2];
    bullet.x = x;
    bullet.y = y;
    bullet.width = 50;
    bullet.height = 50;
    bullet.speedX = 0;
    bullet.speedY = 7;
    bullet.active = true;

    bullet.move = function() {
        this.y += this.speedY;
        if( this.y >=HEIGHT ) {
            this.active = false;
        }
    }

    bullet.stop = function() {
        this.speedY = 0;
        this.active = false;
    }

    bullet.restart = function() {
        this.speedY = 7;
        this.active = true;
        this.x = 0;
        this.y = 0;
    }

    bullets.push(bullet);
}

function drawAndMoveBullets() {
    var temp = [];
    for(var i=0;i<bullets.length;i++) {
        bullets[i].move();
        drawObject(bullets[i]);
        // Only add active bullets		
        if(bullets[i].active) {
            temp.push(bullets[i]);
        }
    }
    bullets = temp;
}

function updateScore() {
    if(score>highscore)
        highscore = score;
    
    document.getElementById("highScoreElement").innerHTML = "High Score : " + highscore;
    document.getElementById("scoreElement").innerHTML = "Score : " + score;
}

function update() {
    counter++;

    // Clear all backgroud to black
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 520, 520);

    // Hovering effect
    alien.x += -2+Math.random()*4;
    alien.y += -2+Math.random()*4;

    // clear keymap
    for(var key in keyMap) {
        var currentController = keyMap[key];
        if( currentController.active) {
            currentController.onactive();
        }
    }

    // draw alien
    drawObject(alien);

    // draw ships
    for(var i=0;i<ships.length;i++) {
        drawObject(ships[i]);
        ships[i].move();
        ships[i].fireBullet();
    }

    drawAndMoveBullets();
    drawAndMoveFires();

    // checking for ship and fire collision
    for(var i=0;i<fires.length;i++) {
        var fire = fires[i];
        for(var j=0; j<ships.length;j++) {
            var ship = ships[j];
            var x1x2 = (fire.x-ship.x)*(fire.x-ship.x);
            var y1y2 = (fire.y-ship.y)*(fire.y-ship.y);
            var distance = Math.sqrt( x1x2 + y1y2 );
            if(distance<ship.width-20) {
                ship.x = (Math.random()*10000000)%WIDTH;
                ship.speedX = 3+Math.random()*4;
                ship.y = -20;
                fire.active = false;
                console.log("Ship Hit");
                score += 100;
                updateScore();
            }
        }
    }

    // checking for alien and bullet collision
    for(var i=0;i<bullets.length;i++) {
        var bullet = bullets[i];
        var x1x2 = (bullet.x-alien.x)*(bullet.x-alien.x);	
        var y1y2 = (bullet.y-alien.y)*(bullet.y-alien.y);	
        var distance = Math.sqrt( x1x2 + y1y2 );
        if(distance<50) {
            bullet.active = false;
            console.log("Hit by bullet "+i);
            endGame();
        }
    }

    // checking for alien and ship collision
    for(var i=0;i<ships.length;i++) {
        var ship = ships[i];
        var x1x2 = (ship.x-alien.x)*(ship.x-alien.x);	
        var y1y2 = (ship.y-alien.y)*(ship.y-alien.y);	
        var distance = Math.sqrt( x1x2 + y1y2 );
        if(distance<60) {
            console.log("Hit by ship "+i);
            endGame();
        }
    }
}

function applyDifficulty(d) {
    ships = [];
    for(var i=0;i<difficulty;i++) {
        var ship = {};
        ship.images = shipImages;
        ship.x = (Math.random()*1000000)%WIDTH;
        ship.y = 0;
        ship.width = 80;
        ship.height = 80;
        ship.speedX = 1 + Math.random()*3;
        ship.speedY = 0.7;
        ship.move = function() {
            if( this.x >= WIDTH && this.speedX >0 ) {
                // now move in left
                this.speedX = - this.speedX;
            }
            if( this.x <=0 && this.speedX < 0 ) {
                // now move in right
                this.speedX = - this.speedX;
            }
            this.x += this.speedX;
            this.y += this.speedY;
    
            // Reappear
            if(this.y>=600) {
                this.y = -50;
            } 
        }    
        ship.stop = function() {
            this.speedX = 0;
            this.speedY = 0;
            this.x = 10000;
            this.y = 10000;
        }
        ship.restart = function() {
            this.speedX = 1 + Math.random()*3;
            this.speedY = 0.7;
            this.x = (Math.random()*1000000)%WIDTH;
            this.y = 0;
        }
        ship.fireBullet = function() {
            if(Math.random()<0.01)
            addBullet(this.x,this.y);
        }
    
        ships.push(ship);
    }
}

function startGame() {
    isGameRunning = true;
    audio.play();
    counter = 0;
    score = 0;
    musicCheckbox.checked = true;
    gameOver.style.visibility = "hidden";
    restart.style.visibility = "hidden";
    restart.classList.remove('animateRestart');
    updateScore(); 
    isPlayingMusic = false;

    alien.x = 300;
    alien.y = HEIGHT-100;

    for(var i=0;i<bullets.length;i++) {
        bullets[i].restart();
    }

    for(var j=0; j<ships.length; j++) {
        ships[j].restart();
    }

    interval = setInterval(update,50);
}

function endGame() {
    isGameRunning = false;
    audio.pause();
    gameOverSound.play();
    gameOver.style.visibility = "visible";
    restart.style.visibility = "visible";
    restart.classList.add('animateRestart');
    
    for(var i=0;i<bullets.length;i++) {
        bullets[i].stop();
    }

    for(var j=0; j<ships.length; j++) {
        ships[j].stop();
    }

    clearInterval(interval);
    
    var imageObj = new Image();
    imageObj.onload = function(){
        var destX = canvas.width / 2 - this.width / 4;
        var destY = canvas.height / 2 - this.height / 4;
        ctx.drawImage(this, destX, destY, this.width/2, this.height/2);
    };
    imageObj.src = "https://pngimg.com/uploads/game_over/game_over_PNG42.png";
}

startGame();