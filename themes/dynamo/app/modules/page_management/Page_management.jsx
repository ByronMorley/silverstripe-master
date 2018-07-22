import Config from '../../Config';
import $ from 'JQuery';
import PubSub from 'pubsub-js';
import Site from '../../components/Site.jsx';
import Transition from './Transition.jsx';
import Util from '../../components/Util';

class Page_management {

    constructor(container) {
        this._container = container;
        this._internal_call = false;
        this._add_to_history = true;
        this._clicked = false;
        this._transition_spool = [];
        let that = this;

        PubSub.subscribe('internal_link', function(envelope, value){
            that._navigate_to(value);
        });
    }

    init() {
        console.log('Page management Initialised');
        this._init_ajax_call();
    }

    _init_ajax_call() {
        this._destination_page = this._get_destination_page();
        if (this._destination_page_found()) {

            let page = (this._internal_call) ? this._destination_page : Site.get_root_nest_page(this._destination_page);
            this._evaluate_page(page);
            //Reverse the polarity Captain!
            this._transition_spool.reverse();
            this._update_and_check_transition_spool();

        }
    }

    _load_url(transition) {

        if (!this._internal_call) {
            transition._animate = false;
        }
        this._internal_call = false; //Reset internal call
        this._load_page_static_callback(transition);
        this._ajax_call(transition);

    }

    _ajax_call(transition) {
        let that = this;
        console.log('Navigate to ' + transition._page._url._temp_url);
        $.ajax(transition._page._url._temp_url)
            .done(function (response) {
                //console.log(response);
                transition._new_page_content = response;
                that._page_loaded_static_callback(transition);
            })
            .fail(function (xhr) {
                alert('Error: ' + xhr.responseText);
            });
    }


    _get_previous_page(container) {

        let previous_page = container.querySelector(Config._ANIMATION_LAYER);
        return previous_page;
    }


    /*******************************
     *      STATIC CALLBACKS
     * *****************************/

    _load_page_static_callback(transition) {
        console.log('loading page');
        PubSub.publish('page_loading', transition._page);
    }

    _page_loaded_static_callback(transition) {
        console.log('page loaded');
        PubSub.publish('page_loaded', transition._page);
        transition._container = document.querySelector("#" + transition._container_id);
        transition._previous_page_content = this._get_previous_page(transition._container);
        transition._container.innerHTML = transition._new_page_content;

        //remove to allow pubsub module links
        //this._add_ajax_links();

        this._start_animation_static_callback();
        transition.init(this);
        this._update_browser_history(transition._page);
    }

    _start_animation_static_callback() {
        console.log('start animation');
    }

    end_animation_static_callback(trans) {
        console.log('animation finished');
        this._update_animation_layer(trans);
        this._clicked = false;
        this._update_and_check_transition_spool();
    }

    /*******************************
     *     END STATIC CALLBACKS
     * *****************************/


    _update_animation_layer(trans) {
        let animation_layer = trans._container.querySelectorAll(Config._ANIMATION_LAYER);
        $(animation_layer).removeClass("running");
        $(trans._leave).remove();

    }

    _update_browser_history(page) {
        if (this._add_to_history) {
            window.history.pushState("string", "Title", page._url._http_url);
        }
        this._add_to_history = true;
    }

    /**
     * Loops through the transition spool and each page then removes it
     * form the spool until empty.
     * @private
     */
    _update_and_check_transition_spool() {

        if (this._transition_spool.length > 0) {
            let index = this._transition_spool.length - 1;
            this._load_url(this._transition_spool[index]);
            this._transition_spool.pop();
        }
    };

    /**
     * A recursive evaluation of the page and its path
     * This function tests the page for nested pages and builds a
     * recursive list of pages to follow and adds it to the transition spool
     * to be processed later
     *
     * @param page (page object)
     * @private
     */
    _evaluate_page(page) {

        this._calculate_transition_spool(page);
        let child_page = this._find_child_page(page);

        if (child_page !== undefined) {
            if (child_page._nest === 1) {
                this._evaluate_page(child_page);
            } else {
                console.error("ERROR - no child page found");
            }
        }
    }

    /**
     * If pages are nested then each page will have its own container
     * This function checks for nesting and finds the correct container for the page
     * the page is then added to the transition spool queue
     *
     * @param page (page object)
     * @private
     */
    _calculate_transition_spool(page) {
        page._container_id = (page._nest === 1) ? this._get_nest_container_id(page) : this._container.getAttribute('id');
        let trans = (new Transition(page, true));
        this._transition_spool.push(trans);
    }

    /**
     * finds the parent page and uses a set id pattern to find the correct
     * container for our child page , returns element
     *
     * @param page (page object)
     * @returns {String}
     * @private
     */
    _get_nest_container_id(page) {
        let parent_page = Site.get_parent_page(page);
        let container_id = parent_page._url_segment + "-" + parent_page._id;
        return container_id;
    }

    /**
     *  This function is meant to check whether a specific page has been selected to
     *  navigate to or whether we should just return the first child page in the tier
     *
     * @param page {page object}
     * @returns {page object}
     * @private
     */
    _find_child_page(page) {

        let child_page;
        if (page._navigate_to_child !== null) {
            child_page = page._navigate_to_child;
            page._navigate_to_child = undefined;
        } else {
            child_page = Site.get_first_child(page);
        }
        return child_page;
    }

    _destination_page_found() {
        return (this._destination_page === null || this._destination_page === undefined) ? console.log('Error: Page not found') : true;
    }

    /**
     *  Grab url information and lookup in Sitetree to retrieve the correct page
     *  If the request is a hard reset then it will use the http url to search
     *  If the request is an internal link it will use the link information given
     *
     * * @returns { page object that matches the URL}
     */
    _get_destination_page() {

        var url = this._internal_call ? this._url_destination : window.location.href;
        return Site.find_page(url);
    }

    _add_ajax_links() {

        let that = this;

        $('*').each(function () {

            let $link = $(this);
            let link = this;

            if (link.hasAttribute('href')) {
                if (!$link.hasClass('ajax-active')) {
                    $link.addClass('ajax-active');
                    link.addEventListener('click', that._link_clicked.bind(that, this));
                }
            }
        });
    }

    _link_clicked(element, event) {
        event.preventDefault();

        if (!this._clicked) {
            this._clicked = true;
            let url = element.getAttribute('href');
            if (!Site.link_is_current_page(window.location.href, url)) {
                this._navigate_to(url);
            } else {
                this._clicked = false;
            }
        }
    }

    _navigate_to(href) {

        this._set_internal_call(href);

        let scrollTop = $('body').scrollTop();
        if (scrollTop > 0) {
            $("body").animate({scrollTop: "0px"}, scrollTop / 2, function () {
                this._init_ajax_call();
            });
        } else {
            this._init_ajax_call();
        }
    }

    _set_internal_call(url) {
        this._url_destination = Util.clean_url(url);
        this._internal_call = true;
    };


}
export default(new Page_management(document.querySelector(Config._ROOT_CONTAINER)));


