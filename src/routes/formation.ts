import express = require('express');
import configService from '../services/config.service';
import formationService from '../services/formations.service';

const FormationRouter = express.Router();

let IDS = 0;

FormationRouter.get('/findByName/:formationName', (req, res) => {
  const formationName = req.params.formationName;
  const formation = formationService.getFormation(formationName);
  res.json(formation);
});

FormationRouter.get('/', (req, res) => {
    const formations = formationService.getAllFormations();
    res.send(formations);
});

FormationRouter.get('/prepareFormations', (req, res) => {
  const directoryRoot = configService.getDirectoryRoot();

  formationService.prepareFormations(directoryRoot).subscribe(formations => {
    res.send(formations);
  });
});

FormationRouter.get('/initOrReset/:formationName', (req, res) => {
  const formationName = req.params.formationName;
  const directoryRoot = configService.getDirectoryRoot();
  formationService.loadFormation(formationName, directoryRoot)
    .subscribe(node => {
      formationService.saveFormation(formationName, node);
      res.send(node);
    });
});

FormationRouter.post('/', (req, res) => {
  const formation = req.body;
  formationService.saveFormation(formation.name, formation);
  res.send({success: 'saved!'});
});

export default FormationRouter;