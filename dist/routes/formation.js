"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var config_service_1 = require("../services/config.service");
var formations_service_1 = require("../services/formations.service");
var FormationRouter = express.Router();
var IDS = 0;
var configService = new config_service_1.ConfigService();
var formationService = new formations_service_1.FormationService();
FormationRouter.get('/:formationName', function (req, res) {
    var formationName = req.params.formationName;
    var formation = formationService.getFormation(formationName);
    res.json(formation);
});
FormationRouter.get('/', function (req, res) {
    var formations = formationService.getAllFormations();
    res.send(formations);
});
FormationRouter.get('/initOrReset/:formationName', function (req, res) {
    var formationName = req.params.formationName;
    var directoryRoot = configService.getDirectoryRoot();
    formationService.loadFormation(formationName, directoryRoot)
        .subscribe(function (node) {
        formationService.saveFormation(formationName, node);
        res.send(node);
    });
});
FormationRouter.post('/', function (req, res) {
    var formation = req.body;
    formationService.saveFormation(formation.name, formation);
    res.send({ success: 'saved!' });
});
exports.default = FormationRouter;
