import React from 'react';
import Menu from "./container/Menu.jsx";
import Hamburger from "./component/Hamburger.jsx"


class Header_navigation_module extends React.Component {

    constructor() {
        super();
        this.init();
        this.state = {
            status: "",
        };
        this.handleMenuToggleClick = this.handleMenuToggleClick.bind(this);
    }

    init() {
        console.log('Header Navigation Module Initialised');
    }

    componentDidMount() {
        this.setState({
            status: "closed"
        });
    }

    handleMenuToggleClick(event) {
        let status = (this.state.status === "closed") ? "open" : "closed";
        this.setState({status: status});
    }


    render() {

        return (
            <nav className="right">
                <div className="container">
                    <Hamburger
                        controlFunc={this.handleMenuToggleClick}
                    />
                    <Menu
                        status={this.state.status}
                    />
                </div>
            </nav>
        )
    }
}

export default Header_navigation_module;