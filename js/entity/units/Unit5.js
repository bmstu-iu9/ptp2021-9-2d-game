import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit5 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.units = game.units;

        this.maxHealth = 25;
        this.health = this.maxHealth;

        this.speed = Constants.cellSize * 5 / 100;

        this.range = 10 * Constants.cellSize;

        this.damage = 25;
        this.totalDamage = 0;

        this.shootInterval *= 2;

        this.index = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage));

                this.totalDamage += this.damage;
            }

            this.lastShotTime = new Date();
        }

        if (this.totalDamage > 200) {
            this.totalDamage = 0;
            this.useAbility();
        }
    }

    useAbility() {
        if (this.shootInterval - 10 > 150) {
            this.shootInterval -= 10;
        }
    }

    draw() {
        let ctx = this.ctx;

        var img = new Image();

        if (this.targets.length != 0) {
            img.src = "./../../../images/units/unit5/hit/" + this.index + ".png";
        } else {
            img.src = "./../../../images/units/unit5/run/" + this.index + ".png";
        }

        ctx.drawImage(img, this.x, this.y + Constants.cellSize * 10/100,
                           Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.index = (this.index + 1) % 4;
            this.lastAnimationTime = new Date;
        }

        /*ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);*/
    }
}
