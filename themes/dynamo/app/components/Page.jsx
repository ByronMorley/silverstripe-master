import Util from './Util';
import Url from './Url.jsx';

export default class Page{

    constructor(site, page){

        this._id = page.getAttribute('pageID');
        this._sort = Util.get_index_of_node(page) + 1;
        this._href = Util.clean_url(page.getAttribute('link'));
        this._parent_id = page.getAttribute('parentID');
        this._title = page.getAttribute('title');
        this._name = Util.extract_path_name(this._href);
        this._class_name = page.getAttribute('className');
        this._nest = parseInt(page.getAttribute('nest'));
        this._url_segment = page.getAttribute('segment');
        this._url = new Url(site, this.href);
        this._page = page;
        this._navigate_to_child = null;
        this._container = null;
        this._container_id = null;
        this._icon = page.getAttribute('icon');
    }


    get icon() {
        return this._icon;
    }

    set icon(value) {
        this._icon = value;
    }

    get navigate_to_child() {
        return this._navigate_to_child;
    }

    set navigate_to_child(value) {
        this._navigate_to_child = value;
    }

    get container_id() {
        return this._container_id;
    }

    set container_id(value) {
        this._container_id = value;
    }

    get page() {
        return this._page;
    }

    get id() {
        return this._id;
    }

    get sort() {
        return this._sort;
    }

    get href() {
        return this._href;
    }

    get title() {
        return this._title;
    }

    get name() {
        return this._name;
    }

    get parent_id() {
        return this._parent_id;
    }

    get class_name() {
        return this._class_name;
    }

    get url_segment() {
        return this._url_segment;
    }

    get url() {
        return this._url;
    }

    get nest() {
        return this._nest;
    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }
}