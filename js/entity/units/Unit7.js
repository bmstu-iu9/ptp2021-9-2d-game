import BaseUnit from './BaseUnit.js';
import Projectile3 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit7 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.units = game.units;
        this.range = 10 * Constants.cellSize;
        this.cost = 100;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.damage = 25;
        this.shootInterval *= 2;
        this.times = 0;
        this.speed = Constants.cellSize * 5 / 100

    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile3(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage,
                    1));

                this.times += 1;

            }
            this.lastShotTime = new Date();
        }

        if (this.times == 10) {
            this.times = 0;
            this.useAbility();
        }
    }

    useAbility() {
        if (this.health - 5 > 0) {
            this.health -= 5;
            this.damage += 5;
        }
    }


    draw() {
        let ctx = this.ctx;

        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}
