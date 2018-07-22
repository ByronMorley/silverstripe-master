import Config from './Config';
import Core from './components/Core.jsx'
new Core();

import Site from './components/Site.jsx';
console.log("base : "  +Site._base_url);
console.log("root : "  +Site._root);
console.log(Site._pages);
