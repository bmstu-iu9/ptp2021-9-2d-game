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
let interval = 600 * 1; // GGGGGGGGGGGGGGgg
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
//import vec2 from 'gl-matrix';
//import vec2 from 'gl-matrix';
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

class BaseTower {
    //import vec2 from 'gl-matrix';
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    //this.projectiles = [];
    this.timer = 0;
    this.kills = 0;
    this.direction = 0;
    this.elite = 0;
    //this.directionVec = vec2.create();
    this.target = null;
    this.targetIndex = -1;
    this.range = 300;
    }

    findTarget(enemies) {
        if (this.target !== null) {
        //  let enemy = enemies[this.targetIndex];
            if (
                calculateDistance(this.x, this.y, this.target.x, this.target.y) > this.range && enemy.x - 100 < this.x) { /// новое условие
                return;
            }
        }

        let nearestEnemyId = -1;
        let minDistance = this.range;

        for (let i = 0, n = enemies.length; i < n; i++) {
            let enemy = enemies[i];
            let distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);
//
            if (distance < minDistance && enemy.x - 100 > this.x ) { //новое условие
                nearestEnemyId = i;
                minDistance = distance;
            }
        }

        if (nearestEnemyId !== -1) {
            this.targetIndex = nearestEnemyId;
            this.target = enemies[nearestEnemyId];
        }

        return this.target;
    }

    drawRotated(image, angle) {
        if (!image) return;
        context.save();
        context.translate(this.x + image.width/2, this.y + image.height/2);
        context.rotate(angle * (Math.PI / 180));
        context.drawImage(image, -image.width/2, -image.height/2);
        context.restore();
    }
}

class Tower1 extends BaseTower {
    constructor(x, y) {
        super(x, y);
        //this.ctx = ctx;
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 600;
        this.elite = 0;
        this.lastShotTime = new Date();
        this.shootInterval = 1000;
    }

    step() {
    /*  if (new Date - this.lastShotTime >= this.shootInterval) {
          this.shoot();
          this.lastShotTime = new Date();
      }*/
        let target = this.findTarget(enemies);
        if (!target) return;

        let newDirection = Math.atan2(target.y - this.y, target.x - this.x);
        newDirection = newDirection * (180 / Math.PI);
        let image = undefined;
        //this.drawRotated(image, newDirection - this.direction);
        this.direction = newDirection;

        if (new Date - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = new Date();
        }
      /*  this.timer++;
        console.log(this.timer)
        if (this.timer % 100 === 0){
          this.shoot();
        }*/
    }

    shoot() {
        // Добавление в массив снарядов новый объект класса снаряда

      projectiles.push(new Projectile1(
        this,
        this.target,
        this.x + 55,          // число чтоб из центра вылетало
        this.y + 55
      ))
    //  console.log(projectiles.length);
    }

    drawelite(){
      this.step();
      ctx.clearRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'red';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25)
    }

    draw() {
        this.step();
      //  ctx = this.ctx;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
    }
}
//f

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
  //console.log(resourses);
});
canvas.addEventListener('dblclick', function(){
  const positionX1 = mouse.x - (mouse.x % cellSize);
  const positionY1 = mouse.y - (mouse.y % cellSize);
  let current = 0;
  let flag = true;
//  console.log(flag);
  for (let i = 0; i < towers.length; i++){
    if (towers[i].x === positionX1 && towers[i].y === positionY1 && towers[i].elite === 0){
      current = i;
      flag = false;
    }
  }
//  console.log(flag);
  if (flag) return;
  if (resourses < towers[current].upgradecost) return;
  if (flag) return;
  switch (towers[current].check){
    case 1:
      if(towers[current].kills >= 5){
        towers[current].damage += 2;    //цифры от балды
        towers[current].firerate -= 2;
        towers[current].elite = 1;// тут тоже
        //console.log(towers[current].damage);
        resourses -= towers[current].upgradecost;
      }
      break;
  //  case 2: и так для всех башен их улучшения
  }
});
function handleTowers(){
  for (let i = 0; i < towers.length; i++){
  //  towers[i].shoot();
  //  towers[i].draw();
    //console.log(towers.length);
    if (towers[i].elite === 0) towers[i].draw();
    if (towers[i].elite === 1) towers[i].drawelite();
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
    if (interval > 120) interval-= 50 / 10; // GGGGGGGGGGGGGGGGGGGGGG
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
class Projectile1 {
  constructor(tower, target, x, y){ //
    this.tower = tower;
    this.towerx = x;
    this.towery = y;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.speed = 5; //!!! Надо договориться о скорости
    this.movement = this.speed;
    this.health = true;
    this.damage = 10; //!!! Нада договориться про урон снаряда
    this.radius = 10;
    this.target = target;
    this.angle = 0;
  }
  update() {
    if (this.tower.target === this.target) {
      this.angle = Math.acos(((-this.towerx + (this.target.x + 55)) + 0 * (- this.towery + (this.target.y + 55))) /
                              (
                               Math.sqrt(Math.pow((-this.towerx + (this.target.x + 55)), 2) + Math.pow((- this.towery + (this.target.y + 55)), 2)) *
                               Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2))
                              )
                            );
    } else {
      this.health = true;
    }

    this.x += this.movement * Math.cos(this.angle); //!!! Надо договорить о формуле для изменения
                            // координат пули и куда стрелять !!!!!
    if (this.towery > this.target.y + 55) {
      this.y += this.movement * Math.sin(this.angle) * -1;
    } else {
      this.y += this.movement * Math.sin(this.angle);
    }

  }
  draw() {

     /*
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    */
    /*
    let angle = Math.acos((this.x * this.y + this.target.x * this.target.x) /
                            (
                             Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) *
                             Math.sqrt(Math.pow(this.target.x, 2) + Math.pow(this.target.x, 2))
                            )
                          );
    */
    // Рисую овал для пули
    if (this.health == true) {
      ctx.beginPath();
      ctx.save(); // сохраняем стейт контекста
      ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
      //ctx.rotate(this.angle); // поворот на угол

      if (this.towery > this.target.y + 55) {
        ctx.rotate(-this.angle);
      } else {
        ctx.rotate(this.angle);
      }
      ctx.scale(1, this.height/this.width); // сжимаем по вертикали
      ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
      ctx.fill();
      ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
      ctx.strokeStyle = 'red';
      ctx.stroke(); // обводим
      ctx.closePath();
    }

  }
}


