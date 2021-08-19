import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Tower6 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 0;
        this.upgradecost = 200;
        this.range = Constant.cellSize * 5;
        this.lastShotTime = new Date();
        this.shootInterval = 1000;
        this.level = 1;
        this.units = game.units;
        //this.damageUpgrage = 10; //для улучшения урона юнита
        //this.speedUpgrade = 5; //для улучшения скорости юнита
        //this.shootUpgrade = 10; //для улучшения скорости атаки юнита

    }

    step() {

        for (let i = 0; i < this.units.length; i++) {
            let unit = this.units[i];
            if (calculateDistance(this.x, this.y, unit.x, unit.y) < this.range) {
                unit.buffed = true;
            } else {
                unit.buffed = false;
            }
        }

        if (this.level > 1) {
            for (let i = 0; i < this.enemies.length; i++) {
                let enemy = this.enemies[i];
                if (calculateDistance(this.x, this.y, enemy.x, enemy.y) < this.range) {
                    enemy.buffed = true;
                } else {
                    enemy.buffed = false;
                }
            }
        }

    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        } else {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        }
    }

    upgrade() {
        this.level += 1;
    }
}
