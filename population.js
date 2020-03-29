class Population {
  constructor(
    populationSize,
    populationMaxDataLength,
    charSet,
    mutationRate,
    fitnessFunction
  ) {
    this.population = [];
    this.matingPool = [];
    for (let i = 0; i < populationSize; i++) {
      //createa bunch of random elements in population
      this.population.push(
        new Element(fitnessFunction, charSet, populationMaxDataLength)
      );
    }
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    //history of previous generations
    this.history = [];
    this.fitnessHistory = [];
    this.bestElementId = 0;
  }

  makeMatingPool() {
    //add more copies of some element depending on its fitness
    this.matingPool = [];
    for (let element of this.population) {
      if (Math.floor(Math.random() * 100) < this.mutationRate * 100) {
        element.mutate();
      }
      //   console.log(element);
      for (let i = 0; i < element.getFitness(); i++) {
        this.matingPool.push(element);
      }
    }
  }

  makeNewGen() {
    this.logGen();
    let highestFitness = 0;
    let newPopulation = [];
    for (let i = 0; i < this.populationSize; i++) {
      //get 2 random parents from mating pool
      let parentA = this.matingPool[
        Math.floor(Math.random() * (this.matingPool.length - 1))
      ];
      let parentB = this.matingPool[
        Math.floor(Math.random() * (this.matingPool.length - 1))
      ];
      //make a new eleemnt out of the two semi random parents
      let newElement = parentA.crossWith(parentB);
      newPopulation.push(newElement);
      if (newElement.getFitness() > highestFitness) {
        highestFitness = newElement.getFitness();
        this.bestElementId = i;
      }
      //   console.log(newElement, parentA, parentB);
    }
    this.population = newPopulation;
  }

  logGen() {
    let generationLog = this.makeGenObject();
    this.fitnessHistory.push(generationLog.averageFitness);
    this.history.push(generationLog);
  }

  makeGenObject() {
    //save current generation and record its average fitness
    let averageFitness = 0;
    let listOfAllElements = "Generation " + (this.history.length + 1) + ": \n";
    for (let i = 0; i < this.population.length; i++) {
      if (i === this.bestElementId) {
        listOfAllElements +=
          `<mark>${i + 1}) ` + this.population[i].toString() + "</mark>\n";
      } else {
        listOfAllElements +=
          `${i + 1}) ` + this.population[i].toString() + "\n";
      }
      averageFitness += this.population[i].getFitness();
    }
    averageFitness /= this.populationSize;
    //removing the last coma
    listOfAllElements = listOfAllElements.substring(
      0,
      listOfAllElements.length - 1
    );

    let generationLog = {
      datas: listOfAllElements,
      averageFitness: averageFitness
    };
    return generationLog;
  }
}
