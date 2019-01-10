var sizeL;
var sizeS;
var w;
var h;

function setup(){

	w = 800;
	h = 800;
	
	createCanvas(w, h);
	background(255);

}

function draw(){

	sizeL = 25;
	sizeS = 15;
	
	fill(0, 102, 255);
	noStroke();
	ellipse(w/4, h/4 - sizeL/2, sizeL, sizeL);
	ellipse(w/4 + 20, h/4 - sizeL/2, sizeL, sizeL);

	fill(0, 153, 255);
	noStroke();
	ellipse(w/4, h/4, sizeS, sizeS);
	ellipse(w/4 + 20, h/4, sizeS, sizeS);

}