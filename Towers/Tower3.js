import BaseTower from './BaseTower.js'
import { calculateDistance } from '../utils/utils.js'

class Tower3 extends BaseTower {
    constructor(ctx, x, y) {
        super(x, y);
        this.ctx = ctx;
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 250;
        this.lastShotTime = new Date();
        this.shootInterval = 300;
        this.level = 0;
    }
    step() {
        this.findTargets(enemies, this.targetsAmount);

        if (this.targets.length == 0) return;

        let directionTarget = this.targets[0];
        let newDirection = Math.atan2(directionTarget.y - this.y,
                                      directionTarget.x - this.x);
        //newDirection = newDirection * (180 / Math.PI);
        //drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;

        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.shoot(this.targets[i]);
            }
            this.lastShotTime = new Date();
        }
    }

    findTargets(enemies, n) {
        for (let i = this.targets.length; i < n; i++) {
            let target = this.findTarget(enemies)
            if (target) {
                this.targets.push(target)
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            let enemy = this.targets[i];
            if (calculateDistance(this.x, this.y, enemy.x, enemy.y) > this.range ) {
                this.targets.splice(i, 1);
            }
        }
    }

    findTarget(enemies) {
        let nearestEnemyIndex = -1;
        let minDistance = this.range;

        for (let i = 0, m = enemies.length; i < m; i++) {
            let enemy = enemies[i];
            let distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (this.y < enemy.y){
              distance = calculateDistance(this.x, this.y + 100, enemy.x, enemy.y);
            } else if (this.y > enemy.y) {
              distance = calculateDistance(this.x, this.y - 100, enemy.x, enemy.y);
            }

            if (distance < minDistance &&
                ((enemy.y == this.y - 55 && this.level == 0) || (enemy.y <= this.y - 55 + 100 && enemy.y >= this.y - 55 - 100 && this.level > 0))) {

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
            return enemies[nearestEnemyIndex];
        }
    }

    shoot(target) {
        this.projectiles.push(new Projectile3(target, this.x, this.y))
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
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
