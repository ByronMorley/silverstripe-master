const Menu_item = (props) => (

    <div>
        {props.pages.map((page, key) => {

            let selected = (props.selected === (page.title+page.id)) ? " current" : "";

            return (
                <li key={key} className={selected}>
                    <a
                        id={page.title+page.id}
                        className={selected}
                        name={page.title}
                        href={page.url.href_url}
                        onClick={props.controlFunc}
                        title={page.title}
                    >{page.title}
                    </a>
                </li>
            );
        })}
    </div>
);

export default Menu_item;