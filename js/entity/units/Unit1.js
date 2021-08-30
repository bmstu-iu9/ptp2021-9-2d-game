import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';
import BaseTarget from './../bases/BaseTarget.js';

export default class Unit1 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 500;
        this.health = this.maxHealth;

        this.range = Constants.cellSize;
        this.damage = 10;

        this.hasAbility = true;

        this.index = 0;

        this.lastAnimationTime = new Date().getTime();
        this.animationInterval = 1000/8;
    }

    findTargets(targetsAmount) {
        for (let i = 0; i < this.targets.length; i++) {
            let target = this.targets[i];

            if (target.x < this.x || target.died) {
                this.targets.splice(i, 1);
                i--;
            }
        }

        for (let i = this.targets.length; i < targetsAmount; i++) {
            let target = this.findTarget();

            if (target) {
                this.targets.push(target)
            }
        }
    }

    findTarget() {
        let nearestEnemyIndex = -1,
            minDistance = this.range;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i],
                distance = Math.abs(enemy.x - this.x);

            if (distance < minDistance && (enemy.y > this.y && this.y + Constants.cellSize > enemy.y )) {
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

        if (calculateDistance(this.x, 0, Constants.canvasWidth - Constants.cellSize / 2, 0) < minDistance) {
            return new BaseTarget(Constants.canvasWidth - Constants.cellSize / 2, this.y, this.game.enemyBase);
        }

        if (nearestEnemyIndex != -1) {
            return this.enemies[nearestEnemyIndex];
        }
    }

    update() {
        if (this.health == 0) {
            this.died = true;
            return;
        }

        if (this.health <= 0.25 * this.maxHealth && this.hasAbility) {
            this.useAbility();
        } else if (this.health > 0.25 * this.maxHealth) {
            this.hasAbility = true;
        }

        this.findTargets(this.targetsAmount);

        if (this.targets.length == 0) {
            this.move();
        }
    }

    useAbility() {
        let nearestEnemyIndex = -1,
            minDistance = this.range * 5;

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i],
                distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

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
                ));
            }
            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        var img = new Image();

        if (this.targets.length != 0) {
            img.src = "./js/images/units/unit1/hit/" + this.index + ".png";
        } else {
            img.src = "./js/images/units/unit1/run/" + this.index + ".png";
            //console.log(img.src)
        }

        ctx.drawImage(img, this.x, this.y + Constants.cellSize * 10/100,
                           Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date().getTime() - this.lastAnimationTime >= this.animationInterval) {
            this.index = (this.index + 1) % 4;
            this.lastAnimationTime = new Date().getTime();
        }
    }
}
