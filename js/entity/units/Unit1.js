import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constant from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit1 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = Constant.cellSize;
        this.cost = 100;
        this.maxHealth = 500;
        this.health = this.maxHealth;
        this.damage = 10;
        this.hasAbility = true;
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
            let distance = Math.abs(enemy.x - this.x);

            if (distance < minDistance && (enemy.y > this.y && this.y + Constant.cellSize > enemy.y )) {
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

    update() {
        this.health -= 1;
        if (this.health == 0) {
            for (let i = 0, n = this.units.length; i < n; i++) {
                if (this == this.units[i]) {
                    this.units.splice(i, 1);
                    return;
                }
            }
        }

        if (this.health <= 0.25 * this.maxHealth && this.hasAbility) {
            this.useAbility();
        } else if (this.health > 0.25 * this.maxHealth) {
            this.hasAbility = true;
        }

        this.step();

        if (this.targets.length == 0) {
            this.move();
        }
    }

    useAbility() {
        let nearestEnemyIndex = -1;
        let minDistance = this.range * 5;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i];
            let distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (distance < minDistance) {
                nearestEnemyIndex = i;
                minDistance = distance;
            }
        }

        if (nearestEnemyIndex != -1) {
            let enemy = this.enemies[nearestEnemyIndex];

            this.drawAbility(enemy);

            if (enemy.health > 2.5 * this.damage) {
                enemy.health -= 2.5 * this.damage;
            } else {
                enemy.health = 0;
            }
        }

        this.hasAbility = false;
    }

    drawAbility(enemy) {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.save();
        ctx.translate(enemy.x, enemy.y);
        ctx.arc(0, 0, this.range / 2, 0, Math.PI*2);
        ctx.globalAlpha = 1;
        ctx.fillstyle = 'yellow';
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 25;
        ctx.stroke();
        ctx.closePath();
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
        ctx.font = Constant.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}
