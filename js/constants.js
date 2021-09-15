export const
    canvasWidth = document.documentElement.scrollWidth,
    canvasHeight = document.documentElement.scrollHeight,
    cellSize = canvasHeight / 15,
    controlBarWidth = canvasWidth,
    controlBarHeight = cellSize * 2,
    gameGridWidth = canvasWidth,
    gameGridHeight = canvasHeight - controlBarHeight,
    fontSize = cellSize * 2 / 5 ;


function createCoords() {
    let cards = [];
    let cellSize1 = canvasWidth / 30;
    let x = canvasWidth / 4 - (7 / 2) * (cellSize1 + cellSize1/2)
    let y = cellSize - cellSize / 5 + (cellSize - cellSize1);

    for (var i = 0; i < 7; i++) {
        const card = {
            x: x,
            y: y,
            width: cellSize1,
            height: cellSize1
        };
        cards.push(card);
        x += cellSize1 + cellSize1 / 2;
    }

    x = canvasWidth * 3 / 4 - (7 / 2) * (cellSize1 + cellSize1/2)

    for (var i = 0; i < 7; i++) {
        const card = {
            x: x,
            y: y,
            width: cellSize1,
            height: cellSize1
        };
        cards.push(card);
        x += cellSize1 + cellSize1 / 2 ;
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


export const
    tower1Cost = 100,
    tower2Cost = 100,
    tower3Cost = 100,
    tower4Cost = 100,
    tower5Cost = 100,
    tower6Cost = 100,
    tower7Cost = 100;

export const
    unit1Cost = 100,
    unit2Cost = 100,
    unit3Cost = 100,
    unit4Cost = 100,
    unit5Cost = 100,
    unit6Cost = 100,
    unit7Cost = 100;


function createImage(path) {
    let image = new Image();
    image.src = path;
    return image;
}

export const
    controlBarBG = createImage("./images/background/controlBar.png"),
    gameGridBG = createImage("./images/background/gameGrid.png"),
    playerBaseImage = createImage("./images/bases/playerBase.png"),
    enemyBaseImage = createImage("./images/bases/enemyBase.png"),
    upgradeArrow = createImage("./images/towers/upgradeArrow.png");


export const
    chosenTower1Button = createImage("./images/buttons/towers/tower1.png"),
    chosenTower2Button = createImage("./images/buttons/towers/tower2.png"),
    chosenTower3Button = createImage("./images/buttons/towers/tower3.png"),
    chosenTower4Button = createImage("./images/buttons/towers/tower4.png"),
    chosenTower5Button = createImage("./images/buttons/towers/tower5.png"),
    chosenTower6Button = createImage("./images/buttons/towers/tower6.png"),
    chosenTower7Button = createImage("./images/buttons/towers/tower7.png");

export const
    chosenUnit1Button = createImage("./images/buttons/units/unit1.png"),
    chosenUnit2Button = createImage("./images/buttons/units/unit2.png"),
    chosenUnit3Button = createImage("./images/buttons/units/unit3.png"),
    chosenUnit4Button = createImage("./images/buttons/units/unit4.png"),
    chosenUnit5Button = createImage("./images/buttons/units/unit5.png"),
    chosenUnit6Button = createImage("./images/buttons/units/unit6.png"),
    chosenUnit7Button = createImage("./images/buttons/units/unit7.png");


export const
    tower1Images = [
        createImage("./images/towers/tower1/0.png"),
        createImage("./images/towers/tower1/1.png"),
        createImage("./images/towers/tower1/2.png"),
        createImage("./images/towers/tower1/3.png"),
        createImage("./images/towers/tower1/projectile1.png"),
    ],

    tower2Images = [
        createImage("./images/towers/tower2/0.png"),
        createImage("./images/towers/tower2/1.png"),
        createImage("./images/towers/tower2/2.png"),
        createImage("./images/towers/tower2/3.png"),
        createImage("./images/towers/tower2/4.png"),
        createImage("./images/towers/tower2/5.png"),
        createImage("./images/towers/tower2/projectile2.png"),
    ],

    tower3Images = [
        createImage("./images/towers/tower3/0.png"),
        createImage("./images/towers/tower3/1.png"),
        createImage("./images/towers/tower3/2.png"),
        createImage("./images/towers/tower3/3.png"),
        createImage("./images/towers/tower3/projectile3.png"),
    ],

    tower4Images = [
        createImage("./images/towers/tower4/0.png"),
        createImage("./images/towers/tower4/1.png"),
        createImage("./images/towers/tower4/2.png"),
        createImage("./images/towers/tower4/3.png"),
        createImage("./images/towers/tower4/4.png"),
        createImage("./images/towers/tower4/projectile4.png")
    ],

    tower5Images = [
        createImage("./images/towers/tower5/0.png"),
        createImage("./images/towers/tower5/1.png"),
        createImage("./images/towers/tower5/2.png"),
        createImage("./images/towers/tower5/3.png"),
        createImage("./images/towers/tower5/4.png"),
        createImage("./images/towers/tower5/projectile5.png")
    ],

    tower6Images = [
        createImage("./images/towers/tower6/0.png"),
        createImage("./images/towers/tower6/1.png"),
        createImage("./images/towers/tower6/2.png"),
        createImage("./images/towers/tower6/3.png"),
    ],

    tower7Images = [
        createImage("./images/towers/tower7/0.png"),
        createImage("./images/towers/tower7/1.png"),
        createImage("./images/towers/tower7/2.png"),
        createImage("./images/towers/tower7/3.png"),
    ];


export const
    unit1RunImages = [
        createImage("./images/units/unit1/run/0.png"),
        createImage("./images/units/unit1/run/1.png"),
        createImage("./images/units/unit1/run/2.png"),
        createImage("./images/units/unit1/run/3.png"),
    ],

    unit1HitImages = [
        createImage("./images/units/unit1/hit/0.png"),
        createImage("./images/units/unit1/hit/1.png"),
        createImage("./images/units/unit1/hit/2.png"),
        createImage("./images/units/unit1/hit/3.png"),
        createImage("./images/units/unit1/projectile2_6.png"),
    ],

    unit2RunImages = [
        createImage("./images/units/unit2/run/0.png"),
        createImage("./images/units/unit2/run/1.png"),
        createImage("./images/units/unit2/run/2.png"),
        createImage("./images/units/unit2/run/3.png"),
    ],

    unit2HitImages = [
        createImage("./images/units/unit2/hit/0.png"),
        createImage("./images/units/unit2/hit/1.png"),
        createImage("./images/units/unit2/hit/2.png"),
        createImage("./images/units/unit2/hit/3.png"),
        createImage("./images/units/unit2/projectile2.png"),
    ],

    unit3RunImages = [
        createImage("./images/units/unit3/run/0.png"),
        createImage("./images/units/unit3/run/1.png"),
        createImage("./images/units/unit3/run/2.png"),
        createImage("./images/units/unit3/run/3.png"),
    ],

    unit3HitImages = [
        createImage("./images/units/unit3/hit/0.png"),
        createImage("./images/units/unit3/hit/1.png"),
        createImage("./images/units/unit3/hit/2.png"),
        createImage("./images/units/unit3/hit/3.png"),
        createImage("./images/units/unit3/projectile3.png"),
    ],

    unit4RunImages = [
        createImage("./images/units/unit4/0.png"),
        createImage("./images/units/unit4/1.png"),
        createImage("./images/units/unit4/2.png"),
        createImage("./images/units/unit4/3.png"),
    ],

    unit5RunImages = [
        createImage("./images/units/unit5/run/0.png"),
        createImage("./images/units/unit5/run/1.png"),
        createImage("./images/units/unit5/run/2.png"),
        createImage("./images/units/unit5/run/3.png"),
    ],

    unit5HitImages = [
        createImage("./images/units/unit5/hit/0.png"),
        createImage("./images/units/unit5/hit/1.png"),
        createImage("./images/units/unit5/hit/2.png"),
        createImage("./images/units/unit5/hit/3.png"),
        createImage("./images/units/unit5/projectile2.png"),
    ],

    unit6RunImages = [
        createImage("./images/units/unit6/run/0.png"),
        createImage("./images/units/unit6/run/1.png"),
        createImage("./images/units/unit6/run/2.png"),
        createImage("./images/units/unit6/run/3.png"),
    ],

    unit6HitImages = [
        createImage("./images/units/unit6/hit/0.png"),
        createImage("./images/units/unit6/hit/1.png"),
        createImage("./images/units/unit6/hit/2.png"),
        createImage("./images/units/unit6/hit/3.png"),
        createImage("./images/units/unit6/projectile2_6.png"),
    ],

    unit7RunImages = [
        createImage("./images/units/unit7/run/0.png"),
        createImage("./images/units/unit7/run/1.png"),
        createImage("./images/units/unit7/run/2.png"),
        createImage("./images/units/unit7/run/3.png"),
    ],

    unit7HitImages = [
        createImage("./images/units/unit7/hit/0.png"),
        createImage("./images/units/unit7/hit/1.png"),
        createImage("./images/units/unit7/hit/2.png"),
        createImage("./images/units/unit7/hit/3.png"),
        createImage("./images/units/unit7/projectile2.png"),
    ];


export const
    enemy1RunImages = [
        createImage("./images/enemies/enemy1/run/0.png"),
        createImage("./images/enemies/enemy1/run/1.png"),
        createImage("./images/enemies/enemy1/run/2.png"),
        createImage("./images/enemies/enemy1/run/3.png"),
    ],

    enemy1HitImages = [
        createImage("./images/enemies/enemy1/hit/0.png"),
        createImage("./images/enemies/enemy1/hit/1.png"),
        createImage("./images/enemies/enemy1/hit/2.png"),
        createImage("./images/enemies/enemy1/hit/3.png"),
    ],

    enemy2RunImages = [
        createImage("./images/enemies/enemy2/run/0.png"),
        createImage("./images/enemies/enemy2/run/1.png"),
        createImage("./images/enemies/enemy2/run/2.png"),
        createImage("./images/enemies/enemy2/run/3.png"),
    ],

    enemy2HitImages = [
        createImage("./images/enemies/enemy2/hit/0.png"),
        createImage("./images/enemies/enemy2/hit/1.png"),
        createImage("./images/enemies/enemy2/hit/2.png"),
        //createImage("./images/enemies/enemy2/hit/3.png"),
    ],

    enemy3RunImages = [
        createImage("./images/enemies/enemy3/0.png"),
        createImage("./images/enemies/enemy3/1.png"),
        createImage("./images/enemies/enemy3/2.png"),
        createImage("./images/enemies/enemy3/3.png"),
        createImage("./images/enemies/enemy3/projectile3.png"),
    ],

    enemy4RunImages = [
        createImage("./images/enemies/enemy4/0.png"),
        createImage("./images/enemies/enemy4/1.png"),
        createImage("./images/enemies/enemy4/2.png"),
        createImage("./images/enemies/enemy4/3.png"),
    ],

    enemyProjectile = createImage("./images/enemies/projectile6.png");

export const
    projectileUnitBang = [
        createImage("./images/bang/projectile1/0.png"),
        createImage("./images/bang/projectile1/0.png"),
        createImage("./images/bang/projectile1/1.png"),
        createImage("./images/bang/projectile1/1.png"),
    ],

    projectileEnemyBang = [
        createImage("./images/bang/projectile2/0.png"),
        createImage("./images/bang/projectile2/0.png"),
        createImage("./images/bang/projectile2/1.png"),
        createImage("./images/bang/projectile2/1.png"),
    ];
