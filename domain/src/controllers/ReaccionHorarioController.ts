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