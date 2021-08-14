export default class PlayerBase {
    constructor() {
        this.health = 10000;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 100, 100, 700);
    }
}
