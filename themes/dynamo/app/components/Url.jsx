import Util from './Util';

export default class Url {

    constructor(site, href) {

        this._temp_url = Util.clean_url(href);
        this._name = Util.extract_path_name(this._temp_url);
        this._components = this.get_url_components(this._temp_url);
        this._base_url = site._base_url;
        this._root = site._root;

        this._path_url = this.get_path_or_hash_url(false);
        this._hash_url = this.get_path_or_hash_url(true);
        this._http_url = this._base_url + this._hash_url;
        this._href_url = this._base_url + this._path_url;

    }

    /**
     * Splits up the url into components and removes everything before and including the root
     * @param hashtag {boolean} - to determine whether to return hash or slash
     * @returns {string} - url path with either a hash or slash in front of it
     */
    get_path_or_hash_url(hashtag) {

        let path_URL = "";
        let passed_root = false;
        let tag = (hashtag) ? "#" : "/";

        for (let a = 0; a < this._components.length; a++) {

            if (passed_root) {
                path_URL += this._components[a] + "/";
            }
            if (this._components[a] === this._root) {
                passed_root = true;
            }
        }

        return (hashtag && path_URL.length <= 0) ? "" : tag +""+ (Util.clean_url(path_URL));
    }

    get_url_components(url){
        url = url.replace("#", "");
        return url.split('/');
    }

    get tempURL() {
        return this._temp_url;
    }

    get name() {
        return this._name;
    }

    get components() {
        return this._components;
    }

    get base_url() {
        return this._base_url;
    }

    get root() {
        return this._root;
    }

    get path_url() {
        return this._path_url;
    }

    get hash_url() {
        return this._hash_url;
    }

    get http_url() {
        return this._http_url;
    }

    get href_url() {
        return this._href_url;
    }
}