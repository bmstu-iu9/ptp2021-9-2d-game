import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit5 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.units = game.units;

        this.maxHealth = 25;
        this.health = this.maxHealth;

        this.speed = Constants.cellSize * 5 / 100;

        this.range = 10 * Constants.cellSize;

        this.damage = 25;
        this.totalDamage = 0;

        this.shootInterval *= 2;

        this.runImages = Constants.unit5RunImages;
        this.hitImages = Constants.unit5HitImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 3) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y,
                    this.damage,
                    Constants.unit5HitImages[4]
                ));

                this.totalDamage += this.damage;
            }

            this.lastShotTime = new Date();
        }

        if (this.totalDamage > 200) {
            this.totalDamage = 0;
            this.useAbility();
        }
    }

    useAbility() {
        if (this.shootInterval - 10 > 150) {
            this.shootInterval -= 10;
        }
    }

    draw() {
        let ctx = this.ctx,
            img;

        if (this.targets.length != 0) {
            img = this.hitImages[this.imageIndex];
        } else {
            img = this.runImages[this.imageIndex];
        }

        ctx.drawImage(img, this.x, this.y + Constants.cellSize * 10/100,
                           Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.imageIndex = (this.imageIndex + 1) % 4;
            this.lastAnimationTime = new Date;
        }
    }
}
