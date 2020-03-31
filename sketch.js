var canvas;

var imagePath = "./mona-lisa-original.jpg";

var imageToGuess;
var imagePixels;
var population;

var imageWidth, imageHeight;
var myChart;
function preload() {
  // imageToGuess = loadImage("./mona-lisa-resized.jpg");
  imageToGuess = loadImage(imagePath);
}

function setup() {
  //100 = w * x
  let factor = 200 / imageToGuess.width;
  imageToGuess.resize(200, imageToGuess.height * factor);
  imageWidth = imageToGuess.width;
  imageHeight = imageToGuess.height;
  imageToGuess.loadPixels();
  imagePixels = imageToGuess.pixels;
  canvas = createCanvas(imageWidth, imageHeight);
  console.log(imageWidth, imageHeight);
  canvas.parent("myCanvas");
  pixelDensity(1); //as it turns out you need this for some displays such as mac book pro for pixels array to work properly
  background(0);
  population = new Population(imageWidth, imageHeight);
  // frameRate(1);
  drawChart(population.fitnessHistory);
  noLoop();

  let imageElement = document.getElementById("actualImage");
  imageElement.src = imagePath;
}

function draw() {
  // takeStep();
  // if (frameCount % 10000 === 1) {
  //   population.best.show();
  //   saveCanvas(imagePath + "_Generation_" + population.genNumber, "png");
  // }
}

function takeStep() {
  population.nextGen();
  // console.log(population.mutated.fitness - population.best.fitness);
  // console.log(population.mutated.data.length, population.best.data.length);
  myChart.update();
  // console.log(population.best.data);
  let genNumLabel = document.getElementById("generationNum");
  genNumLabel.innerHTML = population.genNumber;
  let bestFitLabel = document.getElementById("bestFit");
  bestFitLabel.innerHTML = population.best.fitness;
  let mutFitLabel = document.getElementById("mutationFit");
  mutFitLabel.innerHTML = population.mutated.fitness;
  // if (population.averageFitnessHistory.length % 1000 == 0) {
  //   // saveCanvas("Generation_" + population.averageFitnessHistory.length);
  // }
}
