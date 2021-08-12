import BaseTower from './entity/towers/BaseTower.js';
import Tower1 from './entity/towers/Tower1.js';
import Tower2 from './entity/towers/Tower2.js';
import Tower3 from './entity/towers/Tower3.js';
import Tower4 from './entity/towers/Tower4.js';
import ProcessProjectiles from './components/ProjectilesProcessing.js';
import { Enemies, handleEnemies } from './entity/enemies/enemies.js';
import * as Constant from './constants.js';
import { putTower } from './components/towersProcessing.js'

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
    }

    init() {
        canvas.addEventListener('click', putTower(Constant.cellSize,
                                                  this.towers,
                                                  chooseTower,
                                                  mouse,
                                                  resources));
    }

    animate() {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.fillStyle = 'grey';
      if (frame % 100 === 0 && frame > 0) {
        resources += 10;
      }
      ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
      mybase.draw();
      enemybase.draw();

      ctx.fillStyle = 'white';
      ctx.font = '26px Orbitron'
      ctx.fillText(10000, 2, 150);
      ctx.fillText(10000, canvas.width - 100, 150);

      handleGameGrid();
      ProcessProjectiles(projectiles, enemies);
      handleTowers(enemies);
      handleEnemies();
      handleInformation();
      frame++;
      if (!gameover) requestAnimationFrame(animate);
    }


    start() {
        init();
        animate();
    }
}

game = Game()
game.start()
