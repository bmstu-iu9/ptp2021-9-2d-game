import { collisiondetection } from './../utils/utils.js';
import * as Constant from './../constants.js';
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

    if (collisiondetection(mouse, Constant.unitCard1)) {
        chosenUnit = 1;
    } else if (collisiondetection(mouse, Constant.unitCard2)) {
        chosenUnit = 2;
    } else if (collisiondetection(mouse, Constant.unitCard3)) {
        chosenUnit = 3;
    } else if (collisiondetection(mouse, Constant.unitCard4)) {
        chosenUnit = 4;
    } else if (collisiondetection(mouse, Constant.unitCard5)) {
        chosenUnit = 5;
    } else if (collisiondetection(mouse, Constant.unitCard6)) {
        chosenUnit = 6;
    } else if (collisiondetection(mouse, Constant.unitCard7)) {
        chosenUnit = 7;
    }

    return chosenUnit;
}

export function putUnit(game) {
    let chosenUnit = game.chosenUnit;

    //const positionX = game.mouse.x - (game.mouse.x % Constant.cellSize);
    const positionY = game.mouse.y - (game.mouse.y % Constant.cellSize);

    switch(chosenUnit) {
        case 1:
            if (game.resources >= 100) {
                let currentUnit = new Unit1(game, Constant.cellSize, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 2:
            if (game.resources >= 100) {
                let currentUnit = new Unit2(game, Constant.cellSize, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 3:
            if (game.resources >= 100) {
                let currentUnit = new Unit3(game, Constant.cellSize, positionY, true);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 4:
            if (game.resources >= 100) {
                let currentUnit = new Unit4(game, Constant.cellSize, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 5:
            if (game.resources >= 100) {
                let currentUnit = new Unit5(game, Constant.cellSize, positionY + Constant.cellSize * 1/4);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 6:
            if (game.resources >= 100) {
                let currentUnit = new Unit6(game, Constant.cellSize, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 7:
            if (game.resources >= 100) {
                let currentUnit = new Unit7(game, Constant.cellSize, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
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

        if (!unit) return;

        unit.shoot();
        unit.draw();
    }
}
