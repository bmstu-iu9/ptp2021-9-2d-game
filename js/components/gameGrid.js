import { detectCollision } from './../utils/utils.js';
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
        var img = new Image();
        img.src = "./js/images/background/2.png";
        ctx.drawImage(img, this.x, this.y, Constants.cellSize, Constants.cellSize);
        if (mouse.x && mouse.y && detectCollision(this, mouse) &&
            mouse.y >= Constants.controlBarHeight) {

            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

export function createGameGrid(game) {
    for (let y = Constants.controlBarHeight; y < game.canvas.height; y += Constants.cellSize) {
        for (let x = Constants.cellSize; x + Constants.cellSize < game.canvas.width; x += Constants.cellSize) {
            game.gameGrid.push(new Cell(x, y));
        }
    }
}
