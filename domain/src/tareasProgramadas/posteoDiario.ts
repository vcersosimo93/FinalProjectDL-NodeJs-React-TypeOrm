const cron = require('node-cron');
import { findOpcionesDelDia } from "../controllers/MenuOpcionesFechaController";
import { getHorariosBase } from "../controllers/HorarioController";
import { publicarMensaje } from "../slack/apiSlack";

async function obtenerHorarios (){
    let retorno = "Los horarios disponibles son: \n"
    let horarios = await getHorariosBase()
    for (let horario of horarios){
        retorno += horario.hora + "\n"
    }
    return retorno;
}

async function obtenerMenus (){
    let retorno = "Buen día, aquí están las opciones para el almuerzo de mañana: \n" ;
    let opciones = await findOpcionesDelDia()
    for (let opcion of opciones){
        retorno += opcion.emoji + " " + opcion.menuNombre + "\n"
    } 
    return retorno;
}

exports.initScheduledJobs = () => {
    const posteoDiario = cron.schedule('20 13 * * 1-6', async ()  =>{
    console.log("Comenzando posteo diario...")
    let mensaje = await obtenerMenus();
    mensaje += await obtenerHorarios();
    publicarMensaje(mensaje)
    },{scheduled : true,
    timezone: "America/Argentina/Buenos_Aires"});

    posteoDiario.start()  
}

