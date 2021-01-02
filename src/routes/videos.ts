import { ConfigService } from "../services/config.service";

const express = require('express');

const VideosRouter = express.Router();

const fs = require('fs');
const path = require('path');

const configService = new ConfigService();
const videoConfig = new Map<string, string>();

VideosRouter.get('/:videoKey', (req, res) => {
    const directoryRoot = configService.getDirectoryRoot();
    const videoKey = req.params.videoKey;
    const fileName = videoConfig.get(videoKey);

    if(fileName){
        var data= fs.readFileSync(path.resolve(directoryRoot + fileName), function(error, d){
            if(error){
                console.log(error);
            }
        });
        res.send(data);
    }
});



VideosRouter.post('/', (req, res) => {
    const key = Math.random().toString(36).substring(7)+'.mp4';

    videoConfig.set(key, req.body.fileName);

    res.send({
        url: 'http://localhost:3000/videos/'+key
    });
});

export default VideosRouter;