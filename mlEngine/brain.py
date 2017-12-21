import os
import json
from flask import Flask, request, redirect, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.externals import joblib
import requests
import pandas as pd
from sklearn.ensemble import RandomForestClassifier


import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

@app.route("/test")
def home():
   return json.dumps({"success":True}), 200, {"ContentType":"application/json"}


@app.route("/predict", methods=["POST"])
def predict():
	if request.method == "POST":
		payload = request.get_json();
		model = joblib.load("model.pkl") 
		x = []
		for sample in payload["x"]:
		    x.append(sample["x"])
		    x.append(sample["y"])
		    x.append(sample["z"])
		x=x[0:20]
		prediction = model.predict(np.array(x).reshape(1, -1))
		print(prediction.tolist())
		return json.dumps({"result": prediction.tolist()[0]}), 200, {"ContentType":"application/json"}

@app.route("/train", methods=["GET"])
def train():
	r = requests.get('http://localhost:7501').json()
	df =pd.DataFrame()
	y=[]
	for key in r:
	    y.append(r[key]['y'])
	    x = []
	    for sample in r[key]['x']:
	        x.append(sample['x'])
	        x.append(sample['y'])
	        x.append(sample['z'])
	    df=pd.concat([df,pd.DataFrame(x).transpose()])

	df.reset_index(drop=True, inplace=True)   
	# take only first 20 columns
	df = df[df.columns[0:20]]
	df.fillna(value=0, inplace=True)
	rn = RandomForestClassifier()
	model = rn.fit(df, y)
	joblib.dump(model, 'model.pkl') 
	print('trained successfully')
	return json.dumps({"success": 1})


# # Everything not declared before (not a Flask route / API endpoint)...
# @app.route("/<path:path>")
# def route_frontend(path):
#     # ...could be a static file needed by the front end that
#     # doesn"t use the `static` path (like in `<script src="bundle.js">`)
#     file_path = os.path.join(app.static_folder, path)
#     if os.path.isfile(file_path):
#         return send_file(file_path)
#     # ...or should be handled by the SPA"s "router" in front end
#     else:
#         return "no good bro"


if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True, port=6000)
