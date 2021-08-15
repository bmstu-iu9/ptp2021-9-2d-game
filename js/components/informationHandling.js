import Enemies from './../entity/enemies/enemies.js';

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
