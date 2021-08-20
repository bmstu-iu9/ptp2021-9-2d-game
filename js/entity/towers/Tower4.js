import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Tower4 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 6 * Constant.cellSize;
        this.lastShotTime = new Date();
        this.shootInterval = 1000;
        this.targetsAmount = 1;
        this.complete = false;
        this.level = 1;
    }

    shoot(target) {
        this.projectiles.push(new Projectile4(
            target,
            this.x,
            this.y,
            this.level,
            this.damage
        ))
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
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
        this.targetsAmount = 3;
    }
}
