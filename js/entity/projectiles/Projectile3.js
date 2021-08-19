import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';

export default class Projectile3 {
    constructor(target, x, y, damage, upgrade) {
        this.towerx = x;
        this.towery = y;
        this.targetX = target.x;
        this.targetY = target.y;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 20;
        this.speed = Constant.cellSize / 100;
        this.health = true;
        this.damage = damage;
        this.radius = 6 * Constant.cellSize + Constant.cellSize / 2;
        this.target = target;
        this.angle = 0;
        this.delta_update_damage = 50;
        this.upgrade = upgrade;
        this.explosion = 0;
        this.complete = false;
    }

    update() {
        if (this.target != null) {
            this.targetX = this.target.x;
        }

        this.x += this.speed;

        if (this.x - this.towerx >= this.radius) {
            this.complete = true;
        }
    }

    draw(game) {
        if (this.complete) {
            return;
        }

        if (this.health) {
            game.ctx.beginPath();
            game.ctx.save(); // сохраняем стейт контекста
            game.ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
            game.ctx.scale(1, this.height/this.width); // сжимаем по вертикали
            game.ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
            game.ctx.strokeStyle = 'black';
            game.ctx.fill();
            game.ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
            game.ctx.strokeStyle = 'red';
            game.ctx.stroke(); // обводим
            game.ctx.closePath();
        } else {
            this.explosion += 1;
            if (this.explosion == 5) {
                this.complete = true;
            }
        }
    }

    hit(enemies) {
        if (this.complete) {
            return;
        }

        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];

            if (calculateDistance(enemy.x, 0, this.x, 0) < 0.8 &&
               (this.y == enemy.y)) {
                   enemy.health -= this.damage;
            }
        }
    }
}
