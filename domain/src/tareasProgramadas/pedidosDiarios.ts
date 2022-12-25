const cron = require('node-cron');
import { mensajeDelDia } from "../slack/apiSlack";
import { ultimoPosteo } from "../controllers/PosteoDiarioController";
import { getMenuIdByNombre } from "../controllers/MenuController";
import { findOrCreateUsuario } from "../controllers/EmpleadoController"
import { insertPedido } from "../controllers/PedidoController"


async function procesarPedidos(mensaje){
    let fecha = new Date();
    mensaje = JSON.parse(mensaje);
    fecha.setHours(0, 0, 0, 0);
    let UltimoPost;
    UltimoPost = await ultimoPosteo();
    interface JsonPost {
        menu : string,
        emoji : string
    }
    let response : JsonPost[] = JSON.parse(UltimoPost.posteo)
    for(let r of response){
      let menuId = await getMenuIdByNombre(r.menu)
      let emoji = r.emoji.slice(1,8) //Saco los ":"
      if (mensaje.reactions !== undefined)  {
        for (let reaccion of mensaje.reactions){
            if(reaccion.name === emoji){ 
                for (let i = 0 ; i < reaccion.users.length; i++){
                    let userId = await findOrCreateUsuario(reaccion.users[i])
                    if (userId != 500) {
                    let req = {"user" : userId, "menu" : menuId, "fecha" : fecha}
                    await insertPedido(req)
                    }
                }
            }
        }
      }
    }   
}

exports.initScheduledJobs = () => {
    //Corre (antes que el posteo diario) a las 00:30 de lunes a viernes (1-5)
    const posteoDiario = cron.schedule('30 0 * * 1-7', async ()  =>{
    let mensaje;
    mensaje = await mensajeDelDia();
    procesarPedidos(mensaje)
    },{scheduled : true,
    timezone: "America/Argentina/Buenos_Aires"});

    posteoDiario.start()  
}