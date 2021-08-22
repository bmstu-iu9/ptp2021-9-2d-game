import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Tower4 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.health = 100;
        this.damage = 10;
        this.range = 6 * Constants.cellSize;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 1000;

        this.slowingInterval = 3000;
        this.slowingCoeff = 0.6;

        this.targetsAmount = 1;

        this.level = 1;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile4(
                    this.targets[i],
                    this.x,
                    this.y,
                    this.damage,
                    this.slowingInterval,
                    this.slowingCoeff,
                ))
            }

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        if (this.level == 1) {
            ctx.fillStyle = 'black';
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
        this.targetsAmount = 3;
    }
}
