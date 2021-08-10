import 'task.js';
import 'Towers./BaseTower.js';
import 'Towers/Tower1.js';
import 'Towers/Tower2.js';
import 'Towers/Tower3.js';
import 'Towers/Tower4.js';
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 3000;
canvas.height = 800;

// всякая хрень глобальная
const gameGrid = [];
const cellSize = 100;
const towers = [];
const units = [];
const enemies = [];
const projectiles = [];
const left = 0;
let frame = 0;
let interval = 600;
let enemydamage = 10;
let enemyfirerate = 10;
let resourses = 300;
let gameover = false;
// мышка
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
  clicked: false
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(){
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.addEventListener('mousedown', function(){
  mouse.clicked = true;
});
canvas.addEventListener('mouseup', function(){
  mouse.clicked = false;
});
// свои башни
//import vec2 from 'gl-matrix';
//import vec2 from 'gl-matrix';
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}


/*function handleSamples(){
  ctx.fillRect()
}*/
// свои юниты
/*class Units {
  constructor(verticalPosition){
    this.x = 0;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = Math.random() * 0.2 + 0.4;
  }
}*/

// враги
class Enemies {
  constructor(verticalPosition){
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.damage = enemydamage;
    this.firerate = enemyfirerate;
    this.maxHealth = this.health;
  }
  update(){
    this.x -= this.movement;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25)
  }
}
function handleEnemies(){
  for (let i = 0; i < projectiles.length; i++){
    if (collision(projectiles[i].target, projectiles[i])){

    }
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].update();
    enemies[i].draw();
  }
  if (frame % interval === 0){
    let verticalPosition = Math.floor(Math.random() * 7 + 1) * cellSize;
    enemies.push(new Enemies(verticalPosition));
    if (interval > 120) interval-= 50;
  }
  if (frame % 2000 === 0 && frame > 0){
    enemydamage += (frame / 1000);
  }
}
// игровое поле
function handleInformation(){
  ctx.fillStyle = 'black';
  ctx.font = '35px Orbitron';
  ctx.fillText('Resourses: ' + resourses, 415, 60);
  if (gameover && mybase.health <= 0){
    ctx.fillStyle = 'red';
    ctx.font = '60px Orbitron';
    ctx.fillText('YOU LOSE', 250, 330)
  }
  if (gameover && enemybase.health <= 0){
    ctx.fillStyle = 'green';
    ctx.font = '60px Orbitron';
    ctx.fillText('YOU WIN', 250, 330)
  }
}

const controlsBar = {
  width: canvas.width,
  height: 100,
}

class myBase {
  constructor(){
    this.health = 10000;
  }
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(0,cellSize,100, 700);
  }
}

const mybase = new myBase();

class enemyBase {
  constructor(){
    this.health = 10000;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - cellSize,cellSize,100, 700);
  }
}

const enemybase = new enemyBase();

