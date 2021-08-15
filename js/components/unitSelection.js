import * as Constant from './../constants.js';
import { collisiondetection } from './../utils/utils.js';

export function chooseUnit(ctx, mouse, chosenUnit) {
    //let chosenUnit = 0;

    let ucard1stroke = 'black';
    let ucard2stroke = 'black';

    ctx.lineWidth = 1;

    if (collisiondetection(mouse, Constant.ucard1) && mouse.clicked) {
        chosenUnit = 1;
    } else if (collisiondetection(mouse, Constant.ucard2) && mouse.clicked) {
        chosenUnit = 2;
    }

    switch (chosenUnit) {
    case 1:
        ucard1stroke = 'gold';
        ucard2stroke = 'black';
        break;
    case 2:
        ucard1stroke = 'black';
        ucard2stroke = 'gold';
        break;
    default:
        ucard1stroke = 'black';
        ucard2stroke = 'black';
    }

    ctx.fillStyle = 'green';
    ctx.fillRect(415,15, 60, 75);
    ctx.fillRect(Constant.ucard1.x, Constant.ucard1.y, Constant.ucard1.width, Constant.ucard1.height);
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(Constant.ucard1.x, Constant.ucard1.y, Constant.ucard1.width,Constant.ucard1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(495,15, 60, 75);
    ctx.fillRect(Constant.ucard2.x, Constant.ucard2.y, Constant.ucard2.width, Constant.ucard2.height);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(Constant.ucard2.x, Constant.ucard2.y, Constant.ucard2.width,Constant.ucard2.height);

    return chosenUnit;
}
