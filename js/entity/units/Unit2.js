import { calculateDistance } from './../../utils/utils.js';
import Projectile1 from '../projectiles/Projectile1.js';

export default class Unit2 { //�������� ���
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40; // �����-�� �����
        this.height = 40; //�����-�� �����
        this.speed = CONSTANTA; //�����-�� �����
        this.movement = this.speed;
        this.health = 100;
        this.damage = 10; //�����-�� �����
        this.radius = 50; //�����-�� �����
        this.projectiles = []; //����
        this.target = null; //����
        this.targetIndex = -1;
        this.timer = 1;
        this.chosenUnit = chosenUnit;
    }
    update() {
        if (this.target === null) this.x += this.movement;
        else {
            shoot();
            //this.timer++;
        }
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        if (this.chosenUnit === 2) {
            //������ �����2
        }
    }
    shoot() {
        this.timer++;
        this.projectiles.push(new Projectile({
            target: this.target,
            x: this.x,
            y: this.y
        }))
        if (this.timer === 10) {
            this.radius += 10; //���������� ������� �����
            this.timer = 1;
        }
    }
}