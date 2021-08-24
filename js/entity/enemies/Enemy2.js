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

        ctx.fillStyle = 'crimson';
        ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}
