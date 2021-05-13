var PLAY = 1;
var END = 0;
var gameState = PLAY;
var scores=0;
var lives=3;
var gamestate=0;
var player;

function setup(){
//player
player = createSprite(200,360,60,10);
player.setAnimation("playerShip2_blue_1");
player.scale =0.5;
player.setCollider("rectangle",0,0,100,100);
player.debug = true;

//after player collides with obstacle
var player_collided=createSprite(mouseX,360,60,10);
player_collided.setAnimation("blast");

//background space
var space =createSprite(200,200);
space.setAnimation("space_1");
space.scale =1.7;

//restart and gameoverImg
restart = createSprite(300,140);
restart.setAnimation("restart");

gameOver = createSprite(300,100);
gameOver.setAnimation("gameOver"); 

gameOver.scale = 0.5;
restart.scale = 0.5;


var lasergroup = createGroup();
var b1group = createGroup();
var b2group = createGroup();
var ggroup = createGroup();
var rgroup = createGroup();
}

function draw() {

  player.x =World.mouseX;

    /*if gamestate is play 
    a.we need to remove from screen
    b.we need to check if the player is touching group
    */
   if(gameState === PLAY){
    
    gameOver.visible = false
    restart.visible = false
    space.velocityY =3;
    
  if(keyWentDown("space")){
  createLaser();
  gamestate=1;
  playSound("sound://category_digital/laser_fade_2.mp3");
}
    
 if(player.isTouching(b1group) || player.isTouching(b2group)||player.isTouching(ggroup)|| player.isTouching(rgroup)){
  text("done",200,200)
  restart();
  gamestate=END;
  lives=lives-1;
  score=0
  space.velocityX = 0;
 }
 else if(gameState===END){
    b1group.setLifetimeEach(-1);
    b2group.setLifetimeEach(-1);
     ggroup.setLifetimeEach(-1);
    rgroup.setLifetimeEach(-1);
    lasergroup.setLifetimeEach(-1);
     
     b1group.setVelocityXEach(0);
     b2group.setVelocityXEach(0);
     ggroup.setVelocityXEach(0);
     rgroup.setVelocityXEach(0);
     
     gameOver.visible=true;
     restart.visible=true;
     player.changeAnimation("blast", trex_collided);

     space.velocityX = 0;
     player.velocityY = 0
 }
    

if(space.y>400){
  space.y =space.height/2;
  }   



var select_enemy = Math.round(randomNumber(1,4));

if (World.frameCount % 100 ==0) { 
  if (select_enemy == 1) { 
    black();
  } 
  else if (select_enemy == 2) { 
    blue();
  } 
  else if (select_enemy == 3) { 
    green();
  } 
  else { 
    red();
  }
} 

if (lasergroup.isTouching(b1group)){
  b1group.destroyEach();
  lasergroup.destroyEach();
  score =score+1;
  playSound("sound://category_explosion/air_explode_bonus_5.mp3");
  } 

if (lasergroup.isTouching(b2group)) {
  b2group.destroyEach();
  lasergroup.destroyEach();
  score =score+2;
  playSound("sound://category_explosion/air_explode_bonus_5.mp3");
  } 
  
if (lasergroup.isTouching(ggroup)) { 
  ggroup.destroyEach(); 
  lasergroup.destroyEach();
  score =score+3;
  playSound("sound://category_explosion/air_explode_bonus_5.mp3");
  } 
  
if (lasergroup.isTouching(rgroup)) { 
  rgroup.destroyEach(); 
  lasergroup.destroyEach();
  score =score+4;
  playSound("sound://category_explosion/air_explode_bonus_5.mp3");
  
  } 

  
  if(keyDown("R")){
    gamestate=PLAY;
    player.x=World.width/2;
  }
                     

textSize(20);
 text("Live " + lives,200,200)
text("Score:"+score,300,30);
drawSprites();
}

function restart(){
  textSize(50)
  text("press R to restart");
  
}


function createLaser(){
  var laser =createSprite(200,320,100,10);  
  laser.setAnimation("laser");  
  laser.velocityY =-3;
  laser.lifetime =200;
  laser.x =player.x;
  
  lasergroup.add(laser);
  }
  
function black() {
  var eb = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
  eb.setAnimation("enemyBlack2_1"); 
  eb.velocityY = 7; 
  eb.lifetime = 150;
  eb.scale = 0.4; 
  
  b1group.add(eb);
  }

function blue() {
  var ebl = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
  ebl.setAnimation("enemyBlue2_1"); 
  ebl.velocityY = 7; 
  ebl.lifetime = 150;
  ebl.scale = 0.4; 
  
  b2group.add(ebl);
  b2group.setColliderEach("rectangle",0,0,100,100);
  }
  
  function green() {
  var eg = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
  eg.setAnimation("enemyGreen2_1"); 
  eg.velocityY =7 ; 
  eg.lifetime = 150;
  eg.scale = 0.4;
  
  ggroup.add(eg);
  ggroup.setColliderEach("rectangle",0,0,100,100);
  }
  
  function red() {
  var er = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
  er.setAnimation("enemyRed2_1"); 
  er.velocityY =7 ; 
  er.lifetime = 150;
  er.scale = 0.4; 
  
  rgroup.add(er);
  rgroup.setColliderEach("rectangle",0,0,100,100);
  }
}