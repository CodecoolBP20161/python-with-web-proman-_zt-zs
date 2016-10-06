/**
 * Created by miki on 2016.10.05..
 */
$(document).ready(function () {
    var $mkBoardCard = function (title) {
        $('input#title').val('');
        $("#newBoardBtn").remove();
        $("#table").append("<div class='col-lg-3 col-md-6 board' id='" + title + "'></div>");
        $("#" + title).append("<span><h3>" + title + "</h3></span>");
        $("#" + title).after('<div class="col-lg-3 col-md-6" id="newBoardBtn"><span id="dynmcBtn">Create new board...</span></div>');
    };
    $("#table").empty();
    $("#table").append('<div class="col-lg-3 col-md-6" id="newBoardBtn"><span id="btn">Create new board...</span></div>');
    $("#btn").on("click", function() {
        $('#newBoardModal').modal();
    });
    $('#newBoardModal').on('shown.bs.modal', function () {
        $('input#title').focus();
    });
    // $("#board-heading").empty();
    $(".modal-footer .btn").click(function () {
        $mkBoardCard($("input#title").val());
    });
    $('input#title').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $mkBoardCard($("input#title").val());
            $('#newBoardModal').modal('hide');
        };
    });
    $("#table").on("click", "#dynmcBtn", function() {
        $('#newBoardModal').modal();
    });
    $("#table").on("click", ".board>span", function() {
        var $containerId = ($(this).parent().attr("id"));
        $("#table").empty();
        $("#header span").html($containerId);
        $("#table").append('<div class="col-lg-3 col-md-6" id="newCardBtn"><span id="btn">Create new card...</span></div>')

    });
});