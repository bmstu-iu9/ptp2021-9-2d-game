import * as Constants from './../constants.js';

export function handleBases(game) {
    let ctx = game.ctx;

    if (game.playerBase.health.data == 0) {
        ctx.fillStyle = game.menuBg;
        ctx.fillRect(Constants.canvasWidth / 2.43, Constants.canvasHeight / 2.3,
          Constants.canvasWidth / 5.36, Constants.canvasHeight / 8);

        ctx.fillStyle = game.colorInMenu;
        ctx.fillRect(Constants.canvasWidth / 2.38, Constants.canvasHeight / 1.95,
           Constants.canvasWidth / 6, Constants.canvasHeight / 22.9);

        ctx.font = Constants.cellSize * 3 / 7 + "px Orbitron";
        ctx.fillStyle = game.menuColor;
        ctx.fillText("Restart", Constants.canvasWidth / 2.12, Constants.canvasHeight / 1.84);

        ctx.fillStyle = 'red';
        ctx.font = Constants.cellSize * 2 / 2.7 + 'px Orbitron';
        ctx.fillText('YOU LOSE', Constants.canvasWidth / 2 - Constants.cellSize * 2.2, Constants.canvasHeight / 2);

        game.gameOver = true;
    }

    if (game.enemyBase.health.data == 0) {
        ctx.fillStyle = game.menuBg;
        ctx.fillRect(Constants.canvasWidth / 2.41, Constants.canvasHeight / 2.3,
          Constants.canvasWidth / 5.64, Constants.canvasHeight / 8);

        ctx.fillStyle = game.colorInMenu;
        ctx.fillRect(Constants.canvasWidth / 2.38, Constants.canvasHeight / 1.95,
           Constants.canvasWidth / 6, Constants.canvasHeight / 22.9);


        ctx.font = Constants.cellSize * 3 / 7 + "px Orbitron";
        ctx.fillStyle = game.menuColor;
        ctx.fillText("Restart", Constants.canvasWidth / 2.12, Constants.canvasHeight / 1.84);

        ctx.fillStyle = 'green';
        ctx.font = Constants.cellSize * 2 / 2.7 +'px Orbitron';
        ctx.fillText('YOU WIN', Constants.canvasWidth / 2 - Constants.cellSize * 1.8, Constants.canvasHeight / 2.05);

        game.gameOver = true;
    }
    game.playerBase.draw(ctx);
    game.enemyBase.draw(ctx);
}



export function handleGameGrid(game) {
    let gameGrid = game.gameGrid;

    for (let i = 0, n = gameGrid.length; i < n; i++) {
        gameGrid[i].draw(game);
    }
}


export function handleControlBar(game) {
    let ctx = game.ctx;

    ctx.drawImage(Constants.controlBarBG,
                  0, 0,
                  Constants.controlBarWidth, Constants.controlBarHeight);

    if (new Date - game.last_obtaining_resources_time > game.obtaining_resources_interval) {
        game.resources += 10;
        game.last_obtaining_resources_time = new Date();
    }

    ctx.fillStyle = 'rgb(42, 163, 223)';
    ctx.font = Constants.cellSize * 3 / 5 + 'px Orbitron';

    ctx.fillText('Resources: ' + game.resources, Constants.controlBarWidth / 2 - (ctx.measureText('Resources: ' + game.resources).width / 2), Constants.cellSize * 2 / 3);
    ctx.fillText('Towers', Constants.towerCard4.x + (Constants.cellSize / 2) - (ctx.measureText('Towers').width / 2), Constants.cellSize * 3 / 5);
    ctx.fillText('Units', Constants.unitCard4.x + (Constants.cellSize / 2) - (ctx.measureText('Units').width / 2), Constants.cellSize * 3 / 5);


    ctx.lineWidth = Constants.cellSize / 20;

    for (let i = 1; i <= 7; i++) {
        eval(`ctx.drawImage(Constants.tower${i}Images[0],
                            Constants.towerCard${i}.x,
                            Constants.towerCard${i}.y,
                            Constants.towerCard${i}.width,
                            Constants.towerCard${i}.height)`);

        eval(`ctx.drawImage(Constants.unit${i}RunImages[0],
                            Constants.unitCard${i}.x,
                            Constants.unitCard${i}.y,
                            Constants.unitCard${i}.width,
                            Constants.unitCard${i}.height)`);
    }

    if (game.chosenTower) {
        eval(`ctx.drawImage(Constants.chosenTower${game.chosenTower}Button,
                            Constants.towerCard${game.chosenTower}.x,
                            Constants.towerCard${game.chosenTower}.y,
                            Constants.towerCard${game.chosenTower}.width,
                            Constants.towerCard${game.chosenTower}.height)`);
    }

    if (game.chosenUnit) {
        eval(`ctx.drawImage(Constants.chosenUnit${game.chosenUnit}Button,
                            Constants.unitCard${game.chosenUnit}.x,
                            Constants.unitCard${game.chosenUnit}.y,
                            Constants.unitCard${game.chosenUnit}.width,
                            Constants.unitCard${game.chosenUnit}.height);`);
    }
}
