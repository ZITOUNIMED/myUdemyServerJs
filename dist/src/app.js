"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = __importDefault(require("./routes/index"));
var videos_1 = __importDefault(require("./routes/videos"));
var formation_1 = __importDefault(require("./routes/formation"));
var app = express();
var port = 3000;
app.use('/', index_1.default);
app.use('/videos', videos_1.default);
app.use('/formation', formation_1.default);
app.listen(port, function () {
    console.log("I'm listenning on port: " + port + ".");
});
