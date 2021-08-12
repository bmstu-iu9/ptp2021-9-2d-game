export default class PlayerBase {
    constructor() {
        this.health = 10000;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(0,cellSize,100, 700);
    }
}
