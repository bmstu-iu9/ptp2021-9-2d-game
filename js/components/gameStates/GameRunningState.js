import * as Constants from './../../constants.js';
import { chooseTower, putTower } from './../towersProcessing.js';
import { chooseUnit, putUnit } from './../unitsProcessing.js';


export default class GameRunningState {
    constructor(game) {
        this.game = game;
        game.canvas.addEventListener('click', this);
        game.canvas.addEventListener('dblclick', this);
        document.addEventListener('keypress', this);
    }

    processState() {
        this.game.animate();

        if (this.game.enemyBase.health.data == 0) {
            this.game.state = new this.game.states.gameOver(this.game, "WIN");
        } else if (this.game.playerBase.health.data == 0) {
            this.game.state = new this.game.states.gameOver(this.game, "DEFEAT");
        }

        let ctx = this.game.ctx;

        if (Constants.canvasWidth / 30 < Constants.cellSize) {
          ctx.font = Constants.smallMenufontSize + 'px Orbitron';
        } else {
          ctx.font = Constants.largeMenufontSize + 'px Orbitron';
        }

        ctx.fillStyle = this.menuColor;
        ctx.fillText("Menu", Constants.canvasWidth / 2 - (ctx.measureText('Menu').width / 2), Constants.canvasHeight / 10);
    }

    handleEvent(event) {
        let game = this.game;
        let ctx = this.game.ctx;

        if (Constants.canvasWidth / 30 < Constants.cellSize) {
          ctx.font = Constants.smallMenufontSize + 'px Orbitron';
        } else {
          ctx.font = Constants.largeMenufontSize + 'px Orbitron';
        }

        let menuLeftCorner = Constants.canvasWidth / 2 - (ctx.measureText('Menu').width / 2);
        let menuRightCorner = menuLeftCorner + (ctx.measureText('Menu').width);
        let menuBottom = Constants.canvasHeight / 10;
        let menuTop = Constants.canvasHeight / 10 - parseInt(ctx.font) * 1.2;
        switch(event.type) {
            case 'click':
                if (event.clientX > menuLeftCorner &&
                    event.clientX < menuRightCorner  &&
                    event.clientY > menuTop &&
                    event.clientY < menuBottom) {

                    this.removeEventListeners();
                    game.state = new game.states.gamePausing(this.game);
                } else if (event.y <= Constants.controlBarHeight) {
                    let chosenTower = chooseTower(game.ctx, game.mouse);
                    if (chosenTower == game.chosenTower) {
                        game.chosenTower = null;
                    } else {
                        game.chosenTower = chosenTower;
                    }

                    let chosenUnit = chooseUnit(game.ctx, game.mouse);
                    if (chosenUnit == game.chosenUnit) {
                        game.chosenUnit = null;
                    } else {
                        game.chosenUnit = chosenUnit;
                    }
                } else {
                    if (game.chosenTower) {
                        putTower(game);
                    } else if (game.chosenUnit) {
                        putUnit(game);
                    }
                }
                break;

            case 'dblclick':
                if (event.y > Constants.controlBarHeight) {
                    for (let i = 0; i < game.towers.length; i++) {
                        if (Math.floor(game.towers[i].x / Constants.cellSize) == Math.floor(game.mouse.x / Constants.cellSize)
                            && Math.floor(game.towers[i].y / Constants.cellSize) == Math.floor(game.mouse.y / Constants.cellSize)
                            && game.resources >= game.towers[i].upgradeCost) {

                            game.towers[i].upgrade();
                            game.resources -= game.towers[i].upgradeCost;
                        }
                    }
                }
                break;

            case 'keypress':
                if (event.code == 'Space') {
                    this.removeEventListeners();
                    game.state = new game.states.gamePausing(this.game);
                }
                break;
        }
    }

    removeEventListeners() {
        this.game.canvas.removeEventListener('click', this);
        this.game.canvas.removeEventListener('dblclick', this);
        document.removeEventListener('keypress', this);
    }
}
