const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

var serviceAccount = require("./credents.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),	
});


app.use(cors({ origin: true }));

//Este es el ejemplo base
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World! MOCS');
});

app.use(require('./routes/prods'))


exports.app = functions.https.onRequest(app);