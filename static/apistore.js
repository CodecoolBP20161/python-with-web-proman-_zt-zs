function apiStore() {
    this.saveBoard = function () {
        $(document).ready(function () {
            $("#save-btn").click(function () {
                var title = $(":input[id=title]").val();
                if (title.length > 0) {
                    var board = new Board(title)

                    $.ajax({
                        method: "POST",
                        url: "/create_board",
                        data: {title: title}
                    })
                        .done(function () {
                            confirm("Board successfully saved.")
                            display(board)
                        })
                }
                else {
                    alert("The title cannot be empty!")
                }
            })
            $("#title").keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    $("#save-btn").click()
                }
            })
        })
    };
    this.getBoards = function () {
        $(document).ready(function () {
            $.getJSON('/api/boards', function (board) {
                for (var d = 0; d < board.length; d++) {
                    display(board[d])
                }
            })
        });
    };
    this.saveCard = function (card) {
    };
    this.getCardsByBoardId = function (boardId) {
    };
}

var display = function (board) {
    $(".container-main").append('<div class="container-box col-md-3 col-sm-6"><button type="button" class="btn-board" data-toggle="modal" data-target="#display-modal" data-title="' + board.title + '">' + board.title + '</button></div>')
}

var globalImplementation = new apiStore();
globalImplementation.saveBoard()
globalImplementation.getBoards()
