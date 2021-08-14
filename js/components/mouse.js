export default class Mouse {
    constructor(game) {

        this.x = 0;
        this.y =  0;
        this.width = 0.1;
        this.height = 0.1;
        this.clicked = false;
        this.canvas = game.canvas;
    }

    init(game) {
        //let canvas = this.canvas;
        let canvasPosition = game.canvas.getBoundingClientRect();

        this.canvas.addEventListener('mousemove', function(e) {
            //console.log(canvasPosition, game.mouse.x)
            game.mouse.x = e.x - canvasPosition.left;
            game.mouse.y = e.y - canvasPosition.top;
        });

        this.canvas.addEventListener('mouseleave', function() {
            game.mouse.x = undefined;
            game.mouse.y = undefined;
        });

        this.canvas.addEventListener('mousedown', function() {
            game.mouse.clicked = true;
        });
        /*
        this.canvas.addEventListener('mouseup', function() {
            game.mouse.clicked = false;
        });
        */
    }
}
