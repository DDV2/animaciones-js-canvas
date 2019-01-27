let ang, angLuna;
let posx, posy, posxL, posyL;
let relTam, fase;
let trayectoria = [];
let stars = [];
function setup(){
	createCanvas(1000, 600);
	angleMode(RADIANS);
  for(let i = 0; i < 300; i++){
     stars.push(new Star());
  }
  ang = 0;
	angLuna = 0;
	posx = 0;
	posy = 0;
	posxL = 0;
	posyL = 0;
  relTam = 30;
  fase = 0;
}
function draw(){
	background(0);
  for(let star of stars){
    star.show();
    star.move();
  }
  noStroke();
  posx = Math.cos(ang)*300;
	posy = Math.sin(ang)*50;
	posxL = -Math.cos(angLuna)*relTam;
	posyL = Math.sin(angLuna)*8;
  relTam = 30 + (posy/10);
  ang+=0.02;
  angLuna+=0.04;
  if(ang >= Math.PI * 2){
    ang = 0;
  }
  if(angLuna >= Math.PI * 2){
		angLuna = 0;
	}	
  //Shade E/ Sombra de la tierra
  if(ang < Math.PI){
    fase = (posx/300) * 14;
  }else if(ang < Math.PI * 3/2) {
    fase = -1 * (44 + posx/10);
  } else {
    fase = 20 -  0.02 * posx;
  }
  //Shade Moon/ Sombra de la luna
  //hehe.. sure.
  
  //relative position / posiciones relativas
  push();
	translate(500, 300);
  if(ang < Math.PI ){
    Sol();
    if(angLuna < Math.PI){
      Luna();
      Tierra();
    } else if( angLuna >=Math.PI){
      Tierra();
      Luna();
    }
  }else if(ang >= Math.PI) {
    if(angLuna < Math.PI){
      Luna();
      Tierra();
    } else if( angLuna >=Math.PI){
      Tierra();
      Luna();
    }
    Sol();
  }
  pop();
}
//sun
function Sol() {
  for(let i = 0; i < 7; i++){
    fill(253, 255, 198, i * 35);
    ellipse(70, 0, 130 + 10 * (5 - i))
  }
  fill(253, 255, 198, 10);
  ellipse(70, 0, 220);
  fill(253, 255, 198, 12);
  ellipse(70, 0, 300);  
  
}
//earth
function Tierra() {
	fill(0, 110, 183);
	ellipse(posx, posy, relTam);
  fill(0, 110)
  ellipse(posx + fase, posy, relTam)
}
//moon
function Luna() {
  push();
	translate(posx, posy);
  rotate(10);
	fill(170);
	ellipse(posxL, posyL, relTam*(1/3));
	pop();
}
//stars
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height); 
    this.z = random(0, 35);
    this.vel = map(this.z,0, 35, 0.02, 0.1);
    this.ranNum = Math.floor(random(0,3));
  }
  move() {
    this.x-=this.vel;
		if(this.x < 0){
			this.x = random(width, width + 30);
			this.y = random(height);
		}    
  }
  
  show() {
    if(this.ranNum == 0){
      stroke(255, 191, 191);
    } else if(this.ranNum == 1){
      stroke(153, 212, 255);
    }else {
      stroke(255);      
    }
    point(this.x, this.y);
  }
}