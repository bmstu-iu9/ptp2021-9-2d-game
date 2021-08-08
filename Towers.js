import vec2 from 'gl-matrix';

calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

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

    findTarget(enemies) {
        if (this.target !== null) {
            enemy = enemies[this.targetIndex];
            if (enemy &&
                calculateDistance(this.x, this.y, enemy.x, enemy.y) > this.range) {
                return;
            }
        }

        nearestEnemyId = -1;
        minDistance = this.range;

        for (let i = 0; n = enemies.length; i < n; i++) {
            enemy = enemies[i];
            distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

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

class Tower1 extends BaseTower {
    constructor(ctx, x, y) {
        super(x, y);
        this.ctx = ctx;
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 300;
        this.lastShotTime = new Date();
        this.shootInterval = 300;
    }

    step() {
        target = this.findTarget(enemies);

        if (!target) return;

        newDirection = Math.atan2(target.y - this.y, target.x - this.x);
        newDirection = newDirection * (180 / Math.PI);
        drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;

        if (new Date - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = new Date();
        }
    }

    shoot() {
        this.projectiles.push(new Projectile({
            target: this.target,
            x: this.x,
            y: this.y
        }))
    }

    draw() {
        this.step();
        ctx = this.ctx;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
    }
}
