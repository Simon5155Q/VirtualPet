
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj, feeddog, foodAmount;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feeddog=createButton("Feed the dog");
  feeddog.position(600,95);
  feeddog.mousePressed(feedDog);
  feeddog.mousePressed(getTime);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  

}

function draw() {
  text("Last fed: " + hour, 200, 200);
  background(46,139,87);
  foodObj.display();

  getTime();
  
 
 

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  //foodObj.deleteFood();
  foodStock = foodStock - 1;
  database.ref('/').update({
    Food:foodS
  })

}





function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  //console.log(hour);

  var lastFedRef = database.ref("last feed");
  lastFedRef.on("value",function(data){
    hour = data.val();
  })

}

function updateTime(time){
  database.ref('/').update({
    hour:time
  });
}
