import { detectCollision } from './../utils/utils.js';
import * as Constants from './../constants.js';
import BaseUnit from './../entity/units/BaseUnit.js';
import Unit1 from './../entity/units/Unit1.js';
import Unit2 from './../entity/units/Unit2.js';
import Unit3 from './../entity/units/Unit3.js';
import Unit4 from './../entity/units/Unit4.js';
import Unit5 from './../entity/units/Unit5.js';
import Unit6 from './../entity/units/Unit6.js';
import Unit7 from './../entity/units/Unit7.js';


export function chooseUnit(ctx, mouse) {
    let chosenUnit = null;

    if (detectCollision(mouse, Constants.unitCard1)) {
        chosenUnit = 1;
    } else if (detectCollision(mouse, Constants.unitCard2)) {
        chosenUnit = 2;
    } else if (detectCollision(mouse, Constants.unitCard3)) {
        chosenUnit = 3;
    } else if (detectCollision(mouse, Constants.unitCard4)) {
        chosenUnit = 4;
    } else if (detectCollision(mouse, Constants.unitCard5)) {
        chosenUnit = 5;
    } else if (detectCollision(mouse, Constants.unitCard6)) {
        chosenUnit = 6;
    } else if (detectCollision(mouse, Constants.unitCard7)) {
        chosenUnit = 7;
    }

    return chosenUnit;
}


export function putUnit(game) {
    let positionY = game.mouse.y - (game.mouse.y % Constants.cellSize);

    switch(game.chosenUnit) {
        case 1:
            if (game.resources >= Constants.unit1Cost) {
                game.units.push(new Unit1(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit1Cost;
            }
            break;

        case 2:
            if (game.resources >= Constants.unit2Cost) {
                game.units.push(new Unit2(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit2Cost;
            }
            break;

        case 3:
            if (game.resources >= Constants.unit3Cost) {
                game.units.push(new Unit3(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit3Cost;
            }
            break;

        case 4:
            if (game.resources >= Constants.unit4Cost) {
                game.units.push(new Unit4(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit4Cost;
            }
            break;

        case 5:
            if (game.resources >= Constants.unit5Cost) {
                game.units.push(new Unit5(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit5Cost;
            }
            break;

        case 6:
            if (game.resources >= Constants.unit6Cost) {
                game.units.push(new Unit6(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit6Cost;
            }
            break;

        case 7:
            if (game.resources >= Constants.unit7Cost) {
                game.units.push(new Unit7(game, Constants.cellSize, positionY));
                game.resources -= Constants.unit7Cost;
            }
            break;
        }

    game.chosenUnit = null;
}


export function processUnits(game) {
    let units = game.units;

    for (let i = 0; i < units.length; i++) {
        let unit = units[i];

        unit.update();

        if (unit.died) {
            units.splice(i, 1);
            i--;
            continue;
        }

        unit.shoot();
        unit.draw();
    }
}
