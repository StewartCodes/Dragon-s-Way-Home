var gameState
var screenVelocity
var hillsGroup
var fireballGroup
var death


function preload(){
  dragonImg = loadImage("dragon.png");
  hillsImg = loadImage("hills.png");
  fireballImg = loadImage("Fireball.png");

  deathSound = loadSound("death.wav");
  passiveSound = loadSound("Air.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  hillsGroup = new Group();  
  fireballGroup = new Group(); 

  dragon = createSprite(150,windowHeight/2);
  dragon.addImage("dragon",dragonImg);
  dragon.scale = 0.25
  dragon.setCollider("rectangle", 0, -37.5, 1025, 225);
  dragon.debug = false;

  hills = createSprite(windowWidth - 350,windowHeight + 250);
  hills.addImage("hills",hillsImg);
  hills.scale = 0.3
  hills.lifetime = 3000
  hills.setCollider("rectangle", 0, 0, 10000, 2200);
  hills.debug = false;
  hillsGroup.add (hills)

  death = 0



passiveSound.loop()


  gameState = "playing"
  screenVelocity = -5

  edges = createEdgeSprites()
}

function draw() {
  background("lightblue");

  hills.velocityX = screenVelocity



  if (gameState === "playing"){  
    if (keyDown("Space") || keyDown("w") || keyDown("UP_ARROW")){
      dragon.y -= 5
    }

    if (keyDown("s") || keyDown("DOWN_ARROW")){
      dragon.y += 5
    }


    if (frameCount % 50 === 0){
      fireball = createSprite(windowWidth + 200, 0);
      fireball.addImage("fireball",fireballImg);
      fireball.y = Math.round(random(50, windowHeight - 100));
      fireball.scale = 0.1
      fireball.velocityX = screenVelocity
      fireball.lifetime = 3000
      fireball.setCollider("rectangle", 0, 0, 1000, 500);
      fireball.debug = false;
      fireballGroup.add (fireball)
    }

    if (hills.x < windowWidth - 150){
      hills = createSprite(windowWidth + 1500,windowHeight + 250);
      hills.addImage("hills",hillsImg);
      hills.scale = 0.3
      hills.lifetime = 3000
      hillsGroup.add (hills)
    }
  

    if (dragon.isTouching(edges[0])  || dragon.isTouching(edges[1]) || dragon.isTouching(edges[2]) || dragon.isTouching(edges[3]) || dragon.isTouching(fireballGroup) || dragon.isTouching(hillsGroup)) {
      gameState = "over"
    }
  }
  if (gameState === "over"){



    hillsGroup.setLifetimeEach(-1);
    hillsGroup.setVelocityXEach(0);
    fireballGroup.setLifetimeEach(-1);
    fireballGroup.setVelocityXEach(0);
    fill("red");
    textSize(50)
    text("Game Over", windowWidth/2.5, windowHeight/2);
    playDeath()

  }

  
  
  drawSprites()
}

function playDeath(){
  if (death === 0){
    death = 1
  deathSound.play(1)
  }
}