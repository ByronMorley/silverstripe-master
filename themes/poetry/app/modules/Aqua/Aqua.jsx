import Util from '../../components/Util';
import ActivityFactory from './Util/ActivityFactory.jsx';
import Config from './Config.jsx';

class Aqua {

    constructor(elem) {

        this.aqua = elem;      // Elem: Aqua
        // Obj: Merged user settings/defaults EG: <div data-options="{option1:value1, option2:value2}" >
        this.settings = Util.extend(this.defaults(), this.aqua.dataset.options);
        this.activityList = Array.from(this.aqua.querySelectorAll(Config.ACTIVITY_LIST));
        this.activityCount = this.activityList.length;
        this.mainPanel = this.aqua.querySelector(Config.MAIN_PANEL);
        this.Activities = [];    //array of Question OBJ
        this.currentIndex = this.settings['startIndex'];

        /* -- Buttons -- */

        this.nextButton = this.aqua.querySelector(Config.NEXT_BUTTON);
        this.nextButtonActive = false;
        this.confirmButton = this.aqua.querySelector(Config.CONFIRM_BUTTON);
        this.confirmButtonActive = false;

        /* -- user prompt -- */

        this.introText = this.aqua.querySelector(Config.INTRO_TEXT);
        this.scoreSelector = this.aqua.querySelector(Config.SCORE);
        this.score = 0;
        this.scoreCap = 0;

        /* -- End screen -- */

        this.tryAgainButton = this.aqua.querySelector(Config.TRY_AGAIN_BUTTON);
        this.finishPanel = this.aqua.querySelector(Config.FINAL_PANEL);
        this.finalScore = this.aqua.querySelector(Config.FINAL_SCORE);

        this.init();  // Call AQ initialisation method
    }

    defaults() {
        return {
            theme: '',  // String (default 'none'): Choices ('aq-atebol-theme' , 'aq-dark-theme' )
            startIndex: 0, //Int : DO NOT CHANGE
            scoreMultiplier: 10,  //Int : change to increase score output value
        }
    }

    init() {
        console.log('Aqua Initialised');

        let _Activity = this;

        //setup Event handler for Next button
        this.nextButton.addEventListener('click', function () {
            if (_Activity.nextButtonActive) _Activity.next();
        });

        //setup Event handler for try again button
        this.tryAgainButton.addEventListener('click', function () {
            _Activity.restartActivity();
        });

        //setup Question OBJ
        this.activityList.map((question) => {

            let q = question.querySelector(Config.ACTIVITY);
            let tempActivity = ActivityFactory(q.dataset.object);
            _Activity.Activities.push(new tempActivity(question, _Activity));
        });

        //add Listener to Confirm Button
        this.confirmButton.addEventListener('click', function () {
            _Activity.confirm();
        });

        this.activateActivity();
        this.calculateScoreCap();
        //Update DOM
        this.updateUI();
        this.updateScore();
    }

    updateUI() {
        this.deactivateNextButton();
        this.addIntroText();
    }

    next() {
        if (this.currentIndex < this.activityCount - 1) {

            //Remove previous question
            this.Activities[this.currentIndex].deactivate();
            this.currentIndex++;

            this.activateActivity();

            this.updateUI();
        } else {
            this.finishActivity();
        }
    }

    activateActivity() {

        //set current Question
        this.currentActivity = this.Activities[this.currentIndex];

        //activate question 1
        this.currentActivity.activate();
    }

    activateNextButton() {

        if (this.nextButton.classList.contains('inactive')) {
            this.nextButton.classList.remove('inactive');
        }
        this.nextButtonActive = true;

        if (this.currentIndex === (this.activityCount - 1)) {
            this.nextButton.innerHTML = "Finish";
        }
    }

    deactivateNextButton() {
        this.nextButton.classList.add('inactive');
        this.nextButtonActive = false;
    }

    toggleConfirm() {

        if (this.currentActivity.countSelected() > 0) {
            this.activateConfirm();
        } else {
            this.deactivateConfirm();
        }
    }

    confirm() {
        if (this.confirmButtonActive) {
            this.currentActivity.confirmSelection();
            this.deactivateConfirm();
            this.activateNextButton();
            this.updateScore();
        }
    }

    activateConfirm() {
        if (this.confirmButton.classList.contains('inactive')) {
            this.confirmButton.classList.remove('inactive');
        }
        this.confirmButtonActive = true;
    }

    deactivateConfirm() {
        this.confirmButton.classList.add('inactive');
        this.confirmButtonActive = false;
    }

    addIntroText() {
        let intro = document.createElement('h3');
        intro.innerHTML = 'Activity ' + (this.currentIndex + 1) + " of " + this.activityCount;
        this.introText.innerHTML = "";
        this.introText.appendChild(intro);
    }

    calculateScoreCap() {
        this.Activities.map((activity) => {
            this.scoreCap += (activity.correctAnswerCount * this.settings['scoreMultiplier']);
        });
    }

    updateScore() {
        let scoreElem = document.createElement('span');
        scoreElem.innerHTML = "Score: " + this.score + "/" + this.scoreCap;
        this.scoreSelector.innerHTML = "";
        this.scoreSelector.appendChild(scoreElem);
        this.finalScore.innerHTML = "";
        this.finalScore.appendChild(scoreElem.cloneNode(true));
    }

    addScore(score) {
        this.score += (score * this.settings['scoreMultiplier']);
    }

    finishActivity() {
        this.mainPanel.style.display = "none";
        this.finishPanel.style.display = "block";
    }

    restartActivity() {
        this.mainPanel.style.display = "block";
        this.finishPanel.style.display = "none";
        this.reset();
    }

    reset() {

        //Reset Activities
        this.Activities.map((question) => {
            question.reset();
        });

        //reset the score to zero
        this.score = 0;

        //sort out the next button
        this.nextButton.innerHTML = "Next";
        this.deactivateNextButton();

        //reset back to activity 1
        this.currentIndex = 0;

        //activate question
        this.activateActivity();

        //Update UI
        this.updateUI();
        this.updateScore();
    }
}

export default Aqua;