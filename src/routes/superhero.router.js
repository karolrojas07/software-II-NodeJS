const express = require('express');
const routes = express.Router();
const superHeroModel = require('../models/superheroe.model');
const Service = require('../services/superhero.service')
const hero_service = new Service()

/* //////////////////////////////////Endpoints////////////////////////////////// */
/* JSON status code
201: Created
200: Lists, put, delete
302: Found
304: Not modified
404: Not found */

routes.get('/superhero', async (req, res) => {
  await hero_service
  .listHeroes()
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(404).json({ message: err }));
});

routes.get('/superhero/:id', async (req, res) => {
  const superheroId = req.params.id;
  await hero_service
  .showHero(superheroId)
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(404).json({ message: err }));
});

/*http://localhost:5000/api/v1/superheros/superhero */
routes.post('/superhero', async(req,res) =>{
  const superhero = superHeroModel(req.body);
  await hero_service
    .createHero(superhero)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
})

/*http://localhost:5000/api/v1/superheros/superhero */
routes.put('/superhero/:id', async(req,res) =>{
  const superheroId = req.params.id;
  const { superhero, realname } = req.body;
  await hero_service
    .editHero(superheroId, realname, superhero)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
})


routes.delete('/superhero/:id', async (req, res) => {
  const superheroId = req.params.id;
  await hero_service
  .deleteHero(superheroId)
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(404).json({ message: err }));
});

module.exports = routes;
