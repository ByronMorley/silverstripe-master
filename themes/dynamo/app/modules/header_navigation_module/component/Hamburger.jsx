const Hamburger = (props) => {

    let componentClasses = ['fa fa-bars js-extension-toggle'];
    componentClasses.push(props.status);

    return (
        <span
            key={props.key}
            className="menu-toggle fa fa-bars"
            id="menu-toggle"
            aria-hidden="true"
            data-status={props.status}
            onClick={props.controlFunc}
        >
        </span>
    );

};

export default Hamburger;