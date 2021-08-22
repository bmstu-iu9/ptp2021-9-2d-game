import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';
import { calculateDistance } from './../../utils/utils.js';

export default class Unit3 extends BaseUnit {
    constructor(game, x, y, hasAbility) {
        super(game, x, y);

        this.game = game;

        this.maxHealth = 500;
        this.health = this.maxHealth;
        
        this.range = Constants.cellSize;
        this.damage = 10;

        this.hasAbility = hasAbility;
    }

    update() {
        if (this.health == 0) {

            if (this.hasAbility) {
                this.useAbility();
                this.units.push(new Unit3(this.game, this.x, this.y, false));
            }

            this.died = true;
            return;
        }

        this.step();

        if (this.targets.length == 0) {
            this.move();
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
                ));
            }

            this.lastShotTime = new Date();
        }
    }

    useAbility() {
        this.drawAbility();

        for (let i = 0, m = this.enemies.length; i < m; i++) {

            let enemy = this.enemies[i],
                distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);

            if (distance < this.range) {
                enemy.health -= Math.floor(enemy.health / 2);
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

        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = Constants.fontSize + 'px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }
}