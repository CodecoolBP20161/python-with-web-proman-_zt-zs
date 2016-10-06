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
