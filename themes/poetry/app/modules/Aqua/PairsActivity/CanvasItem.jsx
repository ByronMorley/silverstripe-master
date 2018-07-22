import CanvasHelper from "../Util/CanvasHelper.jsx";

export default class CanvasItem {

    constructor(elem, Canvas, x, y, width, height) {
        this.elem = elem;
        this.Canvas = Canvas;
        this.text = this.elem.dataset.text;
        this.pairID = parseInt(this.elem.dataset.pair);
        this.side = this.elem.dataset.side;

        this.init()
    }

    init() {
    }

    draw(ctx) {

    }



}