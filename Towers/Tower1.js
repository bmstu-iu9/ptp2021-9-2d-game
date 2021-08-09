import BaseTower from './BaseTower.js'
import { calculateDistance } from '../utils/utils.js'

class Tower1 extends BaseTower {
    constructor(ctx, x, y) {
        super(x, y);
        this.ctx = ctx;
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 300;
        this.lastShotTime = new Date();
        this.shootInterval = 300;
    }

    shoot() {
        this.projectiles.push(new Projectile1(this.target, this.x, this.y))
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
    }
}
