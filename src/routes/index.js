const express = require("express");
const peopleRoutes = require("./person.router")
const departamentsRoutes = require('./departaments.router')
const superheroeRoutes = require('./superhero.router')

function routerApi(app){
    const routes = express.Router();
    routes.use("/people", peopleRoutes);
    /* Endpoint http://localhost:3000/api/v1/people */
    routes.use('/departaments', departamentsRoutes);
    /* Endpoint http://localhost:3000/api/v1/departaments */

    /*Endpoint http://localhost:3000/api/v1/superheros */
    routes.use('/superheros', superheroeRoutes)

    /*Endpoint http://localhost:3000/api/v1 */
    app.use("/api/v1", routes);
}

module.exports = routerApi;
