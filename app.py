from flask import *
from models import *

app = Flask(__name__)
app.config.from_object(__name__)


@app.before_request
def connect_db():
    g.db = db
    g.db.connect()
    if Board.table_exists():
        pass
    else:
        g.db.create_tables([Board], safe=True)
    if Card.table_exists():
        pass
    else:
        g.db.create_tables([Card], safe=True)


@app.after_request
def close_db(response):
    g.db.close()
    return response


@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template("index.html")


@app.route("/api/boards", methods=['GET'])
def get_boards():
    boards = []
    test = Board.select()
    for board in test:
        json_board = {"title": board.title, "id": str(board.id)}
        boards.append(json_board)
    return json.dumps(boards)


@app.route("/create_board", methods=['POST'])
def create_board():
    board = Board.create(title=request.form["title"])
    return redirect("/")


# @app.route("/api/cards", methods=['GET'])
# def get_cards():
#     test = Card.select()
#     for card in test:
#         return "{'board_" + str(card.board.id) + "':'" + card.text + "'}"

if __name__ == "__main__":
    app.run(debug=True)