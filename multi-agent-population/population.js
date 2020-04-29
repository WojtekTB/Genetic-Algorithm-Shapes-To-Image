class Population{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.populationSize = 50;
        this.population = [];
        this.mutationRate = 0.05
        this.best;
        this.init();
    }

    init(){
        let bestFitness = 0;
        let bestId = 0;
        for(let i = 0; i < this.populationSize; i++){
            this.population[i] = new Element(this.width, this.height);
            this.population[i].calculateFitness();
            if(this.population[i].fitness > bestFitness){
                bestFitness = this.population[i].fitness;
                bestId = i;
            }
        }
        this.best = this.population[bestId].fitness;
        // console.log(this.best);
    }

    nextGen(){
        let bestFitness = 0;
        let bestId = 0;
        let newPopulation = [];
        for(let i = 0; i < this.populationSize; i++){
            let parentA = this.selectRandomParent();
            let parentB = this.selectRandomParent();
            newPopulation[i] = parentA.cross(parentB);
            if(Math.random() < this.mutationRate){
                newPopulation[i].mutate();
            }
            newPopulation[i].calculateFitness();
            if(newPopulation[i].fitness > bestFitness){
                bestFitness = newPopulation[i].fitness;
                bestId = i;
            }
        }
        this.best = newPopulation[bestId].fitness;
        console.log(this.best);
        this.population = newPopulation;
    }

    selectRandomParent(){
        let totalFitness = 0;
        for(let ele of this.population){
            totalFitness += ele.fitness;
        }
        let randomFitnessCap = Math.random() * totalFitness;
        let element;
        while(randomFitnessCap > 0){
            element = this.population[Math.floor(Math.random() * this.population.length)]
            randomFitnessCap -= element.fitness;
        }
        return element;
    }
}