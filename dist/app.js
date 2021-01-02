"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var index_1 = __importDefault(require("./routes/index"));
var videos_1 = __importDefault(require("./routes/videos"));
var formation_1 = __importDefault(require("./routes/formation"));
var config_1 = __importDefault(require("./routes/config"));
var app = express();
var port = 3000;
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
app.use('/', index_1.default);
app.use('/videos', videos_1.default);
app.use('/formations', formation_1.default);
app.use('/config', config_1.default);
app.listen(port, function () {
    console.log("I'm listenning on port: " + port + ".");
});
