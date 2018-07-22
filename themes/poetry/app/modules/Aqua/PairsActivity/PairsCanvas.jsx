import Canvas from "./Canvas.jsx";
import Config from "../Config.jsx";
import CanvasItem from "./CanvasItem.jsx";

class PairsCanvas extends Canvas {

    constructor(canvas, activity) {
        super(canvas);
        this.activity = activity;
        this.activityArea = this.activity.querySelector('.aq-pair-activity-area');
        this.CanvasItems = [];


        super.init();
        this.init();
    }

    init() {
        let _PairsCanvas = this;
        setTimeout(function () {
            _PairsCanvas.setup();
        }, 1);
    }

    setup() {
        let _PairsCanvas = this;

        window.addEventListener('resize', function () {
            _PairsCanvas.canvas.width = _PairsCanvas.activityArea.clientWidth - 200;
        });

        this.canvas.width = this.activityArea.clientWidth - 200;
        this.canvas.height = "300";


        Array.from(this.activity.querySelectorAll(Config.CANVAS_ITEM)).map((elem) => {
            _PairsCanvas.CanvasItems.push(new CanvasItem(elem, _PairsCanvas));
        });

        this.drawHandle(this.context);

    }

}

export default PairsCanvas;