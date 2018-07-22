import Config from '../Config.jsx';
import Answer from './TextAnswerSelectable.jsx';
import Activity from '../Supers/Activity.jsx';


class Question extends Activity {

    constructor(elem, AQ) {
        super(elem, AQ);
        this.explanationText = this.activity.querySelector(Config.EXPLANATION_TEXT);
        this._correctAnswerCount = parseInt(this.activity.dataset.correct);
        this.hasOneAnswer = (this._correctAnswerCount <= 1);

        this.init();
    }

    init() {
        let _Question = this;

        //setup Answer OBJ
        Array.from(this.activity.querySelectorAll(Config.SELECTABLE)).map((selectable) => {
            _Question.Selectables.push(new Answer(selectable, _Question));
        });
    }

    clearSelected() {
        //clear the Selected Dom Elements
        this.Selectables.map((selectable) => {
            selectable.deselect();
        });
    }

    countSelected() {
        let count = 0;
        this.Selectables.map((selectable) => {
            if (selectable.selected) count++;
        });
        return count;
    }

    getExplanationText() {
        if (this.hasOneAnswer) {
            if (this.selectedCorrectAnswerCount) {
                return "Correct Answer";
            } else {
                return "Incorrect Answer";
            }
        } else {
            return "You have got " + this.selectedCorrectAnswerCount + " out of " + this._correctAnswerCount + " Correct."
        }
    }

    updateExplanationArea() {
        let explanation = document.createElement('p');
        explanation.innerHTML = this.getExplanationText();
        this.explanationText.innerHTML = "";
        this.explanationText.appendChild(explanation);
        this.explanationText.style.display = "block";
    }

    calculateSelectedCorrectAnswerCount() {

        //remove points for selecting too many answers
        if(this.countSelected() > this._correctAnswerCount) {
            this.Selectables.map((selectable) => {
                if (selectable.selected && !selectable.correct) {
                    if (this.selectedCorrectAnswerCount > 0) this.selectedCorrectAnswerCount--;
                }
            });
        }

        super.calculateSelectedCorrectAnswerCount();
    }

    updateUI() {
        this.updateExplanationArea();
        this.calculateSelectedCorrectAnswerCount();
    }

    reset() {
        this.explanationText.style.display = "none";
        super.reset();
    }
}

export default Question;