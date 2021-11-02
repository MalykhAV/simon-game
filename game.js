var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var level =  0;
var started = true;
$(document).keypress(function() {
    if(started === true){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
    }
});

function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);     
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
} 

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);        
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    started = true;
    gamePattern = [];
}