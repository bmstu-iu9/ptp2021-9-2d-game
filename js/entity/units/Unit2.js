import BaseUnit from './BaseUnit.js';
import Projectile1 from '../projectiles/Projectile1.js';

export default class Unit2 extends BaseUnit {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = 500;
        this.cost = 100;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.damage = 10;
        this.timer = 1;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x + this.width/2,
                    this.y + this.height/2,
                    this.damage));
                    //this.level);
            }
            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx;

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 15);
    }

    upgrade(){
        if (this.timer % 10 == 0){
            this.range += 10;
        }
    }
}
