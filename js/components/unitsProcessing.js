import { chooseUnit } from './unitSelection.js';
import * as Constant from './../constants.js';
import BaseUnit from './../entity/units\BaseUnit.js';
import Unit1 from './../entity/units\Unit1.js';
import Unit2 from './../entity/units\Unit2.js';

export function putUnit(game) {

    if (game.chosenUnit == 0) {
        game.chosenUnit = chooseUnit(game.ctx, game.mouse)
        game.mouse.click = false;
        return;
    }

    let chosenUnit = game.chosenUnit;

    const positionX = game.mouse.x - (game.mouse.x % Constant.cellSize);
    const positionY = game.mouse.y - (game.mouse.y % Constant.cellSize);

    if (positionY < Constant.cellSize) return;

    for (let i = 0; i < game.units.length; i++) {
        if (game.units[i].x === positionX && game.units[i].y === positionY) {
            return;
        }
    }

    switch(chosenUnit) {
        case 1:
            if (game.resources >= 100) {
                let currentUnit = new Unit1(game, positionX, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 2:
            if (game.resources >= 100) {
                let currentUnit = new Unit2(game, positionX, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;
        }
    game.chosenUnit = 0;
}
