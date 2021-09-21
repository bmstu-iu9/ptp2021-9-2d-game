import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';
import BaseTarget from './../bases/BaseTarget.js';

export default class BaseEnemy {
    constructor(game, verticalPosition) {
        this.game = game;
        this.ctx = game.ctx;

        this.x = Constants.canvasWidth - Constants.cellSize;
        this.y = verticalPosition + Constants.cellSize / 2;
        this.width = Constants.cellSize;
        this.height = Constants.cellSize;
        this.direction = 0;

        this.units = game.units;
        this.towers = game.towers;
        this.projectiles = game.projectiles;

        this.target = null;

        this.maxHealth = 500;
        this.health = this.maxHealth;

        this.lastShotTime = new Date();

        this.baseDamage = 10;
        this.baseSpeed = Constants.cellSize / 20;
        this.baseShootInterval = 300;

        this.damage = this.baseDamage;
        this.speed = this.baseSpeed;
        this.shootInterval = this.baseShootInterval;

        this.damageBuff = 10;
        this.speedBuff = Constants.cellSize / 30;
        this.shootIntervalBuff = 100;

        this.buffed = false;

        this.lastSlowingShotTime = null;
        this.slowingInterval = null;
        this.isSlowed = false;
        this.slowingCoeff = null;

        this.died = false;
    }

    update() {
        if (this.health == 0) {
            this.died = true;
            return;
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

        if (this.target && (calculateDistance(this.x, this.y, this.target.x, this.target.y) > this.range ||
                           (this.target.died))) {

            this.target = null;
        }

        if (!this.target) this.findTarget();

        if (!this.target) {
            this.move();
        }
    }

    move() {
        if (this.isSlowed) {
            this.x -= this.speed * (1 - this.slowingCoeff);

            if (new Date - this.lastSlowingShotTime >= this.slowingInterval) {
                this.isSlowed = false;
            }
        } else {
            this.x -= this.speed;
        }
    }

    findTarget() {
        let nearestUnitIndex = -1,
            nearestTowerIndex = -1,
            minDistance = this.range;

        for (let i = 0, m = this.units.length; i < m; i++) {
            let unit = this.units[i],
                distance = calculateDistance(this.x, this.y, unit.x, unit.y);

            if (distance < minDistance) {
                nearestUnitIndex = i;
                minDistance = distance;
            }
        }

        for (let i = 0, m = this.towers.length; i < m; i++) {
            let tower = this.towers[i],
                distance = calculateDistance(this.x, this.y, tower.x, tower.y);

            if (distance < minDistance) {
                nearestTowerIndex = i;
                minDistance = distance;
            }
        }

        if (calculateDistance(this.x, this.y, Constants.cellSize / 2, this.y) < minDistance) {
            this.target = new BaseTarget( Constants.cellSize / 2, this.y, this.game.playerBase);
            return;
        }

        if (nearestTowerIndex != -1) {
            this.target = this.towers[nearestTowerIndex];
        } else if (nearestUnitIndex != -1) {
            this.target = this.units[nearestUnitIndex];
        }
    }

    drawHP() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.rect(this.x - Constants.cellSize / 2,
                 this.y - Constants.cellSize / 2,
                 this.width,
                 1);
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineWidth = Constants.cellSize / 10;
        ctx.stroke();

        let width = this.width * this.health / this.maxHealth;

        ctx.beginPath();
        ctx.rect(this.x - Constants.cellSize / 2,
                 this.y - Constants.cellSize / 2,
                 width,
                 1);
        ctx.strokeStyle = 'green';
        ctx.lineJoin = 'round';
        ctx.lineWidth = Constants.cellSize / 10;
        ctx.stroke();
    }
}
