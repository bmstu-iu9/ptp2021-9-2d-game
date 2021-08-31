import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit6 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 500;
        this.health = this.maxHealth;
        this.range = Constants.cellSize;

        this.shootInterval = 500;
        this.damage = 5;

        this.baseSpeed = Constants.cellSize / 200;
        this.currentSpeed = this.baseSpeed;
        this.acceleration = this.baseSpeed / 10;

        this.hasAbility = true;

        this.runImages = Constants.unit6RunImages;
        this.hitImages = Constants.unit6HitImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    update() {
        if (this.health == 0) {
            this.died = true;
            return;
        }

        this.findTargets(this.targetsAmount);

        if (this.targets.length == 0) {
            this.move();
            this.currentSpeed += this.acceleration;
            this.hasAbility = true;
        } else if (this.hasAbility) {
            this.useAbility();
        }
    }

    move() {
        if (this.isSlowed) {
            this.x += this.currentSpeed * this.slowingCoeff;

            if (new Date - this.lastSlowingShotTime >= this.slowingInterval) {
                this.isSlowed = false;
            }
        } else {
            this.x += this.currentSpeed;
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
                    Constants.unit1HitImages[4],
                ));
            }

            this.lastShotTime = new Date();
        }
    }

    useAbility() {
        this.drawAbility();

        this.damage += 3 * this.currentSpeed;
        this.shootInterval -= 2 * this.currentSpeed;
        this.currentSpeed = this.baseSpeed;

        for (let i = 0, n = this.enemies.length; i < n; i++) {

            let enemy = this.enemies[i],
                distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (distance < this.range) {
                enemy.health -= Math.floor(this.damage * enemy.health / 250);
            }
        }

        this.hasAbility = false;
    }

    drawAbility() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.arc(0, 0, this.range / 2, 0, Math.PI*2);
        ctx.globalAlpha = 1;
        ctx.fillstyle = 'orange';
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 25;
        ctx.stroke();
        ctx.closePath();
    }

    draw() {
        let ctx = this.ctx,
            img;

        if (this.targets.length != 0) {
            img = this.hitImages[this.imageIndex];
        } else {
            img = this.runImages[this.imageIndex];
        }

        ctx.drawImage(img, this.x, this.y + Constants.cellSize * 15/100,
                           Constants.cellSize, Constants.cellSize * 85/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.imageIndex = (this.imageIndex + 1) % 4;
            this.lastAnimationTime = new Date;
        }
    }
}
