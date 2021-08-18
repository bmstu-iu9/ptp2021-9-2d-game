import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constant from './../../constants.js';
import BaseUnit from './../entity/units/BaseUnit.js';
import Unit1 from './../entity/units/Unit1.js';
import Unit1 from './../entity/units/Unit2.js';

export default class Tower4 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);
        this.cost = 100;
        this.health = 100;
        this.damage = 20; //урон при взрыве
        this.upgradecost = 200;
        this.range = 6 * Constant.cellSize; //поменять радиус
        this.lastShotTime = new Date();
        this.shootInterval = 3000; //поменять интервал
        this.level = 1;
        this.timer = 1;
    }

    unitGenerator(){
        if (new Date - this.lastShotTime >= this.shootInterval){
            this.units.push(new Unit1(
                game,
                Constant.cellSize, //нужно выпускть с базы как-то
                this.y
            ));
            this.lastShotTime = new Date();
        }
    }

    shoot(target) {
        unitGenerator(); //возможно это должно вызываться тут
        if(this.health == 0){
            //взрыв?
            this.projectiles.push(new Projectile4(
                target,
                this.x + Constant.cellSize / 2,
                this.y + Constant.cellSize / 2,
                this.level,
                this.damage
            ));
        }
    }

    draw() {
        this.step();
        let ctx = this.ctx;
        if (this.level == 1) {
            ctx.fillStyle = 'pink';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        } else {
            ctx.fillStyle = 'pink';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = Constant.fontSize + 'px Orbitron';
            ctx.fillText(Math.floor(this.health), this.x + Constant.cellSize / 20, this.y + Constant.cellSize / 3);
        }
    }

    upgrade() {
        this.level += 1;
        if (this.timer % 3 == 0){
            this.units.push(new Unit2(
                game,
                Constant.cellSize, //нужно выпускть с базы как-то
                this.y
            ));
        }
        for (let i = 0, n = this.units.length; i < n; i++){
            this.units[i].damage += 10;
            this.units[i].health += 10;
        }
    }
}
