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

        this.maxHealth = 5000;
        this.health = this.maxHealth;
        this.damage = 20;
        this.range = 6 * Constants.cellSize;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 15000;

        this.unitNumber = 0;

        this.level = 1;

        this.images = Constants.tower7Images;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
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
        } else {
            this.health -= 1;
        }
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            this.units.push(new Unit1(
                this.game,
                this.x + Constants.cellSize,
                this.y - 0.5 * Constants.cellSize,
            ));

            if (this.level == 2) {
                this.unitNumber += 1;
            }

            this.lastShotTime = new Date();
        }

        if (this.unitNumber == 3 && this.level == 2 && new Date - this.lastShotTime >= this.shootInterval / 20) {
            this.units.push(new Unit2(
                this.game,
                this.x + Constants.cellSize,
                this.y - 0.5 * Constants.cellSize,
            ));

            this.unitNumber = 0;
        }
    }

    draw() {
        let ctx = this.ctx,
            img = this.images[this.imageIndex];

        ctx.drawImage(img,
                      this.x - Constants.cellSize / 2,
                      this.y - Constants.cellSize / 2 + Constants.cellSize * 10/100,
                      Constants.cellSize,
                      Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.imageIndex = (this.imageIndex + 1) % 4;
            this.lastAnimationTime = new Date;
        }
    }

    upgrade() {
        this.level = 2;
        this.health = this.maxHealth;
    }
}
