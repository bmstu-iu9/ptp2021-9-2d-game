import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';

export default class Unit3 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = 300;
        this.cost = 100;
        this.health = 500;
        this.damage = 10;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage,
                    1)); // this.level
            }
            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}
