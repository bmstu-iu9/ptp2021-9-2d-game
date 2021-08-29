import BaseUnit from './BaseUnit.js';
import Projectile2 from '../projectiles/Projectile2.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit7 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.units = game.units;

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.speed = Constants.cellSize * 5 / 100;

        this.range = 10 * Constants.cellSize;

        this.baseDamage = 25;
        this.damage = this.baseDamage;
        this.shootInterval *= 10;

        this.shots = 0;

        this.index = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile2(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage,
                    1));

                this.shots += 1;
            }
            this.lastShotTime = new Date();
        }

        if (this.shots == 10) {
            this.shots = 0;
            this.useAbility();
        }
    }

    useAbility() {
        if (this.health - 5 > 0) {
            this.health -= 5;
            this.baseDamage += 5;
        }
    }

    draw() {
        let ctx = this.ctx;

        var img = new Image();

        if (this.targets.length != 0) {
            img.src = "./../../../images/units/unit7/hit/" + this.index + ".png";
        } else {
            img.src = "./../../../images/units/unit7/run/" + this.index + ".png";
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
