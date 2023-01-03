//Inicio de variables de entorno
import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'
configDotenv({ path: resolve(__dirname, "./.env") })
//Fin de variables de entorno

import { AppDataSource } from "./data-source"
import "reflect-metadata";
import { precargaMenus } from "./controllers/MenuController"
import { precargaHorarios } from "./controllers/HorarioController"
import { precargaReacciones } from "./controllers/ReaccionController"
import { precargaReaccionesHorarios } from "./controllers/ReaccionHorarioController"
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const horarioRoutes = require('./routes/horario');
const pedidoRoutes = require('./routes/pedido');
const menuRoutes = require('./routes/menu');
const menuOpcionesFechaRoutes = require('./routes/menuOpcionesFecha');
const empleadoRoutes = require('./routes/empleado');
const posteoDiario = require('./tareasProgramadas/posteoDiario')
const pedidosDiarios = require('./tareasProgramadas/pedidosDiarios')
const app = express();


app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

AppDataSource.initialize().then(async () => {

  precargaReaccionesHorarios();

  precargaMenus().catch((err) => {
    console.log(err);
  })

  precargaReacciones().catch((err) => {
    console.log(err);
  })

  precargaHorarios().catch((err) => {
    console.log(err);
  });
})
  .catch(error => console.log(error))

app.use('/horario', horarioRoutes);
app.use('/menu', menuRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/menuOpcionesFecha', menuOpcionesFechaRoutes);
app.use('/empleado', empleadoRoutes);

posteoDiario.initScheduledJobs();
pedidosDiarios.initScheduledJobs();

app.listen(8080);






