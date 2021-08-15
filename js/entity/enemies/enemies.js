import * as Constant from './../../constants.js';

export default class Enemies {
    constructor(verticalPosition, ctx) {
        this.x = Constant.canvasWidth + 50;
        this.y = verticalPosition + 50;
        this.width = Constant.cellSize;
        this.height = Constant.cellSize;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 1000;
        this.damage = 10;
        this.firerate = 100;
        this.maxHealth = this.health;
        this.ctx = ctx;
    }

    update() {
        this.x -= this.movement;
    }

    draw() {
        let ctx = this.ctx;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 50, this.y - 50, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15 - 50, this.y + 25 - 50)
    }
}
