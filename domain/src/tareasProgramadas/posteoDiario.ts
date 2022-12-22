const cron = require('node-cron');
import { findOpcionesPorFecha } from "../controllers/MenuOpcionesFechaController";
import { publicarMensaje } from "../slack/apiSlack";

function menuOpcionesATexto (opciones){
    let retorno;
        for (let opcion of opciones){
            retorno += opcion.reaccion + " " + opcion.menuNombre
        }
    return retorno;
}
exports.initScheduledJobs = () => {
    const posteoDiario = cron.schedule('27 20 * * 1-5', async ()  =>{
    console.log("Comenzando posteo diario...")
    let fechaActual = new Date()
    let opciones = await findOpcionesPorFecha(fechaActual)
    let opcionesString = menuOpcionesATexto(opciones)
    let mensaje = "Buen día, aquí están las opciones para el almuerzo de mañana: " + opcionesString
    publicarMensaje(mensaje)
    },{scheduled : true,
    timezone: "America/Argentina/Buenos_Aires"});

    posteoDiario.start()  
}
