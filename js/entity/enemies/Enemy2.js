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

        this.index = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (this.target && new Date - this.lastShotTime >= this.shootInterval) {
            this.projectiles.push(new Projectile1(
                this.target,
                this.x,
                this.y,
                this.damage,
                1,
            ));

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        var img = new Image();

        if (this.target) {
            img.src = "./js/images/enemies/enemy2/hit/" + this.index + ".png";
        } else {
            img.src = "./js/images/enemies/enemy2/run/" + this.index + ".png";
        }

        ctx.drawImage(img, this.x - Constants.cellSize / 2,
                        this.y - Constants.cellSize / 2 + Constants.cellSize * 10/100,
                        Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.index = (this.index + 1) % 4;
            this.lastAnimationTime = new Date;
        }

        /*ctx.fillStyle = 'crimson';
        ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);*/
    }
}
