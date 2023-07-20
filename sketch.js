var sky,rocket,magic,star,jewels,meteor;
var skyImg,rocketImg,magicImg,starImg,jewelsImg,meteorImg;
var treasure = 0;
var magicG,starG,jewelsG,meteorGroup;
var edges;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
    skyImg = loadImage("background1.jpg");
    rocketImg = loadImage("rocket1.png");
    magicImg = loadImage("treasure1.png");
    starImg = loadImage("treasure2.png");
    jewelsImg = loadImage("treasure3.png");
    meteorImg = loadImage("meteor.png");
    endImg = loadImage("gameover.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    edges = createEdgeSprites();

    sky = createSprite(width/2,200);
    sky.addImage(skyImg);
    sky.scale = 2.8;
    sky.velocityY = 4;

    rocket = createSprite(70,580,25,25);
    rocket.addImage(rocketImg);
    rocket.scale = 0.08;

    magicG = new Group();
    starG = new Group();
    jewelsG = new Group();
    meteorGroup = new Group();

}

function draw() {

    if(gameState===PLAY){
        background(0);
        rocket.x = World.mouseX;

        rocket.collide(edges);

        if(sky.y > height ){
            sky.y = height/2;
        }

        createMagic();
        createStar();
        createJewels();
        createMeteor();

        if (magicG.isTouching(rocket)) {
            magicG.destroyEach();
            treasure = treasure + 10;
        }
        else if (starG.isTouching(rocket)) {
            starG.destroyEach();
            treasure = treasure + 20;
        }
        else if (jewelsG.isTouching(rocket)) {
            jewelsG.destroyEach();
            treasure = treasure + 50;
        }
        else{
            if(meteorGroup.isTouching(rocket)) {
                gameState = END
                rocket.addAnimation(endImg);
                rocket.x = 200;
                rocket.y = 300;
                rocket.scale = 0.6;

                magicG.destroyEach();
                starG.destroyEach();
                jewelsG.destroyEach();
                meteorGroup.destroyEach();

                magicG.setVelocityYEach(0);
                starG.setVelocityYEach(0);
                jewelsyG.setVelocityYEach(0);
                meteorGroup.setVelocityYEach(0);
            }
        }

        drawSprites();
        textSize(20);
        fill(255);
        text("Treasure: " + treasure,10,30);

    }
}

function createMagic() {
    if (World.frameCount % 200 == 0) {
    var magic = createSprite(Math.round(random(50, 350),40, 10, 10));
    magic.addImage(magicImg);
    magic.scale=0.12;
    magic.velocityY = 3;
    magic.lifetime = 150;
    magicG.add(magic);
    }
  }
  
  function createStar() {
    if (World.frameCount % 320 == 0) {
    var star = createSprite(Math.round(random(50, 350),40, 10, 10));
    star.addImage(starImg);
    star.scale=0.03;
    star.velocityY = 3;
    star.lifetime = 150;
    starG.add(star);
  }
  }
  
  function createJewels() {
    if (World.frameCount % 410 == 0) {
    var jewels = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewels.addImage(jewelsImg);
    jewels.scale=0.13;
    jewels.velocityY = 3;
    jewels.lifetime = 150;
    jewelsG.add(jewels);
    }
  }
  
  function createMeteor(){
    if (World.frameCount % 530 == 0) {
    var meteor = createSprite(Math.round(random(50, 350),40, 10, 10));
    meteor.addImage(meteorImg);
    meteor.scale=0.1;
    meteor.velocityY = 3;
    meteor.lifetime = 150;
    meteorGroup.add(meteor);
    }
  }
  