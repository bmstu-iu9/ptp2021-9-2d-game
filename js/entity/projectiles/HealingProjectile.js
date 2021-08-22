import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class HealingProjectile {
    constructor(target, x, y, healing) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize / 25;
        this.height = Constants.cellSize / 25;

        this.speed = Constants.cellSize / 15;
        this.healing = healing;

        this.complete = false;
    }

    update() {
        if (this.complete) return;

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
        if (calculateDistance(this.x, this.y, this.targetX, this.targetY) > Constants.cellSize / 2 || this.complete) {
            return;
        }

        this.complete = true;

        if (this.target.health + this.healing >= this.target.maxHealth) {
            this.target.health = this.target.maxHealth;
        } else {
            this.target.health += this.healing;
        }
    }

    draw(ctx) {
        if (this.complete) {
            // Здесь будет обработка анимации лечения
        } else {
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(1, this.height/this.width);
            ctx.arc(0, 0, this.width, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
            ctx.strokeStyle = 'green';
            ctx.stroke();
            ctx.closePath();
        }
    }
}
