import { NodeModel } from "../models/node.model";
const fs = require('fs');
const path = require('path');

import { from, Observable, of } from 'rxjs';
import { concatAll, map, reduce } from 'rxjs/operators';

const {promisify } = require('util');
const readdir = promisify(fs.readdir);

class FormationService {
    private IDS = 0;

    loadFormation(formationName: string, directoryRoot: string): Observable<NodeModel>{
        this.IDS = 0;
        const directory = directoryRoot + '/' + formationName;
        return from(readdir(directory))
        .pipe(map((files: string[]) => {
            return files.map(file => {
              return <NodeModel> {
                id: ++this.IDS,
                name: file,
                children: []
              }
            });
          }),
          concatAll(),
          map(node => {
            if (fs.lstatSync(path.resolve(directory , node.name)).isDirectory()) {
              return from(readdir(directory + '/'+node.name))
              .pipe(map((files: string[]) => {
                const children = files
                .filter(file => !file.endsWith('.srt'))
                .map(file => {
                  return <NodeModel> {
                    id: ++this.IDS,
                    name: file.slice(0, file.lastIndexOf('.')),
                    ext: file.slice(file.lastIndexOf('.')),
                    children: []
                  }
                });

                return {
                  ...node,
                  children: children
                }
              }));
            }
            
            return of(node);
          }),
          concatAll(),
          map(node => [node]),
          reduce( (l1, l2) => l1.concat(l2)),
          map(children => {
            return <NodeModel> {
              id: ++this.IDS,
              name: formationName,
              children: children
            };
          })
        );
    }
    
    prepareFormations(directoryRoot: any) {
      const formations = this.getAllFormations();
      const names = formations.map(node => node.name);

        return from(readdir(directoryRoot))
        .pipe(map((files: string[]) => {
            return files
            .filter(file => fs.lstatSync(path.resolve(directoryRoot, file)).isDirectory())
            .filter(file => names.indexOf(file)<0)
            .map(file => {

              return <NodeModel> {
                id: ++this.IDS,
                name: file,
                children: []
              }
            });
          }),
          map(list => {
            formations.push(...list);
            const obj = {};
            formations.forEach(formation => {
              if(formation){
                formation.children = this.sortChildren(formation.children);
      
                formation.children.forEach(child => {
                  child.children = this.sortChildren(child.children);
                });
              }
              obj[formation.name] = formation;
            });
            this.saveFormationsMap(obj);

            return formations;
          })
        );
    }

    getAllFormations(): NodeModel[]{
        const obj = this.getFormationsMap();
        return Object.values(obj);
    }

    saveFormation(name, formation: NodeModel){
        const obj = this.getFormationsMap();
        obj[name] = formation;
        this.saveFormationsMap(obj);
    }

    deleteFormation(name: string){
        this.saveFormation(name, undefined);
    }

    getFormation(name: string): NodeModel{
        const obj = this.getFormationsMap();
        const formation = obj[name];
        
        return formation;
    }

    private sortChildren(children: NodeModel[]): NodeModel[]{
      return children.sort((e1, e2) => {
        const v1 = +e1.name.slice(0, e1.name.indexOf('.'));
        const v2 = +e2.name.slice(0, e2.name.indexOf('.'));
        return v1>v2? 1 : v1<v2? -1 : 0
      });
    }

    private getFormationsMap(): Map<string, NodeModel>{
        const str = fs.readFileSync('./assets/formations.json');
        let data = JSON.parse(str);
        if(!data){
            data = {};
        }
        return data;
    }

    private saveFormationsMap(obj){
        const str = JSON.stringify(obj);
        fs.writeFileSync('./assets/formations.json', str);
    }
}

const formationService = new FormationService();
export default formationService;