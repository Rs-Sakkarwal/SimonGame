var buttonColours = ["red" , "blue" , "green" , "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

var IndexOfLast = 0;

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keydown(function(){
    if(!started)
    {
        $("h1").text("Level "+level);
        nextSequence();
        started = true
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); //this gives the identity of button which is clicked
    userClickedPattern.push(userChosenColour);
    
    //console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        //console.log("true");
    
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }
    else
    {
        $("h1").text("Game Over, Press Any Key To Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);
        startOver();
        
        //console.log("false");
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    } , 100);
}

//$("div #" + randomChosenColour).on("click" , makeSound(randomChosenColour));

function makeSound(button){
    
    switch(button)
    {
        case "blue":
            var b = new Audio("sounds/blue.mp3");
            b.play();
        break;
        
        case "green":
            var g = new Audio("sounds/green.mp3");
            g.play();
        break;
        
        case "red":
            var r = new Audio("sounds/red.mp3");
            r.play();
        break;
        
        case "yellow":
            var y = new Audio("sounds/yellow.mp3");
            y.play();
        break;
    }
}