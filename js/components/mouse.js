export default class Mouse {
    constructor(canvas) {
        this.x = 150;
        this.y =  150;
        this.width = 0.1;
        this.height = 0.1;
        this.clicked = false;
        this.canvas = canvas;
    }

    init() {
        let canvas = this.canvas;
        let canvasPosition = canvas.getBoundingClientRect();

        canvas.addEventListener('mousemove', function(e) {
            this.x = e.x - canvasPosition.left;
            this.y = e.y - canvasPosition.top;
        });

        canvas.addEventListener('mouseleave', function() {
            this.x = undefined;
            this.y = undefined;
        });

        canvas.addEventListener('mousedown', function() {
            this.clicked = true;
        });

        canvas.addEventListener('mouseup', function() {
            this.clicked = false;
        });
    }
}
