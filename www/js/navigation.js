$(document).on("tabsbeforeactivate", "#tabs", function (e, ui) {
    $(ui.newPanel).addClass("in pop").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("in pop");
    });
});
