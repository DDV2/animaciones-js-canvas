let elCirculo, senActivated, alpha;
function setup() {
    createCanvas(785, 400)
    angleMode(RADIANS);  
    elCirculo = new Circunferencia(0, 0);
    senActivated = true;
    alpha = 0;
}

function draw() {
    background(0, 10, 16);
    coordeanadasC();
    coordeanadasN();
    elCirculo.render();
    elCirculo.moves();
    switcher();
    estaFuncion();
}
function estaFuncion(){
    push();
    textSize(18);
    fill(259, 258, 60)
    if(senActivated){
        text("f(x) = sen(θ)", 650, 50);
    }else {
        text("f(x) = cos(θ)", 650, 50);
    }
    pop();
}
class Circunferencia {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xl = 160;
        this.yl = 0;
        this.fi = 0;
        this.history = [];
        this.history2 = [];
    }
    moves() {
        this.fi+=0.05;
        this.x = Math.cos(-this.fi) * 100;
        this.y = Math.sin(-this.fi) * 100;
        if(senActivated){
            this.yl = Math.sin(-this.fi) * 100;
        }else{
            this.yl = -Math.cos(this.fi) * 100;
        }
        this.xl+=3.5;
        if(this.fi > Math.PI * 2){
            this.fi= 0;
            this.xl = 160;
        }
        let vector = createVector(this.x, this.y);
        this.history.push(vector); 
        let vector2 = createVector(this.xl, this.yl);
        this.history2.push(vector2); 
    }
    render() {
        push();
        translate(130, 200);
        stroke(0, 120, 200);
        for(let i = 0; i < this.history.length; i++){
            let posx = this.history[i].x;
            let posy = this.history[i].y;
            line(this.x, this.y, posx, posy);
        }
        if(this.history.length > 25){
            this.history.splice(0, 1);
        }
        for(let i = 0; i < this.history2.length; i++){
            let posx = this.history2[i].x;
            let posy = this.history2[i].y;
            ellipse(posx, posy, 4);
        }
        if(this.history2.length > 55){
            this.history2.splice(0, 1);
        }
        fill(40, 150, 200, 120);
        ellipse(this.x, this.y, 30);
        //sen-cos
        ellipse(this.xl, this.yl, 20);

        fill(40, 150, 200);
        ellipse(this.x, this.y, 15);
        //sen-cos
        ellipse(this.xl, this.yl, 5);
        //linea unificadora
        line(this.x, this.y, this.xl, this.yl)
        
        pop();
    }
}

function coordeanadasC() {
    push();
    translate(130, 200);
    noFill();
    stroke(255, 51, 0);
    line(0, 0, 100/(Math.sqrt(2)), -100/(Math.sqrt(2)));
    stroke(0, 120, 200);
    ellipse(0, 0, 200);
    for(let i = 0; i < 2; i++){
        stroke(155);
        line(-110 * i, -110 * (1 - i), 110 * i, 110 * (1 - i));
        ellipse(115 * (1- i), 115 * i, 28);
        ellipse(-115 * (1- i), -115 * i, 28);
    }
    text("0", 113, -2);
    text("π/2", -9, -113);
    text("π", -120, 3);
    text("3π/2", -12, 120);
    text("2π", 108, 10);
    fill(40, 150, 200);
    stroke(255, 51, 0);
    ellipse(0, 0, 10);
    pop();
}

function coordeanadasN() {
    push();
    translate(290, 200);
    stroke(255);
    line(0, 130, 0, -130);
    line(-20, 0, 480, 0);
    stroke(255, 51, 0);
    line(0, 0, 0, -100);
    line(-10, -101, 10, -101);
    fill(40, 150, 200);
    ellipse(0,  0, 10);
    text("0", 2, 13);
    text("π/2", 100, 13);
    text("π", 217, 13);
    text("3π/2", 317, 13);
    text("2π", 427, 13);
    pop();
}

function switcher() {
    push();
    stroke(40, 150, 200);
    fill(40, 150, 200, alpha);
    rect(10, 360, 60, 30);
    if(alpha != 0){
        stroke(0, 10, 16)
        fill(0, 10, 16);
    }
    text("Swicher", 19, 380);
    if(mouseX > 10 && mouseX < 70 && mouseY < 390 && mouseY > 360){
        alpha = 180;
    }else{
        alpha = 0;
    }
    textSize(15);    
    pop();
}

function mousePressed() {
    if(mouseX > 10 && mouseX < 70 && mouseY < 390 && mouseY > 360){
        senActivated = !senActivated;
    }
}
