class Config {

    constructor(){

        this._ICONS = ".aq-icons";
        this._ACTIVITY = ".aq-activity";
        this._ACTIVITY_LIST = ".aq-activities > li";

        this._NEXT_BUTTON = ".aq-next";
        this._CONFIRM_BUTTON = ".aq-confirm";
        this._TRY_AGAIN_BUTTON = ".aq-try-again";

        this._INTRO_TEXT = ".aq-intro";
        this._EXPLANATION_TEXT = ".aq-explanation";
        this._SELECTABLE = ".aq-selectable";

        this._MAIN_PANEL = ".aq-main-panel";
        this._FINAL_PANEL = ".aq-final-panel";

        this._SCORE = ".aq-score";
        this._FINAL_SCORE = ".aq-final-score";

        this._CANVAS_ITEM = ".aq-canvas-item";
    }

    get CANVAS_ITEM() {
        return this._CANVAS_ITEM;
    }

    get SELECTABLE() {
        return this._SELECTABLE;
    }

    get EXPLANATION_TEXT() {
        return this._EXPLANATION_TEXT;
    }

    get ANSWER() {
        return this._ANSWER;
    }

    get ACTIVITY_LIST() {
        return this._ACTIVITY_LIST;
    }

    get ACTIVITY() {
        return this._ACTIVITY;
    }

    get ICONS() {
        return this._ICONS;
    }

    get MAIN_PANEL() {
        return this._MAIN_PANEL;
    }

    get NEXT_BUTTON() {
        return this._NEXT_BUTTON;
    }

    get CONFIRM_BUTTON() {
        return this._CONFIRM_BUTTON;
    }

    get INTRO_TEXT() {
        return this._INTRO_TEXT;
    }

    get SCORE() {
        return this._SCORE;
    }

    get TRY_AGAIN_BUTTON() {
        return this._TRY_AGAIN_BUTTON;
    }

    get FINAL_PANEL() {
        return this._FINAL_PANEL;
    }

    get FINAL_SCORE() {
        return this._FINAL_SCORE;
    }
}
export default (new Config());