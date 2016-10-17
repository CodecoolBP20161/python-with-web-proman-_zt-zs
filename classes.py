from peewee import *

db = PostgresqlDatabase('miki', user='miki', password='645464')


class BaseModel(Model):

    class Meta:
        database = db


class Card(BaseModel):
    title = CharField()


class Board(BaseModel):
    text = TextField()


def init_db():
    db.connect()
    db.create_tables(safe=True)