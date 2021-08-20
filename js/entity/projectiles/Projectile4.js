import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Projectile4 {
    constructor(target, x, y, level, damage) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = Constant.cellSize * 15/100;
        this.damage = damage;
        this.level = level;
        this.slowingInterval = 3000;
        this.slowingCoeff = 0.6;
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
        if (calculateDistance(this.x, this.y, this.targetX, this.targetY) > Constant.cellSize / 2 || this.complete) {
            return;
        }

        this.complete = true;

        if (this.level == 1) {
            let target = this.target;

            target.isSlowed = true;
            target.slowingInterval = 3000;
            target.slowingCoeff = 0.6;
            target.lastSlowingShotTime = new Date();

            target.health -= this.damage;
        } else {
            let epicenterX = this.target.x;
            let epicenterY = this.target.y;
            for (let i = 0, n = enemies.length; i < n; i++) {
                let enemy = enemies[i];
                if (calculateDistance(epicenterX, epicenterY,
                                      enemy.x, enemy.y) < 2 * Constant.cellSize) {

                    enemy.isSlowed = true;
                    enemy.slowingInterval = 3000;
                    enemy.slowingCoeff = 0.6;
                    enemy.lastSlowingShotTime = new Date();

                    enemy.health -= this.damage;
                }
            }
        }
    }

    draw(game) {
        if (this.complete) {
            // Здесь будет обработка анимации взрыва
        } else {
            game.ctx.beginPath();
            game.ctx.save();
            game.ctx.translate(this.x, this.y);
            game.ctx.scale(1, this.height/this.width);
            game.ctx.arc(0, 0, this.width, 0, Math.PI*2);
            game.ctx.fill();
            game.ctx.restore();
            game.ctx.strokeStyle = 'red';
            game.ctx.stroke();
            game.ctx.closePath();
        }
    }
}
