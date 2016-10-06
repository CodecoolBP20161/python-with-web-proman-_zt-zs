function storageSwitch(storage) {
    this.saveBoard = function (board) {
        storage.saveBoard(board);
    };
    this.getBoards = storage.getBoards();
    this.saveCard = function (card) {
        storage.saveCard(card);
    };
    this.getCardsByBoardId = function (board) {
        storage.getCardsByBoardId(board);
    };
};

var localImplementation = new localStore();
var centralStore = new storageSwitch(localImplementation);
// now it's possible to use centralStore (storageSwitch instance) instead of a localStore instance

function Board(title) {
    this.title = title;
    if (localStorage.id) {
        localStorage.id = Number(localStorage.id) + 1;
    } else {
        localStorage.id = 0;
    };
    this.id = localStorage.id;
};

function Card(text, board) {
    this.text = text;
    this.board = board;
    if (localStorage.id) {
        localStorage.id = Number(localStorage.id) + 1;
    } else {
        localStorage.id = 0;
    };
    this.id = localStorage.id;
};

var askNew = function () {
    var title = prompt("Title of the new board: ");
    var newBoard = new Board(title);
    centralStore.saveBoard(newBoard);
    return newBoard;
};
var adding = function (board) {
    var newBoard = board;
    var boardId = "board_" + newBoard.id;
    $(".boards").append('<a href="#"><div class="col-md-3">' +
        '<div class="panel panel-default board" id="' + boardId + '">' +
        '<div class="panel-heading ' + boardId + '">' + newBoard.title + '</div>' +
        '<div class="panel-footer"></div></div></div></a>');
};

var displayOverview = function () {
    if (centralStore.getBoards) {
        for (var i = 0; i < centralStore.getBoards.length; i++) {
            adding(centralStore.getBoards[i]);
        };
    };
};


var chooseBoard = function (board) {
    var currentBoard = $(board)[0].id;
    currentBoard = currentBoard.replace("board_", "");
    var allBoards = centralStore.getBoards;
    try {
        for (var i in allBoards) {
            if (currentBoard === allBoards[i].id) {
                return allBoards[i];
            };
        };
    } catch(err) {};
};


var displayBoard = function (board) {
    var x = chooseBoard(board)
    $("body").append('<div class="container-fluid"><div class="row"><div class="col-md-3"></div><div class="col-md-6 center-block"><div id="board_title" class="center-block">'+x.title+'</div></div><div class="col-md-3"></div></div></div>');
        $("title").remove()
    $("head").append('<title>'+ x.title+'</title>');
        $("#new-board").remove();
}

var addNewCard = function (board) {
    var card = new Card(prompt("Your card:"), board[0].id);
    centralStore.saveCard(card);
    $(".col-md-6").append('<div class="card">' + card.text + '</div>');
};

var displayCards = function (board) {
    var currentBoard = board.id;
    currentBoard = "board_"+currentBoard;
    var allCards = centralStore.getCardsByBoardId(currentBoard);
    try {
        for (var i in cardsByBoard) {
            var text = cardsByBoard[i].text;
            $(".col-md-6").append('<div class="card">' + text + '</div>');
        }
    } catch(err) {
    }
    };


$(document).ready(function () {
    displayOverview();
    $("#new-board").click(function () {
        adding(askNew());
    });
    $(".panel").mouseenter(function () {
        $(this).addClass("active")});
    $(".panel").mouseleave(function() {$(this).removeClass("active");})
    $(".new-card").click(function () {
            addNewCard($(this));
    });
    $(".board").click(function () {
        $(".overview").remove();
        var currentBoard = $(this)
        var x = chooseBoard(currentBoard);
        displayBoard(x)
        displayCards(x)
        $(".navbar-right").append('<li><button type="button" class="btn navbar-btn btn-success center-block new-card" role="button" id="">Add new Card</button></li>');
    $(".new-card").click(function () {
            addNewCard(currentBoard);
    })
    })
});
