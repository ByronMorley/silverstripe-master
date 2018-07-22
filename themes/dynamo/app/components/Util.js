export default {

    /****************************
            URL METHODS
    *****************************/

    clean_url(url){
        //removes extra '/' at the end of the string
        if (url.substr(-1) === "/") {
            url = url.substr(0, url.length - 1);
        }
        return url;
    },
    extract_path_name(url) {

        url = this.clean_url(url);
        return url.substr(url.lastIndexOf('/') + 1);
    },

    /****************************
        NODE MANIPULATION
     *****************************/

    get_index_of_node(node){
        return [].slice.call(node.parentNode.children).indexOf(node);
    },

}