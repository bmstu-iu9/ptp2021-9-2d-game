import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit6 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = Constants.cellSize;
        this.cost = 100;
        this.maxHealth = 500;
        this.health = this.maxHealth;

        this.shootInterval = 500;
        this.damage = 5;

        this.baseSpeed = Constants.cellSize / 200;
        this.currentSpeed = this.baseSpeed;
        this.acceleration = this.baseSpeed / 10;

        this.hasAbility = true;
    }

    update() {
        if (this.health == 0) {
            for (let i = 0, n = this.units.length; i < n; i++) {
                if (this == this.units[i]) {
                    this.units.splice(i, 1);
                    return;
                }
            }
        }

        this.step();

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
                    1));
            }
            this.lastShotTime = new Date();
        }
    }

    useAbility() {
        this.drawAbility();

        this.damage += 3 * this.currentSpeed;
        this.shootInterval -= 2 * this.currentSpeed;
        this.currentSpeed = this.baseSpeed;

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
        let ctx = this.ctx;

        ctx.fillStyle = 'grey';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}
