function Board(title){
    this.title = title;
    if (localStorage.id){
        localStorage.id = Number(localStorage.id) + 1;
    } else {
        localStorage.id = 0;
    };
    this.id = localStorage.id;
};

function Card(text, board){
    this.text = text;
    this.board = board;
    if (localStorage.id){
        localStorage.id = Number(localStorage.id) + 1;
    } else {
        localStorage.id = 0;
    };
    this.id = localStorage.id;
};

var addBoard = function(board){
    $('<div class="container-box col-md-3 col-sm-6"><button type="button" class="btn-board" data-toggle="modal" \
    data-target="#display-modal" data-id="'+board.id+'">'+board.title+'</button></div>').insertAfter('#add-new-board')
};

var displayAllBoards = function(){
    for (var i=0; i<centralStore.getBoards.length; i++){
        var board = centralStore.getBoards[i];
        console.log(board);
        addBoard(board);
    };
};

var addCard = function(card){
    $('#dispay-modal .modal-body').append('<p>'+card.text+'</p>');
};

var displayCards = function(id){
    var cards = centralStore.getCardsByBoardId(id);
    for (var i=0; cards.length; i++){
        var card = cards[i];
        addCard(card);
    };
};

$(document).ready(function(){
    if (centralStore.getBoards){
        displayAllBoards();
    };
    $('#save-btn').click(function(){
        var board = new Board($('#title').val());
        centralStore.saveBoard(board);
        addBoard(board);
    });
    $('.display-modal').on('show.bs.modal', function(event){
        var button = $(event.relatedTarget);
        var id = button.data('id');
        displayCards(id);
        $('.add-card-btn').click(function(){
            var card = new Card($('#text').val(), id);
            centralStore.saveCard(card);
            addCard(card);
        });
    });
});
