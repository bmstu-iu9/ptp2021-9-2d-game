import BaseTower from './BaseTower.js';
import Projectile4 from '../projectiles/Projectile4.js';
import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Tower4 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.damage = 10;
        this.range = 6 * Constants.cellSize;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 1000;

        this.slowingInterval = 3000;
        this.slowingCoeff = 0.6;

        this.targetsAmount = 1;

        this.level = 1;

        this.images = Constants.tower4Images;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile4(
                    this.targets[i],
                    this.x,
                    this.y,
                    this.damage,
                    this.slowingInterval,
                    this.slowingCoeff,
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
            this.imageIndex = (this.imageIndex + 1) % 5;
            this.lastAnimationTime = new Date;
        }
    }

    upgrade() {
        this.level = 2;
        this.damage += 20;
        this.targetsAmount = 3;
    }
}
