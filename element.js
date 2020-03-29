class Element {
  constructor(width, height, data) {
    this.data = [];
    this.imageWidth = width;
    this.imageHeight = height;
    if (data === undefined) {
      //if data not given, randomize data
      let maxNumberOfShapes = 80;
      let numberOfShapes = Math.floor(Math.random() * maxNumberOfShapes) + 20;
      for (let i = 0; i < numberOfShapes; i++) {
        this.data.push(this.makeRandomShape());
      }
    } else {
      this.data = data;
    }
    this.imagePixels = [];
    this.fitness = 0;
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

    for (let i = 0; i < imagePixels.length; i += 4) {
      let r = i;
      let g = i + 1;
      let b = 1 + 2;

      let deltaR = Math.abs(pixels[r] - imagePixels[r]);
      let deltaG = Math.abs(pixels[g] - imagePixels[g]);
      let deltaB = Math.abs(pixels[b] - imagePixels[b]);
      difference += deltaR + deltaG + deltaB;
    }

    let fitness = 1 - difference / maximumError; //normalize it between 0 and 1
    this.fitness = fitness; //I decided to square fitness because I want to emphesize the small imprevements
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
    // image(imageToGuess, this.imageWidth, 0, this.imageWidth, this.imageHeight);
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
      magnitude: Math.floor(Math.random() * 50) + 1,
      x: Math.floor(Math.random() * this.imageWidth),
      y: Math.floor(Math.random() * this.imageHeight),
      rotation: Math.floor(Math.random() * 359),
      R: Math.floor(Math.random() * 255),
      G: Math.floor(Math.random() * 255),
      B: Math.floor(Math.random() * 255),
      A: Math.floor(Math.random() * 255)
    };
    return newShape;
  }

  cross(element) {
    // let r = Math.random();
    // let parentA;
    // let parentB;
    // if (r > 0.5) {
    //   parentA = this;
    //   parentB = element;
    // } else {
    //   parentA = element;
    //   parentB = this;
    // }
    // let smallerLength =
    //   parentA.data.length < parentB.data.length
    //     ? parentA.data.length
    //     : parentB.data.length;
    // let childData = [];
    // for (let i = 0; i < smallerLength; i++) {
    //   let r = Math.random();
    //   if (r > 0.5) {
    //     childData.push(parentA.data[i]);
    //   } else {
    //     childData.push(parentB.data[i]);
    //   }
    // }
    // return new Element(this.imageWidth, this.imageHeight, childData);

    let r1 = Math.random();
    let r2 = Math.random();

    let parentASnip = this.data.slice(0, Math.floor(r1 * this.data.length));
    let parentBSnip = element.data.slice(
      Math.floor(r2 * element.data.length - 1),
      element.data.length
    );
    let childData = parentASnip.concat(parentBSnip);
    return new Element(this.imageWidth, this.imageHeight, childData);
  }

  mutate() {
    let mutationId = Math.floor(Math.random() * this.data.length);
    if (mutationId > this.data.length) {
      this.data.push(this.makeRandomShape());
    } else {
      this.data[mutationId] = this.makeRandomShape();
    }
  }
}
