const express = require('express');
const bodyParser = require('body-parser');
const Rx = require('rxjs/Rx');
const Papa = require('babyparse');
const fs = require('fs');
var path = require('path');

const firebase = require('./firebase.js');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, HEAD, OPTIONS, PUT')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, collection');
	next();
});

app.use(bodyParser.json());

const portListen = 7501;
app.listen(portListen);
console.log('Listening on port ' + portListen + '...');

// ENDPOINTS
app.get('/', getAll);
app.get('/:id', getId);
app.patch('/', patch);

const success = { success: 1 };
const fail = { success: 0 };

function getAll(req, res) {
	firebase.getId().then(
		x => res.status(200).send(x),
		err => res.status(500).send(err)
	);
}

function getId(req, res) {
	const id = req.params.id;
	firebase.getId(id).then(
		x => res.status(200).send(x),
		err => res.status(500).send(err)
	);
}

function patch(req, res) {

	// const id = req.params.id;
	const data = req.body;
	console.log(data)
	const firebasePatch$ = Rx.Observable.fromPromise(firebase.patch(data))
		.catch((x) => { throw {error: 'FIREBASE_PATCH_FAILED', desc: x } })

	return Rx.Observable.combineLatest(firebasePatch$)
		.subscribe(
			x => {},
			err => res.status(500).send(err),
			comp => res.status(200).send(success)
		)
}
