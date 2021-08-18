import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';

export default class Unit1 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = 100;
        this.cost = 100;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.damage = 10;
    }

    findTargets(n) {
        for (let i = this.targets.length; i < n; i++) {
            let target = this.findTarget()
            if (target) {
                this.targets.push(target)
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            let enemy = this.targets[i];
            if (enemy.x < this.x ||
               (enemy.health <= 0)) {
                this.targets.splice(i, 1);
            }
        }

    }

    findTarget() {
        let nearestEnemyIndex = -1;
        let minDistance = this.range;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i];
            let distance = enemy.x - this.x;

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
            return this.enemies[nearestEnemyIndex];
        }
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage,
                    1));
            }
            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }

    upgrade(){
        if(this.health == 25){
            this.damage *= 2.5;
        }
    }
}
