var robber, robberImg;
var bgImage,bg;
var coneImage, barrierImage, cone, barrier;
var policemen,policemenImg;
var policemenRunningImg
var coneGroup, barrierGroup, stopSignGroup
var speedBoost, speedBoostImg
var stopSign, stopSignImg

function preload(){
    bgImage = loadImage("road.jpeg");
    robberImg = loadAnimation("robber.png", "robber2.png","robber.png", "robber2.png", "robber.png", "robber2.png","robber.png", "robber2.png");
    policemenImg = loadImage("police.png")
    coneImage = loadImage("cone.png");
    barrierImage = loadImage("donotcross.png");
    stopSignImg = loadImage("stopSign.png")
    speedBoostImg = loadAnimation("speed1.png", "speed2.png", "speed3.png", "speed4.png", "speed1.png", "speed2.png", "speed3.png", "speed4.png");

}

function setup(){
    createCanvas(500, 700);

    bg = createSprite(250,300);
    bg.addImage(bgImage);
    bg.scale=1.9;
    bg.velocityY = 5
    
    robber = createSprite(250, 600);
    robber.addAnimation("run",robberImg);
    robber.scale = 3;
    robber.debug=false;
    robber.setCollider("circle",0,0,10);

    coneGroup = createGroup()
    barrierGroup = createGroup()
    speedBoostGroup = createGroup()
    stopSignGroup = createGroup()
    
    policemen= createSprite(robber.x, 50,30,30);
    policemen.addImage(policemenImg)

    policemen.scale = 0.25
    policemen.setCollider("circle", 0, 0, 150)


}

function draw(){
    policemen.x = robber.x
    background("black");

    
    if(robber.isTouching(coneGroup) || robber.isTouching(barrierGroup) || robber.isTouching(stopSignGroup)){
        policemen.y += 20; 
        if(robber.x > 250){
            robber.x -= 10;  
        }
        if(robber.x < 250){
            robber.x += 10
        }
    }
    
    if(robber.isTouching(speedBoostGroup)){
        policemen.y -= 10
        speedBoost.destroy()
    }

    if (bg.y > 390){
        bg.y=300;
    }

    spawnObstacles();
    spawnSpeedBoost()
    moving()
    drawSprites();
}
   
function spawnObstacles(){
    if(frameCount % 120 == 0){
        cone = createSprite(100, 40, 10, 10);
        cone.addImage(coneImage);
        cone.debug=false;
        cone.scale = 3;
        cone.velocityY = 3;
        cone.x = random(20, 470)
        coneGroup.add(cone)
            
        barrier = createSprite(500, -100, 10, 10);
        barrier.addImage(barrierImage);
        barrier.debug=false;
        barrier.scale = 4;
        barrier.velocityY = 3;
        barrier.x = random(20, 470)
        barrierGroup.add(barrier)

        stopSign = createSprite(600, -100, 10, 10);
        stopSign.addImage(stopSignImg);
        stopSign.scale = 2;
        stopSign.velocityY = 5;
        stopSign.x = random(20, 470)
        stopSignGroup.add(stopSign)
    }
    
}

function spawnSpeedBoost(){
    if(frameCount % 150 == 0){
        speedBoost = createSprite(250, 90, 10, 10)
        speedBoost.addAnimation("speedBoostImg", speedBoostImg)
        speedBoost.debug = false
        speedBoost.scale = 0.5
        speedBoost.velocityY = 2
        speedBoost.x = random(20, 470)
        speedBoostGroup.add(speedBoost)

        
    }
}


function moving(){
    if(keyDown(LEFT_ARROW)){
        robber.x -= 10
    } 
    if(keyDown(RIGHT_ARROW)){
        robber.x += 10
    }
}

