import BaseUnit from './BaseUnit.js';
import HealingProjectile from '../projectiles/HealingProjectile.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit4 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.range = 5 * Constants.cellSize;

        this.healing = 10;
        this.totalHealing = 0;

        this.index = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    findTargets(targetsAmount) {
        for (let i = 0; i < this.targets.length; i++) {
            let ally = this.targets[i];

            if (calculateDistance(this.x, this.y, ally.x, ally.y) > this.range ||
               ally.health == ally.maxHealth || ally.died) {
                   this.targets.splice(i, 1);
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
        let lowestHealthAllyIndex = -1,
            lowestHealth = 10000;

        for (let i = 0, m = this.units.length; i < m; i++) {
            let ally = this.units[i];

            if (this == ally) continue;

            let distance = calculateDistance(this.x, this.y, ally.x, ally.y);

            if (distance < this.range && ally.health < lowestHealth &&
                ally.health < ally.maxHealth) {

                let isTargetAlready = false;

                for (let j = 0, k = this.targets.length; j < k; j++) {
                    if (ally == this.targets[j]) {
                        isTargetAlready = true;
                    }
                }

                if (!isTargetAlready) {
                    lowestHealthAllyIndex = i;
                    lowestHealth = ally.health;
                }
            }
        }

        if (lowestHealthAllyIndex != -1) {
            return this.units[lowestHealthAllyIndex];
        }
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new HealingProjectile(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.healing));

                this.totalHealing += this.healing;
            }

            this.lastShotTime = new Date();
        }

        if (this.totalHealing > 200) {
            this.totalHealing = 0;
            this.useAbility();
        }
    }

    useAbility() {
        this.drawAbility();

        for (let i = 0, n = this.units.length; i < n; i++) {
            let ally = this.units[i];

            if (calculateDistance(this.x, this.y, ally.x, ally.y) < this.range) {
                ally.health += Math.floor((ally.maxHealth - ally.health) / 2)
            }
        }
    }

    drawAbility() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.arc(0, 0, this.range, 0, Math.PI*2);
        ctx.globalAlpha = 0.3;
        ctx.fillstyle = 'aquamarine';
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = 'aquamarine';
        ctx.lineWidth = 25;
        ctx.stroke();
        ctx.closePath();
    }

    draw() {
        let ctx = this.ctx;

        var img = new Image();

        img.src = "./../../../images/units/unit4/" + this.index + ".png";

        ctx.drawImage(img, this.x, this.y + Constants.cellSize * 10/100,
                           Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.index = (this.index + 1) % 4;
            this.lastAnimationTime = new Date;
        }

        /*ctx.fillStyle = 'purple';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);*/
    }
}
