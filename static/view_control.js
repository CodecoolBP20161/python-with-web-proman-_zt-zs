/**
 * Created by miki on 2016.10.05..
 */
$(document).ready(function() {
    var $mkBoardCard = function(title) {
        $('#newBoardName').val('');
        $(".main-content").append("<div class='col-xs-12 col-sm-6 col-md-3' id='" + title + "'></div>");
        $("#" + title).append("<div class='panel panel-default list' id='list_1'><div class='panel-heading'><h4>" + title + "</h4></div></div>")
    };
    $(".main-content").empty();
    $("#board-heading").empty();
    $(".modal-footer>.btn").click(function() {
        $mkBoardCard($("#newBoardModal #newBoardName").val())
    });
});