function Board(title) {
    this.title = title;
    if (localStorage.id) {
        localStorage.id = Number(localStorage.id) + 1;
    } else {
        localStorage.id = 0;
    }
    ;
    this.id = localStorage.id;
};

function Card(text, board) {
    this.text = text;
    this.board = board;
    if (localStorage.id) {
        localStorage.id = Number(localStorage.id) + 1;
    } else {
        localStorage.id = 0;
    }
    ;
    this.id = localStorage.id;
};

var adding = function (board) {
    var boardId = "board_" + board.id;
    $(".boards").append('<a href="#"><div class="col-md-3">' +
        '<div class="panel panel-default board" id="' + boardId + '">' +
        '<div class="panel-heading ' + boardId + '">' + board.title + '</div>' +
        '<div class="panel-footer"></div></div></div></a>');
};

var displayOverview = function () {
    if (centralStore.getBoards) {
        for (var i = 0; i < centralStore.getBoards.length; i++) {
            adding(centralStore.getBoards[i]);
        }
        ;
    }
    ;
};

var askNew = function () {
    var title = prompt("Title of the new board: ");
    var newBoard = new Board(title);
    centralStore.saveBoard(newBoard);
    return newBoard;
};

var chooseBoard = function (board) {
    console.log(board);
    var currentBoard = $(board)[0].id;
    currentBoard = currentBoard.replace("board_", "");
    try {
        for (var i in centralStore.getBoards) {
            if (currentBoard === centralStore.getBoards[i].id) {
                return centralStore.getBoards[i];
            }
            ;
        }
        ;
    } catch (err) {
    }
    ;
};

var displayBoard = function (board) {
    var x = chooseBoard(board)
    $("body").append('<div class="container-fluid"><div class="row"><div class="col-md-3"></div><div class="col-md-6 center-block"><div id="board_title" class="center-block">' + x.title + '</div></div><div class="col-md-3"></div></div></div>');
    $("title").remove()
    $("head").append('<title>' + x.title + '</title>');
    $("#new-board").remove();
};

var addNewCard = function (board) {
    var card = new Card(prompt("Your card:"), board[0].id);
    centralStore.saveCard(card);
    $(".col-md-6").append('<div class="card">' + card.text + '</div>');
};

var displayCards = function (board) {
    var id = board[0].id;
    var cards = centralStore.getCardsByBoardId(id);
    try {
        for (var i in cards) {
            var text = cards[i].text;
            $(".col-md-6").append('<div class="card">' + text + '</div>');
        }
        ;
    } catch (err) {
    }
    ;
};


$(document).ready(function () {
    displayOverview();
    $("#new-board").click(function () {
        adding(askNew());
    });
    $('.boards').on('mouseenter', '.panel', function () {
        $(this).addClass("active");
    });
    $(".boards").on('mouseleave', '.panel', function () {
        $(this).removeClass("active");
    });
    $(".new-card").click(function () {
        addNewCard($(this));
    });
    $(document).on('click', ".board", function () {
        $(".overview").remove();
        var board = ($(this));
        displayBoard(chooseBoard(board));
        displayCards(board);
        $(".navbar-right").append('<li><button type="button" class="btn navbar-btn btn-success center-block new-card" role="button" id="">Add new Card</button></li>');
        $(".new-card").click(function () {
            addNewCard(board);
        });
    });
    $('.container-main').on('mouseenter', '.btn-add', function () {
        $(this).addClass("add-active");
    });
    $(".container-main").on('mouseleave', '.btn-add', function () {
        $(this).removeClass("add-active");
    });
    $('#add-modal').on('shown.bs.modal', function () {
        $('#title').focus()
    })
    $('#add-modal').on('hidden.bs.modal', function () {
        $("#title").val("");
    })
    $('.container-main').on('mouseenter', '.btn-board', function () {
        $(this).addClass("active");
    });
    $(".container-main").on('mouseleave', '.btn-board', function () {
        $(this).removeClass("active");
    });
    $('#display-modal').on('shown.bs.modal', function (event) {
        $('.board-modal-title').text($(event.relatedTarget).data("title"))
    })
    $('#display-modal').on('hidden.bs.modal', function () {
        $(".board-modal-title").text("");
    })
});


