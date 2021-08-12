import Enemies from './../entity/enemies/enemies.js';

export function handleTowers(towers, enemies, ctx) {
    for (let i = 0; i < towers.length; i++) {
        towers[i].draw();
    }
}

export function handleInformation(ctx, gameover, resources, mybase) {
    ctx.fillStyle = 'black';
    ctx.font = '35px Orbitron';
    ctx.fillText('resources: ' + resources, 555, 60);

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

export function handleGameGrid(gameGrid, ctx, mouse) {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw(ctx, mouse);
    }
}

export function handleEnemies(enemies, resources, ctx, frame, enemydamage, interval) {

    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].health <= 0) {
            resources += enemies[i].maxHealth / 10;
            enemies.splice(i, 1);
            i--;
        }
        enemies[i].update();
        enemies[i].draw();
    }

    if (frame % interval === 0) {
        let verticalPosition = Math.floor(Math.random() * 7 + 1) * 100;
        enemies.push(new Enemies(verticalPosition, ctx));

        if (interval > 120) interval-= 50;
    }

    if (frame % 2000 === 0 && frame > 0) {
        enemydamage += (frame / 1000);
    }

}
