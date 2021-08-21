import BaseTower from './BaseTower.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constant from './../../constants.js';

export default class Tower5 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 40;
        this.upgradecost = 200;
        this.range = Constant.cellSize * 3 + Constant.cellSize / 2;
        this.lastShotTime = new Date();
        this.shootInterval = 1200;
        this.level = 1;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x,
                    this.y,
                    this.damage,
                    this.level
                ))
            }
            this.lastShotTime = new Date();
        }
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'Purple';
            ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        } else {
            ctx.fillStyle = 'teal';
            ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        }
    }

    upgrade() {
        this.level += 1;
        this.damage = 30;
        this.targetsAmount = 3;
        this.range = 550;
    }
}
