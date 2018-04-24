function ImageResource(path){
	this.ready = false;
	this.data = new Image();
	this.data.onload = function(){
		ready = true;
	}
	this.data.src = path;
	this.get = function(){
		return this.data;
	}
}