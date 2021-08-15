export default class EnemyBase {
    constructor() {
        this.health = 10000;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(5740 - 100, 400, 100, 2520);
    }
}
