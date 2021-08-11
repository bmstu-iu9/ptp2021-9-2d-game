import { calculateDistance } from './../../utils/utils.js';
import Projectile1 from '../projectiles/Projectile1.js';

export default class Unit1 { //ближнего боя
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40; // какое-то число
        this.height = 40; //какое-то число
        this.speed = CONSTANTA; //какое-то число
        this.movement = this.speed;
        this.health = 100;
        this.damage = 10; //какое-то число
        this.radius = 20; //какое-то число
        this.projectiles = []; //пули
        this.target = null; //цель
        this.targetIndex = -1;
        this.chosenUnit = chosenUnit;
    }
    update() {
        if (this.target === null) this.x += this.movement;
        else shoot();
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        if (this.chosenUnit === 1) {
            //рисуем юнита1
        }
    }
    shoot() {
        this.projectiles.push(new Projectile({
            target: this.target,
            x: this.x,
            y: this.y
        }))
        if (this.health === 25) this.damage = this.damage * 2.5;
    }
}