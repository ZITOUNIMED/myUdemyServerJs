"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = __importDefault(require("../services/config.service"));
var express = require('express');
var ConfigRouter = express.Router();
ConfigRouter.get('/directoryRoot', function (req, res) {
    var directoryRoot = config_service_1.default.getDirectoryRoot();
    var data = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});
ConfigRouter.post('/directoryRoot', function (req, res) {
    var directoryRoot = req.body.directoryRoot;
    config_service_1.default.setDirectoryRoot(directoryRoot);
    var data = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});
exports.default = ConfigRouter;
