import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"

const manager = AppDataSource.manager

export const getHorarios = async (req, res) => {
    try{
    const horarios = await AppDataSource.manager.find(Horario);
    return res.json(horarios);
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
}

