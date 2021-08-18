export function processProjectiles(game) {
    let projectiles = game.projectiles;
    let enemies = game.enemies;

    for (let i = 0; i < projectiles.length; i++) {
        let projectile = projectiles[i];

        projectile.update();
        projectile.hit(enemies);
        projectile.draw(game);

        if (projectile.complete) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}
