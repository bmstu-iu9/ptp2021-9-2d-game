import * as Constants from './../constants.js';

export function detectClickLocation(game) {
    if (game.mouse.y <= Constants.controlsBarHeight) {
        return "Control Bar";
    } else {
        return "Game Grid";
    }
}
