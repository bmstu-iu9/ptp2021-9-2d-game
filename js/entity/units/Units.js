class Unit1 { //�������� ���
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40; // �����-�� �����
        this.height = 40; //�����-�� �����
        this.speed = CONSTANTA; //�����-�� �����
        this.movement = this.speed;
        this.health = 100;
        this.damage = 10; //�����-�� �����
        this.radius = 20; //�����-�� �����
        this.projectiles = []; //����
        this.target = null; //����
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
            //������ �����1
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


function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function findTarget(enemies) { //����� ����
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

class Unit2 { //�������� ���
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40; // �����-�� �����
        this.height = 40; //�����-�� �����
        this.speed = CONSTANTA; //�����-�� �����
        this.movement = this.speed;
        this.health = 100;
        this.damage = 10; //�����-�� �����
        this.radius = 50; //�����-�� �����
        this.projectiles = []; //����
        this.target = null; //����
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
            //������ �����2
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
            this.radius += 10; //���������� ������� �����
            this.timer = 1;
        }
    }
}
