import BaseUnit from './BaseUnit.js';
import Projectile2 from '../projectiles/Projectile2.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit7 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.units = game.units;

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.speed = Constants.cellSize * 5 / 100;

        this.range = 10 * Constants.cellSize;

        this.baseDamage = 25;
        this.damage = this.baseDamage;
        this.shootInterval *= 10;

        this.shots = 0;

        this.runImages = Constants.unit7RunImages;
        this.hitImages = Constants.unit7HitImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 150;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 3) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile2(
                    this.targets[i],
                    this.x,
                    this.y - this.height/2,
                    this.damage,
                    1,
                    Constants.unit7HitImages[4],
                ));

                this.shots += 1;
            }
            this.lastShotTime = new Date();
        }

        if (this.shots == 10) {
            this.shots = 0;
            this.useAbility();
        }
    }

    useAbility() {
        if (this.health - 5 > 0) {
            this.health -= 5;
            this.baseDamage += 5;
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
