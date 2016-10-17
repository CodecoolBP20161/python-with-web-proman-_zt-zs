from classes import *


db.connect()
# Delete existing tables to avoid conflicts
db.drop_tables([Board, Card], safe=True)
# List the tables here what you want to create...
db.create_tables([Board, Card], safe=True)