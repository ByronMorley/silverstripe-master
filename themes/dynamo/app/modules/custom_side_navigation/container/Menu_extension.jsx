import React from 'react';
import HamburgerIcon from '../component/HamburgerToggle.jsx';
import PubSub from 'pubsub-js';

class Menu_extension extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "",
            title: ""
        };
        this.handleMenuToggleClick = this.handleMenuToggleClick.bind(this);
        PubSub.subscribe('page_loading', (envelope, page) => {
            this.setState({title: page.title});
        });
    }

    componentDidMount() {
        this.setState({
            status: "open"
        });
    }

    handleMenuToggleClick(event) {
        let status = (this.state.status === "open") ? "closed" : "open";
        this.setState({status: status});
    }

    render() {

        let componentClasses = ['menu menu-extension'];
        componentClasses.push(this.state.status);
        return (

            <div className={componentClasses.join(' ')}>
                <HamburgerIcon
                    controlFunc={this.handleMenuToggleClick}
                    status={this.state.status}
                />
                <h1 className="title">{this.state.title}</h1>
            </div>

        );
    }
}

export default Menu_extension;