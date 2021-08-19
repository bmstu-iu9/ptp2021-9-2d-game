import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';
import BaseTarget from './../bases/BaseTarget.js';

export default class BaseEnemy {
    constructor(game, verticalPosition, ctx) {
        this.x = Constants.canvasWidth + Constants.cellSize / 2;
        this.y = verticalPosition + Constants.cellSize / 2;
        this.width = Constants.cellSize;
        this.height = Constants.cellSize;
        this.speed = Constants.cellSize * 0.5/100;
        this.health = 666;
        this.firerate = 100;
        this.maxHealth = this.health;
        this.ctx = ctx;
        this.target = null;
        this.game = game;

        this.units = game.units;
        this.enemies = game.enemies;
        this.towers = game.towers;
        this.projectiles = game.projectiles;

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

    }

    update() {
        if (this.health == 0) {
            for (let i = 0, n = this.enemies.length; i < n; i++) {
                if (this == this.enemies[i]) {
                    this.enemies.splice(i, 1);
                    return;
                }
            }
        }

        if (this.buffed) {
            this.damage = this.baseDamage - this.damageBuff;
            this.speed = this.baseSpeed - this.speedBuff;
            this.shootInterval = this.baseShootInterval + this.shootIntervalBuff;
        } else {
            this.damage = this.baseDamage;
            this.speed = this.baseSpeed;
            this.shootInterval = this.baseShootInterval;
        }

        this.step();

        if (!this.target) {
            this.move();
        }
    }

    move() {
        if (this.isSlowed) {
            this.x -= this.speed * this.slowingCoeff;

            if (new Date - this.lastSlowingShotTime >= this.slowingInterval) {
                this.isSlowed = false;
            }
        } else {
            this.x -= this.speed;
        }
    }

    step() {
        this.findTarget();

        if (!this.target) return;

        let directionTarget = this.target;
        let newDirection = Math.atan2(directionTarget.y - this.y,
                                      directionTarget.x - this.x);
        newDirection = newDirection * (180 / Math.PI);
        //drawRotated(this.ctx, image, newDirection - this.direction);
        this.direction = newDirection;
    }

    findTarget() {
        let nearestEnemyIndex = -1;
        let minDistance = this.range;


        if (this.target && (calculateDistance(this.x, this.y, this.target.x, this.target.y) > this.range ||
           (this.target.health <= 0))) {
            this.target = null;
        }

        if (this.target) {
            return;
        }

        for (let i = 0, m = this.units.length; i < m; i++) {

            let unit = this.units[i];
            let distance = calculateDistance(this.x, this.y, unit.x, unit.y);

            if (distance < minDistance) {
                nearestEnemyIndex = i;
                minDistance = distance;
            }
        }

        let targetUnit;
        if (nearestEnemyIndex != -1) {
            targetUnit = this.units[nearestEnemyIndex];
        }

        nearestEnemyIndex = -1;
        for (let i = 0, m = this.towers.length; i < m; i++) {

            let tower = this.towers[i];
            let distance = calculateDistance(this.x, this.y, tower.x, tower.y);

            if (distance < minDistance) {
                nearestEnemyIndex = i;
                minDistance = distance;
            }
        }

        if (calculateDistance(this.x, this.y, Constants.cellSize / 2, this.y) < minDistance) {
            this.target = new BaseTarget( Constants.cellSize / 2, this.y, this.game.playerBase);
            return;
        }

        if (nearestEnemyIndex != -1) {
            this.target = this.towers[nearestEnemyIndex];
        } else if (targetUnit) {
            this.target = targetUnit;
        }
    }

    drawRotated(image, angle) {
        let context = this.ctx;

        if (!image) return;

        context.save();
        context.translate(this.x + image.width/2, this.y + image.height/2);
        context.rotate(angle * (Math.PI / 180));
        context.drawImage(image, -image.width/2, -image.height/2);
        context.restore();
    }
}
