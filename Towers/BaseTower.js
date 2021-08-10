class BaseTower {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.projectiles = [];
    this.direction = 0;
    this.targetsAmount = 1;
    this.targets = [];
    this.range = 300;
    }

    step() {
        this.findTargets(enemies, this.targetsAmount);

        if (this.targets.length == 0) return;

        let directionTarget = this.targets[0];
        let newDirection = Math.atan2(directionTarget.y - this.y,
                                      directionTarget.x - this.x);
        //newDirection = newDirection * (180 / Math.PI);
        //drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;

        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.shoot(this.targets[i]);
            }
            this.lastShotTime = new Date();
        }
    }

    findTargets(enemies, n) {
        for (let i = this.targets.length; i < n; i++) {
            let target = this.findTarget(enemies)
            if (target) {
                this.targets.push(target)
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            let enemy = this.targets[i];
            if (calculateDistance(this.x, this.y, enemy.x, enemy.y) > this.range) {
                this.targets.splice(i, 1);
            }
        }
    }

    findTarget(enemies) {
        let nearestEnemyIndex = -1;
        let minDistance = this.range;

        for (let i = 0, m = enemies.length; i < m; i++) {
            let enemy = enemies[i];
            let distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (distance < minDistance) {
                let isTargetAlready = false;
                for (let j = 0, k = this.targets.length; j < k; j++) {
                    if (enemy == this.targets[j]) {
                        isTargetAlready = true;
                    }
                }
                if (!isTargetAlready) {
                    nearestEnemyIndex = i;
                    minDistance = distance;
                }
            }
        }

        if (nearestEnemyIndex != -1) {
            return enemies[nearestEnemyIndex];
        }
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
