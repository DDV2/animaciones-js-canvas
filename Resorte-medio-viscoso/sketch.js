let vel, posx, xeq, amplitud, viscocidad, tiempo;
let aire, agua, miel;
let img1, img2, img3, img4, img5;

function preload(){
	img1 = loadImage("./imgs/space.jpg");
	img2 = loadImage("./imgs/aire.jpg");
	img3 = loadImage("./imgs/agua.jpg");
	img4 = loadImage("./imgs/miel.jpg");
	img5 = loadImage("./imgs/r1.png");
}
function setup(){
	createCanvas(1000, 500);
	condicionesInciales();
}
function condicionesInciales(){
	vel = 0.1;
	xeq = 520;
	amplitud = 200;
	viscocidad = 1;
	tiempo = 0;
	aire = false;
	agua = false;
	miel = false;
}
function draw(){
	image(img1, 0, 0, 1000, 500);
	posx = Math.cos(vel*tiempo)*amplitud/viscocidad + xeq;

	tiempo++
	if(aire){
		image(img2, 0, 0, 1000, 500);
		viscocidad+=0.01;
		if(viscocidad > 8){
			viscocidad+= 0.45;
		}
	}else if(agua){
		image(img3, 0, 0, 1000, 500);
		viscocidad+=0.04;
		if(viscocidad > 20){
			viscocidad+= 0.6;
		}
	}else if (miel) {
		image(img4, 0, 0, 1000, 500);
		viscocidad+=0.12;
		if(viscocidad > 15){
			viscocidad+=0.6;
		}
	}
	//"resorte"
	image(img5, 5, 152, posx , 190);
	//pared
	fill(250);
	rect(15, -1, 21, 501);
	//bolita
	fill(255, 50, 150);
	ellipse(posx + 10, 250, 80);

	//dialogo
	push();
	fill(0,0,0,100);
	rect(900, 20, 90, 40);
	noStroke();
	fill(200 , 200, 250);
	rect(900, 120, 90, 40);
	fill(10, 10, 250);
	rect(900, 220, 90, 40);
	fill(190, 170, 50);
	rect(900, 320, 90, 40);
	fill(0);
	textSize(25);
	text("Aire", 926, 150);
	text("Agua", 918, 250);
	text("Miel", 922, 350);
	text("Spacio", 908, 48);
	textSize(13);
	text("(restart)", 908, 72);
	pop();
}
function mousePressed(){
	if(mouseX > 900 && mouseX < 990 && mouseY > 120 && mouseY < 160){
		aire = true;
		agua = false;
		miel = false;
	}
	if(mouseX > 900 && mouseX < 990 && mouseY > 220 && mouseY < 260){
		aire = false;
		agua = true;
		miel = false;
	}
	if(mouseX > 900 && mouseX < 990 && mouseY > 320 && mouseY < 360){
		aire = false;
		agua = false;
		miel = true;
	}
	if(mouseX>900 && mouseX < 990 && mouseY > 20 && mouseY < 60){
		condicionesInciales();
	}
}
