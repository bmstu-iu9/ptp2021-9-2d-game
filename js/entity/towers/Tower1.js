import BaseTower from './BaseTower.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';

export default class Tower1 extends BaseTower {
    constructor(game, x, y) {
        super(game, x, y);

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.damage = 10;
        this.range = Constants.cellSize * 10;

        this.upgradeCost = 200;

        this.lastShotTime = new Date();
        this.shootInterval = 500;

        this.level = 1;

        this.images = Constants.tower1Images;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 3) {
            for (let i = 0, n = this.targets.length; i < n; i++) {
                this.projectiles.push(new Projectile1(
                    this.targets[i],
                    this.x,
                    this.y -  Constants.cellSize * 2 / 4,
                    this.damage,
                    Constants.tower1Images[4]
                ));
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
            this.imageIndex = (this.imageIndex + 1) % 4;
            this.lastAnimationTime = new Date;
        }
    }

    upgrade() {
        this.level = 2;
        this.damage += 20;
        this.shootInterval -= 50;
    }
}
