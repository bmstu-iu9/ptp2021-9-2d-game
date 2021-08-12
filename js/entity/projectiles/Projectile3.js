import { calculateDistance } from './../../utils/utils.js';

export default class Projectile3 {
    constructor(target, x, y, upgrade, damage) { //
        this.towerx = x;
        this.towery = y;
        this.targetX = target.x;
        this.targetY = target.y;
        this.x = x + 55;
        this.y = y + 55;
        this.width = 250;
        this.height = this.y + 45;
        this.speed = 5; //!!! Надо договориться о скорости
        this.health = true;
        this.damage = damage; //!!! Нада договориться про урон снаряда
        this.radius = 10;
        this.target = target;
        this.angle = 0;
        this.delta_update_damage = 50; // Надо договориться!
        this.upgrade = upgrade;
        this.explosion = 0;
        this.complete = false;
    }

    update() {

    }

    draw(ctx) {

        if (this.target == null) {
            return ;
        }
        if (this.health) {
            ctx.fillStyle = 'red';
            if (this.uograde == 0) {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            } else {
                ctx.fillRect(this.x, this.y - 100, this.width, this.height + 45);
            }

            ctx.fillStyle = 'black';
            ctx.font = '30px Orbitron';
        } else {
            this.explosion += 1;
            if (this.explosion == 5) {
                this.complete = true;
            }
        }
    }

    hit(targets) {
        let list_target = [];

        if (this.target == null || !this.health) {
            return ;
        }

        this.health = false;

        for (let i = 0; i < targets.length; i++) {
            let target = targets[i];

            if (target.x < this.x + 250 &&
               ((target.y == this.y - 55 && this.upgrade == 0) ||
                (target.y <= this.y - 55 + 100 && target.y >= this.y - 55 - 100 && this.upgrade > 0))) {

                if (target.health - damage_delta < 0) {
                    target.health = 0;
                } else {
                    target.health -= damage_delta;
                }
            }
        }
    }
}
