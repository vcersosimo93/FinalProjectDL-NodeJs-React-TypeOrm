//Inicio de variables de entorno
import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'
configDotenv({
    path: resolve(__dirname, "./.env")
  })

import { AppDataSource } from "./data-source"
import "reflect-metadata";
import { precargaMenus } from "./controllers/menuController"
import {findConversation} from "./slack/slack"
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
/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });*/

app.use('/horario', horarioRoutes);
app.use('/menu', menuRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/menuOpcionesFecha', menuOpcionesFechaRoutes);


findConversation("test-proyecto-ort-ati");

app.listen(8080);




  