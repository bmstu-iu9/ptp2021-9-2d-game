import { calculateDistance } from './../../utils/utils.js';

export default class Projectile1 {
    constructor(target, x, y, upgrade, damage) { //
        this.towerx = x;
        this.towery = y;
        this.targetX = target.x;
        this.targetY = target.y;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 5;
        this.speed = 5; //!!! Надо договориться о скорости
        this.health = true;
        this.damage = damage; //!!! Нада договориться про урон снаряда
        this.radius = 0;
        this.target = target;
        this.angle = 0;
        this.delta_update_damage = 50; // Надо договориться!
        this.upgrade = upgrade;
        this.explosion = 0;
        this.complete = false;
    }

    update() {

      if (this.target != null){
        this.targetX = target.x;
        this.targetY = target.y;
      }


      this.angle = Math.atan2(this.targetY + 50 - this.y,
                             this.targetX + 50 - this.x);
      this.x += this.speed * Math.cos(angle);
      this.y += this.speed * Math.sin(angle);

    }

    draw(game) {
      // Рисую овал для пули
        if (this.health ) {
            
            game.ctx.beginPath();
            game.ctx.save(); // сохраняем стейт контекста
            game.ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
            //ctx.rotate(this.angle); // поворот на угол
            game.ctx.rotate(this.angle);
            game.ctx.scale(1, this.height/this.width); // сжимаем по вертикали
            game.ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
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

    hit(targets) {
        let list_target = [];

        if (calculateDistance(this.targetX, this.targetY, this.x, this.y) > this.radius || !this.health) {
            return ;
        }

        this.health = false;

        if (this.target != null) {
            if (this.target.health - this.damage < 0) {
                this.target.health = 0;
            } else {
                this.target.health -= this.damage;
            }
        }
    }
}
