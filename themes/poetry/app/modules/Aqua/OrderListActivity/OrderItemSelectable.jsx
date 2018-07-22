import DragAndDrop from "./DragAndDrop.jsx";
import Util from "../../../components/Util";
import Selectable from '../Supers/Selectable.jsx';

class OrderListItem extends Selectable{

    constructor(elem, activity) {
        super(elem, activity);
        this.position = parseInt(this.elem.dataset.sort);
        this.correct = false;
        this.Activity.itemSelected = false;
    }

    click() {
        if (this.Activity.itemSelected) {
            if(this.selected){
                this.deselect();
            }else{
                let dragAndDrop = new DragAndDrop({originItem: this.Activity.selectedItem, destinationItem: this});
                this.Activity.swapItems(dragAndDrop);
            }
        } else {
            this.select();
        }
    }

    select() {
        this.elem.classList.add('selected');
        this.selected = true;
        this.Activity.itemSelected = true;
        this.Activity.selectedItem = this;
    }

    deselect() {
        if (this.elem.classList.contains('selected')) {
            this.elem.classList.remove('selected');
        }
        this.selected = false;
        this.Activity.itemSelected = false;
    }

    check() {
        let position = (Util.getNodeIndex(this.elem) + 1);
        if(position === this.position){
            this.correct = true;
            this.Activity.selectedCorrectAnswerCount++;
            this.addTickIcon();
        }
        else{
            this.addCrossIcon();
        }
    }
}

export default OrderListItem;