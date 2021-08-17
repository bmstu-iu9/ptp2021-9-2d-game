import Enemies from './../entity/enemies/enemies.js';
import * as Constant from './../constants.js';

export function handleTowers(game) {
    for (let i = 0; i < game.towers.length; i++) {
        game.towers[i].draw();
    }
}

export function handleInformation(ctx, gameover, resources, mybase) {
    ctx.fillStyle = 'black';
    ctx.font = '75px Orbitron';
    ctx.fillText('Resources: ' + resources, 2550, 100);

    ctx.fillStyle = 'black';
    ctx.font = '75px Orbitron';
    ctx.fillText('Towers', 1150, 100);

    ctx.fillStyle = 'black';
    ctx.font = '75px Orbitron';
    ctx.fillText('Units', 4380, 100);

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
        let verticalPosition = Math.floor(Math.random() * 13 + 4) * 193.84;
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
    if (game.mouse.y <= Constant.controlsBarHeight) {
        return "Control Bar";
    } else {
        return "Game Grid";
    }
}

export function handleControlBar(ctx, chosenTower, chosenUnit) {
    let card1stroke = 'black';
    let card2stroke = 'black';
    let card3stroke = 'black';
    let card4stroke = 'black';
    let card5stroke = 'black';
    let card6stroke = 'black';
    let card7stroke = 'black';

    let ucard1stroke = 'black';
    let ucard2stroke = 'black';
    let ucard3stroke = 'black';
    let ucard4stroke = 'black';
    let ucard5stroke = 'black';
    let ucard6stroke = 'black';
    let ucard7stroke = 'black';

    switch (chosenTower) {
        case 1:
            card1stroke = 'gold';
            card2stroke = 'black';
            card3stroke = 'black';
            card4stroke = 'black';
            card5stroke = 'black';
            card6stroke = 'black';
            card7stroke = 'black';
            break;

        case 2:
            card1stroke = 'black';
            card2stroke = 'gold';
            card3stroke = 'black';
            card4stroke = 'black';
            card5stroke = 'black';
            card6stroke = 'black';
            card7stroke = 'black';
            break;

        case 3:
            card1stroke = 'black';
            card2stroke = 'black';
            card3stroke = 'gold';
            card4stroke = 'black';
            card5stroke = 'black';
            card6stroke = 'black';
            card7stroke = 'black';
            break;

        case 4:
            card1stroke = 'black';
            card2stroke = 'black';
            card3stroke = 'black';
            card4stroke = 'gold';
            card5stroke = 'black';
            card6stroke = 'black';
            card7stroke = 'black';
            break;

        case 5:
            card1stroke = 'black';
            card2stroke = 'black';
            card3stroke = 'black';
            card4stroke = 'black';
            card5stroke = 'gold';
            card6stroke = 'black';
            card7stroke = 'black';
            break;

        case 6:
            card1stroke = 'black';
            card2stroke = 'black';
            card3stroke = 'black';
            card4stroke = 'black';
            card5stroke = 'black';
            card6stroke = 'gold';
            card7stroke = 'black';
            break;

        case 7:
            card1stroke = 'black';
            card2stroke = 'black';
            card3stroke = 'black';
            card4stroke = 'black';
            card5stroke = 'black';
            card6stroke = 'black';
            card7stroke = 'gold';
            break;

        default:
            card1stroke = 'black';
            card2stroke = 'black';
            card3stroke = 'black';
            card4stroke = 'black';
            card5stroke = 'black';
            card6stroke = 'black';
            card7stroke = 'black';
    }

    switch (chosenUnit) {
        case 1:
            ucard1stroke = 'gold';
            ucard2stroke = 'black';
            ucard3stroke = 'black';
            ucard4stroke = 'black';
            ucard5stroke = 'black';
            ucard6stroke = 'black';
            ucard7stroke = 'black';
            break;

        case 2:
            ucard1stroke = 'black';
            ucard2stroke = 'gold';
            ucard3stroke = 'black';
            ucard4stroke = 'black';
            ucard5stroke = 'black';
            ucard6stroke = 'black';
            ucard7stroke = 'black';
            break;

        case 3:
            ucard1stroke = 'black';
            ucard2stroke = 'black';
            ucard3stroke = 'gold';
            ucard4stroke = 'black';
            ucard5stroke = 'black';
            ucard6stroke = 'black';
            ucard7stroke = 'black';
            break;

        case 4:
            ucard1stroke = 'black';
            ucard2stroke = 'black';
            ucard3stroke = 'black';
            ucard4stroke = 'gold';
            ucard5stroke = 'black';
            ucard6stroke = 'black';
            ucard7stroke = 'black';
            break;

        case 5:
            ucard1stroke = 'black';
            ucard2stroke = 'black';
            ucard3stroke = 'black';
            ucard4stroke = 'black';
            ucard5stroke = 'gold';
            ucard6stroke = 'black';
            ucard7stroke = 'black';
            break;

        case 6:
            ucard1stroke = 'black';
            ucard2stroke = 'black';
            ucard3stroke = 'black';
            ucard4stroke = 'black';
            ucard5stroke = 'black';
            ucard6stroke = 'gold';
            ucard7stroke = 'black';
            break;

        case 7:
            ucard1stroke = 'black';
            ucard2stroke = 'black';
            ucard3stroke = 'black';
            ucard4stroke = 'black';
            ucard5stroke = 'black';
            ucard6stroke = 'black';
            ucard7stroke = 'gold';
            break;

        default:
            ucard1stroke = 'black';
            ucard2stroke = 'black';
            ucard3stroke = 'black';
            ucard4stroke = 'black';
            ucard5stroke = 'black';
            ucard6stroke = 'black';
            ucard7stroke = 'black';
    }

    ctx.lineWidth = 10;

    ctx.fillStyle = 'green';
    ctx.fillRect(Constant.card1.x, Constant.card1.y, Constant.card1.width, Constant.card1.height);
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(Constant.card1.x, Constant.card1.y, Constant.card1.width, Constant.card1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(Constant.card2.x, Constant.card2.y, Constant.card2.width, Constant.card2.height);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(Constant.card2.x, Constant.card2.y, Constant.card2.width, Constant.card2.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(Constant.card3.x, Constant.card3.y, Constant.card3.width, Constant.card3.height);
    ctx.strokeStyle = card3stroke;
    ctx.strokeRect(Constant.card3.x, Constant.card3.y, Constant.card3.width, Constant.card3.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(Constant.card4.x, Constant.card4.y, Constant.card4.width, Constant.card4.height);
    ctx.strokeStyle = card4stroke;
    ctx.strokeRect(Constant.card4.x, Constant.card4.y, Constant.card4.width, Constant.card4.height);

    ctx.fillStyle = 'purple';
    ctx.fillRect(Constant.card5.x, Constant.card5.y, Constant.card5.width, Constant.card5.height);
    ctx.strokeStyle = card5stroke;
    ctx.strokeRect(Constant.card5.x, Constant.card5.y, Constant.card5.width, Constant.card5.height);

    ctx.fillStyle = 'orange';
    ctx.fillRect(Constant.card6.x, Constant.card6.y, Constant.card6.width, Constant.card6.height);
    ctx.strokeStyle = card6stroke;
    ctx.strokeRect(Constant.card6.x, Constant.card6.y, Constant.card6.width, Constant.card6.height);

    ctx.fillStyle = 'pink';
    ctx.fillRect(Constant.card7.x, Constant.card7.y, Constant.card7.width, Constant.card7.height);
    ctx.strokeStyle = card7stroke;
    ctx.strokeRect(Constant.card7.x, Constant.card7.y, Constant.card7.width, Constant.card7.height);

    // кнопки юнитов

    ctx.fillStyle = 'green';
    ctx.fillRect(Constant.ucard1.x, Constant.ucard1.y, Constant.ucard1.width, Constant.ucard1.height);
    ctx.strokeStyle = ucard1stroke;
    ctx.strokeRect(Constant.ucard1.x, Constant.ucard1.y, Constant.ucard1.width, Constant.ucard1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(Constant.ucard2.x, Constant.ucard2.y, Constant.ucard2.width, Constant.ucard2.height);
    ctx.strokeStyle = ucard2stroke;
    ctx.strokeRect(Constant.ucard2.x, Constant.ucard2.y, Constant.ucard2.width, Constant.ucard2.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(Constant.ucard3.x, Constant.ucard3.y, Constant.ucard3.width, Constant.ucard3.height);
    ctx.strokeStyle = ucard3stroke;
    ctx.strokeRect(Constant.ucard3.x, Constant.ucard3.y, Constant.ucard3.width, Constant.ucard3.height);

    ctx.fillStyle = 'purple';
    ctx.fillRect(Constant.ucard4.x, Constant.ucard4.y, Constant.ucard4.width, Constant.ucard4.height);
    ctx.strokeStyle = ucard4stroke;
    ctx.strokeRect(Constant.ucard4.x, Constant.ucard4.y, Constant.ucard4.width, Constant.ucard4.height);

    ctx.fillStyle = 'orange';
    ctx.fillRect(Constant.ucard5.x, Constant.ucard5.y, Constant.ucard5.width, Constant.ucard5.height);
    ctx.strokeStyle = ucard5stroke;
    ctx.strokeRect(Constant.ucard5.x, Constant.ucard5.y, Constant.ucard5.width, Constant.ucard5.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(Constant.ucard6.x, Constant.ucard6.y, Constant.ucard6.width, Constant.ucard6.height);
    ctx.strokeStyle = ucard6stroke;
    ctx.strokeRect(Constant.ucard6.x, Constant.ucard6.y, Constant.ucard6.width, Constant.ucard6.height);

    ctx.fillStyle = 'pink';
    ctx.fillRect(Constant.ucard7.x, Constant.ucard7.y, Constant.ucard7.width, Constant.ucard7.height);
    ctx.strokeStyle = ucard7stroke;
    ctx.strokeRect(Constant.ucard7.x, Constant.ucard7.y, Constant.ucard7.width, Constant.ucard7.height);

}
