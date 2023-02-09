import { AppDataSource } from "../data-source"
import { Reaccion } from "../entity/Reaccion"

const manager = AppDataSource.manager

export const getEmoji = async (ReaccionId) =>{
try{
    const ReaccionEncontrada = await manager.findOneBy(Reaccion, {id: ReaccionId})
    return ReaccionEncontrada.emoji
}
catch(error){
    console.log(error)
}
}

