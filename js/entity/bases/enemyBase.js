import * as Constants from './../../constants.js';

export default class EnemyBase {
    constructor() {
        this.maxHealth = 10000;
        this.health = { data: this.maxHealth };
    }

    draw(ctx) {
        let img = Constants.enemyBaseImage;

        ctx.drawImage(img,
                      Constants.canvasWidth - Constants.cellSize,
                      Constants.controlBarHeight,
                      Constants.cellSize,
                      Constants.gameGridHeight);

        this.drawHP(ctx);
    }

    drawHP(ctx) {
        let hpBarWidth = Constants.cellSize/10,
            hpBarHeight = Constants.gameGridHeight,
            hpBarTopLeftPosX = Constants.canvasWidth - hpBarWidth,
            hpBarTopLeftPosY = Constants.controlBarHeight + Constants.cellSize / 20,
            hpBarLineWidth = Constants.cellSize / 10;

        ctx.beginPath();
        ctx.rect(hpBarTopLeftPosX, hpBarTopLeftPosY,
                 hpBarWidth, hpBarHeight);
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineWidth = hpBarLineWidth;
        ctx.stroke();

        let lostHPHeight = hpBarHeight * (1 - this.health.data / this.maxHealth);

        ctx.beginPath();
        ctx.rect(hpBarTopLeftPosX, hpBarTopLeftPosY + lostHPHeight,
                 hpBarWidth, hpBarHeight - lostHPHeight);
        ctx.strokeStyle = 'red';
        ctx.lineJoin = 'round';
        ctx.lineWidth = hpBarLineWidth;
        ctx.stroke();
    }
}
