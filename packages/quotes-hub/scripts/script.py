import csv
import pandas as pd
from pymongo import MongoClient

csv = pd.read_csv('./curated.csv', usecols=["sentence", "author", "tags"], header=0, keep_default_na=False)
mongo_client = MongoClient('mongodb://localhost:27017/') 
db = mongo_client.quotes_hub
collection = db.quotes

docs = []

for i, row in csv.iterrows():
    doc={}
    print(row)
    
    for header in row.keys():
        if(len(row[header]) > 0):
            if(header == "author"):
                info = row[header].split(",")
                author = info[0]
                origin = ','.join(info[1:])
                
                if(len(origin) > 0):
                    doc["origin"] = origin.strip()
                doc["author"] = author.strip()
            elif(header == "tags"):
                l = row[header].split(',')
                doc["tags"] = [i.strip() for i in l]
            else:
                doc[header] = row[header].strip()
    docs.append(doc)
    
collection.insert_many(docs)
