import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class BaseTower {
    constructor(game, x, y) {
        this.ctx = game.ctx;
        this.x = x + Constant.cellSize / 2;
        this.y = y + Constant.cellSize / 2;
        this.width = Constant.cellSize;
        this.height = Constant.cellSize;
        this.projectiles = game.projectiles;
        this.enemies = game.enemies;
        this.direction = 0;
        this.targetsAmount = 1;
        this.targets = [];
        this.range = 300;
        this.died = false;
    }

    update() {
        if (this.health == 0) {
            this.died = true;
            return;
        }

        this.step();
    }

    step() {
        this.findTargets(this.targetsAmount);

        if (this.targets.length == 0) return;

        let directionTarget = this.targets[0];
        let newDirection = Math.atan2(directionTarget.y - this.y,
                                      directionTarget.x - this.x);
        newDirection = newDirection * (180 / Math.PI);
        //drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;
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
            if (calculateDistance(this.x, this.y, enemy.x, enemy.y) > this.range ||
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
            let distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (distance < minDistance) {
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

    drawRotated(image, angle) {
        let context = this.ctx;

        if (!image) return;

        context.save();
        context.translate(this.x + image.width/2, this.y + image.height/2);
        context.rotate(angle * (Math.PI / 180));
        context.drawImage(image, -image.width/2, -image.height/2);
        context.restore();
    }
}
