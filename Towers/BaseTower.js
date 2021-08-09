class BaseTower {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.projectiles = [];
    this.timer = 0;
    this.kills = 0;
    this.direction = 0;
    this.target = null;
    this.targetIndex = -1;
    this.range = 300;
    }

    step() {
        let target = this.findTarget(enemies);

        if (!target) return;

        let newDirection = Math.atan2(target.y - this.y, target.x - this.x);
        //newDirection = newDirection * (180 / Math.PI);
        //drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;

        if (new Date - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = new Date();
        }
    }

    findTarget(enemies) {
        if (this.target !== null) {
            let enemy = enemies[this.targetIndex];
            if (enemy &&
                calculateDistance(this.x, this.y, enemy.x, enemy.y) > this.range) {
                return;
            }
        }

        let nearestEnemyId = -1;
        let minDistance = this.range;

        for (let i = 0; n = enemies.length; i < n; i++) {
            let enemy = enemies[i];
            let distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (distance < minDistance) {
                nearestEnemyId = i;
                minDistance = distance;
            }
        }

        if (nearestEnemyId !== -1) {
            this.targetIndex = nearestEnemyId;
            this.target = enemies[nearestEnemyId];
        }

        return this.target;
    }

    drawRotated(ctx, image, angle) {
        if (!image) return;
        context.save();
        context.translate(this.x + image.width/2, this.y + image.height/2);
        context.rotate(angle * (Math.PI / 180));
        context.drawImage(image, -image.width/2, -image.height/2);
        context.restore();
    }
}
