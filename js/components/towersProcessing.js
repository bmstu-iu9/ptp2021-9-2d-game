export function putTower(cellSize, towers, chooseTower, mouse, resources) {
    const positionX = mouse.x - (mouse.x % cellSize);
    const positionY = mouse.y - (mouse.y % cellSize);

    if (positionY < cellSize) return;

    for (let i = 0; i < towers.length; i++) {
        if (towers[i].x === positionX && towers[i].y === positionY) {
            return;
        }
    }

    switch(choosentower) {
    case 1:
    if (resources >= 100) {
        let help = new Tower1(positionX, positionY);
        towers.push(help);
        resources -= help.cost;
    }
    case 2:
    if (resources >= 100) {
        let help = new Tower2(positionX, positionY);
        towers.push(help);
        resources -= help.cost;
    }
    case 3:
    if (resources >= 100) {
        let help = new Tower3(positionX, positionY);
        towers.push(help);
        resources -= help.cost;
    }
    case 4:
    if (resources >= 100) {
        let help = new Tower4(positionX, positionY);
        towers.push(help);
        resources -= help.cost;
    }
    case 5:
    if (resources >= 100) {
        let help = new Tower1(positionX, positionY);
        towers.push(help);
        resources -= help.cost;
    }
}
