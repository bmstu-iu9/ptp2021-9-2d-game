function handleTowers() {
    for (let i = 0; i < towers.length; i++) {
        towers[i].draw(enemies);
    }
}

function handleInformation() {
    ctx.fillStyle = 'black';
    ctx.font = '35px Orbitron';
    ctx.fillText('resources: ' + resources, 555, 60);

    if (gameover && mybase.health <= 0){
        ctx.fillStyle = 'red';
        ctx.font = '60px Orbitron';
        ctx.fillText('YOU LOSE', 250, 330);
    }

    if (gameover && enemybase.health <= 0){
        ctx.fillStyle = 'green';
        ctx.font = '60px Orbitron';
        ctx.fillText('YOU WIN', 250, 330);
    }
}
