export default class EnemyBase {
    constructor() {
        this.health = 10000;
    }
    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(3000 - 100, 100, 100, 700);
    }
}
