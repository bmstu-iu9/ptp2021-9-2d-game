import { detectCollision } from './../utils/utils.js';
import * as Constants from './../constants.js';
import Tower1 from './../entity/towers/Tower1.js';
import Tower2 from './../entity/towers/Tower2.js';
import Tower3 from './../entity/towers/Tower3.js';
import Tower4 from './../entity/towers/Tower4.js';
import Tower5 from './../entity/towers/Tower5.js';
import Tower6 from './../entity/towers/Tower6.js';
import Tower7 from './../entity/towers/Tower7.js';


export function chooseTower(ctx, mouse) {
    let chosenTower = null;

    if (detectCollision(mouse, Constants.towerCard1)) {
        chosenTower = 1;
    } else if (detectCollision(mouse, Constants.towerCard2)) {
        chosenTower = 2;
    } else if (detectCollision(mouse, Constants.towerCard3)) {
        chosenTower = 3;
    } else if (detectCollision(mouse, Constants.towerCard4)) {
        chosenTower = 4;
    } else if (detectCollision(mouse, Constants.towerCard5)) {
        chosenTower = 5;
    } else if (detectCollision(mouse, Constants.towerCard6)) {
        chosenTower = 6;
    } else if (detectCollision(mouse, Constants.towerCard7)) {
        chosenTower = 7;
    }

    return chosenTower;
}


export function putTower(game) {
    const positionX = game.mouse.x - (game.mouse.x % Constants.cellSize),
          positionY = game.mouse.y - (game.mouse.y % Constants.cellSize);

    for (let i = 0, n = game.towers.length; i < n; i++) {
        if (Math.floor(game.towers[i].x / Constants.cellSize) == Math.floor(game.mouse.x / Constants.cellSize) &&
            Math.floor(game.towers[i].y / Constants.cellSize) == Math.floor(game.mouse.y / Constants.cellSize)) {

            return;
        }
    }

    switch(game.chosenTower) {
        case 1:
            if (game.resources >= Constants.tower1Cost) {
                game.towers.push(new Tower1(game, positionX, positionY));
                game.resources -= Constants.tower1Cost;
            }
            break;

        case 2:
            if (game.resources >= Constants.tower2Cost) {
                game.towers.push(new Tower2(game, positionX, positionY));
                game.resources -= Constants.tower2Cost;
            }
            break;

        case 3:
            if (game.resources >= Constants.tower3Cost) {
                game.towers.push(new Tower3(game, positionX, positionY));
                game.resources -= Constants.tower3Cost;
            }
            break;

        case 4:
            if (game.resources >= Constants.tower4Cost) {
                game.towers.push(new Tower4(game, positionX, positionY));
                game.resources -= Constants.tower4Cost;
            }
            break;

        case 5:
            if (game.resources >= Constants.tower5Cost) {
                game.towers.push(new Tower5(game, positionX, positionY));
                game.resources -= Constants.tower5Cost;
            }
            break;

        case 6:
            if (game.resources >= Constants.tower6Cost) {
                game.towers.push(new Tower6(game, positionX, positionY));
                game.resources -= Constants.tower6Cost;
            }
            break;

        case 7:
            if (game.resources >= Constants.tower7Cost) {
                game.towers.push(new Tower7(game, positionX, positionY));
                game.resources -= Constants.tower7Cost;
            }
            break;
        }

    game.chosenTower = null;
}


export function processTowers(game) {
    let towers = game.towers;

    for (let i = 0; i < towers.length; i++) {
        let tower = towers[i];

        tower.update();

        if (tower.died) {
            towers.splice(i, 1);
            i--;
            continue;
        }

        if (tower.level == 1 && game.resources >= tower.upgradecost) {
            drawUpgradeOpportunity(tower, game.ctx)
        }

        tower.shoot();
        tower.draw();
    }
}


export function drawUpgradeOpportunity(tower, ctx) {
    ctx.beginPath();
    ctx.lineWidth = Constants.cellSize / 10;
    ctx.strokeStyle = 'Darkred';
    ctx.strokeRect(tower.x - Constants.cellSize / 2,
                   tower.y - Constants.cellSize / 2,
                   tower.width,
                   tower.height);
}
