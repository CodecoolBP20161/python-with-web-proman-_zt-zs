from models import *

db.connect()
db.drop_tables([Board, Card], safe=True)
db.create_tables([Board, Card], safe=True)
