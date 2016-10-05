function localStore() {
    this.saveBoard = function (board) {
        var newBoard = {};
        var id = board.id;
        newBoard[id] = board;
        newBoard = JSON.stringify(newBoard);

        if (localStorage.boards) {

            var storage = [];
            var oldStorage = this.getBoards;
            storage.push(oldStorage);
            storage.push(newBoard);
            localStorage.setItem("boards", storage)
        } else {
            var newStorage = [];
            newStorage.push(newBoard);
            localStorage.setItem("boards", newBoard)
        }
    };
    this.getBoards = function () {
        var storedBoards = localStorage.getItem("boards");
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