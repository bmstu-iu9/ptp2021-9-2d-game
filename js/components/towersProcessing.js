import { chooseTower } from './towerSelection.js';
import * as Constant from './../constants.js';

export function putTower(towers, mouse, resources, ctx) {
    console.log("chek")
    let chosenTower = chooseTower(ctx, mouse)
    const positionX = mouse.x - (mouse.x % Constant.cellSize);
    const positionY = mouse.y - (mouse.y % Constant.cellSize);

    if (positionY < Constant.cellSize) return;

    for (let i = 0; i < towers.length; i++) {
        if (towers[i].x === positionX && towers[i].y === positionY) {
            return;
        }
    }

    switch(chosenTower) {
        case 1:
            if (resources >= 100) {
                let currentTower = new Tower1(positionX, positionY);
                towers.push(currentTower);
                resources -= currentTower.cost;
            }

        case 2:
            if (resources >= 100) {
                let currentTower = new Tower2(positionX, positionY);
                towers.push(currentTower);
                resources -= currentTower.cost;
            }

        case 3:
            if (resources >= 100) {
                let currentTower = new Tower3(positionX, positionY);
                towers.push(currentTower);
                resources -= currentTower.cost;
            }

        case 4:
            if (resources >= 100) {
                let currentTower = new Tower4(positionX, positionY);
                towers.push(currentTower);
                resources -= currentTower.cost;
            }

        case 5:
            if (resources >= 100) {
                let currentTower = new Tower1(positionX, positionY);
                towers.push(currentTower);
                resources -= currentTower.cost;
            }
    }
}
