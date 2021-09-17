import * as Constants from './../constants.js';


export default class Mouse {
    constructor(game) {
        this.x = 0;
        this.y =  0;
        this.width = 0.1;
        this.height = 0.1;
        this.canvas = game.canvas;
    }

    init(game) {
        let canvasPosition = game.canvas.getBoundingClientRect();

        this.canvas.addEventListener('mousemove', function(e) {
            game.mouse.x = e.x - canvasPosition.left;
            game.mouse.y = e.y - canvasPosition.top;
        });
    }
}
