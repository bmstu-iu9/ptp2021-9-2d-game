function ProcessProjectiles() {
    for (let i = 0; n = projectiles.length; i < n; i++) {
        let projectile = projectiles[i];

        projectile.update();

        if (calculateDistance(projectile.x, projectile.target.x + 50,
                              projectile.y, projectile.target.y + 50) > 30) {
            projectile.draw();
        } else {
            projectile.hit();
            projectiles.splice(i, 1);
            i--;
        }
    }
}
