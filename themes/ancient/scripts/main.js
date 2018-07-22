$(document).ready(function(){
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

