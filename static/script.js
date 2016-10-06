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
    this.getCardsByBoardId = storage.getCardsByBoardId();
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

var display = function () {
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

var addNewCard = function (board) {
    var cardBoard = $(board).parent().parent()[0].id;
    var card = new Card(prompt("Your card:"), cardBoard );
    var cardBoardId = "."+cardBoard
    var cardId = cardBoardId.replace("board", "card");
    centralStore.saveCard(card);
    $(cardBoardId).after('<div class="panel-body" id="card_' + cardBoard + '">'+card.text+'</div>')
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

$(document).ready(function () {
    display();
    $("#new-board").click(function () {
        adding(askNew())
    });
    $(".board").mouseenter(function () {
        $(this).addClass("active")});
    $(".board").mouseleave(function() {$(this).removeClass("active");})
    $(".new-card").click(function () {
            addNewCard($(this));
    })
    $(".board").click(function () {
        $(".overview").remove();
        $("title").remove()
        var x = displayBoard($(this));
        $("body").append('<div class="container-fluid"><div class="row"><div class="col-md-12""><div>'+x.title+'</div></div></div></div>');
    $("head").append('<title>'+ x.title+'</title>')
    })
});

