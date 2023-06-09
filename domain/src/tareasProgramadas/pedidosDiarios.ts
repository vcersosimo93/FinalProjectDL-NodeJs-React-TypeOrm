const cron = require('node-cron');
import { mensajeDelDia } from "../slack/apiSlack";
import { ultimoPosteo } from "../controllers/PosteoDiarioController";
import { findOrCreateUsuario } from "../controllers/EmpleadoController"
import { insertPedido } from "../controllers/PedidoController"
import { getHorarioByHora } from "../controllers/HorarioController"
let UltimoPost;

async function procesarPedidos(mensaje, tardio){
    mensaje = JSON.parse(mensaje);
    let response = JSON.parse(UltimoPost.posteo)
    for(let r of response[0].opciones){
      let menuId = r.menu
      let emoji = r.emoji.slice(1,8) //Saco los ":"
      if (mensaje.reactions !== undefined)  {
        for (let reaccion of mensaje.reactions){
            if(reaccion.name === emoji){ 
                for (let i = 0 ; i < reaccion.users.length; i++){
                    let userId = await findOrCreateUsuario(reaccion.users[i])
                    if (userId != 500) {
                    await procesarPedidosPT2(mensaje.reactions, userId, menuId, tardio) 
                    }
                }
            }
        }
      }
    }  
}

async function procesarPedidosPT2(reacciones, userId, menuId, tardio){
    let fecha = new Date();
    fecha.setHours(0, 0, 0, 0);
    let response = JSON.parse(UltimoPost.posteo)
    for(let h of response[1].horarios){  
        let horarioId = await getHorarioByHora(h.hora) 
        let emoji = h.emoji.substring(1,h.emoji.length - 1) //Saco los ":"
        for (let reaccion of reacciones){
             if(reaccion.name === emoji){
                for(let i = 0 ; i < reaccion.users.length; i++){
                    let userId2 = await findOrCreateUsuario(reaccion.users[i])
                    if (userId2 === userId){
                    let req = {"user" : userId, "menu" : menuId, "fecha" : fecha, "horario" : horarioId, "fueraDeHorario" : tardio}
                    await insertPedido(req);
                    return;
                    }
                }
            }
        }
    }
}

async function iniciar (tardio) {
    let mensaje;
    mensaje = await mensajeDelDia();
    UltimoPost = await ultimoPosteo();
    await procesarPedidos(mensaje, tardio);
}


exports.initScheduledJobs = () => {
    //En hora
    const pedidosDiarios = cron.schedule('00 17 * * 1-5', async ()  =>{
    await iniciar(false);
    },{scheduled : true,
    timezone: "America/Argentina/Buenos_Aires"});
    
    //Tardios
    const pedidosTardios = cron.schedule('30 08 * * 1-5', async ()  =>{
    await iniciar(true);
    },{scheduled : true,
    timezone: "America/Argentina/Buenos_Aires"});

    pedidosDiarios.start()
    pedidosTardios.start()  
}