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
    }
    update() {
        this.x += this.movement;
    }
}