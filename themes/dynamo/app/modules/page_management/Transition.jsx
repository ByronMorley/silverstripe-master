import Config from '../../Config';
import $ from 'JQuery';

export default class Transition {

    constructor(page, animate) {
        this._page = page;
        this._container = page._container;
        this._container_id = page._container_id;
        this._animate = animate;
        this._previous_page_content = null;
        this._new_page_content = null;
        this._enter = null;
        this._leave = null;
    }

    init(page_man) {

        let container = this._container;
        let animation_layer = container.querySelectorAll(Config._ANIMATION_LAYER);
        $(animation_layer).addClass("running");



        if (this._animate) {
            this._run_animation(animation_layer);
        } else {
            $(animation_layer).addClass("no-animation");
        }
        this._enter = container.querySelector(Config._ENTER);
        this._leave = container.querySelector(Config._LEAVE);

        if (this._previous_page_content === null || this._previous_page_content === undefined) {
        } else {
            this._leave.setAttribute('style', this._previous_page_content.getAttribute('style'));
            this._enter.setAttribute('style', this._previous_page_content.getAttribute('style'));
            this._leave.innerHTML = this._previous_page_content.innerHTML;
        }

        $(this._leave).bind('oanimationend animationend webkitAnimationEnd', () => page_man.end_animation_static_callback(this));
    }

    _run_animation(animation_layer) {

        let enter = this._container.querySelector(Config._ENTER);
        let previous_sort_value = parseInt(this._previous_page_content.getAttribute('sort'));
        let new_sort_value = parseInt(enter.getAttribute('sort'));
        let incremental_animation = this._container.querySelector(Config._TRANS_INFO).getAttribute('inc');
        let decremental_animation = this._container.querySelector(Config._TRANS_INFO).getAttribute('dec');
        let transition_animation = (previous_sort_value < new_sort_value) ? incremental_animation : decremental_animation;

        $(animation_layer).addClass(transition_animation);
    }

    get enter() {
        return this._enter;
    }

    set enter(value) {
        this._enter = value;
    }

    get leave() {
        return this._leave;
    }

    set leave(value) {
        this._leave = value;
    }

    get new_page_content() {
        return this._new_page_content;
    }

    set new_page_content(value) {
        this._new_page_content = value;
    }

    get previous_page_content() {
        return this._previous_page_content;
    }

    set previous_page_content(value) {
        this._previous_page_content = value;
    }

    get page() {
        return this._page;
    }

    get animate() {
        return this._animate;
    }

    get container() {
        return this._container;
    }

    set page(value) {
        this._page = value;
    }

    set animate(value) {
        this._animate = value;
    }

    set container(value) {
        this._container = value;
    }

    get container_id() {
        return this._container_id;
    }

    set container_id(value) {
        this._container_id = value;
    }
}