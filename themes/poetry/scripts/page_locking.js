var updateUserNavigationFlag = function (memberID) {

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
};