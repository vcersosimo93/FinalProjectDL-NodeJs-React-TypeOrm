import { AppDataSource } from "../data-source"
import { Reaccion } from "../entity/Reaccion"

const manager = AppDataSource.manager

export const insertReaccion = async (emoji) => {
    const horario = new Reaccion()
    horario.emoji = emoji;
    try {
        await manager.save(horario)
    }
    catch {
        console.log("Error al intentar añadir una racción.")
    }
};

export const getEmoji = async (ReaccionId) =>{
try{
    const ReaccionEncontrada = await manager.findOneBy(Reaccion, {id: ReaccionId})
    return ReaccionEncontrada.emoji
}
catch(error){
    console.log(error)
}
}

export const precargaReacciones = async () => {
    insertReaccion(":letra-a:");
    insertReaccion(":letra-b:");
    insertReaccion(":letra-c:");
    insertReaccion(":letra-d:");
    insertReaccion(":letra-e:");
    insertReaccion(":letra-f:");
    insertReaccion(":letra-g:");
    console.log("Se insertó correctamente la precarga de reacciones.")
}