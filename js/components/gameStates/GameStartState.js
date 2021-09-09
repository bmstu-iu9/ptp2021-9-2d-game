import * as Constants from './../../constants.js';


export default class GameStartState {
    constructor(game) {
        this.game = game;
        game.canvas.addEventListener('click', this);
    }

    processState() {
        let ctx = this.game.ctx;

        ctx.fillStyle = this.game.menuBg;
        ctx.fillRect(0, 0, Constants.canvasWidth, Constants.canvasHeight);

        ctx.fillStyle = this.game.colorInMenu;
        ctx.fillRect(Constants.canvasWidth / 2.12 , Constants.canvasHeight / 3,
                     Constants.canvasWidth / 10, Constants.canvasHeight / 16);

        ctx.font = Constants.cellSize * 3 / 7 + "px Orbitron";
        ctx.fillStyle = this.game.menuColor;
        ctx.fillText("Start", Constants.canvasWidth/2.01, Constants.canvasHeight / 2.69)
    }

    handleEvent(event) {
        if (event.clientX > Constants.canvasWidth / 2.12 &&
            event.clientX < Constants.canvasWidth / 1.75 &&
            event.clientY > Constants.canvasHeight / 3 &&
            event.clientY < Constants.canvasHeight / 2.52 ) {

            this.game.canvas.removeEventListener('click', this);
            this.game.state = new this.game.states.gameRunning(this.game);
        }
    }
}
