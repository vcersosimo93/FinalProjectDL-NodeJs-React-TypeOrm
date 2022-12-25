const cron = require('node-cron');
import { findOpcionesDelDia } from "../controllers/MenuOpcionesFechaController";
import { getHorariosBase } from "../controllers/HorarioController";
import { publicarMensaje } from "../slack/apiSlack";
import { createPosteo } from "../controllers/PosteoDiarioController";

// Opciones de menu del día
let opciones;

async function guardarPosteo(){

    let JSONposteoDiario = "[";
    for (let opcion of opciones){
        JSONposteoDiario += '{"emoji" : "' +  opcion.emoji + '", "menu" : "' + opcion.menuNombre + '"},'
    } 
    //Saco el , sobrante
    JSONposteoDiario = JSONposteoDiario.substring(0, JSONposteoDiario.length - 1);
    JSONposteoDiario += "]"
    let ErrorCode = await createPosteo(JSONposteoDiario)
}

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
    opciones = await findOpcionesDelDia()
    for (let opcion of opciones){
        retorno += opcion.emoji + " " + opcion.menuNombre + "\n"
    } 
    return retorno;
}

exports.initScheduledJobs = () => {
    //Corre a las 01:00 de lunes a viernes (1-5)
    const posteoDiario = cron.schedule('0 1 * * 1-5', async ()  =>{
    console.log("Comenzando posteo diario...")
    let mensaje = await obtenerMenus();
    mensaje += await obtenerHorarios();
    try {
        publicarMensaje(mensaje)
        guardarPosteo()
    }catch(error){
        throw new Error(error)
    }
    },{scheduled : true,
    timezone: "America/Argentina/Buenos_Aires"});

    posteoDiario.start()  
}

