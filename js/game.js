import * as Constants from './constants.js';
import GameStartState from './components/gameStates/GameStartState.js';
import GameRunningState from './components/gameStates/GameRunningState.js';
import GamePausingState from './components/gameStates/GamePausingState.js';
import GameOverState from './components/gameStates/GameOverState.js';
import Mouse from './components/mouse.js';
import PlayerBase from './entity/bases/playerBase.js';
import EnemyBase from './entity/bases/enemyBase.js';
import { createGameGrid } from './components/gameGrid.js';
import { handleControlBar, handleBases, handleGameGrid } from  './components/informationHandling.js';
import { processTowers } from './components/towersProcessing.js';
import { processUnits } from './components/unitsProcessing.js';
import { processProjectiles } from './components/ProjectilesProcessing.js';
import { processEnemies } from './components/enemiesProcessing.js';


export default class Game {
    constructor() {
        this.canvas = document.getElementById('canvas1');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = Constants.canvasWidth;
        this.canvas.height = Constants.canvasHeight;

        this.states = {
            gameStart: GameStartState,
            gameRunning: GameRunningState,
            gamePausing: GamePausingState,
            gameOver: GameOverState,
        }

        this.state = new this.states.gameStart(this);
        this.gameOver = false;

        this.gameGrid = [];
        this.towers = [];
        this.units = [];
        this.enemies = [];
        this.projectiles = [];

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

        this.mouse = new Mouse(this);
        this.mouse.init(this);

<<<<<<< HEAD
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
=======
        createGameGrid(this);
>>>>>>> f77d9564ef1e727fe7afd5b8aadbf259dc7dcbbb
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
play();

function play() {
    game.state.processState();

    if (!game.gameOver) requestAnimationFrame(play);
}

export function restartGame() {
    game = new Game();
    game.state = new game.states.gameRunning(game);

    play();
}
