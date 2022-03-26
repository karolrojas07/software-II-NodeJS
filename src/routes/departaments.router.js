const express = require('express');
const routes = express.Router();
const departaments = require('../json/departaments.json');

/* http://localhost:3000/api/v1/departaments/ */
routes.get('/', (req, res) => {
  res.json(departaments);
});

/** Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON */
/* http://localhost:3000/api/v1/departaments/getMunicipios?id=5 */
routes.get('/getMunicipios', (req, res) => {
  const id = req.query.id
  if (id == null || id == undefined || id == ''){
    res.status(201).json(departaments);
  } else
  {
    const municipios = departaments.filter(
      (departament) =>
        departament['c_digo_dane_del_departamento'] === id
    )
    res.status(201).json(municipios);
  }
});

/* El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
/* http://localhost:3000/api/v1/departaments/getByname?name=Manizales */
routes.get('/getByname', (req, res) => {
  const name = req.query.name
  if (name == null || name == undefined || name == ''){
    res.status(201).json(departaments.filter((dep)=> dep.c_digo_dane_del_departamento == 17));
  } else
  {
    const municipios = departaments.filter(
      (departament) =>
        departament.municipio === name
    )
    res.status(201).json(municipios);
  }
});

/* Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* http://localhost:3000/api/v1/departaments/filter */
routes.get('/filter', (req, res) => {
  const departments_filtered = departaments.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] > 15 &&
      departament['c_digo_dane_del_departamento'] < 20
  )
  res.status(201).json(departments_filtered)
})

/* Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
/* http://localhost:3000/api/v1/departaments/nameWithC */
routes.get('/nameWithC', (req, res) => {
  const departments_filtered = departaments.filter(
    (departament) =>
      departament.departamento.startsWith('C')
  )
  res.status(201).json(departments_filtered)
})

/* Consultar los municipios de un departamento especifico en la ruta */
/* http://localhost:3000/api/v1/departaments/5 */
routes.get('/:departamentId', (req, res) => {
  const { departamentId } = req.params;
  const municipios = departaments.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] === departamentId
  )
  res.status(201).json(municipios);
})



module.exports = routes;
