import BaseTower from './BaseTower.js';
import Projectile2 from '../projectiles/Projectile2.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Tower2 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 1000;
        this.health = this.maxHealth;
        this.damage = 25;
        this.range = Constants.cellSize * 7;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 300;

        this.level = 1;

        this.images = Constants.tower2Images;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 4) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile2(
                    this.targets[i],
                    this.x,
                    this.y - Constants.cellSize / 2,
                    this.damage,
                    this.level,
                    Constants.tower2Images[6],
                    Constants.projectileUnitBang,
                ))
            }

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx,
            img = this.images[this.imageIndex];

        ctx.drawImage(img,
                      this.x - Constants.cellSize / 2,
                      this.y - Constants.cellSize / 2 + Constants.cellSize * 10/100,
                      Constants.cellSize,
                      Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.imageIndex = (this.imageIndex + 1) % 6;
            this.lastAnimationTime = new Date;
        }
    }

    upgrade() {
        this.level = 2;
        this.damage += 25;
        this.shootInterval -= 50;
        this.health = this.maxHealth;
    }
}
