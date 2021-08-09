class Unit1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = CONSTANTA; //какое-то число
        this.movement = this.speed;
        this.health = 100;
        this.damage = damage; //какое-то число
        this.radius = radius;
    }
    update() {
        this.x += this.movement;
    }
}