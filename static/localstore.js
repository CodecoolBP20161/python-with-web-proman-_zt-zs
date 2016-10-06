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
