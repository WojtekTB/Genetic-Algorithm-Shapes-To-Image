class Population {
  constructor(populationSize, mutationRate, width, height) {
    this.population = [];
    this.width = width;
    this.height = height;
    for (let i = 0; i < populationSize; i++) {
      //createa bunch of random elements in population
      this.population.push(new Element(this.width, this.height));
    }
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    //history of previous generations
    this.averageFitnessHistory = [];
    this.bestFromEachGen = [];
    this.totalFitness = 0;
  }

  makeNewGen() {
    //save the best in generation element and log the average fitness
    let bestInGen;
    let bestFitness = 0;
    let totalFitness = 0;
    for (let i = 0; i < this.populationSize; i++) {
      if (this.population[i].fitness > bestFitness) {
        bestFitness = this.population[i].fitness;
        bestInGen = this.population[i];
      }
      totalFitness += this.population[i].fitness;
    }
    let averageFitness = totalFitness / this.populationSize;
    this.totalFitness = totalFitness;
    this.averageFitnessHistory.push(averageFitness);
    this.bestFromEachGen.push(bestInGen);
    let newPopulation = [];
    for (let i = 0; i < this.populationSize; i++) {
      //pick parent A
      let parentA = this.getRandomParent();
      let parentB = this.getRandomParent();
      let child = parentA.cross(parentB);
      //check if you want to mutate child
      if (Math.random() > this.mutationRate) {
        //this doesn't sound good lol
        child.mutate();
      }
      newPopulation.push(child);
    }
    this.population = newPopulation;
  }

  getRandomParent() {
    while (true) {
      let possibleParent = this.population[
        Math.floor(Math.random() * this.populationSize)
      ];
      let randNum = Math.random();
      if (possibleParent.fitness / this.totalFitness < randNum) {
        return possibleParent;
      }
    }
  }
}
