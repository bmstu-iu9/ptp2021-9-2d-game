import BaseTower from './BaseTower.js';
import Projectile3 from '../projectiles/Projectile3.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Tower3 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.health = 100;
        this.damage = 10;
        this.range = Constants.cellSize * 6 + Constants.cellSize / 2;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 3000;

        this.level = 1;
    }

    findTargets(targetsAmount) {
        for (let i = 0; i < this.targets.length; i++) {
            let target = this.targets[i];

            if (target.x < this.x || target.died) {
                this.targets.splice(i, 1);
                i--;
            }
        }

        for (let i = this.targets.length; i < targetsAmount; i++) {
            let target = this.findTarget();

            if (target) {
                this.targets.push(target)
            }
        }
    }

    findTarget() {
        let nearestEnemyIndex = -1;
        let minDistance = this.range;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i],
                distance = enemy.x - this.x;

            if (this.y == enemy.y && 0 < distance < minDistance) {
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
                ))
            }

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        if (this.level == 1) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        } else if (this.level == 2) {
            ctx.fillStyle = 'indigo';
            ctx.fillRect(this.x - Constants.cellSize / 2, this.y - Constants.cellSize / 2, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constants.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constants.cellSize / 20, this.y + Constants.cellSize / 3);
        }
    }

    upgrade() {
        this.level = 2;
        //this.damage += 20;
        //this.shootInterval -= 50;
    }
}
