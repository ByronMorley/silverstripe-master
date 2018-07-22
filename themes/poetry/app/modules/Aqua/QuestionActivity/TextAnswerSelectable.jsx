import Selectable from '../Supers/Selectable.jsx';

class Answer extends Selectable {

    constructor(elem, activity) {
        super(elem, activity);
        this.id = this.elem.getAttribute('id');
        this.number = parseInt(this.elem.dataset.number);
        this.correct = parseInt(this.elem.dataset.answer);
        this.addUnselectedIcon();
    }

    click() {
        if (this.selected) {
            this.deselect();
        } else {
            if (this.Activity.hasOneAnswer) {
                this.Activity.clearSelected();
            }
            this.select();
        }
        this.Activity.AQ.toggleConfirm();
    }

    check() {
        if (this.selected) {
            if (this.correct) {
                this.Activity.selectedCorrectAnswerCount++;
                this.addTickIcon();
            } else {
                this.addCrossIcon();
            }
        } else {
            if (this.correct) {
                this.addTickIcon();
            } else {
                this.fadeOut();
            }
        }
    }
}

export default Answer;