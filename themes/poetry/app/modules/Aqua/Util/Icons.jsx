class Icons {

    constructor() {

        this.icons = {
            tick: "fa fa-check aq-answer-correct",
            cross: "fa fa-times aq-answer-incorrect",
            selected: "fa fa-dot-circle-o",
            unselected: "fa fa-circle-o"
        };

        this._tick = this.createIconElement(this.icons['tick']);
        this._cross = this.createIconElement(this.icons['cross']);
        this._selected = this.createIconElement(this.icons['selected']);
        this._unselected = this.createIconElement(this.icons['unselected']);
    }

    createIconElement(className) {
        let icon = document.createElement('i');
        icon.className = className;
        icon.classList.add('icon');
        return icon;
    }

    get tick() {
        return this._tick.cloneNode(true);
    }

    get cross() {
        return this._cross.cloneNode(true);
    }

    get selected() {
        return this._selected.cloneNode(true);
    }

    get unselected() {
        return this._unselected.cloneNode(true);
    }
}

export default new Icons();