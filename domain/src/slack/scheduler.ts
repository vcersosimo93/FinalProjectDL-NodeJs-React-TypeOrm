const schedule = require('node-schedule');
const { findOpcionesPorFecha } = require ( "../controllers/MenuOpcionesFechaController")

//Regla definida de lunes a viernes a las 8:00 am.
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.second = 1;   //Publica siempre en el segundo 1 de cada minuto de lunes a viernes.
//rule.minute = 0;
//rule.hour = 8;    

let fechaActual =new Date();
fechaActual.setHours(0, 0, 0, 0);
let fechaHarcodeada = new Date("2022-03-25");

const job = schedule.scheduleJob(rule, function(fechaActual){
  console.log(fechaActual);
});

/*
const job = schedule.scheduleJob(rule, function(fechaHarcodeada){
  let opcionesPorFecha = findOpcionesPorFecha(fechaActual)
  console.log(opcionesPorFecha);
});
*/

