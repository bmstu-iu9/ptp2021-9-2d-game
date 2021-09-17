import BaseEnemy from './BaseEnemy.js';
import Projectile1 from '../projectiles/Projectile1.js';
import * as Constants from './../../constants.js';


export default class Enemy3 extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.range = Constants.cellSize * 5;

        this.maxHealth = 500;
        this.health = this.maxHealth;

        this.baseDamage = 25;

        this.runImages = Constants.enemy3RunImages;
        this.imageIndex = 0;

        this.lastAnimationTime = new Date();
        this.animationInterval = 200;
    }

    shoot() {
        if (this.target && new Date - this.lastShotTime >= this.shootInterval && this.imageIndex == 3) {
            this.projectiles.push(new Projectile1(
                this.target,
                this.x,
                this.y,
                this.damage,
                Constants.enemy3RunImages[4],
                Constants.projectileEnemyBang,
            ));

            this.lastShotTime = new Date();
        }
    }

    draw() {
        let ctx = this.ctx,
            img = this.runImages[this.imageIndex];

        ctx.drawImage(img, this.x - Constants.cellSize / 2,
                        this.y - Constants.cellSize / 2 + Constants.cellSize * 10/100,
                        Constants.cellSize, Constants.cellSize * 90/100);

        this.drawHP();

        if (new Date - this.lastAnimationTime >= this.animationInterval) {
            this.imageIndex = (this.imageIndex + 1) % 4;
            this.lastAnimationTime = new Date;
        }
    }
}
