$(document).ready(function () {
    $('#add-modal').on('shown.bs.modal', function () {
        $('#title').focus();
    });
    $('#add-modal').on('hidden.bs.modal', function () {
        $("#title").val("");
    });
    $('#display-modal').on('shown.bs.modal', function (event) {
        $('#text').focus();
        $('.board-modal-title').text($(event.relatedTarget).data("title"));
        var boardId = $(event.relatedTarget).data("id");
        $('#card-saver').attr("board-id", boardId);
        globalImplementation.getCardsByBoardId(boardId);
    });
    $('#display-modal').on('hidden.bs.modal', function () {
        $(".board-modal-title").text("");
        $('#card-saver').attr("board-id", "");
        $(".list-group-item").remove();
        $(".list-group-item-text").remove();
        $("#text").empty();
    });
});
