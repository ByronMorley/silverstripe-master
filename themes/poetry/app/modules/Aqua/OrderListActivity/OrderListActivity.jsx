import Config from '../Config.jsx';
import Activity from '../Supers/Activity.jsx';
import Item from './OrderItemSelectable.jsx';


class OrderList extends Activity {

    constructor(elem, AQ) {
        super(elem, AQ);
        this.itemSelected = false;
        this.selectedItem = null; //Item OBJ
        this.tag = 'li';
        this.init();
    }

    defaults(){
        return {
            animate: false
        }
    }

    init() {
        let _OrderList = this;

        //setup Item OBJ

        Array.from(this.activity.querySelectorAll(Config.SELECTABLE)).map((selectable) => {
            _OrderList.Selectables.push(new Item(selectable, _OrderList));
        });
        this._correctAnswerCount = this.Selectables.length;
        this.AQ.activateConfirm();
    }

    swapItems(dragAndDrop) {

        //Clone Elements
        let destinationElement = dragAndDrop.destinationElement.cloneNode(true);
        let originElement = dragAndDrop.originElement.cloneNode(true);

        //Add originElement to Destination area and replace destinationElement
        dragAndDrop.destinationArea.replaceChild(originElement, dragAndDrop.destinationElement);

        //Add destinationElement to Origin area and replace originElement
        dragAndDrop.originArea.replaceChild(destinationElement, dragAndDrop.originElement);

        //Reverse the swap and Add the Real Elements in place of the clones
        dragAndDrop.destinationArea.replaceChild(dragAndDrop.originElement, originElement);
        dragAndDrop.originArea.replaceChild(dragAndDrop.destinationElement, destinationElement);

        this.clearSelected();
    }

    reset(){
        this.AQ.activateConfirm();
        super.reset();
    }

}

export default OrderList;