import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';
import BaseUnit from './../units/BaseUnit.js';
import Unit1 from './../units/Unit1.js';
import Unit2 from './../units/Unit2.js';

export default class Tower7 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 20; 
        this.upgradecost = 200;
        this.range = 6 * Constant.cellSize;
        this.lastShotTime = new Date();
        this.shootInterval = 3000;
        this.level = 1;
        this.timer = 0;
        this.units = game.units;
        this.game = game;
    }

    shoot(target) {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            this.units.push(new Unit1(
                this.game,
                this.x + Constant.cellSize,
                this.y
            ));
            this.timer += 1;
            this.lastShotTime = new Date();
        }
        if (this.health == 0) {
            //взрыв?
            this.projectiles.push(new Projectile4(
                target,
                this.x + Constant.cellSize / 2,
                this.y + Constant.cellSize / 2,
                this.level,
                this.damage
            ));
        }
        if (this.timer == 3) {
            this.units.push(new Unit2(
                this.game,
                this.x + Constant.cellSize,
                this.y
            ));
            for (let i = 0, n = this.units.length; i < n; i++) {
                let unit = this.units[i];
                unit.damage += 10;
                unit.health += 10;
            }
            this.timer = 0;
        }
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'pink';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        } else {
            ctx.fillStyle = 'pink';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        }
    }
}
