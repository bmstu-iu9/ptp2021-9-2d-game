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

        this.resources = 300;
        this.frame = 0;

        this.playerBase = new PlayerBase();
        this.enemyBase = new EnemyBase();

        this.chosenTower = null;
        this.chosenUnit = null;

        this.enemySummoningInterval = 5000;
        this.lastEnemySummoningTime = new Date();
    }

    init() {
        this.mouse = new Mouse(game);

<<<<<<< HEAD
        game.mouse.init(game);

        game.canvas.addEventListener('click', function () {
            let clickLocation = detectClickLocation(game);

            if (clickLocation == "Control Bar") {
                let chosenTower = chooseTower(game.ctx, game.mouse);
                if (chosenTower == game.chosenTower) {
                    game.chosenTower = null;
                } else {
                    game.chosenTower = chosenTower;
                }

                let chosenUnit = chooseUnit(game.ctx, game.mouse);
                if (chosenUnit == game.chosenUnit) {
                    game.chosenUnit = null;
                } else {
                    game.chosenUnit = chosenUnit;
                }
            } else if (clickLocation == "Game Grid") {
                if (game.chosenTower) {
                    putTower(game);
                } else if (game.chosenUnit) {
                    putUnit(game);
                }
            }
        });

        game.canvas.addEventListener('dblclick', function () {
              let clickLocation = detectClickLocation(game);
              console.log("----")
              if (clickLocation == "Control Bar") {
                  return
              } else if (clickLocation == "Game Grid") {
                  for (let i = 0; i < game.towers.length; i++) {
                      if (Math.floor(game.towers[i].x / Constant.cellSize) == Math.floor(game.mouse.x / Constant.cellSize)
                          && Math.floor(game.towers[i].y / Constant.cellSize) == Math.floor(game.mouse.y / Constant.cellSize)
                          && game.resources >= game.towers[i].upgradecost) {
                            game.towers[i].upgrade();
                            game.resources -= game.towers[i].upgradecost;
                      }
                  }
              }


        });

        for (let y = Constant.cellSize; y < this.canvas.height; y += Constant.cellSize) {
            for (let x = 0; x < this.canvas.width; x += Constant.cellSize) {
                this.gameGrid.push(new Cell(x, y));
            }
        }
=======
        this.mouse.init(game);

        createGameGrid(game);
>>>>>>> 2215addf030c6e37ff6a41d3feb7f1b80615a1cc
    }

    animate() {
        handleControlBar(game);
        handleBases(game);
        handleGameGrid(game);

        processTowers(game);
        processUnits(game);
        processProjectiles(game);
        processEnemies(game);

        this.frame++;

        let ms = 1000/60;
        ms += new Date().getTime();
        while (new Date().getTime() < ms) {}
    }
}

let game = new Game();
game.init();

function play() {
    game.animate()
    if (!game.gameOver) requestAnimationFrame(play);
}
play()
