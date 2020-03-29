var canvas;

var imageToGuess;
var j;

function preload() {
  imageToGuess = loadImage("./monaLisa.png");
}

function setup() {
  canvas = createCanvas(100, 100);
  background(0);
  canvas.loadPixels();
  j = new Element(100, 100);
  j.show();
}
