class Unit1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = CONSTANTA; //�����-�� �����
        this.movement = this.speed;
        this.health = 100;
        this.damage = damage; //�����-�� �����
        this.radius = radius;
        this.projectiles = []; //����
        this.shooting = false; 
        this.shootNow = false;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;
    }
    update() {
        this.x += this.movement;
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25)
    }
}