import Config from '../Config.jsx';
import Icons from '../Util/Icons.jsx';

class Selectable {

    constructor(elem, activity) {
        this.Activity = activity;
        this.elem = elem;
        this.selected = false;
        this.iconWrapper = this.elem.querySelector(Config.ICONS);
        this.init();
    }

    init() {
        let _Activity = this;

        this.elem.addEventListener('click', function () {
            _Activity.click();
        });
    }

    click() {
        console.log('Selectable clicked');
    }

    check() {
        console.log('Selectable check');
    }

    select() {
        this.selected = true;
        this.addSelectedIcon();
    }

    deselect() {
        this.selected = false;
        this.addUnselectedIcon();
    }

    addIcon(icon) {
        this.clearIcons();
        this.iconWrapper.appendChild(icon);
    }

    addSelectedIcon() {
        this.addIcon(Icons.selected);
    }

    addUnselectedIcon() {
        this.addIcon(Icons.unselected);
    }

    addTickIcon() {
        this.addIcon(Icons.tick);
    }

    addCrossIcon() {
        this.addIcon(Icons.cross);
    }

    clearIcons(){
        this.iconWrapper.innerHTML = "";
    }

    fadeOut() {
        this.elem.style.opacity = 0.3;
    }

    fadeIn() {
        this.elem.style.opacity = 1;
    }

    reset(){
        this.clearIcons();
        this.deselect();
        this.fadeIn();
    }

}

export default Selectable;