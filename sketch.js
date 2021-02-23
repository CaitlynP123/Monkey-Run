var PLAY = 1
var END = 0
var gameState = PLAY

var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var jungle, jungleImg

var survivalTime = 0
var score = 0

var ground

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImg = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(500, 500)

  jungle = createSprite(250,250)
  jungle.addImage("jungle",jungleImg)
    
  monkey = createSprite(150, 400)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.125
  monkey.setCollider("rectangle", 0, 0, 500, 555)

  ground = createSprite( 300, 420, 500, 10)

  FoodGroup = createGroup()
  obstacleGroup = createGroup()
  
}

function draw() {
  background("lightgray")

  
  monkey.collide(ground)
  obstacleGroup.collide(ground)  
  ground.visible= false
  
  
  if (gameState == PLAY) {
    
    survivalTime = Math.ceil(frameCount / frameRate())

    jungle.velocityX = -4
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    
    spawnFood()
    spawnRocks()
    
    if (keyDown("space")) {
      monkey.velocityY = -12 
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (monkey.isTouching(FoodGroup)){
      score = score+2
      FoodGroup.destroyEach()
      
    if(score%10==0 && score>0){
        monkey.scale = monkey.scale+0.05
        //console.log("working")
      }
      
    }
   if(monkey.isTouching(obstacleGroup)){
     gameState = END
   }
  } 
  
  if(gameState == END){
    monkey.visible = false
    survivalTime = 0
    textSize(50)
    fill("darkgrey")
    text("GAME OVER", 90, 240)
    fill("black")
    text("GAME OVER", 100, 250)
    
    textSize(25)
    fill("black")
    text("Press 'S' to Restart", 150, 300)
    
    if(keyDown("s")){
      gameState = PLAY
    }
  }
  drawSprites()
  
  stroke("black")
  textSize(20)
  fill("black")
  text("Score: " + score, 400, 25)

  stroke("black")
  textSize(20)
  fill("black")
  text("Survival Time: " + survivalTime, 10, 25)

}

function spawnFood() {
  if (frameCount % 120==0) {
    banana = createSprite(550,Math.round(random(100, 200)))
    banana.velocityX = -6
    banana.addImage("food", bananaImage)
    banana.scale = 0.125
    banana.lifetime = 125
    
    banana.depth = monkey.depth
    monkey.depth = monkey.depth+1
    
    FoodGroup.add(banana)
  }
}

function spawnRocks(){
    
  if(frameCount%300 == 0){  
    obstacle = createSprite(600,370)
    obstacle.addImage("rock", obstacleImage)
    obstacle.scale = 0.21
    obstacle.velocityX = -4
    obstacle.setCollider("circle",0,0,195)
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 125  
  }
  
}
