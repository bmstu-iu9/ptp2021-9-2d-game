import { calculateDistance } from './../../utils/utils.js';

export default class Projectile4 {
    constructor(target, x, y, level, damage) {
        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = 3;
        this.damage = damage;
        this.level = level;
        this.hit = false;
    }

    update() {
        if (this.hit) return;

        if (this.target) {
            this.targetX = this.target.x;
            this.targetY = this.target.y;
        }

        let angle = Math.atan2(this.targetY + 50 - this.y,
                               this.targetX + 50 - this.x);
        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
    }

    hit(enemies) {
        if (calculateDistance(this.x, this.y, this.targetX, this.targetY) > 30 || this.hit) {
            return;
        }

        this.hit = true;

        if (this.level == 1) {
            this.target.health -= this.damage;
            this.target.movement *= 0.6;
        } else {
            epicenterX = this.target.x;
            epicenterY = this.target.y;
            for (let i = 0, n = enemies.length; i < n; i++) {
                let enemy = enemies[i];
                if (calculateDistance(epicenterX, enemy.x,
                                      epicenterY, enemy.y) < 50) {
                    enemy.health -= this.damage;
                    enemy.movement *= 0.6;
                }
            }
        }
        // У врагов нужно создать поле для проверки на то, находится ли он
        // под действием замедления. Если нет, то восстановить скорость
    }

    draw(ctx) {
        if (this.hit) {
            this.complete = true;
            // Здесь будет обработка анимации взрыва
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
