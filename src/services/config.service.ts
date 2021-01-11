import { ConfigToModel } from "../models/config.to.model";

const fs = require('fs');

class ConfigService {
    private getConfig(): ConfigToModel {
        const dataStr = fs.readFileSync('./assets/config.json');
        const config = JSON.parse(dataStr);
        return config;
    }

    getDirectoryRoot(){
        return this.getConfig().directoryRoot;
    }

    setDirectoryRoot(newDirectoryRoot){
        const config = this.getConfig();

        const configStr = JSON.stringify({
            ...config,
            directoryRoot: newDirectoryRoot
        });

        fs.writeFileSync('./assets/config.json', configStr);
    }
}

const configService = new ConfigService();
export default configService;