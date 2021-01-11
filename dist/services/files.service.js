"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var FilesService = /** @class */ (function () {
    function FilesService() {
    }
    FilesService.prototype.loadFileContent = function (directory, directoryRoot) {
        return fs.readFileSync(directoryRoot + directory, 'utf8');
    };
    return FilesService;
}());
var filesService = new FilesService();
exports.default = filesService;
