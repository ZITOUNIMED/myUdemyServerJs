const fs = require('fs');

class FilesService {
    loadFileContent(directory: string , directoryRoot: string){
        return fs.readFileSync(directoryRoot + directory, 'utf8');
    }
}

const filesService = new FilesService();

export default filesService;