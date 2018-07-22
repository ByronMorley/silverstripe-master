import React from 'react';
import MenuItem from '../component/Menu_item.jsx';
import Site from '../../../components/Site.jsx';
import PubSub from 'pubsub-js';

class Menu_tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: []
        };
        this.handleClick = this.handleClick.bind(this);

        PubSub.subscribe('page_loading', (envelope, page) => {
            this.setState({menuItemSelected: page.title + page.id});
        });
    }

    componentDidMount() {
        this.setState({
            pages: Site.pages,
            menuItemSelected: ""
        });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({menuItemSelected: event.target.id});
        PubSub.publish('internal_link', event.target.getAttribute('href'));
    }

    render() {
        return (
            <MenuItem
                pages={this.state.pages}
                selected={this.state.menuItemSelected}
                controlFunc={this.handleClick}
            />
        );
    }
}

export default Menu_tabs;