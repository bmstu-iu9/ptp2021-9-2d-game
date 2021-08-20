import { collisiondetection } from './../utils/utils.js';
import * as Constants from './../constants.js';

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Constants.cellSize;
        this.height = Constants.cellSize;
    }

    draw(game) {
        let mouse = game.mouse;
        let ctx = game.ctx;

        if (mouse.x && mouse.y && collisiondetection(this, mouse) && mouse.y >= Constants.controlBarHeight) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

export function createGameGrid(game) {
    for (let y = Constants.cellSize; y < game.canvas.height; y += Constants.cellSize) {
        for (let x = 0; x < game.canvas.width; x += Constants.cellSize) {
            game.gameGrid.push(new Cell(x, y));
        }
    }
}
