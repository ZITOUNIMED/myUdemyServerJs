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
exports.FormationService = void 0;
var fs = require('fs');
var path = require('path');
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var promisify = require('util').promisify;
var readdir = promisify(fs.readdir);
var FormationService = /** @class */ (function () {
    function FormationService() {
        this.IDS = 0;
    }
    FormationService.prototype.loadFormation = function (formationName, directoryRoot) {
        var _this = this;
        this.IDS = 0;
        var directory = directoryRoot + '/' + formationName;
        return rxjs_1.from(readdir(directory))
            .pipe(operators_1.map(function (files) {
            return files.map(function (file) {
                return {
                    id: ++_this.IDS,
                    name: file,
                    children: []
                };
            });
        }), operators_1.concatAll(), operators_1.map(function (node) {
            if (fs.lstatSync(path.resolve(directory, node.name)).isDirectory()) {
                return rxjs_1.from(readdir(directory + '/' + node.name))
                    .pipe(operators_1.map(function (files) {
                    var children = files
                        .filter(function (file) { return !file.endsWith('.srt'); })
                        .map(function (file) {
                        return {
                            id: ++_this.IDS,
                            name: file.slice(0, file.lastIndexOf('.')),
                            ext: file.slice(file.lastIndexOf('.')),
                            children: []
                        };
                    });
                    return __assign(__assign({}, node), { children: children });
                }));
            }
            return rxjs_1.of(node);
        }), operators_1.concatAll(), operators_1.map(function (node) { return [node]; }), operators_1.reduce(function (l1, l2) { return l1.concat(l2); }), operators_1.map(function (children) {
            return {
                id: ++_this.IDS,
                name: formationName,
                children: children
            };
        }));
    };
    FormationService.prototype.prepareFormations = function (directoryRoot) {
        var _this = this;
        var formations = this.getAllFormations();
        var names = formations.map(function (node) { return node.name; });
        return rxjs_1.from(readdir(directoryRoot))
            .pipe(operators_1.map(function (files) {
            return files
                .filter(function (file) { return fs.lstatSync(path.resolve(directoryRoot, file)).isDirectory(); })
                .filter(function (file) { return names.indexOf(file) < 0; })
                .map(function (file) {
                return {
                    id: ++_this.IDS,
                    name: file,
                    children: []
                };
            });
        }), operators_1.map(function (list) {
            formations.push.apply(formations, list);
            var obj = {};
            formations.forEach(function (formation) {
                if (formation) {
                    formation.children = _this.sortChildren(formation.children);
                    formation.children.forEach(function (child) {
                        child.children = _this.sortChildren(child.children);
                    });
                }
                obj[formation.name] = formation;
            });
            _this.saveFormationsMap(obj);
            return formations;
        }));
    };
    FormationService.prototype.getAllFormations = function () {
        var obj = this.getFormationsMap();
        return Object.values(obj);
    };
    FormationService.prototype.saveFormation = function (name, formation) {
        var obj = this.getFormationsMap();
        obj[name] = formation;
        this.saveFormationsMap(obj);
    };
    FormationService.prototype.deleteFormation = function (name) {
        this.saveFormation(name, undefined);
    };
    FormationService.prototype.getFormation = function (name) {
        var obj = this.getFormationsMap();
        var formation = obj[name];
        return formation;
    };
    FormationService.prototype.sortChildren = function (children) {
        return children.sort(function (e1, e2) {
            var v1 = +e1.name.slice(0, e1.name.indexOf('.'));
            var v2 = +e2.name.slice(0, e2.name.indexOf('.'));
            return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
        });
    };
    FormationService.prototype.getFormationsMap = function () {
        var str = fs.readFileSync('./assets/formations.json');
        var data = JSON.parse(str);
        if (!data) {
            data = {};
        }
        return data;
    };
    FormationService.prototype.saveFormationsMap = function (obj) {
        var str = JSON.stringify(obj);
        fs.writeFileSync('./assets/formations.json', str);
    };
    return FormationService;
}());
exports.FormationService = FormationService;
