var canvas;

var imageToGuess;
var imagePixels;
var population;

var myChart;
function preload() {
  imageToGuess = loadImage("./mona-lisa-resized.jpg");
  imageToGuess.loadPixels();
  imagePixels = imageToGuess.pixels;
}

function setup() {
  canvas = createCanvas(100, 100);
  canvas.parent("myCanvas");
  pixelDensity(1); //as it turns out you need this for some displays such as mac book pro for pixels array to work properly
  background(0);
  population = new Population(100, 0.01, 100, 100);
  // frameRate(1);
  drawChart(population.averageFitnessHistory);
}

function draw() {
  population.makeNewGen();
  for (let i = 0; i < population.population.length; i++) {
    population.population[i].calculateFitness();
  }
  // console.log("new gen");
  myChart.update();
  let genNumLabel = document.getElementById("generationNum");
  genNumLabel.innerHTML = population.genNumber;
  let genFitLabel = document.getElementById("generationFitness");

  genFitLabel.innerHTML =
    population.averageFitnessHistory[
      population.averageFitnessHistory.length - 1
    ];
  if (population.averageFitnessHistory.length % 1000 == 0) {
    // saveCanvas("Generation_" + population.averageFitnessHistory.length);
  }
}
