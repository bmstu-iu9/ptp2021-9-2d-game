import BaseEnemy from './BaseEnemy.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';

export default class Enemy2 extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = Constants.cellSize;

        this.maxHealth = 500;
        this.health = this.maxHealth;

        this.baseDamage = 15;

        this.runImages = Constants.enemy2RunImages;
        this.hitImages = Constants.enemy2HitImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (this.target && new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 2) {
            this.projectiles.push(new Projectile1(
                this.target,
                this.x - Constants.cell,
                this.y,
                this.damage,
                Constants.enemyProjectile,
                Constants.projectileEnemyBang,
            ));

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx,
            img;

        if (this.target) {
            img = this.hitImages[this.imageIndex];
        } else {
            img = this.runImages[this.imageIndex];
        }

        ctx.drawImage(img, this.x - Constants.cellSize / 2,
                        this.y - Constants.cellSize / 2 + Constants.cellSize * 10/100,
                        Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.imageIndex = (this.imageIndex + 1) % 3;
            this.lastAnimationTime = new Date;
        }
    }
}
