import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Projectile2 {
    constructor(target, x, y, damage, level, img) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize * 1 / 2;
        this.height = Constants.cellSize * 1 / 2;

        this.img = img;

        this.level = level;
        this.direction = -1.57;
        this.range = Constants.cellSize / 2;

        this.speed = Constants.cellSize * 5/100;
        this.damage = damage;

        this.explosionFrame = 0;
        this.reached = false;
        this.complete = false;
    }

    update() {
        if (this.target != null){
            this.targetX = this.target.x;
            this.targetY = this.target.y;
        }

        let newDirection = Math.atan2(this.targetY - this.y,
                                      this.targetX - this.x);
        this.direction = newDirection;

        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    hit(enemies) {
        if (calculateDistance(this.x, this.y,
                              this.targetX, this.targetY) > this.range ||
            this.reached) {

            return;
        }

        this.reached = true;

        let targets = [];

        for (let i = 0, n = enemies.length; i < n; i++) {
            let enemy = enemies[i];
            if (calculateDistance(enemy.x, enemy.y, this.x, this.y) <= this.range) {
                targets.push(enemy);
            }
        }

        let distributedDamage = this.damage;

        if (this.level == 2) {
            distributedDamage /= targets.length;
        }

        for (let i = 0, n = targets.length; i < n; i++) {
            let target = targets[i];
            if (typeof(this.target.health) == 'object') {
                if (this.target.health.data - this.damage < 0) {
                    this.target.health.data = 0;
                } else {
                    this.target.health.data -= this.damage;
                }
            } else {
                if (target.health - distributedDamage < 0) {
                    target.health = 0;
                } else {
                    target.health -= distributedDamage;
                }
            }
        }
    }

    draw(ctx) {
        if (this.reached) {
            this.explosionFrame++;

            if (this.explosionFrame == 5) {
                this.complete = true;
            }
        } else {
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.x, this.y);

            ctx.rotate(this.direction);

            ctx.drawImage(this.img,
                          0,
                          0,
                          this.width,
                          this.height);

            ctx.restore();
            ctx.stroke();
            ctx.closePath();
        }
    }
}
