import BaseTower from './BaseTower.js';
import Projectile2 from '../projectiles/Projectile2.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Tower2 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = Constant.cellSize * 5;
        this.lastShotTime = new Date();
        this.shootInterval = 300;
        this.level = 0;
    }

    shoot(target) {
        this.projectiles.push(new Projectile2(
            target,
            this.x + Constant.cellSize / 2,
            this.y + Constant.cellSize / 2,
            this.damage,
            this.level
        ))
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        }
    }

    upgrade() {
        this.level += 1;
        this.damage += 20;
        this.shootInterval -= 50;
    }
}
