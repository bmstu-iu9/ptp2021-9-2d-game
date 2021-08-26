import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class BaseTower {
    constructor(game, x, y) {
        this.ctx = game.ctx;

        this.projectiles = game.projectiles;
        this.enemies = game.enemies;

        this.x = x + Constants.cellSize / 2;
        this.y = y + Constants.cellSize / 2;
        this.width = Constants.cellSize;
        this.height = Constants.cellSize;

        this.maxHealth = null;
        this.health = this.maxHealth;

        this.direction = 0;
        this.range = 3 * Constants.cellSize;

        this.targetsAmount = 1;
        this.targets = [];

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

        let directionTarget = this.targets[0],
            newDirection = Math.atan2(directionTarget.y - this.y,
                                      directionTarget.x - this.x);

        newDirection = newDirection * (180 / Math.PI);
        //drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;
    }

    findTargets(targetsAmount) {
        for (let i = 0; i < this.targets.length; i++) {
            let target = this.targets[i];

            if (calculateDistance(this.x, this.y, target.x, target.y) > this.range ||
               (target.died)) {

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
        let nearestEnemyIndex = -1,
            minDistance = this.range;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i],
                distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

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

    drawHP() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.rect(this.x - Constants.cellSize / 2 + Constants.cellSize / 8,
                 this.y - Constants.cellSize / 2 + Constants.cellSize / 15,
                 this.width * 3/4,
                 1);
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 20;
        ctx.stroke();

        let width = this.width * this.health / this.maxHealth;

        ctx.beginPath();
        ctx.rect(this.x - Constants.cellSize / 2 + Constants.cellSize / 8,
                 this.y - Constants.cellSize / 2 + Constants.cellSize / 15,
                 width * 3/4,
                 1);
        ctx.strokeStyle = 'green';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 20;
        ctx.stroke();
    }
}