class Projectile2 {
  constructor(target, x, y){ //
    this.towerx = x;
    this.towery = y;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.speed = 5; //!!! Надо договориться о скорости
    this.movement = this.speed;
    this.health = true;
    this.damage = 10; //!!! Нада договориться про урон снаряда
    this.radius = 10;
    this.target = target;
    this.angle = 0;
  }
  update() {
    if (true) {
      this.angle = Math.acos(((-this.towerx + (this.target.x + 55)) + 0 * (- this.towery + (this.target.y + 55))) /
                              (
                               Math.sqrt(Math.pow((-this.towerx + (this.target.x + 55)), 2) + Math.pow((- this.towery + (this.target.y + 55)), 2)) *
                               Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2))
                              )
                            );
    } else {
      this.health = false;
    }

    this.x += this.movement * Math.cos(this.angle); //!!! Надо договорить о формуле для изменения
                            // координат пули и куда стрелять !!!!!
    if (this.towery > this.target.y + 55) {
      this.y += this.movement * Math.sin(this.angle) * -1;
    } else {
      this.y += this.movement * Math.sin(this.angle);
    }

  }
  draw() {

     /*
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    */
    /*
    let angle = Math.acos((this.x * this.y + this.target.x * this.target.x) /
                            (
                             Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) *
                             Math.sqrt(Math.pow(this.target.x, 2) + Math.pow(this.target.x, 2))
                            )
                          );
    */
    // Рисую овал для пули
    if (this.health == true) {
      ctx.beginPath();
      ctx.save(); // сохраняем стейт контекста
      ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
      //ctx.rotate(this.angle); // поворот на угол

      if (this.towery > this.target.y + 55) {
        ctx.rotate(-this.angle);
      } else {
        ctx.rotate(this.angle);
      }
      ctx.scale(1, this.height/this.width); // сжимаем по вертикали
      ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
      ctx.fill();
      ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
      ctx.strokeStyle = 'red';
      ctx.stroke(); // обводим
      ctx.closePath();
    }

  }
}

class Projectile3 {
  constructor(target, x, y){ //
    this.towerx = x;
    this.towery = y;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.speed = 5; //!!! Надо договориться о скорости
    this.movement = this.speed;
    this.health = true;
    this.damage = 10; //!!! Нада договориться про урон снаряда
    this.radius = 10;
    this.target = target;
    this.angle = 0;
  }
  update() {
    if (true) {
      this.angle = Math.acos(((-this.towerx + (this.target.x + 55)) + 0 * (- this.towery + (this.target.y + 55))) /
                              (
                               Math.sqrt(Math.pow((-this.towerx + (this.target.x + 55)), 2) + Math.pow((- this.towery + (this.target.y + 55)), 2)) *
                               Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2))
                              )
                            );
    } else {
      this.health = false;
    }

    this.x += this.movement * Math.cos(this.angle); //!!! Надо договорить о формуле для изменения
                            // координат пули и куда стрелять !!!!!
    if (this.towery > this.target.y + 55) {
      this.y += this.movement * Math.sin(this.angle) * -1;
    } else {
      this.y += this.movement * Math.sin(this.angle);
    }

  }
  draw() {

     /*
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    */
    /*
    let angle = Math.acos((this.x * this.y + this.target.x * this.target.x) /
                            (
                             Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) *
                             Math.sqrt(Math.pow(this.target.x, 2) + Math.pow(this.target.x, 2))
                            )
                          );
    */
    // Рисую овал для пули
    if (this.health == true) {
      ctx.beginPath();
      ctx.save(); // сохраняем стейт контекста
      ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
      //ctx.rotate(this.angle); // поворот на угол

      if (this.towery > this.target.y + 55) {
        ctx.rotate(-this.angle);
      } else {
        ctx.rotate(this.angle);
      }
      ctx.scale(1, this.height/this.width); // сжимаем по вертикали
      ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
      ctx.fill();
      ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
      ctx.strokeStyle = 'red';
      ctx.stroke(); // обводим
      ctx.closePath();
    }

  }
}


function draw_Projectiles() {

  for (let i = 0; i < projectiles.length; i++){
    //let projectile = projectiles.shift();
    projectiles[i].update();
    projectiles[i].draw();
  //  console.log(projectiles.length);
    if (projectiles[i].x > canvas.width - 100  || projectiles[i].y > canvas.height || projectiles[i].y < 100  ){
      console.log(projectiles.length);
      projectiles.splice(i, 1);
      i--;
      //projectile.health = false;
    }

    //if (projectile.health == true){
  //    projectiles.push(projectile);
    //}
  }

//  return list_projectiles;
}
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
  //draw_Projectiles();
  handleTowers();
  handleEnemies();
  handleInformation();
  draw_Projectiles();
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
