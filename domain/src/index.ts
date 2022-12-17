//Inicio de variables de entorno
import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'
configDotenv({
    path: resolve(__dirname, "./.env")
  })

import { AppDataSource } from "./data-source"
import "reflect-metadata";
import { precargaMenus } from "./controllers/menuController"
import {findConversation} from "./slack/index"
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const horarioRoutes = require('./routes/horario');
const pedidoRoutes = require('./routes/pedido');
const menuRoutes = require('./routes/menu');
const menuOpcionesFechaRoutes = require('./routes/menuOpcionesFecha');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json
app.use(cors({
  origin: '*'
}));

//Crea la conexion con la base de datos.
AppDataSource.initialize().then(async () => {
  precargaMenus().catch((err) => {
        console.log(err);
    })
})
.catch(error => console.log(error))

app.post('/button-submit', (req, res) => {
  console.log(req.body);
  axios.post('https://hooks.slack.com/services/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', {
    text:
      `Buenas!! Les envío las opciones del próximo día hábil! :raised_hands::skin-tone-2:  :
    :letra-a: ${req.body.Menu[0]}
    :letra-a: ${req.body.Menu[1]}
    :letra-c: ${req.body.Menu[2]}
    :letra-d: ${req.body.Menu[3]}
    :letra-e: ${req.body.Menu[4]}
  
    Para quien desee adaptar alguno de estos menús a opción vegana, le pedimos que reaccione con :seedling:  además de la letra de su elección.
    Horarios:
    :one: 12:30
    :two: 12:45
    :three: 13:00
    :four: 13:15
    :five: 13:30
    :six: 13:45
    :seven: 14:00
  `}).then(() => {
        res.send('Form submitted')
      })
      .catch(()=>{
        res.send('Form failed')
      })
  });


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
app.use('/pedido', pedidoRoutes);
app.use('/menuOpcionesFecha', menuOpcionesFechaRoutes);


findConversation("test-proyecto-ort-ati");

app.listen(8080);




  