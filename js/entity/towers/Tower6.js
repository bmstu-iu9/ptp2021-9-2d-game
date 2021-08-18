import BaseTower from './BaseTower.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Tower6 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 0;
        this.upgradecost = 200;
        this.range = Constant.cellSize * 5; //поменять радиус
        this.lastShotTime = new Date();
        this.shootInterval = 1000; //поменять интервал; наверное, нужно вообще 1 раз стрелять
        this.level = 1;
        this.damageUpgrage = 10; //для улучшения урона юнита
        this.speedUpgrade = 5; //для улучшения скорости юнита
        this.shootUpgrade = 10; //для улучшения скорости атаки юнита
    }

    findTargets(n) {
        for (let i = this.targets.length; i < n; i++) {
            let target = this.findTarget()
            if (target) {
                this.targets.push(target)
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            let unit = this.targets[i];
            if (calculateDistance(this.x, this.y, unit.x, unit.y) > this.range ||
               (unit.health <= 0)) {
                this.targets.splice(i, 1);
            }
        }

    }

    findTarget() {
        let nearestUnitIndex = -1;
        let minDistance = this.range;

        for (let i = 0, m = this.units.length; i < m; i++) {

            let unit = this.units[i];
            let distance = calculateDistance(this.x, this.y, unit.x, unit.y);

            if (distance < minDistance) {
                let isTargetAlready = false;
                for (let j = 0, k = this.targets.length; j < k; j++) {
                    if (unit == this.targets[j]) {
                        isTargetAlready = true;
                    }
                }
                if (!isTargetAlready) {
                    nearestUnitIndex = i;
                    minDistance = distance;
                }
            }
        }

        if (nearestUnitIndex != -1) {
            return this.units[nearestUnitIndex];
        }
    }

    shoot(target) {
        this.projectiles.push(new Projectile4(
            target,
            this.x + Constant.cellSize / 2,
            this.y + Constant.cellSize / 2,
            this.damage,
            this.level
        ));
        target.damage += this.damageUpgrage;
        target.speed += this.speedUpgrade;
        target.shootInterval += this.shootUpgrade;
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x, this.y, this.width, this.height);
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
        this.damageUpgrage += 10;
        this.speedUpgrade += 5;
        this.shootUpgrade += 10;
    }
}
