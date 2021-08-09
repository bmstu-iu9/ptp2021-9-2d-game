class Unit1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = CONSTANTA; //какое-то число
        //this.movement = this.speed;
        this.health = 100;
        this.damage = damage; //какое-то число
        this.radius = radius;
        this.projectiles = []; //пули
        this.shooting = false; 
        this.shootNow = false;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;
    }
    update() {
        //this.x += this.movement;
        if (frame % 10 === 0) {
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
            projectiles.push(new Projectile1(this.x + 70, this.y + 40);
            this.shootNow = false;
        }
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25)
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

function chooseUnit() {
    ctx.lineWidth = 1;
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
}