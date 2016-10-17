from peewee import *

db = PostgresqlDatabase('miki', user='miki', password='645464')


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Card(BaseModel):
    text = TextField()