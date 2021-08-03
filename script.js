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
// свои башни
class Tower1 {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.cost = 100;
    this.shooting = false;
    this.width = 100;
    this.height = 100;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
    this.kills = 0;
    this.damage = 10;
    this.firerate = 10
    this.check = 1;
    this.range = 3 * cellSize;
    this.upgradecost = 200;
  }
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25)
  }
}
canvas.addEventListener('click', function(){
  const positionX = mouse.x - (mouse.x % cellSize);
  const positionY = mouse.y - (mouse.y % cellSize);
  if (positionY < cellSize) return;
  //let flag = false;
  for (let i = 0; i < towers.length; i++){
    if (towers[i].x === positionX && towers[i].y === positionY){
      return;
    }
  }
  if (resourses >= 100){
    towers.push(new Tower1(positionX, positionY))
    resourses -= 100;
  }
});
/*canvas.addEventListener('q', function(){
  const positionX1 = mouse.x - (mouse.x % cellSize);
  const positionY1 = mouse.y - (mouse.y % cellSize);
  let current = 0;
  let flag = true;
  for (let i = 0; i < towers.length; i++){
    if (towers[i].x === positionX1 && towers[i].y === positionY1){
      current = i;
      flag = false;
    }
  }
  if (resourses < towers[current].upgradecost) return;
  if (flag) return;
  switch (towers[current].check){
    case 1:
      if(towers[current].kills >= 5){
        towers[current].damage += 2;    //цифры от балды
        towers[current].firerate -= 2;   // тут тоже
      }
      break;
  //  case 2: и так для всех башен их улучшения
  }
});*/
function handleTowers(){
  for (let i = 0; i < towers.length; i++){
    towers[i].draw();
  }
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
  ctx.fillText('Resourses: ' + resourses, 15, 60);
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


// снаряды
// ресурсы
//
function animate(){
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
  handleTowers();
  handleEnemies();
  handleInformation();
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
