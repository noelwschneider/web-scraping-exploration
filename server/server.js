const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const exampleRouter = require('./routes/example.router.js')

const port = process.env.PORT || 5000;


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/example', exampleRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
