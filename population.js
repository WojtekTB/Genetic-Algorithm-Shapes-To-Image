class Population {
  constructor(populationSize, mutationRate, width, height) {
    this.population = [];
    this.width = width;
    this.height = height;
    for (let i = 0; i < populationSize; i++) {
      //createa bunch of random elements in population
      let newElem = new Element(this.width, this.height);
      newElem.calculateFitness();
      this.population.push(newElem);
    }
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    //history of previous generations
    this.averageFitnessHistory = [];
    this.bestFromEachGen = [];
    this.totalFitness = 0;
    this.genNumber = 0;
    this.ranks = [];
    // this.makeRanks();
  }

  makeRanks() {
    let numInRanks = Math.floor(this.populationSize * 0.1);
    this.ranks = [];
    let highest = [];
    while (this.ranks.length < numInRanks) {
      let fitnessOfHigherst = -1;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > fitnessOfHigherst) {
          fitnessOfHigherst = this.population[i].fitness;
          highest.push(this.population[i]);
          if (highest < numInRanks) {
            highest.splice(0, 1);
          }
        }
      }
      this.ranks = highest;
    }
  }

  makeNewGen() {
    //save the best in generation element and log the average fitness
    let bestInGen;
    let bestFitness = 0;
    let totalFitness = 0;
    for (let i = 0; i < this.populationSize - 1; i++) {
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
      // this.makeRanks();
      // let parentA = this.getParentFromRanks();
      // let parentB = this.getParentFromRanks();
      let child = parentA.cross(parentB);
      //check if you want to mutate child
      if (Math.random() > this.mutationRate) {
        //this doesn't sound good lol
        child.mutate();
      }
      newPopulation.push(child);
    }
    this.population = newPopulation;
    this.genNumber++;
  }

  getParentFromRanks() {
    let id = Math.floor(Math.random() * this.ranks.length);
    return this.ranks[id];
  }

  getRandomParent() {
    let Sum = 1;
    let r = Math.random();
    for (let i = 0; i < this.population.length; i++) {
      Sum -= this.population[i].fitness / this.totalFitness;
      if (r >= Sum) {
        return this.population[i];
      }
    }
  }
}
