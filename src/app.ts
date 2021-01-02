import express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

import IndexRouter from './routes/index';
import VideosRouter from './routes/videos';
import FormationRouter from './routes/formation';
import ConfigRouter from './routes/config';

const app = express();

const port = 3000;

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use('/', IndexRouter);
app.use('/videos', VideosRouter);
app.use('/formations', FormationRouter);
app.use('/config', ConfigRouter);

app.listen(port, () => {
    console.log(`I'm listenning on port: ${port}.`);
});
