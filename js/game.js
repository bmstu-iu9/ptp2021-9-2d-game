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
<<<<<<< HEAD
        this.menuFontSize = "15px";
=======

>>>>>>> 0c4245ebb507fdf122e37967d8ba9460ebb893a6
    }


    gameFunc(){
      this.ctx.fillStyle = game.menuBg;
      this.ctx.fillRect(1500, 40, game.menuWidth, game.menuHeight);
      this.ctx.font = "bold 25px Orbitron";
      this.ctx.fillStyle = game.menuColor;
      this.ctx.fillText("Menu", 1514, 72);
      

    }


    checkClick(e){
      console.log('hello',game.e.clientX, game.e.clientY);
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


function play() {
    game.animate()
    game.gameFunc()
    game.checkClick()
    if (!game.gameOver) requestAnimationFrame(play);
}

play()
