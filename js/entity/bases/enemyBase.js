export default class EnemyBase {
    constructor() {
        this.health = 10000;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width - cellSize,cellSize,100, 700);
    }
}
