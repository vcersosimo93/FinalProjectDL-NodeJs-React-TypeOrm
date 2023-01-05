import { AppDataSource } from "../data-source"
import { ReaccionHorario } from "../entity/ReaccionHorario"

const manager = AppDataSource.manager

export const getReaccionesHorarios = async () => {
    try {
        return manager.find(ReaccionHorario);
    }
    catch (error) {
        console.log(error)
        return 500;
    }
}
export const insertReaccion = async (emoji) => {
    const horario = new ReaccionHorario()
    horario.emoji = emoji;
    try {
         await manager.save(horario)
    }
    catch {
        console.log("Error al intentar añadir una racción.")
    }
};



export const precargaReaccionesHorarios = async () => {
     await insertReaccion(":one:");
     await insertReaccion(":two:");
     await insertReaccion(":three:");
     await insertReaccion(":four:");
     await insertReaccion(":five:");
     await insertReaccion(":six:");
     await insertReaccion(":seven:");
     await insertReaccion(":eight:");
     await insertReaccion(":nine:");
    console.log("Se insertó correctamente la precarga de reacciones horarios.")
}