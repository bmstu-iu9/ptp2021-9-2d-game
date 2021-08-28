import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Tower6 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.units = game.units;

        this.maxHealth = 1000;
        this.health = this.maxHealth;
        this.range = Constants.cellSize * 5;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 1000;

        this.level = 1;

        this.index = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    update() {
        if (this.health == 0) {
            this.died = true;
            return;
        }

        for (let i = 0, n = this.units.length; i < n; i++) {
            let unit = this.units[i];

            if (calculateDistance(this.x, this.y, unit.x, unit.y) <= this.range) {
                unit.buffed = true;
            } else {
                unit.buffed = false;
            }
        }

        if (this.level == 2) {
            for (let i = 0; i < this.enemies.length; i++) {
                let enemy = this.enemies[i];

                if (calculateDistance(this.x, this.y, enemy.x, enemy.y) <= this.range) {
                    enemy.buffed = true;
                } else {
                    enemy.buffed = false;
                }
            }
        }
    }

    shoot() {}

    draw() {
        let ctx = this.ctx;

        var img = new Image();
        img.src = "./../../../images/tower6/" + this.index + ".png";

        ctx.drawImage(img,
                      this.x - Constants.cellSize / 2,
                      this.y - Constants.cellSize / 2 + Constants.cellSize * 10/100,
                      Constants.cellSize,
                      Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.index = (this.index + 1) % 4;
            this.lastAnimationTime = new Date;
        }
    }

    upgrade() {
        this.level = 2;
    }
}
