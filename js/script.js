import './task.js';
import './Towers/BaseTower.js';
import './Towers/Tower1.js';
import './Towers/Tower2.js';
import './Towers/Tower3.js';
import './Towers/Tower4.js';
import './ProjectilesProcessing.js';
import './Units.js';
import './enemies.js';
import './help.js';

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

// снаряды
// ресурсы
//
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



  function handleTowers(){
    for (let i = 0; i < towers.length; i++){
    //  towers[i].shoot();
    //  towers[i].draw();
      //console.log(towers.length);
     towers[i].draw(enemies);

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

    switch(choosentower){
      case 1:
      if resourses >= 100 {
        let help = new Tower1(positionX, positionY);
        towers.push(help);
        resourses -= help.cost;
      }
      case 2:
      if resourses >= 100 {
        let help = new Tower2(positionX, positionY);
        towers.push(help);
        resourses -= help.cost;
      }
      case 3:
      if resourses >= 100 {
        let help = new Tower3(positionX, positionY);
        towers.push(help);
        resourses -= help.cost;
      }
      case 4:
      if resourses >= 100 {
        let help = new Tower4(positionX, positionY);
        towers.push(help);
        resourses -= help.cost;
      }
      case 5:
      if resourses >= 100 {
        let help = new Tower1(positionX, positionY);
        towers.push(help);
        resourses -= help.cost;
      }
    }
    //console.log(resourses);
  });

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
  ProcessProjectiles(projectiles, enemies);
  handleTowers(enemies);
  handleEnemies();
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
