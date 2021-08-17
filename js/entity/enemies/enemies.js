import * as Constant from './../../constants.js';

export default class Enemies {
    constructor(verticalPosition, ctx) {
        this.x = Constant.canvasWidth + Constant.cellSize / 2;
        this.y = verticalPosition + Constant.cellSize / 2;
        this.width = Constant.cellSize;
        this.height = Constant.cellSize;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 666;
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
        ctx.fillRect(this.x - Constant.cellSize / 2, this.y - Constant.cellSize / 2, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constant.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x - Constant.cellSize / 2 + Constant.cellSize / 30, this.y - Constant.cellSize / 2 + Constant.cellSize / 3);
    }
}
