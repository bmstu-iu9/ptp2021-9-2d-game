export default class PlayerBase {
    constructor() {
        this.health = 10000;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 400, 100, 2520);
    }
}
