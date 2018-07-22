const Menu_item = (props) => (

    <ul>
        {props.pages.map((page, key) => {

            let selected = (props.selected === (page.title+page.id)) ? " current" : "";

            return (
                <li key={key} className={selected}>
                    <i
                        id={page.title+page.id}
                        name={page.title}
                        href={page.url.href_url}
                        onClick={props.controlFunc}
                        className={"fa " + page.icon}
                        title={page.title}
                        aria-hidden="true"
                    >
                    </i>
                </li>
            );
        })}
    </ul>
);

export default Menu_item;