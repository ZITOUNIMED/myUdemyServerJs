import configService from "../services/config.service";
import filesService from "../services/files.service";

const express = require('express');

const filesRouter = express.Router();

filesRouter.post('/', (req, res) => {
    const directoryRoot = configService.getDirectoryRoot();
    const content = filesService.loadFileContent(req.body.directory, directoryRoot);

    res.send({content: content});
});

export default filesRouter;