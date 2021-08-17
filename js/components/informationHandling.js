import Enemies from './../entity/enemies/enemies.js';
import * as Constant from './../constants.js';

export function handleTowers(game) {
    for (let i = 0; i < game.towers.length; i++) {
        game.towers[i].draw();
    }
}

export function handleInformation(ctx, gameover, resources, mybase) {
    let fontSize = Constant.cellSize * 3 / 5;
    ctx.fillStyle = 'black';
    ctx.font = fontSize + 'px Orbitron';
    let delta = Constant.cellSize + (Constant.canvasWidth / 2 - 10 * Constant.cellSize - 6 * Constant.cellSize / 2) / 2;
    ctx.fillText('Resources: ' + resources, Constant.canvasWidth / 2 - delta * 7 / 6, Constant.cellSize * 2 / 3);

    ctx.fillStyle = 'black';
    ctx.font = fontSize + 'px Orbitron';
    ctx.fillText('Towers', (Constant.canvasWidth / 2 - delta - Constant.cellSize) / 2, Constant.cellSize * 3 / 5);

    ctx.fillStyle = 'black';
    ctx.font = fontSize + 'px Orbitron';
    ctx.fillText('Units', Constant.canvasWidth / 2 + (Constant.canvasWidth / 2 - Constant.cellSize) / 2, Constant.cellSize * 3 / 5);

    if (gameover && mybase.health <= 0) {
        ctx.fillStyle = 'red';
        ctx.font = '60px Orbitron';
        ctx.fillText('YOU LOSE', 250, 330);
    }

    if (gameover && enemybase.health <= 0) {
        ctx.fillStyle = 'green';
        ctx.font = '60px Orbitron';
        ctx.fillText('YOU WIN', 250, 330);
    }
}

export function handleGameGrid(game) {
    let gameGrid = game.gameGrid;

    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw(game);
    }
}

export function handleEnemies(enemies, resources, ctx, frame, enemydamage, interval) {

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();

        if (enemies[i].health <= 0) {
            resources += enemies[i].maxHealth / 10;
            enemies.splice(i, 1);
            i--;
        }
    }

    if (frame % interval === 0) {
        let verticalPosition = Math.floor(Math.random() * 13 + 2) * Constant.cellSize;
        enemies.push(new Enemies(verticalPosition, ctx));

        if (interval > 120) {
            interval -= 50;
        }
    }

    if (frame % 2000 === 0 && frame > 0) {
        enemydamage += (frame / 1000);
    }
}

export function detectClickLocation(game) {
    if (game.mouse.y <= Constant.controlBarHeight) {
        return "Control Bar";
    } else {
        return "Game Grid";
    }
}

