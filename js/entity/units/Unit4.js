import BaseUnit from './BaseUnit.js';
import HealingProjectile from '../projectiles/HealingProjectile.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit4 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = 5 * Constants.cellSize;
        this.cost = 100;

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.healing = 10;
        this.totalHealing = 0;
    }

    findTargets(n) {
        for (let i = this.targets.length; i < n; i++) {
            let target = this.findTarget()
            if (target) {
                this.targets.push(target)
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            let ally = this.targets[i];
            if (calculateDistance(this.x, this.y, ally.x, ally.y) > this.range ||
               (ally.health == ally.maxHealth)) {
                   this.targets.splice(i, 1);
            }
        }
    }

    findTarget() {
        let lowestHealthAllyIndex = -1;
        let lowestHealth = 1000;

        for (let i = 0, m = this.units.length; i < m; i++) {
            let ally = this.units[i];

            if (this == ally) continue;

            let distance = calculateDistance(this.x, this.y, ally.x, ally.y);

            if (distance < this.range && ally.health < lowestHealth) {
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

        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}
