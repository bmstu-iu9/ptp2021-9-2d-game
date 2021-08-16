import * as Constant from './../constants.js';
import { collisiondetection } from './../utils/utils.js';

export function chooseTower(ctx, mouse) {
    let chosenTower = null;

    if (collisiondetection(mouse, Constant.card1)) {
        chosenTower = 1;
    } else if (collisiondetection(mouse, Constant.card2)) {
        chosenTower = 2;
    } else if (collisiondetection(mouse, Constant.card3)) {
        chosenTower = 3;
    } else if (collisiondetection(mouse, Constant.card4)) {
        chosenTower = 4;
    } else if (collisiondetection(mouse, Constant.card5)) {
        chosenTower = 5;
    }

    return chosenTower;
}
