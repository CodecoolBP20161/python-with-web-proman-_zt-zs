function localStore() {
    this.saveBoard = function (board) {
        var storage = this.getBoards();
        if (storage) {
            storage.push(board);
        } else {
            storage = [board];
        }
        localStorage.setItem('boards', JSON.stringify(storage));
    };
    this.getBoards = function () {
        var storedBoards = localStorage.getItem('boards');
        storedBoards = JSON.parse(storedBoards);
        return storedBoards;
    };
    this.saveCard = function (card) {
        var cardStorage = this.getCardsByBoardId();
        if (cardStorage) {
            cardStorage.push(card);
        } else {
            cardStorage = [card];
        }
        localStorage.setItem('cards', JSON.stringify(cardStorage));
    };
    this.getCardsByBoardId = function (board) {
        var cardsByBoard = new Array;
        var storedCards = localStorage.getItem('cards');
        storedCards = JSON.parse(storedCards);
        for (var i in storedCards) {
            if (storedCards[i].board === board) {
                cardsByBoard.push(storedCards[i]);
            };
        };
        return cardsByBoard;
    };
};

function storageSwitch(storage) {
    this.saveBoard = function (board) {
        storage.saveBoard(board);
    };
    this.getBoards = storage.getBoards();
    this.saveCard = function (card) {
        storage.saveCard(card)};
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
    }
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
    this.id = localStorage.id;
};

var askNew = function () {
    var title = prompt("Title of the new board: ");
    var newBoard = new Board(title);
    centralStore.saveBoard(newBoard);
    return newBoard
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
    try {
        var all = centralStore.getBoards;
        for (var i = 0; i < all.length; i++) {
            adding(all[i]);
        }
    } catch (err) {
        console.log("No boards yet.");
        console.log(err.message);
    }
};


var displayBoard = function (board) {
    var currentBoard = $(board)[0].id;
    currentBoard = currentBoard.replace("board_", "")
    var allBoards = centralStore.getBoards;
    try {
        for (var i in allBoards) {
            if (currentBoard === allBoards[i].id) {
                return allBoards[i]
            }
        }
    } catch(err) {
    }
};

var addNewCard = function (board) {
    var currentBoard = $(board)[0].id;
    currentBoard = currentBoard.replace("board_", "");
    var cardBoardId = $(board)[0].id;
    var card = new Card(prompt("Your card:"), cardBoardId );
    centralStore.saveCard(card);
    var cardBoard = "#"+cardBoardId
    var cc = cardBoard.replace("board", "card");
    $(".col-md-12").append('<div>' + card.text + '</div>')
    ;

}

var displayCards = function (board) {
    var currentBoard = board.id;
    currentBoard = "board_"+currentBoard;
    var cardsByBoard = new Array;
    var storedCards = localStorage.getItem('cards');
    storedCards = JSON.parse(storedCards);
    for (var i in storedCards) {
        if (storedCards[i].board === currentBoard) {
            cardsByBoard.push(storedCards[i]);
        };
    };
    var allCards = centralStore.getCardsByBoardId(currentBoard);
    try {
        for (var i in cardsByBoard) {
            var text = cardsByBoard[i].text;
            $(".col-md-12").append('<div>' + text + '</div>');
        }
    } catch(err) {
    }
    };


$(document).ready(function () {
    displayOverview();
    $("#new-board").click(function () {
        adding(askNew())
    });
    $(".panel").mouseenter(function () {
        $(this).addClass("active")});
    $(".panel").mouseleave(function() {$(this).removeClass("active");})
    $(".new-card").click(function () {
            addNewCard($(this));
    })
    $(".board").click(function () {
        $(".overview").remove();
        var currentBoard = $(this)
        var x = displayBoard(currentBoard);
        $("body").append('<div class="container-fluid"><div class="row"><div class="col-md-12"><div>'+x.title+'</div></div></div></div>');
        $("title").remove()
    $("head").append('<title>'+ x.title+'</title>');
        $("#new-board").remove();
        displayCards(x)
        $(".navbar-right").after('<button type="button" class="btn navbar-btn btn-info center-block new-card" role="button" id="">Add new Card</button>');
    $(".new-card").click(function () {
            addNewCard(currentBoard);
    })
    })
});

