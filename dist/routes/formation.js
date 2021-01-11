"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var config_service_1 = __importDefault(require("../services/config.service"));
var formations_service_1 = __importDefault(require("../services/formations.service"));
var FormationRouter = express.Router();
var IDS = 0;
FormationRouter.get('/findByName/:formationName', function (req, res) {
    var formationName = req.params.formationName;
    var formation = formations_service_1.default.getFormation(formationName);
    res.json(formation);
});
FormationRouter.get('/', function (req, res) {
    var formations = formations_service_1.default.getAllFormations();
    res.send(formations);
});
FormationRouter.get('/prepareFormations', function (req, res) {
    var directoryRoot = config_service_1.default.getDirectoryRoot();
    formations_service_1.default.prepareFormations(directoryRoot).subscribe(function (formations) {
        res.send(formations);
    });
});
FormationRouter.get('/initOrReset/:formationName', function (req, res) {
    var formationName = req.params.formationName;
    var directoryRoot = config_service_1.default.getDirectoryRoot();
    formations_service_1.default.loadFormation(formationName, directoryRoot)
        .subscribe(function (node) {
        formations_service_1.default.saveFormation(formationName, node);
        res.send(node);
    });
});
FormationRouter.post('/', function (req, res) {
    var formation = req.body;
    formations_service_1.default.saveFormation(formation.name, formation);
    res.send({ success: 'saved!' });
});
exports.default = FormationRouter;
