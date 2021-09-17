import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Projectile1 {
    constructor(target, x, y, damage, img, bangImages) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize / 2;
        this.height = Constants.cellSize / 2;

        this.img = img;

        this.direction = 0;
        this.range = Constants.cellSize / 2;

        this.speed = Constants.cellSize * 3/100;
        this.damage = damage;

        this.bangImages = bangImages;
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

            ctx.drawImage(this.img, 0, 0, this.width, this.height);
            ctx.restore();
            ctx.stroke();

            ctx.closePath();
        }
    }
}
