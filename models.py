from peewee import *
from db_connection import *

db = PostgresqlDatabase(connect_list()[0].strip(), user=connect_list()[1].strip())


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Card(BaseModel):
    text = TextField()
    board = ForeignKeyField(Board, related_name="board_id")
