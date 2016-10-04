function localStore() {
    this.boards = new Array;
    this.cards = new Array;
    this.saveBoard = function (boardId) {
        this.boards.push(boardId);
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
    this.saveBoard = function (boardId) { storage.saveBoard(boardId); };
    this.getBoards = storage.getBoards();
    this.saveCard = storage.saveCard();
    this.getCardsByBoardId = storage.getCardsByBoardId();
};

var localImplementation = new localStore();
var centralStore = new storageSwitch(localImplementation);
// now it's possible to use centralStore (storageSwitch instance) instead of a localStore instance
