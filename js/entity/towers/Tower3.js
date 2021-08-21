import BaseTower from './BaseTower.js';
import Projectile3 from '../projectiles/Projectile3.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Tower3 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = Constant.cellSize * 6 + Constant.cellSize / 2;
        this.lastShotTime = new Date();
        this.shootInterval = 3000;
        this.level = 0;
    }

    findTargets(n) {
        for (let i = this.targets.length; i < n; i++) {
            let target = this.findTarget()
            if (target) {
                this.targets.push(target)
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            let enemy = this.targets[i];
            if (enemy.x < this.x ||
               (enemy.health <= 0)) {
                this.targets.splice(i, 1);
            }
        }

    }

    findTarget() {
        let nearestEnemyIndex = -1;
        let minDistance = this.range;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i];
            let distance = enemy.x - this.x;

            if (this.y == enemy.y && distance < minDistance && distance > 0) {
                let isTargetAlready = false;
                for (let j = 0, k = this.targets.length; j < k; j++) {
                    if (enemy == this.targets[j]) {
                        isTargetAlready = true;
                    }
                }
                if (!isTargetAlready) {
                    nearestEnemyIndex = i;
                    minDistance = distance;
                }
            }
        }

        if (nearestEnemyIndex != -1) {
            return this.enemies[nearestEnemyIndex];
        }
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile3(
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
        if (this.level == 0) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        } else {
            ctx.fillStyle = 'indigo';
            ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        }
    }

    upgrade() {
        this.level += 1;
        //this.damage += 20;
        //this.shootInterval -= 50;
    }
}
