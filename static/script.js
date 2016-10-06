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
            storage.push(card);
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
    this.saveCard = storage.saveCard();
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
    $("#no-boards").remove();
    var newBoard = board;
    $(".boards").append('<div class="col-md-3"><div class="panel panel-default board" id="board_' + newBoard.id + '"><div class="panel-heading">' + newBoard.title + '</div><div class="panel-body">Cards should come here</div><div class="panel-footer">Add a card...</div></div></div>');

};

var display = function () {
    try {
        $("#no-boards").remove();
        var all = centralStore.getBoards;
        for (var i = 0; i < all.length; i++) {
            adding(all[i]);
        }
    } catch (err) {
        var msg = "No boards yet.";
        console.log(msg);
        console.log(err.message);
        $(".boards").append('<div class="col-md-3" style="text-align: center" id="no-boards"><div class="panel panel-default board"><div class="panel-heading"></div><div class="panel-body">' + msg + '</div><div class="panel-footer"></div></div></div>');
    }
};

var addCard = function (board, card) {
    var boardId = '#board_' + board.id;
    $(boardId).append('<div class=""><div class="" id="card_' + card.id + '"">' + card.text + '</div></div>')
};

$(document).ready(function () {
    display();
    $("#new-board").click(function () {
        adding(askNew())
    });
});
