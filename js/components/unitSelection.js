import * as Constant from './../constants.js';
import { collisiondetection } from './../utils/utils.js';

export function chooseUnit(ctx, mouse) {
    let chosenUnit = null;

    if (collisiondetection(mouse, Constant.ucard1)) {
        chosenUnit = 1;
    } else if (collisiondetection(mouse, Constant.ucard2)) {
        chosenUnit = 2;
    }

    return chosenUnit;
}
