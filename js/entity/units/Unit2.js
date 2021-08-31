import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';

export default class Unit2 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.range = 5 * Constants.cellSize;
        this.damage = 10;

        this.shots = 0;

        this.runImages = Constants.unit2RunImages;
        this.hitImages = Constants.unit2HitImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage,
                    Constants.unit2HitImages[4],
                ));
            }

            this.shots += 1;

            if (this.shots == 10) {
                this.range += 0.1 * Constants.cellSize;
                this.shots = 0;
            }

            this.lastShotTime = new Date();
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
