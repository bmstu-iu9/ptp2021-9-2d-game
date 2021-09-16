import * as Constants from './../../constants.js';


export default class GamePausingState {
    constructor(game) {
        this.game = game;
        game.canvas.addEventListener('click', this);
        document.addEventListener('keypress', this);
    }

    processState() {
        let ctx = this.game.ctx;

        ctx.fillStyle = this.game.menuBg;
        ctx.fillRect(Constants.canvasWidth / 2.37, Constants.canvasHeight / 2.7,
                     Constants.canvasWidth / 6.45, Constants.canvasHeight / 3);

        ctx.fillStyle = this.game.colorInMenu;
        ctx.fillRect(Constants.canvasWidth / 2.345, Constants.canvasHeight / 2.35 ,
                     Constants.canvasWidth / 6.8, Constants.canvasHeight / 18);

        ctx.font = Constants.pauseWindowFontSize + "px Orbitron";
        ctx.fillStyle = this.game.menuColor;
        ctx.fillText("Menu", Constants.canvasWidth / 2.09, Constants.canvasHeight / 2.48);

        ctx.font = Constants.pauseWindowFontSize + "px Orbitron";
        ctx.fillStyle = this.game.menuColor;
        ctx.fillText("Resume", Constants.canvasWidth / 2.135, Constants.canvasHeight / 2.15);

        ctx.fillStyle = "black";
        ctx.fillRect(Constants.canvasWidth / 2.345, Constants.canvasHeight / 2.07,
                     Constants.canvasWidth / 6.8, Constants.canvasHeight / 18);
    }

    handleEvent(event) {
        switch(event.type) {
            case 'click':
                if (event.clientX > Constants.canvasWidth / 2.345 &&
                    event.clientX < Constants.canvasWidth / 1.745 &&
                    event.clientY > Constants.canvasHeight / 2.35 &&
                    event.clientY < Constants.canvasHeight / 2.07) {

                    this.removeEventListeners();
                    this.game.state = new this.game.states.gameRunning(this.game);
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
