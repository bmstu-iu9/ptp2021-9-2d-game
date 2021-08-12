import BaseTower from './entity/towers/BaseTower.js';
import Tower1 from './entity/towers/Tower1.js';
import Tower2 from './entity/towers/Tower2.js';
import Tower3 from './entity/towers/Tower3.js';
import Tower4 from './entity/towers/Tower4.js';
import ProcessProjectiles from './components/ProjectilesProcessing.js';
import Enemies from './entity/enemies/enemies.js';

import * as Constant from './constants.js';
import { putTower } from './components/towersProcessing.js'
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
        this.resources = 300;
        this.frame = 0;
        this.playerBase = new playerBase();
        this.enemyBase = new enemyBase();
        this.mouse = new Mouse();
    }

    init() {

        this.mouse.init();

        canvas.addEventListener('click', putTower(Constant.cellSize,
                                                  this.towers,
                                                  this.mouse,
                                                  this.resources,
                                                  this.ctx));
        //gameGrid
        for (let y = Constant.cellSize; y < this.canvas.height; y += Constant.cellSize){
            for (let x = 0; x < this.canvas.width; x += Constant.cellSize){
                this.gameGrid.push(new Cell(x, y));
            }
        }
    }

    animate() {
        let ctx = this.ctx;

        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = 'grey';

        if (this.frame % 100 === 0 && this.frame > 0) {
            this.resources += 10;
        }

        ctx.fillRect(0, 0, Constant.controlsBarWidth, Constant.controlsBarHeight);
        this.playerBase.draw();
        this.enemyBase.draw();

        ctx.fillStyle = 'white';
        ctx.font = '26px Orbitron'
        ctx.fillText(10000, 2, 150);
        ctx.fillText(10000, canvas.width - 100, 150);

        handleGameGrid(this.gameGrid, ctx, this.mouse);
        ProcessProjectiles(this.projectiles, this.enemies, ctx);
        handleTowers(this.enemies);
        handleEnemies(this.enemies, this.resources, ctx);
        handleInformation(ctx, this.gameOver, this.resources, this.playerBase);

        this.frame++;

        if (!this.gameOver) requestAnimationFrame(this.animate);
    }

    start() {
        init();
        animate();
    }


}

game = Game()
game.start()
