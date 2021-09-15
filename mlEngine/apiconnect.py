import json
import pyrebase

config = json.load(open('./config.json'))

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def pushtoDB(payload):
	payloadKey = list(payload)[0]
	data = payload[payloadKey] 
	db.child(payloadKey).set(data)
	return  json.dumps({"success": 1})

def getDB():
	return db.get().val()

def deleteAll():
	db.set({})
	return json.dumps({"success": 1})