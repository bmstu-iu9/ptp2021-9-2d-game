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
        this.speed = Constant.cellSize * 3/100;
        this.damage = damage;
        this.level = level;
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
            this.target.health -= this.damage;
            this.target.speed *= 0.95;
        } else {
            epicenterX = this.target.x;
            epicenterY = this.target.y;
            for (let i = 0, n = enemies.length; i < n; i++) {
                let enemy = enemies[i];
                if (calculateDistance(epicenterX, epicenterY,
                                      enemy.x, enemy.y) < 3) {
                    enemy.health -= this.damage;
                    enemy.speed *= 0.95;
                }
            }
        }
        // У врагов нужно создать поле для проверки на то, находится ли он
        // под действием замедления. Если нет, то восстановить скорость
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
