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

//var refresh = setTimeout(enemiesProcessing.processEnemies, 100000/30);

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
        this.gamePause = false;
        this.gameStart = true;

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
        this.menuBg = "rgb(8, 8, 30)";
        this.menuColor = "rgb(42, 163, 223)";
        this.colorInMenu = "rgb(64, 64, 143)";
        this.menuFontSize = "15px";

        this.ms = new Date().getTime();
    }


    gameFunc() {
      this.ctx.font = Constants.canvasHeight / 35 + "px Orbitron";
      this.ctx.fillStyle = this.menuColor;
      this.ctx.fillText("Menu", Constants.canvasWidth / 2.05, Constants.canvasHeight / 10);
    }

    checkButton(e) {

        if (e.code == 'Escape'){
            pauseGame();
        }

        if (game.gamePause == true && e.code == 'Enter'){
            resumeGame();
        }
    }

    checkClick(e) {

      if (e.clientX > Constants.canvasWidth / 2.05 && e.clientX < Constants.canvasWidth / 1.89 &&
              e.clientY > Constants.canvasHeight / 13 && e.clientY < Constants.canvasHeight / 9){
          pauseGame();

      }

      if (game.gamePause == true && e.clientX > Constants.canvasWidth / 2.345 && e.clientX < Constants.canvasWidth / 1.745 &&
              e.clientY > Constants.canvasHeight / 2.35 && e.clientY < Constants.canvasHeight / 2.07){
          resumeGame();
      }

      if (game.gameOver == true && e.clientX > Constants.canvasWidth / 2.43 && e.clientX < Constants.canvasWidth / 1,705  &&
              e.clientY > Constants.canvasHeight / 1.95 && e.clientY < Constants.canvasHeight / 1.8){
          restarGame();
      }

      if (game.gameStart == true && e.clientX > Constants.canvasWidth / 2.12 && e.clientX < Constants.canvasWidth / 1.75 &&
              e.clientY > Constants.canvasHeight / 3 && e.clientY < Constants.canvasHeight / 2.52 ){
                game.gameStart = false;
                play();

      }


    }

    checkAiming(e) {
      if (game.gamePause == true && e.clientX > 820 && e.clientX < 1097
               && e.clientY > 401 && e.clientY < 452){

      }
  }

    showMenu() {



      this.ctx.fillStyle = this.menuBg;
      this.ctx.fillRect(Constants.canvasWidth / 2.37, Constants.canvasHeight / 2.7, Constants.canvasWidth / 6.45, Constants.canvasHeight / 3);

      this.ctx.fillStyle = this.colorInMenu;
      this.ctx.fillRect(Constants.canvasWidth / 2.345, Constants.canvasHeight / 2.35 , Constants.canvasWidth / 6.8, Constants.canvasHeight / 18);

      this.ctx.font = Constants.canvasHeight / 34 + "px Orbitron";
      this.ctx.fillStyle = this.menuColor;
      this.ctx.fillText("Menu", Constants.canvasWidth / 2.09, Constants.canvasHeight / 2.48);

      this.ctx.font = Constants.canvasHeight / 34 + "px Orbitron";
      this.ctx.fillStyle = this.menuColor;
      this.ctx.fillText("Resume", Constants.canvasWidth / 2.135, Constants.canvasHeight / 2.15);



      }



    init() {
        this.mouse = new Mouse(game);

        this.mouse.init(game);

        createGameGrid(game);
    }

    animate() {
        handleControlBar(game);
        handleGameGrid(game);
        handleBases(game);

        processTowers(game);
        processUnits(game);
        processEnemies(game);
        processProjectiles(game);


        this.ms += 1000/60;

        //this.ms += new Date().getTime();
        while (new Date().getTime() < this.ms) {}
    }
}

let game = new Game();
game.init();

document.onkeydown = game.checkButton;
document.onmousedown = game.checkClick;
document.onMouseOver = game.checkAiming;



function play() {
    game.animate()
    game.gameFunc()
    if (game.gamePause == true){
      game.showMenu();
    }

    if (game.gameOver == true){
      handleBases(game);
    }

    if (!game.gamePause && !game.gameOver) requestAnimationFrame(play);


}


function restarGame() {
  location.reload();
}

function startGame() {
    game.ctx.fillStyle = game.menuBg;
    game.ctx.fillRect(0, 0, Constants.canvasWidth, Constants.canvasHeight);


    game.ctx.fillStyle = game.colorInMenu;
    game.ctx.fillRect(Constants.canvasWidth / 2.12 , Constants.canvasHeight / 3,
      Constants.canvasWidth/10, Constants.canvasHeight/16);


    game.ctx.font = Constants.cellSize * 3 / 7 + "px Orbitron";
    game.ctx.fillStyle = game.menuColor;
    game.ctx.fillText("Start",Constants.canvasWidth/2.01 , Constants.canvasHeight / 2.69)
}


function pauseGame() {
  game.gamePause = true;
}


function resumeGame() {
  game.gamePause = false;
  play();
}


startGame()
