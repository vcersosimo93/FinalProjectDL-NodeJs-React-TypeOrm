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
    await insertReaccion(":letra-a:");
    await insertReaccion(":letra-b:");
    await insertReaccion(":letra-c:");
    await insertReaccion(":letra-d:");
    await insertReaccion(":letra-e:");
    await insertReaccion(":letra-f:");
    await insertReaccion(":letra-g:");
    console.log("Se insertó correctamente la precarga de reacciones.")
}