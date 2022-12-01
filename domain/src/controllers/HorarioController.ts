import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"

export const getProximoHorario = async () =>{
const horario = await AppDataSource.manager.find(Horario)
}
