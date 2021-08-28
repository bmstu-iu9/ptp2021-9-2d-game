import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';
import BaseTarget from './../bases/BaseTarget.js';

export default class BaseUnit {
    constructor(game, x, y) {
        this.game = game;
        this.ctx = game.ctx;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize / 2;
        this.height = Constants.cellSize / 2;
        this.direction = 0;

        this.units = game.units;
        this.projectiles = game.projectiles;
        this.enemies = game.enemies;

        this.targetsAmount = 1;
        this.targets = [];

        this.lastShotTime = new Date();

        this.baseDamage = 10;
        this.baseSpeed = Constants.cellSize / 20;
        this.baseShootInterval = 300;

        this.damage = this.baseDamage;
        this.speed = this.baseSpeed;
        this.shootInterval = this.baseShootInterval;

        this.damageBuff = 10;
        this.speedBuff = Constants.cellSize / 2;
        this.shootIntervalBuff = 100;

        this.buffed = false;

        this.lastSlowingShotTime = null;
        this.slowingInterval = 300;
        this.isSlowed = false;
        this.slowingCoeff = 0.6;

        this.died = false;
    }

    update() {
        if (this.health == 0) {
            this.died = true;
            return;
        }

        if (this.buffed) {
            this.damage = this.baseDamage + this.damageBuff;
            this.speed = this.baseSpeed + this.speedBuff;
            this.shootInterval = this.baseShootInterval - this.shootIntervalBuff;
        } else {
            this.damage = this.baseDamage;
            this.speed = this.baseSpeed;
            this.shootInterval = this.baseShootInterval;
        }

        this.findTargets(this.targetsAmount);

        if (this.targets.length == 0) {
            this.move();
        }
    }

    move() {
        if (this.isSlowed) {
            this.x += this.speed * this.slowingCoeff;

            if (new Date - this.lastSlowingShotTime >= this.slowingInterval) {
                this.isSlowed = false;
            }
        } else {
            this.x += this.speed;
        }
    }

    findTargets(targetsAmount) {
        for (let i = 0; i < this.targets.length; i++) {
            let target = this.targets[i];

            if (calculateDistance(this.x, this.y, target.x, target.y) > this.range ||
               (target.died)) {
                this.targets.splice(i, 1);
                i--;
            }
        }

        for (let i = this.targets.length; i < targetsAmount; i++) {
            let target = this.findTarget();

            if (target) {
                this.targets.push(target);
            } else break;
        }
    }

    findTarget() {
        let nearestEnemyIndex = -1,
            minDistance = this.range;

        for (let i = 0, m = this.enemies.length; i < m; i++) {
            let enemy = this.enemies[i],
                distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

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

        if ((Constants.canvasWidth - Constants.cellSize / 2) - this.x < minDistance) {
            return new BaseTarget(Constants.canvasWidth - Constants.cellSize / 2, this.y, this.game.enemyBase);
        }

        if (nearestEnemyIndex != -1) {
            return this.enemies[nearestEnemyIndex];
        }
    }

    drawHP() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.rect(this.x + Constants.cellSize / 8,
                 this.y + Constants.cellSize / 15,
                 this.width,
                 1);
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineWidth = Constants.cellSize / 10;
        ctx.stroke();

        let width = this.width * this.health / this.maxHealth;

        ctx.beginPath();
        ctx.rect(this.x + Constants.cellSize / 8,
                 this.y + Constants.cellSize / 15,
                 width,
                 1);
        ctx.strokeStyle = 'green';
        ctx.lineJoin = 'round';
        ctx.lineWidth = Constants.cellSize / 10;
        ctx.stroke();
    }
}
