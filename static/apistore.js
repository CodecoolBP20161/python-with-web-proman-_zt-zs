function apiStore() {
    this.saveBoard = function () {
        $(document).ready(function () {
            $("#save-btn").click(function () {
                var title = $(":input[id=title]").val();
                var board = new Board(title)
                if (title.length > 0) {
                    $.ajax({
                        method: "POST",
                        url: "/create_board",
                        data: {title: title}
                    })
                        .done(function () {
                            confirm("Board successfully saved.")
                            // display(board)
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
    this.saveCard = function () {
        $(document).ready(function () {
            $("#card-saver").click(function () {
                var text = $(":input[id=text]").val();
                var board = $(this).attr("board-id")
                $(":input[id=secret-board]").val(board);
                if (text.length > 0) {
                    $.ajax({
                        method: "POST",
                        url: "/create_card",
                        data: {"text": text, "board": board}
                    })
                        .done(function () {
                            var ok = confirm("Card successfully saved.");
                            if (ok == true) {
                                $("#text").val("");
                            }
                        })
                }
                else {
                    alert("The card's text cannot be empty!")
                }
            })
            $("#text").keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    $("#card-saver").click()
                }
            })
        })
    };
    this.getCardsByBoardId = function (boardId) {
    };
}

var display = function (board) {
    $(".boards-display").after('<div class="container-box col-md-3 col-sm-6"><button type="button" class="btn-board" data-toggle="modal" data-target="#display-modal" data-title="' + board.title + '" data-id="' + board.id + '">' + board.title + '</button></div>')
}

var globalImplementation = new apiStore();
globalImplementation.saveBoard()
globalImplementation.getBoards()
globalImplementation.saveCard()

