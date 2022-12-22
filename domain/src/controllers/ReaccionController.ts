import { AppDataSource } from "../data-source"
import { Reaccion } from "../entity/Reaccion"

const manager = AppDataSource.manager

//----------------------------------------------------------------------------------------------
//PRECARGA 
//----------------------------------------------------------------------------------------------

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