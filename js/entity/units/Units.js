class Unit1 { //ближнего боя
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40; // какое-то число
        this.height = 40; //какое-то число
        this.speed = CONSTANTA; //какое-то число
        this.movement = this.speed;
        this.health = 100;
        this.damage = 10; //какое-то число
        this.radius = 20; //какое-то число
        this.projectiles = []; //пули
        this.target = null; //цель
        this.targetIndex = -1;
        this.chosenUnit = chosenUnit;
    }
    update() {
        if (this.target === null) this.x += this.movement;
        else shoot();
        /*if (frame % 10 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === 15) this.shootNow = true;
        }
        if (this.shooting) {
            this.minFrame = 0;
            this.maxFrame = 15;
        } else {
            this.minFrame = 17;
            this.maxFrame = 23;
        }
        if (this.shooting && this.shootNow) {
            projectiles.push(new Projectile(this.x + 70, this.y + 40);
            this.shootNow = false;
        }*/
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        if (this.chosenUnit === 1) {
            //рисуем юнита1
        }
    }
    shoot() {
        this.projectiles.push(new Projectile({
            target: this.target,
            x: this.x,
            y: this.y
        }))
        if (this.health === 25) this.damage = this.damage * 2.5;
    }
}

let chosenUnit = 1; //глобальная переменная
const card6 = {
    x: 360,
    y: 10,
    width: 70,
    height: 85
}
const card7 = {
    x: 440,
    y: 10,
    width: 70,
    height: 85
}

let card6stroke = 'black';
let card7stroke = 'black';

function chooseUnit() { //выбор юнитов
    
    if (collisiondetection(mouse, card6) && mouse.clicked) {
        chosenUnit = 1;
    } else if (collisiondetection(mouse, card7) && mouse.clicked) {
        chosenUnit = 2;
    }
    if (chosenUnit === 1) {
        card6stroke = 'gold';
        card7stroke = 'black';
    } else if (chosenUnit === 2) {
        card6stroke = 'black';
        card7stroke = 'gold';
    } else {
        card6stroke = 'black';
        card7stroke = 'black';
    }
    ctx.lineWidth = 1;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(card6.x, card6.y, card6.width, card6.height);
    ctx.strokeStyle = card6stroke;
    ctx.fillRect(card7.x, card7.y, card7.width, card7.height);
    ctx.strokeStyle = card7stroke;
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function findTarget(enemies) { //поиск цели
    if (this.target !== null) {
        enemy = enemies[this.targetIndex];
        if (enemy &&
            calculateDistance(this.x, this.y, enemy.x, enemy.y) > this.radius) {
            return;
        }
    }
    nearestEnemyId = -1;
    minDistance = this.radius;
    for (let i = 0; i < enemies.length; i++) {
        enemy = enemies[i];
        distance = calculateDistance(this.x, this.y, enemy.x, enemy.y);
        if (distance < minDistance) {
            nearestEnemyId = i;
            minDistance = distance;
        }
    }
    if (nearestEnemyId !== -1) {
        this.targetIndex = nearestEnemyId;
        this.target = enemies[nearestEnemyId];
    }
    return this.target;
}

class Unit2 { //дальнего боя
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40; // какое-то число
        this.height = 40; //какое-то число
        this.speed = CONSTANTA; //какое-то число
        this.movement = this.speed;
        this.health = 100;
        this.damage = 10; //какое-то число
        this.radius = 50; //какое-то число
        this.projectiles = []; //пули
        this.target = null; //цель
        this.targetIndex = -1;
        this.timer = 1;
        this.chosenUnit = chosenUnit;
    }
    update() {
        if (this.target === null) this.x += this.movement;
        else {
            shoot();
            //this.timer++;
        }
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        if (this.chosenUnit === 2) {
            //рисуем юнита2
        }
    }
    shoot() {
        this.timer++;
        this.projectiles.push(new Projectile({
            target: this.target,
            x: this.x,
            y: this.y
        }))
        if (this.timer === 10) {
            this.radius += 10; //увеличение радиуса атаки
            this.timer = 1;
        }
    }
}