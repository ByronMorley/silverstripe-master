import PubSub from 'pubsub-js';
import Site from './Site.jsx';
import PageManager from '../modules/page_management/Page_management.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../modules/header_navigation_module/Header_navigation_module.jsx';


export default class Core {

    constructor() {
       PubSub.publish('dom_ready');
    }
}

    PubSub.subscribe('dom_ready', ()=>{
    PageManager.init();
    ReactDOM.render(React.createElement(Nav), document.querySelector('#react-header-navigation'));
});

/******************************
 *      SUBSCRIPTIONS
 *******************************/

/**
 * Triggered on page loading, pre ajax
 * @item page object
 */
PubSub.subscribe('page_loading',(envelope, item)=> {});


/**
 * Triggered on page loaded, after ajax call
 * @item page object
 */
PubSub.subscribe('page_loaded',(envelope, item)=> {});


/**
 * Triggered when internal navigation link or button is pressed
 * @item absolute href of page
 */
PubSub.subscribe('internal_link',(envelope, item)=> {});



