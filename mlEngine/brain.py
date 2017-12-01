import os
import json
from flask import Flask, request, redirect, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.externals import joblib



import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

@app.route("/test")
def home():
   return json.dumps({"success":True}), 200, {"ContentType":"application/json"}


@app.route("/predict", methods=["POST"])
def make_plot():
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
