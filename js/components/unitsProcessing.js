import { collisiondetection } from './../utils/utils.js';
import * as Constant from './../constants.js';
import BaseUnit from './../entity/units/BaseUnit.js';
import Unit1 from './../entity/units/Unit1.js';
import Unit2 from './../entity/units/Unit2.js';
import Unit3 from './../entity/units/Unit2.js';

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

    /*if (game.chosenUnit == 0) {
        game.chosenUnit = chooseUnit(game.ctx, game.mouse)
        game.mouse.click = false;
        return;
    }*/

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

        case 3:
            if (game.resources >= 100) {
                let currentUnit = new Unit3(game, positionX, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 4:
            if (game.resources >= 100) {
                let currentUnit = new Unit1(game, positionX, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 5:
            if (game.resources >= 100) {
                let currentUnit = new Unit2(game, positionX, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 6:
            if (game.resources >= 100) {
                let currentUnit = new Unit3(game, positionX, positionY);
                game.units.push(currentUnit);
                game.resources -= currentUnit.cost;
            }
            break;

        case 7:
            if (game.resources >= 100) {
                let currentUnit = new Unit1(game, positionX, positionY);
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
        unit.shoot();
        unit.draw();
    }
}
