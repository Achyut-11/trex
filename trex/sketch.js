var trex, trex_running, edges, trexCrash;
var groundImage, groundPlay, inGround;
var cactus, cactusPlay, cactus2, cactus3, cactus4, cactus5, cactus6;
var cloud, cloudplay;
var randomNum, score = 0;
var start = 0,
  end = 1;
var gameState = start;
var gameOver, gameOverPlay;
var restart, restartPlay;
var dieSound, checkPointSound, jumpSound;

function preload() {

  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");

  groundImage = loadImage("ground2.png");

  cactus = loadImage("obstacle1.png");

  cactus2 = loadImage("obstacle2.png");

  cactus3 = loadImage("obstacle3.png");

  cactus4 = loadImage("obstacle4.png");

  cactus5 = loadImage("obstacle5.png");

  cactus6 = loadImage("obstacle6.png");

  cloud = loadImage("cloud.png");

  trexCrash = loadAnimation("trex_collided.png");

  gameOver = loadImage("gameOver.png");

  restart = loadImage("restart.png");

  dieSound = loadSound("die.mp3")

  checkPointSound = loadSound("checkPoint.mp3")

  jumpSound = loadSound("jump.mp3")


}

function setup() {

  createCanvas(600, 200);

  cactusGroup = new Group()
  cloudGroup = new Group()

  inGround = createSprite(180, 190, 600, 10);
  inGround.visible = false;


  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided", trexCrash);
  //edges = createEdgeSprites();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;

  //addin ground to the game
  groundPlay = createSprite(180, 180, 600, 10);
  groundPlay.addAnimation("groundImage", groundImage);
  groundPlay.x = groundPlay.width / 2;
  

  trex.setCollider("circle", 0, 0, 30);
  //trex.debug = true

  gameOverPlay = createSprite(300, 90, 0, 0);
  gameOverPlay.addImage(gameOver);
  gameOverPlay.scale = 0.6;
  gameOverPlay.visible = false;

  restartPlay = createSprite(300, 130, 0, 0);
  restartPlay.addImage(restart);
  restartPlay.scale = 0.4;
  restartPlay.visible = false;

  trex.changeAnimation("running", trex_running);

}

function createCloud() {

  if (frameCount % 60 === 0) {
    cloudplay = createSprite(600, 50, 10, 10);
    cloudplay.addAnimation("cloud", cloud);
    cloudplay.scale = 0.6;
    cloudplay.velocityX = -6;
    cloudplay.y = Math.round(random(40, 100));
    cloudGroup.add(cloudplay);

  }

}

function createCactus() {

  if (frameCount % 60 === 0) {

    cactusPlay = createSprite(580, 165, 4, 4);
    cactusPlay.addImage(cactus);
    cactusPlay.scale = 0.7;
    cactusPlay.velocityX = -6;
    cactusGroup.add(cactusPlay);
  }
}

function draw() {

  //set background color 
  background("black");

  //logging the y position of the trex
  //console.log(trex.y)
  //jump when space key is pressedactus.scae
  //cactusplay.scale(0.5);

  if (gameState === start) {

    if (frameCount % 3 === 0) {
      score++;
    }

    groundPlay.velocityX = -6;
    if (groundPlay.x < 0) {

      groundPlay.x = groundPlay.width / 2;

    }

   if(frameCount % 100 === 0){
  checkPointSound.play()


}


    createCactus();

    createCloud();


    if (cactusGroup.isTouching(trex)) {
      groundPlay.velocityX = 0;
      cactusPlay.velocityX = 0;
      dieSound.play()
    }

    if (keyDown("space") && trex.y >= 160) {

      trex.velocityY = -10;
      jumpSound.play();

    }

    trex.velocityY = trex.velocityY + 0.5;

    //cloudplay.depth = trex.depth ; 

    trex.depth = trex.depth + 1;
    trex.setCollider("circle", 0, 0, 30);

    groundPlay.velocityX = -6;

    if (cactusGroup.isTouching(trex)) {
      gameState = end;

    }

  } else if (gameState === end) {

    groundPlay.velocityX = 0;
    cactusGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0);


    trex.changeAnimation("collided", trexCrash);

    restartPlay.visible = true;
    gameOverPlay.visible = true;

    cactusPlay.depth = trex.depth;
    trex.depth = trex.depth + 1;
    trex.setCollider("circle", 0, 0, 30);
    groundPlay.velocityX = 0


    if (mousePressedOver(restartPlay)) {
      resetGame();
    }
  }

  //stop trex from falling down
  trex.collide(inGround);

  text("score: " + score, 520, 10);
  drawSprites();
}

function resetGame(){
  score = 0;
  gameState = start;
  
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  
}