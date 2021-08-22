import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Tower6 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.units = game.units;

        this.health = 100;
        this.range = Constants.cellSize * 5;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 1000;

        this.level = 1;
    }

    step() {
        for (let i = 0, n = this.units.length; i < n; i++) {
            let unit = this.units[i];

            if (calculateDistance(this.x, this.y, unit.x, unit.y) <= this.range) {
                unit.buffed = true;
            } else {
                unit.buffed = false;
            }
        }

        if (this.level == 2) {
            for (let i = 0; i < this.enemies.length; i++) {
                let enemy = this.enemies[i];

                if (calculateDistance(this.x, this.y, enemy.x, enemy.y) <= this.range) {
                    enemy.buffed = true;
                } else {
                    enemy.buffed = false;
                }
            }
        }

    }

    shoot() {}

    draw() {
        let ctx = this.ctx;

        if (this.level == 1) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        } else if (this.level == 2) {
            ctx.fillStyle = 'cyan';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        }
    }

    upgrade() {
        this.level = 2;
    }
}
