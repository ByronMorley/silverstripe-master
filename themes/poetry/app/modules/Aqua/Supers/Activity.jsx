import Config from '../Config.jsx';
import Util from "../../../components/Util";

class Activity {

    constructor(elem, AQ){
        this.AQ = AQ;
        this.wrapper = elem;
        this.activity = this.wrapper.querySelector(Config.ACTIVITY);

        // Obj: Merged user settings/defaults EG: <div data-options="{option1:value1, option2:value2}" >
        this.settings = Util.extend(this.defaults(), this.activity.dataset.options);

        //Array of Selectable OBJ
        this.Selectables = [];

        //total amount of correct answers in this activity
        this._correctAnswerCount = 0;

        //total correct answers chosen by the user
        this.selectedCorrectAnswerCount = 0;

    }

    defaults(){

    }

    get correctAnswerCount() {
        return this._correctAnswerCount;
    }

    activate() {
        this.wrapper.style.display = "block";
    }

    deactivate() {
        this.wrapper.style.display = "none";
    }

    calculateSelectedCorrectAnswerCount(){

        //update the Main class with the score
        this.AQ.addScore(this.selectedCorrectAnswerCount);
    }

    confirmSelection(){
        this.checkAnswers();
        this.updateUI();
    }

    checkAnswers() {
        this.Selectables.map((selectable) => {
            selectable.check()
        });
    }

    clearSelected() {
        this.Selectables.map((selectable) => {
            selectable.deselect();
        });
    }

    updateUI(){
        this.calculateSelectedCorrectAnswerCount();
    }

    reset(){
        this.Selectables.map((selectable) => {
            selectable.reset();
        });
        this.deactivate();
        this.selectedCorrectAnswerCount = 0;
    }

}export default Activity;