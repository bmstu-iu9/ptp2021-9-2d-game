import { collisiondetection } from './../utils/utils.js';
import * as Constant from './../constants.js';
import BaseTower from './../entity/towers/BaseTower.js';
import Tower1 from './../entity/towers/Tower1.js';
import Tower2 from './../entity/towers/Tower2.js';
import Tower3 from './../entity/towers/Tower3.js';
import Tower4 from './../entity/towers/Tower4.js';
import Tower5 from './../entity/towers/Tower5.js';
import Tower6 from './../entity/towers/Tower6.js';
import Tower7 from './../entity/towers/Tower7.js';

export function chooseTower(ctx, mouse) {
    let chosenTower = null;

    if (collisiondetection(mouse, Constant.towerCard1)) {
        chosenTower = 1;
    } else if (collisiondetection(mouse, Constant.towerCard2)) {
        chosenTower = 2;
    } else if (collisiondetection(mouse, Constant.towerCard3)) {
        chosenTower = 3;
    } else if (collisiondetection(mouse, Constant.towerCard4)) {
        chosenTower = 4;
    } else if (collisiondetection(mouse, Constant.towerCard5)) {
        chosenTower = 5;
    } else if (collisiondetection(mouse, Constant.towerCard6)) {
        chosenTower = 6;
    } else if (collisiondetection(mouse, Constant.towerCard7)) {
        chosenTower = 7;
    }

    return chosenTower;
}

export function putTower(game) {
    let chosenTower = game.chosenTower;

    const positionX = game.mouse.x - (game.mouse.x % Constant.cellSize);
    const positionY = game.mouse.y - (game.mouse.y % Constant.cellSize);

    for (let i = 0; i < game.towers.length; i++) {
        if (Math.floor(game.towers[i].x / Constant.cellSize) === Math.floor(game.mouse.x / Constant.cellSize)
            && Math.floor(game.towers[i].y / Constant.cellSize) === Math.floor(game.mouse.y / Constant.cellSize)) {
            return;
        }
    }

    switch(chosenTower) {
        case 1:
              if (100 <= game.resources) {
                  let currentTower = new Tower1(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;

        case 2:
              if (100 <= game.resources) {
                  let currentTower = new Tower2(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;

        case 3:
              if (100 <= game.resources) {
                  let currentTower = new Tower3(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;

        case 4:
              if (100 <= game.resources) {
                  let currentTower = new Tower4(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;

        case 5:
              if (100 <= game.resources) {
                  let currentTower = new Tower5(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;

        case 6:
              if (100 <= game.resources) {
                  let currentTower = new Tower6(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;

        case 7:
              if (100 <= game.resources) {
                  let currentTower = new Tower7(game, positionX, positionY);
                  game.towers.push(currentTower);
                  game.resources -= currentTower.cost;
              }
            break;
        }

    game.chosenTower = null;
}

export function upgradeOpportunity(tower, game) {
    game.ctx.beginPath();
    game.ctx.strokeStyle = 'gray'   // надо адекватный цвет придумать...
    game.ctx.strokeRect(tower.x - Constant.cellSize / 2 - 1, tower.y - Constant.cellSize / 2 - 1, tower.width + 2, tower.height + 2);
}

export function processTowers(game) {
    for (let i = 0; i < game.towers.length; i++) {
        game.towers[i].draw();
        if (game.resources >= game.towers[i].upgradecost) {
            upgradeOpportunity(game.towers[i], game)
        }
        if (game.towers[i].health <= 0) {
            game.towers.splice(i, 1);
            i--;
        }
    }
}
