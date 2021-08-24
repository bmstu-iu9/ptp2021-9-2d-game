import * as Constants from './../../constants.js';

export default class PlayerBase {
    constructor() {
        this.health = { data: 100000};
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0,
                     Constants.controlBarHeight,
                     Constants.cellSize,
                     Constants.canvasHeight - Constants.controlBarHeight);
        ctx.fillStyle = 'white';
        ctx.font =  Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health.data), 2, Constants.cellSize);
    }
}
