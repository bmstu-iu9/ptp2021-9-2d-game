import BaseTower from './entity/towers/BaseTower.js';
import Tower1 from './entity/towers/Tower1.js';
import Tower2 from './entity/towers/Tower2.js';
import Tower3 from './entity/towers/Tower3.js';
import Tower4 from './entity/towers/Tower4.js';
import ProcessProjectiles from './components/ProjectilesProcessing.js';
import Enemies from './entity/enemies/enemies.js';

import * as Constant from './constants.js';
import { chooseTower, putTower } from './components/towersProcessing.js';
import { chooseUnit, putUnit } from './components/unitsProcessing.js';
import Mouse from './components/mouse.js';
import PlayerBase from './entity/bases/playerBase.js';
import EnemyBase from './entity/bases/enemyBase.js';
import Cell from './components/cell.js';
import { handleTowers, handleInformation, handleGameGrid,
         handleEnemies, handleControlBar, detectClickLocation } from  './components/informationHandling.js';

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
        this.resources = 300;
        this.enemydamage = 10;
        this.frame = 0;
        this.playerBase = new PlayerBase();
        this.enemyBase = new EnemyBase();
        this.mouse = null;
        this.chosenTower = null;
        this.chosenUnit = null;
    }

    init() {
        this.mouse = new Mouse(game);

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

        this.ctx.fillRect(0, 0, Constant.controlBarWidth, Constant.controlBarHeight);
        this.playerBase.draw(this.ctx);
        this.enemyBase.draw(this.ctx);

        handleGameGrid(game);
        handleControlBar(game.ctx, game.chosenTower, game.chosenUnit);
        ProcessProjectiles(game);
        handleTowers(game);
        handleEnemies(this.enemies, this.resources, this.ctx, this.frame, this.enemydamage, Constant.interval);
        handleInformation(this.ctx, this.gameOver, this.resources, this.playerBase);
        chooseTower(this.ctx, this.mouse, this.chosenTower);

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
