import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Projectile1 {
    constructor(target, x, y, damage) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize * 10/100;
        this.height = Constants.cellSize * 5/100;

        this.direction = 0;
        this.range = Constants.cellSize / 2;

        this.speed = Constants.cellSize * 3/100;
        this.damage = damage;

        this.explosionFrame = 0;
        this.reached = false;
        this.complete = false;
    }

    update() {
        if (this.target) {
            this.targetX = this.target.x;
            this.targetY = this.target.y;
        }

        this.direction = Math.atan2(this.targetY  - this.y,
                                    this.targetX  - this.x);

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

        let target = this.target;

        if (target) {
            if (typeof(target.health) == 'object') {
                if (target.health.data - this.damage < 0) {
                    target.health.data = 0;
                } else {
                    target.health.data -= this.damage;
                }
            } else {
                if (target.health - this.damage < 0) {
                    target.health = 0;
                } else {
                    target.health -= this.damage;
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
