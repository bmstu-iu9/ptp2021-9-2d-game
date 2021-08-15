import { collisiondetection } from './../utils/utils.js';
export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 193.84;
        this.height = 193.84;
    }

    draw(game) {
        let mouse = game.mouse;
        let ctx = game.ctx;

        if (mouse.x && mouse.y && collisiondetection(this, mouse) && mouse.y >= 400) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
