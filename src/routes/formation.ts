import express = require('express');

import { ConfigService } from '../services/config.service';
import { FormationService } from '../services/formations.service';

const FormationRouter = express.Router();

let IDS = 0;
const configService = new ConfigService();

const formationService = new FormationService();

FormationRouter.get('/:formationName', (req, res) => {
  const formationName = req.params.formationName;
  const formation = formationService.getFormation(formationName);
  res.json(formation);
});

FormationRouter.get('/', (req, res) => {
    const formations = formationService.getAllFormations();
    res.send(formations);
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