export function handleControlBar(ctx, chosenTower, chosenUnit) {
    let towerCard1stroke = 'black';
    let towerCard2stroke = 'black';
    let towerCard3stroke = 'black';
    let towerCard4stroke = 'black';
    let towerCard5stroke = 'black';
    let towerCard6stroke = 'black';
    let towerCard7stroke = 'black';

    let unitCard1stroke = 'black';
    let unitCard2stroke = 'black';
    let unitCard3stroke = 'black';
    let unitCard4stroke = 'black';
    let unitCard5stroke = 'black';
    let unitCard6stroke = 'black';
    let unitCard7stroke = 'black';

    switch (chosenTower) {
        case 1:
            towerCard1stroke = 'gold';
            break;

        case 2:
            towerCard2stroke = 'gold';
            break;

        case 3:
            towerCard3stroke = 'gold';
            break;

        case 4:
            towerCard4stroke = 'gold';
            break;

        case 5:
            towerCard5stroke = 'gold';
            break;

        case 6:
            towerCard6stroke = 'gold';
            break;

        case 7:
            towerCard7stroke = 'gold';
            break;
    }

    switch (chosenUnit) {
        case 1:
            unitCard1stroke = 'gold';
            break;

        case 2:
            unitCard2stroke = 'gold';
            break;

        case 3:
            unitCard3stroke = 'gold';
            break;

        case 4:
            unitCard4stroke = 'gold';
            break;

        case 5:
            unitCard5stroke = 'gold';
            break;

        case 6:
            unitCard6stroke = 'gold';
            break;

        case 7:
            unitCard7stroke = 'gold';
            break;
    }

    ctx.lineWidth = Constant.cellSize / 20;

    ctx.fillStyle = 'green';
    ctx.fillRect(Constant.towerCard1.x, Constant.towerCard1.y, Constant.towerCard1.width, Constant.towerCard1.height);
    ctx.strokeStyle = towerCard1stroke;
    ctx.strokeRect(Constant.towerCard1.x, Constant.towerCard1.y, Constant.towerCard1.width, Constant.towerCard1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(Constant.towerCard2.x, Constant.towerCard2.y, Constant.towerCard2.width, Constant.towerCard2.height);
    ctx.strokeStyle = towerCard2stroke;
    ctx.strokeRect(Constant.towerCard2.x, Constant.towerCard2.y, Constant.towerCard2.width, Constant.towerCard2.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(Constant.towerCard3.x, Constant.towerCard3.y, Constant.towerCard3.width, Constant.towerCard3.height);
    ctx.strokeStyle = towerCard3stroke;
    ctx.strokeRect(Constant.towerCard3.x, Constant.towerCard3.y, Constant.towerCard3.width, Constant.towerCard3.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(Constant.towerCard4.x, Constant.towerCard4.y, Constant.towerCard4.width, Constant.towerCard4.height);
    ctx.strokeStyle = towerCard4stroke;
    ctx.strokeRect(Constant.towerCard4.x, Constant.towerCard4.y, Constant.towerCard4.width, Constant.towerCard4.height);

    ctx.fillStyle = 'purple';
    ctx.fillRect(Constant.towerCard5.x, Constant.towerCard5.y, Constant.towerCard5.width, Constant.towerCard5.height);
    ctx.strokeStyle = towerCard5stroke;
    ctx.strokeRect(Constant.towerCard5.x, Constant.towerCard5.y, Constant.towerCard5.width, Constant.towerCard5.height);

    ctx.fillStyle = 'orange';
    ctx.fillRect(Constant.towerCard6.x, Constant.towerCard6.y, Constant.towerCard6.width, Constant.towerCard6.height);
    ctx.strokeStyle = towerCard6stroke;
    ctx.strokeRect(Constant.towerCard6.x, Constant.towerCard6.y, Constant.towerCard6.width, Constant.towerCard6.height);

    ctx.fillStyle = 'pink';
    ctx.fillRect(Constant.towerCard7.x, Constant.towerCard7.y, Constant.towerCard7.width, Constant.towerCard7.height);
    ctx.strokeStyle = towerCard7stroke;
    ctx.strokeRect(Constant.towerCard7.x, Constant.towerCard7.y, Constant.towerCard7.width, Constant.towerCard7.height);

    // кнопки юнитов

    ctx.fillStyle = 'green';
    ctx.fillRect(Constant.unitCard1.x, Constant.unitCard1.y, Constant.unitCard1.width, Constant.unitCard1.height);
    ctx.strokeStyle = unitCard1stroke;
    ctx.strokeRect(Constant.unitCard1.x, Constant.unitCard1.y, Constant.unitCard1.width, Constant.unitCard1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(Constant.unitCard2.x, Constant.unitCard2.y, Constant.unitCard2.width, Constant.unitCard2.height);
    ctx.strokeStyle = unitCard2stroke;
    ctx.strokeRect(Constant.unitCard2.x, Constant.unitCard2.y, Constant.unitCard2.width, Constant.unitCard2.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(Constant.unitCard3.x, Constant.unitCard3.y, Constant.unitCard3.width, Constant.unitCard3.height);
    ctx.strokeStyle = unitCard3stroke;
    ctx.strokeRect(Constant.unitCard3.x, Constant.unitCard3.y, Constant.unitCard3.width, Constant.unitCard3.height);

    ctx.fillStyle = 'purple';
    ctx.fillRect(Constant.unitCard4.x, Constant.unitCard4.y, Constant.unitCard4.width, Constant.unitCard4.height);
    ctx.strokeStyle = unitCard4stroke;
    ctx.strokeRect(Constant.unitCard4.x, Constant.unitCard4.y, Constant.unitCard4.width, Constant.unitCard4.height);

    ctx.fillStyle = 'orange';
    ctx.fillRect(Constant.unitCard5.x, Constant.unitCard5.y, Constant.unitCard5.width, Constant.unitCard5.height);
    ctx.strokeStyle = unitCard5stroke;
    ctx.strokeRect(Constant.unitCard5.x, Constant.unitCard5.y, Constant.unitCard5.width, Constant.unitCard5.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(Constant.unitCard6.x, Constant.unitCard6.y, Constant.unitCard6.width, Constant.unitCard6.height);
    ctx.strokeStyle = unitCard6stroke;
    ctx.strokeRect(Constant.unitCard6.x, Constant.unitCard6.y, Constant.unitCard6.width, Constant.unitCard6.height);

    ctx.fillStyle = 'pink';
    ctx.fillRect(Constant.unitCard7.x, Constant.unitCard7.y, Constant.unitCard7.width, Constant.unitCard7.height);
    ctx.strokeStyle = unitCard7stroke;
    ctx.strokeRect(Constant.unitCard7.x, Constant.unitCard7.y, Constant.unitCard7.width, Constant.unitCard7.height);
}
