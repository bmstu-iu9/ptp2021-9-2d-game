import BaseTower from './BaseTower.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';

export default class Tower1 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.health = 100;
        this.damage = 10;
        this.range = Constants.cellSize * 10;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 300;

        this.level = 1;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x,
                    this.y,
                    this.damage,
                ))
            }

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        if (this.level == 1) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        } else if (this.level == 2) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        }
    }

    upgrade() {
        this.level = 2;
        this.damage += 20;
        this.shootInterval -= 50;
    }
}
