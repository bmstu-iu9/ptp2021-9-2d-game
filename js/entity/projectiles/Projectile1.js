import { calculateDistance } from './../../utils/utils.js';

export default class Projectile1 {
  constructor(target, x, y){ //
    constructor(target, x, y, upgarde, damage){ //
      this.towerx = x;
      this.towery = y;
      this.targetx = target.x;
      this.targety = target.y;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 5;
      this.speed = 5; //!!! Надо договориться о скорости
      this.movement = this.speed;
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
        this.targetx = target.x;
        this.targety = target.y;
      }


      this.angle = Math.acos(((-this.towerx + (this.targetx + 55)) + 0 * (- this.towery + (this.targety + 55))) /
                                (
                                 Math.sqrt(Math.pow((-this.towerx + (this.targetx + 55)), 2) + Math.pow((- this.towery + (this.targety + 55)), 2)) *
                                 Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2))
                                )
                              );

      this.x += this.movement * Math.cos(this.angle); //!!! Надо договорить о формуле для изменения
                              // координат пули и куда стрелять !!!!!
      if (this.towery > this.targety + 55) {
        this.y += this.movement * Math.sin(this.angle) * -1;
      } else {
        this.y += this.movement * Math.sin(this.angle);
      }

    }
    draw() {

       /*
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'black';
      ctx.font = '30px Orbitron';
      */
      /*
      let angle = Math.acos((this.x * this.y + this.target.x * this.target.x) /
                              (
                               Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) *
                               Math.sqrt(Math.pow(this.target.x, 2) + Math.pow(this.target.x, 2))
                              )
                            );
      */
      // Рисую овал для пули
      if (this.health ) {
        ctx.beginPath();
        ctx.save(); // сохраняем стейт контекста
        ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
        //ctx.rotate(this.angle); // поворот на угол

        if (this.towery > this.targety + 55) {
          ctx.rotate(-this.angle);
        } else {
          ctx.rotate(this.angle);
        }
        ctx.scale(1, this.height/this.width); // сжимаем по вертикали
        ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
        ctx.fill();
        ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
        ctx.strokeStyle = 'red';
        ctx.stroke(); // обводим
        ctx.closePath();
      } else {
        this.explosion += 1;
        if (this.explosion == 5) {
          this.complete = true;
        }
      }

    }

    hit(targets) {
      let list_target = [];

      if ( calculateDistance(this.targetx, this.targety, this.x, this.y) > this.radius || !this.health){
        return ;
      }

      this.health = false;

      if (this.target != null){
        if (this.target.healf - this.damage < 0){
          this.target.healf = 0;
        } else {
          this.target.healf -= this.damage;
        }
      }
    }
}
