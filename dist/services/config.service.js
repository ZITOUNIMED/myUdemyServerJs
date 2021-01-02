"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
var fs = require('fs');
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.prototype.getConfig = function () {
        var dataStr = fs.readFileSync('./assets/config.json');
        var config = JSON.parse(dataStr);
        return config;
    };
    ConfigService.prototype.getDirectoryRoot = function () {
        return this.getConfig().directoryRoot;
    };
    ConfigService.prototype.setDirectoryRoot = function (newDirectoryRoot) {
        var config = this.getConfig();
        var configStr = JSON.stringify(__assign(__assign({}, config), { directoryRoot: newDirectoryRoot }));
        fs.writeFileSync('./assets/config.json', configStr);
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
