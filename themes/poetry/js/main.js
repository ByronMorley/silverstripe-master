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
};;$(document).ready(function(){
    $(window).on('resize', function () {
        $('.table').each(function () {
            tableSetup($(this));
        });
    });

    $('.table').each(function () {
        tableSetup($(this));
    });

    $('.modal-launcher button').on('click', function () {
        addModalContent($(this));
    });
    $('#modal-cancel').on('click', function(){
        removeModalContent();
    });
});


var base_url = window.location.origin;
var host = window.location.host;
var pathArray = window.location.pathname.split('/');

var gap = 40;

function tableSetup($table) {
    $table.find('li').removeAttr('style');
    var $row = $table.find('.row');
    var MaxListItems = getMaxListItems($row);
    var listOfWidths = getListOfWidths($row, MaxListItems);
    listOfWidths = setupVariableCell($table, listOfWidths);
    setWidths($row, MaxListItems, listOfWidths);
}

function setupVariableCell($table, listOfWidths) {
    var index = $table.find('.variable').first().index();
    var $row = $table.find('.row');
    listOfWidths.splice(index, 1);
    var sum = sumOfArray(listOfWidths);
    listOfWidths.splice(index, 0, $row.width() - sum);
    return listOfWidths;
}

function sumOfArray(arr) {
    var sum = 0;
    for (var a = 0; a < arr.length; a++) {
        sum+=arr[a];
    }
    return sum;
}

function setWidths($row, MaxListItems, listOfWidths) {

    for (var a = 0; a < MaxListItems; a++) {
        $row.each(function () {
            var $li = $(this).find('li').eq(a);
            $li.css('width', listOfWidths[a]);
        });
    }
}

function getListOfWidths($row, MaxListItems) {

    var listOfWidths = [];

    for (var a = 0; a < MaxListItems; a++) {
        var width = 0;
        $row.each(function () {
            var $li = $(this).find('li').eq(a);

            if (width < $li.width()) {
                width = $li.width();
            }
        });
        listOfWidths.push(width + gap);
    }
    return listOfWidths;
}

function getMaxListItems($row) {

    var length = 0;
    $row.each(function () {
        if (length < $(this).find('li').length) {
            length = $(this).find('li').length;
        }
    });
    return length;
}



function addModalContent($button){

    var $launcher = $button.parent();
    var $mContent = $launcher.find('.modal-container');
    var $modal = $('#myModal');

    $('#modal-cancel').data('origin',$launcher.attr('id'));
    var $titleContainer = $modal.find('.modal-header');
    var $bodyContainer = $modal.find('.modal-body');

    var $title = $mContent.find('.modal-title').detach();
    var $content = $mContent.find('.content').detach();

    $titleContainer.append($title);
    $bodyContainer.append($content);
    $modal.modal('show');

}

function removeModalContent(){
    var id = $('#modal-cancel').data('origin');
    var $origin = $('#'+id);
    var $modal = $('#myModal');
    var $titleContainer = $modal.find('.modal-title').detach();
    var $bodyContainer = $modal.find('.modal-body .content').detach();
    var $container = $origin.find('.modal-container');
    $container.append($titleContainer);
    $container.append($bodyContainer);
}

function updateCheckBox(id) {
    addCheck($('#member-' + id))
}

function addCheck(elem) {
    elem.attr('data-status', 'checked');
    elem.find('i').removeClass('fa-square-o');
    elem.find('i').addClass('fa-check-square-o');
    var list = $('#Form_JobAllocation_job-allocations');
    if (list[0].hasAttribute('value')) {
        var arr = list.attr('value').split(',');
        arr.push(elem.attr('value'));
        var value = arr.join(",");
        list.attr('value', value);
    } else {
        list.attr('value', elem.attr('value'));
    }
}

function removeCheck(elem) {
    elem.attr('data-status', 'unchecked');
    elem.find('i').addClass('fa-square-o');
    elem.find('i').removeClass('fa-check-square-o');
    var list = $('#Form_JobAllocation_job-allocations');
    if (list[0].hasAttribute('value')) {
        var arr = list.attr('value').split(',');
        var index = arr.indexOf(elem.attr('value'));
        arr.splice(index, 1);
        var value = arr.join(",");
        list.attr('value', value);
    }
}

function checkItem(elem) {

    if (elem.attr('data-status') === "unchecked") {
        addCheck(elem);
    } else {
        removeCheck(elem);
    }
}

;var updateUserNavigationFlag = function (memberID) {

    var data = {
        member:memberID,
        url:window.location.href
    };

    var url = "users/lock";

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            console.log('updated user navigation flag');
        }
    });
};;$(document).ready(function () {
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