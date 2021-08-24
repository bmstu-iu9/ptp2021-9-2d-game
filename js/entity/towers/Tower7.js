import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';
import BaseUnit from './../units/BaseUnit.js';
import Unit1 from './../units/Unit1.js';
import Unit2 from './../units/Unit2.js';

export default class Tower7 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.game = game;
        this.units = game.units;

        this.health = 100;
        this.damage = 20;
        this.range = 6 * Constants.cellSize;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 3000;

        this.unitNumber = 0;

        this.level = 1;
    }

    update() {
        if (this.health == 0) {
            for (let i = 0; i < this.enemies.length; i++) {
                let enemy = this.enemies[i];

                if (calculateDistance(this.x, this.y, enemy.x, enemy.y) < this.range / 6) {
                    if (enemy.health - this.damage < 0) {
                        enemy.health = 0;
                    } else {
                        enemy.health -= this.damage;
                    }
                }
            }

            this.died = true;
        }
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            this.units.push(new Unit1(
                this.game,
                this.x + Constants.cellSize,
                this.y - 0.25 * Constants.cellSize,
            ));

            if (this.level == 2) {
                this.unitNumber += 1;
            }

            this.lastShotTime = new Date();
        }

        if (this.unitNumber == 3 && this.level == 2) {
            this.units.push(new Unit2(
                this.game,
                this.x + Constants.cellSize,
                this.y,
            ));

            this.unitNumber = 0;
        }
    }

    draw() {
        let ctx = this.ctx;

        if (this.level == 1) {
            ctx.fillStyle = 'pink';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        } else if (this.level == 2) {
            ctx.fillStyle = 'fuchsia';
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
