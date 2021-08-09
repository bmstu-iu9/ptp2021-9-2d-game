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
        //this.shooting = false; 
        //this.shootNow = false;
        /*this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;*/
        this.target = null; //цель
        this.targetIndex = -1;
        //this.range = 20;
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

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}
const card2 = {
    x: 90,
    y: 10,
    width: 70,
    height: 85
}

function chooseUnit() { //выбор юнитов
    ctx.lineWidth = 1;
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
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
    for (let i = 0; n = enemies.length; i < n; i++) {
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
        //this.shooting = false; 
        //this.shootNow = false;
        /*this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;*/
        this.target = null; //цель
        this.targetIndex = -1;
        this.timer = 1;
    }
    update() {
        if (this.target === null) this.x += this.movement;
        else {
            shoot();
            //this.timer++;
        }
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