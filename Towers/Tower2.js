import BaseTower from './BaseTower.js'
import { calculateDistance } from '../utils/utils.js'

class Tower2 extends BaseTower {
    constructor(ctx, x, y) {
        super(x, y);
        this.ctx = ctx;
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 500;
        this.lastShotTime = new Date();
        this.shootInterval = 300;
        this.level = 0;
    }

    shoot(target) {
        this.projectiles.push(new Projectile2(target, this.x, this.y, this.level, this.damage))
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '30px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '30px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        }
    }

    upgrade() {
        this.level += 1;
        this.damage += 20;
        this.shootInterval -= 50;
    }
}
