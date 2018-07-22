import Util from '../../../components/Util';

class DragAndDrop {

    constructor(opts) {

        if (opts.originItem) {

            this._originElement = opts.originItem.elem;
            this._originElementId = this._originElement.getAttribute('id');
            this._originElementInnerHtml = this._originElement.innerHTML;

            this._originArea = this._originElement.parentNode;
            this._originAreaId = this._originArea.getAttribute('id');
            this._originIndex = Util.getNodeIndex(this._originElement);
        }

        if (opts._destinationArea) {
            this._destinationArea = opts._destinationArea;
            this._destinationAreaId = opts._destinationArea.getAttribute('id');
        }

        if (opts.destinationItem) {
            this._destinationElement = opts.destinationItem.elem;
            this._destinationElementId = this._destinationElement.getAttribute('id');
            this._destinationIndex = Util.getNodeIndex(this._destinationElement);

            this._destinationArea = this._destinationElement.parentNode;
            this._destinationAreaId = this._destinationArea.getAttribute('id');
        }
        this._opts = opts;
    }

    get opts() {
        return this._opts;
    }

    get originElement() {
        return this._originElement;
    }

    get originElementId() {
        return this._originElementId;
    }

    get originElementInnerHtml() {
        return this._originElementInnerHtml;
    }

    get originArea() {
        return this._originArea;
    }

    get originAreaId() {
        return this._originAreaId;
    }

    get originIndex() {
        return this._originIndex;
    }

    get destinationElement() {
        return this._destinationElement;
    }

    get destinationElementId() {
        return this._destinationElementId;
    }

    get destinationIndex() {
        return this._destinationIndex;
    }

    get destinationArea() {
        return this._destinationArea;
    }

    get destinationAreaId() {
        return this._destinationAreaId;
    }
}
export default DragAndDrop;