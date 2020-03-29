class Element {
  constructor(width, height, data) {
    this.data = [];
    this.imageWidth = width;
    this.imageHeight = height;
    if (data === undefined) {
      //if data not given, randomize data
      let maxNumberOfShapes = 100;
      let numberOfShapes = Math.floor(Math.random() * maxNumberOfShapes);
      for (let i = 0; i < numberOfShapes; i++) {
        this.data.push(this.makeRandomShape());
      }
    } else {
      this.data = data;
    }
    this.imagePixels = [];
    this.fitness = 0;
    this.calculateFitness();
  }

  getFitness() {
    return this.fitness;
  }

  calculateFitness() {
    this.show();
    //load pixels of canvas to pixels[] array
    loadPixels();
    let maximumError = 255 * 3 * (this.imageWidth * this.imageHeight);
    let difference = 0;

    /**
     * this way of counting difference between pixels is not ideal because it assumes
     * that it assumes that the image we compare to is to the right and is the same width and height.
     * I might benefit from restructuring the system not around p5js but at this point I think this is the
     * easiest and the most practical way
     */
    for (let y = 0; y < this.imageHeight; y++) {
      for (let x = 0; x < this.imageWidth; x++) {
        let pixelGuess = y * this.imageWidth * 2 * 4 + x * 4;
        let pixelCheck =
          y * this.imageWidth * 2 * 4 + x * 4 + this.imageWidth * 4;
        for (let i = 0; i < 3; i++) {
          difference += Math.abs(
            pixels[pixelGuess + i] - pixels[pixelCheck + i]
          );
        }
      }
    }

    let fitness = map(maximumError - difference, 0, maximumError, 0, 10); //normalize it between 0 and 1
    this.fitness = Math.pow(fitness, 2); //I decided to square fitness because I want to emphesize the small imprevements
  }

  show() {
    background(0);
    noStroke();
    for (let shape of this.data) {
      fill(shape.R, shape.G, shape.B, shape.A);
      translate(shape.x, shape.y);
      rotate(shape.rotation * (3.14 / 180)); //convert degrees to radiants
      if (shape.shapeType == 0) {
        rect(0, 0, shape.magnitude, shape.magnitude);
      } else if (shape.shapeType == 1) {
        triangle(
          0,
          0,
          -shape.magnitude,
          shape.magnitude,
          shape.magnitude,
          shape.magnitude
        );
      } else if (shape.shapeType == 2) {
        circle(0, 0, shape.magnitude);
      }
      rotate(-shape.rotation * (3.14 / 180));
      translate(-shape.x, -shape.y);
    }
    image(imageToGuess, this.imageWidth, 0, this.imageWidth, this.imageHeight);
    // image(imageToGuess, 0, 0, this.imageWidth, this.imageHeight);
  }

  outlineShapes() {
    noFill();
    stroke(255, 0, 0);
    for (let shape of this.data) {
      fill(shape.R, shape.G, shape.B, shape.A);
      translate(shape.x, shape.y);
      rotate(shape.rotation * (3.14 / 180)); //convert degrees to radiants
      if (shape.shapeType == 0) {
        rect(0, 0, shape.magnitude, shape.magnitude);
      } else if (shape.shapeType == 1) {
        triangle(
          0,
          0,
          -shape.magnitude,
          shape.magnitude,
          shape.magnitude,
          shape.magnitude
        );
      } else if (shape.shapeType == 2) {
        circle(0, 0, shape.magnitude);
      }
      rotate(-shape.rotation * (3.14 / 180));
      translate(-shape.x, -shape.y);
    }
    image(imageToGuess, this.imageWidth, 0, this.imageWidth, this.imageHeight);
  }

  makeRandomShape() {
    /**
     * 3 types of different shapes 0: rectangle, 1: triangle, 2:circle
     * Then magnitude of shape (how big it is) from 1 to 50(? max magnitude to be determined)
     * Then X, then Y of shape
     * then rotation of the shape
     * then R,G,B of the shape
     *
     * thus DNA will come in a set of 8 numbers
     */
    let newShape = {
      shapeType: Math.floor(Math.random() * 3),
      magnitude: Math.floor(Math.random() * 25) + 25,
      x: Math.floor(Math.random() * this.imageWidth),
      y: Math.floor(Math.random() * this.imageHeight),
      rotation: Math.floor(Math.random() * 359),
      R: Math.floor(Math.random() * 255),
      G: Math.floor(Math.random() * 255),
      B: Math.floor(Math.random() * 255),
      A: Math.floor(Math.random() * 155) + 100
    };
    return newShape;
  }

  cross(element) {
    let r = Math.random();
    let parentA;
    let parentB;
    if (r > 0.5) {
      parentA = this;
      parentB = element;
    } else {
      parentA = element;
      parentB = this;
    }
    let smallerLength =
      parentA.data.length < parentB.data.length
        ? parentA.data.length
        : parentB.data.length;
    let childData = [];
    for (let i = 0; i < smallerLength; i++) {
      let r = Math.random();
      if (r > 0.5) {
        childData.push(parentA.data[i]);
      } else {
        childData.push(parentB.data[i]);
      }
    }
    return new Element(this.imageWidth, this.imageHeight, childData);
  }

  mutate() {
    let mutationId = Math.floor(Math.random() * this.data.length + 3);
    if (mutationId >= this.data.length) {
      this.data.push(this.makeRandomShape());
      return;
    }
    let r = Math.floor(Math.random() * 6);

    if (r < 1) {
      this.data[mutationId].magnitude += map(Math.random(), 0, 1, -0.5, 0.5);
    } else if (r < 2) {
      this.data[mutationId].x += map(Math.random(), 0, 1, -1, 1);
    } else if (r < 3) {
      this.data[mutationId].y += map(Math.random(), 0, 1, -1, 1);
    } else if (r < 4) {
      this.data[mutationId].rotation += map(Math.random(), 0, 1, -1, 1);
    } else if (r < 5) {
      this.data[mutationId].R += map(Math.random(), 0, 1, -1, 1);
      this.data[mutationId].G += map(Math.random(), 0, 1, -1, 1);
      this.data[mutationId].B += map(Math.random(), 0, 1, -1, 1);
    } else if (r < 6) {
      this.data[mutationId].A += map(Math.random(), 0, 1, -1, 1);
    }
  }
}
