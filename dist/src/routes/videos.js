"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var VideosRouter = express.Router();
var fs = require('fs');
var path = require('path');
VideosRouter.get('/:fileName', function (req, res) {
    var racin = 'C:/Users/PCMAC/dev/';
    var data = fs.readFileSync(path.resolve(racin + req.params.fileName), function (error, d) {
        if (error) {
            console.log(error);
        }
    });
    res.send(data);
});
exports.default = VideosRouter;
