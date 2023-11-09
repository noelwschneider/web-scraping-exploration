// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();


// PORT
const port = process.env.PORT || 5000;


// MIDDLEWARE
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));


// ROUTERS
const exampleRouter = require('./routes/example.router.js');
const fangraphsRouter = require('./routes/fangraphs.router.js');


// ROUTES
app.use('/example', exampleRouter);
app.use('/fangraphs', fangraphsRouter);


// START SERVER
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
