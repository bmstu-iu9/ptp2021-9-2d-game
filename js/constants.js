export const
    canvasWidth = document.documentElement.scrollWidth,
    canvasHeight = document.documentElement.scrollHeight,
    controlBarWidth = canvasWidth,
    cellSize = canvasHeight / 15,
    controlBarHeight = cellSize * 2,
    fontSize = cellSize * 2 / 5 ;


export const
    left = 0,
    frame = 0,
    interval = 600,
    resources = 300;


function createCoords() {
    let list = [];
    let x = cellSize + (canvasWidth / 2 - 10 * cellSize - 6 * cellSize / 2) / 2;
    let y = cellSize - cellSize / 5;

    for (var i = 0; i < 7; i++) {
        const card = {
            x: x,
            y: y,
            width: cellSize,
            height: cellSize
        };
        list.push(card);
        x += cellSize + cellSize / 2;
    }

    x += (canvasWidth / 2 + cellSize / 2 - x) * 2 - cellSize / 2;



    for (var i = 0; i < 7; i++) {
        const card = {
            x: x,
            y: y,
            width: cellSize,
            height: cellSize
        };
        list.push(card);
        x += cellSize + cellSize / 2 ;
    }

    return list;
}

const list = createCoords();



export const ucard1 = list[7];

export const ucard2 = list[8];

export const ucard3 = list[9];

export const ucard4 = list[10];

export const ucard5 = list[11];

export const ucard6 = list[12];

export const ucard7 = list[13];



export const card1 = list[0];

export const card2 = list[1];

export const card3 = list[2];

export const card4 = list[3];

export const card5 = list[4];

export const card6 = list[5];

export const card7 = list[6];
