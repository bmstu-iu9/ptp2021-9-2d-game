export class Enemies {
  constructor(verticalPosition){
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.damage = enemydamage;
    this.firerate = enemyfirerate;
    this.maxHealth = this.health;
  }
  update(){
    this.x -= this.movement;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25)
  }
}

export function handleEnemies(){
  for (let i = 0; i < enemies.length; i++){
    if (enemies[i].health <= 0){
      resourses += enemies[i].maxHealth / 10;
      enemies.splice(i, 1);
      i--;
    }
    enemies[i].update();
    enemies[i].draw();
  }
  if (frame % interval === 0){
    let verticalPosition = Math.floor(Math.random() * 7 + 1) * cellSize;
    enemies.push(new Enemies(verticalPosition));
    if (interval > 120) interval-= 50;
  }
  if (frame % 2000 === 0 && frame > 0){
    enemydamage += (frame / 1000);
  }
}
