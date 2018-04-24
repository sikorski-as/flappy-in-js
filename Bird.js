"use strict";
var birdImage = new ImageResource("bigbird.png").get();
var birdImage2 = new ImageResource("bigbird2.png").get();

function Bird(){
	this.x = 0;
	this.y = 0;
	this.image = birdImage;
	this.width = this.image.width;
	this.height = this.image.height;
	
	this.gravity = 0.8;
    this.force = -15;
    this.velocity = 0;
	
	this.up = function(){
		this.velocity += this.force;
		this.image = birdImage2;
		window.setTimeout(function(who){who.down();}, 200, this);
		flapSound.play();
	}
	
	this.down = function(){
		this.image = birdImage;
	}
	
	this.hits = function(pipe){
		return 	between(this.x + this.width / 2, pipe.x, pipe.x + pipe.width) 
		&& 
		between(this.y, pipe.y - this.height / 2, pipe.y + pipe.height + this.height / 2);
	}
	
	this.update = function(){
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;

		if (this.y >= canvas.height - this.height / 2) {
		  this.y = canvas.height - this.height / 2;
		  this.velocity = 0;
		  isOver = true;
		  failSound.play();
		}

		if (this.y <= this.height / 2) {
		  this.y = this.height / 2;
		  this.velocity = 0;
		}
	}
	
	this.draw = function(target){
		target.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
	}
}

