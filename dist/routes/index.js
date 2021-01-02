"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var IndexRouter = express.Router();
IndexRouter.get('/', function (req, res) {
    res.write('<html>');
    res.write('<head>');
    res.write('<title>MyUdemy Server Home Page</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h2>Hello from server!</h2>');
    res.write("<p>Download Video: <a href='/videos/demo.mp4'>Demo.mp4</a></p>");
    res.write("<p>Get Formation as JSON: <a target='_blank' href='/formation'>Formation</a></p>");
    res.write('</body>');
    res.write('</html>');
    res.send();
});
exports.default = IndexRouter;
