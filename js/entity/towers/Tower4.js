import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Tower4 extends BaseTower {
    constructor(x, y) {
        super(x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 600;
        this.lastShotTime = new Date();
        this.shootInterval = 1000;
        this.targetsAmount = 2;
        this.complete = false;
    }

    shoot(target) {
        projectiles.push(new Projectile4(
            target,
            this.x + 50,
            this.y + 50,
            this.level,
            this.damage
        ))
    }

    draw(enemies) {
        this.step(enemies);
        if (this.level == 1) {
            ctx.fillStyle = 'black';
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
    }
}
