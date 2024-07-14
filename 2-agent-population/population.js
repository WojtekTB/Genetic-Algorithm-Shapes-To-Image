class Population {
  constructor(width, height, numberOfElements = 10, mutateOnlyExisting) {
    this.width = width;
    this.height = height;
    this.best = new Element(this.width, this.height, undefined, numberOfElements, mutateOnlyExisting);
    this.best.calculateFitness();
    this.mutated = new Element(this.width, this.height, this.best.data);
    this.mutated.mutate();
    this.mutated.calculateFitness();

    this.fitnessHistory = [];
    this.fitnessHistory.push(this.best.fitness);

    this.genNumber = 0;

    this.numberOfImprovements = 0;

    // check if you have best data already saved for this image
    const savedData = localStorage.getItem(imageToGuess.name);
    if (savedData) {
      console.log("loading saved data");
      console.log(savedData);
      this.best.data = JSON.parse(savedData);
      this.best.calculateFitness();
      this.fitnessHistory.push(this.best.fitness);
    }
  }
  nextGen() {
    if (this.mutated.fitness >= this.best.fitness) {
      this.best = this.mutated;
      this.numberOfImprovements++;
      // console.log("improved");
      this.fitnessHistory.push(this.best.fitness);
      if (this.fitnessHistory.length > 500) {
        this.fitnessHistory.shift();
      }
    }
    this.mutated = new Element(this.width, this.height, this.best.data.slice());
    this.mutated.mutate();
    // this.mutated.mutateOnlyExisting();
    this.mutated.calculateFitness();
    this.genNumber++;

    // save best data for this population to local storage with key of the image name
    localStorage.setItem(imageToGuess.name, JSON.stringify(this.best.data));
  }
}
