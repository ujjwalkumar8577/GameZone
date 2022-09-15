var theta = 5;
var r = 10;
var isMusicPlaying = false;
horn = new Audio('CarHorn.mp3');
music = new Audio('CarMusic.mp3');
w = document.getElementsByClassName('Container').innerWidth;
h = document.getElementsByClassName('Container').innerHeight;

// Music Self Loop
music.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

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
keyMap[77]	= { name :"music", 	active:false , onactive: playPauseMusic };
keyMap[72]	= { name :"horn", 	active:false , onactive: function() {
    horn.play();
} };

document.addEventListener("keydown", function(event) {
    handleKey(event, true);
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

setInterval(function() {
    for(var key in keyMap) {
        var currentController = keyMap[key];
        if( currentController.active) {
            currentController.onactive();
        }
    }
},50);

function moveUP() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    x+= r*cos(angle);
    y+= r*sin(angle);
    car.style.left = Math.round(x)+"px";
    car.style.bottom = Math.round(y)+"px";
}

function moveDOWN() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    x-= r*cos(angle);
    y-= r*sin(angle);
    car.style.left = Math.round(x)+"px";
    car.style.bottom = Math.round(y)+"px";
}

function moveLEFT() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    angle-=theta;
    car.style.transform = 'rotate('+angle+'deg)';
}

function moveRIGHT() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    angle+=theta;
    car.style.transform = 'rotate('+angle+'deg)';
}

function playPauseMusic() {
    if(isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
    }
    else {
        music.play();
        isMusicPlaying = true;
    }
}

function cos(angle)
{
    return (Math.cos((360-angle)*3.14159/180));
}

function sin(angle)
{
    return (Math.sin((360-angle)*3.14159/180));
}

function getCurrentLeft(el){
    return parseInt(window.getComputedStyle(car, null).getPropertyValue('left'));
}

function getCurrentBottom(el){
    return parseInt(window.getComputedStyle(car, null).getPropertyValue('bottom'));
}

function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');      
    //   a = values[0];
    //   b = values[1];
    //   angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
    //   return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    //   this would return negative values the OP doesn't wants so it got commented and the next lines of code added
      var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    }
    return 0;
  }