import { AppDataSource } from "./data-source"
import "reflect-metadata";
import { insertMenuManager } from "./controllers/menuController"
const express = require('express');
const bodyParser = require('body-parser');
const horarioRoutes = require('./routes/horario');
const menuRoutes = require('./routes/menu');
const axios = require('axios');
const app = express();


//Crea la conexion con la base de datos.
AppDataSource.initialize().then(async () => {
  insertMenuManager().catch((err) => {
        console.log(err);
    })
})
.catch(error => console.log(error))


app.post('/button-submit', (req, res) => {
    //axios.post('https://hooks.slack.com/services/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',{text:'Esto es una Prueba'})
    console.log(req.body);
    axios.post('https://hooks.slack.com/services/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', {
      text:
        `Buenas!! Les envío las opciones del próximo día hábil! :raised_hands::skin-tone-2:  :
    :letra-a: ${req.body.Menu}
  
    Para quien desee adaptar alguno de estos menús a opción vegana, le pedimos que reaccione con :seedling:  además de la letra de su elección.
    Horarios:
    :one: 12:30
    :two: 12:45
    :three: 13:00
    :four: 13:15
    :five: 13:30
    :six: 13:45
    :seven: 14:00
  `})
  });

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/horario', horarioRoutes);
app.use('/menu', menuRoutes);

app.listen(8080);
  