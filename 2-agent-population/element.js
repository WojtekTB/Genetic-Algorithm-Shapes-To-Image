class Element {
  constructor(width, height, data = undefined, startRandomShapes = 1, shouldMutateOnlyExisting = false) {
    this.data = [];
    this.imageWidth = width;
    this.imageHeight = height;
    this.shouldMutateOnlyExisting = shouldMutateOnlyExisting;
    if (data === undefined) {
      //if data not given, randomize data
      // let maxNumberOfShapes = 10;
      // let numberOfShapes = Math.floor(Math.random() * maxNumberOfShapes) + 3;
      console.log("data not given");
      for (let i = 0; i < startRandomShapes; i++) {
        this.data = this.data.concat(this.makeRandomShape());
      }
    } else {
      this.data = data;
    }
    this.fitness = 0;
  }

  getFitness() {
    return this.fitness;
  }

  calculateFitness() {
    this.show();
    // Assume loadPixels() updates a Uint8ClampedArray named pixels
    loadPixels();
    let maximumError = 255 * 3 * (this.imageWidth * this.imageHeight);
    let difference = 0;

    const generatedImagePixels = pixels;
    const realImagePixels = imagePixels;

    // Loop unrolling example: process 8 pixels per iteration
    for (let i = 0; i < generatedImagePixels.length; i += 32) { // 8 pixels * 4 values per pixel
      for (let j = 0; j < 32; j += 4) {
        const rDiff = Math.abs(generatedImagePixels[i + j] - realImagePixels[i + j]);
        const gDiff = Math.abs(generatedImagePixels[i + j + 1] - realImagePixels[i + j + 1]);
        const bDiff = Math.abs(generatedImagePixels[i + j + 2] - realImagePixels[i + j + 2]);
        difference += rDiff + gDiff + bDiff;
      }
    }

    this.fitness = 100 - (difference / maximumError) * 100;
  }

  show() {
    push();
    background(0);
    noStroke();

    // Precompute rotation in radians
    const toRadians = Math.PI / 180;

    for (let i = 0; i < this.data.length; i += 9) {
      let shapeType = this.data[i];
      let magnitude = this.data[i + 1];
      let x = this.data[i + 2];
      let y = this.data[i + 3];
      let rotation = this.data[i + 4] * toRadians;
      let R = this.data[i + 5];
      let G = this.data[i + 6];
      let B = this.data[i + 7];
      let A = this.data[i + 8];

      fill(R, G, B, A);
      push(); // Save the current transformation state
      translate(x, y);
      rotate(rotation);

      switch (shapeType) {
        case 0: // Rectangle
          rect(0, 0, magnitude, magnitude);
          break;
        case 1: // Triangle
          triangle(0, 0, -magnitude, magnitude, magnitude, magnitude);
          break;
        case 2: // Circle
          circle(0, 0, magnitude);
          break;
      }

      pop(); // Restore the previous transformation state
    }
    pop();
  }


  outlineShapes() {
    background(0);
    noFill();
    stroke(255, 0, 0);
    for (let i = 0; i < this.data.length; i += 9) {
      let shape = {
        shapeType: this.data[i],
        magnitude: this.data[i + 1],
        x: this.data[i + 2],
        y: this.data[i + 3],
        rotation: this.data[i + 4],
        R: this.data[i + 5],
        G: this.data[i + 6],
        B: this.data[i + 7],
        A: this.data[i + 8]
      };
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
    // let newShape = {
    //   shapeType: Math.floor(Math.random() * 3),
    //   magnitude: Math.floor(Math.random() * 50) + 1,
    //   x: Math.floor(Math.random() * this.imageWidth),
    //   y: Math.floor(Math.random() * this.imageHeight),
    //   rotation: Math.floor(Math.random() * 359),
    //   R: Math.floor(Math.random() * 255),
    //   G: Math.floor(Math.random() * 255),
    //   B: Math.floor(Math.random() * 255),
    //   A: Math.floor(Math.random() * 255)
    // };
    return [
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * this.imageWidth) + 1,
      Math.floor(Math.random() * this.imageWidth),
      Math.floor(Math.random() * this.imageHeight),
      Math.floor(Math.random() * 359),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ];
  }

  mutate() {
    if (this.shouldMutateOnlyExisting || this.data.length > 9 * 1000) {
      this.mutateOnlyExisting(5 * Math.random());
    }
    else {
      let r = Math.random();
      if (r < 0.33 && this.data.length > 2 * 9) {
        let mutationId = Math.floor(Math.random() * (this.data.length / 9));
        this.data.splice(mutationId * 9, 9);
      } else if (r < 0.66) {
        this.data = this.data.concat(this.makeRandomShape());
      } else {
        this.mutateOnlyExisting();
      }
    }
  }

  mutateOnlyExisting(numberOfShapes = 1) {
    for (let n = 0; n < numberOfShapes; n++) {
      let mutationId = Math.floor(Math.random() * (this.data.length / 9)) * 9; // Calculate the start index directly
      let newShape = this.makeRandomShape();
      for (let i = 0; i < 9; i++) {
        this.data[mutationId + i] = newShape[i];
      }
    }
  }
}
