import * as Constants from './constants.js';
import Mouse from './components/mouse.js';
import PlayerBase from './entity/bases/playerBase.js';
import EnemyBase from './entity/bases/enemyBase.js';
import { createGameGrid } from './components/gameGrid.js';
import { handleControlBar, handleBases, handleGameGrid } from  './components/informationHandling.js';
import { processTowers } from './components/towersProcessing.js';
import { processUnits } from './components/unitsProcessing.js';
import { processProjectiles } from './components/ProjectilesProcessing.js';
import { processEnemies } from './components/enemiesProcessing.js';

var refresh = setTimeout(enemiesProcessing.processEnemies, 100000/30);

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas1');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = Constants.canvasWidth;
        this.canvas.height = Constants.canvasHeight;

        this.gameGrid = [];
        this.towers = [];
        this.units = [];
        this.enemies = [];
        this.projectiles = [];

        this.gameOver = false;
        this.gameRunning = false;

        this.resources = 300;

        this.playerBase = new PlayerBase();
        this.enemyBase = new EnemyBase();

        this.chosenTower = null;
        this.chosenUnit = null;

        this.obtaining_resources_interval = 1000;
        this.last_obtaining_resources_time = new Date();

        this.enemy_summoning_interval = 5000;
        this.last_enemy_summoning_time = new Date();

        this.menuHeight = 50;
        this.menuWidth = 100;
        this.menuBg = "green";
        this.menuColor = "white";
        this.menuFontSize = "15px";
    }


    gameFunc(){
      this.ctx.fillStyle = this.menuBg;
      this.ctx.fillRect(1500, 40, this.menuWidth, this.menuHeight);
      this.ctx.font = "bold 25px Orbitron";
      this.ctx.fillStyle = this.menuColor;
      this.ctx.fillText("Menu", 1514, 72);
    }



    checkClick(e){
      console.log('hello', e.clientX, e.clientY);
      if (e.clientX > 770 && e.clientX < 875 && e.clientY > 114 && e.clientY < 164){
        console.log("click");
        showMenu();

      }
    }




    init() {
        this.mouse = new Mouse(game);

        this.mouse.init(game);

        createGameGrid(game);
    }

    animate() {
        handleControlBar(game);
        handleBases(game);
        handleGameGrid(game);

        processTowers(game);
        processUnits(game);
        processProjectiles(game);
        processEnemies(game);

        let ms = 1000/60;
        ms += new Date().getTime();
        while (new Date().getTime() < ms) {}
    }
}

let game = new Game();
game.init();

document.onmousedown = game.checkClick;



function play() {
    game.animate()
    game.gameFunc()
    if (!game.gameOver) requestAnimationFrame(play);
}



function showMenu(){
  refresh = clearTimeout(refresh);

}



play()
