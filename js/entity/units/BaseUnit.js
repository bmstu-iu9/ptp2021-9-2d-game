import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class BaseUnit {
    constructor(game, x, y) {
        this.ctx = game.ctx;
        this.x = x;
        this.y = y;
        this.width = Constants.cellSize / 2;
        this.height = Constants.cellSize / 2;
        this.direction = 0;

        this.units = game.units;
        this.projectiles = game.projectiles;
        this.enemies = game.enemies;

        this.targetsAmount = 1;
        this.targets = [];

        this.speed = 5;

        this.lastShotTime = new Date();
        this.shootInterval = 300;

        this.lastSlowingShotTime = null;
        this.slowingInterval = 300;
        this.isSlowed = false;
        this.slowingCoeff = 0.6;

        this.level = 1;
    }

    update() {
        if (this.health == 0) {
            for (let i = 0, n = this.units.length; i < n; i++) {
                if (this == this.units[i]) {
                    this.units.splice(i, 1);
                    return;
                }
            }
        }

        this.step();

        if (this.targets.length == 0) {
            this.move();
        }
    }

    move() {
        if (this.isSlowed) {
            this.x += this.speed * this.slowingCoeff;

            if (new Date - this.lastSlowingShotTime >= this.slowingInterval) {
                this.isSlowed = false;
            }
        } else {
            this.x += this.speed;
        }
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
