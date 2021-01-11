"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = __importDefault(require("../services/config.service"));
var express = require('express');
var VideosRouter = express.Router();
var fs = require('fs');
var path = require('path');
var videoConfig = new Map();
VideosRouter.get('/:videoKey', function (req, res) {
    var directoryRoot = config_service_1.default.getDirectoryRoot();
    var videoKey = req.params.videoKey;
    var fileName = videoConfig.get(videoKey);
    if (fileName) {
        var data = fs.readFileSync(path.resolve(directoryRoot + fileName), function (error, d) {
            if (error) {
                console.log(error);
            }
        });
        res.send(data);
    }
});
VideosRouter.post('/', function (req, res) {
    var key = Math.random().toString(36).substring(7) + '.mp4';
    videoConfig.set(key, req.body.fileName);
    res.send({
        url: 'http://localhost:3000/videos/' + key
    });
});
exports.default = VideosRouter;
