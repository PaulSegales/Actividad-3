let canvas;
let a, b, c;
var simbolo;
let matrix = [];

function setup() {

  canvas = createCanvas(2800, 3810);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  fill(0);
  rect(0, 2860, width, 950);

  for (let index = 0; index < 350; index++) {
    matrix.push(new Simbolo);

  }

}


function draw() {
  // background(0);
  fill(0);
  rect(0,0,2860,2860);

  if (mouseY < 2785) {
      fill(0, 255, 167);
      ellipse(mouseX, mouseY, 250, 250);
  }
  fondo();
  fill(0);
  rect(0,2820,width,50);


  fill(0,7);
  rect(0, 2860, width, 950);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].actualizar();
    matrix[i].render();
  }
}

function fondo() {
  let posicion = 0;

  //hexagono(150,250,250);
  let radio = 50;
  let incY = (radio * 1.55);

  for (let m = 0; m < 37; m++) {
    if (m % 2 == 0) {
      for (let i = 0; i < 29; i++) {
        hexagono(radio, radio * i * 1.8, posicion + m * incY);
      }
    } else {
      for (let i = 0; i < 29; i++) {
        hexagono(radio, radio * i * 1.8 + radio - 0.1 * radio, posicion + m * incY);
      }
    }

  }

}

function hexagono(radio, x, y) {
  let angulo = 30;
  let angulo2 = 90;
  let temX = x;
  let temY = y;
  let a;
  let b;

  fill(15, 15, 15);
  beginShape();
  for (let i = 0; i < 6; i++) {
    x = temX;
    y = temY;
    x += cos(radians(angulo)) * radio;
    y += sin(radians(angulo)) * radio;
    vertex(x, y);
    angulo += 60;
    x = 0;
    y = 0;
  }
  endShape(CLOSE);
  fill(17, 17, 17);
  beginShape();
  noStroke();
  for (let i = 0; i < 4; i++) {
    x = temX;
    y = temY;
    x += cos(radians(angulo2)) * radio;
    y += sin(radians(angulo2)) * radio;
    vertex(x, y);
    angulo2 += 60;
    x = 0;
    y = 0;
  }
  endShape(CLOSE);
}


function Simbolo() {
  this.x = random(0, width);
  this.y = 2860;
  this.z = random(7, 25);
  this.contador = 0;
  this.caracter;
  this.tiempo = random(10, 500);


  this.setSimboloAleatorio = function () {
    this.caracter = String.fromCharCode(
      0x30A0 + round(random(0, 96))
    );

  }

  this.actualizar = function () {


    if (millis() > (this.contador + this.tiempo)) {
      this.contador = millis();
      this.y += textAscent();

      this.caracter = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );

      if (this.y > height) {
        this.y = 2860;
        this.x = random(0, width);
        this.z = random(7, 25);
      }
    }
  }

  this.render = function () {
    fill(0, 255, 0);
    // fill(0,246,198);
    textSize(this.z);
    text(this.caracter, this.x, this.y);
  }
}