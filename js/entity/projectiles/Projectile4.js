import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Projectile4 {
    constructor(target, x, y, damage, slowingInterval, slowingCoeff) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize / 15;
        this.height = Constants.cellSize / 15;

        this.range = Constants.cellSize / 2;

        this.speed = Constants.cellSize * 15/100;
        this.damage = damage;

        this.slowingInterval = slowingInterval;
        this.slowingCoeff = slowingCoeff;

        this.explosionFrame = 0;
        this.reached = false;
        this.complete = false;
    }

    update() {
        if (this.reached) return;

        if (this.target) {
            this.targetX = this.target.x;
            this.targetY = this.target.y;
        }

        let angle = Math.atan2(this.targetY - this.y,
                               this.targetX - this.x);

        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
    }

    hit(enemies) {
        if (calculateDistance(this.x, this.y,
                              this.targetX, this.targetY) > this.range ||
            this.reached) {

            return;
        }

        this.reached = true;

        let target = this.target;

        if (target) {
            target.isSlowed = true;
            target.slowingInterval = this.slowingInterval;
            target.slowingCoeff = this.slowingCoeff;
            target.lastSlowingShotTime = new Date();

            if (target.health - this.damage < 0) {
                target.health = 0;
            } else {
                target.health -= this.damage;
            }
        }
    }

    draw(ctx) {
        if (this.reached) {
            this.explosionFrame++;

            // Здесь будет обработка анимации взрыва

            if (this.explosionFrame == 5) {
                this.complete = true;
            }
        } else {
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(1, this.height/this.width);
            ctx.arc(0, 0, this.width, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.closePath();
        }
    }
}
