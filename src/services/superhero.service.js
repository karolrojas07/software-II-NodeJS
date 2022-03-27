const { response } = require('express');
const superHeroModel = require('../models/superheroe.model');
class Service {
  async createHero (superheroe){
    console.log("")
    superheroe.save()
    return superheroe
  }
  async listHeroes () {
    return superHeroModel.find();
  }
  async showHero (superheroId){
    return superHeroModel.findById({ _id: superheroId });
  }

  async editHero (hero_id, realname, superhero){
    console.log(hero_id)
    return superHeroModel.findById({ _id: hero_id }).then(
      (superheroFind) => {
        console.log(superheroFind)
        return superHeroModel.updateOne(
          { superheroFind },
          { superhero, realname }
        );
      }
    ).catch((err)=>{ return err});
  }

  async deleteHero (superheroId){
    const superhero_remove = superHeroModel.findById({ _id: superheroId });
    return superHeroModel.deleteOne(superhero_remove);
  }
}

module.exports = Service
