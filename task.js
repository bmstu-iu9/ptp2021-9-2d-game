class Projectile1 {
  constructor(x, y, object){ //
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = CONSTANTA; //!!! Надо договориться о скорости
    this.movement = this.speed;
    this.health = true;
    this.damage = damage; //!!! Нада договориться про урон снаряда
    this.radius = radius;
  }
  update() {
    this.x += this.movement; //!!! Надо договорить о формуле для изменения
                            // координат пули и куда стрелять !!!!!
  }
  draw() {

     /*
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    */

    // Рисую овал для пули
    if (this.health == true) {
      ctx.beginPath();
      ctx.save(); // сохраняем стейт контекста
      ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
      ctx.scale(1, this.height/this.width); // сжимаем по вертикали
      ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
      ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
      ctx.strokeStyle = 'red';
      ctx.stroke(); // обводим
      ctx.closePath();
    }

  }
}


class Projectile2 {
  constructor(verticalPosition){
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = CONSTANTA; //!!! Надо договориться о скорости
    this.movement = this.speed;
    this.health = true;
    this.damage = CONSTANTA; //!!! Нада договориться про урон снаряда
  }
  update() {
    this.x += this.movement; //!!! Надо договорить о формуле для изменения
                            // координат пули и куда стрелять !!!!!
  }
  draw() {

    /*
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    */

    // Рисую овал для пули
    if (this.health == true) {
      ctx.beginPath();
      ctx.save(); // сохраняем стейт контекста
      ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
      ctx.scale(1, this.height/this.width); // сжимаем по вертикали
      ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
      ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
      ctx.strokeStyle = 'red';
      ctx.stroke(); // обводим
      ctx.closePath();
    }

  }
}

class Projectile3 {
  constructor(verticalPosition){
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = CONSTANTA; //!!! Надо договориться о скорости
    this.movement = this.speed;
    this.health = true;
    this.damage = CONSTANTA; //!!! Нада договориться про урон снаряда
  }
  update() {
    this.x += this.movement; //!!! Надо договорить о формуле для изменения
                            // координат пули и куда стрелять !!!!!
  }
  draw() {

    /*
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    */

    // Рисую овал для пули
    if (this.health == true) {
      ctx.beginPath();
      ctx.save(); // сохраняем стейт контекста
      ctx.translate(this.x, this.y); // перемещаем координаты в центр эллипса
      ctx.scale(1, this.height/this.width); // сжимаем по вертикали
      ctx.arc(0, 0, this.width, 0, Math.PI*2); // рисуем круг
      ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
      ctx.strokeStyle = 'red';
      ctx.stroke(); // обводим
      ctx.closePath();
    }

  }
}

function draw_Projectiles(list_projectiles) {

  for (let i = 0; i < list_projectiles.length; i++){
    let projectile = list_projectiles.shift();

    projectile.draw();

    if (projectile.health == true){
      list_projectiles.push(projectile);
    }
  }

  return list_projectiles;
}
