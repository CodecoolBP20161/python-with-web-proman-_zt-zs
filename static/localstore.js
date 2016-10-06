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
        localStorage.setItem('cards', JSON.stringify(storage));
    };
    this.getCardsByBoardId = function (board) {
        var cardsByBoard = new Array;
        var storedCards = JSON.parse(localStorage.getItem('cards'));
        try {
            for (var i in storedCards) {
                if (storedCards[i].board === board) {
                    cardsByBoard.push(storedCards[i]);
                };
            };
        } catch (err) {};
        return cardsByBoard;
    };
};
