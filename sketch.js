var canvas;

var imageToGuess;
var population;

var myChart;
function preload() {
  imageToGuess = loadImage("./mona-lisa-resized.jpg");
}

function setup() {
  canvas = createCanvas(200, 100);
  canvas.parent("myCanvas");
  pixelDensity(1); //as it turns out you need this for some displays such as mac book pro for pixels array to work properly
  background(0);
  population = new Population(100, 0.01, 100, 100);
  // frameRate(1);
  drawChart(population.averageFitnessHistory);
}

function draw() {
  population.makeNewGen();
  console.log("new gen");
  myChart.update();
}
