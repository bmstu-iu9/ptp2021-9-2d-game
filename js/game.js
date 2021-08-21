import BaseTower from './entity/towers/BaseTower.js';
import Tower1 from './entity/towers/Tower1.js';
import Tower2 from './entity/towers/Tower2.js';
import Tower3 from './entity/towers/Tower3.js';
import Tower4 from './entity/towers/Tower4.js';
import ProcessProjectiles from './components/ProjectilesProcessing.js';
import Enemies from './entity/enemies/enemies.js';

import * as Constant from './constants.js';
import { chooseTower } from './components/towerSelection.js';
import { putTower } from './components/towersProcessing.js';
import Mouse from './components/mouse.js';
import PlayerBase from './entity/bases/playerBase.js';
import EnemyBase from './entity/bases/enemyBase.js';
import Cell from './components/cell.js';
import { handleTowers, handleInformation, handleGameGrid, handleEnemies } from  './components/informationHandling.js';


class Game {
    constructor() {
        this.canvas = document.getElementById('canvas1');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = Constant.canvasWidth;
        this.canvas.height = Constant.canvasHeight;
        this.gameGrid = [];
        this.towers = [];
        this.units = [];
        this.enemies = [];
        this.projectiles = [];
        this.gameOver = false;
        this.gameRunning = false;
        this.resources = 300;
        this.enemydamage = 10;
        this.frame = 0;
        this.playerBase = new PlayerBase();
        this.enemyBase = new EnemyBase();
        this.mouse = null;
        this.chosenTower = 0;
        this.menuHeight = 25;
        this.menuWidth = game.width;
        this.menuBG = 'green';
        this.menuColor = 'white';
        this.menuFotsize = '15px';
        this.gameHeight = game.height - menuHeight;
        this.refresh;
        this.menuShown = fale;
    }




    gameFunc(){
      gameRunning = true;
      this.ctx.fillStyle = menuBG;
      this.ctx.fillRect(1500, 20, 50, 25 );

      this.ctx.font = 'bold 15px Times new Roman';
      this.ctx.fillStyle = menuColor;
      this.ctx.fillText('options', 1500, 18);
    }

    document.onmousedown = checkClick;
    checkClick(e){
      if(e.clientX > 1500 && e.clientX < 1560 && e.clientY > 15 && e.clientY < 25 ){
        console.log('clicked menu');
        showMenu();
      }
      if(menuShown == true){
        if(e.clientX >(game.width/4)+15 && e.clientX <((game.width/4) + 85 && e.clientY > (gameHeight / 4) +75 && e.clientY < (gameHeight / 4) +75 + 20){
          //resume clicked
          console.log('resume clicked');
          showMenu();
        }
      }
    }
    /*



    ctx.fillText('Meny', game.width/4+15, gameHeight/4 + 25 )

    ctx.fillText("Resume", (game.width/4)+15 , (gameHeight / 4) +75);
    */



    init() {
        this.mouse = new Mouse(game);

        game.mouse.init(game);

        game.canvas.addEventListener('click', function () {
            putTower(game);
        });

        for (let y = Constant.cellSize; y < this.canvas.height; y += Constant.cellSize) {
            for (let x = 0; x < this.canvas.width; x += Constant.cellSize) {
                this.gameGrid.push(new Cell(x, y));
            }
        }
    }

    animate() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'grey';

        if (this.frame % 100 === 0 && this.frame > 0) {
            this.resources += 10;
        }

        this.ctx.fillRect(0, 0, Constant.controlsBarWidth, Constant.controlsBarHeight);
        this.playerBase.draw(this.ctx);
        this.enemyBase.draw(this.ctx);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '26px Orbitron'
        this.ctx.fillText(10000, 2, 150);
        this.ctx.fillText(10000, this.canvas.width - 100, 150);

        handleGameGrid(game);
        ProcessProjectiles(game);
        handleTowers(game);
        handleEnemies(this.enemies, this.resources, this.ctx, this.frame, this.enemydamage, Constant.interval);
        handleInformation(this.ctx, this.gameOver, this.resources, this.playerBase);
        chooseTower(this.ctx, this.mouse);

        this.frame++;

        //let ms = 1000/60;
        //ms += new Date().getTime();
        //while (new Date().getTime() < ms){}
    }
}

let game = new Game();
game.init();
game.gameFunc();


function play() {
    game.animate()

    if (!game.gameOver) requestAnimationFrame(play);
}

  startGame(){
    gameRunning = true;
    refresh = setInterval(game, 1000/60);
  }


showMenu(){
  if(gameRunning == true){
    clearInterval(refresh);
    gameRunning = false;
    menuShown = true;
  } else {
    gameRunning = true;
    menuShown = false;
    startGame();
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(game.width/4, gameHeight/4, game.width/2, gameHeight/2);

    ctx.fillStyle = menuBG;
    ctx.fillRect(game.width/4, gameHeight/4, game.width/2, gameHeight/10);



    ctx.font = 'bold 15px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Meny', game.width/4+15, gameHeight/4 + 25 )
    ctx.fillStyle = 'black';
    ctx.fillText("Resume", (game.width/4)+15 , (gameHeight / 4) +75);


  }
}
startGame()
play()
