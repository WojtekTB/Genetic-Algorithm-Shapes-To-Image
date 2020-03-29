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

  calculateFitness() {
    this.show();
    //load pixels of canvas to pixels[] array
    loadPixels();
    this.updateElementPixels();
    let maximumError = 255 * 3 * this.imageWidth * this.imageHeight;
    let difference = 0;
    //this way of counting difference between pixels is not ideal because it
    //assumes that it assumes that the image we compare to is to the right and is the same width and height
    for (let y = 0; y < this.imageHeight; y++) {
      for (let x = 0; x < this.imageWidth * 4; x++) {
        let pixelId = y * this.imageWidth * 2 * 4 + x;
        let comparedPixelId = y * this.imageWidth * 2 * 4 + x + this.imageWidth;
        difference += Math.abs(pixels[pixelId] - pixels[comparedPixelId]);
      }
    }
    let fitness = maximumError - difference;
    this.fitness = fitness;
  }

  show() {
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
  }

  drawShapeFromData(index) {
    let shape = this.data[index];
    // fill(shape.R, shape.G, shape.B, shape.A);

    noFill();
    stroke(255, 0, 0);
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
}
