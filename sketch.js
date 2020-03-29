var canvas;

var imageToGuess;
var j;

function preload() {
  imageToGuess = loadImage("./mona-lisa-resized.jpg");
}

function setup() {
  canvas = createCanvas(200, 100);
  background(0);
  canvas.loadPixels();
  j = new Element(100, 100);
  j.show();
  image(imageToGuess, 100, 0, 100, 100);
}
