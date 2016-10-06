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
        var storedBoards = JSON.parse(localStorage.getItem('boards'));
        return storedBoards;
    };
    this.saveCard = function (card) {
        var storage = this.getCardsByBoardId(card.board);
        if (storage) {
            storage.push(card);
        } else {
            storage = [card];
        }
        localStorage.setItem('cards'+card.board, JSON.stringify(storage));
    };
    this.getCardsByBoardId = function (board) {
        var storedCards = JSON.parse(localStorage.getItem('cards'+board));
        return storedCards;
    };
};
