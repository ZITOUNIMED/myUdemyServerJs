"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = require("../services/config.service");
var formations_service_1 = require("../services/formations.service");
var express = require('express');
var ConfigRouter = express.Router();
var configService = new config_service_1.ConfigService();
var formationService = new formations_service_1.FormationService();
ConfigRouter.get('/directoryRoot', function (req, res) {
    var directoryRoot = configService.getDirectoryRoot();
    var data = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});
ConfigRouter.post('/directoryRoot', function (req, res) {
    var directoryRoot = req.body.directoryRoot;
    configService.setDirectoryRoot(directoryRoot);
    formationService.prepareFormations(directoryRoot);
    var data = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});
exports.default = ConfigRouter;
