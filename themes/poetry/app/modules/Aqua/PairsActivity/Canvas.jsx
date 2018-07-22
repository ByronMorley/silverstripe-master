
class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this._context = this.canvas.getContext('2d');
        this.canvas.width ="800";
        this.canvas.height ="600";
        this.frame = 1;
        this.waypoints = [];
        this.vertices = [];
        this.pointSelected = false;

    }

    init() {
        let _Canvas = this;

        this.canvas.addEventListener('mousedown', (event) => {
            _Canvas.click(event);
        });


    }

    drawHandle(ctx){
        ctx.fillRect(0, 15, 30, 10);
        ctx.beginPath();
        ctx.arc(35, 20, 10, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(35, 20, 5, 0, Math.PI * 2, true);
        ctx.fillStyle="#FFF";
        ctx.fill();
    }

    click(event) {
        console.log('MouseDown');
    }

    calcWaypoints(vertices) {
        let waypoints = [];
        for (let i = 1; i < vertices.length; i++) {
            let pt0 = vertices[i - 1];
            let pt1 = vertices[i];
            let dx = pt1.x - pt0.x;
            let dy = pt1.y - pt0.y;
            for (let j = 0; j < 100; j++) {
                let x = pt0.x + dx * j / 100;
                let y = pt0.y + dy * j / 100;
                waypoints.push({
                    x: x,
                    y: y
                });
            }
        }
        return waypoints;
    }



    draw(){

    }

    /*
    draw() {
        let ctx = this.context;
        ctx.beginPath();
        ctx.moveTo(this.waypoints[this.frame - 1].x, this.waypoints[this.frame - 1].y);
        ctx.lineTo(this.waypoints[this.frame].x, this.waypoints[this.frame].y);
        ctx.stroke();
    }
    */

    drawLine() {
        this.frame = 1;
        const animate = () => {
            const animId = requestAnimationFrame(animate);
            this.draw();
            if (this.frame >= this.waypoints.length - 1) {
                console.log("end animation");
                cancelAnimationFrame(animId);
            }
            this.frame++;
        };
        animate();
    }


    getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    get context() {
        return this._context;
    }
}

export default Canvas;