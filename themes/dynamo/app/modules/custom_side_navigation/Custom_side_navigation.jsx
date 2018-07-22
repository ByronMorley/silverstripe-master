import React from 'react';
import MenuTabs from './container/Menu_tabs.jsx';
import MenuExt from './container/Menu_extension.jsx';

class Custom_side_navigation extends React.Component {

    constructor() {
        super();
        this.init();
    }

    init() {
        console.log('Custom_side_navigation Initialised');
    }

    render() {
        return (
            <div className="root">
                <div className="menu menu-tabs">
                    <MenuTabs/>
                </div>
                <MenuExt/>
            </div>
        );
    }
}

export default Custom_side_navigation;