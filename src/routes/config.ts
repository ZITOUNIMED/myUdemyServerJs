import { ConfigToModel } from "../models/config.to.model";
import { ConfigService } from "../services/config.service";
import { FormationService } from "../services/formations.service";

const express = require('express');

const ConfigRouter = express.Router();

const configService = new ConfigService();
const formationService = new FormationService();

ConfigRouter.get('/directoryRoot', (req, res) => {
    const directoryRoot = configService.getDirectoryRoot();
    const data: ConfigToModel = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});

ConfigRouter.post('/directoryRoot', (req, res) => {
    const directoryRoot = req.body.directoryRoot;

    configService.setDirectoryRoot(directoryRoot);

    formationService.prepareFormations(directoryRoot);

    const data: ConfigToModel = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});

export default ConfigRouter;