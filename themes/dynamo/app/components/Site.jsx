import Config from '../Config';
import Page from './Page.jsx';
import Url from './Url.jsx';
import Util from './Util';

/**
 * Site contains all information about the site structure
 * Information is gathered from Silverstripe and the structure is housed here
 * This class can be accessed globally to assist in module functionality
 */

class Site {

    constructor(site_tree) {
        this._site_tree = site_tree;
        this._base_url = Util.clean_url(site_tree.getAttribute('base_url'));
        this._root = this._calculate_root(this._base_url);
        this._pages = this._setup_pages(this);
        this._add_nest_container_id_to_pages(this._pages);
    }

    _setup_pages(site) {

        let page_list = [];
        let pages = this._site_tree.querySelectorAll('LI');

        for (let a = 0; a < pages.length; a++) {
            page_list.push(new Page(site, pages[a]));
        }

        return page_list;
    }

    _calculate_root(base_url) {

        let components = base_url.split('/');
        return components[components.length - 1];
    }

    _add_nest_container_id_to_pages(pages) {

        for (let a = 0; a < pages.length; a++) {
            let page = pages[a];
            if (page._parent_id !== 0) { //has a parent page
                for (let b = 0; b < pages.length; b++) {
                    let lookup_page = pages[b];

                    if (page._parent_id === lookup_page._id) {
                        page._container = lookup_page._url_segment + "-" + lookup_page._id;
                    }
                }
            }
        }
    }

    /**
     * Looks up page to see if it has any child pages
     * uses the sort value to find the first one in the tier
     *
     * @param page {page object}
     * @returns {page object}
     */
    get_first_child(page) {

        let child_page;
        let pages = this.pages;

        for (let a = 0; a < pages.length; a++) {
            let parent_id = pages[a]._parent_id;
            if (parent_id === page._id && pages[a]._sort === 1) {
                child_page = pages[a];
            }
        }
        return child_page;
    };

    /**
     * If a page is nested then it must be loaded last in the transition queue
     * This function reverse traverses the path until it find the root of the nest
     * and returns that page
     *
     * @param page {page object}
     * @returns {page object}
     */
    get_root_nest_page(page) {

        if (page._nest === 1) {
            let parent_page = this.get_parent_page(page);
            parent_page._navigate_to_child = page;
            return this.get_root_nest_page(parent_page);
        } else {
            return page;
        }
    }

    /**
     * Takes any page object and returns the parent page object
     * returns undefined if no parent is found
     * @param page {page object}
     * @returns {page object}
     */
    get_parent_page(page) {

        let parent_page;
        let pages = this.pages;

        for (let a = 0; a < pages.length; a++) {
            let id = pages[a]._id;
            if (id === page._parent_id) {
                parent_page = pages[a];
            }
        }
        return parent_page;
    };

    /**
     * Takes any page url or href link throughout the site and matches it
     * to the records in the site and returns the page object for that page
     *
     * @param url - any href or http url for the website
     * @returns { page object that matches the URL}
     */
    find_page(url) {
        let url_object = new Url(this, url);
        return this.find_page_using_url_object(url_object);
    }

    /**
     * searches through the pages to locate the page with the corresponding url object
     * @param url (url object)
     * @returns { page object }
     */
    find_page_using_url_object(url) {

        let pages = this.pages;
        let destination_page = null;

        for (let a = 0; a < pages.length; a++) {
            let page = pages[a];
            if (url._path_url === page._url._path_url) {
                destination_page = page;
                break;
            }
        }
        return destination_page;
    }

    link_is_current_page(origin, destination){
        return (this.get_page_ID_from_url(origin) === this.get_page_ID_from_url(destination));
    }

    get_page_ID_from_url(url) {

        url = url.replace('#', '/');
        let path = Util.extract_path_name(url);
        let page = this.get_page_object_by_name(path);

        return page.id;
    }

    get_page_object_by_name(name) {

        let page = null;
        let pages = this.pages;

        for (let a = 0; a < pages.length; a++) {
            if (name === pages[a].name) {
                page = pages[a];
            }
        }
        return page;
    };

    get pages() {
        return this._pages;
    }

    get root() {
        return this._root;
    }

    get base_url() {
        return this._base_url;
    }
}
export default (new Site(document.querySelector(Config._SITETREE)));