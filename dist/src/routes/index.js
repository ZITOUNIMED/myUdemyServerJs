"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var IndexRouter = express.Router();
IndexRouter.get('/', function (req, res) {
    res.send('Hello world!');
});
exports.default = IndexRouter;
