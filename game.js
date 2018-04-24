"use strict";
var canvas, screen, fpsTimer; // fundamental objects
var pipeTop, pipeBottom, bird; // game objects
var scrollingSpeed = 5, fps = 60; // setup variables
var isOver = false, score = 0;
var scored = false;
var flapSound = new Audio(); flapSound.src = "flap.wav"; flapSound.load(); 
var failSound = new Audio(); failSound.src = "fail.wav"; failSound.load();

var retryPossible = false;
var gameoverScreen = false;
var firstTouch = true;


function clearScreen(){
	screen.fillStyle = "#7EC0EE";
	screen.fillRect(0, 0, canvas.width, canvas.height / 4);
	
	screen.fillStyle = "#66CC99";
	screen.fillRect(0, canvas.height / 4, canvas.width, canvas.height * 3 / 4);
}

function distance(x1, y1, x2, y2){
	return Math.sqrt(
		Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
	);
}

function randomInteger(a, b){
	return Math.floor(a + Math.random() * (b - a + 1));
}

function between(n, a, b){
	return n <= b && n >= a;
}

window.onload = function(){
	canvas = document.getElementById("gameCanvas");
	screen = canvas.getContext("2d");
	
	document.addEventListener("keydown", function keyDown(eventData){
		if(eventData.keyCode == 32){ // 32 - spacebar
			if(firstTouch){
				firstTouch = false;
			}
			flap();
		}
	});
	document.body.addEventListener("touchend", function (eventData) {
		if(firstTouch){
			firstTouch = false;
			failSound.volume = 0.0; failSound.play(); setTimeout(function(){failSound.volume = 1.0}, failSound.duration * 1000);
			flapSound.volume = 0.0; flapSound.play(); flapSound.volume = 1.0;
		}
		
		if (eventData.target == canvas) {
			flap();
			eventData.preventDefault(); 
			eventData.stopPropagation();
		}
	});
	
	reset();
		
	clearScreen();
	fpsTimer = setInterval(update, 1000 / fps);
}



function flap(){
	if(!isOver)
			bird.up();
		else{
			if(retryPossible)
				reset();
		}
}

function reset(){
	bird = new Bird(); bird.x = 64; bird.y = canvas.height / 2;
	pipeTop = new Pipe(
		canvas.width, 0, 
		90, canvas.height / 4 
	);
	pipeBottom = new Pipe(
		canvas.width, canvas.height * 3 / 4, 
		90, canvas.height / 4
	);
	score = 0;
	scored = false;
	isOver = false;
	retryPossible = false;
	gameoverScreen = false;
}

function gameover(){
	if(!gameoverScreen){
		gameoverScreen = true;
		screen.font = "25px Arial";
		screen.fillStyle = "black";
		screen.textAlign = "center";
		screen.fillText("Gameover!", canvas.width / 2, canvas.height / 2); 
		screen.font = "20px Arial";
		screen.fillText("Tap spacebar to play again", canvas.width / 2, canvas.height / 2 + 25); 
		retryPossible = false;
		setTimeout(function(){retryPossible = true;}, 500);
	}
}

function update(){
	if(!isOver){
		clearScreen();

		// update:
		if(!firstTouch){
			pipeTop.x -= scrollingSpeed;
			pipeBottom.x -= scrollingSpeed;
			
			if(pipeTop.x < -pipeTop.width){
				pipeTop.x = canvas.width + pipeTop.width;
				pipeTop.x = canvas.width + pipeBottom.width;
				pipeBottom.x = canvas.width + pipeBottom.width;
				let gapSize = randomInteger(1, 2);
				let ratio = 1.0 / randomInteger(2, 4);
				pipeTop.height = (canvas.height - gapSize * bird.height / 5 * 2) * ratio;
				pipeBottom.height = (canvas.height - gapSize * bird.height * 2) * (1 - ratio);
				pipeBottom.y = pipeTop.height + gapSize * bird.height * 2;
				scored = false;
			}
			if((bird.x > pipeTop.x + pipeTop.width / 2) && !scored){
				scored = true;
				score++;
			}
			bird.update();
			if(bird.hits(pipeTop) || bird.hits(pipeBottom)){
				isOver = true;
				failSound.play();
			}
		}
		
		
		// draw:
		pipeTop.draw(screen);
		pipeBottom.draw(screen);
		bird.draw(screen);
		
		screen.font = "20px Arial";
		screen.fillStyle = "black";
		screen.textAlign = "left";
		screen.fillText("Score: " + score, 5, 30); 
		
		
	}
	else
	{
		gameover();
	}
}

