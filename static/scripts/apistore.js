function Board(title, id) {
    this.title = title;
    this.id = id;
};

function Card(text, id, board) {
    this.text = text;
    this.board = board;
    this.id = id;
};

function apiStore() {
    this.saveBoard = function () {
        var index
        $(document).ready(function () {
            $("#save-btn").click(function () {
                var title = $(":input[id=title]").val();
                if (title.length > 0) {
                    $.ajax({
                        method: "POST",
                        url: "/create_board",
                        dataType: "json",
                        data: JSON.stringify({"title": title}),
                        contentType: 'application/json; charset=utf-8',
                        success: confirm("Board successfully saved.")
                    });
                    $.getJSON('/api/boards', function (board) {
                        index = board.length;
                        var board = new Board(title, index);
                        display(board);
                    });

                } else {
                    alert("The title cannot be empty!");
                };
            });
            $("#title").keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    $("#save-btn").click();
                };
            });
        });
    };

    this.getBoards = function () {
        $(document).ready(function () {
            $.getJSON('/api/boards', function (board) {
                for (var d = 0; d < board.length; d++) {
                    display(board[d]);
                };
            });
        });
    };

    this.getCardsByBoardId = function (board) {
        $(document).ready(function () {
            var route = '/api/cards/' + String(board);
            $.getJSON(route, function (card) {
                try {
                    if (card.length > 0) {
                        for (var c = 0; c < card.length; c++) {
                            displayCards(card[c])
                        };
                    };
                }catch (e) {};
            });
        });
    };

    this.saveCard = function () {
        var index;
        $(document).ready(function () {
            $("#card-saver").click(function (event) {
                event.preventDefault();
                var text = $(":input[id=text]").val();
                var board = $(this).attr("board-id");
                var route = '/api/cards/' + String(board);
                if (text.length > 0) {
                    $.ajax({
                        method: "POST",
                        url: "/create_card",
                        dataType: "json",
                        data: JSON.stringify({"text": text, "board": board}),
                        contentType: 'application/json; charset=utf-8',
                    });
                    $.getJSON(route, function (card) {
                        index = card.length + 1;
                    });
                    var card = new Card(text, index, board);
                    displayCards(card);
                } else {
                    alert("The text cannot be empty. Please enter something!");
                };
            });
            $("#text").keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    $("#card-saver").click();
                };
            });
        });
    };
};

var display = function (board) {
    $(".boards-display").after('<div class="container-box col-md-3 col-sm-6"><button type="button" class="btn-board" ' +
        'data-toggle="modal" data-target="#display-modal" data-title="' + board.title + '" data-id="' + board.id + '\
        ">' + board.title + '</button></div>');
};

var displayCards = function (card) {
    $(":input[id=text]").val("")
    $(".list-group").after('<span class="list-group-item"><p class="list-group-item-text cards" id="card_\
    ' + card.id + '">' + card.text + '</p></span>');
};

var globalImplementation = new apiStore();
globalImplementation.saveBoard();
globalImplementation.getBoards();
globalImplementation.saveCard();
