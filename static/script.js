function localStore() {
    this.boards = new Array;
    this.cards = new Array;
    this.saveBoard = function (board) {
        var newBoard = {};
        var id = board.id;
        newBoard[id] = board;
        this.boards.push(newBoard);
        localStorage.setItem("boards", JSON.stringify(this.boards));
    };
    this.getBoards = function () {
        var storedBoards = JSON.parse(localStorage.getItem("boards"));
        return storedBoards;
    };
    this.saveCard = function () {
    };
    this.getCardsByBoardId = function () {
    };
};

function storageSwitch(storage) {
    this.saveBoard = function (board) { storage.saveBoard(board); };
    this.getBoards = storage.getBoards();
    this.saveCard = storage.saveCard();
    this.getCardsByBoardId = storage.getCardsByBoardId();
};

var localImplementation = new localStore();
var centralStore = new storageSwitch(localImplementation);
// now it's possible to use centralStore (storageSwitch instance) instead of a localStore instance

var id = 0;
function Board(title) {
    this.title = title;
    id += 1;
    this.id = id;
}