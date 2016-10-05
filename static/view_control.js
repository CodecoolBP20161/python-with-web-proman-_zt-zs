/**
 * Created by miki on 2016.10.05..
 */
$(document).ready(function() {
    var $mkBoardCard = function(title) {
        $('input#newBoardName').val('');
        $(".main-content").append("<div class='col-xs-12 col-sm-6 col-md-3' id='" + title + "'></div>");
        $("#" + title).append("<div class='panel panel-default board' id='board_1'><div class='panel-body'><h4>" + title + "</h4></div></div>")
    };
    $(".main-content").empty();
    $("button").mouseup(function(){
    // $("button").blur();
})
    $('#newBoardModal').on('shown.bs.modal', function () {
            $('#newBoardName').focus();
    });
    // $("#board-heading").empty();
    $(".modal-footer>.btn").click(function() {
        $mkBoardCard($("#newBoardModal #newBoardName").val());
    });
    $('input#newBoardName').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
            $mkBoardCard($("#newBoardModal #newBoardName").val());
            $('#newBoardModal').modal('hide');
        };
    });
});