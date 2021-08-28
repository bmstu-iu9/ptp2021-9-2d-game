import * as Constants from './../constants.js';

export function handleBases(game) {
    let ctx = game.ctx;

    if (game.playerBase.health.data == 0) {
        ctx.fillStyle = 'red';
        ctx.font = '60px Orbitron';
        ctx.fillText('YOU LOSE', Constants.canvasWidth / 2 - Constants.cellSize * 3, Constants.canvasHeight / 2);
        game.gameOver = true;
    }

    if (game.enemyBase.health.data == 0) {
        ctx.fillStyle = 'green';
        ctx.font = '60px Orbitron';
        ctx.fillText('YOU WIN', Constants.canvasWidth / 2 - Constants.cellSize * 3, Constants.canvasHeight / 2);
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

    /*var img = new Image();
    img.src = "./../../../images/background/0.png";
    ctx.drawImage(img, 0, 0, game.canvas.width, game.canvas.height);*/
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    /*ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, Constants.controlBarWidth, Constants.controlBarHeight);*/
    var img = new Image();
    img.src = "./../../../images/background/1.png";
    ctx.drawImage(img, 0, 0, Constants.controlBarWidth, Constants.controlBarHeight);

    if (new Date - game.last_obtaining_resources_time > game.obtaining_resources_interval) {
        game.resources += 10;
        game.last_obtaining_resources_time = new Date();
    }

    let fontSize = Constants.cellSize * 3 / 5;
    ctx.fillStyle = 'rgb(42, 163, 223)';
    ctx.font = fontSize + 'px Orbitron';
    let delta = Constants.cellSize + (Constants.canvasWidth / 2 - 10 * Constants.cellSize - 6 * Constants.cellSize / 2) / 2;
    ctx.fillText('Resources: ' + game.resources, Constants.canvasWidth / 2 - delta * 7 / 6, Constants.cellSize * 2 / 3);

    ctx.fillStyle = 'rgb(42, 163, 223)';
    ctx.font = fontSize + 'px Orbitron';
    ctx.fillText('Towers', (Constants.canvasWidth / 2 - delta - Constants.cellSize) / 2, Constants.cellSize * 3 / 5);

    ctx.fillStyle = 'rgb(42, 163, 223)';//'#b87333';
    ctx.font = fontSize + 'px Orbitron';
    ctx.fillText('Units', Constants.canvasWidth / 2 + (Constants.canvasWidth / 2 - Constants.cellSize) / 2, Constants.cellSize * 3 / 5);

    let towerCard1stroke = 'black',
        towerCard2stroke = 'black',
        towerCard3stroke = 'black',
        towerCard4stroke = 'black',
        towerCard5stroke = 'black',
        towerCard6stroke = 'black',
        towerCard7stroke = 'black';

    let unitCard1stroke = 'black',
        unitCard2stroke = 'black',
        unitCard3stroke = 'black',
        unitCard4stroke = 'black',
        unitCard5stroke = 'black',
        unitCard6stroke = 'black',
        unitCard7stroke = 'black';

    switch (game.chosenTower) {
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

    switch (game.chosenUnit) {
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

    ctx.lineWidth = Constants.cellSize / 20;

    // кнопки башен

    /*var img = new Image();
    img.src = "./../../../images/tower1/0.png";
    ctx.drawImage(img, Constants.towerCard1.x, Constants.towerCard1.y, Constants.towerCard1.width, Constants.towerCard1.height);*/
    ctx.fillStyle = 'green';
    ctx.fillRect(Constants.towerCard1.x, Constants.towerCard1.y, Constants.towerCard1.width, Constants.towerCard1.height);
    ctx.strokeStyle = towerCard1stroke;
    ctx.strokeRect(Constants.towerCard1.x, Constants.towerCard1.y, Constants.towerCard1.width, Constants.towerCard1.height);

    /*var img = new Image();
    img.src = "./../../../images/tower2/0.png";
    ctx.drawImage(img, Constants.towerCard2.x, Constants.towerCard2.y, Constants.towerCard2.width, Constants.towerCard2.height);*/
    ctx.fillStyle = 'red';
    ctx.fillRect(Constants.towerCard2.x, Constants.towerCard2.y, Constants.towerCard2.width, Constants.towerCard2.height);
    ctx.strokeStyle = towerCard2stroke;
    ctx.strokeRect(Constants.towerCard2.x, Constants.towerCard2.y, Constants.towerCard2.width, Constants.towerCard2.height);

    /*var img = new Image();
    img.src = "./../../../images/tower3/0.png";
    ctx.drawImage(img, Constants.towerCard3.x, Constants.towerCard3.y, Constants.towerCard3.width, Constants.towerCard3.height);*/
    ctx.fillStyle = 'blue';
    ctx.fillRect(Constants.towerCard3.x, Constants.towerCard3.y, Constants.towerCard3.width, Constants.towerCard3.height);
    ctx.strokeStyle = towerCard3stroke;
    ctx.strokeRect(Constants.towerCard3.x, Constants.towerCard3.y, Constants.towerCard3.width, Constants.towerCard3.height);

    /*var img = new Image();
    img.src = "./../../../images/tower4/0.png";
    ctx.drawImage(img, Constants.towerCard4.x, Constants.towerCard4.y, Constants.towerCard4.width, Constants.towerCard4.height);*/
    ctx.fillStyle = 'black';
    ctx.fillRect(Constants.towerCard4.x, Constants.towerCard4.y, Constants.towerCard4.width, Constants.towerCard4.height);
    ctx.strokeStyle = towerCard4stroke;
    ctx.strokeRect(Constants.towerCard4.x, Constants.towerCard4.y, Constants.towerCard4.width, Constants.towerCard4.height);

    /*var img = new Image();
    img.src = "./../../../images/tower5/0.png";
    ctx.drawImage(img, Constants.towerCard5.x, Constants.towerCard5.y, Constants.towerCard5.width, Constants.towerCard5.height);*/
    ctx.fillStyle = 'purple';
    ctx.fillRect(Constants.towerCard5.x, Constants.towerCard5.y, Constants.towerCard5.width, Constants.towerCard5.height);
    ctx.strokeStyle = towerCard5stroke;
    ctx.strokeRect(Constants.towerCard5.x, Constants.towerCard5.y, Constants.towerCard5.width, Constants.towerCard5.height);

    var img = new Image();
    img.src = "./../../../images/tower6/0.png";
    ctx.drawImage(img, Constants.towerCard6.x, Constants.towerCard6.y, Constants.towerCard6.width, Constants.towerCard6.height);
    if (towerCard6stroke == 'gold') {
        var img = new Image();
        img.src = "./../../../images/buttons/tower6.png";
        ctx.drawImage(img, Constants.towerCard6.x, Constants.towerCard6.y, Constants.towerCard6.width, Constants.towerCard6.height);
    }

    var img = new Image();
    img.src = "./../../../images/tower7/0.png";
    ctx.drawImage(img, Constants.towerCard7.x, Constants.towerCard7.y, Constants.towerCard7.width, Constants.towerCard7.height);
    if (towerCard7stroke == 'gold') {
        var img = new Image();
        img.src = "./../../../images/buttons/tower7.png";
        ctx.drawImage(img, Constants.towerCard7.x, Constants.towerCard7.y, Constants.towerCard7.width, Constants.towerCard7.height);
    }

    // кнопки юнитов

    var img = new Image();
    img.src = "./../../../images/unit1/run/0.png";
    ctx.drawImage(img, Constants.unitCard1.x, Constants.unitCard1.y, Constants.unitCard1.width, Constants.unitCard1.height);
    if (unitCard1stroke == 'gold') {
        var img = new Image();
        img.src = "./../../../images/buttons/unit1.png";
        ctx.drawImage(img, Constants.unitCard1.x, Constants.unitCard1.y, Constants.unitCard1.width, Constants.unitCard1.height);
    }

    /*var img = new Image();
    img.src = "./../../../images/unit2/run/0.png";
    ctx.drawImage(img, Constants.unitCard2.x, Constants.unitCard2.y, Constants.unitCard2.width, Constants.unitCard2.height);*/
    ctx.fillStyle = 'red';
    ctx.fillRect(Constants.unitCard2.x, Constants.unitCard2.y, Constants.unitCard2.width, Constants.unitCard2.height);
    ctx.strokeStyle = unitCard2stroke;
    ctx.strokeRect(Constants.unitCard2.x, Constants.unitCard2.y, Constants.unitCard2.width, Constants.unitCard2.height);

    /*var img = new Image();
    img.src = "./../../../images/unit3/run/0.png";
    ctx.drawImage(img, Constants.unitCard3.x, Constants.unitCard3.y, Constants.unitCard3.width, Constants.unitCard3.height);*/
    ctx.fillStyle = 'blue';
    ctx.fillRect(Constants.unitCard3.x, Constants.unitCard3.y, Constants.unitCard3.width, Constants.unitCard3.height);
    ctx.strokeStyle = unitCard3stroke;
    ctx.strokeRect(Constants.unitCard3.x, Constants.unitCard3.y, Constants.unitCard3.width, Constants.unitCard3.height);

    /*var img = new Image();
    img.src = "./../../../images/unit4/run/0.png";
    ctx.drawImage(img, Constants.unitCard4.x, Constants.unitCard4.y, Constants.unitCard4.width, Constants.unitCard4.height);*/
    ctx.fillStyle = 'purple';
    ctx.fillRect(Constants.unitCard4.x, Constants.unitCard4.y, Constants.unitCard4.width, Constants.unitCard4.height);
    ctx.strokeStyle = unitCard4stroke;
    ctx.strokeRect(Constants.unitCard4.x, Constants.unitCard4.y, Constants.unitCard4.width, Constants.unitCard4.height);

    /*var img = new Image();
    img.src = "./../../../images/unit5/run/0.png";
    ctx.drawImage(img, Constants.unitCard5.x, Constants.unitCard5.y, Constants.unitCard5.width, Constants.unitCard5.height);*/
    ctx.fillStyle = 'orange';
    ctx.fillRect(Constants.unitCard5.x, Constants.unitCard5.y, Constants.unitCard5.width, Constants.unitCard5.height);
    ctx.strokeStyle = unitCard5stroke;
    ctx.strokeRect(Constants.unitCard5.x, Constants.unitCard5.y, Constants.unitCard5.width, Constants.unitCard5.height);

    var img = new Image();
    img.src = "./../../../images/unit6/hit/1.png";
    ctx.drawImage(img, Constants.unitCard6.x, Constants.unitCard6.y, Constants.unitCard6.width, Constants.unitCard6.height);
    if (unitCard6stroke == 'gold') {
        var img = new Image();
        img.src = "./../../../images/buttons/unit6.png";
        ctx.drawImage(img, Constants.unitCard6.x, Constants.unitCard6.y, Constants.unitCard6.width, Constants.unitCard6.height);
    }

    /*var img = new Image();
    img.src = "./../../../images/unit7/run/0.png";
    ctx.drawImage(img, Constants.unitCard7.x, Constants.unitCard7.y, Constants.unitCard7.width, Constants.unitCard7.height);*/
    ctx.fillStyle = 'pink';
    ctx.fillRect(Constants.unitCard7.x, Constants.unitCard7.y, Constants.unitCard7.width, Constants.unitCard7.height);
    ctx.strokeStyle = unitCard7stroke;
    ctx.strokeRect(Constants.unitCard7.x, Constants.unitCard7.y, Constants.unitCard7.width, Constants.unitCard7.height);
}
