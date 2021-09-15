const admin = require('firebase-admin');
const request = require('request');
const Rx = require('rxjs/Rx');
const path = require('path');

const secret = "./private/secret.json";
const fbUrl = "https://motionpredict.firebaseio.com/";

admin.initializeApp({
	credential: admin.credential.cert(secret),
	databaseURL: fbUrl,
});
const db = admin.database();
const success = { success: 1 };
const fail = { success: 0 };

module.exports = {

	getId: (home) => {
		const ref = db.ref(home);
		return new Promise((resolve, reject) => {
			ref.once('value',
				result => resolve(result.val()),
				error => reject(error)
			);
		});
	},

	patch: (data) => {
		const ref = db.ref();
		return new Promise((resolve, reject) => {
			ref.update(data,
				(err) => { return err ? reject(err) : resolve(success) }
			);
		});
	},

};
