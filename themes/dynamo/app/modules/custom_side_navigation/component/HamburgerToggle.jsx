const HamburgerToggle = (props) => {

    let componentClasses = ['fa fa-bars js-extension-toggle'];
    componentClasses.push(props.status);

    return (
        <i
            key={props.key}
            className={componentClasses.join(' ')}
            id="extension-toggle"
            aria-hidden="true"
            data-status={props.status}
            onClick={props.controlFunc}
        >
        </i>
    );

};

export default HamburgerToggle;