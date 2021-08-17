import { collisiondetection } from './../utils/utils.js';
import * as Constant from './../constants.js';

export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Constant.cellSize;
        this.height = Constant.cellSize;
    }

    draw(game) {
        let mouse = game.mouse;
        let ctx = game.ctx;

        if (mouse.x && mouse.y && collisiondetection(this, mouse) && mouse.y >= Constant.controlBarHeight) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
