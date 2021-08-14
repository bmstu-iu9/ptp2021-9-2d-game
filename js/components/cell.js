import { collisiondetection } from './../utils/utils.js';
export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }

    draw(game) {
        let mouse = game.mouse;
        let ctx = game.ctx;
        //console.log(mouse.x, mouse.y);
        if (mouse.x && mouse.y && collisiondetection(this, mouse)) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
