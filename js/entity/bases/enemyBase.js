import * as Constants from './../../constants.js';

export default class EnemyBase {
    constructor() {
        this.health = 10000;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(Constants.canvasWidth - Constants.cellSize,
                     Constants.controlBarHeight,
                     Constants.cellSize,
                     Constants.canvasHeight - Constants.controlBarHeight);

        ctx.fillStyle = 'white';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(10000, Constants.canvasWidth - 5 * Constants.cellSize / 3, Constants.cellSize );
    }
}
