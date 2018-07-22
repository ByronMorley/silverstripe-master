class Config {

    constructor(){
        this._SITETREE = '#site-information-tree';
        this._ROOT_CONTAINER = '#page-management-root';
        this._ANIMATION_LAYER = '.animation-layer';
        this._ENTER = '.anim-enter';
        this._LEAVE = '.anim-leave';
        this._TRANS_INFO = '.trans-page-info';
    }

    get TRANS_INFO() {
        return this._TRANS_INFO;
    }

    get ENTER() {
        return this._ENTER;
    }

    get LEAVE() {
        return this._LEAVE;
    }

    get ROOT_CONTAINER() {
        return this._ROOT_CONTAINER;
    }

    get ANIMATION_LAYER() {
        return this._ANIMATION_LAYER;
    }

    get SITETREE() {
        return this._SITETREE;
    }
}
export default (new Config());