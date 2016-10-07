function localStore() {
    this.saveBoard = function (board) {
        var storage = this.getBoards();
        if (storage) {
            storage.push(board);
        } else {
            storage = [board];
        };
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
        };
        localStorage.setItem('cards_' + card.board, JSON.stringify(storage));
    };
    this.getCardsByBoardId = function (boardId) {
        var board = 'cards_' + boardId;
        var storedCards = JSON.parse(localStorage.getItem(board));
        return storedCards;
    };
};
