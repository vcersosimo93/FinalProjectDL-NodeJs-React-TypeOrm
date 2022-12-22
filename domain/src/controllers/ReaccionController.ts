import { AppDataSource } from "../data-source"
import { Reaccion } from "../entity/Reaccion"

const manager = AppDataSource.manager

export const insertReaccion = async (emoji) => {
    const horario = new Reaccion()
    horario.emoji = emoji;
    try{
    await AppDataSource.manager.save(horario)}
    catch{
        console.log("Error al intentar añadir una racción.")
    }
};

export const getEmoji = async (idReaccion) => {
    try{
    const reaccionEncontrada =  await AppDataSource.manager.findOneBy(Reaccion, {id: idReaccion})
    return reaccionEncontrada.emoji
    }
    catch(error){
    console.log("Error al buscar el nombre de un menú.")
    }
}

export const precargaReacciones = async ()=>{
    insertReaccion(":letra-a:");
    insertReaccion(":letra-b:");
    insertReaccion(":letra-c:");
    insertReaccion(":letra-d:");
    insertReaccion(":letra-e:");
    insertReaccion(":letra-f:");
    insertReaccion(":letra-g:");
 }