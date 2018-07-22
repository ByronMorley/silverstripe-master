$(document).ready(function () {
    setupPoemDropDowns();
});

var setupPoemDropDowns = function () {

    localStorage.setItem("poem-dropdown", $('.panel-list li').first().attr('id'));

    $('.content-toggle').on('click', function () {

        var id = $(this).data('id');
        var $current = $('#' + id);
        var previousID = localStorage.getItem("poem-dropdown");
        if (!$current.hasClass('open')) {
            if (id === previousID) {
                $current.find('.content').slideUp();
                $current.removeClass('open');
            } else {
                var $previous = $('#' + previousID);
                $previous.find('.content').slideUp();
                $previous.removeClass('open');
                localStorage.setItem("poem-dropdown", id);
                $current.find('.content').slideDown();
                $current.addClass('open');
            }
        }
    });
};