from flask import *
from models import *

app = Flask(__name__)
app.config.from_object(__name__)


@app.before_request
def connect_db():
    g.db = db
    g.db.connect()
    if not Board.table_exists():
        g.db.create_tables([Board], safe=True)
    if not Card.table_exists():
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
    all_boards = Board.select()
    for board in all_boards:
        json_board = {"title": board.title, "id": str(board.id)}
        boards.append(json_board)
    return json.dumps(boards)


@app.route("/create_board", methods=['POST'])
def create_board():
    Board.create(title=request.json["title"])
    return redirect("/")


@app.route("/create_card", methods=['POST'])
def create_card():
    card = request.json
    Card.create(text=card["text"], board=card["board"])
    return redirect("/")


@app.route("/api/cards/<board>", methods=['GET'])
def get_cards(board):
    cards = []
    c = Card.select().get()
    current_cards = Card.select().where(Card.board == int(board))
    for card in current_cards:
        b = card.board.id
        json_card = {"text": card.text, "id": str(card.id), "board": b}
        cards.append(json_card)
    return json.dumps(cards)


if __name__ == "__main__":
    app.run(debug=False)
