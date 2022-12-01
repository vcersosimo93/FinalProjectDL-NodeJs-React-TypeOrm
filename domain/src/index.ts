import { AppDataSource } from "./data-source"
import "reflect-metadata";
import { Menu } from "./entity/Menu"
//import { getRepository } from "typeorm"
import { insertMenuManager } from "./controllers/MenuController"
const express = require('express');
const axios = require('axios');
const app = express();

//Crea la conexion con la base de datos.
AppDataSource.initialize().then(async () => {
    insertMenuManager().catch((err) => {
        console.log(err);
    })
})
.catch(error => console.log(error))

app.get("/getHoras", (req, res) =>{
  res.json({"horas": ["09:45","10:00","11:00","11:20"]})
})


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

  app.listen(5000, () => {
    console.log("Server started at port 5000")
  });
  