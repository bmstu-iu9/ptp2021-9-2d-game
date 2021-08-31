import BaseEnemy from './BaseEnemy.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';

export default class Enemy1 extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = Constants.cellSize * 10;

        this.maxHealth = 500;
        this.health = this.maxHealth;

        this.baseDamage = 20;

        this.runImages = Constants.enemy1RunImages;
        this.hitImages = Constants.enemy1HitImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (this.target && new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 3) {
            this.projectiles.push(new Projectile1(
                this.target,
                this.x -  Constants.cellSize / 2,
                this.y +  Constants.cellSize *  2 / 4,
                this.damage,
                Constants.enemyProjectile,
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
            this.imageIndex = (this.imageIndex + 1) % 4;
            this.lastAnimationTime = new Date;
        }

        /*ctx.fillStyle = 'red';
        ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);*/
    }
}
