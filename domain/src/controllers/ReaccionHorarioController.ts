import { AppDataSource } from "../data-source"
import { ReaccionHorario } from "../entity/ReaccionHorario"

const manager = AppDataSource.manager

export const insertReaccion =  (emoji) => {
    const horario = new ReaccionHorario()
    horario.emojiHorario = emoji;
    try {
         manager.save(horario)
    }
    catch {
        console.log("Error al intentar añadir una racción.")
    }
};

export const getEmojiHorario = async (ReaccionId) =>{
try{
    const ReaccionEncontrada = await manager.findOneBy(ReaccionHorario, {id: ReaccionId})
    return ReaccionEncontrada.emojiHorario
}
catch(error){
    console.log(error)
}
}

export const precargaReaccionesHorarios =  () => {
     insertReaccion(":one:");
     insertReaccion(":two:");
     insertReaccion(":three:");
     insertReaccion(":four:");
     insertReaccion(":five:");
     insertReaccion(":six:");
     insertReaccion(":seven:");
     insertReaccion(":eight:");
     insertReaccion(":nine:");
    console.log("Se insertó correctamente la precarga de reacciones horarios.")
}