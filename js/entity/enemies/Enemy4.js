import BaseEnemy from './BaseEnemy.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constant from './../../constants.js';

export default class Enemy4 extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = Constant.cellSize * 2.5;
        this.cost = 100;
        this.maxHealth = 800;
        this.health = this.maxHealth;
        this.damage = 35;
        this.hasAbility = true;
        this.baseSpeed /= 5;
    }

    shoot() {
        if (this.target && new Date - this.lastShotTime >= this.shootInterval) {
            this.projectiles.push(new Projectile1(
                this.target,
                this.x,
                this.y,
                this.damage,
                1));
            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constant.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }

}