class Cell {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
  }
  draw(){
    if (mouse.x && mouse.y && collisiondetection(this, mouse)){
      ctx.strokeStyle = 'black';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
function createGrid(){
  for (let y = cellSize; y < canvas.height; y += cellSize){
    for (let x = 0; x < canvas.width; x += cellSize){
      gameGrid.push(new Cell(x, y));
    }
  }
}
createGrid();
function handleGameGrid(){
  for (let i = 0; i < gameGrid.length; i++){
    gameGrid[i].draw();
  }
}

window.onkeydown = function move_left(){
  if(event.keyCode==38){
    left=left-10;
    document.getElementById('canvas1').style.left = left + 'px';
  }
  else if(event.keyCode==40){
    left=left+10;
    document.getElementById('canvas1').style.left = left + 'px';
  }
  canvasPosition = canvas.getBoundingClientRect();
};


const card1 = {
  x: 10,
  y: 10,
  width: 70,
  height: 85,
}

const card2 = {
  x: 90,
  y: 10,
  width: 70,
  height: 85,
}

const card3 = {
  x: 170,
  y: 10,
  width: 70,
  height: 85,
}

const card4 = {
  x: 250,
  y: 10,
  width: 70,
  height: 85,
}

const card5 = {
  x: 330,
  y: 10,
  width: 70,
  height: 85,
}

let choosentower = 1;
let card1stroke = 'black';
let card2stroke = 'black';
let card3stroke = 'black';
let card4stroke = 'black';
let card5stroke = 'black';  // чтобы все что ниже работало, надо в при создании башен смотреть на переменную chosentower

function choosetowers(){
  ctx.lineWidth = 1;
  if (collisiondetection(mouse, card1) && mouse.clicked){
    choosentower = 1;
  } else if (collisiondetection(mouse,card2) && mouse.clicked){
    choosentower = 2;
  } else if (collisiondetection(mouse,card3) && mouse.clicked){
    choosentower = 3;
  } else if (collisiondetection(mouse,card4) && mouse.clicked){
    choosentower = 4;
  } else if (collisiondetection(mouse,card5) && mouse.clicked){
    choosentower = 5;
  }
  switch (choosentower) {
    case 1:
      card1stroke = 'gold';
      card2stroke = 'black';
      card3stroke = 'black';
      card4stroke = 'black';
      card5stroke = 'black';
      break;
   case 2:
     card1stroke = 'black';
     card2stroke = 'gold';
     card3stroke = 'black';
     card4stroke = 'black';
     card5stroke = 'black';
     break;
   case 3:
     card1stroke = 'black';
     card2stroke = 'black';
     card3stroke = 'gold';
     card4stroke = 'black';
     card5stroke = 'black';
     break;
   case 4:
     card1stroke = 'black';
     card2stroke = 'black';
     card3stroke = 'black';
     card4stroke = 'gold';
     card5stroke = 'black';
     break;
   case 5:
     card1stroke = 'black';
     card2stroke = 'black';
     card3stroke = 'black';
     card4stroke = 'black';
     card5stroke = 'gold';
     break;
    default:
    card1stroke = 'black';
    card2stroke = 'black';
    card3stroke = 'black';
    card4stroke = 'black';
    card5stroke = 'black';

  }
  ctx.fillStyle = 'green';
  ctx.fillRect(15,15, 60, 75);
  ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
  ctx.strokeStyle = card1stroke;
  ctx.strokeRect(card1.x, card1.y, card1.width,card1.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(95,15, 60, 75);
  ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
  ctx.strokeStyle = card2stroke;
  ctx.strokeRect(card2.x, card2.y, card2.width,card2.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(175,15, 60, 75);
  ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
  ctx.strokeStyle = card3stroke;
  ctx.strokeRect(card3.x, card3.y, card3.width,card3.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(255,15, 60, 75);
  ctx.fillRect(card4.x, card4.y, card4.width, card4.height);
  ctx.strokeStyle = card4stroke;
  ctx.strokeRect(card4.x, card4.y, card4.width,card4.height);
  ctx.fillStyle = 'purple';
  ctx.fillRect(335,15, 60, 75);
  ctx.fillRect(card5.x, card5.y, card5.width, card5.height);
  ctx.strokeStyle = card5stroke;
  ctx.strokeRect(card5.x, card5.y, card5.width,card5.height);
}

// снаряды
// ресурсы
//
class Game {

}
function animate(){
//  choosetowers();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'grey';
  if (frame % 100 === 0 && frame > 0){
    resourses += 10;
  }
  ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
  mybase.draw();
  enemybase.draw();
  ctx.fillStyle = 'white';
  ctx.font = '26px Orbitron'
  ctx.fillText(Math.floor(10000), 2, 150);
  ctx.fillText(Math.floor(10000), canvas.width - 100, 150);
  handleGameGrid();
  //draw_Projectiles();
  //handleTowers();
  //handleEnemies();
  choosetowers();
  handleInformation();
//  draw_Projectiles();
  frame++;
  if (!gameover) requestAnimationFrame(animate);
}
animate();

function collisiondetection(first,second){
  if (!(first.y + first.height < second.y ||
     second.y + second.height < first.y ||
     first.x + first.width < second.x ||
     second.x + second.width < first.x)) {
    return true;
  };
};
