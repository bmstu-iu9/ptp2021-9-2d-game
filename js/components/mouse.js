import * as Constants from './../constants.js';
import { chooseTower, putTower } from './towersProcessing.js';
import { chooseUnit, putUnit } from './unitsProcessing.js';

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

        this.canvas.addEventListener('click', function () {
            let clickLocation = game.mouse.detectClickLocation(game);

            if (clickLocation == "Control Bar") {
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
            } else if (clickLocation == "Game Grid") {
                if (game.chosenTower) {
                    putTower(game);
                } else if (game.chosenUnit) {
                    putUnit(game);
                }
            }
        });

        this.canvas.addEventListener('dblclick', function () {
            let clickLocation = game.mouse.detectClickLocation(game);

            if (clickLocation == "Game Grid") {
              for (let i = 0; i < game.towers.length; i++) {
                  if (Math.floor(game.towers[i].x / Constants.cellSize) == Math.floor(game.mouse.x / Constants.cellSize)
                      && Math.floor(game.towers[i].y / Constants.cellSize) == Math.floor(game.mouse.y / Constants.cellSize)
                      && game.resources >= game.towers[i].upgradecost) {
                        game.towers[i].upgrade();
                        game.resources -= game.towers[i].upgradecost;
                  }
              }
            }
        });
    }

    detectClickLocation(game) {
        if (game.mouse.y <= Constants.controlBarHeight) {
            return "Control Bar";
        } else {
            return "Game Grid";
        }
    }
}
