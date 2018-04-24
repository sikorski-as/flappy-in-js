"use strict";
function Pipe(arg_x, arg_y, arg_w, arg_h){
	this.x = arg_x;
	this.y = arg_y;
	this.width = arg_w;
	this.height = arg_h;
	
	this.update = function(){
		
	}
	
	this.draw = function(target){
		target.fillStyle = "#FFFFFF";
		target.fillRect(this.x, this.y, this.width, this.height);
	}
}

