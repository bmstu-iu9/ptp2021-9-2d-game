import BaseTower from './BaseTower.js';
import Projectile1 from '../projectiles/Projectile1.js';

export default class Tower5 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 40;
        this.upgradecost = 200;
        this.range = 350;
        this.lastShotTime = new Date();
        this.shootInterval = 1200;
        this.level = 1;
    }

    shoot(target) {
        this.projectiles.push(new Projectile1(
            target,
            this.x + 50,
            this.y + 50,
            this.damage,
            this.level
        ))
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'Purple';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '30px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        } else {
            ctx.fillStyle = 'Purple';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '30px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        }
    }

    upgrade() {
        this.level += 1;
        this.damage = 30;
        this.targetsAmount = 3;
        this.range = 550;
    }
}
