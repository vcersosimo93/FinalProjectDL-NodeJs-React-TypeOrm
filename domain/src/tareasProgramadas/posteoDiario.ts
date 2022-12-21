const schedule = require('node-schedule');
import { findOpcionesPorFecha } from "../controllers/MenuOpcionesFechaController";
import { publicarMensaje } from "../slack/apiSlack";

function menuOpcionesATexto (opciones){
    let retorno;
        for (let opcion of opciones){
            retorno += opcion.reaccion + " " + opcion.menuNombre
        }
    return retorno;
}

const job = schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 1-5}, function(){
    let fechaActual = new Date()
    let opciones = findOpcionesPorFecha(fechaActual)
    let opcionesString = menuOpcionesATexto(opciones)
    let mensaje = "Buen día, aquí están las opciones para el almuerzo de mañana: " + opcionesString
  });

