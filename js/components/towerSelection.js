import * as Constant from './../constants.js';
import { collisiondetection } from './../utils/utils.js';

export function chooseTower(ctx, mouse, chosenTower) {
    //let chosenTower = 0;
    let card1stroke = 'black';
    let card2stroke = 'black';
    let card3stroke = 'black';
    let card4stroke = 'black';
    let card5stroke = 'black';
    ctx.lineWidth = 10;

    if (collisiondetection(mouse, Constant.card1) && mouse.clicked) {
        chosenTower = 1;
    } else if (collisiondetection(mouse, Constant.card2) && mouse.clicked) {
        chosenTower = 2;
    } else if (collisiondetection(mouse, Constant.card3) && mouse.clicked) {
        chosenTower = 3;
    } else if (collisiondetection(mouse, Constant.card4) && mouse.clicked) {
        chosenTower = 4;
    } else if (collisiondetection(mouse, Constant.card5) && mouse.clicked) {
        chosenTower = 5;
    }

    switch (chosenTower) {
    case 1:
        card1stroke = 'gold';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'black';
        card5stroke = 'black';
        break;
    case 2:
        card1stroke = 'black';
        card2stroke = 'gold';
        card3stroke = 'black';
        card4stroke = 'black';
        card5stroke = 'black';
        break;
    case 3:
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'gold';
        card4stroke = 'black';
        card5stroke = 'black';
        break;
    case 4:
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'gold';
        card5stroke = 'black';
        break;
    case 5:
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'black';
        card5stroke = 'gold';
        break;
    default:
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'black';
        card5stroke = 'black';
    }

    ctx.fillStyle = 'green';
    ctx.fillRect(Constant.card1.x, Constant.card1.y, Constant.card1.width, Constant.card1.height);
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(Constant.card1.x, Constant.card1.y, Constant.card1.width,Constant.card1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(Constant.card2.x, Constant.card2.y, Constant.card2.width, Constant.card2.height);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(Constant.card2.x, Constant.card2.y, Constant.card2.width,Constant.card2.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(Constant.card3.x, Constant.card3.y, Constant.card3.width, Constant.card3.height);
    ctx.strokeStyle = card3stroke;
    ctx.strokeRect(Constant.card3.x, Constant.card3.y, Constant.card3.width,Constant.card3.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(Constant.card4.x, Constant.card4.y, Constant.card4.width, Constant.card4.height);
    ctx.strokeStyle = card4stroke;
    ctx.strokeRect(Constant.card4.x, Constant.card4.y, Constant.card4.width,Constant.card4.height);

    ctx.fillStyle = 'purple';
    ctx.fillRect(Constant.card5.x, Constant.card5.y, Constant.card5.width, Constant.card5.height);
    ctx.strokeStyle = card5stroke;
    ctx.strokeRect(Constant.card5.x, Constant.card5.y, Constant.card5.width,Constant.card5.height);

    return chosenTower;
}
