import * as Constants from './../../constants.js';
import { restartGame } from './../../game.js';


export default class GamePausingState {
    constructor(game) {
        this.game = game;
        game.canvas.addEventListener('click', this);
        document.addEventListener('keypress', this);
    }

    processState() {
        let ctx = this.game.ctx,
            menuLeftCorner = Constants.canvasWidth / 2 - (Constants.canvasWidth / (6.8 * 2)),
            menuRightCorner = menuLeftCorner + Constants.canvasWidth / 6.8,
            menuBottom = [Constants.canvasHeight / 2.35, Constants.canvasHeight / 2.07],
            menuTop = [menuBottom[0] + Constants.canvasHeight / 18, menuBottom[1] + Constants.canvasHeight / 18];

        ctx.fillStyle = Constants.menuBg;
        ctx.fillRect(Constants.canvasWidth / 2 - (Constants.canvasWidth / (6.45 * 2)), Constants.canvasHeight / 2.7,
                     Constants.canvasWidth / 6.45, Constants.canvasHeight / 5.5);

        ctx.fillStyle = Constants.colorInMenu;
        ctx.fillRect(menuLeftCorner, menuBottom[0],
                     menuRightCorner - menuLeftCorner, menuTop[0] - menuBottom[0]);

        ctx.font = Constants.pauseWindowFontSize + "px Orbitron";
        ctx.fillStyle = Constants.menuColor;
        ctx.fillText("Menu", Constants.canvasWidth / 2 - (ctx.measureText('Menu').width / 2), Constants.canvasHeight / 2.48);

        ctx.font = Constants.pauseWindowFontSize + "px Orbitron";
        ctx.fillStyle = Constants.menuColor;
        ctx.fillText("Resume", Constants.canvasWidth / 2 - (ctx.measureText('Resume').width / 2), Constants.canvasHeight / 2.15);

        ctx.fillStyle = Constants.colorInMenu;
        ctx.fillRect(menuLeftCorner, menuBottom[1],
                     menuRightCorner - menuLeftCorner, menuTop[1] - menuBottom[1]);

        ctx.font = Constants.pauseWindowFontSize + "px Orbitron";
        ctx.fillStyle = Constants.menuColor;
        ctx.fillText("Restart",  Constants.canvasWidth / 2 - (ctx.measureText('Restart').width / 2), Constants.canvasHeight / 1.92);
    }

    handleEvent(event) {
        let menuLeftCorner = Constants.canvasWidth / 2 - (Constants.canvasWidth / (6.8 * 2)),
            menuRightCorner = menuLeftCorner + Constants.canvasWidth / 6.8,
            menuBottom = [Constants.canvasHeight / 2.35, Constants.canvasHeight / 2.07],
            menuTop = [menuBottom[0] + Constants.canvasHeight / 18, menuBottom[1] + Constants.canvasHeight / 18];

        switch(event.type) {
            case 'click':
                if (event.clientX > menuLeftCorner &&
                    event.clientX < menuRightCorner &&
                    event.clientY > menuBottom[0] &&
                    event.clientY < menuTop[0]) {

                    this.removeEventListeners();
                    this.game.state = new this.game.states.gameRunning(this.game);
                }

                if (event.clientX > menuLeftCorner &&
                    event.clientX < menuRightCorner &&
                    event.clientY > menuBottom[1] &&
                    event.clientY < menuTop[1]) {

                    this.removeEventListeners();
                    restartGame();
                }
                break;

            case 'keypress':
                if (event.code == 'Enter') {
                    this.removeEventListeners();
                    this.game.state = new this.game.states.gameRunning(this.game);
                }
                break;
        }
    }

    removeEventListeners() {
        this.game.canvas.removeEventListener('click', this);
        document.removeEventListener('keypress', this);
    }
}
