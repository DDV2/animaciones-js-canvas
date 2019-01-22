let circulo;
let angplus, cambio, agregarLineas, boton2, boton1;
let lineass = [];
function setup() {
	createCanvas(1000, 500);
	circulo = new Particula();
	angleMode(DEGREES);
	angplus = 0;
	cambio = true;
	agregarLineas = false;
	setInterval(createLinee, 160);
	boton1 = createButton("Cambiar a Coseno");
	boton1.mousePressed(cambiarFuncion);
	boton2 = createButton("Agregar Recorrido");
	boton2.mousePressed(agregarLines);
}
function agregarLines(){
	agregarLineas = !agregarLineas;
	if(agregarLineas){
		boton2.html("Quitar Recorrido");
	} else if (!agregarLineas){
		boton2.html("Agregar Recorrido");
	}
}
function cambiarFuncion(){
	cambio = !cambio;
	if(cambio){
		angplus = 0;
		boton1.html("Cambiar a Coseno")
	} else if(!cambio){
		angplus = -90;
		boton1.html("Cambiar a Seno")
	}

}
function createLinee(){
	if(agregarLineas){
		lineass.push(new lineas(circulo.x, circulo.y, circulo.x2, circulo.y2));
	}
}
function draw() {
	background(30);
	for(let lineasTotales of lineass){
		lineasTotales.show();
	}
	circulo.update();
	circulo.show();
	push();
	//lineas valores de escala
	stroke(0, 100, 250);
	line(70, 250, 900, 250);
	line(350, 50, 350, 450);
	textSize(15);
	fill(0, 100, 250);
	text("π", 621, 275);
	text("π", 80, 255);
	textSize(14);
	text("2π / 0", 315, 255);
	text("2π", 892, 275);
	line(625, 250, 625, 260);
	line(893, 250, 893, 260);
	text("1", 330, 150);
	line(340, 149, 350, 149);
	text("-1", 328, 351);
	line(340, 351, 350, 351);
	pop();
	fill(0, 160, 250);
	//con esto se maneja el texto
	if(cambio){
		textSize(50);
		text("Seno", 850, 460);
	} else if(!cambio){
		text("Coseno", 800, 460);
	}
}

class lineas{
	constructor(x1, y1, x2, y2){
		this.x1 = x1;
		this.y1 = y1;

		this.x2 = x2;
		this.y2 = y2;

	}
	show(){
		stroke(200, 150, 0, 150);
		line(this.x2, this.y2, this.x2, 250);
		line(this.x1, this.y1, 200, 250);
		push();
		strokeWeight(4);
		stroke(255, 0, 0);
		point(this.x1, this.y1);
		point(this.x2, this.y2);
		pop();
	}
}
class Particula{
	constructor(){
		this.x;
		this.y;
		this.y2;
		//centro del circulo
		this.xCenter = 200;
		this.yCenter = 250;
		//angulo de rotacion en grados
		this.ang = 0;
		this.ang2;
		//valor de reduccion de angulo por frame
		this.state = -2;
		//posicion x de la segunda bolita
		this.sit = 0;
		this.x2;
		this.history = [];
		this.history2 = [];
	}
	update(){
		//con estas ecuaciones se manejan los valores de los puntos x e y de ambas bolitas
		this.x = this.xCenter + cos(this.ang ) * 100;
		this.y = this.yCenter + sin(this.ang ) * 100;
		this.y2 = this.yCenter + sin(this.ang2 ) * 100;
		this.ang+= this.state;
		//el angplus es util para "cambiar" de seno a coseno, en realidad solo agrego mas grados al angulo original
		this.ang2 = angplus + this.ang;
		//esto maneja que la segunda bolita vualva al origen
		if(this.ang < -360 || this.ang > 360){
			this.ang =0;
			this.sit = 0;
			lineass = [];
		}
		this.sit+=3;
		this.x2 = 350 + this.sit;
		//almacena datos del recorrido de la bolita 1 par aluego utilizarlos para dibujar el camino
		let v = createVector(this.x, this.y);
		let v2 = createVector(350 + this.sit, this.y2);
		this.history.push(v);
		this.history2.push(v2);
		if(this.history.length > 140){
			this.history.splice(0, 1);
		}
		if(this.history2.length > 140){
			this.history2.splice(0, 1);
		}
	}
	show(){
		fill(255);
		//dibuja el camino del circulo
		noStroke();
		for(var i = 0; i < this.history.length; i++){
			let pos = this.history[i];
			ellipse(pos.x, pos.y, 5);
		}
		for(var i = 0; i < this.history2.length; i++){
			let pos = this.history2[i];
			ellipse(pos.x, pos.y, 5);
		}
		push();
		//lineas de seguimiento
		stroke(0, 150, 50);
		line(this.xCenter, this.yCenter, this.x, this.y);
		line(90, 250, this.x, this.y);
		//lineas bolita dos
		line(350 + this.sit, this.y2, 625, 250);
		line(350 + this.sit, this.y2, 350 + this.sit, 250);
		stroke(255);
		line(this.x, this.y, 350 + this.sit, this.y2)
		pop();
		//dibujo las bolitas-
		fill(0, 100, 150, 150);
		stroke(0);
		ellipse(this.x2, this.y2, 20);
		ellipse(this.x, this.y, 20);
	}
}

function mouseClicked(){
	//con cada click altero de verdadero a falso esta variable, para decidir si cambiar o no el valor
	// de angplus, que a su ves maneja si estamos en coseno o seno
	// cambio = !cambio;
	// if(cambio){
	// 	angplus = 0;
	// } else if(!cambio){
	// 	angplus = -90;
	// }
}
