let gotas = [];
function setup(){
	createCanvas(900, 600);
	for(var i = 0; i < 300; i++){
		gotas.push(new Gota());
	}
}

function draw(){
  background(20);
  for (gota of gotas){
    if(mouseIsPressed){
      gota.float();
    }else{
       gota.cae();              
    }
		gota.show();
	}
}
class Gota {
	constructor(){
		this.x = random(-100, width -100);
		this.y = random(-800, -50);
		this.z = random(0, 45);
		this.speed = map(this.z, 0, 25, 5, 11);
		this.ancho = map(this.z, 0, 25, 1, 3.5);
    this.viento = map(this.z, 0, 25, -4, 4);
	}
	cae(){
    this.x += this.viento;
		this.y += this.speed + 5;
		if(this.y > height){
			this.x = random(-100, width -100);
			this.y = random(-800, -50);
		}
	}
  float(){
    this.y += random(-0.3, 0.3);
    this.x += random(-0.5, 0.5);

  }
	show(){
		strokeWeight(this.ancho);
		stroke(200, 20, 200);
		line(this.x, this.y, this.x, this.y +  2);
	}
}