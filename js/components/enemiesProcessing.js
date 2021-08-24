import * as Constants from './../constants.js';
import Enemy1 from './../entity/enemies/Enemy1.js';
import Enemy2 from './../entity/enemies/Enemy2.js';
import Enemy3 from './../entity/enemies/Enemy3.js';
import Enemy4 from './../entity/enemies/Enemy4.js';

export function processEnemies(game) {
    let enemies = game.enemies,
        ctx = game.ctx;

    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        enemy.update();

        if (enemy.died) {
            game.resources += enemy.maxHealth / 10;
            enemies.splice(i, 1);
            i--;
            continue;
        }

        enemy.shoot();
        enemy.draw();
    }

    if (new Date - game.last_enemy_summoning_time > game.enemy_summoning_interval) {
        let verticalPosition = Math.floor(Math.random() * 13 + 2) * Constants.cellSize;

        switch(Math.floor(Math.random() * 4 + 1)) {
            case 1:
                enemies.push(new Enemy1(game, verticalPosition));
                break;

            case 2:
                enemies.push(new Enemy2(game, verticalPosition));
                break;

            case 3:
                enemies.push(new Enemy3(game, verticalPosition));
                break;

            case 4:
                enemies.push(new Enemy4(game, verticalPosition));
                break;
            }

        game.last_enemy_summoning_time = new Date();
    }
}
