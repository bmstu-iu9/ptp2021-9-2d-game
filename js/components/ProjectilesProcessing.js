export default function ProcessProjectiles(projectiles, enemies) {
    for (let i = 0, n = projectiles.length; i < n; i++) {
        let projectile = projectiles[i];

        projectile.update();
        projectile.hit(enemies);
        projectile.draw();

        if (projectile.complete) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}
