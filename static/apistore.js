function apiStore() {
    this.saveBoard = function () {
        $(document).ready(function () {
            $("#save-btn").click(function () {
                var title = $(":input[id=title]").val();
                if (title.length > 0) {
                    $.ajax({
                        method: "POST",
                        url: "/create_board",
                        data: {title: title}
                    })
                        .done(function () {
                            confirm("Board successfully saved.")
                        })
                }
                else {
                    alert("The title cannot be empty!")
                }
            })
            $("#title").keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    $("#save-btn").click()
                }
            })
        })
    };
    this.getBoards = function () {
            };
    this.saveCard = function (card) {
    };
    this.getCardsByBoardId = function (boardId) {
    };
}


var globalImplementation = new apiStore();
globalImplementation.saveBoard()
