
// враги
// игровое поле


const controlsBar = {
  width: canvas.width,
  height: 100,
}


window.onkeydown = function move_left(){
  if(event.keyCode==38){
    left=left-10;
    document.getElementById('canvas1').style.left = left + 'px';
  }
  else if(event.keyCode == 40){
    left=left+10;
    document.getElementById('canvas1').style.left = left + 'px';
  }
  canvasPosition = canvas.getBoundingClientRect();
};


const card1 = {
  x: 170,
  y: 10,
  width: 70,
  height: 85,
}

const card2 = {
  x: 250,
  y: 10,
  width: 70,
  height: 85,
}

const card3 = {
  x: 330,
  y: 10,
  width: 70,
  height: 85,
}

const card4 = {
  x: 410,
  y: 10,
  width: 70,
  height: 85,
}

const card5 = {
  x: 490,
  y: 10,
  width: 70,
  height: 85,
}

let choosentower = 1;
let card1stroke = 'black';
let card2stroke = 'black';
let card3stroke = 'black';
let card4stroke = 'black';
let card5stroke = 'black';  // чтобы все что ниже работало, надо в при создании башен смотреть на переменную chosentower

function choosetowers(){
  ctx.lineWidth = 1;
  if (collisiondetection(mouse, card1) && mouse.clicked){
    choosentower = 1;
  } else if (collisiondetection(mouse,card2) && mouse.clicked){
    choosentower = 2;
  } else if (collisiondetection(mouse,card3) && mouse.clicked){
    choosentower = 3;
  } else if (collisiondetection(mouse,card4) && mouse.clicked){
    choosentower = 4;
  } else if (collisiondetection(mouse,card5) && mouse.clicked){
    choosentower = 5;
  }
  switch (choosentower) {
    case 1:
      card1stroke = 'gold';
      card2stroke = 'black';
      card3stroke = 'black';
      card4stroke = 'black';
      card5stroke = 'black';
      break;
   case 2:
     card1stroke = 'black';
     card2stroke = 'gold';
     card3stroke = 'black';
     card4stroke = 'black';
     card5stroke = 'black';
     break;
   case 3:
     card1stroke = 'black';
     card2stroke = 'black';
     card3stroke = 'gold';
     card4stroke = 'black';
     card5stroke = 'black';
     break;
   case 4:
     card1stroke = 'black';
     card2stroke = 'black';
     card3stroke = 'black';
     card4stroke = 'gold';
     card5stroke = 'black';
     break;
   case 5:
     card1stroke = 'black';
     card2stroke = 'black';
     card3stroke = 'black';
     card4stroke = 'black';
     card5stroke = 'gold';
     break;
    default:
    card1stroke = 'black';
    card2stroke = 'black';
    card3stroke = 'black';
    card4stroke = 'black';
    card5stroke = 'black';

  }
  ctx.fillStyle = 'green';
  ctx.fillRect(15,15, 60, 75);
  ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
  ctx.strokeStyle = card1stroke;
  ctx.strokeRect(card1.x, card1.y, card1.width,card1.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(95,15, 60, 75);
  ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
  ctx.strokeStyle = card2stroke;
  ctx.strokeRect(card2.x, card2.y, card2.width,card2.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(175,15, 60, 75);
  ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
  ctx.strokeStyle = card3stroke;
  ctx.strokeRect(card3.x, card3.y, card3.width,card3.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(255,15, 60, 75);
  ctx.fillRect(card4.x, card4.y, card4.width, card4.height);
  ctx.strokeStyle = card4stroke;
  ctx.strokeRect(card4.x, card4.y, card4.width,card4.height);
  ctx.fillStyle = 'purple';
  ctx.fillRect(335,15, 60, 75);
  ctx.fillRect(card5.x, card5.y, card5.width, card5.height);
  ctx.strokeStyle = card5stroke;
  ctx.strokeRect(card5.x, card5.y, card5.width,card5.height);
}
