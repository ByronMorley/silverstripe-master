$(document).ready(function () {
    setup();
    $('.menu-toggle').on('click', function () {
        toggleMobileMenu($(this).next());
    });

    $('#nav>ul>li>a').on('click', function (evt) {
        if(correctWindowWidth())evt.preventDefault();
        toggleParentLayer($(this).parent(), evt.target.href);
    });
});

var toggleParentLayer = function ($el, href) {

    if ($('#nav.mobile').length) {
        var $menu = $el.find('>ul');
        if ($menu.length) {
            toggleMobileMenu($menu);
        } else {
            window.location = href;
        }
    }
};

var setup = function () {
    $(window).on('resize', function () {
        setMenuType();
        if (!correctWindowWidth()) {
            var $menu = $('#nav ul');
            $menu.removeAttr('style');
            $menu.data('toggle', '');
        }
    });
    setMenuType();
};

var setMenuType = function () {
    (correctWindowWidth()) ?
        $('#nav').addClass('mobile').removeClass('desktop')
        :
        $('#nav').addClass('desktop').removeClass('mobile');
};

var correctWindowWidth = function () {
    return ($(window).width() <= 768);
};

var toggleMobileMenu = function ($menu) {

    if ($menu.data('toggle') === "open") {
        $menu.slideUp();
        $menu.data('toggle', '');
        $menu.parent().find('>a>.arrow-toggle').addClass('fa-chevron-down').removeClass('fa-chevron-up');

    } else {
        $menu.slideDown();
        $menu.data('toggle', 'open');
        $menu.parent().find('>a>.arrow-toggle').addClass('fa-chevron-up').removeClass('fa-chevron-down');
    }
};