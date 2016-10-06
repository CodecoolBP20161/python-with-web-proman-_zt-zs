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
    this.saveCard = function () {
    };
    this.getCardsByBoardId = function () {
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
}

var askNew = function () {
    var title = prompt("Title of the new board: ");
    var newBoard = new Board(title);
    centralStore.saveBoard(newBoard);
    return newBoard
};
var adding = function (board) {
    $("#no-boards").remove();
    var newBoard = board;
    $(".boards").append('<a href="#"><div class="col-md-3">' +
        '<div class="panel panel-default board" id="board_' + newBoard.id + '">' +
        '<div class="panel-heading">' + newBoard.title + '</div>' +
        '<div class="panel-body">Cards should come here</div><div class="panel-footer">' +
        '<button type="button" class="btn navbar-btn btn-info center-block new-card" role="button" id="">Add new Card</button>' +
        '</div></div></div></a>');
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
        $(".boards").append('<div class="col-md-3" style="text-align: center" id="no-boards"><div class="panel panel-default board"><div class="panel-heading"></div><div class="panel-body">'+msg+'</div><div class="panel-footer"></div></div></div>');
    }
};


$(document).ready(function () {
    display();
    $("#new-board").click(function () {
        adding(askNew())
    });
    $(".board").click(function () {
        $(".board").removeClass("active")
        $(this).addClass("active")
    });
        $(".new-card").click(function () {
        prompt("Your card:");
    })
});
