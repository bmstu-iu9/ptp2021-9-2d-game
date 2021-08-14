export default function ProcessProjectiles(game) {
    let projectiles = game.projectiles;
    let enemies = game.enemies;
    //console.log(projectiles.data.length)
    for (let i = 0, n = projectiles.data.length; i < n; i++) {
        let projectile = projectiles.data[i];

        projectile.update();
        projectile.hit(enemies);
        projectile.draw(game);

        if (projectile.complete) {
            projectiles.data.splice(i, 1);
            i--;
        }
    }
}
