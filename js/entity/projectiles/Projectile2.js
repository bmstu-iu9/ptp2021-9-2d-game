import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Projectile2 {
    constructor(target, x, y, damage, level, img, bangImages) {
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

        this.bangImages = bangImages;
        this.explosionFrame = 0;
        this.reached = false;
        this.complete = false;

        this.check = 0; /////
    }

    update() {
        if (this.target != null){
            this.targetX = this.target.x;
            this.targetY = this.target.y;
        }
        if (this.check < 0) {
            this.y -= this.speed;
            this.check += 1;
        } else {

            let delta = -1.57 + Math.atan2(this.targetY - this.y,
                                   this.targetX - this.x);
            if (delta > 45 * 3.14 / 180) {
                delta = 45 * 3.14 / 180;
            } else if (delta < -45 * 3.14 / 180) {
                delta = -45 * 3.14 / 180;
            }

            this.direction = delta; //Math.atan2(this.targetY - this.y,
                                //   this.targetX - this.x);
            this.x += this.speed * Math.cos(this.direction);
            this.y += this.speed * Math.sin(this.direction);
        }

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
            ctx.drawImage(this.bangImages[this.explosionFrame],
                          this.targetX - Constants.cellSize / 2,
                          this.targetY - Constants.cellSize / 2,
                          this.width * 2,
                          this.height * 2);
            this.explosionFrame++;

            if (this.explosionFrame == 4) {
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
