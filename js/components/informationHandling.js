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
    let delta = (Constants.cellSize * 3 / 5) / 2;

    ctx.drawImage(Constants.controlBarBG,
                  0, 0,
                  Constants.controlBarWidth, Constants.controlBarHeight);

    if (new Date - game.last_obtaining_resources_time > game.obtaining_resources_interval) {
        game.resources += 10;
        game.last_obtaining_resources_time = new Date();
    }

    ctx.fillStyle = 'rgb(42, 163, 223)';
    ctx.font = Constants.cellSize * 3 / 5 + 'px Orbitron';

    ctx.fillText('Resources: ' + game.resources, Constants.controlBarWidth / 2 - ((7 /*+ ("11" + game.resources).length*/) * delta), Constants.cellSize * 2 / 3);
    ctx.fillText('Towers', Constants.controlBarWidth / 4 - (6 * delta), Constants.cellSize * 3 / 5);
    ctx.fillText('Units', Constants.controlBarWidth * 3 / 4 - (5 * delta), Constants.cellSize * 3 / 5);


    ctx.lineWidth = Constants.cellSize / 20;

    // кнопки башен

    ctx.drawImage(Constants.tower1Images[0],
                  Constants.towerCard1.x, Constants.towerCard1.y,
                  Constants.towerCard1.width, Constants.towerCard1.height);

    ctx.drawImage(Constants.tower2Images[0],
                  Constants.towerCard2.x, Constants.towerCard2.y,
                  Constants.towerCard2.width, Constants.towerCard2.height);

    ctx.drawImage(Constants.tower3Images[0],
                  Constants.towerCard3.x, Constants.towerCard3.y,
                  Constants.towerCard3.width, Constants.towerCard3.height);

    ctx.drawImage(Constants.tower4Images[0],
                  Constants.towerCard4.x, Constants.towerCard4.y,
                  Constants.towerCard4.width, Constants.towerCard4.height);

    ctx.drawImage(Constants.tower5Images[0],
                  Constants.towerCard5.x, Constants.towerCard5.y,
                  Constants.towerCard5.width, Constants.towerCard5.height);

    ctx.drawImage(Constants.tower6Images[0],
                  Constants.towerCard6.x, Constants.towerCard6.y,
                  Constants.towerCard6.width, Constants.towerCard6.height);

    ctx.drawImage(Constants.tower7Images[0],
                  Constants.towerCard7.x, Constants.towerCard7.y,
                  Constants.towerCard7.width, Constants.towerCard7.height);

    switch (game.chosenTower) {
        case 1:
            ctx.drawImage(Constants.chosenTower1Button,
                          Constants.towerCard1.x, Constants.towerCard1.y,
                          Constants.towerCard1.width, Constants.towerCard1.height);
            break;

        case 2:
            ctx.drawImage(Constants.chosenTower2Button,
                          Constants.towerCard2.x, Constants.towerCard2.y,
                          Constants.towerCard2.width, Constants.towerCard2.height);
            break;

        case 3:
            ctx.drawImage(Constants.chosenTower3Button,
                          Constants.towerCard3.x, Constants.towerCard3.y,
                          Constants.towerCard3.width, Constants.towerCard3.height);
            break;

        case 4:
            ctx.drawImage(Constants.chosenTower4Button,
                          Constants.towerCard4.x, Constants.towerCard4.y,
                          Constants.towerCard4.width, Constants.towerCard4.height);
            break;

        case 5:
            ctx.drawImage(Constants.chosenTower5Button,
                          Constants.towerCard5.x, Constants.towerCard5.y,
                          Constants.towerCard5.width, Constants.towerCard5.height);
            break;

        case 6:
            ctx.drawImage(Constants.chosenTower6Button,
                          Constants.towerCard6.x, Constants.towerCard6.y,
                          Constants.towerCard6.width, Constants.towerCard6.height);
            break;

        case 7:
            ctx.drawImage(Constants.chosenTower7Button,
                          Constants.towerCard7.x, Constants.towerCard7.y,
                          Constants.towerCard7.width, Constants.towerCard7.height);
            break;
    }

    // кнопки юнитов

    ctx.drawImage(Constants.unit1RunImages[0],
                  Constants.unitCard1.x, Constants.unitCard1.y,
                  Constants.unitCard1.width, Constants.unitCard1.height);

    ctx.drawImage(Constants.unit2RunImages[0],
                  Constants.unitCard2.x, Constants.unitCard2.y,
                  Constants.unitCard2.width, Constants.unitCard2.height);

    ctx.drawImage(Constants.unit3RunImages[0],
                  Constants.unitCard3.x, Constants.unitCard3.y,
                  Constants.unitCard3.width, Constants.unitCard3.height);

    ctx.drawImage(Constants.unit4RunImages[0],
                  Constants.unitCard4.x, Constants.unitCard4.y,
                  Constants.unitCard4.width, Constants.unitCard4.height);

    ctx.drawImage(Constants.unit5RunImages[0],
                  Constants.unitCard5.x, Constants.unitCard5.y,
                  Constants.unitCard5.width, Constants.unitCard5.height);

    ctx.drawImage(Constants.unit6HitImages[1],
                  Constants.unitCard6.x, Constants.unitCard6.y,
                  Constants.unitCard6.width, Constants.unitCard6.height);

    ctx.drawImage(Constants.unit7RunImages[0],
                  Constants.unitCard7.x, Constants.unitCard7.y,
                  Constants.unitCard7.width, Constants.unitCard7.height);

    switch (game.chosenUnit) {
        case 1:
            ctx.drawImage(Constants.chosenUnit1Button,
                          Constants.unitCard1.x, Constants.unitCard1.y,
                          Constants.unitCard1.width, Constants.unitCard1.height);
            break;

        case 2:
            ctx.drawImage(Constants.chosenUnit2Button,
                          Constants.unitCard2.x, Constants.unitCard2.y,
                          Constants.unitCard2.width, Constants.unitCard2.height);
            break;

        case 3:
            ctx.drawImage(Constants.chosenUnit3Button,
                          Constants.unitCard3.x, Constants.unitCard3.y,
                          Constants.unitCard3.width, Constants.unitCard3.height);
            break;

        case 4:
            ctx.drawImage(Constants.chosenUnit4Button,
                          Constants.unitCard4.x, Constants.unitCard4.y,
                          Constants.unitCard4.width, Constants.unitCard4.height);
            break;

        case 5:
            ctx.drawImage(Constants.chosenUnit5Button,
                          Constants.unitCard5.x, Constants.unitCard5.y,
                          Constants.unitCard5.width, Constants.unitCard5.height);
            break;

        case 6:
            ctx.drawImage(Constants.chosenUnit6Button,
                          Constants.unitCard6.x, Constants.unitCard6.y,
                          Constants.unitCard6.width, Constants.unitCard6.height);
            break;

        case 7:
            ctx.drawImage(Constants.chosenUnit7Button,
                          Constants.unitCard7.x, Constants.unitCard7.y,
                          Constants.unitCard7.width, Constants.unitCard7.height);
            break;
    }
}
