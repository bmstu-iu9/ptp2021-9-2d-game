import BaseTower from './BaseTower.js';
import Projectile3 from '../projectiles/Projectile3.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Tower3 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 650;
        this.lastShotTime = new Date();
        this.shootInterval = 1000;
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

            if (this.y + 50 == enemy.y && distance < minDistance && distance > 0) {
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

    shoot(target) {
        this.projectiles.push(new Projectile3(
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
        if (this.level == 0) {
            ctx.fillStyle = 'blue';
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
        //this.damage += 20;
        //this.shootInterval -= 50;
    }
}
