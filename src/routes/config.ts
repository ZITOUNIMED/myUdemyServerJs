import { ConfigToModel } from "../models/config.to.model";
import configService from "../services/config.service";

const express = require('express');

const ConfigRouter = express.Router();

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

    const data: ConfigToModel = {
        directoryRoot: directoryRoot
    };
    res.send(data);
});

export default ConfigRouter;