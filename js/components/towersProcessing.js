import { chooseTower } from './towerSelection.js';
import * as Constant from './../constants.js';
import BaseTower from './../entity/towers/BaseTower.js';
import Tower1 from './../entity/towers/Tower1.js';
import Tower2 from './../entity/towers/Tower2.js';
import Tower3 from './../entity/towers/Tower3.js';
import Tower4 from './../entity/towers/Tower4.js';

export function putTower(game) {
    console.log("chek")
    let chosenTower = chooseTower(game.ctx, game.mouse)
    const positionX = game.mouse.x - (game.mouse.x % Constant.cellSize);
    const positionY = game.mouse.y - (game.mouse.y % Constant.cellSize);

    if (positionY < Constant.cellSize) return;

    for (let i = 0; i < game.towers.length; i++) {
        if (game.towers[i].x === positionX && game.towers[i].y === positionY) {
            return;
        }
    }

    switch(chosenTower) {
        case 1:
            if (game.resources >= 100) {
                let currentTower = new Tower1(game.ctx, positionX, positionY,
                                              game.projectiles, game.enemies);
                game.towers.push(currentTower);
                game.resources -= currentTower.cost;
            }

        case 2:
            if (game.resources >= 100) {
                let currentTower = new Tower2(game.ctx, positionX, positionY,
                                              game.projectiles, game.enemies);
                game.towers.push(currentTower);
                game.resources -= currentTower.cost;
            }

        case 3:
            if (game.resources >= 100) {
                let currentTower = new Tower3(game.ctx, positionX, positionY,
                                              game.projectiles, game.enemies);
                game.towers.push(currentTower);
                game.resources -= currentTower.cost;
            }

        case 4:
            if (game.resources >= 100) {
                let currentTower = new Tower4(game.ctx, positionX, positionY,
                                              game.projectiles, game.enemies);
                game.towers.push(currentTower);
                game.resources -= currentTower.cost;
            }

        case 5:
            if (game.resources >= 100) {
                let currentTower = new Tower1(game.ctx, positionX, positionY,
                                              game.projectiles, game.enemies);
                game.towers.push(currentTower);
                game.resources -= currentTower.cost;
            }
    }
}
