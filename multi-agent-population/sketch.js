var mainImage;
var initImage = "./mona-lisa-original.jpg";
// var initImage = "./red.png";
var imagePixels = [];

var mainPop;

function setupNewImage(imgPath){
    mainImage = loadImage(imgPath, () => {
        let w = mainImage.width;
        let h = mainImage.height;
        console.log(w, h);
        resizeCanvas(w, h);
        background(0);
        mainImage.loadPixels();
        imagePixels = mainImage.pixels
        mainPop = new Population(w, h);
        draw = () => {    
            mainPop.nextGen();
        }
    });
}

function setup(){
    let cnv = createCanvas(100, 200);
    cnv.parent("mainCanvas");
    background(0)
    setupNewImage(initImage);
}
