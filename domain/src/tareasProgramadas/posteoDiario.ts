const cron = require('node-cron');
import { findOpcionesDelDia } from "../controllers/MenuOpcionesFechaController";
import { publicarMensaje } from "../slack/apiSlack";
import { createPosteo } from "../controllers/PosteoDiarioController";
import { getHorariosOrdenados } from "../controllers/HorarioController";
import { getReaccionesHorarios } from "../controllers/ReaccionHorarioController";

// Opciones de menu del día
let opciones;
let horas;
let reaccionesHoras;

async function guardarPosteo(){

    let JSONposteoDiario = '[{"opciones": [';
    for (let opcion of opciones){
        JSONposteoDiario += '{"emoji" : "' +  opcion.emoji + '", "menu" : "' + opcion.menuId + '"},' 
    } 
    //Saco el , sobrante
    JSONposteoDiario = JSONposteoDiario.substring(0, JSONposteoDiario.length - 1);
    JSONposteoDiario += ']},{"horarios":['
    for (let i = 0; i < horas.length; i++){
        JSONposteoDiario += '{"emoji" : "' +  reaccionesHoras[i].emoji + '", "hora" : "' + horas[i].hora + '"},'   
    }
    //Saco el , sobrante
    JSONposteoDiario = JSONposteoDiario.substring(0, JSONposteoDiario.length - 1);
    JSONposteoDiario += "]}]"
    let ErrorCode = await createPosteo(JSONposteoDiario)
}

async function obtenerHorarios (){
    let retorno = "Los horarios disponibles son: \n"
    horas = await getHorariosOrdenados()
    reaccionesHoras = await getReaccionesHorarios()
    for (let i = 0; i < horas.length; i++){
        retorno += reaccionesHoras[i].emoji + " " + horas[i].hora.slice(0, 5) + "\n"
    }
    console.log("retorno" + retorno);
    return retorno;
}

async function obtenerMenus (){
    let retorno = "Buen día, aquí están las opciones para el almuerzo de mañana: \n" ;
    opciones = await findOpcionesDelDia()
    for (let opcion of opciones){
        let emojiHoja = "";
        if (opcion.esVegetariano) {
           emojiHoja = " :herb:" 
        }
        retorno += opcion.emoji + " " + opcion.menuNombre + emojiHoja + "\n"
    } 
    return retorno;
}

exports.initScheduledJobs = () => {
    //Corre a las 01:00 de lunes a viernes (1-5)
    const posteoDiario = cron.schedule('00 09 * * 1-5', async ()  =>{
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

