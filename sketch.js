var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  //Torre
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //Usuario
  ghost = createSprite(200,520);
  ghost.addImage("ghost-standing", ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

//Crear puertas
function spawnDoors(){
  //Puertas
  if(frameCount % 240 == 0){
    door = createSprite(200,-50);
    door.addImage("door", doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400))
    door.lifetime = 800;
    doorsGroup.add(door);
  
  //Banderillas
    climber = createSprite(200,10);
    climber.addImage("climber", climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
  
  //Declarar la profundidad de la spuertas y el fantasma
    ghost.depth = door.depth;
    ghost.depth += 1;

  //Sprite de bloque invisble
    invisibleBlock = createSprite(200,15);
    invisibleBlockGroup.add(invisibleBlock);
  }

}

function draw() {
  background(200);

  if(tower.y > 400){
    tower.y = height/2
  }

  //Movimiento del fantasma
  if(keyDown("space")){
    ghost.velocityY = -10;
  }

  if(keyDown("Right_arrow")){
    ghost.x = ghost.x + 3;
  }
      
  if(keyDown("Left_arrow")){
    ghost.x = ghost.x - 3;
  }

  //Gravedad
  ghost.velocityY = ghost.velocityY + 0.8;

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }

  spawnDoors();
  drawSprites();
}
