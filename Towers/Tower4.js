import BaseTower from './BaseTower.js'

class Tower4 extends BaseTower {
    constructor(x, y) {
        super(x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 10;
        this.upgradecost = 200;
        this.range = 600;
        this.lastShotTime = new Date();
        this.shootInterval = 1000;
    }

    shoot(target) {
        projectiles.push(new Projectile4(
            target,
            this.x + 50,
            this.y + 50,
            this.level,
            this.damage
        ))
    }

    draw() {
        this.step();
        if (this.level == 1) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '30px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '30px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        }
    }

    upgrade() {
        this.level += 1;
        this.damage += 20;
    }
}

class Projectile4 {
    constructor(target, x, y, level, damage) {
        this.target = target;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = 3;
        this.damage = damage;
        this.level = level;
    }

    update() {
        let angel = Math.atan2(this.target.y + 50 - this.y, this.target.x + 50 - this.x);
        this.x += this.speed * Math.cos(angel);
        this.y += this.speed * Math.sin(angel);
    }

    hit() {
        if (this.level == 1) {
            this.target.health -= this.damage;
            this.target.movement *= 0.6;
        } else {
            epicenterX = this.target.x;
            epicenterY = this.target.y;
            for (let i = 0, n = enemies.length; i < n; i++) {
                let enemy = enemise[i];
                if (calculateDistance(epicenterX, enemy.x,
                                      epicenterY, enemy.y) < 50) {
                    enemy.health -= this.damage;
                    enemy.movement *= 0.6;
                }
            }
        }
        // У врагов нужно создать поле для проверки на то, находится ли он
        // под действием замедления. Если нет, то восстановить скорость
    }

    draw() {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(1, this.height/this.width);
        ctx.arc(0, 0, this.width, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
    }
}
