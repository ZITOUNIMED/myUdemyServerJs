"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = __importDefault(require("../services/config.service"));
var files_service_1 = __importDefault(require("../services/files.service"));
var express = require('express');
var filesRouter = express.Router();
filesRouter.post('/', function (req, res) {
    var directoryRoot = config_service_1.default.getDirectoryRoot();
    var content = files_service_1.default.loadFileContent(req.body.directory, directoryRoot);
    res.send({ content: content });
});
exports.default = filesRouter;
