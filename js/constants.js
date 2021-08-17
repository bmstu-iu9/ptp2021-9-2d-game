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
    let cards = [];
    let x = cellSize + (canvasWidth / 2 - 10 * cellSize - 6 * cellSize / 2) / 2;
    let y = cellSize - cellSize / 5;

    for (var i = 0; i < 7; i++) {
        const card = {
            x: x,
            y: y,
            width: cellSize,
            height: cellSize
        };
        cards.push(card);
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
        cards.push(card);
        x += cellSize + cellSize / 2 ;
    }

    return cards;
}

const cards = createCoords();


export const
    towerCard1 = cards[0],
    towerCard2 = cards[1],
    towerCard3 = cards[2],
    towerCard4 = cards[3],
    towerCard5 = cards[4],
    towerCard6 = cards[5],
    towerCard7 = cards[6];


export const
    unitCard1 = cards[7],
    unitCard2 = cards[8],
    unitCard3 = cards[9],
    unitCard4 = cards[10],
    unitCard5 = cards[11],
    unitCard6 = cards[12],
    unitCard7 = cards[13];
