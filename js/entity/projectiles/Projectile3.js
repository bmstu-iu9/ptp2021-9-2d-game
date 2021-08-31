import { calculateDistance } from './../../utils/utils.js';
import * as Constants from './../../constants.js';

export default class Projectile3 {
    constructor(target, x, y, damage, img) {
        this.towerX = x;

        this.target = target;
        this.targetX = target.x;
        this.targetY = target.y;

        this.img = img;

        this.x = x;
        this.y = y;
        this.width = Constants.cellSize / 2;
        this.height = Constants.cellSize ;

        this.range = 6 * Constants.cellSize + Constants.cellSize / 2;

        this.speed = Constants.cellSize / 20;
        this.damage = damage;

        this.complete = false;
    }

    update() {
        this.x += this.speed;

        if (this.x - this.towerX > this.range) {
            this.complete = true;
        }
    }

    hit(enemies) {
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];

            if (Math.abs(enemy.x - this.x) < Constants.cellSize / 20 &&
                this.y == enemy.y) {

                if (enemy.health - this.damage < 0) {
                    enemy.health = 0;
                } else {
                    enemy.health -= this.damage;
                }
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y - Constants.cellSize / 2);

        ctx.rotate(this.direction);

        ctx.drawImage(this.img,
                      0,
                      0,
                      this.width,
                      this.height);

        ctx.restore();
        ctx.stroke();
        ctx.closePath();
    }
}
