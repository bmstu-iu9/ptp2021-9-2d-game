import * as Constants from './../../constants.js';
import { restartGame } from './../../game.js';


export default class GameOverState {
    constructor(game, gameResult) {
        this.game = game;
        this.gameResult = gameResult;

        game.canvas.addEventListener('click', this);
    }

    processState() {
        this.game.gameOver = true;

        let ctx = this.game.ctx;

        ctx.fillStyle = Constants.menuBg;
        ctx.fillRect(Constants.canvasWidth / 2.43, Constants.canvasHeight / 2.3,
                     Constants.canvasWidth / 5.36, Constants.canvasHeight / 8);

        ctx.fillStyle = Constants.colorInMenu;
        ctx.fillRect(Constants.canvasWidth / 2.38, Constants.canvasHeight / 1.95,
                     Constants.canvasWidth / 6, Constants.canvasHeight / 22.9);

        if (this.gameResult == "WIN") {
            ctx.fillStyle = 'green';
            ctx.font = Constants.infoFontSize +'px Orbitron';
            ctx.fillText('YOU WIN', Constants.canvasWidth / 2 - Constants.cellSize * 1.8, Constants.canvasHeight / 2.05);
        } else if (this.gameResult == "DEFEAT") {
            ctx.fillStyle = 'red';
            ctx.font = Constants.infoFontSize + 'px Orbitron';
            ctx.fillText('YOU LOSE', Constants.canvasWidth / 2 - Constants.cellSize * 2.2, Constants.canvasHeight / 2);
        }

        ctx.font = Constants.startfontSize + "px Orbitron";
        ctx.fillStyle = Constants.menuColor;
        ctx.fillText("Restart", Constants.canvasWidth / 2.12, Constants.canvasHeight / 1.84);
    }

    handleEvent(event) {
        if (event.clientX > Constants.canvasWidth / 2.43 &&
            event.clientX < Constants.canvasWidth / 1.705  &&
            event.clientY > Constants.canvasHeight / 1.95 &&
            event.clientY < Constants.canvasHeight / 1.8) {

            this.game.canvas.removeEventListener('click', this);
            restartGame();
        }
    }
}
